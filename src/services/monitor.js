import { SERVICES, RETRY_ATTEMPTS, RETRY_DELAY, MAX_HISTORY_PER_SERVICE, POLL_INTERVAL } from '../utils/constants';
import { saveRecord, getHistory, pruneHistory } from '../storage/db';

export class MonitorEngine {
  constructor() {
    this.services = SERVICES;
    this.results = new Map();
    this.history = new Map();
    this.listeners = new Set();
    this.timer = null;
    this.running = false;
    this.errorCounts = new Map();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  getState() {
    return this.services.map((svc) => {
      const last = this.results.get(svc.id);
      const history = this.history.get(svc.id) || [];
      return { ...svc, last, history };
    });
  }

  async measureLatency(url, attempt = 0) {
    const start = performance.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
        mode: 'cors',
      });
      clearTimeout(timeout);

      const latency = Math.round(performance.now() - start);
      const body = await response.clone().text();

      return {
        success: response.ok,
        statusCode: response.status,
        latency,
        payloadSize: body.length,
        timestamp: Date.now(),
        error: null,
      };
    } catch (err) {
      clearTimeout(timeout);

      if (err.name === 'AbortError') {
        return {
          success: false,
          statusCode: 0,
          latency: 15000,
          payloadSize: 0,
          timestamp: Date.now(),
          error: 'Request timed out',
        };
      }

      if (attempt < RETRY_ATTEMPTS) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY * (attempt + 1)));
        return this.measureLatency(url, attempt + 1);
      }

      return {
        success: false,
        statusCode: 0,
        latency: Math.round(performance.now() - start),
        payloadSize: 0,
        timestamp: Date.now(),
        error: err.message || 'Request failed',
      };
    }
  }

  async pollService(service) {
    const url = `${service.endpoint}${service.checkPath}`;
    const result = await this.measureLatency(url);

    this.results.set(service.id, result);

    let history = this.history.get(service.id) || [];
    history.push({ ...result, serviceId: service.id });
    this.history.set(service.id, history);

    const currentErrorCount = this.errorCounts.get(service.id) || 0;
    if (!result.success) {
      this.errorCounts.set(service.id, currentErrorCount + 1);
    } else {
      this.errorCounts.set(service.id, Math.max(0, currentErrorCount - 1));
    }

    try {
      await saveRecord({ ...result, serviceId: service.id });
      await pruneHistory(service.id, MAX_HISTORY_PER_SERVICE);
    } catch {
    }

    return result;
  }

  async pollAll() {
    const promises = this.services.map((svc) => this.pollService(svc));
    await Promise.allSettled(promises);
    this.notify();
  }

  async loadHistoryFromStorage() {
    const promises = this.services.map(async (svc) => {
      const records = await getHistory(svc.id, MAX_HISTORY_PER_SERVICE);
      if (records.length > 0) {
        this.history.set(svc.id, records.reverse());
        this.results.set(svc.id, records[records.length - 1]);
      }
    });
    await Promise.allSettled(promises);
    this.notify();
  }

  start() {
    if (this.running) return;
    this.running = true;

    this.loadHistoryFromStorage().then(() => {
      this.pollAll();
    });

    this.timer = setInterval(() => {
      this.pollAll();
    }, POLL_INTERVAL);
  }

  stop() {
    this.running = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getErrorRate(serviceId) {
    const history = this.history.get(serviceId) || [];
    if (history.length === 0) return 0;
    const failures = history.filter((r) => !r.success).length;
    return failures / history.length;
  }

  getIncidentStatus() {
    let totalFailures = 0;
    let totalRequests = 0;
    for (const svc of this.services) {
      const history = this.history.get(svc.id) || [];
      totalRequests += history.length;
      totalFailures += history.filter((r) => !r.success).length;
    }
    if (totalRequests < 30) return false;
    return totalFailures / totalRequests > 0.4;
  }
}

export const monitorEngine = new MonitorEngine();

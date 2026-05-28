import { useState, useEffect, useCallback, useRef } from 'react';
import { monitorEngine } from '../services/monitor';
import { computeHealthScore, computeErrorRate, computeUptime, categorizeService, computeMovingAverage } from '../utils/health';

export function useMonitor() {
  const [services, setServices] = useState([]);
  const [incidentMode, setIncidentMode] = useState(false);
  const [lastPollTime, setLastPollTime] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    monitorEngine.start();

    const unsubscribe = monitorEngine.subscribe((state) => {
      if (!mountedRef.current) return;

      const enriched = state.map((svc) => {
        const history = svc.history;
        const latencies = history.map((r) => r.latency);
        const avgLatency = latencies.length > 0
          ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
          : 0;
        const movingAvg = computeMovingAverage(latencies);
        const errorRate = computeErrorRate(history);
        const uptime = computeUptime(history);

        return {
          ...svc,
          avgLatency,
          movingAvgLatency: Math.round(movingAvg),
          errorRate,
          uptime,
          healthScore: computeHealthScore(avgLatency, errorRate, uptime),
          status: categorizeService(computeHealthScore(avgLatency, errorRate, uptime)),
          totalRequests: history.length,
        };
      });

      setServices(enriched);
      setIncidentMode(monitorEngine.getIncidentStatus());
      setLastPollTime(Date.now());
    });

    return () => {
      mountedRef.current = false;
      unsubscribe();
      monitorEngine.stop();
    };
  }, []);

  const refresh = useCallback(() => {
    monitorEngine.pollAll();
  }, []);

  return { services, incidentMode, lastPollTime, refresh };
}

import {
  HEALTHY_THRESHOLD_MS,
  DEGRADED_THRESHOLD_MS,
  ERROR_RATE_THRESHOLD,
  MOVING_AVERAGE_WINDOW,
} from './constants';

export function computeHealthScore(latency, errorRate, uptime) {
  const latencyScore = latency <= HEALTHY_THRESHOLD_MS
    ? 100
    : Math.max(0, 100 - ((latency - HEALTHY_THRESHOLD_MS) / DEGRADED_THRESHOLD_MS) * 50);

  const errorScore = errorRate <= 0.02
    ? 100
    : Math.max(0, 100 - (errorRate / ERROR_RATE_THRESHOLD) * 60);

  const uptimeScore = uptime * 100;

  return Math.round(latencyScore * 0.35 + errorScore * 0.35 + uptimeScore * 0.3);
}

export function computeMovingAverage(values) {
  if (values.length === 0) return 0;
  const window = Math.min(MOVING_AVERAGE_WINDOW, values.length);
  const slice = values.slice(-window);
  return slice.reduce((a, b) => a + b, 0) / slice.length;
}

export function computeErrorRate(history) {
  if (history.length === 0) return 0;
  const failures = history.filter((r) => !r.success).length;
  return failures / history.length;
}

export function computeUptime(history, windowSize = 50) {
  const slice = history.slice(-windowSize);
  if (slice.length === 0) return 1;
  const successes = slice.filter((r) => r.success).length;
  return successes / slice.length;
}

export function categorizeService(healthScore) {
  if (healthScore >= 80) return 'healthy';
  if (healthScore >= 50) return 'degraded';
  return 'failing';
}

export function categorizeByLatency(latency) {
  if (latency <= HEALTHY_THRESHOLD_MS) return 'healthy';
  if (latency <= DEGRADED_THRESHOLD_MS) return 'degraded';
  return 'failing';
}

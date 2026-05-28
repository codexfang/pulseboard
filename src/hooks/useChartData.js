import { useMemo } from 'react';
import { CHART_POINTS } from '../utils/constants';

export function useChartData(services) {
  const latencyChartData = useMemo(() => {
    if (services.length === 0) return [];

    const points = [];
    const maxLen = Math.max(...services.map((s) => s.history.length));
    const step = Math.max(1, Math.floor(maxLen / CHART_POINTS));

    for (let i = 0; i < maxLen; i += step) {
      const point = { index: points.length };
      for (const svc of services) {
        const entry = svc.history[i];
        if (entry) {
          point[svc.id] = entry.latency;
        }
      }
      points.push(point);
    }
    return points;
  }, [services]);

  const volumeChartData = useMemo(() => {
    const buckets = new Map();
    for (const svc of services) {
      for (const entry of svc.history) {
        const bucket = Math.floor(entry.timestamp / 60000) * 60000;
        buckets.set(bucket, (buckets.get(bucket) || 0) + 1);
      }
    }
    return Array.from(buckets.entries())
      .sort(([a], [b]) => a - b)
      .slice(-CHART_POINTS)
      .map(([ts, count]) => ({
        time: new Date(ts).toLocaleTimeString(),
        requests: count,
      }));
  }, [services]);

  const successRateData = useMemo(() => {
    return services.map((svc) => {
      const total = svc.history.length;
      const success = svc.history.filter((r) => r.success).length;
      return {
        name: svc.name,
        success,
        failed: total - success,
        total,
      };
    });
  }, [services]);

  return { latencyChartData, volumeChartData, successRateData };
}

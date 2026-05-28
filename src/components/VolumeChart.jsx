import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CHART_POINTS } from '../utils/constants';

export default function VolumeChart({ services }) {
  const data = useMemo(() => {
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
        time: new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        requests: count,
      }));
  }, [services]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-surface-100">Request Volume</h3>
        <span className="text-xs text-surface-500">requests/min</span>
      </div>
      <div className="card-body">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1b2e" />
              <XAxis
                dataKey="time"
                tick={{ fill: '#8389ab', fontSize: 11 }}
                axisLine={{ stroke: '#383b52' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#8389ab', fontSize: 11 }}
                axisLine={{ stroke: '#383b52' }}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#1a1b2e',
                  border: '1px solid #383b52',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#ecedf2' }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                name="Requests"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#volumeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

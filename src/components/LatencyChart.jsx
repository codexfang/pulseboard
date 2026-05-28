import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CHART_POINTS } from '../utils/constants';

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7'];

export default function LatencyChart({ services }) {
  const data = useMemo(() => {
    if (services.length === 0) return [];

    const points = [];
    const maxLen = Math.max(...services.map((s) => s.history.length));
    const step = Math.max(1, Math.floor(maxLen / CHART_POINTS));

    for (let i = 0; i < maxLen; i += step) {
      const point = { tick: points.length };
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

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-surface-100">Latency Over Time</h3>
        <span className="text-xs text-surface-500">ms</span>
      </div>
      <div className="card-body">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1b2e" />
              <XAxis
                dataKey="tick"
                tick={{ fill: '#8389ab', fontSize: 11 }}
                axisLine={{ stroke: '#383b52' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#8389ab', fontSize: 11 }}
                axisLine={{ stroke: '#383b52' }}
                tickLine={false}
                unit="ms"
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
              <Legend
                wrapperStyle={{ fontSize: '11px', color: '#8389ab' }}
              />
              {services.map((svc, idx) => (
                <Line
                  key={svc.id}
                  type="monotone"
                  dataKey={svc.id}
                  name={svc.name}
                  stroke={COLORS[idx % COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

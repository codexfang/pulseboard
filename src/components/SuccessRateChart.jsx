import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function SuccessRateChart({ services }) {
  const data = useMemo(() => {
    return services.map((svc) => {
      const total = svc.history.length;
      const success = svc.history.filter((r) => r.success).length;
      return {
        name: svc.name.length > 12 ? svc.name.slice(0, 12) + '…' : svc.name,
        success,
        failed: total - success,
      };
    });
  }, [services]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-surface-100">Success / Failure Ratio</h3>
        <span className="text-xs text-surface-500">requests</span>
      </div>
      <div className="card-body">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1b2e" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#8389ab', fontSize: 11 }}
                axisLine={{ stroke: '#383b52' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#8389ab', fontSize: 11 }}
                axisLine={{ stroke: '#383b52' }}
                tickLine={false}
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
              <Bar dataKey="success" name="Success" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="failed" name="Failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

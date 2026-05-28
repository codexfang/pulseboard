import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function statusText(code) {
  if (code >= 200 && code < 300) return 'text-success';
  if (code >= 300 && code < 400) return 'text-warning';
  if (code >= 400) return 'text-danger';
  return 'text-surface-400';
}

export default function DetailPanel({ service, onClose }) {
  const trendData = useMemo(() => {
    return service.history.slice(-50).map((r) => ({
      time: formatTime(r.timestamp),
      latency: r.latency,
    }));
  }, [service]);

  const recentLogs = useMemo(() => {
    return service.history.slice(-50).reverse();
  }, [service]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="text-sm font-semibold text-surface-100">{service.name}</h3>
          <p className="text-xs text-surface-400">{service.description}</p>
        </div>
        <button onClick={onClose} className="btn-ghost text-sm p-1.5">✕</button>
      </div>

      <div className="card-body space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="stat-label">Last Latency</p>
            <p className="stat-value text-lg">{service.last ? `${service.last.latency}ms` : '—'}</p>
          </div>
          <div>
            <p className="stat-label">Avg Latency</p>
            <p className="stat-value text-lg">{service.avgLatency ? `${service.avgLatency}ms` : '—'}</p>
          </div>
          <div>
            <p className="stat-label">Health Score</p>
            <p className={`stat-value text-lg ${service.healthScore >= 80 ? 'text-success' : service.healthScore >= 50 ? 'text-warning' : 'text-danger'}`}>
              {service.healthScore ?? '—'}
            </p>
          </div>
          <div>
            <p className="stat-label">Uptime</p>
            <p className="stat-value text-lg">{service.uptime ? `${(service.uptime * 100).toFixed(1)}%` : '—'}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-surface-100 mb-3">Latency Trend (last 50)</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1b2e" />
                <XAxis
                  dataKey="time"
                  tick={{ fill: '#8389ab', fontSize: 10 }}
                  axisLine={{ stroke: '#383b52' }}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fill: '#8389ab', fontSize: 10 }}
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
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-surface-100 mb-3">Request Log (last 50)</p>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-surface-400 border-b border-surface-800">
                  <th className="text-left py-2 pr-4 font-medium">Time</th>
                  <th className="text-left py-2 pr-4 font-medium">Status</th>
                  <th className="text-left py-2 pr-4 font-medium">Latency</th>
                  <th className="text-right py-2 font-medium">Size</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((r, idx) => (
                  <tr key={idx} className="border-b border-surface-800/50 hover:bg-surface-800/30">
                    <td className="py-2 pr-4 text-surface-400 font-mono">{formatTime(r.timestamp)}</td>
                    <td className={`py-2 pr-4 font-mono ${statusText(r.statusCode)}`}>
                      {r.statusCode || 'ERR'}
                    </td>
                    <td className="py-2 pr-4 font-mono text-surface-300">{r.latency}ms</td>
                    <td className="py-2 text-right font-mono text-surface-400">
                      {r.payloadSize ? `${(r.payloadSize / 1024).toFixed(1)}KB` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

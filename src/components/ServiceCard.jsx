import { categorizeByLatency } from '../utils/health';

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB'];
  let i = 0;
  let val = bytes;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

const statusConfig = {
  healthy: { label: 'Healthy', class: 'badge-healthy', dot: 'bg-success' },
  degraded: { label: 'Degraded', class: 'badge-degraded', dot: 'bg-warning' },
  failing: { label: 'Failing', class: 'badge-failing', dot: 'bg-danger' },
};

export default function ServiceCard({ service, selected, onSelect }) {
  const config = statusConfig[service.status] || statusConfig.failing;
  const latencyStatus = service.last ? categorizeByLatency(service.last.latency) : 'healthy';
  const isDegraded = service.status === 'degraded' || service.status === 'failing';

  return (
    <button
      onClick={() => onSelect(service)}
      className={`card text-left w-full transition-all duration-200 hover:border-surface-600 cursor-pointer
        ${selected ? 'ring-2 ring-pulse-500/50 border-pulse-500/50' : ''}
        ${isDegraded ? 'glow-pulse' : ''}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${config.dot} ${service.status === 'healthy' ? '' : 'animate-pulse'}`} />
              <h3 className="text-sm font-semibold text-surface-100 truncate">{service.name}</h3>
            </div>
            <p className="text-xs text-surface-400 truncate">{service.description}</p>
          </div>
          <span className={`badge ${config.class} ml-3 shrink-0`}>{config.label}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <p className="stat-label">Latency</p>
            <p className={`stat-value text-sm ${latencyStatus === 'failing' ? 'text-danger' : latencyStatus === 'degraded' ? 'text-warning' : 'text-surface-100'}`}>
              {service.last ? `${service.last.latency}ms` : '—'}
            </p>
          </div>
          <div>
            <p className="stat-label">Avg</p>
            <p className="stat-value text-sm text-surface-100">{service.avgLatency ? `${service.avgLatency}ms` : '—'}</p>
          </div>
          <div>
            <p className="stat-label">Health</p>
            <p className="stat-value text-sm text-surface-100">{service.healthScore ?? '—'}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-surface-800">
          <div className="flex items-center gap-3 text-xs text-surface-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              {service.history.filter((r) => r.success).length} ok
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-danger" />
              {service.history.filter((r) => !r.success).length} err
            </span>
          </div>
          {service.last && (
            <span className="text-xs text-surface-500">
              {formatBytes(service.last.payloadSize)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

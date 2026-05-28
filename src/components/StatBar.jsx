export default function StatBar({ services, incidentMode }) {
  const totalRequests = services.reduce((acc, s) => acc + s.totalRequests, 0);
  const totalErrors = services.reduce((acc, s) => acc + s.history.filter((r) => !r.success).length, 0);
  const avgHealth = services.length > 0
    ? Math.round(services.reduce((acc, s) => acc + (s.healthScore || 0), 0) / services.length)
    : 0;
  const avgLatency = services.length > 0
    ? Math.round(services.reduce((acc, s) => acc + (s.avgLatency || 0), 0) / services.length)
    : 0;

  const stats = [
    { label: 'Services', value: services.length, color: 'text-surface-100' },
    { label: 'Total Requests', value: totalRequests.toLocaleString(), color: 'text-surface-100' },
    { label: 'Avg Health', value: avgHealth, color: avgHealth >= 80 ? 'text-success' : avgHealth >= 50 ? 'text-warning' : 'text-danger' },
    { label: 'Avg Latency', value: `${avgLatency}ms`, color: 'text-surface-100' },
    { label: 'Errors', value: totalErrors, color: totalErrors > 0 ? 'text-danger' : 'text-surface-100' },
  ];

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 ${incidentMode ? 'animate-pulse' : ''}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="card card-body py-4 px-5">
          <p className="stat-label">{stat.label}</p>
          <p className={`stat-value ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

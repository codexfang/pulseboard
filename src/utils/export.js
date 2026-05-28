export function exportDashboardData(serviceStates, historyMap) {
  const payload = {
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    services: serviceStates.map((s) => ({
      id: s.id,
      name: s.name,
      health: {
        score: s.healthScore,
        status: s.status,
        latency: s.latency,
      },
      history: (historyMap.get(s.id) || []).map((r) => ({
        ts: r.timestamp,
        latency: r.latency,
        success: r.success,
        statusCode: r.statusCode,
      })),
    })),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pulseboard-export-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

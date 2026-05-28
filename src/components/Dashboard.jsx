import { useState, useMemo, useCallback } from 'react';
import { useMonitor } from '../hooks/useMonitor';
import Header from './Header';
import StatBar from './StatBar';
import IncidentBanner from './IncidentBanner';
import ServiceGrid from './ServiceGrid';
import DetailPanel from './DetailPanel';
import LatencyChart from './LatencyChart';
import SuccessRateChart from './SuccessRateChart';
import VolumeChart from './VolumeChart';
import { STATUS_FILTERS } from '../utils/constants';
import { exportDashboardData } from '../utils/export';

export default function Dashboard() {
  const { services, incidentMode, lastPollTime, refresh } = useMonitor();
  const [filterStatus, setFilterStatus] = useState(STATUS_FILTERS.ALL);
  const [selectedService, setSelectedService] = useState(null);
  const [showCharts, setShowCharts] = useState(true);

  const filteredServices = useMemo(() => {
    if (filterStatus === STATUS_FILTERS.ALL) return services;
    return services.filter((s) => s.status === filterStatus);
  }, [services, filterStatus]);

  const selectedData = useMemo(() => {
    if (!selectedService) return null;
    return services.find((s) => s.id === selectedService.id) || null;
  }, [services, selectedService]);

  const handleExport = useCallback(() => {
    exportDashboardData(services, new Map(services.map((s) => [s.id, s.history || []])));
  }, [services]);

  const serviceCounts = useMemo(() => ({
    healthy: services.filter((s) => s.status === 'healthy').length,
    degraded: services.filter((s) => s.status === 'degraded').length,
    failing: services.filter((s) => s.status === 'failing').length,
  }), [services]);

  return (
    <div className="min-h-screen bg-surface-950">
      <Header
        incidentMode={incidentMode}
        lastPollTime={lastPollTime}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onExport={handleExport}
        onRefresh={refresh}
        serviceCounts={serviceCounts}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {incidentMode && <IncidentBanner />}

        <StatBar services={services} incidentMode={incidentMode} />

        {selectedData && (
          <DetailPanel
            service={selectedData}
            onClose={() => setSelectedService(null)}
          />
        )}

        {!selectedData && showCharts && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LatencyChart services={services} />
              <SuccessRateChart services={services} />
            </div>
            <VolumeChart services={services} />
          </div>
        )}

        {!selectedData && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-surface-100">Monitored Services</h2>
              <button
                onClick={() => setShowCharts(!showCharts)}
                className="btn-ghost text-xs"
              >
                {showCharts ? 'Hide Charts' : 'Show Charts'}
              </button>
            </div>
            <ServiceGrid
              services={filteredServices}
              selectedId={selectedService?.id}
              onSelect={setSelectedService}
            />
          </section>
        )}
      </main>
    </div>
  );
}

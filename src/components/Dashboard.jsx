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
  const { services, incidentMode, refresh } = useMonitor();
  const [filterStatus, setFilterStatus] = useState(STATUS_FILTERS.ALL);
  const [selectedService, setSelectedService] = useState(null);
  const [showCharts, setShowCharts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    let result = services;
    if (filterStatus !== STATUS_FILTERS.ALL) {
      result = result.filter((s) => s.status === filterStatus);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [services, filterStatus, searchQuery]);

  const selectedData = useMemo(() => {
    if (!selectedService) return null;
    return services.find((s) => s.id === selectedService.id) || null;
  }, [services, selectedService]);

  const handleExport = useCallback(() => {
    exportDashboardData(services, new Map(services.map((s) => [s.id, s.history || []])));
  }, [services]);

  return (
    <div className="min-h-screen bg-surface-950">
      <Header
        incidentMode={incidentMode}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onExport={handleExport}
        onRefresh={refresh}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
              <div className="flex items-center gap-3">
                {searchQuery && (
                  <span className="text-xs text-surface-500">
                    {filteredServices.length} of {services.length} services
                  </span>
                )}
                <button
                  onClick={() => setShowCharts(!showCharts)}
                  className="btn-ghost text-xs"
                >
                  {showCharts ? 'Hide Charts' : 'Show Charts'}
                </button>
              </div>
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

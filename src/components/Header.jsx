import { STATUS_FILTERS } from '../utils/constants';
import FilterBar from './FilterBar';

export default function Header({
  incidentMode,
  lastPollTime,
  filterStatus,
  onFilterChange,
  onExport,
  onRefresh,
  serviceCounts,
}) {
  const timeAgo = lastPollTime
    ? `${Math.round((Date.now() - lastPollTime) / 1000)}s ago`
    : '—';

  return (
    <header className="sticky top-0 z-10 bg-surface-950/80 backdrop-blur-lg border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pulse-600 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-white">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-bold text-surface-100 tracking-tight">Pulseboard</h1>
                <p className="text-[10px] text-surface-500 font-mono">observability dashboard</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <FilterBar active={filterStatus} onChange={onFilterChange} />
          </div>

          <div className="flex items-center gap-3">
            {incidentMode && (
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" title="Incident mode active" />
            )}
            <span className="text-xs text-surface-500 font-mono hidden sm:inline">
              updated {timeAgo}
            </span>
            <button onClick={onRefresh} className="btn-ghost p-2 text-xs" title="Refresh now">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-surface-400">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
            <button onClick={onExport} className="btn-ghost p-2 text-xs" title="Export data">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-surface-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <FilterBar active={filterStatus} onChange={onFilterChange} />
        </div>
      </div>
    </header>
  );
}

import FilterBar from './FilterBar';

export default function Header({
  incidentMode,
  filterStatus,
  onFilterChange,
  onExport,
  onRefresh,
  searchQuery,
  onSearchChange,
}) {
  return (
    <header className="sticky top-0 z-10 bg-surface-950/80 backdrop-blur-lg border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-base font-bold text-surface-100 tracking-tight">Pulseboard</h1>
              <p className="text-[10px] text-surface-500 font-mono">Observability Dashboard</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-surface-900 border border-surface-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-pulse-500/40 focus:border-pulse-500/50"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <FilterBar active={filterStatus} onChange={onFilterChange} />
          </div>

          <div className="flex items-center gap-2">
            {incidentMode && (
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" title="Incident mode active" />
            )}
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

        <div className="md:hidden pb-3 space-y-3">
          <div className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-surface-900 border border-surface-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-pulse-500/40 focus:border-pulse-500/50"
            />
          </div>
          <FilterBar active={filterStatus} onChange={onFilterChange} />
        </div>
      </div>
    </header>
  );
}

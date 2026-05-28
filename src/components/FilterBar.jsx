import { STATUS_FILTERS } from '../utils/constants';

const filters = [
  { key: STATUS_FILTERS.ALL, label: 'All Services' },
  { key: STATUS_FILTERS.HEALTHY, label: 'Healthy' },
  { key: STATUS_FILTERS.DEGRADED, label: 'Degraded' },
  { key: STATUS_FILTERS.FAILING, label: 'Failing' },
];

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150
            ${active === f.key
              ? 'bg-pulse-600/20 text-pulse-400 border border-pulse-600/30'
              : 'text-surface-400 hover:text-surface-200 border border-transparent'}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

import ServiceCard from './ServiceCard';

export default function ServiceGrid({ services, selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((svc) => (
        <ServiceCard
          key={svc.id}
          service={svc}
          selected={selectedId === svc.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

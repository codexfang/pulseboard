export default function IncidentBanner() {
  return (
    <div className="bg-danger/10 border border-danger/20 rounded-xl px-5 py-3 flex items-center gap-3 animate-pulse">
      <span className="w-3 h-3 rounded-full bg-danger" />
      <div>
        <p className="text-sm font-semibold text-danger">Incident Detected</p>
        <p className="text-xs text-danger/80">Elevated error rates across monitored services</p>
      </div>
    </div>
  );
}

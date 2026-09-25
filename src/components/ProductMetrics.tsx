import { banknoteWindow, coinzyWindow, METRICS_WINDOW } from "@/lib/product-metrics";

function MetricList({
  title,
  accent,
  rows,
}: {
  title: string;
  accent: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5">
      <p className="flex items-center gap-2 font-medium">
        <span className="size-2.5 rounded-full" style={{ background: accent }} />
        {title}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{METRICS_WINDOW}</p>
      <ul className="mt-4 space-y-2">
        {rows.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium tabular-nums">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductMetrics() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <MetricList title="Banknote" accent="#30ED9D" rows={banknoteWindow} />
      <MetricList title="Coinzy" accent="#c9787a" rows={coinzyWindow} />
    </div>
  );
}

import { trackzioApps } from "@/lib/trackzio-apps";

export function TrackzioApps() {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {trackzioApps
        .filter((app) => app.name === "Coinzy" || app.name === "Banknote")
        .map((app) => (
        <li key={app.name}>
          <a
            href={app.href}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-border bg-card p-4 transition hover:border-primary"
          >
            <span className="flex items-center gap-3">
              <img src={app.logo} alt="" className="size-12 shrink-0 rounded-xl object-cover" />
              <span className="min-w-0">
                <span className="block truncate font-medium">{app.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{app.blurb}</span>
              </span>
            </span>
            <span className="mt-4 grid grid-cols-3 gap-2 text-center">
              <span>
                <span className="block font-display text-lg leading-none">{app.downloads}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-wide text-muted-foreground">Downloads</span>
              </span>
              <span>
                <span className="block font-display text-lg leading-none">{app.rating}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-wide text-muted-foreground">Rating</span>
              </span>
              <span>
                <span className="block font-display text-lg leading-none">{app.dau}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-wide text-muted-foreground">Daily users</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

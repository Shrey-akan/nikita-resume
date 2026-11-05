import { trackzioApps } from "@/lib/trackzio-apps";

export function TrackzioApps() {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {trackzioApps.map((app) => (
        <li key={app.name}>
          <a
            href={app.href}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-border bg-card/90 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <span className="flex items-center gap-3">
              <img src={app.logo} alt="" className="size-12 shrink-0 rounded-xl object-cover" />
              <span className="min-w-0">
                <span className="block truncate font-medium">{app.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{app.blurb}</span>
              </span>
            </span>
            <span className="mt-3 block text-xs leading-relaxed text-muted-foreground">{app.features.join(" · ")}</span>
            <span className="mt-4 grid grid-cols-2 gap-2">
              <span>
                <span className="block font-display text-lg leading-none">UI/UX</span>
                <span className="mt-1 block text-[10px] uppercase tracking-wide text-muted-foreground">Role</span>
              </span>
              <span>
                <span className="block truncate font-display text-lg leading-none">{app.expert}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-wide text-muted-foreground">Review</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

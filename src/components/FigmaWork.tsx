import { figmaFiles, posters } from "@/lib/figma-work";

export function FigmaWork() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {figmaFiles.map((file) => (
          <a
            key={file.href}
            href={file.href}
            target="_blank"
            rel="noreferrer"
            className="lift-card group flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-card p-5"
          >
            <span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">Figma</span>
              <span className="mt-2 block font-display text-2xl leading-tight text-heading group-hover:text-primary">{file.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-subheading">{file.note}</span>
            </span>
            <span className="mt-5 inline-flex w-fit rounded-full border border-border px-3 py-1 text-xs">
              {"action" in file && file.action ? file.action : "Open in Figma"}
            </span>
          </a>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {posters.map((poster) => (
          <figure key={poster.src} className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src={poster.src} alt={poster.title} loading="lazy" decoding="async" className="max-h-[34rem] w-full bg-surface object-contain" />
            <figcaption className="flex items-baseline justify-between gap-3 px-4 py-3">
              <span className="font-display text-xl text-heading">{poster.title}</span>
              <span className="text-xs text-subheading">{poster.line}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

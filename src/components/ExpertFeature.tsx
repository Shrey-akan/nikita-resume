const desks = [
  {
    name: "Banknote",
    object: "A bill",
    logo: "/apps/banknotes-logo.png",
    href: "https://play.google.com/store/apps/details?id=com.trackzio.banknote&pcampaignid=web_share",
    summary: "The camera frames a note. Expert review is a separate surface for that same object.",
  },
  {
    name: "Coinzy",
    object: "A coin",
    logo: "/apps/coinzy-logo.png",
    href: "https://play.google.com/store/apps/details?id=com.coinzy.trackzio",
    summary: "Capture is built around both faces. Expert review uses those same two photographs.",
  },
  {
    name: "Antiqzy",
    object: "An object",
    logo: "/apps/antiqzy-logo.png",
    href: "https://play.google.com/store/apps/details?id=com.trackzio.antiquevintage&pcampaignid=web_share",
    summary: "Identification and expert review are written for an antique, not copied from the note or coin products.",
  },
  {
    name: "Rockzy",
    object: "A specimen",
    logo: "/apps/rockzy-logo-new.png",
    href: "https://trackzio.com/apps/rockzy",
    summary: "The result and the expert review both describe the specimen in the frame.",
  },
];

export function ExpertFeature() {
  return (
    <div className="space-y-4">
      {desks.map((desk) => (
        <article key={desk.name} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={desk.logo} alt="" className="size-11 rounded-xl object-cover" />
              <div>
                <h3 className="font-display text-2xl leading-none">{desk.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desk.object}</p>
              </div>
            </div>
            <a
              href={desk.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-3 py-1 text-xs hover:text-primary"
            >
              {desk.name}
            </a>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{desk.summary}</p>
        </article>
      ))}
    </div>
  );
}

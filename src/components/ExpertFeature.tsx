const shell = ["Queue", "Drafts", "History", "My Profile"];
const admin = ["Experts", "Users", "Reports", "Allocation", "Refunds", "Settings"];

const desks = [
  {
    name: "Banknote",
    object: "A bill",
    logo: "/apps/banknotes-logo.png",
    hrefs: [
      { label: "Expert desk", href: "https://experts.banknotes-experts.qaserver.trackzio.com" },
      { label: "Admin desk", href: "https://admin.banknotes-experts.qaserver.trackzio.com" },
    ],
    sections: [
      { title: "General", fields: "Name, denomination, issuer, year, period, printer, type" },
      { title: "Physical", fields: "Material, size, shape, colour, printing method, orientation" },
      { title: "Design", fields: "Obverse, reverse, history, watermark, signature, serial number" },
      { title: "Market", fields: "Price range, rarity, in circulation, demand, price trend" },
      { title: "Assessment", fields: "Authenticity, condition, errors, holding period, conclusion" },
    ],
  },
  {
    name: "Coinzy",
    object: "A coin",
    logo: "/apps/coinzy-logo.png",
    hrefs: [
      { label: "Queue", href: "https://coinzy-experts-dashboard.trackzio.com/expert/queue" },
      { label: "Coinzy", href: "https://trackzio.com/apps/coinzy" },
    ],
    sections: [
      { title: "General", fields: "Coin name, denomination, issuer, year of minting, mint location" },
      { title: "Physical", fields: "Material, weight, colour, minting method" },
      { title: "Design", fields: "Obverse and reverse, then the history of the type" },
      { title: "Market", fields: "Price range and rarity" },
      { title: "Assessment", fields: "Authenticity, Sheldon condition, errors, recommendation" },
    ],
  },
  {
    name: "Antiqzy",
    object: "An object",
    logo: "/apps/antiqzy-logo.png",
    hrefs: [{ label: "Antiqzy", href: "https://trackzio.com/apps/antiqzy" }],
    sections: [
      { title: "General", fields: "Item, category, period, origin, maker, serial, hand-crafted or machine-made" },
      { title: "Look", fields: "Materials, colour, marks and inscriptions, style" },
      { title: "Condition", fields: "Overall condition, visible restoration, story and symbolism" },
      { title: "Market", fields: "Copies in the world, value range, demand, where to sell" },
      { title: "Advice", fields: "Authenticity, grade, confidence, and the reasoning" },
    ],
  },
  {
    name: "Rockzy",
    object: "A specimen",
    logo: "/apps/rockzy-logo-new.png",
    hrefs: [{ label: "Rockzy", href: "https://trackzio.com/apps/rockzy" }],
    sections: [
      { title: "Identity", fields: "Common name, category, where it is found" },
      { title: "Physical", fields: "Crystal system, colour, transparency, lustre, tenacity, density" },
      { title: "Behaviour", fields: "Radioactivity, magnetism, chemical formula" },
      { title: "Care", fields: "Durability, store separately, cleaning method" },
      { title: "Value", fields: "Condition, rarity, commercial availability, market value, conclusion" },
    ],
  },
];

export function ExpertFeature() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Expert</p>
          <p className="mt-2 text-sm leading-relaxed">{shell.join(" · ")}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            A row shows the object, the request, a status, and a live deadline. A new offer can be skipped back to the pool or opened. Work already started continues from the same row.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Admin</p>
          <p className="mt-2 text-sm leading-relaxed">{admin.join(" · ")}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Allocation, refunds, and the expert roster stay on the admin desk. They are not mixed into the appraisal form.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
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
              <div className="flex flex-wrap gap-2">
                {desk.hrefs.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1 text-xs hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {desk.sections.map((section) => (
                <div key={section.title} className="rounded-xl bg-surface px-3 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">{section.title}</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-foreground/85">{section.fields}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

const dropoffs = [
  { point: "First image", rate: "~20%", change: "One helper line, heads and tails art, back instead of close, red and green focus rings, 30 free scans instead of Tips." },
  { point: "Cropping", rate: "~10%", change: "Pinch to fit the coin. Tick sits centre-bottom. Retake sits bottom-left." },
  { point: "Second image", rate: "~17%", change: "Same capture guidance, plus two helper designs: a tooltip or a popup that tells the user to flip the coin." },
  { point: "Top 5", rate: "~25%", change: "A directing heading, a new result card, and a primary View Details button." },
];

const navApproaches = [
  {
    name: "Current",
    bar: "Home, Collection, Camera, Marketplace, Feed",
    note: "Five icons. Identification is the centre camera.",
  },
  {
    name: "Approach 1",
    bar: "Home, Collection, Camera, Marketplace, Experts, Global Catalogue",
    note: "Six icons, with Feed promoted elsewhere. The bar gets crowded, so Feed stays off the bar.",
  },
  {
    name: "Approach 2",
    bar: "Home, Collection, Marketplace, Experts, Feed",
    note: "Identify becomes a floating action. Of every 100 people who start a scan, 47 finish from the home banner and 42 from the bottom nav.",
  },
  {
    name: "Approach 3",
    bar: "Home, Collection, Identification, Experts, More",
    note: "Marketplace, Feed, and Global Catalogue sit inside More. Cleaner, one extra tap.",
  },
  {
    name: "Approach 4",
    bar: "Home, Collection, Camera, Marketplace, Experts, Feed",
    note: "Global Catalogue leaves the bar and opens from search: coins, countries, years.",
  },
];

export function ProductDesignNotes() {
  return (
    <div className="space-y-10">
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Coinzy · Experiments</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Three tests on the live product</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Paywall, identification, and bottom navigation. Each one names the change, the variants, and what has to move before it ships.
        </p>

        <article className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Experiment 1</p>
          <h3 className="mt-2 font-display text-2xl">Continue Free</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The free path is a Skip in the top-left. The test replaces it with a secondary button under the trial, so people who do not want to subscribe can continue without hunting. Success is more people entering the product, without a real drop in payers or revenue.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-surface p-4">
              <p className="font-medium">Variant 1 · Current</p>
              <p className="mt-2 text-sm text-muted-foreground">Primary: Try free for 7 days. Free path: Skip, top-left.</p>
            </div>
            <div className="rounded-xl bg-surface p-4">
              <p className="font-medium">Variant 2 · Continue Free</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Primary: Start 7-Day Free Trial. Secondary, under it: Continue Free, or Continue with Free plan, or Continue with Limited access. The rest of the paywall stays.
              </p>
            </div>
          </div>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Events</dt>
              <dd className="mt-1 text-muted-foreground">Pack click, subscription completed, Start 7-Day Free Trial clicked, free trial enabled, Continue Free clicked.</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Read</dt>
              <dd className="mt-1 text-muted-foreground">Free-path continuation, subscription conversion, revenue, D1 retention, D4–D7 retention. Guardrails: revenue and paywall drop-off.</dd>
            </div>
          </dl>
        </article>

        <article className="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Identification</p>
          <h3 className="mt-2 font-display text-2xl">Heads, crop, tails, then the top 5</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Homepage, first capture, first crop, second capture, second crop, review, loading, top 5, details. Variant A and Variant B share the new UI. The only split is the second-image helper: a tooltip, or a popup.
          </p>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {dropoffs.map((row) => (
              <li key={row.point} className="grid gap-2 py-3 sm:grid-cols-[9rem_4rem_1fr] sm:items-baseline">
                <span className="font-medium">{row.point}</span>
                <span className="font-mono text-sm text-primary">{row.rate}</span>
                <span className="text-sm text-muted-foreground">{row.change}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Review drops the live camera once both photos exist and shows larger heads and tails, with Submit Photos and Retake Photos. Back from each step returns to the previous capture, crop, or the top 5, not a dead end. The test wins if drop-off falls at these four points, more crops finish, the better helper lifts the second photo, and View Details plus add-to-collection rise.
          </p>
        </article>

        <article className="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Navigation</p>
          <h3 className="mt-2 font-display text-2xl">Where Identify sits</h3>
          <ul className="mt-5 space-y-4">
            {navApproaches.map((item) => (
              <li key={item.name} className="grid gap-1 border-b border-border pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[8rem_1fr]">
                <p className="font-medium">{item.name}</p>
                <div>
                  <p className="text-sm">{item.bar}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">All expert products</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">One brand, a deeper shade</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Expert review extends identification. It stays in the product’s colour family. A new hue is for a separate brand, not for this feature. Mobile and the expert web portal follow the same rule.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-xl">Give a feature its own shade when</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>It is a new workflow or a place people return to.</li>
              <li>It needs to be recognised quickly, or it should feel more trusted.</li>
              <li>A darker shade fits payment, membership, and expert review. A lighter shade fits guides.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-xl">Keep the primary colour when</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>The screen is a dialog, an empty state, or a small change.</li>
              <li>The feature continues the same flow, the way Ask AI and community posts do in Plantzy.</li>
              <li>The shade is used on the feature header, icon, and its own buttons, not on the global navigation.</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}

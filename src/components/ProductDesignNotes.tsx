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
    <div className="mt-16 space-y-16">
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
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Banknote · Expert report</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">A bill, not a coin</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The note desk uses the same queue shape as Coinzy and a different report. Admin stays on its own screens.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-xl">What the expert writes</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Name, denomination, issuer, year, period, printer, and type.</li>
              <li>Watermark, signature, and serial number.</li>
              <li>Obverse and reverse, condition, authenticity.</li>
              <li>Holding period, yearly growth, where to sell, and a conclusion.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-xl">Two desks</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Expert: queue, drafts, history, profile. Skip or open a request. Deadline on the row.</li>
              <li>Admin: experts, users, reports, allocation, refunds, settings.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <a className="rounded-full border border-border px-3 py-1 hover:text-primary" href="https://experts.banknotes-experts.qaserver.trackzio.com" target="_blank" rel="noreferrer">Expert desk</a>
              <a className="rounded-full border border-border px-3 py-1 hover:text-primary" href="https://admin.banknotes-experts.qaserver.trackzio.com" target="_blank" rel="noreferrer">Admin desk</a>
            </div>
          </article>
        </div>
      </section>

      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Insecto · Expert assessment</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Safety, garden, or the species</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A coin report sells grade and value. An insect report tells someone what it is and what to do. The user picks a concern, or receives one unified note.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            ["Safety and risk", "Bite, sting, toxicity, disease, first aid, and what to do next. For a home, a child, or a pet."],
            ["Crop and garden", "Pest or beneficial, the damage, a treatment, and how to stop it coming back."],
            ["Species verification", "Confirmed species, rarity, conservation, ecological role, habitat, and look-alikes."],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
        <article className="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-display text-xl">Unified report, four fields</h3>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Every report still opens with an expert summary, the species, physical traits, recommendations, and a PDF. The body is four fields, and only what applies to that insect is filled in.
          </p>
          <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <li><span className="font-medium">1. Species.</span> <span className="text-muted-foreground">Confirmed or likely name, the marks that decide it, confidence.</span></li>
            <li><span className="font-medium">2. Risk.</span> <span className="text-muted-foreground">People and pets, bite or sting, disease, what to do if bitten.</span></li>
            <li><span className="font-medium">3. Impact.</span> <span className="text-muted-foreground">Pest or beneficial, plants or the house, how serious the infestation is.</span></li>
            <li><span className="font-medium">4. Next step.</span> <span className="text-muted-foreground">Immediate action, a home remedy, removal, prevention, and conservation if it matters.</span></li>
          </ol>
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

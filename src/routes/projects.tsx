import { createFileRoute } from "@tanstack/react-router";
import { ProductDesignNotes } from "@/components/ProductDesignNotes";
import { ProductMetrics } from "@/components/ProductMetrics";
import { ProfileNav } from "@/components/ProfileNav";
import { banknoteLive, coinzyLive } from "@/lib/product-metrics";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Case studies — Nikita Nautiyal" },
      {
        name: "description",
        content:
          "Case studies for Banknote, Coinzy, expert desks, and earlier product work by Nikita Nautiyal.",
      },
      { property: "og:title", content: "Case studies — Nikita Nautiyal" },
    ],
  }),
  component: Projects,
});

const shipped = [
  {
    name: "Banknote",
    logo: "/apps/banknotes-logo.png",
    shot: "/apps/banknotes-shot.png",
    line: "The camera frames a bill. Onboarding, the free scan, and the result all speak about a note.",
    points: ["Both images, shutter or gallery", "Free-scan limit hit by 1.9% of attempts", "Result shows denomination and security marks"],
    stats: banknoteLive,
    links: [
      { label: "Product", href: "https://trackzio.com/apps/banknotes" },
      { label: "App Store", href: "https://apps.apple.com/us/app/banknote-identification-ai/id6747063766" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.trackzio.banknote" },
    ],
  },
  {
    name: "Coinzy",
    logo: "/apps/coinzy-logo.png",
    shot: "/apps/coinzy-shot.png",
    line: "Capture starts on two faces. Heads, tails, the quota screen, and the result are Coinzy’s own.",
    points: ["Heads and tails are two crops", "Free-scan limit hit by 27.3% of attempts", "Result is coin details, grade, and value"],
    stats: coinzyLive,
    links: [
      { label: "Product", href: "https://trackzio.com/apps/coinzy" },
      { label: "App Store", href: "https://apps.apple.com/us/app/coinzy-coin-ai-identification/id6752857760" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.coinzy.trackzio" },
    ],
  },
];

const studies = [
  {
    n: "01",
    title: "112 Emergency",
    tag: "Public service · India",
    desc: "An audit of the emergency journey, then a redesign of SOS, location, and response navigation.",
    bullets: [
      "Audited 10+ screens covering 90% of the core journey.",
      "Found 12 usability issues and resolved 65% of the high-friction interactions.",
      "Redesigned 6 flows and cut confusion by 35%. The prototype has 50+ screens.",
    ],
  },
  {
    n: "02",
    title: "Genuinest",
    tag: "Social · iOS",
    desc: "Onboarding through messaging, specified as a Figma system a team can extend.",
    bullets: [
      "50+ screens: onboarding, feed, reels, profile, messaging, and settings.",
      "Compared 5+ social products before the system was drawn.",
      "Wireframes, a prototype, and a reusable component set.",
    ],
  },
  {
    n: "03",
    title: "Music player",
    tag: "Streaming · Prototype",
    desc: "Home, discovery, playlists, and the player, with a component set for the listening session.",
    bullets: [
      "7+ screens across home, discovery, playlists, and the player.",
      "8 sections restructured, with section clarity up 40%.",
      "12 genre cards, 30+ components, and 10+ micro-interactions.",
    ],
  },
  {
    n: "04",
    title: "Smoothie carousel",
    tag: "Interface prototype",
    desc: "A reusable decision module for four smoothie variants.",
    bullets: [
      "6 layouts tested for hierarchy.",
      "12+ states for selection, transition, and feedback. Decision friction down 30%.",
      "One prototype, with flow efficiency up 25%.",
    ],
  },
];

const desks = [
  {
    name: "Banknote",
    logo: "/apps/banknotes-logo.png",
    report: "Denomination, printer, watermark, signature, serial number, both sides, and a holding note.",
    links: [
      { label: "Expert desk", href: "https://experts.banknotes-experts.qaserver.trackzio.com" },
      { label: "Admin", href: "https://admin.banknotes-experts.qaserver.trackzio.com" },
    ],
  },
  {
    name: "Coinzy",
    logo: "/apps/coinzy-logo.png",
    report: "Both faces, rarity, Sheldon condition, authenticity, and a written recommendation. Skip or continue from the queue.",
    links: [{ label: "Queue", href: "https://coinzy-experts-dashboard.trackzio.com/expert/queue" }],
  },
  {
    name: "Antiqzy",
    logo: "/apps/antiqzy-logo.png",
    report: "Period, origin, maker, hand-crafted or machine-made, marks, restoration, and how many copies exist.",
    links: [{ label: "Antiqzy", href: "https://trackzio.com/apps/antiqzy" }],
  },
  {
    name: "Rockzy",
    logo: "/apps/rockzy-logo-new.png",
    report: "Crystal system, lustre, chemical formula, radioactivity, cleaning, durability, and market value.",
    links: [{ label: "Rockzy", href: "https://trackzio.com/apps/rockzy" }],
  },
  {
    name: "Insecto",
    logo: "/apps/insecto-logo.png",
    report: "Four fields: species, risk, impact, and the next step. Safety, garden, or a species check.",
    links: [{ label: "Insecto", href: "https://trackzio.com/apps/insecto" }],
  },
];

function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Case studies</p>
      <h1 className="mt-4 font-display text-4xl leading-[0.95] sm:text-6xl">Selected work</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Shipped apps, earlier studies, and the expert desks. Each block is one kind of work.
      </p>
      <ProfileNav className="mt-8" />

      <section className="mt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">01 · Shipped</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Banknote and Coinzy</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {shipped.map((product) => (
            <article key={product.name} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="grid gap-4 min-[480px]:grid-cols-[7rem_1fr]">
                <img src={product.shot} alt="" className="mx-auto h-40 w-auto object-contain" />
                <div>
                  <div className="flex items-center gap-3">
                    <img src={product.logo} alt="" className="size-10 rounded-xl object-cover" />
                    <h3 className="font-display text-2xl">{product.name}</h3>
                  </div>
                  <dl className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      ["Downloads", product.stats.downloads],
                      ["Rating", product.stats.rating],
                      ["Daily users", product.stats.dailyUsers],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                        <dd className="font-display text-xl">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.line}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/85">
                {product.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-1 text-xs hover:text-primary">
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4">
          <ProductMetrics />
        </div>
      </section>

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">02 · Studies</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Earlier product work</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {studies.map((study) => (
            <article key={study.n} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{study.n} · {study.tag}</p>
              <h3 className="mt-2 font-display text-2xl">{study.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{study.desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {study.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">03 · Web</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Expert desks</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          The same shell — queue, drafts, history, profile — and a different report for each object. Admin stays off the expert screen.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {desks.map((desk) => (
            <article key={desk.name} className="flex flex-col rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <img src={desk.logo} alt="" className="size-10 rounded-xl object-cover" />
                <h3 className="font-display text-xl">{desk.name}</h3>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{desk.report}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {desk.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="rounded-full bg-secondary px-3 py-1 text-xs hover:text-primary">
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">04 · Tests</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Coinzy experiments</h2>
        <div className="mt-6">
          <ProductDesignNotes />
        </div>
      </section>
    </div>
  );
}

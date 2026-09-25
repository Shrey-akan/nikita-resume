import { createFileRoute } from "@tanstack/react-router";
import { ProfileNav } from "@/components/ProfileNav";
import { ProductDesignNotes } from "@/components/ProductDesignNotes";
import { ProductMetrics } from "@/components/ProductMetrics";
import { TrackzioApps } from "@/components/TrackzioApps";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Case studies — Nikita Nautiyal" },
      {
        name: "description",
        content:
          "UI/UX case studies: Banknote AI, Coinzy, 112 Emergency, Genuinest, and product prototypes.",
      },
      { property: "og:title", content: "Case studies — Nikita Nautiyal" },
    ],
  }),
  component: Projects,
});

const projects = [
  {
    n: "01",
    title: "Banknote",
    tag: "Banknotes · Mobile & web",
    logo: "/apps/banknotes-logo.png",
    shot: "/apps/banknotes-shot.png",
    desc: "A separate product for paper money. The camera frames a bill, and the catalogue, value, and expert review all speak about notes.",
    bullets: [
      "Over the 30 days ending 26 Aug 2026, Banknote averaged 169 daily opens and a 81.7% identify success rate. The free-scan limit was hit by 1.9% of scan attempts.",
      "Expert evaluation is a note review: request, images of the bill, and a written result.",
      "Bottom navigation keeps scan, collection, and expert one tap apart, then maps onto the web app.",
    ],
    links: [
      { label: "Banknote", href: "https://trackzio.com/apps/banknotes" },
      { label: "Expert desk", href: "https://experts.banknotes-experts.qaserver.trackzio.com" },
      { label: "Admin desk", href: "https://admin.banknotes-experts.qaserver.trackzio.com" },
      { label: "App Store", href: "https://apps.apple.com/us/app/banknote-identification-ai/id6747063766" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.trackzio.banknote" },
    ],
    stack: ["PRD", "Figma", "Notes", "Camera", "Expert"],
  },
  {
    n: "02",
    title: "Coinzy",
    tag: "Coins · Mobile & web",
    logo: "/apps/coinzy-logo.png",
    shot: "/apps/coinzy-shot.png",
    desc: "A separate product for coins. The capture step shows heads and tails, and expert appraisal is part of the coin journey.",
    bullets: [
      "Over the same 30 days, Coinzy averaged 586 daily opens and 10,112 installs. 27.3% of scan attempts hit the free-scan limit, so the quota state is part of the Coinzy camera design.",
      "The expert web app is a separate desk: a queue of coin requests, drafts, history, and a profile. Each row shows both faces, the deadline, and Skip or View Request. The report covers obverse, reverse, rarity, Sheldon condition, and authenticity.",
      "The journey rhymes with Banknote, but the screens, copy, and object are Coinzy’s.",
    ],
    links: [
      { label: "Coinzy", href: "https://trackzio.com/apps/coinzy" },
      { label: "Expert portal", href: "https://coinzy-experts-dashboard.trackzio.com/expert/queue" },
      { label: "App Store", href: "https://apps.apple.com/us/app/coinzy-coin-ai-identification/id6752857760" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.coinzy.trackzio" },
    ],
    stack: ["PRD", "Figma", "Coins", "Heads & tails", "Expert"],
  },
  {
    n: "03",
    title: "112 Emergency",
    tag: "Government app · India",
    desc: "A product audit and redesign of India’s 112 emergency journey, focused on speed and clarity when people are under stress.",
    bullets: [
      "Audited 10+ screens covering onboarding, emergency trigger, alerts, and post-action states, addressing 90% of the core journey.",
      "Found 12 critical usability issues that slowed people down, and resolved 65% of the high-friction interactions.",
      "Redesigned 6 primary flows — SOS trigger, location confirmation, and response navigation — cutting user confusion by 35%.",
      "Delivered an interactive prototype with 50+ screens. Reviews dropped to 2 structured rounds and rework time fell by 30%.",
    ],
    stack: ["Product audit", "User flows", "Prototyping", "Emergency UX"],
  },
  {
    n: "04",
    title: "Genuinest",
    tag: "Social · iOS",
    desc: "End-to-end UI/UX for a social media application, from research through a reusable design system.",
    bullets: [
      "Designed 50+ high-fidelity screens, including onboarding, home feed, reels, profile, messaging, and settings.",
      "Compared 5+ social platforms to improve usability and content discovery.",
      "Built wireframes, interactive prototypes, and a Figma design system for visual consistency.",
    ],
    stack: ["Figma", "iOS", "Design system", "Interaction design"],
  },
  {
    n: "05",
    title: "Music streaming",
    tag: "App design · Prototype",
    desc: "A music product covering home, discovery, playlists, and the player, built to feel like a real listening session.",
    bullets: [
      "Designed 7+ screens across home, discovery, playlists, and player views.",
      "Restructured hierarchy across 8 sections, improving clarity and discoverability by 40%.",
      "Introduced 12 genre discovery cards, improving first-action relevance by 35%.",
      "Built 30+ reusable components and 10+ micro-interactions for flow continuity from discovery to playback.",
    ],
    stack: ["Information architecture", "Components", "Micro-interactions"],
  },
  {
    n: "06",
    title: "Smoothie carousel",
    tag: "UI/UX prototype",
    desc: "An interactive carousel for four smoothie variants, designed as a reusable decision-making module.",
    bullets: [
      "Explored 6 layout variations to tighten visual hierarchy and navigation.",
      "Built 12+ interaction states for selection, transitions, and feedback, reducing decision friction by 30%.",
      "Delivered one polished prototype that improved overall flow efficiency by 25%.",
    ],
    stack: ["Carousel UI", "Interaction states", "Reusable component"],
  },
  {
    n: "07",
    title: "Antiqzy expert desk",
    desk: true,
    tag: "Antiques · Web",
    logo: "/apps/antiqzy-logo.png",
    desc: "An appraisal desk for antiques, separate from the note and coin products.",
    bullets: [
      "Queue, drafts, history, and profile for the expert. Admin is a second product: experts, users, reports, allocation, refunds, requests, and settings.",
      "The form asks for period, origin, maker, whether the piece is hand-crafted or machine-made, and marks or inscriptions.",
      "Condition includes visible restoration. Value is a range, with rarity, copies in the world, demand, and where to sell.",
    ],
    links: [{ label: "Antiqzy", href: "https://trackzio.com/apps/antiqzy" }],
    stack: ["Queue", "Appraisal form", "Admin"],
  },
  {
    n: "08",
    title: "Rockzy expert desk",
    desk: true,
    tag: "Minerals · Web",
    logo: "/apps/rockzy-logo-new.png",
    desc: "A specimen review desk for rocks and minerals, with its own admin.",
    bullets: [
      "Same desk shape as the other expert products: queue, drafts, history, profile, and an admin for allocation and reports.",
      "The report records crystal system, color, transparency, lustre, tenacity, density, and chemical formula.",
      "It also covers radioactivity, magnetism, how to store and clean the specimen, durability, condition, rarity, and market value.",
    ],
    links: [{ label: "Rockzy", href: "https://trackzio.com/apps/rockzy" }],
    stack: ["Queue", "Specimen form", "Admin"],
  },
];

function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Case studies</p>
      <h1 className="mt-4 font-display text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">Selected work</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Android, iOS, desktop, web, and product design. Each study is a flow, a system, and a prototype.
      </p>
      <ProfileNav className="mt-8 mb-10" />

      <section className="mb-10">
        <h2 className="font-display text-3xl sm:text-4xl">Two products, designed apart</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Banknote and Coinzy share a journey shape — onboarding, a free scan, bottom navigation, camera, then expert — and none of the screens are copied across.
        </p>
        <div className="mt-5">
          <TrackzioApps />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.4rem] border border-border bg-card p-5">
            <h3 className="font-display text-2xl">Banknote screens</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><span className="text-foreground">Onboarding.</span> First-run screens, then the subscription page only after the scan is understood.</li>
              <li><span className="text-foreground">Free scan.</span> The first identification stays open. In the last 30 days only 1.9% of scan attempts hit the limit.</li>
              <li><span className="text-foreground">Bottom navigation.</span> Identify, collection, and expert sit in the bar. The scan cohort starts from the Identify tab or the home banner.</li>
              <li><span className="text-foreground">Camera.</span> The frame is a bill. The flow asks for both images, from the shutter or the gallery, then submit.</li>
              <li><span className="text-foreground">Result.</span> Top matches, then the note detail: denomination, security marks, and history.</li>
              <li><span className="text-foreground">Expert web app.</span> Queue, drafts, history, and profile on the <a href="https://experts.banknotes-experts.qaserver.trackzio.com" className="underline underline-offset-2" target="_blank" rel="noreferrer">expert desk</a>. The report covers watermark, signature, serial number, and both sides of the note. Operations sit on a separate <a href="https://admin.banknotes-experts.qaserver.trackzio.com" className="underline underline-offset-2" target="_blank" rel="noreferrer">admin desk</a>: experts, users, reports, allocation, refunds, and settings. Identify success in this window was 81.7%.</li>
            </ul>
          </article>
          <article className="rounded-[1.4rem] border border-border bg-card p-5">
            <h3 className="font-display text-2xl">Coinzy screens</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><span className="text-foreground">Onboarding.</span> Logo, five value slides, login, then the notification ask, before the camera.</li>
              <li><span className="text-foreground">Free scan.</span> The quota is a real screen. 27.3% of scan attempts exhausted the free successes, with blocked, go-premium, and not-now states.</li>
              <li><span className="text-foreground">Bottom navigation.</span> The Identify tab is separate from the home banner, so those two entries are designed as different cohorts.</li>
              <li><span className="text-foreground">Camera.</span> The funnel starts in the camera, not the nav. Heads and tails are two crops, then the photo after each crop.</li>
              <li><span className="text-foreground">Result.</span> Coin details, not a banknote page: both faces, grade, and value.</li>
              <li><span className="text-foreground">Expert web app.</span> Queue, drafts, history, and profile at the <a href="https://coinzy-experts-dashboard.trackzio.com/expert/queue" className="underline underline-offset-2" target="_blank" rel="noreferrer">Coinzy expert portal</a>. A row shows both faces, the deadline, and Skip or View Request. The report covers obverse, reverse, rarity, and Sheldon condition. Identify success in this window was 59.7%.</li>
            </ul>
          </article>
        </div>
        <div className="mt-8">
          <ProductMetrics />
        </div>
        <ProductDesignNotes />
      </section>

      <div className="space-y-5">
        {projects.filter((project) => !("desk" in project && project.desk)).map((project) => (
          <article key={project.n} className="rounded-[1.6rem] border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-4 min-[520px]:flex-row min-[520px]:items-start">
              {"shot" in project && project.shot ? (
                <img
                  src={project.shot}
                  alt=""
                  className="mx-auto h-52 w-auto shrink-0 rounded-2xl object-contain min-[520px]:mx-0"
                />
              ) : null}
              <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              {project.n} — {project.tag}
            </p>
            <h2 className="mt-3 flex items-center gap-3 font-display text-3xl sm:text-4xl">
              {"logo" in project && project.logo ? (
                <img src={project.logo} alt="" className="size-11 rounded-xl object-cover sm:size-12" />
              ) : null}
              {project.title}
            </h2>
            {"links" in project && project.links ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-secondary px-3 py-1 text-xs hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
            <p className="mt-4 max-w-3xl text-muted-foreground">{project.desc}</p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-border px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Web apps</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Expert desks</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Banknote and Coinzy are above. Antiqzy and Rockzy are their own desks, with their own reports.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {projects
            .filter((project) => "desk" in project && project.desk)
            .map((project) => (
              <article key={project.n} className="rounded-[1.6rem] border border-border bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-primary">{project.tag}</p>
                <h3 className="mt-3 flex items-center gap-3 font-display text-2xl">
                  {"logo" in project && project.logo ? (
                    <img src={project.logo} alt="" className="size-10 rounded-xl object-cover" />
                  ) : null}
                  {project.title}
                </h3>
                {"links" in project && project.links ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-secondary px-3 py-1 text-xs hover:text-primary"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ExpertFeature } from "@/components/ExpertFeature";
import { ProfileNav } from "@/components/ProfileNav";
export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Nikita Nautiyal" },
      {
        name: "description",
        content: "UI/UX design for Banknote, Coinzy, Antiqzy, and Rockzy expert desks, plus Genuinest.",
      },
      { property: "og:title", content: "Experience — Nikita Nautiyal" },
    ],
  }),
  component: Experience,
});

const jobs = [
  {
    role: "UI/UX Designer",
    company: "Banknote",
    location: "Mobile and web · Trackzio",
    period: "PRD & UI",
    logo: "/apps/banknotes-logo.png",
    bullets: [
      "Designed Banknote on its own: a bill in the camera, onboarding, a free scan, and bottom navigation.",
      "Expert evaluation is a note review, separate from the coin product.",
    ],
    stack: ["Figma", "PRD", "Notes", "Expert"],
    links: [
      { label: "Banknote", href: "https://trackzio.com/apps/banknotes" },
      { label: "Expert desk", href: "https://experts.banknotes-experts.qaserver.trackzio.com" },
      { label: "Admin desk", href: "https://admin.banknotes-experts.qaserver.trackzio.com" },
      { label: "App Store", href: "https://apps.apple.com/us/app/banknote-identification-ai/id6747063766" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.trackzio.banknote" },
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Banknote Expert Portal",
    desk: true,
    location: "Web app · Trackzio",
    period: "Expert desk + admin",
    logo: "/apps/banknotes-logo.png",
    bullets: [
      "Designed the note desk experts use after a Banknote user asks for a review, and a separate admin desk for the same product.",
      "The expert shell is Queue, Drafts, History, and My Profile. A row shows the note, the request, status, and a live deadline, with Skip or View Request.",
      "The report is written for a bill: denomination, printer, watermark, signature, serial number, obverse and reverse, condition, and a holding recommendation.",
      "The admin shell covers experts, users, reports, allocation, refunds, and settings, so operations and appraisal stay on different screens.",
    ],
    stack: ["Web app", "Queue", "Admin", "Figma"],
    links: [
      { label: "Expert desk", href: "https://experts.banknotes-experts.qaserver.trackzio.com" },
      { label: "Admin desk", href: "https://admin.banknotes-experts.qaserver.trackzio.com" },
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Coinzy",
    location: "Mobile and web · Trackzio",
    period: "PRD & UI",
    logo: "/apps/coinzy-logo.png",
    bullets: [
      "Designed Coinzy on its own: heads and tails in the camera, onboarding, a free scan, and bottom navigation.",
      "Expert appraisal is a coin review, with both faces and condition.",
    ],
    stack: ["Figma", "PRD", "Coins", "Expert"],
    links: [
      { label: "Coinzy", href: "https://trackzio.com/apps/coinzy" },
      { label: "Expert portal", href: "https://coinzy-experts-dashboard.trackzio.com/expert/queue" },
      { label: "App Store", href: "https://apps.apple.com/us/app/coinzy-coin-ai-identification/id6752857760" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.coinzy.trackzio" },
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Coinzy Expert Portal",
    desk: true,
    location: "Web app · Trackzio",
    period: "Expert desk",
    logo: "/apps/coinzy-logo.png",
    bullets: [
      "Designed the web desk experts use after a Coinzy user asks for an appraisal: https://coinzy-experts-dashboard.trackzio.com/expert/queue",
      "The shell is Queue, Drafts, History, and My Profile. The queue lists each coin with both faces, a request id, status, and a live deadline.",
      "A new offer can be skipped back to the pool or opened. Work already started continues from the same row.",
      "The evaluation form covers identity, obverse and reverse, rarity, Sheldon condition, authenticity, and a written recommendation.",
    ],
    stack: ["Web app", "Queue", "Evaluation form", "Figma"],
    links: [
      { label: "Open the queue", href: "https://coinzy-experts-dashboard.trackzio.com/expert/queue" },
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Antiqzy Expert Portal",
    desk: true,
    location: "Web app · Trackzio",
    period: "Expert desk + admin",
    logo: "/apps/antiqzy-logo.png",
    bullets: [
      "Designed the antique appraisal desk and its admin, as its own product from the note and coin desks.",
      "Experts work from Queue, Drafts, History, and My Profile. Admin covers experts, users, reports, allocation, refunds, requests, and settings.",
      "The report is written for an object: period, origin, maker, hand-crafted or machine-made, marks and inscriptions, restoration, and how many copies exist.",
      "Value is a range, with rarity, current demand, where to sell, authenticity, and a grade.",
    ],
    stack: ["Web app", "Queue", "Antiques", "Admin"],
    links: [{ label: "Antiqzy", href: "https://trackzio.com/apps/antiqzy" }],
  },
  {
    role: "UI/UX Designer",
    company: "Rockzy Expert Portal",
    desk: true,
    location: "Web app · Trackzio",
    period: "Expert desk + admin",
    logo: "/apps/rockzy-logo-new.png",
    bullets: [
      "Designed the mineral desk experts use to review a specimen, plus the admin desk for the same product.",
      "The shell matches the other desks in navigation only: Queue, Drafts, History, and My Profile. The form does not.",
      "A review records common name, category, crystal system, color, transparency, lustre, density, and chemical formula.",
      "Care and commerce sit on the same report: radioactivity, magnetism, cleaning, durability, condition, rarity, and market value.",
    ],
    stack: ["Web app", "Queue", "Minerals", "Admin"],
    links: [{ label: "Rockzy", href: "https://trackzio.com/apps/rockzy" }],
  },
  {
    role: "UI/UX Designer",
    company: "Insecto Expert Assessment",
    location: "Expert report · Trackzio",
    period: "Expert design",
    desk: true,
    logo: "/apps/insecto-logo.png",
    bullets: [
      "An insect report is not a value appraisal. The user is usually checking a risk at home or in a garden, or confirming a specimen.",
      "Three paths: safety and risk, crop and garden protection, or species verification. A unified report can cover all four fields and only fill what applies.",
      "The four fields are species, risk, impact, and the next step, with a PDF. Expert review stays in the product colour, a deeper shade, not a new brand colour.",
    ],
    stack: ["Expert report", "Safety", "Garden", "Species"],
    links: [{ label: "Insecto", href: "https://trackzio.com/apps/insecto" }],
  },
  {
    role: "UI/UX Designer",
    company: "Genuinest",
    location: "iOS application",
    period: "Product design",
    bullets: [
      "Designed a full-scale social media application with a focus on user-centric flows, usability, and visual consistency.",
      "Led the process from research and wireframing through high-fidelity UI and interaction design.",
      "Shipped 50+ high-fidelity screens, including onboarding, home feed, reels, profile, messaging, and settings.",
      "Ran UX research and competitive analysis across 5+ social platforms to improve usability and content discovery.",
      "Built wireframes, interactive prototypes, and a reusable design system in Figma.",
    ],
    stack: ["Figma", "iOS", "User research", "Design systems", "Prototyping"],
  },
];

function JobCards({ items }: { items: typeof jobs }) {
  return (
    <div className="space-y-4">
      {items.map((job) => (
        <article key={job.company} className="rounded-[1.6rem] border border-border bg-card p-5 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="flex items-center gap-3 font-display text-2xl sm:text-3xl">
              {"logo" in job && job.logo ? (
                <img src={job.logo} alt="" className="size-10 rounded-xl object-cover" />
              ) : null}
              {job.company}
            </h2>
            <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
          </div>
          <p className="mt-2 text-primary">
            {job.role} <span className="text-muted-foreground">· {job.location}</span>
          </p>
          {"links" in job && job.links ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {job.links.map((link) => (
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
          ) : null}
          <ul className="mt-6 space-y-3 text-muted-foreground">
            {job.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {job.stack.map((item) => (
              <span key={item} className="rounded-full bg-secondary px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Experience</p>
      <h1 className="mt-4 font-display text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">Product work</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Product design for Banknote, Coinzy, Antiqzy, and Rockzy, including each expert desk, plus Genuinest.
      </p>
      <ProfileNav className="mt-8 mb-12" />

      <JobCards items={jobs.filter((job) => !("desk" in job && job.desk))} />

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Web apps</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Expert desks</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Taken from the expert web apps. Queue and admin are shared. The form sections are not.
        </p>
        <div className="mt-6">
          <ExpertFeature />
        </div>
        <div className="mt-4">
          <JobCards items={jobs.filter((job) => job.company === "Insecto Expert Assessment")} />
        </div>
      </section>

      <div className="mt-16 grid gap-4 md:grid-cols-2">
        <section className="rounded-[1.6rem] bg-surface p-6">
          <h2 className="font-display text-2xl">Education</h2>
          <p className="mt-4 font-medium">Bachelor of CSE · CGPA 7.6 / 10</p>
          <p className="text-sm text-muted-foreground">Chandigarh University</p>
          <p className="mt-4 font-medium">Class XII · 91% · Top 10%</p>
          <p className="text-sm text-muted-foreground">Saint Dominic Savio College</p>
          <p className="mt-4 font-medium">Class X · 94% · Top 5%</p>
          <p className="text-sm text-muted-foreground">Saint Dominic Savio College</p>
        </section>
        <section className="rounded-[1.6rem] bg-foreground p-6 text-background">
          <h2 className="font-display text-2xl">Also on the record</h2>
          <p className="mt-4 text-sm leading-relaxed opacity-90">
            Outreach executive at AIT Traids Club and sports captain at SDSC. Gold medal in the
            state-level mathematics olympiad, with a top 15 rank across the state.
          </p>
        </section>
      </div>
    </div>
  );
}

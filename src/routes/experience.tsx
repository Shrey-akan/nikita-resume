import { createFileRoute } from "@tanstack/react-router";
import { DownloadResumeButton } from "@/components/DownloadDocs";
import { ExpertFeature } from "@/components/ExpertFeature";
import { ProfileNav } from "@/components/ProfileNav";
export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Nikita Nautiyal" },
      {
        name: "description",
        content:
          "Associate Product Designer at Trackzio, UX/UI at Genuinest, and a web design internship at Setumesh.",
      },
      { property: "og:title", content: "Experience — Nikita Nautiyal" },
    ],
  }),
  component: Experience,
});

const jobs = [
  {
    role: "Associate Product Designer",
    company: "Trackzio",
    location: "Bengaluru · Mobile and web",
    period: "04/2026 – Present",
    logo: "/apps/coinzy-logo.png",
    bullets: [
      "Led end-to-end UI/UX for mobile and web products, including Banknote and Coinzy.",
      "Ran user research, simplified workflows, and documented reusable UI systems in Figma.",
      "Designed interaction flows for subscription, expert evaluation, and the expert portal on web and mobile.",
      "Built a few of the web apps in React, with CRUD and basic OAuth. The public site is trackzio.com.",
    ],
    stack: ["Figma", "UI/UX", "React.js", "Wireframing", "Prototyping"],
    links: [{ label: "trackzio.com", href: "https://trackzio.com" }],
  },
  {
    role: "UX and UI Designer",
    company: "Genuinest",
    location: "iOS · Play Store",
    period: "09/2025 – 03/2026",
    bullets: [
      "Developed 50+ high-fidelity screens: onboarding, feed, reels, profiles, messaging, and settings.",
      "Ran user, product, and competitor research, then journeys, wireframes, and interaction flows.",
      "Took concepts through to prototypes and worked with developers on implementation and UI validation.",
      "Launched the product on the Play Store.",
    ],
    stack: ["Figma", "UI/UX", "Design systems", "Prototyping"],
  },
  {
    role: "Web Designer",
    company: "Setumesh",
    location: "Internship",
    period: "3 months",
    bullets: [
      "Contributed to a modern, responsive website.",
      "Focused on user experience, visual hierarchy, intuitive navigation, and a consistent UI.",
    ],
    stack: ["UI/UX", "Responsive design", "Web"],
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
          <p className="mt-2 text-subheading">
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
        Associate Product Designer at Trackzio since April 2026. Before that, UX and UI at Genuinest, and a web design internship at Setumesh.
      </p>
      <div className="mt-6">
        <DownloadResumeButton />
      </div>
      <ProfileNav className="mt-8 mb-12" />

      <JobCards items={jobs} />

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Web apps</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Expert desks</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          End-to-end UI for the expert portal, on web and mobile. Each review is written for the object.
        </p>
        <div className="mt-6">
          <ExpertFeature />
        </div>
      </section>

      <div className="mt-16 grid gap-4 md:grid-cols-2">
        <section className="rounded-[1.6rem] bg-surface p-6">
          <h2 className="font-display text-2xl">Education</h2>
          <p className="mt-4 font-medium">B.Tech / B.E. · Computer Science and Engineering</p>
          <p className="text-sm text-muted-foreground">Chandigarh University, Mohali · 2026</p>
          <p className="mt-4 font-medium">Class XII · 91%</p>
          <p className="text-sm text-muted-foreground">CISCE (ICSE/ISC) · English · 2021</p>
          <p className="mt-4 font-medium">Class X · 94%</p>
          <p className="text-sm text-muted-foreground">CISCE (ICSE/ISC) · English · 2019</p>
        </section>
        <section className="rounded-[1.6rem] bg-foreground p-6 text-background">
          <h2 className="font-display text-2xl text-background">Selected results</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed opacity-90">
            <li>Live Genuinest onboarding, shipped on the Play Store.</li>
            <li>App icons and store listings for 4 live Trackzio apps.</li>
            <li>In-app UX work tied to a 15% rise in overall user retention.</li>
            <li>Product content and AI video, 90k+ views across Facebook, TikTok, and YouTube.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

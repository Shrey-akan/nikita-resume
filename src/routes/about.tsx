import { createFileRoute } from "@tanstack/react-router";
import { DownloadDocs } from "@/components/DownloadDocs";
import { ProfileNav } from "@/components/ProfileNav";
import { PROFILE } from "@/lib/resume";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: seoMeta(
      "About Nikita Nautiyal | UI/UX Product Designer",
      "About Nikita Nautiyal, associate product designer in Bengaluru. UI/UX for Trackzio and Genuinest, Figma systems, and React.js.",
    ),
  }),
  component: About,
});

const certifications = [
  {
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    kind: "Certificate",
  },
  {
    title: "Build Wireframes and Low-Fidelity Prototypes",
    issuer: "Google",
    kind: "Certificate",
  },
];

const achievements = [
  {
    title: "Live Genuinest onboarding",
    detail: "Onboarding UI for the live app, then a Play Store launch.",
  },
  {
    title: "Four live store listings",
    detail: "App icons and store screenshots for Trackzio apps on Google Play and the App Store.",
  },
  {
    title: "15% higher retention",
    detail: "AI identification UX, from research and funnel review through the redesigned journey.",
  },
  {
    title: "90k+ views",
    detail: "Product content and AI video across Facebook, TikTok, and YouTube.",
  },
  {
    title: "Expert portal",
    detail: "End-to-end UI for the expert dashboard on web and mobile.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">About</p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
        Associate product designer for mobile and web.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        UI/UX design and frontend handovers. Research, prototyping, wireframes, and scalable
        design systems in Figma, with React.js for a few of the web apps.
      </p>
      <ProfileNav className="mt-8" />

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground lg:col-span-2 sm:text-lg">
          <p>
            Associate Product Designer at Trackzio since April 2026, in Bengaluru. The work covers{" "}
            <a href="https://trackzio.com/apps/banknotes" className="text-foreground underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
              Banknote
            </a>{" "}
            and{" "}
            <a href="https://trackzio.com/apps/coinzy" className="text-foreground underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
              Coinzy
            </a>
            : onboarding, camera identification, and expert review, on mobile and web. A few web apps on{" "}
            <a href="https://trackzio.com" className="text-foreground underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
              trackzio.com
            </a>{" "}
            are built in React, with CRUD and basic OAuth.
          </p>
          <p>
            From September 2025 to March 2026, UX and UI for Genuinest: 50+ screens from onboarding
            through messaging, then a Play Store launch.
          </p>
          <p>
            Before that, a three-month web design internship at Setumesh: a responsive site with a
            clear hierarchy and a consistent interface.
          </p>
          <p>
            Frontend knowledge alongside the design work: React.js, HTML, CSS, and JavaScript. Also
            content creation, video editing, and generative AI.
          </p>
        </div>
        <aside className="rounded-2xl border border-border bg-card p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Contact</p>
          <a href={`mailto:${PROFILE.email}`} className="mt-3 block break-all text-sm hover:text-primary">
            {PROFILE.email}
          </a>
          <a href={PROFILE.phoneHref} className="mt-1 block text-sm hover:text-primary">
            {PROFILE.phone}
          </a>
          <a href={PROFILE.linkedin} className="mt-1 block text-sm hover:text-primary" target="_blank" rel="noreferrer">
            linkedin.com/in/nikitades
          </a>
          <p className="mt-1 text-sm text-muted-foreground">{PROFILE.location}</p>
          <div className="my-6 h-px bg-border" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Education</p>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="font-display text-lg leading-snug">B.Tech / B.E. · Computer Science and Engineering</dt>
              <dd className="mt-1 text-sm text-muted-foreground">Chandigarh University, Mohali · 2026</dd>
            </div>
            <div>
              <dt className="font-display text-lg leading-snug">Class XII · 91%</dt>
              <dd className="mt-1 text-sm text-muted-foreground">CISCE (ICSE/ISC) · English · 2021</dd>
            </div>
            <div>
              <dt className="font-display text-lg leading-snug">Class X · 94%</dt>
              <dd className="mt-1 text-sm text-muted-foreground">CISCE (ICSE/ISC) · English · 2019</dd>
            </div>
          </dl>
          <div className="my-6 h-px bg-border" />
          <DownloadDocs className="flex-col" />
        </aside>
      </div>

      <section className="mt-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Profile</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Credentials</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Google UX certificates, and selected product work from the resume.
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <header className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <h3 className="font-display text-lg">Certifications</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">02</span>
          </header>
          <ul>
            {certifications.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-2 border-b border-border px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div>
                  <p className="font-medium leading-snug">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.kind}</p>
                </div>
                <p className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-foreground">{item.issuer}</p>
              </li>
            ))}
          </ul>

          <header className="flex items-baseline justify-between gap-4 border-y border-border bg-surface/60 px-5 py-4 sm:px-6">
            <h3 className="font-display text-lg">Selected work</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">05</span>
          </header>
          <ul>
            {achievements.map((item) => (
              <li key={item.title} className="border-b border-border px-5 py-4 last:border-b-0 sm:px-6">
                <p className="font-medium leading-snug">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>

          <div className="border-t border-border bg-surface/40 px-5 py-4 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Also</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              English and Hindi. Video editing, sketching, and AI content generation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

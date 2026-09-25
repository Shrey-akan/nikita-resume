import { createFileRoute } from "@tanstack/react-router";
import { DownloadDocs } from "@/components/DownloadDocs";
import { ProfileNav } from "@/components/ProfileNav";
import { PROFILE } from "@/lib/resume";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nikita Nautiyal" },
      {
        name: "description",
        content:
          "About Nikita Nautiyal, UI/UX designer. Education, certifications, leadership, and creative work.",
      },
      { property: "og:title", content: "About — Nikita Nautiyal" },
    ],
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

const roles = [
  { title: "Outreach Executive", org: "AIT Traids Club" },
  { title: "Sports Captain", org: "SDSC Sports Club" },
];

const recognition = [
  {
    label: "Academic",
    items: [
      "Gold medal, state mathematics olympiad",
      "Top 15 in the state",
    ],
  },
  {
    label: "Athletics",
    items: [
      "Five college medals: table tennis, relay, long jump, triple jump, softball",
      "2nd place, school badminton championship",
    ],
  },
  {
    label: "Competitions",
    items: [
      "2nd runners-up, sketching",
      "Winner, school buzzer quiz",
      "Runners-up, B-quiz, SDS",
      "Winner, chess, Yalgaar",
      "3rd, poetry, Kagaz Ki Kashti",
    ],
  },
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">About</p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
        Product design for shipped consumer apps.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        UI/UX designer working from research through high-fidelity prototypes. The work is
        flows, systems, and interfaces that a product team can build.
      </p>
      <ProfileNav className="mt-8" />

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground lg:col-span-2 sm:text-lg">
          <p>
            At Trackzio,{" "}
            <a href="https://trackzio.com/apps/banknotes" className="text-foreground underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
              Banknote
            </a>{" "}
            and{" "}
            <a href="https://trackzio.com/apps/coinzy" className="text-foreground underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
              Coinzy
            </a>{" "}
            are separate products. One identifies a banknote. The other identifies a coin,
            including both faces. Each has its own onboarding, scan limit, camera, result, and
            expert review, on mobile and web.
          </p>
          <p>
            Genuinest is an independent social product: onboarding, feed, reels, profile,
            messaging, and settings, specified in Figma as a system rather than a set of screens.
          </p>
          <p>
            Alongside product work, the novel <span className="text-foreground">Errica</span> is
            in progress (2024–present), with short stories and poetry.
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
          <div className="my-6 h-px bg-border" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Education</p>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="font-display text-lg leading-snug">Bachelor of Computer Science and Engineering</dt>
              <dd className="mt-1 text-sm text-muted-foreground">Chandigarh University · CGPA 7.6 / 10</dd>
            </div>
            <div>
              <dt className="font-display text-lg leading-snug">Higher secondary · 91%</dt>
              <dd className="mt-1 text-sm text-muted-foreground">Saint Dominic Savio College · Top 10%</dd>
            </div>
            <div>
              <dt className="font-display text-lg leading-snug">Secondary · 94%</dt>
              <dd className="mt-1 text-sm text-muted-foreground">Saint Dominic Savio College · Top 5%</dd>
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
            Formal training, roles held, and selected recognition.
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
            <h3 className="font-display text-lg">Leadership</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">02</span>
          </header>
          <ul className="grid sm:grid-cols-2">
            {roles.map((role) => (
              <li key={role.title} className="border-b border-border px-5 py-5 sm:px-6 sm:[&:nth-child(odd)]:border-r">
                <p className="font-display text-xl leading-tight">{role.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{role.org}</p>
              </li>
            ))}
          </ul>

          <header className="flex items-baseline justify-between gap-4 border-b border-border bg-surface/60 px-5 py-4 sm:px-6">
            <h3 className="font-display text-lg">Recognition</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Academic · Athletics · Competitions</span>
          </header>
          <div className="grid md:grid-cols-3">
            {recognition.map((group) => (
              <div key={group.label} className="border-b border-border px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:px-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{group.label}</p>
                <ul className="mt-3 space-y-2.5 text-sm leading-snug text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item} className="text-foreground/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-surface/40 px-5 py-4 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Practice</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              Sketching, art and literature, and cooking. Literary work includes the novel Errica,
              short stories, and poetry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

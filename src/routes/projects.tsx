import { createFileRoute } from "@tanstack/react-router";
import { ExpertFeature } from "@/components/ExpertFeature";
import { FigmaWork } from "@/components/FigmaWork";
import { ProfileNav } from "@/components/ProfileNav";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Case studies — Nikita Nautiyal" },
      {
        name: "description",
        content:
          "UI/UX case studies: role, process, and deliverables for Banknote, Coinzy, 112, Genuinest, and earlier product work.",
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
    line: "AI currency identification. Onboarding, camera scanning, and a structured result, specified in Figma.",
    points: ["User flows, wireframes, and high-fidelity mobile UI", "Onboarding and camera-based scanning", "Development-ready UI specifications"],
    stats: [
      ["Role", "UI/UX"],
      ["Deliverable", "Flows + UI"],
    ],
    links: [
      { label: "Product", href: "https://trackzio.com/apps/banknotes" },
      { label: "App Store", href: "https://apps.apple.com/us/app/banknote-identification-ai/id6747063766" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.trackzio.banknote&pcampaignid=web_share" },
    ],
  },
  {
    name: "Coinzy",
    logo: "/apps/coinzy-logo.png",
    shot: "/apps/coinzy-shot.png",
    line: "AI coin identification. Camera-based scanning, onboarding, and reusable result components in Figma.",
    points: ["Camera-based coin scanning", "Onboarding and identification results", "Reusable UI components"],
    stats: [
      ["Role", "UI/UX"],
      ["Deliverable", "Flows + UI"],
    ],
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
    title: "Genuinest",
    tag: "Social · Play Store",
    desc: "50+ screens from onboarding through messaging, then a Play Store launch.",
    bullets: [
      "Role: UX and UI designer, September 2025 to March 2026.",
      "User, product, and competitor research, then journeys, wireframes, and flows.",
      "Deliverable: prototypes, developer validation, and the live onboarding UI.",
    ],
  },
  {
    n: "02",
    title: "112 Emergency",
    tag: "Public service · India",
    desc: "An audit of the emergency journey, then a redesign of SOS, location, and response navigation.",
    href: "https://www.figma.com/design/SBny0dJeByGXA7DOpwlZix/112?node-id=275-1822",
    proto: "https://www.figma.com/proto/SBny0dJeByGXA7DOpwlZix/112?node-id=235-739&scaling=min-zoom&content-scaling=fixed&page-id=219%3A74",
    bullets: [
      "Role: UI/UX audit and redesign.",
      "Audited 10+ screens covering 90% of the core journey and found 12 usability issues.",
      "Redesigned 6 flows. Deliverable: an interactive prototype of 50+ screens.",
    ],
  },
  {
    n: "03",
    title: "Music player",
    tag: "Streaming · Prototype",
    desc: "Home, discovery, playlists, and the player, with a component set for the listening session.",
    href: "https://www.figma.com/design/qmvVXGEwSXx4OyYsiEiS6p/Music-App?node-id=0-1",
    bullets: [
      "Role: UI/UX for a listening session, not a single screen.",
      "Restructured 8 sections across home, discovery, playlists, and the player.",
      "Deliverable: 30+ components, 12 genre cards, and 10+ micro-interactions.",
    ],
  },
  {
    n: "04",
    title: "Smoothie carousel",
    tag: "Interface prototype",
    desc: "A reusable decision module for four smoothie variants.",
    bullets: [
      "Role: interaction design for a repeated choice.",
      "Tested 6 layouts, then specified 12+ states for selection, transition, and feedback.",
      "Deliverable: one prototype of the decision module.",
    ],
  },
];

function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Case studies</p>
      <h1 className="mt-4 font-display text-4xl leading-[0.95] sm:text-6xl">Selected work</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Each study names the role, the problem, and what was delivered: flows, UI, and a Figma file a team can build from.
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
                  <dl className="mt-4 grid grid-cols-2 gap-2">
                    {product.stats.map(([label, value]) => (
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
      </section>

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">02 · Studies</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Genuinest and other studies</h2>
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
              {"href" in study && study.href ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={study.href} target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-border px-3 py-1 text-xs hover:text-primary">
                    Open in Figma
                  </a>
                  {"proto" in study && study.proto ? (
                    <a href={study.proto} target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-border px-3 py-1 text-xs hover:text-primary">
                      Open prototype
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">03 · Projects</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Projects and posters</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Music App, the 112 frame, and WOKSPACE open in Figma. The posters sit beside them.
        </p>
        <div className="mt-6">
          <FigmaWork />
        </div>
      </section>

      <section className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">04 · Web</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Expert desks</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Four products. Expert review is written for the object in front of the camera.
        </p>
        <div className="mt-6">
          <ExpertFeature />
        </div>
      </section>

    </div>
  );
}

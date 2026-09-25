import { createFileRoute, Link } from "@tanstack/react-router";
import { DownloadDocs } from "@/components/DownloadDocs";
import { ProductMetrics } from "@/components/ProductMetrics";
import { formatBlogDate } from "@/lib/blog";
import { banknoteLive, coinzyLive } from "@/lib/product-metrics";
import { PROFILE } from "@/lib/resume";
import { getBlogIndex } from "@/server/blogs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nikita Nautiyal — UI/UX Designer" },
      {
        name: "description",
        content:
          "Portfolio of Nikita Nautiyal, a UI/UX designer focused on user research, clear flows, and high-fidelity product prototypes.",
      },
      { property: "og:title", content: "Nikita Nautiyal — UI/UX Designer" },
      {
        property: "og:description",
        content:
          "UI/UX designer experienced in user research, structured problem-solving, and intuitive digital products.",
      },
    ],
  }),
  loader: () => getBlogIndex(),
  component: Index,
});

const products = [
  {
    name: "Banknote",
    logo: "/apps/banknotes-logo.png",
    shot: "/apps/banknotes-shot.png",
    href: "https://trackzio.com/apps/banknotes",
    line: "A paper note in frame. Security marks, denomination, and a catalogue of bills.",
    stats: banknoteLive,
  },
  {
    name: "Coinzy",
    logo: "/apps/coinzy-logo.png",
    shot: "/apps/coinzy-shot.png",
    href: "https://trackzio.com/apps/coinzy",
    line: "A coin with two faces. Heads and tails, value, and an in-app expert appraisal.",
    stats: coinzyLive,
  },
];

const studies = [
  {
    n: "01",
    title: "Banknote",
    meta: "Currency · Mobile & web",
    blurb: "The camera frames a bill. Experts then review it on a web desk, with a separate admin desk for allocation and reports.",
    logo: "/apps/banknotes-logo.png",
    shot: "/apps/banknotes-shot.png",
    facts: [
      { label: "Identify success", value: "81.7%" },
      { label: "Free-scan limit", value: "1.9%" },
      { label: "Scope", value: "PRD + UI" },
    ],
  },
  {
    n: "02",
    title: "Coinzy",
    meta: "Coins · Mobile & web",
    blurb: "Capture starts on two faces. Experts then work the coin in a web queue: both faces, a deadline, and a written appraisal.",
    logo: "/apps/coinzy-logo.png",
    shot: "/apps/coinzy-shot.png",
    facts: [
      { label: "Identify success", value: "59.7%" },
      { label: "Free-scan limit", value: "27.3%" },
      { label: "Scope", value: "PRD + UI" },
    ],
  },
  {
    n: "03",
    title: "112 Emergency",
    meta: "Public service · India",
    blurb: "An audit of the emergency journey, then a redesign of SOS, location, and response navigation.",
    facts: [
      { label: "Issues found", value: "12" },
      { label: "Flows redesigned", value: "6" },
      { label: "Confusion", value: "−35%" },
    ],
  },
  {
    n: "04",
    title: "Genuinest",
    meta: "Social · iOS",
    blurb: "Onboarding through messaging, specified as a Figma system a team can extend.",
    facts: [
      { label: "Screens", value: "50+" },
      { label: "Platforms studied", value: "5+" },
      { label: "System", value: "Figma" },
    ],
  },
  {
    n: "05",
    title: "Music player",
    meta: "Streaming · Prototype",
    blurb: "Home, discovery, playlists, and the player, with a component set for the listening session.",
    facts: [
      { label: "Screens", value: "7+" },
      { label: "Section clarity", value: "+40%" },
      { label: "Components", value: "30+" },
    ],
  },
];

function Index() {
  const { blogOfTheDay } = Route.useLoaderData();

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-end gap-8 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[1.4fr_0.8fr] lg:pt-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">UI / UX designer</p>
          <h1 className="mt-4 font-display text-[2.75rem] leading-[0.9] min-[380px]:text-5xl sm:text-7xl lg:text-8xl">
            Nikita
            <span className="block text-primary">Nautiyal</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I turn user needs into clear flows, scalable interface systems, and high-fidelity prototypes.
            Research, structure, and iteration come before the polish.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              View case studies
            </Link>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex max-w-full break-all rounded-full border border-border px-5 py-3 text-sm"
            >
              {PROFILE.email}
            </a>
          </div>
        </div>
        <aside className="rounded-[1.6rem] border border-border bg-card p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Currently</p>
          <p className="mt-3 font-display text-2xl leading-tight sm:text-3xl">Two products, two objects</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {products.map((product) => (
              <a
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary"
              >
                <img src={product.logo} alt="" className="size-6 rounded-md object-cover" />
                {product.name}
              </a>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Banknote frames a bill. Coinzy frames a coin, including heads and tails. Expert review is
            designed separately for each Trackzio app.
          </p>
          <div className="mt-6">
            <DownloadDocs />
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-display text-3xl sm:text-4xl">Banknote and Coinzy</h2>
          <a href="https://trackzio.com/" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary">
            trackzio.com
          </a>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noreferrer"
              className="grid grid-cols-1 gap-4 rounded-[1.6rem] border border-border bg-card p-4 min-[480px]:grid-cols-[7.5rem_1fr] sm:p-6"
            >
              <img
                src={product.shot}
                alt=""
                className="mx-auto h-44 w-auto rounded-2xl object-contain min-[480px]:h-full min-[480px]:max-h-56"
              />
              <span>
                <span className="flex items-center gap-3">
                  <img src={product.logo} alt="" className="size-11 rounded-xl object-cover" />
                  <span className="font-display text-2xl">{product.name}</span>
                </span>
                <span className="mt-3 grid grid-cols-3 gap-2">
                  <span>
                    <span className="block font-display text-xl">{product.stats.downloads}</span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Downloads</span>
                  </span>
                  <span>
                    <span className="block font-display text-xl">{product.stats.rating}</span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Rating</span>
                  </span>
                  <span>
                    <span className="block font-display text-xl">{product.stats.dailyUsers}</span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Daily users</span>
                  </span>
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">{product.line}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-4">
          <ProductMetrics />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Index</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">Selected studies</h2>
          </div>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary">
            All work
          </Link>
        </div>
        <div className="border-t border-border">
          {studies.map((study) => (
            <Link
              key={study.n}
              to="/projects"
              className="group grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-4 border-b border-border py-6 transition-colors hover:bg-card sm:grid-cols-[3rem_1fr] sm:gap-x-6 sm:px-4 md:grid-cols-[3rem_1fr_8.5rem] md:items-center"
            >
              <span className="pt-1 font-mono text-xs text-muted-foreground">{study.n}</span>
              <span className="min-w-0">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {study.meta}
                </span>
                <span className="mt-1 flex items-center gap-3">
                  {study.logo ? (
                    <img src={study.logo} alt="" className="size-8 rounded-lg object-cover" />
                  ) : null}
                  <span className="font-display text-2xl leading-tight transition-colors group-hover:text-primary sm:text-3xl">
                    {study.title}
                  </span>
                </span>
                <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {study.blurb}
                </span>
                <span className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {study.facts.map((fact) => (
                    <span key={fact.label}>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {fact.label}
                      </span>
                      <span className="mt-0.5 block font-display text-lg leading-none">{fact.value}</span>
                    </span>
                  ))}
                </span>
              </span>
              {study.shot ? (
                <img
                  src={study.shot}
                  alt=""
                  className="col-start-2 h-36 w-auto justify-self-start rounded-xl bg-surface object-contain p-2 sm:h-40 md:col-start-auto md:h-32 md:justify-self-end"
                />
              ) : (
                <span className="col-start-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary md:col-start-auto md:justify-self-end">
                  View
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {blogOfTheDay ? (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-4xl">Journal note</h2>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">
              All notes
            </Link>
          </div>
          <Link
            to="/blog/$slug"
            params={{ slug: blogOfTheDay.slug }}
            className="grid overflow-hidden rounded-[1.6rem] border border-border bg-card md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                {formatBlogDate(blogOfTheDay.publishedAt || blogOfTheDay.createdAt)}
              </p>
              <h3 className="mt-3 font-display text-3xl">{blogOfTheDay.title}</h3>
              <p className="mt-3 text-muted-foreground">{blogOfTheDay.excerpt}</p>
            </div>
            {blogOfTheDay.coverThumb ? (
              <img src={blogOfTheDay.coverThumb} alt="" className="h-full min-h-48 w-full object-cover" />
            ) : (
              <div className="min-h-48 bg-secondary" />
            )}
          </Link>
        </section>
      ) : null}
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import { PROFILE } from "@/lib/resume";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nikita Nautiyal — Associate Product Designer" },
      {
        name: "description",
        content:
          "Nikita Nautiyal, Associate Product Designer in Bengaluru. UI/UX for Trackzio and Genuinest, with React.js frontend handovers.",
      },
      { property: "og:title", content: "Nikita Nautiyal — Associate Product Designer" },
      {
        property: "og:description",
        content:
          "Associate Product Designer in Bengaluru. UI/UX for Trackzio and Genuinest, with React.js frontend handovers.",
      },
    ],
  }),
  component: Index,
});

const work = [
  {
    title: "Trackzio apps",
    position: "Associate Product Designer",
    image: "/work/trackzio-thumb.jpg",
    href: "https://trackzio.com/#apps",
  },
  {
    title: "Genuinest",
    position: "UX and UI Designer",
    image: "/work/genuinest-thumb.jpg",
    href: "https://genuinest.com/",
  },
  {
    title: "Setumesh",
    position: "Web Designer",
    image: "/work/setumesh-thumb.jpg",
    href: "https://setu-mesh.vercel.app/",
  },
];

const skills = [
  "UI/UX",
  "UI/UX testing",
  "Wireframing",
  "Prototyping",
  "Responsive design",
  "Journey mapping",
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Generative AI",
  "Content creation",
  "Video editing",
];

const tools = [
  { name: "Figma", icon: "/tools/figma.svg" },
  { name: "Behance", icon: "/tools/behance.svg" },
  { name: "Framer", icon: "/tools/framer.svg" },
  { name: "Adobe Premiere", icon: "/tools/premiere.svg" },
  { name: "Canva", icon: "/tools/canva.svg" },
];

const projects = [
  {
    title: "112 Emergency",
    line: "SOS, location, and response",
    image: "/work/112-thumb.jpg",
    href: "https://www.figma.com/proto/SBny0dJeByGXA7DOpwlZix/112?node-id=235-739&p=f&viewport=395%2C151%2C0.04&t=CAIw7D6gde8tpHkH-1&scaling=min-zoom&content-scaling=fixed&page-id=219%3A74",
  },
  {
    title: "Music player",
    line: "Home, discovery, and the player",
    image: "/work/music-thumb.jpg",
    href: "https://www.figma.com/proto/qmvVXGEwSXx4OyYsiEiS6p/Music-App?node-id=266-498&p=f&viewport=-214%2C164%2C0.08&t=DEfbH1pjOrdfOVHB-1&scaling=scale-down-width&content-scaling=fixed&page-id=133%3A2060",
  },
  {
    title: "Wokspace",
    line: "Habit tracker",
    image: "/work/wokspace-thumb.jpg?v=2",
    href: "https://www.figma.com/design/c09c82RdpY1uEP1vlQNzHt/WOKSPACE?node-id=0-1&t=5NyZoN5Cick7y90y-1",
  },
  {
    title: "Chatbot",
    line: "Chat assistant",
    image: "/work/chatbot-thumb.jpg?v=2",
    href: "https://www.figma.com/design/GhuAyaFiJ59WX6lQabx2da/Chatbot?node-id=0-1&t=mDK3sn88WMlkU0Jm-1",
  },
  {
    title: "PETAPP",
    line: "Dog app",
    image: "/work/petapp-thumb.jpg",
    href: "https://www.figma.com/design/u5WTOC8nazj7TtnoDHggsG/DOG-APP?node-id=84-99&t=sIXIpNBczPKd4kJq-1",
  },
  {
    title: "Smoothie Web",
    line: "Smoothie website",
    image: "/work/smoothie-thumb.jpg",
    href: "https://www.figma.com/proto/vKKx0rfIDwI9boHVuXL7KY/Smoothie-crousel?node-id=2-5&p=f&viewport=33%2C255%2C0.1&t=xLRoUXVmWC9AejLK-1&scaling=contain&content-scaling=fixed&page-id=0%3A1",
  },
];

const posters = [
  {
    title: "Nike",
    line: "Air Force poster",
    image: "/work/nike-airforce.jpg",
    href: "https://www.figma.com/proto/ki8BnfPITG4bB2tYPZbD1g/Nike-Poster-Design?node-id=3-2&p=f&viewport=43%2C258%2C0.2&t=XUXltn9O5ZRIWBM2-1&scaling=contain&content-scaling=fixed&page-id=0%3A1",
  },
  {
    title: "WireX",
    line: "Limited edition poster",
    image: "/work/wirex.jpg",
    href: "https://www.figma.com/proto/UUSy2FBTtfhLNxWPAGBi4O/HeadPhone-Poster?node-id=4-16&viewport=120%2C204%2C0.12&t=UURYuRASl6OFM2xT-1&scaling=contain&content-scaling=fixed&page-id=0%3A1",
  },
];

const achievements = [
  {
    title: "Live Genuinest onboarding",
    detail: "Onboarding UI for the live app, then a Play Store launch.",
  },
  {
    title: "Four live store listings",
    detail: "App icons and store screenshots for the Trackzio apps.",
  },
  {
    title: "15% higher retention",
    detail: "Identification journey, from research through the redesigned flow.",
  },
  {
    title: "90k+ views",
    detail: "Product content and AI video for the Trackzio apps.",
  },
  {
    title: "Expert portal",
    detail: "End-to-end UI for expert review on web and mobile.",
  },
];

const languages = ["English", "Hindi"];

const education = [
  {
    title: "B.Tech / B.E. · Computer Science and Engineering",
    detail: "Chandigarh University, Mohali · 2026",
  },
  {
    title: "Class XII · 91%",
    detail: "CISCE (ICSE/ISC) · English · 2021",
  },
  {
    title: "Class X · 94%",
    detail: "CISCE (ICSE/ISC) · English · 2019",
  },
];

function external(href: string) {
  return href.startsWith("http");
}

function Index() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-8 sm:px-6 lg:pt-12">
        <div className="relative mx-auto min-h-[34rem] sm:min-h-[38rem]">
          <p className="float-copy absolute left-0 top-2 z-20 font-display text-lg text-primary sm:left-[2%] sm:top-6 sm:text-2xl">
            Hey, this is me
          </p>
          <h1 className="float-copy float-copy-delay absolute left-0 top-[22%] z-20 max-w-[9.5rem] font-display text-4xl leading-[0.95] text-heading sm:left-[1%] sm:top-[30%] sm:max-w-[14rem] sm:text-6xl lg:text-7xl">
            Nikita
            <span className="block text-primary">Nautiyal</span>
          </h1>
          <p className="float-copy float-copy-late absolute right-0 top-1 z-20 max-w-[46%] text-right font-display text-2xl leading-[0.95] text-subheading sm:top-[8%] sm:max-w-[13rem] sm:text-4xl lg:right-[2%] lg:text-5xl">
            Product Designer
          </p>
          <p className="float-copy absolute bottom-[18%] right-0 z-20 rounded-full border border-border bg-card/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary sm:bottom-[16%] sm:right-[8%] sm:px-4 sm:py-2 sm:text-xs">
            Figma
          </p>
          <img
            src="/nikita-line.png?v=5"
            alt="Line illustration of Nikita Nautiyal sitting and drawing"
            width={1024}
            height={1024}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(88vw,34rem)] -translate-x-1/2 -translate-y-[46%] dark:hidden"
          />
          <img
            src="/nikita-line-dark.png?v=5"
            alt="Colored illustration of Nikita Nautiyal sitting and drawing"
            width={1024}
            height={1024}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden w-[min(88vw,34rem)] -translate-x-1/2 -translate-y-[46%] dark:block"
          />
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Product designer for mobile and web, focused on UI/UX and clear frontend handovers. The work
          covers user research, prototyping, wireframing, and scalable design systems in Figma. Additional
          knowledge includes React.js, HTML, CSS, and JavaScript, plus generative AI, video editing, and
          AI content.
        </p>
      </section>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">02</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl">Work experience</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((job) => {
            const href = job.href || "/experience";
            return (
              <a
                key={job.title}
                href={href}
                {...(external(href) ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group block"
              >
                <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.4rem] border border-border bg-card">
                  <img src={job.image} alt="" className="h-full w-full object-contain" />
                </span>
                <span className="mt-4 block font-display text-2xl leading-tight text-heading transition-colors group-hover:text-primary">
                  {job.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{job.position}</span>
              </a>
            );
          })}
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 border-y border-border bg-surface/80">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">03</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">Skills</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            The skills between the roles above and the projects below.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-primary">04</p>
        <h2 className="mt-2 text-center font-display text-3xl md:text-5xl">Tools</h2>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-start justify-center gap-x-6 gap-y-8 sm:gap-x-10">
          {tools.map((tool) => (
            <li key={tool.name} className="flex w-28 flex-col items-center gap-4 sm:w-32">
              <span className="flex h-24 w-24 items-center justify-center rounded-[1.4rem] border border-border bg-white p-4 shadow-sm">
                <img src={tool.icon} alt="" className="h-14 w-14 object-contain" />
              </span>
              <span className="text-center text-sm text-muted-foreground">{tool.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">05</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl">Projects</h2>
          </div>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary">
            All work
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title}>
              <a
                href={project.href}
                {...(external(project.href) ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group block"
              >
                <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.4rem] border border-border bg-surface">
                  {project.image ? (
                    <img src={project.image} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <span className="flex aspect-[4/3] items-end bg-secondary p-5">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Figma</span>
                    </span>
                  )}
                </span>
                <span className="mt-4 block font-display text-2xl leading-tight text-heading transition-colors group-hover:text-primary">
                  {project.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{project.line}</span>
              </a>
              {"also" in project && project.also ? (
                <a
                  href={project.also.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm text-primary hover:underline"
                >
                  {project.also.label}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="posters" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">06</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl">Posters</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {posters.map((poster) => (
            <a
              key={poster.title}
              href={poster.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <span className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-[1.4rem] border border-border bg-surface">
                <img src={poster.image} alt="" className="h-full w-full object-contain" />
              </span>
              <span className="mt-4 block font-display text-2xl leading-tight text-heading transition-colors group-hover:text-primary">
                {poster.title}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{poster.line}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="achievements" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">07</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl">Achievements</h2>
        <div className="mt-8 grid gap-3">
          {achievements.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-card px-5 py-5 sm:px-6">
              <h3 className="font-display text-2xl leading-tight text-heading">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="languages" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">08</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl">Languages</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {languages.map((language) => (
            <li key={language} className="rounded-2xl border border-border bg-card px-6 py-4 font-display text-2xl">
              {language}
            </li>
          ))}
        </ul>
      </section>

      <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">09</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl">Education</h2>
        <div className="mt-8 grid gap-3">
          {education.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-card px-5 py-5 sm:px-6">
              <h3 className="font-display text-2xl leading-tight">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">10</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl">Contact</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            <a href={`mailto:${PROFILE.email}`} className="block rounded-2xl border border-border bg-card px-5 py-5 hover:border-primary">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Email</p>
              <p className="mt-2 break-all font-display text-2xl">{PROFILE.email}</p>
            </a>
            <a href={PROFILE.phoneHref} className="block rounded-2xl border border-border bg-card px-5 py-5 hover:border-primary">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Phone</p>
              <p className="mt-2 font-display text-2xl">{PROFILE.phone}</p>
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="block rounded-2xl border border-border bg-card px-5 py-5 hover:border-primary">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">LinkedIn</p>
              <p className="mt-2 font-display text-2xl">nikitades</p>
            </a>
            <div className="rounded-2xl border border-border bg-card px-5 py-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Location</p>
              <p className="mt-2 font-display text-2xl">{PROFILE.location}</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

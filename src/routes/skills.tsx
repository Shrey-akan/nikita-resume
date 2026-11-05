import { createFileRoute } from "@tanstack/react-router";
import { ProfileNav } from "@/components/ProfileNav";

import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: seoMeta(
      "UI/UX Skills | Figma, Wireframing, React.js | Nikita Nautiyal",
      "Skills of Nikita Nautiyal: UI/UX, wireframing, prototyping, journey mapping, responsive design, Figma, React.js, and generative AI.",
    ),
  }),
  component: Skills,
});

const groups = [
  {
    title: "Design",
    items: ["UI/UX", "UI/UX testing", "Wireframing", "Prototyping", "Responsive design", "Journey mapping"],
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    title: "Content",
    items: ["Generative AI", "Content creation", "Video editing"],
  },
  {
    title: "Languages",
    items: ["English", "Hindi"],
  },
];

function Skills() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Skills</p>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-7xl">How the work gets made</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        UI/UX for mobile and web, from research and wireframes through frontend handovers. Additional knowledge includes React.js, HTML, CSS, and JavaScript, plus generative AI and video editing.
      </p>
      <ProfileNav className="mt-8 mb-12" />
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="rounded-[1.6rem] bg-surface p-6">
            <h2 className="font-display text-2xl">{group.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full bg-card px-3 py-1.5 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

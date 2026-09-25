import { createFileRoute } from "@tanstack/react-router";
import { ProfileNav } from "@/components/ProfileNav";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Nikita Nautiyal" },
      {
        name: "description",
        content: "Design skills: Figma, research, flows, prototyping, Framer, and interface craft.",
      },
      { property: "og:title", content: "Skills — Nikita Nautiyal" },
    ],
  }),
  component: Skills,
});

const groups = [
  {
    title: "Craft",
    items: ["UI", "UX", "Interaction design", "Layout design", "Visualization", "Responsive design"],
  },
  {
    title: "Research",
    items: [
      "User research",
      "User journey mapping",
      "Flow analysis",
      "Usability gaps",
      "Empathy-driven problem solving",
    ],
  },
  {
    title: "Product",
    items: ["Onboarding design", "Wireframing", "Prototyping", "Design systems", "Content hierarchy"],
  },
  {
    title: "Tools",
    items: ["Figma", "Framer", "Illustrator", "Photoshop", "HTML", "CSS"],
  },
];

function Skills() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Skills</p>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-7xl">How the work gets made</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Research and friction-finding first, then flows, components, and high-fidelity prototypes.
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

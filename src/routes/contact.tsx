import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import { DownloadDocs } from "@/components/DownloadDocs";
import { PROFILE } from "@/lib/resume";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nikita Nautiyal" },
      {
        name: "description",
        content: "Contact Nikita Nautiyal, UI/UX designer.",
      },
      { property: "og:title", content: "Contact — Nikita Nautiyal" },
    ],
  }),
  component: Contact,
});

const channels = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref },
];

function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Contact</p>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-7xl">Let’s design something clear.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Open to product design roles and case-study conversations. Messages sent here land in the
        admin inbox.
      </p>
      <div className="mt-8">
        <DownloadDocs />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            className="rounded-[1.6rem] border border-border bg-card p-6 hover:border-primary"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{channel.label}</p>
            <p className="mt-2 break-all font-display text-2xl">{channel.value}</p>
          </a>
        ))}
      </div>
      <div className="mt-14">
        <ContactForm />
      </div>
    </div>
  );
}

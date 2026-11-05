import type { MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  COVER_LETTER_PDF_FILENAME,
  COVER_LETTER_PDF_PATH,
  PROFILE,
  RESUME_PDF_FILENAME,
  RESUME_PDF_PATH,
} from "@/lib/resume";

const visitLinks = [
  { href: "/", id: "top", label: "Home" },
  { href: "/#work", id: "work", label: "Work experience" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#posters", id: "posters", label: "Posters" },
  { href: "/#contact", id: "contact", label: "Contact me" },
] as const;

const profilePages = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
] as const;

function onSectionClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  if (id === "top") {
    if (window.location.pathname !== "/") {
      window.location.assign("/");
      return;
    }
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
    }, 40);
    return;
  }
  if (window.location.pathname !== "/") {
    window.location.assign(`/#${id}`);
    return;
  }
  window.setTimeout(() => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    window.history.replaceState(null, "", `/#${id}`);
  }, 40);
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16 border-t border-border/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl">{PROFILE.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{PROFILE.title} · {PROFILE.location}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Visit</p>
          {visitLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="w-fit text-muted-foreground hover:text-primary"
              onClick={(event) => onSectionClick(event, link.id)}
            >
              {link.label}
            </a>
          ))}
          <Link to="/login" className="w-fit text-muted-foreground hover:text-primary">
            Log in
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Profile</p>
          {profilePages.map((link) => (
            <Link key={link.to} to={link.to} className="w-fit text-muted-foreground hover:text-primary">
              {link.label}
            </Link>
          ))}
          <a href={RESUME_PDF_PATH} download={RESUME_PDF_FILENAME} className="w-fit text-muted-foreground hover:text-primary">
            Resume (PDF)
          </a>
          <a
            href={COVER_LETTER_PDF_PATH}
            download={COVER_LETTER_PDF_FILENAME}
            className="w-fit text-muted-foreground hover:text-primary"
          >
            Cover letter (PDF)
          </a>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Connect</p>
          <a href={`mailto:${PROFILE.email}`} className="break-all text-muted-foreground hover:text-primary">
            {PROFILE.email}
          </a>
          <a href={PROFILE.phoneHref} className="text-muted-foreground hover:text-primary">
            {PROFILE.phone}
          </a>
          <a href={PROFILE.linkedin} className="text-muted-foreground hover:text-primary" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Nikita Nautiyal</span>
          <span>UI/UX portfolio</span>
        </div>
      </div>
    </footer>
  );
}

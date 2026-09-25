import { Link } from "@tanstack/react-router";
import { headerLinks, profileLinks } from "@/lib/nav";
import {
  COVER_LETTER_PDF_FILENAME,
  COVER_LETTER_PDF_PATH,
  PROFILE,
  RESUME_PDF_FILENAME,
  RESUME_PDF_PATH,
} from "@/lib/resume";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl">Nikita Nautiyal</p>
          <p className="mt-2 text-sm text-muted-foreground">UI/UX designer · India</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Visit</p>
          <Link to="/" className="w-fit text-muted-foreground hover:text-primary">
            Home
          </Link>
          {headerLinks.map((link) => (
            <Link key={link.to} to={link.to} className="w-fit text-muted-foreground hover:text-primary">
              {link.label}
            </Link>
          ))}
          <Link to="/login" className="w-fit text-muted-foreground hover:text-primary">
            Log in
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Profile</p>
          {profileLinks.map((link) => (
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

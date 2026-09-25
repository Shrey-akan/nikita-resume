import { Link } from "@tanstack/react-router";
import { profileLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function ProfileNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex flex-wrap gap-2", className)} aria-label="Profile">
      {profileLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          activeProps={{
            className:
              "rounded-full border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary",
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

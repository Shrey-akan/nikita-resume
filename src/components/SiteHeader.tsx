import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAvatar } from "@/components/UserAvatar";
import { headerLinks } from "@/lib/nav";

const navLinkClass =
  "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors";
const navActiveClass = "block rounded-md px-3 py-2 text-sm text-foreground bg-secondary/50";

export function SiteHeader() {
  const { user, ready, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!navOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onPointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setNavOpen(false);
      }
    }
    function onResize() {
      if (window.innerWidth >= 1024) setNavOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [navOpen]);

  function closeNav() {
    setNavOpen(false);
    setMenuOpen(false);
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-border/50 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2" onClick={closeNav}>
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary font-display text-sm text-primary-foreground">
            NN
          </span>
          <span className="font-display text-lg tracking-tight">Nikita</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {headerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-md bg-secondary/50 px-3 py-2 text-sm text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
          {ready && user?.role === "admin" ? (
            <Link
              to="/studio"
              className="rounded-md px-3 py-2 text-sm text-primary transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-md bg-secondary/50 px-3 py-2 text-sm text-foreground" }}
            >
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:ml-0">
          <ThemeToggle />
          {ready && user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="inline-flex items-center"
                aria-label="Account menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <UserAvatar name={user.name} />
              </button>
              {menuOpen ? (
                <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-border bg-card p-2 shadow-lg">
                  <p className="truncate px-2 py-1.5 text-xs text-muted-foreground">{user.name}</p>
                  {user.role === "admin" ? (
                    <Link
                      to="/studio"
                      className="block rounded-md px-2 py-2 text-sm hover:bg-secondary"
                      onClick={closeNav}
                    >
                      Admin
                    </Link>
                  ) : null}
                  <Link
                    to="/write"
                    className="block rounded-md px-2 py-2 text-sm hover:bg-secondary lg:hidden"
                    onClick={closeNav}
                  >
                    Write
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-secondary"
                    onClick={() => {
                      closeNav();
                      void logout();
                    }}
                  >
                    Log out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center rounded-md border border-border px-2.5 py-1.5 font-mono text-[11px] transition-colors hover:border-primary hover:text-primary sm:px-3 sm:py-2 sm:text-xs"
            >
              Log in
            </Link>
          )}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >
            {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {navOpen ? (
        <nav
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border/60 bg-background px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {headerLinks.map((link) => (
              <Link key={link.to} to={link.to} className={navLinkClass} activeProps={{ className: navActiveClass }} onClick={closeNav}>
                {link.label}
              </Link>
            ))}
            {ready && user?.role === "admin" ? (
              <Link to="/studio" className={navLinkClass} activeProps={{ className: navActiveClass }} onClick={closeNav}>
                Admin
              </Link>
            ) : null}
            <Link to="/write" className={navLinkClass} activeProps={{ className: navActiveClass }} onClick={closeNav}>
              Write
            </Link>
            {!user ? (
              <Link to="/login" className={navLinkClass} activeProps={{ className: navActiveClass }} onClick={closeNav}>
                Log in
              </Link>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

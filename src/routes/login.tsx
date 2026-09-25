import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/components/AuthProvider";

type LoginSearch = {
  redirect?: string;
  tab?: "login" | "register";
};

function safeRedirect(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/login")) return undefined;
  return value;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: safeRedirect(search.redirect),
    tab: search.tab === "register" || search.tab === "login" ? search.tab : undefined,
  }),
  head: () => ({
    meta: [{ title: "Log in — Nikita Nautiyal" }, { name: "robots", content: "noindex" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, ready } = useAuth();
  const { redirect, tab } = Route.useSearch();
  const navigate = useNavigate({ from: "/login" });
  const activeTab = tab === "register" ? "register" : "login";
  const hadSession = useRef<boolean | null>(null);
  if (hadSession.current === null && ready) {
    hadSession.current = Boolean(user);
  }

  useEffect(() => {
    if (ready && hadSession.current) {
      void navigate({ to: redirect || "/" });
    }
  }, [ready, redirect, navigate]);

  if (!ready || hadSession.current) {
    return <div className="mx-auto max-w-md px-4 py-24 text-muted-foreground sm:px-6">Checking your account…</div>;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6 sm:py-20 md:py-28">
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Account</p>
      <h1 className="mb-3 font-display text-3xl sm:text-4xl md:text-5xl">Log in or join</h1>
      <p className="text-muted-foreground mb-8">
        Create an account or log in with the same email to write posts, like, and comment.
      </p>
      <AuthForm
        tab={activeTab}
        onTabChange={(next) => {
          void navigate({
            search: { redirect, tab: next },
            replace: true,
          });
        }}
        onSuccess={() => {
          void navigate({ to: redirect || "/" });
        }}
      />
      <a href="/blog" className="mt-6 inline-block text-sm text-muted-foreground hover:text-primary">
        Back to blog
      </a>
    </div>
  );
}

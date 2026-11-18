import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Account — Nikita Nautiyal" }, { name: "robots", content: "noindex" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6 sm:py-20 md:py-28">
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Account</p>
      <h1 className="mb-3 font-display text-3xl sm:text-4xl md:text-5xl">Sign-in is paused</h1>
      <p className="text-muted-foreground">Log in and new accounts are turned off for now.</p>
    </div>
  );
}

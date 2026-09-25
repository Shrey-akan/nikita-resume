import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useFeedback } from "@/components/FeedbackProvider";
import type { PublicUser } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authErrorMessage, isDuplicateAccountMessage } from "@/lib/auth-rules";
import { cn } from "@/lib/utils";

type AuthTab = "login" | "register";

export function AuthForm({
  defaultTab = "register",
  tab: tabProp,
  onTabChange,
  onSuccess,
  submitLabel,
}: {
  defaultTab?: AuthTab;
  tab?: AuthTab;
  onTabChange?: (tab: AuthTab) => void;
  onSuccess?: (user: PublicUser) => void;
  submitLabel?: string;
}) {
  const { login, register } = useAuth();
  const feedback = useFeedback();
  const [internalTab, setInternalTab] = useState<AuthTab>(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const tab = tabProp ?? internalTab;
  const isRegister = tab === "register";

  function setTab(next: AuthTab) {
    if (tabProp === undefined) setInternalTab(next);
    onTabChange?.(next);
  }

  async function onRegister(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const created = await register(name, email, password, remember);
      await feedback.success({
        title: "Account created",
        description: `Welcome, ${created.name}. You’re signed in and can write posts, like, and comment.`,
        action: "Continue",
      });
      onSuccess?.(created);
    } catch (error) {
      const message = authErrorMessage(error, "Could not create the account.");
      feedback.error("Could not create the account", message);
      if (isDuplicateAccountMessage(message)) setTab("login");
    } finally {
      setBusy(false);
    }
  }

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const next = await login(email, password, remember);
      await feedback.success({
        title: next.role === "admin" ? "Admin signed in" : "You’re signed in",
        description: `Welcome back, ${next.name}.`,
        action: "Continue",
      });
      onSuccess?.(next);
    } catch (error) {
      feedback.error("Could not log in", authErrorMessage(error, "Check your email and password and try again."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1" role="tablist" aria-label="Account">
        <button
          type="button"
          role="tab"
          aria-selected={isRegister}
          className={cn(
            "relative z-10 cursor-pointer rounded-md px-2 py-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
            isRegister ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setTab("register")}
        >
          Create account
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isRegister}
          className={cn(
            "relative z-10 cursor-pointer rounded-md px-2 py-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
            !isRegister ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setTab("login")}
        >
          Log in
        </button>
      </div>

      {isRegister ? (
        <form onSubmit={onRegister} className="mt-6 space-y-4 rounded-lg border border-border bg-card p-4 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="reg-name">Name</Label>
            <Input id="reg-name" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-email">Email</Label>
            <Input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-password">Password</Label>
            <Input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
            <p className="text-xs text-muted-foreground">At least 8 characters. You’ll use this email to log in again.</p>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            Keep me logged in on this device
          </label>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Creating…" : submitLabel || "Create account"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button type="button" className="cursor-pointer text-primary hover:underline" onClick={() => setTab("login")}>
              Log in
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={onLogin} className="mt-6 space-y-4 rounded-lg border border-border bg-card p-4 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            Keep me logged in on this device
          </label>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Signing in…" : "Log in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <button type="button" className="cursor-pointer text-primary hover:underline" onClick={() => setTab("register")}>
              Create account
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

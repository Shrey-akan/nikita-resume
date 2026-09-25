import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { clearUserToken, readUserToken, storeUserToken } from "@/lib/session";
import type { PublicUser } from "@/server/auth";

type AuthContextValue = {
  user: PublicUser | null;
  ready: boolean;
  token: string;
  login: (email: string, password: string, remember: boolean) => Promise<PublicUser>;
  register: (name: string, email: string, password: string, remember: boolean) => Promise<PublicUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readUserToken();
    if (!stored) {
      setReady(true);
      return;
    }
    void api
      .me(stored)
      .then((result) => {
        setUser(result.user);
        setToken(stored);
      })
      .catch(() => {
        clearUserToken();
        setUser(null);
        setToken("");
      })
      .finally(() => setReady(true));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      token,
      async login(email, password, remember) {
        const result = await api.login(email, password);
        storeUserToken(result.token, remember);
        setToken(result.token);
        setUser(result.user);
        return result.user;
      },
      async register(name, email, password, remember) {
        const result = await api.register(name, email, password);
        storeUserToken(result.token, remember);
        setToken(result.token);
        setUser(result.user);
        return result.user;
      },
      async logout() {
        const current = readUserToken();
        if (current) {
          try {
            await api.logout(current);
          } catch {
            // ignore expired sessions
          }
        }
        clearUserToken();
        setToken("");
        setUser(null);
        toast.success("You’re logged out.", { description: "Come back anytime to write or comment." });
      },
    }),
    [user, ready, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

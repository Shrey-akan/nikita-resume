import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-surface px-1 transition-colors hover:border-primary"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Light mode" : "Dark mode"}
    >
      <Sun className={cn("absolute left-2 size-3.5 transition-opacity", dark ? "opacity-40" : "text-primary opacity-100")} />
      <Moon className={cn("absolute right-2 size-3.5 transition-opacity", dark ? "text-primary opacity-100" : "opacity-40")} />
      <span
        className={cn(
          "relative z-10 size-7 rounded-full bg-primary shadow-sm transition-transform duration-300",
          dark ? "translate-x-7" : "translate-x-0",
        )}
      />
    </button>
  );
}

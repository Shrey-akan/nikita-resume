import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-muted/60 p-0.5"
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors",
          theme === "dark" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
        )}
        aria-label="Dark mode"
        aria-pressed={theme === "dark"}
        title="Dark mode"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors",
          theme === "light" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
        )}
        aria-label="Light mode"
        aria-pressed={theme === "light"}
        title="Light mode"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

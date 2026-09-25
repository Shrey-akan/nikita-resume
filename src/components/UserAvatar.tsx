import { initials } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function UserAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-medium",
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

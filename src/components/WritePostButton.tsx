import { Link } from "@tanstack/react-router";
import { PenLine } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { cn } from "@/lib/utils";

const styles =
  "inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:px-4";

export function WritePostButton({ className }: { className?: string }) {
  const { user, ready } = useAuth();

  if (ready && user) {
    return (
      <Link to="/write" className={cn(styles, className)}>
        <PenLine className="h-4 w-4" />
        Write
      </Link>
    );
  }

  return (
    <Link to="/login" search={{ redirect: "/write", tab: "register" }} className={cn(styles, className)}>
      <PenLine className="h-4 w-4" />
      Write
    </Link>
  );
}

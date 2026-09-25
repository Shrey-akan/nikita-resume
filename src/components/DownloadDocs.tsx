import {
  COVER_LETTER_PDF_FILENAME,
  COVER_LETTER_PDF_PATH,
  RESUME_PDF_FILENAME,
  RESUME_PDF_PATH,
} from "@/lib/resume";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "header";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto",
  outline:
    "inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-5 py-3 transition hover:border-primary sm:w-auto",
  header:
    "hidden sm:inline-flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-md border border-border hover:border-primary hover:text-primary transition-colors",
};

export function DownloadResumeButton({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: Variant;
}) {
  return (
    <a href={RESUME_PDF_PATH} download={RESUME_PDF_FILENAME} className={cn(styles[variant], className)}>
      Download resume
    </a>
  );
}

export function DownloadCoverLetterButton({
  className,
  variant = "outline",
}: {
  className?: string;
  variant?: Variant;
}) {
  return (
    <a
      href={COVER_LETTER_PDF_PATH}
      download={COVER_LETTER_PDF_FILENAME}
      className={cn(styles[variant], className)}
    >
      Download cover letter
    </a>
  );
}

export function DownloadDocs({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "header";
}) {
  if (variant === "header") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <DownloadResumeButton variant="header" />
        <DownloadCoverLetterButton variant="header" className="hidden md:inline-flex" />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <DownloadResumeButton />
      <DownloadCoverLetterButton />
    </div>
  );
}

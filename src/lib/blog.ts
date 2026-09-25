import type { ReactNode } from "react";
import { createElement, Fragment } from "react";

export type BlogStatus = "pending" | "approved" | "rejected";

export type BlogCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverThumb: string | null;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  isBlogOfTheDay: boolean;
  authorName: string;
  status: BlogStatus;
  likesCount: number;
  commentsCount: number;
};

export type BlogPost = BlogCard & {
  body: string;
  coverImage: string | null;
  published: boolean;
  updatedAt: string;
  authorEmail: string;
  authorId: string | null;
};

export type BlogIndex = {
  blogOfTheDay: BlogCard | null;
  top: BlogCard[];
};

export const QUERY_TOPICS = [
  "Job opportunity",
  "Freelance / contract",
  "Collaboration",
  "Speaking / workshop",
  "Question",
  "Other",
] as const;

export type QueryTopic = (typeof QUERY_TOPICS)[number];

export function slugify(title: string) {
  const base =
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "post";
  return base;
}

export function isPublicBlog(post: { status?: string | null; published?: boolean }) {
  if (post.status === "approved") return true;
  if (!post.status && post.published) return true;
  return false;
}

export async function compressImage(file: File, maxWidth = 1400, quality = 0.82) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not process image");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
  const dataUrl = canvas.toDataURL(mime, quality);
  if (dataUrl.length > 1_800_000) {
    throw new Error("Image is too large. Try a smaller photo.");
  }
  return dataUrl;
}

export async function makeThumb(dataUrl: string) {
  const img = await loadImage(dataUrl);
  const maxWidth = 720;
  const scale = Math.min(1, maxWidth / img.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.72);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read image"));
    img.src = src;
  });
}

function formatInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(createElement("strong", { key: key++, className: "text-foreground font-medium" }, token.slice(2, -2)));
    } else if (token.startsWith("*")) {
      nodes.push(createElement("em", { key: key++ }, token.slice(1, -1)));
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        nodes.push(
          createElement(
            "a",
            {
              key: key++,
              href: link[2],
              target: "_blank",
              rel: "noreferrer",
              className: "text-foreground underline-offset-2 hover:underline",
            },
            link[1],
          ),
        );
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

export function renderBlogBody(body: string) {
  const blocks = body.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("### ")) {
      return createElement(
        "h3",
        { key: index, className: "font-display text-2xl text-foreground" },
        trimmed.slice(4),
      );
    }
    if (trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
      const text = trimmed.startsWith("## ") ? trimmed.slice(3) : trimmed.slice(2);
      return createElement("h2", { key: index, className: "font-display text-3xl text-foreground" }, text);
    }
    const lines = trimmed.split("\n");
    if (lines.every((line) => line.trim().startsWith("- "))) {
      return createElement(
        "ul",
        { key: index, className: "list-disc space-y-2 pl-6 text-muted-foreground" },
        lines.map((line, lineIndex) =>
          createElement("li", { key: lineIndex }, ...formatInline(line.replace(/^\s*-\s*/, ""))),
        ),
      );
    }
    return createElement(
      "p",
      { key: index, className: "whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground" },
      ...formatInline(block),
    );
  });
}

export function BlogBody({ body }: { body: string }) {
  return createElement("div", { className: "space-y-5" }, createElement(Fragment, null, ...renderBlogBody(body)));
}

export function formatBlogDate(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatBlogTime(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "SJ";
}

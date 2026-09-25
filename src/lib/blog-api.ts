import { z } from "zod";

export const blogContentSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(140),
  excerpt: z.string().trim().min(10, "Add a short summary").max(400),
  body: z.string().trim().min(20, "Write a bit more in the post").max(50_000),
  coverImage: z.string().nullable().optional(),
  coverThumb: z.string().nullable().optional(),
});

export const adminBlogSchema = blogContentSchema.extend({
  published: z.boolean().optional().default(false),
  isBlogOfTheDay: z.boolean().optional().default(false),
});

export const approveBlogSchema = z.object({
  isBlogOfTheDay: z.boolean().optional(),
});

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { adminBlogSchema, blogContentSchema } from "@/lib/blog-api";
import { adminTokenInput } from "./auth";
import { requireAdmin, requireUser, toPublicUser } from "./auth.server";
import {
  approveBlogById,
  deleteAdminBlog,
  deleteUserBlogPost,
  emptyBlogIndex,
  getPublicBlog,
  listAdminBlogs,
  listPublicBlogs,
  listUserBlogs,
  recordPublicBlogView,
  rejectBlogById,
  saveAdminBlog,
  saveUserBlogPost,
} from "./blogs.server";

export const getBlogIndex = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { blogOfTheDay, top } = await listPublicBlogs();
    return { blogOfTheDay, top };
  } catch (error) {
    console.error("getBlogIndex", error);
    return emptyBlogIndex;
  }
});

export const getBlogBySlug = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => getPublicBlog(data.slug));

export const recordBlogView = createServerFn({ method: "POST" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    await recordPublicBlogView(data.slug);
    return { ok: true };
  });

export const verifyStudio = createServerFn({ method: "POST" })
  .inputValidator(adminTokenInput)
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    return { ok: true };
  });

export const listStudioBlogs = createServerFn({ method: "POST" })
  .inputValidator(adminTokenInput)
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    return listAdminBlogs();
  });

export const saveBlog = createServerFn({ method: "POST" })
  .inputValidator(adminBlogSchema.extend({ token: z.string().min(1), id: z.string().optional() }))
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    const { token: _token, ...blog } = data;
    return saveAdminBlog(blog);
  });

export const deleteBlog = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1), id: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    return deleteAdminBlog(data.id);
  });

export const approveBlog = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1),
      id: z.string().min(1),
      isBlogOfTheDay: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    return approveBlogById(data.id, data.isBlogOfTheDay);
  });

export const rejectBlog = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1), id: z.string().min(1) }))
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    return rejectBlogById(data.id);
  });

export const saveUserBlog = createServerFn({ method: "POST" })
  .inputValidator(blogContentSchema.extend({ token: z.string(), id: z.string().optional() }))
  .handler(async ({ data }) => {
    const session = await requireUser(data.token);
    const { token: _token, ...blog } = data;
    return saveUserBlogPost(toPublicUser(session.id, session.user), blog);
  });

export const listMyBlogs = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const { id } = await requireUser(data.token);
    return listUserBlogs(id);
  });

export const deleteUserBlog = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string(), id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { id } = await requireUser(data.token);
    return deleteUserBlogPost(id, data.id);
  });

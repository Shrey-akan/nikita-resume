import { z } from "zod";
import { API_CATALOG, errorMessage, matchApiRoute, readBearerToken, statusForError } from "@/lib/api-http";
import { adminBlogSchema, approveBlogSchema, blogContentSchema } from "@/lib/blog-api";
import { loginSchema, registerSchema } from "@/lib/auth-rules";
import {
  currentUserImpl,
  listUsersImpl,
  loginAccountImpl,
  logoutAccountImpl,
  registerAccountImpl,
  requireAdmin,
  requireUser,
  toPublicUser,
} from "./auth.server";
import {
  approveBlogById,
  deleteAdminBlog,
  deleteUserBlogPost,
  getAdminBlog,
  getPublicBlog,
  listAdminBlogs,
  listPublicBlogs,
  listUserBlogs,
  recordPublicBlogView,
  rejectBlogById,
  saveAdminBlog,
  saveUserBlogPost,
} from "./blogs.server";
import { contactSchema, listContactMessages, submitContactMessage } from "./contact.server";

function jsonOk(data: unknown, status = 200) {
  return Response.json({ ok: true, data }, { status });
}

function jsonFail(message: string, status: number, extra?: Record<string, unknown>) {
  return Response.json({ ok: false, error: message, ...extra }, { status });
}

function apiError(error: unknown) {
  if (error instanceof z.ZodError) {
    return jsonFail(error.issues[0]?.message ?? "Invalid request", 400);
  }
  return jsonFail(errorMessage(error), statusForError(error));
}

async function readJson(request: Request) {
  if (request.method === "GET" || request.method === "HEAD") return {};
  const text = await request.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error("Request body must be JSON");
  }
}

async function requireSession(request: Request) {
  return requireUser(readBearerToken(request));
}

async function requireAdminSession(request: Request) {
  return requireAdmin(readBearerToken(request));
}

export async function handleApiRequest(request: Request) {
  const url = new URL(request.url);
  const match = matchApiRoute(request.method, url.pathname);
  if (!match) {
    return jsonFail("Not found", 404);
  }
  if (match.route === "methodNotAllowed") {
    return jsonFail("Method not allowed", 405, { allow: match.allowed });
  }

  try {
    const body = await readJson(request);
    switch (match.route) {
      case "catalog":
        return jsonOk({
          auth: "Send Authorization: Bearer <token> after login.",
          endpoints: API_CATALOG,
        });
      case "auth.register":
        return jsonOk(await registerAccountImpl(registerSchema.parse(body)), 201);
      case "auth.login":
        return jsonOk(await loginAccountImpl(loginSchema.parse(body)));
      case "auth.logout": {
        const token = readBearerToken(request);
        if (!token) return jsonFail("Please log in", 401);
        await logoutAccountImpl(token);
        return jsonOk({ loggedOut: true });
      }
      case "auth.me": {
        const token = readBearerToken(request);
        if (!token) return jsonFail("Please log in", 401);
        return jsonOk({ user: await currentUserImpl(token) });
      }
      case "blogs.index": {
        const { blogOfTheDay, posts } = await listPublicBlogs();
        return jsonOk({ blogOfTheDay, posts });
      }
      case "blogs.show": {
        const post = await getPublicBlog(match.params.slug);
        if (!post) return jsonFail("Blog not found", 404);
        return jsonOk(post);
      }
      case "blogs.view":
        return jsonOk(await recordPublicBlogView(match.params.slug));
      case "me.blogs.index": {
        const session = await requireSession(request);
        if (request.method === "GET") {
          return jsonOk(await listUserBlogs(session.id));
        }
        return jsonOk(
          await saveUserBlogPost(toPublicUser(session.id, session.user), blogContentSchema.parse(body)),
          201,
        );
      }
      case "me.blogs.update": {
        const session = await requireSession(request);
        return jsonOk(
          await saveUserBlogPost(toPublicUser(session.id, session.user), {
            ...blogContentSchema.parse(body),
            id: match.params.id,
          }),
        );
      }
      case "me.blogs.delete": {
        const session = await requireSession(request);
        return jsonOk(await deleteUserBlogPost(session.id, match.params.id));
      }
      case "admin.users":
        return jsonOk(await listUsersImpl(readBearerToken(request)));
      case "admin.blogs.index": {
        await requireAdminSession(request);
        if (request.method === "GET") {
          return jsonOk(await listAdminBlogs());
        }
        return jsonOk(await saveAdminBlog(adminBlogSchema.parse(body)), 201);
      }
      case "admin.blogs.show": {
        await requireAdminSession(request);
        return jsonOk(await getAdminBlog(match.params.id));
      }
      case "admin.blogs.update": {
        await requireAdminSession(request);
        return jsonOk(
          await saveAdminBlog({
            ...adminBlogSchema.parse(body),
            id: match.params.id,
          }),
        );
      }
      case "admin.blogs.delete": {
        await requireAdminSession(request);
        return jsonOk(await deleteAdminBlog(match.params.id));
      }
      case "admin.blogs.approve": {
        await requireAdminSession(request);
        const payload = approveBlogSchema.parse(body ?? {});
        return jsonOk(await approveBlogById(match.params.id, payload.isBlogOfTheDay));
      }
      case "admin.blogs.reject": {
        await requireAdminSession(request);
        return jsonOk(await rejectBlogById(match.params.id));
      }
      case "admin.messages": {
        await requireAdminSession(request);
        return jsonOk(await listContactMessages());
      }
      case "contact.create":
        return jsonOk(await submitContactMessage(contactSchema.parse(body)), 201);
      default:
        return jsonFail("Not found", 404);
    }
  } catch (error) {
    return apiError(error);
  }
}

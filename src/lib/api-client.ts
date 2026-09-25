import type { BlogPost } from "@/lib/blog";
import type { PublicUser } from "@/server/auth";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiEnvelope<T> = {
  ok?: boolean;
  data?: T;
  error?: string;
};

export function unwrapApi<T>(status: number, json: ApiEnvelope<T>): T {
  if (status >= 400 || json.ok === false) {
    throw new ApiError(json.error || "Request failed", status);
  }
  if (json.data === undefined) {
    throw new ApiError("Request failed", status);
  }
  return json.data;
}

async function request<T>(path: string, options: { method?: string; token?: string; body?: unknown } = {}) {
  const response = await fetch(path, {
    method: options.method ?? "GET",
    headers: {
      ...(options.body ? { "content-type": "application/json" } : {}),
      ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const json = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
  return unwrapApi<T>(response.status, json);
}

export type AuthSession = { token: string; user: PublicUser };

export type StudioUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  lastLoginAt: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type BlogWriteInput = {
  title: string;
  excerpt: string;
  body: string;
  coverImage?: string | null;
  coverThumb?: string | null;
};

export type AdminBlogInput = BlogWriteInput & {
  published?: boolean;
  isBlogOfTheDay?: boolean;
};

export type SavedBlog = { id: string; slug: string; status: BlogPost["status"] };

export const api = {
  register(name: string, email: string, password: string) {
    return request<AuthSession>("/api/auth/register", { method: "POST", body: { name, email, password } });
  },
  login(email: string, password: string) {
    return request<AuthSession>("/api/auth/login", { method: "POST", body: { email, password } });
  },
  me(token: string) {
    return request<{ user: PublicUser }>("/api/auth/me", { token });
  },
  logout(token: string) {
    return request<{ loggedOut: boolean }>("/api/auth/logout", { method: "POST", token });
  },
  listMyBlogs(token: string) {
    return request<BlogPost[]>("/api/me/blogs", { token });
  },
  saveMyBlog(token: string, input: BlogWriteInput & { id?: string }) {
    if (input.id) {
      const { id, ...body } = input;
      return request<SavedBlog>(`/api/me/blogs/${id}`, { method: "PUT", token, body });
    }
    return request<SavedBlog>("/api/me/blogs", { method: "POST", token, body: input });
  },
  deleteMyBlog(token: string, id: string) {
    return request<{ ok: boolean }>(`/api/me/blogs/${id}`, { method: "DELETE", token });
  },
  listAdminUsers(token: string) {
    return request<StudioUser[]>("/api/admin/users", { token });
  },
  listAdminBlogs(token: string) {
    return request<BlogPost[]>("/api/admin/blogs", { token });
  },
  saveAdminBlog(token: string, input: AdminBlogInput & { id?: string }) {
    if (input.id) {
      const { id, ...body } = input;
      return request<SavedBlog>(`/api/admin/blogs/${id}`, { method: "PUT", token, body });
    }
    return request<SavedBlog>("/api/admin/blogs", { method: "POST", token, body: input });
  },
  deleteAdminBlog(token: string, id: string) {
    return request<{ ok: boolean }>(`/api/admin/blogs/${id}`, { method: "DELETE", token });
  },
  approveBlog(token: string, id: string, isBlogOfTheDay?: boolean) {
    return request<SavedBlog>(`/api/admin/blogs/${id}/approve`, {
      method: "POST",
      token,
      body: { isBlogOfTheDay },
    });
  },
  rejectBlog(token: string, id: string) {
    return request<SavedBlog>(`/api/admin/blogs/${id}/reject`, { method: "POST", token, body: {} });
  },
  listMessages(token: string) {
    return request<ContactMessage[]>("/api/admin/messages", { token });
  },
  submitContact(input: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    website?: string;
  }) {
    return request<{ ok: boolean }>("/api/contact", { method: "POST", body: input });
  },
};

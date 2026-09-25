export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRouteId =
  | "catalog"
  | "auth.register"
  | "auth.login"
  | "auth.logout"
  | "auth.me"
  | "blogs.index"
  | "blogs.show"
  | "blogs.view"
  | "me.blogs.index"
  | "me.blogs.update"
  | "me.blogs.delete"
  | "admin.users"
  | "admin.blogs.index"
  | "admin.blogs.show"
  | "admin.blogs.update"
  | "admin.blogs.delete"
  | "admin.blogs.approve"
  | "admin.blogs.reject"
  | "admin.messages"
  | "contact.create";

export type ApiMatch =
  | { route: ApiRouteId; params: Record<string, string>; allowed?: undefined }
  | { route: "methodNotAllowed"; params: Record<string, string>; allowed: HttpMethod[] };

type Pattern = {
  method: HttpMethod;
  route: ApiRouteId;
  match: (path: string) => Record<string, string> | null;
};

function exact(method: HttpMethod, route: ApiRouteId, path: string): Pattern {
  return {
    method,
    route,
    match: (value) => (value === path ? {} : null),
  };
}

function param(method: HttpMethod, route: ApiRouteId, regex: RegExp, keys: string[]): Pattern {
  return {
    method,
    route,
    match: (value) => {
      const found = value.match(regex);
      if (!found) return null;
      const params: Record<string, string> = {};
      keys.forEach((key, index) => {
        params[key] = decodeURIComponent(found[index + 1] ?? "");
      });
      return params;
    },
  };
}

export const API_PATTERNS: Pattern[] = [
  exact("GET", "catalog", "/api"),
  exact("POST", "auth.register", "/api/auth/register"),
  exact("POST", "auth.login", "/api/auth/login"),
  exact("POST", "auth.logout", "/api/auth/logout"),
  exact("GET", "auth.me", "/api/auth/me"),
  exact("GET", "blogs.index", "/api/blogs"),
  param("POST", "blogs.view", /^\/api\/blogs\/([^/]+)\/view$/, ["slug"]),
  param("GET", "blogs.show", /^\/api\/blogs\/([^/]+)$/, ["slug"]),
  exact("GET", "me.blogs.index", "/api/me/blogs"),
  exact("POST", "me.blogs.index", "/api/me/blogs"),
  param("PUT", "me.blogs.update", /^\/api\/me\/blogs\/([^/]+)$/, ["id"]),
  param("PATCH", "me.blogs.update", /^\/api\/me\/blogs\/([^/]+)$/, ["id"]),
  param("DELETE", "me.blogs.delete", /^\/api\/me\/blogs\/([^/]+)$/, ["id"]),
  exact("GET", "admin.users", "/api/admin/users"),
  exact("GET", "admin.blogs.index", "/api/admin/blogs"),
  exact("POST", "admin.blogs.index", "/api/admin/blogs"),
  param("POST", "admin.blogs.approve", /^\/api\/admin\/blogs\/([^/]+)\/approve$/, ["id"]),
  param("POST", "admin.blogs.reject", /^\/api\/admin\/blogs\/([^/]+)\/reject$/, ["id"]),
  param("GET", "admin.blogs.show", /^\/api\/admin\/blogs\/([^/]+)$/, ["id"]),
  param("PUT", "admin.blogs.update", /^\/api\/admin\/blogs\/([^/]+)$/, ["id"]),
  param("PATCH", "admin.blogs.update", /^\/api\/admin\/blogs\/([^/]+)$/, ["id"]),
  param("DELETE", "admin.blogs.delete", /^\/api\/admin\/blogs\/([^/]+)$/, ["id"]),
  exact("GET", "admin.messages", "/api/admin/messages"),
  exact("POST", "contact.create", "/api/contact"),
];

export const API_CATALOG = [
  { method: "GET", path: "/api", auth: "public", description: "List API endpoints" },
  { method: "POST", path: "/api/auth/register", auth: "public", description: "Create a user account" },
  { method: "POST", path: "/api/auth/login", auth: "public", description: "Log in and receive a token" },
  { method: "POST", path: "/api/auth/logout", auth: "user", description: "Invalidate the current session" },
  { method: "GET", path: "/api/auth/me", auth: "user", description: "Read the signed-in user" },
  { method: "GET", path: "/api/blogs", auth: "public", description: "Approved posts shown on the blog page" },
  { method: "GET", path: "/api/blogs/:slug", auth: "public", description: "One approved post" },
  { method: "POST", path: "/api/blogs/:slug/view", auth: "public", description: "Increment views for an approved post" },
  { method: "GET", path: "/api/me/blogs", auth: "user", description: "Posts written by the signed-in user" },
  { method: "POST", path: "/api/me/blogs", auth: "user", description: "Submit a post for admin approval" },
  { method: "PUT", path: "/api/me/blogs/:id", auth: "user", description: "Edit your own pending or published post" },
  { method: "DELETE", path: "/api/me/blogs/:id", auth: "user", description: "Delete your own post" },
  { method: "GET", path: "/api/admin/users", auth: "admin", description: "List every registered user" },
  { method: "GET", path: "/api/admin/blogs", auth: "admin", description: "List pending, approved, and rejected posts" },
  { method: "POST", path: "/api/admin/blogs", auth: "admin", description: "Create a post; set published true to show it immediately" },
  { method: "GET", path: "/api/admin/blogs/:id", auth: "admin", description: "Read any post by id" },
  { method: "PUT", path: "/api/admin/blogs/:id", auth: "admin", description: "Update any post" },
  { method: "DELETE", path: "/api/admin/blogs/:id", auth: "admin", description: "Delete any post" },
  { method: "POST", path: "/api/admin/blogs/:id/approve", auth: "admin", description: "Approve a post so it appears in GET /api/blogs" },
  { method: "POST", path: "/api/admin/blogs/:id/reject", auth: "admin", description: "Reject a post" },
  { method: "GET", path: "/api/admin/messages", auth: "admin", description: "List contact form messages" },
  { method: "POST", path: "/api/contact", auth: "public", description: "Submit the contact form" },
] as const;

export function normalizeApiPath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname || "/";
}

export function matchApiRoute(method: string, pathname: string): ApiMatch | null {
  const path = normalizeApiPath(pathname);
  const verb = method.toUpperCase();
  for (const pattern of API_PATTERNS) {
    if (pattern.method !== verb) continue;
    const params = pattern.match(path);
    if (params) return { route: pattern.route, params };
  }
  const allowed = API_PATTERNS.filter((pattern) => pattern.match(path)).map((pattern) => pattern.method);
  if (allowed.length) {
    return { route: "methodNotAllowed", params: {}, allowed: [...new Set(allowed)] };
  }
  return null;
}

export function readBearerToken(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const [scheme, ...rest] = header.trim().split(/\s+/);
  if (!scheme || scheme.toLowerCase() !== "bearer") return "";
  return rest.join(" ").trim();
}

export function statusForError(error: unknown) {
  const message = errorMessage(error);
  const text = message.toLowerCase();
  if (text.includes("please log in") || text.includes("incorrect")) return 401;
  if (text.includes("admin access") || text.includes("only edit") || text.includes("only delete")) return 403;
  if (text.includes("not found")) return 404;
  if (text.includes("already exists")) return 409;
  if (text.includes("reserved")) return 400;
  return 400;
}

export function errorMessage(error: unknown, fallback = "Request failed") {
  if (error instanceof Error && error.message.trim()) return error.message;
  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
}

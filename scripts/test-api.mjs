import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(name) {
  const path = resolve(process.cwd(), name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".dev.vars");

const candidates = [
  process.env.API_BASE_URL,
  "http://localhost:8081",
  "http://localhost:8090",
  "http://localhost:8080",
].filter(Boolean);

async function pickBase() {
  for (const base of candidates) {
    try {
      const response = await fetch(`${base.replace(/\/$/, "")}/api`);
      if (response.ok) return base.replace(/\/$/, "");
    } catch {
      // try next
    }
  }
  throw new Error("No running app found. Start npm run dev or docker compose, then retry.");
}

async function api(base, method, path, { token, body } = {}) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      ...(body ? { "content-type": "application/json" } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await response.json().catch(() => ({}));
  return { status: response.status, json };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const email = process.env.ADMIN_EMAIL || "admin@nikitanautya.com";
const password = process.env.ADMIN_PASSWORD;
if (!password) {
  throw new Error("ADMIN_PASSWORD is not set");
}

const base = await pickBase();
console.log("API", base);

const catalog = await api(base, "GET", "/api");
assert(catalog.status === 200 && catalog.json.ok, "GET /api failed");
assert(Array.isArray(catalog.json.data.endpoints), "catalog missing endpoints");

const denied = await api(base, "GET", "/api/admin/users");
assert(denied.status === 401, `admin users should be 401 without a token, got ${denied.status}`);

const login = await api(base, "POST", "/api/auth/login", { body: { email, password } });
assert(login.status === 200 && login.json.data?.token, `admin login failed: ${login.json.error || login.status}`);
const token = login.json.data.token;
assert(login.json.data.user.role === "admin", "login did not return an admin user");

const me = await api(base, "GET", "/api/auth/me", { token });
assert(me.json.data.user.email === email.toLowerCase(), "GET /api/auth/me did not return the admin");

const users = await api(base, "GET", "/api/admin/users", { token });
assert(users.status === 200 && Array.isArray(users.json.data), "GET /api/admin/users failed");
assert(users.json.data.some((user) => user.email === email.toLowerCase()), "admin missing from user list");

const stamp = Date.now().toString(36);
const created = await api(base, "POST", "/api/admin/blogs", {
  token,
  body: {
    title: `API pending ${stamp}`,
    excerpt: "Pending post used to verify admin approval.",
    body: "This post should stay hidden until an admin approves it.",
    published: false,
  },
});
assert(created.status === 201 && created.json.data.status === "pending", `create pending blog failed: ${created.json.error || created.status}`);
const blogId = created.json.data.id;
const slug = created.json.data.slug;

const publicBefore = await api(base, "GET", "/api/blogs");
assert(publicBefore.status === 200, "GET /api/blogs failed");
assert(
  !publicBefore.json.data.posts.some((post) => post.id === blogId),
  "pending post leaked into the public blog list",
);

const hidden = await api(base, "GET", `/api/blogs/${slug}`);
assert(hidden.status === 404, "pending post should not be readable on the public API");

const approved = await api(base, "POST", `/api/admin/blogs/${blogId}/approve`, { token, body: {} });
assert(approved.status === 200 && approved.json.data.status === "approved", `approve failed: ${approved.json.error || approved.status}`);

const publicAfter = await api(base, "GET", "/api/blogs");
assert(
  publicAfter.json.data.posts.some((post) => post.id === blogId),
  "approved post did not appear in GET /api/blogs",
);

const shown = await api(base, "GET", `/api/blogs/${slug}`);
assert(shown.status === 200 && shown.json.data.title.includes(stamp), "approved post was not returned by slug");

const cleanup = await api(base, "DELETE", `/api/admin/blogs/${blogId}`, { token });
assert(cleanup.status === 200, "failed to delete the test post");

const logout = await api(base, "POST", "/api/auth/logout", { token });
assert(logout.status === 200, "logout failed");
const afterLogout = await api(base, "GET", "/api/auth/me", { token });
assert(afterLogout.status === 401, "token should stop working after logout");

console.log("API checks passed");
console.log(`  users: ${users.json.data.length}`);
console.log(`  login/logout: ok`);
console.log(`  pending post hidden, then visible after approve`);

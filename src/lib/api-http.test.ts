import { describe, expect, it } from "vitest";
import { matchApiRoute, normalizeApiPath, readBearerToken, statusForError } from "./api-http";

describe("normalizeApiPath", () => {
  it("strips a trailing slash", () => {
    expect(normalizeApiPath("/api/blogs/")).toBe("/api/blogs");
  });
});

describe("matchApiRoute", () => {
  it("matches login and the public blog list", () => {
    expect(matchApiRoute("POST", "/api/auth/login")).toEqual({ route: "auth.login", params: {} });
    expect(matchApiRoute("GET", "/api/blogs")).toEqual({ route: "blogs.index", params: {} });
  });

  it("matches admin approve before a generic blog id", () => {
    expect(matchApiRoute("POST", "/api/admin/blogs/abc123/approve")).toEqual({
      route: "admin.blogs.approve",
      params: { id: "abc123" },
    });
    expect(matchApiRoute("GET", "/api/admin/users")?.route).toBe("admin.users");
  });

  it("returns 405 when the path exists for another method", () => {
    const match = matchApiRoute("DELETE", "/api/auth/login");
    expect(match?.route).toBe("methodNotAllowed");
    expect(match && "allowed" in match ? match.allowed : []).toContain("POST");
  });

  it("returns null for unknown paths", () => {
    expect(matchApiRoute("GET", "/api/nope")).toBeNull();
  });
});

describe("readBearerToken", () => {
  it("reads a bearer token", () => {
    const request = new Request("http://localhost/api/auth/me", {
      headers: { authorization: "Bearer secret-token" },
    });
    expect(readBearerToken(request)).toBe("secret-token");
  });

  it("returns empty when the header is missing", () => {
    expect(readBearerToken(new Request("http://localhost/api/auth/me"))).toBe("");
  });
});

describe("statusForError", () => {
  it("maps auth and not-found errors", () => {
    expect(statusForError(new Error("Please log in"))).toBe(401);
    expect(statusForError(new Error("Admin access required"))).toBe(403);
    expect(statusForError(new Error("Blog not found"))).toBe(404);
    expect(statusForError(new Error("An account with this email already exists. Log in instead."))).toBe(409);
  });
});

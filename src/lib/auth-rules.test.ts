import { describe, expect, it } from "vitest";
import {
  authErrorMessage,
  canAccessAdmin,
  isDuplicateAccountMessage,
  isReservedAdminEmail,
  loginSchema,
  registerSchema,
  resolveUserRole,
} from "./auth-rules";

const admin = "admin@nikitanautya.com";

describe("registerSchema", () => {
  it("accepts a normal new user", () => {
    const parsed = registerSchema.parse({
      name: "  Ada Lovelace  ",
      email: "Ada@Example.com ",
      password: "password1",
    });
    expect(parsed).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "password1",
    });
  });

  it("rejects a short name, invalid email, and short password", () => {
    expect(registerSchema.safeParse({ name: "A", email: "ada@example.com", password: "password1" }).success).toBe(false);
    expect(registerSchema.safeParse({ name: "Ada", email: "not-an-email", password: "password1" }).success).toBe(false);
    expect(registerSchema.safeParse({ name: "Ada", email: "ada@example.com", password: "short" }).success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("trims and lowercases email so spaced input still logs in", () => {
    const parsed = loginSchema.parse({ email: "  Ada@Example.com  ", password: "password1" });
    expect(parsed.email).toBe("ada@example.com");
  });

  it("rejects an empty password", () => {
    expect(loginSchema.safeParse({ email: "ada@example.com", password: "" }).success).toBe(false);
  });
});

describe("roles and reserved email", () => {
  it("reserves the admin email for create-account", () => {
    expect(isReservedAdminEmail("Admin@Nikitanautya.com", admin)).toBe(true);
    expect(isReservedAdminEmail("ada@example.com", admin)).toBe(false);
  });

  it("never grants admin access to a normal user", () => {
    expect(canAccessAdmin("user", "ada@example.com", admin)).toBe(false);
    expect(canAccessAdmin(undefined, "ada@example.com", admin)).toBe(false);
    expect(resolveUserRole("user", "ada@example.com", admin)).toBe("user");
  });

  it("grants admin access only to the admin account", () => {
    expect(canAccessAdmin("admin", admin, admin)).toBe(true);
    expect(canAccessAdmin("user", admin, admin)).toBe(true);
  });
});

describe("authErrorMessage", () => {
  it("reads zod and duplicate-account messages", () => {
    const parsed = registerSchema.safeParse({ name: "A", email: "ada@example.com", password: "password1" });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(authErrorMessage(parsed.error, "fallback")).toBe("Enter your name");
    }
    expect(isDuplicateAccountMessage("An account with this email already exists. Log in instead.")).toBe(true);
    expect(authErrorMessage(new Error("Email or password is incorrect"), "fallback")).toBe(
      "Email or password is incorrect",
    );
  });
});

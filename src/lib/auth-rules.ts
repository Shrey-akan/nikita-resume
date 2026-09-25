import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(120),
  password: z.string().min(8, "Password must be at least 8 characters").max(120),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(120),
  password: z.string().min(1, "Enter your password").max(120),
});

export function isReservedAdminEmail(email: string, adminEmail: string) {
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
}

export function resolveUserRole(
  role: string | undefined,
  email: string,
  adminEmail: string,
): "admin" | "user" {
  if (role === "admin" || isReservedAdminEmail(email, adminEmail)) return "admin";
  return "user";
}

export function canAccessAdmin(role: string | undefined, email: string, adminEmail: string) {
  return resolveUserRole(role, email, adminEmail) === "admin";
}

export function isDuplicateAccountMessage(message: string) {
  const text = message.toLowerCase();
  return text.includes("already exists") || text.includes("log in instead");
}

export function authErrorMessage(error: unknown, fallback: string) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message || fallback;
  }
  if (error instanceof Error && error.message) {
    try {
      const parsed = JSON.parse(error.message) as unknown;
      if (Array.isArray(parsed) && parsed[0] && typeof parsed[0] === "object" && "message" in parsed[0]) {
        return String((parsed[0] as { message: string }).message);
      }
      if (parsed && typeof parsed === "object" && "message" in parsed) {
        return String((parsed as { message: unknown }).message);
      }
    } catch {
      if (error.cause instanceof z.ZodError) {
        return error.cause.issues[0]?.message || fallback;
      }
      return error.message;
    }
    return error.message;
  }
  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
}

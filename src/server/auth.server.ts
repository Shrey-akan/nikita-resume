import type { ObjectId } from "mongodb";
import { adminEmail, optionalAdminPassword } from "./env";
import { isReservedAdminEmail, resolveUserRole } from "@/lib/auth-rules";
import {
  sessionsCollection,
  usersCollection,
  type UserDoc,
  type UserRole,
} from "./db.server";
import { createSessionToken, hashPassword, hashSessionToken, verifyPassword } from "./password.server";

const SESSION_DAYS = 30;

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export function userRole(user: UserDoc): UserRole {
  return resolveUserRole(user.role, user.email, adminEmail());
}

export function toPublicUser(id: string, user: UserDoc): PublicUser {
  return { id, name: user.name, email: user.email, role: userRole(user) };
}

let adminSeed: Promise<void> | null = null;

export async function ensureAdminUser() {
  if (!adminSeed) {
    adminSeed = (async () => {
      const email = adminEmail();
      const password = optionalAdminPassword();
      const users = await usersCollection();
      const existing = await users.findOne({ email });
      if (!existing) {
        if (!password) {
          throw new Error("ADMIN_PASSWORD is not set");
        }
        await users.insertOne({
          name: "Nikita Nautiyal",
          email,
          passwordHash: await hashPassword(password),
          role: "admin",
          createdAt: new Date(),
        });
        return;
      }
      const updates: Partial<UserDoc> = { role: "admin" };
      if (password && !(await verifyPassword(password, existing.passwordHash))) {
        updates.passwordHash = await hashPassword(password);
      }
      await users.updateOne({ _id: existing._id }, { $set: updates });
    })().catch((error) => {
      adminSeed = null;
      throw error;
    });
  }
  await adminSeed;
}

export async function issueSession(userId: ObjectId) {
  const token = createSessionToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const sessions = await sessionsCollection();
  await sessions.insertOne({
    tokenHash: hashSessionToken(token),
    userId,
    createdAt: now,
    expiresAt,
  });
  return token;
}

export async function requireUser(token: string) {
  if (!token) throw new Error("Please log in");
  const sessions = await sessionsCollection();
  const hashed = hashSessionToken(token);
  const now = new Date();
  let session = await sessions.findOne({ tokenHash: hashed, expiresAt: { $gt: now } });
  if (!session) {
    session = await sessions.findOne({ token, expiresAt: { $gt: now } });
    if (session) {
      await sessions.updateOne(
        { _id: session._id },
        { $set: { tokenHash: hashed }, $unset: { token: "" } },
      );
    }
  }
  if (!session) throw new Error("Please log in again");
  const users = await usersCollection();
  const user = await users.findOne({ _id: session.userId });
  if (!user) throw new Error("Please log in again");
  return { id: String(user._id), user, objectId: user._id };
}

export async function requireAdmin(token: string) {
  await ensureAdminUser();
  const session = await requireUser(token);
  if (userRole(session.user) !== "admin") {
    throw new Error("Admin access required");
  }
  return session;
}

export async function registerAccountImpl(data: { name: string; email: string; password: string }) {
  const email = data.email;
  if (isReservedAdminEmail(email, adminEmail())) {
    throw new Error("This email is reserved. Log in with the admin account instead.");
  }
  const users = await usersCollection();
  const existing = await users.findOne({ email });
  if (existing) {
    throw new Error("An account with this email already exists. Log in instead.");
  }
  const now = new Date();
  try {
    const result = await users.insertOne({
      name: data.name,
      email,
      passwordHash: await hashPassword(data.password),
      role: "user",
      createdAt: now,
      lastLoginAt: now,
    });
    const token = await issueSession(result.insertedId);
    return {
      token,
      user: { id: String(result.insertedId), name: data.name, email, role: "user" as const },
    };
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error.code === 11000) {
      throw new Error("An account with this email already exists. Log in instead.");
    }
    throw error;
  }
}

export async function loginAccountImpl(data: { email: string; password: string }) {
  const email = data.email;
  if (isReservedAdminEmail(email, adminEmail())) {
    try {
      await ensureAdminUser();
    } catch {
      // Existing admin accounts can still log in from the database hash.
    }
  }
  const users = await usersCollection();
  const user = await users.findOne({ email });
  if (!user || !(await verifyPassword(data.password, user.passwordHash))) {
    throw new Error("Email or password is incorrect");
  }
  await users.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });
  const token = await issueSession(user._id);
  return { token, user: toPublicUser(String(user._id), user) };
}

export async function currentUserImpl(token: string) {
  const { id, user } = await requireUser(token);
  return toPublicUser(id, user);
}

export async function logoutAccountImpl(token: string) {
  const sessions = await sessionsCollection();
  const hashed = hashSessionToken(token);
  await sessions.deleteMany({ $or: [{ tokenHash: hashed }, { token }] });
  return { ok: true };
}

export async function listUsersImpl(token: string) {
  await requireAdmin(token);
  const users = await usersCollection();
  const docs = await users.find({}).sort({ createdAt: -1 }).limit(500).toArray();
  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    role: userRole(doc),
    createdAt: doc.createdAt.toISOString(),
    lastLoginAt: doc.lastLoginAt ? doc.lastLoginAt.toISOString() : null,
  }));
}

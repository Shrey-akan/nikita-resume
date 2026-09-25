import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { readFileSync } from "node:fs";
import { MongoClient } from "mongodb";

const scryptAsync = promisify(scrypt);

function loadEnvFile(path) {
  try {
    const text = readFileSync(path, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // ignore
  }
}

loadEnvFile(".dev.vars");
loadEnvFile(".env");

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scryptAsync(password, salt, 64);
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = await scryptAsync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (expected.length !== derived.length) return false;
  return timingSafeEqual(expected, derived);
}

function fail(message) {
  console.error("FAIL", message);
  process.exitCode = 1;
}

function pass(message) {
  console.log("PASS", message);
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "nikita_nautya";
const adminEmail = (process.env.ADMIN_EMAIL || "admin@nikitanautya.com").trim().toLowerCase();

if (!uri) {
  console.error("MONGODB_URI missing");
  process.exit(1);
}

const email = `test.user.${Date.now()}@example.com`;
const password = "testpass123";
const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);
const users = db.collection("users");
const blogs = db.collection("blogs");

try {
  const reserved = await users.findOne({ email: adminEmail });
  if (reserved?.role === "admin") pass("admin account exists and is not a normal user");
  else fail("admin account missing");

  await users.insertOne({
    name: "Test User",
    email,
    passwordHash: await hashPassword(password),
    role: "user",
    createdAt: new Date(),
    lastLoginAt: new Date(),
  });
  pass("new user can be created");

  const created = await users.findOne({ email });
  if (created?.role === "user") pass("new user role is user, not admin");
  else fail("new user was granted admin");

  if (await verifyPassword(password, created.passwordHash)) pass("new user can log in with the same password");
  else fail("new user password did not verify");

  if (!(await verifyPassword("wrong-password", created.passwordHash))) pass("wrong password is rejected");
  else fail("wrong password was accepted");

  const duplicate = await users.findOne({ email: email.toUpperCase() }) || await users.findOne({ email });
  if (duplicate) pass("duplicate email is already taken");

  const pending = {
    slug: `test-pending-${Date.now()}`,
    title: "Pending test post",
    excerpt: "This should stay hidden until admin approval.",
    body: "A new user wrote this post for review.",
    coverImage: null,
    coverThumb: null,
    published: false,
    status: "pending",
    isBlogOfTheDay: false,
    views: 0,
    authorId: String(created._id),
    authorName: created.name,
    authorEmail: created.email,
    likesCount: 0,
    commentsCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: null,
  };
  await blogs.insertOne(pending);
  const hidden = await blogs.findOne({
    slug: pending.slug,
    $or: [{ status: "approved" }, { published: true, status: { $exists: false } }],
  });
  if (!hidden) pass("new user post stays hidden until approved");
  else fail("pending post leaked into the public blog query");

  await blogs.updateOne({ slug: pending.slug }, { $set: { status: "approved", published: true, publishedAt: new Date() } });
  const visible = await blogs.findOne({
    slug: pending.slug,
    $or: [{ status: "approved" }, { published: true, status: { $exists: false } }],
  });
  if (visible) pass("approved post becomes visible on the blog");
  else fail("approved post did not become public");
} finally {
  await blogs.deleteMany({ authorEmail: email });
  await users.deleteOne({ email });
  await client.close();
}

if (process.exitCode) {
  console.error("user auth edge-case checks failed");
  process.exit(1);
}
console.log("user auth edge-case checks passed");

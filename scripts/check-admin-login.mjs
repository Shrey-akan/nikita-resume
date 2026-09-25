import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";

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

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "nikita_nautya";
const email = (process.env.ADMIN_EMAIL || "admin@nikitanautya.com").trim().toLowerCase();
const password = (process.env.ADMIN_PASSWORD || "").trim();

if (!uri) {
  console.error("MONGODB_URI missing");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const users = client.db(dbName).collection("users");
let user = await users.findOne({ email });

console.log("adminEmail", email);
console.log("adminPasswordSet", Boolean(password), "length", password.length);
console.log("userExists", Boolean(user));
if (user) {
  console.log("userRole", user.role);
  console.log("hashFormat", typeof user.passwordHash === "string" ? user.passwordHash.split(":")[0]?.length : "none");
  console.log("passwordMatches", password ? await verifyPassword(password, user.passwordHash) : false);
}

if (!user) {
  await users.insertOne({
    name: "Nikita Nautiyal",
    email,
    passwordHash: await hashPassword(password),
    role: "admin",
    createdAt: new Date(),
  });
  user = await users.findOne({ email });
  console.log("seededAdmin", true);
} else {
  const updates = { role: "admin" };
  if (!password || !(await verifyPassword(password, user.passwordHash))) {
    updates.passwordHash = await hashPassword(password);
    console.log("resetAdminPassword", true);
  }
  await users.updateOne({ _id: user._id }, { $set: updates });
}

const fresh = await users.findOne({ email });
const ok = await verifyPassword(password, fresh.passwordHash);
console.log("loginWouldSucceed", ok);
console.log("finalRole", fresh.role);
await client.close();
process.exit(ok ? 0 : 2);

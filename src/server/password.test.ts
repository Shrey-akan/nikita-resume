import { describe, expect, it } from "vitest";
import { hashPassword, hashSessionToken, verifyPassword } from "./password.server";

describe("password hashing", () => {
  it("verifies the original password", async () => {
    const stored = await hashPassword("ShreyansBlog0904");
    expect(await verifyPassword("ShreyansBlog0904", stored)).toBe(true);
  });

  it("rejects a wrong password", async () => {
    const stored = await hashPassword("ShreyansBlog0904");
    expect(await verifyPassword("wrong-password", stored)).toBe(false);
  });

  it("rejects a malformed hash", async () => {
    expect(await verifyPassword("ShreyansBlog0904", "not-a-hash")).toBe(false);
  });
});

describe("session tokens", () => {
  it("hashes the same token consistently", () => {
    expect(hashSessionToken("abc")).toBe(hashSessionToken("abc"));
    expect(hashSessionToken("abc")).not.toBe(hashSessionToken("abd"));
  });
});

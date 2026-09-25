import { describe, expect, it } from "vitest";
import { adminEmail, optionalAdminPassword } from "./env";

describe("admin env", () => {
  it("defaults to the admin email when ADMIN_EMAIL is empty", () => {
    const previous = process.env.ADMIN_EMAIL;
    delete process.env.ADMIN_EMAIL;
    expect(adminEmail()).toBe("admin@nikitanautya.com");
    if (previous === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = previous;
  });

  it("reads an optional admin password without throwing", () => {
    expect(typeof optionalAdminPassword()).toBe("string");
  });
});

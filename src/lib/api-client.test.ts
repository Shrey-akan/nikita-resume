import { describe, expect, it } from "vitest";
import { ApiError, unwrapApi } from "./api-client";

describe("unwrapApi", () => {
  it("returns data on success", () => {
    expect(unwrapApi(200, { ok: true, data: { token: "abc" } })).toEqual({ token: "abc" });
  });

  it("throws the API error message", () => {
    expect(() => unwrapApi(401, { ok: false, error: "Email or password is incorrect" })).toThrow(ApiError);
    try {
      unwrapApi(401, { ok: false, error: "Email or password is incorrect" });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).message).toBe("Email or password is incorrect");
      expect((error as ApiError).status).toBe(401);
    }
  });
});

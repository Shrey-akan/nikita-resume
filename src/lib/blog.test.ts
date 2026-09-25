import { describe, expect, it } from "vitest";
import { isPublicBlog, slugify } from "./blog";

describe("slugify", () => {
  it("turns a title into a url slug", () => {
    expect(slugify("Hello from the Studio")).toBe("hello-from-the-studio");
  });

  it("falls back when the title has no letters", () => {
    expect(slugify("@@@")).toBe("post");
  });
});

describe("isPublicBlog", () => {
  it("shows only approved posts", () => {
    expect(isPublicBlog({ status: "approved" })).toBe(true);
    expect(isPublicBlog({ status: "pending" })).toBe(false);
    expect(isPublicBlog({ status: "rejected" })).toBe(false);
  });

  it("keeps legacy published posts without a status", () => {
    expect(isPublicBlog({ published: true })).toBe(true);
    expect(isPublicBlog({ published: false })).toBe(false);
  });

  it("does not show a pending post even if published was true", () => {
    expect(isPublicBlog({ status: "pending", published: true })).toBe(false);
  });
});

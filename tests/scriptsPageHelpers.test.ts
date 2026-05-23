import { describe, it, expect } from "vitest";
import { makeHref } from "@/lib/scriptsPageHelpers";

describe("makeHref", () => {
  it("returns /scripts when no params", () => {
    expect(makeHref({}, {})).toBe("/scripts");
  });

  it("preserves existing search params", () => {
    const href = makeHref({ q: "fitness" }, {});
    expect(href).toBe("/scripts?q=fitness");
  });

  it("adds a new filter param", () => {
    const href = makeHref({}, { platform: "YOUTUBE" });
    expect(href).toBe("/scripts?platform=YOUTUBE");
  });

  it("merges patch over current params", () => {
    const href = makeHref({ platform: "YOUTUBE", q: "health" }, { platform: "TIKTOK" });
    expect(href).toContain("platform=TIKTOK");
    expect(href).toContain("q=health");
    expect(href).not.toContain("YOUTUBE");
  });

  it("removes param when patch value is undefined", () => {
    const href = makeHref({ platform: "YOUTUBE", q: "health" }, { platform: undefined });
    expect(href).not.toContain("platform");
    expect(href).toContain("q=health");
  });

  it("removes param when patch value is 'all'", () => {
    const href = makeHref({ status: "DRAFT" }, { status: "all" });
    expect(href).not.toContain("status");
  });

  it("sets page param for pagination", () => {
    const href = makeHref({ q: "tips" }, { page: "2" });
    expect(href).toBe("/scripts?q=tips&page=2");
  });

  it("handles all filter params together", () => {
    const href = makeHref(
      { q: "fitness", clientId: "abc123", platform: "YOUTUBE", status: "DRAFT", page: "1" },
      { page: "2" }
    );
    expect(href).toContain("q=fitness");
    expect(href).toContain("clientId=abc123");
    expect(href).toContain("platform=YOUTUBE");
    expect(href).toContain("status=DRAFT");
    expect(href).toContain("page=2");
    expect(href).not.toContain("page=1");
  });

  it("returns /scripts when all params are undefined", () => {
    const href = makeHref(
      { platform: "YOUTUBE" },
      { platform: undefined }
    );
    expect(href).toBe("/scripts");
  });
});

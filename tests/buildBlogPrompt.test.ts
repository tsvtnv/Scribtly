import { describe, it, expect } from "vitest";
import { buildBlogPrompt } from "@/lib/buildBlogPrompt";

describe("buildBlogPrompt", () => {
  it("includes existing titles in user message to avoid duplication", () => {
    const { userMessage } = buildBlogPrompt(["How to write a YouTube hook"]);
    expect(userMessage).toContain("How to write a YouTube hook");
  });

  it("works with no existing titles", () => {
    const { system, userMessage } = buildBlogPrompt([]);
    expect(system).toContain("Scribtly");
    expect(userMessage).toContain("JSON");
  });

  it("system prompt includes Scribtly brand context", () => {
    const { system } = buildBlogPrompt([]);
    expect(system).toContain("Scribtly");
    expect(system).toContain("freelancer");
  });

  it("user message requests all required JSON fields", () => {
    const { userMessage } = buildBlogPrompt([]);
    expect(userMessage).toContain("slug");
    expect(userMessage).toContain("title");
    expect(userMessage).toContain("metaDescription");
    expect(userMessage).toContain("excerpt");
    expect(userMessage).toContain("tags");
    expect(userMessage).toContain("readingMins");
    expect(userMessage).toContain("content");
  });

  it("does not contain unfilled template placeholders", () => {
    const { system, userMessage } = buildBlogPrompt(["existing title"]);
    expect(system).not.toContain("{{");
    expect(userMessage).not.toContain("{{");
  });
});

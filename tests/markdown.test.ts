import { describe, it, expect } from "vitest";
import { markdownToHtml } from "@/lib/markdown";

describe("markdownToHtml", () => {
  it("converts ## headings to h2", () => {
    expect(markdownToHtml("## Hello World")).toContain("<h2>Hello World</h2>");
  });

  it("converts ### headings to h3", () => {
    expect(markdownToHtml("### Sub heading")).toContain("<h3>Sub heading</h3>");
  });

  it("converts **text** to strong", () => {
    expect(markdownToHtml("Some **bold** text")).toContain("<strong>bold</strong>");
  });

  it("converts *text* to em", () => {
    expect(markdownToHtml("Some *italic* text")).toContain("<em>italic</em>");
  });

  it("converts - list items to li wrapped in ul", () => {
    const result = markdownToHtml("- item one\n- item two");
    expect(result).toContain("<ul>");
    expect(result).toContain("<li>item one</li>");
    expect(result).toContain("<li>item two</li>");
    expect(result).toContain("</ul>");
  });

  it("wraps plain text lines in p tags", () => {
    expect(markdownToHtml("Hello world")).toContain("<p>Hello world</p>");
  });

  it("does not wrap heading lines in p tags", () => {
    const result = markdownToHtml("## Title");
    expect(result).not.toContain("<p><h2>");
  });

  it("does not double-wrap list items in p tags", () => {
    const result = markdownToHtml("- item");
    expect(result).not.toContain("<p><li>");
  });
});

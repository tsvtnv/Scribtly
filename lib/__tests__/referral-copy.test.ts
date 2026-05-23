import { describe, it, expect } from "vitest";
import { getCopyForServices } from "../referral-copy";

describe("getCopyForServices", () => {
  it("returns TikTok copy for tiktok service", () => {
    const copy = getCopyForServices("tiktok content, short-form video");
    expect(copy.painPoints[0]).toContain("voice");
    expect(copy.tagline).toBeTruthy();
  });

  it("returns YouTube copy for youtube service", () => {
    const copy = getCopyForServices("YouTube management");
    expect(copy.painPoints[0]).toContain("hours");
  });

  it("returns social copy for social media management", () => {
    const copy = getCopyForServices("social media management");
    expect(copy.painPoints[0]).toContain("clients");
    expect(copy.tagline).toBeTruthy();
  });

  it("returns default copy for unknown services", () => {
    const copy = getCopyForServices("web design");
    expect(copy.painPoints).toHaveLength(3);
    expect(copy.solutions).toHaveLength(3);
  });

  it("returns default copy for empty string", () => {
    const copy = getCopyForServices("");
    expect(copy.painPoints).toHaveLength(3);
  });
});

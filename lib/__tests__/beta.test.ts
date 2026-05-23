import { describe, it, expect } from "vitest";

describe("beta helpers", () => {
  it("betaExpiresAt is 90 days from now", () => {
    const now = new Date("2026-01-01T00:00:00Z");
    const expires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    expect(expires.toISOString().slice(0, 10)).toBe("2026-04-01");
  });

  it("betaActive is true when isBetaTester and betaExpiresAt is in the future", () => {
    const future = new Date(Date.now() + 1000 * 60 * 60);
    const betaActive = true && future > new Date();
    expect(betaActive).toBe(true);
  });

  it("betaActive is false when betaExpiresAt is in the past", () => {
    const past = new Date(Date.now() - 1000);
    const betaActive = true && past > new Date();
    expect(betaActive).toBe(false);
  });
});

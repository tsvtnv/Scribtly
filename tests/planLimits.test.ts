import { describe, it, expect } from "vitest";
import {
  canGenerateScript,
  canUsePlatform,
  canUseExtras,
  canExportPDF,
  canAddClient,
  canInviteMembers,
  canBulkGenerate,
  getMaxMembers,
  getRemainingScripts,
} from "@/lib/planLimits";

describe("planLimits", () => {
  it("FREE blocks generation at 5", () => {
    expect(canGenerateScript({ plan: "FREE", scriptCount: 0 })).toBe(true);
    expect(canGenerateScript({ plan: "FREE", scriptCount: 4 })).toBe(true);
    expect(canGenerateScript({ plan: "FREE", scriptCount: 5 })).toBe(false);
  });

  it("PRO blocks at 100, AGENCY blocks at 350", () => {
    expect(canGenerateScript({ plan: "PRO", scriptCount: 99 })).toBe(true);
    expect(canGenerateScript({ plan: "PRO", scriptCount: 100 })).toBe(false);
    expect(canGenerateScript({ plan: "AGENCY", scriptCount: 349 })).toBe(true);
    expect(canGenerateScript({ plan: "AGENCY", scriptCount: 350 })).toBe(false);
  });

  it("FREE allows all platforms", () => {
    expect(canUsePlatform({ plan: "FREE" }, "YOUTUBE")).toBe(true);
    expect(canUsePlatform({ plan: "FREE" }, "TIKTOK")).toBe(true);
    expect(canUsePlatform({ plan: "FREE" }, "PODCAST")).toBe(true);
    expect(canUsePlatform({ plan: "PRO" }, "TIKTOK")).toBe(true);
    expect(canUsePlatform({ plan: "AGENCY" }, "PODCAST")).toBe(true);
  });

  it("Extras and PDF are PRO/AGENCY only", () => {
    expect(canUseExtras({ plan: "FREE" })).toBe(false);
    expect(canUseExtras({ plan: "BASIC" })).toBe(false);
    expect(canUseExtras({ plan: "PRO" })).toBe(true);
    expect(canExportPDF({ plan: "FREE" })).toBe(false);
    expect(canExportPDF({ plan: "AGENCY" })).toBe(true);
  });

  it("FREE client limit is 1", () => {
    expect(canAddClient({ plan: "FREE" }, 0)).toBe(true);
    expect(canAddClient({ plan: "FREE" }, 1)).toBe(false);
    expect(canAddClient({ plan: "PRO" }, 9)).toBe(true);
    expect(canAddClient({ plan: "PRO" }, 10)).toBe(false);
    expect(canAddClient({ plan: "AGENCY" }, 100)).toBe(true);
  });

  it("Only AGENCY can invite + bulk generate", () => {
    expect(canInviteMembers({ plan: "AGENCY" })).toBe(true);
    expect(canInviteMembers({ plan: "PRO" })).toBe(false);
    expect(canBulkGenerate({ plan: "AGENCY" })).toBe(true);
    expect(canBulkGenerate({ plan: "FREE" })).toBe(false);
  });

  it("Max members per plan", () => {
    expect(getMaxMembers("FREE")).toBe(1);
    expect(getMaxMembers("PRO")).toBe(1);
    expect(getMaxMembers("AGENCY")).toBe(3);
  });

  it("Remaining scripts", () => {
    expect(getRemainingScripts({ plan: "FREE", scriptCount: 0 })).toBe(5);
    expect(getRemainingScripts({ plan: "FREE", scriptCount: 5 })).toBe(0);
    expect(getRemainingScripts({ plan: "PRO", scriptCount: 0 })).toBe(100);
  });
});

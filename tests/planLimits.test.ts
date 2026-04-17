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
  it("FREE blocks generation at 3", () => {
    expect(canGenerateScript({ plan: "FREE", scriptCount: 0 })).toBe(true);
    expect(canGenerateScript({ plan: "FREE", scriptCount: 2 })).toBe(true);
    expect(canGenerateScript({ plan: "FREE", scriptCount: 3 })).toBe(false);
  });

  it("PRO and AGENCY allow unlimited generation", () => {
    expect(canGenerateScript({ plan: "PRO", scriptCount: 1000 })).toBe(true);
    expect(canGenerateScript({ plan: "AGENCY", scriptCount: 9999 })).toBe(true);
  });

  it("FREE only allows YouTube", () => {
    expect(canUsePlatform({ plan: "FREE" }, "YOUTUBE")).toBe(true);
    expect(canUsePlatform({ plan: "FREE" }, "TIKTOK")).toBe(false);
    expect(canUsePlatform({ plan: "PRO" }, "TIKTOK")).toBe(true);
    expect(canUsePlatform({ plan: "AGENCY" }, "PODCAST")).toBe(true);
  });

  it("Extras and PDF are PRO/AGENCY only", () => {
    expect(canUseExtras({ plan: "FREE" })).toBe(false);
    expect(canUseExtras({ plan: "PRO" })).toBe(true);
    expect(canExportPDF({ plan: "FREE" })).toBe(false);
    expect(canExportPDF({ plan: "AGENCY" })).toBe(true);
  });

  it("FREE client limit is 1", () => {
    expect(canAddClient({ plan: "FREE" }, 0)).toBe(true);
    expect(canAddClient({ plan: "FREE" }, 1)).toBe(false);
    expect(canAddClient({ plan: "PRO" }, 100)).toBe(true);
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
    expect(getMaxMembers("AGENCY")).toBe(5);
  });

  it("Remaining scripts", () => {
    expect(getRemainingScripts({ plan: "FREE", scriptCount: 0 })).toBe(3);
    expect(getRemainingScripts({ plan: "FREE", scriptCount: 3 })).toBe(0);
    expect(getRemainingScripts({ plan: "PRO", scriptCount: 0 })).toBe(Infinity);
  });
});

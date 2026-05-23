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
  canAccessPipeline,
  canAccessCalendar,
  isNearScriptLimit,
  hasReachedScriptLimit,
  getScriptLimit,
  getClientLimit,
  canUseAllModels,
  getAvailableModels,
  allowedPlatforms,
  getPlanConfig,
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

describe("canAccessPipeline", () => {
  it("FREE and BASIC cannot access pipeline", () => {
    expect(canAccessPipeline("FREE")).toBe(false);
    expect(canAccessPipeline("BASIC")).toBe(false);
  });

  it("PRO, AGENCY, ENTERPRISE can access pipeline", () => {
    expect(canAccessPipeline("PRO")).toBe(true);
    expect(canAccessPipeline("AGENCY")).toBe(true);
    expect(canAccessPipeline("ENTERPRISE")).toBe(true);
  });
});

describe("canAccessCalendar", () => {
  it("FREE and BASIC cannot access calendar", () => {
    expect(canAccessCalendar("FREE")).toBe(false);
    expect(canAccessCalendar("BASIC")).toBe(false);
  });

  it("PRO, AGENCY, ENTERPRISE can access calendar", () => {
    expect(canAccessCalendar("PRO")).toBe(true);
    expect(canAccessCalendar("AGENCY")).toBe(true);
    expect(canAccessCalendar("ENTERPRISE")).toBe(true);
  });
});

describe("isNearScriptLimit", () => {
  it("returns false when well below 80%", () => {
    expect(isNearScriptLimit({ plan: "FREE", scriptCount: 3 })).toBe(false);
    expect(isNearScriptLimit({ plan: "PRO", scriptCount: 50 })).toBe(false);
  });

  it("returns true at exactly 80% of limit", () => {
    expect(isNearScriptLimit({ plan: "FREE", scriptCount: 4 })).toBe(true);
    expect(isNearScriptLimit({ plan: "PRO", scriptCount: 80 })).toBe(true);
  });

  it("returns true when over 80%", () => {
    expect(isNearScriptLimit({ plan: "FREE", scriptCount: 5 })).toBe(true);
    expect(isNearScriptLimit({ plan: "PRO", scriptCount: 99 })).toBe(true);
  });
});

describe("hasReachedScriptLimit", () => {
  it("returns false when below limit", () => {
    expect(hasReachedScriptLimit({ plan: "FREE", scriptCount: 4 })).toBe(false);
    expect(hasReachedScriptLimit({ plan: "PRO", scriptCount: 99 })).toBe(false);
  });

  it("returns true at exact limit", () => {
    expect(hasReachedScriptLimit({ plan: "FREE", scriptCount: 5 })).toBe(true);
    expect(hasReachedScriptLimit({ plan: "PRO", scriptCount: 100 })).toBe(true);
    expect(hasReachedScriptLimit({ plan: "AGENCY", scriptCount: 350 })).toBe(true);
  });

  it("returns true when over limit", () => {
    expect(hasReachedScriptLimit({ plan: "FREE", scriptCount: 10 })).toBe(true);
  });
});

describe("getScriptLimit", () => {
  it("returns correct limits per plan", () => {
    expect(getScriptLimit("FREE")).toBe(5);
    expect(getScriptLimit("BASIC")).toBe(25);
    expect(getScriptLimit("PRO")).toBe(100);
    expect(getScriptLimit("AGENCY")).toBe(350);
    expect(getScriptLimit("ENTERPRISE")).toBe(999999);
  });
});

describe("getClientLimit", () => {
  it("returns correct client limits per plan", () => {
    expect(getClientLimit("FREE")).toBe(1);
    expect(getClientLimit("BASIC")).toBe(3);
    expect(getClientLimit("PRO")).toBe(10);
    expect(getClientLimit("AGENCY")).toBe(-1);
    expect(getClientLimit("ENTERPRISE")).toBe(-1);
  });
});

describe("canUseAllModels", () => {
  it("FREE cannot use all models (only STANDARD)", () => {
    expect(canUseAllModels("FREE")).toBe(false);
  });

  it("PRO, AGENCY, ENTERPRISE can use all models", () => {
    expect(canUseAllModels("PRO")).toBe(true);
    expect(canUseAllModels("AGENCY")).toBe(true);
    expect(canUseAllModels("ENTERPRISE")).toBe(true);
  });

  it("BASIC can use all models", () => {
    expect(canUseAllModels("BASIC")).toBe(true);
  });
});

describe("getAvailableModels", () => {
  it("FREE gets only STANDARD model", () => {
    expect(getAvailableModels("FREE")).toEqual(["STANDARD"]);
  });

  it("PRO gets all 3 models", () => {
    expect(getAvailableModels("PRO")).toEqual(["STANDARD", "QUALITY", "PREMIUM"]);
  });
});

describe("allowedPlatforms", () => {
  it("all plans allow all 5 platforms", () => {
    const expected = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"];
    expect(allowedPlatforms("FREE")).toEqual(expected);
    expect(allowedPlatforms("PRO")).toEqual(expected);
    expect(allowedPlatforms("AGENCY")).toEqual(expected);
  });
});

describe("getPlanConfig", () => {
  it("returns full config object for FREE plan", () => {
    const config = getPlanConfig("FREE");
    expect(config.label).toBe("Free");
    expect(config.price_gbp).toBe(0);
    expect(config.scripts_per_month).toBe(5);
    expect(config.pipeline).toBe(false);
  });

  it("returns full config object for AGENCY plan", () => {
    const config = getPlanConfig("AGENCY");
    expect(config.label).toBe("Agency");
    expect(config.bulk_generation).toBe(true);
    expect(config.priority_support).toBe(true);
    expect(config.client_limit).toBe(-1);
  });
});

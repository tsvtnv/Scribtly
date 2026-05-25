import { describe, it, expect } from "vitest";
import { getPlanCtaAction, type PlanCtaAction } from "@/lib/planCtaLogic";

describe("getPlanCtaAction", () => {
  it("returns signup action when not logged in", () => {
    expect(getPlanCtaAction({ cardPlan: "PRO", userPlan: null, hasSubscription: false })).toEqual({
      type: "signup",
      href: "/signup?plan=PRO",
    });
  });

  it("returns signup action for FREE card when not logged in", () => {
    expect(getPlanCtaAction({ cardPlan: "FREE", userPlan: null, hasSubscription: false })).toEqual({
      type: "signup",
      href: "/signup",
    });
  });

  it("returns current when card matches user plan", () => {
    expect(getPlanCtaAction({ cardPlan: "PRO", userPlan: "PRO", hasSubscription: true })).toEqual({
      type: "current",
    });
  });

  it("returns checkout when user is FREE and card is paid (no subscription)", () => {
    expect(getPlanCtaAction({ cardPlan: "BASIC", userPlan: "FREE", hasSubscription: false })).toEqual({
      type: "checkout",
      label: "Upgrade to Basic",
    });
  });

  it("returns portal with upgrade label when card is higher tier", () => {
    expect(getPlanCtaAction({ cardPlan: "AGENCY", userPlan: "PRO", hasSubscription: true })).toEqual({
      type: "portal",
      label: "Upgrade to Agency",
    });
  });

  it("returns portal with downgrade label when card is lower tier", () => {
    expect(getPlanCtaAction({ cardPlan: "BASIC", userPlan: "PRO", hasSubscription: true })).toEqual({
      type: "portal",
      label: "Downgrade to Basic",
    });
  });

  it("returns portal with downgrade label for FREE card when user has subscription", () => {
    expect(getPlanCtaAction({ cardPlan: "FREE", userPlan: "PRO", hasSubscription: true })).toEqual({
      type: "portal",
      label: "Downgrade to Free",
    });
  });
});

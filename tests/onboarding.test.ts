import { describe, it, expect } from "vitest";
import { shouldRedirectToOnboarding } from "@/lib/onboarding/shouldRedirectToOnboarding";
import { getTopicSuggestion } from "@/lib/onboarding/topicSuggestion";

describe("shouldRedirectToOnboarding", () => {
  it("returns true when onboarding is not completed", () => {
    expect(shouldRedirectToOnboarding(false)).toBe(true);
  });

  it("returns false when onboarding is completed", () => {
    expect(shouldRedirectToOnboarding(true)).toBe(false);
  });
});

describe("getTopicSuggestion", () => {
  it("returns known suggestion for fitness niche", () => {
    expect(getTopicSuggestion("fitness")).toBe(
      "5 reasons most people quit the gym after 2 weeks"
    );
  });

  it("returns known suggestion for travel niche", () => {
    expect(getTopicSuggestion("travel")).toBe(
      "How I planned a 2-week Europe trip for under £1000"
    );
  });

  it("returns known suggestion for food niche", () => {
    expect(getTopicSuggestion("food")).toBe(
      "3 mistakes beginners make when cooking pasta"
    );
  });

  it("returns known suggestion for saas niche", () => {
    expect(getTopicSuggestion("saas")).toBe(
      "The feature we almost didn't build that 3x our retention"
    );
  });

  it("returns known suggestion for tech niche", () => {
    expect(getTopicSuggestion("tech")).toBe(
      "The feature we almost didn't build that 3x our retention"
    );
  });

  it("returns fallback for unknown niche", () => {
    expect(getTopicSuggestion("pottery")).toBe(
      "3 common mistakes beginners make in pottery"
    );
  });

  it("trims whitespace from niche before lookup", () => {
    expect(getTopicSuggestion("  fitness  ")).toBe(
      "5 reasons most people quit the gym after 2 weeks"
    );
  });

  it("normalises niche to lowercase for lookup", () => {
    expect(getTopicSuggestion("FITNESS")).toBe(
      "5 reasons most people quit the gym after 2 weeks"
    );
  });

  it("uses lowercase niche in fallback message", () => {
    expect(getTopicSuggestion("Photography")).toBe(
      "3 common mistakes beginners make in photography"
    );
  });
});

import { describe, it, expect } from "vitest";
import { buildPrompt } from "@/lib/buildPrompt";

const client = {
  name: "Alex Morgan",
  niche: "fitness coaching for busy parents",
  targetAudience: "parents aged 30-45 who want to get fit in under 30 minutes a day",
  toneOfVoice: "motivational, no-fluff, real talk",
  examplePhrases: "no excuses, let's go, real talk",
  avoidTopics: "extreme diets",
};

describe("buildPrompt", () => {
  it("fills YouTube template with client voice and topic", () => {
    const r = buildPrompt({
      client,
      platform: "YOUTUBE",
      topic: "morning routines that stick",
      duration: "8-10 min",
    });
    expect(r.system).toContain("Alex Morgan");
    expect(r.system).toContain("fitness coaching");
    expect(r.system).not.toContain("{{");
    expect(r.userMessage).toContain("morning routines that stick");
    expect(r.userMessage).toContain("8-10 min");
    expect(r.userMessage).toContain("[HOOK]");
    expect(r.userMessage).toContain("Quality rules");
    expect(r.userMessage).not.toContain("{{");
  });

  it("includes hook style when provided", () => {
    const r = buildPrompt({
      client,
      platform: "TIKTOK",
      topic: "x",
      duration: "30 sec",
      hookStyle: "hot_take",
    });
    expect(r.userMessage.toLowerCase()).toContain("hot take");
  });

  it("appends extras prompts when requested", () => {
    const r = buildPrompt({
      client,
      platform: "YOUTUBE",
      topic: "x",
      duration: "3-5 min",
      extraOutputs: ["title_options", "description"],
    });
    expect(r.userMessage).toContain("[TITLE_OPTIONS]");
    expect(r.userMessage).toContain("[DESCRIPTION]");
    expect(r.userMessage.toLowerCase()).toContain("title options");
  });

  it("handles empty optional client fields", () => {
    const r = buildPrompt({
      client: { ...client, examplePhrases: "", avoidTopics: "" },
      platform: "YOUTUBE",
      topic: "x",
      duration: "3-5 min",
    });
    expect(r.system).toContain("(none specified)");
  });
});

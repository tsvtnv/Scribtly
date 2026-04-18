export interface AgencyCopy {
  tagline: string;
  painPoints: string[];
  solutions: string[];
}

const COPY: Record<string, AgencyCopy> = {
  tiktok: {
    tagline: "Client-ready TikTok scripts. In their voice. In seconds.",
    painPoints: [
      "Every client needs a completely different voice — and you're rewriting every draft from scratch.",
      "Generic AI scripts sound robotic. Clients can always tell.",
      "Rewrites eat your team's time and kill your margins.",
    ],
    solutions: [
      "Scribtly builds a voice profile per client — every script sounds like them, not like AI.",
      "One brief in. Client-ready TikTok script out. No editing required.",
      "10 clients? Generate all 10 scripts in the time it used to take for one.",
    ],
  },
  youtube: {
    tagline: "Long-form scripts that sound exactly like your client. Every time.",
    painPoints: [
      "Long-form YouTube scripts take hours per client — and that's before revisions.",
      "Maintaining brand voice across episodes is a constant battle.",
      "Brief → script handoff always loses context. You end up rewriting anyway.",
    ],
    solutions: [
      "Scribtly stores your client's full brand voice — tone, pacing, style, CTAs — and applies it automatically.",
      "Generate a full-length YouTube script from a topic in under 60 seconds.",
      "Every script stays consistent with the last one. No context lost.",
    ],
  },
  social: {
    tagline: "Manage scripts for every client without the chaos.",
    painPoints: [
      "Managing scripts and content for 10+ clients is a full-time job on its own.",
      "Inconsistent tone across platforms makes clients look unprofessional.",
      "Client revisions never end because the first draft never sounds like them.",
    ],
    solutions: [
      "One workspace per client. Every voice profile saved. Every script consistent.",
      "Scripts automatically adapted for YouTube, TikTok, Reels, LinkedIn, and Podcasts.",
      "First draft sounds like the client — revisions drop dramatically.",
    ],
  },
  default: {
    tagline: "AI scripts that actually sound like your clients.",
    painPoints: [
      "Every client, different voice — and you're rewriting every AI draft from scratch.",
      "Generic AI output needs too much editing to be worth using.",
      "Script production doesn't scale with your client roster.",
    ],
    solutions: [
      "Scribtly learns each client's exact voice and applies it to every script.",
      "Generate client-ready scripts from a topic in under 60 seconds.",
      "Scale to any number of clients without adding headcount.",
    ],
  },
};

export function getCopyForServices(services: string): AgencyCopy {
  const s = services.toLowerCase();
  if (s.includes("tiktok") || s.includes("short-form") || s.includes("reels")) {
    return COPY.tiktok;
  }
  if (s.includes("youtube") || s.includes("long-form")) {
    return COPY.youtube;
  }
  if (s.includes("social media") || s.includes("instagram") || s.includes("linkedin")) {
    return COPY.social;
  }
  return COPY.default;
}

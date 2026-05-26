export interface AgencyCopy {
  tagline: string;
  painPoints: string[];
  solutions: string[];
}

const COPY: Record<string, AgencyCopy> = {
  video: {
    tagline: "Client-ready video scripts. No revision cycles.",
    painPoints: [
      "Pre-production writing holds up your shoot schedule and clients are never the ones who account for it.",
      "Script revisions eat the timeline before a single frame is filmed.",
      "Getting a client-approved script takes longer than the actual production.",
    ],
    solutions: [
      "Scribtly generates camera-ready scripts from a brief in under 60 seconds.",
      "Built-in client voice profiles mean fewer revisions and faster approvals.",
      "Scale to any number of projects without pre-production becoming the bottleneck.",
    ],
  },
  animation: {
    tagline: "Scripts that keep your animation pipeline moving.",
    painPoints: [
      "Animation can't start until the script is locked, and script approval always takes longer than it should.",
      "Every revision round pushes delivery dates and compresses the production window.",
      "Clients expect the final video quickly but don't account for the writing time upfront.",
    ],
    solutions: [
      "Scribtly produces client-ready animation scripts from a topic brief in seconds.",
      "Voice profiles keep every revision minimal by nailing tone on the first draft.",
      "Keep animators working without waiting on copy approvals.",
    ],
  },
  podcast: {
    tagline: "Consistent, on-brand podcast scripts for every client.",
    painPoints: [
      "Writing a full episode outline and script per client every week is a significant time drain.",
      "Maintaining consistent tone and structure across episodes is harder than it looks.",
      "Clients expect polished episodes but the prep work rarely shows up in the budget.",
    ],
    solutions: [
      "Scribtly builds per-client voice profiles and generates full episode scripts from a topic.",
      "Every episode stays consistent with the last, no context lost between recordings.",
      "Produce scripts for multiple clients in the time it used to take for one.",
    ],
  },
  influencer: {
    tagline: "Creator briefs and scripts your talent can actually use.",
    painPoints: [
      "Writing detailed creative briefs for every creator on every campaign takes half your day.",
      "Generic briefs lead to off-brand content and expensive reshoots.",
      "Campaign timelines slip because the creative direction document isn't ready in time.",
    ],
    solutions: [
      "Scribtly generates creator-ready briefs and scripts tailored to each campaign.",
      "Every brief is specific enough that talent can execute without back-and-forth.",
      "Get campaign creative ready in minutes, not days.",
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
      "First draft sounds like the client, so revisions drop dramatically.",
    ],
  },
  content: {
    tagline: "More content, faster output, same quality standard.",
    painPoints: [
      "Content demand only grows and the brief-to-draft cycle never gets faster.",
      "Clients see the published piece, not the hours it took to write it.",
      "You can only take on more clients until writing quality or turnaround starts to slip.",
    ],
    solutions: [
      "Scribtly closes the gap between strategy and published output volume.",
      "Generate first drafts from a brief in seconds, in your client's exact voice.",
      "Scale client count without scaling your writing team.",
    ],
  },
  email: {
    tagline: "Email sequences written at the speed your campaigns need.",
    painPoints: [
      "Writing enough copy variants to properly A/B test takes longer than the strategy did.",
      "Full sequence copy is the most time-consuming deliverable on every email project.",
      "Campaigns launch late because the copy side can't keep up with the send schedule.",
    ],
    solutions: [
      "Scribtly generates full email sequences from a brief, in your client's voice, instantly.",
      "Produce enough variants to run proper split tests without a copy bottleneck.",
      "Launch campaigns on time, every time.",
    ],
  },
  pr: {
    tagline: "Press-ready copy at the speed of the news cycle.",
    painPoints: [
      "Media opportunities don't wait, and writing speed is usually what costs you coverage.",
      "Producing pitches, releases, and talking points without it becoming a bottleneck is nearly impossible.",
      "The best story angles go cold while the copy is still being written.",
    ],
    solutions: [
      "Scribtly generates press releases and media pitches from a brief in under a minute.",
      "Maintain consistent brand voice across every format: pitches, releases, and talking points.",
      "Move as fast as the news cycle, not as fast as your writers can type.",
    ],
  },
  ppc: {
    tagline: "More copy variations. Better tests. Better results.",
    painPoints: [
      "Proper split testing requires far more ad copy variations than your team can write.",
      "Campaigns stall because creative production can't keep pace with optimisation.",
      "You know what to test, but writing all the variants takes too long to be practical.",
    ],
    solutions: [
      "Scribtly generates on-brand ad copy variations from a brief in seconds.",
      "Run the copy tests you actually need without a writing bottleneck.",
      "Iterate faster and find what converts without it eating into your margins.",
    ],
  },
  seo: {
    tagline: "Content velocity that keeps pace with your keyword strategy.",
    painPoints: [
      "You have the keyword opportunities but can't publish fast enough to capitalise on them.",
      "Content velocity is one of the biggest ranking factors and most agencies can't keep up.",
      "The bottleneck in SEO is never the strategy. It's writing the content to execute it.",
    ],
    solutions: [
      "Scribtly produces publish-ready content from a keyword brief in under 60 seconds.",
      "Maintain consistent tone and structure across every piece, every client.",
      "Close the gap between your keyword strategy and the content volume needed to win.",
    ],
  },
  branding: {
    tagline: "From brand guide to live content, faster.",
    painPoints: [
      "Clients hire you for the brand strategy but expect content to follow immediately.",
      "The gap between a finished brand guide and live, consistent content is where time disappears.",
      "Translating brand voice into actual copy at client speed is a constant challenge.",
    ],
    solutions: [
      "Scribtly turns brand voice guidelines into a reusable voice profile for every content type.",
      "Generate brand-aligned scripts, social copy, and campaigns directly from the brief.",
      "Every piece of content stays consistent with the brand, from day one to year three.",
    ],
  },
  advertising: {
    tagline: "Creative at the speed your campaigns require.",
    painPoints: [
      "Winning campaigns are built on copy iteration speed, and most agencies can't write fast enough.",
      "You're leaving performance on the table because creative testing requires more variations than the team can produce.",
      "Ad agency margins are always tightest on the writing side.",
    ],
    solutions: [
      "Scribtly generates on-brand ad copy and scripts from a brief in seconds.",
      "Test more angles, find what converts, and iterate without a writing bottleneck.",
      "Produce creative at the speed your optimisation process actually demands.",
    ],
  },
  default: {
    tagline: "AI scripts that actually sound like your clients.",
    painPoints: [
      "Every client has a different voice and you're rewriting every AI draft from scratch.",
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
  if (s.includes("video") || s.includes("film"))            return COPY.video;
  if (s.includes("animation"))                              return COPY.animation;
  if (s.includes("podcast"))                                return COPY.podcast;
  if (s.includes("influencer"))                             return COPY.influencer;
  if (s.includes("social media") || s.includes("instagram") || s.includes("tiktok") || s.includes("reels")) {
    return COPY.social;
  }
  if (s.includes("content"))                                return COPY.content;
  if (s.includes("email marketing"))                        return COPY.email;
  if (s.includes("public relation"))                        return COPY.pr;
  if (s.includes("ppc") || s.includes("pay-per-click"))     return COPY.ppc;
  if (s.includes("seo"))                                    return COPY.seo;
  if (s.includes("branding"))                               return COPY.branding;
  if (s.includes("advertising"))                            return COPY.advertising;
  return COPY.default;
}

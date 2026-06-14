import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Mic,
  Target,
  Zap,
  BookOpen,
  Video,
  Clock,
  MessageSquare,
  Users,
} from "lucide-react";

export const metadata = {
  title: "How to write a video script (complete guide)",
  description:
    "Learn how to write a video script from scratch — structure, hooks, pacing, CTAs, and platform differences. A practical guide for creators, freelancers, and agencies.",
  keywords: [
    "how to write a video script",
    "video script structure",
    "video script writing guide",
    "how to structure a video script",
    "writing scripts for video",
    "video scriptwriting tips",
    "YouTube script writing",
    "short-form video script",
  Lightbulb,
  Target,
  FileText,
  Clapperboard,
  Users,
  Clock,
  Mic,
  PenLine,
  LayoutList,
} from "lucide-react";

export const metadata = {
  title: "How to write a video script (step-by-step guide)",
  description:
    "Learn how to write a video script from scratch — structure, hooks, B-roll notes, and CTAs. A practical guide for freelancers, creators, and agencies.",
  keywords: [
    "how to write a video script",
    "video script writing guide",
    "write a script for YouTube",
    "video script structure",
    "how to write a script for social media",
    "script writing for beginners",
    "how to write a TikTok script",
    "freelance script writing guide",
  ],
  alternates: { canonical: "/how-to-write-a-video-script" },
  openGraph: {
    type: "article",
    url: "/how-to-write-a-video-script",
    siteName: "Scribtly",
    title: "How to write a video script (complete guide) · Scribtly",
    description:
      "Learn how to write a video script from scratch — structure, hooks, pacing, CTAs, and platform differences. A practical guide for creators, freelancers, and agencies.",
    title: "How to write a video script (step-by-step guide) · Scribtly",
    description:
      "A practical guide to writing video scripts — hooks, structure, B-roll notes, and CTAs — for freelancers, creators, and agencies.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "How to write a video script",
        alt: "How to write a video script — Scribtly guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to write a video script (complete guide) · Scribtly",
    description:
      "Learn how to write a video script from scratch — structure, hooks, pacing, CTAs, and platform differences. A practical guide for creators, freelancers, and agencies.",
    title: "How to write a video script (step-by-step guide) · Scribtly",
    description:
      "A practical guide to writing video scripts — hooks, structure, B-roll notes, and CTAs — for freelancers, creators, and agencies.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Write a Video Script",
      name: "How to write a video script",
      item: `${SITE_URL}/how-to-write-a-video-script`,
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to write a video script (complete guide)",
  description:
    "Learn how to write a video script from scratch — structure, hooks, pacing, CTAs, and platform differences. A practical guide for creators, freelancers, and agencies.",
  datePublished: "2026-06-08",
  dateModified: "2026-06-08",
  headline: "How to write a video script (step-by-step guide)",
  description:
    "A practical guide to writing video scripts — hooks, structure, B-roll notes, and CTAs — for freelancers, creators, and agencies.",
  datePublished: "2026-06-09",
  dateModified: "2026-06-09",
  author: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  url: `${SITE_URL}/how-to-write-a-video-script`,
  keywords:
    "how to write a video script, video script structure, video scriptwriting, YouTube scripts, short-form video",
    "how to write a video script, video script structure, script writing guide, YouTube scripts, TikTok scripts",
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to write a video script",
  description:
    "A step-by-step guide to writing video scripts for YouTube, TikTok, Instagram Reels, and other platforms.",
    "A step-by-step guide to writing a video script from brief to finished draft, including hooks, body sections, B-roll notes, and CTAs.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Define your goal and audience",
      text: "Decide what one outcome you want from the video and who you are talking to. Every script decision flows from these two things.",
      text: "Before writing a single word, decide what you want the viewer to do after watching and who specifically you are talking to.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Write the hook first",
      text: "Write the opening line before anything else. On short-form video you have 1–3 seconds. On YouTube you have around 5–15 seconds. The hook must create immediate curiosity, tension, or stakes.",
      name: "Choose your hook",
      text: "Open with a pattern interrupt — a strong statement, question, or reveal that gives viewers a reason to keep watching past the first five seconds.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Outline the body in three sections",
      text: "Break the video body into three clear parts: the problem or premise, the main content or argument, and the resolution or practical takeaway.",
      name: "Write a short intro",
      text: "Briefly introduce yourself or the topic, set expectations for what the viewer will get, and keep it under 30 seconds.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Write for spoken delivery, not reading",
      text: "Use short sentences. Use contractions. Break grammar rules if it sounds natural aloud. Scripts are heard, not read — write for the ear, not the eye.",
      name: "Structure the body sections",
      text: "Break the core content into two or three focused sections with a clear point each. Use transitions that reference the content, not generic filler phrases.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Add B-roll notes and on-screen text cues",
      text: "Where relevant, add bracketed notes for B-roll footage and on-screen text overlays. This makes the script production-ready and saves time in the edit.",
      name: "Add B-roll notes",
      text: "Annotate the script with B-roll suggestions in brackets so the creator or editor knows what to film or source.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Write a natural CTA",
      text: "End with a clear, single call to action that matches the platform and the video topic. Avoid generic sign-offs like 'like and subscribe'. Make it specific to the video.",
      name: "Write the CTA",
      text: "End with a single, specific call to action. Tell the viewer exactly what to do next and why it matters to them.",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Read it aloud and edit",
      text: "Read the full script aloud before delivering it. Fix any line that makes you stumble. The spoken test is the fastest quality check available.",
      name: "Read it aloud and refine",
      text: "Read the full script aloud. Rewrite any line that makes you stumble or sounds like something you'd only write, not say.",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A video script is a written document that outlines what the presenter will say, when they will say it, and often what will appear on screen. Scripts range from a fully written word-for-word document to a bullet-point outline, depending on the presenter's style and the platform.",
      name: "How long should a video script be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the platform. A TikTok or Reels script is typically 60–150 words for a 30–60 second video. A YouTube video script for a 10-minute video is roughly 1,200–1,500 words spoken at a natural pace. Write for the platform first, then adjust the length to match.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a video script be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Script length depends on the video format. A 60-second TikTok or Reel script is around 120–150 words. A 10-minute YouTube video is roughly 1,200–1,500 words. A 20-minute YouTube video can reach 2,500–3,000 words. Shorter is almost always better — trim anything that doesn't serve the viewer.",
      name: "What is the difference between a video script and an outline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An outline lists the points you plan to cover. A script is the actual spoken word — every sentence written as it will be said on camera. Outlines are useful for experienced presenters who can ad-lib confidently. Scripts are better for consistency, editing efficiency, and client delivery.",
      },
    },
    {
      "@type": "Question",
      name: "Should you write a full script or just bullet points?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This depends on the presenter and platform. For short-form video and ads, a full word-for-word script keeps delivery tight and consistent. For long-form YouTube, some creators prefer a structured outline with scripted hooks and CTAs but improvised body sections. Either approach can work — the key is having something written before you film.",
      name: "What makes a good video hook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good hook gives the viewer a specific reason to keep watching in the first 3–5 seconds. The strongest hooks make a bold claim, ask a provocative question, reveal a surprising fact, or start in the middle of a story. Generic openers like 'In today's video...' are not hooks — they are delays.",
      },
    },
    {
      "@type": "Question",
      name: "What is the structure of a good video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A well-structured video script includes: a hook (the opening line that earns the watch), a brief intro (who the video is for and what they'll get), the body (broken into 2–3 clear sections), and a CTA (one clear action at the end). For longer videos, add transitions between sections and consider B-roll cues for the editor.",
      name: "Do you need to write a full script or just bullet points?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your delivery style and the production workflow. If a creator reads from a teleprompter or needs precise timing, a full script is essential. If they present naturally from memory, a detailed outline may be enough. For client work, a full script is almost always safer — it gives the client something to review and approve before filming.",
      },
    },
    {
      "@type": "Question",
      name: "How do you write scripts for a client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Writing scripts for a client requires understanding their voice, niche, audience, and what they would and would not say. The most effective approach is to build a voice profile for each client — capturing their tone, signature phrases, and audience language — and use that profile as a reference for every script you write for them.",
      name: "How do I write a video script in my client's voice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by collecting examples of how the client speaks — past videos, their own words in briefs, interview notes. Identify the phrases they use often, the ones they'd never use, their sentence length, and their typical energy level. Build a voice profile before writing, and check every line against it. Tools like Scribtly let you save a client voice profile once and use it automatically on every script.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI help you write video scripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI tools can generate a strong first draft in under 60 seconds — especially when given a detailed brief that includes the client's voice, audience, platform, and topic. The best AI script tools generate platform-native structure (hooks, sections, CTAs) rather than just a block of text. The writer's job is then to edit the draft for natural delivery and accuracy.",
      },
    },
  ],
};

const steps = [
  {
    n: "1",
    icon: Target,
    title: "Define your goal and audience",
    desc: "Before writing a single word, answer two questions: what is the one thing you want the viewer to do after watching, and exactly who are you talking to? Every script decision — the hook, the tone, the CTA — flows from these two things. A video with a vague goal produces a vague script.",
  },
  {
    n: "2",
    icon: Zap,
    title: "Write the hook first",
    desc: "The hook is the opening line — the sentence that stops the scroll and earns the watch. Write it before anything else. On short-form video (TikTok, Reels, Shorts) you have 1–3 seconds. On YouTube you have around 5–15 seconds. The hook must create immediate curiosity, tension, or stakes. See our guide to video hooks for examples by platform.",
  },
  {
    n: "3",
    icon: BookOpen,
    title: "Outline the body in three clear sections",
    desc: "Break the main content into three parts: the problem or premise, the core content or argument, and the resolution or practical takeaway. This structure works for almost any topic and any length. For short-form video, these sections might each be 10–15 seconds. For a 10-minute YouTube video, each section could be 2–3 minutes.",
  },
  {
    n: "4",
    icon: Mic,
    title: "Write for the ear, not the eye",
    desc: "Scripts are heard, not read. Use short sentences. Use contractions. Start sentences with 'And' or 'But' if it sounds natural. Break grammar rules where it helps delivery. A line that reads awkwardly on screen can still land perfectly when spoken aloud — and the reverse is also true. If a sentence looks fine but makes you stumble when reading aloud, rewrite it.",
  },
  {
    n: "5",
    icon: Video,
    title: "Add B-roll notes and on-screen text cues",
    desc: "Where relevant, add bracketed production notes alongside the script: [B-roll: hands typing on keyboard], [ON SCREEN: key stat], [CUT TO: product demo]. This makes the script immediately usable by a video editor and signals that you understand production — especially valuable if you are delivering scripts to a client or team.",
  },
  {
    n: "6",
    icon: MessageSquare,
    title: "Write a specific, natural CTA",
    desc: "The call to action should feel like a natural ending to the video, not a tacked-on request. Make it specific to the video topic and the platform. Avoid generic sign-offs. 'Comment below which of these you'll try first' is stronger than 'like and subscribe if you found this helpful'. One clear action is always better than three.",
  },
  {
    n: "7",
    icon: CheckCircle2,
    title: "Read it aloud and edit",
    desc: "Read the entire script aloud before you deliver it — or before filming. Any line that makes you stumble, sounds like corporate copy, or feels unnatural when spoken needs a rewrite. The spoken test catches problems faster than any written review. This is the most important step most writers skip.",
  },
];

const platformNotes = [
  {
    label: "TikTok",
    badge: "TK",
    points: [
      "Hook must land in the first 1–2 seconds — verbal or on-screen text",
      "Keep the total script to 60–150 words for 30–60 second videos",
      "Use direct, conversational language — no intros or preamble",
      "On-screen text overlays can reinforce key points and help silent viewers",
      "End with a comment CTA or open loop to encourage saves and shares",
    ],
  },
  {
    label: "YouTube",
    badge: "YT",
    points: [
      "Hook pays off the promise made by the title and thumbnail",
      "Brief intro (15–30 seconds) tells viewers what they'll get and who it's for",
      "Body sections need clear transitions — not 'moving on' but content-specific handoffs",
      "Add B-roll cues throughout to keep the video dynamic",
      "End screen CTA should link to a related video or playlist, not just 'subscribe'",
    ],
  },
  {
    label: "Instagram Reels",
    badge: "IG",
    points: [
      "On-screen text hook works even with sound off — critical for Reels",
      "Keep the script to 30–60 seconds max for most Reels content",
      "Captions are often read more than the audio is heard — write for both",
      "The save is the most valuable action — write content worth bookmarking",
      "First-person, direct address works better than presenter-style delivery",
    ],
  },
  {
    label: "LinkedIn Video",
    badge: "LI",
    points: [
      "Professional but human — no corporate jargon, but more composed than TikTok",
      "Lead with the insight or opinion, not the backstory",
      "Shorter videos (under 90 seconds) tend to outperform long-form on LinkedIn",
      "Strong text hook in the first line of the caption works alongside the video hook",
      "CTA should invite conversation — a question or a direct opinion prompt",
    ],
  },
];

const mistakes = [
  {
    title: "Starting with an intro instead of a hook",
    desc: "\"Hi everyone, welcome back to my channel, today we're going to be talking about...\" loses viewers before the first sentence is finished. Start with the most compelling thing you have to say, then handle any context-setting afterwards.",
  },
  {
    title: "Writing the script as an essay",
    desc: "Long, complex sentences work in written content. They do not work in video scripts. If a sentence requires more than one breath to deliver, it is probably too long. Break it up.",
  },
  {
    title: "Trying to cover too much in one video",
    desc: "A video that tries to teach ten things teaches nothing effectively. Pick one clear topic, go deep on it, and save the other nine ideas for future videos. Constraint is a feature, not a limitation.",
  },
  {
    title: "Forgetting who is actually speaking",
    desc: "The script should sound like the presenter — not like a generic AI tool or a formal report. If the client never uses the word 'leverage', the script should not either. Match vocabulary, tone, and rhythm to the actual speaker.",
  },
  {
    title: "Skipping the spoken read-through",
    desc: "Reading a script silently misses half the problems. Awkward phrasing, unnatural rhythm, and lines that sound fine on paper but stumble in delivery — all of these are caught immediately when you read aloud. Do not skip this step.",
  },
  {
    title: "Writing a generic CTA every time",
    desc: "\"Don't forget to like and subscribe\" is noise. It tells the viewer you ran out of ideas. Write a CTA that connects to the actual video content — ideally one that feels like the natural final word on the topic.",
      name: "What should I include in a B-roll note?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A B-roll note tells the creator or editor what visual should appear over a line of dialogue. Keep it brief and specific: [B-ROLL: close-up of hands typing], [B-ROLL: screen recording of dashboard], [B-ROLL: product on kitchen counter]. Add them wherever the talking-head shot would benefit from a visual break.",
      },
    },
  ],
};

const scriptSections = [
  {
    icon: Target,
    title: "Hook",
    time: "0–5 seconds",
    desc: "The first line. Give viewers a reason to stay — a bold claim, a question, a surprising fact, or the start of a story. Never open with 'In today's video...'",
  },
  {
    icon: Mic,
    title: "Intro",
    time: "5–30 seconds",
    desc: "Briefly set expectations. Who is this for and what will they get? Keep it short. Every second here is attention borrowed from the content they came to watch.",
  },
  {
    icon: LayoutList,
    title: "Body sections",
    time: "Main content",
    desc: "Two to four focused points, each with a clear idea, supporting detail, and a transition to the next. Write for spoken delivery, not written grammar.",
  },
  {
    icon: Clapperboard,
    title: "B-roll notes",
    time: "Throughout",
    desc: "Add [B-ROLL: description] annotations wherever a talking-head shot could be replaced with a visual. Helps editors and creators plan the shoot.",
  },
  {
    icon: FileText,
    title: "CTA",
    time: "Final 15–30 seconds",
    desc: "One specific action. Not 'like and subscribe' — something relevant to the video content. A link, a download, a next video, a question to answer in comments.",
  },
];

const platformGuide = [
  {
    platform: "YouTube (long-form)",
    length: "1,200–2,000 words",
    structure: "Hook → Intro → 3–4 body sections → CTA",
    notes: "B-roll notes every 90–120 seconds. Chapter markers help retention. Paced for 8–15 min spoken delivery.",
    href: "/youtube-scripts",
  },
  {
    platform: "YouTube Shorts",
    length: "100–200 words",
    structure: "Hook → Quick point → CTA",
    notes: "No intro fluff. One idea only. Strong visual hook in the first frame.",
    href: "/youtube-shorts-scripts",
  },
  {
    platform: "TikTok",
    length: "60–160 words",
    structure: "Hook → Problem or insight → Payoff → Optional CTA",
    notes: "Conversational, fast-paced. On-screen text cues help. No formal intros.",
    href: "/tiktok-scripts",
  },
  {
    platform: "Instagram Reels",
    length: "60–150 words",
    structure: "Hook → Value → Visual instruction or demo → CTA",
    notes: "Assume sound-off viewing. On-screen text carries the message. Hook in first 2 seconds.",
    href: "/instagram-reels-scripts",
  },
  {
    platform: "LinkedIn Video",
    length: "100–250 words",
    structure: "Hook → Professional insight → Takeaway → CTA",
    notes: "Credibility matters. Conversational but professional. First line decides whether they expand the caption.",
    href: "/linkedin-video-scripts",
  },
  {
    platform: "Video Ad / UGC",
    length: "60–120 words",
    structure: "Hook → Problem → Solution → Proof → CTA",
    notes: "Every second costs money. Cut anything that doesn't move the viewer closer to clicking.",
    href: "/video-ad-scripts",
  },
];

const commonMistakes = [
  {
    title: "Opening with your name and channel intro",
    desc: "New viewers don't care who you are yet. They care whether the next 30 seconds will be worth their time. Earn their attention first, introduce yourself second.",
  },
  {
    title: "Writing to be read, not to be heard",
    desc: "Scripts that read well on paper often fall flat on camera. Long sentences, complex clauses, and formal vocabulary work in essays. They don't work in speech. Write for the ear.",
  },
  {
    title: "Using generic transitions",
    desc: "'Moving on', 'next up', 'let's dive in' — these are filler. Replace every generic transition with one that references the actual content: 'That's the why. Here's the how.'",
  },
  {
    title: "Burying the CTA at the very end",
    desc: "By the final seconds of a video, a portion of viewers have already left. Put a soft CTA in the middle — a mention, a link in the description, a reason to stay — then the full CTA at the end.",
  },
  {
    title: "Writing the same script for every platform",
    desc: "A YouTube script pasted into TikTok will not work. The pacing, length, hook style, and structural conventions are completely different. Write platform-native from the start.",
  },
  {
    title: "Delivering without reading it aloud",
    desc: "The spoken test catches everything. If a line makes you stumble, it will make the presenter stumble too. Read every script aloud before it leaves your desk.",
  },
];

const faqs = [
  {
    q: "What is a video script?",
    a: "A video script is a written document that outlines what the presenter will say, when they will say it, and often what will appear on screen. Scripts range from a fully written word-for-word document to a bullet-point outline, depending on the presenter's style and the platform.",
  },
  {
    q: "How long should a video script be?",
    a: "Script length depends on the video format. A 60-second TikTok or Reel script is around 120–150 words. A 10-minute YouTube video is roughly 1,200–1,500 words. A 20-minute YouTube video can reach 2,500–3,000 words. Shorter is almost always better — trim anything that doesn't serve the viewer.",
  },
  {
    q: "Should you write a full script or just bullet points?",
    a: "This depends on the presenter and platform. For short-form video and ads, a full word-for-word script keeps delivery tight and consistent. For long-form YouTube, some creators prefer a structured outline with scripted hooks and CTAs but improvised body sections. Either approach can work — the key is having something written before you film.",
  },
  {
    q: "What is the structure of a good video script?",
    a: "A well-structured video script includes: a hook (the opening line that earns the watch), a brief intro (who the video is for and what they'll get), the body (broken into 2–3 clear sections), and a CTA (one clear action at the end). For longer videos, add transitions between sections and consider B-roll cues for the editor.",
  },
  {
    q: "How do you write scripts for a client?",
    a: "Writing scripts for a client requires understanding their voice, niche, audience, and what they would and would not say. The most effective approach is to build a voice profile for each client — capturing their tone, signature phrases, and audience language — and use that profile as a reference for every script you write for them.",
  },
  {
    q: "Can AI help you write video scripts?",
    a: "Yes. AI tools can generate a strong first draft in under 60 seconds — especially when given a detailed brief that includes the client's voice, audience, platform, and topic. The best AI script tools generate platform-native structure (hooks, sections, CTAs) rather than just a block of text. The writer's job is then to edit the draft for natural delivery and accuracy.",
    q: "How long should a video script be?",
    a: "It depends on the platform. A TikTok or Reels script is typically 60–150 words for a 30–60 second video. A YouTube video script for a 10-minute video is roughly 1,200–1,500 words spoken at a natural pace. Write for the platform first, then adjust the length to match.",
  },
  {
    q: "What is the difference between a video script and an outline?",
    a: "An outline lists the points you plan to cover. A script is the actual spoken word — every sentence written as it will be said on camera. Outlines are useful for experienced presenters who can ad-lib confidently. Scripts are better for consistency, editing efficiency, and client delivery.",
  },
  {
    q: "What makes a good video hook?",
    a: "A good hook gives the viewer a specific reason to keep watching in the first 3–5 seconds. The strongest hooks make a bold claim, ask a provocative question, reveal a surprising fact, or start in the middle of a story. Generic openers like 'In today's video...' are not hooks — they are delays.",
  },
  {
    q: "Do you need to write a full script or just bullet points?",
    a: "It depends on your delivery style and the production workflow. If a creator reads from a teleprompter or needs precise timing, a full script is essential. If they present naturally from memory, a detailed outline may be enough. For client work, a full script is almost always safer — it gives the client something to review and approve before filming.",
  },
  {
    q: "How do I write a video script in my client's voice?",
    a: "Start by collecting examples of how the client speaks — past videos, their own words in briefs, interview notes. Identify the phrases they use often, the ones they'd never use, their sentence length, and their typical energy level. Build a voice profile before writing, and check every line against it.",
  },
  {
    q: "What should I include in a B-roll note?",
    a: "A B-roll note tells the creator or editor what visual should appear over a line of dialogue. Keep it brief and specific: [B-ROLL: close-up of hands typing], [B-ROLL: screen recording of dashboard], [B-ROLL: product on kitchen counter]. Add them wherever the talking-head shot would benefit from a visual break.",
  },
];

export default function HowToWriteAVideoScriptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Scribtly Guide · Monday 8 June 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            How to write a video script
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            A complete guide to video script structure, hooks, pacing, and CTAs — for YouTube, TikTok, Reels, and every other platform where video is the format.
            Scribtly Guide · Monday 9 June 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            How to write a video script<br className="hidden md:block" /> (step-by-step guide)
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            A practical guide for freelancers, creators, and agencies. Covers every part of a video script — hook, structure, B-roll notes, CTAs — across all major platforms.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Generate your next script in 60 seconds <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/video-script-template">
              <Button size="lg" variant="outline">Free script template</Button>
                Generate a script in 60 seconds <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/video-script-template">
              <Button size="lg" variant="outline">Get a free script template</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Why scripting matters more than most creators realise
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Most creators treat scripting as the boring part — the admin before the filming. The best creators treat it as the most important part of their entire production process.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          A strong script determines whether a video gets watched, remembered, and shared. It sets the hook, controls the pacing, structures the argument, and delivers a CTA that does not feel like an afterthought. Filming without a script is the video equivalent of building without a plan.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          This guide is for{" "}
          <Link href="/for-content-creators" className="text-primary underline underline-offset-2">content creators</Link>,{" "}
          <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelance script writers</Link>,{" "}
          <Link href="/for-social-media-managers" className="text-primary underline underline-offset-2">social media managers</Link>,{" "}
          and anyone writing video scripts — whether for their own channel or a client. It covers the full process from blank page to a production-ready script.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          If you want a ready-made structure to follow right now, use our{" "}
          <Link href="/video-script-template" className="text-primary underline underline-offset-2">
            free video script template
          </Link>
          . If you want to understand why each part of the script works the way it does, read on.
        </p>
      </section>

      {/* What is a video script */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            What a video script actually is
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            A video script is a written document that outlines what the presenter will say, when they will say it, and — where relevant — what will appear on screen alongside the spoken content.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Scripts exist on a spectrum. At one end is a full word-for-word transcript — every sentence written out exactly as it will be spoken. At the other end is a loose bullet-point outline with just the key points and examples. Most working scripts sit somewhere in between: fully scripted hooks and CTAs, with structured notes for the body.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            The right level of detail depends on the presenter and the platform:
          </p>
          <div className="space-y-3">
            {[
              {
                label: "Short-form video (TikTok, Reels, Shorts)",
                note: "Full word-for-word scripts are usually worth it here. Every second matters. A tight, rehearsed delivery lands better than improvising on camera.",
              },
              {
                label: "YouTube long-form",
                note: "Scripted hooks, transitions, and CTAs — with structured notes for the body. Many successful YouTubers improvise within a tight outline rather than reading a full script.",
              },
              {
                label: "Video ads and UGC",
                note: "Always fully scripted. Ad performance is too important to leave to improvisation. Every line should be intentional.",
              },
              {
                label: "Podcast or talking-head interviews",
                note: "Usually a structured outline with key questions and talking points. Full scripts rarely work in interview formats — they kill the conversational feel.",
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                <FileText size={15} className="mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium mb-1">{item.label}</p>
                  <p className="text-xs text-text-secondary dark:text-dark-muted leading-relaxed">{item.note}</p>
                </div>
              </div>
      {/* ── INTRO ── */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Why writing a video script matters
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Most people who struggle with video creation are not struggling with ideas. They are struggling with the blank page — the gap between having something to say and knowing how to structure it, start it, and deliver it in a way that keeps people watching.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          A good video script is not about making your content sound formal or scripted. It is about removing the friction between your idea and the final video. It gives the presenter structure, reduces retakes, speeds up editing, and makes the content easier to follow for the viewer.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          For <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelance script writers</Link> and <Link href="/for-agencies" className="text-primary underline underline-offset-2">content agencies</Link>, scripting is the core deliverable. For creators, it is the difference between a video that holds retention and one that loses viewers in the first 30 seconds.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          This guide covers the complete process — from brief to finished script — for every major video platform. Whether you are writing for <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">YouTube</Link>, <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">TikTok</Link>, <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2">Instagram Reels</Link>, <Link href="/linkedin-video-scripts" className="text-primary underline underline-offset-2">LinkedIn</Link>, or <Link href="/video-ad-scripts" className="text-primary underline underline-offset-2">video ads</Link>, the core principles are the same.
        </p>
      </section>

      {/* ── THE ANATOMY OF A VIDEO SCRIPT ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            The anatomy of a video script
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Every effective video script — regardless of length or platform — is built from the same five components.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scriptSections.map((s) => (
              <Card
                key={s.title}
                className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <s.icon size={18} className="text-primary group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <span className="text-xs text-text-secondary dark:text-dark-muted">{s.time}</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Soft CTA */}
      <section className="max-w-3xl mx-auto px-5 pt-16 pb-4">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Stop starting from a blank page
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates a complete, structured video script in under 60 seconds — hook, body sections, and CTA — built for your chosen platform and written in your client&apos;s saved voice.{" "}
            Works for{" "}
            <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">YouTube</Link>,{" "}
            <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">TikTok</Link>,{" "}
            <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2">Instagram Reels</Link>,{" "}
            <Link href="/linkedin-video-scripts" className="text-primary underline underline-offset-2">LinkedIn video</Link>, and more.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Try Scribtly free — 5 scripts included <ArrowRight size={14} className="ml-1" />
      {/* ── STEP BY STEP ── */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          How to write a video script, step by step
        </h2>

        <div className="space-y-10">

          {/* Step 1 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-tint)] border border-primary/30 text-primary font-bold text-sm flex items-center justify-center mt-0.5">
              1
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Define your goal and audience before you write a word</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                The most common mistake in script writing is starting with the content before deciding on the destination. Before you write anything, answer two questions:
              </p>
              <ul className="text-sm text-text-secondary dark:text-dark-muted space-y-1.5 mb-3 pl-4">
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span>What do I want the viewer to do after watching this?</span></li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span>Who exactly am I talking to — and what do they already know?</span></li>
              </ul>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                The CTA, the tone, the depth of explanation, and the language you use all flow from these two answers. Skip them and you will end up rewriting the middle section three times trying to find the right angle.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-tint)] border border-primary/30 text-primary font-bold text-sm flex items-center justify-center mt-0.5">
              2
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Write the hook first — and make it earn its place</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                The hook is the most important line in the script. It determines whether the viewer stays past the first five seconds. On short-form platforms, that window is closer to two seconds.
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                A strong hook does one of four things:
              </p>
              <ul className="text-sm text-text-secondary dark:text-dark-muted space-y-1.5 mb-3 pl-4">
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span><strong>Makes a bold claim</strong> — "Most people waste their first 10 seconds of a YouTube video. Here's why."</span></li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span><strong>Asks a provocative question</strong> — "What if the advice you've been following about content is wrong?"</span></li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span><strong>Reveals a surprising fact</strong> — "The average viewer decides in 3 seconds whether to keep watching."</span></li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span><strong>Starts mid-story</strong> — "I lost a client last year because my script sounded exactly like AI."</span></li>
              </ul>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                What a hook never does: start with "In today's video, we're going to be looking at..." That is not a hook — it is a delay. See our deeper guide on <Link href="/what-is-a-video-hook" className="text-primary underline underline-offset-2">what makes a good video hook</Link> for more patterns and examples.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-tint)] border border-primary/30 text-primary font-bold text-sm flex items-center justify-center mt-0.5">
              3
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Write a short, credibility-building intro</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                After the hook, you have about 20–30 seconds to introduce yourself and set expectations. Keep it tight. Viewers who came from search or a recommendation do not need your full backstory.
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                A strong intro answers: who is this person, why should I trust them on this topic, and what will I have learned by the end of this video? If you can answer all three in two sentences, that is better than two paragraphs.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-tint)] border border-primary/30 text-primary font-bold text-sm flex items-center justify-center mt-0.5">
              4
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Structure the body around two to four focused points</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                The body is where most scripts fall apart. Either they try to cover too much, or they cover one thing in too much depth without telling the viewer why it matters.
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                Each body section should follow a simple pattern:
              </p>
              <ul className="text-sm text-text-secondary dark:text-dark-muted space-y-1.5 mb-3 pl-4">
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span><strong>Point</strong> — the main idea in one sentence</span></li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span><strong>Why it matters</strong> — the implication for the viewer</span></li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span><strong>Evidence or example</strong> — a specific detail that makes the point credible</span></li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span><strong>Transition</strong> — a specific link to the next section, not a generic filler phrase</span></li>
              </ul>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                For long-form YouTube scripts, three body sections is often the right number. For short-form content, one or two focused points is enough. See the <Link href="/video-script-template" className="text-primary underline underline-offset-2">free video script template</Link> for a ready-to-use structure.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-tint)] border border-primary/30 text-primary font-bold text-sm flex items-center justify-center mt-0.5">
              5
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Add B-roll notes as you write</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                B-roll notes are production annotations in square brackets that tell the editor or creator what to film or source for each section. They are not part of the spoken script — they sit alongside it.
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                Good B-roll notes are specific. Instead of <span className="font-mono text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded px-1.5 py-0.5">[B-ROLL: show product]</span> write <span className="font-mono text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded px-1.5 py-0.5">[B-ROLL: close-up of product label on white surface, natural light]</span>. The more specific the note, the less back-and-forth with the client or editor.
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                Add a B-roll note wherever the talking-head shot runs longer than 60–90 seconds without a visual break. Holding a single shot too long is one of the fastest ways to lose viewer retention.
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-tint)] border border-primary/30 text-primary font-bold text-sm flex items-center justify-center mt-0.5">
              6
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Write one clear, specific CTA</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                The CTA (call to action) is the most underwritten part of most video scripts. Creators often default to "like and subscribe" because it is easy — not because it is effective.
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                A better approach: decide what one thing you want the viewer to do, and tell them why it matters to them — not to you. Instead of "Subscribe so you never miss a video", try "If you want the follow-up to this, I've already made it — it is linked above."
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                For longer videos, include a soft mid-video CTA — a mention of a related resource, a prompt to comment with a question — before the full CTA lands at the end.
              </p>
            </div>
          </div>

          {/* Step 7 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-tint)] border border-primary/30 text-primary font-bold text-sm flex items-center justify-center mt-0.5">
              7
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">Read the whole script aloud before you deliver it</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                This is the single most effective QA step available, and most writers skip it. If a line makes you stumble, pause awkwardly, or sounds like something you would write on a company website — rewrite it. The ear catches what the eye misses. Read it the way the presenter will deliver it: at their natural pace, with their phrasing. If it feels wrong in your mouth, it will feel wrong on camera.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SOFT CTA ── */}
      <section className="max-w-3xl mx-auto px-5 pb-4">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <Lightbulb size={20} className="text-primary mb-3" />
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Stop writing from a blank page
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates a complete, structured video script — hook, body sections, B-roll notes, and CTA — in under 60 seconds. Save your client&apos;s voice profile once and every script sounds like them, not generic AI.
            <br /><br />
            Used by{" "}
            <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelance script writers</Link>
            ,{" "}
            <Link href="/for-agencies" className="text-primary underline underline-offset-2">content agencies</Link>
            , and{" "}
            <Link href="/for-social-media-managers" className="text-primary underline underline-offset-2">social media managers</Link>.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Start free — 5 scripts included <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 7-step process */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          How to write a video script: the 7-step process
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-10 leading-relaxed">
          This process works for short-form and long-form video. Adjust the depth and detail per step based on your platform and video length.
        </p>
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.n} className="flex gap-5">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-primary-tint)] border border-primary/20 text-primary font-bold text-sm">
                  {step.n}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <step.icon size={16} className="text-primary flex-shrink-0" />
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                  {step.desc}
                </p>
      {/* ── PLATFORM GUIDE ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Platform-by-platform script guide
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-10 max-w-xl leading-relaxed">
          The core steps are the same on every platform. The structure, length, and pacing change significantly. Here is what to adjust for each.
        </p>
        <div className="divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] overflow-hidden">
          {platformGuide.map((p) => (
            <div key={p.platform} className="p-5 bg-[var(--color-surface)] hover:bg-[var(--color-bg)] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1">
                  <Link href={p.href} className="font-semibold text-primary hover:underline underline-offset-2">
                    {p.platform}
                  </Link>
                  <p className="text-xs text-text-secondary dark:text-dark-muted mt-0.5">{p.length}</p>
                </div>
                <div className="flex-[2]">
                  <p className="text-sm font-medium mb-1">{p.structure}</p>
                  <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{p.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Script structure example */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            What a structured video script looks like
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 leading-relaxed">
            Here is a real example of how a short-form script is structured. This is a 60-second TikTok script for a freelance coach, topic: pricing your services.
          </p>

          <div className="space-y-4">
            {[
              {
                label: "HOOK",
                color: "text-primary",
                bg: "bg-[var(--color-primary-tint)]",
                border: "border-primary/20",
                content:
                  '"The reason you\'re undercharging has nothing to do with your skills. It\'s this."',
              },
              {
                label: "PROBLEM",
                color: "text-amber-600 dark:text-amber-400",
                bg: "bg-amber-50 dark:bg-amber-900/20",
                border: "border-amber-200 dark:border-amber-700",
                content:
                  '"Most freelancers price based on what they think clients can afford — not on the value they deliver. So they keep undercharging, overdelivering, and burning out."',
              },
              {
                label: "CONTENT",
                color: "text-[#38c172]",
                bg: "bg-emerald-50 dark:bg-emerald-900/20",
                border: "border-emerald-200 dark:border-emerald-700",
                content:
                  '"Here\'s the shift: price the outcome, not the hours. If you help a client make £10k in new revenue, your fee isn\'t competing with a £25/hr freelancer — it\'s a fraction of the result you delivered."',
              },
              {
                label: "RESOLUTION",
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-50 dark:bg-blue-900/20",
                border: "border-blue-200 dark:border-blue-700",
                content:
                  '"This week, write down what your last three projects actually produced for the client. That number is your anchor for the next proposal."',
              },
              {
                label: "CTA",
                color: "text-purple-600 dark:text-purple-400",
                bg: "bg-purple-50 dark:bg-purple-900/20",
                border: "border-purple-200 dark:border-purple-700",
                content:
                  '"Drop the outcome you\'re most proud of in the comments. Let\'s talk about what it was actually worth."',
              },
            ].map((block) => (
              <div key={block.label} className={`rounded-lg border ${block.border} ${block.bg} px-5 py-4`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${block.color}`}>
                  {block.label}
                </p>
                <p className="text-xs font-mono text-text-secondary dark:text-dark-muted leading-relaxed">
                  {block.content}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-muted mt-6 leading-relaxed">
            This script is 130 words — right for a 60-second TikTok. Each block has a single job. Nothing is wasted. You can use our free{" "}
            <Link href="/tiktok-script-template" className="text-primary underline underline-offset-2">
              TikTok script template
            </Link>{" "}
            or{" "}
            <Link href="/video-script-template" className="text-primary underline underline-offset-2">
              video script template
            </Link>{" "}
            to build your own version of this structure.
      {/* ── HOW TO WRITE IN CLIENT VOICE ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            How to write a video script in your client&apos;s voice
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            For <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelance script writers</Link> and <Link href="/for-agencies" className="text-primary underline underline-offset-2">agencies</Link>, the biggest challenge is not the script structure — it is making the script sound like a specific person. A script that is structurally correct but tonally wrong will still get revision requests.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-5">
            Building a client voice profile before you write is the most reliable way to get the tone right from the first draft. It does not need to be long. It needs to be specific.
          </p>
          <div className="space-y-4">
            {[
              { label: "Niche and audience", desc: "Who does this client talk to? What does that audience already know? What do they need to have explained?" },
              { label: "Tone words", desc: "How does the client sound? Conversational? Direct? Warm? Authoritative? Educational? Pick 3–5 words and use them as a filter when editing." },
              { label: "Signature phrases", desc: "The words or phrases the client uses regularly that signal their personality. These make scripts sound authentically theirs." },
              { label: "What they would never say", desc: "As important as the phrases they use. If a client would never say 'leverage', 'synergise', or 'circle back' — the script should not say it either." },
              { label: "CTA style", desc: "How does this client ask for action? Is it direct? Casual? Community-focused? The CTA should match how they actually speak, not how a corporate copywriter would phrase it." },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium mb-1">{item.label}</p>
                  <p className="text-xs text-text-secondary dark:text-dark-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mt-6">
            Scribtly stores this as a saved client profile and applies it automatically to every script you generate for that client. You build the profile once and every future script starts from the right baseline. See the{" "}
            <Link href="/ai-script-writer" className="text-primary underline underline-offset-2">full Scribtly overview</Link>{" "}
            for how the profile system works. Also useful: the{" "}
            <Link href="/how-to-stop-scripts-sounding-like-ai" className="text-primary underline underline-offset-2">guide to stopping scripts sounding like AI</Link>.
          </p>
        </div>
      </section>

      {/* Platform differences */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Platform-specific script rules
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          The same script structure applies across platforms — but each platform has its own rhythm, constraints, and viewer expectations. Here is what changes per platform.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {platformNotes.map((p) => (
            <Card
              key={p.label}
              className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary-tint)] text-primary text-xs font-bold">
                  {p.badge}
                </span>
                <h3 className="font-semibold">{p.label}</h3>
              </div>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-[#38c172]" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p className="text-sm text-text-secondary dark:text-dark-muted mt-8 text-center">
          See platform-specific script generators for{" "}
          <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">YouTube</Link>,{" "}
          <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">TikTok</Link>,{" "}
          <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2">Instagram Reels</Link>,{" "}
          <Link href="/youtube-shorts-scripts" className="text-primary underline underline-offset-2">YouTube Shorts</Link>, and{" "}
          <Link href="/linkedin-video-scripts" className="text-primary underline underline-offset-2">LinkedIn video</Link>.
        </p>
      </section>

      {/* Writing in a client's voice */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Writing scripts in a client&apos;s voice
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            If you are writing scripts for a client rather than for yourself, the process above stays the same — but there is an extra layer: the script needs to sound like the client, not like you.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            This is where most freelance script writers either add significant value or let themselves down. A generic script that could have been written for any creator in the niche is not worth much. A script that sounds unmistakably like the client — their phrasing, their cadence, their specific way of addressing the audience — is genuinely hard to replicate at scale.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            The foundation of good client voice writing is a thorough brief. Before writing a word, you should know:
          </p>
          <div className="space-y-2 mb-6">
            {[
              "The client's niche and audience — who they talk to and what those people already know",
              "Their tone — casual or polished, fast or measured, warm or authoritative",
              "Phrases they always use — catchphrases, recurring vocabulary, signature sign-offs",
              "Words and phrases they would never say — brand exclusions are as important as inclusions",
              "Their CTA style — how do they typically end a video, what action do they want",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                <Users size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            For{" "}
            <Link href="/for-agencies" className="text-primary underline underline-offset-2">
              agencies
            </Link>{" "}
            and{" "}
            <Link href="/for-freelancers" className="text-primary underline underline-offset-2">
              freelancers
            </Link>{" "}
            working with multiple clients, managing this brief for every project individually is time-consuming. The more efficient approach is to save a permanent voice profile for each client and use it as the baseline for every script you write for them. This is exactly what Scribtly&apos;s client voice profile system is built for.
          </p>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Save your client&apos;s voice once. Generate scripts faster every time.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly stores a full voice profile for each client — niche, tone, audience, signature phrases, and exclusions. Every script generation pulls from that profile automatically. No re-briefing. No generic output. Used by{" "}
            <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelancers</Link>,{" "}
            <Link href="/for-agencies" className="text-primary underline underline-offset-2">agencies</Link>, and{" "}
            <Link href="/for-social-media-managers" className="text-primary underline underline-offset-2">social media managers</Link>{" "}
            who produce client content at volume.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Start free — no card required <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="max-w-3xl mx-auto px-5 pb-16 md:pb-20">
      {/* ── WHAT GOOD LOOKS LIKE ── */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          What a good script looks like in practice
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
          Here is the same topic — a 60-second Reels script for a fitness coach — written two ways. One is structurally sound but generic. One is structurally sound and specific.
        </p>

        <div className="space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-2">Structurally fine, tonally generic</div>
            <div className="text-xs font-mono text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-5 py-4 leading-relaxed">
              <p className="mb-2">[HOOK] Are you making this common mistake in your training?</p>
              <p className="mb-2">[B-ROLL: person exercising in gym]</p>
              <p className="mb-2">Most people do not rest enough. Rest days are important for muscle recovery. Without rest, you will not see the results you are looking for.</p>
              <p className="mb-2">[B-ROLL: person sleeping]</p>
              <p>Make sure to include rest days in your weekly schedule. Like and subscribe for more fitness tips.</p>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Structurally strong and tonally specific</div>
            <div className="text-xs font-mono text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border border-primary/20 rounded-lg px-5 py-4 leading-relaxed">
              <p className="mb-2">[HOOK] You are not being lazy. You are recovering.</p>
              <p className="mb-2">[B-ROLL: calendar with rest day marked]</p>
              <p className="mb-2">I used to think rest days were for people who were not committed enough — until I overtrained myself into a three-week setback. Your muscles do not grow in the gym. They grow when you stop.</p>
              <p className="mb-2">[B-ROLL: close-up of protein shake being made]</p>
              <p>Take the day. Eat the protein. Come back stronger. If you want my exact recovery protocol, I have linked it in the description.</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mt-6">
          Same structure. Same platform. The second version has a point of view, a personal reference, and sentences that match how this coach actually speaks. That difference comes from knowing the voice before starting — not from spending more time writing.
        </p>
      </section>

      {/* ── MID CTA ── */}
      <section className="max-w-3xl mx-auto px-5 pb-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <div className="flex items-start gap-4">
            <PenLine size={20} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold tracking-tight mb-2">
                Save the voice profile once. Generate scripts faster.
              </h2>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-5">
                Scribtly&apos;s client profile system means you are never starting from scratch. Build the voice once, generate platform-native scripts in seconds — for <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">YouTube</Link>, <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">TikTok</Link>, <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2">Reels</Link>, <Link href="/linkedin-video-scripts" className="text-primary underline underline-offset-2">LinkedIn</Link>, and more.
              </p>
              <Link href="/signup">
                <Button size="lg">
                  Try Scribtly free — no card required <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ── */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Six common video script mistakes to avoid
        </h2>
        <div className="space-y-5">
          {mistakes.map((m) => (
            <div key={m.title} className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-xs font-bold">
                ✕
              </div>
          {commonMistakes.map((m) => (
            <div key={m.title} className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-xs font-bold">✕</div>
              <div>
                <h3 className="font-semibold mb-1">{m.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Script timing guide */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Video script word counts and timing reference
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            The average speaking pace for video content is around 130–150 words per minute for natural delivery, or 160–180 words per minute for faster-paced short-form content. Use these figures as a starting point.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 pr-6 font-semibold text-text-secondary dark:text-dark-muted whitespace-nowrap">Video length</th>
                  <th className="text-left py-3 pr-6 font-semibold text-text-secondary dark:text-dark-muted whitespace-nowrap">Approx. word count</th>
                  <th className="text-left py-3 font-semibold text-text-secondary dark:text-dark-muted whitespace-nowrap">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  { length: "15 seconds", words: "40–50 words", best: "TikTok, Reels, Shorts ads" },
                  { length: "30 seconds", words: "65–80 words", best: "TikTok, Reels, video ads" },
                  { length: "60 seconds", words: "130–150 words", best: "TikTok, Reels, UGC" },
                  { length: "3–5 minutes", words: "400–750 words", best: "YouTube, podcast clips" },
                  { length: "8–10 minutes", words: "1,050–1,500 words", best: "YouTube tutorials" },
                  { length: "15–20 minutes", words: "2,000–3,000 words", best: "YouTube deep dives" },
                ].map((row) => (
                  <tr key={row.length}>
                    <td className="py-3 pr-6 font-medium whitespace-nowrap">{row.length}</td>
                    <td className="py-3 pr-6 text-text-secondary dark:text-dark-muted whitespace-nowrap">{row.words}</td>
                    <td className="py-3 text-text-secondary dark:text-dark-muted">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-secondary dark:text-dark-muted mt-4 leading-relaxed">
            These are approximations — actual delivery speed varies by presenter and content type. Always time the script aloud before finalising.
      {/* ── WHERE SCRIBTLY FITS ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Where Scribtly fits in the script writing process
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Scribtly is not designed to replace the steps above — it is designed to accelerate them. The brief, the goal, the voice calibration: you still make those decisions. Scribtly executes the first draft at speed, with the client&apos;s profile already loaded.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            For each client you work with, you build a profile once: niche, audience, tone, signature phrases, what to avoid. Every time you generate a script for that client, Scribtly pulls from that profile and writes in their voice — not in generic AI voice.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            The output includes the full script structure: hook, intro, body sections with B-roll notes, and CTA. Platform-specific formatting is applied automatically — a{" "}
            <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">YouTube script</Link>{" "}
            looks different to a{" "}
            <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">TikTok script</Link>{" "}
            looks different to a{" "}
            <Link href="/linkedin-video-scripts" className="text-primary underline underline-offset-2">LinkedIn video script</Link>.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Freelancers using Scribtly typically do a 5–10 minute editing pass rather than writing from scratch. The structural decisions, the blank page, and the voice calibration are already done. That is where the time saving actually comes from.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            If you write scripts for multiple clients, the profile system matters most. You are not re-explaining each client&apos;s tone every time — the profile is saved, reusable, and consistent. See the{" "}
            <Link href="/for-freelancers" className="text-primary underline underline-offset-2">Scribtly for freelancers page</Link>{" "}
            or the{" "}
            <Link href="/for-agencies" className="text-primary underline underline-offset-2">Scribtly for agencies page</Link>{" "}
            for workflow details.
          </p>
        </div>
      </section>

      {/* Where Scribtly fits */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Where Scribtly fits in your script writing workflow
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          The process in this guide works — but it takes time. The brief, the outline, the draft, the read-through, the edit. For a freelancer writing five scripts a week for multiple clients, that time adds up fast.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Scribtly is built to accelerate steps 1 through 6 of this process without skipping any of them. You define the goal, audience, and platform. You save a client voice profile. Scribtly generates a structured first draft — hook, body sections, CTA — in under 60 seconds. You edit, read aloud, and deliver.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          The output is not a wall of text. It is a structured script with clearly labelled sections — the same structure described in this guide — tailored to the platform you are writing for. For{" "}
          <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">YouTube</Link>
          , that means hook, intro, three structured sections, and a CTA. For{" "}
          <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">TikTok</Link>
          , it means a punchy hook, fast body, and a direct close. For{" "}
          <Link href="/video-ad-scripts" className="text-primary underline underline-offset-2">video ads</Link>
          , it means hook, problem, solution, and offer.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          For freelancers and agencies managing multiple clients, the client voice profile system means you are not re-briefing the AI on every script. The profile is saved, consistent, and applied automatically — so every draft starts in the right place. Compare Scribtly to{" "}
          <Link href="/alternatives/chatgpt-for-scripts" className="text-primary underline underline-offset-2">
            using ChatGPT for scripts
          </Link>
          {" "}to see the difference a structured tool makes.
        </p>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-[var(--color-border)]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-xl font-semibold tracking-tight mb-6">Related pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/video-script-template", label: "Free video script template" },
            { href: "/youtube-script-template", label: "Free YouTube script template" },
            { href: "/tiktok-script-template", label: "Free TikTok script template" },
            { href: "/instagram-reels-script-template", label: "Free Reels script template" },
            { href: "/what-is-a-video-hook", label: "What is a video hook?" },
            { href: "/youtube-scripts", label: "YouTube script generator" },
            { href: "/tiktok-scripts", label: "TikTok script generator" },
            { href: "/instagram-reels-scripts", label: "Instagram Reels scripts" },
            { href: "/for-freelancers", label: "Scribtly for freelancers" },
            { href: "/for-agencies", label: "Scribtly for agencies" },
            { href: "/ai-script-writer", label: "AI script writer overview" },
            { href: "/how-to-stop-scripts-sounding-like-ai", label: "Stop scripts sounding like AI" },
            { href: "/alternatives/chatgpt-for-scripts", label: "Scribtly vs ChatGPT for scripts" },
      {/* ── RELATED RESOURCES ── */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-xl font-semibold tracking-tight mb-6">Related pages and templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/video-script-template", label: "Free video script template" },
            { href: "/youtube-script-template", label: "YouTube script template" },
            { href: "/tiktok-script-template", label: "TikTok script template" },
            { href: "/instagram-reels-script-template", label: "Instagram Reels script template" },
            { href: "/what-is-a-video-hook", label: "What is a video hook?" },
            { href: "/how-to-stop-scripts-sounding-like-ai", label: "Stop scripts sounding like AI" },
            { href: "/youtube-scripts", label: "YouTube script generator" },
            { href: "/tiktok-scripts", label: "TikTok script generator" },
            { href: "/instagram-reels-scripts", label: "Instagram Reels script generator" },
            { href: "/ai-script-writer", label: "Scribtly AI script writer" },
            { href: "/for-freelancers", label: "Scribtly for freelancers" },
            { href: "/pricing", label: "Scribtly pricing" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors duration-150"
            >
              <ArrowRight size={14} className="text-primary flex-shrink-0" />
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
      {/* ── FAQ ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-[var(--color-border)]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl mt-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Generate your next script in under 60 seconds
          </h2>
          <p className="text-white/75 mb-8">
            Scribtly turns a brief and a client voice profile into a complete, structured video script — platform-native, production-ready, and ready to edit. 5 free scripts, no card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              >
                Start writing for free <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                className="bg-white/10 text-white border-hair border-white/30 hover:bg-white/20"
              >
            Your next script is 60 seconds away.
          </h2>
          <p className="text-white/75 mb-8">
            Save your client&apos;s voice once. Generate platform-native scripts with hooks, body sections, B-roll notes, and CTAs — without starting from a blank page. 5 free scripts, no card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                Start free <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-white/10 text-white border-hair border-white/30 hover:bg-white/20">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

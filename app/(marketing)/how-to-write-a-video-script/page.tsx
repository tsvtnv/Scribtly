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
  ],
  alternates: { canonical: "/how-to-write-a-video-script" },
  openGraph: {
    type: "article",
    url: "/how-to-write-a-video-script",
    siteName: "Scribtly",
    title: "How to write a video script (complete guide) · Scribtly",
    description:
      "Learn how to write a video script from scratch — structure, hooks, pacing, CTAs, and platform differences. A practical guide for creators, freelancers, and agencies.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "How to write a video script",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to write a video script (complete guide) · Scribtly",
    description:
      "Learn how to write a video script from scratch — structure, hooks, pacing, CTAs, and platform differences. A practical guide for creators, freelancers, and agencies.",
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
  author: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  url: `${SITE_URL}/how-to-write-a-video-script`,
  keywords:
    "how to write a video script, video script structure, video scriptwriting, YouTube scripts, short-form video",
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to write a video script",
  description:
    "A step-by-step guide to writing video scripts for YouTube, TikTok, Instagram Reels, and other platforms.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Define your goal and audience",
      text: "Decide what one outcome you want from the video and who you are talking to. Every script decision flows from these two things.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Write the hook first",
      text: "Write the opening line before anything else. On short-form video you have 1–3 seconds. On YouTube you have around 5–15 seconds. The hook must create immediate curiosity, tension, or stakes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Outline the body in three sections",
      text: "Break the video body into three clear parts: the problem or premise, the main content or argument, and the resolution or practical takeaway.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Write for spoken delivery, not reading",
      text: "Use short sentences. Use contractions. Break grammar rules if it sounds natural aloud. Scripts are heard, not read — write for the ear, not the eye.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Add B-roll notes and on-screen text cues",
      text: "Where relevant, add bracketed notes for B-roll footage and on-screen text overlays. This makes the script production-ready and saves time in the edit.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Write a natural CTA",
      text: "End with a clear, single call to action that matches the platform and the video topic. Avoid generic sign-offs like 'like and subscribe'. Make it specific to the video.",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Read it aloud and edit",
      text: "Read the full script aloud before delivering it. Fix any line that makes you stumble. The spoken test is the fastest quality check available.",
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
      },
    },
    {
      "@type": "Question",
      name: "How long should a video script be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Script length depends on the video format. A 60-second TikTok or Reel script is around 120–150 words. A 10-minute YouTube video is roughly 1,200–1,500 words. A 20-minute YouTube video can reach 2,500–3,000 words. Shorter is almost always better — trim anything that doesn't serve the viewer.",
      },
    },
    {
      "@type": "Question",
      name: "Should you write a full script or just bullet points?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This depends on the presenter and platform. For short-form video and ads, a full word-for-word script keeps delivery tight and consistent. For long-form YouTube, some creators prefer a structured outline with scripted hooks and CTAs but improvised body sections. Either approach can work — the key is having something written before you film.",
      },
    },
    {
      "@type": "Question",
      name: "What is the structure of a good video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A well-structured video script includes: a hook (the opening line that earns the watch), a brief intro (who the video is for and what they'll get), the body (broken into 2–3 clear sections), and a CTA (one clear action at the end). For longer videos, add transitions between sections and consider B-roll cues for the editor.",
      },
    },
    {
      "@type": "Question",
      name: "How do you write scripts for a client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Writing scripts for a client requires understanding their voice, niche, audience, and what they would and would not say. The most effective approach is to build a voice profile for each client — capturing their tone, signature phrases, and audience language — and use that profile as a reference for every script you write for them.",
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
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Generate your next script in 60 seconds <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/video-script-template">
              <Button size="lg" variant="outline">Free script template</Button>
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
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Six common video script mistakes to avoid
        </h2>
        <div className="space-y-5">
          {mistakes.map((m) => (
            <div key={m.title} className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-xs font-bold">
                ✕
              </div>
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
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is a Video Hook? The Beginner's Guide",
  description:
    "A video hook is the opening moment that stops a scroll. Learn 6 hook types and how to write them for TikTok, YouTube, and Reels.",
  openGraph: {
    title: "What Is a Video Hook? The Beginner's Guide",
    description:
      "A video hook is the opening moment that stops a scroll. Learn 6 hook types and how to write them for TikTok, YouTube, and Reels.",
    type: "article",
    url: "https://scribtly.com/blog/what-is-a-video-hook",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is a Video Hook? The Beginner's Guide",
    description:
      "A video hook is the opening moment that stops a scroll. Learn 6 hook types and how to write them for TikTok, YouTube, and Reels.",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/what-is-a-video-hook",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is a Video Hook? The Beginner's Complete Guide",
  description:
    "A video hook is the opening moment that stops a scroll. Learn 6 hook types and how to write them for TikTok, YouTube, and Reels.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-08-02",
  dateModified: "2026-08-02",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/blog/what-is-a-video-hook",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a video hook be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For short-form video (TikTok, Reels, Shorts), aim for 1–3 seconds. For YouTube long-form, you have slightly more room — up to 5–7 seconds — but the core hook idea should land in the first three. The faster it works, the better.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a hook and an intro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hook is the very first moment — the thing that stops someone from scrolling. An intro is what comes immediately after: the brief setup that explains who you are and what the video covers. The hook earns the intro. Without a hook, nobody stays for the intro.",
      },
    },
    {
      "@type": "Question",
      name: "Do YouTube and TikTok hooks need to be different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the structure is similar but the pacing and tone differ. TikTok and Reels hooks need to hit within 1–2 seconds because viewers swipe faster. YouTube hooks can rely a little more on context and curiosity, but even on YouTube, most drop-off happens in the first 30 seconds, so a strong visual or statement in the first few seconds still matters enormously.",
      },
    },
    {
      "@type": "Question",
      name: "Can you use a hook in a talking head video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Talking head videos rely on hooks more than most formats because there is no b-roll or rapid editing to carry the attention. The first sentence you say on camera is your hook. Make it a bold statement, a question, or a surprising fact — not 'Hey guys, welcome back.'",
      },
    },
    {
      "@type": "Question",
      name: "How many hook variations should I test?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Test at least 3 different hooks for the same piece of content if you are treating it seriously. A question hook, a bold statement hook, and a story hook will perform very differently on the same topic. Platforms like TikTok let you see drop-off data early, so you can identify the winner quickly.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://scribtly.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "What Is a Video Hook?",
      item: "https://scribtly.com/blog/what-is-a-video-hook",
    },
  ],
};

const hookTypes = [
  {
    num: "1",
    name: "The Question Hook",
    description:
      "Open with a question your audience is already thinking about. It triggers an internal answer instinct — the viewer watches to see if your answer matches theirs.",
    example: '"Have you ever posted a video and got zero views despite spending hours on it?"',
    works: "TikTok, YouTube, Reels, LinkedIn video",
  },
  {
    num: "2",
    name: "The Bold Statement Hook",
    description:
      "Make a claim that is surprising, counterintuitive, or provocative. The viewer watches to find out if you can back it up.",
    example:
      '"The first three seconds of your video matter more than the next three minutes."',
    works: "All platforms, especially YouTube and LinkedIn",
  },
  {
    num: "3",
    name: "The Loop Hook",
    description:
      "Tease the ending or a turning point at the start, then leave the answer for later. Creates a narrative tension that keeps viewers watching to close the loop.",
    example:
      '"By the end of this video, you\'ll know the exact mistake that killed my first 10 videos."',
    works: "YouTube, long-form TikTok, podcast intros",
  },
  {
    num: "4",
    name: "The Pattern Interrupt Hook",
    description:
      "Do something unexpected visually or verbally right at the start. Breaks the scrolling autopilot and forces attention.",
    example:
      "Starting mid-sentence, cutting to an unusual visual, or opening with a sound that doesn't match what the viewer expects.",
    works: "TikTok, Reels, YouTube Shorts",
  },
  {
    num: "5",
    name: "The Story Hook",
    description:
      "Drop the viewer into the middle of a story. No preamble, no setup — start in the action and let context fill in naturally.",
    example: '"Last Tuesday I lost a £3,000 client because of one line in a script."',
    works: "All platforms, especially TikTok and Reels",
  },
  {
    num: "6",
    name: "The Social Proof Hook",
    description:
      "Lead with a result, number, or credential that instantly establishes authority or curiosity.",
    example:
      '"I\'ve written over 800 video scripts. Here\'s the one thing most clients get wrong."',
    works: "YouTube, LinkedIn video, educational TikTok",
  },
];

const hookMistakes = [
  {
    mistake: "Starting with 'Hey guys, welcome back'",
    fix: "Skip the pleasantries entirely. Your existing subscribers already know you. New viewers don't care yet. Start with the hook, not the greeting.",
  },
  {
    mistake: "Making the hook too long",
    fix: "A hook that takes 10 seconds to land isn't a hook — it's an intro. Every word in your hook should earn its place. If you can cut a word without losing the effect, cut it.",
  },
  {
    mistake: "Giving away everything in the hook",
    fix: "The hook should create a reason to watch, not answer the question immediately. Tease enough to create curiosity. Hold the payoff.",
  },
  {
    mistake: "Using the same hook format every time",
    fix: "Viewers who follow you will start to predict your openings. Rotate between hook types to keep things fresh and test what resonates with new audiences.",
  },
  {
    mistake: "Writing the hook last",
    fix: "The hook is the hardest and most important line to write. Draft it first — before the rest of the script — when you have the most creative energy.",
  },
];

const platformExamples = [
  {
    platform: "TikTok & Instagram Reels",
    context: "Audience is swiping quickly. Hooks need to be instant and punchy.",
    examples: [
      '"POV: you just spent 6 hours on a video that got 4 views."',
      '"Stop starting your videos like this." [cut to bad example]',
      '"I rewrote 100 client scripts. Here\'s what I learned."',
    ],
  },
  {
    platform: "YouTube (long-form)",
    context: "Viewers have more patience but drop-off in the first 30 seconds is still significant.",
    examples: [
      '"Most freelancers spend hours on a script and get it completely wrong in the first sentence. Here\'s why."',
      '"I\'m going to show you the exact hook formula I use for every client script — it takes under 60 seconds to write."',
      '"By the end of this video, you\'ll be able to write a hook for any video topic in under two minutes."',
    ],
  },
  {
    platform: "LinkedIn Video",
    context: "Professional audience. Hooks work best when they reference business context or credibility.",
    examples: [
      '"I\'ve reviewed over 300 video scripts for clients. This is the only thing that consistently tanks performance."',
      '"Here\'s the hook structure that increased my client\'s video retention by 40 percentage points."',
      '"Most marketing teams overthink scripts. This single change makes more difference than anything else."',
    ],
  },
];

const faqs = [
  {
    q: "How long should a video hook be?",
    a: "For short-form video (TikTok, Reels, Shorts), aim for 1–3 seconds. For YouTube long-form, you have slightly more room — up to 5–7 seconds — but the core hook idea should land in the first three. The faster it works, the better.",
  },
  {
    q: "What is the difference between a hook and an intro?",
    a: "A hook is the very first moment — the thing that stops someone from scrolling. An intro is what comes immediately after: the brief setup that explains who you are and what the video covers. The hook earns the intro. Without a hook, nobody stays for the intro.",
  },
  {
    q: "Do YouTube and TikTok hooks need to be different?",
    a: "Yes, the structure is similar but the pacing and tone differ. TikTok and Reels hooks need to hit within 1–2 seconds because viewers swipe faster. YouTube hooks can rely a little more on context and curiosity, but even on YouTube, most drop-off happens in the first 30 seconds, so a strong visual or statement in the first few seconds still matters enormously.",
  },
  {
    q: "Can you use a hook in a talking head video?",
    a: "Absolutely. Talking head videos rely on hooks more than most formats because there is no b-roll or rapid editing to carry the attention. The first sentence you say on camera is your hook. Make it a bold statement, a question, or a surprising fact — not 'Hey guys, welcome back.'",
  },
  {
    q: "How many hook variations should I test?",
    a: "Test at least 3 different hooks for the same piece of content if you are treating it seriously. A question hook, a bold statement hook, and a story hook will perform very differently on the same topic. Platforms like TikTok let you see drop-off data early, so you can identify the winner quickly.",
  },
];

export default function WhatIsAVideoHookPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: "var(--border)",
          background: "rgba(253,250,246,0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Try free
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:opacity-70 transition-opacity">
            Blog
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>What Is a Video Hook?</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{
            background: "rgba(224,120,48,0.08)",
            borderColor: "rgba(224,120,48,0.25)",
            color: "var(--accent)",
          }}
        >
          Script Writing Basics
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          What Is a Video Hook?
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          A video hook is the opening moment of your video — the first sentence, visual, or action
          — that gives a viewer a reason to keep watching instead of scrolling past. Most videos
          lose the majority of their audience in the first three seconds. A strong hook is the
          difference between a video that gets watched and one that gets skipped.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-08-02">2 August 2026</time>
          <span>·</span>
          <span>7 min read</span>
        </div>
      </header>

      {/* Soft CTA near top */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div
          className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Stop writing hooks from a blank page
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native scripts with hooks, body sections, and CTAs built
              in — in your client&apos;s voice.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        {/* Section 1 */}
        <h2
          className="text-2xl font-bold mb-4 mt-12"
          style={{ color: "var(--text-primary)" }}
        >
          What a video hook actually does
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          On every platform — TikTok, YouTube, Instagram Reels, LinkedIn — the algorithm rewards
          watch time and completion rates. Both start with the hook.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A hook works by creating a gap between what the viewer knows right now and what they
          want to know. That gap is what keeps them watching. The moment the gap closes — or they
          decide it is not worth closing — they scroll.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Hooks can be verbal (something you say), visual (something you show), or a combination
          of both. On talking head videos, the first sentence is almost always the hook. On heavily
          edited short-form content, it might be a cut, a sound, or a title card on screen.
        </p>

        {/* Section 2 */}
        <h2
          className="text-2xl font-bold mb-4 mt-12"
          style={{ color: "var(--text-primary)" }}
        >
          Why hooks matter more than anything else in your script
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          You can have excellent content, a great production setup, and a well-structured script —
          but if the first three seconds do not give someone a reason to stay, they will never see
          any of it.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Here is why the hook is structurally critical:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Platforms measure audience retention from the first second — a sharp early drop-off signals low quality to the algorithm.",
            "On TikTok and Reels, the default behaviour is to swipe. Your hook has to interrupt that reflex instantly.",
            "A stronger hook increases click-through rate on YouTube, where the thumbnail sets an expectation the opening must immediately confirm.",
            "For freelancers and agencies, a script that opens weakly is a script that underperforms — no matter how strong the rest of it is.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--accent)" }}
              />
              <span className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Section 3: 6 types */}
        <h2
          className="text-2xl font-bold mb-4 mt-12"
          style={{ color: "var(--text-primary)" }}
        >
          The 6 main types of video hook
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Most effective hooks fall into one of six categories. Understanding the categories helps
          you choose the right approach for the platform, the audience, and the content type.
        </p>

        <div className="flex flex-col gap-5 mb-8">
          {hookTypes.map((hook) => (
            <div
              key={hook.num}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  {hook.num}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {hook.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {hook.description}
                  </p>
                  <div
                    className="rounded-xl border-l-4 pl-4 py-2 mb-3"
                    style={{
                      borderColor: "var(--accent)",
                      background: "rgba(224,120,48,0.04)",
                    }}
                  >
                    <p className="text-sm italic" style={{ color: "var(--text-primary)" }}>
                      {hook.example}
                    </p>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    <strong>Works well on:</strong> {hook.works}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: How to write a hook */}
        <h2
          className="text-2xl font-bold mb-4 mt-12"
          style={{ color: "var(--text-primary)" }}
        >
          How to write a video hook in 3 steps
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Writing a hook is not about being clever. It is about identifying exactly what your
          viewer wants to know and making it obvious — immediately — that your video has the
          answer.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              step: "1",
              title: "Identify the core promise of your video",
              body: "Before you write a hook, know exactly what value your video delivers. What will the viewer know, feel, or be able to do after watching that they could not before? Write this in one sentence. That is the promise. The hook is the teaser for that promise.",
            },
            {
              step: "2",
              title: "Choose your hook type based on the platform and audience",
              body: "A question hook works well for educational content on YouTube. A pattern interrupt works better on TikTok where the feed is more visually noisy. A story hook fits creators who already have a loyal audience. Match the hook type to where and who you are posting for.",
            },
            {
              step: "3",
              title: "Cut until it is as short as possible",
              body: "Draft three or four versions of the hook. Then remove every word that does not need to be there. A hook that takes 10 seconds to land is too slow. If you can say it in five words, say it in five. Read it aloud — the rhythm matters on video.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Generate scripts with hooks already written in
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly builds the hook, body, and CTA into every script — structured for TikTok,
            YouTube, Reels, and LinkedIn video. Start free with 5 scripts.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free <ArrowRight size={16} />
          </Link>
        </div>

        {/* Section 5: Platform examples */}
        <h2
          className="text-2xl font-bold mb-4 mt-12"
          style={{ color: "var(--text-primary)" }}
        >
          Hook examples by platform
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          The same hook idea lands differently depending on where you are posting. Here is how the
          same content might open differently across platforms.
        </p>

        {platformExamples.map((p) => (
          <div
            key={p.platform}
            className="rounded-2xl border p-6 mb-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {p.platform}
            </h3>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              {p.context}
            </p>
            <div className="flex flex-col gap-2">
              {p.examples.map((ex) => (
                <div
                  key={ex}
                  className="rounded-xl border-l-4 pl-4 py-2"
                  style={{
                    borderColor: "var(--accent)",
                    background: "rgba(224,120,48,0.04)",
                  }}
                >
                  <p className="text-sm italic" style={{ color: "var(--text-primary)" }}>
                    {ex}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Section 6: Scribtly */}
        <h2
          className="text-2xl font-bold mb-4 mt-12"
          style={{ color: "var(--text-primary)" }}
        >
          How Scribtly handles hooks for every script
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Writing a strong hook from scratch — every time, for every client, across every platform
          — is one of the most draining parts of script writing.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly generates platform-native scripts where the hook, intro, body sections, and CTA
          are all structured automatically. You choose the platform, supply the topic and any
          client context, and Scribtly returns a full script with a hook already drafted in the
          right format for that platform.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Because Scribtly saves your client&apos;s voice profile — their tone, niche, audience,
          and preferred phrases — the hook sounds like them, not like generic AI output.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "Hook + body + CTA in one generation",
            "Platform-specific structure (TikTok, YouTube, Reels, LinkedIn)",
            "Client voice profile saved once and reused",
            "No blank page — first draft in under 60 seconds",
            "Scripts organised by client and platform",
            "Generate multiple hook variations to test",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Section 7: Mistakes */}
        <h2
          className="text-2xl font-bold mb-4 mt-12"
          style={{ color: "var(--text-primary)" }}
        >
          Common hook mistakes to avoid
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {hookMistakes.map((item) => (
            <div
              key={item.mistake}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                ✗ {item.mistake}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--accent)" }}>Fix: </strong>
                {item.fix}
              </p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <h2
          className="text-2xl font-bold mb-6 mt-12"
          style={{ color: "var(--text-primary)" }}
        >
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4 mb-12">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)" }}
            >
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {faq.q}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Generate client-ready scripts with hooks built in
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly generates platform-native scripts in your client&apos;s saved voice — hook,
            body, CTA, and all. Start free with 5 scripts, no card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start writing free <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No credit card required. 5 free scripts included.
          </p>
        </div>

        {/* Internal links */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Related reading
          </p>
          <div className="flex flex-col gap-2">
            {[
              { href: "/", label: "Scribtly — AI script writer for freelancers and creators" },
              {
                href: "/blog/how-to-write-linkedin-connection-requests",
                label: "How to Write LinkedIn Connection Requests That Get Accepted",
              },
              {
                href: "/compare/scribtly-vs-expandi",
                label: "Scribtly vs Expandi — which tool fits your workflow?",
              },
              { href: "/signup", label: "Try Scribtly free — 5 scripts included" },
              { href: "/login", label: "Sign in to Scribtly" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--accent)" }}
              >
                <ArrowRight size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={90}
              height={22}
              className="h-6 w-auto"
            />
          </Link>
          <span>© 2026 Scribtly. All rights reserved.</span>
          <span>
            Powered by{" "}
            <a
              href="https://octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              octelis.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

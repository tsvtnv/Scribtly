import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is a Video Hook? (And How to Write One)",
  description:
    "A video hook is the opening seconds designed to stop the scroll. Learn what makes a strong hook, the main types, and how to write one every time.",
  openGraph: {
    title: "What Is a Video Hook? (And How to Write One)",
    description:
      "A video hook is the opening seconds designed to stop the scroll. Learn what makes a strong hook, the main types, and how to write one every time.",
    type: "article",
    url: "https://scribtly.com/blog/what-is-a-video-hook",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/what-is-a-video-hook",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://scribtly.com/blog/what-is-a-video-hook#article",
      headline: "What Is a Video Hook? (And How to Write One)",
      description:
        "A video hook is the opening seconds designed to stop the scroll. Learn what makes a strong hook, the main types, and how to write one every time.",
      author: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      datePublished: "2026-07-06",
      dateModified: "2026-07-06",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://scribtly.com/blog/what-is-a-video-hook",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long should a video hook be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For short-form video (TikTok, Reels, Shorts), your hook should land within the first 1 to 3 seconds. For YouTube long-form, you have up to 30 seconds to establish your hook before audience retention starts to drop sharply. The shorter the platform, the faster your hook needs to work.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a hook and an intro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A hook is designed to grab attention and make the viewer want to keep watching. An intro typically comes after the hook and sets up what the video covers. On short-form platforms, many creators skip a traditional intro entirely and move straight from the hook into the content.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the same hook for every video?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Repeating the same hook formula too often trains your audience to scroll past it. You should rotate your hook types and adapt the language to each specific video topic, audience, and platform. A question hook that works well for a finance channel may fall flat for a fitness creator.",
          },
        },
        {
          "@type": "Question",
          name: "What makes a bad video hook?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bad hooks are vague, slow to deliver, or promise something the video does not deliver. Common mistakes include starting with 'Hi, welcome back to my channel', giving too much context before the payoff, or using a dramatic hook that has nothing to do with the actual content.",
          },
        },
        {
          "@type": "Question",
          name: "Does a video hook work the same way across platforms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The core principle is the same — grab attention fast — but the style varies by platform. TikTok and Reels favour bold, fast, conversational hooks. YouTube allows slightly longer setups. LinkedIn video tends to work better with a professional hook that leads with a result or insight. Scribtly generates platform-native hooks for each of these.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://scribtly.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://scribtly.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "What Is a Video Hook?",
          item: "https://scribtly.com/blog/what-is-a-video-hook",
        },
      ],
    },
  ],
};

const hookTypes = [
  {
    name: "The Bold Statement",
    example: '"Most creators get the hook completely wrong — and it costs them 80% of their audience."',
    why: "Triggers disagreement or curiosity. Viewers stay to see if you are right.",
  },
  {
    name: "The Direct Question",
    example: '"Are you still writing your scripts from scratch every time?"',
    why: "Speaks directly to a pain point. Works best when the question reflects an emotion the viewer already has.",
  },
  {
    name: "The Pattern Interrupt",
    example: '"Nobody tells freelancers this about client scripts — but they should."',
    why: "Breaks the scroll by introducing something unexpected or withheld.",
  },
  {
    name: "The Result-First Hook",
    example: '"I went from 2 hours per script to 15 minutes. Here is how."',
    why: "Leads with the outcome so the viewer immediately knows what they will gain.",
  },
  {
    name: "The Relatable Scenario",
    example: '"You\'re 40 minutes into staring at a blank doc. Sound familiar?"',
    why: "Creates instant connection by reflecting a situation the target audience lives.",
  },
  {
    name: "The Contrarian Take",
    example: '"Stop using trending audio. It is actually hurting your reach."',
    why: "Challenges received wisdom. Triggers both agreement and argument — both keep people watching.",
  },
];

const mistakes = [
  {
    mistake: "Starting with 'Hey guys, welcome back'",
    fix: "Treat the first word as if the viewer is about to scroll. Make it specific and immediate.",
  },
  {
    mistake: "Building up too much context before the payoff",
    fix: "Put the payoff first. Give the context after you have earned their attention.",
  },
  {
    mistake: "Using a dramatic hook that does not match the content",
    fix: "The hook must deliver on what it promises. Misleading hooks destroy trust and hurt watch time.",
  },
  {
    mistake: "Being vague ('I have something important to share with you')",
    fix: "Be specific. 'I have something important' tells the viewer nothing. Name the thing.",
  },
  {
    mistake: "Writing one hook and calling it done",
    fix: "Write three to five hook variations before filming. The first draft is rarely the strongest.",
  },
];

export default function WhatIsAVideoHookPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/blog"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Blog
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Features
            </Link>
          </div>
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
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>What Is a Video Hook?</span>
        </nav>
      </div>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
          style={{
            background: "rgba(224,120,48,0.08)",
            borderColor: "rgba(224,120,48,0.25)",
            color: "var(--accent)",
          }}
        >
          Script Writing Glossary
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          What Is a Video Hook?
        </h1>
        <p className="text-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
          A video hook is the opening moment of a video — usually the first one to three seconds —
          designed to stop the viewer from scrolling and give them a reason to keep watching.
        </p>
        <div className="mt-6 flex items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>6 July 2026</span>
          <span>·</span>
          <span>8 min read</span>
        </div>
      </header>

      {/* Soft CTA banner */}
      <div
        className="max-w-3xl mx-auto px-6 mb-10"
      >
        <div
          className="rounded-2xl border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Writing hooks for clients?</strong> Scribtly generates platform-native hooks in your client&apos;s voice. No blank page.
          </p>
          <Link
            href="/signup"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Article */}
      <article className="max-w-3xl mx-auto px-6 pb-16">

        {/* Section 1: What is it */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            The simple definition
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            A <strong style={{ color: "var(--text-primary)" }}>video hook</strong> is the opening line, image, action, or question that appears at the very start of a video. Its only job is to create enough curiosity or emotion that the viewer does not scroll away.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            On platforms like TikTok, Instagram Reels, and YouTube Shorts, you have roughly one to three seconds. On YouTube long-form, the hook needs to land within the first 30 seconds before watch time drops sharply.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The hook is almost always the difference between a video that performs and one that does not. A strong script with a weak hook rarely recovers. A simple script with a strong hook can still do well.
          </p>
        </section>

        {/* Section 2: Why it matters */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Why the hook matters more than anything else
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Every major video platform uses watch time as a ranking signal. If viewers click away in the first few seconds, the algorithm treats the video as low quality and shows it to fewer people. If viewers stay past the hook, the algorithm pushes the video further.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { stat: "~70%", label: "of TikTok viewers decide to keep watching within the first 2 seconds" },
              { stat: "3–30s", label: "is the window to hook a YouTube viewer before retention drops" },
              { stat: "#1", label: "factor freelancers cite for why client videos underperform" },
            ].map((item) => (
              <div
                key={item.stat}
                className="rounded-xl border p-5 text-center"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="text-2xl font-bold mb-2" style={{ color: "var(--accent)" }}>{item.stat}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            For freelance script writers, understanding hooks is not optional. Clients judge scripts on their opening lines before reading anything else. If your hook is weak, the client will doubt the rest — even if the body is excellent.
          </p>
        </section>

        {/* Section 3: Types of hooks */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            The six main types of video hook
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Most high-performing hooks fall into one of these six categories. Knowing the type helps you choose the right approach for the content and the audience.
          </p>
          <div className="flex flex-col gap-4">
            {hookTypes.map((h) => (
              <div
                key={h.name}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {h.name}
                </h3>
                <p
                  className="text-sm italic mb-3 pl-4 border-l-2"
                  style={{ color: "var(--text-muted)", borderColor: "var(--accent)" }}
                >
                  {h.example}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>Why it works: </strong>{h.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 mb-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Stop writing hooks from scratch every time
          </h3>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly generates platform-native hooks in your client&apos;s saved voice. TikTok, Reels, YouTube, LinkedIn — all in under 60 seconds.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Generate your first hook free
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No card required. 5 scripts free to start.
          </p>
        </div>

        {/* Section 4: How to write a hook */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How to write a strong video hook
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Follow this four-step process for any video, on any platform:
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                num: "01",
                title: "Identify the one thing the viewer cares most about",
                body: "Before writing the hook, be clear on the viewer's problem, desire, or emotion. The hook must speak directly to that — not to the topic in general.",
              },
              {
                num: "02",
                title: "Lead with the payoff, not the setup",
                body: "Most weak hooks spend too long building context before delivering anything interesting. Reverse the order. Start with the result, the surprising fact, or the question — then fill in the setup.",
              },
              {
                num: "03",
                title: "Be specific",
                body: 'Vague hooks like "I have something important to share" perform poorly. Specific hooks like "Most TikTok scripts fail in the first three words — and here is why" perform far better. Specificity signals credibility.',
              },
              {
                num: "04",
                title: "Write three to five variations",
                body: "The first hook you write is almost never the strongest. Draft multiple options, test them mentally against your audience, and choose the one that creates the most urgency or curiosity.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-xl border p-6 flex gap-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="text-3xl font-bold leading-none shrink-0 mt-0.5"
                  style={{ color: "rgba(224,120,48,0.25)" }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Platform differences */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How hooks differ across platforms
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            The underlying principle is the same everywhere — grab attention fast — but the style, tone, and length vary by platform.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: `2px solid var(--border)` }}>
                  <th className="text-left py-3 pr-4 font-semibold" style={{ color: "var(--text-primary)" }}>Platform</th>
                  <th className="text-left py-3 pr-4 font-semibold" style={{ color: "var(--text-primary)" }}>Hook window</th>
                  <th className="text-left py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Style notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { platform: "TikTok", window: "0–2 seconds", notes: "Bold, visual, fast. Often starts mid-action or mid-sentence." },
                  { platform: "Instagram Reels", window: "0–2 seconds", notes: "Similar to TikTok but slightly more polished. Text overlays help." },
                  { platform: "YouTube Shorts", window: "0–3 seconds", notes: "Fast hook, then immediate payoff. No long intros." },
                  { platform: "YouTube (long-form)", window: "0–30 seconds", notes: "More room to build, but still needs a clear reason to watch early on." },
                  { platform: "LinkedIn video", window: "0–3 seconds", notes: "Professional angle. Leads with a result, insight, or direct question relevant to the industry." },
                  { platform: "Podcast intro", window: "0–20 seconds", notes: "Audio-only means the first sentence carries everything. Lead with the core problem or outcome." },
                ].map((row, i) => (
                  <tr
                    key={row.platform}
                    style={{
                      borderBottom: `1px solid var(--border)`,
                      background: i % 2 === 0 ? "transparent" : "var(--bg-subtle)",
                    }}
                  >
                    <td className="py-3 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>{row.platform}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-muted)" }}>{row.window}</td>
                    <td className="py-3" style={{ color: "var(--text-muted)" }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
            Scribtly generates platform-native scripts with dedicated hook sections for{" "}
            <Link href="/tiktok-script-generator" className="underline hover:opacity-70" style={{ color: "var(--accent)" }}>TikTok</Link>,{" "}
            <Link href="/youtube-script-generator" className="underline hover:opacity-70" style={{ color: "var(--accent)" }}>YouTube</Link>,{" "}
            <Link href="/instagram-reels-script-generator" className="underline hover:opacity-70" style={{ color: "var(--accent)" }}>Instagram Reels</Link>, and more.
          </p>
        </section>

        {/* Section 6: Where Scribtly fits */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How Scribtly helps with hooks
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
            Writing a strong hook from scratch every time is time-consuming, especially when you are producing scripts for multiple clients across different platforms.
          </p>
          <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
            Scribtly is built for freelance script writers, content creators, and social media managers who need to generate client-ready scripts fast. When you save a client&apos;s brand voice profile once — their tone, audience, niche, and style — Scribtly uses that context to generate platform-specific scripts with dedicated hook sections that already sound like that client.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Generate hooks in your client's saved voice, not generic AI output",
              "Platform-native structure: hook, body, CTA — matched to TikTok, Reels, YouTube, LinkedIn",
              "Multiple hook variations per script so you can test and choose",
              "No re-explaining the client brief every single time",
              "Scripts organised by client and platform in one place",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--accent)" }}
                />
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Common mistakes */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Common hook mistakes to avoid
          </h2>
          <div className="flex flex-col gap-4">
            {mistakes.map((m) => (
              <div
                key={m.mistake}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--accent)" }}>
                  Mistake: {m.mistake}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>Fix: </strong>{m.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                q: "How long should a video hook be?",
                a: "For short-form video (TikTok, Reels, Shorts), your hook should land within the first 1 to 3 seconds. For YouTube long-form, you have up to 30 seconds to establish your hook before audience retention drops sharply. The shorter the platform, the faster your hook needs to work.",
              },
              {
                q: "What is the difference between a hook and an intro?",
                a: "A hook is designed to grab attention and make the viewer want to keep watching. An intro typically comes after the hook and sets up what the video covers. On short-form platforms, many creators skip a traditional intro entirely and move straight from the hook into the content.",
              },
              {
                q: "Can I use the same hook for every video?",
                a: "No. Repeating the same hook formula too often trains your audience to scroll past it. You should rotate your hook types and adapt the language to each specific video topic, audience, and platform. A question hook that works well for a finance channel may fall flat for a fitness creator.",
              },
              {
                q: "What makes a bad video hook?",
                a: "Bad hooks are vague, slow to deliver, or promise something the video does not deliver. Common mistakes include starting with 'Hi, welcome back to my channel', giving too much context before the payoff, or using a dramatic hook that has nothing to do with the actual content.",
              },
              {
                q: "Does a video hook work the same way across platforms?",
                a: "The core principle is the same — grab attention fast — but the style varies by platform. TikTok and Reels favour bold, fast, conversational hooks. YouTube allows slightly longer setups. LinkedIn video tends to work better with a professional hook that leads with a result or insight. Scribtly generates platform-native hooks for each of these.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3 className="font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related reading */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Related reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "TikTok Script Generator", href: "/tiktok-script-generator", desc: "Generate TikTok scripts with hooks, body, and CTAs in your client's voice." },
              { title: "YouTube Script Generator", href: "/youtube-script-generator", desc: "Full YouTube scripts with hooks, structure, and B-roll notes." },
              { title: "Instagram Reels Script Generator", href: "/instagram-reels-script-generator", desc: "Short-form scripts built for Reels performance." },
              { title: "AI Script Writer for Freelancers", href: "/for-freelancers", desc: "How Scribtly helps freelance script writers produce more in less time." },
              { title: "What Is a Client Voice Profile?", href: "/blog/what-is-a-client-voice-profile", desc: "Learn how saved voice profiles change client script work forever." },
              { title: "Video Script Templates", href: "/templates/video-script-template", desc: "Free templates for YouTube, TikTok, Reels, and more." },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border p-5 block transition-all hover:opacity-80"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                  {link.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div
          className="rounded-2xl border p-8"
          style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.05)" }}
        >
          <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Turn one idea into a client-ready script
          </h3>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Scribtly generates platform-native scripts with strong hooks built in — in your client&apos;s saved voice, in under 60 seconds. No blank page. No re-explaining tone every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — 5 scripts included
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              Learn more about Scribtly
            </Link>
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
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
            <Link href="/templates/video-script-template" className="hover:opacity-70 transition-opacity">Templates</Link>
            <Link href="/for-freelancers" className="hover:opacity-70 transition-opacity">For Freelancers</Link>
            <Link href="/signup" className="hover:opacity-70 transition-opacity">Sign up free</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

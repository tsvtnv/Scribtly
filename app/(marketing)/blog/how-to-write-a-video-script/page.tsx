import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write a Video Script (Step-by-Step Guide) | Scribtly",
  description:
    "Learn how to write a video script from scratch. Covers hooks, structure, CTAs, and tips for YouTube, TikTok, Reels, and client content work.",
  openGraph: {
    title: "How to Write a Video Script (Step-by-Step Guide)",
    description:
      "Learn how to write a video script from scratch. Covers hooks, structure, CTAs, and tips for YouTube, TikTok, Reels, and client content work.",
    type: "article",
    siteName: "Scribtly",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-a-video-script",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Write a Video Script (Step-by-Step Guide)",
  description:
    "Learn how to write a video script from scratch. Covers hooks, structure, CTAs, and tips for YouTube, TikTok, Reels, and client content work.",
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
  datePublished: "2026-06-30",
  dateModified: "2026-06-30",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/blog/how-to-write-a-video-script",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a video script be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the platform. TikTok and Reels scripts for 30–60 second videos are typically 75–150 words. YouTube scripts for 8–12 minute videos run 1,200–1,800 words. Aim for roughly one word per second as a starting guide.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to memorise my video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Most creators use their script as a flexible guide rather than memorising it word for word. Reading bullet points feels more natural on camera than reciting exact lines.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most important part of a video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The hook. The first 3–5 seconds determine whether viewers stay or scroll. A strong hook makes everything else easier.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write a video script in a client's voice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by documenting the client's tone, key phrases, audience, and style. Then use those notes to guide every draft. Tools like Scribtly let you save a client voice profile once and generate scripts in that voice automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a YouTube script and a TikTok script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube scripts are longer and more structured, covering a topic in depth over 5–15 minutes. TikTok scripts are shorter (15–90 seconds), punchier, and lead with the hook immediately. Pacing, structure, and CTA placement differ significantly.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI write a good video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI can produce strong first drafts, especially when given a clear brief, a defined audience, and a specific platform. The quality of AI-generated scripts improves significantly when the tool understands the client's voice and the platform's conventions — which is exactly what Scribtly is built to do.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
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
      name: "How to Write a Video Script",
      item: "https://scribtly.com/blog/how-to-write-a-video-script",
    },
  ],
};

const faqs = [
  {
    q: "How long should a video script be?",
    a: "It depends on the platform. TikTok and Reels scripts for 30–60 second videos are typically 75–150 words. YouTube scripts for 8–12 minute videos run 1,200–1,800 words. Aim for roughly one word per second as a starting guide.",
  },
  {
    q: "Do I need to memorise my video script?",
    a: "No. Most creators use their script as a flexible guide rather than memorising it word for word. Reading bullet points feels more natural on camera than reciting exact lines.",
  },
  {
    q: "What is the most important part of a video script?",
    a: "The hook. The first 3–5 seconds determine whether viewers stay or scroll. A strong hook makes everything else easier.",
  },
  {
    q: "How do I write a video script in a client's voice?",
    a: "Start by documenting the client's tone, key phrases, audience, and style. Then use those notes to guide every draft. Tools like Scribtly let you save a client voice profile once and generate scripts in that voice automatically.",
  },
  {
    q: "What is the difference between a YouTube script and a TikTok script?",
    a: "YouTube scripts are longer and more structured, covering a topic in depth over 5–15 minutes. TikTok scripts are shorter (15–90 seconds), punchier, and lead with the hook immediately. Pacing, structure, and CTA placement differ significantly.",
  },
  {
    q: "Can AI write a good video script?",
    a: "AI can produce strong first drafts, especially when given a clear brief, a defined audience, and a specific platform. The quality improves significantly when the tool understands the client's voice and platform conventions — which is what Scribtly is built to do.",
  },
];

const platforms = [
  ["YouTube", "1,200–2,400 words", "Educational, structured", "First 30 seconds"],
  ["YouTube Shorts", "75–150 words", "Fast-paced, punchy", "First 2–3 seconds"],
  ["TikTok", "50–200 words", "Conversational, direct", "Immediate"],
  ["Instagram Reels", "50–150 words", "Punchy, visual", "Immediate"],
  ["LinkedIn Video", "100–300 words", "Professional, insight-led", "First 5 seconds"],
  ["Podcast", "Varies widely", "Natural, conversational", "Intro within 60 seconds"],
  ["Video Ad", "75–200 words", "Problem-solution-CTA", "Immediate"],
];

const whyScriptsHelp = [
  {
    title: "Faster recording",
    body: "You know what to say before you say it. Fewer retakes, faster edits.",
  },
  {
    title: "Stronger hooks",
    body: "You can write and refine the first five seconds before pressing record.",
  },
  {
    title: "Clearer messaging",
    body: "One idea per video, explained properly, without going off-topic.",
  },
  {
    title: "Better CTAs",
    body: "The call to action is planned in advance, not tacked on at the end.",
  },
  {
    title: "Consistent output",
    body: "Scripts create a repeatable system — especially useful for client work.",
  },
  {
    title: "Shorter editing time",
    body: "Good scripts reduce the cutting, trimming, and fixing needed in post.",
  },
];

const scriptSteps = [
  {
    num: "01",
    title: "Hook",
    body: "The first 3–5 seconds. This is what stops the scroll or keeps viewers past the thumbnail. It is the single most important line in the script.",
  },
  {
    num: "02",
    title: "Intro",
    body: "Brief context. Who is this video for and what will they get from it? Keep it to 10–20 seconds maximum.",
  },
  {
    num: "03",
    title: "Body",
    body: "The main content — tips, steps, a story, a demonstration, or an argument. This is the bulk of the script. Each point should flow naturally into the next.",
  },
  {
    num: "04",
    title: "CTA",
    body: "What do you want the viewer to do next? Subscribe, visit a link, book a call, buy a product. One CTA is always enough.",
  },
];

const clientSteps = [
  {
    step: "1",
    title: "Create a client voice profile",
    body: "Document their tone, audience, key phrases, content pillars, platform, and style. Store it once so you never re-explain it.",
  },
  {
    step: "2",
    title: "Use a platform-specific structure",
    body: "YouTube hooks are different from TikTok hooks. Use a structure built for the platform, not a generic template.",
  },
  {
    step: "3",
    title: "Draft quickly, then refine",
    body: "Use your system or a tool like Scribtly to get a first draft in seconds. Then apply your editorial instincts to shape the final version.",
  },
  {
    step: "4",
    title: "Deliver in a consistent format",
    body: "Label each section clearly: Hook, Intro, Point 1, Point 2, CTA. Clients appreciate clean, scannable formatting.",
  },
];

const commonMistakes = [
  {
    mistake: "No hook or a weak hook",
    fix: "Spend as much time on the first line as the rest of the script combined.",
  },
  {
    mistake: "Burying the point",
    fix: "Say what the video is about within the first 20 seconds.",
  },
  {
    mistake: "Writing for reading, not speaking",
    fix: "Read every line aloud before finalising. Rewrite anything that sounds stiff or unnatural.",
  },
  {
    mistake: "Multiple CTAs",
    fix: "Choose one action. Multiple asks dilute all of them.",
  },
  {
    mistake: "Scripts that sound like generic AI output",
    fix: "Customise the tone. Use client-specific language, examples, and phrases — not boilerplate.",
  },
  {
    mistake: "Ignoring platform structure",
    fix: "A YouTube script structure does not work on TikTok. Know the platform conventions before writing.",
  },
];

export default function HowToWriteAVideoScript() {
  return (
    <>
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

      <div style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
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
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/">
              <Image
                src="/images/logo-horizontal.png"
                alt="Scribtly"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="text-sm font-medium hidden sm:block hover:opacity-70 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                Blog
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold px-4 py-2 rounded-lg text-white hover:opacity-90 transition-all"
                style={{ background: "var(--accent)" }}
              >
                Try free
              </Link>
            </div>
          </div>
        </nav>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <span>/</span>
            <span>How to Write a Video Script</span>
          </nav>

          {/* Label + reading time */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(224,120,48,0.10)",
                color: "var(--accent)",
              }}
            >
              Guide
            </span>
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: "var(--text-muted)" }}
            >
              <Clock size={11} />
              12 min read
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            How to Write a Video Script
          </h1>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            A strong video script is the difference between content that gets
            watched and content that gets skipped. This guide covers everything
            you need: structure, hooks, CTAs, platform differences, and how to
            write scripts for clients without starting from scratch every time.
          </p>

          {/* Soft CTA — top */}
          <div
            className="rounded-2xl border p-6 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-subtle)",
            }}
          >
            <div>
              <p
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Want to skip the blank page?
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Scribtly generates platform-native video scripts in under 60
                seconds.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap hover:opacity-90 transition-all shrink-0"
              style={{ background: "var(--accent)" }}
            >
              Start free <ArrowRight size={14} />
            </Link>
          </div>

          {/* Table of contents */}
          <div
            className="rounded-2xl border p-6 mb-14"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-subtle)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              In this guide
            </p>
            <ol className="flex flex-col gap-2 text-sm">
              {[
                ["#what-is-a-video-script", "What is a video script?"],
                ["#why-scripts-matter", "Why video scripts matter"],
                ["#video-script-structure", "Video script structure"],
                ["#how-to-write-a-hook", "How to write a hook"],
                ["#body-and-cta", "Body, pacing, and CTA"],
                ["#platform-differences", "Scripts for different platforms"],
                ["#client-scripts", "Writing scripts for clients"],
                ["#common-mistakes", "Common mistakes to avoid"],
                ["#faq", "Frequently asked questions"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:underline"
                    style={{ color: "var(--accent)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Section 1 — What is a video script */}
          <section id="what-is-a-video-script" className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What is a video script?
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              A video script is a written plan for what you or your client will
              say — and sometimes show — in a video. It maps out the words,
              pacing, tone, and structure before the camera starts rolling.
            </p>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              A script is not always a word-for-word transcript. For some
              creators it is a detailed outline with bullet points. For others it
              is a full verbatim script read from a teleprompter. Most scripts
              sit somewhere in between — a flexible guide rather than a rigid
              text.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              What matters is that you have something written before you
              record — not just a vague idea in your head.
            </p>
          </section>

          {/* Section 2 — Why scripts matter */}
          <section id="why-scripts-matter" className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Why video scripts matter
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Most viewers can tell when a creator is winging it. Filler words,
              an unclear point, a CTA that appears in the last five seconds
              because it was forgotten — these are signs of a video without a
              script.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyScriptsHelp.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border p-5"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                  }}
                >
                  <p
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 — Structure */}
          <section id="video-script-structure" className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Video script structure
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Most effective video scripts follow the same core structure,
              regardless of platform:
            </p>
            <div className="flex flex-col gap-4">
              {scriptSteps.map((step) => (
                <div
                  key={step.num}
                  className="flex gap-5 rounded-xl border p-6"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <span
                    className="text-3xl font-bold leading-none shrink-0 mt-0.5"
                    style={{ color: "rgba(224,120,48,0.25)" }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {step.title}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 — Hook */}
          <section id="how-to-write-a-hook" className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              How to write a hook
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              The hook is the most important part of any video script. If
              viewers do not keep watching past the first few seconds, nothing
              else matters.
            </p>
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              A strong hook does one of these things:
            </p>
            <ul className="flex flex-col gap-3 mb-7">
              {[
                "States a problem the viewer has right now",
                "Makes a surprising or counterintuitive claim",
                "Promises a clear outcome or result",
                "Asks a question that demands an answer",
                "Opens a loop the viewer needs to close",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <CheckCircle
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div
              className="rounded-xl border p-6 mb-5"
              style={{
                borderColor: "rgba(224,120,48,0.3)",
                background: "rgba(224,120,48,0.05)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                Hook examples
              </p>
              <div
                className="flex flex-col gap-3 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <p>
                  &ldquo;Most freelancers price their services wrong — and it is
                  costing them thousands per month.&rdquo;
                </p>
                <p>
                  &ldquo;Here is why your TikTok views dropped 80% last
                  week.&rdquo;
                </p>
                <p>
                  &ldquo;I scripted 30 client videos in one day using this
                  system.&rdquo;
                </p>
                <p>
                  &ldquo;If you are still writing scripts in Google Docs, watch
                  this first.&rdquo;
                </p>
              </div>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Write at least three hooks for every video. Pick the strongest
              one. The hook you write first is rarely the best.
            </p>
          </section>

          {/* Section 5 — Body and CTA */}
          <section id="body-and-cta" className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Body, pacing, and CTA
            </h2>

            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Writing the body
            </h3>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              The body delivers what the hook promised. Structure it with clear
              sections so each part flows naturally into the next.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "One idea per section. Do not cram multiple points into a single paragraph.",
                'Use transitions to bridge points naturally: "Now that you have the hook, let\'s talk about structure."',
                "Keep sentences short, especially for short-form video.",
                "Speak the script aloud as you write it. If it sounds unnatural, rewrite it.",
                "Add B-roll notes in brackets where relevant: [cut to screen recording].",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                    style={{ background: "var(--accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Writing the CTA
            </h3>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              The CTA should be one clear action. Do not end with: &ldquo;Like,
              subscribe, follow, share, comment, and check the link in
              bio.&rdquo; Pick one.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Match the CTA to the video&apos;s goal. Educational content might
              end with &ldquo;Subscribe for more.&rdquo; Commercial content
              might end with &ldquo;Book a free call.&rdquo; Organic content
              might end with &ldquo;Save this video.&rdquo;
            </p>
          </section>

          {/* Mid CTA */}
          <div
            className="rounded-2xl border p-8 mb-14 text-center"
            style={{ borderColor: "var(--border)", background: "var(--dark)" }}
          >
            <p className="text-xl font-bold text-white mb-3">
              Stop writing from a blank page
            </p>
            <p
              className="text-sm mb-6 max-w-sm mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Scribtly generates YouTube, TikTok, Reels, LinkedIn, and podcast
              scripts in your client&apos;s voice. Save a brand profile once.
              Generate scripts in under 60 seconds.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-all"
              style={{ background: "var(--accent)" }}
            >
              Generate your first script free <ArrowRight size={15} />
            </Link>
            <p
              className="text-xs mt-4"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              No credit card required. 5 free scripts included.
            </p>
          </div>

          {/* Section 6 — Platform differences */}
          <section id="platform-differences" className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Scripts for different platforms
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              The same script does not work across every platform. Structure,
              length, and pacing all vary significantly:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--bg-subtle)" }}>
                    {[
                      "Platform",
                      "Approx. length",
                      "Tone",
                      "Hook timing",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 font-semibold text-sm"
                        style={{
                          borderBottom: "1px solid var(--border)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className="px-4 py-3 text-sm"
                          style={{
                            borderBottom: "1px solid var(--border)",
                            color: "var(--text-muted)",
                          }}
                        >
                          {i === 0 ? (
                            <strong style={{ color: "var(--text-primary)" }}>
                              {cell}
                            </strong>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              See our platform-specific guides:{" "}
              <Link
                href="/youtube-script-generator"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                YouTube Script Generator
              </Link>
              ,{" "}
              <Link
                href="/tiktok-script-generator"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                TikTok Script Generator
              </Link>
              ,{" "}
              <Link
                href="/instagram-reels-script-generator"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Instagram Reels Script Generator
              </Link>
              .
            </p>
          </section>

          {/* Section 7 — Client scripts */}
          <section id="client-scripts" className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Writing video scripts for clients
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Writing scripts for your own channel is one thing. Writing them
              for paying clients adds a layer of complexity: you need to sound
              like them, not like yourself.
            </p>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              The biggest mistake freelance script writers make is starting from
              scratch every time. Every script for Client A begins with:
              re-read old scripts, re-check the brand guide, re-explain tone to
              the AI tool, then start writing. That is a slow and expensive way
              to work.
            </p>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              A better system looks like this:
            </p>
            <ol className="flex flex-col gap-4 mb-6">
              {clientSteps.map((item) => (
                <li
                  key={item.step}
                  className="flex gap-4 rounded-xl border p-5"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "var(--accent)" }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly is built for this workflow. Save a{" "}
              <Link
                href="/blog/what-is-a-client-voice-profile"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                client voice profile
              </Link>{" "}
              once and generate scripts without re-explaining the brief. See how
              it works for{" "}
              <Link
                href="/for-freelancers"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                freelancers
              </Link>{" "}
              and{" "}
              <Link
                href="/for-agencies"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                content agencies
              </Link>
              .
            </p>
          </section>

          {/* Section 8 — Common mistakes */}
          <section id="common-mistakes" className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Common video script mistakes to avoid
            </h2>
            <div className="flex flex-col gap-4">
              {commonMistakes.map((item) => (
                <div
                  key={item.mistake}
                  className="rounded-xl border p-5"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                  }}
                >
                  <p
                    className="font-semibold text-sm mb-1"
                    style={{ color: "#C0392B" }}
                  >
                    ✗ {item.mistake}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    <strong style={{ color: "var(--text-primary)" }}>
                      Fix:{" "}
                    </strong>
                    {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-14">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border p-6"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <p
                    className="font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq.q}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-subtle)",
            }}
          >
            <Users
              size={32}
              className="mx-auto mb-4"
              style={{ color: "var(--accent)" }}
            />
            <p
              className="text-2xl font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Ready to write your next script in under 60 seconds?
            </p>
            <p
              className="text-sm leading-relaxed mb-6 max-w-md mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              Scribtly generates platform-native scripts in your client&apos;s
              voice. Save a brand profile once. Never start from a blank page
              again. Works for{" "}
              <Link
                href="/youtube-script-generator"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                YouTube
              </Link>
              ,{" "}
              <Link
                href="/tiktok-script-generator"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                TikTok
              </Link>
              ,{" "}
              <Link
                href="/instagram-reels-script-generator"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Reels
              </Link>
              ,{" "}
              <Link
                href="/linkedin-video-script-generator"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                LinkedIn
              </Link>
              , and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-all"
                style={{ background: "var(--accent)" }}
              >
                Try Scribtly free <ArrowRight size={14} />
              </Link>
              <Link
                href="/"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                See how it works
              </Link>
            </div>
            <p
              className="text-xs mt-4"
              style={{ color: "var(--text-muted)" }}
            >
              No credit card required. 5 free scripts on signup.
            </p>
          </div>
        </article>

        {/* Footer */}
        <footer
          className="px-6 py-8 border-t"
          style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
        >
          <div
            className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
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
            <div className="flex gap-6">
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <Link href="/pricing" className="hover:underline">
                Pricing
              </Link>
              <Link href="/login" className="hover:underline">
                Sign in
              </Link>
            </div>
            <span>© 2026 Scribtly. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}

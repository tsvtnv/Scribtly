import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write a Video Script | Scribtly",
  description:
    "Learn how to write a video script that keeps viewers watching. Covers hooks, body structure, CTAs, platform differences, and writing in a client's voice.",
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-a-video-script",
  },
  openGraph: {
    title: "How to Write a Video Script | Scribtly",
    description:
      "Learn how to write a video script that keeps viewers watching. Covers hooks, body structure, CTAs, platform differences, and writing in a client's voice.",
    type: "article",
    url: "https://scribtly.com/blog/how-to-write-a-video-script",
    siteName: "Scribtly",
    publishedTime: "2026-06-29T09:00:00.000Z",
    authors: ["Scribtly"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a Video Script | Scribtly",
    description:
      "Learn how to write a video script that keeps viewers watching. Covers hooks, body structure, CTAs, and platform differences.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://scribtly.com/blog/how-to-write-a-video-script#article",
      headline: "How to Write a Video Script: A Practical Guide",
      description:
        "A complete guide to writing video scripts for YouTube, TikTok, Instagram Reels, and LinkedIn — including hooks, body structure, CTAs, and how to write in a client's voice.",
      url: "https://scribtly.com/blog/how-to-write-a-video-script",
      datePublished: "2026-06-29T09:00:00.000Z",
      dateModified: "2026-06-29T09:00:00.000Z",
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
      inLanguage: "en-GB",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://scribtly.com/blog/how-to-write-a-video-script",
      },
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
          name: "How to Write a Video Script",
          item: "https://scribtly.com/blog/how-to-write-a-video-script",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need a script for every video?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not necessarily. Short, casual social content often works without one. But for anything that needs to stay on message — product explanations, client deliverables, tutorials, or ad scripts — a script will save you time and produce better results.",
          },
        },
        {
          "@type": "Question",
          name: "How long should a video script be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That depends on the video length. A 60-second TikTok or Reel needs roughly 120–150 words. A 10-minute YouTube video needs 1,200–1,500 words. A 30-second video ad needs 60–90 words.",
          },
        },
        {
          "@type": "Question",
          name: "How do I write a script that doesn't sound scripted?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Write the way you speak, not the way you write. Use short sentences, contractions, and natural pauses. Then read it out loud several times before recording. The goal is for the delivery to feel like a conversation, not a recitation.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use AI to help write video scripts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AI is useful for generating first drafts, especially with proper context about the client's tone, audience, and platform. Tools built specifically for script writing — like Scribtly — let you save client voice profiles once and generate more accurate first drafts each time.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a YouTube script and a TikTok script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "YouTube scripts are longer and more structured, with a proper intro, chapter-style body sections, and an outro. TikTok scripts are built almost entirely around the hook — you have 1–3 seconds to earn the viewer's attention before the body, which is short and punchy.",
          },
        },
        {
          "@type": "Question",
          name: "How do I write video scripts in a client's voice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gather reference material from past videos and posts. Identify the client's natural vocabulary, sentence rhythm, and phrases they always use or avoid. Write to match their delivery style, not yours. Tools like Scribtly let you save a client voice profile so you don't have to rebuild this context each time you start a new script.",
          },
        },
      ],
    },
  ],
};

const tocItems = [
  { id: "what-is-a-video-script", label: "What is a video script?" },
  { id: "why-scripting-matters", label: "Why scripting matters" },
  { id: "anatomy", label: "The anatomy of a video script" },
  { id: "how-to-write-a-hook", label: "How to write a hook" },
  { id: "platform-differences", label: "Platform-specific differences" },
  { id: "clients-voice", label: "Writing in a client's voice" },
  { id: "mistakes", label: "Common mistakes to avoid" },
  { id: "scribtly", label: "Where Scribtly fits" },
  { id: "faq", label: "FAQ" },
];

export default function HowToWriteAVideoScriptPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
            {[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Pricing", href: "/pricing" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
          <ChevronRight size={12} />
          <span>How to Write a Video Script</span>
        </div>
      </div>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          Script Writing Guide
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          How to Write a Video Script
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)", maxWidth: "600px" }}>
          A practical guide covering script structure, hooks, platform differences, and how to write
          in a client&apos;s voice — without starting from a blank page every time.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>Published 29 June 2026</span>
          <span>·</span>
          <span>12 min read</span>
          <span>·</span>
          <Link href="/blog" className="hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
            All guides →
          </Link>
        </div>
      </header>

      {/* Soft CTA */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <div
          className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.06)" }}
        >
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Stop writing scripts from a blank page
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native scripts in your client&apos;s voice in under 60 seconds.
            </p>
          </div>
          <Link
            href="/signup"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="flex gap-12">

          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                In this guide
              </p>
              <nav className="flex flex-col gap-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm leading-snug hover:opacity-70 transition-opacity"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article body */}
          <article className="flex-1 min-w-0">

            {/* Section 1 */}
            <section id="what-is-a-video-script" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                What is a video script?
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                A video script is a written guide for what you will say and show in a video. It can be a
                word-for-word transcript, a detailed bullet-point outline, or something in between —
                depending on your delivery style and the platform you are creating for.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Scripts are not just for professional filmmakers. Freelance content creators, coaches,
                small business owners, and social media managers all use scripts to produce consistent,
                on-brand content without winging it every time. If you write scripts for clients, a
                proper structure is what separates fast, repeatable delivery from a slow, stressful process.
              </p>
            </section>

            {/* Section 2 */}
            <section id="why-scripting-matters" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Why scripting your videos matters
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  {
                    title: "It saves you time in the edit",
                    body: "When you know what you are going to say before you hit record, you get cleaner takes and fewer jump cuts to fix later.",
                  },
                  {
                    title: "It keeps your messaging clear",
                    body: "Rambling kills retention. A script forces you to decide what your core point is before you open your mouth.",
                  },
                  {
                    title: "It makes client content more consistent",
                    body: "If you are writing scripts for clients, a proper structure ensures their brand voice, key messages, and CTA all land in the right order every time.",
                  },
                  {
                    title: "It is the foundation of content repurposing",
                    body: "A good script can become a caption, a tweet thread, a blog post, or a newsletter. Writing it first unlocks everything else.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3"
                  >
                    <CheckCircle
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--accent)" }}
                    />
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section id="anatomy" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                The anatomy of a video script
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                Every effective video script has the same core structure, regardless of platform or length.
                The names and timing vary, but the underlying logic is consistent.
              </p>

              {[
                {
                  num: "01",
                  title: "Hook (first 2–5 seconds)",
                  body: "The hook exists to stop someone from scrolling. It is not your intro, your name, or a welcome message. It needs to make a bold claim, ask a question the viewer is already asking themselves, or show something they want. Get to the point before anything else.",
                },
                {
                  num: "02",
                  title: "Intro (5–45 seconds, depending on platform)",
                  body: "After the hook, give the viewer a reason to keep watching. Tell them clearly what they will get from this video. Keep it short and specific. On short-form platforms, the intro and hook often merge into one.",
                },
                {
                  num: "03",
                  title: "Body (the bulk of the content)",
                  body: "This is where you deliver on the hook's promise. For long-form content, structure the body as a series of clear, logical points with transitions. For short-form, strip it down to one or two punchy ideas — every sentence needs to earn its place.",
                },
                {
                  num: "04",
                  title: "CTA (call to action)",
                  body: "Every video needs a CTA. Even if it is just to follow for more. The best CTAs are specific to the value the viewer just received, not a generic \"like and subscribe\" tacked on at the end.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border p-6 mb-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <div
                    className="text-3xl font-bold mb-3 leading-none"
                    style={{ color: "rgba(224,120,48,0.20)" }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </section>

            {/* Section 4 */}
            <section id="how-to-write-a-hook" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                How to write a hook that stops the scroll
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                The hook is the hardest part of the script to write and the most important. Here are four
                reliable hook structures you can apply to almost any video topic.
              </p>

              {[
                {
                  type: "Problem-Promise Hook",
                  description: "State the problem your viewer has, then promise a solution.",
                  example: "\"Most creators film five takes before they feel confident. This script structure gets you to one.\"",
                },
                {
                  type: "Curiosity Hook",
                  description: "Say something surprising or counterintuitive that makes the viewer need to know more.",
                  example: "\"The worst video scripts are the ones that sound perfectly rehearsed.\"",
                },
                {
                  type: "Direct Result Hook",
                  description: "Lead with the outcome and let the viewer infer the path.",
                  example: "\"I write 10 scripts a week for clients. This is the exact workflow I use.\"",
                },
                {
                  type: "Question Hook",
                  description: "Use a question the viewer is already asking themselves.",
                  example: "\"Not sure how to start your video scripts? You are not alone.\"",
                },
              ].map((hook) => (
                <div
                  key={hook.type}
                  className="rounded-xl border p-5 mb-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                    {hook.type}
                  </p>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    {hook.description}
                  </p>
                  <div
                    className="rounded-lg px-4 py-3 text-sm italic"
                    style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}
                  >
                    {hook.example}
                  </div>
                </div>
              ))}

              <p className="text-sm leading-relaxed mt-4" style={{ color: "var(--text-muted)" }}>
                The hook is also where{" "}
                <Link href="/ai-script-writer" className="underline hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
                  AI script writing tools
                </Link>{" "}
                can save time — generating three or four hook options quickly so you can pick the strongest
                one rather than staring at a blank first line.
              </p>
            </section>

            {/* Section 5 */}
            <section id="platform-differences" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Platform-specific script differences
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                Scripts are not one-size-fits-all. The structure that works on YouTube does not always
                work on TikTok, and LinkedIn video has its own conventions. Knowing the difference is
                essential if you are producing scripts for multiple platforms or clients.
              </p>

              {[
                {
                  platform: "YouTube Scripts",
                  link: "/youtube-script-generator",
                  points: [
                    "Hook (3–5 seconds)",
                    "Longer intro that recaps the promise (15–30 seconds)",
                    "Chapter-style body sections with clear transitions",
                    "Outro with CTA and subscribe prompt",
                    "More formal, detailed — keywords in spoken script affect search performance",
                  ],
                  note: "YouTube viewers expect structured content with a clear beginning, middle, and end. Give them a reason to stay before you dive in.",
                },
                {
                  platform: "TikTok and Reels Scripts",
                  link: "/tiktok-script-generator",
                  points: [
                    "Hook (1–3 seconds — audio, visual, or both)",
                    "One clear point, delivered fast",
                    "CTA (5 seconds)",
                  ],
                  note: "Short-form scripts are built almost entirely around the hook. Avoid long intros. Cut everything that does not add value.",
                },
                {
                  platform: "LinkedIn Video Scripts",
                  link: "/linkedin-video-script-generator",
                  points: [
                    "Open with a specific observation or insight, not a question",
                    "Conversational, authentic — avoid anything that feels like an ad",
                    "First-person perspective performs well",
                    "Keep it under 90 seconds for most topics",
                  ],
                  note: "LinkedIn rewards personal, direct content. Lead with a professional observation rather than a hook designed for entertainment.",
                },
                {
                  platform: "Podcast Scripts",
                  link: "/podcast-script-generator",
                  points: [
                    "Intro music / welcome",
                    "Episode setup (what this episode covers)",
                    "Main sections with talking points",
                    "Transitions",
                    "Outro and CTA",
                  ],
                  note: "Podcast scripts are usually looser — more of a detailed outline than a word-for-word transcript. Scripted intros and outros are common; the body is often ad-libbed from notes.",
                },
              ].map((item) => (
                <div
                  key={item.platform}
                  className="rounded-2xl border p-6 mb-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                    <Link href={item.link} className="hover:opacity-70 transition-opacity" style={{ color: "var(--text-primary)" }}>
                      {item.platform}
                    </Link>
                  </h3>
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.8 }}>
                    {item.note}
                  </p>
                </div>
              ))}
            </section>

            {/* Mid CTA */}
            <div
              className="rounded-2xl p-8 mb-12 text-center"
              style={{ background: "var(--dark)" }}
            >
              <h3 className="text-xl font-bold text-white mb-3">
                Generate your next client script in under 60 seconds
              </h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Scribtly is built for freelancers, content managers, and agencies who produce scripts
                for multiple clients. Save a client voice profile once. Generate platform-native scripts
                in their tone every time.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Start free — no card required <ArrowRight size={14} />
              </Link>
            </div>

            {/* Section 6 */}
            <section id="clients-voice" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                How to write scripts in a client&apos;s voice
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                If you are a{" "}
                <Link href="/for-freelancers" className="underline hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
                  freelance script writer
                </Link>{" "}
                or content manager, writing in someone else&apos;s voice is a specific skill — and one of the
                most time-consuming parts of the job if you do not have a system for it.
              </p>

              {[
                {
                  step: "Step 1",
                  title: "Gather reference material",
                  body: "Collect examples of how the client actually speaks: past videos, social posts, how they write in DMs, previous scripts they were happy with. Pay attention to sentence length, vocabulary, energy level, and how direct or indirect they tend to be.",
                },
                {
                  step: "Step 2",
                  title: "Identify brand phrases and avoid-words",
                  body: "Most clients have words or phrases they always use and things they never say. Document both. These are the signals that make a script sound like them rather than a generic AI output.",
                },
                {
                  step: "Step 3",
                  title: "Match their natural rhythm",
                  body: "Some people speak in short punchy sentences. Others use longer, flowing ones. Write to match their natural pace. Mismatched rhythm is the most common reason a client reads a script and says it does not sound like them.",
                },
                {
                  step: "Step 4",
                  title: "Test and adjust",
                  body: "The first script you write for a new client will need revisions. That is normal. The goal is to build up a solid reference set so that scripts get faster with each iteration — and revisions become rare.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 mb-5"
                >
                  <div
                    className="shrink-0 w-16 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(224,120,48,0.12)", color: "var(--accent)" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}

              <div
                className="rounded-xl border-l-4 p-5 mt-6"
                style={{ borderLeftColor: "var(--accent)", background: "var(--bg-subtle)" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  This is exactly the problem{" "}
                  <Link href="/" className="font-semibold hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
                    Scribtly
                  </Link>{" "}
                  was built to solve. Instead of re-explaining a client&apos;s tone and style every time you
                  start a new script, you save it once as a client voice profile and generate scripts that
                  already sound like them from the first draft. No more pasting old examples into ChatGPT
                  every Monday morning.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="mistakes" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Common video script mistakes to avoid
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    mistake: "Starting with \"Hey guys\"",
                    fix: "Opening with a generic greeting wastes your first three seconds. Get to the hook first — introduce yourself after if it is relevant to the content.",
                  },
                  {
                    mistake: "Writing how you think, not how you speak",
                    fix: "Scripts written in long, complex sentences are hard to deliver naturally. Write the way you actually talk. Short sentences. Contractions. Natural pauses.",
                  },
                  {
                    mistake: "Making the hook about you, not the viewer",
                    fix: "\"I have been making videos for 10 years\" is not a hook. \"Here is how to fix the most common video script mistake\" is. The hook should speak to the viewer's problem, not your credentials.",
                  },
                  {
                    mistake: "Covering too many points",
                    fix: "One video, one core idea. If your script covers five different topics, it needs to be five videos — or one video that clearly positions itself as a comprehensive guide.",
                  },
                  {
                    mistake: "Forgetting the CTA",
                    fix: "Every video should ask for something. Even something small. A follow, a comment, a link click. Do not end without a clear next step for the viewer.",
                  },
                  {
                    mistake: "Treating the script as final",
                    fix: "Scripts should be a guide, not a prison. Read it enough times that you can deliver it naturally, then adapt in the moment. The best scripts sound unscripted.",
                  },
                ].map((item) => (
                  <div
                    key={item.mistake}
                    className="rounded-xl border p-5"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <p className="font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>
                      ✕ {item.mistake}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.fix}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8 */}
            <section id="scribtly" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Where Scribtly fits in your script writing workflow
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                Writing one script is fine. Writing scripts for five clients across three platforms every
                week is where the blank page becomes a real operational problem.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                <Link href="/" className="font-semibold hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
                  Scribtly
                </Link>{" "}
                is a script writing tool built for exactly this. You create a voice profile for each client
                once — their tone, their phrases, their audience, their platform — and then generate
                platform-native scripts that already sound like them from the first draft.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                Instead of spending the first 20 minutes of every script session re-reading old examples
                to get back into a client&apos;s voice, you open Scribtly, pick the client, pick the
                platform, and get a first draft in under 60 seconds. You still review, refine, and add
                your own touch. Scribtly eliminates the blank page — it does not replace the craft.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Save client voice profiles once and reuse them",
                  "Generate YouTube, TikTok, Reels, LinkedIn, and podcast scripts",
                  "Produce scripts with hooks, body sections, CTAs, and B-roll notes",
                  "Keep scripts organised by client and platform",
                  "Go from idea to first draft in under 60 seconds",
                  "Stop re-explaining client tone to ChatGPT every time",
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-2.5 rounded-xl border p-4"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                    <span className="text-sm leading-snug" style={{ color: "var(--text-primary)" }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/for-freelancers"
                  className="text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:opacity-70"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  Scribtly for freelancers →
                </Link>
                <Link
                  href="/for-agencies"
                  className="text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:opacity-70"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  Scribtly for agencies →
                </Link>
                <Link
                  href="/compare/scribtly-vs-chatgpt"
                  className="text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:opacity-70"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  Scribtly vs ChatGPT →
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Frequently asked questions
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    q: "Do I need a script for every video?",
                    a: "Not necessarily. Short, casual social content often works without one. But for anything that needs to stay on message — product explanations, client deliverables, tutorials, or ad scripts — a script will save you time and produce better results.",
                  },
                  {
                    q: "How long should a video script be?",
                    a: "That depends on the video length. A 60-second TikTok or Reel needs roughly 120–150 words. A 10-minute YouTube video needs 1,200–1,500 words. A 30-second video ad needs 60–90 words.",
                  },
                  {
                    q: "How do I write a script that doesn't sound scripted?",
                    a: "Write the way you speak, not the way you write. Use short sentences, contractions, and natural pauses. Read it out loud several times before recording. The goal is for the delivery to feel like a conversation, not a recitation.",
                  },
                  {
                    q: "Can I use AI to help write video scripts?",
                    a: "Yes. AI is useful for generating first drafts, especially with proper context about the client's tone, audience, and platform. The risk with generic AI tools is that you spend as much time adjusting a generic output as you would writing from scratch. Tools built specifically for script writing — like Scribtly — let you save client context once and generate more accurate first drafts.",
                  },
                  {
                    q: "What is the difference between a YouTube script and a TikTok script?",
                    a: "YouTube scripts are longer and more structured, with a proper intro, chapter-style body sections, and an outro. TikTok scripts are built almost entirely around the hook — you have 1–3 seconds to earn the viewer's attention before the body, which should be short and punchy.",
                  },
                  {
                    q: "How do I get faster at writing video scripts?",
                    a: "Build templates for the formats you use most. Document client voices so you are not starting from scratch each time. Use tools that help you generate and manage scripts by client and platform. Over time, the structure becomes instinctive and the first draft gets faster.",
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <p className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                      {item.q}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section
              className="rounded-2xl p-8 text-center"
              style={{ background: "var(--dark)" }}
            >
              <h2 className="text-2xl font-bold text-white mb-3">
                Write better scripts, faster
              </h2>
              <p className="text-sm mb-6 leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                Scribtly gives you the structure and the workflow. Save your client&apos;s voice once.
                Generate platform-native scripts every time. Start free — no card required.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Try Scribtly free <ArrowRight size={14} />
              </Link>
              <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                5 free scripts. No commitment.
              </p>
            </section>

          </article>
        </div>
      </div>

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
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
            <Link href="/pricing" className="hover:opacity-70 transition-opacity">Pricing</Link>
            <Link href="/for-freelancers" className="hover:opacity-70 transition-opacity">For freelancers</Link>
            <Link href="/for-agencies" className="hover:opacity-70 transition-opacity">For agencies</Link>
            <Link href="/youtube-script-generator" className="hover:opacity-70 transition-opacity">YouTube scripts</Link>
            <Link href="/tiktok-script-generator" className="hover:opacity-70 transition-opacity">TikTok scripts</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

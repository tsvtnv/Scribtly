import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is a Video Hook? (And How to Write One)",
  description:
    "A video hook is the opening seconds of a video that grabs attention and stops the scroll. Learn what makes a great hook and how to write one fast.",
  openGraph: {
    title: "What Is a Video Hook? (And How to Write One)",
    description:
      "A video hook is the opening seconds of a video that grabs attention and stops the scroll. Learn what makes a great hook and how to write one fast.",
    type: "article",
    url: "https://scribtly.com/blog/what-is-a-video-hook",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is a Video Hook? (And How to Write One)",
    description:
      "A video hook is the opening seconds of a video that grabs attention and stops the scroll. Learn what makes a great hook and how to write one fast.",
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
        "A video hook is the opening seconds of a video that grabs attention and stops the scroll. Learn what makes a great hook and how to write one fast.",
      url: "https://scribtly.com/blog/what-is-a-video-hook",
      datePublished: "2026-07-13",
      dateModified: "2026-07-13",
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
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a video hook?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A video hook is the opening line, question, or statement in a video that grabs the viewer's attention and gives them a reason to keep watching. It usually appears in the first 1–3 seconds of a short-form video or within the first 15–30 seconds of a longer video.",
          },
        },
        {
          "@type": "Question",
          name: "How long should a video hook be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For TikTok and Instagram Reels, your hook should land within the first 1–3 seconds. For YouTube Shorts, within 3 seconds. For longer YouTube videos, you have up to 30 seconds, though a strong first sentence still matters. The shorter the platform attention span, the faster your hook needs to land.",
          },
        },
        {
          "@type": "Question",
          name: "What are the different types of video hooks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Common hook types include: the bold statement hook, the question hook, the story hook, the curiosity gap hook, the controversy hook, the relatable problem hook, and the loop hook (where you tease the ending before it happens).",
          },
        },
        {
          "@type": "Question",
          name: "Why do video hooks matter for short-form content?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Platforms like TikTok, Instagram, and YouTube measure how long people watch your video. If viewers drop off in the first second or two, the algorithm stops pushing your content. A strong hook keeps people watching, which signals to the algorithm that the video is worth showing to more people.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use AI to write video hooks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tools like Scribtly can generate platform-specific hooks in your client's or brand's voice. The key is to always check that the generated hook matches the tone and audience — and to test multiple variations to see which performs best.",
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
    name: "The Bold Statement Hook",
    example: '"Most people write video scripts completely wrong."',
    why: "Challenges an assumption the viewer holds, creating instant curiosity.",
  },
  {
    name: "The Question Hook",
    example: '"Why do some creators go viral on their first video?"',
    why: "The brain instinctively wants to answer questions. This keeps people watching.",
  },
  {
    name: "The Relatable Problem Hook",
    example:
      '"If you have ever stared at a blank script and had no idea where to start — this is for you."',
    why: "Immediately identifies the viewer and makes them feel seen.",
  },
  {
    name: "The Curiosity Gap Hook",
    example: '"There is one thing successful TikTok creators do differently — and it is not what you think."',
    why: "Creates an information gap the viewer has to fill by watching.",
  },
  {
    name: "The Story Hook",
    example: '"Three months ago I had zero clients. Here is exactly what changed."',
    why: "Stories trigger emotional investment from the first sentence.",
  },
  {
    name: "The Loop Hook",
    example: '"By the end of this video you will have a script you can record today."',
    why: "Sets up a promise. Viewers stay to collect the payoff.",
  },
];

const mistakes = [
  {
    mistake: "Starting with an introduction",
    fix: 'Cut "Hi, welcome back to my channel" entirely. Start with the hook.',
  },
  {
    mistake: "Being vague",
    fix: '"Some tips for video scripts" is weak. "The three-line script structure that gets 40% more watch time" is specific.',
  },
  {
    mistake: "Burying the hook",
    fix: "The hook must be your opening line, not the third sentence.",
  },
  {
    mistake: "Using the same hook type every time",
    fix: "Rotate between question hooks, bold statement hooks, and story hooks to avoid viewer fatigue.",
  },
  {
    mistake: "Making the hook irrelevant to the video",
    fix: "If your hook promises something, the video must deliver it. Misleading hooks kill retention.",
  },
];

export default function WhatIsAVideoHookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
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
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="text-base font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Scribtly
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="text-sm hidden sm:block"
                style={{ color: "var(--text-muted)" }}
              >
                Blog
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Try free
              </Link>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div
          className="border-b"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span>/</span>
            <span>What Is a Video Hook?</span>
          </div>
        </div>

        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-14 pb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
            style={{
              background: "rgba(224,120,48,0.08)",
              borderColor: "rgba(224,120,48,0.25)",
              color: "var(--accent)",
            }}
          >
            Glossary
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            What Is a Video Hook?
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            A video hook is the opening line, question, or statement that grabs the viewer&apos;s
            attention and gives them a reason to keep watching. It usually lands in the first{" "}
            <strong style={{ color: "var(--text-primary)" }}>1 to 3 seconds</strong> of a short-form
            video, or within the first 30 seconds of a longer YouTube video.
          </p>

          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            If your video does not have a strong hook, most viewers scroll past before they have
            heard a single word. This guide explains what a hook is, why it matters, the main types,
            and how to write one that actually works.
          </p>

          {/* Soft CTA */}
          <div
            className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                Write your next hook in under 60 seconds
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Scribtly generates platform-native hooks in your client&apos;s voice. No blank page.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white shrink-0 transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free <ArrowRight size={14} />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-6 pb-20">

          {/* Section 1: What is a video hook */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              What a video hook actually is
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Think of a hook as the equivalent of a newspaper headline. The headline&apos;s job is not
              to summarise the whole story — it is to make you want to read it. A video hook does
              the same thing. It does not need to explain everything. It needs to make the viewer
              think: <em style={{ color: "var(--text-primary)" }}>"I need to know where this is going."</em>
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Hooks can be delivered as spoken words, on-screen text, a visual action, or a
              combination of all three. On TikTok and Reels, creators often open with a bold
              statement on screen while speaking the same line aloud — doubling the impact.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The hook is part of the wider video script structure: hook → intro → body → CTA. But
              it is the part most creators get wrong first, and the part that has the biggest impact
              on watch time.
            </p>
          </section>

          {/* Section 2: Why hooks matter */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Why a strong hook matters for short-form video
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Every platform — TikTok, Instagram, YouTube — measures how long viewers watch your
              video. This metric is called{" "}
              <strong style={{ color: "var(--text-primary)" }}>audience retention</strong>. If viewers
              drop off in the first second, the algorithm interprets that as a signal that the content
              is not interesting, and it stops distributing your video.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              A hook that keeps viewers watching through the first few seconds increases your average
              watch percentage — and that tells the algorithm to push your content to more people.
            </p>
            <div
              className="rounded-xl border p-5 my-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Platform hook windows at a glance
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <span><strong style={{ color: "var(--text-primary)" }}>TikTok:</strong> Hook must land within 1–3 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <span><strong style={{ color: "var(--text-primary)" }}>Instagram Reels:</strong> Hook within 1–3 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <span><strong style={{ color: "var(--text-primary)" }}>YouTube Shorts:</strong> Hook within 3 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <span><strong style={{ color: "var(--text-primary)" }}>YouTube long-form:</strong> Strong opening within 30 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <span><strong style={{ color: "var(--text-primary)" }}>LinkedIn video:</strong> Hook within 3–5 seconds</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Hook types */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              The 6 most effective types of video hook
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              There is no single best hook. Different hook types work better depending on the
              platform, niche, and audience. Here are the six most reliable formats.
            </p>

            <div className="space-y-5">
              {hookTypes.map((h) => (
                <div
                  key={h.name}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {h.name}
                  </h3>
                  <p
                    className="text-sm italic mb-3 leading-relaxed"
                    style={{ color: "var(--accent)" }}
                  >
                    {h.example}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {h.why}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: How to write a hook */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              How to write a video hook in three steps
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              You do not need to brainstorm hooks from scratch. Use this simple framework to get a
              working hook quickly.
            </p>

            <div className="space-y-5">
              {[
                {
                  num: "01",
                  title: "Start with the payoff",
                  body: "What is the single most useful or surprising thing in your video? Write that down first. Your hook should tease it without giving it away.",
                },
                {
                  num: "02",
                  title: "Choose your hook type",
                  body: "Pick one of the six hook types above. Match it to your topic — a bold statement works well for opinions, a question hook works well for educational content, a story hook works well for personal experience.",
                },
                {
                  num: "03",
                  title: "Write three versions and cut two",
                  body: "Write three hook options, each under 20 words. Read them aloud. The one that sounds most natural and direct — that is your hook. Delete the others.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex gap-5 rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
                >
                  <div
                    className="text-3xl font-bold leading-none shrink-0"
                    style={{ color: "rgba(224,120,48,0.20)" }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-base mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
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

          {/* Section 5: Scribtly angle */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              How Scribtly helps you write hooks faster
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Writing hooks from scratch is one of the most time-consuming parts of script writing —
              especially when you are producing content for multiple clients with different voices and
              audiences.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native hooks based on the video topic and your saved client
              voice profile. You input the topic and the platform, and Scribtly gives you a hook
              that fits the content and sounds like the creator — not like generic AI output.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              This is useful when you are handling scripts for several clients at once. Instead of
              re-explaining each client&apos;s tone every time, you save their voice profile once and
              pull it into every script.
            </p>

            {/* Mid-page CTA */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: "var(--dark)" }}
            >
              <p className="text-white text-xl font-bold mb-3 leading-tight">
                Stop writing hooks from a blank page
              </p>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                Generate platform-native hooks in your client&apos;s voice. Save the profile once,
                use it on every script.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Try Scribtly free <ArrowRight size={14} />
              </Link>
              <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                No credit card required
              </p>
            </div>
          </section>

          {/* Section 6: Mistakes */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              5 common video hook mistakes (and how to fix them)
            </h2>

            <div className="space-y-4">
              {mistakes.map((m) => (
                <div
                  key={m.mistake}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    ✗ {m.mistake}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    <strong style={{ color: "var(--accent)" }}>Fix:</strong> {m.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently asked questions
            </h2>

            <div className="space-y-5">
              {[
                {
                  q: "What is a video hook?",
                  a: "A video hook is the opening line, question, or statement in a video that grabs the viewer's attention and gives them a reason to keep watching. It usually appears in the first 1–3 seconds of a short-form video or within the first 15–30 seconds of a longer video.",
                },
                {
                  q: "How long should a video hook be?",
                  a: "For TikTok and Instagram Reels, your hook should land within the first 1–3 seconds. For YouTube Shorts, within 3 seconds. For longer YouTube videos, you have up to 30 seconds, though a strong first sentence still matters. The shorter the platform's attention span, the faster your hook needs to land.",
                },
                {
                  q: "What are the different types of video hooks?",
                  a: "Common hook types include: the bold statement hook, the question hook, the story hook, the curiosity gap hook, the controversy hook, the relatable problem hook, and the loop hook — where you tease the ending before it happens.",
                },
                {
                  q: "Why do video hooks matter for short-form content?",
                  a: "Platforms like TikTok, Instagram, and YouTube measure how long people watch your video. If viewers drop off in the first second or two, the algorithm stops pushing your content. A strong hook keeps people watching, which signals to the algorithm that the video is worth showing to more people.",
                },
                {
                  q: "Can I use AI to write video hooks?",
                  a: "Yes. Tools like Scribtly can generate platform-specific hooks in your client's or brand's voice. The key is to always check that the generated hook matches the tone and audience — and to test multiple variations to see which performs best.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3
                    className="font-semibold text-base mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related reading */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Related reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Scribtly homepage", href: "/" },
                { label: "Sign up free", href: "/signup" },
                { label: "How Scribtly works", href: "/#how-it-works" },
                { label: "See all features", href: "/#features" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl border px-5 py-4 text-sm font-medium transition-all hover:opacity-80"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)" }}
                >
                  {link.label}
                  <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section>
            <div
              className="rounded-2xl border p-8 text-center"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Generate your first hook in under 60 seconds
              </h2>
              <p className="text-base mb-6 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
                Scribtly creates platform-native video scripts — hook, intro, body, and CTA — in your
                client&apos;s voice. Save the profile once and use it on every script.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Start free — no card required
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer
          className="px-6 py-8 border-t mt-10"
          style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
        >
          <div
            className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Link href="/" className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
              Scribtly
            </Link>
            <span>© 2026 Scribtly. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="hover:underline">Blog</Link>
              <Link href="/signup" className="hover:underline">Sign up free</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

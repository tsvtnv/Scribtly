import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Is a Video Hook? The Complete Beginner's Guide",
  description:
    "A video hook is the opening line or moment that stops the scroll and earns the next few seconds of attention. Learn what makes a great hook and how to write one.",
  openGraph: {
    title: "What Is a Video Hook? The Complete Beginner's Guide",
    description:
      "A video hook is the opening line or moment that stops the scroll and earns the next few seconds of attention. Learn what makes a great hook and how to write one.",
    type: "article",
  },
};

const faqItems = [
  {
    q: "How long should a video hook be?",
    a: "For short-form video (TikTok, Reels, Shorts), aim for 1–3 seconds — one punchy line is usually enough. For YouTube long-form, your hook can extend to 15–30 seconds, especially if you're using a teaser or story-driven opening.",
  },
  {
    q: "What is the difference between a hook and an intro?",
    a: "A hook is the very first moment — the line or visual that grabs attention and earns the next second of viewing. An intro typically follows the hook: it sets context, introduces you or the topic, and tells viewers what they're about to learn. The hook must land first, or the intro never gets seen.",
  },
  {
    q: "Do YouTube videos need the same hooks as TikTok?",
    a: "Not exactly. TikTok and Reels hooks need to be extremely fast and direct because the competition for attention is brutal on the For You Page. YouTube allows a slightly slower hook, but the principle is the same: give people a reason to stay within the first 15 seconds or your retention drops.",
  },
  {
    q: "Can I use the same hook for every video?",
    a: "No. Audiences will tune out repeated patterns quickly. Vary your hook style — sometimes lead with a bold claim, sometimes with a question, sometimes with a surprising stat. Keeping your hooks fresh is part of maintaining strong retention.",
  },
  {
    q: "What is a pattern interrupt in a hook?",
    a: "A pattern interrupt is anything that breaks the viewer's autopilot scroll. It could be an unexpected sound, a visual cut, a direct challenge, or a question they didn't see coming. Pattern interrupts are effective hooks because they force the brain to pay attention.",
  },
  {
    q: "How does Scribtly help with hooks?",
    a: "Scribtly generates platform-native scripts that start with a hook matched to the platform and tone. You describe the topic and the client's style, and Scribtly outputs a hook, body, and CTA — so you're never starting from a blank page.",
  },
];

const hookTypes = [
  {
    type: "Bold claim",
    example: '"Most creators waste the first 3 seconds of every video."',
    why: "Creates tension. The viewer wants to know if they're guilty.",
  },
  {
    type: "Open question",
    example: '"Do you know why your videos get skipped in the first second?"',
    why: "Questions trigger the brain's gap-filling instinct.",
  },
  {
    type: "Surprising stat",
    example: '"You have 1.7 seconds to stop a scroll on TikTok."',
    why: "A specific number feels credible and creates urgency.",
  },
  {
    type: "Relatable problem",
    example: `"If you've ever stared at a blank script, this is for you."`,
    why: "Immediate identification. The viewer feels seen.",
  },
  {
    type: "Teaser / curiosity gap",
    example: '"By the end of this video, your next script will be half the work."',
    why: "Promises a payoff the viewer has to stay to get.",
  },
  {
    type: "Contrarian take",
    example: '"Your hook is not your biggest retention problem."',
    why: "Challenges assumptions and demands attention.",
  },
];

export default function WhatIsAVideoHookPage() {
  return (
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
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Blog
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              Try free
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>What Is a Video Hook?</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 border"
          style={{
            background: "rgba(224,120,48,0.08)",
            borderColor: "rgba(224,120,48,0.25)",
            color: "var(--accent)",
          }}
        >
          Glossary
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          What Is a Video Hook?
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          A video hook is the opening line, moment, or visual that earns the next few seconds of a viewer's
          attention. It is the single most important part of any script — because without a strong hook,
          the rest of the video never gets seen.
        </p>
      </header>

      {/* Soft CTA */}
      <div
        className="max-w-3xl mx-auto px-6 mb-12"
      >
        <div
          className="rounded-2xl border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            Need a hook for your next video? Scribtly generates platform-native hooks in under 60 seconds.
          </p>
          <Link
            href="/signup"
            className="shrink-0 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free
          </Link>
        </div>
      </div>

      {/* Main content */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        {/* What is a hook */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            What exactly is a video hook?
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            A video hook is what happens in the first 1–5 seconds of a video. Its only job is to stop the
            scroll and earn the next moment of attention. On platforms like TikTok and Instagram Reels,
            viewers decide in under two seconds whether to keep watching or swipe away. On YouTube,
            you typically have a little more time — but not much.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The word "hook" comes from music: a hook is the part of a song that gets stuck in your head.
            In video, it works the same way — except you're hooking someone's attention instead of their ears.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            A hook can be a single spoken line, a visual moment, a question, a bold claim, or even a sound.
            What matters is that it gives the viewer an immediate reason to stay.
          </p>
        </section>

        {/* Why it matters */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Why your hook is the most important part of any script
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Every platform — YouTube, TikTok, Instagram Reels, LinkedIn — measures audience retention.
            If viewers leave in the first 5 seconds, the algorithm interprets that as a poor-quality video
            and stops distributing it. A weak hook is the fastest way to kill a video's reach, even when
            the rest of the content is excellent.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            For freelancers and content creators delivering scripts to clients, the hook is also the part
            the client will notice first. A great hook in the draft signals that you understand the platform
            and the audience — not just the topic.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The bottom line: you can have a perfectly written body section and a strong call to action,
            but if the hook fails, the viewer never gets there.
          </p>
        </section>

        {/* Types of hooks */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            6 common types of video hook (with examples)
          </h2>
          <div className="flex flex-col gap-4">
            {hookTypes.map((item) => (
              <div
                key={item.type}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--accent)" }}>
                  {item.type}
                </p>
                <p
                  className="text-base font-medium mb-2 italic"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.example}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {item.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <div
          className="rounded-2xl border px-7 py-6 my-12 text-center"
          style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.05)" }}
        >
          <p
            className="text-xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Stop writing hooks from a blank page
          </p>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            Scribtly generates scripts with platform-native hooks built in — for YouTube, TikTok, Reels,
            LinkedIn video, and more. Save your client's voice once and create scripts faster.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Generate your next script free
          </Link>
        </div>

        {/* Platform differences */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Do hooks work differently on different platforms?
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Yes — and this is where many creators go wrong. A hook that works on YouTube does not
            automatically work on TikTok. Here is how the platform context changes what a hook needs to do:
          </p>

          <div className="flex flex-col gap-3 mb-6">
            {[
              {
                platform: "TikTok & Instagram Reels",
                detail:
                  "The scroll is fast and competitive. Hooks need to be direct, immediate, and either visually or verbally striking within the first 1–2 seconds. Long intros or slow build-ups don't work here.",
              },
              {
                platform: "YouTube (long-form)",
                detail:
                  "You can take 10–20 seconds on a hook, but the opening still needs to create a curiosity gap or clear promise of value. Viewers came to your channel intentionally, but they'll still leave if the first 15 seconds don't deliver.",
              },
              {
                platform: "YouTube Shorts",
                detail:
                  "Treated more like TikTok. Fast, punchy, and immediately engaging. State the premise in the first line.",
              },
              {
                platform: "LinkedIn video",
                detail:
                  "Hooks here tend to be slightly more professional or insight-driven. A bold professional claim or contrarian business take often performs well.",
              },
              {
                platform: "Video ads (UGC or direct-response)",
                detail:
                  "The hook needs to identify the viewer immediately ('Are you a freelancer who...?') or call out a pain point they recognise within 3 seconds.",
              },
            ].map((p) => (
              <div
                key={p.platform}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  {p.platform}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {p.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            For freelancers writing scripts for clients across multiple platforms, understanding these
            differences is what separates a competent script writer from a great one. Tools like{" "}
            <Link
              href="/signup"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              Scribtly
            </Link>{" "}
            are built to generate platform-specific scripts — so the hook is matched to where the video
            actually lives.
          </p>
        </section>

        {/* How to write a hook */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How to write a stronger hook in 4 steps
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                step: "1",
                title: "Identify the viewer's first reaction",
                body: "What will the viewer think the video is about in the first second? That first impression should be intentional, not accidental. Decide what reaction you want — curiosity, recognition, surprise — and write toward it.",
              },
              {
                step: "2",
                title: "State the core idea immediately",
                body: "Do not save the best line for later. The best line goes first. If you're going to say something useful, provocative, or interesting in the video, say a version of it in the hook.",
              },
              {
                step: "3",
                title: "Create a reason to stay",
                body: "The hook should leave a question open. Whether that's 'how?' or 'why?' or 'what happens next?' — there needs to be something pulling the viewer forward into the body of the video.",
              },
              {
                step: "4",
                title: "Test short versions first",
                body: "Write your hook, then cut it in half. Then cut it in half again. Often the strongest version is shorter than you expect. On TikTok especially, one punchy line beats a three-sentence setup every time.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
                  style={{ background: "rgba(224,120,48,0.12)", color: "var(--accent)" }}
                >
                  {s.step}
                </div>
                <div>
                  <p className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    {s.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Common hook mistakes to avoid
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              {
                mistake: "Starting with 'Hi, welcome back to my channel'",
                fix: "This tells the viewer nothing useful and burns their attention budget on pleasantries. Get to the value first.",
              },
              {
                mistake: "Burying the hook in a long intro",
                fix: "If your most interesting line is at second 30, move it to second 0.",
              },
              {
                mistake: "Hooks that are too vague",
                fix: "'In this video, I'll share some tips...' is not a hook. Be specific about what the viewer will get.",
              },
              {
                mistake: "Fake clickbait",
                fix: "A hook that doesn't match what the video delivers trains your audience not to trust you. The hook should be compelling AND accurate.",
              },
              {
                mistake: "Using the same hook format every time",
                fix: "Audiences recognise patterns. If every video starts the same way, the hook stops working.",
              },
            ].map((item) => (
              <li
                key={item.mistake}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  ✗ {item.mistake}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {item.fix}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Related links */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Related resources on Scribtly
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Start writing scripts for free", href: "/signup" },
              { label: "See Scribtly's pricing", href: "/login" },
              { label: "Try the AI script writer", href: "/signup" },
              { label: "Scripts for YouTube", href: "/signup" },
              { label: "Scripts for TikTok", href: "/signup" },
              { label: "Scripts for Instagram Reels", href: "/signup" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-xl border px-4 py-3 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-subtle)",
                  color: "var(--accent)",
                }}
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            {faqItems.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
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
          className="rounded-2xl px-8 py-10 text-center"
          style={{ background: "var(--dark)" }}
        >
          <p
            className="text-2xl font-bold mb-3 text-white"
          >
            Write your next hook in under 60 seconds
          </p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly generates platform-native scripts with hooks built in — for YouTube, TikTok, Reels,
            LinkedIn, and more. Save your client's voice once and create scripts that actually sound like them.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 border border-white/20"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free — no card required
          </Link>
        </section>
      </article>

      {/* Footer */}
      <footer
        className="border-t px-6 py-8"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link
            href="/"
            className="font-bold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/signup" className="hover:underline">Sign up free</Link>
            <Link href="/login" className="hover:underline">Sign in</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "What Is a Video Hook? The Complete Beginner's Guide",
              "description":
                "A video hook is the opening line or moment that stops the scroll and earns the next few seconds of attention. Learn what makes a great hook and how to write one.",
              "author": {
                "@type": "Organization",
                "name": "Scribtly",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Scribtly",
              },
              "datePublished": "2026-07-20",
              "dateModified": "2026-07-20",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map((item) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.a,
                },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://scribtly.com/",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://scribtly.com/blog",
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "What Is a Video Hook?",
                  "item": "https://scribtly.com/blog/what-is-a-video-hook",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}

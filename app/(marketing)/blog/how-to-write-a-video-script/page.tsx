import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write a Video Script | Scribtly",
  description: "Learn how to write a video script for YouTube, TikTok, and Reels. Covers hooks, structure, CTAs, and format — practical guide for creators and freelancers.",
  openGraph: {
    title: "How to Write a Video Script: The Complete Guide",
    description: "Learn how to write a video script for YouTube, TikTok, and Reels. Covers hooks, structure, CTAs, and format.",
    type: "article",
    url: "https://scribtly.com/blog/how-to-write-a-video-script",
    siteName: "Scribtly",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a Video Script: The Complete Guide",
    description: "Learn how to write a video script for YouTube, TikTok, and Reels. Covers hooks, structure, CTAs, and format.",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-a-video-script",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Write a Video Script: The Complete Guide",
  description:
    "A complete guide to writing video scripts for YouTube, TikTok, Instagram Reels, LinkedIn video, and more. Covers hooks, body structure, CTAs, formatting, and platform differences.",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
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
        text: "It depends on the platform and format. A TikTok or Reel script may be 50–150 words. A YouTube short-form script runs 200–500 words. A long-form YouTube video script can be 1,500–4,000 words or more. The rule is: the script should be as long as it needs to be to deliver the value, and no longer.",
      },
    },
    {
      "@type": "Question",
      name: "Should I script word for word or just use bullet points?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both approaches work. Word-for-word scripts give you precise control over pacing, message, and delivery time — useful for clients or ads. Bullet-point scripts suit confident on-camera presenters who want to sound natural. For client work, a full script is usually preferable so the client knows exactly what they are approving.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make a video script sound natural?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Always read the script aloud before recording. Rewrite any sentence that sounds stilted or formal. Use contractions. Write the way the person actually speaks, not the way they would write an email. Capture the client's vocabulary and natural expressions first, then write around them.",
      },
    },
    {
      "@type": "Question",
      name: "What format should I use for a video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For short-form video (TikTok, Reels, Shorts), a single-column format works well: hook, body, CTA in plain paragraphs with brief direction notes in brackets. For long-form YouTube scripts, a two-column format (action/visual on the left, spoken word on the right) is standard in professional production. For most freelance and agency work, a clean single-column document with clear section labels is practical and easy for clients to review.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to write a video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 60-second short-form script can take 20–45 minutes from scratch. A long-form YouTube script (10–15 minutes of video) can take 3–6 hours including research and revisions. Using a tool like Scribtly with a saved client voice profile can reduce a short-form first draft to under 60 seconds, leaving your time for editing and refinement.",
      },
    },
    {
      "@type": "Question",
      name: "Do short-form videos need a script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — short-form videos especially benefit from scripts because every second counts. On TikTok and Reels, you can lose a viewer in the first two seconds if the hook is weak. A tight script ensures the hook is strong, the body is focused, and nothing is wasted.",
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
      name: "How to Write a Video Script",
      item: "https://scribtly.com/blog/how-to-write-a-video-script",
    },
  ],
};

const tocItems = [
  { id: "why-scripts-matter", label: "Why scripts matter" },
  { id: "three-part-structure", label: "The three-part structure" },
  { id: "writing-the-hook", label: "Writing the hook" },
  { id: "writing-the-body", label: "Writing the body" },
  { id: "writing-the-cta", label: "Writing the CTA" },
  { id: "script-formatting", label: "Script formatting" },
  { id: "platform-differences", label: "Platform differences" },
  { id: "client-voice", label: "Writing in a client's voice" },
  { id: "common-mistakes", label: "Common mistakes to avoid" },
  { id: "faq", label: "FAQs" },
];

export default function HowToWriteAVideoScript() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema]),
        }}
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
              href="/"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Features
            </Link>
            <Link
              href="/#get-access"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Pricing
            </Link>
          </div>
          <Link
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90 text-white"
            style={{ background: "var(--accent)" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-0">
        <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline" style={{ color: "var(--text-muted)" }}>
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:underline" style={{ color: "var(--text-muted)" }}>
            Blog
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--text-primary)" }}>How to Write a Video Script</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-4xl mx-auto px-6 pt-10 pb-8">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: "rgba(224,120,48,0.10)", color: "var(--accent)" }}
          >
            Script Writing Guide
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            14 July 2026
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            · 12 min read
          </span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          How to Write a Video Script
          <br />
          <span style={{ color: "var(--accent)" }}>That People Actually Watch</span>
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "680px" }}>
          Whether you are scripting for a client or for your own channel, a good video script stops
          the scroll and holds attention long enough to drive action. The key is structure, not length.
          This guide covers everything — hooks, body sections, CTAs, formatting, and platform
          differences — so you can write scripts that actually work.
        </p>
      </header>

      {/* Soft CTA */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border p-5"
          style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.06)" }}
        >
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              Want to skip the blank page?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native scripts in under 60 seconds, in your client's voice.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try it free
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main content + TOC layout */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start">

          {/* Article body */}
          <article className="max-w-3xl">

            {/* Section: Why scripts matter */}
            <section id="why-scripts-matter" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Why scripts matter (even for "natural" creators)
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                A common objection: "I want to sound natural, not scripted." That is a false
                trade-off. A good script does not sound scripted — it sounds like the creator, but
                sharper. It removes filler words, keeps the video on track, front-loads the value so
                viewers stay longer, and makes it easier to batch-produce content.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                For freelancers and agencies writing scripts for clients, a script is non-negotiable.
                It is the deliverable. It is what gets approved before recording starts. It is what
                saves everyone from a second or third reshoot.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Whether you use a word-for-word script or structured talking points depends on your
                workflow and your client's comfort on camera. Both work. What matters is that the
                structure is right before the camera rolls.
              </p>
            </section>

            {/* Section: Three-part structure */}
            <section id="three-part-structure" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                The three-part structure of every good video script
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                Almost every successful video follows the same skeleton. The platform changes. The
                length changes. The structure does not.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    num: "01",
                    title: "Hook",
                    body: "The first 2–15 seconds. Stop the scroll and give the viewer a reason to keep watching.",
                  },
                  {
                    num: "02",
                    title: "Body",
                    body: "The delivery of the value, story, or message. Chunked, focused, and specific.",
                  },
                  {
                    num: "03",
                    title: "CTA",
                    body: "One clear next step. Connected to the value just delivered. Easy to act on.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <div
                      className="text-4xl font-bold mb-3 leading-none"
                      style={{ color: "rgba(224,120,48,0.20)" }}
                    >
                      {item.num}
                    </div>
                    <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                That is it. Everything else — B-roll notes, on-screen text, chapter markers — is
                production detail layered on top of this structure.
              </p>
            </section>

            {/* Section: Writing the hook */}
            <section id="writing-the-hook" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                How to write the hook
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                The hook is the most important line in the entire script. On TikTok and Reels, you
                have about two seconds. On YouTube, you have up to 15. Waste either and the video
                fails before it starts.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                A good hook does one of four things:
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  {
                    label: "Challenges a belief",
                    example: '"The one thing no one tells you about writing scripts for clients..."',
                  },
                  {
                    label: "States the result first",
                    example: '"I went from one client to five in 30 days. Here is how."',
                  },
                  {
                    label: "Asks a question the viewer is already asking",
                    example: '"Struggling to write scripts that sound like your client, not like AI?"',
                  },
                  {
                    label: "Makes a bold, specific claim",
                    example: '"Most YouTube intros are killing your watch time. Yours probably is too."',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border p-4"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                      {item.label}
                    </p>
                    <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
                      {item.example}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Hook length by platform
              </h3>
              <div className="rounded-2xl border overflow-hidden mb-6" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
                      <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Platform</th>
                      <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Hook window</th>
                      <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell" style={{ color: "var(--text-primary)" }}>Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { platform: "TikTok / Reels", window: "1–2 seconds", format: "One punchy line" },
                      { platform: "YouTube Shorts", window: "2–4 seconds", format: "Visual + line" },
                      { platform: "YouTube long-form", window: "Up to 15 seconds", format: "Hook + value promise" },
                      { platform: "LinkedIn Video", window: "3–5 seconds", format: "Insight or question" },
                    ].map((row, i) => (
                      <tr
                        key={row.platform}
                        style={{
                          borderBottom: i < 3 ? "1px solid var(--border)" : undefined,
                          background: "var(--bg-base)",
                        }}
                      >
                        <td className="px-5 py-3 font-medium" style={{ color: "var(--text-primary)" }}>{row.platform}</td>
                        <td className="px-5 py-3" style={{ color: "var(--text-muted)" }}>{row.window}</td>
                        <td className="px-5 py-3 hidden sm:table-cell" style={{ color: "var(--text-muted)" }}>{row.format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Hook mistakes to avoid
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  '"Hey guys, welcome back to my channel..." — viewers skip this automatically.',
                  '"Today I\'m going to show you..." — get to the point instead.',
                  'Long teases that promise but don\'t deliver in the first few seconds.',
                  'Starting with context the viewer doesn\'t need yet.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <span className="mt-1 text-red-400 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Writing the body */}
            <section id="writing-the-body" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                How to write the body
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                The body is where you deliver what the hook promised. The rules are simple but most
                creators ignore them.
              </p>
              <div className="flex flex-col gap-5 mb-8">
                {[
                  {
                    title: "Keep it chunked",
                    body: "Break the body into 3–5 logical sections or steps. Numbering helps viewers follow along and keeps you on track when recording. \"Step one, step two, step three\" works because it sets an expectation and signals progress.",
                  },
                  {
                    title: "One idea per beat",
                    body: "Treat each sentence as its own delivery beat. Short sentences are easier to say on camera and easier for the audience to absorb. Long, compound sentences lose viewers, especially on short-form platforms.",
                  },
                  {
                    title: "Add retention hooks for longer videos",
                    body: "For videos over three minutes, add micro-hooks every 90 seconds to 3 minutes. These re-engage viewers who started drifting: \"Here is the part most people skip — it is actually the most important.\" Pattern interrupts, teases, and quick recaps all work.",
                  },
                  {
                    title: "Be specific, not vague",
                    body: "\"Post consistently\" is useless advice. \"Post three times a week for 60 days, measuring which format gets the most saves\" gives the viewer something to act on. Specificity builds credibility and keeps people watching.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Adding B-roll notes
              </h3>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                If you are writing for a client video or a production, include B-roll and visual
                direction notes in brackets directly in the script. This saves editing time and makes
                it clear what footage is needed.
              </p>
              <div
                className="rounded-2xl border p-5 font-mono text-sm"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-muted)" }}
              >
                <p className="mb-2 font-semibold" style={{ color: "var(--text-primary)" }}>Example:</p>
                <p>[HOOK — 2 SECONDS]</p>
                <p className="mb-3">Most freelancers are writing client scripts the wrong way.</p>
                <p>[BODY]</p>
                <p className="mb-2">They start with the message instead of the audience.</p>
                <p className="mb-3">[B-ROLL: Screen recording showing blank script document]</p>
                <p className="mb-2">Before you write a single word, answer these three questions:</p>
                <p className="mb-2">Who is watching? What do they already believe?</p>
                <p className="mb-3">What do they need to feel to take action?</p>
                <p>[ON SCREEN: 3 questions as bullet points]</p>
                <p className="mb-3">Once you have those answers, the script practically writes itself.</p>
                <p>[CTA]</p>
                <p>Scribtly does this automatically. Link in bio.</p>
              </div>
            </section>

            {/* Mid CTA */}
            <div className="my-10 rounded-2xl p-8 text-center" style={{ background: "var(--dark)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                Save hours per week
              </p>
              <h3 className="text-2xl font-bold text-white mb-3">
                Generate a platform-native script in under 60 seconds
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                Save your client's voice profile once. Scribtly generates YouTube, TikTok, Reels,
                LinkedIn, and ad scripts that sound like them — not like a generic AI tool.
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

            {/* Section: Writing the CTA */}
            <section id="writing-the-cta" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                How to write a CTA that does not sound forced
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                Most video CTAs fail because they ask for too much, come too late, or feel
                disconnected from the content. A good CTA asks for one thing, connects to what was
                just delivered, and sounds like a natural end rather than a billboard.
              </p>
              <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--text-primary)" }}>
                CTAs that work
              </h3>
              <div className="flex flex-col gap-2 mb-6">
                {[
                  '"If this helped, share it with the person on your team who writes your scripts."',
                  '"Drop SCRIPT in the comments and I will send you the template I use with clients."',
                  '"Click the link below to generate your first script free — takes under 60 seconds."',
                  '"Save this video for the next time you are staring at a blank script."',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                CTAs that fall flat
              </h3>
              <div className="flex flex-col gap-2 mb-4">
                {[
                  '"Like, subscribe, and hit the bell." — overused and ignored.',
                  '"Check out my other videos." — too vague to act on.',
                  'A 60-second sponsor read at the end of a 90-second video.',
                  'Asking for three things at once (subscribe, follow, comment, share).',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <span className="mt-0.5 text-red-400 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                The simplest CTA test: if someone watched only the last 10 seconds of the video,
                would the CTA still make sense? If not, rewrite it so it stands alone.
              </p>
            </section>

            {/* Section: Script formatting */}
            <section id="script-formatting" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                How to format a video script
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                Script format should match your workflow and your client's review process. There is
                no universal standard for online video scripts, but a few formats work consistently
                well.
              </p>
              <div className="flex flex-col gap-4 mb-6">
                {[
                  {
                    title: "Single-column (short-form video)",
                    body: "Best for TikTok, Reels, Shorts, and LinkedIn. Write each section as a clearly labelled block: [HOOK], [BODY], [CTA]. Add visual notes in brackets. Keep it scannable — the creator needs to glance at it between takes.",
                  },
                  {
                    title: "Two-column (long-form production)",
                    body: "Standard in broadcast and commercial production. Left column: visual direction, B-roll, on-screen text. Right column: spoken word. Useful when multiple people (writer, editor, presenter) are working from the same document.",
                  },
                  {
                    title: "Outline format (talking-point style)",
                    body: "Bullet points rather than full sentences. Works for confident presenters who want structure without a word-for-word read. Less useful for clients who need to approve exact wording before recording.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                For freelance and agency work, the single-column format with clear labels is the most
                practical. It is easy for clients to read, easy to paste into a teleprompter app, and
                easy to revise without reformatting.
              </p>
            </section>

            {/* Section: Platform differences */}
            <section id="platform-differences" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Platform-specific script writing
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                The biggest mistake in script writing is reusing the same script across platforms. A
                YouTube long-form script is not a TikTok script. Platform-native structure is not
                optional.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  {
                    platform: "YouTube long-form (8–20 min)",
                    points: [
                      "Open with a hook that promises a clear, specific outcome",
                      "Follow with a brief 'why this matters' before the main content",
                      "Add retention hooks every 2–3 minutes to re-engage dropping viewers",
                      "Use numbered chapters for videos over 10 minutes",
                      "End with a CTA that connects to another video or a next step outside YouTube",
                    ],
                  },
                  {
                    platform: "YouTube Shorts (under 60 sec)",
                    points: [
                      "Hook in the first 2–3 seconds, no exceptions",
                      "No wasted transitions or setup — start in the middle of the action",
                      "End on the strongest point so viewers replay",
                      "One CTA maximum, delivered in one second",
                    ],
                  },
                  {
                    platform: "TikTok",
                    points: [
                      "Hook in the first 1–2 seconds — video or audio, whichever is stronger",
                      "Deliver the value before asking for anything",
                      "Loop structure works well: end back at the opening premise",
                      "Hashtags and captions are separate from the script body",
                    ],
                  },
                  {
                    platform: "Instagram Reels",
                    points: [
                      "Visual hook before the audio hook — the first frame must stop the scroll",
                      "Keep body segments under 5 seconds each",
                      "CTA must work without sound: some viewers watch on mute",
                      "On-screen captions are part of the script, not an afterthought",
                    ],
                  },
                  {
                    platform: "LinkedIn Video",
                    points: [
                      "Professional hook: insight, lesson, or provocative question",
                      "Slightly slower pace than TikTok — your audience is at a desk",
                      "B-roll and text overlays help professional viewers follow along",
                      "CTA: link, DM, or 'comment below' — all work well on LinkedIn",
                    ],
                  },
                ].map((item) => (
                  <div
                    key={item.platform}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <h3 className="font-semibold text-base mb-4" style={{ color: "var(--text-primary)" }}>
                      {item.platform}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {item.points.map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                          <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Client voice */}
            <section id="client-voice" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Writing scripts in a client's voice
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                If you are a freelance script writer or social media manager, the client's voice is
                the product. A script that sounds like generic AI output will get rejected — or worse,
                published and reflected badly on the client.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                Here is a process that works:
              </p>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  {
                    step: "1",
                    title: "Build a voice profile before you start",
                    body: "Ask the client for five videos they love (their own or competitors'), five phrases they always use, three phrases they would never say, and their audience's single biggest problem. This brief takes 15 minutes and saves hours of revisions.",
                  },
                  {
                    step: "2",
                    title: "Capture their vocabulary",
                    body: "Every client gravitates toward certain words and expressions. Write them down. These phrases are the fingerprints of their voice — use them in every script and avoid words that clash.",
                  },
                  {
                    step: "3",
                    title: "Match their energy level",
                    body: "A high-energy fitness coach needs a fast-paced, exclamation-point script. A calm financial advisor needs measured, authoritative pacing. Energy mismatch is the main reason clients say a script 'doesn't feel like me.'",
                  },
                  {
                    step: "4",
                    title: "Test with a short script first",
                    body: "Before writing a full 10-minute YouTube guide, write a 60-second short for them. Get their feedback. Lock in the voice before you scale up to longer work.",
                  },
                  {
                    step: "5",
                    title: "Save the profile and reuse it",
                    body: "Once you know their voice, save those notes somewhere reusable. Writing client scripts from a saved voice profile is far faster than re-learning their style on every new brief — and far more consistent.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-5 rounded-2xl border p-6"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ background: "var(--accent)" }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                This is exactly the workflow{" "}
                <Link href="/" className="underline" style={{ color: "var(--accent)" }}>
                  Scribtly
                </Link>{" "}
                is built for. You save a client's voice profile once — their niche, tone, audience,
                key phrases, and content style — and generate platform-native scripts that sound like
                them, not like a generic AI output. The next time you need a script for that client,
                you are not starting from zero.
              </p>
            </section>

            {/* Section: Common mistakes */}
            <section id="common-mistakes" className="mb-14">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Common mistakes to avoid
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "Starting too slow",
                    body: "Every second before the hook is a lost viewer. Cut the throat-clearing, the \"in today's video\" intro, and the logo animation. Start with the value.",
                  },
                  {
                    title: "Over-explaining to the wrong audience",
                    body: "Creators who are deep in their topic often explain basics to people who already know them. Know your viewer's level. Explain concepts once, briefly, then move on.",
                  },
                  {
                    title: "Skipping the read-aloud test",
                    body: "If a sentence is awkward to say out loud, rewrite it. Scripts are for speaking, not reading. Run through the full script before sending it to a client or using it on camera.",
                  },
                  {
                    title: "Burying the CTA",
                    body: "If you have one chance to direct your viewer somewhere, do not hide it in the middle of the body section. The CTA belongs at the end, delivered clearly, with no other asks competing with it.",
                  },
                  {
                    title: "Using the same script on every platform",
                    body: "A YouTube script pasted into a TikTok draft will underperform. Platform-native structure matters. Reformat the core content for each platform — do not just cut it shorter.",
                  },
                  {
                    title: "Never improving based on data",
                    body: "Pay attention to where viewers drop off. If every video loses 40% of viewers at the 30-second mark, the body structure is the problem. Rewrite that section and test again.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border p-5 flex gap-4"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <span className="text-red-400 font-bold text-lg shrink-0 mt-0.5">✕</span>
                    <div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-14">
              <h2
                className="text-2xl font-bold mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                Frequently asked questions
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  {
                    q: "How long should a video script be?",
                    a: "It depends on the platform and format. A TikTok or Reel script may be 50–150 words. A YouTube short-form script runs 200–500 words. A long-form YouTube script can be 1,500–4,000 words or more. The rule is simple: as long as it needs to be to deliver the value, and no longer.",
                  },
                  {
                    q: "Should I script word for word or just use bullet points?",
                    a: "Both approaches work. Word-for-word scripts give precise control over pacing, message, and timing — useful for client work and ads. Bullet-point scripts suit confident on-camera presenters who want to sound natural. For client work, a full script is usually preferable so the client knows exactly what they are approving.",
                  },
                  {
                    q: "How do I make a video script sound natural?",
                    a: "Always read the script aloud before recording or sending to a client. Rewrite any sentence that sounds stilted or formal. Use contractions. Write the way the person actually speaks, not the way they would write an email. Capture the client's vocabulary and natural expressions, then write around them.",
                  },
                  {
                    q: "What format should I use for a video script?",
                    a: "For short-form video (TikTok, Reels, Shorts), a single-column format works best: hook, body, CTA in plain paragraphs with brief direction notes in brackets. For long-form YouTube, a two-column format (visuals on left, spoken word on right) is standard in production. For most freelance work, a clean single-column document with labelled sections is practical and easy for clients to review.",
                  },
                  {
                    q: "How long does it take to write a video script?",
                    a: "A 60-second short-form script can take 20–45 minutes from scratch. A long-form YouTube script can take 3–6 hours including research. Using Scribtly with a saved client voice profile reduces a short-form first draft to under 60 seconds, leaving your time for editing and client feedback.",
                  },
                  {
                    q: "Do short-form videos need a script?",
                    a: "Yes — short-form videos especially benefit from scripts because every second counts. On TikTok and Reels, you can lose a viewer in the first two seconds if the hook is weak. A tight script ensures the hook lands, the body stays focused, and nothing is wasted.",
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                      {item.q}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section
              className="rounded-2xl p-10 text-center"
              style={{ background: "var(--dark)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                Stop writing from a blank page
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Turn one brief into a client-ready script
                <br />
                in under 60 seconds
              </h2>
              <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
                Save your client's voice profile once. Generate YouTube, TikTok, Reels, LinkedIn
                video, and ad scripts that sound like them — not like generic AI output. Scribtly is
                free to start, no card required.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Generate your next script free
                <ArrowRight size={16} />
              </Link>
              <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                No credit card required. 5 scripts free to start.
              </p>
            </section>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div
              className="sticky top-24 rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--text-muted)" }}>
                Contents
              </p>
              <nav className="flex flex-col gap-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm py-1.5 leading-tight hover:underline transition-opacity hover:opacity-80"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                  Generate scripts faster
                </p>
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "var(--accent)" }}
                >
                  Try Scribtly free
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </aside>
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
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:underline" style={{ color: "var(--text-muted)" }}>
              Blog
            </Link>
            <Link href="/" className="hover:underline" style={{ color: "var(--text-muted)" }}>
              Home
            </Link>
            <Link href="/signup" className="hover:underline" style={{ color: "var(--text-muted)" }}>
              Get started
            </Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

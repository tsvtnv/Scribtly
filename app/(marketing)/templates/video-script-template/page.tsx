import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Video Script Template – Free Framework for Any Platform",
  description:
    "A free video script template for YouTube, TikTok, Reels, and LinkedIn. Hook, intro, body, CTA – fill it in and film.",
  openGraph: {
    title: "Video Script Template – Free Framework for Any Platform",
    description:
      "A free video script template for YouTube, TikTok, Reels, and LinkedIn. Hook, intro, body, CTA – fill it in and film.",
    type: "article",
    url: "https://scribtly.com/templates/video-script-template",
  },
  alternates: {
    canonical: "https://scribtly.com/templates/video-script-template",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to Use a Video Script Template",
      description:
        "Fill in this five-section video script template to create a structured, engaging video for YouTube, TikTok, Instagram Reels, or LinkedIn.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Write your hook",
          text: "Open with a single line that creates curiosity, poses a problem, or makes a bold statement. This is the most important line in your script.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Write your intro",
          text: "Briefly tell the viewer what they will get from this video. Keep it under 20 seconds.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Write the body",
          text: "Break your main content into 3–5 clear points. Each point should be one idea, explained simply.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Add B-roll notes",
          text: "Note any visual cuts, graphics, or footage you want alongside each section.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Write your CTA",
          text: "End with one clear action for the viewer to take.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a video script template?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A video script template is a pre-built structure with labelled sections you fill in with your own content. It typically covers the hook, intro, main body, and CTA – saving time and keeping your video on track.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to write every word in my script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not always. Some creators prefer a full word-for-word script; others use bullet-point outlines. This template supports both. Use it as a guide and write as much detail as suits your presenting style.",
          },
        },
        {
          "@type": "Question",
          name: "Does this video script template work for short-form content?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. For TikTok, Reels, and YouTube Shorts, simply compress the template: make the hook 1–3 seconds, shrink the body to 1–2 points, and keep the CTA to one line.",
          },
        },
        {
          "@type": "Question",
          name: "How do I write a strong hook?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A strong hook does one of three things: asks a question the viewer already has, makes a bold or surprising claim, or starts mid-action. Avoid opening with 'In today's video...' – get to the point in the first two seconds.",
          },
        },
        {
          "@type": "Question",
          name: "Can I generate a video script from this template automatically?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Scribtly generates complete, platform-native video scripts in under 60 seconds. Save a client voice profile once, choose a platform and topic, and Scribtly writes the hook, intro, body, and CTA in the correct format.",
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
          name: "Templates",
          item: "https://scribtly.com/templates",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Video Script Template",
          item: "https://scribtly.com/templates/video-script-template",
        },
      ],
    },
  ],
};

const platforms = [
  {
    name: "YouTube (Long-Form)",
    duration: "8–20 minutes",
    hookLength: "5–15 sec hook",
    bodyPoints: "5–8 points",
    tips: [
      "Hook must pay off a specific promise",
      "Intro can include credentials or social proof",
      "Use pattern interrupts every 90–120 seconds",
      "End-screen CTA: subscribe + next video",
    ],
  },
  {
    name: "YouTube Shorts",
    duration: "Under 60 seconds",
    hookLength: "1–3 sec hook",
    bodyPoints: "1–3 points",
    tips: [
      "No intro – hook is everything",
      "Get to the value in the first 3 seconds",
      "Vertical framing only",
      "CTA: one word at the very end",
    ],
  },
  {
    name: "TikTok",
    duration: "15–90 seconds",
    hookLength: "1–3 sec hook",
    bodyPoints: "2–3 points",
    tips: [
      "Open with the pay-off, not the set-up",
      "No formal intro – you're mid-story immediately",
      "One sentence per body point maximum",
      "CTA: follow, comment, or link in bio",
    ],
  },
  {
    name: "Instagram Reels",
    duration: "15–90 seconds",
    hookLength: "1–3 sec hook",
    bodyPoints: "2–3 points",
    tips: [
      "Text overlay on hook for silent viewers",
      "Visual pacing is faster than YouTube",
      "Caption should echo the hook",
      "CTA: save, share, or comment a word",
    ],
  },
  {
    name: "LinkedIn Video",
    duration: "1–3 minutes",
    hookLength: "5–10 sec hook",
    bodyPoints: "3–4 points",
    tips: [
      "Hook is professional but still specific",
      "Mention role or audience context early",
      "Data points and frameworks land well",
      "CTA: connect, comment, or visit the link",
    ],
  },
];

const mistakes = [
  {
    title: "Starting with 'In today's video…'",
    description:
      "This wastes the first three seconds. Start with the hook instead – the pay-off, not the preamble.",
  },
  {
    title: "Too many body points",
    description:
      "More than five points in a short video loses the viewer. Pick the most useful points and cut the rest.",
  },
  {
    title: "Vague or stacked CTAs",
    description:
      "'Like, subscribe, comment, and follow me on Instagram' is not a CTA. Pick one action and make it specific.",
  },
  {
    title: "No B-roll plan",
    description:
      "Talking head for the entire video drops retention. Note your visual cuts in the script, even roughly.",
  },
  {
    title: "Writing for reading, not speaking",
    description:
      "Read your script aloud before filming. If it sounds like an essay, rewrite it as natural speech.",
  },
];

const faqs = [
  {
    q: "What is a video script template?",
    a: "A video script template is a pre-built structure with labelled sections you fill in with your own content. It typically covers the hook, intro, main body, and CTA – saving time and keeping your video on track.",
  },
  {
    q: "Do I need to write every word in my script?",
    a: "Not always. Some creators prefer a full word-for-word script; others use bullet-point outlines. This template supports both. Use it as a guide and write as much detail as suits your presenting style.",
  },
  {
    q: "Does this template work for short-form content?",
    a: "Yes. For TikTok, Reels, and YouTube Shorts, simply compress the template: make the hook 1–3 seconds, shrink the body to 1–2 points, and keep the CTA to one line. The structure is the same; the length changes.",
  },
  {
    q: "How do I write a strong hook?",
    a: "A strong hook does one of three things: asks a question the viewer already has, makes a bold or surprising claim, or starts mid-action. Avoid opening with 'In today's video…' or 'Hey guys, welcome back.' Get to the point in the first two seconds.",
  },
  {
    q: "Can I generate a video script from this template automatically?",
    a: "Yes. Scribtly generates complete, platform-native video scripts in under 60 seconds. Save a client voice profile once, choose a platform and topic, and Scribtly writes the hook, intro, body, and CTA in the correct format.",
  },
];

export default function VideoScriptTemplatePage() {
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
              { label: "YouTube Template", href: "/templates/youtube-script-template" },
              { label: "TikTok Template", href: "/templates/tiktok-script-template" },
              { label: "Blog", href: "/blog" },
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
          <Link
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-80 text-white"
            style={{ background: "var(--accent)" }}
          >
            Try free
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/templates" className="hover:underline">Templates</Link>
            </li>
            <li>/</li>
            <li style={{ color: "var(--text-primary)" }}>Video Script Template</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="px-6 pt-12 pb-16 max-w-4xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{
            background: "rgba(224,120,48,0.08)",
            borderColor: "rgba(224,120,48,0.25)",
            color: "var(--accent)",
          }}
        >
          <FileText size={12} />
          Free template
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Video Script Template
          <br />
          <span style={{ color: "var(--accent)" }}>A Free Framework for Any Platform</span>
        </h1>
        <p
          className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Copy this template, fill in the sections, and you have a complete video script ready to
          film. Works for YouTube, TikTok, Instagram Reels, LinkedIn video, and more.
        </p>

        {/* Soft CTA */}
        <div
          className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            Want your script written for you instead?
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
            style={{ background: "var(--accent)" }}
          >
            Generate a script in 60 seconds
            <ArrowRight size={14} />
          </Link>
        </div>
        <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
          No credit card required. 5 free scripts included.
        </p>
      </section>

      {/* What every video script needs */}
      <section
        className="px-6 py-16 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What every video script needs
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Regardless of platform or length, every engaging video follows the same four-part
              structure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                title: "Hook",
                timing: "0–5 seconds",
                desc: "The single line that stops the scroll. It poses a question, makes a bold claim, or starts mid-action. Without a strong hook, the rest of your script is irrelevant.",
              },
              {
                num: "02",
                title: "Intro",
                timing: "5–20 seconds",
                desc: "Tell viewers what they will learn or get. Add a brief credibility line if needed. Keep it tight – they already clicked because the hook worked.",
              },
              {
                num: "03",
                title: "Body",
                timing: "Main content",
                desc: "Break your message into 3–5 clear points. Each point is one idea, explained simply. Include B-roll notes for your editor alongside each section.",
              },
              {
                num: "04",
                title: "CTA",
                timing: "Last 10–20 seconds",
                desc: "One action only. Subscribe, follow, comment, visit a link, or book a call. Listing multiple CTAs reduces the chance of any of them happening.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-2xl border p-7 flex flex-col gap-3"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="text-4xl font-bold leading-none"
                  style={{ color: "rgba(224,120,48,0.20)" }}
                >
                  {item.num}
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs font-semibold mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.timing}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Template */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              The video script template
            </h2>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              Copy this structure and fill in the bracketed sections. Add or remove body points as
              needed.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Hook */}
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(224,120,48,0.4)",
                background: "rgba(224,120,48,0.05)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: "var(--accent)", color: "white" }}
                >
                  HOOK
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  0–5 seconds · Most important line
                </span>
              </div>
              <div
                className="font-mono text-sm p-4 rounded-xl"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--text-primary)",
                  border: "1px dashed var(--border)",
                }}
              >
                <p>[State the problem, ask the question, or make the bold claim.]</p>
                <p className="mt-2 opacity-50 text-xs">
                  Example: &ldquo;Most creators waste 10 minutes before they even start filming –
                  here&rsquo;s why.&rdquo;
                </p>
              </div>
              <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
                Tip: Write 3–5 hook options and choose the strongest. If it sounds too long to say
                in one breath, it is too long.
              </p>
            </div>

            {/* Intro */}
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: "var(--text-primary)", color: "white" }}
                >
                  INTRO
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  5–20 seconds · Set up the promise
                </span>
              </div>
              <div
                className="font-mono text-sm p-4 rounded-xl"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--text-primary)",
                  border: "1px dashed var(--border)",
                }}
              >
                <p>[Tell viewers what they will get from this video.]</p>
                <p className="mt-1">
                  [Optional: one-line credibility point – why you are the right person to cover
                  this.]
                </p>
                <p className="mt-2 opacity-50 text-xs">
                  Example: &ldquo;In the next 3 minutes, I&rsquo;ll show you the exact script
                  structure I use for all my client videos.&rdquo;
                </p>
              </div>
            </div>

            {/* Body points */}
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ background: "var(--text-muted)", color: "white" }}
                  >
                    BODY POINT {n}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Main content
                  </span>
                </div>
                <div
                  className="font-mono text-sm p-4 rounded-xl"
                  style={{
                    background: "var(--bg-base)",
                    color: "var(--text-primary)",
                    border: "1px dashed var(--border)",
                  }}
                >
                  <p>[Point {n} heading or topic sentence]</p>
                  <p className="mt-1">
                    [Explanation – 2–4 sentences or bullet points]
                  </p>
                  <p className="mt-1">[Example, data point, or story to support it]</p>
                  <p className="mt-2 font-semibold opacity-60">
                    B-roll note: [What footage, graphic, or visual goes here]
                  </p>
                </div>
              </div>
            ))}

            {/* Extra points note */}
            <div
              className="rounded-xl border border-dashed p-4 text-center"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Add body points 4–5 as needed. Short-form: 1–3 points. Long-form YouTube: up to 7
                points.
              </p>
            </div>

            {/* CTA */}
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(224,120,48,0.4)",
                background: "rgba(224,120,48,0.05)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: "var(--accent)", color: "white" }}
                >
                  CTA
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Last 10–20 seconds · One action only
                </span>
              </div>
              <div
                className="font-mono text-sm p-4 rounded-xl"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--text-primary)",
                  border: "1px dashed var(--border)",
                }}
              >
                <p>[Bridge: briefly link back to the hook or the value you delivered]</p>
                <p className="mt-1">[Call to action: the single thing you want them to do]</p>
                <p className="mt-1">
                  [Optional: tease what comes next or why they should act now]
                </p>
                <p className="mt-2 opacity-50 text-xs">
                  Example: &ldquo;If this helped, drop a comment with your biggest scripting
                  challenge. I&rsquo;ll cover it in the next video.&rdquo;
                </p>
              </div>
              <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
                Tip: Asking for subscribe, follow, comment, and link-click at the same time reduces
                the conversion rate on all of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform variations */}
      <section
        className="px-6 py-16 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Platform-specific variations
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              The core structure stays the same. What changes is the length, pacing, and how much
              time you spend on each section.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="rounded-2xl border p-6 flex flex-col gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {platform.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: "rgba(224,120,48,0.1)",
                        color: "var(--accent)",
                      }}
                    >
                      {platform.duration}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
                    >
                      {platform.hookLength}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
                    >
                      {platform.bodyPoints}
                    </span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {platform.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <CheckCircle
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: "var(--accent)" }}
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/templates/youtube-script-template"
              className="text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-base)" }}
            >
              YouTube Script Template →
            </Link>
            <Link
              href="/templates/tiktok-script-template"
              className="text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-base)" }}
            >
              TikTok Script Template →
            </Link>
            <Link
              href="/templates/instagram-reels-script-template"
              className="text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-base)" }}
            >
              Reels Script Template →
            </Link>
          </div>
        </div>
      </section>

      {/* Middle CTA */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: "var(--dark)" }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{
                borderColor: "rgba(224,120,48,0.4)",
                color: "var(--accent)",
                background: "rgba(224,120,48,0.08)",
              }}
            >
              <Zap size={12} />
              Scribtly
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
              Skip the blank page.
              <br />
              Generate your script in under 60 seconds.
            </h2>
            <p
              className="text-base mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Scribtly fills in this exact template for you. Add your client&rsquo;s voice profile
              and platform, and it writes the hook, intro, body points, and CTA – ready to review
              and film.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free – 5 scripts included
              <ArrowRight size={16} />
            </Link>
            <div className="mt-6 flex flex-wrap gap-5 justify-center">
              {[
                "Save client voice profiles",
                "Platform-native formatting",
                "Hook + body + CTA in one go",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <CheckCircle size={13} style={{ color: "var(--accent)" }} />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to fill in the template */}
      <section
        className="px-6 py-16 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            How to fill in the template
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--text-muted)" }}>
            Follow these five steps to go from blank document to a script ready to film.
          </p>
          <div className="flex flex-col gap-6">
            {[
              {
                step: "01",
                title: "Start with the topic and one goal",
                body: "Before you write a word, decide what single thing you want the viewer to understand, feel, or do after watching. Write it in one sentence. Every section of your script should serve that goal.",
              },
              {
                step: "02",
                title: "Write at least three hook options",
                body: "The hook is the highest-leverage part of your script. Write three variations: one question, one bold claim, one that starts mid-action. Choose the one that makes you most curious as a viewer.",
              },
              {
                step: "03",
                title: "Fill in body points as bullet notes first",
                body: "Do not write sentences yet. First, write one-line bullet points for each body section. Get the ideas right before you get the words right. Then expand each bullet into 2–4 sentences.",
              },
              {
                step: "04",
                title: "Add B-roll notes as you go",
                body: "Alongside each body section, note the visual you want: a screen recording, a graphic, a cutaway shot, a text overlay. Even rough notes help your editor and improve retention.",
              },
              {
                step: "05",
                title: "Write the CTA last and keep it to one action",
                body: "Decide which single action matters most for this video. If you want subscribers, ask for a subscribe. If you want comments, ask for a comment. One CTA, stated clearly, converts better than three.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div
                  className="text-4xl font-bold leading-none mt-1 shrink-0 w-12"
                  style={{ color: "rgba(224,120,48,0.25)" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Common scripting mistakes to avoid
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--text-muted)" }}>
            These patterns hurt watch time, reduce shares, and cost you conversions.
          </p>
          <div className="flex flex-col gap-4">
            {mistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="rounded-xl border p-5 flex gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="w-1.5 shrink-0 rounded-full mt-1"
                  style={{ background: "var(--accent)", minHeight: "1.25rem" }}
                />
                <div>
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {mistake.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {mistake.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-6 py-16 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold mb-10"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
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
        </div>
      </section>

      {/* More resources */}
      <section className="px-6 py-12 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-lg font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            More templates and resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                label: "YouTube Script Template",
                href: "/templates/youtube-script-template",
              },
              {
                label: "TikTok Script Template",
                href: "/templates/tiktok-script-template",
              },
              {
                label: "Instagram Reels Script Template",
                href: "/templates/instagram-reels-script-template",
              },
              {
                label: "YouTube Script Generator",
                href: "/youtube-script-generator",
              },
              {
                label: "TikTok Script Generator",
                href: "/tiktok-script-generator",
              },
              {
                label: "How to Write a Video Script",
                href: "/blog/how-to-write-a-video-script",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border p-4 text-sm font-medium transition-all hover:opacity-80 flex items-center gap-2"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                  background: "var(--bg-subtle)",
                }}
              >
                <FileText size={14} style={{ color: "var(--accent)" }} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="px-6 py-24 border-t"
        style={{ borderColor: "var(--border)", background: "var(--dark)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">
            Stop filling in templates manually.
          </h2>
          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Scribtly generates complete, platform-native video scripts for your clients in under 60
            seconds. Save a client voice profile once and reuse it across every brief – no
            re-explaining tone, style, or audience each time.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free – no card required
            <ArrowRight size={16} />
          </Link>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            5 scripts included on the free plan. No card required.
          </p>
        </div>
      </section>

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
          <div className="flex flex-wrap gap-5 justify-center">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/templates/youtube-script-template" className="hover:underline">
              YouTube Template
            </Link>
            <Link href="/templates/tiktok-script-template" className="hover:underline">
              TikTok Template
            </Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/signup" className="hover:underline">Get started</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}

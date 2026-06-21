import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "What Is a Video Hook? Definition, Types & Examples",
  description:
    "A video hook is the opening 3–10 seconds that decides if a viewer keeps watching. Learn what makes hooks work, the main types, and how to write better ones.",
  openGraph: {
    title: "What Is a Video Hook? Definition, Types & Examples",
    description:
      "A video hook is the opening 3–10 seconds that decides if a viewer keeps watching. Learn what makes hooks work, the main types, and how to write better ones.",
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
      headline: "What Is a Video Hook? Definition, Types & Examples",
      description:
        "A video hook is the opening 3–10 seconds that decides if a viewer keeps watching. Learn what makes hooks work, the main types, and how to write better ones.",
      author: { "@type": "Organization", name: "Scribtly" },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        logo: {
          "@type": "ImageObject",
          url: "https://scribtly.com/images/logo-horizontal.png",
        },
      },
      datePublished: "2026-06-21",
      url: "https://scribtly.com/blog/what-is-a-video-hook",
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
            text: "On TikTok and Instagram Reels, aim for 2–3 seconds — one punchy opening line or visual. On YouTube, you have a little more room: 5–15 seconds. The rule is the same on every platform: get to the point before the viewer's thumb moves.",
          },
        },
        {
          "@type": "Question",
          name: "Is a video hook the same as a thumbnail?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "They work together but they are different. The thumbnail gets the click. The hook keeps the viewer watching. Both need to be strong for a video to perform well.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the same hook on different platforms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sometimes, but platform context matters. A TikTok hook is usually spoken out loud. A LinkedIn video hook often uses text on screen since many viewers watch without sound. You will usually need to adapt the same idea to each platform's native format.",
          },
        },
        {
          "@type": "Question",
          name: "How many hook options should I write per video?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Write at least three variations before choosing. The first one you write is rarely the strongest. Forcing yourself to write more options usually reveals a sharper angle.",
          },
        },
        {
          "@type": "Question",
          name: "Does Scribtly help write video hooks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Scribtly generates full video scripts that include a hook as the opening section, written in your saved client voice. You can also ask it to generate multiple hook variations for the same video idea.",
          },
        },
        {
          "@type": "Question",
          name: "Why do my hooks keep getting ignored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usually because they start with an intro or your name, are too vague, or do not create enough curiosity or tension. Read your opening line in isolation: does it make you want to keep watching? If not, rewrite it before anything else.",
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
    name: "The Question Hook",
    description: "Ask something the viewer genuinely wants answered.",
    example: '"Are you making this mistake in every TikTok you post?"',
  },
  {
    name: "The Bold Statement Hook",
    description: "Say something surprising or counterintuitive.",
    example: '"Most YouTube intros are killing your channel — and you don\'t even know it."',
  },
  {
    name: "The Story Hook",
    description: "Open mid-scene, right in the middle of something that happened.",
    example: '"I lost my biggest client in 2024. Here\'s exactly what happened."',
  },
  {
    name: "The Value Promise Hook",
    description: "Tell viewers precisely what they will get from watching.",
    example: '"In the next 60 seconds, you\'ll know how to write a video hook that stops the scroll."',
  },
  {
    name: "The Stats or Fact Hook",
    description: "Open with a surprising number or finding that changes how the viewer sees something.",
    example: '"65% of viewers decide in the first three seconds whether to keep watching."',
  },
  {
    name: "The Pattern Interrupt Hook",
    description: "Break the viewer's expected visual or audio pattern so they pay attention.",
    example:
      "Starting in silence, cutting to an unexpected visual, or saying something that breaks the format the viewer anticipated.",
  },
];

const mistakes = [
  {
    title: "Starting with your name or intro",
    detail:
      "Nobody cares who you are yet. Hook them first, introduce yourself later — or not at all.",
  },
  {
    title: "Being too vague",
    detail:
      '"I have something exciting to share" tells the viewer nothing. Specificity is what creates curiosity.',
  },
  {
    title: "Burying the hook in the second sentence",
    detail:
      "The hook must be the very first thing. Not the second sentence. Not after the intro. First.",
  },
  {
    title: "Promising something you do not deliver",
    detail:
      "Clickbait hooks that lead nowhere destroy trust and hurt your long-term watch time.",
  },
  {
    title: "Using the same hook structure every time",
    detail:
      "Regular viewers start to pattern-match. Vary your hook types so the audience does not know what to expect.",
  },
  {
    title: "Writing the hook last",
    detail:
      "Write the hook first. The rest of the script should follow from it, not the other way round.",
  },
];

const faqs = [
  {
    q: "How long should a video hook be?",
    a: "On TikTok and Instagram Reels, aim for 2–3 seconds — one punchy opening line or visual. On YouTube, you have a little more room: 5–15 seconds. The rule is the same on every platform: get to the point before the viewer's thumb moves.",
  },
  {
    q: "Is a video hook the same as a thumbnail?",
    a: "They work together but they are different. The thumbnail gets the click. The hook keeps the viewer watching. Both need to be strong for a video to perform well.",
  },
  {
    q: "Can I use the same hook on different platforms?",
    a: "Sometimes, but platform context matters. A TikTok hook is usually spoken out loud. A LinkedIn video hook often uses text on screen since many viewers watch without sound. You will usually need to adapt the same idea to each platform's native format.",
  },
  {
    q: "How many hook options should I write per video?",
    a: "Write at least three variations before choosing. The first one you write is rarely the strongest. Forcing yourself to write more options usually reveals a sharper angle.",
  },
  {
    q: "Does Scribtly help write video hooks?",
    a: "Yes. Scribtly generates full video scripts that include a hook as the opening section, written in your saved client voice. You can also ask it to generate multiple hook variations for the same video idea.",
  },
  {
    q: "Why do my hooks keep getting ignored?",
    a: "Usually because they start with an intro or your name, are too vague, or do not create enough curiosity or tension. Read your opening line in isolation: does it make you want to keep watching? If not, rewrite it before anything else.",
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
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
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
              href="/signup"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try free
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:opacity-70">Blog</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>What Is a Video Hook?</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 border"
            style={{
              background: "rgba(224,120,48,0.08)",
              borderColor: "rgba(224,120,48,0.25)",
              color: "var(--accent)",
            }}
          >
            Glossary
          </div>
          <h1
            className="text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            What Is a Video Hook?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "680px" }}>
            A video hook is the opening line, image, or moment — usually the first 3 to 10 seconds
            — that decides whether a viewer keeps watching or scrolls away. It is the single most
            important part of any video script, whether you are making TikToks, YouTube videos,
            Instagram Reels, or video ads.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "680px" }}>
            Getting hooks right is the difference between a video that gets watched and one that
            gets skipped. This guide explains what hooks are, why they matter, the main types, and
            how to write them better — whether you are a freelance script writer, a content creator,
            or managing video content for clients.
          </p>
        </header>

        {/* Soft CTA */}
        <div
          className="rounded-2xl border p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Stop writing hooks from a blank page
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native scripts with hooks, body sections, and CTAs — in
              your client&apos;s saved voice. No blank page, no generic output.
            </p>
          </div>
          <Link
            href="/signup"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: "var(--accent)" }}
          >
            Try free — 5 scripts
          </Link>
        </div>

        <div className="prose-content" style={{ maxWidth: "720px" }}>
          {/* Section 1: Definition */}
          <section className="mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              The definition of a video hook
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              A video hook is the opening element of a video that captures a viewer&apos;s attention
              immediately. It creates enough curiosity, tension, or interest to make them want to
              keep watching instead of scrolling past.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Hooks can take many forms:
            </p>
            <ul className="space-y-2 mb-4 pl-1">
              {[
                "A provocative opening question",
                "A bold or counterintuitive statement",
                "A pattern interrupt — something unexpected",
                "A story that starts mid-scene",
                "A surprising statistic or fact",
                "A visual reveal with no words at all",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The hook is typically the first 3–10 seconds of a video, depending on the platform.
              On TikTok and Reels, you have closer to 2–3 seconds. On YouTube, you might have up to
              15–30 seconds before the viewer decides to click away.
            </p>
          </section>

          {/* Section 2: Why hooks matter */}
          <section className="mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Why video hooks matter
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Platform algorithms reward watch time and engagement. If viewers click away in the
              first few seconds, the algorithm stops distributing the video.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              The hook determines:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Whether the viewer keeps watching", sub: "The single most important factor" },
                { label: "Average view duration", sub: "The metric platforms prioritise" },
                { label: "Algorithmic distribution", sub: "More watch time = more reach" },
                { label: "Replays, shares, and saves", sub: "The signals that compound growth" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border p-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A great hook can make an average video perform well. A weak hook can make a great
              video invisible. For{" "}
              <Link
                href="/blog/ai-script-writer-for-freelancers"
                className="underline hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                freelance script writers
              </Link>{" "}
              producing content for clients, the hook is often the element that makes or breaks
              client satisfaction.
            </p>
          </section>

          {/* Section 3: Hook types */}
          <section className="mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              The 6 main types of video hooks
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Different hook structures work for different situations. Here are the six most
              effective types, each with a real example:
            </p>
            <div className="space-y-4">
              {hookTypes.map((type, i) => (
                <div
                  key={type.name}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-2xl font-bold shrink-0 leading-none mt-0.5"
                      style={{ color: "rgba(224,120,48,0.25)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="font-semibold text-base mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {type.name}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                        {type.description}
                      </p>
                      <div
                        className="rounded-lg px-4 py-3 text-sm italic border-l-2"
                        style={{
                          borderColor: "var(--accent)",
                          background: "rgba(224,120,48,0.05)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {type.example}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: How to write a hook */}
          <section className="mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              How to write a video hook — step by step
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Identify what the viewer wants most",
                  body: "What does your target viewer want to know, fix, avoid, or achieve? The strongest hooks speak directly to that desire or problem. If you do not know what your viewer wants, the hook cannot work.",
                },
                {
                  step: "02",
                  title: "Choose the right hook type for the platform",
                  body: "TikTok and Reels reward immediate spoken or visual hooks. YouTube supports slightly longer openers. LinkedIn videos often need text-on-screen hooks because many viewers watch without sound. Match the hook format to where it is going.",
                },
                {
                  step: "03",
                  title: "Write the hook first — before anything else",
                  body: "Most writers leave the hook until last. This is backwards. Write the hook first. The rest of the script should follow from it. If you cannot write a strong hook, the video idea might not be ready yet.",
                },
                {
                  step: "04",
                  title: "Make a promise — not a preamble",
                  body: 'Do not waste the hook on "Hey everyone, welcome back to my channel." Tell viewers what they are about to learn, see, or experience. Then deliver it. Every word before the promise is a word that loses viewers.',
                },
                {
                  step: "05",
                  title: "Write at least three hook options",
                  body: "The first hook you write is rarely the strongest. Write three to five variations for the same video. The one with the most tension or curiosity usually wins. Scribtly can generate multiple hook variations in seconds when you are working to a deadline.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-6 items-start">
                  <span
                    className="text-4xl font-bold shrink-0 leading-none"
                    style={{ color: "rgba(224,120,48,0.20)" }}
                  >
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Examples */}
          <section className="mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Hook rewrites — weak vs strong
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Seeing the difference between a weak and strong hook is often the fastest way to
              improve. Here are real-world examples across different creator niches.
            </p>
            <div className="space-y-5">
              {[
                {
                  label: "Freelance coach",
                  weak: "Today I want to talk about how I grew my freelance business.",
                  strong: "I went from zero clients to consistent £6k months in 11 months. No cold outreach, no LinkedIn DMs. Here's the exact system.",
                },
                {
                  label: "Fitness creator",
                  weak: "Here's a workout you can do at home.",
                  strong: "I trained for 90 days without a gym. Here's what actually changed — and what didn't.",
                },
                {
                  label: "SaaS product demo",
                  weak: "Let me show you our software today.",
                  strong: "Every hour your team spends copy-pasting between tools is an hour they're not closing deals. Here's how to fix that in five minutes.",
                },
                {
                  label: "Content creator tip",
                  weak: "I'm going to share some tips on growing your channel.",
                  strong: "This one change to my upload strategy added 40,000 subscribers in three months. It has nothing to do with posting more.",
                },
              ].map((ex) => (
                <div
                  key={ex.label}
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest"
                    style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
                  >
                    {ex.label}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: "var(--border)" }}>
                    <div className="p-5">
                      <p className="text-xs font-semibold mb-2 text-red-500 uppercase tracking-widest">Weak</p>
                      <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        &ldquo;{ex.weak}&rdquo;
                      </p>
                    </div>
                    <div className="p-5" style={{ background: "rgba(224,120,48,0.04)" }}>
                      <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "var(--accent)" }}>Strong</p>
                      <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-primary)" }}>
                        &ldquo;{ex.strong}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mid CTA */}
          <div
            className="rounded-2xl p-8 mb-12 text-center"
            style={{ background: "var(--dark)" }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              Writing scripts for clients?
            </p>
            <h3 className="text-2xl font-bold text-white mb-3">
              Generate hooks in your client&apos;s voice — not generic AI output
            </h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              Save your client&apos;s brand voice once. Scribtly writes hooks, intros, body sections,
              and CTAs in their style — across YouTube, TikTok, Reels, LinkedIn, and more.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — no card required
            </Link>
          </div>

          {/* Section 6: Where Scribtly fits */}
          <section className="mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              How Scribtly helps with video hooks
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Writing strong hooks from scratch for every video is time-consuming — especially when
              you are producing scripts for multiple clients or managing content across several
              platforms at once.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Scribtly is built for{" "}
              <Link
                href="/blog/ai-script-writer-for-freelancers"
                className="underline hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                freelance script writers
              </Link>
              ,{" "}
              <Link
                href="/blog/ai-script-writer-for-agencies"
                className="underline hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                content agencies
              </Link>
              , and creators who need to produce platform-native scripts faster without losing
              quality. It lets you save a client&apos;s brand voice, audience, tone, and key phrases
              once, then generate complete scripts — including the hook — in their style.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Instead of starting from a blank page or re-explaining the client&apos;s tone to
              ChatGPT every time, you get a first draft in seconds. The hook is already there —
              written in the client&apos;s voice, for the right platform. You edit it, improve it,
              or use it as a jumping-off point.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              You can also use Scribtly to generate multiple hook variations for the same video
              idea, so you always have options to test and choose from. See how Scribtly handles{" "}
              <Link
                href="/youtube-script-generator"
                className="underline hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                YouTube scripts
              </Link>
              ,{" "}
              <Link
                href="/tiktok-script-generator"
                className="underline hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                TikTok scripts
              </Link>
              , and{" "}
              <Link
                href="/instagram-reels-script-generator"
                className="underline hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                Instagram Reels scripts
              </Link>
              .
            </p>
          </section>

          {/* Section 7: Mistakes */}
          <section className="mb-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              6 common hook mistakes to avoid
            </h2>
            <div className="space-y-4">
              {mistakes.map((m, i) => (
                <div
                  key={m.title}
                  className="flex gap-4 items-start rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <span
                    className="text-lg font-bold shrink-0 w-7 leading-none mt-0.5"
                    style={{ color: "rgba(224,120,48,0.3)" }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                      {m.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {m.detail}
                    </p>
                  </div>
                </div>
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
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3
                    className="font-semibold text-sm mb-2"
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
          <section className="mb-12">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Related reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "What Is a Pattern Interrupt?", href: "/blog/what-is-a-pattern-interrupt" },
                { label: "What Is a Video CTA?", href: "/blog/what-is-a-video-cta" },
                { label: "What Is a UGC Script?", href: "/blog/what-is-a-ugc-script" },
                { label: "YouTube Script Generator", href: "/youtube-script-generator" },
                { label: "TikTok Script Generator", href: "/tiktok-script-generator" },
                { label: "AI Script Writer for Freelancers", href: "/blog/ai-script-writer-for-freelancers" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl border p-4 text-sm font-medium transition-all hover:opacity-70"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.04)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
              Ready to write better hooks faster?
            </p>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Generate your next script in under 60 seconds
            </h3>
            <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
              Scribtly writes platform-native scripts — hook, body, CTA — in your client&apos;s
              saved voice. Start free with five scripts, no card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Start free — 5 scripts included
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:opacity-70"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
              >
                Learn about Scribtly
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t mt-12" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
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

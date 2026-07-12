import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is a Video Hook? | Scribtly",
  description:
    "A video hook is the opening line that stops viewers scrolling. Learn the 6 types, how to write one, and see platform examples for TikTok, YouTube, and Reels.",
  openGraph: {
    title: "What Is a Video Hook?",
    description:
      "Learn what a video hook is, why it matters, and how to write one for TikTok, YouTube, Reels, and LinkedIn video.",
    type: "article",
    url: "https://scribtly.com/glossary/what-is-a-video-hook",
    siteName: "Scribtly",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is a Video Hook?",
    description:
      "The opening line that stops viewers scrolling. 6 types, platform examples, and a step-by-step writing guide.",
  },
  alternates: {
    canonical: "https://scribtly.com/glossary/what-is-a-video-hook",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is a Video Hook?",
    description:
      "A complete guide to video hooks: what they are, why they matter, 6 types with examples, and how to write one for TikTok, YouTube, Reels, and LinkedIn.",
    url: "https://scribtly.com/glossary/what-is-a-video-hook",
    publisher: {
      "@type": "Organization",
      name: "Scribtly",
      url: "https://scribtly.com",
    },
    datePublished: "2026-07-12",
    dateModified: "2026-07-12",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long should a video hook be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On TikTok and Reels: 1 to 3 seconds, usually one sentence. On YouTube: 5 to 15 seconds. On LinkedIn: 2 to 5 seconds, one focused statement.",
        },
      },
      {
        "@type": "Question",
        name: "Is the hook the same as the intro?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. An intro includes branding and context. A hook gets to the point immediately before the viewer has a reason to leave. Skip the intro and start with the hook.",
        },
      },
      {
        "@type": "Question",
        name: "Does every type of video need a hook?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Whether you are writing a tutorial, vlog, product demo, or podcast clip, every video needs a reason to keep watching in the first few seconds.",
        },
      },
      {
        "@type": "Question",
        name: "What makes a hook bad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A hook fails when it is vague, slow, self-focused, or when it promises something the video does not deliver. The most common mistake is starting with your name instead of going straight into the value.",
        },
      },
      {
        "@type": "Question",
        name: "Can AI write video hooks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, and effectively so when the AI knows the creator's voice, platform, and audience. Tools like Scribtly generate hooks as part of a full platform-native script.",
        },
      },
    ],
  },
  {
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
        name: "Glossary",
        item: "https://scribtly.com/glossary",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "What Is a Video Hook?",
        item: "https://scribtly.com/glossary/what-is-a-video-hook",
      },
    ],
  },
];

const hookTypes = [
  {
    name: "Bold Statement",
    description:
      "Make a strong, direct claim that challenges what the viewer already believes.",
    example:
      '"Most YouTube channels fail before they reach 1,000 subscribers — and it is not because of the algorithm."',
  },
  {
    name: "Question",
    description: "Ask something your target viewer is already thinking.",
    example:
      '"Are you still explaining your client\'s tone to ChatGPT every single project?"',
  },
  {
    name: "Story",
    description:
      "Start mid-action. Drop the viewer into the middle of something that already happened.",
    example:
      '"Last week a client asked me to rewrite an entire week of scripts because the tone was wrong. Here is what I did instead."',
  },
  {
    name: "Relatability",
    description:
      "Name a pain, frustration, or situation your viewer recognises immediately.",
    example:
      '"You open a blank document to write a script and just stare at it."',
  },
  {
    name: "How-To Promise",
    description:
      "Promise a specific, practical result the viewer will get from this video.",
    example:
      '"In the next 60 seconds I will show you the exact hook structure I use for every TikTok script I write for clients."',
  },
  {
    name: "Surprising Fact",
    description:
      "Open with a stat, fact, or statement that genuinely surprises your viewer.",
    example:
      '"A video with 100,000 views and 20% retention will reach fewer people than one with 1,000 views and 80% retention."',
  },
];

const faqs = [
  {
    q: "How long should a video hook be?",
    a: "On TikTok and Reels: 1 to 3 seconds, usually one sentence. On YouTube: 5 to 15 seconds. On LinkedIn: 2 to 5 seconds, one focused statement. The shorter the platform attention span, the shorter the hook.",
  },
  {
    q: "Is the hook the same as the intro?",
    a: "No. Most video intros include branding, music, and channel context. A hook is the opposite — it gets to the point before the viewer has a reason to leave. Skip the intro and start with the hook.",
  },
  {
    q: "Does every type of video need a hook?",
    a: "Yes. Whether you are writing a tutorial, a vlog, a product demo, a client testimonial, or a podcast clip, every video needs a reason to keep watching in the first few seconds.",
  },
  {
    q: "What makes a hook bad?",
    a: "A hook fails when it is vague, slow, self-focused, or when it promises something the video does not deliver. The most common mistake is starting with your name or a warm welcome instead of going straight into the value.",
  },
  {
    q: "How is a video hook different from a headline?",
    a: "They serve the same purpose in different media. A headline stops the scroll in text. A hook stops the scroll in video. The principles are the same: specificity, relevance, and a clear promise of value.",
  },
  {
    q: "Can AI write video hooks?",
    a: "Yes — and it can be surprisingly effective when the AI knows the creator's voice, platform, and audience. Tools like Scribtly generate hooks as part of a full platform-native script structure because the hook is not a separate step — it sets up everything else.",
  },
];

export default function WhatIsAVideoHookPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* JSON-LD */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}

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
              { label: "Glossary", href: "/glossary" },
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
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90 text-white"
            style={{ background: "var(--accent)" }}
          >
            Try free
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div
        className="border-b px-6 py-3"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight size={12} />
          <Link href="/glossary" className="hover:underline">Glossary</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--text-primary)" }}>What Is a Video Hook?</span>
        </div>
      </div>

      {/* Article */}
      <article className="px-6 py-16 max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-12">
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
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            What Is a Video Hook?
          </h1>
          <p className="text-xl leading-relaxed mb-8" style={{ color: "var(--text-muted)", maxWidth: "680px" }}>
            A video hook is the opening line, scene, or statement that grabs a viewer's
            attention in the first 1 to 3 seconds and gives them a reason to keep watching.
            It is the most important part of any video script — on TikTok, YouTube, Reels, or LinkedIn.
          </p>

          {/* Soft CTA */}
          <div
            className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                Already know what a hook is?
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Write platform-native hooks and full scripts in your client&apos;s voice in under 60 seconds.
              </p>
            </div>
            <Link
              href="/signup"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free
              <ArrowRight size={14} />
            </Link>
          </div>
        </header>

        {/* Section 1: Why hooks matter */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Why a video hook matters more than the rest of your script
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Every major platform — TikTok, Instagram, YouTube, LinkedIn — measures audience
            retention. When viewers click away in the first few seconds, the algorithm reads it
            as a signal that the content is not worth showing to more people. Your distribution
            lives or dies on that opening moment.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            On TikTok and Reels, the average viewer decides whether to keep watching within
            1 to 2 seconds. On YouTube, you have up to 15 seconds before most viewers commit —
            but you still need to earn their attention immediately.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            A weak hook means fewer viewers see your content, even if the rest of the video is
            excellent. A strong hook raises retention, which raises distribution, which brings
            more viewers to every future video you publish.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Stops the scroll",
                detail: "Creates a pattern interrupt that breaks the viewer's automatic swipe habit.",
              },
              {
                label: "Creates a reason to watch",
                detail: "Sets a promise, question, or tension the viewer wants resolved.",
              },
              {
                label: "Sets the tone",
                detail: "Tells the viewer exactly who this content is for and what they will get.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} style={{ color: "var(--accent)" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {item.label}
                  </p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Anatomy of a hook */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            The anatomy of an effective hook
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Most strong hooks combine one or more of these three elements:
          </p>
          <div className="flex flex-col gap-5">
            {[
              {
                title: "A pattern interrupt",
                body: "Something unexpected that breaks the viewer's scroll habit. A surprising visual, a bold statement, or an unusual camera angle. The brain pays attention to novelty before it pays attention to anything else.",
              },
              {
                title: "A clear promise or question",
                body: 'Tell the viewer what they will get by watching — or ask a question they want answered. "Here is why most people fail at X" works because it promises a specific insight. "Have you ever noticed that...?" works because it activates curiosity.',
              },
              {
                title: "Immediate relevance",
                body: "Speak to your specific audience from the first word. The more your hook sounds like it was written for one person, the more individual viewers will feel it was written for them. Generic hooks repel; specific hooks attract.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: 6 types of hooks */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            6 types of video hook
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            Every effective hook fits into one of these six categories. Understanding which type
            fits your video is the first step to writing a hook that works.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {hookTypes.map((hook, i) => (
              <div
                key={hook.name}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "var(--accent)" }}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className="text-base font-semibold leading-tight pt-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {hook.name} hook
                  </h3>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                  {hook.description}
                </p>
                <div
                  className="rounded-lg px-4 py-3 border text-sm italic leading-relaxed"
                  style={{
                    borderColor: "rgba(224,120,48,0.2)",
                    background: "rgba(224,120,48,0.05)",
                    color: "var(--text-primary)",
                  }}
                >
                  {hook.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Platform examples */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Hook examples by platform
          </h2>

          {[
            {
              platform: "TikTok and Instagram Reels",
              speed: "1–2 seconds",
              detail:
                "Viewers move fast. Your hook needs to land in under one second — one line, directly into the point, no warm-up. The visual and the audio hook should reinforce each other.",
              weak: '"Hey guys, today I am going to show you how to write scripts."',
              strong: '"This is the exact script structure that got my client 2 million views."',
              link: "/tiktok-script-generator",
              linkLabel: "Generate TikTok scripts",
            },
            {
              platform: "YouTube",
              speed: "5–15 seconds",
              detail:
                "You have slightly more time on YouTube but the opening still needs to earn attention immediately. Your thumbnail and title are part of the hook — the in-video hook confirms the click was worth it.",
              weak: '"Welcome back to my channel. Today we are going to be talking about script writing..."',
              strong: '"The reason your videos stop getting views after the first 100 subscribers — and exactly how to fix it."',
              link: "/youtube-script-generator",
              linkLabel: "Generate YouTube scripts",
            },
            {
              platform: "LinkedIn Video",
              speed: "2–5 seconds",
              detail:
                "LinkedIn audiences value professional insight. Start with a direct statement, a specific result, or a counterintuitive take on a topic your audience cares about.",
              weak: '"I want to share something I have been thinking about lately."',
              strong: '"We landed three new clients last month without running a single ad. Here is the script we used."',
              link: "/linkedin-video-script-generator",
              linkLabel: "Generate LinkedIn scripts",
            },
          ].map((item) => (
            <div
              key={item.platform}
              className="rounded-2xl border mb-5 overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="px-6 py-4 flex items-center justify-between border-b"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div>
                  <h3
                    className="text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.platform}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Decision window: {item.speed}
                  </p>
                </div>
                <Link
                  href={item.link}
                  className="text-xs font-semibold hidden sm:inline-flex items-center gap-1 hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  {item.linkLabel}
                  <ArrowRight size={11} />
                </Link>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                  {item.detail}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="rounded-lg border px-4 py-3"
                    style={{ borderColor: "var(--border)", background: "#fff4f4" }}
                  >
                    <p className="text-xs font-semibold mb-1.5" style={{ color: "#c0392b" }}>
                      Weak hook
                    </p>
                    <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {item.weak}
                    </p>
                  </div>
                  <div
                    className="rounded-lg border px-4 py-3"
                    style={{
                      borderColor: "rgba(224,120,48,0.3)",
                      background: "rgba(224,120,48,0.05)",
                    }}
                  >
                    <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--accent)" }}>
                      Strong hook
                    </p>
                    <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {item.strong}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Mid-page CTA */}
        <div
          className="rounded-2xl p-8 mb-14 text-center"
          style={{ background: "var(--dark)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(224,120,48,0.8)" }}>
            Write better hooks faster
          </p>
          <h2 className="text-2xl font-bold text-white mb-3">
            Generate hooks and full scripts in your client&apos;s voice
          </h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Save a client voice profile once. Scribtly generates platform-native scripts — hook,
            body, CTA — that sound like them, not like generic AI output.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free — no card required
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Section 5: How to write a hook */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            How to write a video hook in 5 steps
          </h2>

          <div className="flex flex-col gap-5">
            {[
              {
                num: "01",
                title: "Identify the one thing your viewer wants most",
                body: "What is the outcome, answer, or relief your viewer came for? Start there. Everything else in the hook should serve that one goal. If you cannot state it in one sentence, the hook will be too vague.",
              },
              {
                num: "02",
                title: "Write the ending of your script first",
                body: "Your hook is a promise. Write the ending of the video first so you know exactly what you are promising. A hook that promises something the video cannot deliver destroys retention.",
              },
              {
                num: "03",
                title: "Cut your original opening",
                body: "Most first drafts start too early. The real hook is usually the second or third sentence. Read your draft and delete everything before the point where it actually gets interesting. That cut material is your old intro — it was never needed.",
              },
              {
                num: "04",
                title: "Test with the scroll test",
                body: "Put your phone face-up. Read your hook out loud as if you are seeing it for the first time on TikTok. If your thumb moves to scroll, rewrite it. If you want to know what comes next, it is working.",
              },
              {
                num: "05",
                title: "Adapt the hook to the platform",
                body: "The same idea needs a different hook on TikTok versus YouTube versus LinkedIn. Tone, length, speed, and even the specific vocabulary differ. A 10-second YouTube hook becomes a one-liner on TikTok.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-xl border p-6 flex gap-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="text-3xl font-bold leading-none shrink-0 pt-1"
                  style={{ color: "rgba(224,120,48,0.25)" }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    className="text-base font-semibold mb-2"
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

        {/* Section 6: Common mistakes */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Common hook mistakes to avoid
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Starting with your name",
                body: "Nobody watching a scroll feed cares who you are yet. Earn their attention first. Your name can come after the hook.",
              },
              {
                title: "Being too vague",
                body: '"Here is something important about content marketing..." tells the viewer nothing specific. Specificity is what stops the scroll.',
              },
              {
                title: "A hook that does not match the video",
                body: "Clickbait hooks spike initial views but destroy retention. If your hook promises a specific outcome, the video must deliver it.",
              },
              {
                title: "Making the hook too long",
                body: "On short-form platforms, anything over 3 seconds is too slow. Even on YouTube, dragging the hook past 15 seconds loses most viewers.",
              },
              {
                title: "Writing for yourself, not your viewer",
                body: "The hook is not your introduction. It is an invitation to the viewer. Every word should serve them, not you.",
              },
              {
                title: "Using the same hook format every time",
                body: "Audiences notice patterns. If every video starts the same way, the format becomes invisible and stops interrupting the scroll.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Where Scribtly fits */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Where Scribtly helps with hooks
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Writing a great hook is the hardest part of scripting a video. Most script writers
            spend more time on the opening line than on any other section — and often rewrite it
            after finishing the rest.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Scribtly generates full scripts with built-in hooks for every platform. When you
            save a client&apos;s{" "}
            <Link href="/blog/client-voice-profile" className="underline" style={{ color: "var(--accent)" }}>
              voice profile
            </Link>{" "}
            — their tone, audience, phrases, and content style — the generated hooks reflect that
            specific creator, not generic AI language.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            For freelancers writing scripts for multiple clients, the ability to generate a
            platform-native hook without re-explaining the client&apos;s voice every time is the
            difference between a 30-minute job and a 10-minute one. The hook, body, and CTA
            are all generated together — not as separate steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              "YouTube hooks with retention-focused opening lines",
              "TikTok and Reels hooks built for 1-second decisions",
              "LinkedIn hooks that lead with specific professional insight",
            ].map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            See how it works:{" "}
            <Link href="/youtube-script-generator" className="underline" style={{ color: "var(--accent)" }}>
              YouTube script generator
            </Link>
            {" · "}
            <Link href="/tiktok-script-generator" className="underline" style={{ color: "var(--accent)" }}>
              TikTok script generator
            </Link>
            {" · "}
            <Link href="/instagram-reels-script-generator" className="underline" style={{ color: "var(--accent)" }}>
              Instagram Reels script generator
            </Link>
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-xl border overflow-hidden group"
                style={{ borderColor: "var(--border)" }}
              >
                <summary
                  className="px-6 py-4 cursor-pointer font-semibold text-sm flex items-center justify-between select-none list-none"
                  style={{
                    color: "var(--text-primary)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  {faq.q}
                  <ChevronRight
                    size={16}
                    className="shrink-0 transition-transform group-open:rotate-90"
                    style={{ color: "var(--text-muted)" }}
                  />
                </summary>
                <div
                  className="px-6 py-4 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)", background: "var(--bg-base)" }}
                >
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Internal link section */}
        <section className="mb-14">
          <h2
            className="text-xl font-bold mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            More from the Scribtly glossary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "What Is a Pattern Interrupt?", href: "/glossary/what-is-a-pattern-interrupt" },
              { label: "What Is a Client Voice Profile?", href: "/glossary/what-is-a-client-voice-profile" },
              { label: "What Is a Short-Form Video Script?", href: "/glossary/what-is-a-short-form-video-script" },
              { label: "What Is a Video CTA?", href: "/glossary/what-is-a-video-cta" },
              { label: "What Is B-Roll in a Script?", href: "/glossary/what-is-b-roll" },
              { label: "What Is a UGC Script?", href: "/glossary/what-is-a-ugc-script" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl border px-5 py-3.5 text-sm font-medium transition-all hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-subtle)",
                  color: "var(--text-primary)",
                }}
              >
                {link.label}
                <ArrowRight size={14} style={{ color: "var(--accent)" }} />
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="rounded-2xl p-10 text-center border"
          style={{ borderColor: "rgba(224,120,48,0.2)", background: "rgba(224,120,48,0.04)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
            Stop starting from scratch
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Write better hooks — and better scripts — in half the time
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            Scribtly generates platform-native scripts with hooks, body, and CTA already built
            in — for YouTube, TikTok, Reels, LinkedIn, podcasts, and video ads. Save a client
            voice profile once and reuse it for every script.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free, no card required
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              See how it works
            </Link>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t mt-8"
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
            {[
              { label: "Home", href: "/" },
              { label: "Pricing", href: "/pricing" },
              { label: "Blog", href: "/blog" },
              { label: "Glossary", href: "/glossary" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="hover:underline">
                {l.label}
              </Link>
            ))}
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

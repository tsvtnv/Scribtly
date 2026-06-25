import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, X, ArrowRight, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly vs ChatGPT for Script Writing",
  description: "Scribtly vs ChatGPT for video scripts. See which tool suits freelancers writing client scripts for YouTube, TikTok, and Reels — and when each one makes sense.",
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
        { "@type": "ListItem", position: 2, name: "Compare", item: "https://scribtly.com/compare" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Scribtly vs ChatGPT",
          item: "https://scribtly.com/compare/scribtly-vs-chatgpt",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can ChatGPT write video scripts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ChatGPT can write video scripts when you give it the right prompt. The challenge is that it has no memory of your client's brand voice between sessions, so you have to re-explain tone, style, and audience every time. It also does not have built-in structures for platform-specific scripts unless you prompt carefully.",
          },
        },
        {
          "@type": "Question",
          name: "What makes Scribtly different from ChatGPT for scripts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly is purpose-built for script writing workflows. The main difference is that you save a client's voice profile once — their tone, niche, audience, phrases, and style — and every script you generate automatically sounds like that client. You also get platform-native script structures for YouTube, TikTok, Reels, LinkedIn video, and more, without having to prompt-engineer each one.",
          },
        },
        {
          "@type": "Question",
          name: "Is Scribtly better than ChatGPT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For general tasks, ChatGPT is more flexible. For writing video scripts in a client's voice, at volume, across multiple platforms, Scribtly is faster and more consistent because the client context is already saved. Check current pricing and features on each platform before making a decision.",
          },
        },
        {
          "@type": "Question",
          name: "Does Scribtly replace ChatGPT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not entirely. Scribtly is focused on script generation and client voice management. ChatGPT is a broader tool that handles many tasks. Many freelancers use Scribtly for client scripts and ChatGPT for other general writing tasks.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use ChatGPT for client video scripts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can. The main friction is rebuilding the client context each session. You can partly solve this with Custom GPTs (ChatGPT Plus feature) or by keeping a saved prompt bank. Scribtly solves this by design — client profiles are a core part of the product, not a workaround.",
          },
        },
      ],
    },
  ],
};

const comparisonRows = [
  {
    feature: "Saved client voice profiles",
    scribtly: "yes",
    chatgpt: "partial",
    note: "ChatGPT requires Custom GPTs or saved prompts — not built into the core workflow",
  },
  {
    feature: "Platform-native script structure",
    scribtly: "yes",
    chatgpt: "partial",
    note: "ChatGPT can do this with detailed prompts, but Scribtly has it built in",
  },
  {
    feature: "Hook, intro, body, CTA blocks",
    scribtly: "yes",
    chatgpt: "partial",
    note: "ChatGPT can generate these sections if prompted to",
  },
  {
    feature: "Organise scripts by client",
    scribtly: "yes",
    chatgpt: "no",
    note: "ChatGPT uses conversations — no built-in client organisation",
  },
  {
    feature: "B-roll notes in scripts",
    scribtly: "yes",
    chatgpt: "partial",
    note: "Possible with the right prompt in ChatGPT",
  },
  {
    feature: "Caption and hashtag output",
    scribtly: "yes",
    chatgpt: "partial",
    note: "ChatGPT can generate these if you ask",
  },
  {
    feature: "General-purpose writing",
    scribtly: "no",
    chatgpt: "yes",
    note: "ChatGPT is better for tasks outside script writing",
  },
  {
    feature: "Scripts in under 60 seconds",
    scribtly: "yes",
    chatgpt: "yes",
    note: "Both can generate a script quickly once context is set",
  },
  {
    feature: "Context retained between sessions",
    scribtly: "yes",
    chatgpt: "partial",
    note: "ChatGPT memory helps but is not as structured as Scribtly's client profiles",
  },
];

function FeatureIcon({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes")
    return <CheckCircle size={20} style={{ color: "var(--accent)" }} className="shrink-0" />;
  if (value === "no")
    return <X size={20} className="shrink-0" style={{ color: "#DC2626" }} />;
  return <Minus size={20} className="shrink-0" style={{ color: "var(--text-muted)" }} />;
}

const faqs = [
  {
    q: "Can ChatGPT write video scripts?",
    a: "Yes. ChatGPT can write video scripts when you give it the right prompt. The challenge is that it has no memory of your client's brand voice between sessions, so you have to re-explain tone, style, and audience every time. It also does not have built-in structures for platform-specific scripts unless you prompt carefully.",
  },
  {
    q: "What makes Scribtly different from ChatGPT for scripts?",
    a: "Scribtly is purpose-built for script writing workflows. The main difference is that you save a client's voice profile once — their tone, niche, audience, phrases, and style — and every script you generate automatically sounds like that client. You also get platform-native script structures for YouTube, TikTok, Reels, LinkedIn video, and more, without having to prompt-engineer each one.",
  },
  {
    q: "Is Scribtly better than ChatGPT?",
    a: "For general tasks, ChatGPT is more flexible. For writing video scripts in a client's voice, at volume, across multiple platforms, Scribtly is faster and more consistent because the client context is already saved. Check current pricing and features on each platform before making a decision.",
  },
  {
    q: "Does Scribtly replace ChatGPT?",
    a: "Not entirely. Scribtly is focused on script generation and client voice management. ChatGPT is a broader tool that handles many tasks. Many freelancers use Scribtly for client scripts and ChatGPT for other general writing tasks.",
  },
  {
    q: "Can I use ChatGPT for client video scripts?",
    a: "You can. The main friction is rebuilding the client context each session. You can partly solve this with Custom GPTs (ChatGPT Plus feature) or by keeping a saved prompt bank. Scribtly solves this by design — client profiles are a core part of the product, not a workaround.",
  },
];

export default function ScribtlyVsChatGPTPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
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
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={120} height={30} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/compare"
              className="hidden md:block text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              All comparisons
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
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:underline">Compare</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Scribtly vs ChatGPT</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-12 pb-16 max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
          >
            Comparison
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly vs ChatGPT:{" "}
            <span style={{ color: "var(--accent)" }}>Which is better for video scripts?</span>
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)", maxWidth: "640px" }}>
            ChatGPT can write a script. So can Scribtly. The difference is what happens when you have ten clients, each with a different brand voice, and you need scripts every week without starting from scratch.
          </p>

          {/* Soft CTA */}
          <div
            className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4 rounded-2xl border"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Generate your next script in under 60 seconds — no prompt engineering needed.
            </p>
            <Link
              href="/signup"
              className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick summary */}
      <section
        className="px-6 py-16 border-t border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ChatGPT */}
            <div
              className="rounded-2xl border p-8"
              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: "#10A37F" }}
                >
                  AI
                </div>
                <div>
                  <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>ChatGPT</h2>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>by OpenAI</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                A powerful general-purpose AI assistant. Excellent for a wide range of writing tasks. Can write scripts well when prompted correctly — but has no built-in concept of client voice, script structure by platform, or content organisation.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Great for one-off scripts",
                  "Flexible for many tasks beyond scripts",
                  "Requires re-explaining client context each time",
                  "No built-in client or project organisation",
                  "Platform-specific structure needs manual prompting",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    {i < 2
                      ? <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#10A37F" }} />
                      : <Minus size={16} className="shrink-0 mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                    }
                    {point}
                  </div>
                ))}
              </div>
            </div>

            {/* Scribtly */}
            <div
              className="rounded-2xl border p-8"
              style={{ borderColor: "rgba(224,120,48,0.35)", background: "var(--bg-base)", boxShadow: "0 0 0 1px rgba(224,120,48,0.12)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Image src="/images/logo.png" alt="Scribtly" width={40} height={40} className="rounded-xl shrink-0" />
                <div>
                  <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Scribtly</h2>
                  <p className="text-xs" style={{ color: "var(--accent)" }}>Built for script writing</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                A script writing tool built specifically for freelancers, creators, and agencies. Save a client's brand voice once — tone, niche, audience, phrases — then generate platform-native scripts that sound like them, not like generic AI output.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Save client voice profiles once, use forever",
                  "Platform-native structure for YouTube, TikTok, Reels, LinkedIn",
                  "Hooks, body sections, CTAs, captions, B-roll notes built in",
                  "Scripts organised by client and platform",
                  "Generate in under 60 seconds without prompt engineering",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The core difference */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            The real difference
          </p>
          <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            General AI vs a script writing workflow
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            ChatGPT is built to answer any question and handle any task. That breadth is its strength — and the reason it falls short for client script work.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            When you write scripts for clients, you are not doing one-off tasks. You are writing in a specific voice, for a specific audience, in a specific format, week after week. Every time you open a new ChatGPT conversation, that context is gone. You either re-paste a long brief, use a Custom GPT you have to maintain, or accept that the output will drift from what your client sounds like.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Scribtly was built around that problem. Client profiles live inside the tool. You build them once — niche, tone, audience, word choices, things to avoid — and every script pulls from them automatically. The platform structure (hook, body, CTA, captions, hashtags, B-roll notes) is already there. You focus on the idea, not the setup.
          </p>
        </div>
      </section>

      {/* Workflow comparison */}
      <section
        className="px-6 py-20 border-t border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            What it looks like in practice
          </p>
          <h2 className="text-3xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
            Writing a client script with each tool
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ChatGPT workflow */}
            <div>
              <h3 className="font-bold text-base mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "#10A37F" }}
                >
                  AI
                </span>
                Using ChatGPT
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  "Open a new chat",
                  "Paste or retype the client brief (niche, tone, audience, style)",
                  "Describe the platform and script format you need",
                  "Write the hook structure in the prompt",
                  "Ask for a CTA in the client's tone",
                  "Review and prompt again if it sounds too generic",
                  "Copy the script out manually",
                  "Save it somewhere yourself",
                  "Repeat all of the above next week",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scribtly workflow */}
            <div>
              <h3 className="font-bold text-base mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  S
                </span>
                Using Scribtly
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  "Select the client (voice profile already saved)",
                  "Choose the platform (YouTube, TikTok, Reels, etc.)",
                  "Enter the video idea or topic",
                  "Generate — script with hook, body, CTA, captions, and B-roll notes appears",
                  "Script is saved to that client's workspace automatically",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step}</p>
                  </div>
                ))}
                <div className="mt-2 px-4 py-3 rounded-xl border text-sm font-medium" style={{ borderColor: "rgba(224,120,48,0.3)", color: "var(--accent)", background: "rgba(224,120,48,0.06)" }}>
                  Total time: under 60 seconds, every time
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
          Feature by feature
        </p>
        <h2 className="text-3xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
          How they compare for script writing
        </h2>

        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_100px_100px] gap-4 px-6 py-4 text-xs font-semibold uppercase tracking-wide border-b"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-muted)" }}
          >
            <span>Feature</span>
            <span className="text-center">Scribtly</span>
            <span className="text-center">ChatGPT</span>
          </div>

          {comparisonRows.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1fr_100px_100px] gap-4 px-6 py-4 border-b items-center"
              style={{
                borderColor: "var(--border)",
                background: i % 2 === 0 ? "var(--bg-base)" : "var(--bg-subtle)",
              }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{row.feature}</p>
                {row.note && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{row.note}</p>
                )}
              </div>
              <div className="flex justify-center">
                <FeatureIcon value={row.scribtly as "yes" | "no" | "partial"} />
              </div>
              <div className="flex justify-center">
                <FeatureIcon value={row.chatgpt as "yes" | "no" | "partial"} />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} style={{ color: "var(--accent)" }} />
            <span>Supported</span>
          </div>
          <div className="flex items-center gap-2">
            <Minus size={14} style={{ color: "var(--text-muted)" }} />
            <span>Partial / possible with extra steps</span>
          </div>
          <div className="flex items-center gap-2">
            <X size={14} style={{ color: "#DC2626" }} />
            <span>Not supported</span>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section
        className="px-6 py-16 border-t border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Stop re-explaining your client's voice to ChatGPT every session
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Save their profile once in Scribtly. Generate platform-native scripts that sound like them — every time, in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — 5 scripts included
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              See how Scribtly works
            </Link>
          </div>
        </div>
      </section>

      {/* When each tool makes sense */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              When ChatGPT makes more sense
            </h2>
            <div className="flex flex-col gap-4">
              {[
                "You only write scripts occasionally and do not need a consistent client voice",
                "You already have a well-built Custom GPT for your client and do not want to switch",
                "You need AI for many different tasks beyond script writing",
                "You are writing scripts for yourself with no recurring client work",
                "You prefer a highly customisable prompt workflow you control manually",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#10A37F" }} />
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              When Scribtly makes more sense
            </h2>
            <div className="flex flex-col gap-4">
              {[
                "You write scripts for multiple clients and need consistent brand voice across all of them",
                "You are tired of re-explaining client tone and style every time you open a new chat",
                "You need platform-specific structures — hooks, body, CTA, B-roll notes, captions — without manual prompting",
                "You want scripts organised by client, not buried in conversation history",
                "You need to produce scripts faster without sacrificing quality",
                "You manage a content team or agency producing scripts at volume",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internal links section */}
      <section
        className="px-6 py-16 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Explore Scribtly
          </p>
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
            See what Scribtly can do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "YouTube Script Generator", href: "/youtube-script-generator", desc: "Platform-native scripts with hooks, B-roll notes, and CTAs" },
              { label: "TikTok Script Generator", href: "/tiktok-script-generator", desc: "Short-form scripts built for TikTok's format and pacing" },
              { label: "Instagram Reels Scripts", href: "/reels-script-generator", desc: "Reels scripts with hook, content body, and caption" },
              { label: "For Freelancers", href: "/for-freelancers", desc: "Write faster for every client without working more hours" },
              { label: "For Agencies", href: "/for-agencies", desc: "Scale script production across multiple clients from one workspace" },
              { label: "Video Script Template", href: "/templates/video-script-template", desc: "A free template to structure any video script" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border p-5 block transition-all hover:border-current"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--accent)" }}>{link.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
          FAQs
        </p>
        <h2 className="text-3xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
          Common questions about Scribtly vs ChatGPT
        </h2>

        <div className="flex flex-col gap-6 max-w-3xl">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">
            Ready to write client scripts without the setup every time?
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Try Scribtly free. Save your first client profile, generate a platform-native script, and see the difference in under five minutes. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free — 5 scripts included
            <ArrowRight size={16} />
          </Link>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No credit card. No commitment.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/compare" className="hover:underline">Compare</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/signup" className="hover:underline" style={{ color: "var(--accent)" }}>Start free</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

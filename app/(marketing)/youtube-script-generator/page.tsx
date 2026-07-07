import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  FileText,
  Mic,
  PlayCircle,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Script Generator — Scribtly",
  description:
    "Generate complete YouTube video scripts in under 60 seconds. Save your client's voice once and create scripts that sound authentic every time.",
  alternates: {
    canonical: "https://scribtly.com/youtube-script-generator",
  },
  openGraph: {
    title: "YouTube Script Generator — Scribtly",
    description:
      "Generate complete YouTube video scripts in under 60 seconds. Save your client's voice once and create scripts that sound authentic every time.",
    url: "https://scribtly.com/youtube-script-generator",
    siteName: "Scribtly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Script Generator — Scribtly",
    description:
      "Generate complete YouTube video scripts in under 60 seconds. Save your client's voice once and create scripts that sound authentic every time.",
  },
};

const scriptSections = [
  {
    label: "Hook",
    tag: "0–30 seconds",
    desc: "A sharp opening line or question that stops the scroll and makes the viewer stay.",
  },
  {
    label: "Intro",
    tag: "30–90 seconds",
    desc: "Establishes who the video is for and what they will gain by watching to the end.",
  },
  {
    label: "Body",
    tag: "Main content",
    desc: "Structured sections covering each point, tip, or step — with natural transitions.",
  },
  {
    label: "B-Roll Notes",
    tag: "Optional",
    desc: "Suggested visuals and cutaway ideas matched to each section of the script.",
  },
  {
    label: "CTA",
    tag: "Final 30 seconds",
    desc: "A clear, low-friction call to action that fits the channel's goals.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "First draft in under 60 seconds",
    body: "Enter your topic, select the tone, and Scribtly returns a complete, structured YouTube script before you have finished your coffee.",
  },
  {
    icon: FileText,
    title: "Saved client voice profiles",
    body: "Store your client's niche, audience, tone, and phrases once. Every script you generate uses that saved profile — no more re-explaining the brief from scratch.",
  },
  {
    icon: Mic,
    title: "Platform-native structure",
    body: "Scribtly builds scripts the way YouTube actually works: hook, intro, body, B-roll notes, and CTA — not a generic document that happens to be about video.",
  },
  {
    icon: PlayCircle,
    title: "Long-form and YouTube Shorts",
    body: "Generate full long-form scripts or tight 60-second shorts. The structure adapts to the format automatically.",
  },
];

const steps = [
  {
    num: "01",
    title: "Save your client's voice profile",
    body: "Add the client's niche, audience, preferred tone, key phrases, and any topics to avoid. You only do this once — Scribtly remembers it for every future script.",
  },
  {
    num: "02",
    title: "Describe the video topic",
    body: "Type a one-line idea, a full brief, or paste a set of talking points. Scribtly uses the saved voice profile alongside your input to generate the script.",
  },
  {
    num: "03",
    title: "Generate and review",
    body: "Scribtly returns a complete YouTube script with hook, structured body sections, B-roll notes, and a CTA. Edit inline, save it to the client's workspace, or export it.",
  },
];

const faqs = [
  {
    q: "Is Scribtly a free YouTube script generator?",
    a: "Scribtly offers a free plan that includes a set number of generated scripts each month. You can try the YouTube script generator without entering card details.",
  },
  {
    q: "Can I save my client's voice so every script sounds consistent?",
    a: "Yes. Scribtly's client voice profiles let you store a client's tone, niche, audience, preferred phrases, and style guidelines. Every script you generate for that client draws from the saved profile automatically.",
  },
  {
    q: "What does a Scribtly YouTube script include?",
    a: "A Scribtly YouTube script includes a hook, a structured intro, a body broken into logical sections, optional B-roll suggestions, and a closing CTA. The structure follows proven YouTube retention patterns rather than generic writing templates.",
  },
  {
    q: "How is Scribtly different from pasting a prompt into ChatGPT?",
    a: "ChatGPT produces a one-off result based on your prompt. Every time you need a new script, you must re-explain the client's tone, audience, style, and guidelines. Scribtly saves all of that once in a voice profile and applies it automatically — making it significantly faster for recurring client work.",
  },
  {
    q: "Can I generate YouTube Shorts scripts as well as long-form videos?",
    a: "Yes. Scribtly adapts the script structure to the chosen format. For YouTube Shorts, the output is a tight 60-second script with a strong hook and a single clear point. For long-form videos, it generates a full multi-section script with transitions and B-roll notes.",
  },
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Scribtly",
          item: "https://scribtly.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "YouTube Script Generator",
          item: "https://scribtly.com/youtube-script-generator",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Scribtly YouTube Script Generator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Generate platform-native YouTube video scripts in under 60 seconds. Save client voice profiles once and create consistent, authentic scripts for every video.",
      url: "https://scribtly.com/youtube-script-generator",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
        description: "Free plan available",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function YouTubeScriptGeneratorPage() {
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
              { label: "YouTube Shorts", href: "/youtube-shorts-script-generator" },
              { label: "TikTok Scripts", href: "/tiktok-script-generator" },
              { label: "Reels Scripts", href: "/instagram-reels-script-generator" },
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

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <nav
            className="flex items-center gap-2 text-xs mb-8"
            aria-label="Breadcrumb"
            style={{ color: "var(--text-muted)" }}
          >
            <Link href="/" className="hover:underline">
              Scribtly
            </Link>
            <span>/</span>
            <span>YouTube Script Generator</span>
          </nav>

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{
              background: "rgba(224,120,48,0.08)",
              borderColor: "rgba(224,120,48,0.25)",
              color: "var(--accent)",
            }}
          >
            <PlayCircle size={12} />
            Platform-native YouTube scripts
          </div>

          <h1
            className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            YouTube Script Generator
          </h1>

          <p
            className="text-xl leading-relaxed mb-4"
            style={{ color: "var(--text-muted)", maxWidth: "600px" }}
          >
            Generate a complete YouTube video script — hook, body, B-roll notes, and CTA — in under
            60 seconds. Save your client&apos;s voice once and every script sounds like them, not
            like generic AI output.
          </p>

          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: "var(--text-muted)", maxWidth: "600px" }}
          >
            Built for freelance script writers, content creators, social media managers, and agencies
            who produce video content for clients.
          </p>

          {/* Soft CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Generate your first script free
              <ArrowRight size={16} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              See how it works
              <ChevronDown size={16} />
            </a>
          </div>

          <p className="mt-4 text-xs" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
            Free plan available. No credit card required.
          </p>
        </div>
      </section>

      {/* Trust signals */}
      <section
        className="px-6 py-5 border-y"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {[
            "Full script structure in every output",
            "Saved client voice profiles",
            "Hook + body + B-roll + CTA",
            "YouTube Shorts and long-form",
            "No blank page",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              <CheckCircle size={14} style={{ color: "var(--accent)" }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            The problem
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Writing YouTube scripts for clients is slow without the right system
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Most script writers either stare at a blank page, paste a rough prompt into ChatGPT and
            spend 40 minutes editing the result, or re-explain the client&apos;s tone and audience
            every single time. None of that scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              problem: "Re-explaining the brief",
              detail:
                "Every time you open ChatGPT, you type out the client's niche, audience, preferred tone, and phrases from scratch. It wastes 10–15 minutes before you write a single word.",
            },
            {
              problem: "Generic output that needs heavy editing",
              detail:
                "A generic AI tool produces a generic script. You spend more time editing the AI's output than you would have spent writing the script yourself.",
            },
            {
              problem: "No YouTube-specific structure",
              detail:
                "A YouTube script is not a blog post formatted as a script. It needs a hook that holds attention, a clear flow, B-roll cues, and a CTA that fits the channel.",
            },
          ].map((item) => (
            <div
              key={item.problem}
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p
                className="font-semibold text-base mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {item.problem}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section
        className="px-6 py-24 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              What Scribtly does differently
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              A YouTube script generator built for client work
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              Not a generic writing tool. Not a chat interface. Scribtly is built specifically for
              producing platform-native video scripts for real clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border p-8 flex gap-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(224,120,48,0.12)" }}
                >
                  <b.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {b.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              How it works
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Three steps to a client-ready YouTube script
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              No long setup. No prompt engineering. Just describe the video, choose the client, and
              generate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border p-8"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="text-5xl font-bold mb-5 leading-none"
                  style={{ color: "rgba(224,120,48,0.20)" }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-semibold text-base mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Middle CTA */}
      <section
        className="px-6 py-16 border-y"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Generate your next client YouTube script in under 60 seconds
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--text-muted)" }}>
            Stop starting from a blank page. Save your client&apos;s voice once and Scribtly handles
            the rest.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free — no card required
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Script Structure Breakdown */}
      <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                Script structure
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                What a Scribtly YouTube script actually includes
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                Every generated script follows a structure proven to hold audience attention on
                YouTube — not a generic AI document reformatted as a script.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Hook written to stop the viewer scrolling away in the first 30 seconds",
                  "Clear intro that sets up what the viewer will get from the video",
                  "Body sections with logical flow and natural spoken-word transitions",
                  "B-roll notes to help editors know what visuals to cut to",
                  "Closing CTA matched to the channel&apos;s goal — subscribe, click, comment",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--accent)" }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Script Structure Visual */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              {/* Fake browser bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div
                  className="ml-3 flex-1 max-w-xs h-5 rounded-md flex items-center px-3 text-xs"
                  style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}
                >
                  scribtly.com — YouTube Script
                </div>
              </div>
              {/* Script sections */}
              <div className="p-6 flex flex-col gap-3" style={{ background: "var(--bg-base)" }}>
                {scriptSections.map((section, i) => (
                  <div
                    key={section.label}
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: i === 0 ? "rgba(224,120,48,0.4)" : "var(--border)",
                      background: i === 0 ? "rgba(224,120,48,0.06)" : "var(--bg-subtle)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: i === 0 ? "var(--accent)" : "var(--text-primary)" }}
                      >
                        {section.label}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(224,120,48,0.10)",
                          color: "var(--accent)",
                          fontWeight: 600,
                        }}
                      >
                        {section.tag}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {section.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section
        className="px-6 py-24 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Common mistakes
            </p>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What to avoid when writing YouTube scripts
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              These are the patterns that cause viewers to click away — and the reasons most
              AI-generated scripts need heavy editing before they are usable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                mistake: "Starting with 'In this video, I will...'",
                fix: "Lead with a hook that creates immediate curiosity or frames a problem the viewer wants solved. Earn the intro.",
              },
              {
                mistake: "Writing for reading, not speaking",
                fix: "YouTube scripts are spoken aloud. Use short sentences, contractions, and natural rhythm. Read it out loud before you send it.",
              },
              {
                mistake: "No clear structure",
                fix: "A YouTube video without section transitions loses viewers. Each section should have a clear purpose and a bridge to the next.",
              },
              {
                mistake: "A CTA that sounds like an advert",
                fix: "The best YouTube CTAs feel like a natural next step for the viewer, not a sales close. Keep them short, specific, and earned.",
              },
              {
                mistake: "Ignoring the thumbnail and title",
                fix: "The script hook should align with what the thumbnail and title promise. If the viewer clicks expecting X, deliver X in the first 30 seconds.",
              },
              {
                mistake: "Forgetting B-roll",
                fix: "A talking head for 10 minutes loses retention quickly. Note where cutaway footage, screen recordings, or text overlays would help keep the viewer engaged.",
              },
            ].map((item) => (
              <div
                key={item.mistake}
                className="rounded-2xl border p-7"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  ✕ {item.mistake}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Other script generators in Scribtly
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native scripts for every major video format.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "YouTube Shorts", href: "/youtube-shorts-script-generator" },
              { label: "TikTok Scripts", href: "/tiktok-script-generator" },
              { label: "Instagram Reels", href: "/instagram-reels-script-generator" },
              { label: "LinkedIn Video", href: "/linkedin-video-script-generator" },
              { label: "Podcast Scripts", href: "/podcast-script-generator" },
              { label: "Video Ad Scripts", href: "/video-ad-script-generator" },
              { label: "For Freelancers", href: "/for-freelancers" },
              { label: "For Agencies", href: "/for-agencies" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border px-4 py-3 text-sm font-medium text-center transition-all hover:opacity-70"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-subtle)",
                  color: "var(--text-muted)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-6 py-24 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              FAQ
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently asked questions
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border p-7"
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

      {/* Final CTA */}
      <section
        className="px-6 py-28"
        style={{ background: "var(--dark)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white leading-tight">
            Stop starting YouTube scripts from a blank page
          </h2>
          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Save your client&apos;s voice once. Generate complete, platform-native YouTube scripts in
            under 60 seconds. Try Scribtly free — no credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Create your first YouTube script free
            <ArrowRight size={16} />
          </Link>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Free plan available. No commitment. Cancel any time.
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
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/for-freelancers" className="hover:underline">
              For Freelancers
            </Link>
            <Link href="/for-agencies" className="hover:underline">
              For Agencies
            </Link>
            <Link href="/pricing" className="hover:underline">
              Pricing
            </Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

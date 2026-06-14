import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Clock,
  Bot,
  Mic,
  LayoutTemplate,
  Target,
  Repeat,
  BookOpen,
  User,
} from "lucide-react";

export const metadata = {
  title: "AI script writer for personal brands — Scribtly",
  description:
    "Scribtly helps personal brands create video scripts that sound like you, every time. Save your voice once, generate YouTube, TikTok, and Reels scripts in under 60 seconds.",
  keywords: [
    "AI script writer for personal brands",
    "personal brand video script generator",
    "video scripts for personal brand",
    "personal brand content script tool",
    "AI script writer content creator",
    "personal brand YouTube script",
    "video script generator for creators",
  ],
  alternates: { canonical: "/for-personal-brands" },
  openGraph: {
    type: "website",
    url: "/for-personal-brands",
    siteName: "Scribtly",
    title: "AI script writer for personal brands · Scribtly",
    description:
      "Save your voice, niche, and audience once. Generate YouTube, TikTok, and Reels scripts that sound like you — not generic AI — in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for personal brands" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI script writer for personal brands · Scribtly",
    description:
      "Save your voice, niche, and audience once. Generate YouTube, TikTok, and Reels scripts that sound like you — not generic AI — in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For Personal Brands", item: `${SITE_URL}/for-personal-brands` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Scribtly capture my personal brand voice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you create your brand profile, you describe your niche, audience, tone, key phrases, and the topics you cover. Scribtly uses that profile every time you generate a script — so every output reflects your voice, not a generic AI template.",
      },
    },
    {
      "@type": "Question",
      name: "What platforms does Scribtly support for personal brands?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube (long-form and Shorts), TikTok (15–60 seconds), Instagram Reels (15–60 seconds), LinkedIn video, and podcast scripts. Each platform gets a script built for its own structure, pacing, and audience behaviour.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Scribtly if I create content across multiple platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Save your brand profile once and generate platform-native scripts for any channel. Each platform gets its own structure — the same topic generates a different script for TikTok versus YouTube versus Reels.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from using ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT requires you to re-explain your niche, tone, and audience every session. Scribtly saves your brand profile permanently. You also get platform-native script structure out of the box — hook, body, CTA, captions, and hashtags — without building custom prompts each time.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — 5 scripts free, no credit card required. Enough to test it across a few platforms and topics before deciding.",
      },
    },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "Your voice", label: "not generic AI" },
  { value: "Every platform", label: "YouTube to TikTok" },
];

const steps = [
  {
    n: "1",
    title: "Set up your brand profile",
    desc: "Add your niche, audience, tone, key phrases, and content style. Takes 5 minutes. Scribtly uses this every time you generate — so every script sounds like you.",
  },
  {
    n: "2",
    title: "Drop the topic or idea",
    desc: "Describe what you want to cover. Scribtly turns it into a fully structured script with hook, body, and CTA — tailored to your platform and voice.",
  },
  {
    n: "3",
    title: "Film it. Post it. Grow.",
    desc: "A complete, on-brand script in under 60 seconds. Refine it if you want to, or film it as-is. Your brand voice is already baked in.",
  },
];

const pains = [
  {
    icon: Clock,
    title: "You never have enough time to create consistently",
    desc: "Building a personal brand means showing up regularly — but writing from scratch every week competes with everything else. Scribtly cuts script time to under 60 seconds so consistency stops being a struggle.",
  },
  {
    icon: Bot,
    title: "Generic AI sounds nothing like you",
    desc: "Plain ChatGPT output doesn't reflect your voice, niche, or audience. Scribtly generates from your saved brand profile — tone, phrases, and positioning baked in from the start.",
  },
  {
    icon: Repeat,
    title: "Re-explaining yourself every single time",
    desc: "Starting a new chat, pasting your bio, describing your audience again. Scribtly saves all of that permanently so you never re-explain yourself to an AI again.",
  },
];

const features = [
  {
    icon: User,
    title: "Your brand voice, saved permanently",
    desc: "Build your profile once — niche, tone, audience, key phrases. Every script Scribtly generates pulls from that profile automatically.",
  },
  {
    icon: LayoutTemplate,
    title: "Platform-native structure",
    desc: "YouTube, TikTok, Reels, LinkedIn — each platform gets scripts built for its own format, hook style, and pacing. No reformatting by hand.",
  },
  {
    icon: Target,
    title: "Hooks written for your audience",
    desc: "Every script opens with a hook designed for your specific audience and niche — not a recycled opener that could belong to anyone.",
  },
  {
    icon: BookOpen,
    title: "Organised script library",
    desc: "Every script you generate is saved and searchable. Build a content library over time that's easy to reference, repurpose, and grow.",
  },
];

const befores = [
  "Blank page every time you want to post",
  "Generic AI scripts that sound nothing like you",
  "Re-briefing ChatGPT with your niche and audience every session",
  "Scripts scattered across notes apps and chat logs",
  "Posting inconsistently because writing takes too long",
];

const afters = [
  "Script ready in 60 seconds from your saved profile",
  "Every script sounds like you — not a generic template",
  "Your voice, niche, and audience saved permanently",
  "Growing content library organised by platform and topic",
  "Consistent posting schedule without the grind",
];

const faqs = [
  {
    q: "How does Scribtly capture my personal brand voice?",
    a: "When you create your brand profile, you describe your niche, audience, tone, key phrases, and the topics you cover. Scribtly uses that profile every time you generate a script — so every output reflects your voice, not a generic AI template.",
  },
  {
    q: "What platforms does Scribtly support for personal brands?",
    a: "YouTube (long-form and Shorts), TikTok (15–60 seconds), Instagram Reels (15–60 seconds), LinkedIn video, and podcast scripts. Each platform gets a script built for its own structure, pacing, and audience behaviour.",
  },
  {
    q: "Can I use Scribtly if I create content across multiple platforms?",
    a: "Yes. Save your brand profile once and generate platform-native scripts for any channel. Each platform gets its own structure — the same topic generates a different script for TikTok versus YouTube versus Reels.",
  },
  {
    q: "How is this different from using ChatGPT?",
    a: "ChatGPT requires you to re-explain your niche, tone, and audience every session. Scribtly saves your brand profile permanently. You also get platform-native script structure out of the box — hook, body, CTA, captions, and hashtags — without building custom prompts each time.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — 5 scripts free, no credit card required. Enough to test it across a few platforms and topics before deciding.",
  },
];

export default function ForPersonalBrandsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%),linear-gradient(315deg,rgba(56,193,114,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            For Personal Brands
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Video scripts that sound like you.<br className="hidden md:block" /> Every time.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly is built for personal brands who need to show up consistently on video without spending hours writing. Save your niche, tone, and audience once. Generate on-brand scripts for YouTube, TikTok, Reels, and LinkedIn in under 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Start free · 5 scripts <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">See pricing</Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-sm backdrop-blur"
              >
                <span className="font-semibold text-primary">{s.value}</span>
                <span className="text-text-secondary dark:text-dark-muted">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 mx-auto max-w-3xl px-2">
            <Image
              src="/hero-freelancers.png"
              alt="Scribtly AI script writer for personal brands"
              width={1200}
              height={630}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] border border-[var(--color-border)]"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          From idea to on-brand script in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No blank page. No generic output. No re-explaining who you are to an AI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-7 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30" />
          {steps.map((s) => (
            <div key={s.n} className="text-center group">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary/30 bg-[var(--color-primary-tint)] text-primary font-bold text-lg mb-4 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 mx-auto">
                {s.n}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Try it free — no card required
            </Button>
          </Link>
        </div>
      </section>

      {/* ── PAINS + FEATURES ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Three things that slow personal brands down. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are the real friction points for personal brand content. Scribtly removes all three.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {pains.map((p) => (
              <Card
                key={p.title}
                className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <p.icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted">{p.desc}</p>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group flex items-start gap-4 hover:border-primary/40 transition-all duration-200"
              >
                <f.icon size={18} className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Before and after Scribtly
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Same personal brand, same content goals — completely different experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-5">
              Without Scribtly
            </div>
            <ul className="space-y-3">
              {befores.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm">
                  <div className="w-4 h-4 rounded-full bg-danger/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-danger text-[10px] font-bold">✕</span>
                  </div>
                  <span className="text-text-secondary dark:text-dark-muted">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-hair border-primary/30 bg-[var(--color-primary-tint)] p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-5">
              With Scribtly
            </div>
            <ul className="space-y-3">
              {afters.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm">
                  <Check size={14} className="text-primary shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-5 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-center mb-3">
            Scripts built for every platform you post on
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-8 max-w-lg mx-auto">
            One brand profile, every platform. Each script gets built for the channel it lives on.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: "/youtube-scripts", label: "YouTube scripts" },
              { href: "/youtube-shorts-scripts", label: "YouTube Shorts scripts" },
              { href: "/tiktok-scripts", label: "TikTok scripts" },
              { href: "/instagram-reels-scripts", label: "Instagram Reels scripts" },
              { href: "/linkedin-video-scripts", label: "LinkedIn video scripts" },
              { href: "/podcast-scripts", label: "Podcast scripts" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {link.label}
                <ArrowRight size={13} className="shrink-0 text-text-secondary dark:text-dark-muted" />
              </Link>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link href="/ai-script-writer" className="text-sm text-primary hover:underline">
              Learn more about the Scribtly AI script writer →
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Questions from personal brand creators
        </h2>
        <div className="divide-y divide-[var(--color-border)]">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <p className="text-sm text-text-secondary dark:text-dark-muted">
            See how Scribtly compares to other tools:{" "}
            <Link href="/alternatives/chatgpt-for-scripts" className="text-primary hover:underline">
              Scribtly vs ChatGPT
            </Link>
            {" · "}
            <Link href="/alternatives/jasper" className="text-primary hover:underline">
              Scribtly vs Jasper
            </Link>
            {" · "}
            <Link href="/best-ai-script-writers" className="text-primary hover:underline">
              Best AI script writers
            </Link>
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted mt-3">
            More use cases:{" "}
            <Link href="/for-content-creators" className="text-primary hover:underline">
              For content creators
            </Link>
            {" · "}
            <Link href="/for-freelancers" className="text-primary hover:underline">
              For freelancers
            </Link>
            {" · "}
            <Link href="/for-coaches" className="text-primary hover:underline">
              For coaches
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl mt-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your voice. 60 seconds. Every platform.
          </h2>
          <p className="text-white/75 mb-8">
            No credit card. No commitment. See how fast you can create content that sounds like you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                Start free · 5 scripts <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-white/10 text-white border-hair border-white/30 hover:bg-white/20">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

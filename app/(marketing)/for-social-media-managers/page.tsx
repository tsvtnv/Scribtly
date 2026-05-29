import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Repeat,
  Users,
  Zap,
  FileText,
  Shield,
} from "lucide-react";

export const metadata = {
  title: "Script writing tool for social media managers — Scribtly",
  description:
    "Scribtly helps social media managers write video scripts for multiple brand accounts faster. Save each brand's voice, generate platform-native scripts in 60 seconds.",
  keywords: [
    "script writing tool for social media managers",
    "AI script writer social media",
    "social media video script generator",
    "video scripts for social media managers",
    "script writing software social media",
    "AI tools for social media managers",
    "short form video script tool",
  ],
  alternates: { canonical: "/for-social-media-managers" },
  openGraph: {
    type: "website",
    url: "/for-social-media-managers",
    siteName: "Scribtly",
    title: "Script writing tool for social media managers · Scribtly",
    description:
      "Manage multiple brand accounts without losing track of each one's voice. Generate platform-native scripts in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for social media managers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Script writing tool for social media managers · Scribtly",
    description:
      "Manage multiple brand accounts without losing track of each one's voice. Generate platform-native scripts in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "For Social Media Managers",
      item: `${SITE_URL}/for-social-media-managers`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many brand accounts can I manage in Scribtly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As many as you need. Save a separate voice profile for each brand or client account and switch between them instantly — no re-briefing required.",
      },
    },
    {
      "@type": "Question",
      name: "What platforms does Scribtly support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube (long-form and Shorts), TikTok (15–60 seconds), Instagram Reels (15–60 seconds), LinkedIn video, podcast scripts, and video ads. Each gets scripts built for its own format and pacing.",
      },
    },
    {
      "@type": "Question",
      name: "Will the scripts actually sound like each brand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — because Scribtly generates scripts from a saved voice profile specific to that brand. Tone, audience, phrases, and niche are all locked in before generation starts. The output sounds like the brand, not a generic AI template.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from using ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT requires you to re-explain the brand's voice every session. Scribtly saves it permanently. You also get platform-native script structure out of the box — hook, body, CTA, captions, and hashtags — without building your own prompts.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get 5 scripts free with no credit card required — enough to test across different brand accounts and platforms before deciding.",
      },
    },
  ],
};

const stats = [
  { value: "< 60s", label: "first draft per script" },
  { value: "Every platform", label: "TikTok to LinkedIn" },
  { value: "Multiple brands", label: "one organised workspace" },
];

const steps = [
  {
    n: "1",
    title: "Save each brand's voice profile",
    desc: "Add the brand's niche, tone, target audience, and recurring phrases. Takes 5 minutes per account. You never start from scratch again.",
  },
  {
    n: "2",
    title: "Generate the script",
    desc: "Select the account, pick the platform, describe the topic. A full structured script lands in under 60 seconds — on-brand, platform-native, ready to refine.",
  },
  {
    n: "3",
    title: "Refine, share, and move on",
    desc: "Apply your judgement to the first draft. Share via a single review link. Export and deliver. Then switch to the next account and repeat.",
  },
];

const pains = [
  {
    icon: Layers,
    title: "Too many accounts, too many voices",
    desc: "You're juggling 5+ brand accounts, each with its own tone, audience, and platform mix. Scribtly saves a voice profile for each one — so you never confuse them or lose the thread.",
  },
  {
    icon: Clock,
    title: "Not enough time per account",
    desc: "Your clients expect 3–5 scripts a week each. Writing from scratch doesn't scale. Scribtly gets you to a solid first draft in under 60 seconds so volume stops being the bottleneck.",
  },
  {
    icon: Repeat,
    title: "Platform-switching overhead",
    desc: "A TikTok hook is nothing like a LinkedIn opener. Scribtly generates platform-native scripts automatically — the right structure for each format without you having to reformat everything by hand.",
  },
];

const features = [
  {
    icon: Users,
    title: "Brand voice profiles",
    desc: "Save each account's tone, audience, niche, and phrases once. Every script generated for that brand stays consistent — automatically.",
  },
  {
    icon: Zap,
    title: "Platform-native scripts",
    desc: "TikTok, Reels, YouTube, LinkedIn — each platform gets its own script structure, pacing, and format. Pick the platform and generate.",
  },
  {
    icon: FileText,
    title: "Organised script library",
    desc: "Every script is saved by brand and platform. Search, reuse, and reference past work without hunting through folders or chat logs.",
  },
  {
    icon: Shield,
    title: "Consistent brand voice at scale",
    desc: "Whether you're on script 3 or script 300 for a client, the output sounds like them — not a generic AI template.",
  },
];

const befores = [
  "Switching between brand docs, tone guides, and ChatGPT for each account",
  "Copy-pasting voice notes into every prompt before you can start",
  "Generic output that could belong to any brand",
  "Scripts scattered across folders, Notion, and your inbox",
  "Manually reformatting content for TikTok, Reels, LinkedIn, and YouTube",
];

const afters = [
  "Brand voice saved and ready — switch accounts in one click",
  "Platform-native scripts in under 60 seconds from a saved profile",
  "Consistent output that sounds like the brand every time",
  "Script library organised by client and platform",
  "Captions, hashtags, and descriptions generated automatically",
];

const faqs = [
  {
    q: "How many brand accounts can I manage in Scribtly?",
    a: "As many as you need. Save a separate voice profile for each brand or client account and switch between them instantly — no re-briefing required.",
  },
  {
    q: "What platforms does Scribtly support?",
    a: "YouTube (long-form and Shorts), TikTok (15–60 seconds), Instagram Reels (15–60 seconds), LinkedIn video, podcast scripts, and video ads. Each gets scripts built for its own format and pacing.",
  },
  {
    q: "Will the scripts actually sound like each brand?",
    a: "Yes — because Scribtly generates scripts from a saved voice profile specific to that brand. Tone, audience, phrases, and niche are all locked in before generation starts. The output sounds like the brand, not a generic AI template.",
  },
  {
    q: "How is this different from using ChatGPT?",
    a: "ChatGPT requires you to re-explain the brand's voice every session. Scribtly saves it permanently. You also get platform-native script structure out of the box — hook, body, CTA, captions, and hashtags — without building your own prompts.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You get 5 scripts free with no credit card required — enough to test across different brand accounts and platforms before deciding.",
  },
];

export default function ForSocialMediaManagersPage() {
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
            For Social Media Managers
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Manage more accounts.<br className="hidden md:block" /> Lose no one&apos;s voice.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly is the script writing tool built for social media managers who handle multiple brand accounts. Save each brand&apos;s voice once, generate platform-native scripts in under 60 seconds, and keep every account sounding consistent.
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
              src="/hero-agencies.png"
              alt="Scribtly script writing tool for social media managers"
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
          From account brief to delivered script in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No copy-pasting tone guides. No re-explaining each brand. No reformatting for every platform.
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

      {/* ── PAINS ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Three problems social media managers hit. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are the things that make multi-account management a grind. Scribtly fixes all three.
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
          Same accounts, same content load — completely different workflow.
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
            Scripts built for every platform you manage
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-8 max-w-lg mx-auto">
            Each platform gets its own structure — not a one-size-fits-all template.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: "/tiktok-scripts", label: "TikTok scripts" },
              { href: "/instagram-reels-scripts", label: "Instagram Reels scripts" },
              { href: "/youtube-scripts", label: "YouTube scripts" },
              { href: "/youtube-shorts-scripts", label: "YouTube Shorts scripts" },
              { href: "/linkedin-video-scripts", label: "LinkedIn video scripts" },
              { href: "/video-ad-scripts", label: "Video ad scripts" },
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
          Questions from social media managers
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
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl mt-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Start with 5 free scripts.
          </h2>
          <p className="text-white/75 mb-8">
            No credit card. No commitment. Try it across your brand accounts today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                Try it free <ArrowRight size={15} className="ml-1" />
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

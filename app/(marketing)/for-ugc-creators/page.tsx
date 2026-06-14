import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  FileText,
  Repeat,
  Clock,
  Users,
  LayoutTemplate,
  Star,
} from "lucide-react";

export const metadata = {
  title: "AI Script Writer for UGC Creators — Scribtly",
  description:
    "Turn brand briefs into platform-ready UGC scripts in under 60 seconds. Scribtly helps UGC creators write hooks, product sections, and CTAs faster — brief by brief.",
  keywords: [
    "AI script writer for UGC creators",
    "UGC script writer",
    "UGC script generator",
    "UGC creator tools",
    "UGC ad script generator",
    "short-form UGC script tool",
    "script tool for UGC creators",
    "UGC brief to script",
  ],
  alternates: { canonical: "/for-ugc-creators" },
  openGraph: {
    type: "website",
    url: "/for-ugc-creators",
    siteName: "Scribtly",
    title: "AI Script Writer for UGC Creators · Scribtly",
    description:
      "Turn brand briefs into platform-ready UGC scripts in under 60 seconds. Hook, product section, CTA — all structured for TikTok, Reels, and Shorts.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for UGC creators" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Script Writer for UGC Creators · Scribtly",
    description:
      "Turn brand briefs into platform-ready UGC scripts in under 60 seconds. Hook, product section, CTA — all structured for TikTok, Reels, and Shorts.",
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
      name: "For UGC Creators",
      item: `${SITE_URL}/for-ugc-creators`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I save different brand voices for each UGC client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Save a separate voice profile for each brand or client you work with. Include their tone, target audience, key phrases, and product focus — then generate scripts that match their brief every time without starting from scratch.",
      },
    },
    {
      "@type": "Question",
      name: "What script formats does Scribtly generate for UGC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly generates short-form video scripts structured for TikTok, Instagram Reels, and YouTube Shorts — including hook, product integration section, and CTA. It also supports longer formats like YouTube scripts and video ads.",
      },
    },
    {
      "@type": "Question",
      name: "How is Scribtly different from using ChatGPT for UGC scripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT requires you to paste in the brand brief and re-explain the tone every session. Scribtly saves each brand's profile permanently so you can generate on-brief scripts instantly. You also get UGC-native script structure — hook, body, CTA — without building custom prompts each time.",
      },
    },
    {
      "@type": "Question",
      name: "Can Scribtly help me produce multiple script variations from one brief?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Once a brand profile is saved, you can generate multiple script angles for the same brief in minutes — different hooks, different framings, different lengths — without re-briefing the tool each time.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get 5 scripts free with no credit card required. That's enough to test Scribtly on a real brand brief before deciding.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly write captions and hashtags too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Depending on the platform, Scribtly can include captions, hashtags, and posting notes as part of the generated output — so your deliverable is more complete from the start.",
      },
    },
  ],
};

const stats = [
  { value: "< 60s", label: "brief to first-draft script" },
  { value: "TikTok · Reels · Shorts", label: "platform-native structure" },
  { value: "Every brand", label: "saved voice, not re-typed" },
];

const steps = [
  {
    n: "1",
    title: "Save the brand's voice profile",
    desc: "Paste in the brief details — brand tone, product, target audience, key phrases. Save it as a profile. Takes 5 minutes once. Every future script for that brand starts from the same foundation.",
  },
  {
    n: "2",
    title: "Generate the script",
    desc: "Select the brand profile, pick the platform (TikTok, Reels, Shorts), and describe the angle. A full structured script — hook, product section, CTA — lands in under 60 seconds.",
  },
  {
    n: "3",
    title: "Refine and deliver",
    desc: "Apply your creative judgement to the draft. Adjust the hook, punch up the CTA, add your natural delivery notes. Then deliver the script and move on to the next brief.",
  },
];

const pains = [
  {
    icon: Clock,
    title: "Briefs come in fast — blank pages don't care",
    desc: "You're juggling multiple brand briefs with tight turnarounds. Scribtly gets you from brief to structured first draft in under 60 seconds, so the blank page is never the bottleneck.",
  },
  {
    icon: Repeat,
    title: "Retyping brand context every single time",
    desc: "Every time you open ChatGPT for a new brief, you're pasting in tone guides and product info again. Scribtly saves each brand profile permanently — open it, generate, done.",
  },
  {
    icon: LayoutTemplate,
    title: "Generic output that misses the brief",
    desc: "AI writing tools produce generic hooks and flat CTAs. Scribtly generates scripts from the brand's actual voice profile — so the output sounds like the brand, not a random content template.",
  },
];

const features = [
  {
    icon: Users,
    title: "Brand voice profiles per client",
    desc: "Save each brand's tone, niche, audience, and phrases once. Switch between clients instantly — no re-briefing, no copy-pasting.",
  },
  {
    icon: Zap,
    title: "UGC-native script structure",
    desc: "Hook, product integration, CTA — structured for short-form performance on TikTok, Reels, and YouTube Shorts. Not a generic template.",
  },
  {
    icon: FileText,
    title: "Multiple variations, same brief",
    desc: "Generate different hook angles and framings for the same brand brief in minutes. Give clients options without writing every variation from scratch.",
  },
  {
    icon: Star,
    title: "Organised by brand and platform",
    desc: "Every script is saved in your library, organised by client. Reference past deliverables, reuse what worked, and never hunt through folders again.",
  },
];

const befores = [
  "Pasting brand tone guides into ChatGPT before every brief",
  "Writing hooks from scratch for each new product angle",
  "Generic output that needs heavy rewriting to sound on-brand",
  "Scripts scattered across Notion, Google Docs, and email threads",
  "Spending 45+ minutes on a 30-second script",
];

const afters = [
  "Brand profile saved — generate from it instantly every time",
  "Platform-native hook, body, and CTA ready in under 60 seconds",
  "Output that sounds like the brand, not a generic AI template",
  "Script library organised by brand and platform",
  "More briefs completed per day without working longer hours",
];

const faqs = [
  {
    q: "Can I save different brand voices for each UGC client?",
    a: "Yes. Save a separate voice profile for each brand or client you work with. Include their tone, target audience, key phrases, and product focus — then generate scripts that match their brief every time without starting from scratch.",
  },
  {
    q: "What script formats does Scribtly generate for UGC?",
    a: "Scribtly generates short-form video scripts structured for TikTok, Instagram Reels, and YouTube Shorts — including hook, product integration section, and CTA. It also supports longer formats like YouTube scripts and video ads.",
  },
  {
    q: "How is Scribtly different from using ChatGPT for UGC scripts?",
    a: "ChatGPT requires you to paste in the brand brief and re-explain the tone every session. Scribtly saves each brand's profile permanently so you can generate on-brief scripts instantly. You also get UGC-native script structure — hook, body, CTA — without building custom prompts each time.",
  },
  {
    q: "Can Scribtly help me produce multiple script variations from one brief?",
    a: "Yes. Once a brand profile is saved, you can generate multiple script angles for the same brief in minutes — different hooks, different framings, different lengths — without re-briefing the tool each time.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You get 5 scripts free with no credit card required. That's enough to test Scribtly on a real brand brief before deciding.",
  },
  {
    q: "Does Scribtly write captions and hashtags too?",
    a: "Yes. Depending on the platform, Scribtly can include captions, hashtags, and posting notes as part of the generated output — so your deliverable is more complete from the start.",
  },
];

export default function ForUGCCreatorsPage() {
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
            For UGC Creators
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Brief in. Script out.<br className="hidden md:block" /> Deliver more UGC, faster.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly is the script writing tool built for UGC creators who work across multiple brands. Save each brand&apos;s voice once, generate platform-native scripts in under 60 seconds, and spend your time on delivery — not blank pages.
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
              alt="Scribtly script writing tool for UGC creators"
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
          From brand brief to delivered script in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No pasting tone guides. No rebuilding prompts. No rewriting generic output from scratch.
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
            Three things that slow UGC creators down. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are the friction points that eat into your time between brief and delivery. Scribtly removes all three.
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
          Same briefs, same volume — completely different time investment.
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
            Scripts built for every platform your clients post on
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-8 max-w-lg mx-auto">
            Each platform gets its own script structure — not a reformatted copy of the same template.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: "/ugc-scripts", label: "UGC scripts" },
              { href: "/tiktok-scripts", label: "TikTok scripts" },
              { href: "/instagram-reels-scripts", label: "Instagram Reels scripts" },
              { href: "/youtube-shorts-scripts", label: "YouTube Shorts scripts" },
              { href: "/video-ad-scripts", label: "Video ad scripts" },
              { href: "/tiktok-script-template", label: "TikTok script template" },
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
          Questions from UGC creators
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
            No credit card. No commitment. Test it on a real brief today.
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

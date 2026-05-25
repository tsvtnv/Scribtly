import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  Zap,
  ArrowRight,
  Sparkles,
  FileText,
  Target,
  Share2,
  Hash,
  Mic,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Facebook Reels script generator for freelancers",
  description:
    "Write Facebook Reels scripts that get watched and shared. Scribtly generates short-form Reels scripts in your client's voice — optimised for Facebook's algorithm.",
  keywords: [
    "Facebook Reels script generator",
    "AI Facebook Reels writer",
    "Facebook video script",
    "Reels script generator",
    "short-form script for Facebook",
  ],
  alternates: { canonical: "/facebook-reels-scripts" },
  openGraph: {
    type: "website",
    url: "/facebook-reels-scripts",
    siteName: "Scribtly",
    title: "Facebook Reels script generator for freelancers · Scribtly",
    description:
      "Short-form Reels scripts in your client's voice — optimised for Facebook's algorithm.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly Facebook Reels script generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Reels script generator for freelancers · Scribtly",
    description:
      "Short-form Reels scripts in your client's voice — optimised for Facebook's algorithm.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Facebook Reels Scripts", item: `${SITE_URL}/facebook-reels-scripts` },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "15/30/60s", label: "lengths" },
  { value: "Share-optimised", label: "structure" },
];

const steps = [
  {
    n: "1",
    title: "Build client profile",
    desc: "Save their niche, audience, tone, and brand phrases once. Every Reel you generate starts from that profile — no re-briefing.",
  },
  {
    n: "2",
    title: "Describe topic + length",
    desc: "Pick 15, 30, or 60 seconds. Drop in the topic and hit generate.",
  },
  {
    n: "3",
    title: "Get a complete Reels script",
    desc: "Scroll-stopping hook, on-brand body copy, and a share-bait ending — all matched to your client's voice, streamed in under 60 seconds.",
  },
];

const features = [
  {
    icon: Target,
    title: "Scroll-stop hooks",
    desc: "Platform-native openers built for Facebook's feed — not generic lines that blend into the scroll.",
  },
  {
    icon: Share2,
    title: "Share-bait endings",
    desc: "Closing lines designed to trigger the share instinct — the signal Facebook weights most in the Reels algorithm.",
  },
  {
    icon: Hash,
    title: "Captions + hashtags",
    desc: "Auto-generated captions and relevant hashtags included with every script — ready to paste into the post.",
  },
  {
    icon: Mic,
    title: "Client voice",
    desc: "Saved profiles mean every Reel sounds like the creator, not a generic AI template.",
  },
  {
    icon: Zap,
    title: "Emotion-driven pacing",
    desc: "Scripts are paced to hit emotional beats at the right moments — curiosity, surprise, validation — before the share hook.",
  },
  {
    icon: TrendingUp,
    title: "Trend-aware structure",
    desc: "Output follows the content patterns that perform best in Facebook's current Reels feed.",
  },
];

const befores = [
  "Generic hooks that don't fit Facebook's feed algorithm",
  "No captions included — extra work after every script",
  "Re-briefing the AI on the client's voice every session",
  "Scripts too long for Reels that lose viewers halfway",
  "Missing share-bait endings that drive reach",
];

const afters = [
  "Platform-native hooks tuned for Facebook's algorithm",
  "Auto-generated captions included with every script",
  "Client voice saved from day one — no re-briefing",
  "Perfectly paced for Reels — viewers stay to the end",
  "Share-worthy endings built into every script",
];

const faqs = [
  {
    q: "How is Facebook Reels different from TikTok?",
    a: "Facebook Reels and TikTok both use short vertical video but have different audience demographics and algorithm signals. Facebook Reels weights shares and saves heavily, so Scribtly builds share-bait endings into every script. TikTok scripts are tuned separately for TikTok's discovery patterns.",
  },
  {
    q: "What lengths does the Reels generator support?",
    a: "Scribtly generates Reels scripts at 15, 30, and 60 seconds. Each is structured and paced so the script hits the target duration when delivered at a natural, on-camera pace.",
  },
  {
    q: "Are captions included in the output?",
    a: "Yes. Every script includes suggested caption copy and relevant hashtags alongside the spoken script — ready to paste directly into the Facebook post form.",
  },
  {
    q: "Does it work for business pages?",
    a: "Yes. Scribtly works for personal creator profiles and business pages. When you set up the client profile you can specify whether the tone should lean personal or professional — the script adapts accordingly.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. Scribtly includes 5 free scripts so you can test the output before committing. No credit card required to get started.",
  },
];

export default function FacebookReelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Facebook Reels Scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Facebook Reels scripts that get<br className="hidden md:block" /> watched and shared
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Stop writing from a blank page. Scribtly generates a complete Reels script — hook, body, and share-bait ending — in your client's exact voice, in under 60 seconds.
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
              src="/hero-youtube.png"
              alt="Scribtly Facebook Reels script generator interface"
              width={1200}
              height={630}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] border border-[var(--color-border)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          From brief to finished Reel in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No prompt engineering. No copy-pasting tone guides. No rework.
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

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What every Reel script includes
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Platform-optimised structure, your client's voice, and everything they need to hit record.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <f.icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Before and after Scribtly
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Same client, same topic — completely different experience.
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

      <section className="max-w-3xl mx-auto px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-[var(--color-border)]">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your next Facebook Reel is 60 seconds away.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. See how fast your workflow can be.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                Start free <ArrowRight size={15} className="ml-1" />
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

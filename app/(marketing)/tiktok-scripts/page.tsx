import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  Zap,
  ArrowRight,
  Sparkles,
  Repeat,
  MessageSquare,
  Target,
  Timer,
  Volume2,
} from "lucide-react";

export const metadata = {
  title: "TikTok script writer for freelancers",
  description:
    "Write TikTok scripts that hook viewers in the first second. Scribtly generates short-form scripts in your client's exact voice: 15, 30, or 60 seconds.",
  keywords: [
    "TikTok script generator",
    "AI TikTok script writer",
    "short-form video scripts",
    "Reels script generator",
    "TikTok hook generator",
    "video script for freelancers",
  ],
  alternates: { canonical: "/tiktok-scripts" },
  openGraph: {
    type: "website",
    url: "/tiktok-scripts",
    siteName: "Scribtly",
    title: "TikTok script writer for freelancers · Scribtly",
    description:
      "Short-form TikTok and Reels scripts in your client's voice — hooks, beats, and loops in 15/30/60s.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly TikTok script writer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok script writer for freelancers · Scribtly",
    description:
      "Short-form TikTok and Reels scripts in your client's voice — hooks, beats, and loops in 15/30/60s.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "TikTok Scripts", item: `${SITE_URL}/tiktok-scripts` },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "3 lengths", label: "15, 30, or 60 sec" },
  { value: "Hook first", label: "retention-first structure" },
];

const steps = [
  {
    n: "1",
    title: "Save the client",
    desc: "Enter their niche, tone, audience, and any phrases they always use. Saved once — every script sounds like them from the start.",
  },
  {
    n: "2",
    title: "Drop the topic",
    desc: "Paste the idea or talking point. Pick 15, 30, or 60 seconds. Hit generate.",
  },
  {
    n: "3",
    title: "Ship the script",
    desc: "Hook, body, payoff, and an optional loop hook — all streamed in under 60 seconds. Ready to film.",
  },
];

const features = [
  {
    icon: Target,
    title: "First-second hooks",
    desc: "Pattern interrupts that stop the scroll before the viewer even thinks about swiping. Built for TikTok's algorithm.",
  },
  {
    icon: Zap,
    title: "Short punchy sentences",
    desc: "Scripts written for spoken delivery — short bursts, no filler, no \"Hey guys, today I'm going to...\"",
  },
  {
    icon: Repeat,
    title: "Loop hooks",
    desc: "Optional ending lines that pull viewers back to the start — a proven TikTok rewatch driver.",
  },
  {
    icon: Volume2,
    title: "Sounds natural out loud",
    desc: "Scripts read aloud as naturally as they look on screen. No awkward phrasing that sounds like it was written by AI.",
  },
  {
    icon: MessageSquare,
    title: "Captions and hashtags",
    desc: "Post captions and hashtag sets generated alongside the script so your client can go straight to posting.",
  },
  {
    icon: Timer,
    title: "Paced for the length",
    desc: "A 15-second script is structured differently to a 60-second one. Scribtly knows the difference and builds accordingly.",
  },
];

const befores = [
  "Staring at a blank notes app for 30 minutes",
  "Re-pasting the client's bio into ChatGPT every time",
  "Generic hooks that don't match the creator's style",
  "Scripts that run over or under the target length",
  "Missing captions and hashtags to write separately",
];

const afters = [
  "Script delivered in under 60 seconds from a saved profile",
  "Client's voice locked in on day one — never re-enter it",
  "Scroll-stopping hooks matched to their tone and niche",
  "Scripts paced for exactly 15, 30, or 60 seconds",
  "Captions and hashtags generated alongside the script",
];

const faqs = [
  {
    q: "What's the difference between 15, 30, and 60-second scripts?",
    a: "Each length gets its own structure. A 15-second script is hook + single point + payoff. A 60-second script has room for a mini story arc. Scribtly adapts the structure automatically based on what you select.",
  },
  {
    q: "How do the hooks actually work?",
    a: "Scribtly writes pattern-interrupt openers — statements or questions that create an open loop in the viewer's brain. They're matched to the client's niche and tone so they sound like something they'd actually say.",
  },
  {
    q: "Can I use this for Instagram Reels too?",
    a: "Yes — short-form Reels scripts use the same structure. You can also use the dedicated Instagram Reels page which has Reels-specific pacing and hook formulas.",
  },
  {
    q: "Will my clients know I used AI?",
    a: "Not from the output. Scribtly writes from the saved client profile — their specific tone, phrases, and niche. The script sounds like them. What you do with it after is up to you.",
  },
  {
    q: "What niches does it work for?",
    a: "Any niche. Scribtly is voice-first — it writes from the client's profile, not a generic template. Fitness, finance, beauty, tech, food, travel — the profile is what drives the output, not a category preset.",
  },
];

export default function TikTokPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,193,114,0.10),transparent_40%),linear-gradient(315deg,rgba(127,119,221,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] right-[-40px] w-[340px] h-[340px] rounded-full bg-[#38c172]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-30px] w-[260px] h-[260px] rounded-full bg-primary/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-[#38c172] backdrop-blur">
            <Image src="/platforms/tiktok.png" alt="TikTok" width={16} height={16} className="rounded-[3px]" />
            TikTok Scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            TikTok scripts that hook<br className="hidden md:block" /> viewers in the first second
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Short-form TikTok scripts — hook, body, payoff, loop hook — written in your client's exact voice. No padding, no filler, no "Hey guys".
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
                <span className="font-semibold text-[#38c172]">{s.value}</span>
                <span className="text-text-secondary dark:text-dark-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="max-w-5xl mx-auto px-5 pt-12 md:pt-16">
        <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden border-hair border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_24px_70px_rgba(56,193,114,0.18)] ring-1 ring-[#38c172]/15">
          <Image
            src="/brand/feature-voice.png"
            alt="Scribtly generating a TikTok script in your client's exact voice"
            width={1024}
            height={1024}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Idea to script in three steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No prompt engineering. No copy-pasting tone guides. No blank-page dread.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-7 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-[#38c172]/30 via-[#38c172]/50 to-[#38c172]/30" />
          {steps.map((s) => (
            <div key={s.n} className="text-center group">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#38c172]/30 bg-[#d9f0df]/60 dark:bg-[#1f3b29]/60 text-[#38c172] font-bold text-lg mb-4 group-hover:border-[#38c172] group-hover:bg-[#38c172] group-hover:text-white transition-all duration-200 mx-auto">
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

      {/* ── FEATURES ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What every TikTok script includes
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Structure, retention techniques, and your client's voice — built for the platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group hover:border-[#38c172]/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <f.icon size={20} className="text-[#38c172] mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
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
          Same client, same niche — completely different workflow.
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
          <div className="rounded-xl border-hair border-[#38c172]/30 bg-[#d9f0df]/40 dark:bg-[#1f3b29]/40 p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#38c172] mb-5">
              With Scribtly
            </div>
            <ul className="space-y-3">
              {afters.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm">
                  <Check size={14} className="text-[#38c172] shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── MORE PLATFORMS ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#38c172] mb-3 block">All short-form</span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Reels, Shorts, and TikTok from one client profile
            </h2>
            <p className="text-text-secondary dark:text-dark-muted text-sm leading-relaxed mb-6">
              Scribtly knows the structural differences between TikTok, Instagram Reels, and YouTube Shorts. One saved client profile feeds every short-form script you generate.
            </p>
            <Link href="/signup">
              <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                Try all platforms free <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
          <div className="relative rounded-xl overflow-hidden ring-1 ring-[var(--color-border)] shadow-[0_20px_60px_rgba(56,193,114,0.18)]">
            <Image
              src="/brand/feature-platforms.png"
              alt="One script adapted for TikTok, Instagram Reels, YouTube Shorts and more"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
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

      {/* ── CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ea55e] via-[#38c172] to-[#2ea55e]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your next TikTok script is 60 seconds away.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. See how fast your workflow can be.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#2ea55e] hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
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

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Repeat,
  MessageSquare,
  Timer,
  Volume2,
} from "lucide-react";

export const metadata = {
  title: "Instagram Reels script writer for freelancers",
  description:
    "Write Instagram Reels scripts that stop the scroll. Scribtly generates hook-first Reels scripts in your client's exact voice — ready in under 60 seconds.",
  keywords: [
    "Instagram Reels script generator",
    "AI Reels script writer",
    "short-form video scripts",
    "Instagram script for freelancers",
    "Reels hook generator",
  ],
  alternates: { canonical: "/instagram-reels-scripts" },
  openGraph: {
    type: "website",
    url: "/instagram-reels-scripts",
    siteName: "Scribtly",
    title: "Instagram Reels script writer for freelancers · Scribtly",
    description:
      "Hook-first Instagram Reels scripts in your client's voice. Stop the scroll in 3 seconds or less.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly Instagram Reels script writer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Reels script writer for freelancers · Scribtly",
    description:
      "Hook-first Instagram Reels scripts in your client's voice. Stop the scroll in 3 seconds or less.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Instagram Reels Scripts", item: `${SITE_URL}/instagram-reels-scripts` },
  ],
};

const stats = [
  { value: "3 sec", label: "to hook the viewer" },
  { value: "< 60s", label: "to write the script" },
  { value: "15–60s", label: "script lengths" },
];

const steps = [
  {
    n: "1",
    title: "Save your client",
    desc: "Add their niche, brand voice, tone, and phrases they always use. One setup — every future script starts from that profile.",
  },
  {
    n: "2",
    title: "Give Scribtly the topic",
    desc: "Type the idea or talking point. Pick 15, 30, or 60 seconds. Hit generate.",
  },
  {
    n: "3",
    title: "Get a scroll-stopping script",
    desc: "A hard-hitting hook, punchy body, and earned CTA — all in their voice, in under 60 seconds. Ready to film.",
  },
];

const features = [
  {
    icon: Target,
    title: "3-second hooks",
    desc: "Scribtly opens every Reels script with a pattern interrupt designed to stop the scroll before the viewer considers swiping.",
  },
  {
    icon: Timer,
    title: "Paced for 15, 30, or 60 seconds",
    desc: "Each length gets its own structure. A 15-second script is built differently to a 60-second one — Scribtly handles the pacing automatically.",
  },
  {
    icon: Zap,
    title: "Punchy, spoken-word sentences",
    desc: "Short, direct lines written to sound natural when filmed. No AI-sounding filler, no long-winded explanations.",
  },
  {
    icon: Repeat,
    title: "Retention techniques built in",
    desc: "Pattern interrupts, open loops, and rewatch bait are woven into the script structure — not added as an afterthought.",
  },
  {
    icon: Volume2,
    title: "Sounds like the creator",
    desc: "Every script is generated from the saved client profile — their specific tone, niche, and phrases. Not a generic Reels template.",
  },
  {
    icon: MessageSquare,
    title: "Captions and hashtags",
    desc: "Post captions and relevant hashtag sets generated alongside the script so your client can go straight to posting.",
  },
];

const befores = [
  "Staring at a blank doc trying to think of a hook",
  "Re-pasting brand voice notes into ChatGPT again",
  "Generic scripts that sound nothing like the creator",
  "Hooks that don't grab attention in the first 3 seconds",
  "Missing captions and hashtags to write separately",
];

const afters = [
  "Hook-first script delivered in under 60 seconds",
  "Client's voice profile saved and applied automatically",
  "Pattern interrupts matched to their tone and niche",
  "Scripts paced for exactly 15, 30, or 60 seconds",
  "Captions and hashtags included in every output",
];

const faqs = [
  {
    q: "Can I write Reels scripts for multiple clients?",
    a: "Yes. Save each client's voice separately and switch between them instantly. Scribtly keeps their tone, niche, and phrases on file so you never start from scratch.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "ChatGPT writes generic scripts. Scribtly writes in your specific client's voice, with Reels-specific pacing, hook formulas, and retention structures built in. It also remembers your client profiles across sessions.",
  },
  {
    q: "What makes a good Reels hook?",
    a: "A good hook creates tension, curiosity, or surprise in the first 2–3 seconds. Scribtly uses pattern-interrupt formulas matched to your client's niche — so the hook sounds like something they'd naturally say.",
  },
  {
    q: "Do the scripts work for both Instagram and TikTok?",
    a: "Short-form scripts share a similar structure across both platforms. You can use a Reels script for TikTok with light adaptation — or use the dedicated TikTok page for TikTok-specific output.",
  },
  {
    q: "Do I need video editing skills to use this?",
    a: "No. Scribtly writes the words. What you do with the camera is entirely up to you and your client.",
  },
];

export default function InstagramReelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(240,68,56,0.06),transparent_40%),linear-gradient(315deg,rgba(127,119,221,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#f0b429]/8 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Instagram Reels
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Reels scripts that stop<br className="hidden md:block" /> the scroll
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Your client has 3 seconds. Scribtly writes hook-first Instagram Reels scripts in their exact voice — punchy, paced for the algorithm, and ready to film.
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
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          From idea to filmed Reel in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No prompt engineering. No copy-pasting brand docs. No rework.
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

      {/* ── FEATURES ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What every Reels script includes
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Algorithm-native structure, your client's voice, and everything they need to film and post.
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

      {/* ── BEFORE / AFTER ── */}
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Stop staring at a blank page.
          </h2>
          <p className="text-white/75 mb-8">
            Write your first Reels script in under 60 seconds. No credit card required.
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

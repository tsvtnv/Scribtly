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
  Brain,
  Mic,
  LayoutTemplate,
  Target,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "AI video script writer for coaches — Scribtly",
  description:
    "Scribtly helps coaches create video scripts that build authority and attract clients. Generate YouTube, TikTok, and Reels scripts in your exact voice in under 60 seconds.",
  keywords: [
    "AI script writer for coaches",
    "coach video script generator",
    "coaching content script tool",
    "authority content script",
    "coach YouTube script writer",
  ],
  alternates: { canonical: "/for-coaches" },
  openGraph: {
    type: "website",
    url: "/for-coaches",
    siteName: "Scribtly",
    title: "AI video script writer for coaches · Scribtly",
    description:
      "Scribtly helps coaches create video scripts that build authority and attract clients. Generate YouTube, TikTok, and Reels scripts in your exact voice in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for coaches" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI video script writer for coaches · Scribtly",
    description:
      "Scribtly helps coaches create video scripts that build authority and attract clients. Generate YouTube, TikTok, and Reels scripts in your exact voice in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For Coaches", item: `${SITE_URL}/for-coaches` },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "Authority-first", label: "structure" },
  { value: "Your methodology", label: "every time" },
];

const steps = [
  {
    n: "1",
    title: "Build your coach profile",
    desc: "Add your niche, methodology, ideal client, and tone. Takes 5 minutes. Scribtly uses this profile for every script you generate.",
  },
  {
    n: "2",
    title: "Drop the topic",
    desc: "Describe the pain point, insight, or client transformation you want to cover. Scribtly turns it into a structured authority script.",
  },
  {
    n: "3",
    title: "Get an authority-building script in your voice",
    desc: "A complete script that sounds like you, reflects your methodology, and is structured to build trust with your ideal clients — in under 60 seconds.",
  },
];

const pains = [
  {
    icon: Clock,
    title: "Not enough time to create content consistently",
    desc: "Showing up on video competes with client work. Scribtly gets you a ready-to-film script in under 60 seconds — so you can post consistently without sacrificing client time.",
  },
  {
    icon: Bot,
    title: "Scripts that sound generic, not expert",
    desc: "AI-sounding content doesn't build trust — it kills it. Scribtly generates from your methodology and voice profile, so the output sounds like insight from an expert, not filler.",
  },
  {
    icon: Brain,
    title: "Hard to explain your methodology clearly",
    desc: "Complex coaching ideas that are hard to script quickly often get simplified to nothing. Scribtly captures your methodology in your profile and reflects it in every script.",
  },
];

const features = [
  {
    icon: Mic,
    title: "Your expertise, not generic tips",
    desc: "Scribtly generates from your saved coach profile — niche, methodology, ideal client, and tone — not a generic AI template.",
  },
  {
    icon: LayoutTemplate,
    title: "All 3 platforms",
    desc: "YouTube, TikTok, and Instagram Reels — each with its own authority-building structure and the right format for the algorithm.",
  },
  {
    icon: Target,
    title: "Hooks that attract ideal clients",
    desc: "Every script opens with a hook written to speak directly to your ideal client's pain or goal — not a generic opener.",
  },
  {
    icon: BookOpen,
    title: "Methodology-consistent output",
    desc: "Your framework comes through in every video. Consistent messaging builds the authority that turns viewers into discovery calls.",
  },
];

const befores = [
  "Skipping video weeks because there's no time",
  "Generic ChatGPT scripts that don't sound like an expert",
  "Your methodology coming out different every video",
  "No system for past content",
  "Spending hours on a 60-second script",
];

const afters = [
  "Script ready in 60 seconds from your saved profile",
  "Insight-led scripts that build genuine authority",
  "Consistent methodology reflected in every video",
  "Growing content library",
  "More time for clients, not content planning",
];

const faqs = [
  {
    q: "What kind of coaches use Scribtly?",
    a: "Business coaches, life coaches, health coaches, executive coaches, and niche specialists — any coach who wants to show up consistently on video to attract and convert ideal clients.",
  },
  {
    q: "How does it capture my methodology?",
    a: "When you set up your coach profile, you describe your core framework, the transformation you deliver, your ideal client, and your content tone. Scribtly uses that to generate scripts that consistently reflect your approach — not generic advice.",
  },
  {
    q: "Is it good for niche coaching topics?",
    a: "Yes — and especially so. Scribtly generates from your profile, not from generic training data. The more specific your niche and methodology, the more differentiated the output.",
  },
  {
    q: "What platforms does it support?",
    a: "YouTube (long-form and Shorts), TikTok (15–60 seconds), and Instagram Reels (15–60 seconds). Each gets a script built for the platform's structure and audience behaviour.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — 5 scripts to start, no credit card required. Enough to try it across a few video topics and see if the output reflects your voice before committing.",
  },
];

export default function ForCoachesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%),linear-gradient(315deg,rgba(56,193,114,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            For Coaches
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Video scripts that build your<br className="hidden md:block" /> authority and attract clients.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly is built for coaches who need to show up consistently on video without spending hours writing. Save your niche, tone, and methodology once. Generate authority-building scripts for YouTube, TikTok, and Reels in under 60 seconds.
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
              alt="Scribtly AI video script writer for coaches"
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
          From topic to authority-building script in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No blank page. No sounding generic. No competing with client hours.
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
            Three problems coaches hit. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are the things that stop coaches from showing up consistently on video. Scribtly fixes all three.
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

      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Before and after Scribtly
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Same coach, same topic — completely different experience.
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
          Questions from coaches
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

      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl mt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Build your authority. 60 seconds at a time.
          </h2>
          <p className="text-white/75 mb-8">
            No credit card. No commitment. See how fast your content workflow can be.
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

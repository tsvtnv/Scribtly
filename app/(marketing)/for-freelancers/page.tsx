import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Clock,
  DollarSign,
  Repeat,
  Users,
  FileText,
  Zap,
  Shield,
} from "lucide-react";
import { FounderNote } from "@/components/home/FounderCard";

export const metadata = {
  title: "Script writing tool for freelancers — Scribtly",
  description:
    "Scribtly helps freelancers deliver more scripts and take on more clients. Write YouTube, TikTok, and Reels scripts in any client's voice in 60 seconds.",
  keywords: [
    "script writing tool for freelancers",
    "freelance video script writer",
    "AI script writer freelancer",
    "script writing software",
    "video script tool",
  ],
  alternates: { canonical: "/for-freelancers" },
  openGraph: {
    type: "website",
    url: "/for-freelancers",
    siteName: "Scribtly",
    title: "The script writing tool for freelancers · Scribtly",
    description:
      "Deliver scripts faster, take on more clients, and stop starting from a blank page. Built for freelance script writers.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for freelancers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The script writing tool for freelancers · Scribtly",
    description:
      "Deliver scripts faster, take on more clients, and stop starting from a blank page. Built for freelance script writers.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For Freelancers", item: `${SITE_URL}/for-freelancers` },
  ],
};

const stats = [
  { value: "60–70%", label: "less time per script" },
  { value: "< 60s", label: "first draft delivered" },
  { value: "3×", label: "more clients, same hours" },
];

const steps = [
  {
    n: "1",
    title: "Set up the client profile",
    desc: "Add their niche, tone, phrases they always use, and their audience. Takes 5 minutes. You never brief from scratch again.",
  },
  {
    n: "2",
    title: "Generate the first draft",
    desc: "Pick the platform and length, describe the topic, and hit generate. A full, structured script in under 60 seconds.",
  },
  {
    n: "3",
    title: "Refine and deliver",
    desc: "Apply your expertise to the first draft. Share for review with one link. Export to PDF. Done in a fraction of the usual time.",
  },
];

const pains = [
  {
    icon: Clock,
    title: "Hours per script",
    desc: "You're spending 2–4 hours on a script that pays £50. Scribtly gets you to a solid first draft in under 60 seconds — so your hourly rate stops being a problem.",
  },
  {
    icon: DollarSign,
    title: "Capped earnings",
    desc: "You can only write so many scripts in a week. Scribtly lets you take on 3× the clients without working 3× the hours — without sacrificing quality.",
  },
  {
    icon: Repeat,
    title: "Starting from scratch every time",
    desc: "Every new client means relearning their voice. Scribtly saves their profile so every script sounds like them from day one — even script 50.",
  },
];

const features = [
  {
    icon: Users,
    title: "Client voice profiles",
    desc: "Save each client's niche, tone, and brand phrases once. Switch between them instantly — no re-briefing, no copy-pasting.",
  },
  {
    icon: Zap,
    title: "Platform-native scripts",
    desc: "YouTube, TikTok, and Reels — each gets its own structure, pacing, and format. Pick the platform and go.",
  },
  {
    icon: FileText,
    title: "Polished delivery",
    desc: "Share scripts for client review with one link. Export to PDF. Your library stays organised in one place.",
  },
  {
    icon: Shield,
    title: "Sounds like them, not AI",
    desc: "Scripts are generated from the saved voice profile — not a generic template. Your client won't know the difference.",
  },
];

const befores = [
  "2–4 hours staring at a blank Google Doc",
  "Re-explaining their tone to ChatGPT every session",
  "Generic output that misses their voice entirely",
  "No system for organising past scripts",
  "Separate tools for captions, hashtags, and descriptions",
];

const afters = [
  "Full first draft in under 60 seconds from a saved profile",
  "Client voice locked in — every script sounds like them",
  "Platform-specific structure: YouTube, TikTok, or Reels",
  "Script library to search and reuse past work",
  "Captions, hashtags, and descriptions included automatically",
];

const faqs = [
  {
    q: "I already have a process. Why would I change it?",
    a: "You don't have to change your process — just speed it up. Use Scribtly to generate the first draft, then apply your expertise to refine it. Most freelancers cut their per-script time by 60–70% while improving consistency.",
  },
  {
    q: "Will my clients be able to tell the scripts are AI-assisted?",
    a: "Not if you use it right. Scribtly generates scripts based on your client's specific voice profile — their tone, phrases, audience, and niche. The output sounds like them, not like a generic AI template. Your job is to refine and deliver it.",
  },
  {
    q: "How many clients can I manage?",
    a: "As many as you like. Save a separate voice profile for each client and switch between them instantly.",
  },
  {
    q: "What platforms does it support?",
    a: "YouTube (3–20 minute long-form), TikTok (15–60 second short-form), and Instagram Reels (15–60 second). Each format gets scripts built for its own algorithm and pacing.",
  },
  {
    q: "What does the free plan include?",
    a: "5 scripts to start — no credit card required. Enough to test across different clients and platforms before you decide to upgrade.",
  },
];

export default function ForFreelancersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            Built for freelancers
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Write more scripts.<br className="hidden md:block" /> Work fewer hours.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly is the script writing tool freelancers actually use in client work. Save each client's voice, generate professional scripts in under 60 seconds, and take on more work without burning out.
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
              alt="Scribtly script writing tool for freelancers"
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
          From brief to delivered script in 3 steps
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

      {/* ── PAINS ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Three problems freelancers hit. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are the things that cap your income and eat your time. Scribtly fixes all three.
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
          Same client, same script — completely different experience.
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
          Questions from freelancers
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

      {/* ── FOUNDER NOTE ── */}
      <section className="max-w-3xl mx-auto px-5 pb-4">
        <FounderNote />
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl mt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Start with 5 free scripts.
          </h2>
          <p className="text-white/75 mb-8">
            No credit card. No commitment. See how fast your workflow can be.
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

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Users,
  LayoutGrid,
  TrendingUp,
  Shield,
  FileText,
  Repeat,
  Zap,
} from "lucide-react";
import { FounderNote } from "@/components/home/FounderCard";

export const metadata = {
  title: "Video script writing tool for content agencies — Scribtly",
  description:
    "Scribtly helps content agencies produce YouTube, TikTok, and Reels scripts at scale. Save every client's voice. Keep quality consistent. Start free.",
  keywords: [
    "script writing tool for agencies",
    "content agency script software",
    "AI script generator for agencies",
    "video script management tool",
    "bulk script writing",
  ],
  alternates: { canonical: "/for-agencies" },
  openGraph: {
    type: "website",
    url: "/for-agencies",
    siteName: "Scribtly",
    title: "Video script writing tool for content agencies · Scribtly",
    description:
      "Scale script production across your whole client roster. One tool, every client's voice, consistent quality.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for agencies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video script writing tool for content agencies · Scribtly",
    description:
      "Scale script production across your whole client roster. One tool, every client's voice, consistent quality.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For Agencies", item: `${SITE_URL}/for-agencies` },
  ],
};

const stats = [
  { value: "60–70%", label: "less time per script" },
  { value: "∞ clients", label: "voice profiles saved" },
  { value: "3 platforms", label: "YouTube, TikTok, Reels" },
];

const steps = [
  {
    n: "1",
    title: "Build the client roster",
    desc: "Save a voice profile for each client — niche, tone, audience, and brand phrases. One setup. Every writer on your team starts from the same source of truth.",
  },
  {
    n: "2",
    title: "Generate scripts at speed",
    desc: "Pick the client, platform, and length. Scribtly generates a full, structured script in under 60 seconds — no briefs, no re-explaining, no variation between writers.",
  },
  {
    n: "3",
    title: "Review, refine, and deliver",
    desc: "Share for client review with one link. Export to PDF. Ship consistent quality across your entire roster without adding headcount.",
  },
];

const benefits = [
  {
    icon: Users,
    title: "One voice profile per client",
    desc: "Store each client's tone, niche, audience, and brand phrases. Every writer on your team works from the same profile — quality stays consistent regardless of who writes the draft.",
  },
  {
    icon: LayoutGrid,
    title: "Scripts for every platform",
    desc: "One client, three platforms. Generate YouTube long-form, TikTok short-form, and Instagram Reels scripts all from the same voice profile — without rewriting briefs.",
  },
  {
    icon: TrendingUp,
    title: "Ship faster, take on more",
    desc: "Cut script production time by 60–70% per piece. Use the capacity to grow your roster, improve turnaround SLAs, or increase margins without adding headcount.",
  },
  {
    icon: Shield,
    title: "Consistent quality at scale",
    desc: "The voice profile acts as guardrails. Scripts generated for the same client will always match their tone and niche — even across different writers or months apart.",
  },
  {
    icon: FileText,
    title: "Polished client deliverables",
    desc: "Share scripts for review with a single link. Export to PDF. Scribtly doesn't put its branding on your deliverables — they're yours to deliver however you like.",
  },
  {
    icon: Repeat,
    title: "Script library for reuse",
    desc: "Every script is stored in a searchable library. Revisit past work, spot patterns, repurpose content — without digging through email threads or Google Docs.",
  },
];

const befores = [
  "Briefing every writer separately on each client's tone",
  "Quality inconsistency when writers switch between clients",
  "Separate tools for captions, hashtags, and descriptions",
  "Scripts that sound AI-generated — not like the creator",
  "No centralised place to manage the whole script library",
];

const afters = [
  "One voice profile, consistent output across the whole team",
  "Platform-specific scripts: YouTube, TikTok, and Reels",
  "Captions, hashtags, and descriptions generated automatically",
  "Scripts that sound like the creator — matched to their profile",
  "Script library searchable across every client and platform",
];

const faqs = [
  {
    q: "How does team access work?",
    a: "Agency plans include team seats so your writers can all access the same client profiles and script library. Everyone works from the same source of truth — no more emailing voice docs or brand guidelines.",
  },
  {
    q: "Can we white-label scripts for clients?",
    a: "Scripts are yours to deliver however you like. Export to PDF, copy into your own documents, or share via review link — Scribtly doesn't put its branding on your deliverables.",
  },
  {
    q: "We work in multiple niches. Will the voice profiles hold up?",
    a: "Yes. Each profile is configured independently for niche, audience, tone, and brand phrases. A fitness coach profile produces different scripts to a B2B SaaS profile — even for the same topic.",
  },
  {
    q: "Is there a limit on how many clients we can manage?",
    a: "No client cap. Save as many profiles as you need and generate scripts for any of them at any time.",
  },
  {
    q: "What's the best way to onboard new writers to Scribtly?",
    a: "Point them to the client profiles. Each profile already contains the tone, niche, phrases, and audience notes — so new writers can generate scripts that match the client's existing content from day one, with no handover time.",
  },
];

export default function ForAgenciesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%),linear-gradient(315deg,rgba(240,180,41,0.06),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#f0b429]/8 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Built for agencies
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Scale script production<br className="hidden md:block" /> across your entire roster
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly gives content agencies one place to manage every client's voice, generate platform-specific scripts in under 60 seconds, and ship consistent quality — at any volume.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Start free <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">See agency pricing</Button>
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
              alt="Scribtly script writing tool for content agencies"
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
          From onboarding to delivery in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          One setup per client. Consistent output every time — regardless of who generates the script.
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

      {/* ── BENEFITS ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What agencies get out of Scribtly
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Built for teams that manage multiple clients, multiple platforms, and consistent delivery expectations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <Card
                key={b.title}
                className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <b.icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted">{b.desc}</p>
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
          Same roster, same output volume — completely different operation.
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
          Agency questions, answered
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
            Ready to scale your script production?
          </h2>
          <p className="text-white/75 mb-8">
            Start free, then upgrade to an agency plan when you're ready to add your team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                Start free <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-white/10 text-white border-hair border-white/30 hover:bg-white/20">
                See agency pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

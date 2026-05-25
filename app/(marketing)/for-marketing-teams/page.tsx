import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Users,
  Timer,
  FileQuestion,
  BookMarked,
  Layers,
  Library,
  Share2,
} from "lucide-react";

export const metadata = {
  title: "AI script writer for marketing teams — Scribtly",
  description:
    "Scribtly helps marketing teams produce video scripts at scale. Save brand voices for multiple clients or campaigns. Generate YouTube, TikTok, and Reels scripts in under 60 seconds.",
  keywords: [
    "AI script writer for marketing teams",
    "video script tool for teams",
    "marketing team script generator",
    "brand voice script tool",
    "content team script writer",
  ],
  alternates: { canonical: "/for-marketing-teams" },
  openGraph: {
    type: "website",
    url: "/for-marketing-teams",
    siteName: "Scribtly",
    title: "AI script writer for marketing teams · Scribtly",
    description:
      "Scribtly helps marketing teams produce video scripts at scale. Save brand voices for multiple clients or campaigns. Generate platform-native scripts in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for marketing teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI script writer for marketing teams · Scribtly",
    description:
      "Scribtly helps marketing teams produce video scripts at scale. Save brand voices for multiple clients or campaigns. Generate platform-native scripts in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For Marketing Teams", item: `${SITE_URL}/for-marketing-teams` },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "Multiple brands", label: "in one workspace" },
  { value: "Consistent voice", label: "across campaigns" },
];

const steps = [
  {
    n: "1",
    title: "Save each brand or campaign's voice profile",
    desc: "Build a voice profile for each client or campaign once. Tone, key messages, audience, and phrases — all saved and ready.",
  },
  {
    n: "2",
    title: "Generate scripts for any platform + length",
    desc: "Pick the brand, platform, and topic. Scribtly generates a platform-native script in under 60 seconds — consistent every time.",
  },
  {
    n: "3",
    title: "Share for review — export, deliver, repeat",
    desc: "Share scripts for internal or client review with one link. Export, deliver, and move on. Your whole pipeline moves faster.",
  },
];

const pains = [
  {
    icon: Users,
    title: "Brand voice inconsistency across the team",
    desc: "Different writers produce scripts that sound different — even for the same brand. Scribtly locks in the brand voice so the output is consistent regardless of who generates it.",
  },
  {
    icon: Timer,
    title: "Video production backlogs",
    desc: "Scripts are the bottleneck in most content pipelines. Scribtly gets you from brief to first draft in under 60 seconds — so nothing is waiting on copy.",
  },
  {
    icon: FileQuestion,
    title: "Briefing overhead",
    desc: "Every script starting with a tone guide re-read wastes hours across a team. Save each brand profile once — and never re-brief again.",
  },
];

const features = [
  {
    icon: BookMarked,
    title: "Shared brand voice profiles",
    desc: "Save each client or campaign's voice profile once. Every team member generates from the same source — no briefing, no inconsistency.",
  },
  {
    icon: Layers,
    title: "Multi-platform (YouTube, TikTok, Reels)",
    desc: "Generate platform-native scripts for all three major video platforms from one workspace — with the right structure for each.",
  },
  {
    icon: Library,
    title: "Script library per brand",
    desc: "Every generated script is saved and searchable in your library, organised by brand. Build on past work, spot patterns, avoid repeating topics.",
  },
  {
    icon: Share2,
    title: "One-link review sharing",
    desc: "Share any script for internal review or client sign-off with a single link. No exports, no email threads, no copy-pasting into docs.",
  },
];

const befores = [
  "Scripts that sound different depending on who wrote them",
  "Video content pipeline stuck at the script stage",
  "Re-briefing every writer on every campaign",
  "No central script archive",
  "Separate tools per platform",
];

const afters = [
  "Consistent brand voice regardless of who generates the script",
  "Scripts in 60 seconds unblocking the pipeline",
  "Brand profiles saved — no rebriefing needed",
  "Organised script library per brand",
  "All platforms from one workspace",
];

const faqs = [
  {
    q: "Can multiple team members use one account?",
    a: "Yes. Team plans allow multiple users to access the same workspace, share brand profiles, and collaborate on scripts. Everyone works from the same source of truth.",
  },
  {
    q: "How do brand profiles work for multiple clients?",
    a: "Each client or campaign gets its own saved voice profile — tone, audience, key messages, and phrases. Team members switch between profiles instantly without re-reading a brief.",
  },
  {
    q: "Can we review scripts before delivery?",
    a: "Yes. Every script can be shared for review via a single link — internally for sign-off or directly with the client. No exports or email threads needed.",
  },
  {
    q: "What platforms are supported?",
    a: "YouTube (long-form and Shorts), TikTok (15–60 seconds), and Instagram Reels (15–60 seconds). Each platform gets a script built for its own structure and pacing.",
  },
  {
    q: "What plan is right for a team?",
    a: "Teams typically start on the Pro plan and upgrade to the Agency plan as they add more brand profiles and team members. You can start with 5 free scripts to try it before committing.",
  },
];

export default function ForMarketingTeamsPage() {
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
            For Marketing Teams
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Scale your video content<br className="hidden md:block" /> without scaling your team.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly gives marketing teams a shared system for video scripts. Save brand voices for every campaign or client. Generate platform-native scripts in under 60 seconds — and keep your whole team writing consistently.
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
              alt="Scribtly AI script writer for marketing teams"
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
          From brand brief to delivered script in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No re-briefing. No inconsistency. No pipeline bottlenecks.
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
            Three problems marketing teams hit. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are the things that slow down video production at scale. Scribtly fixes all three.
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
          Same team, same campaign — completely different pipeline.
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
          Questions from marketing teams
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
            Give your team a script-writing system that scales.
          </h2>
          <p className="text-white/75 mb-8">
            No credit card. No commitment. See how fast your pipeline can move.
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

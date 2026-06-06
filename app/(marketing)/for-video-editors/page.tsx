import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Film,
  Clock,
  Layers,
  Repeat,
  Users,
  Zap,
  FileText,
  AlignLeft,
} from "lucide-react";

export const metadata = {
  title: "Script writing tool for video editors — Scribtly",
  description:
    "Scribtly helps video editors write client scripts faster. Save each client's voice, generate structured scripts with B-roll notes in under 60 seconds.",
  keywords: [
    "script writing tool for video editors",
    "AI script writer for video editors",
    "video editor script generator",
    "script writing software video editors",
    "client script tool for editors",
    "b-roll script generator",
    "video script tool freelance editor",
    "AI tools for video editors",
  ],
  alternates: { canonical: "/for-video-editors" },
  openGraph: {
    type: "website",
    url: "/for-video-editors",
    siteName: "Scribtly",
    title: "Script writing tool for video editors · Scribtly",
    description:
      "Write client scripts with B-roll notes built in. Save each client's voice once, generate platform-native scripts in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for video editors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Script writing tool for video editors · Scribtly",
    description:
      "Write client scripts with B-roll notes built in. Save each client's voice once, generate platform-native scripts in under 60 seconds.",
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
      name: "For Video Editors",
      item: `${SITE_URL}/for-video-editors`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do the scripts include B-roll notes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly generates B-roll suggestions alongside the script so you know exactly what footage to cut to — useful for editing and for sharing a clear brief with your client.",
      },
    },
    {
      "@type": "Question",
      name: "Can I save a different voice profile for each client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Save each client's niche, tone, target audience, and recurring phrases once. Every script generated for that client pulls from their saved profile — no re-briefing required.",
      },
    },
    {
      "@type": "Question",
      name: "What platforms does Scribtly support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube (long-form and Shorts), TikTok, Instagram Reels, LinkedIn video, podcast scripts, and video ads. Each format gets its own structure and pacing — not a one-size template.",
      },
    },
    {
      "@type": "Question",
      name: "How is Scribtly different from using ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT needs you to re-explain the client's voice every single session. Scribtly saves it permanently. You also get structured script output — hook, body, CTA, B-roll notes — without building prompts yourself.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get 5 scripts free with no credit card required — enough to test across a couple of client accounts and see the output quality before deciding.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Scribtly if I only write scripts occasionally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Even if you write one or two scripts a month as part of your editing package, Scribtly gets you to a solid first draft in under 60 seconds — which means scripting stops being the part you dread.",
      },
    },
  ],
};

const stats = [
  { value: "< 60s", label: "first draft per script" },
  { value: "B-roll notes", label: "built into every script" },
  { value: "Per-client", label: "saved voice profiles" },
];

const steps = [
  {
    n: "1",
    title: "Save the client's voice profile",
    desc: "Add their niche, tone, audience, and recurring phrases. Takes 5 minutes per client. Scribtly remembers it — you never repeat the brief again.",
  },
  {
    n: "2",
    title: "Generate the script",
    desc: "Pick the platform and describe the topic. A full structured script with hook, body, CTA, and B-roll notes comes back in under 60 seconds — in the client's voice.",
  },
  {
    n: "3",
    title: "Refine, share, and edit",
    desc: "Apply your judgement to the draft, share it for client review, then move straight into the edit. No more script back-and-forth holding up your timeline.",
  },
];

const pains = [
  {
    icon: Film,
    title: "Scripting is holding up your edits",
    desc: "When a client can't deliver a script on time, your edit stalls. Scribtly lets you generate the script yourself — in their voice — so the project keeps moving.",
  },
  {
    icon: Clock,
    title: "Writing scripts takes time you don't charge for",
    desc: "You're a video editor, not a copywriter. But clients expect you to help. Scribtly gets you to a first draft in under 60 seconds so scripting stops eating into your editing time.",
  },
  {
    icon: Repeat,
    title: "Re-explaining the same client to ChatGPT every time",
    desc: "Pasting tone guides into every new session is a time tax. Scribtly saves each client's voice permanently — one setup, unlimited scripts.",
  },
];

const features = [
  {
    icon: Users,
    title: "Client voice profiles",
    desc: "Save each client's tone, niche, audience, and phrases once. Every script generated for that client stays consistent — automatically.",
  },
  {
    icon: AlignLeft,
    title: "B-roll notes built in",
    desc: "Scripts come with suggested B-roll so you know what footage to plan for — and clients get a clearer picture of the finished video.",
  },
  {
    icon: Zap,
    title: "Platform-native structure",
    desc: "YouTube, TikTok, Reels, LinkedIn — each gets its own format, pacing, and structure. No reformatting by hand.",
  },
  {
    icon: FileText,
    title: "Organised by client",
    desc: "Every script is saved and searchable by client. Reuse, reference, or adapt past scripts without hunting through email threads.",
  },
];

const befores = [
  "Waiting on clients to deliver scripts before you can start editing",
  "Pasting tone guides into ChatGPT before every scripting session",
  "Generic output that sounds nothing like the client",
  "No B-roll direction in the script — you have to guess",
  "Manually reformatting scripts for TikTok, YouTube, and Reels",
];

const afters = [
  "Generate the script yourself in under 60 seconds — in their voice",
  "Client voice saved permanently — open Scribtly and generate",
  "Output sounds like the client because it's built from their saved profile",
  "B-roll suggestions included in every script automatically",
  "Platform-native structure chosen automatically for each format",
];

const faqs = [
  {
    q: "Do the scripts include B-roll notes?",
    a: "Yes. Scribtly generates B-roll suggestions alongside the script so you know exactly what footage to cut to — useful for editing and for sharing a clear brief with your client.",
  },
  {
    q: "Can I save a different voice profile for each client?",
    a: "Yes. Save each client's niche, tone, target audience, and recurring phrases once. Every script generated for that client pulls from their saved profile — no re-briefing required.",
  },
  {
    q: "What platforms does Scribtly support?",
    a: "YouTube (long-form and Shorts), TikTok, Instagram Reels, LinkedIn video, podcast scripts, and video ads. Each format gets its own structure and pacing — not a one-size template.",
  },
  {
    q: "How is Scribtly different from using ChatGPT?",
    a: "ChatGPT needs you to re-explain the client's voice every single session. Scribtly saves it permanently. You also get structured script output — hook, body, CTA, B-roll notes — without building prompts yourself.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You get 5 scripts free with no credit card required — enough to test across a couple of client accounts and see the output quality before deciding.",
  },
  {
    q: "Can I use Scribtly if I only write scripts occasionally?",
    a: "Absolutely. Even if you write one or two scripts a month as part of your editing package, Scribtly gets you to a solid first draft in under 60 seconds — which means scripting stops being the part you dread.",
  },
];

export default function ForVideoEditorsPage() {
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
            For Video Editors
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Stop waiting on scripts.<br className="hidden md:block" /> Write them yourself in 60 seconds.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly is the script writing tool built for video editors who write client scripts as part of their service. Save each client&apos;s voice once, generate structured scripts with B-roll notes in under 60 seconds, and keep your edit timeline moving.
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
              alt="Scribtly script writing tool for video editors"
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
          From client brief to script in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No blank page. No voice guide hunting. No reformatting for every platform.
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
            Three problems video editors hit with scripts. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are what make script work a drag. Scribtly fixes all three without adding more to your plate.
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
          Same clients, same deliverables — completely different workflow.
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
            Scripts built for every platform you edit for
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-8 max-w-lg mx-auto">
            Each platform gets its own structure, pacing, and B-roll approach — not a one-size template.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: "/youtube-scripts", label: "YouTube scripts" },
              { href: "/youtube-shorts-scripts", label: "YouTube Shorts scripts" },
              { href: "/tiktok-scripts", label: "TikTok scripts" },
              { href: "/instagram-reels-scripts", label: "Instagram Reels scripts" },
              { href: "/video-ad-scripts", label: "Video ad scripts" },
              { href: "/ugc-scripts", label: "UGC scripts" },
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
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/video-script-template" className="text-primary hover:underline">
              Free video script template →
            </Link>
            <Link href="/ai-script-writer" className="text-primary hover:underline">
              About the Scribtly AI script writer →
            </Link>
            <Link href="/for-freelancers" className="text-primary hover:underline">
              Scribtly for freelancers →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Questions from video editors
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
            No credit card. No commitment. Generate your first client script in under 60 seconds.
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

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
  Zap,
  FileText,
  Film,
} from "lucide-react";

export const metadata = {
  title: "AI script writer for video editors — Scribtly",
  description:
    "Scribtly helps video editors offer scripting as a service. Save each client's voice once, generate scripts with B-roll notes in 60 seconds, and charge more.",
  keywords: [
    "AI script writer for video editors",
    "script writing tool for video editors",
    "video editor script generator",
    "scripting tool for video editors",
    "AI tools for video editors",
    "video editor add-on services",
    "video script generator with B-roll notes",
    "freelance video editor script writing",
  ],
  alternates: { canonical: "/for-video-editors" },
  openGraph: {
    type: "website",
    url: "/for-video-editors",
    siteName: "Scribtly",
    title: "AI script writer for video editors · Scribtly",
    description:
      "Turn scripting into a service. Save your client's voice once, generate scripts with B-roll notes in under 60 seconds, and deliver more without working more hours.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for video editors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI script writer for video editors · Scribtly",
    description:
      "Turn scripting into a service. Save your client's voice once, generate scripts with B-roll notes in under 60 seconds, and deliver more without working more hours.",
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
      name: "Do I need copywriting experience to use Scribtly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Scribtly generates platform-native scripts from a saved client voice profile. You describe the topic and Scribtly builds the hook, body, CTA, and B-roll notes. You apply your judgement and edit — no blank page, no copywriting background required.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly include B-roll notes in scripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly can generate B-roll suggestions alongside the script, so your editing plan and the script stay aligned from the start. No more guessing what visuals to cut to.",
      },
    },
    {
      "@type": "Question",
      name: "Can I manage scripts for multiple clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You save a separate voice profile for each client — tone, niche, target audience, recurring phrases. Every script generated for that client sounds like them, not generic AI output. Switch between clients in one click.",
      },
    },
    {
      "@type": "Question",
      name: "How is Scribtly different from ChatGPT for scripting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT requires you to re-explain each client's voice every session. Scribtly saves it permanently. You also get platform-native script structure — hook, body, CTA, captions, hashtags, and B-roll notes — without building and maintaining your own prompts.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get 5 scripts free with no credit card required — enough to test with a real client project before committing.",
      },
    },
  ],
};

const stats = [
  { value: "< 60s", label: "first draft per script" },
  { value: "B-roll notes", label: "built into every script" },
  { value: "Add-on service", label: "scripts + edits = higher rates" },
];

const steps = [
  {
    n: "1",
    title: "Save your client's voice profile",
    desc: "Add their niche, tone, audience, and recurring phrases. Takes 5 minutes per client. You never re-explain their brand again.",
  },
  {
    n: "2",
    title: "Generate the script with B-roll notes",
    desc: "Pick the platform, describe the video topic. Get a complete script — hook, body, CTA, B-roll suggestions — in under 60 seconds, ready to refine.",
  },
  {
    n: "3",
    title: "Edit, deliver, and charge more",
    desc: "Deliver the script alongside the edit. Use Scribtly as the justification to add a scripting line item to your invoice.",
  },
];

const pains = [
  {
    icon: Clock,
    title: "Clients ask you to write the script too",
    desc: "You came to edit. They want a full package — script, edit, captions. Scribtly gets you a solid first draft in under 60 seconds so saying yes to scripting doesn't eat your editing time.",
  },
  {
    icon: Repeat,
    title: "Every client sounds different",
    desc: "One client is polished and professional. Another is casual and direct. Re-learning their voice for every video is a grind. Scribtly saves it permanently so the output is consistent from day one.",
  },
  {
    icon: DollarSign,
    title: "You're undercharging for what you deliver",
    desc: "If you're already writing or fixing scripts, you're doing the work without the rate. Adding scripting as a named service — with a tool to back it up — gives you the confidence to charge for it properly.",
  },
];

const features = [
  {
    icon: Users,
    title: "Client voice profiles",
    desc: "Save each client's tone, niche, audience, and phrases once. Every script generated for that client stays on-brand automatically.",
  },
  {
    icon: Film,
    title: "B-roll notes built in",
    desc: "Scripts include B-roll suggestions so your edit plan and the script are aligned before you open the timeline.",
  },
  {
    icon: Zap,
    title: "Platform-native structure",
    desc: "YouTube, TikTok, Reels, LinkedIn — each platform gets its own script format and pacing. No reformatting by hand.",
  },
  {
    icon: FileText,
    title: "Script library by client",
    desc: "Every script is saved and searchable. Reference past work, reuse hooks, or build on previous ideas without hunting through chat logs.",
  },
];

const befores = [
  "Clients sending bullet points and asking you to 'just turn this into a script'",
  "Spending 2 hours writing before you even open your editing software",
  "Re-watching old videos to remember how a client likes to sound",
  "Delivering the edit only — and undercharging for the scripting you quietly did",
  "B-roll choices that don't match what was written",
];

const afters = [
  "Client voice saved — generate a matching script in under 60 seconds",
  "First draft ready before you open the timeline",
  "Consistent output every time, across every video for that client",
  "Scripting as a named add-on service with a clear line on the invoice",
  "B-roll notes in the script so your edit flows from the start",
];

const faqs = [
  {
    q: "Do I need copywriting experience to use Scribtly?",
    a: "No. Scribtly generates platform-native scripts from a saved client voice profile. You describe the topic and Scribtly builds the hook, body, CTA, and B-roll notes. You apply your judgement and edit — no blank page, no copywriting background required.",
  },
  {
    q: "Does Scribtly include B-roll notes in scripts?",
    a: "Yes. Scribtly can generate B-roll suggestions alongside the script, so your editing plan and the script stay aligned from the start. No more guessing what visuals to cut to.",
  },
  {
    q: "Can I manage scripts for multiple clients?",
    a: "Yes. You save a separate voice profile for each client — tone, niche, target audience, recurring phrases. Every script generated for that client sounds like them, not generic AI output. Switch between clients in one click.",
  },
  {
    q: "How is Scribtly different from ChatGPT for scripting?",
    a: "ChatGPT requires you to re-explain each client's voice every session. Scribtly saves it permanently. You also get platform-native script structure — hook, body, CTA, captions, hashtags, and B-roll notes — without building and maintaining your own prompts.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You get 5 scripts free with no credit card required — enough to test with a real client project before committing.",
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
            Scripts and edits.<br className="hidden md:block" /> Deliver both. Charge more.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly helps video editors offer scripting as a service without adding hours to their workload. Save each client&apos;s voice once, generate platform-native scripts with B-roll notes in under 60 seconds, and turn scripting into a proper line item.
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
          From client brief to script and edit in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No blank page. No re-briefing. No separate copywriting workflow.
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
            Three things video editors deal with. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are the things that make adding scripting to your services feel like more work than it&apos;s worth. Scribtly fixes all three.
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
          Same clients, same workload — completely different workflow.
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
            Scripts for every platform you edit for
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-8 max-w-lg mx-auto">
            Each platform gets its own script structure — not a one-size-fits-all template.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: "/youtube-scripts", label: "YouTube scripts" },
              { href: "/tiktok-scripts", label: "TikTok scripts" },
              { href: "/instagram-reels-scripts", label: "Instagram Reels scripts" },
              { href: "/youtube-shorts-scripts", label: "YouTube Shorts scripts" },
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
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/ai-script-writer" className="text-primary hover:underline">
              Learn more about the Scribtly AI script writer →
            </Link>
            <Link href="/video-script-template" className="text-primary hover:underline">
              Free video script template →
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
            Also used by:{" "}
            <Link href="/for-freelancers" className="text-primary hover:underline">
              Freelance script writers
            </Link>
            {" · "}
            <Link href="/for-agencies" className="text-primary hover:underline">
              Content agencies
            </Link>
            {" · "}
            <Link href="/for-social-media-managers" className="text-primary hover:underline">
              Social media managers
            </Link>
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted mt-2">
            Compare options:{" "}
            <Link href="/alternatives/chatgpt-for-scripts" className="text-primary hover:underline">
              Scribtly vs ChatGPT
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
            No credit card. No commitment. Test it with a real client project today.
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

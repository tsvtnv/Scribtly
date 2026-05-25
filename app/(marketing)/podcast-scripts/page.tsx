import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  FileText,
  Target,
  Mic,
  Radio,
  LayoutList,
  Users,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Podcast script generator for freelancers",
  description:
    "Write podcast scripts that keep listeners hooked. Scribtly generates structured podcast episode scripts in your client's voice — intros, segments, ad reads, and outros in under 60 seconds.",
  keywords: [
    "podcast script generator",
    "AI podcast script writer",
    "podcast episode script",
    "podcast intro script",
    "podcast script tool",
  ],
  alternates: { canonical: "/podcast-scripts" },
  openGraph: {
    type: "website",
    url: "/podcast-scripts",
    siteName: "Scribtly",
    title: "Podcast script generator for freelancers · Scribtly",
    description:
      "Structured podcast episode scripts in your client's voice — intros, segments, ad reads, and outros in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly podcast script generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcast script generator for freelancers · Scribtly",
    description:
      "Structured podcast episode scripts in your client's voice — intros, segments, ad reads, and outros in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Podcast Scripts", item: `${SITE_URL}/podcast-scripts` },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "Solo + interview", label: "formats" },
  { value: "Full episode", label: "structure" },
];

const steps = [
  {
    n: "1",
    title: "Save the podcast profile",
    desc: "Store the show's niche, host style, and audience once. Every episode script starts from that profile — no re-briefing.",
  },
  {
    n: "2",
    title: "Drop the topic and format",
    desc: "Tell Scribtly the episode subject, pick solo or interview format, and set the target length.",
  },
  {
    n: "3",
    title: "Get a full structured episode script",
    desc: "Hook-first intro, segmented body, natural ad reads, and an outro with CTA — all in the host's voice, streamed in under 60 seconds.",
  },
];

const features = [
  {
    icon: Target,
    title: "Hook-first intros",
    desc: "Episode openers that pull listeners in from the first sentence — before the music fades and the skip instinct kicks in.",
  },
  {
    icon: LayoutList,
    title: "Segment structure",
    desc: "Scripts are broken into clearly labelled segments so hosts know exactly where they are and where they're going.",
  },
  {
    icon: Radio,
    title: "Ad read templates",
    desc: "Natural-sounding ad reads that fit the host's tone — not the awkward corporate copy that makes listeners reach for fast-forward.",
  },
  {
    icon: MessageSquare,
    title: "Outro with CTA",
    desc: "Every episode ends with a clear, on-brand CTA — subscribe, review, follow, or visit a link — written to match the show's voice.",
  },
  {
    icon: Users,
    title: "Solo + interview formats",
    desc: "Solo monologue scripts and interview guide scripts with question prompts and talking points for guest conversations.",
  },
  {
    icon: Mic,
    title: "Natural spoken delivery",
    desc: "Scripts are written to be spoken, not read. Sentence rhythm, natural pauses, and conversational flow are baked in.",
  },
];

const befores = [
  "Rambling episodes without clear structure that listeners skip",
  "No clear CTA in the outro — missed growth opportunity every episode",
  "Awkward ad reads that don't match the host's voice",
  "Starting from a blank page for every single episode",
  "Missing hooks that let listeners drift away in the first minute",
];

const afters = [
  "Structured episodes with clear segments listeners don't skip",
  "Clear CTAs baked into every outro",
  "Natural-sounding ad reads that fit the host's tone",
  "Full episode script in under 60 seconds",
  "Hook-first intros that pull listeners in from second one",
];

const faqs = [
  {
    q: "What podcast formats does it support?",
    a: "Scribtly generates scripts for solo episodes (monologue-style, where the host delivers the full content) and interview episodes (guide-style, with question prompts, talking point notes, and an intro/outro for the host). Both formats use the saved podcast profile.",
  },
  {
    q: "Does it write ad reads?",
    a: "Yes. Scribtly generates mid-roll and pre-roll ad read scripts that match the host's voice and speaking style. You supply the brand brief; Scribtly writes an ad read that sounds like the host wrote it themselves.",
  },
  {
    q: "Can it handle interview scripts?",
    a: "Yes. Interview format scripts include an intro for the guest, prepared question prompts with follow-up suggestions, and an outro that wraps the episode. The host can use it as a full script or as a flexible guide.",
  },
  {
    q: "How long are the scripts?",
    a: "You set the target length when you generate. Scribtly structures the script to fill that duration at the host's natural speaking pace — whether that's a 10-minute focused episode or a 45-minute deep-dive.",
  },
  {
    q: "Does it work for any podcast niche?",
    a: "Yes. The podcast profile includes the show's niche, audience, and tone. Scribtly uses that context to write scripts that sound native to the subject matter — whether it's true crime, business strategy, health, or comedy.",
  },
];

export default function PodcastScriptsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.10),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-[#f59e0b]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#f59e0b]/08 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs backdrop-blur" style={{ color: "#f59e0b" }}>
            <Sparkles size={11} />
            Podcast Scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Podcast scripts that keep<br className="hidden md:block" /> listeners hooked
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Stop writing from a blank page. Scribtly generates a full episode script — hook-first intro, structured segments, ad reads, and outro with CTA — in the host's exact voice, in under 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" style={{ boxShadow: "0 12px 35px rgba(245,158,11,0.25)" }}>
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
                <span className="font-semibold" style={{ color: "#f59e0b" }}>{s.value}</span>
                <span className="text-text-secondary dark:text-dark-muted">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 mx-auto max-w-3xl px-2">
            <Image
              src="/hero-youtube.png"
              alt="Scribtly podcast script generator interface"
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
          From brief to finished episode in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No prompt engineering. No copy-pasting tone guides. No rework.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-7 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-[#f59e0b]/30 via-[#f59e0b]/50 to-[#f59e0b]/30" />
          {steps.map((s) => (
            <div key={s.n} className="text-center group">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 font-bold text-lg mb-4 transition-all duration-200 mx-auto" style={{ borderColor: "rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.06)", color: "#f59e0b" }}>
                {s.n}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/signup">
            <Button size="lg" style={{ boxShadow: "0 12px 35px rgba(245,158,11,0.2)" }}>
              Try it free — no card required
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What every episode script includes
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Full episode structure, the host's voice, and everything they need to hit record.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <f.icon size={20} className="mb-3 group-hover:scale-110 transition-transform duration-200" style={{ color: "#f59e0b" }} />
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
          <div className="rounded-xl border-hair p-6" style={{ borderColor: "rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.05)" }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: "#f59e0b" }}>
              With Scribtly
            </div>
            <ul className="space-y-3">
              {afters.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm">
                  <Check size={14} className="shrink-0 mt-0.5" style={{ color: "#f59e0b" }} />
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
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #b45309 100%)" }} />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your next podcast episode is 60 seconds away.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. See how fast your workflow can be.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]" style={{ color: "#d97706" }}>
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

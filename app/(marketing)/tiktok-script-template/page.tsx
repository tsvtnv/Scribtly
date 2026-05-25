import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Target,
  Repeat,
  Timer,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Free TikTok script template (copy + use)",
  description:
    "Get a free TikTok script template for 15, 30, and 60-second videos. Hook, body, payoff, and loop hook — or let Scribtly generate it automatically in your client's voice.",
  keywords: [
    "tiktok script template",
    "free tiktok script template",
    "tiktok video script format",
    "tiktok script outline",
    "how to write a tiktok script",
  ],
  alternates: { canonical: "/tiktok-script-template" },
  openGraph: {
    type: "website",
    url: "/tiktok-script-template",
    siteName: "Scribtly",
    title: "Free TikTok script template (copy + use) · Scribtly",
    description:
      "Free TikTok script template for 15, 30, and 60-second videos. Hook, body, payoff, and loop hook.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Free TikTok script template" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free TikTok script template (copy + use) · Scribtly",
    description:
      "Free TikTok script template for 15, 30, and 60-second videos. Hook, body, payoff, and loop hook.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "TikTok Script Template", item: `${SITE_URL}/tiktok-script-template` },
  ],
};

const steps = [
  {
    n: "1",
    title: "Pick your length",
    desc: "Decide if you're writing 15, 30, or 60 seconds — each needs a different amount of content.",
  },
  {
    n: "2",
    title: "Hook first, payoff second",
    desc: "Write your hook first, then work backwards from the payoff to connect them.",
  },
  {
    n: "3",
    title: "Or use Scribtly",
    desc: "Generate all of this from your saved client profile — length, voice, and platform in one click.",
  },
];

const features = [
  {
    icon: Target,
    title: "First-second hook formulas",
    desc: "Hooks designed to stop the scroll in the first 1–3 seconds before a viewer swipes away.",
  },
  {
    icon: Timer,
    title: "Length-specific structure",
    desc: "Different body density for 15s, 30s, and 60s — the template adapts to each format.",
  },
  {
    icon: Repeat,
    title: "Loop hooks for rewatches",
    desc: "An optional final line that connects back to the hook, driving TikTok's rewatch metric.",
  },
  {
    icon: MessageSquare,
    title: "Captions + hashtags included",
    desc: "A caption section is part of the template so no element of the post gets forgotten.",
  },
];

const faqs = [
  {
    q: "How long should a TikTok script be?",
    a: "15 seconds for a single punchy insight. 30 seconds for a quick tip with context. 60 seconds for a story or a multi-step how-to. Longer isn't better — every second that isn't earning attention is losing it.",
  },
  {
    q: "What makes a good TikTok hook?",
    a: "A hook that works gets straight to the point or creates an immediate information gap. Bold statements, surprising facts, and direct questions all work. The worst hooks start with 'Hey guys, today I'm going to...' — viewers are gone before you finish the sentence.",
  },
  {
    q: "Should every TikTok have a loop hook?",
    a: "Not always. Loop hooks work best for short-form content under 30 seconds where rewatch rate is a meaningful signal. For 60-second scripts, a strong final CTA often works better than looping back to the opener.",
  },
  {
    q: "Can I use this for Instagram Reels too?",
    a: "Yes. The structure — hook, body, payoff, loop hook — works identically for Reels. The caption section applies to Instagram too. If you're writing for both platforms, the same script usually works with minor caption adjustments.",
  },
  {
    q: "What's the difference between a template and Scribtly?",
    a: "The template gives you the structure — you still write all the words. Scribtly fills in the entire script from your client's saved voice profile: hook, body, payoff, loop hook, and caption — in the right length, in their exact voice, in under 60 seconds.",
  },
];

export default function TikTokScriptTemplatePage() {
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
            Free Template
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Free TikTok script template
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Use this TikTok script template for 15, 30, or 60-second videos. Fill it in manually or let Scribtly generate a complete script in your client's exact voice in under 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Use the AI generator <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">See pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Free TikTok script template
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 max-w-xl leading-relaxed">
          Copy this into your Google Doc, Notion, or notes app. Works for 15s, 30s, and 60s formats — adjust body density for each.
        </p>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-mono text-sm space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">HOOK (first 1–3 seconds)</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Bold statement, question, or visual hook that stops the scroll. No "Hey guys". Get straight to it.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">BODY</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Your one clear point. Short sentences. No filler. In a 15s script this is 1–2 lines. In a 60s script, 3–4 lines max.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">PAYOFF</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[The resolution, punchline, or takeaway. This is what makes the viewer feel the video was worth watching.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">LOOP HOOK (optional)</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[A line at the end that connects back to the hook, making viewers want to rewatch. "And that's why I said [hook]..."]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">CAPTION</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Short post caption. 1–2 sentences + hashtags]</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            How to use this template
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
            Three steps from blank page to ready-to-film script.
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
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Want AI to fill it in for you?
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates every section of this template automatically — hook, body, payoff, loop hook, and caption — from a saved client voice profile. Pick the length, paste the topic, get a complete TikTok script in under 60 seconds. No brackets to fill.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Generate a script free <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What Scribtly adds to the template
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            The template gives you structure. Scribtly gives you a finished script.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            Generate your TikTok script automatically.
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

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  Zap,
  ArrowRight,
  Sparkles,
  FileText,
  Target,
  RefreshCw,
  Hash,
  Mic,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "YouTube Shorts script generator for freelancers",
  description:
    "Write YouTube Shorts scripts that stop the scroll. Scribtly generates 15–60 second vertical scripts in your client's voice — hook, body, and loop hook in under 60 seconds.",
  keywords: [
    "YouTube Shorts script generator",
    "AI YouTube Shorts writer",
    "short-form video scripts",
    "YouTube Shorts hook generator",
    "vertical video script",
  ],
  alternates: { canonical: "/youtube-shorts-scripts" },
  openGraph: {
    type: "website",
    url: "/youtube-shorts-scripts",
    siteName: "Scribtly",
    title: "YouTube Shorts script generator for freelancers · Scribtly",
    description:
      "15–60 second vertical scripts in your client's voice — hook, body, and loop hook in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly YouTube Shorts script generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Shorts script generator for freelancers · Scribtly",
    description:
      "15–60 second vertical scripts in your client's voice — hook, body, and loop hook in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "YouTube Shorts Scripts", item: `${SITE_URL}/youtube-shorts-scripts` },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "15/30/60s", label: "lengths" },
  { value: "Hook-first", label: "structure" },
];

const steps = [
  {
    n: "1",
    title: "Save client profile",
    desc: "Store their niche, audience, tone, and brand phrases once. Every Short you generate starts from that saved profile — no re-briefing.",
  },
  {
    n: "2",
    title: "Pick length + topic",
    desc: "Choose 15, 30, or 60 seconds. Drop in the topic or talking point and hit generate.",
  },
  {
    n: "3",
    title: "Get hook, body, loop hook",
    desc: "A scroll-stopping opening hook, tight body copy, and a loop hook that sends viewers back to the start — all matched to the client's voice.",
  },
];

const features = [
  {
    icon: Target,
    title: "First-second hooks",
    desc: "Pattern-interrupt openers engineered to stop the scroll before viewers can swipe past.",
  },
  {
    icon: Clock,
    title: "Vertical-native pacing",
    desc: "Scripts are timed to hit the exact length — 15, 30, or 60 seconds — when spoken at a natural pace.",
  },
  {
    icon: RefreshCw,
    title: "Loop hooks for rewatches",
    desc: "Ending lines that feed back into the opener, boosting replays and pushing the video in the algorithm.",
  },
  {
    icon: FileText,
    title: "Short punchy sentences",
    desc: "Every line is written for vertical video — punchy, scannable, and fast to deliver on camera.",
  },
  {
    icon: Hash,
    title: "Hashtags + captions",
    desc: "Relevant hashtags and caption copy included alongside the script — ready to paste into the upload form.",
  },
  {
    icon: Mic,
    title: "Client voice locked in",
    desc: "Saved profiles mean every Short sounds like the creator, not like an AI template.",
  },
];

const befores = [
  "Re-explaining the client's voice to ChatGPT for every single Short",
  "Over-long scripts that ramble past the time limit",
  "Missing hooks that let viewers swipe away in the first second",
  "No hashtags or captions — extra work after the script is done",
  "Starting from a blank page every time",
];

const afters = [
  "Client voice saved once, used in every script automatically",
  "Scripts paced to hit the exact 15, 30, or 60 second target",
  "Scroll-stopping hook first — every single time",
  "Hashtags and captions included alongside every script",
  "Complete Short script in under 60 seconds",
];

const faqs = [
  {
    q: "How is YouTube Shorts different from TikTok scripts?",
    a: "Shorts and TikToks share the same vertical format but have different audiences and algorithm signals. Scribtly generates Shorts scripts with loop hooks specifically designed for YouTube's replay behaviour, while TikTok scripts at /tiktok-scripts are tuned for TikTok's discover and share patterns.",
  },
  {
    q: "What lengths does the Shorts generator support?",
    a: "Scribtly supports 15, 30, and 60 second Shorts. Each is structured and timed so the script hits the target duration when spoken at a natural, on-camera pace.",
  },
  {
    q: "Do loop hooks actually work?",
    a: "Loop hooks are one of the highest-impact levers for YouTube Shorts. They create a seamless transition from the end back to the beginning, increasing replays — and replay count is a key ranking signal in the Shorts feed.",
  },
  {
    q: "Will the script sound like AI?",
    a: "Not if you've set up the client's profile. Scribtly uses the saved niche, tone, audience, and brand phrases to generate scripts in their voice. The output sounds like the creator, not like a generic AI response.",
  },
  {
    q: "Can I use this for multiple channels?",
    a: "Yes. Create a separate voice profile for each client or channel. Switch between them instantly — every profile is stored and ready to use for the next brief.",
  },
];

export default function YouTubeShortsPage() {
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
            YouTube Shorts Scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            YouTube Shorts scripts that<br className="hidden md:block" /> stop the scroll
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Stop writing from a blank page. Scribtly generates a complete Shorts script — hook, body, and loop hook — in your client's exact voice, in under 60 seconds.
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
              src="/hero-youtube.png"
              alt="Scribtly YouTube Shorts script generator interface"
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
          From brief to finished Short in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No prompt engineering. No copy-pasting tone guides. No rework.
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
            What every Short script includes
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Platform-optimised structure, your client's voice, and everything they need to hit record.
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
            Your next YouTube Short is 60 seconds away.
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

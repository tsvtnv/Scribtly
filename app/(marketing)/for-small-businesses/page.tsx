import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  DollarSign,
  Shuffle,
  LayoutTemplate,
  BookMarked,
  Layers,
  Zap,
  GraduationCap,
} from "lucide-react";

export const metadata = {
  title: "AI video script writer for small businesses — Scribtly",
  description:
    "Scribtly helps small businesses create professional video scripts without a copywriter. Generate YouTube, TikTok, and Reels scripts in your brand voice in under 60 seconds.",
  keywords: [
    "video script generator for small business",
    "AI script writer small business",
    "small business video marketing script",
    "social media script generator",
    "business video script tool",
  ],
  alternates: { canonical: "/for-small-businesses" },
  openGraph: {
    type: "website",
    url: "/for-small-businesses",
    siteName: "Scribtly",
    title: "AI video script writer for small businesses · Scribtly",
    description:
      "Scribtly helps small businesses create professional video scripts without a copywriter. Generate YouTube, TikTok, and Reels scripts in your brand voice in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly for small businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI video script writer for small businesses · Scribtly",
    description:
      "Scribtly helps small businesses create professional video scripts without a copywriter. Generate YouTube, TikTok, and Reels scripts in your brand voice in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For Small Businesses", item: `${SITE_URL}/for-small-businesses` },
  ],
};

const stats = [
  { value: "No copywriter", label: "needed" },
  { value: "< 60s", label: "per script" },
  { value: "Your brand voice", label: "every time" },
];

const steps = [
  {
    n: "1",
    title: "Set up your brand profile",
    desc: "Add your products, tone, audience, and key phrases. Takes 5 minutes. Your brand voice is saved for every script from here on.",
  },
  {
    n: "2",
    title: "Choose platform + describe the video",
    desc: "Pick YouTube, TikTok, or Reels, then describe what the video is about. Scribtly handles the structure for each platform.",
  },
  {
    n: "3",
    title: "Get a professional script ready to film",
    desc: "A polished, platform-native script in under 60 seconds — written in your brand voice without any marketing experience needed.",
  },
];

const pains = [
  {
    icon: DollarSign,
    title: "Copywriters are expensive and slow",
    desc: "Waiting days and paying hundreds per script makes video marketing hard to justify. Scribtly gets you a professional script in under 60 seconds — at a fraction of the cost.",
  },
  {
    icon: Shuffle,
    title: "Inconsistent brand voice",
    desc: "Different scripts sounding like they're from different companies confuses customers and weakens your brand. Scribtly locks in your voice so every video sounds the same.",
  },
  {
    icon: LayoutTemplate,
    title: "Video marketing feels overwhelming",
    desc: "Not knowing how to structure a video or what to say is the biggest barrier to getting started. Scribtly gives you a professional structure built in — no marketing degree needed.",
  },
];

const features = [
  {
    icon: BookMarked,
    title: "Brand voice saved once",
    desc: "Set up your brand profile once. Every script generated from that point sounds like your business — consistent and on-brand.",
  },
  {
    icon: Layers,
    title: "Multi-platform output",
    desc: "YouTube, TikTok, and Instagram Reels — each gets a script built for its own format, length, and algorithm.",
  },
  {
    icon: Zap,
    title: "Professional structure",
    desc: "Every script follows a proven video structure: hook, body, and call to action — without you having to think about it.",
  },
  {
    icon: GraduationCap,
    title: "No marketing degree needed",
    desc: "Scribtly is built for business owners, not marketers. Describe your video in plain English and get a professional script back.",
  },
];

const befores = [
  "Paying £200+ per script to copywriters",
  "Scripts that don't sound like your brand",
  "No idea how to structure a video",
  "Social content backlog piling up",
  "Separate tools for every platform",
];

const afters = [
  "Full script in 60 seconds from your saved brand voice",
  "Consistent tone across every video",
  "Platform-native structure built in",
  "Content backlog cleared fast",
  "YouTube, TikTok, and Reels from one tool",
];

const faqs = [
  {
    q: "Do I need marketing experience to use this?",
    a: "No. Scribtly is designed for business owners, not marketers. You describe your video in plain language and Scribtly turns it into a professional, structured script — no copywriting knowledge required.",
  },
  {
    q: "How is this different from hiring a copywriter?",
    a: "A copywriter takes days and costs hundreds per script. Scribtly generates a professional script in under 60 seconds using your saved brand voice. You can produce a month of content in an afternoon.",
  },
  {
    q: "What size of business is this for?",
    a: "Scribtly works for any small business that wants to use video marketing — from solo traders to teams of 10. If you're creating your own content rather than outsourcing an entire marketing team, Scribtly is built for you.",
  },
  {
    q: "What platforms are supported?",
    a: "YouTube (long-form and Shorts), TikTok (15–60 seconds), and Instagram Reels (15–60 seconds). Each platform gets a script built for its specific structure and audience expectations.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — 5 scripts to start, no credit card required. Enough to try it across a few video ideas before committing.",
  },
];

export default function ForSmallBusinessesPage() {
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
            For Small Businesses
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Professional video scripts.<br className="hidden md:block" /> No copywriter needed.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly gives small businesses the script-writing power of a professional copywriter — without the cost or wait. Save your brand voice once. Generate YouTube, TikTok, and Reels scripts in under 60 seconds.
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
              alt="Scribtly AI script writer for small businesses"
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
          From idea to ready-to-film script in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No marketing expertise. No briefing calls. No waiting days.
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
            Three problems small businesses hit. One fix.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            These are the things that stop small businesses from doing video marketing. Scribtly fixes all three.
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
          Same business, same video idea — completely different experience.
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
          Questions from small business owners
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
            Start creating professional video scripts today.
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

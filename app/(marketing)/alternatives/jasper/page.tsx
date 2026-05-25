import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  FileText,
  DollarSign,
} from "lucide-react";

export const metadata = {
  title: "Scribtly vs Jasper — the better video script writer",
  description:
    "Jasper is a general copywriting tool. Scribtly is purpose-built for video scripts. See why freelancers switch from Jasper to Scribtly for YouTube, TikTok, and Reels scripts.",
  keywords: [
    "jasper alternative for scripts",
    "scribtly vs jasper",
    "jasper video script alternative",
    "better than jasper for video",
    "AI script writer vs jasper",
  ],
  alternates: { canonical: "/alternatives/jasper" },
  openGraph: {
    type: "website",
    url: "/alternatives/jasper",
    siteName: "Scribtly",
    title: "Scribtly vs Jasper — the better video script writer",
    description:
      "Jasper is a general copywriting tool. Scribtly is purpose-built for video scripts. See why freelancers switch from Jasper to Scribtly for YouTube, TikTok, and Reels scripts.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly vs Jasper" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly vs Jasper — the better video script writer",
    description:
      "Jasper is a general copywriting tool. Scribtly is purpose-built for video scripts. See why freelancers switch from Jasper to Scribtly for YouTube, TikTok, and Reels scripts.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Alternatives", item: `${SITE_URL}/alternatives` },
    { "@type": "ListItem", position: 3, name: "Scribtly vs Jasper", item: `${SITE_URL}/alternatives/jasper` },
  ],
};

const stats = [
  { value: "Purpose-built", label: "for video" },
  { value: "Client voice", label: "not generic" },
  { value: "Platform-native", label: "structure" },
];

const pains = [
  {
    icon: DollarSign,
    title: "Expensive for what script writers actually need",
    desc: "Jasper charges for features like SEO content and blog posts that video script writers will never use. Scribtly is priced for script output.",
  },
  {
    icon: FileText,
    title: "No platform-native script structure",
    desc: "Jasper generates text blocks, not structured YouTube, TikTok, or Reels scripts. You still have to format hooks, sections, and CTAs yourself.",
  },
  {
    icon: Users,
    title: "No client voice management",
    desc: "Jasper's brand voice tools aren't built for managing multiple client profiles. Scribtly is built specifically for freelancers and agencies managing many clients.",
  },
];

const comparisonRows = [
  { feature: "Purpose", competitor: "General copywriting", scribtly: "Video scripts only" },
  { feature: "Platform-native structure", competitor: "✕ Manual", scribtly: "✓ Built in" },
  { feature: "Client voice profiles", competitor: "✕ Brand voice (limited)", scribtly: "✓ Full client profiles" },
  { feature: "Script lengths", competitor: "✕ Manual", scribtly: "✓ Structured lengths" },
  { feature: "Pricing", competitor: "$$$$ General tool", scribtly: "$ Script-focused" },
  { feature: "Built for freelancers", competitor: "✕ Enterprise focus", scribtly: "✓ Built for client work" },
];

const features = [
  {
    icon: DollarSign,
    title: "Script-focused pricing",
    desc: "Pay for what you actually use. Scribtly's plans are built around script volume — not a full content suite you'll only use 10% of.",
  },
  {
    icon: Users,
    title: "Full client voice profiles",
    desc: "Save a complete profile for every client — niche, tone, audience, key phrases. Switch between clients in seconds without rebriefing.",
  },
  {
    icon: Zap,
    title: "Platform-native output",
    desc: "YouTube, TikTok, and Reels each get their own structure. No manual formatting. No guessing what goes where.",
  },
  {
    icon: FileText,
    title: "Built for freelancers",
    desc: "Multi-client management, one-link script sharing, PDF export. Everything a freelancer or agency needs — none of what they don't.",
  },
];

const faqs = [
  {
    q: "What does Jasper do that Scribtly doesn't?",
    a: "Jasper covers blog posts, emails, ads, and other content types. Scribtly is focused exclusively on video scripts.",
  },
  {
    q: "Is Scribtly cheaper than Jasper?",
    a: "Scribtly's plans are priced for script output, not a full content suite. Check the pricing page for current plans.",
  },
  {
    q: "How does Scribtly handle multiple clients?",
    a: "Save a separate voice profile for each client. Switch instantly — no rebriefing.",
  },
  {
    q: "What platforms does Scribtly support?",
    a: "YouTube, TikTok, and Instagram Reels — each with platform-native structure.",
  },
  {
    q: "Can I try Scribtly before committing?",
    a: "Yes. 5 free scripts, no credit card required.",
  },
];

export default function JasperAlternativePage() {
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
            Scribtly vs Jasper
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Jasper is for general copy.<br className="hidden md:block" /> Scribtly is for video scripts.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Jasper can write a lot of things. But video scripts — with saved client voices, platform-specific structure, and hooks built for watch-time — aren't its strength. Scribtly is purpose-built for exactly that.
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
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-b-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            The problem with Jasper for script writing
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Jasper does a lot. That's the problem — when you only need video scripts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Scribtly vs Jasper
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Side-by-side, feature by feature.
        </p>
        <div className="rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 px-5 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-text-secondary dark:text-dark-muted">Jasper</th>
                  <th className="text-center py-3 px-5 font-semibold text-primary">Scribtly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="py-3 px-5">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-text-secondary dark:text-dark-muted">{row.competitor}</td>
                    <td className="py-3 px-5 text-center text-primary font-medium">{row.scribtly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Why Scribtly wins for video scripts
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            When the job is video scripts, a purpose-built tool beats a content suite every time.
          </p>
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
            Try Scribtly free. No credit card.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. Purpose-built for video. No bloat.
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

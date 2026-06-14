import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  FileText,
  Layers,
  RefreshCw,
  Target,
} from "lucide-react";

export const metadata = {
  title: "Scribtly vs Copy.ai — better for video script writing",
  description:
    "Copy.ai covers dozens of content types. Scribtly covers one: video scripts. See why freelancers and agencies choose Scribtly for client-ready YouTube, TikTok, and Reels scripts.",
  keywords: [
    "scribtly vs copy.ai",
    "copy.ai alternative for scripts",
    "copy.ai video script alternative",
    "better than copy.ai for video scripts",
    "AI script writer vs copy.ai",
    "copy ai script writing",
    "copy.ai alternative freelancers",
  ],
  alternates: { canonical: "/alternatives/copy-ai" },
  openGraph: {
    type: "website",
    url: "/alternatives/copy-ai",
    siteName: "Scribtly",
    title: "Scribtly vs Copy.ai — better for video script writing",
    description:
      "Copy.ai covers dozens of content types. Scribtly covers one: video scripts. See why freelancers and agencies choose Scribtly for client-ready YouTube, TikTok, and Reels scripts.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly vs Copy.ai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly vs Copy.ai — better for video script writing",
    description:
      "Copy.ai covers dozens of content types. Scribtly covers one: video scripts. See why freelancers and agencies choose Scribtly for client-ready YouTube, TikTok, and Reels scripts.",
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
    {
      "@type": "ListItem",
      position: 3,
      name: "Scribtly vs Copy.ai",
      item: `${SITE_URL}/alternatives/copy-ai`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Copy.ai do that Scribtly doesn't?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copy.ai handles a wide range of content types including emails, blog posts, social captions, and sales copy. Scribtly is focused exclusively on video scripts — YouTube, TikTok, Reels, LinkedIn video, podcast, and video ads.",
      },
    },
    {
      "@type": "Question",
      name: "Can Copy.ai save a client voice profile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copy.ai has brand voice settings, but they aren't built around the concept of managing multiple client profiles for freelance or agency work. Scribtly lets you save a full profile per client — niche, tone, audience, key phrases — and switch between them instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly generate platform-native scripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly generates scripts with platform-specific structure for YouTube (hooks, sections, CTA), TikTok (hook, body, loop), Instagram Reels, LinkedIn video, podcasts, and video ads. Copy.ai generates text blocks that you still need to structure yourself.",
      },
    },
    {
      "@type": "Question",
      name: "Is Scribtly cheaper than Copy.ai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly starts free with 5 scripts included. Its plans are priced around script volume, not a full content suite. Check the Scribtly pricing page for the latest plans — and check Copy.ai's site for their current pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Scribtly best suited for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly is built for freelance script writers, content creators, social media managers, agencies, and anyone who writes video scripts for clients. If scripts are a core deliverable in your work, Scribtly is faster and more structured than a general AI writing tool.",
      },
    },
  ],
};

const stats = [
  { value: "Scripts only", label: "no bloat" },
  { value: "Client voice", label: "saved per profile" },
  { value: "Platform-native", label: "structure built in" },
];

const pains = [
  {
    icon: Layers,
    title: "Built for everyone — optimised for no one",
    desc: "Copy.ai covers emails, blogs, ads, social captions, and more. That breadth is a drawback when you need video scripts — the structure, pacing, and output don't match what a YouTube or TikTok script actually needs.",
  },
  {
    icon: RefreshCw,
    title: "No persistent client voice",
    desc: "Copy.ai's brand settings are workspace-level, not client-level. If you write for five different clients, you're still managing voice context manually with each generation. Scribtly saves a separate profile per client.",
  },
  {
    icon: Target,
    title: "Text output, not script output",
    desc: "Copy.ai produces copy — text you still need to reshape into a hook, section breakdown, CTA, and B-roll notes. Scribtly produces a script, structured for the platform you chose.",
  },
];

const comparisonRows = [
  { feature: "Primary purpose", competitor: "General AI copywriting", scribtly: "Video scripts only" },
  { feature: "Platform-native structure", competitor: "✕ Manual formatting", scribtly: "✓ YouTube/TikTok/Reels built in" },
  { feature: "Client voice profiles", competitor: "✕ Workspace brand voice", scribtly: "✓ Per-client profiles" },
  { feature: "Multi-client management", competitor: "✕ Not purpose-built", scribtly: "✓ Built for client work" },
  { feature: "Script sections (hook, CTA…)", competitor: "✕ Requires prompting", scribtly: "✓ Automatic" },
  { feature: "Built for freelancers", competitor: "✕ General tool", scribtly: "✓ Purpose-built" },
];

const features = [
  {
    icon: Users,
    title: "Per-client voice profiles",
    desc: "Save every client's niche, tone, audience, and key phrases once. Switch profiles in seconds — no rebriefing, no copy-pasting tone guides.",
  },
  {
    icon: Zap,
    title: "Platform-native script structure",
    desc: "Choose YouTube, TikTok, Reels, LinkedIn video, podcast, or video ad. Scribtly generates a properly structured script — hook, body, CTA, and platform-specific elements.",
  },
  {
    icon: FileText,
    title: "Built for client delivery",
    desc: "Scribtly is designed around freelance and agency workflows — not general content production. Multiple clients, fast output, clean scripts.",
  },
  {
    icon: Target,
    title: "Script-focused, nothing else",
    desc: "You're not paying for blog post templates, email sequences, or ad copy you'll never use. Every feature in Scribtly exists to help you write better video scripts faster.",
  },
];

const faqs = [
  {
    q: "What does Copy.ai do that Scribtly doesn't?",
    a: "Copy.ai handles a wide range of content types including emails, blog posts, social captions, and sales copy. Scribtly is focused exclusively on video scripts — YouTube, TikTok, Reels, LinkedIn video, podcast, and video ads.",
  },
  {
    q: "Can Copy.ai save a client voice profile?",
    a: "Copy.ai has brand voice settings, but they aren't built around managing multiple client profiles for freelance or agency work. Scribtly lets you save a full profile per client and switch between them instantly.",
  },
  {
    q: "Does Scribtly generate platform-native scripts?",
    a: "Yes. Scribtly generates scripts with platform-specific structure for YouTube, TikTok, Instagram Reels, LinkedIn video, podcasts, and video ads. Copy.ai generates text blocks you still need to structure yourself.",
  },
  {
    q: "Is Scribtly cheaper than Copy.ai?",
    a: "Scribtly starts free with 5 scripts included. Its plans are priced around script volume, not a full content suite. Check the Scribtly pricing page — and Copy.ai's site for their latest pricing.",
  },
  {
    q: "Who is Scribtly best suited for?",
    a: "Scribtly is built for freelance script writers, content creators, social media managers, and agencies. If video scripts are a core deliverable, Scribtly is faster and more structured than a general AI writing tool.",
  },
];

export default function CopyAiAlternativePage() {
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%),linear-gradient(315deg,rgba(56,193,114,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Scribtly vs Copy.ai
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Copy.ai writes everything.<br className="hidden md:block" /> Scribtly writes video scripts.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Copy.ai is a general AI copywriting suite — useful for a lot of things, but not designed for video scripts. Scribtly is purpose-built for script writing: saved client voices, platform-native structure, and output that actually fits YouTube, TikTok, and Reels.
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

      {/* Pain points */}
      <section className="bg-[var(--color-surface)] border-b-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            The problem with Copy.ai for script writing
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Copy.ai is a capable tool — it just wasn't designed with video scripts in mind.
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

      {/* Comparison table */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Scribtly vs Copy.ai
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
                  <th className="text-center py-3 px-4 font-semibold text-text-secondary dark:text-dark-muted">
                    Copy.ai
                  </th>
                  <th className="text-center py-3 px-5 font-semibold text-primary">Scribtly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="py-3 px-5">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-text-secondary dark:text-dark-muted">
                      {row.competitor}
                    </td>
                    <td className="py-3 px-5 text-center text-primary font-medium">{row.scribtly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-text-secondary dark:text-dark-muted text-center">
          Pricing and features may change — check each product&apos;s site for the latest details.
        </p>
      </section>

      {/* Why Scribtly wins */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Why Scribtly works better for video scripts
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            A focused tool beats a content suite when the job is client-ready video scripts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group flex items-start gap-4 hover:border-primary/40 transition-all duration-200"
              >
                <f.icon
                  size={18}
                  className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200"
                />
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who is Scribtly for */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Who switches from Copy.ai to Scribtly?
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
          Copy.ai is a reasonable choice if you produce a wide mix of content — emails, blog drafts, ad copy, and social posts. If video scripts are your main or only deliverable, a general tool adds friction rather than reducing it.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
          Scribtly is the better fit when:
        </p>
        <ul className="space-y-2 mb-8">
          {[
            "You write scripts for multiple clients and need to switch voices quickly.",
            "You deliver YouTube, TikTok, Reels, or video ad scripts as a service.",
            "You're tired of formatting AI text into proper script structure by hand.",
            "You want hooks, CTAs, and B-roll notes generated as part of the script.",
            "You manage client tone guides and need them saved — not pasted each session.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-muted">
              <span className="text-primary mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          If that sounds like your workflow, explore the{" "}
          <Link href="/for-freelancers" className="text-primary hover:underline">
            freelancer use case
          </Link>{" "}
          or the{" "}
          <Link href="/for-agencies" className="text-primary hover:underline">
            agency use case
          </Link>{" "}
          to see how Scribtly fits into client-facing script production.
        </p>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-12 text-center">
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Generate your next client script in under 60 seconds
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 max-w-md mx-auto">
            Save a client profile once. Choose a platform. Get a structured, client-ready script — no formatting required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg">Try Scribtly free <ArrowRight size={14} className="ml-1" /></Button>
            </Link>
            <Link href="/ai-script-writer">
              <Button size="lg" variant="outline">See how it works</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links / related pages */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <h2 className="text-lg font-semibold tracking-tight mb-5">Explore Scribtly</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "YouTube script generator", href: "/youtube-scripts" },
            { label: "TikTok script generator", href: "/tiktok-scripts" },
            { label: "Instagram Reels scripts", href: "/instagram-reels-scripts" },
            { label: "Video ad scripts", href: "/video-ad-scripts" },
            { label: "For freelancers", href: "/for-freelancers" },
            { label: "For agencies", href: "/for-agencies" },
            { label: "Best AI script writers", href: "/best-ai-script-writers" },
            { label: "Scribtly vs ChatGPT", href: "/alternatives/chatgpt-for-scripts" },
            { label: "Scribtly vs Jasper", href: "/alternatives/jasper" },
            { label: "Pricing", href: "/pricing" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-muted hover:text-primary transition-colors py-1"
            >
              <ArrowRight size={12} className="shrink-0 text-primary/60" />
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-surface)] border-t-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16">
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Stop writing scripts from a blank page.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. Built for client work from day one.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              >
                Start free <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                className="bg-white/10 text-white border-hair border-white/30 hover:bg-white/20"
              >
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

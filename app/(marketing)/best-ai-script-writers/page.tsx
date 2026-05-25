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
  Shield,
} from "lucide-react";

export const metadata = {
  title: "Best AI script writers for video in 2025",
  description:
    "Looking for the best AI script writer? We compare the top tools for YouTube, TikTok, and Reels scripts — including ChatGPT, Jasper, and Scribtly. Find the right one for your workflow.",
  keywords: [
    "best AI script writer",
    "AI video script generator comparison",
    "top script writing AI tools",
    "best tool for writing video scripts",
    "AI script writer 2025",
  ],
  alternates: { canonical: "/best-ai-script-writers" },
  openGraph: {
    type: "website",
    url: "/best-ai-script-writers",
    siteName: "Scribtly",
    title: "Best AI script writers for video in 2025",
    description:
      "Looking for the best AI script writer? We compare the top tools for YouTube, TikTok, and Reels scripts — including ChatGPT, Jasper, and Scribtly. Find the right one for your workflow.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Best AI script writers comparison 2025" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI script writers for video in 2025",
    description:
      "Looking for the best AI script writer? We compare the top tools for YouTube, TikTok, and Reels scripts — including ChatGPT, Jasper, and Scribtly. Find the right one for your workflow.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best AI Script Writers", item: `${SITE_URL}/best-ai-script-writers` },
  ],
};

const stats = [
  { value: "3 tools", label: "compared" },
  { value: "Video-focused", label: "analysis" },
  { value: "Updated 2025", label: "" },
];

const tools = [
  {
    name: "ChatGPT",
    tagline: "General-purpose AI",
    pros: [
      "Free tier available",
      "Flexible prompting",
      "Wide general knowledge",
    ],
    cons: [
      "No saved voices",
      "Requires re-prompting every session",
      "No platform-native structure",
    ],
    bestFor: "Quick one-off experiments",
    recommended: false,
  },
  {
    name: "Jasper",
    tagline: "Enterprise content suite",
    pros: [
      "Covers many content types",
      "Strong brand voice features",
      "Good for long-form",
    ],
    cons: [
      "Expensive for scripts only",
      "No platform-native structure",
      "Overkill for freelancers",
    ],
    bestFor: "Marketing teams doing all content types",
    recommended: false,
  },
  {
    name: "Scribtly",
    tagline: "Purpose-built for video scripts",
    pros: [
      "Saved client voice profiles",
      "Platform-native YouTube/TikTok/Reels structure",
      "Built for freelancers and agencies",
    ],
    cons: [
      "Video scripts only (no blogs/emails)",
    ],
    bestFor: "Freelancers and agencies producing video scripts at scale",
    recommended: true,
  },
];

const features = [
  {
    icon: Users,
    title: "Saved client voice profiles",
    desc: "Store each client's niche, tone, audience, and brand phrases once. Every script comes out sounding like them — not like generic AI output.",
  },
  {
    icon: Zap,
    title: "Platform-native structure",
    desc: "YouTube, TikTok, and Reels scripts are structurally different. Scribtly builds each one with the correct pacing, hooks, and format built in.",
  },
  {
    icon: FileText,
    title: "First draft in under 60 seconds",
    desc: "Describe the topic, pick the platform, hit generate. A complete, structured script arrives in under a minute — ready to refine.",
  },
  {
    icon: Shield,
    title: "Multi-client management",
    desc: "Manage as many client profiles as you need. Switch between them instantly, share scripts for review, and keep your library organised.",
  },
];

const faqs = [
  {
    q: "What is the best free AI script writer?",
    a: "Scribtly offers 5 free scripts with no credit card required — and unlike ChatGPT's free tier, every feature is purpose-built for video script output with saved client voices and platform-native structure.",
  },
  {
    q: "Is ChatGPT good for video scripts?",
    a: "ChatGPT can produce a script, but it requires careful prompting every session and has no memory of your clients. For consistent, professional output across multiple clients, a purpose-built tool like Scribtly is significantly faster.",
  },
  {
    q: "What's the difference between Scribtly and Jasper?",
    a: "Jasper is a broad content suite covering blogs, emails, ads, and more. Scribtly does one thing: video scripts. That focus means better platform-native structure, proper client voice management, and pricing that makes sense for script writers.",
  },
  {
    q: "Which AI script writer is best for freelancers?",
    a: "Scribtly — it's built for the exact workflow freelancers use: save a client profile, generate a draft, refine, deliver. Multi-client management, one-link sharing, and PDF export are all included.",
  },
  {
    q: "How do I choose the right tool?",
    a: "If you're writing video scripts professionally — for clients, consistently, across platforms — choose a purpose-built tool. If you're doing occasional one-off scripts alongside other content types, a general tool may be enough.",
  },
];

export default function BestAIScriptWritersPage() {
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
            Tool Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            The best AI script writers<br className="hidden md:block" /> for video in 2025
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            There are dozens of AI writing tools — but most aren't built for video scripts. We compared the top options so you can pick the right tool for YouTube, TikTok, and Reels scripts.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Try the top pick free <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">See pricing</Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {stats.map((s) => (
              <div
                key={s.label || s.value}
                className="flex items-center gap-2 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-sm backdrop-blur"
              >
                <span className="font-semibold text-primary">{s.value}</span>
                {s.label && <span className="text-text-secondary dark:text-dark-muted">{s.label}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          The top AI script writing tools compared
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Honest pros, honest cons — so you pick the right tool for your workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`relative rounded-xl border-hair p-6 flex flex-col gap-4 transition-all duration-200 ${
                tool.recommended
                  ? "border-primary/50 bg-[var(--color-primary-tint)] shadow-[0_0_0_1px_rgba(127,119,221,0.2),0_12px_40px_rgba(127,119,221,0.12)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]"
              }`}
            >
              {tool.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white shadow-sm">
                    <Sparkles size={10} />
                    Recommended
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg">{tool.name}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted mt-0.5">{tool.tagline}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {tool.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <Check size={13} className="text-primary shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {tool.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <X size={13} className="text-text-secondary dark:text-dark-muted shrink-0 mt-0.5" />
                      <span className="text-text-secondary dark:text-dark-muted">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-3 border-t border-[var(--color-border)]">
                <p className="text-xs text-text-secondary dark:text-dark-muted">
                  <span className="font-semibold">Best for:</span> {tool.bestFor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What makes Scribtly the best pick for video scripts
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Purpose-built features for the specific job of writing video scripts at scale.
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
            Try the purpose-built option free.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. Platform-native structure from day one.
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

import Link from "next/link";
import {
  Sparkles,
  FileText,
  Library,
  Download,
  ArrowRight,
  Zap,
  Target,
  ShieldCheck,
  LayoutGrid,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Scribtly: AI Video Script Generator for Freelancers",
  description:
    "Generate YouTube, TikTok and Reels scripts for your clients in under 60 seconds. Save their brand voice once. Generate forever. Start free.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Scribtly",
    title: "Scribtly: Write video scripts 10x faster",
    description:
      "AI script generator built for freelancers. Save client voices. Generate forever. Start free.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Scribtly — AI video scripts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly: Write video scripts 10x faster",
    description:
      "AI script generator built for freelancers. Save client voices. Generate forever. Start free.",
    images: ["/og-image.svg"],
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scribtly",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI video script generator for YouTube, TikTok, and Reels. Save your client's brand voice once, generate platform-specific scripts in under 60 seconds.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free plan with 5 scripts included",
  },
};

const features = [
  {
    icon: Sparkles,
    title: "Save client profiles once",
    desc: "Name, niche, tone, audience, stored forever. Every script auto-written in their voice.",
  },
  {
    icon: FileText,
    title: "Platform-specific structure",
    desc: "YouTube hooks are different to TikTok. Scribtly knows. You don't have to explain it.",
  },
  {
    icon: Library,
    title: "Script library per client",
    desc: "All scripts organised by client. Find, reuse, export any script in seconds.",
  },
  {
    icon: Download,
    title: "One-click export",
    desc: "Download as PDF or copy to clipboard. Ready to send to your client instantly.",
    pro: true,
  },
];

const painPoints = [
  "2-3 hours to write one decent YouTube script",
  "Constantly re-explaining your client's tone to ChatGPT",
  "No organised system. Scripts lost in docs and chat threads",
  "Clients asking for revisions on things you got wrong",
];

const stats = [
  { number: "60s", label: "Average script generation time" },
  { number: "5", label: "Platforms supported" },
  { number: "5/mo", label: "Starting price" },
];

const plans = [
  {
    name: "Free",
    price: "0",
    scripts: "5 scripts / month",
    features: ["Standard quality model", "1 client", "YouTube platform"],
    cta: "Start free",
    variant: "outline" as const,
    accent: "text-primary",
  },
  {
    name: "Basic",
    price: "5",
    suffix: "/mo",
    scripts: "25 scripts / month",
    features: ["All quality models", "3 clients", "All 5 platforms"],
    cta: "Start Basic",
    variant: "outline" as const,
    accent: "text-[#38c172]",
  },
  {
    name: "Pro",
    price: "19",
    suffix: "/mo",
    scripts: "100 scripts / month",
    features: ["10 clients", "Content pipeline", "PDF export"],
    cta: "Start Pro",
    variant: "primary" as const,
    popular: true,
    accent: "text-primary",
  },
  {
    name: "Agency",
    price: "49",
    suffix: "/mo",
    scripts: "350 scripts / month",
    features: ["Unlimited clients", "3 team members", "Bulk generation"],
    cta: "Start Agency",
    variant: "outline" as const,
    accent: "text-[#f0b429]",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.16),transparent_36%),linear-gradient(90deg,rgba(56,193,114,0.12),transparent_28%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_42%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div>
            <div className="animate-fade-up-1 mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/70 px-3 py-1.5 text-xs text-text-secondary shadow-sm backdrop-blur dark:text-dark-muted">
              <Sparkles size={13} className="text-primary" />
              Built for client script work, not generic chat
            </div>
            <h1 className="animate-fade-up-1 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight md:text-6xl">
              Write video scripts 10x faster,
              <br />
              <span className="relative inline-block text-primary">
                in your client's exact voice
                <span className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-primary/30 animate-underline-sweep" />
              </span>
            </h1>
            <p className="animate-fade-up-2 mt-6 max-w-2xl text-base text-text-secondary md:text-lg dark:text-dark-muted">
              Scribtly turns saved brand voice, platform rules, and client context into ready-to-send YouTube, TikTok, and Reels scripts in under 60 seconds.
            </p>
            <div className="animate-fade-up-3 mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="relative overflow-hidden shadow-[0_18px_45px_rgba(127,119,221,0.35)] before:absolute before:inset-y-0 before:-left-10 before:w-10 before:rotate-12 before:bg-white/40 before:animate-shimmer">
                  <span className="relative inline-flex items-center gap-2">
                    Start free - 5 scripts included <ArrowRight size={16} />
                  </span>
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  See pricing
                </Button>
              </Link>
            </div>
            <div className="animate-fade-up-3 mt-8 grid max-w-xl grid-cols-1 gap-3 text-xs text-text-secondary sm:grid-cols-3 dark:text-dark-muted">
              <span className="inline-flex items-center gap-2 rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2">
                <Zap size={14} className="text-primary" /> 60 second scripts
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2">
                <Target size={14} className="text-[#38c172]" /> 5 platforms
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2">
                <ShieldCheck size={14} className="text-[#f0b429]" /> No card required
              </span>
            </div>
          </div>

          <div className="animate-float-panel relative hidden md:block">
            <div className="rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]/82 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between border-b-hair border-[var(--color-border)] pb-3">
                <div>
                  <div className="text-xs text-text-secondary dark:text-dark-muted">Generating for</div>
                  <div className="font-semibold">Acme Studios</div>
                </div>
                <span className="rounded-full bg-[#d9f0df] px-2.5 py-1 text-xs font-medium text-[#274432] dark:bg-[#1f3b29] dark:text-[#c9e9d1]">
                  On voice
                </span>
              </div>
              <div className="space-y-4">
                {["Hook", "Intro", "Story beat", "CTA"].map((label, index) => (
                  <div key={label} className="animate-script-line" style={{ animationDelay: `${index * 180}ms` }}>
                    <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase text-text-secondary dark:text-dark-muted">
                      <span>{label}</span>
                      <span>{index === 0 ? "Strong open" : "Drafted"}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[var(--color-border)]">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${88 - index * 10}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-md bg-[var(--color-primary-tint)] p-3">
                  <div className="font-semibold text-primary">10x</div>
                  <div className="text-text-secondary dark:text-dark-muted">faster</div>
                </div>
                <div className="rounded-md bg-[#d9f0df] p-3 text-[#274432] dark:bg-[#1f3b29] dark:text-[#c9e9d1]">
                  <div className="font-semibold">5</div>
                  <div>formats</div>
                </div>
                <div className="rounded-md bg-[#fff0cf] p-3 text-[#62430a] dark:bg-[#3a2f18] dark:text-[#f8d98b]">
                  <div className="font-semibold">0</div>
                  <div>rework</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENSHOT SECTION */}
      <section className="bg-[#E8E5DF] dark:bg-dark-elevated border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-10">
            See it in action
          </h2>
          <div className="max-w-[900px] mx-auto rounded-lg border border-black/10 dark:border-white/10 bg-[var(--color-surface)] shadow-sm overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b-hair border-[var(--color-border)] bg-[var(--color-bg)]">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <div className="ml-3 text-[11px] text-text-secondary dark:text-dark-muted truncate">
                scribtly.com/generate
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0 min-h-[320px]">
              <div className="md:col-span-2 border-r-hair border-[var(--color-border)] p-5 space-y-4">
                <div>
                  <div className="text-[11px] font-medium text-text-secondary dark:text-dark-muted mb-1.5">Client</div>
                  <div className="h-9 rounded-md border-hair border-[var(--color-border)] px-3 flex items-center text-sm">
                    Acme Studios
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-text-secondary dark:text-dark-muted mb-1.5">Topic</div>
                  <div className="h-9 rounded-md border-hair border-[var(--color-border)] px-3 flex items-center text-sm text-text-secondary">
                    How to pick the right camera lens
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-text-secondary dark:text-dark-muted mb-1.5">Platform</div>
                  <div className="flex gap-1.5">
                    <div className="px-2.5 py-1 rounded-md bg-primary text-white text-[11px]">YouTube</div>
                    <div className="px-2.5 py-1 rounded-md border-hair border-[var(--color-border)] text-[11px]">TikTok</div>
                    <div className="px-2.5 py-1 rounded-md border-hair border-[var(--color-border)] text-[11px]">Reel</div>
                  </div>
                </div>
                <Link href="/signup" className="block">
                  <Button size="sm" fullWidth>Generate script</Button>
                </Link>
              </div>
              <div className="md:col-span-3 p-5 space-y-2.5 bg-[var(--color-bg)]">
                <div className="text-[11px] font-medium text-text-secondary dark:text-dark-muted">HOOK</div>
                <div className="h-2.5 w-11/12 bg-[var(--color-border)] rounded" />
                <div className="h-2.5 w-4/5 bg-[var(--color-border)] rounded" />
                <div className="text-[11px] font-medium text-text-secondary dark:text-dark-muted mt-3">INTRO</div>
                <div className="h-2.5 w-full bg-[var(--color-border)] rounded" />
                <div className="h-2.5 w-10/12 bg-[var(--color-border)] rounded" />
                <div className="h-2.5 w-9/12 bg-[var(--color-border)] rounded" />
                <div className="text-[11px] font-medium text-text-secondary dark:text-dark-muted mt-3">SECTION 1</div>
                <div className="h-2.5 w-full bg-[var(--color-border)] rounded" />
                <div className="h-2.5 w-8/12 bg-primary/50 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <p className="text-xs text-text-secondary dark:text-dark-muted text-center mt-6">
            Pick a client, enter a topic, get a full script in under 60 seconds.
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-10">
          Writing scripts manually is killing your margins
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {painPoints.map((p) => (
            <li
              key={p}
              className="p-4 pl-5 rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] border-l-[3px] border-l-danger"
            >
              <span className="text-sm">{p}</span>
            </li>
          ))}
        </ul>
        <p className="text-center text-sm italic text-text-secondary dark:text-dark-muted mt-10">
          There is a better way.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Everything ChatGPT can't do for your clients
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-2xl mx-auto">
          Five things that are only possible when the tool knows your clients.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, desc, pro }) => (
            <Card key={title} className="relative">
              {pro && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wide">
                  Pro
                </span>
              )}
              <Icon size={20} className="text-primary mb-3" />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{desc}</p>
            </Card>
          ))}
        </div>
        <Card className="relative mt-4 bg-[#EEEDFE] dark:bg-[#1e1b3a]">
          <span className="absolute top-3 right-3 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/15 text-primary uppercase tracking-wide">
            Pro
          </span>
          <LayoutGrid size={20} className="text-primary mb-3" />
          <h3 className="font-semibold mb-1">Content pipeline</h3>
          <p className="text-sm text-text-secondary dark:text-dark-muted max-w-2xl">
            Track every piece of content from idea to published. Drag cards through Idea to Scripting to Review to Approved to Published.
          </p>
        </Card>
      </section>

      {/* STATS */}
      <section className="max-w-4xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ number, label }) => (
            <div
              key={label}
              className="text-center p-6 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)] animate-soft-pop"
            >
              <div className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
                {label === "Starting price" ? <span aria-hidden>&pound;</span> : null}{number}
              </div>
              <div className="text-xs text-text-secondary dark:text-dark-muted mt-1.5">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-16 md:py-20">
        <div className="absolute inset-x-5 top-8 bottom-8 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]/35 shadow-[0_28px_90px_rgba(0,0,0,0.12)] dark:bg-white/[0.03]" />
        <div className="relative">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#d9f0df] px-3 py-1 text-xs font-medium text-[#274432] dark:bg-[#1f3b29] dark:text-[#c9e9d1]">
              <Sparkles size={13} /> Launch pricing
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Simple pricing. No surprises.
            </h2>
            <p className="mt-3 text-sm text-text-secondary dark:text-dark-muted">
              Start free. Upgrade when your client list grows.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`group relative flex min-h-[274px] flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_55px_rgba(0,0,0,0.16)] animate-price-card ${
                  plan.popular ? "border-primary ring-1 ring-primary/30 shadow-[0_18px_60px_rgba(127,119,221,0.22)]" : ""
                }`}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-[#38c172] to-[#f0b429] opacity-0 transition group-hover:opacity-100" />
                {plan.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                )}
                <div className="font-semibold">{plan.name}</div>
                <div className="mt-4 mb-1">
                  <span className={`text-4xl font-semibold tracking-tight ${plan.accent}`}>
                    <span aria-hidden>&pound;</span>{plan.price}
                  </span>
                  {plan.suffix && (
                    <span className="text-sm text-text-secondary dark:text-dark-muted">
                      {plan.suffix}
                    </span>
                  )}
                </div>
                <div className="text-xs text-text-secondary dark:text-dark-muted mb-5">
                  {plan.scripts}
                </div>
                <ul className="space-y-2 mb-5 text-sm flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button size="sm" variant={plan.variant} fullWidth>
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              See full pricing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Your next client script is 60 seconds away.
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-8">
          5 free scripts. No credit card. Upgrade anytime.
        </p>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <Link href="/signup">
            <Button size="lg">Start free</Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">See pricing</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

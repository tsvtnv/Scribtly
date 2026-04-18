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
  openGraph: {
    title: "Scribtly: Write video scripts 10× faster",
    description:
      "AI script generator built for freelancers. Save client voices. Generate forever. Start free.",
    images: ["/og-image.png"],
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
  { number: "£5/mo", label: "Starting price" },
];

const plans = [
  {
    name: "Free",
    price: "£0",
    scripts: "5 scripts / month",
    features: ["Standard quality model", "1 client", "YouTube platform"],
    cta: "Start free",
    variant: "outline" as const,
  },
  {
    name: "Basic",
    price: "£5",
    suffix: "/mo",
    scripts: "25 scripts / month",
    features: ["All quality models", "3 clients", "All 5 platforms"],
    cta: "Start Basic",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "£19",
    suffix: "/mo",
    scripts: "100 scripts / month",
    features: ["10 clients", "Content pipeline", "PDF export"],
    cta: "Start Pro",
    variant: "primary" as const,
    popular: true,
  },
  {
    name: "Agency",
    price: "£49",
    suffix: "/mo",
    scripts: "350 scripts / month",
    features: ["Unlimited clients", "3 team members", "Bulk generation"],
    cta: "Start Agency",
    variant: "outline" as const,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-5 pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="animate-fade-up-1 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Write video scripts 10× faster,
            <br />
            <span className="text-primary relative inline-block">
              in your client's exact voice
              <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-primary/30 rounded-full animate-pulse-slow" />
            </span>
          </h1>
          <p className="animate-fade-up-2 text-base md:text-lg text-text-secondary dark:text-dark-muted mt-6 max-w-2xl mx-auto">
            Scribtly generates YouTube, TikTok and Reels scripts for your clients in under 60 seconds. Save their brand voice once. Generate forever.
          </p>
          <div className="animate-fade-up-3 mt-8 flex flex-wrap gap-3 items-center justify-center">
            <Link href="/signup">
              <Button size="lg">
                Start free · 5 scripts included <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="ghost">
                See pricing
              </Button>
            </Link>
          </div>
          <div className="animate-fade-up-3 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary dark:text-dark-muted">
            <span className="inline-flex items-center gap-1.5">
              <Zap size={13} className="text-primary" /> 60 second scripts
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Target size={13} className="text-primary" /> 5 platforms
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-primary" /> No card required
            </span>
          </div>
        </div>

        {/* Ghost product preview (decorative) */}
        <div
          aria-hidden
          className="hidden lg:block pointer-events-none absolute right-0 top-24 w-[420px] opacity-[0.12] blur-[1.5px] select-none"
        >
          <div className="rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-2/3 bg-[var(--color-border)] rounded" />
              <div className="h-2 w-full bg-[var(--color-border)] rounded" />
              <div className="h-2 w-5/6 bg-[var(--color-border)] rounded" />
              <div className="h-2 w-4/6 bg-[var(--color-border)] rounded" />
              <div className="h-2 w-3/4 bg-primary/40 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENSHOT SECTION (placeholder mock UI until real screenshot lands) */}
      <section className="bg-[#E8E5DF] dark:bg-dark-elevated border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-10">
            See it in action
          </h2>
          <div className="max-w-[900px] mx-auto rounded-xl border border-black/10 dark:border-white/10 bg-[var(--color-surface)] shadow-sm overflow-hidden">
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
        {/* Full-width pipeline card */}
        <Card className="relative mt-4 bg-[#EEEDFE] dark:bg-[#1e1b3a]">
          <span className="absolute top-3 right-3 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/15 text-primary uppercase tracking-wide">
            Pro
          </span>
          <LayoutGrid size={20} className="text-primary mb-3" />
          <h3 className="font-semibold mb-1">Content pipeline</h3>
          <p className="text-sm text-text-secondary dark:text-dark-muted max-w-2xl">
            Track every piece of content from idea to published. Drag cards through Idea → Scripting → Review → Approved → Published.
          </p>
        </Card>
      </section>

      {/* STATS */}
      <section className="max-w-4xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ number, label }) => (
            <div
              key={label}
              className="text-center p-6 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <div className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
                {number}
              </div>
              <div className="text-xs text-text-secondary dark:text-dark-muted mt-1.5">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Simple pricing. No surprises.
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10">
          Start free. Upgrade when your client list grows.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular ? "border-primary ring-1 ring-primary/30" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary text-white uppercase tracking-wide">
                  Most popular
                </span>
              )}
              <div className="font-semibold">{plan.name}</div>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
                {plan.suffix && (
                  <span className="text-sm text-text-secondary dark:text-dark-muted">
                    {plan.suffix}
                  </span>
                )}
              </div>
              <div className="text-xs text-text-secondary dark:text-dark-muted mb-4">
                {plan.scripts}
              </div>
              <ul className="space-y-1.5 mb-5 text-sm flex-1">
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

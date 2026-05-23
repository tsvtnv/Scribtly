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
import {
  ScrollingTicker,
  PlatformDemo,
  AnimatedStats,
  ScrollReveal,
} from "@/components/home/HomepageInteractives";
import { FounderSection } from "@/components/home/FounderCard";

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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly — AI video scripts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly: Write video scripts 10x faster",
    description:
      "AI script generator built for freelancers. Save client voices. Generate forever. Start free.",
    images: ["/opengraph-image"],
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
    priceCurrency: "GBP",
    description: "Free plan with 5 scripts included",
  },
};

const features = [
  {
    icon: Sparkles,
    title: "Save client profiles once",
    desc: "Name, niche, tone, audience — stored forever. Every script auto-written in their voice.",
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
  "2–3 hours to write one decent YouTube script",
  "Re-explaining your client's tone to ChatGPT every time",
  "Scripts lost across docs, emails, and chat threads",
  "Clients asking for revisions on things you got wrong",
];

const steps = [
  {
    n: "01",
    title: "Save your client's profile",
    desc: "Add their niche, audience, tone, and brand phrases. Takes 2 minutes. Every future script starts from this.",
  },
  {
    n: "02",
    title: "Drop in a topic",
    desc: "Describe the video idea. Pick the platform and length. That's all the context Scribtly needs.",
  },
  {
    n: "03",
    title: "Get a ready-to-send script",
    desc: "Full script streamed in under 60 seconds. Structured for the platform. In their exact voice.",
  },
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        {/* gradient background */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.18),transparent_40%),linear-gradient(90deg,rgba(56,193,114,0.1),transparent_30%)]" />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />

        {/* floating orbs */}
        <div className="absolute top-[-80px] left-[-60px] w-[420px] h-[420px] rounded-full bg-primary/10 blur-[90px] animate-orb-drift pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[340px] h-[340px] rounded-full bg-[#38c172]/10 blur-[80px] animate-orb-drift-alt pointer-events-none" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <div className="animate-fade-up-1 mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-text-secondary shadow-sm backdrop-blur dark:text-dark-muted">
              <Sparkles size={12} className="text-primary" />
              Built for client script work, not generic chat
            </div>

            <h1 className="animate-fade-up-1 text-4xl font-semibold leading-[1.05] tracking-tight md:text-[3.5rem]">
              Write video scripts 10x faster,{" "}
              <span className="relative inline-block text-primary whitespace-nowrap">
                in your client's exact voice
                <span className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-primary/30 animate-underline-sweep" />
              </span>
            </h1>

            <p className="animate-fade-up-2 mt-6 max-w-xl text-base text-text-secondary md:text-lg dark:text-dark-muted">
              Scribtly turns saved brand voice, platform rules, and client context into
              ready-to-send YouTube, TikTok, and Reels scripts in under 60 seconds.
            </p>

            <div className="animate-fade-up-3 mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="relative overflow-hidden shadow-[0_18px_45px_rgba(127,119,221,0.38)] before:absolute before:inset-y-0 before:-left-10 before:w-10 before:rotate-12 before:bg-white/40 before:animate-shimmer"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Start free — 5 scripts included <ArrowRight size={15} />
                  </span>
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline">See pricing</Button>
              </Link>
            </div>

            <div className="animate-fade-up-3 mt-7 grid max-w-sm grid-cols-3 gap-2 text-xs text-text-secondary dark:text-dark-muted">
              <span className="inline-flex items-center gap-1.5 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2 backdrop-blur">
                <Zap size={13} className="text-primary shrink-0" /> 60s scripts
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2 backdrop-blur">
                <Target size={13} className="text-[#38c172] shrink-0" /> 5 platforms
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2 backdrop-blur">
                <ShieldCheck size={13} className="text-[#f0b429] shrink-0" /> No card
              </span>
            </div>
          </div>

          {/* hero panel */}
          <div className="animate-float-panel relative hidden md:block">
            <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-xl" />
            <div className="relative rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)]/90 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.18)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between border-b-hair border-[var(--color-border)] pb-3">
                <div>
                  <div className="text-[11px] text-text-secondary dark:text-dark-muted">Generating for</div>
                  <div className="font-semibold text-sm">Acme Studios</div>
                </div>
                <span className="rounded-full bg-[#d9f0df] px-2.5 py-1 text-[11px] font-medium text-[#274432] dark:bg-[#1f3b29] dark:text-[#c9e9d1]">
                  On voice
                </span>
              </div>

              <div className="space-y-4">
                {["Hook", "Intro", "Story beat", "CTA"].map((label, i) => (
                  <div key={label} className="animate-script-line" style={{ animationDelay: `${i * 200}ms` }}>
                    <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase text-text-secondary dark:text-dark-muted">
                      <span>{label}</span>
                      <span className="text-[10px]">{i === 0 ? "Strong open" : "Drafted"}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--color-border)]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-1000"
                        style={{ width: `${90 - i * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-[var(--color-primary-tint)] p-3">
                  <div className="font-bold text-primary">10×</div>
                  <div className="text-text-secondary dark:text-dark-muted text-[10px] mt-0.5">faster</div>
                </div>
                <div className="rounded-lg bg-[#d9f0df] p-3 text-[#274432] dark:bg-[#1f3b29] dark:text-[#c9e9d1]">
                  <div className="font-bold">5</div>
                  <div className="text-[10px] mt-0.5">formats</div>
                </div>
                <div className="rounded-lg bg-[#fff0cf] p-3 text-[#62430a] dark:bg-[#3a2f18] dark:text-[#f8d98b]">
                  <div className="font-bold">0</div>
                  <div className="text-[10px] mt-0.5">rework</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <ScrollingTicker />

      {/* ── PROBLEM ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Writing scripts manually is killing your margins
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Every hour you spend staring at a blank page is an hour you could spend taking on another client.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {painPoints.map((p, i) => (
            <ScrollReveal key={p} delay={i * 60}>
              <div className="p-4 pl-5 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)] border-l-[3px] border-l-danger hover:shadow-sm transition-shadow">
                <span className="text-sm">{p}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={250}>
          <p className="text-center text-sm italic text-text-secondary dark:text-dark-muted mt-10">
            There is a better way.
          </p>
        </ScrollReveal>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
              From blank page to finished script in 3 steps
            </h2>
            <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
              No prompt engineering. No copy-pasting tone guides. No rework.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* connector line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30" />

            {steps.map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 100}>
                <div className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary/30 bg-[var(--color-primary-tint)] text-primary font-bold text-lg mb-4 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 mx-auto">
                    {step.n}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="text-center mt-12">
              <Link href="/signup">
                <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                  Try it free — no card required
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PLATFORM DEMO ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            See it in action
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Switch between platforms and watch the script structure change automatically.
          </p>
        </ScrollReveal>
        <PlatformDemo />
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Everything ChatGPT can't do for your clients
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-2xl mx-auto">
            Only possible when the tool actually knows your clients.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, desc, pro }, i) => (
            <ScrollReveal key={title} delay={i * 70}>
              <Card className="group relative h-full hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-200">
                {pro && (
                  <span className="absolute top-3 right-3 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wide">
                    Pro
                  </span>
                )}
                <Icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted">{desc}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={280}>
          <Card className="relative mt-4 bg-gradient-to-br from-[#EEEDFE] to-[#f5f4ff] dark:from-[#1e1b3a] dark:to-[#252340] hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(127,119,221,0.15)] transition-all duration-200 group">
            <span className="absolute top-3 right-3 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/15 text-primary uppercase tracking-wide">
              Pro
            </span>
            <LayoutGrid size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="font-semibold mb-1">Content pipeline</h3>
            <p className="text-sm text-text-secondary dark:text-dark-muted max-w-2xl">
              Track every piece of content from idea to published. Drag cards through
              Idea → Scripting → Review → Approved → Published.
            </p>
          </Card>
        </ScrollReveal>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-4xl mx-auto px-5 py-16">
        <AnimatedStats />
      </section>

      {/* ── FOUNDER ── */}
      <FounderSection />

      {/* ── PRICING TEASER ── */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-16 md:py-20">
        <div className="absolute inset-x-5 top-8 bottom-8 rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)]/40 shadow-[0_28px_90px_rgba(0,0,0,0.1)] dark:bg-white/[0.03]" />
        <div className="relative">
          <ScrollReveal>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#d9f0df] px-3 py-1 text-xs font-medium text-[#274432] dark:bg-[#1f3b29] dark:text-[#c9e9d1]">
                <Sparkles size={12} /> Launch pricing
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">
                Simple pricing. No surprises.
              </h2>
              <p className="mt-3 text-sm text-text-secondary dark:text-dark-muted">
                Start free. Upgrade when your client list grows.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 80}>
                <Card
                  className={`group relative flex min-h-[280px] flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] ${
                    plan.popular
                      ? "border-primary ring-1 ring-primary/30 shadow-[0_18px_60px_rgba(127,119,221,0.22)]"
                      : ""
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-[#38c172] to-[#f0b429] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {plan.popular && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  )}
                  <div className="font-semibold">{plan.name}</div>
                  <div className="mt-4 mb-1">
                    <span className={`text-4xl font-semibold tracking-tight ${plan.accent}`}>
                      <span aria-hidden>£</span>{plan.price}
                    </span>
                    {plan.suffix && (
                      <span className="text-sm text-text-secondary dark:text-dark-muted">{plan.suffix}</span>
                    )}
                  </div>
                  <div className="text-xs text-text-secondary dark:text-dark-muted mb-5">{plan.scripts}</div>
                  <ul className="space-y-2 mb-5 text-sm flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={14} className="text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button size="sm" variant={plan.variant} fullWidth>{plan.cta}</Button>
                  </Link>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              See full pricing <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        {/* gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="absolute bottom-[-30px] left-[-20px] w-48 h-48 rounded-full bg-[#38c172]/20 blur-[50px]" />

        <div className="relative max-w-3xl mx-auto px-8 py-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Your next client script is 60 seconds away.
          </h2>
          <p className="text-white/80 mb-8 text-base">
            5 free scripts. No credit card. Upgrade anytime.
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              >
                Start free <ArrowRight size={15} />
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

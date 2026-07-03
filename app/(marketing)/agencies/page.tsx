import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  CheckCircle,
  Target,
  MessageSquare,
  Inbox,
  TrendingUp,
  Zap,
  Star,
  Calendar,
  BarChart2,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "LinkedIn Outreach Automation for Agencies | Scribtly",
  description:
    "Run LinkedIn outreach for multiple clients from one dashboard. Scribtly automates prospecting, personalised messaging, and meeting booking for B2B agencies.",
  openGraph: {
    title: "LinkedIn Outreach Automation for Agencies | Scribtly",
    description:
      "Run LinkedIn outreach for multiple clients from one dashboard. Scribtly automates prospecting, personalised messaging, and meeting booking for B2B agencies.",
    type: "website",
    url: "https://scribtly.com/agencies",
  },
  alternates: {
    canonical: "https://scribtly.com/agencies",
  },
};

const agencyBenefits = [
  {
    icon: Users,
    title: "One dashboard, unlimited clients",
    body: "Manage LinkedIn outreach across every client account without switching browsers, logging in and out, or losing track of conversations.",
    detail: "Each client account operates independently with its own limits, campaigns, and inbox.",
  },
  {
    icon: Target,
    title: "ICP-driven targeting per client",
    body: "Define a unique ideal customer profile for each client. Scribtly scores and filters leads against those criteria before a single message is sent.",
    detail: "No more sending generic outreach that embarrasses your agency brand.",
  },
  {
    icon: MessageSquare,
    title: "Hyper-personalised at scale",
    body: "Every connection request and follow-up is built from real LinkedIn data — job title, company, location, and recent activity — so messages feel hand-written.",
    detail: "Clients see higher reply rates without you writing every message from scratch.",
  },
  {
    icon: Zap,
    title: "Automated sequences, not spray-and-pray",
    body: "Set cadences once per client — connection request, acceptance message, follow-up 1, follow-up 2 — and let Scribtly run them on safe, human-like timing.",
    detail: "Built-in safety limits keep each LinkedIn account healthy and within platform guidelines.",
  },
  {
    icon: Inbox,
    title: "Unified inbox across all accounts",
    body: "Every client's replies land in one organised view. Auto Book detects buying signals and sends calendar links at exactly the right moment.",
    detail: "Your team spends time closing, not chasing replies across a dozen tabs.",
  },
  {
    icon: BarChart2,
    title: "Live reporting per client",
    body: "Track connection rates, reply rates, and meetings booked for every campaign across every account. See what's working at a glance.",
    detail: "Send clients clean weekly reports backed by real numbers, not gut feel.",
  },
];

const agencySteps = [
  {
    num: "01",
    title: "Connect each client's LinkedIn account",
    body: "Link client profiles in minutes — no browser extensions, no technical setup. Each account stays isolated and safe.",
  },
  {
    num: "02",
    title: "Define the ICP for each client",
    body: "Tell Scribtly who each client wants to reach. Job titles, industries, company sizes, locations. Lead scoring happens automatically.",
  },
  {
    num: "03",
    title: "Build and launch campaigns",
    body: "Set up connection requests and follow-up sequences for each client once. Scribtly sends them at the right pace and handles replies.",
  },
  {
    num: "04",
    title: "Deliver meetings, not just reports",
    body: "Auto Book converts interested replies into booked calls automatically. Clients see pipeline grow without manual follow-up from your team.",
  },
];

const agencyTestimonials = [
  {
    quote: "We now run outreach for eight clients from a single dashboard. What used to take a full-time team member now runs in the background while we focus on strategy.",
    name: "Lauren T.",
    role: "Founder, B2B Growth Agency",
    initials: "LT",
  },
  {
    quote: "Our clients used to ask us why their LinkedIn wasn't getting replies. Now they ask us to book more calls because we keep filling their calendars.",
    name: "Marcus R.",
    role: "Head of Demand Gen, Sales Agency",
    initials: "MR",
  },
  {
    quote: "The multi-account view changed how we work. Everything in one place, each client separated, and personalisation that actually gets responses.",
    name: "Priya N.",
    role: "Operations Director, Outreach Agency",
    initials: "PN",
  },
];

const agencyFaqs = [
  {
    q: "How many client accounts can we manage?",
    a: "Scribtly supports multi-account management with each account running independently. During onboarding, our team will help you structure your agency setup based on the number of clients you have.",
  },
  {
    q: "Is each client's data kept separate?",
    a: "Yes. Every LinkedIn account, campaign, conversation, and lead is fully separated. One client's data is never visible when managing another.",
  },
  {
    q: "Will outreach look automated to prospects?",
    a: "No. Scribtly pulls from real LinkedIn profile data to personalise every message, and sends at human-like intervals with built-in safety limits. Recipients feel spoken to, not marketed at.",
  },
  {
    q: "What happens when a prospect replies?",
    a: "All replies land in the unified inbox. Auto Book monitors for buying signals and sends your client's calendar link automatically when a prospect shows interest.",
  },
  {
    q: "Do we need LinkedIn premium for each client?",
    a: "Scribtly works with standard LinkedIn accounts. Our team will advise on the right account setup for your agency during onboarding.",
  },
  {
    q: "How is this different from running ChatGPT prompts ourselves?",
    a: "Scribtly is a managed, fully-automated outreach system — not a writing assistant. It connects to LinkedIn, finds and scores leads, sends personalised sequences, handles replies, and books meetings without manual work between steps.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://scribtly.com/agencies",
      url: "https://scribtly.com/agencies",
      name: "LinkedIn Outreach Automation for Agencies | Scribtly",
      description:
        "Run LinkedIn outreach for multiple clients from one dashboard. Scribtly automates prospecting, personalised messaging, and meeting booking for B2B agencies.",
      isPartOf: { "@id": "https://scribtly.com/#website" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Scribtly",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://scribtly.com",
      description:
        "LinkedIn outreach automation platform for B2B sales teams and agencies. Automates prospecting, personalised messaging, and meeting booking.",
      offers: {
        "@type": "Offer",
        url: "https://scribtly.com/agencies",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: agencyFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://scribtly.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "For Agencies",
          item: "https://scribtly.com/agencies",
        },
      ],
    },
  ],
};

export default function AgenciesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: "var(--border)",
          background: "rgba(253,250,246,0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", href: "/#features" },
              { label: "How it works", href: "/#how-it-works" },
              { label: "Results", href: "/#results" },
              { label: "Get access", href: "/#get-access" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
              style={{
                background: "rgba(224,120,48,0.08)",
                borderColor: "rgba(224,120,48,0.25)",
                color: "var(--accent)",
              }}
            >
              <Users size={12} />
              Built for agencies
            </div>

            <h1
              className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              LinkedIn outreach for
              <br />
              <span style={{ color: "var(--accent)" }}>all your clients.</span>
              <br />
              One dashboard.
            </h1>

            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--text-muted)", maxWidth: "480px" }}
            >
              Scribtly lets agencies manage LinkedIn outreach across every client
              account from a single workspace — with ICP scoring, personalised
              sequences, and automatic meeting booking built in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="https://book.octelis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Book a call to get access
                <ArrowRight size={16} />
              </a>
              <Link
                href="/#features"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                See how it works
              </Link>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                "Multi-account management",
                "Separate client inboxes",
                "Safe LinkedIn limits per account",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <CheckCircle size={15} style={{ color: "var(--accent)" }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right side — stat cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                value: "18%",
                label: "Average reply rate across agency accounts",
                sub: "vs industry average of 4–6%",
              },
              {
                value: "3×",
                label: "More meetings booked per client",
                sub: "compared to manual outreach",
              },
              {
                value: "< 2 min",
                label: "To connect a new client account",
                sub: "No browser extensions needed",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border p-6 flex items-start gap-5"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-subtle)",
                }}
              >
                <p
                  className="text-4xl font-bold shrink-0"
                  style={{ color: "var(--accent)" }}
                >
                  {stat.value}
                </p>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section
        className="px-6 py-20 border-t border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              The agency problem
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Managing LinkedIn outreach for multiple clients is a mess
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                heading: "Constant tab-switching",
                body: "Your team logs in and out of different LinkedIn accounts, losing context and wasting hours every week on admin instead of results.",
              },
              {
                heading: "Generic messages that get ignored",
                body: "Manually writing personalised messages for every prospect across every client is impossible at scale, so quality drops and reply rates suffer.",
              },
              {
                heading: "No consistent reporting",
                body: "Pulling together campaign numbers from separate accounts and spreadsheets makes client reporting slow, inconsistent, and hard to defend.",
              },
            ].map((p) => (
              <div
                key={p.heading}
                className="rounded-2xl border p-7"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-base)",
                }}
              >
                <h3
                  className="font-semibold text-base mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.heading}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft CTA */}
      <section className="px-6 py-14 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-base mb-5"
            style={{ color: "var(--text-muted)" }}
          >
            Scribtly brings every client account, campaign, inbox, and report
            into one place — so your agency can scale outreach without scaling
            headcount.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:opacity-80"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            See Scribtly in action
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* Agency benefits */}
      <section id="features" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              What you get
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Everything an agency needs to run LinkedIn outreach at scale
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              Built for teams managing outreach across multiple clients — not
              just one LinkedIn profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencyBenefits.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border p-7 flex flex-col gap-4"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-subtle)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(224,120,48,0.12)" }}
                >
                  <f.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {f.body}
                  </p>
                  <p
                    className="text-xs leading-relaxed font-medium"
                    style={{ color: "var(--text-primary)", opacity: 0.6 }}
                  >
                    {f.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for agencies */}
      <section
        className="px-6 py-24 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              How it works
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Your agency live in four steps
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              No long onboarding. No technical integration. You can have your
              first client campaign running today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agencySteps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border p-8"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-base)",
                }}
              >
                <div
                  className="text-5xl font-bold mb-5 leading-none"
                  style={{ color: "rgba(224,120,48,0.20)" }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-semibold text-lg mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section
        className="px-6 py-16 border-t border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-bold mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to scale your agency's outreach?
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--text-muted)" }}>
            Scribtly is invite-only. Book a 30-minute call to see the platform
            and find out if it fits your agency's client base.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book your agency demo
            <ArrowRight size={16} />
          </a>
          <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            No commitment. No credit card. Just a conversation.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24" style={{ background: "var(--bg-subtle)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              What agencies say
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Agencies that switched to Scribtly
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agencyTestimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border p-7 flex flex-col gap-5"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-base)",
                }}
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="currentColor"
                      style={{ color: "var(--accent)" }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "var(--accent)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency-specific value props */}
      <section
        className="px-6 py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Why agencies choose Scribtly over manual outreach tools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                heading: "Safe for every client account",
                body: "Built-in daily sending limits and human-like timing protect each LinkedIn account independently. You run outreach at scale without risking client profiles.",
              },
              {
                icon: TrendingUp,
                heading: "Deliverables your clients can see",
                body: "Real-time dashboards show connection rates, reply rates, and meetings booked. Share tangible results every week — not just activity reports.",
              },
              {
                icon: Zap,
                heading: "Faster client onboarding",
                body: "Connect a new client account and have their first campaign live in under two minutes. No technical setup, no browser extensions, no back-and-forth.",
              },
              {
                icon: Calendar,
                heading: "Meetings booked without your team",
                body: "Auto Book detects when a prospect is ready and sends the calendar link automatically. Your team closes — Scribtly does the follow-up.",
              },
            ].map((p) => (
              <div
                key={p.heading}
                className="rounded-2xl border p-7 flex gap-5"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-subtle)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(224,120,48,0.12)" }}
                >
                  <p.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.heading}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-6 py-24 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {agencyFaqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border p-7"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-base)",
                }}
              >
                <h3
                  className="font-semibold text-base mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {faq.q}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="get-access"
        className="px-6 py-28"
        style={{ background: "var(--dark)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
            style={{
              borderColor: "rgba(224,120,48,0.4)",
              color: "var(--accent)",
              background: "rgba(224,120,48,0.08)",
            }}
          >
            <Calendar size={12} />
            Invite only
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white leading-tight">
            Scale your agency's outreach.
            <br />
            Start booking more client meetings.
          </h2>
          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Scribtly is invite only. Book a 30-minute call with our team to see
            the platform live and find out if it is the right fit for your
            agency.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book your agency demo
            <ArrowRight size={16} />
          </a>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No commitment. No credit card. Just a conversation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={90}
              height={22}
              className="h-6 w-auto"
            />
          </Link>
          <span>© 2026 Scribtly. All rights reserved.</span>
          <span>
            Powered by{" "}
            <a
              href="https://octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              octelis.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

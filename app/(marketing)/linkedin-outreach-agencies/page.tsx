import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Users, Target, Inbox, Zap, TrendingUp, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "LinkedIn Outreach Automation for Agencies | Scribtly",
  description:
    "Run LinkedIn outreach across multiple client accounts from one dashboard. ICP scoring, AI personalisation, and Auto Book — built for agencies.",
  openGraph: {
    title: "LinkedIn Outreach Automation for Agencies | Scribtly",
    description:
      "Manage LinkedIn outreach across every client from a single dashboard. ICP scoring, hyper-personalised messages, and automatic meeting booking.",
    type: "website",
    url: "https://scribtly.com/linkedin-outreach-agencies",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Outreach Automation for Agencies | Scribtly",
    description:
      "Run LinkedIn outreach at scale across multiple clients. One dashboard, AI personalisation, automatic meeting booking.",
  },
  alternates: {
    canonical: "https://scribtly.com/linkedin-outreach-agencies",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scribtly",
  description:
    "LinkedIn outreach automation platform for agencies. Run multi-account campaigns with ICP scoring, AI-personalised messaging, and automatic meeting booking from a single dashboard.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://scribtly.com",
  offers: {
    "@type": "Offer",
    url: "https://book.octelis.com",
    description: "Invite-only access. Book a call to get started.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many LinkedIn accounts can an agency manage in Scribtly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly supports multiple LinkedIn accounts from a single dashboard. Each account is managed independently with its own sending limits and campaign settings, so you can run outreach for several clients simultaneously without any risk of cross-account interference.",
      },
    },
    {
      "@type": "Question",
      name: "Can we manage different clients from one dashboard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly's multi-account dashboard lets you switch between clients, monitor each campaign's performance, and manage all inboxes from one place. You do not need to log in and out of separate tools or browser profiles.",
      },
    },
    {
      "@type": "Question",
      name: "How does Scribtly personalise messages at agency scale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly pulls real data from each prospect's LinkedIn profile — their current role, company size, location, and recent activity — and uses it to generate contextually relevant messages. This happens automatically for every prospect across every client campaign, so personalisation does not create extra manual work as you scale.",
      },
    },
    {
      "@type": "Question",
      name: "How does Auto Book work for agency clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When a prospect replies with buying signals — interest, questions about pricing, requests to connect further — Scribtly's Auto Book feature detects the intent and sends your client's calendar link automatically. Your clients receive booked meetings without needing to monitor every conversation manually.",
      },
    },
    {
      "@type": "Question",
      name: "Is Scribtly safe for multiple LinkedIn accounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Each LinkedIn account in Scribtly operates within its own independent sending limits with human-like timing. Scribtly does not require a browser extension, which removes a common source of LinkedIn flagging. Built-in safety controls keep each account within platform guidelines.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly require a long setup for each new client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Connecting a new LinkedIn account and configuring ICP scoring takes under two minutes. You describe the ideal customer in plain English, set the outreach sequence, and the campaign is ready. There is no complex technical configuration for each new client.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "LinkedIn Outreach for Agencies",
      item: "https://scribtly.com/linkedin-outreach-agencies",
    },
  ],
};

const agencyBenefits = [
  {
    icon: Users,
    title: "Multi-account from one dashboard",
    body: "Add every client's LinkedIn account and manage campaigns, inboxes, and results without switching profiles or browser windows.",
  },
  {
    icon: Target,
    title: "ICP scoring per client",
    body: "Define each client's ideal customer in plain English. Scribtly scores every prospect before outreach starts — no unqualified leads slip through.",
  },
  {
    icon: MessageSquare,
    title: "AI personalisation at scale",
    body: "Messages are generated from each prospect's real LinkedIn data: role, company, location, recent activity. No merge fields. No templated copy.",
  },
  {
    icon: Inbox,
    title: "Unified inbox across all clients",
    body: "Every prospect reply lands in one place regardless of which client account it came from. Your team handles conversations without jumping between tools.",
  },
  {
    icon: Zap,
    title: "Auto Book — meetings without manual follow-up",
    body: "When a prospect shows buying intent, Scribtly sends the calendar link automatically. Your clients get booked meetings without anyone monitoring conversations in real time.",
  },
  {
    icon: TrendingUp,
    title: "Live analytics per campaign",
    body: "Track connection rates, reply rates, and meetings booked for each client. Show clients clear results without building manual reports.",
  },
];

const faqs = [
  {
    q: "How many LinkedIn accounts can an agency manage in Scribtly?",
    a: "Scribtly supports multiple LinkedIn accounts from a single dashboard. Each account is managed independently with its own sending limits and campaign settings, so you can run outreach for several clients simultaneously without any risk of cross-account interference.",
  },
  {
    q: "Can we manage different clients from one dashboard?",
    a: "Yes. Scribtly's multi-account dashboard lets you switch between clients, monitor each campaign's performance, and manage all inboxes from one place. You do not need to log in and out of separate tools or browser profiles.",
  },
  {
    q: "How does Scribtly personalise messages at agency scale?",
    a: "Scribtly pulls real data from each prospect's LinkedIn profile — their current role, company size, location, and recent activity — and uses it to generate contextually relevant messages. This happens automatically for every prospect across every client campaign, so personalisation does not create extra manual work as you scale.",
  },
  {
    q: "How does Auto Book work for agency clients?",
    a: "When a prospect replies with buying signals — interest, questions about pricing, requests to connect further — Scribtly's Auto Book feature detects the intent and sends your client's calendar link automatically. Your clients receive booked meetings without needing to monitor every conversation manually.",
  },
  {
    q: "Is Scribtly safe for multiple LinkedIn accounts?",
    a: "Yes. Each LinkedIn account in Scribtly operates within its own independent sending limits with human-like timing. Scribtly does not require a browser extension, which removes a common source of LinkedIn flagging. Built-in safety controls keep each account within platform guidelines.",
  },
  {
    q: "Does Scribtly require a long setup for each new client?",
    a: "No. Connecting a new LinkedIn account and configuring ICP scoring takes under two minutes. You describe the ideal customer in plain English, set the outreach sequence, and the campaign is ready. There is no complex technical configuration for each new client.",
  },
];

export default function LinkedInOutreachAgenciesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Nav */}
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
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={120} height={30} className="h-8 w-auto" />
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>LinkedIn Outreach for Agencies</span>
        </nav>
      </div>

      {/* Page header */}
      <header className="max-w-4xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          For Agencies
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          LinkedIn Outreach Automation Built for Agencies
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Run LinkedIn outreach across every client from a single dashboard.
          ICP-scored targeting, AI-personalised messages, and automatic meeting booking —
          so your team delivers results without doubling headcount.
        </p>
      </header>

      {/* Top CTA */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <div
          className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Scribtly is invite-only for agencies
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Book a 30-minute call to see the platform live and find out how it fits your client workflow.
            </p>
          </div>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book a demo <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 pb-20">

        {/* Section 1: The agency problem */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The problem with LinkedIn outreach at agency scale
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Managing LinkedIn outreach for one client is straightforward. Managing it for five, ten, or twenty clients
          is a different problem entirely.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Most outreach tools are designed for single users or internal sales teams.
          They assume one LinkedIn account, one inbox, one ICP. When agencies try to use them at scale,
          things break down:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Logging in and out of separate browser profiles for each client",
            "Manually reviewing hundreds of leads without a consistent qualification process",
            "Writing personalised messages from scratch or relying on generic templates that get ignored",
            "Missing buying signals in crowded inboxes because replies are scattered across accounts",
            "Building reports manually from fragmented data instead of showing clients live results",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--accent)" }}
              />
              <span className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The result is that agencies end up limited in how many clients they can serve well,
          or they add headcount just to handle the operational overhead of running outreach across multiple accounts.
        </p>

        {/* Section 2: What Scribtly does differently */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly handles LinkedIn outreach for agencies
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Scribtly is built around a centralised model. Every client account lives in one dashboard.
          You do not need separate logins, separate tools, or separate browser windows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {agencyBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border p-6 flex flex-col gap-3"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(224,120,48,0.12)" }}
              >
                <benefit.icon size={18} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {benefit.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: ICP scoring */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          ICP scoring: qualify leads before outreach begins
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The biggest variable in LinkedIn outreach quality is lead targeting.
          Most tools send to whoever is on the list. Scribtly scores every prospect against your client's ideal
          customer profile before a single message goes out.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          You describe the ideal customer in plain English — job title, company size, industry, seniority level.
          Scribtly ranks every LinkedIn profile it finds against that criteria and only starts outreach on leads
          that meet the threshold.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          For agencies, this removes a step that would otherwise require a member of your team to manually
          review and qualify leads for each client. The scoring happens automatically and consistently,
          regardless of how many client campaigns are running simultaneously.
        </p>

        {/* Section 4: Personalisation */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          AI personalisation that does not create extra work
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Personalisation is the difference between a 4% reply rate and an 18% reply rate.
          But writing personalised messages at scale is exactly what burns agency teams out.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly pulls real data from each prospect's LinkedIn profile —
          their current role, company size, location, and recent activity —
          and uses it to generate a message that is specific to that person.
          Not merge fields. Not {`{first_name}`} placeholders. Actual context from their profile.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          This happens for every prospect across every client campaign without any additional manual input from your team.
          As you add more clients, the personalisation scales with the platform rather than with your headcount.
        </p>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Scale your agency's LinkedIn outreach without scaling your team
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly is invite-only. Book a 30-minute call to see the multi-account dashboard, ICP scoring,
            and Auto Book in action across real client campaigns.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book a call to get access <ArrowRight size={16} />
          </a>
        </div>

        {/* Section 5: Auto Book */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Auto Book: your clients get meetings while your team sleeps
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Getting a reply is only half the job. Converting that reply into a booked meeting is where most outreach
          workflows break down — especially at agency scale, where no one has time to monitor every conversation
          across every client account.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly's Auto Book feature detects buying intent in prospect replies.
          When a prospect asks about pricing, requests more information, or signals interest,
          Auto Book sends the client's calendar link at the right moment — automatically, without anyone
          needing to act on it manually.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Your clients wake up to booked meetings. Your team handles conversations that need genuine human judgement,
          not ones that just need a calendar link.
        </p>

        {/* Section 6: Account safety */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          LinkedIn account safety across multiple clients
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Account safety is a serious concern for agencies. If a client's LinkedIn account gets restricted
          because of automation that pushed past platform limits, it damages your reputation and their pipeline.
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              title: "Independent limits per account",
              body: "Each LinkedIn account in Scribtly operates with its own sending limits. Campaigns across different clients do not interfere with each other's safety limits.",
            },
            {
              title: "Human-like timing",
              body: "Messages go out at natural intervals that mimic human behaviour. Scribtly does not send in obvious automated bursts that LinkedIn's systems can detect.",
            },
            {
              title: "No browser extension required",
              body: "Scribtly operates through a managed cloud connection. There is nothing to install and nothing that could conflict with your clients' LinkedIn sessions on their own machines.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 7: Common agency mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes agencies make with LinkedIn outreach
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Using one person's LinkedIn account for all clients",
              fix: "Each client needs their own account in outreach. Cross-using one profile dilutes personalisation and puts a single account at risk if anything goes wrong.",
            },
            {
              mistake: "Sending the same message template across every client campaign",
              fix: "A template written for a B2B SaaS client will not resonate for a professional services firm. ICP and messaging should be calibrated separately per client.",
            },
            {
              mistake: "Treating all reply types the same",
              fix: "A reply saying 'not now' and a reply asking 'what does this cost?' need different follow-up actions. Automating buying signal detection means the right action happens at the right moment.",
            },
            {
              mistake: "Running outreach without a consistent lead quality filter",
              fix: "If your team is spending time managing replies from leads who were never a good fit, the problem started at the targeting stage. Scoring before outreach prevents this.",
            },
          ].map((item) => (
            <div
              key={item.mistake}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                ✗ {item.mistake}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--accent)" }}>Fix: </strong>{item.fix}
              </p>
            </div>
          ))}
        </div>

        {/* Who it's for */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Which agencies Scribtly works well for
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is currently invite-only. Every agency that joins is onboarded personally,
          so the ICP scoring is calibrated correctly from the start. It works best for:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "Agencies running LinkedIn outreach for B2B clients",
            "Lead generation agencies where pipeline delivery is the core product",
            "Sales enablement agencies helping clients build outbound",
            "Marketing agencies adding LinkedIn outreach to their service offering",
            "Growth agencies running multi-channel campaigns where LinkedIn is one channel",
            "Boutique agencies that need to deliver high-quality results across a small number of clients",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold mb-6 mt-12" style={{ color: "var(--text-primary)" }}>
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4 mb-12">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)" }}
            >
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to run LinkedIn outreach across all your clients?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly is invite-only. Book a 30-minute call to see the agency dashboard,
            ICP scoring, AI personalisation, and Auto Book in action — and find out if it fits your current workflow.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book your call <ArrowRight size={16} />
          </a>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No commitment. No credit card. Just a conversation.
          </p>
        </div>

        {/* Internal links */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Related reading
          </p>
          <div className="flex flex-col gap-2">
            {[
              { href: "/", label: "Scribtly — LinkedIn outreach automation overview" },
              { href: "/compare/scribtly-vs-expandi", label: "Scribtly vs Expandi: which LinkedIn tool is right for you?" },
              { href: "/blog/how-to-write-linkedin-connection-requests", label: "How to write LinkedIn connection requests that get accepted" },
              { href: "/login", label: "Sign in to Scribtly" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--accent)" }}
              >
                <ArrowRight size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
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

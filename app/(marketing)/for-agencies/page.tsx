import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Users, Target, MessageSquare, Inbox, TrendingUp, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "LinkedIn Automation for Agencies | Scribtly",
  description:
    "Run LinkedIn outreach across multiple client accounts from one dashboard. ICP scoring, personalised messaging, and Auto Book — built for agencies.",
  openGraph: {
    title: "LinkedIn Automation for Agencies | Scribtly",
    description:
      "Manage LinkedIn outreach for multiple clients from one dashboard. ICP scoring, personalised messages, and automated meeting booking — built for agencies.",
    type: "website",
    url: "https://scribtly.com/for-agencies",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Automation for Agencies | Scribtly",
    description:
      "Run LinkedIn outreach across multiple client accounts from one dashboard — ICP scoring, personalised messaging, Auto Book.",
  },
  alternates: {
    canonical: "https://scribtly.com/for-agencies",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scribtly",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "LinkedIn outreach automation platform for agencies. Manage multiple client accounts, score leads against custom ICP profiles, generate personalised messages, and automate meeting booking from a single dashboard.",
  url: "https://scribtly.com",
  offers: {
    "@type": "Offer",
    url: "https://scribtly.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can Scribtly manage LinkedIn outreach for multiple clients at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly supports multiple LinkedIn accounts from a single dashboard. Each account runs independently with its own ICP profile, campaigns, and sending limits, while you see everything in one place.",
      },
    },
    {
      "@type": "Question",
      name: "How does Scribtly personalise messages at scale for agency clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly pulls real data from each prospect's LinkedIn profile — their role, company, location, and recent activity — and uses it to generate messages that feel written for that specific person. There are no generic merge fields; every message is contextually different.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly keep client LinkedIn accounts safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly applies built-in daily sending limits and human-like timing delays for every account. It does not use a browser extension, which removes the risk associated with extension-based tools. Each account operates within safe sending thresholds independently.",
      },
    },
    {
      "@type": "Question",
      name: "How does Auto Book work for agency outreach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Auto Book monitors replies for buying signals — phrases that indicate interest or readiness to talk. When it detects one, it automatically sends the prospect a calendar link without waiting for manual intervention. For agencies managing high-volume outreach, this means meetings get booked even when no one is watching the inbox.",
      },
    },
    {
      "@type": "Question",
      name: "Is Scribtly suitable for outreach agencies running campaigns for B2B clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly is designed for teams and agencies running LinkedIn outreach at volume across multiple profiles. The multi-account dashboard, centralised inbox, and per-account ICP scoring make it practical for agencies delivering LinkedIn lead generation as a service.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
    { "@type": "ListItem", position: 2, name: "For Agencies", item: "https://scribtly.com/for-agencies" },
  ],
};

const agencyFeatures = [
  {
    icon: Users,
    title: "Multi-account dashboard",
    body: "Manage every client's LinkedIn account from one login. Each account runs its own campaigns with independent sending limits, ICP profiles, and inboxes.",
  },
  {
    icon: Target,
    title: "Per-client ICP scoring",
    body: "Set a different ideal customer profile for each client. Scribtly scores leads against that profile before any outreach begins, so you're only sending to genuinely qualified prospects.",
  },
  {
    icon: MessageSquare,
    title: "Real-data personalisation",
    body: "Every message is generated using real LinkedIn data from each prospect's profile — their role, company, location, and recent activity. No copy-paste templates that recipients see through.",
  },
  {
    icon: Inbox,
    title: "Centralised inbox",
    body: "All replies across every client account arrive in one unified inbox. Filter by account, track conversation status, and never miss a warm lead buried in a separate tab.",
  },
  {
    icon: Zap,
    title: "Auto Book",
    body: "Scribtly detects buying signals in replies and sends your client's calendar link automatically. Meetings get booked without manual follow-up, even across high-volume campaigns.",
  },
  {
    icon: TrendingUp,
    title: "Campaign analytics",
    body: "Live dashboards for every account: connection rates, reply rates, and meetings booked. Spot what's working and show clients clear reporting without building it yourself.",
  },
];

const workflowSteps = [
  {
    num: "01",
    title: "Connect each client's LinkedIn account",
    body: "Add multiple LinkedIn profiles to Scribtly in minutes. No browser extension required — each account connects through a secure managed flow.",
  },
  {
    num: "02",
    title: "Define the ICP for each client",
    body: "Describe each client's ideal customer in plain English. Scribtly scores every prospect against that profile so only strong-fit leads enter the campaign.",
  },
  {
    num: "03",
    title: "Launch personalised campaigns",
    body: "Set the connection request, acceptance message, and follow-up sequence once. Scribtly generates personalised messages for each prospect and sends them at human-like intervals.",
  },
  {
    num: "04",
    title: "Manage everything from one inbox",
    body: "Replies from all accounts arrive in your centralised inbox. Auto Book handles meeting scheduling automatically — you review results and report back to clients.",
  },
];

const faqs = [
  {
    q: "Can Scribtly manage LinkedIn outreach for multiple clients at once?",
    a: "Yes. Scribtly supports multiple LinkedIn accounts from a single dashboard. Each account runs independently with its own ICP profile, campaigns, and sending limits, while you see everything in one place.",
  },
  {
    q: "How does Scribtly personalise messages at scale for agency clients?",
    a: "Scribtly pulls real data from each prospect's LinkedIn profile — their role, company, location, and recent activity — and uses it to generate messages that feel written for that specific person. There are no generic merge fields; every message is contextually different.",
  },
  {
    q: "Does Scribtly keep client LinkedIn accounts safe?",
    a: "Yes. Scribtly applies built-in daily sending limits and human-like timing delays for every account. It does not use a browser extension, which removes the risk associated with extension-based tools. Each account operates within safe sending thresholds independently.",
  },
  {
    q: "How does Auto Book work for agency outreach?",
    a: "Auto Book monitors replies for buying signals — phrases that indicate interest or readiness to talk. When it detects one, it automatically sends the prospect a calendar link without waiting for manual intervention. For agencies managing high-volume outreach, this means meetings get booked even when no one is watching the inbox.",
  },
  {
    q: "Is Scribtly suitable for outreach agencies running campaigns for B2B clients?",
    a: "Yes. Scribtly is designed for teams and agencies running LinkedIn outreach at volume across multiple profiles. The multi-account dashboard, centralised inbox, and per-account ICP scoring make it practical for agencies delivering LinkedIn lead generation as a service.",
  },
];

export default function ForAgenciesPage() {
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
          <span style={{ color: "var(--text-primary)" }}>For Agencies</span>
        </nav>
      </div>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          For Agencies
        </div>
        <h1
          className="text-3xl md:text-5xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          LinkedIn Automation Built for Agencies
        </h1>
        <p className="text-lg leading-relaxed mb-6 max-w-2xl" style={{ color: "var(--text-muted)" }}>
          Run LinkedIn outreach across every client account from one dashboard.
          ICP-scored leads, personalised messages generated from real LinkedIn data,
          and automated meeting booking — without managing a dozen separate tools.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book a demo <ArrowRight size={16} />
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:opacity-80"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            See how it works
          </Link>
        </div>
      </header>

      {/* Soft CTA near top */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div
          className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Scribtly is currently invite-only
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Book a 30-minute call to see multi-account outreach, ICP scoring, and Auto Book in action — and find out if it is the right fit for your agency.
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

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">

        {/* Section 1: The problem */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            The problem with managing LinkedIn outreach across multiple clients
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Most LinkedIn automation tools are built for one user running one campaign.
            When you are an agency managing outreach for five, ten, or twenty clients,
            that model breaks down fast.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            You end up switching between accounts, losing track of replies, manually checking
            which campaigns are live, and spending more time on admin than on results.
            Client reporting becomes a spreadsheet exercise. Personalisation slips because
            the same templates get reused across every campaign.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The result is lower reply rates, slower pipeline growth, and clients who
            question whether the service is worth the retainer.
          </p>
          <ul className="flex flex-col gap-3 mt-6">
            {[
              "Logging in and out of multiple LinkedIn accounts to check campaign status",
              "Replies buried across different inboxes with no unified view",
              "Generic message templates that prospects can spot immediately",
              "No way to score lead quality before sending — every contact gets the same outreach",
              "Meeting booking still handled manually, even after a positive reply",
              "Client reporting built from scratch every month",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: "var(--border)" }}
                />
                <span className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2: How Scribtly solves it */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            How Scribtly handles agency-scale LinkedIn outreach
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Scribtly is designed to run multiple LinkedIn accounts in parallel — each with its own
            ICP profile, campaign sequences, and inbox — managed from a single dashboard.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            You define each client's ideal customer once: job title, industry, company size, location.
            Scribtly scores every prospect against that profile before any message is sent.
            Only leads with a strong fit enter the campaign — which means better reply rates from the start.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Messages are not templates with placeholder fields. Scribtly generates each one using
            real data from the prospect's LinkedIn profile — their current role, company, recent activity,
            and location. Recipients notice the difference, and your client's reply rate reflects it.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            When a prospect replies with interest, Auto Book detects the signal and sends your client's
            calendar link automatically. Meetings get booked without manual follow-up.
          </p>
        </section>

        {/* Features grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
            What agencies get with Scribtly
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {agencyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(224,120,48,0.1)" }}
                  >
                    <Icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
            How it works for agencies
          </h2>
          <div className="flex flex-col gap-6">
            {workflowSteps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--dark)", color: "white" }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            See it running across multiple client accounts
          </h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly is invite-only. Book a 30-minute call to see the multi-account dashboard,
            ICP scoring, and Auto Book working live across real campaigns.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book a demo <ArrowRight size={16} />
          </a>
        </div>

        {/* Section: What good agency LinkedIn automation looks like */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            What good agency LinkedIn automation actually looks like
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            A lot of tools promise to automate LinkedIn outreach. Most of them automate the
            sending, but leave everything else — targeting, personalisation, replies,
            meeting booking — as manual work.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            For agencies, the full workflow matters. The value you deliver is not just in
            sending connection requests — it is in generating meetings for your clients.
            That requires good targeting, messages that get replies, and a system that
            converts those replies into booked calls without constant manual attention.
          </p>
          <ul className="flex flex-col gap-3 mt-6">
            {[
              "Each client's ICP is defined separately — not one generic audience for all",
              "Lead quality is scored before outreach, not after a low reply rate makes the problem obvious",
              "Messages reference real information about each prospect, not generic placeholders",
              "Replies are visible across every account from one place — nothing gets missed",
              "Meeting booking happens automatically when a prospect signals interest",
              "Reporting shows connection rates, reply rates, and meetings booked per account",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <span className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section: Common mistakes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Common mistakes agencies make with LinkedIn outreach
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                title: "Using the same message template across every client",
                body: "A connection request written for a fintech client sounds wrong when it goes out under a logistics company's name. Prospects notice when messages don't fit the sender — and they ignore them.",
              },
              {
                title: "Running broad campaigns without ICP scoring",
                body: "Sending to everyone who matches a LinkedIn filter wastes budget and fills campaigns with poor-fit prospects. Scoring leads before outreach starts means better reply rates and less time spent on conversations that never convert.",
              },
              {
                title: "Letting replies sit in separate inboxes",
                body: "A warm reply is time-sensitive. If it takes hours to spot because it's buried in a separate account inbox, the momentum is gone by the time you follow up.",
              },
              {
                title: "Handling meeting booking manually after a positive reply",
                body: "Manual calendar links slow down conversion. Automating this step removes the gap between interest and a booked call.",
              },
              {
                title: "Not setting independent safety limits per account",
                body: "Treating all accounts with the same sending volume ignores account age, connection count, and activity history. Each client's LinkedIn account needs its own safety settings.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--border)" }}
              >
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            More from Scribtly
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                href: "/",
                label: "How Scribtly works",
                desc: "ICP scoring, personalised outreach, and Auto Book — an overview.",
              },
              {
                href: "/blog/how-to-write-linkedin-connection-requests",
                label: "How to write LinkedIn connection requests",
                desc: "Practical guide to writing requests that get accepted.",
              },
              {
                href: "/compare/scribtly-vs-expandi",
                label: "Scribtly vs Expandi",
                desc: "Side-by-side comparison for LinkedIn automation.",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border p-4 flex flex-col gap-1 transition-all hover:opacity-80"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                  {link.label} →
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{link.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)" }}
              >
                <h3 className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="rounded-2xl border p-8 md:p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Ready to scale your agency's LinkedIn outreach?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Scribtly is invite-only. Book a 30-minute call to see the platform live —
            multi-account management, ICP scoring, and Auto Book working across real campaigns.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book a demo <ArrowRight size={18} />
          </a>
          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            30-minute call · No commitment required
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer
        className="border-t py-10"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={100} height={24} className="h-7 w-auto opacity-70" />
          </Link>
          <nav className="flex items-center gap-5 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <Link href="/compare/scribtly-vs-expandi" className="hover:opacity-70 transition-opacity">Compare</Link>
            <Link href="/blog/how-to-write-linkedin-connection-requests" className="hover:opacity-70 transition-opacity">Blog</Link>
            <Link href="/login" className="hover:opacity-70 transition-opacity">Sign in</Link>
          </nav>
        </div>
      </footer>

    </div>
  );
}

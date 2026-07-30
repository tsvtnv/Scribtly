import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly vs Lemlist: Which Outreach Tool Wins for LinkedIn?",
  description:
    "Scribtly vs Lemlist compared. See how each outreach tool handles LinkedIn targeting, personalisation, inbox management, and meeting booking.",
  openGraph: {
    title: "Scribtly vs Lemlist: Which Outreach Tool Wins for LinkedIn?",
    description:
      "Side-by-side comparison of Scribtly and Lemlist for LinkedIn outreach — targeting, personalisation, inbox, and automated meeting booking.",
    type: "article",
    url: "https://scribtly.com/compare/scribtly-vs-lemlist",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly vs Lemlist: Which Outreach Tool Wins for LinkedIn?",
    description:
      "Scribtly vs Lemlist compared for LinkedIn outreach — targeting, personalisation, inbox, and meeting booking.",
  },
  alternates: {
    canonical: "https://scribtly.com/compare/scribtly-vs-lemlist",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Scribtly vs Lemlist: Which Outreach Tool Is Right for LinkedIn?",
  description:
    "A practical comparison of Scribtly and Lemlist for outreach automation — covering LinkedIn targeting, personalisation, inbox management, and meeting booking.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-07-30",
  dateModified: "2026-07-30",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/compare/scribtly-vs-lemlist",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the main difference between Scribtly and Lemlist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lemlist started as a cold email tool and added LinkedIn as a secondary channel. Scribtly is built natively for LinkedIn outreach. The core difference is in how each handles LinkedIn specifically: Scribtly uses AI-driven ICP scoring and real LinkedIn profile data to personalise every message, while Lemlist relies on variable fields and imported lead lists.",
      },
    },
    {
      "@type": "Question",
      name: "Does Lemlist work for LinkedIn outreach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lemlist supports LinkedIn steps within multi-channel sequences. However, LinkedIn automation in Lemlist typically requires a browser extension. Scribtly operates through a managed cloud connection without requiring any browser extension, which reduces the risk to your LinkedIn account.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly support email outreach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly is focused on LinkedIn outreach. If email is your primary channel, Lemlist is built around that use case. Scribtly is the better fit when LinkedIn outreach — personalised connection requests, follow-up sequences, and meeting booking — is your main priority.",
      },
    },
    {
      "@type": "Question",
      name: "Can Scribtly book meetings automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly's Auto Book feature detects buying signals in prospect replies and sends your calendar link automatically — without manual intervention. Lemlist does not include equivalent automated meeting booking functionality.",
      },
    },
    {
      "@type": "Question",
      name: "Which tool is better for agencies managing multiple clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly's multi-account support lets you manage multiple LinkedIn profiles from a single dashboard, which works well for agencies running outreach across several clients. Lemlist also supports team workspaces and multiple accounts, but its primary strength is in multi-channel email sequences rather than LinkedIn-specific workflows.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
    { "@type": "ListItem", position: 2, name: "Compare", item: "https://scribtly.com/compare" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Scribtly vs Lemlist",
      item: "https://scribtly.com/compare/scribtly-vs-lemlist",
    },
  ],
};

const comparisonRows = [
  {
    feature: "Primary channel",
    scribtly: "LinkedIn-native — built entirely around LinkedIn outreach",
    lemlist: "Email-first platform with LinkedIn added as a secondary channel",
    scribtlyWins: true,
  },
  {
    feature: "Prospect targeting",
    scribtly: "AI-driven ICP scoring — every lead is ranked before outreach starts",
    lemlist: "Import lead lists or connect LinkedIn search; no ICP scoring layer",
    scribtlyWins: true,
  },
  {
    feature: "Message personalisation",
    scribtly: "Pulls real LinkedIn data per prospect — role, company, activity, location",
    lemlist: "Liquid syntax variable fields and dynamic image personalisation",
    scribtlyWins: true,
  },
  {
    feature: "LinkedIn safety",
    scribtly: "Cloud-based managed connection — no browser extension required",
    lemlist: "LinkedIn steps typically require a browser extension",
    scribtlyWins: true,
  },
  {
    feature: "Automated sequences",
    scribtly: "Connection request → acceptance message → follow-ups, fully automated",
    lemlist: "Multi-step sequences across email, LinkedIn, and manual tasks",
    scribtlyWins: false,
  },
  {
    feature: "Meeting booking",
    scribtly: "Auto Book detects buying signals and sends your calendar link automatically",
    lemlist: "No built-in automated meeting booking for LinkedIn replies",
    scribtlyWins: true,
  },
  {
    feature: "Inbox management",
    scribtly: "Unified inbox across all LinkedIn accounts with Auto Book",
    lemlist: "Unified inbox for email replies; LinkedIn conversation management is limited",
    scribtlyWins: true,
  },
  {
    feature: "Email outreach",
    scribtly: "Not a feature — Scribtly is focused on LinkedIn",
    lemlist: "Core strength — advanced email personalisation, deliverability tools, and A/B testing",
    scribtlyWins: false,
  },
  {
    feature: "Multi-account support",
    scribtly: "Yes — manage multiple LinkedIn accounts from one dashboard",
    lemlist: "Yes — team workspaces with multiple sender accounts",
    scribtlyWins: false,
  },
  {
    feature: "Analytics",
    scribtly: "Live dashboards for connection rates, reply rates, and meetings booked",
    lemlist: "Campaign analytics across email and LinkedIn with A/B testing",
    scribtlyWins: false,
  },
];

const faqs = [
  {
    q: "What is the main difference between Scribtly and Lemlist?",
    a: "Lemlist started as a cold email tool and added LinkedIn as a secondary channel. Scribtly is built natively for LinkedIn outreach. The core difference is in how each handles LinkedIn specifically: Scribtly uses AI-driven ICP scoring and real LinkedIn profile data to personalise every message, while Lemlist relies on variable fields and imported lead lists.",
  },
  {
    q: "Does Lemlist work for LinkedIn outreach?",
    a: "Lemlist supports LinkedIn steps within multi-channel sequences. However, LinkedIn automation in Lemlist typically requires a browser extension. Scribtly operates through a managed cloud connection without requiring any browser extension, which reduces the risk to your LinkedIn account.",
  },
  {
    q: "Does Scribtly support email outreach?",
    a: "Scribtly is focused on LinkedIn outreach. If email is your primary channel, Lemlist is built around that use case. Scribtly is the better fit when LinkedIn outreach — personalised connection requests, follow-up sequences, and meeting booking — is your main priority.",
  },
  {
    q: "Can Scribtly book meetings automatically?",
    a: "Yes. Scribtly's Auto Book feature detects buying signals in prospect replies and sends your calendar link automatically — without manual intervention. Lemlist does not include equivalent automated meeting booking functionality.",
  },
  {
    q: "Which tool is better for agencies managing multiple clients?",
    a: "Scribtly's multi-account support lets you manage multiple LinkedIn profiles from a single dashboard, which works well for agencies running outreach across several clients. Lemlist also supports team workspaces and multiple accounts, but its primary strength is in multi-channel email sequences rather than LinkedIn-specific workflows.",
  },
];

export default function ScribtlyVsLemlistPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
          <span>Compare</span>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Scribtly vs Lemlist</span>
        </nav>
      </div>

      {/* Page header */}
      <header className="max-w-4xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          Tool Comparison
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          Scribtly vs Lemlist: Which Outreach Tool Is Right for LinkedIn?
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Lemlist is one of the most popular outreach platforms around — but it was built for cold email first.
          Scribtly is built specifically for LinkedIn. This comparison breaks down the practical difference between the two,
          so you can choose the right tool for how you actually prospect.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-07-30">30 July 2026</time>
          <span>·</span>
          <span>7 min read</span>
        </div>
      </header>

      {/* Soft CTA near top */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <div
          className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Want to see Scribtly in action?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly is invite-only. Book a 30-minute call to see the platform live and find out if it is the right fit.
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
      <article className="max-w-4xl mx-auto px-6 pb-20">

        {/* Section 1: What both tools do */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What both tools do
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly and Lemlist are both outreach automation platforms, but they come from different starting points.
          Lemlist built its reputation on cold email — personalised images, custom video thumbnails, and email deliverability tools.
          LinkedIn was added later as part of a broader multi-channel push.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly was designed from the ground up for LinkedIn. Every feature — ICP scoring, message personalisation,
          inbox management, and Auto Book — was built around how LinkedIn outreach actually works.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          If LinkedIn is your primary outreach channel, that difference matters more than most people expect.
        </p>

        {/* Section 2: The core difference */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The core difference: LinkedIn-native vs multi-channel
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Lemlist is strong when email is the lead channel and LinkedIn touchpoints are supplementary — a profile view here,
          a connection request there. If you run sequences that start with email and use LinkedIn as a nudge, Lemlist makes sense.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is better suited when LinkedIn is the primary channel and you want the level of personalisation and intelligence
          that the platform's data can support. Instead of importing a CSV and adding variable fields, you describe your ideal customer
          in plain English. Scribtly scores every prospect against that profile before a single message is sent.
          Messages are then generated using each person's actual LinkedIn data — their current role, company size, location,
          and recent activity — rather than generic placeholder text.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The practical outcome is that recipients feel the message was written specifically for them, because
          the data behind it was pulled specifically from them.
        </p>

        {/* Comparison table */}
        <h2 className="text-2xl font-bold mb-6 mt-12" style={{ color: "var(--text-primary)" }}>
          Feature comparison
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Note: Lemlist's features and pricing change regularly. Always check their website for the latest details.
        </p>
        <div className="overflow-x-auto mb-8 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-subtle)", borderBottom: `1px solid var(--border)` }}>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--text-primary)" }}>Feature</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--accent)" }}>Scribtly</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--text-muted)" }}>Lemlist</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.feature}
                  style={{
                    borderBottom: i < comparisonRows.length - 1 ? `1px solid var(--border)` : undefined,
                  }}
                >
                  <td className="px-5 py-4 font-medium" style={{ color: "var(--text-primary)" }}>{row.feature}</td>
                  <td className="px-5 py-4" style={{ color: "var(--text-muted)" }}>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                      <span>{row.scribtly}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4" style={{ color: "var(--text-muted)" }}>
                    <div className="flex items-start gap-2">
                      {row.scribtlyWins ? (
                        <XCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.4 }} />
                      ) : (
                        <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                      )}
                      <span>{row.lemlist}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            See what Scribtly looks like for LinkedIn outreach
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly is invite-only. Book a 30-minute call to see the platform live — ICP scoring, personalised outreach, and Auto Book in action.
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

        {/* Section 3: Where Scribtly stands out */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Where Scribtly stands out for LinkedIn
        </h2>

        <div className="flex flex-col gap-6 mb-8">
          {[
            {
              title: "AI-driven ICP scoring before any message is sent",
              body: "You describe your ideal customer in plain English — job title, industry, company size, location. Scribtly scores every prospect against that profile and only starts outreach when the fit is confirmed. Lemlist doesn't have an equivalent ICP scoring layer; you provide the list and it sends to it.",
            },
            {
              title: "Personalisation from real LinkedIn data, not variable fields",
              body: "Lemlist's personalisation relies on liquid syntax variables — placeholders you fill with data from your lead list. Scribtly pulls fresh data directly from each prospect's LinkedIn profile and generates contextually relevant messages from it. The difference is noticeable in reply rates.",
            },
            {
              title: "No browser extension required",
              body: "LinkedIn steps in Lemlist typically depend on a browser extension running in the background. Scribtly operates through a managed cloud connection. There's nothing to install, and your LinkedIn account's security stays independent of your local machine or browser.",
            },
            {
              title: "Auto Book: meeting booking from LinkedIn replies",
              body: "When a prospect shows buying intent in a LinkedIn reply, Scribtly's Auto Book feature detects it and sends your calendar link automatically. You don't need to monitor every conversation — Scribtly handles the conversion step for you. Lemlist doesn't offer equivalent automated meeting booking for LinkedIn.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* Section 4: Where Lemlist may suit better */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          When Lemlist might be a better fit
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Lemlist is a mature platform with real strengths, particularly on the email side. It may suit you better if:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Cold email is your primary outreach channel and LinkedIn is secondary",
            "You need advanced email deliverability tools, warm-up features, or inbox rotation",
            "You rely heavily on personalised image or video thumbnails in email sequences",
            "You want A/B testing across subject lines and email copy variants at scale",
            "You prefer a self-serve platform you can set up without an onboarding call",
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
          The right choice depends on where your pipeline comes from.
          If LinkedIn is how you start conversations, Scribtly's approach to targeting, personalisation, and inbox management
          is purpose-built for that. If you run email-led sequences with LinkedIn touchpoints alongside, Lemlist covers more ground.
        </p>

        {/* Section 5: Who uses Scribtly */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Who Scribtly is built for
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly works particularly well for:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "B2B sales teams running targeted LinkedIn outreach to specific ICPs",
            "Agencies managing LinkedIn outreach across multiple client accounts",
            "Founders and sales leaders who want meetings booked without manual follow-up",
            "SDR teams who need to cover more accounts without adding headcount",
            "Growth teams where reply quality and conversion matter more than volume",
            "Any team that wants LinkedIn personalisation at scale without a browser extension",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is currently invite-only and includes personal onboarding. Every client is set up individually
          to make sure the ICP scoring is calibrated correctly from day one.
        </p>

        {/* Section 6: Common mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes when choosing between LinkedIn tools
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Choosing a multi-channel tool when you only use one channel",
              fix: "A multi-channel platform built for email will handle LinkedIn as an add-on, not a core workflow. If LinkedIn is your main channel, a LinkedIn-native tool will be meaningfully better.",
            },
            {
              mistake: "Treating variable fields as equivalent to real personalisation",
              fix: "Inserting {first_name} and {company} is table stakes. Personalisation that references a prospect's actual role, recent post, or company context is what moves reply rates. The data source matters.",
            },
            {
              mistake: "Underestimating LinkedIn account safety",
              fix: "Browser extension-based tools create a dependency between your LinkedIn session and your local machine. Cloud-based tools that don't require an extension remove that risk entirely.",
            },
            {
              mistake: "Focusing only on sending features and ignoring what comes after a reply",
              fix: "Converting replies to meetings is where the real work happens. A tool that automates that step — detecting buying intent and sending calendar links — is worth more than one that stops at the inbox.",
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
            Ready to see Scribtly in action?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly is invite-only. Book a 30-minute call with our team to see the platform live —
            ICP scoring, hyper-personalised LinkedIn outreach, and Auto Book — and find out if it fits your pipeline.
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
              { href: "/", label: "Scribtly — LinkedIn outreach automation" },
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

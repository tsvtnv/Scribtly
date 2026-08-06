import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly vs Dripify: Which LinkedIn Tool Is Right for You?",
  description:
    "Scribtly vs Dripify compared. See how each LinkedIn automation tool handles ICP targeting, personalisation, inbox management, and meeting booking.",
  openGraph: {
    title: "Scribtly vs Dripify: Which LinkedIn Tool Is Right for You?",
    description:
      "Side-by-side comparison of Scribtly and Dripify for LinkedIn outreach — ICP scoring, personalisation, inbox management, and Auto Book.",
    type: "article",
    url: "https://scribtly.com/compare/scribtly-vs-dripify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly vs Dripify: Which LinkedIn Tool Is Right for You?",
    description:
      "Scribtly vs Dripify compared for LinkedIn automation — ICP targeting, personalisation, inbox, and meeting booking.",
  },
  alternates: {
    canonical: "https://scribtly.com/compare/scribtly-vs-dripify",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Scribtly vs Dripify: Which LinkedIn Outreach Tool Is Right for You?",
  description:
    "A practical comparison of Scribtly and Dripify for LinkedIn automation — covering ICP scoring, message personalisation, inbox management, and meeting booking.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-08-06",
  dateModified: "2026-08-06",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/compare/scribtly-vs-dripify",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the main difference between Scribtly and Dripify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dripify is a sequence automation tool — you set up drip campaigns and it sends them at scheduled intervals. Scribtly adds AI-driven ICP scoring before any message is sent, so only well-matched prospects receive outreach, and messages are generated from real LinkedIn profile data rather than static merge fields.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly require a browser extension?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Scribtly operates through a managed cloud connection and does not require a browser extension. Your LinkedIn activity is kept independent of your local machine or browser session.",
      },
    },
    {
      "@type": "Question",
      name: "Does Dripify support team accounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Dripify offers team plans with per-member analytics and campaign management. Scribtly also supports multiple LinkedIn accounts from a single dashboard, which suits agencies managing outreach across several client profiles.",
      },
    },
    {
      "@type": "Question",
      name: "Can Scribtly book meetings automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly's Auto Book feature monitors prospect replies for buying intent signals and automatically sends your calendar link at the right moment — without any manual intervention.",
      },
    },
    {
      "@type": "Question",
      name: "Which tool is better for B2B lead generation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both tools can support B2B lead generation, but they take different approaches. Dripify suits teams who want reliable sequence automation with strong webhook and integration support. Scribtly suits teams who prioritise lead quality over volume — ICP-matched prospects, hyper-personalised messages, and automatic meeting booking once intent is detected.",
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
      name: "Scribtly vs Dripify",
      item: "https://scribtly.com/compare/scribtly-vs-dripify",
    },
  ],
};

const comparisonRows = [
  {
    feature: "Prospect targeting",
    scribtly: "AI-driven ICP scoring — each lead ranked against your ideal profile before outreach starts",
    dripify: "LinkedIn search-based targeting with saved filters and CSV import",
    scribtlyWins: true,
  },
  {
    feature: "Message personalisation",
    scribtly: "Generates messages from real LinkedIn data — role, company, activity, and context",
    dripify: "Variable placeholders and merge fields inserted into message templates",
    scribtlyWins: true,
  },
  {
    feature: "Automated sequences",
    scribtly: "Connection request → acceptance message → follow-ups, fully automated",
    dripify: "Multi-step drip sequences including visits, endorsements, InMail, and messages",
    scribtlyWins: false,
  },
  {
    feature: "Inbox management",
    scribtly: "Unified inbox across all accounts with Auto Book for meeting scheduling",
    dripify: "Basic inbox with lead tagging and reply detection",
    scribtlyWins: true,
  },
  {
    feature: "Meeting booking",
    scribtly: "Auto Book detects buying signals and sends your calendar link automatically",
    dripify: "No built-in meeting booking automation",
    scribtlyWins: true,
  },
  {
    feature: "Multi-account support",
    scribtly: "Yes — manage multiple LinkedIn accounts from one dashboard",
    dripify: "Yes — team plan supports multiple accounts with per-member reporting",
    scribtlyWins: false,
  },
  {
    feature: "LinkedIn account safety",
    scribtly: "Built-in sending limits, human-like timing, no browser extension required",
    dripify: "Safety limits and randomised delays built in",
    scribtlyWins: false,
  },
  {
    feature: "Integrations",
    scribtly: "Managed connection — no external integration required",
    dripify: "Zapier and webhook support for connecting to wider tech stacks",
    scribtlyWins: false,
  },
];

const faqs = [
  {
    q: "What is the main difference between Scribtly and Dripify?",
    a: "Dripify is a sequence automation tool — you set up drip campaigns and it sends them at scheduled intervals. Scribtly adds AI-driven ICP scoring before any message is sent, so only well-matched prospects receive outreach, and messages are generated from real LinkedIn profile data rather than static merge fields.",
  },
  {
    q: "Does Scribtly require a browser extension?",
    a: "No. Scribtly operates through a managed cloud connection and does not require a browser extension. Your LinkedIn activity is kept independent of your local machine or browser session.",
  },
  {
    q: "Does Dripify support team accounts?",
    a: "Yes. Dripify offers team plans with per-member analytics and campaign management. Scribtly also supports multiple LinkedIn accounts from a single dashboard, which suits agencies managing outreach across several client profiles.",
  },
  {
    q: "Can Scribtly book meetings automatically?",
    a: "Yes. Scribtly's Auto Book feature monitors prospect replies for buying intent signals and automatically sends your calendar link at the right moment — without any manual intervention.",
  },
  {
    q: "Which tool is better for B2B lead generation?",
    a: "Both tools can support B2B lead generation, but they take different approaches. Dripify suits teams who want reliable sequence automation with strong webhook and integration support. Scribtly suits teams who prioritise lead quality over volume — ICP-matched prospects, hyper-personalised messages, and automatic meeting booking once intent is detected.",
  },
];

export default function ScribtlyVsDripifyPage() {
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
          <span style={{ color: "var(--text-primary)" }}>Scribtly vs Dripify</span>
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
          Scribtly vs Dripify: Which LinkedIn Outreach Tool Is Right for You?
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Both Scribtly and Dripify automate LinkedIn outreach — but they have fundamentally different approaches
          to lead quality, message personalisation, and what happens the moment a prospect replies.
          This comparison breaks down the practical differences so you can make an informed decision.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-08-06">6 August 2026</time>
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
              Scribtly is invite-only. Book a 30-minute call to see the platform live and find out if it is the right fit for your team.
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

        {/* Section 1 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What both tools do
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly and Dripify are both cloud-based LinkedIn outreach automation tools. At their core, both let you:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Send automated connection requests to targeted prospects",
            "Run follow-up message sequences after a request is accepted",
            "Track campaign performance with analytics and reporting",
            "Manage replies through a dedicated inbox",
            "Stay within LinkedIn's usage guidelines with built-in safety limits",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Where they diverge significantly is in how they decide who to contact, what to say, and how to handle the reply stage.
        </p>

        {/* Section 2: The core difference */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The core difference: volume versus quality
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Dripify is built around the idea of drip sequences. You import a list of prospects, create a multi-step campaign — connection request, follow-up message, InMail if needed — and the tool executes it on a schedule with delays between each step.
          It is a solid, well-established system for teams who already know exactly who they want to reach and want reliable automation to execute the sequence.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly starts one step earlier. Before a single message is sent, every prospect is scored against your ideal customer profile using AI.
          Leads that do not match are filtered out. The ones that do are then contacted with messages generated from their actual LinkedIn data —
          their current role, company size, industry, and recent activity — rather than generic placeholder text.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The result is fewer messages sent, but more of them landing with the right people and generating replies that are worth having.
        </p>

        {/* Comparison table */}
        <h2 className="text-2xl font-bold mb-6 mt-12" style={{ color: "var(--text-primary)" }}>
          Feature comparison
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Note: Dripify's features and pricing change regularly. Always check their website for the latest details before making a decision.
        </p>
        <div className="overflow-x-auto mb-8 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-subtle)", borderBottom: `1px solid var(--border)` }}>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--text-primary)" }}>Feature</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--accent)" }}>Scribtly</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--text-muted)" }}>Dripify</th>
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
                      <span>{row.dripify}</span>
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
            See what Scribtly looks like in practice
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly is invite-only. Book a 30-minute call to see ICP scoring, personalised outreach, and Auto Book in action — and decide if it fits your pipeline.
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
          Where Scribtly stands out
        </h2>

        <div className="flex flex-col gap-6 mb-8">
          {[
            {
              title: "ICP scoring filters out weak leads before outreach starts",
              body: "Dripify and most other automation tools send to whoever is on your list. Scribtly evaluates every prospect against your ideal customer profile first. Only leads that meet your criteria move into the outreach sequence, which keeps your connection rate higher and your account reputation intact.",
            },
            {
              title: "Messages written from real data, not merge fields",
              body: "Dripify, like most tools, uses variable placeholders — things like {first_name} or {company_name}. Scribtly reads each prospect's LinkedIn profile and generates a message using their actual context: what they do, what their company does, and what is relevant to them right now. Recipients can tell the difference.",
            },
            {
              title: "Auto Book: meetings booked without manual monitoring",
              body: "When a prospect replies showing interest, Scribtly's Auto Book feature detects the intent signal and sends your calendar link at the right moment — automatically. You do not need to watch your inbox for the right cue to follow up. That happens on its own.",
            },
            {
              title: "No browser extension required",
              body: "Scribtly connects to LinkedIn through a managed cloud layer. There is nothing to install in your browser, and your LinkedIn session is not dependent on your local machine being open or a specific browser being active. This also removes one variable from LinkedIn account safety.",
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

        {/* Section 4: Where Dripify may suit you better */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          When Dripify might be a better fit
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Dripify is a mature platform with a broad feature set. It may suit you better if:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "You need Zapier or webhook integrations to connect your outreach data to a CRM or wider tech stack",
            "Your team runs high-volume campaigns where per-prospect AI personalisation is less critical than throughput",
            "You want detailed per-member analytics to manage individual SDR performance across a larger team",
            "You need profile visits and skill endorsements as automated sequence actions alongside messages",
            "You want a fully self-serve setup without a guided onboarding process",
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
          The right choice depends on what you are optimising for.
          If you want to maximise the number of messages sent, Dripify's sequencing and integration options are strong.
          If you want to maximise the quality of conversations started and meetings booked from each outreach run, Scribtly's approach has a practical edge.
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
            "B2B sales teams targeting specific, well-defined ICPs",
            "Agencies running LinkedIn outreach across multiple client accounts",
            "Founders and sales leaders who want meetings without daily inbox monitoring",
            "SDR teams looking to improve reply-to-meeting conversion without adding headcount",
            "Growth teams where lead quality matters more than raw outreach volume",
            "Any team that has tried generic automation and found the reply rates disappointing",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is currently invite-only and includes personal onboarding. Every client is set up with ICP scoring calibrated specifically for their target market before the first campaign runs.
        </p>

        {/* Section 6: Common mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes when choosing a LinkedIn automation tool
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Choosing based on the longest feature list",
              fix: "More automation actions do not automatically mean better results. Profile visits and endorsements add sequence steps but rarely move the needle on reply rate. Focus on the features that directly affect whether a prospect replies and books a call.",
            },
            {
              mistake: "Treating personalisation as a checkbox",
              fix: "There is a practical difference between {first_name} fields and a message that references what a prospect's company actually does. The former is a template; the latter feels like a conversation. Your reply rate reflects which one you are sending.",
            },
            {
              mistake: "Stopping at the reply, not the meeting",
              fix: "Most tools hand the work back to you the moment a prospect responds. If you are manually managing every inbox conversation to identify interest and send a calendar link, you are doing the most time-sensitive part of the process by hand. That is exactly what Auto Book is designed to handle.",
            },
            {
              mistake: "Sending to a broad list to increase coverage",
              fix: "Reaching more people does not help if those people are not a good fit. Poor-fit outreach raises your connection rejection rate, which affects your LinkedIn standing over time. A tighter, better-scored list usually outperforms a larger, unscored one.",
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
            Scribtly is invite-only. Book a 30-minute call with our team to see ICP scoring, hyper-personalised outreach, and Auto Book live — and find out if it fits your pipeline.
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
              { href: "/compare/scribtly-vs-expandi", label: "Scribtly vs Expandi — full comparison" },
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

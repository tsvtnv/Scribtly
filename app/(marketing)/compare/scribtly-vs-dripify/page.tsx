import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly vs Dripify: Which LinkedIn Tool Is Right for You?",
  description:
    "Scribtly vs Dripify compared. See how each LinkedIn automation tool handles ICP targeting, message personalisation, inbox management, and meeting booking.",
  openGraph: {
    title: "Scribtly vs Dripify: Which LinkedIn Tool Is Right for You?",
    description:
      "Side-by-side comparison of Scribtly and Dripify for LinkedIn outreach — targeting, personalisation, inbox, and automatic meeting booking.",
    type: "article",
    url: "https://scribtly.com/compare/scribtly-vs-dripify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly vs Dripify: Which LinkedIn Tool Is Right for You?",
    description:
      "Scribtly vs Dripify compared for LinkedIn automation — targeting, personalisation, inbox, and meeting booking.",
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
    "A practical comparison of Scribtly and Dripify for LinkedIn automation — covering ICP targeting, message personalisation, inbox management, and automatic meeting booking.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-07-24",
  dateModified: "2026-07-24",
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
        text: "The biggest difference is how each tool handles lead quality and personalisation. Dripify lets you run drip campaigns with template variables and team collaboration features. Scribtly scores each prospect against your ideal customer profile before any message is sent, then generates personalised outreach using real data pulled from their LinkedIn profile — not static placeholder text.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly support team accounts like Dripify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly supports multiple LinkedIn accounts from a single dashboard, which suits agencies and sales teams running outreach across several profiles. Dripify has a dedicated team workspace with shared campaign analytics. The right choice depends on whether you need shared campaign management or independent multi-account control.",
      },
    },
    {
      "@type": "Question",
      name: "Is Scribtly safe for LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly includes built-in daily sending limits and human-like timing delays so your activity stays within LinkedIn's guidelines. It does not require a browser extension and operates through a managed cloud connection.",
      },
    },
    {
      "@type": "Question",
      name: "Can Scribtly book meetings automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly's Auto Book feature detects buying signals in prospect replies and automatically sends your calendar link at the right moment — without you needing to monitor every conversation manually.",
      },
    },
    {
      "@type": "Question",
      name: "Does Dripify integrate with CRMs and other tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dripify offers Zapier integration and webhooks that allow you to connect it to CRMs and other tools in your stack. Always check Dripify's website for the latest integration details, as these can change.",
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
    scribtly: "AI-driven ICP scoring — each lead is ranked against your ideal customer profile before outreach begins",
    dripify: "Filter-based targeting using LinkedIn search criteria and imported lists",
    scribtlyWins: true,
  },
  {
    feature: "Message personalisation",
    scribtly: "Pulls real LinkedIn data per prospect — role, company, recent activity, location",
    dripify: "Template variables and placeholder fields (e.g. {first_name}, {company})",
    scribtlyWins: true,
  },
  {
    feature: "Automated sequences",
    scribtly: "Connection request → acceptance message → follow-ups, automated with smart timing",
    dripify: "Multi-step drip campaigns with smart delays and conditional logic",
    scribtlyWins: false,
  },
  {
    feature: "Team collaboration",
    scribtly: "Multi-account support from a single dashboard",
    dripify: "Dedicated team workspace with shared analytics and campaign management",
    scribtlyWins: false,
  },
  {
    feature: "Inbox management",
    scribtly: "Unified inbox across all accounts with Auto Book for automatic meeting scheduling",
    dripify: "Smart inbox with lead tags, notes, and reply management",
    scribtlyWins: true,
  },
  {
    feature: "Meeting booking",
    scribtly: "Auto Book detects buying signals and sends your calendar link automatically",
    dripify: "No built-in automatic meeting booking",
    scribtlyWins: true,
  },
  {
    feature: "Third-party integrations",
    scribtly: "Focused platform — no broad third-party integrations currently",
    dripify: "Zapier, webhooks, and CRM integrations available",
    scribtlyWins: false,
  },
  {
    feature: "LinkedIn account safety",
    scribtly: "Built-in sending limits, human-like timing, no browser extension required",
    dripify: "Cloud-based with randomised delays and daily limits",
    scribtlyWins: false,
  },
  {
    feature: "Analytics",
    scribtly: "Live dashboards for connection rates, reply rates, and meetings booked",
    dripify: "Campaign analytics with team reporting and performance breakdowns",
    scribtlyWins: false,
  },
  {
    feature: "Onboarding",
    scribtly: "Invite-only with personal onboarding — ICP calibrated individually from day one",
    dripify: "Self-serve signup with documentation and support",
    scribtlyWins: false,
  },
];

const faqs = [
  {
    q: "What is the main difference between Scribtly and Dripify?",
    a: "The biggest difference is how each tool handles lead quality and personalisation. Dripify lets you run drip campaigns with template variables and team collaboration features. Scribtly scores each prospect against your ideal customer profile before any message is sent, then generates personalised outreach using real data pulled from their LinkedIn profile — not static placeholder text.",
  },
  {
    q: "Does Scribtly support team accounts like Dripify?",
    a: "Scribtly supports multiple LinkedIn accounts from a single dashboard, which suits agencies and sales teams running outreach across several profiles. Dripify has a dedicated team workspace with shared campaign analytics. The right choice depends on whether you need shared campaign management or independent multi-account control.",
  },
  {
    q: "Is Scribtly safe for LinkedIn?",
    a: "Yes. Scribtly includes built-in daily sending limits and human-like timing delays so your activity stays within LinkedIn's guidelines. It does not require a browser extension and operates through a managed cloud connection.",
  },
  {
    q: "Can Scribtly book meetings automatically?",
    a: "Yes. Scribtly's Auto Book feature detects buying signals in prospect replies and automatically sends your calendar link at the right moment — without you needing to monitor every conversation manually.",
  },
  {
    q: "Does Dripify integrate with CRMs and other tools?",
    a: "Dripify offers Zapier integration and webhooks that allow you to connect it to CRMs and other tools in your stack. Always check Dripify's website for the latest integration details, as these can change.",
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
          Scribtly and Dripify both automate LinkedIn outreach — but they take different approaches
          to who gets targeted, how messages are personalised, and what happens after a prospect replies.
          This comparison covers the practical differences so you can make an informed decision.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-07-24">24 July 2026</time>
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
              Scribtly is invite-only. Book a 30-minute call to see ICP scoring, personalised outreach, and Auto Book live.
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
          Scribtly and Dripify are both cloud-based LinkedIn outreach automation platforms. At their core, both let you:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Send automated connection requests to targeted LinkedIn prospects",
            "Run follow-up message sequences after a connection is accepted",
            "Track campaign performance with built-in analytics",
            "Manage prospect replies through a dedicated inbox",
            "Stay within LinkedIn's platform guidelines using built-in safety limits",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Where they diverge is in how they qualify leads before outreach, how personalised the messages actually are, and what happens once a prospect shows interest.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The core difference: lead quality and personalisation
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Dripify is a well-regarded drip campaign tool. You import a list, set your sequence with message templates using placeholder variables, configure delays, and let it run.
          It has a clean team workspace, Zapier integrations, and A/B testing support — useful for teams who want to manage multiple campaigns and connect their outreach to the rest of their tech stack.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly starts from a different position. Before any message goes out, it scores every prospect against your ideal customer profile.
          You describe your ICP in plain English — the job title, industry, company size, location — and the platform only proceeds with leads that match.
          Messages are then generated using real data pulled from each prospect's LinkedIn profile: their current role, company context, and recent activity.
          The result feels like a researched, individual message rather than a broadcast with a name swapped in.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          On top of that, Scribtly's Auto Book feature monitors prospect replies and automatically sends your calendar link when it detects buying intent — removing the manual step of spotting the right moment to follow up.
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
            Scribtly is invite-only. Book a 30-minute call to see ICP scoring, AI-personalised outreach, and Auto Book in action — and find out if it fits your pipeline.
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
              title: "ICP scoring before a single message is sent",
              body: "Most tools — including Dripify — send to whoever is on your list. Scribtly ranks every prospect against your ideal customer profile before outreach begins. Lower-quality leads are filtered out, which protects your account reputation and improves connection rates.",
            },
            {
              title: "Personalisation from real LinkedIn data, not merge fields",
              body: "Dripify, like most automation tools, offers variable placeholders — {first_name}, {company}, and similar. Scribtly pulls live data from each prospect's profile and uses it to generate contextually relevant messages. The difference in how those messages land shows up in reply rates.",
            },
            {
              title: "Auto Book: meetings scheduled without manual follow-up",
              body: "When a prospect shows buying intent in a reply, Scribtly's Auto Book feature detects it and sends your calendar link automatically. You do not need to monitor every inbox conversation for the right moment — Scribtly handles it.",
            },
            {
              title: "No browser extension required",
              body: "Scribtly operates through a managed cloud connection. There is nothing to install on your browser, and your LinkedIn account's safety is independent of your local machine or any extension conflicts.",
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
          Dripify is a mature, self-serve platform with a broad feature set. It may suit you better if:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "You need a dedicated team workspace where multiple users can manage and report on shared campaigns",
            "You rely on Zapier or webhook integrations to push data into your CRM or other tools",
            "You want to run A/B tests across message variants at scale",
            "You prefer a self-serve platform you can set up independently without a structured onboarding call",
            "You have a well-defined targeting list and primarily need reliable sequence automation to run it",
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
          Neither tool is objectively better. The right choice depends on what you need most.
          If your primary bottleneck is the quality of leads and the relevance of your messages, Scribtly's approach has a practical edge.
          If you need a self-serve tool with a broad integration ecosystem today, Dripify has a longer track record there.
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
            "B2B sales teams running targeted outreach to a specific ICP",
            "Agencies managing LinkedIn outreach across multiple clients or profiles",
            "Founders and sales leads who want meetings without monitoring every inbox conversation",
            "SDR teams who need to cover more accounts without adding headcount",
            "Growth teams where reply quality and conversion rate matter more than raw volume",
            "Any team tired of sending mass outreach that feels generic to the recipient",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is currently invite-only and includes a personal onboarding session. Every client's ICP is calibrated individually from day one so the scoring is accurate before any campaign goes live.
        </p>

        {/* Section 6: Common mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes when choosing a LinkedIn automation tool
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Choosing the cheapest option without considering reply quality",
              fix: "A tool that sends a higher volume of irrelevant messages at a lower cost does not save money — it costs you in reply rate, account reputation, and time spent on conversations that go nowhere.",
            },
            {
              mistake: "Treating merge fields and AI personalisation as the same thing",
              fix: "Swapping in a first name is different from generating a message that references a prospect's actual role, company news, or recent LinkedIn activity. The gap in how each approach lands with recipients is real and measurable.",
            },
            {
              mistake: "Focusing only on the sending side of outreach",
              fix: "Most tools make it easy to send. The harder problem is what happens after a prospect replies. Whether the tool can surface buying signals and convert them to meetings without manual intervention often matters more than the sending features.",
            },
            {
              mistake: "Not accounting for LinkedIn account safety at scale",
              fix: "Tools that push the limits on daily send volume put your LinkedIn account at risk of restriction. Always check whether a tool operates within recommended limits and how it handles safety when multiple accounts are running simultaneously.",
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
            ICP scoring, hyper-personalised outreach, and Auto Book — and find out if it fits your pipeline.
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

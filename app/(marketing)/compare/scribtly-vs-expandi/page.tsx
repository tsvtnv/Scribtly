import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly vs Expandi: Which LinkedIn Tool Is Right for You?",
  description:
    "Scribtly vs Expandi compared. See how each LinkedIn automation tool handles targeting, personalisation, inbox management, and meeting booking.",
  openGraph: {
    title: "Scribtly vs Expandi: Which LinkedIn Tool Is Right for You?",
    description:
      "Side-by-side comparison of Scribtly and Expandi for LinkedIn outreach automation — targeting, personalisation, inbox, and meeting booking.",
    type: "article",
    url: "https://scribtly.com/compare/scribtly-vs-expandi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly vs Expandi: Which LinkedIn Tool Is Right for You?",
    description:
      "Scribtly vs Expandi compared for LinkedIn automation — targeting, personalisation, inbox, and meeting booking.",
  },
  alternates: {
    canonical: "https://scribtly.com/compare/scribtly-vs-expandi",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Scribtly vs Expandi: Which LinkedIn Outreach Tool Is Right for You?",
  description:
    "A practical comparison of Scribtly and Expandi for LinkedIn automation — covering targeting, personalisation, inbox management, and meeting booking.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/compare/scribtly-vs-expandi",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the main difference between Scribtly and Expandi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The core difference is in how each tool handles targeting and personalisation. Expandi offers campaign automation with static filter-based targeting. Scribtly layers AI-driven ICP scoring on top of targeting — every prospect is scored against your ideal customer profile before outreach begins, and messages are personalised using real LinkedIn data rather than static merge fields.",
      },
    },
    {
      "@type": "Question",
      name: "Is Scribtly safe for LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly includes built-in daily sending limits and human-like timing delays so your activity stays within LinkedIn's guidelines. It does not require a browser extension and operates through a managed connection.",
      },
    },
    {
      "@type": "Question",
      name: "Does Scribtly support multiple LinkedIn accounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly supports multiple LinkedIn accounts from a single dashboard, making it suitable for agencies and sales teams running outreach across several profiles.",
      },
    },
    {
      "@type": "Question",
      name: "Can Scribtly book meetings automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly's Auto Book feature detects buying signals in prospect replies and automatically sends your calendar link at the right moment — without manual intervention.",
      },
    },
    {
      "@type": "Question",
      name: "Which tool is better for agencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly's multi-account support and centralised inbox management make it well suited for agencies running outreach across multiple clients or team members. If you need to manage several LinkedIn profiles from one dashboard while maintaining personalisation at scale, Scribtly is worth evaluating.",
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
      name: "Scribtly vs Expandi",
      item: "https://scribtly.com/compare/scribtly-vs-expandi",
    },
  ],
};

const comparisonRows = [
  {
    feature: "Prospect targeting",
    scribtly: "AI-driven ICP scoring — each lead is ranked before outreach starts",
    expandi: "Filter-based targeting using LinkedIn search criteria",
    scribtlyWins: true,
  },
  {
    feature: "Message personalisation",
    scribtly: "Pulls real LinkedIn data per prospect — role, company, activity",
    expandi: "Merge fields and variable placeholders in templates",
    scribtlyWins: true,
  },
  {
    feature: "Automated sequences",
    scribtly: "Connection request → acceptance message → follow-ups, fully automated",
    expandi: "Multi-step campaign sequences with smart delays",
    scribtlyWins: false,
  },
  {
    feature: "Inbox management",
    scribtly: "Unified inbox across all accounts with Auto Book for meeting scheduling",
    expandi: "Smart inbox with reply detection and tagging",
    scribtlyWins: true,
  },
  {
    feature: "Meeting booking",
    scribtly: "Auto Book detects buying signals and sends your calendar link automatically",
    expandi: "No built-in meeting booking automation",
    scribtlyWins: true,
  },
  {
    feature: "Multi-account support",
    scribtly: "Yes — manage multiple LinkedIn accounts from one dashboard",
    expandi: "Yes — multiple accounts supported",
    scribtlyWins: false,
  },
  {
    feature: "LinkedIn account safety",
    scribtly: "Built-in sending limits, human-like timing, no browser extension needed",
    expandi: "Cloud-based with safety limits and randomised delays",
    scribtlyWins: false,
  },
  {
    feature: "Analytics",
    scribtly: "Live dashboards for connection rates, reply rates, and meetings booked",
    expandi: "Campaign analytics with A/B testing support",
    scribtlyWins: false,
  },
];

const faqs = [
  {
    q: "What is the main difference between Scribtly and Expandi?",
    a: "The core difference is in how each tool handles targeting and personalisation. Expandi offers campaign automation with static filter-based targeting. Scribtly layers AI-driven ICP scoring on top of targeting — every prospect is scored against your ideal customer profile before outreach begins, and messages are personalised using real LinkedIn data rather than static merge fields.",
  },
  {
    q: "Is Scribtly safe for LinkedIn?",
    a: "Yes. Scribtly includes built-in daily sending limits and human-like timing delays so your activity stays within LinkedIn's guidelines. It does not require a browser extension and operates through a managed connection.",
  },
  {
    q: "Does Scribtly support multiple LinkedIn accounts?",
    a: "Yes. Scribtly supports multiple LinkedIn accounts from a single dashboard, making it suitable for agencies and sales teams running outreach across several profiles.",
  },
  {
    q: "Can Scribtly book meetings automatically?",
    a: "Yes. Scribtly's Auto Book feature detects buying signals in prospect replies and automatically sends your calendar link at the right moment — without manual intervention.",
  },
  {
    q: "Which tool is better for agencies?",
    a: "Scribtly's multi-account support and centralised inbox management make it well suited for agencies running outreach across multiple clients or team members. If you need to manage several LinkedIn profiles from one dashboard while maintaining personalisation at scale, Scribtly is worth evaluating.",
  },
];

export default function ScribtlyVsExpandiPage() {
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
          <span style={{ color: "var(--text-primary)" }}>Scribtly vs Expandi</span>
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
          Scribtly vs Expandi: Which LinkedIn Outreach Tool Is Right for You?
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Both Scribtly and Expandi automate LinkedIn outreach — but they take different approaches
          to targeting, personalisation, and converting replies into meetings.
          This comparison breaks down the practical differences so you can decide which fits your workflow.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-07-23">23 July 2026</time>
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

        {/* Section 1 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What both tools do
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly and Expandi are both cloud-based LinkedIn outreach automation tools. At their core, both let you:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Send automated connection requests to targeted prospects",
            "Run follow-up message sequences after acceptance",
            "Track campaign performance with analytics",
            "Manage replies through a dedicated inbox",
            "Stay within LinkedIn's platform guidelines with built-in safety limits",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Where they diverge is in how they handle lead quality, message personalisation, and what happens after a prospect replies.
        </p>

        {/* Section 2: The core difference */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The core difference: targeting and personalisation
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Expandi works well as a campaign sequencer. You define your audience using LinkedIn filters, upload a list, set your message templates with variable fields, and let it run.
          It is a solid tool for teams who have their targeting figured out and want to automate the sending cadence.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly approaches targeting differently. You describe your ideal customer in plain English, and the platform scores every prospect against that profile before a single message goes out.
          Outreach only starts when the fit is confirmed. Messages are then generated using real data pulled from each prospect's LinkedIn profile — their current role, company size, location, and recent activity — rather than generic placeholder text.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The result is that recipients feel spoken to directly, which is why reply rates tend to be meaningfully higher than standard templated outreach.
        </p>

        {/* Comparison table */}
        <h2 className="text-2xl font-bold mb-6 mt-12" style={{ color: "var(--text-primary)" }}>
          Feature comparison
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Note: Expandi's features and pricing change regularly. Always check their website for the latest details.
        </p>
        <div className="overflow-x-auto mb-8 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-subtle)", borderBottom: `1px solid var(--border)` }}>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--text-primary)" }}>Feature</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--accent)" }}>Scribtly</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--text-muted)" }}>Expandi</th>
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
                      <span>{row.expandi}</span>
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
          Where Scribtly stands out
        </h2>

        <div className="flex flex-col gap-6 mb-8">
          {[
            {
              title: "ICP-driven lead scoring before any message is sent",
              body: "Most LinkedIn automation tools send to whoever is on your list. Scribtly scores each prospect against your ideal customer profile first. Lower-quality leads are filtered out before outreach begins, which improves your connection rate and protects your account reputation.",
            },
            {
              title: "Personalisation from real data, not merge fields",
              body: "Expandi, like most tools, offers merge fields — variables like {first_name} or {company}. Scribtly pulls real data from each prospect's profile and uses it to generate contextually relevant messages. The difference shows in reply rates.",
            },
            {
              title: "Auto Book: meeting booking without manual follow-up",
              body: "When a prospect shows buying intent in a reply, Scribtly's Auto Book feature detects it and sends your calendar link automatically. You do not need to monitor every conversation for the right moment to pitch — Scribtly handles that.",
            },
            {
              title: "No browser extension required",
              body: "Scribtly operates through a managed cloud connection. There is nothing to install on your browser and no risk of the extension interfering with your LinkedIn session. Your account safety stays independent of your local machine.",
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

        {/* Section 4: Where Expandi may suit you better */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          When Expandi might be a better fit
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Expandi is a well-established tool with a larger feature set in some areas. It may suit you better if:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "You need advanced A/B testing across message variants at scale",
            "You already have a finely tuned targeting list and just need reliable sequence automation",
            "You want a self-serve platform you can set up without an onboarding call",
            "You are running high-volume outreach where per-prospect AI personalisation is less important than throughput",
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
          The honest answer is that the right tool depends on what you optimise for.
          If reply rate and meeting conversion matter more than raw volume, Scribtly's personalisation model has a practical advantage.
          If you need the broadest possible feature set out of the box today, Expandi has a longer track record.
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
            "B2B sales teams running targeted outreach to specific ICPs",
            "Agencies managing LinkedIn outreach across multiple clients",
            "Founders and sales leaders who want meetings without manual follow-up",
            "SDR teams looking to cover more accounts without adding headcount",
            "Growth teams where reply quality and conversion matter more than volume",
            "Any team tired of writing personalised messages one at a time",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is currently invite-only and includes personal onboarding. Every client is set up individually to make sure the ICP scoring is calibrated correctly from day one.
        </p>

        {/* Section 6: Common mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes when choosing a LinkedIn automation tool
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Optimising for the cheapest per-seat price",
              fix: "A tool that sends more irrelevant messages at a lower cost per seat is not cheaper — it costs you in reply rate, account reputation, and wasted time on unqualified conversations.",
            },
            {
              mistake: "Treating all personalisation as equal",
              fix: "There is a large practical difference between {first_name} merge fields and outreach that references a prospect's actual role, recent activity, or company context. One feels templated; the other feels like you did your homework.",
            },
            {
              mistake: "Ignoring what happens after a reply",
              fix: "Most tools focus entirely on the sending side. The value of a LinkedIn automation tool often comes down to how it handles replies — whether it can surface intent signals and convert them to meetings without manual effort.",
            },
            {
              mistake: "Not accounting for LinkedIn account safety",
              fix: "Tools that push the limits on daily send volume put your LinkedIn account at risk. Always check whether a tool operates within recommended limits and how it handles those limits when campaigns scale.",
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

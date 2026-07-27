import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is LinkedIn Outreach Automation? A Beginner's Guide",
  description:
    "LinkedIn outreach automation uses software to send connection requests and follow-ups at scale. Learn how it works, what to automate, and what to avoid.",
  openGraph: {
    title: "What Is LinkedIn Outreach Automation? A Beginner's Guide",
    description:
      "A clear beginner's guide to LinkedIn outreach automation — what it is, how it works, what you can automate, and the risks to avoid.",
    type: "article",
    url: "https://scribtly.com/blog/what-is-linkedin-outreach-automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is LinkedIn Outreach Automation? A Beginner's Guide",
    description:
      "What is LinkedIn outreach automation? A clear, practical explainer covering how it works, what to automate, and how to stay safe.",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/what-is-linkedin-outreach-automation",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is LinkedIn Outreach Automation? A Beginner's Guide",
  description:
    "A practical beginner's guide to LinkedIn outreach automation — covering how it works, what you can automate, common risks, and how to use it safely.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-07-27",
  dateModified: "2026-07-27",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/blog/what-is-linkedin-outreach-automation",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is LinkedIn outreach automation against LinkedIn's terms of service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LinkedIn prohibits scraping and the use of bots that violate platform guidelines. However, tools that use safe, human-like sending limits and operate within LinkedIn's messaging infrastructure are widely used by sales teams. The key is staying within safe sending volumes — typically under 100 connection requests per week — and avoiding aggressive bulk actions that trigger LinkedIn's spam filters.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between LinkedIn automation and LinkedIn bots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LinkedIn bots typically refer to browser-based tools that simulate clicks and keystrokes on LinkedIn's website — these carry higher risk of account restriction. LinkedIn automation tools that operate through managed, cloud-based connections with built-in safety limits are a safer alternative. The distinction comes down to how the tool accesses LinkedIn and whether it respects platform limits.",
      },
    },
    {
      "@type": "Question",
      name: "How many LinkedIn connection requests can I automate per week?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most practitioners recommend staying under 100 connection requests per week to avoid LinkedIn restrictions. Spreading requests throughout the week and varying send times reduces the risk further. Quality automation tools enforce these limits automatically so you don't have to think about it.",
      },
    },
    {
      "@type": "Question",
      name: "Can LinkedIn outreach automation personalise messages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Modern LinkedIn automation tools pull real profile data — job title, company, location, recent activity — and use it to generate personalised messages for each prospect. This is far more effective than sending the same template to everyone, and it's what separates legitimate automation from spam.",
      },
    },
    {
      "@type": "Question",
      name: "What results can I expect from LinkedIn outreach automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Results depend on your targeting, message quality, and follow-up sequence. With well-targeted prospects and personalised messages, a healthy connection acceptance rate sits between 25–40% and reply rates between 10–20%. Automation doesn't guarantee results — it scales whatever works when you do it manually.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://scribtly.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "What Is LinkedIn Outreach Automation?",
      item: "https://scribtly.com/blog/what-is-linkedin-outreach-automation",
    },
  ],
};

const faqs = [
  {
    q: "Is LinkedIn outreach automation against LinkedIn's terms of service?",
    a: "LinkedIn prohibits scraping and the use of bots that violate platform guidelines. However, tools that use safe, human-like sending limits and operate within LinkedIn's messaging infrastructure are widely used by sales teams. The key is staying within safe sending volumes — typically under 100 connection requests per week — and avoiding aggressive bulk actions that trigger LinkedIn's spam filters.",
  },
  {
    q: "What is the difference between LinkedIn automation and LinkedIn bots?",
    a: "LinkedIn bots typically refer to browser-based tools that simulate clicks and keystrokes on LinkedIn's website — these carry higher risk of account restriction. LinkedIn automation tools that operate through managed, cloud-based connections with built-in safety limits are a safer alternative. The distinction comes down to how the tool accesses LinkedIn and whether it respects platform limits.",
  },
  {
    q: "How many LinkedIn connection requests can I automate per week?",
    a: "Most practitioners recommend staying under 100 connection requests per week to avoid LinkedIn restrictions. Spreading requests throughout the week and varying send times reduces the risk further. Quality automation tools enforce these limits automatically so you don't have to think about it.",
  },
  {
    q: "Can LinkedIn outreach automation personalise messages?",
    a: "Yes. Modern LinkedIn automation tools pull real profile data — job title, company, location, recent activity — and use it to generate personalised messages for each prospect. This is far more effective than sending the same template to everyone, and it's what separates legitimate automation from spam.",
  },
  {
    q: "What results can I expect from LinkedIn outreach automation?",
    a: "Results depend on your targeting, message quality, and follow-up sequence. With well-targeted prospects and personalised messages, a healthy connection acceptance rate sits between 25–40% and reply rates between 10–20%. Automation doesn't guarantee results — it scales whatever works when you do it manually.",
  },
];

export default function WhatIsLinkedInOutreachAutomationPage() {
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
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <span>/</span>
          <span>Blog</span>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>What Is LinkedIn Outreach Automation?</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          LinkedIn Automation
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          What Is LinkedIn Outreach Automation?
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          LinkedIn outreach automation is the use of software to send connection requests, follow-up messages, and sequences to prospects automatically — without doing it manually one by one.
          Done well, it lets sales teams and founders reach more of the right people while keeping messages personalised and accounts safe.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-07-27">27 July 2026</time>
          <span>·</span>
          <span>7 min read</span>
        </div>
      </header>

      {/* Soft CTA near top */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div
          className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Want to see LinkedIn outreach automation in action?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly automates personalised LinkedIn outreach — from finding prospects to booking meetings — with built-in safety limits.
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

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 pb-20">

        {/* Section 1: What it is */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What LinkedIn outreach automation actually means
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          When you do LinkedIn outreach manually, you visit each prospect's profile, write a connection request, wait for them to accept, then send a follow-up — and repeat for every person on your list. That process works, but it doesn't scale.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          LinkedIn outreach automation replaces the manual steps with software. You define your target audience, write your message sequence once, and the tool handles the execution: sending connection requests, following up after acceptance, detecting replies, and routing responses to your inbox.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The goal isn't to spam people. The goal is to reach the right people at a scale that would be impossible to do by hand — while keeping each message relevant to the person receiving it.
        </p>

        {/* Section 2: How it works */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How LinkedIn outreach automation works
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Most LinkedIn automation tools follow a similar process:
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              num: "1",
              title: "You define your ideal customer",
              body: "You tell the tool who you want to reach — by job title, industry, company size, location, or other criteria. The tool finds matching LinkedIn profiles and scores them against your criteria.",
            },
            {
              num: "2",
              title: "The tool builds your prospect list",
              body: "Rather than you manually building a list, the automation tool finds relevant profiles on LinkedIn and queues them for outreach. Better tools rank prospects by how closely they match your target customer.",
            },
            {
              num: "3",
              title: "You set up a message sequence",
              body: "You write a connection request message and a follow-up sequence. The tool personalises each message using real data from the prospect's profile — their name, role, company, and sometimes recent activity.",
            },
            {
              num: "4",
              title: "The tool sends at human-like intervals",
              body: "Requests and messages go out with natural timing — not in bulk. This keeps your account within LinkedIn's guidelines and reduces the chance of triggering spam filters.",
            },
            {
              num: "5",
              title: "Replies land in a unified inbox",
              body: "When prospects reply, their messages are collected in one place. Some tools can detect buying signals in replies and automatically send your calendar link at the right moment.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  {item.num}
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: What can be automated */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What you can automate on LinkedIn
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Not everything on LinkedIn is automatable — and not everything should be. Here's a practical breakdown:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              What you can automate
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Connection requests with personalised notes",
                "Acceptance follow-up messages",
                "Drip sequences (follow-up 1, follow-up 2)",
                "Prospect discovery and list building",
                "Lead scoring against your ICP",
                "Calendar link delivery on buying signals",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              What still needs a human
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Closing conversations and handling objections",
                "Decisions about which leads to prioritise",
                "Genuine relationship building",
                "Strategic messaging for key accounts",
                "Complex, context-heavy replies",
                "Final approval before a deal moves forward",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--text-muted)", opacity: 0.5 }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Why sales teams use it */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Why sales teams and founders use LinkedIn automation
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The core reason is time. A founder or SDR doing manual LinkedIn outreach might reach 20–30 prospects per day. With automation, they can reach 5–10x that volume without spending more hours doing it.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          But volume alone isn't the point. The bigger gain comes from consistency: automation ensures every prospect gets a timely follow-up. Manual outreach breaks down when you get busy. Automation doesn't.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          For agencies managing multiple clients, automation makes it possible to run outreach campaigns across several LinkedIn accounts from a single dashboard — something that would otherwise require a dedicated team member for each client.
        </p>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            See what LinkedIn automation looks like when it's done right
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly finds ICP-matched prospects, sends personalised connection requests, and books meetings automatically — with built-in sending limits to keep your account safe.
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

        {/* Section 5: Risks */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The risks — and how to avoid them
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          LinkedIn actively monitors for automation that violates its platform guidelines. Accounts that send too many requests too quickly, or use tools that scrape data in ways LinkedIn prohibits, can be restricted or permanently banned.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The risks fall into two categories:
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              risk: "Sending too many requests too fast",
              fix: "Stay under 100 connection requests per week and spread them naturally across the week. Good automation tools enforce this automatically.",
            },
            {
              risk: "Using browser-based bots",
              fix: "Browser-based tools that simulate clicks on LinkedIn's website are higher risk. Cloud-based tools that operate through managed connections are safer and more reliable.",
            },
            {
              risk: "Sending generic, untargeted messages",
              fix: "Generic messages get ignored or reported as spam. Personalised messages that reference something real about the recipient perform better and are less likely to be flagged.",
            },
            {
              risk: "Poor targeting",
              fix: "Reaching out to completely irrelevant people increases your ignore and report rate. Define your ICP tightly and let the tool filter prospects before outreach begins.",
            },
          ].map((item) => (
            <div
              key={item.risk}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                Risk: {item.risk}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--accent)" }}>How to avoid it: </strong>{item.fix}
              </p>
            </div>
          ))}
        </div>

        {/* Section 6: Where Scribtly fits */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly approaches LinkedIn outreach automation
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is built around the idea that automation should make outreach more human, not less.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Every connection request Scribtly sends is personalised using real LinkedIn data — the prospect's current role, company, location, and activity. The platform uses ICP scoring to rank prospects before any message goes out, so you're not paying for reach to people who aren't relevant.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Built-in daily and weekly limits keep your LinkedIn account within safe sending ranges automatically. There's no browser extension to install — Scribtly connects through a managed cloud connection, which is more stable and lower risk than browser-based tools.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Replies from all your campaigns land in a unified inbox. When a prospect shows buying intent, Auto Book detects the signal and sends your calendar link at the right moment — so you're not manually watching every conversation for the right time to follow up.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "ICP-matched prospect targeting",
            "Personalised messages per prospect",
            "Built-in safe sending limits",
            "No browser extension required",
            "Unified inbox for all replies",
            "Auto Book for meeting scheduling",
            "Multi-account support for agencies",
            "Live campaign analytics",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Section 7: Common mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes people make with LinkedIn automation
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Treating automation as a replacement for strategy",
              fix: "Automation scales what you put in. If your targeting is wrong or your messages are weak, automation just makes the problem worse faster. Start with a clear ICP and a message that works manually before automating.",
            },
            {
              mistake: "Over-automating the conversation",
              fix: "The connection request and early follow-ups are where automation adds the most value. Once someone is genuinely engaged, take over the conversation manually. Don't let the tool keep firing messages when a real conversation is happening.",
            },
            {
              mistake: "Ignoring the inbox",
              fix: "Automation handles outreach, not relationships. Check your inbox regularly. Replies that don't get a timely human response are lost opportunities, regardless of how well the automation performed.",
            },
            {
              mistake: "Sending without testing",
              fix: "Before scaling a campaign, send manually to 10–20 prospects. See what response rate you get and what objections come up. Automate after you know what works.",
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
            Ready to try LinkedIn outreach automation?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly is invite-only. Book a 30-minute call to see the platform live and find out if it's the right fit for your outreach goals.
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
            Invite only. No commitment. No credit card required.
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
              {
                href: "/blog/how-to-write-linkedin-connection-requests",
                label: "How to write LinkedIn connection requests that get accepted",
              },
              {
                href: "/compare/scribtly-vs-expandi",
                label: "Scribtly vs Expandi — which LinkedIn tool is right for you?",
              },
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

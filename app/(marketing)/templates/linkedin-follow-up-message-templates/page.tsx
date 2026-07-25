import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Copy } from "lucide-react";

export const metadata: Metadata = {
  title: "LinkedIn Follow-Up Message Templates (Swipe File)",
  description:
    "Ready-to-use LinkedIn follow-up message templates to send after a connection is accepted. A practical swipe file for SDRs, founders, and agencies.",
  openGraph: {
    title: "LinkedIn Follow-Up Message Templates (Swipe File)",
    description:
      "Ready-to-use LinkedIn follow-up messages for after your connection request is accepted — a practical swipe file for SDRs, founders, and agencies.",
    type: "article",
    url: "https://scribtly.com/templates/linkedin-follow-up-message-templates",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Follow-Up Message Templates (Swipe File)",
    description:
      "Swipe file of LinkedIn follow-up messages for after a connection request is accepted — practical templates for sales teams, founders, and agencies.",
  },
  alternates: {
    canonical: "https://scribtly.com/templates/linkedin-follow-up-message-templates",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When should I send a follow-up message after a LinkedIn connection is accepted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Send within 24 to 48 hours of the connection being accepted. Quick follow-ups while your name is still fresh outperform messages sent days later. Avoid sending within the same hour — it reads as automated.",
      },
    },
    {
      "@type": "Question",
      name: "Should I pitch in my first follow-up message on LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The first follow-up message should open a conversation, not close a sale. Ask a question, reference something relevant to their role or company, or share something genuinely useful. Pitching too early is the single biggest reason follow-up messages get ignored.",
      },
    },
    {
      "@type": "Question",
      name: "How many follow-up messages should I send on LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most sequences include two to three messages after the connection is accepted — one shortly after acceptance, a second value-add message five to seven days later, and optionally a short direct ask if there is no reply after the second. Going beyond three messages without a reply tends to damage your reputation rather than improve conversion.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good reply rate for LinkedIn follow-up messages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A reply rate of 15–25% on follow-up messages is considered healthy for cold outreach. Rates above 30% usually indicate strong targeting and genuinely personalised messages. Below 10% typically means the message is too generic or the audience targeting needs adjustment.",
      },
    },
    {
      "@type": "Question",
      name: "Can I automate LinkedIn follow-up messages safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with the right tool. Scribtly automates follow-up sequences with human-like timing delays and built-in daily sending limits so your activity stays within LinkedIn's platform guidelines. Fully personalised messages are generated for each prospect rather than static templates with merge fields.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "LinkedIn Follow-Up Message Templates: A Swipe File for After Connection Acceptance",
  description:
    "Ready-to-use LinkedIn follow-up message templates for after a connection request is accepted, with practical examples for SDRs, founders, and agencies.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-07-25",
  dateModified: "2026-07-25",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/templates/linkedin-follow-up-message-templates",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
    { "@type": "ListItem", position: 2, name: "Templates", item: "https://scribtly.com/templates" },
    {
      "@type": "ListItem",
      position: 3,
      name: "LinkedIn Follow-Up Message Templates",
      item: "https://scribtly.com/templates/linkedin-follow-up-message-templates",
    },
  ],
};

const followUpTemplates = [
  {
    category: "Opener — light and conversational",
    when: "Send within 24–48 hours of acceptance",
    templates: [
      {
        label: "Simple thank you + question",
        text: "Hi [Name], thanks for connecting. I noticed you're working on [relevant area] at [Company] — how is that going for you at the moment?",
      },
      {
        label: "Content reference opener",
        text: "Hi [Name], good to connect. I came across your post on [topic] last week — solid take. Are you seeing that trend in your own pipeline too?",
      },
      {
        label: "Shared challenge opener",
        text: "Hi [Name], thanks for accepting. A lot of [their role]s I speak with are dealing with [common challenge] right now. Is that something on your radar?",
      },
    ],
  },
  {
    category: "Value-add — second message",
    when: "Send 5–7 days after the opener if no reply",
    templates: [
      {
        label: "Useful resource or insight",
        text: "Hi [Name], just circling back. I put together a quick breakdown of [relevant topic] that a few [role]s found useful — happy to share it if that would be helpful.",
      },
      {
        label: "Peer social proof",
        text: "Hi [Name], following up from last week. We recently worked with a [similar company or role] to [outcome]. Thought it might be relevant to what you're building at [Company].",
      },
      {
        label: "Direct question",
        text: "Hi [Name], hope this finds you well. Quick question — is [problem your product solves] something your team is actively working on, or not a priority right now?",
      },
    ],
  },
  {
    category: "Soft ask — third message",
    when: "Send 7–10 days after the second message if no reply",
    templates: [
      {
        label: "Low-pressure call offer",
        text: "Hi [Name], last one from me for now. If [specific outcome] is ever a priority, I'd be happy to jump on a 15-minute call to share how we approach it. No agenda — just a conversation.",
      },
      {
        label: "Permission-based close",
        text: "Hi [Name], I'll keep this short — is [problem] something you'd want a quick conversation about, or not the right time? Either way is fine.",
      },
    ],
  },
  {
    category: "Reply to a reply — keeping the thread warm",
    when: "Use when a prospect replies but has not booked yet",
    templates: [
      {
        label: "Acknowledging interest without pushing",
        text: "Good to hear from you, [Name]. Yes, that is exactly the kind of situation we work with. Would it be worth a quick 20-minute call to see if it makes sense to go deeper?",
      },
      {
        label: "Handling 'tell me more'",
        text: "Happy to. The short version is [one sentence on what you do]. Would it make sense to show you how that works in practice? I can keep it to 20 minutes.",
      },
    ],
  },
  {
    category: "Re-engagement — warm old connections",
    when: "Use for connections made 30+ days ago with no conversation",
    templates: [
      {
        label: "Trigger-based re-engagement",
        text: "Hi [Name], I saw [Company] just [news trigger — funding, launch, hire]. Congratulations. We've been helping teams in a similar position with [relevant outcome] — worth a quick conversation?",
      },
      {
        label: "Low-stakes check-in",
        text: "Hi [Name], it has been a while since we connected. I wanted to reach back out — we've been doing some interesting work with [relevant company type] recently. Would love to reconnect if the timing is better now.",
      },
    ],
  },
];

const faqs = [
  {
    q: "When should I send a follow-up message after a LinkedIn connection is accepted?",
    a: "Send within 24 to 48 hours of the connection being accepted. Quick follow-ups while your name is still fresh outperform messages sent days later. Avoid sending within the same hour — it reads as automated.",
  },
  {
    q: "Should I pitch in my first follow-up message on LinkedIn?",
    a: "No. The first follow-up message should open a conversation, not close a sale. Ask a question, reference something relevant to their role or company, or share something genuinely useful. Pitching too early is the single biggest reason follow-up messages get ignored.",
  },
  {
    q: "How many follow-up messages should I send on LinkedIn?",
    a: "Most sequences include two to three messages after the connection is accepted — one shortly after acceptance, a second value-add message five to seven days later, and optionally a short direct ask if there is no reply after the second. Going beyond three messages without a reply tends to damage your reputation rather than improve conversion.",
  },
  {
    q: "What is a good reply rate for LinkedIn follow-up messages?",
    a: "A reply rate of 15–25% on follow-up messages is considered healthy for cold outreach. Rates above 30% usually indicate strong targeting and genuinely personalised messages. Below 10% typically means the message is too generic or the audience targeting needs adjustment.",
  },
  {
    q: "Can I automate LinkedIn follow-up messages safely?",
    a: "Yes, with the right tool. Scribtly automates follow-up sequences with human-like timing delays and built-in daily sending limits so your activity stays within LinkedIn's platform guidelines. Fully personalised messages are generated for each prospect rather than static templates with merge fields.",
  },
];

export default function LinkedInFollowUpMessageTemplatesPage() {
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
          <span>Templates</span>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>LinkedIn Follow-Up Messages</span>
        </nav>
      </div>

      {/* Page header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          Swipe File
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          LinkedIn Follow-Up Message Templates
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Getting a connection request accepted is step one. What you send next decides whether it turns
          into a conversation. This swipe file gives you ready-to-use follow-up messages for every stage
          of a LinkedIn outreach sequence — from the first message through to a soft close.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-07-25">25 July 2026</time>
          <span>·</span>
          <span>10 min read</span>
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
              Want Scribtly to write and send these automatically?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly generates personalised follow-up messages using real LinkedIn data and sends them at the right time — no templates, no manual copy-paste.
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
      <article className="max-w-3xl mx-auto px-6 pb-20">

        {/* Section 1: Why follow-up matters */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Why most LinkedIn follow-ups get ignored
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The connection request gets accepted — and then nothing happens. Most people either send a pitch
          immediately, send a message so generic it reads as mass outreach, or send nothing at all.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Three reasons follow-ups fail:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Pitching too early — treating acceptance as permission to sell immediately.",
            "Zero personalisation — sending the same message to every prospect on the list.",
            "No sequence — one message, then silence when there is no reply.",
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
          The templates below are structured to avoid all three. They open conversations, not pitches.
          They give you a skeleton you can personalise for each recipient. And they cover multiple stages
          of a sequence so you have something to send at each step.
        </p>

        {/* Section 2: How to use this swipe file */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How to use this swipe file
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          These are starting points, not copy-paste solutions. Before sending any message:
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              num: "1",
              title: "Replace every [bracket]",
              body: "Fill in the prospect's name, company, role, or the specific detail you are referencing. Brackets left unfilled are the fastest way to kill a reply rate.",
            },
            {
              num: "2",
              title: "Add one real detail",
              body: "Reference something specific to that person — a post, a recent company announcement, a mutual connection, or a shared challenge in their industry. One specific detail does more work than three generic sentences.",
            },
            {
              num: "3",
              title: "Match the tone to the person",
              body: "A message to a founder at a 10-person startup should feel different from one to a VP of Sales at a 500-person company. Adjust formality accordingly.",
            },
            {
              num: "4",
              title: "Keep it short",
              body: "LinkedIn DMs are not emails. Three to five sentences is usually the right length. Anything longer looks like a pitch deck in a chat window.",
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

        {/* Section 3: Templates */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The swipe file
        </h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          Fourteen templates across five scenarios — organised by where you are in the sequence.
        </p>

        <div className="flex flex-col gap-10">
          {followUpTemplates.map((group) => (
            <div key={group.category}>
              <div className="flex items-start gap-3 mb-2">
                <Copy size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <div>
                  <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                    {group.category}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{group.when}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {group.templates.map((t) => (
                  <div
                    key={t.label}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                      {t.label}
                    </p>
                    <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-primary)" }}>
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Send personalised follow-ups at scale — without writing each one manually
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly generates follow-up messages using real LinkedIn data for each prospect and sends
            them automatically at the right time. No manual copy-paste. No merge field guesswork.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            See how Scribtly handles follow-ups <ArrowRight size={16} />
          </a>
        </div>

        {/* Section 4: Sequence structure */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Building a sequence around these templates
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A three-message sequence is usually enough to qualify most prospects. Here is a simple structure that works:
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              step: "Day 1",
              title: "Opener",
              body: "Send within 24–48 hours of acceptance. Open a conversation — ask a question, reference something specific. Do not pitch.",
            },
            {
              step: "Day 6–7",
              title: "Value add",
              body: "If no reply, send something useful or relevant — a question, a case study reference, or an insight. Still not a pitch.",
            },
            {
              step: "Day 14–16",
              title: "Soft close",
              body: "If still no reply, one short final message. Low pressure. Give them an easy yes or no. Then move on.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border p-6 flex gap-5"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div
                className="text-xs font-bold px-3 py-1.5 rounded-full shrink-0 h-fit"
                style={{ background: "rgba(224,120,48,0.1)", color: "var(--accent)" }}
              >
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 5: Where Scribtly fits */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly handles follow-up sequences
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Using these templates manually works well up to a point. At 50 conversations per week, you can
          keep up. At 200, you cannot — and personalisation starts breaking down.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly automates the full sequence. You describe your ideal customer and set your campaign once.
          From there, Scribtly handles connection requests, sends the acceptance follow-up, schedules
          subsequent messages at the right intervals, and routes replies into a unified inbox.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Every message is generated using real data pulled from each prospect&apos;s LinkedIn profile —
          not generic merge fields. Recipients get messages that reference their actual role, company, and
          recent activity, which is why reply rates consistently sit above industry average.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          When a prospect shows buying intent, Auto Book detects it and sends your calendar link
          automatically. You do not need to monitor every conversation for the right moment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "Personalised messages from real LinkedIn data",
            "Automated multi-step follow-up sequences",
            "Human-like timing to protect your account",
            "Built-in daily sending limits",
            "Unified inbox for all replies",
            "Auto Book for automatic meeting scheduling",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Section 6: Common mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes to avoid in LinkedIn follow-up messages
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Pitching in the first follow-up",
              fix: "Your first message after acceptance should open a conversation, not close a deal. Ask a question or share something relevant. The pitch comes later, once you have established that the timing and fit make sense.",
            },
            {
              mistake: "Sending the same message to everyone",
              fix: "Even small personalisation — referencing their role, their company name, or a recent post — significantly improves reply rates. Generic messages read as automated even when they are not.",
            },
            {
              mistake: "Sending too many messages",
              fix: "Three messages without a reply is enough. Following up four, five, or six times does not improve conversion — it damages your reputation and risks getting blocked.",
            },
            {
              mistake: "Writing messages that are too long",
              fix: "LinkedIn DMs are not emails. Five to seven sentences maximum. If your message needs to be longer, it probably contains information that belongs in a call, not a message.",
            },
            {
              mistake: "Using the same subject line variations",
              fix: "Different messages should feel genuinely different in tone and content. \"Just following up\" is not a second message — it is a reminder that you are using a template.",
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
            Ready to automate your follow-up sequences?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly handles connection requests, follow-up messages, and meeting booking —
            personalised per prospect, automated across your entire pipeline.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book a call to get access <ArrowRight size={16} />
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
              { href: "/blog/how-to-write-linkedin-connection-requests", label: "How to write LinkedIn connection requests that get accepted" },
              { href: "/compare/scribtly-vs-expandi", label: "Scribtly vs Expandi: which tool is right for you?" },
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

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write LinkedIn Follow-Up Messages That Get Replies",
  description:
    "A practical guide to writing LinkedIn follow-up messages after connecting — with templates, timing advice, and multi-step sequence examples.",
  openGraph: {
    title: "How to Write LinkedIn Follow-Up Messages That Get Replies",
    description:
      "Practical guide to writing LinkedIn follow-up messages that get replies — with templates, timing tips, and sequence examples for B2B outreach.",
    type: "article",
    url: "https://scribtly.com/blog/how-to-write-linkedin-follow-up-messages",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write LinkedIn Follow-Up Messages That Get Replies",
    description:
      "Practical guide to writing LinkedIn follow-up messages that get replies — with templates, timing tips, and sequence examples for B2B outreach.",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-linkedin-follow-up-messages",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How soon should I follow up after a LinkedIn connection is accepted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Send your first follow-up within 24 to 48 hours of the connection being accepted. Waiting longer means the person has already forgotten the context of your request. Responding too quickly — within minutes — can feel automated. A natural window is the following morning.",
      },
    },
    {
      "@type": "Question",
      name: "How many follow-up messages should I send on LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard B2B sequence has two to three follow-ups after the initial acceptance message. The first follow-up adds value or asks a single question. The second provides more context or a resource. The third is a polite close — acknowledging they may not be interested and leaving the door open. Sending more than three without a reply usually reduces reply rates.",
      },
    },
    {
      "@type": "Question",
      name: "What should I say in the first LinkedIn message after connecting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Thank them for connecting, then immediately add value or ask a simple, low-friction question relevant to their role. Don't pitch yet. The acceptance message is about establishing a two-way conversation, not selling. Something like: 'Thanks for connecting, [Name]. I noticed you're working on [topic] — happy to share a resource we put together on that if useful.'",
      },
    },
    {
      "@type": "Question",
      name: "Should I pitch in my first LinkedIn follow-up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Pitching in the first follow-up after connecting is one of the fastest ways to get ignored or removed as a connection. Use the first message to open a dialogue. Save the pitch — or a soft intro to what you do — for the second or third message, and only after they've shown some interest.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good LinkedIn follow-up reply rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A healthy reply rate for a well-targeted LinkedIn sequence sits between 15 and 30 percent across all follow-ups combined. Rates above 30 percent suggest strong ICP alignment or warm targeting. Below 10 percent usually means the messaging is generic, the ICP is off, or the profile needs work.",
      },
    },
    {
      "@type": "Question",
      name: "How do I follow up on LinkedIn without being annoying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Space your messages at least three to five days apart. Each message should add something new — a different angle, a useful resource, a relevant question — rather than just repeating 'just checking in.' Keep messages short. And always send a polite close after two or three unanswered follow-ups that gives the person an easy exit.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Write LinkedIn Follow-Up Messages That Get Replies",
  description:
    "A practical guide to writing LinkedIn follow-up messages after connecting — with templates, timing advice, and multi-step sequence examples for B2B outreach.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-08-03",
  dateModified: "2026-08-03",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/blog/how-to-write-linkedin-follow-up-messages",
  },
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
      name: "How to Write LinkedIn Follow-Up Messages That Get Replies",
      item: "https://scribtly.com/blog/how-to-write-linkedin-follow-up-messages",
    },
  ],
};

const faqs = [
  {
    q: "How soon should I follow up after a LinkedIn connection is accepted?",
    a: "Send your first follow-up within 24 to 48 hours of the connection being accepted. Waiting longer means the person has already forgotten the context of your request. Responding too quickly — within minutes — can feel automated. A natural window is the following morning.",
  },
  {
    q: "How many follow-up messages should I send on LinkedIn?",
    a: "A standard B2B sequence has two to three follow-ups after the initial acceptance message. The first follow-up adds value or asks a single question. The second provides more context or a resource. The third is a polite close — acknowledging they may not be interested and leaving the door open. Sending more than three without a reply usually reduces reply rates.",
  },
  {
    q: "What should I say in the first LinkedIn message after connecting?",
    a: "Thank them for connecting, then immediately add value or ask a simple, low-friction question relevant to their role. Don't pitch yet. The acceptance message is about establishing a two-way conversation, not selling. Something like: 'Thanks for connecting, [Name]. I noticed you're working on [topic] — happy to share a resource we put together on that if useful.'",
  },
  {
    q: "Should I pitch in my first LinkedIn follow-up?",
    a: "No. Pitching in the first follow-up after connecting is one of the fastest ways to get ignored or removed as a connection. Use the first message to open a dialogue. Save the pitch — or a soft intro to what you do — for the second or third message, and only after they've shown some interest.",
  },
  {
    q: "What is a good LinkedIn follow-up reply rate?",
    a: "A healthy reply rate for a well-targeted LinkedIn sequence sits between 15 and 30 percent across all follow-ups combined. Rates above 30 percent suggest strong ICP alignment or warm targeting. Below 10 percent usually means the messaging is generic, the ICP is off, or the profile needs work.",
  },
  {
    q: "How do I follow up on LinkedIn without being annoying?",
    a: "Space your messages at least three to five days apart. Each message should add something new — a different angle, a useful resource, a relevant question — rather than just repeating 'just checking in.' Keep messages short. And always send a polite close after two or three unanswered follow-ups that gives the person an easy exit.",
  },
];

export default function HowToWriteLinkedInFollowUpMessagesPage() {
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
          <span style={{ color: "var(--text-primary)" }}>LinkedIn Follow-Up Messages</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          LinkedIn Outreach
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          How to Write LinkedIn Follow-Up Messages That Get Replies
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Most LinkedIn connections go cold before the conversation even starts.
          Someone accepts your request, you send a message — and then silence.
          This guide covers what to say in your follow-ups, when to send them, and how to structure a sequence that actually books meetings.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-08-03">3 August 2026</time>
          <span>·</span>
          <span>9 min read</span>
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
              Want your follow-up sequence to run on autopilot?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly automates personalised follow-up messages using real LinkedIn data — so you stop chasing and start closing.
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

        {/* Section 1 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Why LinkedIn follow-ups are where most deals are won or lost
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Getting a connection accepted feels like progress. It isn't — it's just the door opening.
          The conversation that follows is where the real work happens, and most salespeople, founders, and BDRs get it wrong.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The most common mistakes after a connection is accepted:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Pitching immediately in the acceptance message — before any rapport is established.",
            "Sending a generic 'just following up' with no new context or value.",
            "Waiting too long — the person forgets who you are and why they connected.",
            "Giving up after one unanswered message when the average B2B reply requires multiple touches.",
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
          A well-structured follow-up sequence solves all four. It sends at the right time, adds value at each step, and gives the recipient a clear path to respond without pressure.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The structure of a LinkedIn follow-up sequence that works
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A standard B2B LinkedIn sequence after a connection is accepted has four stages. Each one builds on the last without repeating the same message in different words.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              num: "1",
              title: "Acceptance message (Day 0–1)",
              body: "Send within 24 hours of the connection being accepted. Thank them briefly, reference something specific about their work, and either share a useful resource or ask a single low-friction question. No pitch. No ask for a meeting.",
            },
            {
              num: "2",
              title: "First follow-up (Day 4–5)",
              body: "If they haven't replied, send a short follow-up that adds a different angle. Share a relevant insight, a case study result, or a question tied to a problem they likely face. Keep it under four sentences.",
            },
            {
              num: "3",
              title: "Second follow-up (Day 9–11)",
              body: "This is where you can introduce a soft pitch — but frame it around their situation, not your product. Reference what you've seen work for people in their role or industry. Make it easy to say yes to a short call.",
            },
            {
              num: "4",
              title: "Polite close (Day 14–16)",
              body: "Acknowledge they may not be interested and give them an easy out. This message often gets replies precisely because it removes pressure. Leave the door open for a future conversation.",
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

        {/* Section 3 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What to write at each stage: step-by-step
        </h2>

        <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: "var(--text-primary)" }}>
          Step 1: Write the acceptance message
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The acceptance message sets the tone for everything that follows. Keep it short. Reference something specific. Don't pitch.
        </p>
        <p className="text-base leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>
          What to include:
        </p>
        <ul className="flex flex-col gap-2 mb-6">
          {[
            "A brief thank you (one sentence)",
            "A reference to something real about their work or context",
            "A single question or a useful resource — not both",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 mb-8">
          {[
            "\"Thanks for connecting, [Name]. I saw you're scaling the outbound team at [Company] — happy to share a breakdown of what's been working for similar-stage teams if that's useful.\"",
            "\"Good to connect, [Name]. Noticed your team just expanded into [market] — curious what's driving the most pipeline for you right now.\"",
          ].map((ex) => (
            <div
              key={ex}
              className="rounded-xl border-l-4 pl-4 py-3"
              style={{ borderColor: "var(--accent)", background: "var(--bg-subtle)" }}
            >
              <p className="text-sm italic" style={{ color: "var(--text-primary)" }}>{ex}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: "var(--text-primary)" }}>
          Step 2: Write the first follow-up
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          If no reply after four or five days, send a short message with a different value hook. Do not repeat the acceptance message. Give them a new reason to engage.
        </p>
        <div className="flex flex-col gap-3 mb-8">
          {[
            "\"Hey [Name], not sure if my last message landed. We've been helping [role] teams at [company type] cut their outbound cycle by roughly [outcome] — happy to share a quick example if relevant.\"",
            "\"[Name] — just wanted to share this quickly. We put together a breakdown of the top three LinkedIn outreach mistakes we see SDR teams make. Thought it might be useful given your focus on pipeline. Happy to send it over.\"",
          ].map((ex) => (
            <div
              key={ex}
              className="rounded-xl border-l-4 pl-4 py-3"
              style={{ borderColor: "var(--accent)", background: "var(--bg-subtle)" }}
            >
              <p className="text-sm italic" style={{ color: "var(--text-primary)" }}>{ex}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: "var(--text-primary)" }}>
          Step 3: Write the second follow-up
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          By the second follow-up, you can introduce more of what you do — but frame it around their problem, not your features.
          Ask for a short, low-commitment call.
        </p>
        <div className="flex flex-col gap-3 mb-8">
          {[
            "\"[Name], wanted to reach out one more time. We work specifically with [role/company type] on [problem area] — the results vary, but most teams we work with see [realistic outcome] within the first [timeframe]. Worth 15 minutes to see if it could apply to you?\"",
            "\"Hey [Name] — last message, I promise. We've been helping [company type] teams automate their LinkedIn outreach without losing the personal feel. If that's on your radar, happy to show you what it looks like in practice. A quick call or I can send a short demo — whichever is easier.\"",
          ].map((ex) => (
            <div
              key={ex}
              className="rounded-xl border-l-4 pl-4 py-3"
              style={{ borderColor: "var(--accent)", background: "var(--bg-subtle)" }}
            >
              <p className="text-sm italic" style={{ color: "var(--text-primary)" }}>{ex}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: "var(--text-primary)" }}>
          Step 4: Write the polite close
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The close message often outperforms the follow-ups because it removes pressure. It acknowledges the silence without being passive-aggressive, and gives the person a clean exit. People often reply to say "not now but maybe later" — which is still a useful outcome.
        </p>
        <div className="flex flex-col gap-3 mb-8">
          {[
            "\"[Name], I'll leave it here. If the timing isn't right or it's not relevant, no worries at all. If you ever want to revisit how [outcome] could work for your team, feel free to drop me a message. Good luck with [specific thing from their profile].\"",
            "\"Hey [Name] — I can take a hint. I won't follow up again after this. But if you ever want to explore [topic], my inbox is open. Either way, hope [relevant thing] is going well.\"",
          ].map((ex) => (
            <div
              key={ex}
              className="rounded-xl border-l-4 pl-4 py-3"
              style={{ borderColor: "var(--accent)", background: "var(--bg-subtle)" }}
            >
              <p className="text-sm italic" style={{ color: "var(--text-primary)" }}>{ex}</p>
            </div>
          ))}
        </div>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Run your full follow-up sequence on autopilot
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly automates every step of your LinkedIn sequence — personalised messages, smart timing, and a unified inbox
            that flags replies worth prioritising.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            See Scribtly in action <ArrowRight size={16} />
          </a>
        </div>

        {/* Section 4: Full sequence template */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          A complete LinkedIn follow-up sequence you can use today
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Below is a full four-message sequence for cold B2B outreach. Swap in specifics for each prospect — their role, company, and a detail from their profile or activity.
        </p>

        {[
          {
            label: "Message 1 — Acceptance (Day 0–1)",
            text: "Thanks for connecting, [Name]. I noticed you're [specific observation about their role or company]. We help [their type of team] with [relevant problem] — happy to share a quick breakdown if that's on your radar right now.",
          },
          {
            label: "Message 2 — First follow-up (Day 4–5)",
            text: "[Name], just wanted to follow up on my last message. We've been working with [similar company type] on [relevant outcome] — I can share a short example of what that looks like if it's useful. Let me know.",
          },
          {
            label: "Message 3 — Second follow-up (Day 9–11)",
            text: "Hey [Name], one more message from me. We specifically work with [their type of team] to [core value prop]. Most teams see [realistic outcome] within [timeframe]. Worth a 15-minute call to see if it's a fit?",
          },
          {
            label: "Message 4 — Polite close (Day 14–16)",
            text: "[Name], I'll leave it here. If the timing's off or it's not the right fit, no problem at all. Feel free to reach out if it ever becomes relevant. Hope [specific thing from their profile] is going well.",
          },
        ].map((t) => (
          <div
            key={t.label}
            className="rounded-2xl border p-6 mb-4"
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

        {/* Section 5 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly automates follow-up sequences without losing personalisation
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Writing four personalised messages for 50 prospects is manageable. For 500, it isn't — at least not without automation.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly pulls real data from each prospect's LinkedIn profile — their current role, company, location, and recent activity — and uses it to personalise every message in the sequence automatically.
          You set the sequence structure once. Scribtly handles the rest: sending each message at the right interval, in the right order, with details specific to each person.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          When a prospect replies, the conversation lands in Scribtly's unified inbox. Auto Book monitors replies for buying signals — interest in a call, requests for more information, positive responses — and sends your calendar link at the right moment.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          Built-in sending limits keep your LinkedIn account within platform guidelines. Multi-account support means agencies and sales teams can run campaigns across multiple profiles from a single dashboard.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "Personalised messages using real LinkedIn data",
            "Smart sending intervals that look human",
            "Unified inbox for all campaign replies",
            "Auto Book for automatic meeting scheduling",
            "Multi-account support for agencies and teams",
            "Safe daily sending limits built in",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Section 6: Mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common follow-up mistakes to avoid
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Pitching in the acceptance message",
              fix: "The first message after connecting is not the place to pitch. Use it to open a dialogue. Save the offer for follow-up two or three, once there's some context between you.",
            },
            {
              mistake: "Sending 'just checking in' with no new value",
              fix: "Every follow-up should add something: a question, a resource, a new angle, or a specific observation. 'Just checking in' wastes a message slot and signals you have nothing new to say.",
            },
            {
              mistake: "Spacing messages too close together",
              fix: "Sending follow-ups one day apart looks automated and feels pushy. Leave at least three to five business days between each message.",
            },
            {
              mistake: "Ignoring replies that show interest but aren't ready to buy",
              fix: "Not everyone who replies is ready to book a call. Soft interest — 'tell me more,' 'maybe in a few months' — is still a signal worth nurturing. Follow up when the timing they mentioned arrives.",
            },
            {
              mistake: "Never sending a close message",
              fix: "Leaving a sequence open indefinitely wastes time and looks disorganised. Send a polite close after your last follow-up. It often triggers the replies that the earlier messages didn't.",
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
            Ready to stop chasing and start closing?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly automates your full LinkedIn outreach sequence — from connection request through to booked meeting —
            with personalised messages that don&apos;t sound like a template.
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
              { href: "/blog/how-to-write-linkedin-connection-requests", label: "How to Write LinkedIn Connection Requests That Get Accepted" },
              { href: "/compare/scribtly-vs-expandi", label: "Scribtly vs Expandi: Which LinkedIn Tool Is Right for You?" },
              { href: "/", label: "Scribtly — LinkedIn outreach automation" },
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

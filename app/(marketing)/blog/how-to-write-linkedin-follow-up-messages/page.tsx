import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write LinkedIn Follow-Up Messages That Get Replies",
  description:
    "Learn how to write LinkedIn follow-up messages after connecting. Practical templates, timing tips, and how to avoid the mistakes that kill reply rates.",
  openGraph: {
    title: "How to Write LinkedIn Follow-Up Messages That Get Replies",
    description:
      "Practical guide to writing LinkedIn follow-up messages that actually get replies — with templates, timing advice, and tips for personalising at scale.",
    type: "article",
    url: "https://scribtly.com/blog/how-to-write-linkedin-follow-up-messages",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write LinkedIn Follow-Up Messages That Get Replies",
    description:
      "Practical guide to writing LinkedIn follow-up messages that get replies — with templates, timing advice, and tips for scaling personalised outreach.",
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
      name: "How soon should I send a follow-up message after someone accepts my LinkedIn connection request?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Send your first follow-up within 24 to 48 hours of the connection being accepted. Waiting longer means the context fades. Sending immediately after acceptance can feel automated and transactional — give it at least a few hours.",
      },
    },
    {
      "@type": "Question",
      name: "Should I pitch my product in the first LinkedIn follow-up message?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The first follow-up is about starting a conversation, not closing a sale. Pitching immediately after connecting is the single most common reason reply rates drop. Lead with something relevant to them — a question, a useful observation, or a specific reason you wanted to connect.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a LinkedIn follow-up message be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep it short — ideally under 100 words. Long messages on LinkedIn get skimmed or ignored. Your goal is to spark a reply, not deliver a presentation. One to three sentences with a clear question or hook is almost always enough.",
      },
    },
    {
      "@type": "Question",
      name: "How many follow-up messages should I send before giving up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two to three messages after the initial connection is a reasonable sequence for most cold outreach. A first follow-up, a second follow-up a few days later, and a final breakup message is enough. Sending more than that without a reply rarely converts and risks damaging your LinkedIn reputation.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good reply rate for LinkedIn follow-up messages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For cold outreach with good personalisation and targeting, a 15–25% reply rate on the first follow-up message is solid. Above 25% suggests strong ICP fit and well-crafted messages. Below 10% usually points to a personalisation or targeting problem rather than a message length issue.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Write LinkedIn Follow-Up Messages That Get Replies",
  description:
    "A practical guide to writing LinkedIn follow-up messages after connecting — with templates, timing advice, and tips for personalising outreach at scale.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-08-05",
  dateModified: "2026-08-05",
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
    q: "How soon should I send a follow-up message after someone accepts my LinkedIn connection request?",
    a: "Send your first follow-up within 24 to 48 hours of the connection being accepted. Waiting longer means the context fades. Sending immediately after acceptance can feel automated and transactional — give it at least a few hours.",
  },
  {
    q: "Should I pitch my product in the first LinkedIn follow-up message?",
    a: "No. The first follow-up is about starting a conversation, not closing a sale. Pitching immediately after connecting is the single most common reason reply rates drop. Lead with something relevant to them — a question, a useful observation, or a specific reason you wanted to connect.",
  },
  {
    q: "How long should a LinkedIn follow-up message be?",
    a: "Keep it short — ideally under 100 words. Long messages on LinkedIn get skimmed or ignored. Your goal is to spark a reply, not deliver a presentation. One to three sentences with a clear question or hook is almost always enough.",
  },
  {
    q: "How many follow-up messages should I send before giving up?",
    a: "Two to three messages after the initial connection is a reasonable sequence for most cold outreach. A first follow-up, a second follow-up a few days later, and a final breakup message is enough. Sending more than that without a reply rarely converts and risks damaging your LinkedIn reputation.",
  },
  {
    q: "What is a good reply rate for LinkedIn follow-up messages?",
    a: "For cold outreach with good personalisation and targeting, a 15–25% reply rate on the first follow-up message is solid. Above 25% suggests strong ICP fit and well-crafted messages. Below 10% usually points to a personalisation or targeting problem rather than a message length issue.",
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
          How to Write LinkedIn Follow-Up Messages That Actually Get Replies
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Getting a LinkedIn connection accepted is only step one. The follow-up message is where most outreach falls apart —
          either it arrives too soon, pitches too hard, or says nothing specific enough to earn a reply.
          This guide covers what to send, when to send it, and how to make every message feel worth responding to.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-08-05">5 August 2026</time>
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
              Want your entire follow-up sequence automated?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly sends personalised follow-up messages at the right time — automatically, using real LinkedIn data for each prospect.
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
          Why most follow-up messages fail
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Someone accepted your connection request. That is a signal — not a green light to pitch immediately.
          Yet that is exactly what most people do, and it is the main reason LinkedIn follow-up reply rates are so low.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The three most common follow-up mistakes:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "Pitching within minutes of the connection being accepted — before any trust exists.",
            "Sending a wall of text that reads like a brochure, not a conversation.",
            "Using the same generic opener for every prospect, making it obvious it is a mass sequence.",
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
          A follow-up that works looks different. It is short, specific, and leads with something that is relevant to the person —
          not just relevant to what you're selling.
        </p>

        {/* Section 2: Timing */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Timing: when to send your first follow-up
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The window after a connection is accepted matters more than most people realise. Too fast and you look automated.
          Too slow and the context evaporates.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              timing: "Within 1 hour of acceptance",
              verdict: "Too soon",
              note: "Feels like a bot. The person has barely had time to look at your profile. Most prospects will see straight through it.",
            },
            {
              timing: "4–24 hours after acceptance",
              verdict: "Good",
              note: "You're still top of mind but the message doesn't feel automated. This is the sweet spot for most cold outreach.",
            },
            {
              timing: "48–72 hours after acceptance",
              verdict: "Fine",
              note: "Still relevant. The connection is still fresh. Reply rates drop slightly but this is acceptable if it is genuinely personalised.",
            },
            {
              timing: "More than a week later",
              verdict: "Late",
              note: "The context has faded. Most prospects won't remember connecting with you. You'll need a stronger opener to re-establish relevance.",
            },
          ].map((item) => (
            <div
              key={item.timing}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{item.timing}</p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: item.verdict === "Good" ? "rgba(34,197,94,0.12)" : item.verdict === "Fine" ? "rgba(234,179,8,0.12)" : "rgba(239,68,68,0.12)",
                        color: item.verdict === "Good" ? "#16a34a" : item.verdict === "Fine" ? "#ca8a04" : "#dc2626",
                      }}
                    >
                      {item.verdict}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: Structure */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The structure of a follow-up message that gets replies
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A strong LinkedIn follow-up has three parts. None of them are long, and none of them involve a pitch.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              num: "1",
              title: "A reference point",
              body: "Acknowledge the connection with something specific — why you reached out, something relevant about them, or a brief nod to their work. It shows you did not just fire off a mass message.",
            },
            {
              num: "2",
              title: "A reason to reply",
              body: "Give them something to respond to. A direct question, a relevant observation, or a point of genuine curiosity works. The question should feel easy to answer and naturally invite conversation.",
            },
            {
              num: "3",
              title: "No pressure",
              body: "End lightly. This is not the close — it is the start of a conversation. Remove any urgency, any heavy ask, and any language that feels like a sales call.",
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

        {/* Section 4: Step-by-step */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Step-by-step: writing a follow-up that earns a reply
        </h2>

        <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: "var(--text-primary)" }}>
          Step 1: Check their profile again before writing
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Before you write anything, revisit their profile. Look for anything new since you sent the connection request:
        </p>
        <ul className="flex flex-col gap-2 mb-6">
          {[
            "A post or article they shared recently",
            "A role change or promotion",
            "A company announcement or campaign",
            "A comment they left on someone else's post",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Even one specific detail referenced in your message makes it read like a human sent it — not a sequence.
        </p>

        <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: "var(--text-primary)" }}>
          Step 2: Open with a reference, not a pitch
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The opening line is everything. A few examples that work:
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            "\"Thanks for connecting, [Name]. I noticed your team recently expanded into [market] — curious how you're approaching outbound there.\"",
            "\"Great to be connected. Your post on [topic] caught my attention last week — do you find that [specific point] holds true across different company sizes?\"",
            "\"Thanks for accepting, [Name]. I work with [similar companies] on [relevant area] — happy to share what we're seeing if it's useful.\"",
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
          Step 3: Ask one easy question
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          One question. Not three. Open-ended questions that relate to their situation are easier to answer than closed
          questions that force a yes or no. A reply that requires thought tends to happen tomorrow — or never.
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            "\"How are you currently handling outbound for the [team/function]?\"",
            "\"Is [specific challenge] something you're actively working on at the moment?\"",
            "\"Would it be worth a quick 15 minutes to compare notes on [shared topic]?\"",
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
          Step 4: Write a second follow-up if you get no reply
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Wait three to five days. If no reply, send a short second follow-up. Change the angle — do not repeat the first message.
          Try offering something useful: a relevant article, a specific insight, or a different question.
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            "\"Following up on my last message, [Name]. In case it's useful — we published a short breakdown of [relevant topic] that might be worth a look: [link or brief summary].\"",
            "\"Just checking back in — I appreciate if this landed at a bad time. Happy to reconnect whenever works better for you.\"",
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
          Step 5: Send a final breakup message
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          If two follow-ups produce no reply, send one final message. Keep it light, leave the door open, and move on.
          Breakup messages have surprisingly high reply rates — people often reply when they feel you're about to stop.
        </p>
        <div
          className="rounded-xl border-l-4 pl-4 py-3 mb-8"
          style={{ borderColor: "var(--accent)", background: "var(--bg-subtle)" }}
        >
          <p className="text-sm italic" style={{ color: "var(--text-primary)" }}>
            "I won't keep following up, [Name] — I know timing isn't always right. If [relevant topic] ever becomes a priority,
            feel free to reach back out. Good luck with [something specific you noticed about their work]."
          </p>
        </div>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Automate your entire LinkedIn sequence — without losing the personal touch
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly sends personalised connection requests, acceptance messages, and follow-ups automatically —
            each one using real LinkedIn data so every message feels written for that person.
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

        {/* Section 5: Templates */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Ready-to-use LinkedIn follow-up message templates
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Use these as frameworks. Swap in specific details for every person before sending — the more specific, the better the reply rate.
        </p>

        {[
          {
            label: "First follow-up — general cold outreach",
            text: "Thanks for connecting, [Name]. I saw you're leading [function] at [Company] — we work with similar teams on [specific area]. Curious whether [relevant challenge] is something you're dealing with at the moment?",
          },
          {
            label: "First follow-up — after they shared relevant content",
            text: "Great to connect, [Name]. Saw your post on [topic] — the point about [specific detail] resonated. We've been seeing the same thing with the teams we work with. Are you approaching it the same way internally?",
          },
          {
            label: "First follow-up — referencing their company news",
            text: "Good to be connected, [Name]. I noticed [Company] recently [news/milestone] — congrats. I work with [similar companies] going through that stage on [relevant area]. Would a quick conversation be useful?",
          },
          {
            label: "Second follow-up — no reply to first",
            text: "Just following up, [Name] — appreciate if my last message came at a busy time. In case it helps, we put together a short overview of [relevant topic] that might be worth a look. Happy to share if useful.",
          },
          {
            label: "Final breakup message",
            text: "I won't keep following up — I know timing matters and it may not be the right moment. If [relevant topic] becomes a priority, feel free to reach back out. Wishing you well with [specific thing].",
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
              "{t.text}"
            </p>
          </div>
        ))}

        {/* Section 6: How Scribtly handles it */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly handles follow-up sequences at scale
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Writing personalised follow-up messages manually for 20 prospects a week is possible.
          Doing it for 200 while running everything else in your business is not.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly automates the entire outreach sequence — connection request, acceptance message, first follow-up,
          and second follow-up — while keeping each message personalised using real LinkedIn data.
          Every message references something specific to that prospect: their role, company, activity, or location.
          No static merge fields. No copy-paste templates.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          You set up your sequence once. Scribtly sends messages at human-like intervals within safe daily limits,
          and every reply comes back to a single unified inbox. If a prospect shows buying signals,
          Auto Book detects them and sends your calendar link automatically.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "Connection request → acceptance message → follow-ups, all automated",
            "Personalised using real LinkedIn profile data",
            "Human-like send timing — not a blast",
            "Built-in daily limits to protect your account",
            "Unified inbox for all replies across all campaigns",
            "Auto Book detects buying signals and sends your calendar link",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Section 7: Mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes to avoid in LinkedIn follow-up messages
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Starting with 'Just following up on my last message'",
              fix: "This opener tells the reader nothing new. Instead, change the angle entirely — lead with a different hook, a useful piece of information, or a new question.",
            },
            {
              mistake: "Writing more than 100 words",
              fix: "Long messages on LinkedIn get scrolled past. Short messages get read and replied to. If you can't say it in three sentences, you haven't refined the message enough.",
            },
            {
              mistake: "Pitching immediately after connecting",
              fix: "Treat the first follow-up as an introduction, not a sales call. The pitch — if it comes — belongs in a later message, after some kind of exchange has happened.",
            },
            {
              mistake: "Sending follow-ups too close together",
              fix: "Space messages three to five days apart at minimum. Sending daily messages after no reply makes you look desperate and risks getting flagged as spam.",
            },
            {
              mistake: "Using the exact same message for everyone",
              fix: "Even one personalised detail — their company name, a specific role, a recent post — makes a meaningful difference to reply rates. Generic messages feel like generic messages.",
            },
            {
              mistake: "No clear ask or question",
              fix: "If your message doesn't ask for anything, the prospect has no reason to reply. Every follow-up should include one clear, easy-to-answer question or invitation.",
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
            Ready to automate your LinkedIn follow-up sequence?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly automates your entire LinkedIn outreach — from connection request to booked meeting —
            with personalised messages at every step. Your pipeline keeps moving while you focus on closing.
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
              { href: "/blog/how-to-write-linkedin-connection-requests", label: "How to write LinkedIn connection requests that get accepted" },
              { href: "/compare/scribtly-vs-expandi", label: "Scribtly vs Expandi: which LinkedIn tool is right for you?" },
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

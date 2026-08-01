import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "LinkedIn Follow-Up Message Templates That Get Replies",
  description:
    "10 proven LinkedIn follow-up message templates for B2B outreach. Copy, adapt, and use them in your sequences to book more meetings.",
  openGraph: {
    title: "LinkedIn Follow-Up Message Templates That Get Replies",
    description:
      "10 ready-to-use LinkedIn follow-up message templates for B2B outreach — covering first messages, soft bumps, breakup messages, and more.",
    type: "article",
    url: "https://scribtly.com/templates/linkedin-follow-up-message-templates",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Follow-Up Message Templates That Get Replies",
    description:
      "10 ready-to-use LinkedIn follow-up message templates for B2B outreach — covering first messages, soft bumps, breakup messages, and more.",
  },
  alternates: {
    canonical: "https://scribtly.com/templates/linkedin-follow-up-message-templates",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "10 LinkedIn Follow-Up Message Templates That Actually Get Replies",
  description:
    "Ready-to-use LinkedIn follow-up message templates for B2B outreach, covering first messages after connection, second touches, breakup messages, and automated sequences.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-08-01",
  dateModified: "2026-08-01",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/templates/linkedin-follow-up-message-templates",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many LinkedIn follow-up messages should I send?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most practitioners recommend two to three follow-ups after the initial connection message. The first follow-up should come 3–5 days after no reply. A second follow-up can go out 5–7 days after that. A final breakup message after another week rounds out a typical sequence. Sending more than four messages with no response risks feeling intrusive.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good LinkedIn reply rate for follow-up messages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A healthy reply rate for cold LinkedIn follow-up messages sits between 8–18% depending on targeting, message quality, and industry. The first follow-up after connection acceptance typically sees the highest reply rate. Rates improve significantly when messages reference real details from the prospect's profile.",
      },
    },
    {
      "@type": "Question",
      name: "Should I pitch in my LinkedIn follow-up message?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not immediately. The first message after connection should open a conversation, not close a sale. Lead with value, relevance, or a question. Save the direct pitch for the second or third message once you have some engagement — or once it becomes clear the prospect hasn't replied and you have nothing to lose.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a LinkedIn follow-up message be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep it short. Two to four sentences is ideal for most follow-up messages. Longer messages are harder to read in the LinkedIn inbox and signal that you're asking for more attention than the recipient has agreed to give. Shorter messages feel confident and easier to respond to.",
      },
    },
    {
      "@type": "Question",
      name: "Can I automate LinkedIn follow-up messages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, tools like Scribtly can automate multi-step LinkedIn sequences while keeping messages personalised using real profile data. Automated sequences handle timing between messages, safe sending limits, and reply detection — so you are not manually tracking each prospect.",
      },
    },
    {
      "@type": "Question",
      name: "What is a LinkedIn breakup message?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A breakup message is the final follow-up in a sequence. It acknowledges that the prospect has not replied and closes the loop cleanly — usually by saying you will not follow up again unless they reach out. Breakup messages often generate replies because they are low-pressure and leave the door open without being pushy.",
      },
    },
  ],
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

const faqs = [
  {
    q: "How many LinkedIn follow-up messages should I send?",
    a: "Most practitioners recommend two to three follow-ups after the initial connection message. The first follow-up should come 3–5 days after no reply. A second follow-up can go out 5–7 days after that. A final breakup message after another week rounds out a typical sequence. Sending more than four messages with no response risks feeling intrusive.",
  },
  {
    q: "What is a good LinkedIn reply rate for follow-up messages?",
    a: "A healthy reply rate for cold LinkedIn follow-up messages sits between 8–18% depending on targeting, message quality, and industry. The first follow-up after connection acceptance typically sees the highest reply rate. Rates improve significantly when messages reference real details from the prospect's profile.",
  },
  {
    q: "Should I pitch in my LinkedIn follow-up message?",
    a: "Not immediately. The first message after connection should open a conversation, not close a sale. Lead with value, relevance, or a question. Save the direct pitch for the second or third message once you have some engagement — or once it becomes clear the prospect hasn't replied and you have nothing to lose.",
  },
  {
    q: "How long should a LinkedIn follow-up message be?",
    a: "Keep it short. Two to four sentences is ideal for most follow-up messages. Longer messages are harder to read in the LinkedIn inbox and signal that you're asking for more attention than the recipient has agreed to give. Shorter messages feel confident and easier to respond to.",
  },
  {
    q: "Can I automate LinkedIn follow-up messages?",
    a: "Yes, tools like Scribtly can automate multi-step LinkedIn sequences while keeping messages personalised using real profile data. Automated sequences handle timing between messages, safe sending limits, and reply detection — so you are not manually tracking each prospect.",
  },
  {
    q: "What is a LinkedIn breakup message?",
    a: "A breakup message is the final follow-up in a sequence. It acknowledges that the prospect has not replied and closes the loop cleanly — usually by saying you will not follow up again unless they reach out. Breakup messages often generate replies because they are low-pressure and leave the door open without being pushy.",
  },
];

const templates = [
  {
    group: "First message after connection accepted",
    items: [
      {
        label: "Value-led opener",
        when: "Best when you have a relevant insight, resource, or result to share.",
        text: "Hi [Name], thanks for connecting. We recently helped a [job title/industry] team at [similar company type] [specific result, e.g. cut response time in half]. Thought it might be relevant given what [Company] is working on. Happy to share more if useful.",
        note: "Keep the result specific but honest. Vague claims like 'great results' read as generic immediately.",
      },
      {
        label: "Problem-focused opener",
        when: "Best when you know the common pain points for their role or industry.",
        text: "Hi [Name], most [job titles] I speak to are dealing with [specific problem]. Is that something on your radar right now? Even if not, happy to share what we're seeing others do.",
        note: "A genuine question is lower friction than a pitch. It invites a reply without demanding one.",
      },
      {
        label: "Social proof opener",
        when: "Best when you have relevant clients, case studies, or logos they'd recognise.",
        text: "Hi [Name], we work with a few [industry/company type] teams including [recognisable name if applicable]. I thought there might be a fit with [Company] — would it be worth a quick call to see?",
        note: "Only use names you're permitted to reference. If unsure, describe the company type instead.",
      },
    ],
  },
  {
    group: "Second message (no reply to first)",
    items: [
      {
        label: "Soft bump",
        when: "Best sent 4–6 days after the first message with no reply.",
        text: "Hi [Name], circling back in case my last message got lost. [One-line summary of what you help with]. If the timing's not right, no problem — just let me know.",
        note: "Acknowledge it's a follow-up. It's more honest and surprisingly more effective than pretending it's a fresh message.",
      },
      {
        label: "New angle",
        when: "Best when you have a different hook or angle from the first message.",
        text: "Hi [Name], wanted to follow up with a slightly different angle. We recently [new relevant result or insight]. Given [specific thing about their company or role], I thought it might resonate more. Worth a 20-minute conversation?",
        note: "A fresh angle shows you've thought about their situation rather than just chasing the thread.",
      },
    ],
  },
  {
    group: "Third message (final follow-up)",
    items: [
      {
        label: "Breakup message",
        when: "Best sent 5–7 days after the second message. This is your last touch.",
        text: "Hi [Name], I will not keep following up — I know the timing might not be right. If [pain point or relevant trigger] becomes a priority, feel free to reach out. Happy to help when it makes sense.",
        note: "Breakup messages often generate replies precisely because they are low-pressure. They close the loop without burning the relationship.",
      },
      {
        label: "Timing reset",
        when: "Best when the prospect has been warm but not yet ready to commit.",
        text: "Hi [Name], completely understand if now isn't the right time. If things change — particularly around [relevant trigger] — I'd be glad to reconnect. I'll check back in a couple of months unless you'd rather I didn't.",
        note: "Setting a clear next check-in shows respect for their time and keeps the door open without hovering.",
      },
    ],
  },
  {
    group: "Response to a positive reply",
    items: [
      {
        label: "Calendar link send",
        when: "Use when they've expressed interest or asked how to proceed.",
        text: "Great to hear from you. To make it easy, here's a link to pick a time: [calendar link]. No prep needed — just a quick 20-minute call to see if there's a fit.",
        note: "Send the calendar link immediately. Every extra back-and-forth before booking a meeting increases the chance they lose interest.",
      },
      {
        label: "Next-step framing",
        when: "Use when they've replied positively but haven't committed to a call.",
        text: "Glad that resonates. The easiest next step is a quick call — usually 20 minutes. I can walk you through exactly how [outcome] works for a [company type] like yours. [Calendar link] if you'd like to grab a time.",
        note: "Framing the call as easy and specific reduces commitment anxiety. Avoid vague language like 'whenever suits you.'",
      },
    ],
  },
  {
    group: "Agency and multi-account outreach",
    items: [
      {
        label: "Agency introduction",
        when: "Best for agencies reaching out on behalf of clients or for their own business development.",
        text: "Hi [Name], I run outreach for [client type/industry] businesses and noticed [Company] looks like a potential fit for what we do. We've helped similar teams [specific result]. Would it be worth a quick call to see if there's an angle worth exploring?",
        note: "Be upfront about what you do. Hiding the agency angle erodes trust the moment they realise.",
      },
    ],
  },
];

const mistakes = [
  {
    mistake: "Sending the same message to everyone",
    fix: "Even one personalised detail — their role, company, or a recent post — makes a measurable difference to reply rates. Templates are a structure, not a finished message.",
  },
  {
    mistake: "Starting with 'I' or 'We'",
    fix: "Start with 'Hi [Name]' or jump straight into a relevant observation. Messages that open with 'I help companies...' feel self-centred immediately.",
  },
  {
    mistake: "Sending follow-ups too quickly",
    fix: "Give at least 3–5 days between messages. Following up the next day signals you're not getting much response and can feel desperate.",
  },
  {
    mistake: "Making follow-ups longer than the first message",
    fix: "Each follow-up should be the same length or shorter than the last. Longer messages ask for more time from someone who has already chosen not to reply.",
  },
  {
    mistake: "Not having a clear ask",
    fix: "Every message should have one simple next step — a question, a calendar link, or a 'let me know if this is relevant.' Vague messages get vague responses.",
  },
];

export default function LinkedInFollowUpTemplatesPage() {
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

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          LinkedIn Templates
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          10 LinkedIn Follow-Up Message Templates That Actually Get Replies
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Most LinkedIn follow-ups get ignored because they repeat the same pitch with slightly different words. These templates give you a practical structure for every stage of the sequence — from the first message after connection to the final breakup message.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-08-01">1 August 2026</time>
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
              Want follow-ups sent automatically — personalised per prospect?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly automates your full LinkedIn sequence, from connection request to meeting booked, using real profile data for every message.
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
          Why most LinkedIn follow-ups fail
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Getting a connection accepted is the easy part. What happens next determines whether LinkedIn outreach actually books meetings.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Most follow-up messages fail for one of three reasons:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "They repeat the first message with slightly different wording.",
            "They make a pitch before the prospect has shown any interest.",
            "They have no clear next step — just a vague 'let me know if you're ever interested.'",
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
          The templates below give you a different approach for each stage of the sequence. The goal is to add value or change the angle with every message — not to push harder on the same pitch.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How to structure a LinkedIn follow-up sequence
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A typical cold outreach sequence on LinkedIn has four stages:
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              num: "1",
              title: "Connection request",
              body: "Short, personalised, no pitch. Its only job is to get accepted. See our guide to LinkedIn connection request messages for templates.",
            },
            {
              num: "2",
              title: "First message after acceptance",
              body: "Sent within 24–48 hours of acceptance. Open a conversation — don't pitch. Lead with value, a relevant observation, or a question.",
            },
            {
              num: "3",
              title: "Second follow-up (3–6 days later)",
              body: "A soft bump with a fresh angle. Acknowledge it's a follow-up and give them a new reason to reply.",
            },
            {
              num: "4",
              title: "Final message (5–7 days after second)",
              body: "A breakup message or timing reset. Low pressure, leaves the door open, and often generates the most replies of any message in the sequence.",
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
                  <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Templates section */}
        <h2 className="text-2xl font-bold mb-2 mt-12" style={{ color: "var(--text-primary)" }}>
          10 LinkedIn follow-up message templates
        </h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          These are starting points. Replace the bracketed placeholders with real details specific to each prospect before sending. Generic templates sent without adaptation produce generic results.
        </p>

        {templates.map((group) => (
          <div key={group.group} className="mb-10">
            <h3 className="text-lg font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
              {group.group}
            </h3>
            <div className="flex flex-col gap-5">
              {group.items.map((t) => (
                <div
                  key={t.label}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
                    {t.label}
                  </p>
                  <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                    {t.when}
                  </p>
                  <div
                    className="rounded-xl border-l-4 pl-4 py-3 mb-4"
                    style={{ borderColor: "var(--accent)", background: "var(--bg-base)" }}
                  >
                    <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-primary)" }}>
                      "{t.text}"
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    <strong style={{ color: "var(--text-primary)" }}>Note: </strong>{t.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Run these sequences automatically — without losing personalisation
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly automates your full LinkedIn outreach sequence. Every message is personalised
            using real data from each prospect's profile — no mail-merge placeholders, no copy-paste.
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

        {/* Section: How to personalise at scale */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How to personalise follow-ups at scale
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Personalising one follow-up message takes two minutes. Personalising 200 takes most of a working day.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The most effective approach at scale is to personalise at the template level, not the word level. This means designing templates where the specific detail slot is obvious and easy to fill — not rewriting the whole message for every contact.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The data points that matter most for personalisation:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "Their current job title and how long they've been in the role",
            "Their company name and industry",
            "A recent post, article, or comment they made",
            "Their company size or growth stage",
            "A relevant trigger event — new hire, funding, product launch",
            "Mutual connections or shared professional groups",
          ].map((point) => (
            <div key={point} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{point}</span>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly pulls this data automatically from each prospect's LinkedIn profile and uses it to generate personalised messages across your entire sequence — not just the first message.
        </p>

        {/* Section: How Scribtly automates sequences */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly automates your LinkedIn follow-up sequence
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Setting up a manual follow-up sequence means tracking timing, writing personalised messages, monitoring replies, and making sure you don't follow up on someone who just booked a call. That's a significant amount of overhead at any volume.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly handles the full sequence:
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              title: "ICP-matched targeting",
              body: "Define your ideal customer profile and Scribtly identifies matching LinkedIn prospects. Every contact enters the sequence because they fit your criteria — not just because they're in a spreadsheet.",
            },
            {
              title: "Personalised messages per stage",
              body: "Each stage of the sequence uses real LinkedIn data to personalise the message. The follow-up references something specific to that person, not a generic merge field.",
            },
            {
              title: "Human-like timing",
              body: "Messages are sent at intervals and times that mimic natural behaviour. Built-in daily limits keep your LinkedIn account within platform guidelines.",
            },
            {
              title: "Unified inbox with Auto Book",
              body: "When a prospect replies, the conversation appears in your Scribtly inbox. Auto Book detects buying signals and sends your calendar link automatically — without you needing to monitor every reply.",
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

        {/* Section: Mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common follow-up mistakes to avoid
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {mistakes.map((item) => (
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
            Ready to automate your LinkedIn outreach?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly runs your full LinkedIn sequence — personalised connection request, follow-ups, and automatic meeting booking — so you can focus on the conversations that matter.
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
              { href: "/compare/scribtly-vs-expandi", label: "Scribtly vs Expandi — LinkedIn automation comparison" },
              { href: "/", label: "Scribtly — automated LinkedIn outreach that books meetings" },
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

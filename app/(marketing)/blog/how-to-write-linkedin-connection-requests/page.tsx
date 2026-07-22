import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write LinkedIn Connection Requests That Get Accepted",
  description:
    "Learn how to write LinkedIn connection requests that get accepted. Practical templates, do's and don'ts, and tips for personalising outreach at scale.",
  openGraph: {
    title: "How to Write LinkedIn Connection Requests That Get Accepted",
    description:
      "Practical guide to writing LinkedIn connection requests that get accepted — with templates, examples, and tips for scaling personalised outreach.",
    type: "article",
    url: "https://scribtly.com/blog/how-to-write-linkedin-connection-requests",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write LinkedIn Connection Requests That Get Accepted",
    description:
      "Practical guide to writing LinkedIn connection requests that get accepted — with templates, examples, and tips for scaling personalised outreach.",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-linkedin-connection-requests",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a LinkedIn connection request message be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep it under 300 characters. LinkedIn limits connection request notes to 300 characters, so every word needs to earn its place. Most accepted requests are 100–200 characters.",
      },
    },
    {
      "@type": "Question",
      name: "Should I always include a note with my LinkedIn connection request?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. Blank requests work well when you have a strong shared context — mutual connections, the same event, or an obvious reason the person would recognise you. Add a note when you're reaching cold, because without one there's no reason for them to accept.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good LinkedIn connection acceptance rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A healthy acceptance rate for cold outreach sits between 25–40%. Rates above 40% suggest strong targeting or warm introductions. Below 20% usually means the targeting is off, the message feels generic, or the profile needs work.",
      },
    },
    {
      "@type": "Question",
      name: "Can I send the same connection request message to everyone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use the same structure, but the content needs to feel specific to each person. A message that references their role, company, or a piece of content they shared will always outperform a generic template. Tools like Scribtly can personalise at scale using real LinkedIn data.",
      },
    },
    {
      "@type": "Question",
      name: "How many connection requests can I send per week on LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LinkedIn doesn't publish an official limit, but most practitioners recommend staying under 100 invitations per week to avoid restrictions. Spreading requests across the week and varying sending times helps keep your account safe.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Write LinkedIn Connection Requests That Actually Get Accepted",
  description:
    "A practical guide to writing LinkedIn connection requests that get accepted, with templates, examples, and tips for personalising outreach at scale.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-07-22",
  dateModified: "2026-07-22",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/blog/how-to-write-linkedin-connection-requests",
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
      name: "How to Write LinkedIn Connection Requests That Get Accepted",
      item: "https://scribtly.com/blog/how-to-write-linkedin-connection-requests",
    },
  ],
};

const faqs = [
  {
    q: "How long should a LinkedIn connection request message be?",
    a: "Keep it under 300 characters. LinkedIn limits connection request notes to 300 characters, so every word needs to earn its place. Most accepted requests are 100–200 characters.",
  },
  {
    q: "Should I always include a note with my LinkedIn connection request?",
    a: "Not always. Blank requests work well when you have a strong shared context — mutual connections, the same event, or an obvious reason the person would recognise you. Add a note when you're reaching cold, because without one there's no reason for them to accept.",
  },
  {
    q: "What is a good LinkedIn connection acceptance rate?",
    a: "A healthy acceptance rate for cold outreach sits between 25–40%. Rates above 40% suggest strong targeting or warm introductions. Below 20% usually means the targeting is off, the message feels generic, or the profile needs work.",
  },
  {
    q: "Can I send the same connection request message to everyone?",
    a: "You can use the same structure, but the content needs to feel specific to each person. A message that references their role, company, or a piece of content they shared will always outperform a generic template. Tools like Scribtly can personalise at scale using real LinkedIn data.",
  },
  {
    q: "How many connection requests can I send per week on LinkedIn?",
    a: "LinkedIn doesn't publish an official limit, but most practitioners recommend staying under 100 invitations per week to avoid restrictions. Spreading requests across the week and varying sending times helps keep your account safe.",
  },
];

export default function HowToWriteLinkedInConnectionRequestsPage() {
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
          <span style={{ color: "var(--text-primary)" }}>LinkedIn Connection Requests</span>
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
          How to Write LinkedIn Connection Requests That Actually Get Accepted
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Most LinkedIn connection requests get ignored — not because the sender's irrelevant, but because the message gives the recipient no reason to say yes.
          This guide covers what works, what doesn't, and how to personalise at scale without spending hours on each message.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-07-22">22 July 2026</time>
          <span>·</span>
          <span>8 min read</span>
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
              Want personalised connection requests sent automatically?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly generates personalised outreach using real LinkedIn data — no copy-paste templates.
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
          Why most LinkedIn connection requests get ignored
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          LinkedIn users receive a steady stream of connection requests every week. Most are ignored — not because people are rude, but because the request gives them no reason to accept.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The three most common reasons a request gets declined or ignored:
        </p>
        <ul className="flex flex-col gap-3 mb-6">
          {[
            "No personalisation — it reads like a mass blast.",
            "No clear reason why you're connecting — they can't tell what you want.",
            "No indication of value — there's nothing in it for them.",
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
          The good news: fixing all three doesn't require writing a novel. It requires knowing what to include and what to leave out.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The anatomy of a connection request that gets accepted
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          LinkedIn limits connection request notes to 300 characters — roughly two to three sentences. That constraint is actually useful: it forces clarity.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A strong connection request contains three elements:
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              num: "1",
              title: "A specific hook",
              body: "Reference something real — their job title, company, a post they wrote, a mutual connection, or an event you both attended. Generic openers like 'I came across your profile' signal a mass message immediately.",
            },
            {
              num: "2",
              title: "A clear reason for connecting",
              body: "Tell them why you're reaching out. They should be able to understand your intent in one sentence — not unpack it. Keep it honest and direct.",
            },
            {
              num: "3",
              title: "A low-pressure close",
              body: "Don't pitch in the connection request. Ask to connect, express genuine interest, or note a shared topic. The request is the door — the conversation happens after it opens.",
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
          Step-by-step: writing a connection request that works
        </h2>

        <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: "var(--text-primary)" }}>
          Step 1: Look at their profile for 60 seconds
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Before you write anything, scan their profile. Look for:
        </p>
        <ul className="flex flex-col gap-2 mb-6">
          {[
            "Their current role and how long they've been there",
            "A recent post, article, or comment",
            "Their company's focus or a recent news item",
            "Any shared connections, groups, or events",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          You're looking for one specific detail to anchor your message. One is enough.
        </p>

        <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: "var(--text-primary)" }}>
          Step 2: Draft the opening line
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Use the specific detail you found. A few examples:
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            "\"Saw your post on SDR onboarding last week — genuinely useful take.\"",
            "\"Noticed you're heading sales at [Company] — we both spoke at SaaStock last year.\"",
            "\"[Mutual connection] mentioned your work on pipeline automation.\"",
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
          Step 3: State your reason clearly
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          One sentence. No fluff. Tell them why you're reaching out. If you have a product or service that might be relevant, you can hint at it — but don't pitch yet.
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            "\"I work with B2B sales teams on outbound and thought it'd be good to connect.\"",
            "\"I help agencies scale LinkedIn outreach and your profile caught my eye.\"",
            "\"We're working on something similar and would value your perspective.\"",
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
          Step 4: Close without pressure
        </h3>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Keep the close light. You're asking to connect, not asking for a meeting.
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            "\"Happy to connect either way.\"",
            "\"Would be good to have you in my network.\"",
            "\"Let me know if that resonates.\"",
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
            Personalise connection requests at scale — without the manual work
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly pulls real LinkedIn data to generate personalised connection requests for every prospect on your list.
            You set it up once and it runs automatically.
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

        {/* Section 4: Templates */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Ready-to-use LinkedIn connection request templates
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Use these as starting points. Swap in the specific detail for each person before sending.
        </p>

        {[
          {
            label: "Cold outreach — shared industry",
            text: "Hi [Name], saw you're leading sales at [Company]. I work with [industry] teams on outbound — would be great to connect and swap notes.",
          },
          {
            label: "Warm — mutual connection",
            text: "Hi [Name], [Mutual] suggested I reach out. We're both working in [area] and I thought it'd be good to connect.",
          },
          {
            label: "Content-based — after reading their post",
            text: "Hi [Name], your post on [topic] last week was spot on — particularly the point about [specific detail]. Would love to connect.",
          },
          {
            label: "Event-based — same conference or group",
            text: "Hi [Name], I noticed we're both in [Group/Event]. I'm working on [relevant thing] and thought connecting made sense.",
          },
          {
            label: "Direct — for prospects who fit your ICP",
            text: "Hi [Name], I work with [role/company type] to [outcome]. Thought your profile was worth a direct hello — happy to connect either way.",
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

        {/* Section 5 */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly handles personalisation at scale
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Writing personalised connection requests for 50 prospects a week is manageable. Writing them for 500 isn't — not without tools.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly pulls data from each prospect's LinkedIn profile — their current role, company, activity, location — and uses it to generate personalised connection request messages automatically.
          Every message references something specific to that person. No copy-paste templates. No manual research for each contact.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          You define your ideal customer profile once, set your campaign sequence, and Scribtly handles the rest — from finding matching prospects to sending connection requests at human-like intervals.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          Built-in sending limits keep your LinkedIn account within platform guidelines. All conversations come back to a single inbox where Auto Book can detect buying signals and send your calendar link at the right moment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "ICP-matched prospect targeting",
            "Real LinkedIn data — not generic fields",
            "Personalised messages per prospect",
            "Safe daily sending limits",
            "Unified inbox for all replies",
            "Auto Book for meeting scheduling",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Section 6: Mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes to avoid
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              mistake: "Pitching in the connection request",
              fix: "Save the pitch for after they accept. The connection request's only job is to get accepted.",
            },
            {
              mistake: "Using the same message for everyone",
              fix: "Even swapping in the person's name and company makes a measurable difference to acceptance rates.",
            },
            {
              mistake: "Making it too long",
              fix: "300 characters is the limit. Even if you're under the limit, aim for 150–200. Shorter reads faster and signals confidence.",
            },
            {
              mistake: "Being vague about why you're connecting",
              fix: "Vague reasons create friction. A clear, honest reason — even a simple one — is always better than ambiguity.",
            },
            {
              mistake: "Sending too many requests too quickly",
              fix: "Sending 50 requests in an hour looks automated. Spread them across the day. Tools like Scribtly handle this automatically.",
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
            Ready to book more meetings from LinkedIn?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly automates personalised LinkedIn outreach from ICP targeting to meeting booking —
            so your calendar fills while you focus on closing.
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

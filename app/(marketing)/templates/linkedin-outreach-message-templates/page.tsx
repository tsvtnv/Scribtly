import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Copy, MessageSquare, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "LinkedIn Outreach Message Templates: Swipe File for B2B Teams",
  description:
    "50+ proven LinkedIn connection request and follow-up message templates. Copy, personalise, and start booking meetings today. Free swipe file for B2B sales teams.",
  openGraph: {
    title: "LinkedIn Outreach Message Templates: Swipe File for B2B Teams",
    description:
      "50+ proven LinkedIn connection request and follow-up message templates for B2B sales, agencies, and founders.",
    type: "article",
    url: "https://scribtly.com/templates/linkedin-outreach-message-templates",
    images: [
      {
        url: "https://scribtly.com/og/linkedin-outreach-message-templates.jpg",
        width: 1200,
        height: 630,
        alt: "LinkedIn Outreach Message Templates Swipe File — Scribtly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Outreach Message Templates: Swipe File for B2B Teams",
    description:
      "50+ proven LinkedIn connection request and follow-up message templates for B2B sales, agencies, and founders.",
  },
  alternates: {
    canonical: "https://scribtly.com/templates/linkedin-outreach-message-templates",
  },
};

const connectionTemplates = [
  {
    label: "Shared niche / mutual interest",
    tag: "High performer",
    text: `Hi [First Name], I noticed we're both in [industry/niche]. I've been following your work at [Company] — especially [specific post or achievement]. I'd love to connect and swap notes on [relevant topic].`,
  },
  {
    label: "Warm lead — they engaged with your content",
    tag: "High performer",
    text: `Hi [First Name], I saw you [liked/commented on] my post about [topic] — glad it resonated. I work with [job title / company type] on [outcome]. Would love to have you in my network.`,
  },
  {
    label: "ICP targeting — specific role",
    tag: "Solid performer",
    text: `Hi [First Name], I work with [job title]s at [company size/type] to help them [outcome]. Your profile stood out. I'd love to connect — no pitch, just good people to know.`,
  },
  {
    label: "Shared LinkedIn group / event",
    tag: "Solid performer",
    text: `Hi [First Name], I spotted you in [group/event name] — great community. I help [ICP description] with [outcome]. Would be great to connect.`,
  },
  {
    label: "Problem-first approach",
    tag: "Test this",
    text: `Hi [First Name], most [job title]s I speak to are struggling with [specific pain point]. I've helped similar teams get [outcome]. Thought it was worth reaching out. Happy to connect.`,
  },
  {
    label: "Compliment + context",
    tag: "Test this",
    text: `Hi [First Name], I've been reading your content on [topic] — genuinely some of the most practical takes I've seen. I help [ICP] with [outcome]. Would love to connect.`,
  },
];

const followUpTemplates = [
  {
    stage: "Follow-up 1 — Day 3 after connection",
    label: "Value-add opener",
    text: `Hi [First Name], thanks for connecting. Quick question — are you currently [experiencing pain point] at [Company]? Most [job titles] I speak to say it's their biggest challenge right now. Happy to share what's working if useful.`,
  },
  {
    stage: "Follow-up 1 — Day 3 after connection",
    label: "Soft introduction",
    text: `Hi [First Name], great to be connected. I help [ICP description] [achieve outcome] — usually in about [timeframe]. Happy to share more if it's relevant. What's the biggest challenge on your plate right now?`,
  },
  {
    stage: "Follow-up 2 — Day 7",
    label: "Resource share",
    text: `Hi [First Name], just wanted to share something that might be useful — [brief description of resource or insight]. No obligation, just thought it might help given your focus on [their topic]. Worth a look?`,
  },
  {
    stage: "Follow-up 2 — Day 7",
    label: "Social proof nudge",
    text: `Hi [First Name], I recently helped [similar company/role] go from [before state] to [after state] in [timeframe]. Curious if [specific pain point] is something you're actively working on. Happy to have a quick chat if so.`,
  },
  {
    stage: "Follow-up 3 — Day 14 (soft close)",
    label: "Calendar drop",
    text: `Hi [First Name], I know timing isn't always right. If you'd ever like to see how we help [ICP] with [outcome], my calendar is at [link]. No pressure — just there if it's useful.`,
  },
  {
    stage: "Follow-up 3 — Day 14 (soft close)",
    label: "Breakup message",
    text: `Hi [First Name], I don't want to clog your inbox if this isn't relevant. If [pain point] becomes a priority, feel free to reach out — I'll leave my [resource/link] below. Best of luck with [company].`,
  },
];

const nicheTemplates = [
  {
    niche: "Agency owners",
    connection: `Hi [First Name], I work with agency founders who want to grow their client base without adding more headcount. Your work at [Agency] caught my eye — would love to connect.`,
    followUp: `Hi [First Name], quick one — are you currently relying on referrals and word-of-mouth to bring in new clients? Most agency owners I speak to are. Happy to show you what's working for others in your space.`,
  },
  {
    niche: "SaaS founders",
    connection: `Hi [First Name], I help SaaS founders build repeatable outbound pipelines before they hire their first SDR. Saw what you're building at [Company] — looks interesting. Let's connect.`,
    followUp: `Hi [First Name], are you running any outbound yet, or is it still mostly inbound and word-of-mouth? Most founders I speak to are at that exact crossroads. I have a few ideas that might be useful.`,
  },
  {
    niche: "Sales leaders / VPs",
    connection: `Hi [First Name], I help sales leaders scale outbound without burning through SDR headcount. Your background at [Company] stood out. Would be great to connect.`,
    followUp: `Hi [First Name], just curious — is your team hitting quota consistently on outbound, or is it patchy? A lot of VPs I speak to say outbound feels like a coin flip. Happy to share what's changing that.`,
  },
  {
    niche: "Recruiters",
    connection: `Hi [First Name], I work with recruiting teams to help them reach passive candidates faster. Your work at [Company] looks really focused — would love to connect.`,
    followUp: `Hi [First Name], are you finding it harder to get responses from top candidates on LinkedIn lately? Inmail open rates have dropped a lot. I've been helping recruiters fix that. Worth a quick chat?`,
  },
];

const mistakes = [
  {
    title: "Pitching in the connection request",
    fix: "Lead with context, a compliment, or a genuine reason to connect. Save the pitch for follow-ups.",
  },
  {
    title: "Sending the same message to everyone",
    fix: "Even basic personalisation — their name, company, or a recent post — lifts reply rates significantly.",
  },
  {
    title: "Writing too much",
    fix: "On mobile, long messages get skipped. One or two short sentences is usually enough for a connection request.",
  },
  {
    title: "Giving up after one follow-up",
    fix: "Most booked meetings come from the second or third touchpoint. Three messages, spaced out, is the minimum.",
  },
  {
    title: "Focusing on features, not outcomes",
    fix: "Say what you help people achieve, not what your product does. Outcomes get replies; features get ignored.",
  },
  {
    title: "No clear next step",
    fix: "Every message should have a soft ask — a question, a resource offer, or a calendar link. No ask, no response.",
  },
];

const faqs = [
  {
    q: "How long should a LinkedIn connection request message be?",
    a: "Keep it under 300 characters if you can. LinkedIn shows a preview before the recipient accepts — a short, clear message is more likely to get read. One sentence of context and one sentence about why you're connecting is usually enough.",
  },
  {
    q: "How many follow-up messages should you send on LinkedIn?",
    a: "Three messages is a good baseline. Connection request, follow-up on day 3, and a second follow-up on day 7. A fourth soft-close message on day 14 works well for warm prospects. Going beyond four without a response is generally not worth it.",
  },
  {
    q: "What is a good LinkedIn connection acceptance rate?",
    a: "A 25–35% connection acceptance rate is solid for cold outreach. With strong ICP targeting and a personalised message, you can push this to 40–50%. If you are below 20%, your targeting or messaging needs work.",
  },
  {
    q: "Can you automate LinkedIn outreach without getting banned?",
    a: "Yes, if you stay within safe sending limits and use a platform built to mimic human behaviour. Tools that blast hundreds of messages per day put your account at risk. Scribtly applies built-in safety limits and human-like timing to protect your account.",
  },
  {
    q: "What is a good reply rate for LinkedIn outreach?",
    a: "The industry average for cold LinkedIn outreach sits between 5–10%. With targeted ICP lists, personalised messaging, and a good sequence, 15–25% is achievable. Scribtly clients average around 18%.",
  },
  {
    q: "How do you personalise LinkedIn messages at scale?",
    a: "The fastest approach is to identify 2–3 personalisation variables per persona (job title, company size, pain point) and build templates around them. Automation tools like Scribtly pull real LinkedIn data — role, company, recent activity — to personalise every message automatically.",
  },
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://scribtly.com/templates/linkedin-outreach-message-templates#article",
      headline: "LinkedIn Outreach Message Templates: Swipe File for B2B Teams",
      description:
        "50+ proven LinkedIn connection request and follow-up message templates for B2B sales, agencies, and founders.",
      url: "https://scribtly.com/templates/linkedin-outreach-message-templates",
      datePublished: "2026-06-27",
      dateModified: "2026-06-27",
      author: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        logo: {
          "@type": "ImageObject",
          url: "https://scribtly.com/images/logo-horizontal.png",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
        { "@type": "ListItem", position: 2, name: "Templates", item: "https://scribtly.com/templates" },
        {
          "@type": "ListItem",
          position: 3,
          name: "LinkedIn Outreach Message Templates",
          item: "https://scribtly.com/templates/linkedin-outreach-message-templates",
        },
      ],
    },
  ],
};

const TAG_COLOURS: Record<string, { bg: string; color: string }> = {
  "High performer": { bg: "rgba(224,120,48,0.12)", color: "var(--accent)" },
  "Solid performer": { bg: "rgba(26,18,8,0.07)", color: "var(--text-muted)" },
  "Test this": { bg: "rgba(26,18,8,0.05)", color: "var(--text-muted)" },
};

function TemplateCard({
  label,
  text,
  tag,
}: {
  label: string;
  text: string;
  tag?: string;
}) {
  const colours = tag ? TAG_COLOURS[tag] ?? TAG_COLOURS["Test this"] : null;
  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-4"
      style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {label}
        </p>
        {tag && colours && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: colours.bg, color: colours.color }}
          >
            {tag}
          </span>
        )}
      </div>
      <p
        className="text-sm leading-relaxed rounded-xl p-4 font-mono"
        style={{
          color: "var(--text-primary)",
          background: "var(--bg-subtle)",
          border: `1px solid var(--border)`,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </p>
      <div className="flex items-center gap-2">
        <Copy size={13} style={{ color: "var(--text-muted)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Copy, then replace [brackets] with real details.
        </span>
      </div>
    </div>
  );
}

export default function LinkedInOutreachMessageTemplatesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
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
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-80 text-white"
            style={{ background: "var(--accent)" }}
          >
            Book a call
          </a>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <nav className="text-sm flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline" style={{ color: "var(--text-muted)" }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/templates" className="hover:underline" style={{ color: "var(--text-muted)" }}>
            Templates
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>LinkedIn Outreach Message Templates</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-10 pb-16">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{
            background: "rgba(224,120,48,0.08)",
            borderColor: "rgba(224,120,48,0.25)",
            color: "var(--accent)",
          }}
        >
          <MessageSquare size={12} />
          Free swipe file — 50+ templates
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          LinkedIn Outreach Message Templates
          <br />
          <span style={{ color: "var(--accent)" }}>That Actually Get Replies</span>
        </h1>

        <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)", maxWidth: "640px" }}>
          A free swipe file of connection requests, follow-ups, and niche-specific messages
          for B2B sales teams, agencies, and founders. Copy, personalise, and start booking
          more meetings today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            See Scribtly automate your outreach
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="flex flex-wrap gap-5">
          {[
            "Connection request templates",
            "Follow-up sequences",
            "Niche-specific copy",
            "Common mistakes to avoid",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <CheckCircle size={15} style={{ color: "var(--accent)" }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Why most messages fail */}
      <section
        className="border-t border-b py-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            The problem
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
            Why most LinkedIn outreach gets ignored
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)", maxWidth: "680px" }}>
            The average LinkedIn user gets dozens of messages a week. Most of them open with
            "I'd love to connect" or a three-paragraph pitch about a product nobody asked
            about. They get ignored — not because LinkedIn doesn't work, but because the
            messages don't earn attention.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: MessageSquare,
                title: "Generic openers",
                body: "Starting with ‘Hi, I came across your profile’ tells the recipient nothing. They know it’s a mass message.",
              },
              {
                icon: Users,
                title: "Wrong audience targeting",
                body: "Sending the same message to everyone regardless of role, seniority, or pain point kills reply rates instantly.",
              },
              {
                icon: Zap,
                title: "No follow-up sequence",
                body: "Most replies come from the second or third touchpoint. Sending one message and walking away leaves meetings on the table.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(224,120,48,0.12)" }}
                >
                  <item.icon size={18} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anatomy of a good message */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
          The formula
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          What a high-reply LinkedIn message looks like
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          Every template in this swipe file follows the same basic structure. Once you see the
          pattern, you can adapt it to any niche or persona.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              num: "01",
              title: "A relevant hook",
              body: "Reference something real — their role, company, a post they wrote, or a shared group. This signals it's not a mass blast.",
            },
            {
              num: "02",
              title: "Short context",
              body: "One sentence on who you help and what outcome you deliver. Not a pitch — just enough for them to know if they should respond.",
            },
            {
              num: "03",
              title: "A soft ask (optional for connection)",
              body: "A question, a resource offer, or a genuine reason to chat. Never push for a meeting in a connection request.",
            },
            {
              num: "04",
              title: "Brevity above all",
              body: "Under 150 words for a connection request. Under 100 words for follow-ups. Every word should earn its place.",
            },
          ].map((s) => (
            <div
              key={s.num}
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div
                className="text-4xl font-bold mb-4 leading-none"
                style={{ color: "rgba(224,120,48,0.20)" }}
              >
                {s.num}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner 1 */}
      <section
        className="border-t border-b py-10"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>
              Want these templates running on autopilot?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly sends personalised sequences automatically — with human-like timing and built-in safety limits.
            </p>
          </div>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 text-sm whitespace-nowrap"
            style={{ background: "var(--accent)" }}
          >
            Book a demo
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Connection Request Templates */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
          Templates
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          Connection request templates
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          These are the first messages your prospect sees. Keep them short and relevant.
          Replace everything in [brackets] before sending.
        </p>
        <div className="flex flex-col gap-5">
          {connectionTemplates.map((t) => (
            <TemplateCard key={t.label} label={t.label} text={t.text} tag={t.tag} />
          ))}
        </div>
      </section>

      {/* Follow-up Templates */}
      <section
        className="border-t py-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Sequences
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Follow-up message templates
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
            This is where most meetings are actually booked. Two or three well-timed follow-ups
            can double your reply rate from a cold list.
          </p>
          <div className="flex flex-col gap-8">
            {Array.from(new Set(followUpTemplates.map((t) => t.stage))).map((stage) => (
              <div key={stage}>
                <h3
                  className="text-sm font-semibold mb-4 pb-2 border-b"
                  style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}
                >
                  {stage}
                </h3>
                <div className="flex flex-col gap-4">
                  {followUpTemplates
                    .filter((t) => t.stage === stage)
                    .map((t) => (
                      <TemplateCard key={t.label} label={t.label} text={t.text} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niche Templates */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
          Niche-specific
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          Templates for specific audiences
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          Generic templates get generic results. These are adapted for the most common B2B target
          audiences. Pick the one closest to your ICP and adjust.
        </p>
        <div className="flex flex-col gap-8">
          {nicheTemplates.map((n) => (
            <div
              key={n.niche}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="px-6 py-4 border-b"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                  Targeting: {n.niche}
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                    Connection request
                  </p>
                  <p
                    className="text-sm leading-relaxed rounded-xl p-4 font-mono"
                    style={{
                      color: "var(--text-primary)",
                      background: "var(--bg-subtle)",
                      border: `1px solid var(--border)`,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {n.connection}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
                    Follow-up (day 3)
                  </p>
                  <p
                    className="text-sm leading-relaxed rounded-xl p-4 font-mono"
                    style={{
                      color: "var(--text-primary)",
                      background: "var(--bg-subtle)",
                      border: `1px solid var(--border)`,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {n.followUp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner 2 */}
      <section
        className="border-t border-b py-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Stop doing this manually
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Let Scribtly personalise and send these sequences for you
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Scribtly pulls real LinkedIn data — role, company, recent activity — to personalise
            every connection request and follow-up automatically. Set your sequence once and wake
            up to booked meetings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Book a call to see it live
              <ArrowRight size={16} />
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              Learn how Scribtly works
            </Link>
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
          Avoid these
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          Common LinkedIn outreach mistakes
        </h2>
        <div className="flex flex-col gap-4">
          {mistakes.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border p-6 flex gap-4"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div
                className="w-6 h-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "var(--accent)" }}
              >
                ✕
              </div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                  {m.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {m.fix}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section
        className="border-t py-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            FAQs
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border p-7"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                  {f.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
            style={{
              borderColor: "rgba(224,120,48,0.4)",
              color: "var(--accent)",
              background: "rgba(224,120,48,0.08)",
            }}
          >
            <Zap size={12} />
            Personalised sequences on autopilot
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">
            Ready to stop copying and pasting?
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly automates your entire LinkedIn outreach — from finding the right prospects
            to sending personalised sequences and booking meetings directly into your calendar.
            No browser extensions. No manual work. Just booked calls.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book your call — it is free
            <ArrowRight size={16} />
          </a>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No commitment. No credit card. No endless onboarding.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={90}
              height={22}
              className="h-6 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-6" aria-label="Footer navigation">
            <Link href="/" className="hover:underline" style={{ color: "var(--text-muted)" }}>
              Home
            </Link>
            <Link href="/templates" className="hover:underline" style={{ color: "var(--text-muted)" }}>
              Templates
            </Link>
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              Get access
            </a>
          </nav>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Automate LinkedIn Outreach: The Complete Guide",
  description:
    "Learn how to automate LinkedIn outreach the right way — ICP targeting, personalised sequences, inbox management, and booking meetings without manual follow-up.",
  openGraph: {
    title: "How to Automate LinkedIn Outreach: The Complete Guide",
    description:
      "A practical guide to automating LinkedIn outreach at scale — from targeting and personalisation to reply handling and meeting booking.",
    type: "article",
    url: "https://scribtly.com/blog/how-to-automate-linkedin-outreach",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Automate LinkedIn Outreach: The Complete Guide",
    description:
      "Practical guide to automating LinkedIn outreach — targeting, personalised sequences, inbox management, and meeting booking.",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-automate-linkedin-outreach",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Automate LinkedIn Outreach: The Complete Guide",
  description:
    "A practical guide to automating LinkedIn outreach at scale — covering ICP targeting, personalised connection requests, follow-up sequences, inbox management, and automatic meeting booking.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-07-28",
  dateModified: "2026-07-28",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/blog/how-to-automate-linkedin-outreach",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is automating LinkedIn outreach against LinkedIn's terms of service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LinkedIn prohibits scraping and mass automation that violates its terms. However, tools that operate within LinkedIn's platform guidelines — using safe sending limits, human-like timing, and managed connections — are widely used by sales teams and agencies. The key is to stay within recommended daily limits and avoid behaviour that looks like a bot.",
      },
    },
    {
      "@type": "Question",
      name: "How many LinkedIn connection requests can I send per day when automating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most practitioners recommend staying under 20–30 new connection requests per day when using automation tools. This keeps your activity within safe limits and protects your LinkedIn account from restrictions. Some tools, including Scribtly, have built-in sending limits that manage this for you automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between automated and personalised outreach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Automated outreach refers to sending messages via a tool rather than manually. Personalised outreach means each message references something specific to the recipient — their role, company, recent activity, or shared context. The best LinkedIn outreach combines both: automated sending with genuinely personalised content per prospect.",
      },
    },
    {
      "@type": "Question",
      name: "What should I include in a LinkedIn outreach sequence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical sequence includes a personalised connection request note, a short acceptance message that does not pitch immediately, one or two follow-ups spaced a few days apart, and a direct ask once the prospect has engaged. Each message should be short and specific to the person.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to see results from automated LinkedIn outreach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most teams see their first replies within the first week if their targeting and messaging are on point. Meeting bookings typically start appearing in week two or three as acceptance rates build and sequences play out. Results vary depending on your ICP, message quality, and the size of your target list.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to monitor automated LinkedIn campaigns manually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You still need to respond to replies and handle conversations that develop. What automation removes is the manual work of finding prospects, writing individual messages, and timing follow-ups. Tools like Scribtly further reduce manual work with a unified inbox and Auto Book, which detects buying signals in replies and sends your calendar link automatically.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Automate LinkedIn Outreach",
  description:
    "A step-by-step guide to setting up automated LinkedIn outreach — from defining your ICP to running personalised sequences and converting replies into meetings.",
  step: [
    {
      "@type": "HowToStep",
      name: "Define your ideal customer profile",
      text: "Describe the exact type of person you want to reach: their job title, seniority, industry, company size, and location. The more specific you are, the better your targeting and reply rates will be.",
    },
    {
      "@type": "HowToStep",
      name: "Build your prospect list",
      text: "Use LinkedIn Sales Navigator or a tool with ICP scoring to identify and rank prospects before outreach begins. Filter out poor-fit profiles before a single message is sent.",
    },
    {
      "@type": "HowToStep",
      name: "Write your connection request",
      text: "Keep the note under 300 characters. Reference something specific to the prospect — their role, company, a post they wrote, or a shared context. Never open with a pitch.",
    },
    {
      "@type": "HowToStep",
      name: "Set up your follow-up sequence",
      text: "Plan three to four messages: an acceptance message, one or two follow-ups spaced a few days apart, and a soft ask. Each message should be short, relevant, and build on the last.",
    },
    {
      "@type": "HowToStep",
      name: "Launch with safe sending limits",
      text: "Start with 15–20 connection requests per day. Spread them across the day with varied timing. Use a tool that enforces these limits automatically so you do not risk your LinkedIn account.",
    },
    {
      "@type": "HowToStep",
      name: "Manage replies from a unified inbox",
      text: "Route all replies from all campaigns and accounts into a single inbox. Use buying signal detection to identify when a prospect is ready for a meeting and act quickly.",
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
      name: "How to Automate LinkedIn Outreach",
      item: "https://scribtly.com/blog/how-to-automate-linkedin-outreach",
    },
  ],
};

const steps = [
  {
    num: "01",
    title: "Define your ideal customer profile",
    body: "Before you touch any tool, get clear on who you want to reach. Job title, seniority, industry, company size, location. The tighter your ICP, the better every downstream metric — connection rate, reply rate, and meeting rate.",
  },
  {
    num: "02",
    title: "Build and score your prospect list",
    body: "Use LinkedIn Sales Navigator filters or an AI-driven ICP scoring tool to build your list. Score each prospect against your ICP criteria before adding them to any campaign. Outreach should only start when the fit is confirmed.",
  },
  {
    num: "03",
    title: "Write your connection request",
    body: "Your connection request note is 300 characters maximum. Reference something specific to this person — their role, company, a post they wrote, or a shared context. Never pitch in the request. Its only job is to get accepted.",
  },
  {
    num: "04",
    title: "Plan your follow-up sequence",
    body: "After acceptance: a short message that does not pitch, one or two follow-ups spaced two to four days apart, and a direct ask when appropriate. Each message should be short, specific, and add something new — not just 'following up.'",
  },
  {
    num: "05",
    title: "Launch with safe sending limits",
    body: "Start at 15–20 connection requests per day, spread across the day with varied timing. Never blast all your requests in one sitting. Tools that enforce safe limits automatically will protect your LinkedIn account from restrictions.",
  },
  {
    num: "06",
    title: "Monitor replies and convert to meetings",
    body: "Route all replies into a unified inbox. Watch for buying signals — questions about pricing, availability, how it works — and respond quickly. The faster you react to intent, the higher your meeting conversion rate.",
  },
];

const mistakes = [
  {
    mistake: "Sending the same message to everyone",
    fix: "Even one personalised detail — their company name, a recent post, their specific role — meaningfully improves acceptance and reply rates. Generic messages signal a blast campaign immediately.",
  },
  {
    mistake: "Pitching in the connection request",
    fix: "The connection request's only job is to get accepted. Save everything else for after the connection is made. A pitch in the request makes the recipient feel targeted, not engaged.",
  },
  {
    mistake: "Sending too fast",
    fix: "Sending 100 connection requests in an hour will trigger LinkedIn's fraud detection. Stay under 20–30 per day and vary the timing. Automation tools should handle this for you by default.",
  },
  {
    mistake: "Following up too aggressively",
    fix: "Three follow-ups is usually the limit before you start damaging your reputation. Space them out by at least two to three days. If someone has not replied after four messages, move on.",
  },
  {
    mistake: "Targeting too broadly",
    fix: "Casting a wide net sounds efficient, but it produces poor-quality conversations. A tightly defined ICP — even if it means a smaller list — produces better conversations and higher conversion rates.",
  },
  {
    mistake: "Ignoring replies until it is too late",
    fix: "A prospect who replies is showing interest. Slow responses kill momentum. If you cannot monitor every account manually, use a unified inbox tool to keep everything visible in one place.",
  },
];

const faqs = [
  {
    q: "Is automating LinkedIn outreach against LinkedIn's terms of service?",
    a: "LinkedIn prohibits scraping and mass automation that violates its terms. However, tools that operate within LinkedIn's platform guidelines — using safe sending limits, human-like timing, and managed connections — are widely used by sales teams and agencies. The key is to stay within recommended daily limits and avoid behaviour that looks like a bot.",
  },
  {
    q: "How many LinkedIn connection requests can I send per day when automating?",
    a: "Most practitioners recommend staying under 20–30 new connection requests per day when using automation tools. This keeps your activity within safe limits and protects your LinkedIn account from restrictions. Some tools, including Scribtly, have built-in sending limits that manage this for you automatically.",
  },
  {
    q: "What is the difference between automated and personalised outreach?",
    a: "Automated outreach refers to sending messages via a tool rather than manually. Personalised outreach means each message references something specific to the recipient — their role, company, recent activity, or shared context. The best LinkedIn outreach combines both: automated sending with genuinely personalised content per prospect.",
  },
  {
    q: "What should I include in a LinkedIn outreach sequence?",
    a: "A typical sequence includes a personalised connection request note, a short acceptance message that does not pitch immediately, one or two follow-ups spaced a few days apart, and a direct ask once the prospect has engaged. Each message should be short and specific to the person.",
  },
  {
    q: "How long does it take to see results from automated LinkedIn outreach?",
    a: "Most teams see their first replies within the first week if their targeting and messaging are on point. Meeting bookings typically start appearing in week two or three as acceptance rates build and sequences play out. Results vary depending on your ICP, message quality, and the size of your target list.",
  },
  {
    q: "Do I need to monitor automated LinkedIn campaigns manually?",
    a: "You still need to respond to replies and handle conversations that develop. What automation removes is the manual work of finding prospects, writing individual messages, and timing follow-ups. Tools like Scribtly further reduce manual work with a unified inbox and Auto Book, which detects buying signals in replies and sends your calendar link automatically.",
  },
];

export default function HowToAutomateLinkedInOutreachPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
          <span style={{ color: "var(--text-primary)" }}>Automate LinkedIn Outreach</span>
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
          How to Automate LinkedIn Outreach: The Complete Guide
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Manual LinkedIn outreach works — until it doesn't scale. Writing personalised messages to 20 prospects a week is doable.
          Writing them to 200 isn't. This guide covers how to automate LinkedIn outreach properly: what to automate,
          what not to, and how to keep your account safe and your conversations genuinely personal.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-07-28">28 July 2026</time>
          <span>·</span>
          <span>12 min read</span>
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
              Want to automate your LinkedIn outreach — without losing personalisation?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly handles ICP targeting, personalised sequences, and meeting booking automatically.
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

        {/* Section 1: Why manual doesn't scale */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Why manual LinkedIn outreach stops working at scale
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Most people start LinkedIn outreach manually — searching for prospects, writing individual messages, following up by memory.
          It works when your target list is small. The problem is it takes three to five minutes per prospect, minimum.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          At 30 prospects a week that is two hours of outreach. At 150 prospects, it is a full day — before you have had a single conversation.
          And if you are running outreach across multiple accounts or for multiple clients, the maths breaks down completely.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Automation solves the volume problem. But most teams automate the wrong way — they remove personalisation along with the manual work,
          and end up with a system that sends hundreds of messages that feel like spam. The goal is to automate the process, not the thinking.
        </p>

        {/* Section 2: What to automate vs what not to */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What to automate — and what not to
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Effective LinkedIn automation is about removing the mechanical work, not replacing human judgment. Here is a practical breakdown:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              Automate these
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Prospect list building from search filters",
                "ICP scoring of each lead before outreach",
                "Sending connection requests at safe intervals",
                "Scheduling and sending follow-up messages",
                "Routing all replies to a unified inbox",
                "Detecting buying signals in replies",
                "Sending calendar links when interest is detected",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
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
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              Keep this human
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Defining your ICP criteria",
                "Approving the messaging tone and content",
                "Responding to real conversations",
                "Handling objections and complex replies",
                "Deciding when to move a prospect off the sequence",
                "Building relationships after the meeting is booked",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <XCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Step by step */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How to set up automated LinkedIn outreach: step by step
        </h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          Here is the full process, in order. Each step builds on the one before it. Skipping steps — particularly the ICP definition and targeting — is the most common reason campaigns underperform.
        </p>

        <div className="flex flex-col gap-5 mb-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div
                className="text-4xl font-bold mb-4 leading-none"
                style={{ color: "rgba(224,120,48,0.20)" }}
              >
                {step.num}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Section 4: Personalisation */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How to keep personalisation at scale
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The reason most automated outreach feels impersonal is not the automation — it is the content.
          A message that says "Hi {"{first_name}"}, I noticed you work at {"{company}"}" tells the reader nothing about why you are reaching out to them specifically.
          It signals a template immediately.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          True personalisation at scale requires pulling real, contextually relevant data per prospect. Not just their name, but what they do, where they work, how long they have been in the role,
          what they post about, their company's current focus. When a message references something specific, the recipient notices.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The practical way to do this at volume is to use a tool that reads actual LinkedIn profile data per prospect and generates messages from it — rather than inserting static merge fields into a fixed template.
          The difference in reply rate is meaningful.
        </p>

        <div className="rounded-2xl border p-6 mb-8" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            What real personalisation looks like
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Generic (feels automated)</p>
              <p className="text-sm italic p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-primary)" }}>
                "Hi Sarah, I came across your profile and thought you might be interested in our platform..."
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>Specific (feels personal)</p>
              <p className="text-sm italic p-3 rounded-lg" style={{ background: "rgba(224,120,48,0.06)", color: "var(--text-primary)" }}>
                "Hi Sarah, saw you recently joined Acme as VP of Sales — congrats on the role. I work with sales leaders scaling outbound and thought it might be worth a conversation."
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: The sequence */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What a good LinkedIn outreach sequence looks like
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          The sequence is where most campaigns win or lose. Here is a structure that works across most B2B use cases:
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              label: "Message 1 — Connection request note",
              timing: "Day 0",
              body: "Personalised hook + clear reason for connecting. Under 300 characters. No pitch. Goal: get accepted.",
            },
            {
              label: "Message 2 — Acceptance message",
              timing: "Day 1 after acceptance",
              body: "Short and warm. Thank them for connecting. Reference your reason for reaching out. Do not pitch yet. Goal: start a conversation.",
            },
            {
              label: "Message 3 — First follow-up",
              timing: "Day 3–4",
              body: "Add something relevant — a resource, an observation, a question tied to their specific situation. Keep it short. Goal: show genuine interest.",
            },
            {
              label: "Message 4 — Direct ask",
              timing: "Day 7–10",
              body: "Make your ask clear. Offer a specific time or a calendar link. Keep it direct and low-pressure. Goal: book the meeting.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                <span
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ background: "rgba(224,120,48,0.1)", color: "var(--accent)" }}
                >
                  {item.timing}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Automate your LinkedIn outreach — without the guesswork
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly handles ICP scoring, personalised message generation, sequence automation, and meeting booking — all from one platform.
            No browser extension. No manual follow-ups.
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

        {/* Section 6: Scribtly */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly handles LinkedIn outreach automation
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is built for teams who want to automate LinkedIn outreach without sacrificing the quality that drives replies and meetings.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          You describe your ideal customer in plain English. Scribtly scores every prospect against that profile before any message is sent.
          Outreach only begins when the fit is confirmed — so you are not burning your daily sending limit on poor-quality leads.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Messages are generated using real data from each prospect's LinkedIn profile — their current role, company size, location, and recent activity.
          Every message is different because every prospect is different. There are no static merge fields producing obviously templated output.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Once a prospect replies, everything lands in a unified inbox across all your accounts and campaigns. Scribtly's Auto Book feature monitors replies for buying signals —
          questions about pricing, availability, or interest in seeing the product — and automatically sends your calendar link at the right moment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "AI-driven ICP scoring before first message",
            "Personalised messages from real LinkedIn data",
            "Full sequence automation with safe sending limits",
            "Unified inbox across all accounts",
            "Auto Book for automatic meeting scheduling",
            "Live analytics on connection, reply, and booking rates",
            "Multi-account support for agencies and teams",
            "No browser extension — managed cloud connection",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{feature}</span>
            </div>
          ))}
        </div>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is currently invite-only and includes personal onboarding. Every client is set up individually to make sure
          ICP scoring and messaging are calibrated correctly from day one.
        </p>

        {/* Section 7: Safety */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Keeping your LinkedIn account safe when automating
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          This is the question every team asks before they start. LinkedIn does not publish a hard rule on automation tools,
          but it actively monitors for behaviour that looks bot-like: unusually high sending volumes, identical timing patterns, and scraping activity.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          To keep your account safe:
        </p>
        <div className="flex flex-col gap-3 mb-8">
          {[
            "Stay under 20–30 new connection requests per day",
            "Spread requests across the day rather than sending in batches",
            "Vary the timing between messages — avoid precise, robotic intervals",
            "Use a tool that operates through a managed connection, not a browser extension",
            "Do not scrape profile data at scale — use tools that comply with LinkedIn's data policies",
            "Never send to low-quality lists — high ignore rates damage your sender reputation",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A good automation tool should enforce these limits by default, not leave them to you to manage manually.
        </p>

        {/* Section 8: Mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes when automating LinkedIn outreach
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
            Scribtly automates personalised LinkedIn outreach from ICP targeting to meeting booking —
            so your pipeline builds while you focus on closing.
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
              { href: "/compare/scribtly-vs-expandi", label: "Scribtly vs Expandi: which LinkedIn tool is right for you?" },
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

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is an Ideal Customer Profile (ICP)?",
  description:
    "An ideal customer profile defines exactly who your best customers are. Learn how to build one and use it to sharpen your LinkedIn outreach.",
  openGraph: {
    title: "What Is an Ideal Customer Profile (ICP)?",
    description:
      "Learn what an ideal customer profile is, how to build one, and how to use it to get better results from LinkedIn outreach.",
    type: "article",
    url: "https://scribtly.com/blog/what-is-an-ideal-customer-profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is an Ideal Customer Profile (ICP)?",
    description:
      "Learn what an ideal customer profile is, how to build one, and how to use it to get better results from LinkedIn outreach.",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/what-is-an-ideal-customer-profile",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is an Ideal Customer Profile (ICP)?",
  description:
    "A practical guide to building an ideal customer profile for B2B sales and LinkedIn outreach — what it is, what goes in it, and how to use it.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  datePublished: "2026-07-26",
  dateModified: "2026-07-26",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/blog/what-is-an-ideal-customer-profile",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between an ICP and a buyer persona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An ICP describes the type of company most likely to buy — firmographics like industry, company size, and revenue. A buyer persona describes the individual decision-maker inside that company — their job title, goals, and objections. Both are useful, but ICP comes first: it tells you which companies to target before you think about who to talk to inside them.",
      },
    },
    {
      "@type": "Question",
      name: "How many ICPs should a business have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most businesses should start with one clear ICP. If your product genuinely serves two distinct company types with different needs, you can maintain two — but more than that tends to dilute focus. A single well-defined ICP produces sharper messaging and better outreach than a broad list of possible targets.",
      },
    },
    {
      "@type": "Question",
      name: "What data should I use to build an ICP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with your existing customers. Look at who has stayed longest, expanded their usage, required the least support, and referred others. Export your CRM, filter for your best accounts, and identify what they have in common — industry, headcount, tech stack, geography, funding stage. That pattern is your ICP.",
      },
    },
    {
      "@type": "Question",
      name: "Does an ICP change over time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your ICP should evolve as your product matures and your customer base grows. Early-stage companies often start with a broad ICP and tighten it once they see which segments retain best. Revisiting your ICP once a quarter is a reasonable practice — especially after a significant product change or a new customer segment emerges.",
      },
    },
    {
      "@type": "Question",
      name: "How does an ICP improve LinkedIn outreach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An ICP gives you a precise filter before any message is sent. Instead of blasting connection requests to thousands of loosely relevant profiles, you score each prospect against your ICP criteria first. Only high-fit leads receive outreach, which improves acceptance rates, reply rates, and the quality of conversations — and protects your LinkedIn account reputation.",
      },
    },
    {
      "@type": "Question",
      name: "Can I describe my ICP in plain English rather than building a spreadsheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — and for LinkedIn outreach, that is often the more practical approach. Tools like Scribtly let you describe your ideal customer in plain language, then automatically score and filter prospects against that description before outreach begins. You do not need to maintain a complex scoring model manually.",
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
      name: "What Is an Ideal Customer Profile (ICP)?",
      item: "https://scribtly.com/blog/what-is-an-ideal-customer-profile",
    },
  ],
};

const faqs = [
  {
    q: "What is the difference between an ICP and a buyer persona?",
    a: "An ICP describes the type of company most likely to buy — firmographics like industry, company size, and revenue. A buyer persona describes the individual decision-maker inside that company — their job title, goals, and objections. Both are useful, but ICP comes first: it tells you which companies to target before you think about who to talk to inside them.",
  },
  {
    q: "How many ICPs should a business have?",
    a: "Most businesses should start with one clear ICP. If your product genuinely serves two distinct company types with different needs, you can maintain two — but more than that tends to dilute focus. A single well-defined ICP produces sharper messaging and better outreach than a broad list of possible targets.",
  },
  {
    q: "What data should I use to build an ICP?",
    a: "Start with your existing customers. Look at who has stayed longest, expanded their usage, required the least support, and referred others. Export your CRM, filter for your best accounts, and identify what they have in common — industry, headcount, tech stack, geography, funding stage. That pattern is your ICP.",
  },
  {
    q: "Does an ICP change over time?",
    a: "Yes. Your ICP should evolve as your product matures and your customer base grows. Early-stage companies often start with a broad ICP and tighten it once they see which segments retain best. Revisiting your ICP once a quarter is a reasonable practice — especially after a significant product change or a new customer segment emerges.",
  },
  {
    q: "How does an ICP improve LinkedIn outreach?",
    a: "An ICP gives you a precise filter before any message is sent. Instead of blasting connection requests to thousands of loosely relevant profiles, you score each prospect against your ICP criteria first. Only high-fit leads receive outreach, which improves acceptance rates, reply rates, and the quality of conversations — and protects your LinkedIn account reputation.",
  },
  {
    q: "Can I describe my ICP in plain English rather than building a spreadsheet?",
    a: "Yes — and for LinkedIn outreach, that is often the more practical approach. Tools like Scribtly let you describe your ideal customer in plain language, then automatically score and filter prospects against that description before outreach begins. You do not need to maintain a complex scoring model manually.",
  },
];

const icpFields = [
  {
    category: "Industry",
    examples: "SaaS, professional services, financial services, manufacturing, healthcare",
    why: "Your product likely solves problems specific to certain industries. Focus on the ones where you win most often.",
  },
  {
    category: "Company size",
    examples: "10–50 employees, 51–200, 200–1,000, enterprise",
    why: "A tool built for a ten-person startup rarely serves a 5,000-person enterprise well — and vice versa. Size affects buying process, budget, and urgency.",
  },
  {
    category: "Geography",
    examples: "UK, Western Europe, North America, APAC",
    why: "Some products are region-specific due to regulation, language, or market maturity. Knowing where your best customers cluster saves wasted outreach.",
  },
  {
    category: "Revenue or funding stage",
    examples: "Bootstrapped, Seed, Series A–C, $1M–$10M ARR",
    why: "Funding stage correlates with budget availability, team size, and how decisions get made. Series A companies rarely have the same buying motion as enterprises.",
  },
  {
    category: "Tech stack or tools used",
    examples: "Salesforce CRM, HubSpot, Slack, Intercom",
    why: "If your product integrates with or competes with specific tools, targeting companies using those tools narrows your list to genuinely relevant prospects.",
  },
  {
    category: "Growth indicators",
    examples: "Recent funding, hiring for sales roles, expanding to new markets",
    why: "Growing companies have active budgets and pressing problems. These signals often predict the right moment to reach out.",
  },
];

const commonMistakes = [
  {
    mistake: "Defining the ICP too broadly",
    fix: "\"Any company that sells B2B\" is not an ICP — it is the entire market. Narrow by industry, size, and geography until you have a profile that excludes more companies than it includes.",
  },
  {
    mistake: "Building the ICP without looking at existing customers",
    fix: "The fastest way to define a good ICP is to study who is already succeeding with your product. Your best customers are telling you who to look for next.",
  },
  {
    mistake: "Confusing ICP with buyer persona",
    fix: "ICP = the type of company. Buyer persona = the person inside it. Define the ICP first, then identify which roles within those companies you need to reach.",
  },
  {
    mistake: "Never updating the ICP",
    fix: "Your product changes. Your market changes. Your ICP should reflect who you serve today, not who you imagined serving at launch. Review it quarterly.",
  },
  {
    mistake: "Using the ICP for marketing but not for outreach",
    fix: "The ICP is most powerful when it filters prospects before any message is sent. If your outreach team is not scoring leads against the ICP first, you are wasting their time on poor-fit conversations.",
  },
];

export default function WhatIsAnIdealCustomerProfilePage() {
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
          <span style={{ color: "var(--text-primary)" }}>What Is an Ideal Customer Profile?</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          Sales Fundamentals
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          What Is an Ideal Customer Profile (ICP)?
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          An ideal customer profile describes the type of company most likely to buy your product, stay long-term, and get the most value from it.
          Get it right and every part of your outreach — targeting, messaging, follow-up — becomes sharper. Get it wrong and you spend time on prospects who will never close.
        </p>
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>By Scribtly</span>
          <span>·</span>
          <time dateTime="2026-07-26">26 July 2026</time>
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
              Want Scribtly to score prospects against your ICP automatically?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Describe your ideal customer in plain English. Scribtly finds matching LinkedIn profiles and ranks each one before outreach starts.
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

        {/* Section 1: Definition */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          ICP definition
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          An ideal customer profile (ICP) is a description of the hypothetical company that would get the most value from your product or service —
          and in turn, deliver the most value back to you as a customer.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          It is not a wishlist of every type of company you could sell to. It is a specific, evidence-based description of who you should prioritise.
          A well-built ICP is narrow enough to exclude most companies and specific enough to guide every targeting decision you make.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          ICPs are most commonly used in B2B sales and marketing, where deals take longer, buyers are more defined, and mis-targeting is expensive.
          They are the starting point for outbound campaigns, account-based marketing, and LinkedIn outreach — because without one, you are essentially guessing who to talk to.
        </p>

        {/* Section 2: ICP vs buyer persona */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          ICP vs buyer persona: what is the difference?
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          These two terms are often used interchangeably but they describe different things.
        </p>
        <div className="overflow-x-auto mb-8 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-subtle)", borderBottom: `1px solid var(--border)` }}>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--text-primary)" }}> </th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--accent)" }}>Ideal Customer Profile</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "var(--text-muted)" }}>Buyer Persona</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "What it describes", icp: "A type of company", persona: "A type of person" },
                { label: "Level", icp: "Company / account level", persona: "Individual level" },
                { label: "Typical attributes", icp: "Industry, size, revenue, geography", persona: "Job title, goals, pain points, objections" },
                { label: "Used for", icp: "Deciding which companies to target", persona: "Deciding how to talk to the buyer inside them" },
                { label: "Built from", icp: "CRM data, best customer analysis", persona: "Customer interviews, sales call notes" },
              ].map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    borderBottom: i < 4 ? `1px solid var(--border)` : undefined,
                  }}
                >
                  <td className="px-5 py-4 font-medium" style={{ color: "var(--text-primary)" }}>{row.label}</td>
                  <td className="px-5 py-4" style={{ color: "var(--text-muted)" }}>{row.icp}</td>
                  <td className="px-5 py-4" style={{ color: "var(--text-muted)" }}>{row.persona}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The ICP comes first. Once you know which companies to target, you can identify which people inside those companies to reach — and that is where buyer personas come in.
          Trying to build a persona without an ICP is like choosing a messenger before you know who you are trying to reach.
        </p>

        {/* Section 3: What goes in one */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What goes into an ideal customer profile
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A complete ICP covers six areas. The more specific you can be in each, the more useful the profile becomes for filtering prospects.
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {icpFields.map((field) => (
            <div
              key={field.category}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{field.category}</h3>
              <p className="text-xs mb-2 font-medium" style={{ color: "var(--accent)" }}>Examples: {field.examples}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{field.why}</p>
            </div>
          ))}
        </div>

        {/* Section 4: How to build one */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How to build your ICP in four steps
        </h2>

        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              num: "1",
              title: "Analyse your best existing customers",
              body: "Pull your top 20 to 30 accounts — the ones with the highest retention, lowest churn, most expansion revenue, and fewest support escalations. These are your proof points. What do they have in common? Industry? Headcount? How they found you? That commonality is the foundation of your ICP.",
            },
            {
              num: "2",
              title: "Identify the negative signals",
              body: "Look at the customers who churned early, required excessive support, or complained about pricing. What did they have in common? These attributes define who to exclude from your ICP — which is just as important as knowing who to include.",
            },
            {
              num: "3",
              title: "Write the profile in plain language",
              body: "Avoid vague language. 'Mid-market B2B SaaS companies with 50–200 employees in the UK or US, using Salesforce, currently hiring for sales roles' is an ICP. 'Companies that need our product' is not. Specificity is the point.",
            },
            {
              num: "4",
              title: "Test it against your pipeline",
              body: "Take your current pipeline and score each deal against your new ICP. Are your best opportunities ICP-fit? Are the slow, stalled deals outside it? If yes, your ICP is working. If not, revisit the criteria and tighten or broaden where needed.",
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

        {/* Section 5: ICP template */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          ICP template example
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Here is what a completed ICP looks like for a hypothetical B2B outreach tool. Use this as a starting point for your own.
        </p>
        <div
          className="rounded-2xl border p-6 mb-8"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Example ICP
          </p>
          {[
            { label: "Industry", value: "B2B SaaS, professional services, or recruitment agencies" },
            { label: "Company size", value: "10–200 employees" },
            { label: "Geography", value: "United Kingdom, United States, or Australia" },
            { label: "Revenue / stage", value: "Post-revenue, Seed to Series B" },
            { label: "Tech stack signals", value: "Using LinkedIn Sales Navigator, HubSpot or Salesforce CRM" },
            { label: "Growth indicators", value: "Actively hiring for sales or business development roles" },
            { label: "Key problem", value: "Outbound pipeline is inconsistent or relies too heavily on manual effort" },
            { label: "Exclude", value: "Enterprise (1,000+ employees), consumer businesses, non-English markets" },
          ].map((row) => (
            <div key={row.label} className="flex gap-4 py-2.5 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm font-semibold w-36 shrink-0" style={{ color: "var(--text-primary)" }}>{row.label}</span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Let Scribtly score prospects against your ICP automatically
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Describe your ideal customer in plain English. Scribtly finds matching LinkedIn profiles, ranks each one against your ICP,
            and only starts outreach when the fit is confirmed.
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

        {/* Section 6: ICP in LinkedIn outreach */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          How your ICP makes LinkedIn outreach more effective
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          LinkedIn outreach without an ICP is volume work with unpredictable results. You send to whoever matches a broad filter,
          hope some of them are relevant, and deal with a high proportion of ignored requests.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          With a clear ICP, every part of the process tightens:
        </p>
        <div className="flex flex-col gap-3 mb-8">
          {[
            { point: "Better targeting", detail: "You filter prospects by ICP criteria before they ever reach your outreach list — so you are only contacting people who fit." },
            { point: "More relevant messages", detail: "When you know who you are writing to, the message can reference specific details that resonate — their company size, growth stage, or role challenges." },
            { point: "Higher acceptance rates", detail: "A relevant request with a specific hook gets accepted more often than a generic one sent to anyone who works in a vague industry." },
            { point: "Better reply rates", detail: "ICP-fit prospects have the problems your product solves. When the message references those problems, replies happen." },
            { point: "Fewer wasted conversations", detail: "Time spent with poor-fit prospects is time not spent closing good ones. ICP scoring before outreach eliminates most of that waste." },
          ].map((item) => (
            <div key={item.point} className="flex items-start gap-3">
              <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <div>
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.point}: </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly builds ICP scoring directly into the outreach flow. You describe your ideal customer in plain English —
          the industry, company size, seniority level, location, and any other signals that matter — and Scribtly automatically ranks each prospect against those criteria.
          Only high-scoring matches enter the outreach sequence.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          Messages are then personalised using real data from each prospect's LinkedIn profile, not generic merge fields.
          The result is outreach that feels specific because it is — which is why{" "}
          <Link href="/compare/scribtly-vs-expandi" className="underline hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
            reply rates tend to be meaningfully higher
          </Link>{" "}
          than standard templated campaigns.
        </p>

        {/* Section 7: Common mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common ICP mistakes to avoid
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {commonMistakes.map((item) => (
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
            Ready to put your ICP to work on LinkedIn?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly scores every prospect against your ideal customer profile before outreach starts —
            so your messages go to the right people, not just the nearest people.
            Book a call to see how it works in practice.
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

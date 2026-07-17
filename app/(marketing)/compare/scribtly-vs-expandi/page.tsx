import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, XCircle, ArrowRight, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly vs Expandi: Which LinkedIn Tool Books More Meetings?",
  description:
    "Compare Scribtly and Expandi for LinkedIn outreach. See which tool delivers better personalisation, ICP scoring, and meeting booking for B2B teams.",
  openGraph: {
    title: "Scribtly vs Expandi: Which LinkedIn Tool Books More Meetings?",
    description:
      "Compare Scribtly and Expandi for LinkedIn outreach. See which tool delivers better personalisation, ICP scoring, and meeting booking for B2B teams.",
    type: "article",
    url: "https://scribtly.com/compare/scribtly-vs-expandi",
  },
  alternates: {
    canonical: "https://scribtly.com/compare/scribtly-vs-expandi",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Scribtly vs Expandi: Which LinkedIn Automation Tool Books More Meetings?",
      description:
        "A practical comparison of Scribtly and Expandi for LinkedIn outreach, lead scoring, personalisation, and automated meeting booking.",
      url: "https://scribtly.com/compare/scribtly-vs-expandi",
      author: { "@type": "Organization", name: "Scribtly" },
      publisher: { "@type": "Organization", name: "Scribtly", url: "https://scribtly.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Scribtly better than Expandi for LinkedIn outreach?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly is built around ICP-driven lead scoring and automatic meeting booking, which makes it more focused on revenue outcomes. Expandi is a strong general-purpose LinkedIn automation tool. The best choice depends on whether you need volume-based sequences or a smarter pipeline with built-in calendar booking.",
          },
        },
        {
          "@type": "Question",
          name: "Does Scribtly support multiple LinkedIn accounts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Scribtly supports multi-account management from a single dashboard, which makes it ideal for agencies and growing sales teams running outreach across several LinkedIn profiles.",
          },
        },
        {
          "@type": "Question",
          name: "What is ICP scoring in Scribtly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ICP scoring lets you describe your ideal customer in plain English. Scribtly then finds matching LinkedIn profiles and scores each lead against your criteria before any message is sent, so every prospect you contact has a genuine reason to hear from you.",
          },
        },
        {
          "@type": "Question",
          name: "Does Expandi have automatic meeting booking?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Expandi does not include a built-in automatic meeting booking feature. Scribtly's Auto Book detects buying signals in replies and sends your calendar link at the right moment, without you needing to monitor conversations manually.",
          },
        },
        {
          "@type": "Question",
          name: "Is Scribtly safe for LinkedIn accounts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Scribtly has built-in daily sending limits and human-like timing intervals to keep your LinkedIn account safe and within platform guidelines. No browser extension is required.",
          },
        },
      ],
    },
    {
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
    },
  ],
};

type FeatureStatus = "yes" | "no" | "partial";

interface Feature {
  name: string;
  scribtly: FeatureStatus;
  expandi: FeatureStatus;
  note?: string;
}

const features: Feature[] = [
  { name: "ICP-driven lead scoring", scribtly: "yes", expandi: "no", note: "Scribtly scores every lead against your ideal customer profile before outreach begins." },
  { name: "Automatic meeting booking (Auto Book)", scribtly: "yes", expandi: "no", note: "Scribtly detects buying signals and sends your calendar link automatically." },
  { name: "Hyper-personalised connection requests", scribtly: "yes", expandi: "yes" },
  { name: "Automated follow-up sequences", scribtly: "yes", expandi: "yes" },
  { name: "Multi-account management", scribtly: "yes", expandi: "yes" },
  { name: "Unified conversation inbox", scribtly: "yes", expandi: "partial", note: "Expandi has an inbox view; Scribtly's inbox surfaces buying signals and triggers Auto Book." },
  { name: "No browser extension required", scribtly: "yes", expandi: "no", note: "Expandi operates through a dedicated cloud session; Scribtly requires no extension at all." },
  { name: "Built-in daily safety limits", scribtly: "yes", expandi: "yes" },
  { name: "Campaign analytics dashboard", scribtly: "yes", expandi: "yes" },
  { name: "Image and GIF personalisation", scribtly: "partial", expandi: "yes", note: "Expandi is known for visual personalisation. Scribtly personalises using real LinkedIn data." },
  { name: "A/B testing for messages", scribtly: "partial", expandi: "yes" },
  { name: "Managed onboarding", scribtly: "yes", expandi: "no", note: "Every Scribtly client is onboarded personally. Expandi is largely self-serve." },
];

function StatusIcon({ status }: { status: FeatureStatus }) {
  if (status === "yes") return <CheckCircle size={18} style={{ color: "#22c55e" }} />;
  if (status === "no") return <XCircle size={18} style={{ color: "#ef4444" }} />;
  return <Minus size={18} style={{ color: "var(--text-muted)" }} />;
}

const faqs = [
  {
    q: "Is Scribtly better than Expandi for LinkedIn outreach?",
    a: "Scribtly is built around ICP-driven lead scoring and automatic meeting booking, which makes it more focused on revenue outcomes. Expandi is a strong general-purpose LinkedIn automation tool. The best choice depends on whether you need volume-based sequences or a smarter pipeline with built-in calendar booking.",
  },
  {
    q: "Does Scribtly support multiple LinkedIn accounts?",
    a: "Yes. Scribtly supports multi-account management from a single dashboard, which makes it ideal for agencies and growing sales teams running outreach across several LinkedIn profiles.",
  },
  {
    q: "What is ICP scoring in Scribtly?",
    a: "ICP scoring lets you describe your ideal customer in plain English. Scribtly then finds matching LinkedIn profiles and scores each lead against your criteria before any message is sent, so every prospect you contact has a genuine reason to hear from you.",
  },
  {
    q: "Does Expandi have automatic meeting booking?",
    a: "Expandi does not include a built-in automatic meeting booking feature. Scribtly's Auto Book detects buying signals in replies and sends your calendar link at the right moment, without you needing to monitor conversations manually.",
  },
  {
    q: "Is Scribtly safe for LinkedIn accounts?",
    a: "Yes. Scribtly has built-in daily sending limits and human-like timing intervals to keep your LinkedIn account safe and within platform guidelines. No browser extension is required.",
  },
];

export default function ScribtlyVsExpandiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>

        {/* Nav */}
        <nav
          className="sticky top-0 z-50 border-b"
          style={{ borderColor: "var(--border)", background: "rgba(253,250,246,0.96)", backdropFilter: "blur(16px)" }}
        >
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/">
              <Image src="/images/logo-horizontal.png" alt="Scribtly" width={120} height={30} className="h-8 w-auto" />
            </Link>
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Book a call
            </a>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <nav className="text-xs flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Compare</span>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>Scribtly vs Expandi</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
            >
              LinkedIn Automation Comparison
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
              Scribtly vs Expandi
            </h1>

            <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Both tools automate LinkedIn outreach. But they are built for different goals.
              Expandi focuses on sequence automation and volume. Scribtly focuses on scoring the right leads,
              sending messages that feel personal, and booking meetings automatically.
            </p>

            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              This page breaks down the practical differences so you can decide which tool fits your pipeline.
            </p>

            {/* Soft CTA */}
            <div
              className="inline-block rounded-2xl border px-6 py-5 text-left mb-2"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Already considering Scribtly?
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Scribtly is invite-only. Book a 30-minute call to see the platform and find out if it&apos;s the right fit.
              </p>
              <a
                href="https://book.octelis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Book a call to get access <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Quick summary */}
        <section className="border-t border-b py-16" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "var(--text-primary)" }}>
              The short version
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scribtly card */}
              <div
                className="rounded-2xl border p-7 flex flex-col gap-4"
                style={{ borderColor: "var(--accent)", background: "var(--bg-base)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: "var(--accent)" }}
                  >
                    S
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Scribtly</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Invite-only — book a call to get access</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Built for B2B teams who want fewer, better meetings. Scribtly scores leads against your ICP before
                  any message goes out, personalises every touchpoint using real LinkedIn data, and books meetings
                  automatically when a prospect shows interest.
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {[
                    "ICP scoring filters out weak leads upfront",
                    "Auto Book sends your calendar link automatically",
                    "Personalisation from real LinkedIn profile data",
                    "Managed onboarding — you're not left to figure it out",
                    "Multi-account support for agencies",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs mt-2 font-medium" style={{ color: "var(--text-muted)" }}>
                  Best for: B2B sales teams, SDR teams, and agencies focused on booked meetings.
                </p>
              </div>

              {/* Expandi card */}
              <div
                className="rounded-2xl border p-7 flex flex-col gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: "#5B3FA8" }}
                  >
                    E
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Expandi</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Self-serve — check expandi.io for current pricing</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  A well-established cloud-based LinkedIn automation tool with strong sequence building,
                  A/B testing, and image personalisation. Good for teams who want flexible campaign templates
                  and high-volume prospecting with visual personalisation.
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {[
                    "Flexible sequence and campaign builder",
                    "Image and GIF personalisation",
                    "A/B testing for message variants",
                    "CSV import for lead lists",
                    "Self-serve with no onboarding requirement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "#5B3FA8" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs mt-2 font-medium" style={{ color: "var(--text-muted)" }}>
                  Best for: marketers and growth teams who want a flexible self-serve automation platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <p className="text-base mb-4" style={{ color: "var(--text-muted)" }}>
            Want to see how Scribtly books meetings while you sleep?
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book a 30-minute demo call <ArrowRight size={15} />
          </a>
        </section>

        {/* Feature comparison table */}
        <section className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-3 text-center" style={{ color: "var(--text-primary)" }}>
              Feature comparison
            </h2>
            <p className="text-sm text-center mb-10" style={{ color: "var(--text-muted)" }}>
              Always verify the latest features and pricing directly with each provider — this comparison reflects publicly available information as of mid-2026.
            </p>

            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
              {/* Table header */}
              <div
                className="grid grid-cols-[1fr_auto_auto] gap-0 border-b"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div className="px-6 py-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Feature</div>
                <div className="px-6 py-4 text-sm font-semibold text-center w-32" style={{ color: "var(--accent)" }}>Scribtly</div>
                <div className="px-6 py-4 text-sm font-semibold text-center w-32" style={{ color: "var(--text-muted)" }}>Expandi</div>
              </div>

              {features.map((feature, i) => (
                <div
                  key={feature.name}
                  className="grid grid-cols-[1fr_auto_auto] gap-0 border-b last:border-0"
                  style={{
                    borderColor: "var(--border)",
                    background: i % 2 === 0 ? "var(--bg-base)" : "var(--bg-subtle)",
                  }}
                >
                  <div className="px-6 py-4">
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{feature.name}</p>
                    {feature.note && (
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{feature.note}</p>
                    )}
                  </div>
                  <div className="px-6 py-4 flex items-center justify-center w-32">
                    <StatusIcon status={feature.scribtly} />
                  </div>
                  <div className="px-6 py-4 flex items-center justify-center w-32">
                    <StatusIcon status={feature.expandi} />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs mt-4 text-center" style={{ color: "var(--text-muted)" }}>
              ✓ = included &nbsp;|&nbsp; ✗ = not included &nbsp;|&nbsp; — = partial or limited
            </p>
          </div>
        </section>

        {/* Where Scribtly wins */}
        <section className="py-16 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Where Scribtly has the edge
            </h2>
            <p className="text-base mb-10" style={{ color: "var(--text-muted)" }}>
              These are the areas where Scribtly's approach is meaningfully different — not just feature ticks on a list.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Leads scored before the first message",
                  body: "Expandi lets you build sequences and target by job title or industry. Scribtly goes further: describe your ideal customer in plain English and every lead is ranked against that criteria before outreach begins. Fewer bad fits, better reply rates.",
                },
                {
                  title: "Meetings booked without you watching",
                  body: "Auto Book is Scribtly's standout feature. When a prospect shows interest in a reply, the system detects the buying signal and sends your calendar link automatically. You wake up to booked meetings — not a queue of replies to wade through.",
                },
                {
                  title: "Onboarding that actually gets you results",
                  body: "Scribtly is invite-only and every client is onboarded personally. You're not dropped into a dashboard and left to figure out sequences. The team gets you set up and your first campaign live before you're on your own.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border p-7"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center"
                    style={{ background: "rgba(224,120,48,0.12)" }}
                  >
                    <CheckCircle size={16} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where Expandi wins */}
        <section className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Where Expandi has the edge
            </h2>
            <p className="text-base mb-10" style={{ color: "var(--text-muted)" }}>
              Scribtly is not the right fit for everyone. Here is where Expandi genuinely outperforms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Visual personalisation at scale",
                  body: "Expandi lets you add personalised images and GIFs to your connection requests and messages — a proven pattern for increasing open and reply rates in highly competitive niches. Scribtly personalises using LinkedIn data but does not offer image-based personalisation.",
                },
                {
                  title: "Self-serve with no wait",
                  body: "Expandi is available immediately. You can sign up, set up a sequence, and start sending the same day. Scribtly is invite-only and goes through a personal onboarding process. If you need access now and want to move fast independently, Expandi removes that friction.",
                },
                {
                  title: "Message A/B testing",
                  body: "Expandi offers message variant testing so you can compare which opening line or follow-up performs better. If you want to experiment with messaging at scale, Expandi's A/B testing tools are well-built and easy to act on.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border p-7"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center"
                    style={{ background: "rgba(91,63,168,0.10)" }}
                  >
                    <CheckCircle size={16} style={{ color: "#5B3FA8" }} />
                  </div>
                  <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who should use which */}
        <section className="py-16 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: "var(--text-primary)" }}>
              Which tool is right for you?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="rounded-2xl border p-7"
                style={{ borderColor: "rgba(224,120,48,0.4)", background: "var(--bg-base)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                  Choose Scribtly if…
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Your goal is booked meetings, not just reply rates",
                    "You want leads scored against a real ICP before any message goes out",
                    "You manage outreach across multiple LinkedIn accounts",
                    "You want automatic calendar booking when a prospect shows interest",
                    "You want a managed experience with personal onboarding",
                    "You're a B2B sales team, SDR team, or agency serious about pipeline",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl border p-7"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                  Choose Expandi if…
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "You want immediate self-serve access with no onboarding",
                    "Visual personalisation (images, GIFs) is central to your strategy",
                    "You need in-depth A/B testing across message variants",
                    "You're comfortable building and managing sequences independently",
                    "You prioritise flexible campaign templates and CSV list imports",
                    "You want to compare tool options before committing to a premium tier",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "#5B3FA8" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: "var(--text-primary)" }}>
              Common questions
            </h2>
            <div className="flex flex-col gap-6">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border p-7"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 border-t" style={{ borderColor: "var(--border)", background: "var(--dark)" }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "rgba(224,120,48,0.7)" }}
            >
              Scribtly — invite only
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Ready to fill your calendar without the manual grind?
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
              Book a 30-minute call with the Scribtly team. We&apos;ll show you the platform live and tell you
              honestly whether it&apos;s the right fit for your outreach goals.
            </p>
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Book your call <ArrowRight size={16} />
            </a>
            <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              No commitment. No credit card. Just a conversation.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
          <div
            className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Link href="/">
              <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <span>© 2026 Scribtly. All rights reserved.</span>
            </div>
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
    </>
  );
}

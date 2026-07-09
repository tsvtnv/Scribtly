import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, CheckCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write Video Scripts in Your Client's Voice | Scribtly",
  description:
    "Learn how to capture a client's tone, build a reusable voice profile, and write client-ready video scripts faster. A practical guide for freelance script writers.",
  openGraph: {
    title: "How to Write Video Scripts in Your Client's Voice",
    description:
      "Learn how to capture a client's tone, build a reusable voice profile, and write client-ready video scripts faster. A practical guide for freelance script writers.",
    type: "article",
    publishedTime: "2026-07-09",
    authors: ["Scribtly"],
    siteName: "Scribtly",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-scripts-in-your-clients-voice",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Write Video Scripts in Your Client's Voice",
  description:
    "A practical guide for freelance script writers on capturing client voice, building a reusable voice profile, and writing faster client-ready video scripts.",
  author: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Scribtly",
    url: "https://scribtly.com",
    logo: {
      "@type": "ImageObject",
      url: "https://scribtly.com/images/logo-horizontal.png",
    },
  },
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://scribtly.com/blog/how-to-write-scripts-in-your-clients-voice",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to build a client voice profile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a new client, plan 30 to 60 minutes the first time. Watch their existing content, note recurring phrases, and document the pattern. After that, the profile pays for itself on every script you write.",
      },
    },
    {
      "@type": "Question",
      name: "Should I share the client voice profile with my client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not mandatory, but it helps. Sharing the profile lets the client correct anything, confirm their tone, and trust that you have actually listened. It also sets you apart from writers who just dive straight into drafts.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write scripts for a client with no existing content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with a detailed onboarding call. Ask: who is your audience? What do you want them to feel after watching? Give me three creators you admire and why. What should you never sound like? With those four answers, you can build a working profile.",
      },
    },
    {
      "@type": "Question",
      name: "What if the client doesn't like the voice I've captured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That's revision data. Take what they change and update the profile. After one or two rounds of feedback, most profiles stabilise and revisions drop significantly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use one voice profile across multiple platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with modifications. The core voice stays the same, but the energy and structure differ by platform. A TikTok script needs faster hooks and shorter sentences than a YouTube video. Keep one base profile and note platform-specific adjustments separately.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://scribtly.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://scribtly.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Write Video Scripts in Your Client's Voice",
      item: "https://scribtly.com/blog/how-to-write-scripts-in-your-clients-voice",
    },
  ],
};

const faqs = [
  {
    q: "How long does it take to build a client voice profile?",
    a: "For a new client, plan 30 to 60 minutes the first time. Watch their existing content, note recurring phrases, and document the pattern. After that, the profile pays for itself on every script you write.",
  },
  {
    q: "Should I share the client voice profile with my client?",
    a: "Not mandatory, but it helps. Sharing the profile lets the client correct anything, confirm their tone, and trust that you have actually listened. It also sets you apart from writers who just dive straight into drafts.",
  },
  {
    q: "How do I write scripts for a client with no existing content?",
    a: "Start with a detailed onboarding call. Ask: who is your audience? What do they want to feel after watching? Give me three creators you admire and why. What should you never sound like? With those four answers you can build a working profile.",
  },
  {
    q: "What if the client doesn't like the voice I've captured?",
    a: "That's revision data. Take what they change and update the profile. After one or two rounds of feedback, most profiles stabilise and revisions drop significantly.",
  },
  {
    q: "Can I use one voice profile across multiple platforms?",
    a: "Yes, with modifications. The core voice stays the same, but the energy and structure differ by platform. A TikTok script needs faster hooks and shorter sentences than a YouTube video. Keep one base profile and note platform-specific adjustments separately.",
  },
];

export default function BlogPostPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* JSON-LD */}
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
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Try free
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="px-6 pt-6 pb-0 max-w-3xl mx-auto">
        <nav className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--text-primary)" }}>Client Voice</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="px-6 pt-8 pb-0 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(224,120,48,0.10)", color: "var(--accent)" }}
          >
            Freelance Workflow
          </span>
          <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
            <Clock size={12} />
            8 min read
          </span>
          <time className="text-xs" dateTime="2026-07-09" style={{ color: "var(--text-muted)" }}>
            9 July 2026
          </time>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ color: "var(--text-primary)" }}>
          How to Write Video Scripts in Your Client&apos;s Voice
        </h1>

        <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          Writing video scripts for clients is one thing. Writing them so they actually sound like the client is another challenge entirely. Here is how to capture client voice once and write faster scripts every time.
        </p>

        {/* Soft CTA — top */}
        <div
          className="rounded-xl border p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="flex-1">
            <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
              Save your client&apos;s voice once. Generate scripts faster.
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Scribtly stores the full voice profile so you never start from blank again.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: "var(--accent)" }}
          >
            Try free <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Article body */}
      <article className="px-6 pb-16 max-w-3xl mx-auto">

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Why getting the voice right matters
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            If you manage scripts for multiple clients, you know the problem. Every client has a different tone, different phrasing, different energy. Without a system, you spend half your time re-reading old content, watching old videos, and second-guessing whether this script sounds right for <em>this</em> client.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Clients can spot generic scripts immediately. Even if the structure is solid and the hook is strong, a script that doesn&apos;t sound like them will land in revision limbo.
          </p>
          <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
            Getting the voice right from the first draft:
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Saves you revision rounds",
              "Builds client trust faster",
              "Makes you the go-to writer instead of the one who needs a lot of briefing",
            ].map((point) => (
              <div key={point} className="flex items-start gap-2.5">
                <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            What client voice actually means
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Client voice is not just tone. It is a combination of several layers that work together:
          </p>
          <div className="flex flex-col gap-5">
            {[
              {
                label: "Tone",
                desc: "Are they formal or casual? Punchy or thoughtful? Dry humour or enthusiastic? Tone sets the emotional register.",
              },
              {
                label: "Phrasing",
                desc: 'Do they say "our customers" or "the people we serve"? "Get started" or "jump in"? "Results" or "outcomes"? Small word choices build identity.',
              },
              {
                label: "Energy",
                desc: "Do they speak fast and direct, or slow and considered? Do they build tension before the payoff, or lead with the win?",
              },
              {
                label: "Avoidances",
                desc: "What do they never say? Some clients hate corporate-speak. Others never use exclamation marks. Some do not swear, some do.",
              },
              {
                label: "Audience assumptions",
                desc: "Who are they talking to? What does the audience already know? How much jargon is appropriate for this niche?",
              },
            ].map(({ label, desc }) => (
              <div key={label} className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{label}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            How to capture a client&apos;s voice
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Before writing a single script, build a voice reference. Here is how.
          </p>
          <div className="flex flex-col gap-6">
            {[
              {
                num: "01",
                title: "Watch or read 5–10 pieces of their existing content",
                body: "Look for patterns. What phrases keep appearing? What structure do they use in videos? Where do they put the CTA? One video tells you something. Ten videos tell you everything.",
              },
              {
                num: "02",
                title: "Note their recurring words and phrases",
                body: 'Create a short list. Even 10–15 phrases tells you a lot. "Let\'s be honest," "here\'s the thing," "and here\'s why that matters" — these are voice fingerprints that make a script recognisably theirs.',
              },
              {
                num: "03",
                title: "Note what they avoid",
                body: 'Ask directly if you can. "Is there anything you never want to sound like?" You will get useful answers fast. Some clients hate vague motivational language. Others hate being too casual.',
              },
              {
                num: "04",
                title: "Identify their CTA style",
                body: 'Some clients close with a soft CTA ("if this was helpful, subscribe"). Others go direct ("book a call, link below"). Match the energy they already use.',
              },
              {
                num: "05",
                title: "Get three example scripts or videos they love",
                body: "Not just their own content — videos they admire from other creators. These reveal what they are reaching for, even if they have not achieved it yet. That gap is useful information.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-5">
                <div
                  className="text-3xl font-bold leading-none shrink-0 pt-1"
                  style={{ color: "rgba(224,120,48,0.20)", minWidth: "2.5rem" }}
                >
                  {step.num}
                </div>
                <div>
                  <p className="font-semibold text-base mb-1.5" style={{ color: "var(--text-primary)" }}>{step.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Step-by-step: writing a script in client voice
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Once you have a voice reference, apply it like this on every script:
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                step: "Step 1",
                title: "Write the hook in their opening style",
                body: "Does the client open with a question? A bold statement? A story? Match the pattern. Do not invent a new hook style just because you think it would work better.",
              },
              {
                step: "Step 2",
                title: "Use their typical sentence rhythm",
                body: "Short and punchy, or longer and building? Some clients mix both. Know which they prefer for video versus written content, and match it consciously.",
              },
              {
                step: "Step 3",
                title: "Drop in their actual phrases",
                body: "This is the easy win. If they say \"let's be real\" and \"here's the shift,\" use those. Do not invent new signature phrases — use the ones they already own.",
              },
              {
                step: "Step 4",
                title: "Match their relationship to the audience",
                body: "Are they a peer, a mentor, an expert, a guide? The relationship changes the vocabulary, the tone of the CTAs, and the level of familiarity you can take for granted.",
              },
              {
                step: "Step 5",
                title: "Review against their sample content",
                body: "Read the script aloud. Does it sound like the client, or does it sound like a script? If you would immediately know it is AI-generated, it needs another pass.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>{step}</p>
                <p className="font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — example profile */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            A sample voice profile
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
            Here is what a basic client voice profile looks like in practice. This one is for a fitness coach creating Reels and YouTube Shorts.
          </p>
          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <div className="flex flex-col gap-4">
              {[
                { label: "Client", value: "Fitness coach for busy professionals" },
                { label: "Platform", value: "Instagram Reels + YouTube Shorts" },
                { label: "Tone", value: "Encouraging but no-nonsense. Direct without being harsh." },
                { label: "Energy", value: "Fast-paced, punchy, never meandering." },
                {
                  label: "Signature phrases",
                  value: '"Here\'s the real reason..." / "And this is the part most people miss" / "No excuses, but also no guilt"',
                },
                {
                  label: "Avoidances",
                  value: 'No "amazing," no "super," no generic lines like "you\'ve got this"',
                },
                { label: "CTA style", value: 'Soft close. "If you want more of this, follow for weekly training tips."' },
                {
                  label: "Audience assumption",
                  value: "Intermediate. Knows basic fitness terms, does not need everything explained.",
                },
              ].map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[140px_1fr] gap-2 text-sm">
                  <span className="font-semibold shrink-0" style={{ color: "var(--text-primary)" }}>{label}</span>
                  <span className="leading-relaxed" style={{ color: "var(--text-muted)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm leading-relaxed mt-4" style={{ color: "var(--text-muted)" }}>
            With a profile like this, any script you write has guardrails. You know what to say, how to say it, and what to avoid before typing the first word.
          </p>
        </section>

        {/* Mid-article CTA */}
        <div
          className="rounded-2xl border p-7 mb-10 text-center"
          style={{ borderColor: "var(--border)", background: "var(--dark)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            Scribtly
          </p>
          <h3 className="text-xl font-bold mb-3 text-white">
            Save the voice profile once. Generate every future script from it.
          </h3>
          <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly stores your client&apos;s tone, phrases, platform style, and audience notes — then generates first-draft scripts in under 60 seconds.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Generate your next client script free
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Section 6 — common mistakes */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Common mistakes to avoid
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                title: "Relying on memory instead of a system",
                body: "After writing for 10 clients, voices blur together. A documented profile beats memory every time — especially when you come back to a client after a month away.",
              },
              {
                title: "Using your own voice instead of the client's",
                body: "It is easy to default to how you write. Read the voice profile before starting every script. Read three pieces of the client's existing content first. It takes five minutes and changes the output completely.",
              },
              {
                title: "Ignoring platform-specific conventions",
                body: "Voice is only one layer. Platform structure is another. A YouTube hook is different from a TikTok hook. A LinkedIn video script is different from a Reels script. Both need to be right at the same time.",
              },
              {
                title: "Skipping the voice review step",
                body: "Always read the first draft against the client's actual content. It takes two minutes and catches 80% of voice errors before the client ever sees the script.",
              },
              {
                title: "Writing a voice profile once and never updating it",
                body: "Clients evolve. Their tone changes. Their audience grows. Their messaging shifts after a rebrand or pivot. Update the profile every few months, or whenever something significant changes.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <p className="font-semibold text-base mb-1.5" style={{ color: "var(--text-primary)" }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Build your client script workflow with Scribtly
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
            A strong voice profile is only the start. Once you have it, the next step is generating platform-native scripts that use the right structure for each format. Scribtly supports:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {[
              { label: "YouTube video scripts", href: "/youtube-scripts" },
              { label: "TikTok scripts", href: "/tiktok-scripts" },
              { label: "Instagram Reels scripts", href: "/reels-scripts" },
              { label: "LinkedIn video scripts", href: "/linkedin-scripts" },
              { label: "Podcast scripts", href: "/podcast-scripts" },
              { label: "Short-form video scripts", href: "/short-form-scripts" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)" }}
              >
                <ArrowRight size={13} style={{ color: "var(--accent)" }} />
                {label}
              </Link>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Whether you are a{" "}
            <Link href="/for-freelancers" className="underline" style={{ color: "var(--accent)" }}>
              freelance script writer
            </Link>
            {" "}or managing content for an{" "}
            <Link href="/for-agencies" className="underline" style={{ color: "var(--accent)" }}>
              agency with multiple clients
            </Link>
            , Scribtly is built around the way client content actually works.{" "}
            <Link href="/" className="underline" style={{ color: "var(--accent)" }}>
              Learn more on the homepage
            </Link>
            .
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-0 rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className={`p-6 ${i < faqs.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "var(--border)", background: i % 2 === 0 ? "var(--bg-subtle)" : "var(--bg-base)" }}
              >
                <p className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>{faq.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="rounded-2xl p-8 text-center"
          style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Stop rebuilding your client&apos;s voice from scratch
          </h2>
          <p className="text-base mb-6 max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            Save the voice profile once in Scribtly and generate platform-native first drafts in under 60 seconds. No blank page. No briefing from scratch. Just faster, better client scripts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — no card required
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              More script writing guides
            </Link>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
          <span>© 2026 Scribtly. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="underline" style={{ color: "var(--accent)" }}>
              Blog
            </Link>
            <Link href="/" className="underline" style={{ color: "var(--accent)" }}>
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

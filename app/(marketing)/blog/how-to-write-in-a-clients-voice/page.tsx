import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write Scripts in a Client's Voice",
  description:
    "Learn how to capture and replicate your client's brand voice in every script. A practical guide for freelance script writers and content creators.",
  alternates: { canonical: "https://scribtly.com/blog/how-to-write-in-a-clients-voice" },
  openGraph: {
    title: "How to Write Scripts in a Client's Voice",
    description:
      "Learn how to capture and replicate your client's brand voice in every script. A practical guide for freelance script writers and content creators.",
    type: "article",
    publishedTime: "2026-07-02",
    url: "https://scribtly.com/blog/how-to-write-in-a-clients-voice",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://scribtly.com/blog/how-to-write-in-a-clients-voice#article",
      headline: "How to Write Scripts in a Client's Voice",
      description:
        "A practical guide for freelance script writers on capturing and replicating client brand voice in video scripts.",
      datePublished: "2026-07-02",
      author: { "@type": "Organization", name: "Scribtly" },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://scribtly.com/blog/how-to-write-in-a-clients-voice",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://scribtly.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "How to Write Scripts in a Client's Voice",
          item: "https://scribtly.com/blog/how-to-write-in-a-clients-voice",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a client voice profile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A client voice profile is a written document that captures how a client communicates — their tone, vocabulary, sentence length, phrases they use, topics they avoid, and the personality they want to project. It serves as a reference guide so every script you write for them sounds consistently like them, not like a generic template.",
          },
        },
        {
          "@type": "Question",
          name: "How do I capture a client's voice accurately?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Review existing content they've published — videos, social posts, emails, podcast episodes. Note patterns in how they open, how they explain ideas, the words they repeat, and the emotional tone they use. Then ask them directly: Who am I talking to? What should they feel after watching? What phrases do you love or hate? Combine both sources into a written profile.",
          },
        },
        {
          "@type": "Question",
          name: "What should I include in a client voice profile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A good client voice profile includes: tone description (e.g. energetic, calm, authoritative), audience description, 3–5 phrases or expressions the client uses regularly, 2–3 topics or phrases to avoid, their preferred hook style, how they like to end videos, and their typical content length. The more specific the better.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to write a script in a client's voice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Without a system, it can take 30–90 minutes per script just to get the voice right, especially for newer clients. With a saved voice profile and a tool like Scribtly, you can generate a first draft in under 60 seconds and spend your time refining rather than starting from zero.",
          },
        },
        {
          "@type": "Question",
          name: "Can AI generate scripts that sound like a specific client?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, but only if the AI has enough context about that client. Generic prompts produce generic output. The key is giving the AI a detailed voice profile — tone, vocabulary, audience, structure preferences — so it can generate a first draft that sounds like your client rather than a chatbot. Scribtly is built specifically for this workflow.",
          },
        },
        {
          "@type": "Question",
          name: "What if my client can't describe their own voice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most clients can't articulate their voice well — that's normal. Instead of asking abstract questions, try these: 'Give me three creators whose style you like and explain why.' 'What would you never want a viewer to think after watching?' 'What's a word that describes your channel vibe?' Then build the profile from their answers, not a generic brief form.",
          },
        },
      ],
    },
  ],
};

const steps = [
  {
    num: "01",
    title: "Audit their existing content",
    body: "Watch or read 5–10 pieces of their content before you write anything. Look for patterns: how they open, how they structure ideas, what words come up repeatedly, and the emotional tone throughout. Make notes — you're building a vocabulary bank.",
  },
  {
    num: "02",
    title: "Ask the right onboarding questions",
    body: "Don't ask 'how would you describe your tone?' — that's too abstract. Instead ask: 'Name three creators whose style you like and tell me why.' 'What would you never want a viewer to say after watching?' 'How do you feel about using humour?' Specific questions get useful answers.",
  },
  {
    num: "03",
    title: "Write a voice profile document",
    body: "Turn your research into a written profile: tone in 2–3 words, 5 phrases they use, 3 topics or phrases to avoid, preferred hook style, how they like to end, and who their audience is. This becomes your reference on every project.",
  },
  {
    num: "04",
    title: "Draft the script, then read it aloud",
    body: "Once you have a draft, read it aloud as if you were the client. Does it feel like them? Where does it slip into your voice instead? Adjust those sections. The read-aloud test catches tone issues that reading on a screen often misses.",
  },
  {
    num: "05",
    title: "Build a feedback loop",
    body: "After each script, note what the client changed in revisions. Their edits tell you what the written profile missed. Update the profile after every project so it gets more accurate over time, not less.",
  },
];

const mistakes = [
  {
    title: "Writing in your own voice by default",
    body: "Most writers default to their own tone when under pressure. If you haven't checked the voice profile before writing, you're probably already drifting. Keep the profile open on a second screen.",
  },
  {
    title: "Relying on verbal briefings instead of written profiles",
    body: "A 20-minute call with a client does not replace a written voice document. Memory fades and details blur. Written profiles stay consistent across weeks and multiple projects.",
  },
  {
    title: "Treating all clients' scripts the same way",
    body: "A fitness coach and a finance educator need completely different scripts — different vocabulary, pacing, hook style, and CTA approach. Generic structure with swapped topics is not client-voice writing.",
  },
  {
    title: "Re-explaining the client brief every time",
    body: "If you're pasting the same background into ChatGPT every time you start a new script, you're wasting time and getting inconsistent results. A saved, reusable voice profile solves this at the root.",
  },
];

export default function BlogPostPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: "var(--border)",
          background: "rgba(253,250,246,0.96)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm font-medium hidden md:block"
              style={{ color: "var(--text-muted)" }}
            >
              Blog
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="px-6 pt-6 max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline" style={{ color: "var(--accent)" }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:underline" style={{ color: "var(--accent)" }}>
            Blog
          </Link>
          <span>/</span>
          <span>How to Write Scripts in a Client's Voice</span>
        </nav>
      </div>

      {/* Hero */}
      <header className="px-6 pt-10 pb-10 max-w-3xl mx-auto">
        <div className="mb-4">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(224,120,48,0.10)", color: "var(--accent)" }}
          >
            Freelance Script Writing
          </span>
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          How to Write Scripts in a Client's Voice
        </h1>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          When you're writing scripts for clients, one of the hardest things to get right is voice.
          Your client's audience can spot immediately when the content doesn't sound like the person
          they follow. This guide walks through a practical framework for capturing and replicating
          a client's voice accurately — every time, without starting from scratch.
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
          <span>2 July 2026</span>
          <span>·</span>
          <span>8 min read</span>
        </div>
      </header>

      {/* Soft CTA Banner */}
      <div
        className="mx-6 md:mx-auto max-w-3xl rounded-2xl border p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Save your client's voice profile once and generate scripts in under 60 seconds.
        </p>
        <Link
          href="/"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Try Scribtly free <ArrowRight size={14} />
        </Link>
      </div>

      {/* Body */}
      <main className="px-6 pb-24 max-w-3xl mx-auto prose-like">
        {/* Section 1 */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Why client voice matters more than you think
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Audiences don't just follow a channel — they follow a person. They recognise the phrasing,
            the pacing, the specific way that person explains things. When a script sounds generic or
            slightly off, viewers pick up on it even if they can't explain why. Engagement drops.
            Comments become less personal. The connection fades.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            For freelance script writers, this creates a real problem. You're writing for multiple
            clients simultaneously, often across different niches, tones, and platforms. Getting
            the voice right — consistently — is what separates a good script writer from one who
            gets long-term retainer clients.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The good news is that client voice isn't some mysterious talent. It's a skill you can
            systematise. The framework below will help you do exactly that.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            The problem with "just learn their style"
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Most advice about writing in a client's voice boils down to: "study their content and
            write in a similar style." That's true, but it's not a system. It leaves too much to
            memory and instinct, which means:
          </p>
          <ul className="flex flex-col gap-3 mb-4">
            {[
              "You re-do the voice research every time you start a new script",
              "You default to your own voice under time pressure",
              "New clients take 2–3 scripts before you really nail the tone",
              "If you use AI tools, you're re-explaining everything from scratch every session",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <span className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The fix is a reusable, written client voice profile. Once you build one properly, every
            script for that client starts from a reliable base, not a blank page.
          </p>
        </section>

        {/* Section 3: Steps */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            How to build a client voice profile: step by step
          </h2>
          <div className="flex flex-col gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="text-4xl font-bold mb-3 leading-none"
                  style={{ color: "rgba(224,120,48,0.20)" }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-semibold text-base mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: What to include */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            What a solid client voice profile actually looks like
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            A voice profile doesn't need to be long — it needs to be specific. Here are the fields
            that make the biggest difference:
          </p>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {[
              {
                field: "Tone in 3 words",
                example: "Direct, warm, no-fluff",
              },
              {
                field: "Audience",
                example: "Freelance designers aged 25–40 who want to go full-time",
              },
              {
                field: "Signature phrases",
                example: '"Here\'s the thing…" / "Real talk:" / "Let me break this down"',
              },
              {
                field: "Phrases to avoid",
                example: "Buzzwords like 'synergy', 'game-changer', 'hustle culture'",
              },
              {
                field: "Hook style",
                example: "Opens with a bold claim or controversial opinion",
              },
              {
                field: "CTA style",
                example: "Soft ask — 'If this helped, share it with someone who needs it'",
              },
              {
                field: "Platform",
                example: "YouTube long-form (8–14 minutes), punchy edits",
              },
              {
                field: "What to never do",
                example: "Never mention competitors by name, never be negative about the industry",
              },
            ].map((row, i) => (
              <div
                key={row.field}
                className="grid grid-cols-2 px-5 py-3.5 text-sm"
                style={{
                  borderBottom: i < 7 ? "1px solid var(--border)" : undefined,
                  background: i % 2 === 0 ? "var(--bg-base)" : "var(--bg-subtle)",
                }}
              >
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {row.field}
                </span>
                <span style={{ color: "var(--text-muted)" }}>{row.example}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 mb-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Generate your next client script in under 60 seconds
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly lets you save a client's voice profile once, then generate platform-native
            scripts that sound like them — not like generic AI output.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free — no card required <ArrowRight size={14} />
          </Link>
        </div>

        {/* Section 5: Where Scribtly fits */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How to use AI without losing the client's voice
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The biggest complaint about AI-generated scripts is that they all sound the same.
            That's not a problem with AI — it's a problem with generic prompts. If you feed a
            tool a vague brief, it produces a vague script.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The solution is giving the AI everything it needs upfront: the client's tone, audience,
            platform, hook style, phrases to use, phrases to avoid, and the topic for this script.
            With that context, the output is dramatically more on-brand.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Tools like{" "}
            <Link href="/" className="underline" style={{ color: "var(--accent)" }}>
              Scribtly
            </Link>{" "}
            are built specifically for this workflow. You save a client's voice profile once — their
            niche, tone, audience, signature phrases, and preferred structure — and then generate
            scripts for that client without re-entering the context every time. It's the difference
            between using a template and using a system.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The output still needs your edit. That's how it should be. But you're editing a
            first draft that already sounds like the client, rather than rewriting something generic
            from the ground up. That's where the time saving actually comes from.
          </p>
        </section>

        {/* Section 6: Mistakes */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Common mistakes that break client voice
          </h2>
          <div className="flex flex-col gap-5">
            {mistakes.map((m) => (
              <div
                key={m.title}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3
                  className="font-semibold text-base mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {m.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links section */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            More from Scribtly
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            If this helped, these pages are worth reading next:
          </p>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Scribtly — AI Script Writer", href: "/" },
              { label: "Script Writing for Freelancers", href: "/for-freelancers" },
              { label: "Script Writing for Agencies", href: "/for-agencies" },
              { label: "YouTube Script Generator", href: "/youtube-script-generator" },
              { label: "TikTok Script Generator", href: "/tiktok-script-generator" },
              { label: "Instagram Reels Script Generator", href: "/instagram-reels-script-generator" },
              { label: "Script Writing Blog", href: "/blog" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  <ArrowRight size={13} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                q: "What is a client voice profile?",
                a: "A client voice profile is a written document that captures how a client communicates — their tone, vocabulary, sentence length, phrases they use, topics they avoid, and the personality they want to project. It serves as a reference guide so every script sounds consistently like them, not like a generic template.",
              },
              {
                q: "How do I capture a client's voice accurately?",
                a: "Review 5–10 pieces of their existing content. Note how they open, how they explain ideas, what words they repeat, and their emotional tone. Then ask direct questions: 'Who is your audience?' 'What should they feel after watching?' 'What phrases do you love or hate?' Combine both sources into a written profile.",
              },
              {
                q: "What should I include in a client voice profile?",
                a: "Tone in 2–3 words, audience description, 3–5 signature phrases, phrases or topics to avoid, their preferred hook style, how they like to end videos, and their typical content format and length. The more specific, the better the scripts.",
              },
              {
                q: "How long does it take to write a script in a client's voice?",
                a: "Without a system, 30–90 minutes just getting the voice right. With a saved voice profile and Scribtly, you can generate a first draft in under 60 seconds and spend your time refining rather than starting from zero.",
              },
              {
                q: "What if my client can't describe their own voice?",
                a: "Most clients can't — that's normal. Ask them to name three creators whose style they like and explain why. Ask what they'd never want a viewer to say after watching. Use their answers to build the profile, not a generic brief form.",
              },
              {
                q: "Can AI write scripts that sound like a specific client?",
                a: "Yes, with enough context. Generic prompts produce generic output. A detailed voice profile — tone, vocabulary, audience, structure preferences — gives the AI what it needs to produce something that sounds on-brand. Scribtly is built specifically for this workflow.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3
                  className="font-semibold text-base mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Final CTA */}
      <section
        className="px-6 py-20 border-t"
        style={{ borderColor: "var(--border)", background: "var(--dark)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stop explaining your client's voice from scratch every time
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly lets you save a client's voice profile once and generate platform-native
            scripts — YouTube, TikTok, Reels, LinkedIn — that sound like them, not generic AI.
            Free to try. No card required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Start free with 5 scripts. No credit card needed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link
            href="/"
            className="font-bold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly
          </Link>
          <span>© 2026 Scribtly. All rights reserved.</span>
          <nav className="flex items-center gap-4">
            <Link href="/" className="hover:underline" style={{ color: "var(--accent)" }}>
              Home
            </Link>
            <Link href="/blog" className="hover:underline" style={{ color: "var(--accent)" }}>
              Blog
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

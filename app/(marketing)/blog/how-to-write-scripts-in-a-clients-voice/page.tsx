import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write Scripts in a Client's Voice | Scribtly",
  description:
    "A practical guide for freelancers and creators on how to write video scripts that genuinely sound like your client's brand voice every time.",
  openGraph: {
    title: "How to Write Scripts in a Client's Voice | Scribtly",
    description:
      "A practical guide for freelancers and creators on how to write video scripts that genuinely sound like your client's brand voice every time.",
    url: "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice",
    siteName: "Scribtly",
    type: "article",
    publishedTime: "2026-06-24",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice#article",
      headline: "How to Write Scripts in a Client's Voice",
      description:
        "A practical guide for freelancers and creators on how to write video scripts that genuinely sound like your client's brand voice every time.",
      datePublished: "2026-06-24",
      dateModified: "2026-06-24",
      author: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I capture a client's brand voice for scripts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with a voice audit: collect examples of their best-performing content, note their vocabulary, sentence length, tone, and phrases they repeat. Then build a written reference document you can consult when writing. Tools like Scribtly let you save this as a reusable client profile.",
          },
        },
        {
          "@type": "Question",
          name: "What is a client voice profile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A client voice profile is a document that captures the key traits of a brand's communication style: their tone, preferred vocabulary, phrases they use, topics they avoid, audience they speak to, and the platforms they publish on. It acts as a brief for every piece of content you write for them.",
          },
        },
        {
          "@type": "Question",
          name: "How many examples do I need to understand a client's voice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aim for at least 5 to 10 strong examples from their existing content. Focus on pieces they say performed well or felt most 'on brand'. More examples help you spot consistent patterns rather than one-off style choices.",
          },
        },
        {
          "@type": "Question",
          name: "How do I avoid sounding like generic AI when writing client scripts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Avoid common AI filler phrases, use the client's actual vocabulary, match their sentence rhythm, and always edit the first draft out loud. If it doesn't sound like the client when you read it aloud, it needs another pass. Saving a client profile in Scribtly helps generate drafts that start closer to the target voice.",
          },
        },
        {
          "@type": "Question",
          name: "What should I include in a video script brief from a client?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ask for: the platform, target audience, topic or angle, key message, call to action, tone guidance, any phrases to avoid, and links to content examples they like. The more specific the brief, the less revision the script will need.",
          },
        },
      ],
    },
    {
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
          name: "How to Write Scripts in a Client's Voice",
          item: "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice",
        },
      ],
    },
  ],
};

const mistakes = [
  {
    mistake: "Copying the client's tone from one piece of content",
    fix: "Review at least 5 to 10 examples so you spot consistent patterns, not one-off choices.",
  },
  {
    mistake: "Starting with generic AI output and hoping the client won't notice",
    fix: "Always use client-specific vocabulary and sentence rhythm from the first draft, not as an afterthought.",
  },
  {
    mistake: "Treating all platforms the same",
    fix: "A LinkedIn video script and a TikTok script should feel different even for the same client. Adjust formality and pacing per platform.",
  },
  {
    mistake: "Re-explaining the brief to yourself every time you sit down",
    fix: "Save a proper client voice profile once and reference it every session. Scribtly stores this so you never start cold.",
  },
  {
    mistake: "Delivering without reading aloud first",
    fix: "Always read scripts aloud before sending. If it sounds stiff or generic, it will on camera too.",
  },
];

const faqItems = [
  {
    q: "How do I capture a client's brand voice for scripts?",
    a: "Start with a voice audit: collect examples of their best-performing content, note their vocabulary, sentence length, tone, and phrases they repeat. Then build a written reference document you can consult when writing. Tools like Scribtly let you save this as a reusable client profile.",
  },
  {
    q: "What is a client voice profile?",
    a: "A client voice profile is a document that captures the key traits of a brand's communication style: their tone, preferred vocabulary, phrases they use, topics they avoid, audience they speak to, and the platforms they publish on. It acts as a brief for every piece of content you write for them.",
  },
  {
    q: "How many examples do I need to understand a client's voice?",
    a: "Aim for at least 5 to 10 strong examples from their existing content. Focus on pieces they say performed well or felt most 'on brand'. More examples help you spot consistent patterns rather than one-off style choices.",
  },
  {
    q: "How do I avoid sounding like generic AI when writing client scripts?",
    a: "Avoid common AI filler phrases, use the client's actual vocabulary, match their sentence rhythm, and always edit the first draft out loud. If it doesn't sound like the client when you read it aloud, it needs another pass. Saving a client profile in Scribtly helps generate drafts that start closer to the target voice.",
  },
  {
    q: "What should I include in a video script brief from a client?",
    a: "Ask for: the platform, target audience, topic or angle, key message, call to action, tone guidance, any phrases to avoid, and links to content examples they like. The more specific the brief, the less revision the script will need.",
  },
];

export default function BlogPost() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            Scribtly
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

      {/* Article */}
      <article className="px-6 py-16 max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span className="mx-2">/</span>
          <span>How to Write Scripts in a Client's Voice</span>
        </nav>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(224,120,48,0.12)", color: "var(--accent)" }}
          >
            Freelance Workflow
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>24 June 2026</span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>8 min read</span>
        </div>

        {/* H1 */}
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          How to Write Scripts in a Client&apos;s Voice
        </h1>

        {/* Intro */}
        <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Writing scripts that genuinely sound like your client is one of the hardest parts of freelance content work.
          Get it wrong and you&apos;re looking at rounds of revisions, frustrated clients, and hours of unpaid rework.
          Get it right and you become the person they trust for every piece of content they make.
        </p>

        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          This guide covers how to actually capture and apply a client&apos;s brand voice when writing video scripts —
          not just at the start of a project but consistently, at scale, without re-explaining everything from scratch
          every time you sit down to write.
        </p>

        {/* Soft CTA */}
        <div
          className="rounded-2xl border p-6 mb-12"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Tired of starting from scratch every time?
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Scribtly lets you save a client&apos;s voice profile once — tone, vocabulary, audience, platform — then
            generate scripts that already sound like them from the first draft.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            Try Scribtly free <ArrowRight size={14} />
          </Link>
        </div>

        {/* Section 1 */}
        <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--text-primary)" }}>
          Why client voice is harder than it looks
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Most clients cannot tell you exactly what their voice is. They know when something feels wrong but struggle
          to explain what&apos;s missing. As the writer, that&apos;s your job to figure out.
        </p>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The problem gets worse when you are juggling three or four clients at once. You finish a script for a
          serious B2B coach, then immediately try to write a punchy TikTok script for a fitness creator. If you
          carry the tone from one into the other, both clients will feel it even if they cannot name it.
        </p>

        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          Generic AI tools make this worse, not better. They produce plausible but flavourless output. You end up
          rewriting the whole thing anyway, which defeats the purpose of using AI in the first place.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--text-primary)" }}>
          Step 1: Do a voice audit before you write a word
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Before writing your first script for a new client, spend 30 to 45 minutes studying their existing content.
          Look at videos they have posted, captions they have written, emails or newsletters they have sent out, and
          any written marketing they have approved.
        </p>

        <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
          Ask yourself:
        </p>

        <ul className="flex flex-col gap-3 mb-6 pl-4">
          {[
            "What words do they use most often? What words never appear?",
            "Are their sentences short and punchy or long and detailed?",
            "Do they speak directly to the viewer or talk about themselves in the third person?",
            "What is their default emotional register — warm, authoritative, casual, urgent?",
            "Do they use humour? What kind?",
            "What phrases do they repeat across multiple pieces of content?",
            "What topics do they always come back to?",
            "What do they never say?",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
              <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              {item}
            </li>
          ))}
        </ul>

        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          Write your findings down. This is the raw material for your client voice profile.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--text-primary)" }}>
          Step 2: Build a client voice profile
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A client voice profile is a structured summary of everything you learned in the voice audit. It is the
          single document you refer to every time you write for that client. It saves you from having to remember
          everything from scratch or re-reading hours of content every session.
        </p>

        <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
          A good client voice profile includes:
        </p>

        <div
          className="rounded-2xl border p-6 mb-8"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <ul className="flex flex-col gap-3">
            {[
              { label: "Niche and audience", detail: "Who they talk to and what that person cares about." },
              { label: "Tone adjectives", detail: "Three to five words that describe how they sound (e.g. warm, direct, educational, no-fluff)." },
              { label: "Signature phrases", detail: "Expressions they use often that make their content feel like them." },
              { label: "Vocabulary style", detail: "Simple everyday words, industry jargon, or somewhere in between?" },
              { label: "Sentence length", detail: "Short and choppy for social? Longer and flowing for long-form?" },
              { label: "Platforms", detail: "Where they post and how the tone shifts per platform." },
              { label: "Topics they own", detail: "The subjects they return to repeatedly." },
              { label: "What to avoid", detail: "Words, phrases, angles, or tones that feel off-brand." },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3 text-sm">
                <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <span>
                  <strong style={{ color: "var(--text-primary)" }}>{item.label}:</strong>{" "}
                  <span style={{ color: "var(--text-muted)" }}>{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          Save this profile somewhere you can access quickly. When you are using a tool like{" "}
          <Link href="/" className="underline" style={{ color: "var(--accent)" }}>Scribtly</Link>, you can save the
          entire profile directly inside the platform so it is always ready to pull into any script you generate.
        </p>

        {/* Middle CTA */}
        <div
          className="rounded-2xl p-8 mb-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Save your client&apos;s voice once. Use it in every script.
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly stores your client profiles and generates scripts that already sound like them from the first draft.
            No more re-explaining tone every session.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Generate your first client script <ArrowRight size={15} />
          </Link>
        </div>

        {/* Section 4 */}
        <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--text-primary)" }}>
          Step 3: Write the hook in their voice first
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The hook — the opening line or first few seconds of the video — is the hardest place to nail client voice
          because there is so little room to work with.
        </p>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Start there deliberately. Before writing the full script, draft three or four different hooks using your
          client&apos;s tone as a reference. If you cannot get the first five seconds to sound like them, stop and
          review your voice profile again before continuing.
        </p>

        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          If the hook is right, the rest of the script usually follows more naturally. The hook forces you to switch
          into the client&apos;s register before you have written yourself into the wrong tone.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--text-primary)" }}>
          Step 4: Match the platform, not just the client
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Client voice is not constant across every platform. The same person sounds different in a 60-second TikTok
          versus a 12-minute YouTube video versus a LinkedIn talking-head video.
        </p>

        <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
          Think of it as the same voice adapted for different rooms:
        </p>

        <ul className="flex flex-col gap-3 mb-6 pl-4">
          {[
            "TikTok and Reels: faster pace, shorter sentences, direct address, hook within the first two seconds.",
            "YouTube: more room to build context before the payoff, but the intro still needs a clear hook.",
            "LinkedIn video: slightly more formal register even if the client is naturally casual elsewhere.",
            "Podcast: conversational rhythm, longer thoughts, less visual language.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
              <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              {item}
            </li>
          ))}
        </ul>

        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          Note the platform difference in your client voice profile so you have clear guidance for each format you
          might write for them. <Link href="/" className="underline" style={{ color: "var(--accent)" }}>Scribtly</Link>{" "}
          builds platform-specific structure into every script it generates, so the output is already shaped for the
          right format before you edit.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--text-primary)" }}>
          Step 5: Edit out loud, not on the screen
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Reading a script out loud is the fastest quality check you can do. If you trip over a sentence, so will
          your client when they record it. If a phrase sounds robotic, it will sound robotic on camera.
        </p>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          More importantly, reading aloud tells you whether it sounds like the client. You should almost be able to
          hear their voice saying the words. If you cannot, keep editing.
        </p>

        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          One practical trick: record yourself reading the script, then listen back. Patterns that looked fine on
          screen become obvious when you hear them.
        </p>

        {/* Section 7 — Common Mistakes */}
        <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "var(--text-primary)" }}>
          Common mistakes and how to avoid them
        </h2>

        <div className="flex flex-col gap-4 mb-12">
          {mistakes.map((item) => (
            <div
              key={item.mistake}
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                ✗ {item.mistake}
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                ✓ {item.fix}
              </p>
            </div>
          ))}
        </div>

        {/* Section 8 — Where Scribtly fits */}
        <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--text-primary)" }}>
          How Scribtly fits into this workflow
        </h2>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Scribtly is built around client voice profiles. Instead of copying tone guidance into a prompt every
          session, you save the profile once — niche, audience, tone, platform, key phrases — and pull it into
          any script you generate.
        </p>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The output is platform-native: a YouTube script includes a hook, structured sections, and a CTA. A TikTok
          script is punchy, short, and opening-first. You are not adapting a generic draft to the right format —
          the structure is already there.
        </p>

        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          For freelancers managing multiple clients, this means you can switch from one client to another without
          the mental overhead of re-loading their brand voice from memory. The profile does that for you.
        </p>

        <p className="text-base leading-relaxed mb-12" style={{ color: "var(--text-muted)" }}>
          Scribtly does not write the final script for you — your judgment and editing still matter. What it does is
          get the first draft close enough that your edits are refinements, not rewrites. For most freelancers,
          that is the difference between writing one script an hour and writing three.
        </p>

        {/* FAQ */}
        <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "var(--text-primary)" }}>
          Frequently asked questions
        </h2>

        <div className="flex flex-col gap-4 mb-16">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="rounded-xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {item.q}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Related reading */}
        <div
          className="rounded-2xl border p-6 mb-12"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Related reading
          </p>
          <ul className="flex flex-col gap-2">
            {[
              { href: "/blog", label: "More articles on the Scribtly Blog" },
              { href: "/", label: "How Scribtly works — platform overview" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:underline inline-flex items-center gap-1.5"
                  style={{ color: "var(--accent)" }}
                >
                  {link.label} <ArrowRight size={12} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Final CTA */}
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stop re-explaining your client&apos;s voice every time you write
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Save your client&apos;s profile once in Scribtly and generate platform-native scripts in under 60 seconds.
            Your first draft will already sound like them.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No credit card required.
          </p>
        </div>
      </article>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/" className="font-bold" style={{ color: "var(--text-primary)" }}>
            Scribtly
          </Link>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/" className="hover:underline">Home</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

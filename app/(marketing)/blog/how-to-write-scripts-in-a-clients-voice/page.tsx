import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write Scripts in a Client's Voice",
  description:
    "A practical guide for freelancers on writing video scripts that match your client's tone, style, and brand voice. Save time and deliver better work.",
  keywords: [
    "how to write scripts in a client's voice",
    "client voice profile",
    "brand voice script writing",
    "freelance script writing",
    "video script tone",
    "client content brief",
    "script writing for clients",
    "video content brand voice",
  ],
  openGraph: {
    title: "How to Write Scripts in a Client's Voice",
    description:
      "A practical guide for freelancers on writing video scripts that match your client's tone, style, and brand voice.",
    url: "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice",
    siteName: "Scribtly",
    type: "article",
    publishedTime: "2026-07-15T09:00:00Z",
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
        "A practical guide for freelancers on writing video scripts that match your client's tone, style, and brand voice.",
      datePublished: "2026-07-15T09:00:00Z",
      dateModified: "2026-07-15T09:00:00Z",
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
          url: "https://scribtly.com/images/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice",
      },
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
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does it take to capture a client's voice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For most clients, a thorough voice audit takes one to two hours the first time. Once you have a saved voice profile, applying it to new scripts takes seconds rather than starting from scratch each time.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use AI to write scripts in a client's voice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, if the AI has enough context about the client's tone, audience, preferred phrases, and platform. Generic AI tools require you to re-explain this every session. Tools like Scribtly let you save a client voice profile once and reuse it across every script.",
          },
        },
        {
          "@type": "Question",
          name: "What should I include in a client voice profile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A useful voice profile covers: the client's niche and audience, their tone (casual, authoritative, educational, entertaining), their preferred phrases and words to avoid, the platform they create for, typical video structure they use, and energy level (calm and measured vs. high-energy and punchy).",
          },
        },
        {
          "@type": "Question",
          name: "How many existing scripts should I analyse before writing for a new client?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aim to review at least five to ten pieces of their existing content. If they have scripts or transcripts, even better. If they have very little content, ask them to describe three videos they wish they had made — that tells you more than you think.",
          },
        },
        {
          "@type": "Question",
          name: "What if my client does not have much existing content?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If a client is just starting out, use a detailed onboarding questionnaire to build their voice profile from scratch. Ask about their audience, preferred tone, competitors they admire, phrases they use in conversation, and topics they never want to touch. Build the profile from their answers rather than their past content.",
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
    body: "Watch or read five to ten of their existing videos, posts, or scripts. You are looking for patterns: the words they repeat, the energy they carry, how they open and close, how they speak to their audience.",
  },
  {
    num: "02",
    title: "Note what they say and what they never say",
    body: "Every brand has phrases they own and phrases that feel wrong. A coach who always opens with a challenge question is different from one who opens with a stat. Write both down.",
  },
  {
    num: "03",
    title: "Identify tone and energy",
    body: "Is the voice calm and educational, high-energy and motivational, dry and witty, or warm and conversational? Tone affects sentence length, word choice, hook style, and CTA phrasing.",
  },
  {
    num: "04",
    title: "Map the audience they speak to",
    body: "Your client is not just writing to 'anyone'. They speak to a specific person at a specific stage. A fitness coach speaking to beginners sounds very different to one speaking to competitive athletes.",
  },
  {
    num: "05",
    title: "Ask the right onboarding questions",
    body: "Cover: what platforms they create for, what topics they own, what they never want to discuss, three videos they wish they had made, and one brand they feel sounds similar to their own voice.",
  },
  {
    num: "06",
    title: "Build a voice profile document",
    body: "Capture everything in one place: tone, audience, platform, phrases, structure preferences, and off-limits topics. This is the reference you use every time you write for them.",
  },
];

const faqs = [
  {
    q: "How long does it take to capture a client's voice?",
    a: "For most clients, a thorough voice audit takes one to two hours the first time. Once you have a saved voice profile, applying it to new scripts takes seconds rather than starting from scratch each time.",
  },
  {
    q: "Can I use AI to write scripts in a client's voice?",
    a: "Yes, if the AI has enough context about the client's tone, audience, preferred phrases, and platform. Generic AI tools require you to re-explain this every session. Tools like Scribtly let you save a client voice profile once and reuse it across every script.",
  },
  {
    q: "What should I include in a client voice profile?",
    a: "A useful voice profile covers: the client's niche and audience, their tone (casual, authoritative, educational, entertaining), their preferred phrases and words to avoid, the platform they create for, typical video structure they use, and energy level.",
  },
  {
    q: "How many existing scripts should I analyse before writing for a new client?",
    a: "Aim to review at least five to ten pieces of their existing content. If they have very little content, ask them to describe three videos they wish they had made — that tells you more than you think.",
  },
  {
    q: "What if my client does not have much existing content?",
    a: "Use a detailed onboarding questionnaire. Ask about their audience, preferred tone, competitors they admire, phrases they use in conversation, and topics they never want to touch. Build the profile from their answers.",
  },
];

const mistakes = [
  {
    title: "Guessing the voice instead of researching it",
    body: "Reading three posts and assuming you know the full tone is the most common mistake. Take the time to audit properly. It saves you revision rounds later.",
  },
  {
    title: "Re-explaining context to AI every time",
    body: "Pasting 'write in a casual and educational tone' at the start of every ChatGPT session is not a system. It is manual overhead that compounds across every client and every script.",
  },
  {
    title: "Writing in your own voice by default",
    body: "Freelancers with a strong personal writing style often unconsciously drift into their own voice. If you sound the same across all clients, the work is not truly client-voice writing.",
  },
  {
    title: "Not updating the voice profile as the brand evolves",
    body: "Clients change. A brand that started casual may shift towards authority positioning. Review and update voice profiles every few months, especially if the client rebrands or shifts audience.",
  },
];

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-10" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:underline">Blog</Link>
          <ChevronRight size={12} />
          <span>How to Write Scripts in a Client's Voice</span>
        </nav>

        {/* Category + date */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(224,120,48,0.1)", color: "var(--accent)" }}
          >
            Freelance
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            15 July 2026 · 8 min read
          </span>
        </div>

        {/* H1 */}
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          How to Write Scripts in a Client&apos;s Voice
        </h1>

        {/* Intro */}
        <p className="text-xl leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Writing a script that sounds like your client — not like generic AI output and not like you — is one of the most valuable skills a freelance script writer can have.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          It is also the skill that separates writers who get repeat work from those who face constant revisions. This guide explains exactly how to do it, from auditing a client&apos;s existing content to building a voice profile you can reuse for every future script.
        </p>

        {/* Soft CTA */}
        <div
          className="rounded-2xl border p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Save your client&apos;s voice once. Generate scripts faster.
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Scribtly lets you build a client voice profile and generate platform-native scripts in under 60 seconds.
            </p>
          </div>
          <Link
            href="/signup"
            className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Section 1: Why client voice matters */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Why client voice matters for video scripts
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Video audiences are perceptive. They can tell when content sounds off — even if they cannot articulate why. When a YouTube channel suddenly sounds more formal, or a TikTok creator starts using jargon they have never used before, viewers disengage.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            For creators and businesses, consistent brand voice builds trust over time. It means audiences know what to expect, content feels authentic, and the platform algorithm sees consistent engagement signals.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            For you as a freelancer, delivering scripts that sound genuinely like your client reduces revision rounds, builds trust, and justifies a higher rate. Clients pay more for writers who can disappear into their voice — not writers who produce serviceable but generic scripts.
          </p>
        </section>

        {/* Section 2: What makes up a client's voice */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            What actually makes up a client&apos;s voice
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Brand voice is not just tone. It is a combination of several layers that work together to create a consistent feel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Tone", desc: "Formal, casual, educational, entertaining, authoritative, warm, dry, energetic" },
              { label: "Vocabulary", desc: "Words they use, words they avoid, jargon level, how simple or complex their language is" },
              { label: "Audience relationship", desc: "Do they speak to beginners or experts? Do they challenge, encourage, teach, or entertain?" },
              { label: "Pacing and energy", desc: "Short punchy sentences or longer flowing ones? High energy or measured and calm?" },
              { label: "Platform conventions", desc: "TikTok hooks are different from YouTube intros. Platform shapes structure as much as tone does." },
              { label: "Signature phrases", desc: "Many creators have phrases they return to. These details make scripts feel authentic, not assembled." },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                  {item.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Step by step */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            How to capture your client&apos;s voice: step by step
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            This process works whether you are onboarding a new client or picking up an existing one mid-project.
          </p>
          <div className="flex flex-col gap-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border p-7 flex gap-6 items-start"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="text-4xl font-bold shrink-0 leading-none"
                  style={{ color: "rgba(224,120,48,0.18)" }}
                >
                  {step.num}
                </div>
                <div>
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
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Before / After example */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            A practical example: same topic, two very different voices
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Topic: a 60-second TikTok on why most people fail to build a habit. Here is what the same idea looks like in two different client voices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Client A — Calm, educational coach
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-primary)" }}>
                &ldquo;Most people try to build habits by relying on motivation. The problem? Motivation runs out. What actually works is making the habit easier to start than to skip. Here is a three-step system that removes the friction...&rdquo;
              </p>
            </div>
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Client B — High energy, challenger tone
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-primary)" }}>
                &ldquo;Stop blaming yourself for not being consistent. You are not lazy — your system is broken. I spent three years failing at habits until I figured this out: it&apos;s never about willpower. Here&apos;s what actually changes behaviour...&rdquo;
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Same topic, same goal, same platform. Completely different voice. That difference only comes from doing the voice research properly before you write a single word.
          </p>
        </section>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 mb-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <p className="text-2xl font-bold text-white mb-3">
            Stop re-explaining your client&apos;s voice to ChatGPT every time.
          </p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            With <Link href="/" className="underline text-white">Scribtly</Link>, you save your client&apos;s voice profile once — tone, audience, platform, phrases — and every script you generate from that profile sounds like them, not like generic AI.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free — no card required
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Section 5: Where Scribtly fits */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How Scribtly makes client voice work faster
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The process above works well. The problem is doing it manually every time you generate a script.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            If you use ChatGPT, you are probably pasting a long context block at the top of every session — client name, tone description, audience notes, platform context. That is not a workflow. It is overhead that compounds across every client and every script you produce.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="underline font-medium" style={{ color: "var(--accent)" }}>Scribtly</Link> is built around the idea that you should explain a client&apos;s voice exactly once. You create a{" "}
            <Link href="/client-voice-profile" className="underline font-medium" style={{ color: "var(--accent)" }}>
              client voice profile
            </Link>{" "}
            — niche, tone, audience, platform, key phrases — and then every script you generate for that client uses that profile automatically.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Generate YouTube, TikTok, Reels, LinkedIn, and podcast scripts in your client's saved voice",
              "Platform-native structure — hooks, body sections, CTAs, captions, B-roll notes where relevant",
              "Full scripts in under 60 seconds from a single brief",
              "Keep all scripts organised by client and platform in one place",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle
                  size={16}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--accent)" }}
                />
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm mt-5" style={{ color: "var(--text-muted)" }}>
            If you are a freelancer managing multiple clients, see how Scribtly is built for{" "}
            <Link href="/for-freelancers" className="underline font-medium" style={{ color: "var(--accent)" }}>
              freelance script writers
            </Link>
            . If you are running an agency,{" "}
            <Link href="/for-agencies" className="underline font-medium" style={{ color: "var(--accent)" }}>
              agency teams
            </Link>{" "}
            can manage multiple client profiles in one workspace.
          </p>
        </section>

        {/* Section 6: Common mistakes */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Common mistakes to avoid
          </h2>
          <div className="flex flex-col gap-5">
            {mistakes.map((m) => (
              <div
                key={m.title}
                className="rounded-xl border-l-4 pl-5 py-4 pr-5"
                style={{ borderLeftColor: "var(--accent)", background: "var(--bg-subtle)" }}
              >
                <p className="font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>
                  {m.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="mb-12">
          <h2
            className="text-xl font-bold mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Related guides and resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "YouTube Script Generator", href: "/youtube-script-generator" },
              { label: "TikTok Script Generator", href: "/tiktok-script-generator" },
              { label: "Video Script Template", href: "/video-script-template" },
              { label: "Scribtly vs ChatGPT", href: "/compare/scribtly-vs-chatgpt" },
              { label: "AI Script Writer for Freelancers", href: "/for-freelancers" },
              { label: "AI Script Writer for Agencies", href: "/for-agencies" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between rounded-xl border px-5 py-3.5 text-sm font-medium transition-all hover:shadow-sm"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-subtle)",
                  color: "var(--text-primary)",
                }}
              >
                {link.label}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                  style={{ color: "var(--accent)" }}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ section */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                  {faq.q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="rounded-2xl border p-10 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            Ready to write faster
          </p>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Generate client scripts in under 60 seconds
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            Build a client voice profile once. Generate{" "}
            <Link href="/youtube-script-generator" className="underline" style={{ color: "var(--accent)" }}>YouTube scripts</Link>,{" "}
            <Link href="/tiktok-script-generator" className="underline" style={{ color: "var(--accent)" }}>TikTok scripts</Link>, and more in that voice — without repeating yourself every time.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 mb-3"
            style={{ background: "var(--accent)" }}
          >
            Start free with 5 scripts
            <ArrowRight size={16} />
          </Link>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            No credit card required. Cancel any time.
          </p>
        </section>

      </article>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write Scripts in a Client's Voice | Scribtly",
  description:
    "Learn how to write video scripts that actually sound like your client. A practical guide for freelancers and content creators on capturing and reusing client voice.",
  openGraph: {
    title: "How to Write Scripts in a Client's Voice",
    description:
      "Learn how to write video scripts that actually sound like your client. A practical guide for freelancers and content creators on capturing and reusing client voice.",
    type: "article",
    url: "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write Scripts in a Client's Voice",
    description:
      "Learn how to write video scripts that actually sound like your client. A practical guide for freelancers and content creators.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Write Scripts in a Client's Voice",
      description:
        "A practical guide for freelancers and content creators on capturing client voice and writing video scripts that sound like the client, not like generic AI output.",
      url: "https://scribtly.com/blog/how-to-write-scripts-in-a-clients-voice",
      author: { "@type": "Organization", name: "Scribtly" },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      datePublished: "2026-07-08",
      keywords: [
        "write scripts in a client's voice",
        "client voice profile",
        "freelance script writing",
        "video script writing for clients",
        "brand voice for scripts",
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
            text: "A client voice profile is a documented summary of how a client communicates — their tone, pace, vocabulary, key phrases, audience, platform style, and things they never say. It acts as a reference you use every time you write scripts for that client.",
          },
        },
        {
          "@type": "Question",
          name: "How do I capture a client's voice if they have no existing content?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If a client has no videos, ask them to record a short voice note explaining their business. Listen to how they talk, not what they say. You can also run a brief questionnaire covering tone, audience, examples of brands they admire, and phrases they want to avoid.",
          },
        },
        {
          "@type": "Question",
          name: "How do you stop AI-generated scripts sounding generic?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The main reason AI scripts sound generic is because the prompt lacks voice context. Instead of just describing the topic, include the client's tone, typical sentence length, phrases they use, their audience, and a content example. Tools like Scribtly let you save that context once so it is applied automatically every time.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to build a client voice profile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A working voice profile takes about 20 to 30 minutes to build from scratch. You can refine it after the first script review. Once it exists, it saves that time on every future script.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the same voice profile across multiple platforms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can use the same core voice profile, but the script structure should change by platform. A TikTok hook is shorter and punchier than a YouTube intro. The voice stays consistent; the format adapts.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://scribtly.com/blog" },
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

const steps = [
  {
    num: "01",
    title: "Collect raw voice material",
    body: "Watch or read at least five pieces of existing content. Take notes on tone, pace, word choices, sentence length, and recurring phrases. If the client has no content, ask for a voice note.",
  },
  {
    num: "02",
    title: "Identify tone markers",
    body: "Is the client formal or casual? Direct or storytelling? Do they use humour? Do they swear? Do they use industry jargon or plain English? Write three words that describe their tone.",
  },
  {
    num: "03",
    title: "List their vocabulary patterns",
    body: "Capture specific phrases they use and ones they never use. A fitness coach who says 'let's get after it' every video has a signature. Note it. A brand that avoids the word 'cheap' has a rule. Note that too.",
  },
  {
    num: "04",
    title: "Define their audience",
    body: "Who are they speaking to? Beginners or experts? B2B or B2C? Someone scrolling TikTok or someone researching YouTube? The audience shapes how the script should land.",
  },
  {
    num: "05",
    title: "Save the profile and reuse it",
    body: "Document everything in one place. Every time you write a new script for that client, pull up the profile first. If you use Scribtly, save it once and the platform applies it automatically every time you generate a script.",
  },
];

const mistakes = [
  {
    title: "Writing how you talk, not how they talk",
    body: "Your default writing voice will creep in unless you actively override it. The profile is your check.",
  },
  {
    title: "Using the same tone across all platforms",
    body: "A LinkedIn video and a TikTok from the same client need different energy. The voice stays consistent; the format adjusts.",
  },
  {
    title: "Skipping the research phase",
    body: "One quick look at a client's page is not enough. Read comments, check their DMs if shared, and notice what their audience responds to.",
  },
  {
    title: "Ignoring what the client does not say",
    body: "Voice includes the things a client actively avoids. A premium brand might never say 'cheap'. A children's brand might never use slang. These are as important as what they do say.",
  },
  {
    title: "Re-explaining voice on every new script",
    body: "If you are pasting the same voice notes into ChatGPT at the start of every session, you are wasting time. Save the profile and reference it directly.",
  },
];

const faqs = [
  {
    q: "What is a client voice profile?",
    a: "A client voice profile is a documented summary of how a client communicates — their tone, pace, vocabulary, key phrases, audience, platform style, and things they never say. It acts as a reference you use every time you write scripts for that client.",
  },
  {
    q: "How do I capture a client's voice if they have no existing content?",
    a: "If a client has no videos, ask them to record a short voice note explaining their business. Listen to how they talk, not what they say. You can also run a brief questionnaire covering tone, audience, examples of brands they admire, and phrases they want to avoid.",
  },
  {
    q: "How do you stop AI-generated scripts sounding generic?",
    a: "The main reason AI scripts sound generic is because the prompt lacks voice context. Instead of just describing the topic, include the client's tone, typical sentence length, phrases they use, their audience, and a content example. Tools like Scribtly let you save that context once so it is applied automatically every time.",
  },
  {
    q: "How long does it take to build a client voice profile?",
    a: "A working voice profile takes about 20 to 30 minutes to build from scratch. You can refine it after the first script review. Once it exists, it saves that time on every future script.",
  },
  {
    q: "Can I use the same voice profile across multiple platforms?",
    a: "You can use the same core voice profile, but the script structure should change by platform. A TikTok hook is shorter and punchier than a YouTube intro. The voice stays consistent; the format adapts.",
  },
];

export default function BlogPost() {
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
          style={{
            borderColor: "var(--border)",
            background: "rgba(253,250,246,0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
              Scribtly
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
              <Link href="/pricing" className="hover:opacity-70 transition-opacity">Pricing</Link>
            </div>
            <Link
              href="/signup"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try free
            </Link>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>How to Write Scripts in a Client&apos;s Voice</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-10 pb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
          >
            Script Writing
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            How to Write Scripts in a Client&apos;s Voice
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)", maxWidth: "620px" }}>
            The biggest complaint clients have about freelance scripts is that they sound like someone else wrote them. Here is how to fix that — and how to make it repeatable across every script you deliver.
          </p>

          {/* Soft CTA */}
          <div
            className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                Save your client&apos;s voice once. Generate scripts in seconds.
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Scribtly applies your client profile to every script automatically.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white whitespace-nowrap transition-all hover:opacity-90 shrink-0"
              style={{ background: "var(--accent)" }}
            >
              Start free
              <ArrowRight size={14} />
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-3xl mx-auto px-6 pb-24">

          {/* Section 1: The problem */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              The problem with most client scripts
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              When a client watches a video script you wrote, the first thing they should think is: <em>that sounds like me.</em> Not <em>that sounds like a copywriter</em> and definitely not <em>that sounds like ChatGPT.</em>
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              The reason most scripts fail this test is not bad writing. It is that the writer did not start from the client&apos;s voice. They started from their own instincts, wrote something technically correct, and hoped the client would go with it.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Voice is the difference between a script a client will read comfortably on camera and a script they will stumble through because it does not sound like anything they would say. Your job as a script writer is not just to write well — it is to disappear into the client&apos;s voice.
            </p>
          </section>

          {/* Section 2: What client voice actually is */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What &quot;client voice&quot; actually means
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Client voice is not just tone. It is the full picture of how someone communicates — the texture of their language, not just the mood.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { label: "Tone", desc: "Warm, direct, energetic, dry, authoritative, casual — how they come across emotionally" },
                { label: "Pace", desc: "Do they speak in short punchy sentences or longer flowing ones? Fast or deliberate?" },
                { label: "Vocabulary", desc: "The specific words and phrases they actually use — and the ones they never use" },
                { label: "Audience", desc: "Who they are speaking to and the assumed knowledge level of that person" },
                { label: "Platform energy", desc: "LinkedIn requires different energy to TikTok, even from the same person" },
                { label: "Brand rules", desc: "What the brand will not say — avoiding hype, guarantees, certain comparisons" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              When you understand all six of these dimensions for a client, you stop writing scripts. You start writing <em>their</em> scripts.
            </p>
          </section>

          {/* Section 3: How to capture voice */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              How to capture a client&apos;s voice in five steps
            </h2>
            <div className="flex flex-col gap-5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
                >
                  <p className="text-3xl font-bold mb-3 leading-none" style={{ color: "rgba(224,120,48,0.2)" }}>
                    {step.num}
                  </p>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Voice profile template */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What a client voice profile looks like in practice
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Here is an example of a simple voice profile for a hypothetical fitness coaching client. This is the kind of document you would build once and reference for every script.
            </p>
            <div
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>
                Example client voice profile
              </p>
              <div className="flex flex-col gap-4 text-sm">
                {[
                  { field: "Client", value: "Marcus — online fitness coach for busy professionals" },
                  { field: "Tone", value: "Energetic, no-nonsense, encouraging — like a coach who respects your time" },
                  { field: "Pace", value: "Medium-fast. Short sentences. No waffle." },
                  { field: "Signature phrases", value: '"Let\'s get after it", "no excuses", "what you do in 30 minutes matters"' },
                  { field: "Avoid", value: "Long intros, passive language, saying \"journey\", anything that sounds corporate" },
                  { field: "Audience", value: "35–50 year old professionals who feel time-poor. Some gym knowledge but not experts." },
                  { field: "Platform focus", value: "Instagram Reels and YouTube Shorts. Fast-paced. Hook in first 3 seconds." },
                  { field: "CTA style", value: "Direct and specific. \"Follow for daily tips\" or \"drop your question below\" — not vague." },
                ].map((row) => (
                  <div key={row.field} className="grid grid-cols-3 gap-4 items-start">
                    <p className="font-semibold col-span-1" style={{ color: "var(--text-primary)" }}>{row.field}</p>
                    <p className="col-span-2" style={{ color: "var(--text-muted)" }}>{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-base leading-relaxed mt-6" style={{ color: "var(--text-muted)" }}>
              With a profile like this, every script you write for Marcus starts from his world — not from a blank page or a generic prompt. You know what he would say and what he would never say before you write a single line.
            </p>
          </section>

          {/* Mid CTA */}
          <div
            className="rounded-2xl border p-8 mb-14 text-center"
            style={{ background: "var(--dark)", borderColor: "transparent" }}
          >
            <p className="text-white font-bold text-xl mb-3">
              Stop re-explaining your client&apos;s voice every time
            </p>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Scribtly lets you save a client&apos;s tone, audience, platform, phrases, and rules once. Every script you generate pulls from that profile automatically — no re-briefing, no generic output.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Generate your first client script free
              <ArrowRight size={15} />
            </Link>
            <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              No credit card required. 5 free scripts to start.
            </p>
          </div>

          {/* Section 5: Writing the script */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Using the voice profile to write the script
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Once you have a profile, the script writing process changes. You are no longer asking <em>how should I write this?</em> You are asking <em>how would Marcus write this?</em>
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Before you write anything, re-read the profile. Specifically look at the tone markers and the avoid list. Let those anchor your choices as you go.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Then draft fast. Get the idea down in the client&apos;s rhythm. You can refine later. The goal in the first draft is to stay inside their voice rather than produce perfect prose.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Once you have a draft, read it aloud imagining the client is saying it. If anything sounds like something <em>you</em> would say rather than them, flag it and rewrite it using their vocabulary.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The read-aloud test catches the most obvious voice breaks. If a line makes you think &ldquo;Marcus would never say that&rdquo; — rewrite it.
            </p>
          </section>

          {/* Section 6: Where Scribtly fits */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              How Scribtly speeds up this workflow
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              The manual version of this process works. But it takes time. And the bottleneck is always the same: you have to re-brief the voice context every time you open a new script.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              If you are using ChatGPT directly, that means pasting your voice notes into the prompt every single session. If you are writing manually, it means re-reading the profile and mentally translating it into your draft.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              <Link href="/" className="font-semibold underline" style={{ color: "var(--accent)" }}>Scribtly</Link> is built to solve exactly this. You save a client&apos;s voice profile once — their tone, audience, platform, signature phrases, and rules. Then every time you generate a script for that client, the profile is applied automatically. The script comes out sounding like them, not like a generic prompt.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              You also choose the platform — YouTube, TikTok, Instagram Reels, LinkedIn, podcast, or video ads — and Scribtly formats the script with the right structure for that format. Hook, intro, body, CTA, and B-roll notes where relevant.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Save a client profile once, use it on every script",
                "Generate YouTube, TikTok, Reels, LinkedIn, and podcast scripts",
                "Scripts come structured with hooks, body sections, and CTAs",
                "Organised by client so nothing gets lost",
                "First draft in under 60 seconds",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Mistakes */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Common mistakes to avoid
            </h2>
            <div className="flex flex-col gap-4">
              {mistakes.map((m) => (
                <div
                  key={m.title}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{m.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{m.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal link section */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Related resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "YouTube Script Generator", href: "/youtube-script-generator", desc: "Generate platform-native YouTube scripts in your client's voice" },
                { label: "TikTok Script Generator", href: "/tiktok-script-generator", desc: "Short-form scripts with hooks built for TikTok" },
                { label: "Instagram Reels Script Generator", href: "/reels-script-generator", desc: "Reels-ready scripts with hooks, pacing, and CTAs" },
                { label: "AI Script Writer for Freelancers", href: "/for-freelancers", desc: "How Scribtly helps freelance writers deliver more client work" },
                { label: "AI Script Writer for Agencies", href: "/for-agencies", desc: "Scale script production across multiple clients" },
                { label: "Video Script Template", href: "/templates/video-script-template", desc: "A free template to structure any video script" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border p-5 hover:opacity-80 transition-opacity block"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="text-sm font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    {link.label}
                    <ArrowRight size={12} style={{ color: "var(--accent)" }} />
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>{faq.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section
            className="rounded-2xl p-8 text-center"
            style={{ background: "var(--bg-subtle)", border: `1px solid var(--border)` }}
          >
            <p className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Ready to write your next client script?
            </p>
            <p className="text-sm leading-relaxed mb-6 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
              Save your client&apos;s voice once in Scribtly and generate platform-native scripts in under 60 seconds. No blank page. No re-briefing. No generic AI output.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free — no card required
              <ArrowRight size={15} />
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
          <div
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Link href="/" className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Scribtly</Link>
            <div className="flex items-center gap-5">
              <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
              <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
              <Link href="/pricing" className="hover:opacity-70 transition-opacity">Pricing</Link>
              <Link href="/for-freelancers" className="hover:opacity-70 transition-opacity">For Freelancers</Link>
            </div>
            <span>© 2026 Scribtly. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}

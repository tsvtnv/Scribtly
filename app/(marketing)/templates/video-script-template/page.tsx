import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, FileText, Zap, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Video Script Template for Any Platform | Scribtly",
  description:
    "A free video script template covering hook, setup, body, CTA and outro — works for YouTube, TikTok, Reels and LinkedIn. Generate a full draft in under 60 seconds with Scribtly.",
  openGraph: {
    title: "Free Video Script Template for Any Platform | Scribtly",
    description:
      "A free video script template covering hook, setup, body, CTA and outro — works for YouTube, TikTok, Reels and LinkedIn.",
    url: "https://scribtly.com/templates/video-script-template",
    siteName: "Scribtly",
    type: "website",
  },
  alternates: {
    canonical: "https://scribtly.com/templates/video-script-template",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
        { "@type": "ListItem", position: 2, name: "Templates", item: "https://scribtly.com/templates" },
        { "@type": "ListItem", position: 3, name: "Video Script Template", item: "https://scribtly.com/templates/video-script-template" },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Use a Video Script Template",
      description: "A step-by-step guide to filling in a video script template for YouTube, TikTok, Reels, or LinkedIn.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Write your hook", text: "Write 1–2 sentences that grab attention in the first 3–5 seconds. Start with a question, bold claim, or visual instruction." },
        { "@type": "HowToStep", position: 2, name: "Add your setup", text: "In 2–3 sentences, explain what the video is about and who it is for." },
        { "@type": "HowToStep", position: 3, name: "Deliver the main content", text: "Cover your 3–5 key points in plain, conversational language." },
        { "@type": "HowToStep", position: 4, name: "Write a clear CTA", text: "Tell viewers exactly what to do next — subscribe, comment, click the link, book a call." },
        { "@type": "HowToStep", position: 5, name: "Add your outro", text: "Close the video naturally. Tease the next video or reinforce the CTA." },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a video script template?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A video script template is a reusable structure that tells you what to include in each section of a video — hook, setup, main content, CTA, and outro. It removes the blank-page problem and keeps your delivery consistent.",
          },
        },
        {
          "@type": "Question",
          name: "Does one template work for YouTube, TikTok, and Reels?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The core 5-section structure works across all platforms. The main difference is length and pacing — short-form scripts compress the hook and skip a lengthy setup, while long-form YouTube scripts give you more space for each section.",
          },
        },
        {
          "@type": "Question",
          name: "How long should a video script be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A TikTok or Reels script is typically 60–150 words. A YouTube tutorial might run 600–1,500 words. Speaking pace is roughly 130–150 words per minute, so use that as your guide.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this template for client work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The template works well for client content. The key difference when writing for a client is that you need to match their voice and tone in each section. Scribtly lets you save a client voice profile so every generated script already sounds like them.",
          },
        },
        {
          "@type": "Question",
          name: "How do I write a hook that actually works?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The strongest hooks either ask a direct question, make a bold claim, or drop straight into a visual instruction. Avoid slow intros. If your first sentence starts with 'Hey guys, welcome back', rewrite it.",
          },
        },
        {
          "@type": "Question",
          name: "How is Scribtly different from a blank template?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A blank template gives you the structure. Scribtly fills it in — generating a complete draft in your client's saved voice, for the right platform, in under 60 seconds. You edit from a finished draft instead of writing from scratch.",
          },
        },
      ],
    },
  ],
};

const templateSections = [
  {
    label: "Hook",
    time: "0–5 seconds",
    description: "Grab attention immediately. No slow intro.",
    placeholder: "Write 1–2 sentences. Start with a question, bold claim, or jump straight into value.",
    examples: [
      "The reason your video scripts aren't converting? You're starting in the wrong place.",
      "Most freelancers lose clients before they send a single script. Here's why.",
    ],
  },
  {
    label: "Setup",
    time: "5–20 seconds",
    description: "Tell viewers what they'll get and why they should keep watching.",
    placeholder: "In 2–3 sentences, explain the topic and who this video is for.",
    examples: [
      "In this video I'm going to show you the exact 5-section script structure I use for every client.",
      "This works whether you're writing YouTube tutorials, TikTok hooks, or LinkedIn video scripts.",
    ],
  },
  {
    label: "Main Content",
    time: "Middle of the video",
    description: "Deliver the core value. Keep each point tight and conversational.",
    placeholder: "Cover 3–5 key points. Write in short paragraphs. Speak, don't lecture.",
    examples: [
      "Point 1: [topic] — explain it in 2–3 sentences\nPoint 2: [topic] — keep it simple\nPoint 3: [topic] — use a real example if you can",
    ],
  },
  {
    label: "CTA",
    time: "Before the outro",
    description: "Tell viewers exactly what to do next. Be specific.",
    placeholder: "Write one clear action. Subscribe, comment, click the link, book a call.",
    examples: [
      "If this helped you, subscribe — I post new scripts and content strategies every week.",
      "Drop a comment with your biggest script challenge and I'll reply.",
    ],
  },
  {
    label: "Outro",
    time: "Final 5–10 seconds",
    description: "Close naturally. Reinforce the CTA or tease what's next.",
    placeholder: "Wrap up in 1–2 sentences. Don't trail off.",
    examples: [
      "I'll see you in the next one — next week I'm covering how to write hooks that don't get skipped.",
    ],
  },
];

const shortFormTemplate = `HOOK (0–3 sec)
[Bold claim or question — no intro, no 'hey guys']

CONTEXT (3–10 sec)
[What this is about and why it matters to them]

MAIN POINT (10–45 sec)
[Step 1 or key insight]
[Step 2 or supporting point]
[Optional: quick example or demo]

CTA (final 5 sec)
[One clear action: follow, comment, click link in bio]`;

const longFormTemplate = `HOOK (0–15 sec)
[Open with a bold claim, question, or stat]
[Tell them what they'll learn and why it matters]

INTRO / CREDIBILITY (15–60 sec)
[Brief context about who you are and why you're qualified]
[Reinforce the promise of the video]

MAIN SECTION 1
[Point headline]
[2–4 sentences of explanation]
[Example or proof if available]

MAIN SECTION 2
[Point headline]
[2–4 sentences of explanation]
[Example or proof if available]

MAIN SECTION 3
[Point headline]
[2–4 sentences of explanation]
[Transition to next section]

[Add more sections as needed]

RECAP (optional)
[Summarise the 3 key points in 3 sentences]

CTA
[Subscribe prompt]
[Comment prompt — ask a specific question]
[Link mention if relevant]

OUTRO
[Tease next video]
[Sign off naturally]`;

const mistakes = [
  {
    mistake: "Starting too slow",
    fix: "Cut the first 10 seconds of your script. Most intros are filler. Start at the first sentence that actually gives value.",
  },
  {
    mistake: "Writing to read, not to speak",
    fix: "Read your script aloud before filming. If you stumble over a sentence, rewrite it. Video scripts should sound natural, not formal.",
  },
  {
    mistake: "Burying the hook",
    fix: "Your hook should be the very first thing — not the third. Move it to line one.",
  },
  {
    mistake: "Vague CTAs",
    fix: "Don't say 'check the link below.' Say 'Click the link below to download the free template.' Specificity converts better.",
  },
  {
    mistake: "One template for every platform",
    fix: "TikTok hooks and YouTube hooks are different. The pacing is different. Adapt the template for each platform instead of copying the same script everywhere.",
  },
];

export default function VideoScriptTemplatePage() {
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
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={120} height={30} className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Templates", href: "/templates" },
              { label: "Pricing", href: "/pricing" },
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
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90 text-white"
            style={{ background: "var(--accent)" }}
          >
            Try free
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/templates" className="hover:underline">Templates</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Video Script Template</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          <FileText size={12} />
          Free Template
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: "var(--text-primary)" }}>
          Free Video Script Template
          <br />
          <span style={{ color: "var(--accent)" }}>That Works Across Every Platform</span>
        </h1>

        <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-muted)" }}>
          A practical script structure for YouTube, TikTok, Instagram Reels, LinkedIn video, and everything in between.
          Copy the template, fill in your content, and never start from a blank page again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Generate a script in 60 seconds
            <ArrowRight size={16} />
          </Link>
          <a
            href="#template"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:opacity-80"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            Jump to the template
          </a>
        </div>

        <div className="flex flex-wrap gap-5">
          {[
            "Works for YouTube, TikTok, Reels and LinkedIn",
            "5-section structure used by professional writers",
            "Free to use — no sign-up needed for the template",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <CheckCircle size={15} style={{ color: "var(--accent)" }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Why structure matters */}
      <section
        className="border-y px-6 py-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
            Why every video needs a script structure
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Most videos that underperform share the same problem: they have no structure. The creator knows their topic
            but jumps around, loses viewers before the main point, and ends without a clear CTA.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            A script template solves this. It tells you what to put in each section, in what order, and roughly how
            long to spend on each one. The result is a video that feels purposeful — because it is.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {[
              { icon: Clock, title: "Save writing time", body: "A template cuts your scripting time by giving you a starting structure instead of a blank page." },
              { icon: Users, title: "Write for clients faster", body: "When you have a template, switching between clients means changing the voice, not rebuilding the structure." },
              { icon: Zap, title: "More consistent output", body: "Templates make it easier to keep quality consistent across different platforms and content types." },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(224,120,48,0.12)" }}
                >
                  <card.icon size={18} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 5-section structure */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          The 5 sections every video script needs
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          This structure works for short-form and long-form content. The proportions change — a 60-second TikTok compresses
          each section, a 10-minute YouTube video gives each one more room — but the order stays the same.
        </p>

        <div className="flex flex-col gap-6">
          {templateSections.map((section, i) => (
            <div
              key={section.label}
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 mt-0.5"
                  style={{ background: "var(--accent)" }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{section.label}</h3>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)", background: "rgba(224,120,48,0.08)" }}
                    >
                      {section.time}
                    </span>
                  </div>
                  <p className="text-base mb-3" style={{ color: "var(--text-muted)" }}>{section.description}</p>
                  <div
                    className="rounded-xl border p-4 mb-4 text-sm italic"
                    style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-muted)" }}
                  >
                    {section.placeholder}
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "var(--accent)" }}>Examples</p>
                    <div className="flex flex-col gap-2">
                      {section.examples.map((ex, j) => (
                        <p key={j} className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                          "{ex}"
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mid CTA */}
      <section
        className="px-6 py-14 border-y"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Want the structure filled in automatically?
          </h2>
          <p className="text-base mb-6" style={{ color: "var(--text-muted)" }}>
            Scribtly generates a complete video script in your client&apos;s saved voice — hook, body, CTA and all — in under 60 seconds.
            No prompting. No re-explaining the tone every time.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free — no card required
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* The actual templates */}
      <section id="template" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          The video script templates
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          Copy and use these templates directly. Both are designed to be edited fast — change the placeholders and you have a usable first draft.
        </p>

        {/* Short-form */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Short-form video template</h3>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium border"
              style={{ borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)", background: "rgba(224,120,48,0.08)" }}
            >
              TikTok · Reels · YouTube Shorts
            </span>
          </div>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Ideal for 30–90 second videos. Every word counts. Skip the intro — start at the hook.
          </p>
          <pre
            className="rounded-2xl border p-6 text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-subtle)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {shortFormTemplate}
          </pre>
        </div>

        {/* Long-form */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Long-form video template</h3>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium border"
              style={{ borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)", background: "rgba(224,120,48,0.08)" }}
            >
              YouTube · Podcasts · LinkedIn video
            </span>
          </div>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            For videos of 5–20 minutes. Use the section headers as on-screen chapters or teleprompter anchors.
          </p>
          <pre
            className="rounded-2xl border p-6 text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-subtle)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {longFormTemplate}
          </pre>
        </div>
      </section>

      {/* Using the template for client work */}
      <section
        className="border-t px-6 py-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
            How to use this template for client work
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            If you&apos;re writing scripts for clients — whether you&apos;re a <Link href="/use-cases/freelancers" className="underline" style={{ color: "var(--accent)" }}>freelance script writer</Link>,{" "}
            <Link href="/use-cases/social-media-managers" className="underline" style={{ color: "var(--accent)" }}>social media manager</Link>, or{" "}
            <Link href="/use-cases/agencies" className="underline" style={{ color: "var(--accent)" }}>content agency</Link> — the structure stays the same but the voice changes for every client.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            That&apos;s the part that slows most freelancers down: re-learning each client&apos;s tone every time they sit down to write.
            The template handles the structure. But matching the voice is still manual work — unless you&apos;re using a tool
            that saves it for you.
          </p>

          <div className="rounded-2xl border p-7" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              A faster workflow for client scripts
            </p>
            <div className="flex flex-col gap-4">
              {[
                { num: "01", text: "Use this template to understand the structure." },
                { num: "02", text: "Save your client's voice, niche, tone and audience once in Scribtly." },
                { num: "03", text: "Pick the platform and script type — YouTube, TikTok, Reels, LinkedIn, ad script." },
                { num: "04", text: "Generate a complete first draft in under 60 seconds — already in your client's voice." },
                { num: "05", text: "Edit, refine, and deliver. No more re-explaining the tone every session." },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <span className="text-2xl font-bold leading-none" style={{ color: "rgba(224,120,48,0.2)" }}>{step.num}</span>
                  <p className="text-base pt-1" style={{ color: "var(--text-muted)" }}>{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Save your first client voice profile free
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          5 script writing mistakes to avoid
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          A good template helps, but there are some habits that will undermine even the best structure.
        </p>
        <div className="flex flex-col gap-5">
          {mistakes.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border p-6 flex gap-5"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                style={{ background: "var(--accent)" }}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1.5" style={{ color: "var(--text-primary)" }}>
                  {m.mistake}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{m.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links section */}
      <section
        className="border-y px-6 py-14"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            More script templates and tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "YouTube Script Template", href: "/templates/youtube-script-template" },
              { label: "TikTok Script Template", href: "/templates/tiktok-script-template" },
              { label: "Instagram Reels Script Template", href: "/templates/reels-script-template" },
              { label: "Client Voice Profile Template", href: "/templates/client-voice-profile-template" },
              { label: "Script Brief Template", href: "/templates/script-brief-template" },
              { label: "Video Ad Script Template", href: "/templates/video-ad-script-template" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-all hover:opacity-70"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
              >
                <FileText size={15} style={{ color: "var(--accent)" }} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-6">
          {[
            {
              q: "What is a video script template?",
              a: "A video script template is a reusable structure that tells you what to include in each section — hook, setup, main content, CTA, and outro. It removes the blank-page problem and keeps your delivery consistent across every video you make.",
            },
            {
              q: "Does one template work for YouTube, TikTok, and Reels?",
              a: "The core 5-section structure works across all platforms. The main difference is length and pacing. Short-form scripts compress the hook and skip a lengthy setup. Long-form YouTube scripts give more space to each section. The templates above show both versions.",
            },
            {
              q: "How long should a video script be?",
              a: "A TikTok or Reels script is typically 60–150 words. A YouTube tutorial might run 600–1,500 words. Speaking pace is roughly 130–150 words per minute, so use that as your guide for any target video length.",
            },
            {
              q: "Can I use this template for client work?",
              a: "Yes. The structure works well for client content. The key difference is that you need to match the client's voice in each section — not just the structure. Scribtly lets you save a client voice profile so every generated script already sounds like them instead of generic AI.",
            },
            {
              q: "How do I write a hook that actually works?",
              a: "The strongest hooks either ask a direct question, make a bold claim, or drop straight into a visual instruction. Avoid slow intros. If your first sentence starts with 'Hey guys, welcome back', rewrite it. You have 3 seconds.",
            },
            {
              q: "How is Scribtly different from just using this template?",
              a: "A blank template gives you the structure. Scribtly fills it in — generating a complete draft in your client's saved voice, for the right platform, in under 60 seconds. You edit from a finished draft instead of writing from scratch. The result is faster delivery and more consistent output across every client.",
            },
          ].map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-28" style={{ background: "var(--dark)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">
            Stop filling in templates manually.
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly generates platform-native video scripts in your client&apos;s saved voice in under 60 seconds.
            No more blank pages, no more re-explaining tone, no more slow script days.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free — 5 scripts included
            <ArrowRight size={16} />
          </Link>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No credit card required. Cancel any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/templates" className="hover:underline">Templates</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/compare" className="hover:underline">Compare</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

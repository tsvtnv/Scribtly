import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronRight, Copy, FileText, Clock, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Script Template: Structure That Gets Views",
  description:
    "A proven YouTube script template used by creators and freelancers. Copy the structure, fill it in, and publish faster.",
  openGraph: {
    title: "YouTube Script Template: Structure That Gets Views",
    description:
      "A proven YouTube script template used by creators and freelancers. Copy the structure, fill it in, and publish faster.",
    type: "article",
  },
};

const templateSections = [
  {
    label: "HOOK",
    timing: "0:00 – 0:15",
    color: "#E07830",
    description: "Open with a bold claim, surprising fact, or direct question. You have 3 seconds to earn the next 30.",
    example:
      '"Most creators never break 1,000 views — and it\'s not the algorithm\'s fault."',
    tips: [
      "Start with the pay-off, not the build-up.",
      "Avoid long intros before the hook.",
      "A question hook works best when the viewer already feels the pain.",
    ],
  },
  {
    label: "INTRO",
    timing: "0:15 – 0:45",
    color: "#C4652A",
    description: "State what the video covers and why the viewer should stay. Keep it to 2–3 sentences.",
    example:
      '"In this video, I\'m covering [topic] — so you can [outcome] without [pain point]."',
    tips: [
      "Name the outcome, not just the topic.",
      "New viewers: include a one-line credibility signal.",
      "Avoid long self-introductions for returning subscribers.",
    ],
  },
  {
    label: "CONTEXT",
    timing: "0:45 – 2:00",
    color: "#A8571F",
    description: "Set up the problem or situation. Establish why this topic matters right now.",
    example:
      '"When I first started [topic], I spent months doing [wrong approach]. Here\'s what actually works."',
    tips: [
      "Keep this tight — viewers are still deciding whether to stay.",
      "Acknowledge the viewer's situation before offering the fix.",
      "One or two sentences of personal experience goes a long way.",
    ],
  },
  {
    label: "MAIN BODY",
    timing: "2:00 – end",
    color: "#7C6B58",
    description: "Your 3–7 main points. Each should have a clear heading, a supporting example, and one takeaway.",
    example: "Point 1: [Heading]\n→ Supporting detail or example.\n→ One clear takeaway.\n\nPoint 2: [Heading]\n→ ...",
    tips: [
      "Keep each point focused. One idea per section.",
      "Add a soft CTA (like or subscribe) after point 2 or 3.",
      "Use pattern interrupts (questions, B-roll, graphics) to hold attention.",
    ],
  },
  {
    label: "SUMMARY",
    timing: "Final 60–90 seconds",
    color: "#5A4A3A",
    description: "Recap the main points in 3–4 sentences. Reinforce the core message.",
    example: '"So to recap: [point 1], [point 2], and [point 3]. The main thing to remember is [core message]."',
    tips: [
      "Mirror the language from your hook.",
      "Tease a follow-up video to increase session time.",
      "Avoid just repeating your headings — add a synthesis line.",
    ],
  },
  {
    label: "CALL TO ACTION",
    timing: "Last 30 seconds",
    color: "#E07830",
    description: "Tell the viewer exactly what to do next. One clear action only.",
    example: '"Watch [next video] next — I\'ve linked it here. And if you found this useful, subscribe so you don\'t miss [next topic]."',
    tips: [
      "One CTA is better than three. Pick the most important one.",
      "Link to a related video to boost watch time.",
      "Don't ask viewers to do five things at once.",
    ],
  },
];

const faqs = [
  {
    q: "How long should a YouTube script be?",
    a: "It depends on the format. A 10-minute tutorial typically needs around 1,500–2,000 words. A 5-minute video is closer to 750–1,000 words. Aim for around 130–150 words per minute of video. If your video naturally runs shorter, that's fine — padding for length hurts retention.",
  },
  {
    q: "Do I need to script every word or just bullet points?",
    a: "Both work. Full scripts give you more control and consistency, especially for clients. Bullet-point scripts are faster and can feel more natural on camera. Many creators write full scripts for the hook and CTA, then bullet points for the main body. Use what keeps your delivery natural.",
  },
  {
    q: "What's the most important part of a YouTube script?",
    a: "The hook. If the first 15 seconds don't hold attention, the rest doesn't matter. Spend disproportionate time on your opening. A weak hook with strong content still fails. A strong hook with decent content will outperform the reverse almost every time.",
  },
  {
    q: "Can I reuse this template for YouTube Shorts?",
    a: "Not directly. Shorts need a different structure — the hook is the entire video in many cases, and there's rarely room for a context section. See our YouTube Shorts Script Generator for a more appropriate format.",
  },
  {
    q: "How do I write a script that doesn't sound robotic?",
    a: "Write how you talk, not how you write. Read it out loud before filming. If you stumble, the sentence is too complicated. Contractions help ('you're' instead of 'you are'). Short sentences read more naturally than long compound ones. And avoid filler phrases like 'In today's video, we're going to be looking at...' — just start.",
  },
  {
    q: "Does Scribtly write YouTube scripts for me?",
    a: "Yes. Scribtly generates platform-native YouTube scripts based on your topic, client brief, and saved brand voice. You get a full draft — hook, body, CTA — in under 60 seconds. You can edit it, adjust the tone, and export it. It's built for freelancers, content creators, and agencies producing scripts for multiple clients.",
  },
];

const mistakes = [
  {
    title: "Starting with 'In today's video...'",
    fix: "Cut to the hook. Your intro is not your hook. Start with the most compelling thing you can say.",
  },
  {
    title: "No clear CTA",
    fix: "Every video needs one clear ask. Pick the most important one — subscribe, watch next video, or visit a link — and stick to it.",
  },
  {
    title: "Burying the value",
    fix: "State what the viewer gets from this video in the first 30 seconds. Don't make them wait.",
  },
  {
    title: "Padding for length",
    fix: "Cut anything that doesn't serve the viewer. A sharp 6-minute video outperforms a padded 12-minute one every time.",
  },
  {
    title: "Writing for reading, not speaking",
    fix: "Read every sentence out loud before filming. If it sounds unnatural, rewrite it.",
  },
];

export default function YouTubeScriptTemplatePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "YouTube Script Template: Structure That Gets Views",
        description:
          "A proven YouTube script template used by creators and freelancers. Copy the structure, fill it in, and publish faster.",
        author: { "@type": "Organization", name: "Scribtly" },
        publisher: { "@type": "Organization", name: "Scribtly", url: "https://scribtly.com" },
        url: "https://scribtly.com/templates/youtube-script-template",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
          { "@type": "ListItem", position: 2, name: "Templates", item: "https://scribtly.com/templates" },
          {
            "@type": "ListItem",
            position: 3,
            name: "YouTube Script Template",
            item: "https://scribtly.com/templates/youtube-script-template",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

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
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
            Scribtly
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/#features" className="hover:opacity-60 transition-opacity">Features</Link>
            <Link href="/blog" className="hover:opacity-60 transition-opacity">Blog</Link>
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
      <div className="max-w-5xl mx-auto px-6 pt-5 pb-0">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70">Home</Link>
          <ChevronRight size={12} />
          <Link href="/templates" className="hover:opacity-70">Templates</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--text-primary)" }}>YouTube Script Template</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-16">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
          >
            <FileText size={11} />
            Free template
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            YouTube Script Template
            <br />
            <span style={{ color: "var(--accent)" }}>Structure That Gets Views</span>
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)", maxWidth: "560px" }}>
            A practical script structure used by creators and freelance script writers. Copy the sections,
            fill in your content, and spend your energy on the ideas — not on figuring out the format.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Generate a script from this template
              <ArrowRight size={16} />
            </Link>
            <a
              href="#template"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              Jump to template
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="flex flex-wrap gap-5">
            {[
              { icon: Clock, text: "Works for 5–30 min videos" },
              { icon: Users, text: "Used by creators and freelancers" },
              { icon: Copy, text: "Copy and reuse anytime" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <Icon size={14} style={{ color: "var(--accent)" }} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Template Covers */}
      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                What's covered
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Every section a YouTube video needs
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                This template covers the full structure from hook to outro. It's built around how successful
                YouTube videos actually hold attention — not just a list of generic advice.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Whether you're writing for yourself or for a client, having a consistent structure
                means less time on formatting and more time on the ideas that make the video worth watching.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {["Hook (first 15 seconds)", "Intro and context", "Main body (3–7 points)", "Mid-video CTA", "Summary", "Final call to action", "B-roll notes"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-primary)" }}>
                  <CheckCircle size={16} style={{ color: "var(--accent)" }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Template */}
      <section id="template" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            The template
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            YouTube Script Template — Section by Section
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Copy each section, fill in the brackets, and build your script from the ground up.
            Timings are approximate and will vary by video length.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {templateSections.map((section) => (
            <div
              key={section.label}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              {/* Section header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: "var(--bg-subtle)", borderBottom: `1px solid var(--border)` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md text-white"
                    style={{ background: section.color }}
                  >
                    {section.label}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    {section.timing}
                  </span>
                </div>
              </div>

              {/* Section body */}
              <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-primary)" }}>
                    {section.description}
                  </p>
                  {/* Example */}
                  <div
                    className="rounded-xl p-4 text-sm font-mono leading-relaxed"
                    style={{ background: "var(--bg-subtle)", color: "var(--text-muted)", whiteSpace: "pre-line" }}
                  >
                    {section.example}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                    Tips
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {section.tips.map((tip) => (
                      <div key={tip} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                        <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* B-Roll Notes block */}
        <div
          className="mt-6 rounded-2xl border p-6"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md text-white" style={{ background: "#7C6B58" }}>
              B-ROLL NOTES
            </span>
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Optional — add for editors</span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            If someone else is editing your video (or you want to prep your own edit), add B-roll notes alongside each section.
          </p>
          <div
            className="rounded-xl p-4 text-sm font-mono leading-relaxed"
            style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}
          >
            {`[0:45] B-roll: Screen recording of dashboard walkthrough\n[2:15] B-roll: Close-up of hands typing\n[4:30] B-roll: Graph showing results`}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="border-y py-14" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Skip the blank page
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Generate a complete YouTube script in under 60 seconds
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Scribtly fills in this template for you. Add your topic, choose the tone, and get a client-ready
            YouTube script with hook, body, and CTA — already structured and ready to edit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free — no card required
              <ArrowRight size={16} />
            </Link>
          </div>
          <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            Start with 5 free scripts. No credit card needed.
          </p>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
            Common mistakes
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Script mistakes that kill retention
          </h2>
          <p className="text-base max-w-xl" style={{ color: "var(--text-muted)" }}>
            These are the most common structure problems that cause viewers to click away — and how to fix them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mistakes.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                ✗ {m.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--text-primary)" }}>Fix: </strong>{m.fix}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Where Scribtly fits */}
      <section className="border-t py-20" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                How Scribtly helps
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
                Stop filling in templates manually
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                This template gives you the structure. Scribtly fills in the content — using your client's
                saved brand voice, tone, and platform preferences.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                Instead of starting from a blank template every time, Scribtly generates a complete first draft
                in under 60 seconds. You edit, tweak, and deliver — without the blank-page stage.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Save a client voice profile once — reuse it for every script",
                  "Get hook, body, and CTA already written for your topic",
                  "Platform-native structure for YouTube, TikTok, Reels, and more",
                  "Keep scripts organised by client and platform",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                    <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                    {point}
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Generate your next script
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Zap,
                  title: "Generate in under 60 seconds",
                  body: "Add your topic and brief. Scribtly outputs a complete first draft with hook, body, and CTA.",
                },
                {
                  icon: Users,
                  title: "Built for client work",
                  body: "Save a client's voice profile once — niche, tone, phrases, audience — and generate scripts that sound like them, not like generic AI.",
                },
                {
                  icon: FileText,
                  title: "Scripts organised by client",
                  body: "Keep all your client scripts in one place. No more digging through Google Docs or ChatGPT history.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border p-6 flex gap-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(224,120,48,0.12)" }}
                  >
                    <Icon size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Templates & Internal Links */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          More templates and script tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "TikTok Script Template", href: "/templates/tiktok-script-template" },
            { label: "Instagram Reels Script Template", href: "/templates/reels-script-template" },
            { label: "Video Script Template", href: "/templates/video-script-template" },
            { label: "YouTube Script Generator", href: "/youtube-script-generator" },
            { label: "TikTok Script Generator", href: "/tiktok-script-generator" },
            { label: "AI Script Writer for Freelancers", href: "/for-freelancers" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm font-medium transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)", background: "var(--bg-subtle)" }}
            >
              {label}
              <ChevronRight size={14} style={{ color: "var(--accent)" }} />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t py-20" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              Frequently asked questions
            </h2>
          </div>

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
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28" style={{ background: "var(--dark)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "rgba(224,120,48,0.8)" }}
          >
            Stop starting from a blank page
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">
            Turn one brief into a client-ready YouTube script in under 60 seconds
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly saves your client's voice once and generates scripts that sound like them — not
            generic AI. Built for freelancers, content creators, and agencies.
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
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/" className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            Scribtly
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:opacity-70">Home</Link>
            <Link href="/blog" className="hover:opacity-70">Blog</Link>
            <Link href="/pricing" className="hover:opacity-70">Pricing</Link>
            <Link href="/signup" className="hover:opacity-70">Sign up free</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

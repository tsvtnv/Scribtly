import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Zap,
  Video,
  Tv2,
  Mic,
  Play,
  Briefcase,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Video Script Template | Scribtly",
  description:
    "A structured video script template for YouTube, TikTok, Reels, LinkedIn, and more. Free to use — or let Scribtly generate a client-ready version in under 60 seconds.",
  openGraph: {
    title: "Free Video Script Template | Scribtly",
    description:
      "A structured video script template for YouTube, TikTok, Reels, LinkedIn, and more. Free to use — or let Scribtly generate a client-ready version in under 60 seconds.",
    url: "https://scribtly.com/video-script-template",
    siteName: "Scribtly",
    type: "website",
  },
  alternates: {
    canonical: "https://scribtly.com/video-script-template",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Free Video Script Template — Structured for Every Platform",
      description:
        "A complete, structured video script template for YouTube, TikTok, Instagram Reels, LinkedIn video, and podcasts.",
      url: "https://scribtly.com/video-script-template",
      author: { "@type": "Organization", name: "Scribtly" },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      datePublished: "2026-06-20",
      dateModified: "2026-06-20",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What should a video script template include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A good video script template includes a hook, an intro that establishes credibility and relevance, a main body with clear sections, a CTA, and optional elements like captions, hashtags, and B-roll notes. The hook is the most critical part — it determines whether viewers stay or scroll.",
          },
        },
        {
          "@type": "Question",
          name: "How long should a video script be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on the platform. TikTok and Instagram Reels scripts are typically 60 to 90 seconds of spoken content. YouTube long-form scripts can run 5 to 20 minutes. LinkedIn video scripts tend to be 60 to 90 seconds. The script should be as long as it needs to be to deliver the value — no longer.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this template for client work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. This template is designed for freelancers, content creators, social media managers, and agencies who write scripts for clients. You can use it as a brief structure, a delivery format, or a starting point before generating the full script in Scribtly.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a script and a content brief?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A content brief outlines the idea, audience, goal, and key messages. A script is the word-for-word or near-word-for-word written version of what will be said on camera. This template covers both: the brief section at the top and the full script structure below it.",
          },
        },
        {
          "@type": "Question",
          name: "How does Scribtly use this template structure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly uses this exact structure internally. When you create a script in Scribtly, it generates a platform-native output with a hook, intro, body sections, CTA, caption, and optional B-roll notes — all written in your saved client voice profile. You get a filled-out version of this template in under 60 seconds.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Video Script Template",
          item: "https://scribtly.com/video-script-template",
        },
      ],
    },
  ],
};

const platforms = [
  {
    icon: Video,
    name: "YouTube",
    hookLength: "0–15 sec",
    totalLength: "5–20 min",
    keySection: "Pattern interrupt in first 15 sec",
    captionNote: "First 2 lines carry the keyword weight",
  },
  {
    icon: Play,
    name: "TikTok",
    hookLength: "0–3 sec",
    totalLength: "30–90 sec",
    keySection: "Visual hook matters as much as the line",
    captionNote: "Short, punchy, hashtag-led",
  },
  {
    icon: Tv2,
    name: "Instagram Reels",
    hookLength: "0–3 sec",
    totalLength: "30–90 sec",
    keySection: "B-roll and text overlays carry half the story",
    captionNote: "Use a hook line and a soft CTA",
  },
  {
    icon: Briefcase,
    name: "LinkedIn Video",
    hookLength: "0–5 sec",
    totalLength: "60–90 sec",
    keySection: "Lead with a bold professional insight",
    captionNote: "Plain text captions, no emoji overdose",
  },
  {
    icon: Mic,
    name: "Podcast",
    hookLength: "0–30 sec",
    totalLength: "20–60 min",
    keySection: "Episode premise must be clear by 60 sec",
    captionNote: "Show notes replace caption field",
  },
];

const mistakes = [
  {
    mistake: "Starting with 'Hey guys, welcome back'",
    fix: "Start with the hook. Save the greeting for after the viewer is already interested.",
  },
  {
    mistake: "Writing a wall of text without section breaks",
    fix: "Break the body into labelled sections. Helps the creator deliver it naturally and helps editors find their cuts.",
  },
  {
    mistake: "No CTA or a vague 'like and subscribe'",
    fix: "Tell the viewer exactly what to do next and why. One specific action per CTA.",
  },
  {
    mistake: "Forgetting the caption when delivering to a client",
    fix: "The caption is part of the script delivery. Include it every time — it saves a round of revisions.",
  },
  {
    mistake: "Writing the hook last",
    fix: "Write the hook first. If you cannot summarise why someone should watch in one sentence, the script is not ready.",
  },
];

const faqs = [
  {
    q: "What should a video script template include?",
    a: "A good video script template includes a hook, an intro that establishes credibility and relevance, a main body with clear sections, a CTA, and optional elements like captions, hashtags, and B-roll notes. The hook is the most critical part — it determines whether viewers stay or scroll.",
  },
  {
    q: "How long should a video script be?",
    a: "It depends on the platform. TikTok and Instagram Reels scripts are typically 60 to 90 seconds of spoken content. YouTube long-form scripts can run 5 to 20 minutes. LinkedIn video scripts tend to be 60 to 90 seconds. The script should be as long as it needs to deliver the value — no longer.",
  },
  {
    q: "Can I use this template for client work?",
    a: "Yes. This template is designed for freelancers, content creators, social media managers, and agencies who write scripts for clients. You can use it as a brief structure, a delivery format, or a starting point before generating the full script in Scribtly.",
  },
  {
    q: "What is the difference between a script and a content brief?",
    a: "A content brief outlines the idea, audience, goal, and key messages. A script is the word-for-word or near-word-for-word written version of what will be said on camera. This template covers both: the brief section at the top and the full script structure below it.",
  },
  {
    q: "How does Scribtly use this template structure?",
    a: "Scribtly uses this exact structure internally. When you create a script, it generates a platform-native output with a hook, intro, body sections, CTA, caption, and optional B-roll notes — all written in your saved client voice profile. You get a filled-out version of this template in under 60 seconds.",
  },
];

export default function VideoScriptTemplatePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Sticky Nav */}
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
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Templates", href: "/video-script-template" },
              { label: "Blog", href: "/blog" },
              { label: "Pricing", href: "/pricing" },
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
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-80 text-white"
            style={{ background: "var(--accent)" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
          style={{
            background: "rgba(224,120,48,0.08)",
            borderColor: "rgba(224,120,48,0.25)",
            color: "var(--accent)",
          }}
        >
          <FileText size={12} />
          Free template — no sign-up required
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          The Video Script Template That{" "}
          <span style={{ color: "var(--accent)" }}>Actually Gets Used</span>
        </h1>

        <p
          className="text-lg leading-relaxed mb-8 mx-auto"
          style={{ color: "var(--text-muted)", maxWidth: "580px" }}
        >
          A structured template for YouTube, TikTok, Instagram Reels, LinkedIn
          video, and podcasts. Copy it, fill it in, and send it to your client —
          or let Scribtly generate the filled-out version in under 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href="#template"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Jump to template
            <ChevronDown size={16} />
          </a>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Generate a script in 60 seconds
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {[
            "YouTube long-form",
            "TikTok & Reels",
            "LinkedIn video",
            "Podcast scripts",
            "Video ads",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <CheckCircle size={14} style={{ color: "var(--accent)" }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* What this template covers */}
      <section
        className="px-6 py-16 border-y"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              What is included
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Every section a video script needs
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Brief block", desc: "Platform, duration, goal, audience" },
              { label: "Hook", desc: "The opening line that stops the scroll" },
              { label: "Intro", desc: "Who this is for and what they will get" },
              { label: "Body sections", desc: "Up to 5 numbered content blocks" },
              { label: "CTA", desc: "Clear next action for the viewer" },
              { label: "Caption", desc: "Hook line, body, CTA in one block" },
              { label: "Hashtags", desc: "Platform-appropriate tag suggestions" },
              { label: "B-roll notes", desc: "Optional shot list for the editor" },
              { label: "Revision notes", desc: "Space for client feedback rounds" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Template */}
      <section id="template" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              The template
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Video Script Template — Copy and Use
            </h2>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              Fill in every field before you start writing. A complete brief saves
              you a revision round.
            </p>
          </div>

          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Template header bar */}
            <div
              className="flex items-center gap-2 px-5 py-3 border-b"
              style={{ background: "#F0EAE2", borderColor: "var(--border)" }}
            >
              <FileText size={14} style={{ color: "var(--accent)" }} />
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                video-script-template.txt
              </span>
            </div>

            <div
              className="p-6 md:p-8 font-mono text-sm leading-relaxed overflow-x-auto"
              style={{
                background: "var(--bg-subtle)",
                color: "var(--text-primary)",
                whiteSpace: "pre-wrap",
              }}
            >
              {`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  VIDEO SCRIPT TEMPLATE — SCRIBTLY.COM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ BRIEF ]

Client / Brand:    ______________________
Platform:          ______________________
Video type:        ______________________
Target length:     ______________________
Topic / Title:     ______________________
Primary goal:      ☐ Awareness  ☐ Engagement  ☐ Leads  ☐ Sales
Target audience:   ______________________
Tone:              ______________________
Key message:       ______________________
CTA destination:   ______________________

─────────────────────────────────────────
[ HOOK ]  (0–5 seconds)
─────────────────────────────────────────

Hook type:
  ☐ Bold claim      ☐ Question       ☐ Surprising stat
  ☐ Story opener    ☐ Controversial  ☐ Relatable problem

Hook line:
___________________________________________
___________________________________________

B-roll / visual suggestion for hook:
___________________________________________

─────────────────────────────────────────
[ INTRO ]  (5–20 seconds)
─────────────────────────────────────────

Who this is for:
___________________________________________

What they will get from this video:
___________________________________________

Credibility / context line (optional):
___________________________________________

─────────────────────────────────────────
[ BODY — SECTION 1 ]
─────────────────────────────────────────

Point / heading:
___________________________________________

Explanation / detail:
___________________________________________
___________________________________________

Example or proof:
___________________________________________

B-roll note:
___________________________________________

─────────────────────────────────────────
[ BODY — SECTION 2 ]
─────────────────────────────────────────

Point / heading:
___________________________________________

Explanation / detail:
___________________________________________
___________________________________________

Example or proof:
___________________________________________

B-roll note:
___________________________________________

─────────────────────────────────────────
[ BODY — SECTION 3 ]
─────────────────────────────────────────

Point / heading:
___________________________________________

Explanation / detail:
___________________________________________
___________________________________________

Example or proof:
___________________________________________

B-roll note:
___________________________________________

─────────────────────────────────────────
[ BODY — SECTION 4 ]  (optional)
─────────────────────────────────────────

Point / heading:
___________________________________________

Explanation / detail:
___________________________________________
___________________________________________

Example or proof:
___________________________________________

B-roll note:
___________________________________________

─────────────────────────────────────────
[ BODY — SECTION 5 ]  (optional)
─────────────────────────────────────────

Point / heading:
___________________________________________

Explanation / detail:
___________________________________________
___________________________________________

Example or proof:
___________________________________________

B-roll note:
___________________________________________

─────────────────────────────────────────
[ CTA ]  (final 5–15 seconds)
─────────────────────────────────────────

Primary action:    ______________________
CTA line:
___________________________________________
___________________________________________

Secondary action (optional):
___________________________________________

─────────────────────────────────────────
[ CAPTION ]
─────────────────────────────────────────

Caption hook (first line, no hashtags):
___________________________________________

Caption body (2–3 sentences):
___________________________________________
___________________________________________
___________________________________________

Caption CTA:
___________________________________________

Hashtags (platform-appropriate):
___________________________________________
___________________________________________

─────────────────────────────────────────
[ B-ROLL SHOT LIST ]  (optional)
─────────────────────────────────────────

Shot 1:  ______________________
Shot 2:  ______________________
Shot 3:  ______________________
Shot 4:  ______________________
Shot 5:  ______________________

─────────────────────────────────────────
[ REVISION NOTES ]
─────────────────────────────────────────

Round 1 feedback:
___________________________________________

Round 2 feedback (if needed):
___________________________________________

Final approved:  ☐ Yes   Date: ___________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Generated faster with Scribtly
  scribtly.com/signup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}
            </div>
          </div>

          <p
            className="text-center text-sm mt-6"
            style={{ color: "var(--text-muted)" }}
          >
            Copy the template above, or{" "}
            <Link
              href="/signup"
              className="font-semibold underline underline-offset-2"
              style={{ color: "var(--accent)" }}
            >
              use Scribtly to generate a filled-out version
            </Link>{" "}
            in your client&apos;s voice in under 60 seconds.
          </p>
        </div>
      </section>

      {/* Middle CTA */}
      <section
        className="px-6 py-16 border-y"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Zap
            size={32}
            className="mx-auto mb-5"
            style={{ color: "var(--accent)" }}
          />
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Stop filling in the blank lines manually
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto 2rem" }}
          >
            Scribtly fills in every section of this template for you. Save your
            client&apos;s voice once — their niche, tone, audience, and brand
            phrases — then generate platform-native scripts on demand.
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
            Includes 5 free scripts. No credit card required.
          </p>
        </div>
      </section>

      {/* Platform variations */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Platform differences
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              How to adapt this template for each platform
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              The core structure stays the same. What changes is the hook window,
              the pacing, and the caption format.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border p-6 flex flex-col gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(224,120,48,0.12)" }}
                  >
                    <p.icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.name}
                  </h3>
                </div>
                <div className="flex flex-col gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  <div className="flex justify-between">
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>Hook window</span>
                    <span>{p.hookLength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>Video length</span>
                    <span>{p.totalLength}</span>
                  </div>
                  <p
                    className="mt-2 pt-2 border-t text-xs leading-relaxed"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>Key: </span>
                    {p.keySection}
                  </p>
                  <p className="text-xs leading-relaxed">
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>Caption: </span>
                    {p.captionNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use it */}
      <section
        className="px-6 py-20 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              How to use it
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              From blank template to delivered script
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Complete the brief block first",
                body: "Platform, duration, audience, tone, and CTA destination. If you are writing for a client, get this agreed before you touch the body sections. Ambiguity in the brief means revisions in the script.",
              },
              {
                num: "02",
                title: "Write the hook before anything else",
                body: "Not after. The hook decides whether the video survives the first three seconds. Write five versions, pick the sharpest one, then build the rest of the script around it.",
              },
              {
                num: "03",
                title: "Fill in each body section with one clear point",
                body: "One point per section. No double-loading. If you find yourself cramming two ideas into one section, split it. Three tight sections land better than five cluttered ones.",
              },
              {
                num: "04",
                title: "Write the caption as part of the script",
                body: "The caption is not an afterthought. The hook line in the caption is often what gets a viewer to tap the video in the first place. Write it at the same time as the script.",
              },
              {
                num: "05",
                title: "Add B-roll notes if you have an editor",
                body: "If you are delivering to a creator or client with a video editor, the B-roll notes save a follow-up call. Describe the shot in one line — the editor will handle the execution.",
              },
              {
                num: "06",
                title: "Leave the revision notes field ready",
                body: "Build it into your delivery document from the start. When feedback comes back, log it in the revision notes field. Keeps everything in one file and shows clients you have a proper process.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border p-7"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="text-4xl font-bold mb-4 leading-none"
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
        </div>
      </section>

      {/* Common mistakes */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Common mistakes
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              What to avoid when filling in a video script template
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {mistakes.map((m) => (
              <div
                key={m.mistake}
                className="rounded-xl border p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "rgba(180,50,50,0.8)" }}
                  >
                    Mistake
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                    {m.mistake}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    Fix
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {m.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-6 py-20 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              FAQs
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
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
        </div>
      </section>

      {/* Related templates */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              More templates
            </p>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Platform-specific script templates
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "YouTube Script Template", href: "/youtube-script-template" },
              { label: "TikTok Script Template", href: "/tiktok-script-template" },
              { label: "Instagram Reels Script Template", href: "/reels-script-template" },
              { label: "LinkedIn Video Script Template", href: "/linkedin-video-script-template" },
              { label: "Podcast Script Template", href: "/podcast-script-template" },
              { label: "Client Voice Profile Template", href: "/client-voice-profile-template" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border p-4 text-sm font-medium transition-all hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-subtle)",
                  color: "var(--text-primary)",
                }}
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-28" style={{ background: "var(--dark)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
            style={{
              borderColor: "rgba(224,120,48,0.4)",
              color: "var(--accent)",
              background: "rgba(224,120,48,0.08)",
            }}
          >
            <Zap size={12} />
            No blank page. Ever again.
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white leading-tight">
            Generate client-ready scripts in under 60 seconds
          </h2>

          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Save your client&apos;s voice once. Generate platform-native scripts
            on demand — with hooks, body sections, CTAs, captions, hashtags, and
            B-roll notes already structured. No ChatGPT prompting. No blank page.
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
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={90}
              height={22}
              className="h-6 w-auto"
            />
          </Link>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/" className="hover:opacity-60 transition-opacity">
              Home
            </Link>
            <Link href="/blog" className="hover:opacity-60 transition-opacity">
              Blog
            </Link>
            <Link href="/pricing" className="hover:opacity-60 transition-opacity">
              Pricing
            </Link>
            <Link href="/signup" className="hover:opacity-60 transition-opacity">
              Get started
            </Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Camera,
  Layers,
  Eye,
  Monitor,
  Play,
  Film,
  FileText,
} from "lucide-react";

export const metadata = {
  title: "What is B-roll in a video script? (Definition + examples)",
  description:
    "B-roll is the supporting footage that plays over your voiceover. Learn what B-roll means in a script, how to write B-roll notes, and see examples across YouTube, TikTok, and Reels.",
  keywords: [
    "what is b-roll in a script",
    "b-roll notes",
    "b-roll video script",
    "what is b-roll footage",
    "b-roll examples",
    "how to write b-roll notes",
    "video script b-roll",
    "b-roll meaning in video",
  ],
  alternates: { canonical: "/what-is-b-roll-in-a-script" },
  openGraph: {
    type: "website",
    url: "/what-is-b-roll-in-a-script",
    siteName: "Scribtly",
    title:
      "What is B-roll in a video script? (Definition + examples) · Scribtly",
    description:
      "B-roll is the supporting footage that plays over your voiceover. Learn what B-roll means in a script, how to write B-roll notes, and see examples across YouTube, TikTok, and Reels.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "What is B-roll in a video script?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "What is B-roll in a video script? (Definition + examples) · Scribtly",
    description:
      "B-roll is the supporting footage that plays over your voiceover. Learn what B-roll means in a script, how to write B-roll notes, and see examples across YouTube, TikTok, and Reels.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "What Is B-Roll in a Video Script?",
      item: `${SITE_URL}/what-is-b-roll-in-a-script`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is B-roll in a video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B-roll is the supporting footage shown on screen while the main speaker (A-roll) is talking. In a video script, B-roll notes are written in brackets alongside the voiceover to tell the editor or videographer what visuals should appear. Examples include close-up product shots, screen recordings, location shots, and cutaway clips that illustrate what is being said.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between A-roll and B-roll?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A-roll is the primary footage — usually the person speaking directly to camera. B-roll is everything else: the supporting visuals that cut in over the voiceover to add context, demonstrate a point, or add visual variety. In a talking-head YouTube video, the creator on camera is A-roll; the product close-ups, screen recordings, and cutaways are B-roll.",
      },
    },
    {
      "@type": "Question",
      name: "Do you need B-roll in a TikTok or Reels script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always — but it helps. Short-form videos that stay on a talking head throughout can work well, especially if the script is strong. However, B-roll (or visual direction notes) help editors and creators understand when to cut to a close-up, show a product, display on-screen text, or cut away to something that reinforces the point. Even simple visual notes like '[SHOW: phone screen]' or '[TEXT OVERLAY: stat]' make editing faster.",
      },
    },
    {
      "@type": "Question",
      name: "How do you write B-roll notes in a script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B-roll notes are written in brackets or square brackets alongside the relevant section of dialogue. For example: [B-ROLL: Close-up of product on desk] or [VISUAL: Screen recording of dashboard]. Keep them specific enough to be useful but not so prescriptive that they constrain the editor. Note what the viewer should see, not how it should be filmed.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI write B-roll notes in a video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tools like Scribtly generate platform-specific scripts that include B-roll suggestions alongside the voiceover. Because the notes are generated in context — matched to each section of the script — they are more relevant than generic visual placeholders. You can edit or expand them, but having the structure in place saves significant time.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good B-roll note in a script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good B-roll note is specific, achievable, and relevant to the voiceover it supports. Vague notes like 'show something relevant' are useless. Specific notes like '[B-ROLL: Overhead shot of notebook and pen, creator's hand writing]' tell the editor exactly what to look for. If the B-roll cannot realistically be captured or sourced, note an alternative such as '[B-ROLL: Stock footage of busy coffee shop OR creator working at desk]'.",
      },
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What is B-roll in a video script? (Definition + examples)",
  description:
    "B-roll is the supporting footage that plays over your voiceover. Learn what B-roll means in a script, how to write B-roll notes, and see examples across YouTube, TikTok, and Reels.",
  datePublished: "2026-06-15",
  dateModified: "2026-06-15",
  author: { "@type": "Organization", name: "Scribtly" },
  publisher: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  url: `${SITE_URL}/what-is-b-roll-in-a-script`,
  keywords:
    "b-roll, video script, b-roll notes, what is b-roll, b-roll examples",
};

const brollTypes = [
  {
    icon: Camera,
    title: "Cutaway",
    desc: "A shot that cuts away from the speaker to illustrate what they are describing — the most common B-roll type.",
    example: "[B-ROLL: Close-up of hands scrolling through social media feed]",
  },
  {
    icon: Eye,
    title: "Close-up detail",
    desc: "A tight shot of an object, product, or action that draws attention to a specific element.",
    example: "[B-ROLL: Extreme close-up of product label and branding]",
  },
  {
    icon: Layers,
    title: "Environmental / location",
    desc: "A wide or establishing shot that places the viewer in a context — a workspace, city, or setting.",
    example: "[B-ROLL: Wide shot of open-plan office, people at desks]",
  },
  {
    icon: Play,
    title: "Action shot",
    desc: "Footage of something being done — a process, demonstration, or workflow in motion.",
    example: "[B-ROLL: Time-lapse of creator editing video timeline]",
  },
  {
    icon: Monitor,
    title: "Screen recording",
    desc: "A screen capture of an app, dashboard, website, or tool relevant to the point being made.",
    example: "[B-ROLL: Screen recording of analytics dashboard showing growth]",
  },
  {
    icon: FileText,
    title: "Text / graphic overlay",
    desc: "On-screen text or a graphic that reinforces a key stat, quote, or claim from the voiceover.",
    example: '[TEXT OVERLAY: "Scripts that sound like your client, not like AI"]',
  },
];

const faqs = [
  {
    q: "What is B-roll in a video script?",
    a: "B-roll is the supporting footage shown on screen while the main speaker (A-roll) is talking. In a video script, B-roll notes are written in brackets alongside the voiceover to tell the editor or videographer what visuals should appear. Examples include close-up product shots, screen recordings, location shots, and cutaway clips that illustrate what is being said.",
  },
  {
    q: "What is the difference between A-roll and B-roll?",
    a: "A-roll is the primary footage — usually the person speaking directly to camera. B-roll is everything else: the supporting visuals that cut in over the voiceover to add context, demonstrate a point, or add visual variety. In a talking-head YouTube video, the creator on camera is A-roll; the product close-ups, screen recordings, and cutaways are B-roll.",
  },
  {
    q: "Do you need B-roll in a TikTok or Reels script?",
    a: "Not always — but it helps. Short-form videos that stay on a talking head throughout can work well, especially if the script is strong. However, B-roll (or visual direction notes) help editors and creators understand when to cut to a close-up, show a product, display on-screen text, or cut away to something that reinforces the point. Even simple visual notes like '[SHOW: phone screen]' or '[TEXT OVERLAY: stat]' make editing faster.",
  },
  {
    q: "How do you write B-roll notes in a script?",
    a: "B-roll notes are written in brackets or square brackets alongside the relevant section of dialogue. For example: [B-ROLL: Close-up of product on desk] or [VISUAL: Screen recording of dashboard]. Keep them specific enough to be useful but not so prescriptive that they constrain the editor. Note what the viewer should see, not how it should be filmed.",
  },
  {
    q: "Can AI write B-roll notes in a video script?",
    a: "Yes. Tools like Scribtly generate platform-specific scripts that include B-roll suggestions alongside the voiceover. Because the notes are generated in context — matched to each section of the script — they are more relevant than generic visual placeholders. You can edit or expand them, but having the structure in place saves significant time.",
  },
  {
    q: "What makes a good B-roll note in a script?",
    a: "A good B-roll note is specific, achievable, and relevant to the voiceover it supports. Vague notes like 'show something relevant' are useless. Specific notes like '[B-ROLL: Overhead shot of notebook and pen, creator's hand writing]' tell the editor exactly what to look for. If the B-roll cannot realistically be captured or sourced, note an alternative such as '[B-ROLL: Stock footage of busy coffee shop OR creator working at desk]'.",
  },
];

export default function WhatIsBRollInAScriptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Scribtly Glossary
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            What is B-roll in a video script?
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            B-roll is the supporting footage shown on screen while the main voiceover plays. It is how a script tells the editor what the viewer should see — and it is one of the most practical parts of a professional video script to get right.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Generate scripts with B-roll notes <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/video-script-template">
              <Button size="lg" variant="outline">
                See a free script template
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          The definition
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          <strong>B-roll</strong> is the supplementary footage that plays on screen while the primary speaker — called <strong>A-roll</strong> — is talking. The term comes from film and broadcast production, where "A-roll" referred to the main camera footage and "B-roll" was the secondary footage cut in alongside it.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          In a video script, B-roll appears as short notes in brackets alongside the voiceover copy. These notes tell the editor, videographer, or creator what visual should appear on screen at that moment. They might indicate a product close-up, a screen recording, a location shot, or an on-screen text overlay.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          B-roll notes are not the footage itself — they are the instruction for what footage should be captured or sourced. A well-written B-roll note makes the editing process significantly faster because the editor is not guessing what the creator meant.
        </p>
      </section>

      {/* A-roll vs B-roll */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            A-roll vs B-roll: what is the difference?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-bold mb-4">A</div>
              <h3 className="font-semibold mb-2">A-roll</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                The primary footage — usually the person speaking directly to camera. This is the main visual the viewer sees for most of the video.
              </p>
              <p className="text-xs text-text-secondary dark:text-dark-muted mt-3 font-mono bg-[var(--color-surface)] rounded-lg px-3 py-2">
                Creator talking to camera about a product
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#38c172]/10 text-[#38c172] text-xs font-bold mb-4">B</div>
              <h3 className="font-semibold mb-2">B-roll</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                The supporting footage cut in over the voiceover. Adds context, demonstrates a point, or provides visual variety.
              </p>
              <p className="text-xs text-text-secondary dark:text-dark-muted mt-3 font-mono bg-[var(--color-surface)] rounded-lg px-3 py-2">
                Close-up of product, screen recording, location shot
              </p>
            </div>
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            A talking-head YouTube video where the creator is on camera the entire time is technically all A-roll. But most professional videos — especially tutorials, reviews, and brand content — mix the two. The creator speaks; B-roll cuts in to show rather than tell.
          </p>
        </div>
      </section>

      {/* Why B-roll matters */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Why B-roll matters in a video script
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          B-roll does several things that a talking head alone cannot. It shows rather than tells. It adds visual proof to a verbal claim. It breaks up the monotony of a single shot. And on platforms that reward watch time — YouTube especially — a well-cut B-roll sequence keeps viewers engaged longer.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          For <strong>freelance script writers</strong>, B-roll notes are part of the deliverable. A client who receives a script with clear B-roll notes can hand it to their videographer or editor without a separate briefing. The notes are already in the document. That is professional-quality script delivery.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          For <strong>social media managers</strong> scripting Reels or TikToks, B-roll notes tell the creator what to film — which shots to capture on shoot day. Without them, shoots are inefficient and editors are left improvising.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          Even basic visual direction ("show the app on screen here" or "cut to product close-up") is more useful than no B-roll notes at all. The more specific the notes, the faster the edit — and the fewer client revision requests.
        </p>
      </section>

      {/* B-roll types */}
      <section className="max-w-5xl mx-auto px-5 pb-16 md:pb-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Six types of B-roll used in video scripts
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Most B-roll falls into one of these six categories. The right type depends on the platform, the video format, and what the voiceover is describing at that point in the script.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brollTypes.map((b) => (
            <Card
              key={b.title}
              className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <b.icon
                size={20}
                className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200"
              />
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
                {b.desc}
              </p>
              <p className="text-xs font-mono text-primary/80 bg-[var(--color-primary-tint)] rounded-lg px-3 py-2 leading-relaxed">
                {b.example}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Soft CTA */}
      <section className="max-w-3xl mx-auto px-5 pb-4">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Get scripts with B-roll notes already written
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates platform-native scripts — including B-roll notes — for{" "}
            <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">
              YouTube
            </Link>
            ,{" "}
            <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">
              TikTok
            </Link>
            ,{" "}
            <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2">
              Instagram Reels
            </Link>
            , and more. Save your client's voice profile once and generate client-ready scripts in under 60 seconds.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Generate 5 scripts free <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How B-roll notes look in a real script */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          What B-roll notes look like in a real script
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 max-w-xl leading-relaxed">
          B-roll notes sit alongside the spoken dialogue in square brackets. Here is how they appear in three different video formats.
        </p>

        <div className="space-y-8">
          {/* YouTube tutorial */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-primary-tint)] text-primary text-xs font-bold">YT</span>
              YouTube tutorial
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
              YouTube tutorials often rely heavily on B-roll because they are demonstrating a process. Screen recordings, close-ups, and action shots support almost every line of the voiceover.
            </p>
            <div className="space-y-2">
              {[
                '[B-ROLL: Screen recording of Scribtly dashboard, cursor clicking "New Script"]',
                "VOICEOVER: The first thing you do is choose the platform and drop in your content idea.",
                "[B-ROLL: Close-up of keyboard, hands typing into script prompt field]",
                "VOICEOVER: Within about 30 seconds, you have a full script — hook, body sections, CTA, and B-roll notes included.",
                "[B-ROLL: Script output appearing on screen, scrolling through sections]",
              ].map((line, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono leading-relaxed rounded-lg px-4 py-3 ${
                    line.startsWith("[")
                      ? "text-primary/80 bg-[var(--color-primary-tint)] border border-primary/20"
                      : "text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border border-[var(--color-border)]"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Talking head brand video */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-primary-tint)] text-primary text-xs font-bold">TH</span>
              Talking head brand video
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
              For a client talking-head video, B-roll notes give the editor clear direction on where to cut away from the speaker — and what to cut to.
            </p>
            <div className="space-y-2">
              {[
                "VOICEOVER: Most small business owners spend hours every week on content that gets almost no engagement.",
                "[B-ROLL: Overhead shot of notebook and laptop on desk, stress-typing hands]",
                "VOICEOVER: The problem is not the platform. It is not the posting schedule. It is the script.",
                "[B-ROLL: Phone screen showing low view count, creator looking frustrated]",
                "VOICEOVER: One strong hook and a clear structure changes everything.",
              ].map((line, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono leading-relaxed rounded-lg px-4 py-3 ${
                    line.startsWith("[")
                      ? "text-primary/80 bg-[var(--color-primary-tint)] border border-primary/20"
                      : "text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border border-[var(--color-border)]"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* TikTok / Reels */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-primary-tint)] text-primary text-xs font-bold">TK</span>
              TikTok / Reels visual notes
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
              On short-form platforms, B-roll notes are lighter — often just directing an on-screen text overlay or a quick visual cut. The pacing is faster, so notes are brief.
            </p>
            <div className="space-y-2">
              {[
                "[VISUAL: Creator to camera — energetic, direct eye contact]",
                "HOOK: Nobody tells freelancers this, but it is the reason you are still undercharging.",
                '[TEXT OVERLAY: "The Script Mistake Costing You Clients"]',
                "BODY: Every client I have worked with had the same problem — not the price, the pitch.",
                "[VISUAL: Cut to screen recording of client deliverable / script document]",
                "CTA: Follow for the exact script framework I use with every new client.",
              ].map((line, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono leading-relaxed rounded-lg px-4 py-3 ${
                    line.startsWith("[")
                      ? "text-primary/80 bg-[var(--color-primary-tint)] border border-primary/20"
                      : "text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border border-[var(--color-border)]"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Common B-roll mistakes in scripts
          </h2>
          <div className="space-y-5">
            {[
              {
                title: "Writing no B-roll notes at all",
                desc: "A script with only spoken dialogue forces the editor to make up the visual story from scratch. That increases editing time, revision cycles, and the chance of the finished video looking nothing like what the creator intended.",
              },
              {
                title: "Being too vague",
                desc: '"Show something relevant here" is not a B-roll note. It is a placeholder. Notes need to describe what the viewer should see specifically enough that the editor can source or capture the right footage without guessing.',
              },
              {
                title: "Writing B-roll that contradicts the voiceover",
                desc: "If the voiceover says 'most creators are too busy to sit down and write' and the B-roll note says '[creator relaxing with coffee]', the visuals tell a different story. B-roll should reinforce, not undermine, what is being said.",
              },
              {
                title: "Specifying footage that cannot be captured",
                desc: "Writing '[B-ROLL: drone shot over Manhattan skyline]' for a local small business client is impractical. Good B-roll notes consider what is actually achievable — and offer an alternative if the preferred shot is ambitious.",
              },
              {
                title: "Skipping B-roll on short-form scripts",
                desc: "Many script writers assume short-form videos do not need visual direction. But even a basic note — '[TEXT OVERLAY: key stat]' or '[CUT TO: product close-up]' — helps the creator or editor deliver a more polished, intentional result.",
              },
            ].map((m) => (
              <div key={m.title} className="flex gap-4">
                <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-xs font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{m.title}</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where Scribtly fits */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          How Scribtly handles B-roll in scripts
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Every script Scribtly generates includes B-roll suggestions alongside the voiceover copy. These notes are generated in context — matched to each section of the script — rather than added as generic placeholders at the end.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Because Scribtly knows the platform (YouTube, TikTok, Reels, LinkedIn, etc.) and the client's saved voice profile, the B-roll notes are calibrated to the format. A YouTube tutorial script gets different B-roll guidance than a 30-second UGC product script.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          For{" "}
          <Link href="/for-freelancers" className="text-primary underline underline-offset-2">
            freelancers
          </Link>{" "}
          delivering scripts to clients, this means handing over a fully structured document — voiceover, B-roll notes, CTA, and captions — without spending extra time writing visual direction from scratch. For{" "}
          <Link href="/for-agencies" className="text-primary underline underline-offset-2">
            agencies
          </Link>{" "}
          producing scripts at volume, consistent B-roll structure across every deliverable reduces editing friction and client revision requests.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          You can always edit or expand the generated B-roll notes. Most script writers find that even a rough first draft of visual direction is faster to refine than to write from nothing. See our{" "}
          <Link href="/video-script-template" className="text-primary underline underline-offset-2">
            free video script template
          </Link>{" "}
          to see the full script structure Scribtly follows, or check out the{" "}
          <Link href="/youtube-script-template" className="text-primary underline underline-offset-2">
            YouTube script template
          </Link>{" "}
          for a format-specific example.
        </p>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-[var(--color-border)]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-xl font-semibold tracking-tight mb-6">Related pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/video-script-template", label: "Free video script template" },
            { href: "/youtube-script-template", label: "Free YouTube script template" },
            { href: "/tiktok-script-template", label: "Free TikTok script template" },
            { href: "/youtube-scripts", label: "YouTube script generator" },
            { href: "/tiktok-scripts", label: "TikTok script generator" },
            { href: "/instagram-reels-scripts", label: "Instagram Reels script generator" },
            { href: "/what-is-a-video-hook", label: "What is a video hook?" },
            { href: "/what-is-a-ugc-script", label: "What is a UGC script?" },
            { href: "/for-freelancers", label: "Scribtly for freelancers" },
            { href: "/for-agencies", label: "Scribtly for agencies" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors duration-150"
            >
              <ArrowRight size={14} className="text-primary flex-shrink-0" />
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Stop writing B-roll notes from scratch
          </h2>
          <p className="text-white/75 mb-8">
            Scribtly generates full scripts — voiceover, hooks, B-roll notes, and CTAs — in your client's saved voice. 5 free scripts, no card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              >
                Start free <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                className="bg-white/10 text-white border-hair border-white/30 hover:bg-white/20"
              >
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

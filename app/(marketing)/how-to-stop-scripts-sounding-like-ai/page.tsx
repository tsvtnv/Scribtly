import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  MessageSquare,
  Users,
  RefreshCcw,
} from "lucide-react";

export const metadata = {
  title: "How to stop video scripts sounding like AI",
  description:
    "Generic AI scripts are easy to spot. Here's how to write video scripts that sound human — and how to use AI tools without losing the client's voice.",
  keywords: [
    "video scripts that don't sound like AI",
    "how to make AI scripts sound human",
    "stop scripts sounding generic",
    "client voice in video scripts",
    "humanise AI scripts",
    "AI script writing tips",
    "make AI content sound natural",
    "freelance script writing AI",
  ],
  alternates: { canonical: "/how-to-stop-scripts-sounding-like-ai" },
  openGraph: {
    type: "article",
    url: "/how-to-stop-scripts-sounding-like-ai",
    siteName: "Scribtly",
    title: "How to stop video scripts sounding like AI · Scribtly",
    description:
      "Generic AI scripts are easy to spot. Here's how to write video scripts that sound human — and how to use AI tools without losing the client's voice.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "How to stop video scripts sounding like AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to stop video scripts sounding like AI · Scribtly",
    description:
      "Generic AI scripts are easy to spot. Here's how to write video scripts that sound human — and how to use AI tools without losing the client's voice.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to stop video scripts sounding like AI",
      item: `${SITE_URL}/how-to-stop-scripts-sounding-like-ai`,
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to stop your video scripts sounding like AI",
  description:
    "Generic AI scripts are easy to spot. Here's how to write video scripts that sound human — and how to use AI tools without losing the client's voice.",
  datePublished: "2026-06-03",
  dateModified: "2026-06-03",
  author: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  url: `${SITE_URL}/how-to-stop-scripts-sounding-like-ai`,
  keywords:
    "video scripts, AI script writing, client voice, humanise AI content, freelance scripts",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do AI video scripts sound generic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most AI tools generate content from broad training data without knowing the specific person speaking. They default to formal, neutral language — which sounds nothing like how a real creator, coach, or business owner actually talks. The fix is giving the AI a detailed voice profile before generating.",
      },
    },
    {
      "@type": "Question",
      name: "How do you make an AI script sound more human?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most effective approach is to feed the AI specific information about the speaker: their tone, the phrases they use, what they'd never say, and who they're talking to. Then edit the output for natural speech rhythm — short sentences, contractions, and conversational cadence.",
      },
    },
    {
      "@type": "Question",
      name: "What are the signs a video script was written by AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common signs include overuse of transition phrases like 'in today's video', 'let's dive in', and 'without further ado'. Also: unnaturally long sentences, no contractions, formal vocabulary, perfect grammar in informal contexts, and no personality or personal anecdotes.",
      },
    },
    {
      "@type": "Question",
      name: "Should freelance script writers tell clients they use AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is a matter of professional judgement, but most experienced freelancers position AI as a first-draft tool they edit and refine. The deliverable is a polished, client-ready script — the process is less relevant than the result. What matters is that the final script sounds like the client, not generic AI output.",
      },
    },
    {
      "@type": "Question",
      name: "How does Scribtly avoid generic AI output?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly uses a saved client voice profile for every script it generates. You fill in the client's niche, tone, audience, signature phrases, and what to avoid — and every script generation pulls from that profile. The result sounds like the client, not like a generic AI assistant.",
      },
    },
    {
      "@type": "Question",
      name: "Can you use AI for script writing professionally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Most professional script writers use AI as a first-draft accelerator — not a replacement for craft. The value is in the editing, the voice calibration, and the structural decisions. AI handles the blank page; you handle the parts that require real expertise.",
      },
    },
  ],
};

const telltales = [
  {
    icon: XCircle,
    bad: '"In today\'s video, we\'re going to be taking a look at…"',
    note: "The phrase 'take a look at' is a dead giveaway. No one speaks like this in conversation.",
  },
  {
    icon: XCircle,
    bad: '"Without further ado, let\'s dive right in."',
    note: "Transition filler that signals the writer ran out of ideas for the opening.",
  },
  {
    icon: XCircle,
    bad: '"It is important to note that the following information may vary depending on your individual circumstances."',
    note: "Corporate disclaimer language. Sounds like a terms-of-service doc, not a creator.",
  },
  {
    icon: XCircle,
    bad: '"In conclusion, we have explored several key points today…"',
    note: "AI loves to summarise what it just said. Viewers already watched the video — they don't need a recap.",
  },
  {
    icon: XCircle,
    bad: '"Feel free to leave a comment below with your thoughts!"',
    note: "'Feel free' is an AI writing tic. No real creator speaks this formally.",
  },
];

const fixes = [
  {
    icon: Users,
    title: "Load the client's voice before you generate",
    desc: "The most common reason AI scripts sound wrong is that the tool knows nothing about the speaker. Feed it the client's tone, their signature phrases, their audience, and what they'd never say. This context changes the entire output.",
  },
  {
    icon: MessageSquare,
    title: "Rewrite for spoken rhythm, not written grammar",
    desc: "Scripts are heard, not read. Short sentences. Contractions. Incomplete thoughts that trail off. A sentence like 'The reality is — most creators skip this entirely' is stronger than 'Most creators tend to overlook this particular aspect of their content strategy.'",
  },
  {
    icon: RefreshCcw,
    title: "Replace generic transitions with specific ones",
    desc: "Cut 'let's dive in', 'without further ado', and 'moving on'. Replace them with transitions that reference the actual content: 'Here's where it gets interesting —' or 'That's the theory. Here's what it looks like in practice.'",
  },
  {
    icon: Lightbulb,
    title: "Add one specific detail only the client could know",
    desc: "AI output is general by design. Real creators are specific. A fitness coach doesn't say 'results may vary' — they say 'I've had three clients hit this plateau in week six.' One specific detail makes the whole script sound more authentic.",
  },
  {
    icon: CheckCircle2,
    title: "Read the script aloud before delivering it",
    desc: "This is the fastest QA check available. If a sentence makes you stumble or sounds like something you'd only write — not say — rewrite it. The ear catches what the eye misses.",
  },
  {
    icon: Sparkles,
    title: "Keep the client's vocabulary, lose the filler",
    desc: "Good voice matching is about precision: use the client's actual words where possible, cut the filler AI adds to pad structure. If the client never says 'leverage' or 'synergy', the script shouldn't either.",
  },
];

const faqs = [
  {
    q: "Why do AI video scripts sound generic?",
    a: "Most AI tools generate content from broad training data without knowing the specific person speaking. They default to formal, neutral language — which sounds nothing like how a real creator, coach, or business owner actually talks. The fix is giving the AI a detailed voice profile before generating.",
  },
  {
    q: "How do you make an AI script sound more human?",
    a: "The most effective approach is to feed the AI specific information about the speaker: their tone, the phrases they use, what they'd never say, and who they're talking to. Then edit the output for natural speech rhythm — short sentences, contractions, and conversational cadence.",
  },
  {
    q: "What are the signs a video script was written by AI?",
    a: "Common signs include overuse of transition phrases like 'in today's video', 'let's dive in', and 'without further ado'. Also: unnaturally long sentences, no contractions, formal vocabulary, perfect grammar in informal contexts, and no personality or personal anecdotes.",
  },
  {
    q: "Should freelance script writers tell clients they use AI?",
    a: "This is a matter of professional judgement, but most experienced freelancers position AI as a first-draft tool they edit and refine. The deliverable is a polished, client-ready script — the process is less relevant than the result. What matters is that the final script sounds like the client, not generic AI output.",
  },
  {
    q: "How does Scribtly avoid generic AI output?",
    a: "Scribtly uses a saved client voice profile for every script it generates. You fill in the client's niche, tone, audience, signature phrases, and what to avoid — and every script generation pulls from that profile. The result sounds like the client, not like a generic AI assistant.",
  },
  {
    q: "Can you use AI for script writing professionally?",
    a: "Yes. Most professional script writers use AI as a first-draft accelerator — not a replacement for craft. The value is in the editing, the voice calibration, and the structural decisions. AI handles the blank page; you handle the parts that require real expertise.",
  },
];

export default function HowToStopScriptsSoundingLikeAIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            Scribtly Guide · Wednesday 3 June 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            How to stop your video scripts<br className="hidden md:block" /> sounding like AI
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Generic AI scripts are easy to spot. Here is how to write video scripts that sound like a real person — and how to use AI tools without losing the client&apos;s voice in the process.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Generate scripts in your client&apos;s voice <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/ai-script-writer">
              <Button size="lg" variant="outline">See how Scribtly works</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          The problem with using AI for scripts
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Most AI writing tools produce the same script. Not literally — the topic changes, the structure adapts — but the voice is almost always the same: neutral, formal, slightly corporate, and completely indistinguishable from every other AI-generated script in the same niche.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          For <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelance script writers</Link> and <Link href="/for-agencies" className="text-primary underline underline-offset-2">content agencies</Link>, this is a real problem. Clients hire you because they want content that sounds like <em>them</em>, not like an AI assistant with a clipboard. If every script you deliver has the same generic tone, the client will notice — and so will their audience.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          The good news is that this problem is largely fixable. Generic output is almost always the result of generic input. Change what you feed the AI, change how you edit the output, and the result gets substantially better.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          This guide covers both sides: how to spot the telltale signs of an AI script, and the practical steps to fix them before you deliver.
        </p>
      </section>

      {/* Telltale signs */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            The telltale signs of a generic AI script
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 leading-relaxed">
            Before fixing the problem, you need to know what you are looking for. These phrases and patterns appear constantly in unedited AI output.
          </p>
          <div className="space-y-5">
            {telltales.map((t) => (
              <div key={t.bad} className="flex gap-4">
                <t.icon
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-red-500"
                />
                <div>
                  <p className="text-xs font-mono text-text-secondary dark:text-dark-muted bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3 leading-relaxed mb-2">
                    {t.bad}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                    {t.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it happens */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Why it happens — and why it is not the AI&apos;s fault
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          AI models are trained to produce content that is grammatically correct, broadly applicable, and unlikely to cause offence. That is a reasonable default for a general tool — but it is the opposite of what makes a video script compelling.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Real video scripts are specific. They reference things only that creator would say. They use vocabulary their audience already knows. They take a position, have a personality, and sometimes break grammar rules on purpose because it sounds right when spoken aloud.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          When you type "write me a YouTube script about morning routines", the AI has almost no information about who is speaking. So it writes for everyone — which means it writes for no one in particular. The output is technically a script, but it could have been written for any of the 500 other morning-routine creators on YouTube.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          The fix is not to avoid AI — it is to give the AI enough context about the speaker that it can generate something closer to their actual voice. That starts before you even type the first word of the brief.
        </p>
      </section>

      {/* Soft CTA */}
      <section className="max-w-3xl mx-auto px-5 pb-4">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Save the client&apos;s voice once. Use it every time.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly stores a full voice profile for each client — niche, tone, audience, signature phrases, and what to avoid. Every script generation pulls from that profile automatically. No re-briefing. No generic output.
            <br /><br />
            Used by{" "}
            <Link href="/for-freelancers" className="text-primary underline underline-offset-2">
              freelance script writers
            </Link>
            ,{" "}
            <Link href="/for-agencies" className="text-primary underline underline-offset-2">
              content agencies
            </Link>
            , and{" "}
            <Link href="/for-social-media-managers" className="text-primary underline underline-offset-2">
              social media managers
            </Link>{" "}
            who need consistent, on-brand scripts at speed.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Start free — 5 scripts included <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Six fixes */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Six ways to fix AI scripts before they land with a client
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          These are the edits and habits that separate a generic AI draft from a script a creator actually wants to film.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fixes.map((f) => (
            <Card
              key={f.title}
              className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <f.icon
                size={20}
                className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200"
              />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Before and after: the same brief, two different outputs
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 leading-relaxed">
            Here is what the same topic looks like with a generic AI prompt versus a prompt loaded with a client voice profile. The brief: a fitness coach, 30-second Reels script, topic: rest days.
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={14} className="text-red-500 flex-shrink-0" />
                <span className="text-xs font-medium text-red-500 uppercase tracking-wide">Generic AI output</span>
              </div>
              <div className="text-xs font-mono text-text-secondary dark:text-dark-muted bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-5 py-4 leading-relaxed">
                &ldquo;In today&apos;s video, we are going to be discussing the importance of rest days in your fitness journey. Rest days are a crucial component of any well-rounded training programme. Without adequate recovery time, your muscles are unable to repair and grow effectively. It is important to listen to your body and allow it the time it needs to recover. Make sure to incorporate rest days into your weekly schedule for optimal results. Feel free to leave a comment below if you have any questions!&rdquo;
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} className="text-[#38c172] flex-shrink-0" />
                <span className="text-xs font-medium text-[#38c172] uppercase tracking-wide">With client voice profile loaded</span>
              </div>
              <div className="text-xs font-mono text-text-secondary dark:text-dark-muted bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-5 py-4 leading-relaxed">
                &ldquo;You are not being lazy. You are recovering. I used to think rest days were for people who weren&apos;t committed enough — until I overtrained myself into a three-week setback. Your muscles don&apos;t grow in the gym. They grow when you stop. Take the day. You&apos;ve earned it.&rdquo;
              </div>
            </div>
          </div>

          <p className="text-sm text-text-secondary dark:text-dark-muted mt-6 leading-relaxed">
            Same topic, same platform, same script length — completely different result. The second version has a point of view, a personal reference, and sentence structures that match how this coach actually speaks. The first version could have been written for any of 10,000 other fitness creators.
          </p>
        </div>
      </section>

      {/* Editing checklist */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          The quick edit checklist
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
          Run every AI-generated script through this checklist before you deliver it. Most scripts only need two or three of these fixes to go from generic to usable.
        </p>
        <div className="space-y-3">
          {[
            {
              label: "Remove all filler transitions",
              sub: "Cut: 'let's dive in', 'without further ado', 'in today's video we will', 'moving on'. Replace with content-specific transitions or cut the transition entirely.",
            },
            {
              label: "Replace formal vocabulary with conversational language",
              sub: "Swap: 'it is important to note' → 'here's the thing'. 'leverage your strengths' → 'use what you're already good at'. 'optimal results' → 'better results'.",
            },
            {
              label: "Break long sentences into two shorter ones",
              sub: "If a sentence needs a comma to make sense, it is probably two sentences. Short sentences land harder when spoken aloud and are easier to film.",
            },
            {
              label: "Add at least one specific detail",
              sub: "Replace a general statement with something only the client would know: a specific number, a real scenario, a named client result, or a personal observation.",
            },
            {
              label: "Check the CTA sounds natural",
              sub: "'Feel free to leave a comment' → 'Drop your question below and I'll reply to every single one.' One is AI; the other is a creator who actually means it.",
            },
            {
              label: "Read it aloud",
              sub: "If any line makes you stumble or sounds like something you'd write on a company website, rewrite it. The spoken test is the most reliable QA step available.",
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[#38c172]" />
              <div>
                <p className="text-sm font-medium mb-1">{item.label}</p>
                <p className="text-xs text-text-secondary dark:text-dark-muted leading-relaxed">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Where Scribtly fits */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Where Scribtly fits in this workflow
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Most of the problems described in this guide come down to the same root cause: the AI was given a brief without a voice. Scribtly is built specifically to fix that.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Before generating a script, you build a client voice profile — their niche, their audience, their tone words, signature phrases, and what they&apos;d never say. That profile is saved and reused every time you generate a script for that client. The AI is never writing from scratch with no context.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            The result is not a perfect final draft — it is a strong first draft that already sounds in the ballpark of the client&apos;s voice. The editing pass described above still applies, but you are editing two or three things rather than rewriting from scratch.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            For platform-specific outputs, Scribtly generates scripts with the right structural elements already in place — hooks for{" "}
            <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">
              TikTok
            </Link>
            , section structure for{" "}
            <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">
              YouTube
            </Link>
            , on-screen text cues for{" "}
            <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2">
              Reels
            </Link>
            . The generic filler transitions are replaced with platform-appropriate phrasing from the start.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            If you are writing scripts for multiple clients, the voice profile system is particularly useful. You are not re-explaining each client&apos;s tone to ChatGPT every time — the profile is there, it is consistent, and every script starts from the same calibrated baseline. See the{" "}
            <Link href="/ai-script-writer" className="text-primary underline underline-offset-2">
              Scribtly overview
            </Link>{" "}
            for the full workflow.
          </p>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Common mistakes freelancers make when using AI for scripts
        </h2>
        <div className="space-y-5">
          {[
            {
              title: "Delivering the first draft without editing it",
              desc: "AI output is a starting point, not a finished product. Sending the raw output to a client is the fastest way to lose their trust — and the quickest sign that you are not adding professional value.",
            },
            {
              title: "Using the same prompt for every client",
              desc: "One generic prompt produces one generic output. The prompt should include the client's voice information every time. If that feels repetitive, use a tool that saves the voice profile and applies it automatically.",
            },
            {
              title: "Not reading the script in context",
              desc: "A line that reads fine on screen can land completely wrong when spoken aloud on camera. Always do a quick spoken read-through before delivery. This catches unnatural phrasing faster than any written review.",
            },
            {
              title: "Treating AI as a replacement for knowing the client",
              desc: "AI accelerates the writing process — it does not replace understanding who the client is. The better your brief and voice profile, the better the output. Garbage in, garbage out applies here as much as anywhere.",
            },
            {
              title: "Keeping AI-written sign-offs and CTAs unchanged",
              desc: "CTAs are often the most robotic part of any AI script. They are usually too formal ('feel free to leave a comment'), too vague ('like and subscribe'), or not matched to the client's actual CTA style. Always rewrite the CTA last.",
            },
          ].map((m) => (
            <div key={m.title} className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-xs font-bold">✕</div>
              <div>
                <h3 className="font-semibold mb-1">{m.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
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
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{faq.a}</p>
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
            { href: "/ai-script-writer", label: "AI script writer overview" },
            { href: "/for-freelancers", label: "Scribtly for freelancers" },
            { href: "/for-agencies", label: "Scribtly for agencies" },
            { href: "/youtube-scripts", label: "YouTube script generator" },
            { href: "/tiktok-scripts", label: "TikTok script generator" },
            { href: "/instagram-reels-scripts", label: "Instagram Reels script generator" },
            { href: "/video-script-template", label: "Free video script template" },
            { href: "/what-is-a-video-hook", label: "What is a video hook?" },
            { href: "/alternatives/chatgpt-for-scripts", label: "Scribtly vs ChatGPT for scripts" },
            { href: "/pricing", label: "Scribtly pricing" },
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
            Scripts that sound like your client, not like AI
          </h2>
          <p className="text-white/75 mb-8">
            Save each client&apos;s voice profile once. Generate platform-native scripts in under 60 seconds — for YouTube, TikTok, Reels, LinkedIn, and more. 5 free scripts, no card required.
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

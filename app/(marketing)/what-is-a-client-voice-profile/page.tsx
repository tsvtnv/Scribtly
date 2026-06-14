import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  User,
  Mic,
  Target,
  Palette,
  BookOpen,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

export const metadata = {
  title: "What is a client voice profile? (Definition + examples)",
  description:
    "A client voice profile stores a client's tone, audience, and style so every script sounds right first time. Learn what to include and how to create one.",
  keywords: [
    "what is a client voice profile",
    "client voice profile",
    "brand voice profile",
    "client tone of voice",
    "how to create a brand voice profile",
    "client voice guide",
    "brand voice document",
    "content voice profile",
  ],
  alternates: { canonical: "/what-is-a-client-voice-profile" },
  openGraph: {
    type: "website",
    url: "/what-is-a-client-voice-profile",
    siteName: "Scribtly",
    title: "What is a client voice profile? (Definition + examples) · Scribtly",
    description:
      "A client voice profile stores a client's tone, audience, and style so every script sounds right first time. Learn what to include and how to create one.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "What is a client voice profile?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a client voice profile? (Definition + examples) · Scribtly",
    description:
      "A client voice profile stores a client's tone, audience, and style so every script sounds right first time. Learn what to include and how to create one.",
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
      name: "What Is a Client Voice Profile?",
      item: `${SITE_URL}/what-is-a-client-voice-profile`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a client voice profile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A client voice profile is a saved document or record that captures how a specific client communicates — their tone, audience, niche, preferred phrases, content style, and things to avoid. It is used by freelancers, content creators, and agencies so that every piece of content they produce for that client sounds consistent, without having to re-brief from scratch each time.",
      },
    },
    {
      "@type": "Question",
      name: "What should a client voice profile include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong client voice profile should include: the client's niche and industry, their target audience (who they are speaking to and why), the tone they use (e.g. casual, authoritative, warm), the platforms they publish on, phrases or expressions they like and dislike, example content that represents their style, and any brand rules or restrictions. Some profiles also include hook preferences, CTA style, and post length guidelines.",
      },
    },
    {
      "@type": "Question",
      name: "Why do freelance script writers need a client voice profile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Without a voice profile, a freelancer has to re-learn a client's style every time they start a new script. This slows down production and increases the chance of revision requests. A voice profile captures all the relevant information once, so the writer can produce consistent, on-brand scripts faster — and spend less time on back-and-forth with the client.",
      },
    },
    {
      "@type": "Question",
      name: "Is a client voice profile the same as a brand voice guide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They serve a similar purpose but differ in scope. A brand voice guide is usually a formal document created by a brand's internal marketing team — often covering the entire brand identity. A client voice profile is a more practical, working document created by the freelancer or agency based on what they learn about the client. It is shorter, more actionable, and updated as the relationship develops.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI use a client voice profile to generate scripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tools like Scribtly are built specifically around this concept. You save a client's voice profile once — their niche, tone, audience, preferred style, and platform — and Scribtly uses that profile every time you generate a script for that client. The output reflects the client's voice rather than a generic AI tone. This means faster drafts and fewer rounds of edits.",
      },
    },
    {
      "@type": "Question",
      name: "How is a client voice profile different from a content brief?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A content brief is project-specific — it covers the topic, goal, and details for one piece of content. A client voice profile is client-specific — it covers how that client communicates across all content. The brief changes with every project. The voice profile stays consistent across the whole relationship. In practice, you use the voice profile to inform every brief you write for that client.",
      },
    },
  ],
};

const profileElements = [
  {
    icon: User,
    title: "Client niche and industry",
    desc: "What the client does, who they serve, and the space they operate in. This shapes vocabulary, examples, and the level of technical detail appropriate for the content.",
    example: "Fitness coach specialising in strength training for women over 40.",
  },
  {
    icon: Target,
    title: "Target audience",
    desc: "Who the content is actually speaking to. Age range, interests, pain points, aspirations, and the language they use to describe their own problems.",
    example: "Women aged 38–55 who feel intimidated by the gym but want to build strength and feel confident.",
  },
  {
    icon: Mic,
    title: "Tone of voice",
    desc: "The emotional register and personality behind the words. Is the client warm and encouraging? Sharp and direct? Authoritative and professional? Casual and relatable?",
    example: "Warm, motivating, and no-nonsense. Feels like advice from a trusted friend who also has high standards.",
  },
  {
    icon: BookOpen,
    title: "Phrases and language preferences",
    desc: "Words and phrases the client uses often, words they dislike or avoid, expressions that sound authentically like them, and any terminology specific to their niche.",
    example: "Uses: 'strong women', 'showing up', 'real results'. Avoids: 'diet culture', 'before and after', 'beach body'.",
  },
  {
    icon: Palette,
    title: "Content style and platform",
    desc: "The platforms where content will be published, the format of scripts that work best, preferred video length, and structural preferences (e.g. direct hooks, storytelling intros).",
    example: "Instagram Reels and YouTube Shorts. Direct, high-energy hooks. 45–90 seconds. Ends with a motivational CTA.",
  },
  {
    icon: FileText,
    title: "Example content",
    desc: "Links or notes on content the client has previously approved or loved. This gives a concrete reference point beyond the abstract description of their tone.",
    example: "Script from March that got the most saves. The direct opening line and the 'you already have what it takes' close.",
  },
];

const faqs = [
  {
    q: "What is a client voice profile?",
    a: "A client voice profile is a saved document or record that captures how a specific client communicates — their tone, audience, niche, preferred phrases, content style, and things to avoid. It is used by freelancers, content creators, and agencies so that every piece of content they produce for that client sounds consistent, without having to re-brief from scratch each time.",
  },
  {
    q: "What should a client voice profile include?",
    a: "A strong client voice profile should include: the client's niche and industry, their target audience (who they are speaking to and why), the tone they use (e.g. casual, authoritative, warm), the platforms they publish on, phrases or expressions they like and dislike, example content that represents their style, and any brand rules or restrictions. Some profiles also include hook preferences, CTA style, and post length guidelines.",
  },
  {
    q: "Why do freelance script writers need a client voice profile?",
    a: "Without a voice profile, a freelancer has to re-learn a client's style every time they start a new script. This slows down production and increases the chance of revision requests. A voice profile captures all the relevant information once, so the writer can produce consistent, on-brand scripts faster — and spend less time on back-and-forth with the client.",
  },
  {
    q: "Is a client voice profile the same as a brand voice guide?",
    a: "They serve a similar purpose but differ in scope. A brand voice guide is usually a formal document created by a brand's internal marketing team — often covering the entire brand identity. A client voice profile is a more practical, working document created by the freelancer or agency based on what they learn about the client. It is shorter, more actionable, and updated as the relationship develops.",
  },
  {
    q: "Can AI use a client voice profile to generate scripts?",
    a: "Yes. Tools like Scribtly are built specifically around this concept. You save a client's voice profile once — their niche, tone, audience, preferred style, and platform — and Scribtly uses that profile every time you generate a script for that client. The output reflects the client's voice rather than a generic AI tone. This means faster drafts and fewer rounds of edits.",
  },
  {
    q: "How is a client voice profile different from a content brief?",
    a: "A content brief is project-specific — it covers the topic, goal, and details for one piece of content. A client voice profile is client-specific — it covers how that client communicates across all content. The brief changes with every project. The voice profile stays consistent across the whole relationship. In practice, you use the voice profile to inform every brief you write for that client.",
  },
];

const steps = [
  {
    n: "1",
    title: "Do a discovery session with the client",
    desc: "Before writing anything, ask the client about their audience, their content goals, and what previous content they liked or disliked. Record the conversation if possible — the way they describe their own brand often gives you the vocabulary directly.",
  },
  {
    n: "2",
    title: "Audit their existing content",
    desc: "Look at their recent posts, videos, or scripts. Note what words come up repeatedly, what tone runs through it, and how they tend to open and close videos. Look for patterns, not just individual examples.",
  },
  {
    n: "3",
    title: "Define the tone in specific, usable terms",
    desc: "Avoid vague labels like 'friendly' or 'professional'. Instead, use comparisons: 'sounds like a knowledgeable friend, not a corporate spokesperson'. The more specific your tone description, the more consistently it can be applied.",
  },
  {
    n: "4",
    title: "List phrases to use and avoid",
    desc: "Create a short, practical list of expressions that sound like the client and words or phrases that feel wrong for their brand. This is often the most useful part of the profile because it gives the writer instant guardrails.",
  },
  {
    n: "5",
    title: "Save example scripts or content that was approved",
    desc: "Reference examples are more powerful than descriptions. When you have a script the client loved, note what made it work. That example becomes your north star for future scripts.",
  },
  {
    n: "6",
    title: "Update the profile as the relationship develops",
    desc: "A voice profile should evolve. As you produce more content and learn more about what the client responds to, update the profile. Over time it becomes a precise, living reference rather than a static document.",
  },
];

export default function WhatIsAClientVoiceProfilePage() {
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
            What is a client voice profile?
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            A client voice profile is a saved record of how a specific client communicates — their tone, audience, niche, and preferred style. It is the document that makes every script you write for that client sound like them, without briefing from scratch each time.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Save your first client profile free <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/ai-script-writer">
              <Button size="lg" variant="outline">See how Scribtly works</Button>
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
          A <strong>client voice profile</strong> is a structured record of how a specific client communicates. It captures their niche, target audience, tone of voice, preferred phrases, platform, and content style — everything a writer, creator, or agency needs to produce on-brand content without asking the client to explain their brand from scratch on every project.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Voice profiles are used by <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelance script writers</Link>, <Link href="/for-agencies" className="text-primary underline underline-offset-2">content agencies</Link>, and <Link href="/for-social-media-managers" className="text-primary underline underline-offset-2">social media managers</Link> who produce content for multiple clients. Instead of re-learning a client's style each time, they build the profile once and use it as the foundation for every piece of work.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          The result is faster production, fewer revision rounds, and content that sounds authentically like the client — not like a generic template that could belong to anyone.
        </p>
      </section>

      {/* Why it matters */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Why a voice profile changes how client work feels
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Without a voice profile, every script brief starts with the same problem: you know the topic, but you are guessing the tone. You write a draft. The client comes back with "this doesn't sound like me." You revise. They approve. And next time, you start guessing again.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            A voice profile breaks that cycle. Once you have captured the client's tone, audience, and preferred style in a saved document, you carry that understanding into every script. The first draft is already calibrated. Revisions shift from "this doesn't sound like me" to minor tweaks on individual lines.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            For <strong>freelancers</strong> managing several clients at once, this is the difference between feeling overwhelmed and feeling in control. For <strong>agencies</strong> running scripts across ten or twenty clients, it is the foundation of any scalable content system.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            The practical effect: <strong>fewer revisions, faster delivery, and more confident first drafts</strong>. Clients who receive on-brand scripts from the first attempt trust the writer more and renew longer.
          </p>
        </div>
      </section>

      {/* Profile elements */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          What a client voice profile contains
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          A strong profile covers six core areas. Together, they give you everything you need to write a script that sounds like the client without asking them to repeat themselves.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profileElements.map((el) => (
            <Card
              key={el.title}
              className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <el.icon
                size={20}
                className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200"
              />
              <h3 className="font-semibold mb-1">{el.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
                {el.desc}
              </p>
              <p className="text-xs font-mono text-primary/80 bg-[var(--color-primary-tint)] rounded-lg px-3 py-2 leading-relaxed">
                {el.example}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Soft CTA */}
      <section className="max-w-3xl mx-auto px-5 pb-4">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Stop re-explaining your client&apos;s voice every time
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly is built around the client voice profile. Save a client&apos;s niche, tone, audience, and preferred style once — then generate platform-native scripts in their voice in under 60 seconds. No blank page, no briefing ChatGPT from scratch, no revisions that start with &ldquo;this doesn&apos;t sound like me.&rdquo; See how it works for{" "}
            <Link href="/youtube-scripts" className="text-primary underline underline-offset-2">
              YouTube
            </Link>
            ,{" "}
            <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">
              TikTok
            </Link>
            , and{" "}
            <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2">
              Instagram Reels
            </Link>
            .
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Try Scribtly free <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How to create one */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          How to create a client voice profile
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 leading-relaxed">
          You do not need a formal process to build a useful profile. The goal is to capture the information that lets you write for the client without asking them for context on every project. Here is a practical six-step approach.
        </p>
        <div className="space-y-5">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex gap-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-primary/30 transition-colors duration-150"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center text-primary text-sm font-bold">
                {step.n}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Example profile */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            An example client voice profile
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 leading-relaxed">
            Here is a realistic voice profile for a hypothetical client. Notice how each section gives the writer something specific and usable — not abstract descriptions but actionable guidance.
          </p>
          <Card className="font-mono text-sm leading-relaxed space-y-5 p-6">
            <div>
              <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Client</span>
              <p className="text-text-secondary dark:text-dark-muted">Jamie Thorne — Freelance Business Coach for New Consultants</p>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4">
              <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Niche</span>
              <p className="text-text-secondary dark:text-dark-muted">Helping ex-corporate professionals start and grow a profitable consulting business in their first 12 months.</p>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4">
              <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Target audience</span>
              <p className="text-text-secondary dark:text-dark-muted">Professionals aged 30–50 who have left (or are leaving) corporate jobs and want to monetise their expertise without the corporate structure. They are smart but uncertain. They want confidence and a clear plan.</p>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4">
              <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Tone</span>
              <p className="text-text-secondary dark:text-dark-muted">Direct, empathetic, and no-nonsense. Like a straight-talking mentor, not a motivational speaker. Honest about the difficulty, optimistic about the outcome.</p>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4">
              <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Phrases to use</span>
              <p className="text-text-secondary dark:text-dark-muted">"your expertise", "first client", "predictable income", "real business". Addresses viewer directly: "you already know more than you think."</p>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4">
              <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Avoid</span>
              <p className="text-text-secondary dark:text-dark-muted">"hustle", "passive income", "6-figure", "overnight success". No corporate jargon. No hype. No vague platitudes.</p>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4">
              <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Platforms</span>
              <p className="text-text-secondary dark:text-dark-muted">LinkedIn video and YouTube. 2–5 minutes on YouTube, 60–90 seconds on LinkedIn. Hooks are conversational, not flashy. Ends with a soft CTA to the newsletter or free guide.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Common mistakes when building a client voice profile
        </h2>
        <div className="space-y-5">
          {[
            {
              title: "Making it too vague",
              desc: "Describing a client's tone as 'friendly and professional' gives a writer almost nothing to work with. Every client thinks they are friendly and professional. Push for specifics: which words do they use? What do they sound like in person? Which existing content felt most right to them?",
            },
            {
              title: "Building it once and never updating it",
              desc: "A voice profile created at the start of a client relationship should evolve as you learn more. After six months of approved scripts, you know more about what works than you did on day one. Update the profile to reflect that knowledge.",
            },
            {
              title: "Confusing tone with topic",
              desc: "The voice profile is about how the client communicates, not what they communicate about. Topics change. The voice should stay consistent across all of them. Keep the profile focused on style, not subject matter.",
            },
            {
              title: "Not including examples",
              desc: "Abstract descriptions of tone are always weaker than concrete examples. If the client approved a script or post that perfectly captured their voice, save a reference to it. One good example is worth ten bullet points of description.",
            },
            {
              title: "Treating all clients the same",
              desc: "The whole point of a voice profile is that every client is different. Resist the temptation to use the same profile template with minor name changes. The distinct details — the phrases, the platform preferences, the CTA style — are what make scripts actually sound like that client.",
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

      {/* Where Scribtly fits */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            How Scribtly uses client voice profiles
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Scribtly is built around the client voice profile. When you add a client in Scribtly, you save their niche, tone, target audience, platform, and content preferences in one place. Every script you generate for that client automatically draws on that saved profile.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            The practical effect: you stop explaining the same context to your AI tool on every session. You stop re-writing prompts. You stop getting generic output that sounds like a press release. Instead, the first draft you receive is already calibrated to that client's voice, and you spend your time refining rather than rewriting.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            This is particularly useful for{" "}
            <Link href="/for-freelancers" className="text-primary underline underline-offset-2">
              freelancers
            </Link>{" "}
            juggling several clients — moving between a fitness coach&apos;s TikTok scripts and a SaaS founder&apos;s LinkedIn videos without getting the voices confused. And for{" "}
            <Link href="/for-agencies" className="text-primary underline underline-offset-2">
              agencies
            </Link>{" "}
            managing ten or twenty clients, it is the infrastructure that makes consistent quality possible at scale.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            Scribtly generates platform-native scripts — with hooks, body structure, and CTAs — based on the saved profile. You can create scripts for{" "}
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
            ,{" "}
            <Link href="/linkedin-video-scripts" className="text-primary underline underline-offset-2">
              LinkedIn video
            </Link>
            ,{" "}
            <Link href="/podcast-scripts" className="text-primary underline underline-offset-2">
              podcasts
            </Link>
            , and more — all consistent with the same client voice profile. See the full{" "}
            <Link href="/video-script-template" className="text-primary underline underline-offset-2">
              video script template
            </Link>{" "}
            for the structure each script follows.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
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
      </section>

      {/* Related links */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Related pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/ai-script-writer", label: "AI script writer overview" },
              { href: "/for-freelancers", label: "Scribtly for freelancers" },
              { href: "/for-agencies", label: "Scribtly for agencies" },
              { href: "/for-social-media-managers", label: "Scribtly for social media managers" },
              { href: "/video-script-template", label: "Free video script template" },
              { href: "/what-is-a-video-hook", label: "What is a video hook?" },
              { href: "/what-is-a-ugc-script", label: "What is a UGC script?" },
              { href: "/youtube-scripts", label: "YouTube script generator" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors duration-150"
              >
                <ArrowRight size={14} className="text-primary flex-shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Save your client&apos;s voice once. Generate scripts forever.
          </h2>
          <p className="text-white/75 mb-8">
            Scribtly stores your client&apos;s voice profile and generates platform-native scripts in their tone — in under 60 seconds. 5 free scripts, no card required.
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

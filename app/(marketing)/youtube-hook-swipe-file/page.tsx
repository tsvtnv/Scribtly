import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Zap,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "YouTube Hook Swipe File: 40+ hooks you can steal",
  description:
    "40+ proven YouTube hook examples organised by type. Curiosity, story, bold claim, problem, and pattern-interrupt hooks — copy, adapt, or generate in seconds.",
  keywords: [
    "youtube hook examples",
    "youtube hook swipe file",
    "youtube video hooks",
    "how to write a youtube hook",
    "youtube hook ideas",
    "video hook examples",
    "youtube intro hooks",
  ],
  alternates: { canonical: "/youtube-hook-swipe-file" },
  openGraph: {
    type: "website",
    url: "/youtube-hook-swipe-file",
    siteName: "Scribtly",
    title: "YouTube Hook Swipe File: 40+ hooks you can steal · Scribtly",
    description:
      "40+ proven YouTube hook examples organised by type. Copy, adapt, or generate in your client's voice in seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "YouTube Hook Swipe File" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Hook Swipe File: 40+ hooks you can steal · Scribtly",
    description:
      "40+ proven YouTube hook examples organised by type. Copy, adapt, or generate in your client's voice in seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "YouTube Hook Swipe File", item: `${SITE_URL}/youtube-hook-swipe-file` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a YouTube hook be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A YouTube hook should be 5–30 seconds. Shorter is almost always better. Your goal is to answer the unspoken question — 'why should I keep watching?' — before the viewer's finger reaches the back button. On average, viewers decide within the first 15 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a YouTube hook work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong hook creates a specific tension or curiosity that can only be resolved by watching the video. The best hooks make a bold claim, introduce a surprising fact, open a story loop, or pose a question the viewer desperately wants answered. Weak hooks describe the video instead of pulling the viewer in.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use the same hook style every time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Varying your hook type keeps your content feeling fresh and prevents viewers from tuning out because they know what's coming. Test curiosity hooks on educational videos, story hooks on personal content, and bold claim hooks on how-to videos.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these hooks for client work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — that's exactly what this swipe file is for. Use the formulas and adapt the language to fit your client's niche, tone, and brand voice. If you're managing multiple clients, Scribtly lets you save each client's voice profile and generate hooks that already sound like them.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between a hook and an intro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The hook is the very first line or two — its job is to stop the scroll and earn the next 10 seconds. The intro follows and sets up the context, the credibility, and the promise of the video. Many creators confuse the two and start with their intro instead of a hook, which is why so many videos lose viewers in the first 15 seconds.",
      },
    },
  ],
};

const hookCategories = [
  {
    icon: HelpCircle,
    label: "Curiosity hooks",
    desc: "Open a gap the viewer needs to close.",
    hooks: [
      "Most [niche] creators are doing [X] — and it's killing their [result].",
      "I tested [X] for 30 days. The result surprised me.",
      "There's a [result] hack that [audience] rarely talk about.",
      "The real reason your [content/product/strategy] isn't working.",
      "Nobody tells [audience] this when they start out.",
      "I found out why [common problem] actually happens — and it's not what you think.",
      "After [timeframe], I finally know what separates [good] from [great].",
      "This tiny [change/tweak] tripled my [result] in [timeframe].",
    ],
  },
  {
    icon: BookOpen,
    label: "Story hooks",
    desc: "Open a story loop the viewer wants resolved.",
    hooks: [
      "Eighteen months ago I [had a problem]. Today I'm going to show you exactly what changed.",
      "A client came to me last week with [problem]. Here's what I told them.",
      "I almost quit [X] because of this one thing. Then I discovered [solution].",
      "Three years ago, I made a [mistake]. It cost me [consequence]. This video is everything I wish I'd known.",
      "The moment I [action], everything changed. Here's what I did.",
      "I spent [timeframe] making [mistake]. One conversation fixed it.",
      "This [object/strategy/tool] sat on my [shelf/list] for six months. I tried it last week.",
    ],
  },
  {
    icon: Zap,
    label: "Bold claim hooks",
    desc: "Make a strong claim that demands proof.",
    hooks: [
      "[Common advice] is wrong. Here's what actually works.",
      "You don't need [commonly assumed requirement] to [achieve result].",
      "The best [tool/platform/strategy] for [audience] right now is not what most people recommend.",
      "[Popular method] is overrated. This is better.",
      "Stop [common action]. Do this instead.",
      "I'm going to show you how to [achieve result] in [short timeframe] — without [common obstacle].",
      "Everything you've been told about [topic] is making it harder, not easier.",
    ],
  },
  {
    icon: AlertCircle,
    label: "Problem hooks",
    desc: "Name the viewer's pain before they have to.",
    hooks: [
      "If your [content/business/strategy] isn't growing, it's probably because of this.",
      "You're spending hours on [task] and getting nothing back. Here's why.",
      "The reason [common goal] feels so hard — and how to make it easier.",
      "Most [audience] give up at this exact point. You don't have to.",
      "Here's what's actually stopping you from [desired outcome].",
      "If [problem] keeps happening to you, watch this first.",
      "You're one [small change] away from [result] — but nobody told you what it was.",
    ],
  },
  {
    icon: MessageSquare,
    label: "Pattern interrupt hooks",
    desc: "Break expectations before the viewer can scroll.",
    hooks: [
      "I'm not going to start this video the way you expect.",
      "[Unexpected outcome or fact]. Here's the full story.",
      "This is not a [type of video]. It's a [what it really is].",
      "By the end of this video, you'll [specific outcome]. I promise.",
      "Don't watch this video if [condition that excludes wrong viewers].",
      "Forget everything you know about [topic] for the next [X] minutes.",
      "I don't usually say this, but [unexpected statement].",
    ],
  },
  {
    icon: TrendingUp,
    label: "Result-first hooks",
    desc: "Lead with the outcome and make them earn the method.",
    hooks: [
      "Here's how I [achieved result] — step by step, nothing held back.",
      "In the next [X] minutes I'll show you exactly how to [result].",
      "This is the [result] system I use for every [client/project/video].",
      "How to go from [starting state] to [end state] in [timeframe].",
      "The exact [strategy/process/tool stack] that helped me [specific result].",
      "I hit [milestone]. This is everything that made the difference.",
    ],
  },
];

const hookMistakes = [
  {
    mistake: "Starting with 'Hey guys, welcome back to my channel'",
    fix: "Skip the greeting entirely. The first word should pull the viewer in — not tell them where they already are.",
  },
  {
    mistake: "Describing the video instead of hooking",
    fix: "Don't say 'In this video I'll cover three ways to...' — that's an index, not a hook. Open with the tension, the story, or the claim.",
  },
  {
    mistake: "Burying the hook after a long intro",
    fix: "Your hook should be the very first thing the viewer hears. No preamble.",
  },
  {
    mistake: "Making the hook too vague",
    fix: "Specificity earns trust. 'I made more money last month than in the previous six combined' beats 'I want to show you something that changed everything.'",
  },
  {
    mistake: "Promising something the video doesn't deliver",
    fix: "A hook must set a promise the video keeps. Clickbait that doesn't pay off destroys retention and damages your channel long term.",
  },
];

const faqs = [
  {
    q: "How long should a YouTube hook be?",
    a: "A YouTube hook should be 5–30 seconds. Shorter is almost always better. Your goal is to answer the unspoken question — 'why should I keep watching?' — before the viewer's finger reaches the back button. On average, viewers decide within the first 15 seconds.",
  },
  {
    q: "What makes a YouTube hook work?",
    a: "A strong hook creates a specific tension or curiosity that can only be resolved by watching the video. The best hooks make a bold claim, introduce a surprising fact, open a story loop, or pose a question the viewer desperately wants answered. Weak hooks describe the video instead of pulling the viewer in.",
  },
  {
    q: "Should I use the same hook style every time?",
    a: "No. Varying your hook type keeps your content feeling fresh and prevents viewers from tuning out because they know what's coming. Test curiosity hooks on educational videos, story hooks on personal content, and bold claim hooks on how-to videos.",
  },
  {
    q: "Can I use these hooks for client work?",
    a: "Yes — that's exactly what this swipe file is for. Use the formulas and adapt the language to fit your client's niche, tone, and brand voice. If you're managing multiple clients, Scribtly lets you save each client's voice profile and generate hooks that already sound like them.",
  },
  {
    q: "What's the difference between a hook and an intro?",
    a: "The hook is the very first line or two — its job is to stop the scroll and earn the next 10 seconds. The intro follows and sets up the context, the credibility, and the promise of the video. Many creators confuse the two and start with their intro instead of a hook.",
  },
];

export default function YouTubeHookSwipeFilePage() {
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
            Free Swipe File
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            YouTube hook swipe file
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            40+ proven hook formulas organised by type — curiosity, story, bold claim, problem, and pattern interrupt. Copy and adapt them for any niche, or let Scribtly generate a hook in your client&apos;s voice in seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Generate hooks with AI <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/youtube-scripts">
              <Button size="lg" variant="outline">YouTube script generator</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is a hook */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          What is a YouTube hook?
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          A YouTube hook is the first 5–30 seconds of a video. Its only job is to give the viewer a reason to keep watching. Not to introduce yourself. Not to recap the video. Not to say &quot;smash that subscribe button.&quot;
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          The hook must create a tension — a curiosity gap, an open story loop, a bold claim, or a named problem — that can only be resolved by watching the rest of the video.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          For a deeper look at the mechanics, read our guide on{" "}
          <Link href="/what-is-a-video-hook" className="text-primary underline underline-offset-2 hover:text-primary/80">
            what is a video hook
          </Link>
          . For a full script structure including hooks, see the{" "}
          <Link href="/youtube-script-template" className="text-primary underline underline-offset-2 hover:text-primary/80">
            free YouTube script template
          </Link>
          .
        </p>
      </section>

      {/* Swipe file */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            The swipe file
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
            Six hook types, 40+ formulas. Replace the brackets with your topic, niche, or client context. The formulas work across any niche — fitness, finance, SaaS, coaching, beauty, or B2B.
          </p>

          <div className="space-y-10">
            {hookCategories.map((cat) => (
              <div key={cat.label}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-primary-tint)] text-primary">
                    <cat.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{cat.label}</h3>
                    <p className="text-xs text-text-secondary dark:text-dark-muted">{cat.desc}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] divide-y divide-[var(--color-border)]">
                  {cat.hooks.map((hook, i) => (
                    <div key={i} className="px-5 py-3.5 font-mono text-sm text-text-secondary dark:text-dark-muted hover:bg-[var(--color-surface)] transition-colors">
                      {hook}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Skip the swipe file. Generate hooks in your client&apos;s voice.
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates platform-native hooks from a saved client voice profile — you paste the topic, pick the platform, and get a full script with hook included in under 60 seconds. No adapting formulas. No re-explaining tone to ChatGPT. Just a ready-to-use first draft.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
                Try it free — 5 scripts included <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/for-freelancers">
              <Button size="lg" variant="outline">For freelancers</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Common hook mistakes */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            Hook mistakes that kill retention
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-10 max-w-xl">
            The formulas above only work if you avoid these common errors. Most weak hooks come from one of these five habits.
          </p>
          <div className="space-y-4">
            {hookMistakes.map((item, i) => (
              <Card key={i} className="group hover:border-primary/40 transition-all duration-200">
                <p className="text-xs font-semibold text-rose-500 uppercase tracking-wide mb-1.5">Mistake</p>
                <p className="font-medium mb-2">{item.mistake}</p>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1.5">Fix</p>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{item.fix}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Scribtly fits */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          How Scribtly helps with hooks at scale
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Swipe files are useful for one-off scripts. But if you&apos;re writing scripts for multiple clients across multiple platforms each week, adapting hook formulas manually for each client&apos;s voice is slow and inconsistent.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Scribtly lets you save a client voice profile — niche, tone, audience, brand phrases, style notes — and generate a full{" "}
          <Link href="/youtube-scripts" className="text-primary underline underline-offset-2 hover:text-primary/80">
            YouTube script
          </Link>
          ,{" "}
          <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2 hover:text-primary/80">
            TikTok script
          </Link>
          , or{" "}
          <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2 hover:text-primary/80">
            Instagram Reels script
          </Link>{" "}
          — hook and all — in under 60 seconds.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
          For freelancers and{" "}
          <Link href="/for-agencies" className="text-primary underline underline-offset-2 hover:text-primary/80">
            agencies
          </Link>{" "}
          managing multiple clients, it means the hook already sounds like the client — not like generic AI output that needs a full rewrite before you can send it.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          If you want to see how the full script structure works beyond the hook, the{" "}
          <Link href="/video-script-template" className="text-primary underline underline-offset-2 hover:text-primary/80">
            video script template
          </Link>{" "}
          covers every section from hook to CTA.
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
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{faq.a}</p>
              </div>
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
            Stop adapting hook formulas. Generate them already in your client&apos;s voice.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. See how fast your first draft can be.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                Start free <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-white/10 text-white border-hair border-white/30 hover:bg-white/20">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

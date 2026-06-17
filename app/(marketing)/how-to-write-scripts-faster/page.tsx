import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Users,
  FileText,
  Repeat2,
  AlertCircle,
} from "lucide-react";

export const metadata = {
  title: "How to write scripts faster without losing quality",
  description:
    "Stop starting from a blank page. Here's the system freelance script writers use to produce better first drafts in less time — without cutting corners.",
  keywords: [
    "how to write scripts faster",
    "script writing workflow",
    "freelance script writing tips",
    "write video scripts quickly",
    "script writing productivity",
    "AI script writing workflow",
    "client script writing system",
    "video script first draft",
  ],
  alternates: { canonical: "/how-to-write-scripts-faster" },
  openGraph: {
    type: "article",
    url: "/how-to-write-scripts-faster",
    siteName: "Scribtly",
    title: "How to write scripts faster without losing quality · Scribtly",
    description:
      "Stop starting from a blank page. Here's the system freelance script writers use to produce better first drafts in less time — without cutting corners.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "How to write scripts faster without losing quality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to write scripts faster without losing quality · Scribtly",
    description:
      "Stop starting from a blank page. Here's the system freelance script writers use to produce better first drafts in less time — without cutting corners.",
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
      name: "How to write scripts faster without losing quality",
      item: `${SITE_URL}/how-to-write-scripts-faster`,
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to write scripts faster without losing quality",
  description:
    "The system freelance script writers use to produce better first drafts in less time — without cutting corners.",
  datePublished: "2026-06-17",
  dateModified: "2026-06-17",
  author: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  url: `${SITE_URL}/how-to-write-scripts-faster`,
  keywords:
    "script writing, freelance scripts, write faster, video scripts, content workflow",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should it take to write a YouTube script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A professional freelance script writer with a good system should be able to produce a first draft for an 8–12 minute YouTube video in 45–60 minutes, then refine it in another 15–20 minutes. If you're regularly taking two to three hours, the bottleneck is usually setup — re-learning the client and starting from a blank page — rather than writing speed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the fastest way to write a TikTok script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the structure already in place: hook (one sentence), body (three short beats), CTA (one action). Fill in the blanks rather than writing from scratch. With the client's voice profile loaded, a solid TikTok first draft should take 10–15 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Does writing faster mean lower quality scripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not if the speed comes from removing setup friction rather than cutting corners on craft. A script writer who spends 30 minutes re-learning a client before writing isn't producing better work — they're just taking longer. Remove the friction, and quality stays the same or improves because you're spending more time on the parts that actually matter.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use AI to write scripts faster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI works well as a first-draft accelerator, not a final output tool. The key is giving it the client's voice profile before generating — generic AI output needs a full rewrite, which defeats the purpose. Calibrated AI output (generated with saved voice, platform, and niche) needs refinement, which is significantly faster.",
      },
    },
    {
      "@type": "Question",
      name: "What is batching in script writing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Batching means writing multiple scripts of the same type in a single session rather than spreading them across different days. When you're in the right headspace for TikTok scripts, writing three in a row is dramatically faster than writing one, switching to another client, then returning to TikTok mode two days later.",
      },
    },
    {
      "@type": "Question",
      name: "How do I save time when writing for multiple clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Build a voice profile for each client once and refer to it before every session. This removes the 15–20 minutes of re-familiarisation that most freelancers waste at the start of each job. Tools like Scribtly store these profiles and pull them into every script generation automatically.",
      },
    },
  ],
};

const bottlenecks = [
  {
    icon: Clock,
    title: "Re-learning the client",
    desc: "Reading old emails and previous scripts to remember what they sound like. This happens every session without a saved voice profile.",
  },
  {
    icon: FileText,
    title: "Starting from a blank page",
    desc: "No structure in place means the first 10 minutes go on deciding how to open, what format to use, and how long each section should be.",
  },
  {
    icon: Repeat2,
    title: "Context switching between clients",
    desc: "Jumping from a fitness coach to a B2B SaaS founder to a food creator in the same morning. Each switch costs 15–20 minutes of mental reset.",
  },
  {
    icon: AlertCircle,
    title: "Editing while writing",
    desc: "Stopping to improve sentences before the draft is done breaks momentum and produces worse output than writing fast first and editing once.",
  },
];

const platformTemplates = [
  {
    platform: "YouTube (8–12 min)",
    structure: "Hook → Context → 3–5 main points → CTA → Outro",
  },
  {
    platform: "TikTok (30–60 sec)",
    structure: "Hook → Body (3 short beats) → CTA",
  },
  {
    platform: "Instagram Reels",
    structure: "Hook → One insight → Visual CTA",
  },
  {
    platform: "YouTube Shorts",
    structure: "Hook → Single point → Payoff",
  },
  {
    platform: "LinkedIn video",
    structure: "Business context → Core point → Professional CTA",
  },
  {
    platform: "Podcast intro",
    structure: "Topic tease → Host positioning → Episode preview",
  },
];

const aiWorkflow = [
  {
    step: "1",
    title: "Load the client's voice profile",
    desc: "Niche, tone, audience, signature phrases, and what to avoid. This is what stops the output being generic.",
  },
  {
    step: "2",
    title: "Generate a platform-native first draft",
    desc: "With the right structure loaded — hook, body, CTA — for the specific platform.",
  },
  {
    step: "3",
    title: "Refine for accuracy and voice",
    desc: "15–20 minutes editing the output for the client's specific angle and any details the AI couldn't know.",
  },
  {
    step: "4",
    title: "Deliver",
    desc: "A client-ready script that sounds like them — not like generic AI output.",
  },
];

const mistakes = [
  {
    title: "Waiting for inspiration",
    desc: "Scripts for clients are a craft, not a creative impulse. Load the context, open the structure, fill it in. Inspiration arrives during the process — not before it.",
  },
  {
    title: "Over-researching before writing",
    desc: "Gather the three to five key points you need, then write. You can add nuance in the edit. Research loops are a common reason sessions run over time.",
  },
  {
    title: "Writing without a structure in mind",
    desc: "Decide the format before you open the doc. Hook → body → CTA takes 20 seconds to decide and saves 10 minutes of meandering.",
  },
  {
    title: "Re-learning every client from scratch",
    desc: "The more client context you carry forward and reuse, the faster each subsequent script becomes. Build profiles, don't rediscover.",
  },
  {
    title: "Spreading scripts across the week",
    desc: "Writing one TikTok script on Monday and another on Thursday means two context-switch costs instead of one. Batch where you can.",
  },
];

export default function HowToWriteScriptsFasterPage() {
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

      <article className="max-w-2xl mx-auto px-5 pt-16 pb-20">

        {/* Breadcrumb */}
        <nav className="mb-8 text-xs text-text-secondary dark:text-dark-muted">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-1.5">›</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span className="mx-1.5">›</span>
          <span>How to write scripts faster</span>
        </nav>

        {/* Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-medium uppercase tracking-wide text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border-hair border-[var(--color-border)] rounded px-1.5 py-0.5">
            Freelance workflow
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border-hair border-[var(--color-border)] rounded px-1.5 py-0.5">
            Script writing
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug mb-4">
          How to write scripts faster without losing quality
        </h1>

        {/* Byline */}
        <div className="flex items-center gap-3 text-xs text-text-secondary dark:text-dark-muted mb-8 pb-8 border-b-hair border-[var(--color-border)]">
          <span>17 June 2026</span>
          <span>·</span>
          <span>6 min read</span>
        </div>

        {/* Intro */}
        <div className="prose prose-sm max-w-none text-[var(--color-text)] [&_p]:mb-4 [&_p]:leading-relaxed mb-10">
          <p>
            When freelance script writers say they want to write faster, they usually mean they want
            the process to stop feeling so hard to start. The actual writing — once you know what
            you&apos;re saying and who you&apos;re saying it to — goes quickly enough.
          </p>
          <p>
            The slowdown comes earlier. You&apos;re re-reading old emails to remember what the client
            sounds like. You&apos;re staring at a blank doc wondering what format this platform actually
            wants. You&apos;re editing sentences before the paragraph is even finished.
          </p>
          <p>
            Every one of those delays adds up to hours across a working week. Fix the setup, and
            the speed follows.
          </p>
        </div>

        {/* Soft CTA */}
        <div className="bg-[var(--color-surface)] border-hair border-[var(--color-border)] rounded-lg p-5 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium mb-0.5">Already know the theory?</p>
            <p className="text-xs text-text-secondary dark:text-dark-muted">
              Scribtly generates platform-ready first drafts in your client&apos;s saved voice — so you
              start refining, not writing from scratch.
            </p>
          </div>
          <Link href="/signup" className="shrink-0">
            <Button size="sm">Try free</Button>
          </Link>
        </div>

        {/* Section 1 — The bottlenecks */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-2">The real bottleneck isn&apos;t writing speed</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            Most script writers don&apos;t slow themselves down during writing — they slow themselves
            down before it. These are the four most common hidden time costs.
          </p>

          <div className="grid gap-4">
            {bottlenecks.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-4 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <div className="mt-0.5 shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">{title}</p>
                  <p className="text-xs text-text-secondary dark:text-dark-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — Platform templates */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-2">Build a starting structure for every platform</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            The single most effective thing you can do to write scripts faster is to stop starting from
            nothing. Create a skeleton structure for each platform you regularly write for. These
            aren&apos;t rigid formulas — they&apos;re starting points that remove the &ldquo;where do I begin?&rdquo; problem
            so you can get to the actual ideas faster.
          </p>

          <div className="rounded-lg border-hair border-[var(--color-border)] overflow-hidden">
            {platformTemplates.map(({ platform, structure }, i) => (
              <div
                key={platform}
                className={`flex flex-col sm:flex-row gap-1 sm:gap-4 px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-[var(--color-surface)]" : ""
                }`}
              >
                <span className="font-medium w-44 shrink-0">{platform}</span>
                <span className="text-text-secondary dark:text-dark-muted">{structure}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-text-secondary dark:text-dark-muted mt-4 leading-relaxed">
            Keep these in a doc you open before every session. After a few weeks they&apos;ll be automatic —
            but having them written down removes the decision entirely in the meantime.
          </p>
        </section>

        {/* Section 3 — Save client context */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-2">Save client context before you write a single word</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4 leading-relaxed">
            One of the hidden time costs in freelance script writing is re-learning the client at the
            start of every session. You wrote for them three weeks ago. Now you&apos;re scanning old emails
            trying to remember their tone, their catchphrases, their audience.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4 leading-relaxed">
            This costs you 10–20 minutes every single time. Across 10 clients over a month, that&apos;s
            hours of billable time spent on admin, not craft.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            The fix is a{" "}
            <Link href="/what-is-a-client-voice-profile" className="text-primary hover:underline">
              client voice profile
            </Link>{" "}
            — a short document that captures:
          </p>

          <ul className="space-y-2 mb-6">
            {[
              "Their audience (described in one sentence, not just demographics)",
              "Their tone words — usually three: direct, warm, no-nonsense, etc.",
              "Phrases they use regularly (their brand language)",
              "What they'd never say",
              "Their preferred CTA style — follow, save, comment, etc.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            Build this once per client. Read it before every session. Better still — use a tool
            that stores it automatically and loads it into every script without you having to ask.
            See the full guide on{" "}
            <Link href="/what-is-a-client-voice-profile" className="text-primary hover:underline">
              building a client voice profile
            </Link>
            .
          </p>
        </section>

        {/* Section 4 — Write fast, edit once */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-2">Write fast first, edit once</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4 leading-relaxed">
            A common mistake is trying to edit while writing. Every time you stop to improve a sentence
            before the paragraph is finished, you break the momentum that makes fast drafting possible —
            and you end up with worse output than if you&apos;d just kept going.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4 leading-relaxed">
            The approach that consistently produces better first drafts: write the whole draft without
            stopping. Accept that some of it will be rough. Don&apos;t reread the previous paragraph before
            writing the next one. Keep moving.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            Then — when the draft is complete — do one focused edit pass. You&apos;re working from the full
            picture of the script, not improving sentences in isolation. It&apos;s faster, and the result
            is more coherent.
          </p>
        </section>

        {/* Section 5 — Batching */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-2">Batch your scripts, don&apos;t switch contexts</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4 leading-relaxed">
            If you have three YouTube scripts to write this week, don&apos;t write one on Monday, one on
            Wednesday, and one on Friday. Write all three on the same day.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4 leading-relaxed">
            The context switch between clients, formats, and topics is where the time goes. When
            you&apos;re deep in YouTube script mode — hooks calibrated, pacing dialled in, client voice
            loaded — churning out a second and third script is dramatically faster than returning to
            that mode cold the next morning.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            Batching isn&apos;t always possible with every client, but where it is — especially for clients
            you produce consistent monthly work for — it&apos;s one of the fastest ways to increase your
            output without working more hours. Combine it with a tool like{" "}
            <Link href="/ai-script-writer" className="text-primary hover:underline">
              Scribtly&apos;s AI script writer
            </Link>{" "}
            and a batching session that used to take a full day takes a morning.
          </p>
        </section>

        {/* Mid CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-14 text-center">
          <Zap className="w-6 h-6 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Generate a first draft in under 60 seconds</h3>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
            Scribtly stores your client&apos;s voice profile and generates platform-ready scripts in the
            right format. You start with a calibrated first draft — not a blank page.
          </p>
          <Link href="/signup">
            <Button>
              Start free — no card required
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Section 6 — AI workflow */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-2">Where AI fits into a faster workflow</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            AI tools are excellent at producing structured first drafts you can refine quickly. The
            keyword is <em>calibrated</em> — generic AI output needs rewriting, which is just as slow
            as starting from scratch. Calibrated output (generated with the client&apos;s saved voice,
            platform format, and niche) needs refining, which is significantly faster.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            The four-step workflow that works:
          </p>

          <div className="space-y-3 mb-6">
            {aiWorkflow.map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex gap-4 p-4 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">{title}</p>
                  <p className="text-xs text-text-secondary dark:text-dark-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            This workflow works for{" "}
            <Link href="/youtube-scripts" className="text-primary hover:underline">
              YouTube scripts
            </Link>
            ,{" "}
            <Link href="/tiktok-scripts" className="text-primary hover:underline">
              TikTok scripts
            </Link>
            ,{" "}
            <Link href="/instagram-reels-scripts" className="text-primary hover:underline">
              Instagram Reels
            </Link>
            ,{" "}
            <Link href="/linkedin-video-scripts" className="text-primary hover:underline">
              LinkedIn video
            </Link>
            , and any other format your clients need.
          </p>
        </section>

        {/* Section 7 — Realistic benchmarks */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-2">What fast actually looks like in practice</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            A professional freelance script writer with a good system should be able to hit these times
            consistently:
          </p>

          <div className="rounded-lg border-hair border-[var(--color-border)] overflow-hidden mb-6">
            {[
              { format: "TikTok / Reels first draft", time: "10–20 min" },
              { format: "YouTube Shorts first draft", time: "15–20 min" },
              { format: "YouTube long-form first draft", time: "45–60 min" },
              { format: "LinkedIn video first draft", time: "20–30 min" },
              { format: "Edit pass on any first draft", time: "15–20 min" },
            ].map(({ format, time }, i) => (
              <div
                key={format}
                className={`flex justify-between px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-[var(--color-surface)]" : ""
                }`}
              >
                <span>{format}</span>
                <span className="font-medium text-primary">{time}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            If you&apos;re regularly taking longer than this, the issue isn&apos;t your writing speed — it&apos;s the
            setup time, context switching, or starting from too blank a page. Fix the system, and
            the speed follows. Resources that help:{" "}
            <Link href="/for-freelancers" className="text-primary hover:underline">
              Scribtly for freelancers
            </Link>{" "}
            and{" "}
            <Link href="/for-agencies" className="text-primary hover:underline">
              Scribtly for agencies
            </Link>
            .
          </p>
        </section>

        {/* Section 8 — Common mistakes */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-2">Common mistakes that slow script writers down</h2>

          <div className="space-y-4">
            {mistakes.map(({ title, desc }) => (
              <div key={title} className="border-l-2 border-primary/30 pl-4">
                <p className="text-sm font-medium mb-1">{title}</p>
                <p className="text-xs text-text-secondary dark:text-dark-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links section */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-4">Related reading</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/youtube-script-template", label: "YouTube Script Template" },
              { href: "/tiktok-script-template", label: "TikTok Script Template" },
              { href: "/video-script-template", label: "Video Script Template" },
              { href: "/what-is-a-client-voice-profile", label: "What Is a Client Voice Profile?" },
              { href: "/youtube-hook-swipe-file", label: "YouTube Hook Swipe File" },
              { href: "/how-to-stop-scripts-sounding-like-ai", label: "How to Stop Scripts Sounding Like AI" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 p-3 rounded-lg border-hair border-[var(--color-border)] hover:border-primary/40 hover:bg-[var(--color-surface)] transition-colors text-sm"
              >
                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-6">Frequently asked questions</h2>

          <div className="space-y-5">
            {faqJsonLd.mainEntity.map((item) => (
              <div key={item.name} className="border-b-hair border-[var(--color-border)] pb-5 last:border-0">
                <h3 className="text-sm font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="mt-12 p-6 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-center">
          <Users className="w-6 h-6 text-primary mx-auto mb-3" />
          <h2 className="font-semibold mb-2">Save your client&apos;s voice once. Generate scripts faster.</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
            Scribtly stores each client&apos;s voice profile and generates platform-native first drafts
            in under 60 seconds. Free to start — no card required.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Start free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <p className="text-xs text-text-secondary dark:text-dark-muted mt-3">
            Works for{" "}
            <Link href="/for-freelancers" className="text-primary hover:underline">freelancers</Link>
            ,{" "}
            <Link href="/for-agencies" className="text-primary hover:underline">agencies</Link>
            , and{" "}
            <Link href="/for-content-creators" className="text-primary hover:underline">content creators</Link>.
          </p>
        </div>
      </article>
    </>
  );
}

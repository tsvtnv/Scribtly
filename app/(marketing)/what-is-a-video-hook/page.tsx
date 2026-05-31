import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  MessageSquare,
  Eye,
  AlertCircle,
} from "lucide-react";

export const metadata = {
  title: "What is a video hook? (Definition + examples)",
  description:
    "A video hook is the opening line that stops the scroll. Learn what makes a great hook, see examples for TikTok, YouTube, and Reels, and write better hooks faster.",
  keywords: [
    "what is a video hook",
    "video hook examples",
    "how to write a video hook",
    "hook for video script",
    "youtube hook",
    "tiktok hook",
    "short-form video hook",
    "pattern interrupt hook",
  ],
  alternates: { canonical: "/what-is-a-video-hook" },
  openGraph: {
    type: "website",
    url: "/what-is-a-video-hook",
    siteName: "Scribtly",
    title: "What is a video hook? (Definition + examples) · Scribtly",
    description:
      "A video hook is the opening line that stops the scroll. Learn what makes a great hook, see examples for TikTok, YouTube, and Reels, and write better hooks faster.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "What is a video hook?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a video hook? (Definition + examples) · Scribtly",
    description:
      "A video hook is the opening line that stops the scroll. Learn what makes a great hook, see examples for TikTok, YouTube, and Reels, and write better hooks faster.",
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
      name: "What Is a Video Hook?",
      item: `${SITE_URL}/what-is-a-video-hook`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a video hook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A video hook is the opening line or moment of a video designed to grab the viewer's attention and stop them from scrolling past. On platforms like TikTok, YouTube, and Instagram Reels, viewers decide within 1–3 seconds whether to keep watching. The hook is what wins — or loses — that decision.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a video hook be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For short-form video (TikTok, Reels, Shorts), the hook should land within the first 1–3 seconds — typically one punchy line. For YouTube long-form, you have slightly more room: 5–15 seconds to set up the tension before the title card or intro. The rule is simple: say the most compelling thing first.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good video hook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good hook creates immediate curiosity, tension, or stakes. It answers the viewer's subconscious question: 'Why should I keep watching this?' Strong hooks often use bold claims, counterintuitive statements, relatable pain points, or open loops that can only be closed by finishing the video.",
      },
    },
    {
      "@type": "Question",
      name: "What is a pattern interrupt in video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A pattern interrupt is a hook technique that breaks the viewer's autopilot scroll behaviour — usually with an unexpected visual, a surprising opening statement, or an abrupt cut-in mid-action. It forces the brain to pay attention because something doesn't match the expected pattern.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI write video hooks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tools like Scribtly generate platform-native hooks as part of a full script structure. Because Scribtly saves each client's voice profile, the hooks it generates match the client's tone and audience — rather than sounding like generic AI output.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a hook and an intro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hook is the very first moment — the line or image that catches attention. The intro follows immediately after: it briefly sets up what the video is about and why the viewer should care. On short-form platforms, the distinction barely exists. On YouTube, the hook wins the click and the intro earns the watch-through.",
      },
    },
  ],
};

const hookTypes = [
  {
    icon: Zap,
    title: "Bold claim",
    desc: "Open with a statement that challenges what the viewer thinks they know.",
    example: '"Most creators waste their first 5 seconds. Here\'s how to fix it."',
  },
  {
    icon: MessageSquare,
    title: "Question",
    desc: "Pose a question the viewer needs answered — one they can't easily Google.",
    example: '"Why do some videos go viral with terrible editing?"',
  },
  {
    icon: TrendingUp,
    title: "Relatable pain",
    desc: "Name a frustration the viewer already feels. They feel seen and stay watching.",
    example: '"You\'ve been posting for 6 months and still getting 200 views."',
  },
  {
    icon: Eye,
    title: "Counterintuitive",
    desc: "Say the opposite of what they expect. Forces the brain to stop and reconsider.",
    example: '"Stop trying to go viral. It\'s killing your channel growth."',
  },
  {
    icon: AlertCircle,
    title: "Open loop",
    desc: "Tease a reveal that can only happen at the end. Creates a reason to stay.",
    example: '"By the end of this video, I\'ll show you the exact system I used."',
  },
  {
    icon: Sparkles,
    title: "Pattern interrupt",
    desc: "Break the expected scroll pattern with an unexpected visual or statement cut-in.",
    example: '"Wait — you\'re writing hooks completely backwards."',
  },
];

const faqs = [
  {
    q: "What is a video hook?",
    a: "A video hook is the opening line or moment of a video designed to grab the viewer's attention and stop them from scrolling past. On platforms like TikTok, YouTube, and Instagram Reels, viewers decide within 1–3 seconds whether to keep watching. The hook is what wins — or loses — that decision.",
  },
  {
    q: "How long should a video hook be?",
    a: "For short-form video (TikTok, Reels, Shorts), the hook should land within the first 1–3 seconds — typically one punchy line. For YouTube long-form, you have slightly more room: 5–15 seconds to set up the tension before the title card or intro. The rule is simple: say the most compelling thing first.",
  },
  {
    q: "What makes a good video hook?",
    a: "A good hook creates immediate curiosity, tension, or stakes. It answers the viewer's subconscious question: 'Why should I keep watching this?' Strong hooks often use bold claims, counterintuitive statements, relatable pain points, or open loops that can only be closed by finishing the video.",
  },
  {
    q: "What is a pattern interrupt in video?",
    a: "A pattern interrupt is a hook technique that breaks the viewer's autopilot scroll behaviour — usually with an unexpected visual, a surprising opening statement, or an abrupt cut-in mid-action. It forces the brain to pay attention because something doesn't match the expected pattern.",
  },
  {
    q: "Can AI write video hooks?",
    a: "Yes. Tools like Scribtly generate platform-native hooks as part of a full script structure. Because Scribtly saves each client's voice profile, the hooks it generates match the client's tone and audience — rather than sounding like generic AI output.",
  },
  {
    q: "What is the difference between a hook and an intro?",
    a: "A hook is the very first moment — the line or image that catches attention. The intro follows immediately after: it briefly sets up what the video is about and why the viewer should care. On short-form platforms, the distinction barely exists. On YouTube, the hook wins the click and the intro earns the watch-through.",
  },
];

export default function WhatIsAVideoHookPage() {
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
            What is a video hook?
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            A video hook is the opening line or moment that stops the scroll and makes someone keep watching. It is the most important sentence in any video script — and the hardest to write well.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Generate hooks with Scribtly <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/ai-script-writer">
              <Button size="lg" variant="outline">See how it works</Button>
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
          A <strong>video hook</strong> is the opening line, image, or sequence of a video that grabs the viewer's attention before they decide to scroll away. On TikTok, Instagram Reels, YouTube Shorts, and even long-form YouTube, the hook is your first — and often only — chance to earn a watch.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Most platforms surface video in feeds where the viewer is actively looking for a reason <em>not</em> to stop. A strong hook answers the question every viewer is silently asking: <strong>"Why should I keep watching this?"</strong>
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          The hook is always the first thing a viewer hears or sees. It is the sentence before the title card, the frame before the intro music, the line before "welcome back." If the hook fails, the rest of the script does not matter.
        </p>
      </section>

      {/* Why hooks matter */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Why the hook is the most important part of any script
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Platform algorithms reward watch time and completion rate. A weak hook sends viewers away in seconds, which signals the algorithm that the content is not worth showing to more people.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            A strong hook keeps people watching for longer. That higher retention tells the algorithm the video is worth distributing to a wider audience.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            For <strong>short-form video</strong> (TikTok, Reels, Shorts), the hook needs to land in <strong>1–3 seconds</strong>. One wrong sentence and the viewer is gone. For <strong>YouTube long-form</strong>, you have a slightly wider window — around 5–15 seconds — before you need to pay off the initial tension.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            This is why freelance script writers, social media managers, and content agencies spend disproportionate time on hooks. Getting the first line right is not optional — it is the job.
          </p>
        </div>
      </section>

      {/* Hook types */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Six types of video hook
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Most effective hooks fall into one of these six categories. The best creators mix them depending on the platform, topic, and client voice.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hookTypes.map((h) => (
            <Card
              key={h.title}
              className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <h.icon
                size={20}
                className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200"
              />
              <h3 className="font-semibold mb-1">{h.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
                {h.desc}
              </p>
              <p className="text-xs font-mono text-primary/80 bg-[var(--color-primary-tint)] rounded-lg px-3 py-2 leading-relaxed">
                {h.example}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Soft CTA */}
      <section className="max-w-3xl mx-auto px-5 pb-4">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Stop writing hooks from scratch
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates platform-native hooks as part of every full script — calibrated to your client's saved voice profile and the platform you are writing for. No blank page. No generic output.
            See how it works for{" "}
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
              Generate 5 scripts free <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Hook examples by platform */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Video hook examples by platform
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 max-w-xl leading-relaxed">
          The same hook formula can look very different depending on where the video lives. Here are practical examples for the three most common short-form and long-form platforms.
        </p>

        <div className="space-y-8">
          {/* TikTok */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-primary-tint)] text-primary text-xs font-bold">TK</span>
              TikTok hooks
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
              TikTok hooks need to land in under 2 seconds. They are almost always verbal — the creator speaks the hook directly to camera before any context is given.
            </p>
            <div className="space-y-2">
              {[
                '"I went from 200 views to 200k in 30 days. Here\'s what actually changed."',
                '"Nobody tells freelancers this, but it\'s the reason you\'re undercharging."',
                '"If your TikTok isn\'t growing, it\'s not your content — it\'s this one thing."',
              ].map((ex) => (
                <div key={ex} className="text-xs font-mono text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 leading-relaxed">
                  {ex}
                </div>
              ))}
            </div>
          </div>

          {/* YouTube */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-primary-tint)] text-primary text-xs font-bold">YT</span>
              YouTube hooks
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
              YouTube hooks often work alongside a strong title and thumbnail. The hook on screen reinforces the promise the title made — and adds a layer of tension that makes the viewer want to stay for the resolution.
            </p>
            <div className="space-y-2">
              {[
                '"This single change to my content strategy tripled my monthly revenue — and I\'ve never talked about it publicly until now."',
                '"Most creators spend 80% of their time on the wrong part of the script. I did too, until I figured this out."',
                '"By the end of this video you\'ll have a repeatable script system that takes less than 30 minutes per video."',
              ].map((ex) => (
                <div key={ex} className="text-xs font-mono text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 leading-relaxed">
                  {ex}
                </div>
              ))}
            </div>
          </div>

          {/* Reels */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-primary-tint)] text-primary text-xs font-bold">IG</span>
              Instagram Reels hooks
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-muted mb-3 leading-relaxed">
              Reels hooks often appear as on-screen text overlaid on a visual — or are spoken into camera in the first breath. On-screen text hooks are especially powerful because they work even with sound off.
            </p>
            <div className="space-y-2">
              {[
                '"The script mistake I see on every client Reel (and how to fix it in 30 seconds)"',
                '"You don\'t have a content problem. You have a hook problem."',
                '"3 things I stopped doing that doubled my client\'s engagement overnight."',
              ].map((ex) => (
                <div key={ex} className="text-xs font-mono text-text-secondary dark:text-dark-muted bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 leading-relaxed">
                  {ex}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mistakes */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Common hook mistakes to avoid
          </h2>
          <div className="space-y-5">
            {[
              {
                title: "Starting with 'Hey guys, welcome back'",
                desc: "This tells the viewer nothing interesting is coming. It wastes the most valuable seconds in the video. Cut it entirely — start with the hook.",
              },
              {
                title: "Making the hook too vague",
                desc: "\"Today I want to talk about something really important\" creates zero tension. Hooks need specificity. The more specific the claim or question, the more compelling it is.",
              },
              {
                title: "Overpromising",
                desc: "A hook that promises \"I made £1 million from one video\" when that is not what the video delivers creates a drop-off the moment the viewer realises the mismatch. The hook must connect to what the video actually delivers.",
              },
              {
                title: "Writing the hook last",
                desc: "Some creators write the body of the script first and add the hook at the end. This often produces weak hooks because the writer is tired and just summarises the video. Write the hook first — or at least revisit it after the body is done.",
              },
              {
                title: "Using the same hook formula every time",
                desc: "If every video starts with a bold claim, your audience becomes immune to it. Mix hook types across your content to keep the pattern fresh.",
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
        </div>
      </section>

      {/* Where Scribtly fits */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          How Scribtly handles hooks
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Every script Scribtly generates starts with a platform-native hook — not a placeholder, not a generic sentence, but a proper opening line matched to the platform and the client's voice.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          When you save a client voice profile in Scribtly — their niche, tone, audience, preferred style — the generated hooks are calibrated to that profile. A fitness coach's hook sounds different from a SaaS founder's hook. Scribtly keeps that distinction rather than defaulting to the same generic formula every time.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          For{" "}
          <Link href="/for-freelancers" className="text-primary underline underline-offset-2">
            freelancers
          </Link>{" "}
          writing scripts across multiple clients, this means not having to reinvent the hook approach each time. For{" "}
          <Link href="/for-agencies" className="text-primary underline underline-offset-2">
            agencies
          </Link>{" "}
          running content at volume, it means consistent hook quality without briefing a writer from scratch on every project.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          You can also use Scribtly's output as a starting point — take the generated hook, edit the wording, and use the structure as a template for your own variation. Most writers find that even when they edit the hook, having a strong first draft to react to is faster than starting from blank. See our{" "}
          <Link href="/video-script-template" className="text-primary underline underline-offset-2">
            video script template
          </Link>{" "}
          for the full script structure Scribtly follows.
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
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          Related pages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/youtube-scripts", label: "YouTube script generator" },
            { href: "/tiktok-scripts", label: "TikTok script generator" },
            { href: "/instagram-reels-scripts", label: "Instagram Reels script generator" },
            { href: "/youtube-shorts-scripts", label: "YouTube Shorts script generator" },
            { href: "/video-script-template", label: "Free video script template" },
            { href: "/youtube-script-template", label: "Free YouTube script template" },
            { href: "/tiktok-script-template", label: "Free TikTok script template" },
            { href: "/ai-script-writer", label: "AI script writer overview" },
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
            Generate hooks that actually work
          </h2>
          <p className="text-white/75 mb-8">
            Scribtly writes platform-native hooks — and the full script — in your client's saved voice. 5 free scripts, no card required.
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

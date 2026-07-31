import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Clock, Users, Layers, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Script Writer for Social Media Managers | Scribtly",
  description:
    "Scribtly helps social media managers write client video scripts in under 60 seconds. Save each client's brand voice once, then generate scripts for every platform.",
  openGraph: {
    title: "AI Script Writer for Social Media Managers | Scribtly",
    description:
      "Write client-ready video scripts in under 60 seconds. Save brand voice once, generate scripts for YouTube, TikTok, Reels, LinkedIn and more.",
    type: "website",
    url: "https://scribtly.com/use-cases/ai-script-writer-for-social-media-managers",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Script Writer for Social Media Managers | Scribtly",
    description:
      "Write client-ready video scripts in under 60 seconds. Save brand voice once, generate scripts for every platform.",
  },
  alternates: {
    canonical: "https://scribtly.com/use-cases/ai-script-writer-for-social-media-managers",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scribtly",
  applicationCategory: "BusinessApplication",
  description:
    "AI script writing tool that lets social media managers save client brand voice profiles once and generate platform-native video scripts in under 60 seconds.",
  url: "https://scribtly.com",
  offers: {
    "@type": "Offer",
    url: "https://scribtly.com/use-cases/ai-script-writer-for-social-media-managers",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can Scribtly write scripts for multiple clients at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly lets you save a separate brand voice profile for each client. When you need a script, you select the client profile and the platform, and Scribtly generates a script that reflects that client's tone, audience, and style — not a generic template.",
      },
    },
    {
      "@type": "Question",
      name: "Which platforms does Scribtly write scripts for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly generates platform-native scripts for YouTube, TikTok, Instagram Reels, LinkedIn video, podcasts, and video ads. Each format follows the structural conventions for that platform — hooks, body sections, CTAs, and where relevant, B-roll notes and captions.",
      },
    },
    {
      "@type": "Question",
      name: "How does Scribtly capture a client's brand voice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You build a client voice profile by describing their niche, audience, tone, preferred phrases, and content style. Scribtly stores this profile and applies it every time you generate a script for that client. You fill it in once — not every time you open a new tab.",
      },
    },
    {
      "@type": "Question",
      name: "Is Scribtly a replacement for a script writer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Scribtly is a first-draft and workflow acceleration tool. It removes the blank page and the time spent re-explaining client context. You still review, edit, and refine — the tool just means you start from a strong draft rather than nothing.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to generate a script with Scribtly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most scripts are ready in under 60 seconds once a client profile is saved. The first time you work with a new client, you spend a few minutes building their voice profile. After that, script generation is near-instant.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
    { "@type": "ListItem", position: 2, name: "Use Cases", item: "https://scribtly.com/use-cases" },
    {
      "@type": "ListItem",
      position: 3,
      name: "AI Script Writer for Social Media Managers",
      item: "https://scribtly.com/use-cases/ai-script-writer-for-social-media-managers",
    },
  ],
};

const benefits = [
  {
    icon: Clock,
    title: "Scripts in under 60 seconds",
    body: "Once a client profile is saved, generate a full platform-native script in under a minute. No blank page, no re-explaining the brief.",
  },
  {
    icon: Users,
    title: "One profile per client",
    body: "Save each client's tone, audience, niche, and phrases once. Scribtly applies the right voice to every script — automatically.",
  },
  {
    icon: Layers,
    title: "Every platform covered",
    body: "YouTube, TikTok, Instagram Reels, LinkedIn video, podcasts, and video ads. Each script follows the structural conventions for its platform.",
  },
  {
    icon: Zap,
    title: "Faster client delivery",
    body: "Handle more clients without working longer hours. Scribtly removes the slowest part of content production — the first draft.",
  },
];

const platforms = [
  { name: "YouTube", detail: "Hook, intro, body sections, CTA, end card notes" },
  { name: "TikTok", detail: "Hook, content arc, CTA, caption, hashtag suggestions" },
  { name: "Instagram Reels", detail: "Hook, 3-act structure, CTA, caption" },
  { name: "LinkedIn Video", detail: "Professional hook, insight body, soft CTA" },
  { name: "Podcast", detail: "Intro, segment structure, outro and CTA" },
  { name: "Video Ads", detail: "Problem, agitation, solution, CTA" },
];

const workflow = [
  {
    num: "01",
    title: "Build your client's voice profile",
    body: "Describe their niche, audience, tone, common phrases, and what makes their content recognisable. You do this once per client.",
  },
  {
    num: "02",
    title: "Choose a platform and topic",
    body: "Select the platform you're writing for and give Scribtly the video topic or brief. It knows what structure each platform needs.",
  },
  {
    num: "03",
    title: "Generate your first draft",
    body: "Scribtly produces a complete script in your client's voice — hook, body, CTA, and any platform-specific elements like B-roll notes or hashtags.",
  },
  {
    num: "04",
    title: "Review, refine, and deliver",
    body: "Edit anything that needs adjusting, then send it to your client. The script sounds like them — not like something that came out of a generic AI tool.",
  },
];

const mistakes = [
  {
    mistake: "Re-explaining client tone every time",
    fix: "Scribtly stores client voice profiles permanently. You fill in the context once — not every time you open a new script.",
  },
  {
    mistake: "Writing scripts that sound like generic AI output",
    fix: "Platform-native structure and a saved client voice combine to produce scripts that actually sound like your client, not like a press release.",
  },
  {
    mistake: "Spending hours on first drafts",
    fix: "First drafts are where time disappears. Scribtly handles the structure and voice; you handle the creative refinement.",
  },
  {
    mistake: "Keeping scripts in scattered documents",
    fix: "Scribtly keeps scripts organised by client and platform, so you always know where to find previous work.",
  },
  {
    mistake: "Underpricing because production takes too long",
    fix: "When scripts take less time to produce, you can take on more clients, price based on value rather than hours, and grow your income without burning out.",
  },
];

const faqs = [
  {
    q: "Can Scribtly write scripts for multiple clients at once?",
    a: "Yes. Scribtly lets you save a separate brand voice profile for each client. When you need a script, you select the client profile and the platform, and Scribtly generates a script that reflects that client's tone, audience, and style — not a generic template.",
  },
  {
    q: "Which platforms does Scribtly write scripts for?",
    a: "Scribtly generates platform-native scripts for YouTube, TikTok, Instagram Reels, LinkedIn video, podcasts, and video ads. Each format follows the structural conventions for that platform — hooks, body sections, CTAs, and where relevant, B-roll notes and captions.",
  },
  {
    q: "How does Scribtly capture a client's brand voice?",
    a: "You build a client voice profile by describing their niche, audience, tone, preferred phrases, and content style. Scribtly stores this profile and applies it every time you generate a script for that client. You fill it in once — not every time you open a new tab.",
  },
  {
    q: "Is Scribtly a replacement for a script writer?",
    a: "No. Scribtly is a first-draft and workflow acceleration tool. It removes the blank page and the time spent re-explaining client context. You still review, edit, and refine — the tool just means you start from a strong draft rather than nothing.",
  },
  {
    q: "How long does it take to generate a script with Scribtly?",
    a: "Most scripts are ready in under 60 seconds once a client profile is saved. The first time you work with a new client, you spend a few minutes building their voice profile. After that, script generation is near-instant.",
  },
];

export default function AIScriptWriterForSocialMediaManagersPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <span>/</span>
          <span>Use Cases</span>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Social Media Managers</span>
        </nav>
      </div>

      {/* Page header */}
      <header className="max-w-5xl mx-auto px-6 pt-10 pb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          For Social Media Managers
        </div>
        <h1
          className="text-3xl md:text-5xl font-bold leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          AI Script Writer for Social Media Managers
        </h1>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-muted)", maxWidth: "620px" }}>
          Social media managers produce scripts for multiple clients across multiple platforms every week.
          Scribtly saves each client&apos;s brand voice once and generates platform-native scripts in under 60 seconds —
          so you spend less time on first drafts and more time on creative refinement and client relationships.
        </p>
      </header>

      {/* Soft CTA near top */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div
          className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Stop re-explaining your clients&apos; tone every time you open a new script.
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly saves client voice profiles once and applies them to every script — across every platform.
            </p>
          </div>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start writing faster <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Main content */}
      <article className="max-w-5xl mx-auto px-6 pb-20">

        {/* Section 1: The problem */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          The script production problem every social media manager knows
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          You manage content for five clients. Each has a different tone, audience, platform mix, and content calendar.
          Every week you need to produce scripts for YouTube, TikTok, Reels, LinkedIn — sometimes all four for the same client.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          The blank page is slow. Generic AI tools are faster — but the output sounds like every other piece of AI-generated content on the internet.
          And if you try to use ChatGPT, you spend the first ten minutes re-explaining who the client is, what they sound like, and what platform you&apos;re writing for.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Then you do that again for the next client. And the one after that.
        </p>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Scribtly is built around a different approach: save the client context once, and use it every time.
        </p>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border p-6 flex flex-col gap-3"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(224,120,48,0.12)" }}
              >
                <b.icon size={20} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Why platform-native matters */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Why generic scripts don&apos;t work across platforms
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          A YouTube script is not a TikTok script with different dimensions. Each platform has structural conventions that audiences have learned to expect.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          TikTok hooks need to land in the first two seconds. YouTube intros need to establish credibility and promise before the viewer skips.
          LinkedIn video works better with a professional insight frame. Instagram Reels live and die on the first visual beat and the caption.
        </p>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          Scribtly generates scripts that follow the right structure for each platform — so the output is ready to use, not just readable.
        </p>

        {/* Platforms grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>{p.name}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Section 3: How it works */}
        <h2 className="text-2xl font-bold mb-6 mt-12" style={{ color: "var(--text-primary)" }}>
          How Scribtly fits into a social media manager&apos;s workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {workflow.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <div
                className="text-4xl font-bold mb-4 leading-none"
                style={{ color: "rgba(224,120,48,0.18)" }}
              >
                {step.num}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.body}</p>
            </div>
          ))}
        </div>

        {/* Section 4: Example workflow */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What this looks like in practice
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Say you manage content for a fitness coach. Their audience is women aged 30–45 who want sustainable results without extreme diets.
          Their tone is warm, direct, and evidence-led. They avoid fads, use plain language, and always end with an actionable takeaway.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          You save all of that once in a Scribtly client voice profile.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Next week, the client wants three pieces of content: a YouTube video on protein intake, a TikTok on why the scale lies, and a Reels on morning routines.
          You open Scribtly, select the client profile, pick the platform and topic for each piece, and generate three scripts in under five minutes.
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          Each one sounds like the client — warm, practical, anti-fad. Each one is structured correctly for its platform.
          You spend the rest of your time making small edits rather than writing from scratch.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          That&apos;s the time saving. But the bigger win is consistency — the scripts sound like the client even when you&apos;re managing six other clients at the same time.
        </p>

        {/* Mid CTA */}
        <div
          className="rounded-2xl p-8 my-12 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Generate your next client script in under 60 seconds
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Save your client&apos;s voice once. Generate scripts for YouTube, TikTok, Reels, LinkedIn and more — in the right format for each platform.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free <ArrowRight size={16} />
          </a>
        </div>

        {/* Section 5: What Scribtly handles */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          What Scribtly handles so you don&apos;t have to
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
          For each script, Scribtly produces:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[
            "Platform-specific hook structure",
            "Opening that earns attention in the first few seconds",
            "Body sections with natural pacing",
            "CTA that matches the platform and the client voice",
            "B-roll note suggestions where relevant",
            "Caption and hashtag suggestions for short-form content",
            "Client tone and phrase preferences applied throughout",
            "A script length appropriate to the platform",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: "var(--accent)" }} className="shrink-0" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Section 6: Mistakes */}
        <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: "var(--text-primary)" }}>
          Common mistakes social media managers make with AI script tools
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {mistakes.map((item) => (
            <div
              key={item.mistake}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                ✗ {item.mistake}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--accent)" }}>Fix: </strong>{item.fix}
              </p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold mb-6 mt-12" style={{ color: "var(--text-primary)" }}>
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4 mb-12">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)" }}
            >
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "var(--dark)" }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Save your client&apos;s voice once. Write scripts in seconds.
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly is built for social media managers who write content for multiple clients across multiple platforms.
            Stop starting from scratch. Start from a script that already sounds like your client.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start writing client scripts faster <ArrowRight size={16} />
          </a>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No commitment. No credit card required.
          </p>
        </div>

        {/* Internal links */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Related from Scribtly
          </p>
          <div className="flex flex-col gap-2">
            {[
              { href: "/", label: "Scribtly — AI-powered outreach and content tools" },
              { href: "/blog/how-to-write-linkedin-connection-requests", label: "How to write LinkedIn connection requests that get accepted" },
              { href: "/compare/scribtly-vs-expandi", label: "Scribtly vs Expandi — tool comparison" },
              { href: "/login", label: "Sign in to Scribtly" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--accent)" }}
              >
                <ArrowRight size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
          </Link>
          <span>© 2026 Scribtly. All rights reserved.</span>
          <span>
            Powered by{" "}
            <a
              href="https://octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              octelis.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Repeat,
  Zap,
  MessageSquare,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Script Writer for Social Media Managers | Scribtly",
  description:
    "Scribtly helps social media managers write client-ready video scripts faster. Save each client's brand voice once, generate platform-native scripts in under 60 seconds.",
  openGraph: {
    title: "AI Script Writer for Social Media Managers | Scribtly",
    description:
      "Scribtly helps social media managers write client-ready video scripts faster. Save each client's brand voice once, generate platform-native scripts in under 60 seconds.",
    type: "website",
    url: "https://scribtly.com/use-cases/social-media-managers",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Script Writer for Social Media Managers | Scribtly",
    description:
      "Scribtly helps social media managers write client-ready video scripts faster. Save each client's brand voice once, generate platform-native scripts in under 60 seconds.",
  },
  alternates: {
    canonical: "https://scribtly.com/use-cases/social-media-managers",
  },
};

const painPoints = [
  {
    icon: Clock,
    title: "Every script starts from a blank page",
    body: "You manage five clients. Each one needs three pieces of content this week. That is fifteen scripts written from scratch, every single week.",
  },
  {
    icon: Repeat,
    title: "You re-explain client tone to ChatGPT every time",
    body: "You paste in the same brand notes, the same audience description, the same tone guidelines — and the output still sounds generic.",
  },
  {
    icon: Users,
    title: "Clients ask for revisions because it does not sound like them",
    body: "Generic AI output is obvious. Clients push back. You spend more time revising than you would have spent writing it yourself.",
  },
  {
    icon: Layers,
    title: "Platform differences eat your time",
    body: "A TikTok hook is not a YouTube intro. A LinkedIn video script is not a Reels caption. You have to reformat everything manually.",
  },
];

const benefits = [
  {
    icon: FileText,
    title: "Save each client's voice profile once",
    body: "Add a client's niche, tone, audience, phrases, and brand style to their profile. Every script you generate for that client uses those saved details — automatically.",
  },
  {
    icon: Zap,
    title: "Generate platform-native scripts in under 60 seconds",
    body: "Choose the platform — YouTube, TikTok, Reels, LinkedIn, Podcast — and Scribtly structures the script correctly for that format. Hook, body, CTA, and B-roll notes where relevant.",
  },
  {
    icon: MessageSquare,
    title: "Scripts that actually sound like the client",
    body: "Because the voice profile is already saved, every output reflects that client's tone, phrases, and style. Fewer revisions. Faster sign-offs.",
  },
  {
    icon: Repeat,
    title: "Scale across multiple clients without extra hours",
    body: "One Scribtly account. All your clients in one place. Switch between client profiles and keep scripts organised by client and platform.",
  },
];

const faqs = [
  {
    q: "How does Scribtly handle multiple client voices?",
    a: "Each client gets their own saved voice profile in Scribtly. You fill in the client's niche, audience, tone, preferred phrases, and content style once. When you generate a script for that client, Scribtly uses those saved details so every output reflects their brand — not generic AI content.",
  },
  {
    q: "Which platforms does Scribtly support?",
    a: "Scribtly generates scripts for YouTube, TikTok, Instagram Reels, LinkedIn video, podcasts, and video ads. Each platform uses a different structure — hook, format, pacing, CTA — and Scribtly handles that automatically based on which platform you choose.",
  },
  {
    q: "Can Scribtly replace the need to brief the client every time?",
    a: "Once the voice profile is saved, you do not need to re-explain the client's brand to Scribtly. You bring the topic or angle, and Scribtly uses the saved profile to generate a script in that client's style.",
  },
  {
    q: "Is Scribtly useful if I already use ChatGPT for scripts?",
    a: "Scribtly is built specifically for client script work, so it saves you the manual process of re-pasting brand context into ChatGPT every time. The saved voice profiles and platform-specific structures mean you get a usable first draft faster, without the setup overhead.",
  },
  {
    q: "How quickly can I generate a script with Scribtly?",
    a: "Most scripts are ready in under 60 seconds once your client profile is saved. You bring the topic, choose the platform, and Scribtly generates a structured first draft — hook, body sections, and CTA included.",
  },
];

const steps = [
  {
    num: "01",
    title: "Create a client voice profile",
    body: "Add the client's niche, audience, tone, phrases, and style notes. This takes about five minutes per client and saves hours every week after that.",
  },
  {
    num: "02",
    title: "Choose a platform and topic",
    body: "Pick YouTube, TikTok, Reels, LinkedIn, Podcast, or Video Ad. Add the content topic or angle. Scribtly handles the rest.",
  },
  {
    num: "03",
    title: "Get a structured first draft",
    body: "Scribtly generates a platform-native script with a hook, body sections, and CTA in under 60 seconds. B-roll notes included for video scripts.",
  },
  {
    num: "04",
    title: "Refine, deliver, and move to the next client",
    body: "Make light edits where needed and send to the client. Then switch to the next client profile and repeat — without starting from scratch.",
  },
];

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://scribtly.com/use-cases/social-media-managers",
      url: "https://scribtly.com/use-cases/social-media-managers",
      name: "AI Script Writer for Social Media Managers | Scribtly",
      description:
        "Scribtly helps social media managers write client-ready video scripts faster. Save each client's brand voice once, generate platform-native scripts in under 60 seconds.",
      isPartOf: { "@id": "https://scribtly.com/#website" },
      breadcrumb: { "@id": "https://scribtly.com/use-cases/social-media-managers#breadcrumb" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scribtly.com/use-cases/social-media-managers#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://scribtly.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Use Cases",
          item: "https://scribtly.com/use-cases",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Social Media Managers",
          item: "https://scribtly.com/use-cases/social-media-managers",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://scribtly.com/#software",
      name: "Scribtly",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI script writing tool that lets social media managers save client brand voice profiles and generate platform-native scripts in under 60 seconds.",
      url: "https://scribtly.com",
      offers: {
        "@type": "Offer",
        url: "https://scribtly.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function SocialMediaManagersPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
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
              { label: "Features", href: "/#features" },
              { label: "How it works", href: "/#how-it-works" },
              { label: "Pricing", href: "/#get-access" },
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
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Get started free
          </a>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <span>/</span>
          <span>Use Cases</span>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Social Media Managers</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="px-6 pt-14 pb-20 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
            style={{
              background: "rgba(224,120,48,0.08)",
              borderColor: "rgba(224,120,48,0.25)",
              color: "var(--accent)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            Built for social media managers
          </div>

          <h1
            className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Write client scripts faster.
            <br />
            <span style={{ color: "var(--accent)" }}>Stop starting from scratch.</span>
          </h1>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-muted)", maxWidth: "560px" }}
          >
            Scribtly lets you save each client&apos;s brand voice once, then generate
            platform-native scripts for YouTube, TikTok, Reels, LinkedIn, and more in under
            60 seconds. Less blank-page time. More delivered work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — 5 scripts included
              <ArrowRight size={16} />
            </a>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-70"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              See how it works
            </Link>
          </div>

          <div className="flex flex-wrap gap-5">
            {[
              "No credit card required",
              "Scripts in under 60 seconds",
              "Save unlimited client profiles",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <CheckCircle size={15} style={{ color: "var(--accent)" }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section
        className="px-6 py-20 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              The problem
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Managing multiple clients means scripts multiply fast
            </h2>
            <p
              className="text-base max-w-2xl"
              style={{ color: "var(--text-muted)" }}
            >
              Social media managers handle content for several clients at once. Scripts are the
              part that takes the longest — and the part that clients push back on most when
              the tone is off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border p-7 flex gap-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(224,120,48,0.10)" }}
                >
                  <p.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Generate your next client script in under 60 seconds
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--text-muted)" }}>
            Save the client&apos;s voice once. Generate scripts on demand. Deliver faster without
            working more hours.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="px-6 py-24 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              How Scribtly helps
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              A script workflow built for client content managers
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Every feature in Scribtly is designed to help you deliver more client scripts without
              adding hours to your week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border p-8 flex flex-col gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(224,120,48,0.12)" }}
                >
                  <b.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-lg mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {b.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              The workflow
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              From client brief to delivered script in four steps
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              No long setup. No steep learning curve. You can have your first script ready before
              the next client call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border p-8"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="text-5xl font-bold mb-5 leading-none"
                  style={{ color: "rgba(224,120,48,0.20)" }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-semibold text-lg mb-3"
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

      {/* What SMMs can create */}
      <section
        className="px-6 py-20 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                Platform coverage
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                One tool. Every platform your clients are on.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                Scribtly writes scripts in the right structure for each platform. You do not need
                to reformat a YouTube script into a TikTok hook — the platform logic is already
                built in.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "YouTube long-form scripts with chapters and B-roll notes",
                  "TikTok scripts with pattern-interrupt hooks and fast pacing",
                  "Instagram Reels scripts with 15-second to 60-second formats",
                  "LinkedIn video scripts with professional tone and CTAs",
                  "Podcast scripts with intro, talking points, and outro",
                  "Video ad scripts with hook, offer, and urgency close",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--accent)" }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl border p-8"
              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: "var(--accent)" }}
              >
                Example — TikTok script for a fitness coach client
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "Hook",
                    text: "You are not tired. You are just fuelling your workouts wrong. Here is the three-ingredient pre-workout meal that changed everything for my clients.",
                  },
                  {
                    label: "Body",
                    text: "Most people eat either nothing or a full meal before they train. Both are mistakes. Here is what actually works — and why...",
                  },
                  {
                    label: "CTA",
                    text: "Follow for more nutrition tips that make your training actually work. And drop your biggest pre-workout question in the comments.",
                  },
                ].map((block) => (
                  <div
                    key={block.label}
                    className="rounded-xl border p-4"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <p
                      className="text-xs font-semibold mb-2 uppercase tracking-widest"
                      style={{ color: "var(--accent)" }}
                    >
                      {block.label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="text-xs mt-5"
                style={{ color: "var(--text-muted)" }}
              >
                Generated in under 60 seconds using a saved client voice profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Common questions
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border p-7"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
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

      {/* More use cases */}
      <section
        className="px-6 py-16 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Also built for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Freelance Script Writers",
              "Content Agencies",
              "YouTube Channel Managers",
              "Coaches",
              "Small Business Owners",
              "Marketing Teams",
              "UGC Creators",
            ].map((label) => (
              <span
                key={label}
                className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  background: "var(--bg-base)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="get-started"
        className="px-6 py-28"
        style={{ background: "var(--dark)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white leading-tight">
            Stop writing client scripts from scratch.
          </h2>
          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Save each client&apos;s brand voice profile once. Generate platform-native scripts in under
            60 seconds. Deliver more without working more.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free — no card required
            <ArrowRight size={16} />
          </a>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            5 free scripts included. No commitment.
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
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              Home
            </Link>
            <Link href="/#features" className="hover:opacity-70 transition-opacity">
              Features
            </Link>
            <Link href="/#how-it-works" className="hover:opacity-70 transition-opacity">
              How it works
            </Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

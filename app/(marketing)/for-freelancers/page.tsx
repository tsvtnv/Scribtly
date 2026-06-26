import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Zap,
  Star,
  RefreshCw,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Script Writer for Freelancers | Scribtly",
  description:
    "Stop re-explaining client tone every time. Scribtly helps freelancers generate client-ready video scripts in under 60 seconds with saved brand voice profiles.",
  openGraph: {
    title: "AI Script Writer for Freelancers | Scribtly",
    description:
      "Save client voice once. Generate scripts in under 60 seconds. Built for freelance script writers and content creators.",
    url: "https://scribtly.com/for-freelancers",
    siteName: "Scribtly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Script Writer for Freelancers | Scribtly",
    description:
      "Save client voice once. Generate scripts in under 60 seconds.",
  },
  alternates: {
    canonical: "https://scribtly.com/for-freelancers",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://scribtly.com/for-freelancers#webpage",
      url: "https://scribtly.com/for-freelancers",
      name: "AI Script Writer for Freelancers | Scribtly",
      description:
        "Scribtly helps freelancers generate client-ready video scripts in under 60 seconds by saving brand voice profiles and using platform-native script structure.",
      isPartOf: { "@id": "https://scribtly.com/#website" },
      breadcrumb: { "@id": "https://scribtly.com/for-freelancers#breadcrumb" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scribtly.com/for-freelancers#breadcrumb",
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
          name: "For Freelancers",
          item: "https://scribtly.com/for-freelancers",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Scribtly built for freelance script writers specifically?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Scribtly is designed for freelancers who manage multiple clients with different tones, niches, and platforms. You can save a separate voice profile for each client and generate scripts without re-explaining their style every time.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to generate a script with Scribtly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most scripts are generated in under 60 seconds once you have a client voice profile saved. First-time setup for a client profile takes around 5 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "What types of scripts can I generate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly supports YouTube scripts, YouTube Shorts, TikTok scripts, Instagram Reels scripts, LinkedIn video scripts, podcast scripts, and video ad scripts. Each format is structured for its platform with hooks, body sections, and CTAs built in.",
          },
        },
        {
          "@type": "Question",
          name: "Can I save different client voices in Scribtly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can create a separate profile for each client, saving their niche, audience, tone, key phrases, and brand style. Scribtly uses that profile every time you generate a script for that client.",
          },
        },
        {
          "@type": "Question",
          name: "Is Scribtly better than using ChatGPT for client scripts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChatGPT is a general-purpose tool. Scribtly is built specifically for client script work, with saved voice profiles, platform-native script structure, and organised project management. You stop re-pasting context into a chat window every time.",
          },
        },
        {
          "@type": "Question",
          name: "Does Scribtly replace freelance script writers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Scribtly accelerates first drafts and handles the structural groundwork so freelancers can spend more time refining, editing, and adding their professional judgment. It is a tool that makes you faster, not a replacement for your skills.",
          },
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Scribtly",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://scribtly.com",
      description:
        "AI script writing platform for freelancers, creators, and agencies. Save client voice profiles and generate platform-native scripts in under 60 seconds.",
      offers: {
        "@type": "Offer",
        url: "https://scribtly.com/pricing",
      },
    },
  ],
};

const painPoints = [
  {
    icon: RefreshCw,
    title: "You re-explain the client's tone every time",
    body: 'Copy-pasting "write in the style of a friendly fitness coach who targets busy mums" into ChatGPT for the fifteenth time this month is not a workflow. It is a tax on your time.',
  },
  {
    icon: Clock,
    title: "First drafts eat half your project time",
    body: "Most of a freelance script project is staring at a blank page, not the actual craft. You are paid to write well, not to manufacture structure from nothing on repeat.",
  },
  {
    icon: Users,
    title: "Managing multiple clients gets messy",
    body: "When you write for five clients across three platforms, keeping track of who sounds like what — and where you left off — turns into a system problem.",
  },
];

const features = [
  {
    icon: Layers,
    title: "Save client voice profiles once",
    body: "Set up a profile for each client: their niche, audience, tone, key phrases, and brand style. Scribtly pulls from that profile every time you generate a script for them.",
    detail: "No more re-explaining. No more inconsistent output.",
  },
  {
    icon: Zap,
    title: "Generate first drafts in under 60 seconds",
    body: "Give Scribtly the video topic, the platform, and the client. It generates a structured first draft with a hook, body, and CTA built for that platform.",
    detail: "You edit and refine. You do not manufacture from scratch.",
  },
  {
    icon: FileText,
    title: "Platform-native script structure",
    body: "YouTube scripts, TikTok scripts, Reels scripts, LinkedIn video scripts, podcast scripts, and video ads all have different structural demands. Scribtly knows the difference.",
    detail: "Hooks, pacing, CTAs, B-roll notes, captions, and hashtags where relevant.",
  },
  {
    icon: Users,
    title: "Organised by client and project",
    body: "All your scripts are stored by client and platform. When a client asks for a revision three weeks later, you know exactly where to find the original.",
    detail: "Clean, searchable, never buried in a chat history.",
  },
];

const steps = [
  {
    num: "01",
    title: "Create a client profile",
    body: "Add your client's niche, audience, tone of voice, key phrases, and any content rules they have. Takes around five minutes per client.",
  },
  {
    num: "02",
    title: "Choose the platform and topic",
    body: "Select the script type (YouTube, TikTok, Reels, LinkedIn, podcast, or video ad) and give Scribtly the video topic or content brief.",
  },
  {
    num: "03",
    title: "Generate the first draft",
    body: "Scribtly produces a structured script in under 60 seconds: hook, intro, body sections, CTA, and any platform-specific elements like B-roll notes or hashtags.",
  },
  {
    num: "04",
    title: "Edit, refine, and deliver",
    body: "Apply your professional judgment, refine the tone, and deliver a client-ready script. Faster than starting from scratch — without losing the quality your clients expect.",
  },
];

const testimonials = [
  {
    quote:
      "I used to spend the first hour of every script project just getting the structure right. Scribtly handles that in seconds so I can jump straight to the parts that actually need my attention.",
    name: "Lauren T.",
    role: "Freelance Script Writer",
    initials: "LT",
  },
  {
    quote:
      "Managing voice for six clients was a nightmare. Now each one has a profile and the scripts actually sound like them rather than like AI filler.",
    name: "Dan M.",
    role: "Freelance Content Creator",
    initials: "DM",
  },
  {
    quote:
      "I take on more client work without working more hours. That is the whole point.",
    name: "Priya S.",
    role: "Social Media Manager & Script Writer",
    initials: "PS",
  },
];

const faqs = [
  {
    q: "Is Scribtly built for freelance script writers specifically?",
    a: "Yes. Scribtly is designed for freelancers who manage multiple clients with different tones, niches, and platforms. You save a separate voice profile for each client and generate scripts without re-explaining their style every time.",
  },
  {
    q: "How long does it take to generate a script with Scribtly?",
    a: "Most scripts are generated in under 60 seconds once you have a client voice profile saved. First-time setup for a client profile takes around 5 minutes.",
  },
  {
    q: "What types of scripts can I generate?",
    a: "Scribtly supports YouTube scripts, YouTube Shorts, TikTok scripts, Instagram Reels scripts, LinkedIn video scripts, podcast scripts, and video ad scripts. Each format is structured for its platform with hooks, body sections, and CTAs built in.",
  },
  {
    q: "Can I save different client voices in Scribtly?",
    a: "Yes. You can create a separate profile for each client, saving their niche, audience, tone, key phrases, and brand style. Scribtly uses that profile every time you generate a script for that client.",
  },
  {
    q: "Is Scribtly better than using ChatGPT for client scripts?",
    a: "ChatGPT is a general-purpose tool. Scribtly is built for client script work specifically, with saved voice profiles, platform-native structure, and organised project management. You stop re-pasting context into a chat window every time.",
  },
  {
    q: "Does Scribtly replace freelance script writers?",
    a: "No. Scribtly accelerates first drafts and handles structural groundwork so you spend more time refining and less time manufacturing from nothing. It makes you faster — it does not replace your skills.",
  },
];

export default function ForFreelancersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
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
                { label: "YouTube scripts", href: "/youtube-script-generator" },
                { label: "TikTok scripts", href: "/tiktok-script-generator" },
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
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
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90 text-white"
              style={{ background: "var(--accent)" }}
            >
              Start free
            </Link>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 pt-5 pb-0">
          <nav className="text-xs" style={{ color: "var(--text-muted)" }} aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:opacity-60 transition-opacity">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li style={{ color: "var(--text-primary)" }}>For Freelancers</li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 pt-14 pb-20 max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7 border"
              style={{
                background: "rgba(224,120,48,0.08)",
                borderColor: "rgba(224,120,48,0.25)",
                color: "var(--accent)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              Built for freelance script writers
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Stop starting every client script{" "}
              <span style={{ color: "var(--accent)" }}>from a blank page.</span>
            </h1>

            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: "var(--text-muted)", maxWidth: "560px" }}
            >
              Scribtly is an AI script writer built for freelancers who manage
              multiple clients. Save each client&apos;s voice profile once and
              generate platform-native scripts in under 60 seconds — without
              re-explaining their tone to ChatGPT every time.
            </p>

            {/* Soft CTA near top */}
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              Start with 5 free scripts.{" "}
              <Link
                href="/pricing"
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--accent)" }}
              >
                See pricing
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Generate your first client script
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/for-agencies"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-70"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                Running an agency?
              </Link>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                "Save voice profiles per client",
                "YouTube, TikTok, Reels, LinkedIn and more",
                "Scripts in under 60 seconds",
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

        {/* Pain Points */}
        <section
          className="px-6 py-20 border-t"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-subtle)",
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
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
                Freelance script writing has a hidden time problem.
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                The scripts themselves are not the bottleneck. Everything before
                the actual writing is.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {painPoints.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border p-7 flex flex-col gap-4"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(224,120,48,0.12)" }}
                  >
                    <p.icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3
                    className="font-semibold text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section
          className="px-6 py-14 border-t border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Save your client&apos;s voice once. Generate scripts faster every
              time.
            </h2>
            <p
              className="text-base mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Scribtly keeps each client&apos;s tone, niche, and audience in a
              saved profile so every script sounds like them — not like generic
              AI output.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free — no card required
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                What you get
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Everything freelancers need. Nothing they do not.
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                Scribtly is not a general AI writing tool. It is built
                specifically for client content work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border p-8 flex flex-col gap-4"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(224,120,48,0.12)" }}
                  >
                    <f.icon size={22} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.body}
                    </p>
                    <p
                      className="text-xs leading-relaxed font-medium"
                      style={{ color: "var(--text-primary)", opacity: 0.6 }}
                    >
                      {f.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Script types callout */}
            <div
              className="mt-10 rounded-2xl border p-8"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-subtle)",
              }}
            >
              <h3
                className="font-semibold text-lg mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Script types Scribtly supports
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    label: "YouTube scripts",
                    href: "/youtube-script-generator",
                  },
                  {
                    label: "YouTube Shorts",
                    href: "/youtube-shorts-script-generator",
                  },
                  {
                    label: "TikTok scripts",
                    href: "/tiktok-script-generator",
                  },
                  {
                    label: "Reels scripts",
                    href: "/instagram-reels-script-generator",
                  },
                  {
                    label: "LinkedIn video",
                    href: "/linkedin-video-script-generator",
                  },
                  { label: "Podcast scripts", href: "/podcast-script-generator" },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="text-xs font-medium text-center px-3 py-2.5 rounded-xl border transition-all hover:opacity-70"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg-base)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          className="px-6 py-24 border-t"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-subtle)",
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                How it works
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                From client brief to delivered script in four steps
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                Set up once per client. Generate in under a minute from then
                on.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border p-8"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                  }}
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
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="px-6 py-24 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                What freelancers say
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                More client work. Same working hours.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border p-7 flex flex-col gap-4"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        style={{ color: "var(--accent)" }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: "var(--accent)" }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t.name}
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section
          className="px-6 py-20 border-t"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-subtle)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              Common mistakes freelancers make with AI script tools
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: "Using a general chat tool for every script",
                  fix: "General tools have no memory of your client. Every session starts from scratch. A purpose-built tool like Scribtly remembers everything you saved about that client.",
                },
                {
                  mistake: "Skipping the brand voice setup",
                  fix: "Five minutes setting up a client profile saves hours across all future scripts. Do not skip it — it is the difference between generic output and client-ready output.",
                },
                {
                  mistake: "Generating the whole script in one pass and delivering it unedited",
                  fix: "Scribtly gives you a strong first draft. Your professional edit is still what makes it worth paying for. Review, refine, and add your judgment before delivery.",
                },
                {
                  mistake: "Using the same structure for every platform",
                  fix: "A YouTube script and a TikTok script are not the same thing. Use the right platform format so clients get content that actually fits where it is being published.",
                },
              ].map((item) => (
                <div
                  key={item.mistake}
                  className="rounded-2xl border p-6"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                  }}
                >
                  <p
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Mistake: {item.mistake}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section
          className="px-6 py-16 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Useful resources for freelance script writers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "YouTube Script Generator",
                  desc: "Generate structured YouTube scripts with hooks and CTAs.",
                  href: "/youtube-script-generator",
                },
                {
                  label: "TikTok Script Generator",
                  desc: "Generate short-form scripts built for TikTok pacing.",
                  href: "/tiktok-script-generator",
                },
                {
                  label: "How to Write Scripts in a Client's Voice",
                  desc: "Practical guide for freelancers managing multiple client tones.",
                  href: "/blog/how-to-write-scripts-in-a-clients-voice",
                },
                {
                  label: "Scribtly vs ChatGPT for Script Writing",
                  desc: "Why purpose-built beats general-purpose for client work.",
                  href: "/compare/scribtly-vs-chatgpt",
                },
                {
                  label: "AI Script Writer for Agencies",
                  desc: "Managing script production across multiple clients at scale.",
                  href: "/for-agencies",
                },
                {
                  label: "YouTube Script Template",
                  desc: "A free template for structuring YouTube video scripts.",
                  href: "/templates/youtube-script-template",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border p-5 flex flex-col gap-1 transition-all hover:opacity-70"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {link.label}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {link.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="px-6 py-20 border-t"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-subtle)",
          }}
        >
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold mb-10"
              style={{ color: "var(--text-primary)" }}
            >
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-6">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border p-7"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                  }}
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

        {/* Final CTA */}
        <section
          className="px-6 py-28"
          style={{ background: "var(--dark)" }}
        >
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
              Start with 5 free scripts
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">
              Turn one client brief into a{" "}
              <span style={{ color: "var(--accent)" }}>ready-to-deliver</span>{" "}
              script.
            </h2>
            <p
              className="text-base mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Join freelancers who use Scribtly to write faster, stay organised
              by client, and deliver more work without working more hours. Start
              free — no card required.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free with 5 scripts
              <ArrowRight size={16} />
            </Link>
            <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              No credit card. No commitment. Cancel any time.
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
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link href="/" className="hover:opacity-60 transition-opacity">
                Home
              </Link>
              <Link href="/pricing" className="hover:opacity-60 transition-opacity">
                Pricing
              </Link>
              <Link href="/blog" className="hover:opacity-60 transition-opacity">
                Blog
              </Link>
              <Link
                href="/for-agencies"
                className="hover:opacity-60 transition-opacity"
              >
                For agencies
              </Link>
              <Link
                href="/compare/scribtly-vs-chatgpt"
                className="hover:opacity-60 transition-opacity"
              >
                vs ChatGPT
              </Link>
            </div>
            <span>© 2026 Scribtly. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Users,
  Clock,
  Zap,
  Repeat,
  Star,
  Video,
  Pen,
  Layers,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Script Writer for Freelancers | Scribtly",
  description:
    "Stop re-explaining your client's tone to ChatGPT. Scribtly saves client voice profiles and generates ready-to-send scripts in under 60 seconds.",
  openGraph: {
    title: "AI Script Writer for Freelancers | Scribtly",
    description:
      "Stop re-explaining your client's tone to ChatGPT. Scribtly saves client voice profiles and generates ready-to-send scripts in under 60 seconds.",
    url: "https://scribtly.com/for-freelancers",
    siteName: "Scribtly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Script Writer for Freelancers | Scribtly",
    description:
      "Stop re-explaining your client's tone to ChatGPT. Scribtly saves client voice profiles and generates ready-to-send scripts in under 60 seconds.",
  },
  alternates: {
    canonical: "https://scribtly.com/for-freelancers",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Scribtly",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI script writing platform for freelancers. Save client voice profiles once, generate YouTube, TikTok, Reels, and LinkedIn video scripts in under 60 seconds.",
      url: "https://scribtly.com",
      offers: {
        "@type": "Offer",
        description: "Start free with 5 scripts — no card required.",
      },
      featureList: [
        "Client voice profile saving",
        "YouTube script generation",
        "TikTok script generation",
        "Instagram Reels script generation",
        "LinkedIn video script generation",
        "Podcast script generation",
        "Hook and CTA generation",
        "B-roll notes",
        "Caption and hashtag generation",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I use Scribtly for multiple clients?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can save a separate voice profile for each client. Each profile stores their niche, tone, audience, preferred phrases, and brand style. When you generate a script, Scribtly pulls from that client's profile so every output sounds like them, not like generic AI.",
          },
        },
        {
          "@type": "Question",
          name: "What types of scripts can Scribtly generate for freelancers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly generates YouTube scripts, TikTok scripts, Instagram Reels scripts, LinkedIn video scripts, podcast scripts, and video ad scripts. Each script includes platform-native structure: hooks, body sections, CTAs, captions, hashtags, and B-roll notes where relevant.",
          },
        },
        {
          "@type": "Question",
          name: "How is Scribtly different from using ChatGPT for script writing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChatGPT is a general-purpose tool. Every time you start a new session, you have to re-explain the client's tone, audience, and style from scratch. Scribtly saves all of that in a client voice profile so you never lose context. Scripts are also structured for specific platforms — not just prose — and organised by client.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to generate a script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Once a client voice profile is saved, generating a new script takes under 60 seconds. You pick the platform, add the video topic, and Scribtly handles the structure, hook, body, and CTA.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to write prompts to use Scribtly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Scribtly is built around client profiles, not manual prompting. You save the client's details once, then generate scripts without writing a single prompt. The platform handles the structure and tone automatically.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
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
          name: "AI Script Writer for Freelancers",
          item: "https://scribtly.com/for-freelancers",
        },
      ],
    },
  ],
};

const features = [
  {
    icon: BookOpen,
    title: "Save client voice profiles",
    body: "Store each client's niche, tone, audience, preferred phrases, and brand style in one place. Never re-explain it again.",
  },
  {
    icon: Zap,
    title: "Scripts in under 60 seconds",
    body: "Pick the platform, add the video topic. Scribtly generates a complete, structured script using the client's saved profile.",
  },
  {
    icon: Video,
    title: "Platform-native structure",
    body: "YouTube, TikTok, Reels, LinkedIn, podcast, and video ad scripts. Each format includes hooks, body sections, CTAs, and captions.",
  },
  {
    icon: Layers,
    title: "Organise by client",
    body: "All scripts live under the correct client. No more messy Google Docs folders or hunting through ChatGPT history.",
  },
  {
    icon: Pen,
    title: "Hook and CTA generation",
    body: "Scribtly writes platform-specific hooks designed to stop the scroll, and CTAs that feel natural rather than forced.",
  },
  {
    icon: Repeat,
    title: "Reuse and iterate fast",
    body: "Generate a first draft, refine it, and produce variations in seconds. Deliver more scripts without more hours.",
  },
];

const steps = [
  {
    num: "01",
    title: "Save your client's voice profile",
    body: "Add the client's niche, target audience, tone of voice, key phrases, and platform preferences. Do this once and it is stored permanently.",
  },
  {
    num: "02",
    title: "Choose a platform and topic",
    body: "Select YouTube, TikTok, Reels, LinkedIn, podcast, or video ad. Add the video topic or a brief. That is all the input Scribtly needs.",
  },
  {
    num: "03",
    title: "Generate the script",
    body: "Scribtly produces a complete, structured script in the client's voice — hook, body, CTA, captions, and B-roll notes where relevant.",
  },
  {
    num: "04",
    title: "Deliver and move on",
    body: "Review, refine if needed, and send the script to your client. The whole process takes minutes, not hours.",
  },
];

const testimonials = [
  {
    quote:
      "I used to spend two hours writing one YouTube script for a client. Now I get a solid first draft in under two minutes. I have tripled the number of clients I can take on.",
    name: "Mia T.",
    role: "Freelance Script Writer",
    initials: "MT",
  },
  {
    quote:
      "The voice profile feature is what sold me. My clients genuinely can not tell the first draft is AI-generated. It sounds like them from the first sentence.",
    name: "Jordan R.",
    role: "Content Creator & Scriptwriter",
    initials: "JR",
  },
  {
    quote:
      "I manage scripts for six different clients across YouTube and TikTok. Scribtly keeps everything separate and consistent. It is the only tool that actually works for client work.",
    name: "Priya S.",
    role: "Freelance Social Media Manager",
    initials: "PS",
  },
];

const audiences = [
  { label: "Freelance script writers", icon: Pen },
  { label: "Content creators managing client channels", icon: Video },
  { label: "Social media managers", icon: Users },
  { label: "Freelance video editors who script too", icon: Layers },
  { label: "UGC creators producing client content", icon: FileText },
  { label: "Personal brand consultants", icon: Star },
];

const faqs = [
  {
    q: "Can I use Scribtly for multiple clients?",
    a: "Yes. You can save a separate voice profile for each client. Each profile stores their niche, tone, audience, preferred phrases, and brand style. When you generate a script, Scribtly pulls from that client's profile so every output sounds like them, not like generic AI.",
  },
  {
    q: "What types of scripts can Scribtly generate?",
    a: "YouTube scripts, TikTok scripts, Instagram Reels scripts, LinkedIn video scripts, podcast scripts, and video ad scripts. Each format includes platform-native structure: hooks, body sections, CTAs, captions, hashtags, and B-roll notes where relevant.",
  },
  {
    q: "How is Scribtly different from using ChatGPT?",
    a: "ChatGPT is a general-purpose tool. Every session, you have to re-explain the client's tone, audience, and style from scratch. Scribtly saves all of that in a client voice profile so you never lose context. Scripts are structured for specific platforms — not just prose — and organised by client.",
  },
  {
    q: "How long does it take to generate a script?",
    a: "Once a client voice profile is saved, generating a new script takes under 60 seconds. Pick the platform, add the video topic, and Scribtly handles the structure, hook, body, and CTA.",
  },
  {
    q: "Do I need to write prompts to use Scribtly?",
    a: "No. Scribtly is built around client profiles, not manual prompting. Save the client's details once, then generate scripts without writing a single prompt. The platform handles structure and tone automatically.",
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
                { label: "Features", href: "/#features" },
                { label: "How it works", href: "/#how-it-works" },
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
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-80 text-white"
              style={{ background: "var(--accent)" }}
            >
              Start free
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-6 pt-20 pb-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
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
                Built for freelancers
              </div>

              <h1
                className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Stop starting from
                <br />a{" "}
                <span style={{ color: "var(--accent)" }}>blank page.</span>
              </h1>

              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: "var(--text-muted)", maxWidth: "480px" }}
              >
                Scribtly is the AI script writer built for freelancers who write
                for clients. Save each client's voice once. Generate
                platform-native scripts in under 60 seconds. Deliver more
                without working more hours.
              </p>

              {/* Top soft CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "var(--accent)" }}
                >
                  Start free — 5 scripts included
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-70"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  Read the blog
                </Link>
              </div>

              <div className="flex flex-wrap gap-5">
                {[
                  "No card required",
                  "One saved profile per client",
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

            {/* Right visual: mock script editor card */}
            <div
              className="rounded-2xl border overflow-hidden shadow-2xl"
              style={{
                borderColor: "var(--border)",
                boxShadow: "0 32px 80px rgba(26,18,8,0.13)",
              }}
            >
              {/* Browser bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  background: "#F0EAE2",
                  borderBottom: `1px solid var(--border)`,
                }}
              >
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <div
                  className="ml-4 flex-1 max-w-xs mx-auto h-6 rounded-md flex items-center px-3 text-xs"
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    color: "var(--text-muted)",
                  }}
                >
                  app.scribtly.com/scripts
                </div>
              </div>
              {/* Mock script card */}
              <div className="p-6" style={{ background: "var(--bg-subtle)" }}>
                {/* Client profile pill */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "var(--accent)" }}
                  >
                    SC
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Sarah Chen — Fitness Coach
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      YouTube · Motivational · 25–40 women
                    </p>
                  </div>
                  <div
                    className="ml-auto text-xs font-semibold px-2 py-1 rounded-md"
                    style={{
                      background: "rgba(224,120,48,0.12)",
                      color: "var(--accent)",
                    }}
                  >
                    Voice saved
                  </div>
                </div>

                {/* Script blocks */}
                {[
                  {
                    label: "Hook",
                    content:
                      "You're not tired because you're lazy. You're tired because you're doing the wrong type of workout for your body.",
                  },
                  {
                    label: "Intro",
                    content:
                      "Today I'm going to show you the one shift that changed everything for my clients over 35.",
                  },
                  {
                    label: "Body",
                    content:
                      "Most women think they need to work harder. What they actually need is to work smarter. Here's what that looks like in practice...",
                  },
                  {
                    label: "CTA",
                    content:
                      "If this helped, subscribe — I post new training strategies every Tuesday.",
                  },
                ].map((block) => (
                  <div key={block.label} className="mb-4">
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {block.label}
                    </p>
                    <div
                      className="rounded-xl px-4 py-3 text-sm leading-relaxed"
                      style={{
                        background: "var(--bg-base)",
                        color: "var(--text-primary)",
                        border: `1px solid var(--border)`,
                      }}
                    >
                      {block.content}
                    </div>
                  </div>
                ))}

                {/* Generate time */}
                <div
                  className="mt-4 flex items-center justify-between text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} style={{ color: "var(--accent)" }} />
                    Generated in 43 seconds
                  </div>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    YouTube · Long-form
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem section */}
        <section
          className="px-6 py-20 border-t"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Sound familiar?
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Freelance script writing is slower than it needs to be
            </h2>
            <p
              className="text-base leading-relaxed max-w-2xl mx-auto mb-12"
              style={{ color: "var(--text-muted)" }}
            >
              Most freelancers spend more time fighting blank pages and
              re-explaining client briefs than they do on the writing itself.
              Here is what that looks like in practice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                {
                  problem: "You paste the client brief into ChatGPT — again",
                  detail:
                    "Every new session means re-explaining their tone, audience, and style from scratch. The output never quite sounds like them.",
                },
                {
                  problem: "You rewrite the AI draft more than you write",
                  detail:
                    "Generic AI output needs heavy editing to sound like the client. You end up writing it yourself anyway.",
                },
                {
                  problem: "You can not scale beyond a handful of clients",
                  detail:
                    "Each script takes too long. Taking on more clients means more hours, not more revenue.",
                },
              ].map((item) => (
                <div
                  key={item.problem}
                  className="rounded-2xl border p-6"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                  }}
                >
                  <p
                    className="font-semibold text-base mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.problem}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-6 py-24">
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
                Everything a freelancer needs to write scripts faster
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                Scribtly is not a generic AI writing tool. It is built
                specifically for client content work and platform-native script
                structure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border p-7 flex flex-col gap-4"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(224,120,48,0.12)" }}
                  >
                    <f.icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-base mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Middle CTA */}
        <section
          className="px-6 py-16 border-y"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Generate your next client script in under 60 seconds
            </h2>
            <p
              className="text-base mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Save your client's voice once. Generate platform-native scripts
              whenever you need them. Start free — no card required.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-6 py-24">
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
                From client brief to finished script in four steps
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                No long onboarding. No prompt engineering. You can have your
                first client script ready today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border p-8"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
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
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                From freelancers like you
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                What script writers are saying
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border p-7 flex flex-col gap-4"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
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
                    "{t.quote}"
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

        {/* Who it's for */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                Who it is for
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Built for freelancers who write for clients
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                If you manage content for other people, Scribtly is built
                around your workflow — not a solo creator's.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {audiences.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-3 rounded-xl border px-5 py-4"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <a.icon size={18} style={{ color: "var(--accent)" }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {a.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Internal links section */}
            <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4 text-center"
                style={{ color: "var(--text-muted)" }}
              >
                Explore by platform
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "YouTube scripts", href: "/youtube-script-generator" },
                  { label: "TikTok scripts", href: "/tiktok-script-generator" },
                  { label: "Reels scripts", href: "/instagram-reels-script-generator" },
                  { label: "LinkedIn video scripts", href: "/linkedin-video-script-generator" },
                  { label: "Podcast scripts", href: "/podcast-script-generator" },
                  { label: "Video ad scripts", href: "/video-ad-script-generator" },
                  { label: "For agencies", href: "/for-agencies" },
                  { label: "For content creators", href: "/for-content-creators" },
                  { label: "Scribtly vs ChatGPT", href: "/compare/scribtly-vs-chatgpt" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm px-4 py-2 rounded-lg border transition-all hover:opacity-70"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                      background: "var(--bg-base)",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
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
                Common questions
              </p>
              <h2
                className="text-3xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Frequently asked questions
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border p-6"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                  }}
                >
                  <p
                    className="font-semibold text-base mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq.q}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
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
              No card required
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white leading-tight">
              Write your next client script in under 60 seconds
            </h2>
            <p
              className="text-base mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Save your client's voice once. Generate platform-native scripts
              whenever you need them. Start free — 5 scripts included with
              every new account.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free today
              <ArrowRight size={16} />
            </Link>
            <p
              className="mt-5 text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              No commitment. No credit card. Just faster scripts.
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
            <div className="flex items-center gap-6">
              {[
                { label: "Home", href: "/" },
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
                { label: "For agencies", href: "/for-agencies" },
                { label: "For content creators", href: "/for-content-creators" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:opacity-60 transition-opacity"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <span>© 2026 Scribtly. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}

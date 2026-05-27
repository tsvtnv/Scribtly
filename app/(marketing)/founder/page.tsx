import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Lightbulb,
  Code2,
  Layers,
  Globe,
  Mail,
  ExternalLink,
  FileText,
  Users,
  Zap,
  BarChart3,
  MessageSquare,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Kristiyan Tsvetanov, Founder of Scribtly",
  description:
    "Scribtly was founded by Kristiyan Tsvetanov — a Birmingham-based developer and SaaS builder — to help freelancers, creators, and businesses create content faster without starting from a blank page.",
  alternates: { canonical: "/founder" },
  openGraph: {
    type: "profile",
    url: "/founder",
    siteName: "Scribtly",
    title: "Kristiyan Tsvetanov, Founder of Scribtly",
    description:
      "Scribtly was founded by Kristiyan Tsvetanov — a Birmingham-based developer and SaaS builder — to help freelancers, creators, and businesses create content faster without starting from a blank page.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Kristiyan Tsvetanov — Founder of Scribtly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristiyan Tsvetanov, Founder of Scribtly",
    description:
      "Scribtly was founded by Kristiyan Tsvetanov — a Birmingham-based developer and SaaS builder — to help freelancers, creators, and businesses create content faster without starting from a blank page.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kristiyan Tsvetanov",
  url: "https://tsvetanov.co.uk",
  jobTitle: "Founder",
  worksFor: {
    "@type": "Organization",
    name: "Scribtly",
    url: SITE_URL,
  },
  description:
    "Kristiyan Tsvetanov is a Birmingham-based developer, SaaS founder, and product builder. He founded Scribtly to help freelancers, creators, and businesses create content faster without starting from a blank page.",
  sameAs: ["https://tsvetanov.co.uk", "https://tsvetanov.co.uk/scribtly"],
  knowsAbout: [
    "SaaS development",
    "AI content creation",
    "web design",
    "email deliverability",
    "freelance tooling",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Birmingham",
    addressCountry: "GB",
  },
  founder: [
    {
      "@type": "Organization",
      name: "Scribtly",
      url: SITE_URL,
      description: "AI content creation platform for freelancers, creators, and businesses",
    },
    {
      "@type": "Organization",
      name: "TsvWeb",
      url: "https://tsvweb.com",
      description: "Web design studio",
    },
    {
      "@type": "Organization",
      name: "Warmerly",
      description: "Email deliverability SaaS",
    },
    {
      "@type": "Organization",
      name: "Vonlix",
      description: "Booking platform",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Founder", item: `${SITE_URL}/founder` },
  ],
};

const ventures = [
  {
    name: "Scribtly",
    role: "Founder & Builder",
    description:
      "AI content creation platform for freelancers, creators, and businesses. Scribtly eliminates the blank page problem by generating video scripts, social posts, blog outlines, and marketing content in seconds.",
    tag: "AI SaaS",
    url: SITE_URL,
    current: true,
  },
  {
    name: "TsvWeb",
    role: "Founder",
    description:
      "A web design and development studio building websites and digital products for small businesses and growing brands. Working with TsvWeb clients directly shaped what became Scribtly.",
    tag: "Web Design",
    url: "https://tsvetanov.co.uk",
    current: true,
  },
  {
    name: "Warmerly",
    role: "Founder",
    description:
      "An email deliverability SaaS that helps businesses warm up their sending infrastructure and improve inbox rates. Built to solve a recurring problem seen across client email campaigns.",
    tag: "Email SaaS",
    url: null,
    current: false,
  },
  {
    name: "Vonlix",
    role: "Founder",
    description:
      "A booking platform for service businesses, reducing friction in appointment scheduling and client onboarding. Built to serve industries where time-to-booking directly impacts revenue.",
    tag: "Booking Platform",
    url: null,
    current: false,
  },
  {
    name: "The Revision Hub",
    role: "Co-Founder",
    description:
      "An EdTech platform helping students revise more effectively. Co-founded to bring structured, curriculum-aligned revision tools to learners across the UK.",
    tag: "EdTech",
    url: null,
    current: false,
  },
];

const scribtlyCapabilities = [
  {
    icon: PenLine,
    title: "Content ideas & outlines",
    description:
      "Turn a topic and a target audience into a structured content plan — complete with hooks, key points, and a call to action.",
  },
  {
    icon: FileText,
    title: "Video scripts & hooks",
    description:
      "Full scripts for YouTube, TikTok, Instagram Reels, LinkedIn video, and YouTube Shorts — platform-native structure built in.",
  },
  {
    icon: MessageSquare,
    title: "Social media posts",
    description:
      "Captions, hooks, and hashtag suggestions for every major platform, written to match the creator's tone and audience.",
  },
  {
    icon: Users,
    title: "Freelance marketing content",
    description:
      "Pitches, proposals, case study outlines, and client-facing copy — all the content freelancers need to win and retain business.",
  },
  {
    icon: Zap,
    title: "AI-assisted workflows",
    description:
      "Save client voice profiles once and generate on-brand content instantly. No re-briefing, no copy-pasting brand guides.",
  },
  {
    icon: BarChart3,
    title: "Blog drafts",
    description:
      "Long-form blog posts with SEO-structured headings, introductions, and body copy — ready to edit and publish.",
  },
];

const blankPageProblems = [
  "Freelancers billing 20 hours a week but spending 8 of them staring at a blank Google Doc",
  "Creators who know exactly what they want to say but can't find the words to start",
  "Businesses that hire agencies for content briefs that should take 10 minutes, not 3 days",
  "Script writers who re-explain a client's brand voice to ChatGPT every single session",
  "Small business owners who know they need content but never find the time to create it",
];

export default function FounderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.12),transparent_45%),linear-gradient(315deg,rgba(127,119,221,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full bg-[var(--color-primary)]/8 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-30px] w-[280px] h-[280px] rounded-full bg-[var(--color-primary)]/6 blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-5 pt-16 pb-14">
          <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-14">
            {/* Text */}
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-[var(--color-primary)] backdrop-blur">
                <Sparkles size={11} />
                Meet the founder
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-[var(--color-text)] mb-4">
                Scribtly — Founded by{" "}
                <a
                  href="https://tsvetanov.co.uk/scribtly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline decoration-[var(--color-primary)]/40 underline-offset-4"
                >
                  Kristiyan Tsvetanov
                </a>
              </h1>
              <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-xl mb-6">
                Scribtly is an AI content creation platform built for freelancers, creators, and businesses who are
                tired of starting from a blank page. It was founded by Kristiyan Tsvetanov — a Birmingham-based
                developer and serial SaaS builder — after he watched content creation bottleneck every business
                he worked with through{" "}
                <a
                  href="https://tsvetanov.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline underline-offset-4"
                >
                  TsvWeb
                </a>
                .
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/signup">
                  <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                    Try Scribtly free <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
                <a
                  href="https://tsvetanov.co.uk/scribtly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Read more about Scribtly <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Founder card */}
            <div className="shrink-0 flex flex-col items-center gap-4 md:items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[var(--color-primary)]/20 blur-[20px] scale-110" />
                <Image
                  src="/founder.jpeg"
                  alt="Kristiyan Tsvetanov — Founder of Scribtly"
                  width={160}
                  height={160}
                  className="relative h-36 w-36 md:h-40 md:w-40 rounded-full object-cover ring-4 ring-[var(--color-primary)]/20 shadow-xl"
                  priority
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-[var(--color-text)]">Kristiyan Tsvetanov</p>
                <p className="text-sm text-[var(--color-text-muted)]">Founder, Scribtly</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Birmingham, UK</p>
              </div>
              <a
                href="mailto:kristiyan@scribtly.com"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-primary)] hover:underline font-medium"
              >
                <Mail size={11} />
                kristiyan@scribtly.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE BLANK PAGE PROBLEM ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
            The problem
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)] mb-4">
            The blank page problem costs freelancers and creators thousands of hours every year
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            Content creation is one of the highest-leverage activities any business can invest in. It builds
            authority, drives organic traffic, and converts audiences into customers. And yet, for most
            freelancers and small businesses, it's also one of the most consistently avoided — because getting
            started is genuinely hard.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 mb-8">
          <p className="text-sm font-semibold text-[var(--color-text)] mb-5">
            Kristiyan saw this pattern repeat across every business he worked with:
          </p>
          <ul className="space-y-3.5">
            {blankPageProblems.map((problem) => (
              <li key={problem} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                {problem}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[var(--color-text-muted)] leading-relaxed">
          The blank page isn't a creativity problem. It's a process problem. When you have no starting point,
          no structure, and no momentum, even the most experienced writers and content creators grind to a
          halt. Scribtly was built to give people that starting point — a solid, structured, platform-native
          first draft in under 60 seconds — so they can spend their time on what actually requires expertise:
          refining, editing, and publishing.
        </p>
      </section>

      {/* ── WHAT SCRIBTLY DOES ── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
              The platform
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)] mb-4">
              What Scribtly does
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
              Scribtly is not a general-purpose AI writing assistant. It's a focused content creation tool
              built specifically for the types of content that freelancers, creators, and businesses actually
              need to produce consistently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scribtlyCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 group hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200"
              >
                <cap.icon
                  size={18}
                  className="text-[var(--color-primary)] mb-3 group-hover:scale-110 transition-transform duration-200"
                />
                <h3 className="font-semibold text-[var(--color-text)] mb-2 text-sm">{cap.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-6">
            <p className="text-sm text-[var(--color-text)] leading-relaxed">
              Every feature in Scribtly is designed around one constraint: the output has to be something you
              can actually use. Not a prompt to expand on, not a vague outline — a real first draft. Built for
              the platform it's intended for, written in the voice you've defined, ready to be refined and
              delivered.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT KRISTIYAN ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-14">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
              About the founder
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)] mb-5">
              Kristiyan Tsvetanov — Birmingham-based developer and founder
            </h2>

            <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                <a
                  href="https://tsvetanov.co.uk/scribtly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Kristiyan Tsvetanov
                </a>{" "}
                is a Birmingham-based developer and entrepreneur who has been building software products
                for businesses and consumers since his early career. He is the founder of multiple SaaS
                products and digital ventures — each one built to solve a specific, practical problem he
                observed while working closely with clients and businesses in the UK.
              </p>
              <p>
                His background is in web design and development. Through{" "}
                <a
                  href="https://tsvetanov.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline underline-offset-4"
                >
                  TsvWeb
                </a>
                , his web design studio, Kristiyan worked directly with small businesses, freelancers, and
                growing brands — building their websites and helping them establish a digital presence. It
                was through this work that a pattern emerged: almost every business he worked with
                struggled to create content consistently.
              </p>
              <p>
                The struggle was never about ideas. His clients had ideas. The problem was always the same:
                sitting down to write, and not knowing where to start. A blank document. A half-formed
                thought. An hour spent going nowhere before giving up and pushing content creation to next
                week. Again.
              </p>
              <p>
                Scribtly was his answer to that problem — a tool precise enough to fix the blank page, fast
                enough to fit into a real workflow, and smart enough to produce output that actually sounds
                like the person using it.
              </p>
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="md:w-64 shrink-0 space-y-4">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="flex items-center gap-2 mb-1">
                <Globe size={14} className="text-[var(--color-primary)]" />
                <span className="text-xs font-semibold text-[var(--color-text)]">Based in</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">Birmingham, UK</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="flex items-center gap-2 mb-1">
                <Layers size={14} className="text-[var(--color-primary)]" />
                <span className="text-xs font-semibold text-[var(--color-text)]">Companies founded</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">Scribtly, TsvWeb, Warmerly, Vonlix</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="flex items-center gap-2 mb-1">
                <Code2 size={14} className="text-[var(--color-primary)]" />
                <span className="text-xs font-semibold text-[var(--color-text)]">Role at Scribtly</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">Product, technical direction, and building</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb size={14} className="text-[var(--color-primary)]" />
                <span className="text-xs font-semibold text-[var(--color-text)]">Co-founded</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">The Revision Hub (EdTech)</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="flex items-center gap-2 mb-1">
                <Mail size={14} className="text-[var(--color-primary)]" />
                <span className="text-xs font-semibold text-[var(--color-text)]">Contact</span>
              </div>
              <a
                href="mailto:kristiyan@scribtly.com"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                kristiyan@scribtly.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY HE BUILT SCRIBTLY ── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-5 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
            The origin
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)] mb-8">
            Why Kristiyan built Scribtly
          </h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 md:p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Image
                src="/founder.jpeg"
                alt="Kristiyan Tsvetanov — Founder of Scribtly"
                width={52}
                height={52}
                className="rounded-full object-cover shrink-0 ring-2 ring-[var(--color-primary)]/20"
              />
              <div>
                <p className="font-semibold text-[var(--color-text)] text-sm">Kristiyan Tsvetanov</p>
                <p className="text-xs text-[var(--color-text-muted)]">Founder, Scribtly</p>
              </div>
            </div>
            <blockquote className="space-y-4 text-[var(--color-text)] leading-relaxed">
              <p>
                &ldquo;Every client I worked with through TsvWeb had the same problem. They wanted to be creating
                content — videos, blogs, social posts — but they weren't. When I asked why, it was never
                that they didn't want to. It was that getting started felt impossible.
              </p>
              <p>
                I watched people spend two hours opening a blank document, typing three sentences, deleting
                them, and giving up. I watched freelancers re-explain a client's entire brand voice to
                ChatGPT at the start of every session because there was no way to save it. I watched
                business owners push content creation to &lsquo;next month&rsquo; for six months in a row.
              </p>
              <p>
                The problem wasn't the writing. It was the start. So I built Scribtly to fix that — to give
                people a real first draft, built for the platform they're publishing on, written in the
                voice they've already defined. In under 60 seconds. So they can spend their time on the part
                that actually needs them.&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                heading: "Client work revealed the gap",
                body: "Working with dozens of businesses through TsvWeb, Kristiyan saw content creation bottleneck every single client. The pattern was universal enough to demand a tool built specifically for it.",
              },
              {
                heading: "Existing tools missed the point",
                body: "General-purpose AI tools could write, but they couldn't write in a specific voice, for a specific platform, without a fresh brief every session. Scribtly saves the voice profile and applies it instantly.",
              },
              {
                heading: "Built to be used, not experimented with",
                body: "Scribtly isn't a sandbox. Every feature maps directly to a real workflow step. The goal was a tool that freelancers and creators could build into their daily process without friction.",
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <h3 className="font-semibold text-sm text-[var(--color-text)] mb-2">{item.heading}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENTURES ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
          Other ventures
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)] mb-4">
          What else Kristiyan has built
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-10 max-w-2xl">
          Scribtly sits alongside a broader portfolio of software products and digital ventures — each one
          built to solve a specific problem Kristiyan identified through direct experience with clients
          and businesses.
        </p>

        <div className="space-y-4">
          {ventures.map((venture) => (
            <div
              key={venture.name}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-6 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-semibold text-[var(--color-text)]">{venture.name}</h3>
                  <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)]">
                    {venture.tag}
                  </span>
                  {venture.current && (
                    <span className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-primary)]">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">{venture.role}</p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{venture.description}</p>
              </div>
              {venture.url && (
                <a
                  href={venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs text-[var(--color-primary)] hover:underline font-medium self-start"
                >
                  Visit <ExternalLink size={11} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── KRISTIYAN'S ROLE AT SCRIBTLY ── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-5 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
            How Scribtly is built
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)] mb-6">
            Kristiyan's role: product, technical direction, and building
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                Scribtly is a solo product. Kristiyan designs it, builds it, maintains it, and develops the
                product roadmap. Every feature that ships has been designed with one question in mind: does
                this make content creation meaningfully faster or better for the person using it?
              </p>
              <p>
                This matters because it means Scribtly is not built by committee. There's no product
                manager second-guessing user research, no engineering backlog prioritised by revenue
                projections. Features ship when they're ready and when they're genuinely useful.
              </p>
            </div>
            <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                Kristiyan reads every support email personally. If something in Scribtly isn't working as
                it should, or if a user has a workflow that Scribtly could serve better, that feedback goes
                directly to the person making decisions about the product.
              </p>
              <p>
                This close feedback loop between users and builder is what allows Scribtly to stay focused
                on what actually matters. Not features that look good in a marketing pitch, but capabilities
                that make a real difference in a real working week.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-5 flex items-center gap-4">
            <Image
              src="/founder.jpeg"
              alt="Kristiyan Tsvetanov"
              width={40}
              height={40}
              className="rounded-full object-cover shrink-0 ring-2 ring-[var(--color-primary)]/20"
            />
            <p className="text-sm text-[var(--color-text)] leading-relaxed">
              &ldquo;I reply to every support email personally — if something isn&apos;t working, just reach out.&rdquo;
              <span className="text-[var(--color-text-muted)] ml-2">— Kristiyan</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── LINKS ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
          Learn more
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)] mb-8">
          Find out more about Kristiyan and Scribtly
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <a
            href="https://tsvetanov.co.uk/scribtly"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                Scribtly on tsvetanov.co.uk
              </span>
              <ExternalLink size={13} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
            </div>
            <p className="font-semibold text-[var(--color-text)] mb-2">
              Kristiyan Tsvetanov — Scribtly
            </p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Read more about how Kristiyan built Scribtly and his background as a developer and founder.
            </p>
          </a>

          <a
            href="https://tsvetanov.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                Personal site
              </span>
              <ExternalLink size={13} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
            </div>
            <p className="font-semibold text-[var(--color-text)] mb-2">
              tsvetanov.co.uk
            </p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Kristiyan's personal website — covering his work, projects, and the businesses he has built.
            </p>
          </a>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex items-start gap-3">
          <Mail size={16} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)] mb-1">Get in touch directly</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-2">
              For press enquiries, partnership opportunities, or questions about Scribtly, you can email
              Kristiyan directly.
            </p>
            <a
              href="mailto:kristiyan@scribtly.com"
              className="text-sm text-[var(--color-primary)] hover:underline font-medium"
            >
              kristiyan@scribtly.com
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
            Built by Kristiyan Tsvetanov
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Stop starting from a blank page.
          </h2>
          <p className="text-white/75 mb-8 leading-relaxed">
            Scribtly generates platform-native content in your voice in under 60 seconds. Free to start —
            no credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[var(--color-primary)] hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                Try Scribtly free <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

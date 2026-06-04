import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  Zap,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Target,
  Users,
  MessageSquare,
  Repeat,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "UGC script generator for creators and brands",
  description:
    "Generate UGC scripts in your brand's exact voice. Scribtly writes authentic product scripts — hook, demo, and CTA — ready for TikTok, Reels, and YouTube in under 60 seconds.",
  keywords: [
    "UGC script generator",
    "UGC script writer",
    "user generated content scripts",
    "UGC ad script",
    "UGC creator scripts",
    "product video script",
    "TikTok UGC script",
  ],
  alternates: { canonical: "/ugc-scripts" },
  openGraph: {
    type: "website",
    url: "/ugc-scripts",
    siteName: "Scribtly",
    title: "UGC script generator for creators and brands · Scribtly",
    description:
      "Authentic UGC product scripts in your client's voice — hook, demo, social proof, and CTA in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly UGC script generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UGC script generator for creators and brands · Scribtly",
    description:
      "Authentic UGC product scripts in your client's voice — hook, demo, social proof, and CTA in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "UGC Scripts", item: `${SITE_URL}/ugc-scripts` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a UGC script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A UGC (user-generated content) script is a short video script written to sound like a genuine product recommendation from a real person — not a polished ad. It typically includes a relatable hook, a product walkthrough, social proof, and a clear CTA, written in conversational language.",
      },
    },
    {
      "@type": "Question",
      name: "How is a UGC script different from a regular ad script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UGC scripts are designed to feel authentic and unscripted, even though they are structured. They use casual, first-person language, avoid corporate-sounding phrases, and are built for short-form platforms like TikTok, Instagram Reels, and YouTube Shorts.",
      },
    },
    {
      "@type": "Question",
      name: "Can Scribtly match the brand's voice for each UGC brief?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You save the brand's voice profile once — their product category, tone, target audience, and key phrases — and every UGC script is generated from that profile. You never need to paste the brand brief into a new prompt each time.",
      },
    },
    {
      "@type": "Question",
      name: "What platforms do UGC scripts from Scribtly work for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scribtly's UGC scripts are structured for TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels — the main short-form video platforms where UGC content performs best.",
      },
    },
    {
      "@type": "Question",
      name: "Can I generate multiple UGC script variations for the same product?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can generate multiple scripts from the same saved client profile with different angles — problem-led hooks, lifestyle hooks, testimonial-style hooks — and deliver a batch of variations to the brand.",
      },
    },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "Hook first", label: "authentic structure" },
  { value: "Brand voice", label: "saved once, reused" },
];

const steps = [
  {
    n: "1",
    title: "Save the brand profile",
    desc: "Add the product category, brand tone, target customer, and any key phrases. Saved once — every UGC script sounds like it belongs to that brand.",
  },
  {
    n: "2",
    title: "Enter the brief",
    desc: "Drop in the product name, the angle you want — problem-led, lifestyle, review-style — and the platform. Hit generate.",
  },
  {
    n: "3",
    title: "Deliver the script",
    desc: "Hook, product walkthrough, social proof line, and CTA — streamed in under 60 seconds. Ready to film or send to the brand.",
  },
];

const features = [
  {
    icon: Target,
    title: "Authentic hooks",
    desc: "Scroll-stopping openers written to feel like something a real person would say — not a press release dressed up as conversation.",
  },
  {
    icon: ShoppingBag,
    title: "Product-first structure",
    desc: "Hook, relatable problem, product demo, social proof, and CTA. The exact flow that makes UGC convert on paid and organic.",
  },
  {
    icon: Users,
    title: "Brand voice saved",
    desc: "Save the client's brief once. Every script comes out sounding like it was written for that specific brand, not a generic template.",
  },
  {
    icon: Repeat,
    title: "Batch variations",
    desc: "Generate multiple hook angles for the same product brief. Give brands three or four script variations without tripling your time.",
  },
  {
    icon: MessageSquare,
    title: "Natural spoken language",
    desc: "Scripts written for delivery, not reading. Short sentences, conversational phrasing, nothing that sounds robotic out loud.",
  },
  {
    icon: Zap,
    title: "Platform-ready length",
    desc: "Structured for 15, 30, or 60 seconds — the lengths that work on TikTok, Reels, and Shorts without filler padding.",
  },
];

const befores = [
  "Re-reading the brand brief before every single script",
  "Generic ChatGPT outputs that sound like ad copy, not UGC",
  "Spending 45 minutes writing one script variation",
  "Hooks that feel forced or too polished for the platform",
  "Delivering one script when the brand asked for three",
];

const afters = [
  "Brand voice saved — pick the client, start writing",
  "Conversational scripts that sound like a real recommendation",
  "Three variations generated in the time it used to take one",
  "Authentic hooks matched to the brand's tone and audience",
  "Batch delivery without working extra hours",
];

const faqs = [
  {
    q: "What is a UGC script?",
    a: "A UGC (user-generated content) script is a short video script written to sound like a genuine product recommendation from a real person — not a polished ad. It typically includes a relatable hook, a product walkthrough, social proof, and a clear CTA, written in conversational language.",
  },
  {
    q: "How is a UGC script different from a regular ad script?",
    a: "UGC scripts are designed to feel authentic and unscripted, even though they are structured. They use casual, first-person language, avoid corporate-sounding phrases, and are built for short-form platforms like TikTok, Instagram Reels, and YouTube Shorts.",
  },
  {
    q: "Can Scribtly match the brand's voice for each UGC brief?",
    a: "Yes. You save the brand's voice profile once — their product category, tone, target audience, and key phrases — and every UGC script is generated from that profile. You never need to paste the brand brief into a new prompt each time.",
  },
  {
    q: "What platforms do UGC scripts from Scribtly work for?",
    a: "Scribtly's UGC scripts are structured for TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels — the main short-form video platforms where UGC content performs best.",
  },
  {
    q: "Can I generate multiple UGC script variations for the same product?",
    a: "Yes. You can generate multiple scripts from the same saved client profile with different angles — problem-led hooks, lifestyle hooks, testimonial-style hooks — and deliver a batch of variations to the brand.",
  },
];

export default function UGCScriptsPage() {
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,115,22,0.10),transparent_40%),linear-gradient(315deg,rgba(127,119,221,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] right-[-40px] w-[340px] h-[340px] rounded-full bg-[#f97316]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-30px] w-[260px] h-[260px] rounded-full bg-primary/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-[#f97316] backdrop-blur">
            <Sparkles size={11} />
            UGC Scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            UGC scripts that feel real,<br className="hidden md:block" /> not like ads
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Generate authentic product scripts — hook, demo, social proof, CTA — in the brand's exact voice. Written for TikTok, Reels, and Shorts in under 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Start free · 5 scripts <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">See pricing</Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-sm backdrop-blur"
              >
                <span className="font-semibold text-[#f97316]">{s.value}</span>
                <span className="text-text-secondary dark:text-dark-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="max-w-4xl mx-auto px-5 py-14 md:py-16 text-center">
        <p className="text-sm uppercase tracking-widest text-text-secondary dark:text-dark-muted mb-6 font-medium">
          Built for
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "UGC creators",
            "Freelance content creators",
            "Social media managers",
            "Content agencies",
            "Brand marketing teams",
            "Video editors who script",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm"
            >
              {label}
            </span>
          ))}
        </div>
        <p className="mt-8 text-sm text-text-secondary dark:text-dark-muted max-w-xl mx-auto leading-relaxed">
          Whether you manage UGC deliverables for a brand, create content as a freelance UGC creator, or run scripts for an agency's client roster —{" "}
          <Link href="/ai-script-writer" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Scribtly keeps your workflow moving
          </Link>{" "}
          without starting from scratch each time.
        </p>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            From brief to script in three steps
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
            No brief re-entry. No prompt engineering. No staring at a blank page.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-7 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-[#f97316]/30 via-[#f97316]/50 to-[#f97316]/30" />
            {steps.map((s) => (
              <div key={s.n} className="text-center group">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#f97316]/30 bg-orange-50 dark:bg-orange-950/30 text-[#f97316] font-bold text-lg mb-4 group-hover:border-[#f97316] group-hover:bg-[#f97316] group-hover:text-white transition-all duration-200 mx-auto">
                  {s.n}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
                Try it free — no card required
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          What every UGC script includes
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Structure that converts, language that sounds human, and a voice that fits the brand.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card
              key={f.title}
              className="group hover:border-[#f97316]/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <f.icon size={20} className="text-[#f97316] mb-3 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── WHAT A UGC SCRIPT LOOKS LIKE ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What a UGC script looks like
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Scribtly structures UGC scripts around the parts that make product content convert.
          </p>
          <div className="space-y-3">
            {[
              {
                label: "Hook",
                color: "text-[#f97316]",
                bg: "bg-orange-50 dark:bg-orange-950/30 border-[#f97316]/20",
                content:
                  "Relatable statement or question that stops the scroll before the viewer swipes. Matched to the brand's audience and tone.",
              },
              {
                label: "Relatable problem",
                color: "text-primary",
                bg: "bg-primary/5 border-primary/20",
                content:
                  "One or two lines that connect to the viewer's pain point. Why did you need this product? What wasn't working before?",
              },
              {
                label: "Product demo",
                color: "text-[#f97316]",
                bg: "bg-orange-50 dark:bg-orange-950/30 border-[#f97316]/20",
                content:
                  "The what-it-does section. Conversational, specific, focused on what the customer will actually notice.",
              },
              {
                label: "Social proof",
                color: "text-primary",
                bg: "bg-primary/5 border-primary/20",
                content:
                  "A natural-sounding credibility line — results you noticed, how long you've used it, what surprised you.",
              },
              {
                label: "CTA",
                color: "text-[#f97316]",
                bg: "bg-orange-50 dark:bg-orange-950/30 border-[#f97316]/20",
                content:
                  "Simple, direct, not salesy. Where to find it, what to do next — written to feel like a recommendation, not a hard close.",
              },
            ].map((block) => (
              <div
                key={block.label}
                className={`rounded-xl border-hair ${block.bg} px-5 py-4`}
              >
                <div className={`text-xs font-semibold uppercase tracking-wide ${block.color} mb-1.5`}>
                  {block.label}
                </div>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{block.content}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-text-secondary dark:text-dark-muted mt-8">
            Scribtly generates the full script — not just a structure guide.{" "}
            <Link href="/signup" className="underline underline-offset-2 hover:text-foreground transition-colors">
              See it in action with 5 free scripts.
            </Link>
          </p>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Before and after Scribtly
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Same UGC brief — completely different workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-5">
              Without Scribtly
            </div>
            <ul className="space-y-3">
              {befores.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm">
                  <div className="w-4 h-4 rounded-full bg-danger/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-danger text-[10px] font-bold">✕</span>
                  </div>
                  <span className="text-text-secondary dark:text-dark-muted">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-hair border-[#f97316]/30 bg-orange-50/40 dark:bg-orange-950/20 p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#f97316] mb-5">
              With Scribtly
            </div>
            <ul className="space-y-3">
              {afters.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm">
                  <Check size={14} className="text-[#f97316] shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS / RELATED ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-14 md:py-16">
          <h2 className="text-xl font-semibold tracking-tight text-center mb-8">
            More script types on Scribtly
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "TikTok scripts", href: "/tiktok-scripts" },
              { label: "Instagram Reels scripts", href: "/instagram-reels-scripts" },
              { label: "YouTube Shorts scripts", href: "/youtube-shorts-scripts" },
              { label: "Facebook Reels scripts", href: "/facebook-reels-scripts" },
              { label: "Video ad scripts", href: "/video-ad-scripts" },
              { label: "YouTube scripts", href: "/youtube-scripts" },
              { label: "LinkedIn video scripts", href: "/linkedin-video-scripts" },
              { label: "Podcast scripts", href: "/podcast-scripts" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border-hair border-[var(--color-border)] bg-background px-4 py-3 text-sm text-center hover:border-[#f97316]/40 hover:bg-orange-50/30 dark:hover:bg-orange-950/10 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/for-freelancers" className="underline underline-offset-2 text-text-secondary dark:text-dark-muted hover:text-foreground transition-colors">
              For freelancers
            </Link>
            <span className="text-text-secondary dark:text-dark-muted">·</span>
            <Link href="/for-agencies" className="underline underline-offset-2 text-text-secondary dark:text-dark-muted hover:text-foreground transition-colors">
              For agencies
            </Link>
            <span className="text-text-secondary dark:text-dark-muted">·</span>
            <Link href="/for-content-creators" className="underline underline-offset-2 text-text-secondary dark:text-dark-muted hover:text-foreground transition-colors">
              For content creators
            </Link>
            <span className="text-text-secondary dark:text-dark-muted">·</span>
            <Link href="/video-script-template" className="underline underline-offset-2 text-text-secondary dark:text-dark-muted hover:text-foreground transition-colors">
              Video script template
            </Link>
            <span className="text-text-secondary dark:text-dark-muted">·</span>
            <Link href="/tiktok-script-template" className="underline underline-offset-2 text-text-secondary dark:text-dark-muted hover:text-foreground transition-colors">
              TikTok script template
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-5 py-16">
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
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ea6c0a] via-[#f97316] to-[#ea6c0a]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your next UGC script is 60 seconds away.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. Save the brand voice once and generate client-ready UGC scripts on demand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#ea6c0a] hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
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

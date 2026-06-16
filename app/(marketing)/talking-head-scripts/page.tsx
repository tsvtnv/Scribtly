import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Mic2,
  Target,
  Layers,
  RefreshCw,
  AlignLeft,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Talking head video script generator · Scribtly",
  description:
    "Generate talking head video scripts in your client's voice in under 60 seconds. Hook, body, and CTA built for YouTube, LinkedIn, and coaching content.",
  keywords: [
    "talking head video script generator",
    "talking head script",
    "how to script a talking head video",
    "talking head video template",
    "YouTube talking head script",
    "LinkedIn video script generator",
    "coaching video script",
    "AI talking head script writer",
  ],
  alternates: { canonical: "/talking-head-scripts" },
  openGraph: {
    type: "website",
    url: "/talking-head-scripts",
    siteName: "Scribtly",
    title: "Talking head video script generator · Scribtly",
    description:
      "Hook, body, and CTA scripts for talking head videos — in your client's exact voice. YouTube, LinkedIn, coaching content, and more.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly talking head video script generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talking head video script generator · Scribtly",
    description:
      "Hook, body, and CTA scripts for talking head videos — in your client's exact voice. YouTube, LinkedIn, coaching content, and more.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Talking Head Scripts", item: `${SITE_URL}/talking-head-scripts` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a talking head video script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A talking head video script is a written guide for a video where one person speaks directly to the camera, typically without heavy editing or B-roll. It covers the hook, main talking points, transitions, and a clear CTA.",
      },
    },
    {
      "@type": "Question",
      name: "What platforms are talking head scripts used on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Talking head videos are used across YouTube, LinkedIn, Instagram Reels, TikTok, coaching course platforms, and podcast-style video content. Each platform has slightly different pacing expectations, but the core script structure is the same.",
      },
    },
    {
      "@type": "Question",
      name: "How does Scribtly generate scripts in a client's voice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You save a client profile once — their niche, audience, tone, key phrases, and content style. Every script generated for that client starts from that profile. You never re-explain their brand again.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these scripts for YouTube and LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Scribtly generates talking head scripts that work across platforms. You can adjust length and pacing to suit YouTube long-form, LinkedIn short-form, or coaching content.",
      },
    },
    {
      "@type": "Question",
      name: "Do the scripts sound like AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not when the client profile is filled in properly. Scribtly writes from the saved voice, tone, and niche rather than a generic template. The output is a first draft that sounds like the client — not like a chatbot.",
      },
    },
    {
      "@type": "Question",
      name: "Is Scribtly only for freelancers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Scribtly works for freelancers, agencies, coaches, social media managers, YouTube channel managers, and marketing teams — anyone who creates or manages video content for clients or their own brand.",
      },
    },
  ],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scribtly — Talking Head Video Script Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
    description: "Start free with 5 scripts",
  },
  url: `${SITE_URL}/talking-head-scripts`,
  description:
    "Generate talking head video scripts in your client's saved voice. Hook, body sections, and CTA built for YouTube, LinkedIn, coaching, and short-form video.",
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "Any length", label: "short, medium, or long" },
  { value: "Voice-first", label: "sounds like your client" },
];

const steps = [
  {
    n: "1",
    title: "Save the client profile",
    desc: "Enter their niche, audience, tone, phrases they use, and content style. Saved once — every talking head script you generate starts from their voice.",
  },
  {
    n: "2",
    title: "Drop in the topic",
    desc: "Paste the video idea or talking point. Choose short, medium, or long form. Hit generate.",
  },
  {
    n: "3",
    title: "Deliver the script",
    desc: "Hook, structured body sections, smooth transitions, and a clear CTA — ready to hand over or film in under 60 seconds.",
  },
];

const features = [
  {
    icon: Target,
    title: "Scroll-stopping hooks",
    desc: "Every script opens with a hook designed to keep viewers watching past the first few seconds — built around the client's niche and their audience's pain points.",
  },
  {
    icon: Layers,
    title: "Structured body sections",
    desc: "No rambling. Scripts are broken into clear talking points with smooth transitions so the presenter always sounds prepared and on-topic.",
  },
  {
    icon: AlignLeft,
    title: "Natural spoken language",
    desc: "Talking head scripts are written for the camera, not the page. Short sentences, natural rhythm, no phrases that sound clunky out loud.",
  },
  {
    icon: Users,
    title: "Saved client voice",
    desc: "Every script pulls from the saved client profile — their tone, niche, phrases, and audience. No re-explaining brand guidelines each time.",
  },
  {
    icon: RefreshCw,
    title: "Any platform, any length",
    desc: "From a two-minute LinkedIn post-style video to a 15-minute YouTube tutorial — talking head structure adapts to the length you need.",
  },
  {
    icon: Mic2,
    title: "CTA built in",
    desc: "Every script ends with a CTA that matches the client's goal — subscribe, book a call, visit a link, or follow. No awkward endings.",
  },
];

const audienceCards = [
  {
    title: "Freelance script writers",
    desc: "Deliver talking head scripts for multiple clients in a fraction of the time. Every client's voice is saved — just pick the profile and generate.",
    link: "/for-freelancers",
  },
  {
    title: "Content agencies",
    desc: "Scale talking head script production across a roster of clients without hiring more writers. Save every client profile once and generate at speed.",
    link: "/for-agencies",
  },
  {
    title: "Coaches and personal brands",
    desc: "Create consistent video content without spending hours scripting. Your tone and message stay consistent whether you post once a week or every day.",
    link: "/for-coaches",
  },
  {
    title: "Social media managers",
    desc: "Write talking head scripts for LinkedIn, YouTube, and Reels without being a copywriter. The client profile does the heavy lifting.",
    link: "/for-social-media-managers",
  },
  {
    title: "YouTube channel managers",
    desc: "Generate scripts for educational or commentary-style YouTube videos quickly. Hooks, sections, and CTAs built for watch time.",
    link: "/youtube-scripts",
  },
  {
    title: "Small businesses and founders",
    desc: "Create video content that sounds genuinely like you — not a generic AI script. Save your brand voice once and use it every time you record.",
    link: "/for-small-businesses",
  },
];

const befores = [
  "Blank document, 20 minutes wasted trying to find the opening line",
  "Re-reading the client's old content to reverse-engineer their tone",
  "Scripts that ramble without a clear structure",
  "CTAs that feel bolted on at the end",
  "Delivering drafts that need two rounds of revision to sound right",
];

const afters = [
  "Hook, body, and CTA generated in under 60 seconds",
  "Client voice locked in once — every script sounds like them",
  "Structured, punchy scripts that respect the viewer's time",
  "CTAs matched to the client's goal, built into the script",
  "First drafts that are actually first drafts, not rough outlines",
];

const faqs = [
  {
    q: "What is a talking head video script?",
    a: "A talking head video script is a written guide for a video where one person speaks directly to camera — no heavy editing or B-roll required. It covers the hook, main talking points, transitions, and a closing CTA. It's the most common video format on YouTube, LinkedIn, and coaching platforms.",
  },
  {
    q: "What platforms are talking head scripts used on?",
    a: "Talking head videos appear on YouTube, LinkedIn, Instagram Reels, TikTok, course platforms, and podcast-style video content. The core script structure is similar across all of them — hook, body, CTA — but pacing and length vary by platform.",
  },
  {
    q: "How does Scribtly generate scripts in a client's voice?",
    a: "You save a client profile once — their niche, audience, tone, key phrases, and content style. Every script generated for that client starts from that profile. You never re-explain their brand again.",
  },
  {
    q: "Can I use these scripts for both YouTube and LinkedIn?",
    a: "Yes. Scribtly generates talking head scripts that work across platforms. Adjust the length to suit YouTube long-form or LinkedIn short-form. The structure — hook, body, CTA — stays consistent.",
  },
  {
    q: "Do the scripts sound like AI?",
    a: "Not when the client profile is filled in properly. Scribtly writes from the saved voice, tone, and niche rather than a generic template. The output is a first draft that sounds like the client — not like a chatbot.",
  },
  {
    q: "Is Scribtly only for freelancers?",
    a: "No. Scribtly works for freelancers, content agencies, coaches, social media managers, YouTube channel managers, and marketing teams — anyone producing video content for clients or their own brand.",
  },
];

const relatedLinks = [
  { label: "YouTube Scripts", href: "/youtube-scripts" },
  { label: "YouTube Shorts Scripts", href: "/youtube-shorts-scripts" },
  { label: "TikTok Scripts", href: "/tiktok-scripts" },
  { label: "Instagram Reels Scripts", href: "/instagram-reels-scripts" },
  { label: "LinkedIn Video Scripts", href: "/linkedin-video-scripts" },
  { label: "Video Ad Scripts", href: "/video-ad-scripts" },
  { label: "Podcast Scripts", href: "/podcast-scripts" },
  { label: "UGC Scripts", href: "/ugc-scripts" },
  { label: "AI Script Writer", href: "/ai-script-writer" },
];

export default function TalkingHeadScriptsPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.12),transparent_40%),linear-gradient(315deg,rgba(127,119,221,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] right-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-30px] w-[260px] h-[260px] rounded-full bg-primary/08 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Talking Head Scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Talking head video scripts<br className="hidden md:block" /> in your client&apos;s voice
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Generate structured talking head scripts — hook, body, CTA — in under 60 seconds. Built for YouTube, LinkedIn, coaching content, and anywhere a person speaks to camera.
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
                <span className="font-semibold text-primary">{s.value}</span>
                <span className="text-text-secondary dark:text-dark-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS TALKING HEAD ── */}
      <section className="max-w-3xl mx-auto px-5 py-14 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          The most common video format — and the hardest to script well
        </h2>
        <p className="text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Talking head videos look simple: one person, one camera, one topic. But that simplicity is exactly what makes them hard to write. There is nowhere to hide. If the script is weak, the video is weak.
        </p>
        <p className="text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          A good talking head script opens with a hook that earns the next 30 seconds, moves through structured talking points without rambling, and closes with a CTA that feels natural — not like an afterthought.
        </p>
        <p className="text-text-secondary dark:text-dark-muted leading-relaxed">
          Scribtly generates scripts that hit all three. And because every script pulls from a saved client profile, it sounds like the person on camera — not a generic AI output.
        </p>
        <div className="mt-8">
          <Link href="/signup">
            <Button size="lg">
              Generate your first talking head script <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Script in three steps
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
            Save the client once. Generate scripts in seconds. Never start from a blank page again.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-7 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30" />
            {steps.map((s) => (
              <div key={s.n} className="text-center group">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary/30 bg-[var(--color-primary-tint)] text-primary font-bold text-lg mb-4 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 mx-auto">
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
          What every talking head script includes
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Structure, spoken-word rhythm, and your client&apos;s voice — every time.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card
              key={f.title}
              className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <f.icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Who uses Scribtly for talking head scripts
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Any workflow where a person speaks to camera and needs a script that sounds like them — not like a prompt.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {audienceCards.map((item) => (
              <Link key={item.title} href={item.link} className="block group">
                <Card className="h-full group-hover:border-primary/40 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{item.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Before and after Scribtly
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Same client, same video format — completely different workflow.
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
          <div className="rounded-xl border-hair border-primary/30 bg-[var(--color-primary-tint)] p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-5">
              With Scribtly
            </div>
            <ul className="space-y-3">
              {afters.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm">
                  <Check size={14} className="text-primary shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── RELATED PAGES ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-5 py-12">
          <h2 className="text-lg font-semibold tracking-tight mb-6 text-center">
            More script types on Scribtly
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border-hair border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
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

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6e66cc] via-primary to-[#6e66cc]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your next talking head script is 60 seconds away.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. Save your client&apos;s voice once and generate every script from it.
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

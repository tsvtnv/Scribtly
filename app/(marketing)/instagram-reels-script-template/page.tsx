import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Target,
  Repeat,
  Timer,
  Image,
} from "lucide-react";

export const metadata = {
  title: "Free Instagram Reels script template (copy + use)",
  description:
    "Free Instagram Reels script template for 15–90 second videos. Hook, body, payoff, loop hook, cover frame note — or let Scribtly generate it in your client's voice.",
  keywords: [
    "instagram reels script template",
    "free reels script template",
    "instagram reels video script",
    "reels script outline",
    "how to write an instagram reels script",
    "reels script format",
    "instagram video script template",
  ],
  alternates: { canonical: "/instagram-reels-script-template" },
  openGraph: {
    type: "website",
    url: "/instagram-reels-script-template",
    siteName: "Scribtly",
    title: "Free Instagram Reels script template (copy + use) · Scribtly",
    description:
      "Free Instagram Reels script template for 15–90 second videos. Hook, body, payoff, loop hook, and cover frame note.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Free Instagram Reels script template" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Instagram Reels script template (copy + use) · Scribtly",
    description:
      "Free Instagram Reels script template for 15–90 second videos. Hook, body, payoff, loop hook, and cover frame note.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Instagram Reels Script Template", item: `${SITE_URL}/instagram-reels-script-template` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should an Instagram Reels script be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "15 seconds for a single punchy point. 30 seconds for a quick tip with a little context. 60 to 90 seconds for a story or a multi-step how-to. Most Reels that perform well stay under 60 seconds — longer isn't better unless every second is earning attention.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good hook for Instagram Reels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hook that works on Reels either creates an immediate information gap or leads with a bold claim. Bold statements, surprising facts, direct questions, and visual pattern interrupts all work. Avoid opening with 'Hey everyone, today I want to talk about...' — you lose viewers in the first two seconds.",
      },
    },
    {
      "@type": "Question",
      name: "How many hashtags should I use on Instagram Reels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three to five targeted hashtags tend to work better than 30 generic ones. Use one broad hashtag, one niche hashtag, and one or two topic-specific hashtags. Avoid banned or overused hashtags as they can suppress reach.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this template for TikTok too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The core structure — hook, body, payoff, loop hook — works for both platforms. The main differences are in the caption style and hashtag strategy. Instagram captions can be longer and more conversational. TikTok captions are typically shorter and more direct.",
      },
    },
    {
      "@type": "Question",
      name: "What is a cover frame and does it matter for Reels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cover frame is the still image that shows on your Instagram grid for that Reel. It matters because it affects whether people tap on your content when browsing your profile. A good cover frame is readable, on-brand, and shows what the Reel is about at a glance.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between this template and Scribtly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The template gives you the structure — you still write all the words. Scribtly fills in the entire script from your saved client voice profile: hook, body, payoff, loop hook, cover frame note, and caption — in the right length, in their exact voice, in under 60 seconds.",
      },
    },
  ],
};

const steps = [
  {
    n: "1",
    title: "Pick your length",
    desc: "Decide if you're writing 15, 30, 60, or 90 seconds — the amount of body content changes significantly with each.",
  },
  {
    n: "2",
    title: "Hook first, payoff second",
    desc: "Write your opening hook and your ending payoff before filling in the middle. They should feel connected.",
  },
  {
    n: "3",
    title: "Or use Scribtly",
    desc: "Generate the whole script from a saved client profile — length, voice, and Reels format in one click.",
  },
];

const features = [
  {
    icon: Target,
    title: "Scroll-stopping hook formulas",
    desc: "Hooks designed to earn attention in the first 1–3 seconds before a viewer swipes past your Reel.",
  },
  {
    icon: Timer,
    title: "Length-specific structure",
    desc: "Different body density for 15s, 30s, 60s, and 90s — the template adapts to whichever format you're writing.",
  },
  {
    icon: Repeat,
    title: "Loop hooks for rewatch rate",
    desc: "An optional closing line that connects back to the hook, nudging viewers to watch again.",
  },
  {
    icon: Image,
    title: "Cover frame note included",
    desc: "A dedicated section to note what the Reel's grid thumbnail should show — often overlooked but easy to miss.",
  },
];

const faqs = [
  {
    q: "How long should an Instagram Reels script be?",
    a: "15 seconds for a single punchy point. 30 seconds for a quick tip with a little context. 60 to 90 seconds for a story or a multi-step how-to. Most Reels that perform well stay under 60 seconds — longer isn't better unless every second is earning attention.",
  },
  {
    q: "What makes a good hook for Instagram Reels?",
    a: "A hook that works on Reels either creates an immediate information gap or leads with a bold claim. Bold statements, surprising facts, direct questions, and visual pattern interrupts all work. Avoid opening with 'Hey everyone, today I want to talk about...' — you lose viewers in the first two seconds.",
  },
  {
    q: "How many hashtags should I use on Instagram Reels?",
    a: "Three to five targeted hashtags tend to work better than 30 generic ones. Use one broad hashtag, one niche hashtag, and one or two topic-specific hashtags. Avoid banned or overused hashtags as they can suppress reach.",
  },
  {
    q: "Can I use this template for TikTok too?",
    a: "Yes. The core structure — hook, body, payoff, loop hook — works for both platforms. The main differences are caption style and hashtag strategy. Instagram captions can be longer and more conversational. TikTok captions are typically shorter and more direct.",
  },
  {
    q: "What is a cover frame and does it matter for Reels?",
    a: "The cover frame is the still image that shows on your Instagram grid for that Reel. It matters because it affects whether people tap on your content when browsing your profile. A good cover frame is readable, on-brand, and shows what the Reel is about at a glance.",
  },
  {
    q: "What is the difference between this template and Scribtly?",
    a: "The template gives you the structure — you still write all the words. Scribtly fills in the entire script from your saved client voice profile: hook, body, payoff, loop hook, cover frame note, and caption — in the right length, in their exact voice, in under 60 seconds.",
  },
];

export default function InstagramReelsScriptTemplatePage() {
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
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#e1306c]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Free Template
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Free Instagram Reels script template
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Use this Reels script template for 15, 30, 60, or 90-second videos. Fill it in manually or let Scribtly generate a complete script in your client&apos;s exact voice in under 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Use the AI generator <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">See pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Template */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Free Instagram Reels script template
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 max-w-xl leading-relaxed">
          Copy this into your Google Doc, Notion, or notes app. Works for 15s, 30s, 60s, and 90s formats — adjust body density for each length.
        </p>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-mono text-sm space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">HOOK (first 1–3 seconds)</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Bold statement, question, or visual hook that stops the scroll. No greetings. No preamble. Get straight to it.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">BODY</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Your one clear point. Short sentences. No filler. In a 15s script this is 1–2 lines. In a 60–90s script, 3–5 lines max. Each line should earn its place.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">PAYOFF</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[The resolution, punchline, or takeaway. This is what makes the viewer feel the Reel was worth watching — and worth sharing.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">LOOP HOOK (optional)</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[A line at the end that connects back to the hook, making viewers want to rewatch. "That's why I said [hook]..." works well.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">COVER FRAME NOTE (optional)</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[What should appear on the grid thumbnail? Text overlay, facial expression, visual — note it here so it doesn't get forgotten in the edit.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">CAPTION + HASHTAGS</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[1–3 sentence caption that adds context or encourages engagement. 3–5 targeted hashtags. Avoid stuffing.]</p>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            How to use this template
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
            Three steps from blank page to ready-to-film Reel.
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
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Want AI to fill it in for you?
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates every section of this template automatically — hook, body, payoff, loop hook, cover frame note, and caption — from a saved client voice profile. Pick the length, paste the topic, get a complete Reels script in under 60 seconds. No brackets left empty.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
                Generate a Reels script free <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/instagram-reels-scripts">
              <Button size="lg" variant="outline">See Reels script generator</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What Scribtly adds to the template
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            The template gives you structure. Scribtly gives you a finished script.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <Link href="/tiktok-script-template" className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-primary/40 transition-colors">
              <p className="text-sm font-medium group-hover:text-primary transition-colors">TikTok script template →</p>
            </Link>
            <Link href="/youtube-script-template" className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-primary/40 transition-colors">
              <p className="text-sm font-medium group-hover:text-primary transition-colors">YouTube script template →</p>
            </Link>
            <Link href="/video-script-template" className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-primary/40 transition-colors">
              <p className="text-sm font-medium group-hover:text-primary transition-colors">Video script template →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Reels scripts are different */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          Why Reels scripts need their own structure
        </h2>
        <div className="space-y-5 text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          <p>
            Instagram Reels shares a lot of DNA with TikTok — short-form, vertical, hook-driven — but the audience and context differ in ways that matter when you&apos;re writing for clients.
          </p>
          <p>
            Reels viewers tend to be slightly older and skew more towards lifestyle, business, and education content. The platform rewards saves and shares more than raw rewatch rate, which means your payoff section needs to give people a genuine reason to save or forward the video.
          </p>
          <p>
            The cover frame also matters in a way it doesn&apos;t on TikTok. Because Instagram profiles show a grid, every Reel leaves a permanent thumbnail. A poorly chosen cover frame can hurt profile aesthetics and reduce tap-through when someone lands on your client&apos;s page for the first time. The template includes a section for noting the intended cover frame so it doesn&apos;t get skipped during the edit.
          </p>
          <p>
            Captions on Reels can be longer and more conversational than TikTok. Many creators use the caption to add extra value — a key takeaway, a question to spark comments, or a soft CTA like &ldquo;Save this for later.&rdquo; The template includes a caption block so it gets written alongside the script, not as an afterthought.
          </p>
          <p>
            If you&apos;re writing Reels scripts for clients, tools like <Link href="/for-freelancers" className="text-primary hover:underline">Scribtly for freelancers</Link> let you save each client&apos;s voice profile once — their tone, niche, phrases, and audience — and generate scripts that sound like them, not like generic AI output.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16">
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

      {/* Internal links section */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-xl font-semibold tracking-tight mb-6">More from Scribtly</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Link href="/instagram-reels-scripts" className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 hover:border-primary/40 transition-colors">
            <span className="font-medium group-hover:text-primary transition-colors">Instagram Reels script generator</span>
            <ArrowRight size={14} className="text-text-secondary group-hover:text-primary transition-colors" />
          </Link>
          <Link href="/tiktok-scripts" className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 hover:border-primary/40 transition-colors">
            <span className="font-medium group-hover:text-primary transition-colors">TikTok script generator</span>
            <ArrowRight size={14} className="text-text-secondary group-hover:text-primary transition-colors" />
          </Link>
          <Link href="/ai-script-writer" className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 hover:border-primary/40 transition-colors">
            <span className="font-medium group-hover:text-primary transition-colors">AI script writer</span>
            <ArrowRight size={14} className="text-text-secondary group-hover:text-primary transition-colors" />
          </Link>
          <Link href="/for-content-creators" className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 hover:border-primary/40 transition-colors">
            <span className="font-medium group-hover:text-primary transition-colors">Scribtly for content creators</span>
            <ArrowRight size={14} className="text-text-secondary group-hover:text-primary transition-colors" />
          </Link>
          <Link href="/for-social-media-managers" className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 hover:border-primary/40 transition-colors">
            <span className="font-medium group-hover:text-primary transition-colors">Scribtly for social media managers</span>
            <ArrowRight size={14} className="text-text-secondary group-hover:text-primary transition-colors" />
          </Link>
          <Link href="/for-freelancers" className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 hover:border-primary/40 transition-colors">
            <span className="font-medium group-hover:text-primary transition-colors">Scribtly for freelancers</span>
            <ArrowRight size={14} className="text-text-secondary group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Generate your Reels script automatically.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. See how fast your workflow can be.
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

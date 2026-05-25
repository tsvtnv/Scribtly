import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Target,
  FileText,
  Zap,
  LayoutTemplate,
} from "lucide-react";

export const metadata = {
  title: "Free video script template for any platform (2025)",
  description:
    "Free video script template for YouTube, TikTok, and Instagram Reels. Includes hook, structure, and CTA formulas for every platform — or let Scribtly generate it in your voice.",
  keywords: [
    "video script template",
    "free video script template",
    "video script format",
    "how to write a video script",
    "video script outline free",
  ],
  alternates: { canonical: "/video-script-template" },
  openGraph: {
    type: "website",
    url: "/video-script-template",
    siteName: "Scribtly",
    title: "Free video script template for any platform (2025) · Scribtly",
    description:
      "Free video script template for YouTube, TikTok, and Instagram Reels. Hook, structure, and CTA formulas for every platform.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Free video script template" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free video script template for any platform (2025) · Scribtly",
    description:
      "Free video script template for YouTube, TikTok, and Instagram Reels. Hook, structure, and CTA formulas for every platform.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Video Script Template", item: `${SITE_URL}/video-script-template` },
  ],
};

const steps = [
  {
    n: "1",
    title: "Pick your platform",
    desc: "YouTube, TikTok/Reels, or LinkedIn — each has a different structure that matches its audience.",
  },
  {
    n: "2",
    title: "Copy the matching template",
    desc: "Copy the right template above into your Google Doc, Notion, or notes app.",
  },
  {
    n: "3",
    title: "Fill in or use Scribtly",
    desc: "Fill in your topic manually — or use Scribtly to generate from your saved voice profile.",
  },
];

const features = [
  {
    icon: LayoutTemplate,
    title: "Platform-native structure",
    desc: "Each template is built for how that platform's audience actually watches — not a one-size-fits-all outline.",
  },
  {
    icon: Target,
    title: "Hook formulas for each platform",
    desc: "YouTube, TikTok, and LinkedIn hooks work differently. Each template includes the right opener style.",
  },
  {
    icon: FileText,
    title: "CTA formulas",
    desc: "Platform-matched calls to action — from YouTube subscriptions to LinkedIn comment prompts.",
  },
  {
    icon: Zap,
    title: "AI auto-fill with Scribtly",
    desc: "Skip the blank brackets. Scribtly generates every section in your client's voice in under 60 seconds.",
  },
];

const faqs = [
  {
    q: "Which script template should I use?",
    a: "Use the YouTube template for videos longer than 3 minutes. Use the TikTok/Reels template for short-form content under 60 seconds. Use the LinkedIn template for professional thought-leadership videos. If you're cross-posting, adapt each version — the same script rarely works natively across all three platforms.",
  },
  {
    q: "How do I write a video script hook?",
    a: "Start with a tension, a bold claim, or a direct question that makes the viewer want to keep watching. The best hooks create an information gap — something the viewer needs to resolve by watching. Avoid 'Hey guys, in this video I'm going to...' on every platform.",
  },
  {
    q: "How long should my script be?",
    a: "YouTube: 3–20 minutes depending on topic depth. TikTok and Reels: 15, 30, or 60 seconds. LinkedIn video: 60–90 seconds for highest engagement. Match length to the depth your topic deserves — never pad for the algorithm.",
  },
  {
    q: "Can I use one script for multiple platforms?",
    a: "The core idea can transfer, but the structure shouldn't be identical. A YouTube intro is too slow for TikTok. A TikTok payoff is too short for YouTube. Use the right template for each platform and adapt the content rather than copying it directly.",
  },
  {
    q: "What's the difference between a template and a script generator?",
    a: "A template gives you the structure — blank sections to fill in yourself. A script generator like Scribtly fills in the entire script from your client's saved voice profile: hook, body, CTA, B-roll notes, captions, and hashtags — all in the right format for the platform you choose.",
  },
];

export default function VideoScriptTemplatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Free Template
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Free video script template for every platform
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            One template doesn't fit all platforms. Here are the right script structures for YouTube, TikTok, and Instagram Reels — or skip the manual work and let Scribtly generate a full script in your voice.
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

      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20 space-y-16">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">YouTube script template</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            For videos 3–20 minutes. Built to hold retention and hit watch time targets.
          </p>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-mono text-sm space-y-5">
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">HOOK</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Pattern-interrupt opener — 1–2 sentences that create curiosity, tension, or a bold claim. No "Hey guys, today I'm going to..."]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">INTRO</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Set up why this topic matters. Connect to the viewer's pain or goal. 2–4 sentences.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">SECTION 1 — [First main point]</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Key point with examples, data, or story. Add <span className="text-primary">[B-ROLL: note]</span> where needed.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">SECTION 2 — [Second main point]</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Your second point. Keep momentum. Don't summarise yet.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">SECTION 3 — [Third main point]</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Final key point. Builds naturally to the conclusion.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">CTA</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[What to do next. Watch another video, subscribe, comment, or check a link. Make it feel earned.]</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">TikTok & Reels script template</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            For 15s, 30s, and 60s videos. Adjust body density based on length.
          </p>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-mono text-sm space-y-5">
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">HOOK (first 1–3 seconds)</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Bold statement, question, or visual hook that stops the scroll. Get straight to it — no preamble.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">BODY</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Your one clear point. Short sentences. No filler. 1–2 lines for 15s. 3–4 lines for 60s.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">PAYOFF</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[The resolution, punchline, or takeaway. What makes the viewer feel it was worth watching.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">LOOP HOOK (optional)</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Connects back to the hook — drives rewatches. "And that's why I said [hook]..."]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">CAPTION</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[1–2 sentences + hashtags]</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">LinkedIn video script template</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-6 leading-relaxed">
            For 60–90 second professional videos. Insight-led, story-supported, and direct.
          </p>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-mono text-sm space-y-5">
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">HOOK</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[A counterintuitive statement or direct question relevant to your professional audience. First 3 seconds need to stop the scroll in a feed.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">INSIGHT</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[Your core point. One clear idea. No jargon. State it plainly in 1–2 sentences.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">STORY</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[A brief real example that proves the insight. Client result, personal experience, or case study. 2–4 sentences.]</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-semibold">CTA</span>
              <p className="mt-1 text-text-secondary dark:text-dark-muted">[A question to prompt comments, a link to a resource, or a next-step offer. Keep it one action — not three.]</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            How to use these templates
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
            Three steps to go from topic to ready-to-film script.
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

      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Want AI to fill it in for you?
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates platform-native scripts automatically from your saved client voice profile. Pick the platform, paste the topic, and get a complete finished script — hook, body, CTA, captions, and hashtags — in under 60 seconds. No brackets to fill.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Generate a script free <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

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
        </div>
      </section>

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

      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Let Scribtly fill in the template for you.
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

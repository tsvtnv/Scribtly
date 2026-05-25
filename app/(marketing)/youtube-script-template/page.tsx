import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Target,
  FileText,
  Clapperboard,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "Free YouTube script template (copy + use)",
  description:
    "Download our free YouTube script template. Includes hook, intro, 3 body sections, B-roll notes, and CTA. Copy it, fill it in, or let Scribtly fill it in automatically.",
  keywords: [
    "youtube script template",
    "free youtube script template",
    "youtube video script format",
    "youtube script outline",
    "how to write a youtube script template",
  ],
  alternates: { canonical: "/youtube-script-template" },
  openGraph: {
    type: "website",
    url: "/youtube-script-template",
    siteName: "Scribtly",
    title: "Free YouTube script template (copy + use) · Scribtly",
    description:
      "Download our free YouTube script template. Includes hook, intro, 3 body sections, B-roll notes, and CTA.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Free YouTube script template" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube script template (copy + use) · Scribtly",
    description:
      "Download our free YouTube script template. Includes hook, intro, 3 body sections, B-roll notes, and CTA.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "YouTube Script Template", item: `${SITE_URL}/youtube-script-template` },
  ],
};

const steps = [
  {
    n: "1",
    title: "Copy the template",
    desc: "Copy the template above into your Google Doc or notes app.",
  },
  {
    n: "2",
    title: "Fill in each section",
    desc: "Fill in hook, 3 points, and CTA for your specific video topic.",
  },
  {
    n: "3",
    title: "Or skip straight to Scribtly",
    desc: "Paste your topic, pick a length, get a full script in 60 seconds.",
  },
];

const features = [
  {
    icon: Target,
    title: "Hook formulas",
    desc: "Pattern-interrupt openers that get viewers past the critical first 30 seconds.",
  },
  {
    icon: FileText,
    title: "Structured sections",
    desc: "Hook → Intro → 3 body sections → CTA, built to hold retention and watch time.",
  },
  {
    icon: Clapperboard,
    title: "B-roll notes built in",
    desc: "Production notes like [B-ROLL: close-up of screen] baked into every section.",
  },
  {
    icon: Clock,
    title: "Multiple lengths (3–20 min)",
    desc: "Scripts structured and paced to hit 3–5, 8–10, or 15–20 minute targets when spoken.",
  },
];

const faqs = [
  {
    q: "How long should a YouTube script be?",
    a: "It depends on your topic and audience. Short tutorials work at 3–5 minutes. In-depth explainers and reviews typically land at 8–10 minutes. Deep dives and documentaries can run 15–20 minutes. The key is matching script length to the depth your topic deserves — padding for length kills retention.",
  },
  {
    q: "Do I need to follow this template exactly?",
    a: "No. The template is a proven starting point, not a rigid formula. Some videos work better with two body sections instead of three. Some hooks don't need a formal intro. Use it as a scaffold and adapt based on your content.",
  },
  {
    q: "What's the difference between the template and Scribtly?",
    a: "The template gives you the structure — you still write all the content yourself. Scribtly fills in the entire script from your saved client voice profile: hook, intro, all sections, B-roll notes, and CTA — in under 60 seconds.",
  },
  {
    q: "Can I use this for clients?",
    a: "Yes, freely. Copy it, adapt it, use it across all your client work. If you're writing scripts for multiple clients, Scribtly's saved voice profiles let you generate platform-native scripts for each client without re-briefing.",
  },
  {
    q: "What makes a good YouTube hook?",
    a: "A good YouTube hook creates curiosity, tension, or stakes in the first 1–2 sentences. Avoid \"In this video I'll show you...\". Instead, open with a bold claim, a counterintuitive statement, or a question that makes the viewer feel they need to keep watching to get the answer.",
  },
];

export default function YouTubeScriptTemplatePage() {
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
            Free YouTube script template
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Copy this template and fill it in yourself — or let Scribtly generate a full script in your client's voice in under 60 seconds. No more blank pages.
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

      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Free YouTube script template
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 max-w-xl leading-relaxed">
          Copy this into your Google Doc, Notion, or notes app. Each section has a placeholder — replace the brackets with your content.
        </p>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-mono text-sm space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">HOOK</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Pattern-interrupt opener — 1–2 sentences that create curiosity, tension, or a bold claim. No "Hey guys, today I'm going to..."]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">INTRO</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Briefly set up why this topic matters. Connect to the viewer's pain or goal. 2–4 sentences.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">SECTION 1 — [First main point]</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Explain your first key point. Add examples, data, or a story. Include a B-roll note if needed: <span className="text-primary">[B-ROLL: relevant footage]</span>]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">SECTION 2 — [Second main point]</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Your second point. Keep momentum. Don't summarise yet.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">SECTION 3 — [Third main point]</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Final key point. This should build to the conclusion naturally.]</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary font-semibold">CTA</span>
            <p className="mt-1 text-text-secondary dark:text-dark-muted">[Tell them what to do next. Watch another video, subscribe, comment, or check a link. Make it feel earned, not bolted on.]</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            How to use this template
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
            Three steps to go from blank page to finished script.
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
            Scribtly generates every section of this template automatically — hook, intro, all three body sections, B-roll notes, and CTA — from a saved client voice profile. Paste the topic, pick a length, get a complete script in under 60 seconds. No blank brackets.
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
            Stop filling templates manually. Use Scribtly.
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

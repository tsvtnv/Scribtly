import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  FileText,
  Youtube,
  Repeat,
  Brain,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "AI script writer for YouTube, TikTok & Reels",
  description:
    "Scribtly is an AI script writer for YouTube, TikTok, and Reels. Generate scripts in your client's exact voice. Save brand voices. Deliver faster.",
  keywords: [
    "AI script writer",
    "AI video script generator",
    "AI YouTube script writer",
    "video script AI",
    "script writing AI tool",
    "AI content script generator",
  ],
  alternates: { canonical: "/ai-script-writer" },
  openGraph: {
    type: "website",
    url: "/ai-script-writer",
    siteName: "Scribtly",
    title: "AI script writer for YouTube, TikTok & Reels · Scribtly",
    description:
      "Generate platform-specific video scripts in your client's exact voice. YouTube, TikTok, Reels — all in under 60 seconds.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly AI script writer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI script writer for YouTube, TikTok & Reels · Scribtly",
    description:
      "Generate platform-specific video scripts in your client's exact voice. YouTube, TikTok, Reels — all in under 60 seconds.",
    images: ["/opengraph-image"],
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scribtly",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI script writer for YouTube, TikTok, and Instagram Reels. Saves client brand voices and generates platform-specific scripts in under 60 seconds.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  url: "https://scribtly.com",
};

const stats = [
  { value: "3 platforms", label: "YouTube, TikTok, Reels" },
  { value: "< 60s", label: "per script" },
  { value: "∞ clients", label: "saved voice profiles" },
];

const platforms = [
  {
    name: "YouTube",
    icon: "/platforms/youtube.png",
    href: "/youtube-scripts",
    badge: "Long-form",
    desc: "Full scripts with hooks, structured body sections, B-roll notes, chapters, and earned CTAs. Built to hold watch time.",
    lengths: ["3–5 min", "8–10 min", "15–20 min"],
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "TikTok",
    icon: "/platforms/tiktok.png",
    href: "/tiktok-scripts",
    badge: "Short-form",
    desc: "Punchy, high-energy scripts with pattern interrupts and retention loops baked in. Every second earns the next.",
    lengths: ["15 sec", "30 sec", "60 sec"],
    color: "bg-slate-500/10 text-slate-600",
  },
  {
    name: "Instagram Reels",
    icon: "/platforms/reels.png",
    href: "/instagram-reels-scripts",
    badge: "Short-form",
    desc: "Hook-first scripts that stop the scroll in 3 seconds or less — paced and structured for the Reels algorithm.",
    lengths: ["15 sec", "30 sec", "60 sec"],
    color: "bg-pink-500/10 text-pink-600",
  },
];

const features = [
  {
    icon: Brain,
    title: "Client voice profiles",
    desc: "Save each client's niche, tone, audience, and brand phrases once. Every script is generated from that profile — not a blank slate.",
  },
  {
    icon: Zap,
    title: "Under 60 seconds",
    desc: "Full scripts streamed in real time. No regenerating, no blank-page dread, no prompt tweaking.",
  },
  {
    icon: Layers,
    title: "Platform-native structure",
    desc: "YouTube, TikTok, and Reels each get their own script structure — pacing, hook formulas, and sections built for each algorithm.",
  },
  {
    icon: Users,
    title: "Built for multiple clients",
    desc: "Switch between client profiles instantly. No re-briefing, no copy-pasting tone guides — just pick and generate.",
  },
  {
    icon: FileText,
    title: "Professional delivery",
    desc: "Export scripts, share for client review with a single link, and manage your whole library in one place.",
  },
  {
    icon: Youtube,
    title: "Beyond the script",
    desc: "Titles, descriptions, chapters, hashtags, and captions generated alongside every script — ready to post.",
  },
];

const befores = [
  "Repasting brand docs into ChatGPT for every new script",
  "Generic outputs that sound nothing like the creator",
  "Hours rebuilding structure and pacing from scratch",
  "Missing captions, hashtags, or B-roll notes",
  "No organised place to store or reuse past scripts",
];

const afters = [
  "Client voice saved once, applied to every script automatically",
  "Platform-specific structure — YouTube, TikTok, or Reels",
  "Full script in under 60 seconds from a saved profile",
  "Captions, hashtags, chapters, and B-roll notes included",
  "Script library to search and reuse past work",
];

const faqs = [
  {
    q: "What makes Scribtly different from ChatGPT or other AI tools?",
    a: "Generic AI tools write generic scripts. Scribtly saves each client's brand voice — their tone, phrases, audience, and niche — and writes every script from that profile. The output sounds like your client, not like a template.",
  },
  {
    q: "Which platforms does Scribtly support?",
    a: "YouTube (long-form), TikTok (short-form), and Instagram Reels. Each platform gets scripts formatted for its own algorithm, pacing, and audience behaviour.",
  },
  {
    q: "Do I need to know prompt engineering?",
    a: "No. Just describe what the video is about, pick the platform and length, and Scribtly handles the structure, pacing, and voice matching automatically.",
  },
  {
    q: "Can I manage multiple clients?",
    a: "Yes. Scribtly is built for freelancers and agencies with multiple clients. Save unlimited client profiles and generate scripts for any of them instantly.",
  },
  {
    q: "How long does it take to set up a client profile?",
    a: "About 5 minutes. You fill in their niche, describe their tone, add any phrases they always use, and specify their audience. From that point on, every script starts from that profile — no re-briefing needed.",
  },
];

export default function AIScriptWriterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%),linear-gradient(315deg,rgba(127,119,221,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-primary/8 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} className="text-primary" />
            AI Script Writer
            <span className="ml-1 inline-flex -space-x-1.5">
              <Image src="/platforms/youtube.png" alt="YouTube" width={16} height={16} className="rounded-[3px] ring-1 ring-[var(--color-surface)]" />
              <Image src="/platforms/tiktok.png" alt="TikTok" width={16} height={16} className="rounded-[3px] ring-1 ring-[var(--color-surface)]" />
              <Image src="/platforms/reels.png" alt="Reels" width={16} height={16} className="rounded-[3px] ring-1 ring-[var(--color-surface)]" />
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            The AI script writer built<br className="hidden md:block" /> for client work
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Scribtly writes YouTube, TikTok, and Reels scripts in your client's exact voice. Save their brand profile once. Generate professional, platform-native scripts in under 60 seconds — forever.
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

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="max-w-5xl mx-auto px-5 pt-12 md:pt-16">
        <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden border-hair border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_24px_70px_rgba(127,119,221,0.18)] ring-1 ring-primary/10">
          <Image
            src="/brand/feature-platforms.png"
            alt="Scribtly generating scripts for YouTube, TikTok and Instagram Reels from one client voice"
            width={1024}
            height={1024}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          One tool. Every platform.
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Each platform gets its own script structure, pacing, and format — generated from the same client voice profile.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((p) => (
            <Link key={p.name} href={p.href} className="group block">
              <Card className="h-full hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Image src={p.icon} alt={p.name} width={28} height={28} className="rounded-md shrink-0" />
                    <h3 className="font-semibold group-hover:text-primary transition-colors truncate">{p.name}</h3>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${p.color}`}>
                    {p.badge}
                  </span>
                </div>
                <p className="text-sm text-text-secondary dark:text-dark-muted mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.lengths.map((l) => (
                    <span key={l} className="text-[10px] font-medium bg-[var(--color-bg)] border-hair border-[var(--color-border)] rounded px-2 py-0.5">
                      {l}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Why it works better than generic AI
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Built around client voice profiles — not prompts you copy-paste every time.
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
        </div>
      </section>

      {/* ── LIBRARY SHOWCASE ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Script library</span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Every client, every script, in one place
            </h2>
            <p className="text-text-secondary dark:text-dark-muted text-sm leading-relaxed mb-6">
              Organise scripts by client, platform, and date. Search, filter, reuse, or export any past script in seconds — no more digging through Google Docs or email threads.
            </p>
            <Link href="/signup">
              <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                Start building your library <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
          <div className="relative rounded-xl overflow-hidden ring-1 ring-[var(--color-border)] shadow-[0_20px_60px_rgba(127,119,221,0.18)]">
            <Image
              src="/brand/feature-library.png"
              alt="Script library grid showing client scripts organised by platform"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Before and after Scribtly
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Same client, same topic — completely different experience.
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your first script is 60 seconds away.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. See the difference a voice profile makes.
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

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Zap, Users, FileText } from "lucide-react";

export const metadata = {
  title: "AI script writer for YouTube, TikTok & Reels",
  description:
    "Scribtly is an AI script writer that generates YouTube, TikTok, and Instagram Reels scripts in your client's exact voice. Save brand voices. Deliver faster. Start free.",
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
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Scribtly AI script writer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI script writer for YouTube, TikTok & Reels · Scribtly",
    description:
      "Generate platform-specific video scripts in your client's exact voice. YouTube, TikTok, Reels — all in under 60 seconds.",
    images: ["/og-image.svg"],
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
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://scribtly.com",
};

const platforms = [
  {
    name: "YouTube",
    href: "/youtube-scripts",
    desc: "Long-form scripts with hooks, sections, and CTAs optimised for watch time.",
    lengths: ["3–5 min", "8–10 min", "15–20 min"],
  },
  {
    name: "TikTok",
    href: "/tiktok-scripts",
    desc: "Short, punchy scripts with pattern interrupts and retention loops.",
    lengths: ["15 sec", "30 sec", "60 sec"],
  },
  {
    name: "Instagram Reels",
    href: "/instagram-reels-scripts",
    desc: "Hook-first scripts designed to stop the scroll in 3 seconds.",
    lengths: ["15 sec", "30 sec", "60 sec"],
  },
];

const features = [
  { icon: Users, title: "Saves every client's voice", desc: "Store their niche, tone, phrases, and audience once. Every script sounds like them — not like AI." },
  { icon: Zap, title: "Generates in under 60 seconds", desc: "Full scripts streamed in real time. No waiting, no regenerating, no blank-page dread." },
  { icon: FileText, title: "Built for professional delivery", desc: "Export scripts, share for client review, and manage your whole script library in one place." },
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
];

export default function AIScriptWriterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <section className="max-w-4xl mx-auto px-5 pt-20 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          The AI script writer built for client work
        </h1>
        <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-2xl mx-auto">
          Scribtly writes YouTube, TikTok, and Reels scripts in your client's exact voice. Save their brand profile once. Generate professional scripts in under 60 seconds — forever.
        </p>
        <div className="flex items-center justify-center gap-3 mt-7 flex-wrap">
          <Link href="/signup">
            <Button size="lg">Start free · 5 scripts</Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">See pricing</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-8">
          One tool. Every platform.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((p) => (
            <Link key={p.name} href={p.href} className="group block">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">{p.desc}</p>
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

      <section className="max-w-4xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-8">
          Why it works better than generic AI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.title}>
              <f.icon size={20} className="text-primary mb-3" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Frequently asked questions</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b-hair border-[var(--color-border)] pb-6 last:border-0">
              <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Try it free — no credit card needed
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6">
          5 free scripts to start. Upgrade when you're ready.
        </p>
        <Link href="/signup">
          <Button size="lg">Start writing for free</Button>
        </Link>
      </section>
    </>
  );
}

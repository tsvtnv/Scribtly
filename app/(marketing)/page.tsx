import Link from "next/link";
import { Sparkles, FileText, Library, Download, ArrowRight, Youtube, Music2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scriptfast.app";

export const metadata = {
  title: "ScriptFast — AI Video Scripts for Freelancers in Your Client's Voice",
  description:
    "Generate YouTube, TikTok, and Reels scripts for your clients in under 60 seconds. Save each client's brand voice once and generate unlimited scripts forever.",
  alternates: {
    canonical: APP_URL,
  },
  openGraph: {
    title: "ScriptFast — AI Video Scripts for Freelancers",
    description:
      "Generate YouTube, TikTok, and Reels scripts for your clients in under 60 seconds. Save each client's brand voice once and generate unlimited scripts forever.",
    url: APP_URL,
  },
};

const features = [
  { icon: Sparkles, title: "Save client profiles once", desc: "Name, niche, tone, audience — stored forever. Every script auto-written in their voice." },
  { icon: FileText, title: "Platform-specific structure", desc: "YouTube hooks are different to TikTok. ScriptFast knows. You don't have to explain it." },
  { icon: Library, title: "Script library per client", desc: "All scripts organised by client. Find, reuse, export any script in seconds." },
  { icon: Download, title: "One-click export", desc: "Download as PDF or copy to clipboard. Ready to send to your client instantly." },
];

const painPoints = [
  "2-3 hours to write one decent YouTube script",
  "Constantly re-explaining your client's tone to ChatGPT",
  "No organised system — scripts lost in docs and chat threads",
  "Clients asking for revisions on things you got wrong",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${APP_URL}/#organization`,
      name: "ScriptFast",
      url: APP_URL,
      logo: {
        "@type": "ImageObject",
        url: `${APP_URL}/logo.png`,
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: "ScriptFast",
      publisher: { "@id": `${APP_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${APP_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${APP_URL}/#app`,
      name: "ScriptFast",
      url: APP_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
        description: "Free plan includes 3 scripts per month",
      },
      description:
        "AI-powered video script generator for freelancers. Generate YouTube, TikTok, and Reels scripts in your client's exact brand voice in under 60 seconds.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="max-w-4xl mx-auto px-5 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          Write video scripts 10× faster —
          <br />
          <span className="text-primary">in your client's exact voice</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary dark:text-dark-muted mt-6 max-w-2xl mx-auto">
          ScriptFast generates YouTube, TikTok and Reels scripts for your clients in under 60 seconds. Save their brand voice once. Generate forever.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 items-center justify-center">
          <Link href="/signup">
            <Button size="lg">Start free — 3 scripts included <ArrowRight size={16} /></Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="ghost">See pricing</Button>
          </Link>
        </div>
        <p className="text-xs text-text-secondary dark:text-dark-muted mt-6">
          Used by 500+ freelancers and content consultants.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8">
          Writing scripts manually is killing your margins
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {painPoints.map((p) => (
            <li key={p} className="flex items-start gap-2 p-4 rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)]">
              <span className="text-danger">✕</span>
              <span className="text-sm">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          ScriptFast remembers your clients so you don't have to
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-2xl mx-auto">
          Four things we do that generic AI chatbots can't.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <Icon size={20} className="text-primary mb-3" />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8">
          Built for every short-form and long-form platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/youtube-scripts" className="block group">
            <Card>
              <Youtube size={20} className="text-red-500 mb-3" />
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">YouTube script writer</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">
                Full long-form scripts — hook, intro, sections, B-roll notes, and CTA — structured for watch time and the algorithm.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">Learn more <ArrowRight size={12} /></span>
            </Card>
          </Link>
          <Link href="/tiktok-scripts" className="block group">
            <Card>
              <Music2 size={20} className="text-pink-500 mb-3" />
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">TikTok script writer</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">
                Short-form scripts built for scroll-stopping hooks — 15, 30, or 60 seconds, with action cues and loop hooks baked in.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">Learn more <ArrowRight size={12} /></span>
            </Card>
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Start free. Upgrade when you're ready.
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6">
          3 free scripts. No credit card. Upgrade for unlimited anytime.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg">Start generating free</Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="ghost">View pricing</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

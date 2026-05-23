import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";

export const metadata = {
  title: "YouTube script writer for freelancers",
  description:
    "Write YouTube scripts that keep viewers watching. Scribtly generates scripts in your client's voice — hooks, sections, and CTAs built for the algorithm.",
  keywords: [
    "YouTube script generator",
    "AI YouTube script writer",
    "long-form video scripts",
    "YouTube hook generator",
    "video script for freelancers",
  ],
  alternates: { canonical: "/youtube-scripts" },
  openGraph: {
    type: "website",
    url: "/youtube-scripts",
    siteName: "Scribtly",
    title: "YouTube script writer for freelancers · Scribtly",
    description:
      "Long-form YouTube scripts in your client's voice — hooks, sections, and CTAs built for the algorithm.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly YouTube script writer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube script writer for freelancers · Scribtly",
    description:
      "Long-form YouTube scripts in your client's voice — hooks, sections, and CTAs built for the algorithm.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "YouTube Scripts", item: `${SITE_URL}/youtube-scripts` },
  ],
};

const steps = [
  { n: "1", title: "Add your client", desc: "Save their niche, audience, tone, and phrases once. That's it." },
  { n: "2", title: "Describe the topic", desc: "Paste the idea, pick a length (3-5, 8-10, or 15-20 minutes), and go." },
  { n: "3", title: "Get a full script", desc: "Hook, intro, three sections, and a natural CTA, all in their voice, streamed in under 60 seconds." },
];

const wins = [
  "Hooks that stop people scrolling past",
  "Sections structured for watch time",
  "CTAs that don't beg for subscribes",
  "[B-ROLL] notes baked in",
  "Optional titles, descriptions, tags, and chapters",
];

export default function YouTubePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="max-w-4xl mx-auto px-5 pt-20 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          YouTube scripts that keep viewers watching
        </h1>
        <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-2xl mx-auto">
          Stop writing from a blank page. Scribtly generates a full YouTube script (hook, intro, sections, CTA) in your client's voice, in under 60 seconds.
        </p>
        <Link href="/signup" className="inline-block mt-7">
          <Button size="lg">Start free · 5 scripts</Button>
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-8">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <Card key={s.n}>
              <div className="text-xs font-bold text-primary mb-2">STEP {s.n}</div>
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-5">What you get</h2>
        <ul className="space-y-2">
          {wins.map((w) => (
            <li key={w} className="flex items-start gap-2 text-sm">
              <Check size={16} className="text-success mt-0.5 shrink-0" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">Ready to write faster?</h2>
        <Link href="/signup"><Button size="lg">Start free</Button></Link>
      </section>
    </>
  );
}

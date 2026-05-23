import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";

export const metadata = {
  title: "Instagram Reels script writer for freelancers",
  description:
    "Write Instagram Reels scripts that stop the scroll. Scribtly generates hook-first Reels scripts in your client's exact voice — ready in under 60 seconds.",
  keywords: [
    "Instagram Reels script generator",
    "AI Reels script writer",
    "short-form video scripts",
    "Instagram script for freelancers",
    "Reels hook generator",
  ],
  alternates: { canonical: "/instagram-reels-scripts" },
  openGraph: {
    type: "website",
    url: "/instagram-reels-scripts",
    siteName: "Scribtly",
    title: "Instagram Reels script writer for freelancers · Scribtly",
    description:
      "Hook-first Instagram Reels scripts in your client's voice. Stop the scroll in 3 seconds or less.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Reels script writer for freelancers · Scribtly",
    description:
      "Hook-first Instagram Reels scripts in your client's voice. Stop the scroll in 3 seconds or less.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Instagram Reels Scripts", item: `${SITE_URL}/instagram-reels-scripts` },
  ],
};

const steps = [
  { n: "1", title: "Save your client", desc: "Add their niche, brand voice, and any phrases they always use. One time, then done." },
  { n: "2", title: "Give Scribtly the topic", desc: "Type the idea or talking point. Pick 15, 30, or 60 seconds." },
  { n: "3", title: "Get a scroll-stopping script", desc: "A hard-hitting hook, punchy body, and a CTA — all in their voice, in under 60 seconds." },
];

const wins = [
  "3-second hooks designed to stop the scroll",
  "Scripts paced for 15s, 30s, or 60s Reels",
  "Pattern interrupts and retention techniques built in",
  "Captions and hashtag suggestions included",
  "Sounds natural when spoken aloud",
];

const faqs = [
  {
    q: "Can I write Reels scripts for multiple clients?",
    a: "Yes. Save each client's voice separately and switch between them instantly. Scribtly keeps their tone, niche, and phrases on file so you never start from scratch.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "ChatGPT writes generic scripts. Scribtly writes in your specific client's voice, with Reels-specific pacing, hook formulas, and retention structures built in. It also remembers your client profiles across sessions.",
  },
  {
    q: "Do I need video editing skills to use this?",
    a: "No. Scribtly writes the words. What you do with the camera is up to you and your client.",
  },
];

export default function InstagramReelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="max-w-4xl mx-auto px-5 pt-20 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mb-6">
          Instagram Reels
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Reels scripts that stop the scroll
        </h1>
        <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-2xl mx-auto">
          Your client has 3 seconds. Scribtly writes hook-first Instagram Reels scripts in their exact voice — punchy, paced for the algorithm, and ready to film.
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
        <h2 className="text-2xl font-semibold tracking-tight mb-5">What every script includes</h2>
        <ul className="space-y-2">
          {wins.map((w) => (
            <li key={w} className="flex items-start gap-2 text-sm">
              <Check size={16} className="text-success mt-0.5 shrink-0" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Common questions</h2>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-sm mb-1">{faq.q}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Stop staring at a blank page
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6">
          Write your first Reels script in under 60 seconds. No credit card required.
        </p>
        <Link href="/signup">
          <Button size="lg">Start free</Button>
        </Link>
      </section>
    </>
  );
}

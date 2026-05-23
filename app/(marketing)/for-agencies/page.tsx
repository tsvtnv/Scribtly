import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Users, LayoutGrid, TrendingUp } from "lucide-react";
import { FounderNote } from "@/components/home/FounderCard";

export const metadata = {
  title: "Video script writing tool for content agencies — Scribtly",
  description:
    "Scribtly helps content agencies produce YouTube, TikTok, and Reels scripts at scale. Save every client's voice. Keep quality consistent. Start free.",
  keywords: [
    "script writing tool for agencies",
    "content agency script software",
    "AI script generator for agencies",
    "video script management tool",
    "bulk script writing",
  ],
  alternates: { canonical: "/for-agencies" },
  openGraph: {
    type: "website",
    url: "/for-agencies",
    siteName: "Scribtly",
    title: "Video script writing tool for content agencies · Scribtly",
    description:
      "Scale script production across your whole client roster. One tool, every client's voice, consistent quality.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video script writing tool for content agencies · Scribtly",
    description:
      "Scale script production across your whole client roster. One tool, every client's voice, consistent quality.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For Agencies", item: `${SITE_URL}/for-agencies` },
  ],
};

const benefits = [
  {
    icon: Users,
    title: "One voice profile per client",
    desc: "Store each client's tone, niche, audience, and brand phrases. Every writer on your team works from the same profile — quality stays consistent regardless of who writes the draft.",
  },
  {
    icon: LayoutGrid,
    title: "Scripts for every platform",
    desc: "One client, three platforms. Generate YouTube long-form, TikTok short-form, and Instagram Reels scripts all from the same voice profile — without rewriting briefs.",
  },
  {
    icon: TrendingUp,
    title: "Ship faster, take on more",
    desc: "Cut script production time by 60–70% per piece. Use the capacity to grow your roster, improve turnaround SLAs, or increase margins without adding headcount.",
  },
];

const wins = [
  "Unlimited client voice profiles",
  "YouTube, TikTok, and Instagram Reels in one tool",
  "Client review links — no email attachments",
  "PDF export for polished deliverables",
  "Script library to search and reuse past work",
  "Team access on agency plans",
];

const faqs = [
  {
    q: "How does team access work?",
    a: "Agency plans include team seats so your writers can all access the same client profiles and script library. Everyone works from the same source of truth — no more emailing voice docs or brand guidelines.",
  },
  {
    q: "Can we white-label scripts for clients?",
    a: "Scripts are yours to deliver however you like. Export to PDF, copy into your own documents, or share via review link — Scribtly doesn't put its branding on your deliverables.",
  },
  {
    q: "We work in multiple niches. Will the voice profiles hold up?",
    a: "Yes. Each profile is configured independently for niche, audience, tone, and brand phrases. A fitness coach profile produces different scripts to a B2B SaaS profile — even for the same topic.",
  },
  {
    q: "Is there a limit on how many clients we can manage?",
    a: "No client cap. Save as many profiles as you need and generate scripts for any of them at any time.",
  },
];

export default function ForAgenciesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="max-w-4xl mx-auto px-5 pt-20 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mb-6">
          Built for agencies
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Scale script production across your entire roster
        </h1>
        <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-2xl mx-auto">
          Scribtly gives content agencies one place to manage every client's voice, generate platform-specific scripts in under 60 seconds, and ship consistent quality — at any volume.
        </p>
        <div className="flex items-center justify-center gap-3 mt-7 flex-wrap">
          <Link href="/signup">
            <Button size="lg">Start free</Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">See agency pricing</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-8">
          What agencies get out of Scribtly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <Card key={b.title}>
              <b.icon size={20} className="text-primary mb-3" />
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{b.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-5">Everything included</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Agency questions, answered</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b-hair border-[var(--color-border)] pb-6 last:border-0">
              <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 pb-4">
        <FounderNote />
      </section>

      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Ready to scale your script production?
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6">
          Start free, then upgrade to an agency plan when you're ready to add your team.
        </p>
        <Link href="/signup">
          <Button size="lg">Start free</Button>
        </Link>
      </section>
    </>
  );
}

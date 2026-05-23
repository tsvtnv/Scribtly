import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Clock, DollarSign, Repeat } from "lucide-react";
import { FounderNote } from "@/components/home/FounderCard";

export const metadata = {
  title: "Script writing tool for freelancers — Scribtly",
  description:
    "Scribtly helps freelance script writers deliver faster, take on more clients, and protect their margins. Write YouTube, TikTok, and Reels scripts in any client's voice in under 60 seconds.",
  keywords: [
    "script writing tool for freelancers",
    "freelance video script writer",
    "AI script writer freelancer",
    "script writing software",
    "video script tool",
  ],
  alternates: { canonical: "/for-freelancers" },
  openGraph: {
    type: "website",
    url: "/for-freelancers",
    siteName: "Scribtly",
    title: "The script writing tool for freelancers · Scribtly",
    description:
      "Deliver scripts faster, take on more clients, and stop starting from a blank page. Built for freelance script writers.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Scribtly for freelancers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The script writing tool for freelancers · Scribtly",
    description:
      "Deliver scripts faster, take on more clients, and stop starting from a blank page. Built for freelance script writers.",
    images: ["/og-image.svg"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "For Freelancers", item: "/for-freelancers" },
  ],
};

const pains = [
  { icon: Clock, title: "Hours per script", desc: "You're spending 2–4 hours on a script that pays £50. Scribtly gets you to a solid first draft in under 60 seconds." },
  { icon: DollarSign, title: "Capped earnings", desc: "You can only write so many scripts. Scribtly lets you take on 3× the clients without working 3× the hours." },
  { icon: Repeat, title: "Starting from scratch every time", desc: "Every new client means relearning their voice. Scribtly saves their profile so every script sounds like them from day one." },
];

const wins = [
  "Save each client's voice, tone, phrases, and audience once",
  "Generate YouTube, TikTok, and Reels scripts in under 60 seconds",
  "Share scripts for client review with one link — no email attachments",
  "Export to PDF for polished delivery",
  "Manage your entire script library in one place",
  "Works for any niche — fitness, finance, food, tech, beauty, and more",
];

const faqs = [
  {
    q: "I already have a process. Why would I change it?",
    a: "You don't have to change your process — just speed it up. Use Scribtly to generate the first draft, then apply your expertise to refine it. Most freelancers cut their per-script time by 60–70% while improving consistency.",
  },
  {
    q: "Will my clients be able to tell the scripts are AI-assisted?",
    a: "Not if you use it right. Scribtly generates scripts based on your client's specific voice profile — their tone, phrases, audience, and niche. The output sounds like them, not like a generic AI template. Your job is to refine and deliver it.",
  },
  {
    q: "How many clients can I manage?",
    a: "As many as you like. Save a separate voice profile for each client and switch between them instantly.",
  },
  {
    q: "What platforms does it support?",
    a: "YouTube (3–20 minute long-form), TikTok (15–60 second short-form), and Instagram Reels (15–60 second). Each format gets scripts built for its own algorithm and pacing.",
  },
];

export default function ForFreelancersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="max-w-4xl mx-auto px-5 pt-20 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mb-6">
          Built for freelancers
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Write more scripts. Work fewer hours.
        </h1>
        <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-2xl mx-auto">
          Scribtly is the script writing tool that freelancers actually use in client work. Save each client's voice, generate professional scripts in under 60 seconds, and take on more work without burning out.
        </p>
        <Link href="/signup" className="inline-block mt-7">
          <Button size="lg">Start free · 5 scripts</Button>
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-8">
          Three problems freelancers hit. One fix.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pains.map((p) => (
            <Card key={p.title}>
              <p.icon size={20} className="text-primary mb-3" />
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted">{p.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-5">Everything you get</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Questions from freelancers</h2>
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
          Start with 5 free scripts
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6">
          No credit card. No commitment. See how fast your workflow can be.
        </p>
        <Link href="/signup">
          <Button size="lg">Try it free</Button>
        </Link>
      </section>
    </>
  );
}

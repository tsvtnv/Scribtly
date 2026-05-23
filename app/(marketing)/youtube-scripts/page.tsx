import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";

export const metadata = {
  title: "YouTube Script Writer for Freelancers",
  description:
    "Generate full YouTube scripts — hook, intro, sections, and CTA — in your client's exact voice. Stop starting from a blank page. Try ScriptFast free.",
  alternates: {
    canonical: "/youtube-scripts",
  },
  openGraph: {
    title: "YouTube Script Writer for Freelancers — ScriptFast",
    description:
      "Generate full YouTube scripts — hook, intro, sections, and CTA — in your client's exact voice. Try ScriptFast free.",
    url: "/youtube-scripts",
  },
};

const steps = [
  { n: "1", title: "Add your client", desc: "Save their niche, audience, tone, and phrases once. That's it." },
  { n: "2", title: "Describe the topic", desc: "Paste the idea, pick a length (3-5, 8-10, or 15-20 minutes), and go." },
  { n: "3", title: "Get a full script", desc: "Hook, intro, three sections, and a natural CTA — all in their voice, streamed in under 60 seconds." },
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
      <section className="max-w-4xl mx-auto px-5 pt-20 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          YouTube scripts that keep viewers watching
        </h1>
        <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-2xl mx-auto">
          Stop writing from a blank page. ScriptFast generates a full YouTube script — hook, intro, sections, CTA — in your client's voice, in under 60 seconds.
        </p>
        <Link href="/signup" className="inline-block mt-7">
          <Button size="lg">Start free — 3 scripts</Button>
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
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/signup"><Button size="lg">Start free</Button></Link>
          <Link href="/pricing"><Button size="lg" variant="ghost">See pricing</Button></Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 pb-16 text-center">
        <p className="text-sm text-text-secondary dark:text-dark-muted">
          Also need short-form content?{" "}
          <Link href="/tiktok-scripts" className="text-primary hover:underline">
            See our TikTok script writer →
          </Link>
        </p>
      </section>
    </>
  );
}

import Link from "next/link";
import { Sparkles, FileText, Library, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Scribtly — AI video scripts for freelancers in your client's voice",
  description:
    "Generate YouTube, TikTok, and Reels scripts for your clients in under 60 seconds. Save each client's voice once, generate forever.",
};

const features = [
  { icon: Sparkles, title: "Save client profiles once", desc: "Name, niche, tone, audience — stored forever. Every script auto-written in their voice." },
  { icon: FileText, title: "Platform-specific structure", desc: "YouTube hooks are different to TikTok. Scribtly knows. You don't have to explain it." },
  { icon: Library, title: "Script library per client", desc: "All scripts organised by client. Find, reuse, export any script in seconds." },
  { icon: Download, title: "One-click export", desc: "Download as PDF or copy to clipboard. Ready to send to your client instantly." },
];

const painPoints = [
  "2-3 hours to write one decent YouTube script",
  "Constantly re-explaining your client's tone to ChatGPT",
  "No organised system — scripts lost in docs and chat threads",
  "Clients asking for revisions on things you got wrong",
];

export default function HomePage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-5 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          Write video scripts 10× faster —
          <br />
          <span className="text-primary">in your client's exact voice</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary dark:text-dark-muted mt-6 max-w-2xl mx-auto">
          Scribtly generates YouTube, TikTok and Reels scripts for your clients in under 60 seconds. Save their brand voice once. Generate forever.
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
          Scribtly remembers your clients so you don't have to
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

      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Start free. Upgrade when you're ready.
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-6">
          5 free scripts. No credit card. Upgrade anytime.
        </p>
        <Link href="/signup">
          <Button size="lg">Start generating free</Button>
        </Link>
      </section>
    </>
  );
}

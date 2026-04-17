import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";

export const metadata = {
  title: "TikTok script writer for freelancers — ScriptFast",
  description:
    "Write TikTok scripts that hook viewers in the first second. ScriptFast generates short-form scripts in your client's exact voice — 15, 30, or 60 seconds.",
};

const steps = [
  { n: "1", title: "Save the client", desc: "Tone, niche, audience — once. Every script you generate sounds like them." },
  { n: "2", title: "Drop the topic", desc: "Paste the idea. Pick 15, 30, or 60 seconds." },
  { n: "3", title: "Ship the script", desc: "Hook, body, payoff, optional loop hook — streamed in seconds." },
];

const wins = [
  "Hooks designed to stop the scroll",
  "Short punchy sentences built for spoken delivery",
  "[ACTION: …] visual cues baked in",
  "Optional caption, hashtags, and hook variations",
  "Loop hooks that make people rewatch",
];

export default function TikTokPage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-5 pt-20 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          TikTok scripts that hook viewers in the first second
        </h1>
        <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-2xl mx-auto">
          Short-form TikTok scripts — hook, body, payoff — written in your client's voice. No padding, no filler, no "Hey guys".
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
        <Link href="/signup"><Button size="lg">Start free</Button></Link>
      </section>
    </>
  );
}

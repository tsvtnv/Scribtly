import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  ArrowRight,
  Sparkles,
  FileText,
  Target,
  Award,
  Users,
  MessageSquare,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "LinkedIn video script generator for freelancers",
  description:
    "Write LinkedIn video scripts that build authority and drive engagement. Scribtly generates professional video scripts in your client's voice — hooks, insights, and CTAs built for the LinkedIn feed.",
  keywords: [
    "LinkedIn video script generator",
    "AI LinkedIn video writer",
    "professional video script",
    "LinkedIn content script",
    "thought leadership script",
  ],
  alternates: { canonical: "/linkedin-video-scripts" },
  openGraph: {
    type: "website",
    url: "/linkedin-video-scripts",
    siteName: "Scribtly",
    title: "LinkedIn video script generator for freelancers · Scribtly",
    description:
      "Professional video scripts in your client's voice — hooks, insights, and CTAs built for the LinkedIn feed.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly LinkedIn video script generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn video script generator for freelancers · Scribtly",
    description:
      "Professional video scripts in your client's voice — hooks, insights, and CTAs built for the LinkedIn feed.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "LinkedIn Video Scripts", item: `${SITE_URL}/linkedin-video-scripts` },
  ],
};

const stats = [
  { value: "< 60s", label: "per script" },
  { value: "60–180s", label: "lengths" },
  { value: "Authority-first", label: "structure" },
];

const steps = [
  {
    n: "1",
    title: "Save the professional profile",
    desc: "Store the client's role, expertise, target audience, and tone once. Every video script starts from that profile — no re-briefing.",
  },
  {
    n: "2",
    title: "Pick topic + length",
    desc: "Choose 60, 90, or 180 seconds. Drop in the insight or talking point and hit generate.",
  },
  {
    n: "3",
    title: "Get an insight-led script",
    desc: "Authority-building hook, structured insight, and a LinkedIn-native CTA — all in your client's professional voice, streamed in under 60 seconds.",
  },
];

const features = [
  {
    icon: Target,
    title: "Authority-building hooks",
    desc: "Openers that stop the scroll in a professional feed — not clickbait, but genuine pattern interrupts that signal expertise.",
  },
  {
    icon: FileText,
    title: "Insight-led structure",
    desc: "Hook → insight → takeaway → CTA. Built to hold attention and build credibility across the full video.",
  },
  {
    icon: Award,
    title: "Professional but human tone",
    desc: "Scribtly finds the balance between authoritative and approachable — so the client sounds like an expert, not a corporate press release.",
  },
  {
    icon: Clock,
    title: "Optimal length (60–3 min)",
    desc: "Scripts are timed for LinkedIn's sweet spot. Long enough to deliver real value, short enough to hold attention in a professional feed.",
  },
  {
    icon: MessageSquare,
    title: "LinkedIn-native CTA",
    desc: "Endings that drive the right action — comments, follows, DMs, or link clicks — matched to the video's objective.",
  },
  {
    icon: Users,
    title: "Client voice locked in",
    desc: "Saved profiles mean every video sounds like the thought leader, not a generic professional script.",
  },
];

const befores = [
  "Struggling to sound authoritative without being boring",
  "Generic corporate tone that doesn't reflect the client's expertise",
  "No clear CTA at the end of every video",
  "Scripts that run too long or cut the insight too short",
  "Re-briefing the AI on the client's role and audience every session",
];

const afters = [
  "Hooks that stop the scroll in a professional LinkedIn feed",
  "Insight-led structure that builds trust and demonstrates expertise",
  "Confident but human tone that sounds like the thought leader",
  "Scripts timed to LinkedIn's sweet spot — every time",
  "Profile-saved voice — no re-briefing, ever",
];

const faqs = [
  {
    q: "What's the right length for LinkedIn videos?",
    a: "LinkedIn videos between 60 and 180 seconds consistently outperform longer content in terms of completion rate and engagement. Scribtly generates scripts at these lengths — structured to deliver a full insight within the watch window.",
  },
  {
    q: "Can it write for thought leaders?",
    a: "Yes. You save the client's expertise area, role, target audience, and tone as a profile. Scribtly uses that context to write insight-led scripts that position them as an authority in their field — not as a generic business account.",
  },
  {
    q: "How does it handle professional tone?",
    a: "The professional tone setting in Scribtly generates scripts that are confident and credible without sounding stiff or corporate. The client profile includes a tone slider so you can dial in from conversational expert to formal thought leader.",
  },
  {
    q: "Does it include CTAs?",
    a: "Yes. Every LinkedIn script ends with a LinkedIn-native CTA — tailored to the video's goal. That might be asking viewers to comment their take, follow for more insights, visit a link, or send a DM.",
  },
  {
    q: "Does it work for personal brands and company pages?",
    a: "Yes. Scribtly works for both. Set up the client profile as a personal thought leader or a brand voice — the script adapts to the right persona and CTA for either context.",
  },
];

export default function LinkedInVideoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,119,181,0.12),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-[#0077B5]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#0077B5]/08 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs backdrop-blur" style={{ color: "#0077B5" }}>
            <Sparkles size={11} />
            LinkedIn Video Scripts
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            LinkedIn video scripts that<br className="hidden md:block" /> build authority
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Stop writing from a blank page. Scribtly generates a complete LinkedIn video script — authority-building hook, insight-led structure, and LinkedIn-native CTA — in your client's professional voice, in under 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" style={{ boxShadow: "0 12px 35px rgba(0,119,181,0.25)" }}>
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
                <span className="font-semibold" style={{ color: "#0077B5" }}>{s.value}</span>
                <span className="text-text-secondary dark:text-dark-muted">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 mx-auto max-w-3xl px-2">
            <Image
              src="/hero-youtube.png"
              alt="Scribtly LinkedIn video script generator interface"
              width={1200}
              height={630}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] border border-[var(--color-border)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          From brief to finished script in 3 steps
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-12 max-w-xl mx-auto">
          No prompt engineering. No copy-pasting tone guides. No rework.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-7 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-[#0077B5]/30 via-[#0077B5]/50 to-[#0077B5]/30" />
          {steps.map((s) => (
            <div key={s.n} className="text-center group">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 font-bold text-lg mb-4 transition-all duration-200 mx-auto" style={{ borderColor: "rgba(0,119,181,0.3)", backgroundColor: "rgba(0,119,181,0.06)", color: "#0077B5" }}>
                {s.n}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/signup">
            <Button size="lg" style={{ boxShadow: "0 12px 35px rgba(0,119,181,0.2)" }}>
              Try it free — no card required
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            What every LinkedIn script includes
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Authority-building structure, your client's voice, and everything they need to build their professional presence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
                style={{ "--hover-border": "rgba(0,119,181,0.4)" } as React.CSSProperties}
              >
                <f.icon size={20} className="mb-3 group-hover:scale-110 transition-transform duration-200" style={{ color: "#0077B5" }} />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
          <div className="rounded-xl border-hair p-6" style={{ borderColor: "rgba(0,119,181,0.3)", backgroundColor: "rgba(0,119,181,0.05)" }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: "#0077B5" }}>
              With Scribtly
            </div>
            <ul className="space-y-3">
              {afters.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm">
                  <Check size={14} className="shrink-0 mt-0.5" style={{ color: "#0077B5" }} />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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

      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0077B5 0%, #005885 60%, #004066 100%)" }} />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Start building your client's LinkedIn authority today.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. See how fast your workflow can be.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]" style={{ color: "#0077B5" }}>
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

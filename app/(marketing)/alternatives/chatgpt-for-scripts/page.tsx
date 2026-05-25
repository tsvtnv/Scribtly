import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  FileText,
  Shield,
  Repeat,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Scribtly vs ChatGPT for video scripts — the smarter alternative",
  description:
    "ChatGPT writes generic scripts. Scribtly writes scripts in your client's exact voice. See why freelancers and agencies use Scribtly instead of ChatGPT for video script writing.",
  keywords: [
    "chatgpt video script alternative",
    "scribtly vs chatgpt",
    "chatgpt alternative for scripts",
    "AI script writer vs chatgpt",
    "better than chatgpt for scripts",
  ],
  alternates: { canonical: "/alternatives/chatgpt-for-scripts" },
  openGraph: {
    type: "website",
    url: "/alternatives/chatgpt-for-scripts",
    siteName: "Scribtly",
    title: "Scribtly vs ChatGPT for video scripts — the smarter alternative",
    description:
      "ChatGPT writes generic scripts. Scribtly writes scripts in your client's exact voice. See why freelancers and agencies use Scribtly instead of ChatGPT for video script writing.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Scribtly vs ChatGPT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribtly vs ChatGPT for video scripts — the smarter alternative",
    description:
      "ChatGPT writes generic scripts. Scribtly writes scripts in your client's exact voice. See why freelancers and agencies use Scribtly instead of ChatGPT for video script writing.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Alternatives", item: `${SITE_URL}/alternatives` },
    { "@type": "ListItem", position: 3, name: "Scribtly vs ChatGPT", item: `${SITE_URL}/alternatives/chatgpt-for-scripts` },
  ],
};

const stats = [
  { value: "No re-prompting", label: "needed" },
  { value: "Client voice", label: "saved forever" },
  { value: "Purpose-built", label: "for scripts" },
];

const pains = [
  {
    icon: Repeat,
    title: "You re-brief every single session",
    desc: "ChatGPT has no memory. Every script starts with copy-pasting tone guides, past scripts, and brand descriptions. Scribtly saves the client profile once.",
  },
  {
    icon: MessageSquare,
    title: "Output sounds generic and AI-written",
    desc: "ChatGPT writes from a general model. It doesn't know your client's specific phrases, niche quirks, or audience. Scribtly writes from a stored voice profile.",
  },
  {
    icon: FileText,
    title: "No script structure built in",
    desc: "ChatGPT needs precise prompting to get a properly structured YouTube or TikTok script. Scribtly has platform-native structure baked in.",
  },
];

const comparisonRows = [
  { feature: "Saved client voice", competitor: "✕ Re-prompt every time", scribtly: "✓ Stored profile" },
  { feature: "Platform-native structure", competitor: "✕ Manual prompting", scribtly: "✓ YouTube/TikTok/Reels built in" },
  { feature: "Script lengths", competitor: "✕ Inconsistent", scribtly: "✓ Structured lengths" },
  { feature: "Client management", competitor: "✕ None", scribtly: "✓ Multiple profiles" },
  { feature: "Output consistency", competitor: "✕ Varies per session", scribtly: "✓ Consistent from profile" },
  { feature: "Built for freelancers", competitor: "✕ General tool", scribtly: "✓ Purpose-built" },
];

const features = [
  {
    icon: Users,
    title: "Saved voice profiles",
    desc: "Fill in a client profile once — niche, tone, audience, key phrases. Every script pulls from that context automatically.",
  },
  {
    icon: Zap,
    title: "Platform-native scripts",
    desc: "YouTube, TikTok, and Reels each get their own structure, pacing, and format. No prompting required.",
  },
  {
    icon: Shield,
    title: "Consistent output",
    desc: "Because scripts are generated from a saved profile, they sound like your client every single time — not like a different AI session.",
  },
  {
    icon: FileText,
    title: "Built for client work",
    desc: "Manage multiple client profiles, share scripts for review, export to PDF. Everything a freelancer or agency actually needs.",
  },
];

const faqs = [
  {
    q: "Can't I just use a ChatGPT prompt template?",
    a: "You can, but you'll paste it every session. Scribtly stores the entire client context and applies it automatically.",
  },
  {
    q: "Is Scribtly more expensive than ChatGPT?",
    a: "Scribtly starts free. And unlike ChatGPT Plus, every feature is built specifically for script writing — not general text generation.",
  },
  {
    q: "How does Scribtly learn a client's voice?",
    a: "You fill in a profile: niche, tone, audience, phrases they always use. Every script is generated from that saved context.",
  },
  {
    q: "What platforms does Scribtly support?",
    a: "YouTube (3–20 min), TikTok (15–60s), and Instagram Reels (15–60s). Each gets platform-native structure.",
  },
  {
    q: "Can I still use ChatGPT alongside Scribtly?",
    a: "Yes — many freelancers use Scribtly for first drafts and ChatGPT for research or edits. They serve different purposes.",
  },
];

export default function ChatGPTAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%),linear-gradient(315deg,rgba(56,193,114,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Scribtly vs ChatGPT
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            ChatGPT writes generic scripts.<br className="hidden md:block" /> Scribtly writes your client's.
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            ChatGPT is a general-purpose AI. Scribtly is purpose-built for video scripts — with saved client voices, platform-native structure, and professional output that sounds like your client, not a robot.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
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
                <span className="font-semibold text-primary">{s.value}</span>
                <span className="text-text-secondary dark:text-dark-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-b-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            The problem with ChatGPT for script writing
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            ChatGPT is a powerful tool — but it wasn't built for client-facing script work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pains.map((p) => (
              <Card
                key={p.title}
                className="group hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <p.icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          Scribtly vs ChatGPT
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Side-by-side, feature by feature.
        </p>
        <div className="rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 px-5 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-text-secondary dark:text-dark-muted">ChatGPT</th>
                  <th className="text-center py-3 px-5 font-semibold text-primary">Scribtly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="py-3 px-5">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-text-secondary dark:text-dark-muted">{row.competitor}</td>
                    <td className="py-3 px-5 text-center text-primary font-medium">{row.scribtly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
            Why Scribtly wins for video scripts
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
            Purpose-built tools beat general-purpose AI when the job is specific.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group flex items-start gap-4 hover:border-primary/40 transition-all duration-200"
              >
                <f.icon size={18} className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-muted">{f.desc}</p>
                </div>
              </Card>
            ))}
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            See the difference for yourself. Start free.
          </h2>
          <p className="text-white/75 mb-8">
            5 free scripts. No credit card. No re-prompting.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
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

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Target, MessageSquare, Calendar, Users, Zap, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "LinkedIn Outreach Automation Software | Scribtly",
  description:
    "Stop chasing leads manually. Scribtly automates LinkedIn outreach with ICP scoring, personalised messages, and Auto Book that fills your calendar.",
  openGraph: {
    title: "LinkedIn Outreach Automation Software | Scribtly",
    description:
      "Stop chasing leads manually. Scribtly automates LinkedIn outreach with ICP scoring, personalised messages, and Auto Book that fills your calendar.",
    url: "https://scribtly.com/linkedin-outreach-automation",
    siteName: "Scribtly",
    type: "website",
  },
  alternates: {
    canonical: "https://scribtly.com/linkedin-outreach-automation",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Scribtly",
      applicationCategory: "BusinessApplication",
      description:
        "LinkedIn outreach automation software that scores leads against your ICP, sends personalised connection requests and follow-ups, and books meetings automatically.",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
      url: "https://scribtly.com",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is LinkedIn outreach automation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LinkedIn outreach automation is the process of using software to send connection requests, follow-up messages, and personalised outreach on LinkedIn without doing it manually. Tools like Scribtly handle the cadence, timing, and personalisation so your team can focus on conversations that are already warm.",
          },
        },
        {
          "@type": "Question",
          name: "Is LinkedIn outreach automation safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly uses built-in sending limits and human-like timing intervals to keep your LinkedIn account within platform guidelines. No browser extensions are required — the connection is managed through a secure, controlled environment.",
          },
        },
        {
          "@type": "Question",
          name: "How personalised are the automated messages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly pulls real data from each prospect's LinkedIn profile — including their current role, company size, location, and recent activity — to personalise every message. Recipients feel spoken to rather than bulk-messaged.",
          },
        },
        {
          "@type": "Question",
          name: "Can I run outreach across multiple LinkedIn accounts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Scribtly supports multi-account management from a single dashboard. Each account operates within its own safe limits independently, making it well-suited for agencies and sales teams managing several LinkedIn profiles.",
          },
        },
        {
          "@type": "Question",
          name: "How does Auto Book work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Auto Book monitors your inbox for replies that show buying intent. When it detects interest, it automatically sends your calendar link at the right moment — so prospects can book a meeting without any manual intervention from you.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://scribtly.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "LinkedIn Outreach Automation",
          item: "https://scribtly.com/linkedin-outreach-automation",
        },
      ],
    },
  ],
};

const features = [
  {
    icon: Target,
    title: "ICP-Driven Lead Scoring",
    body: "Describe your ideal customer in plain English. Scribtly finds matching LinkedIn profiles and scores each one against your ICP before any outreach begins.",
  },
  {
    icon: MessageSquare,
    title: "Hyper-Personalised Messages",
    body: "Every connection request and follow-up draws from live LinkedIn data: current role, company size, location, and recent activity. No merge-tag templates.",
  },
  {
    icon: Calendar,
    title: "Auto Book",
    body: "Scribtly detects buying signals in replies and sends your calendar link automatically — so meetings land in your diary without a single manual follow-up.",
  },
  {
    icon: Zap,
    title: "Fully Automated Sequences",
    body: "Set your connection request, acceptance message, and follow-ups once. Scribtly sends them at human-like intervals, within platform safety limits.",
  },
  {
    icon: TrendingUp,
    title: "Live Campaign Analytics",
    body: "Track connection rates, reply rates, and meetings booked across every campaign in real time. Know what's working and double down on it.",
  },
  {
    icon: Users,
    title: "Multi-Account Management",
    body: "Run outreach across multiple LinkedIn accounts from one dashboard. Each account operates within its own safe limits — ideal for agencies and growing sales teams.",
  },
];

const audiences = [
  { label: "B2B sales teams", detail: "Replace manual prospecting with a pipeline that runs itself." },
  { label: "Founders", detail: "Book your first ten enterprise calls without hiring an SDR." },
  { label: "Agencies", detail: "Manage outreach across several client LinkedIn accounts in one place." },
  { label: "SDR teams", detail: "Let automation handle volume so your reps focus purely on closing." },
  { label: "Consultants", detail: "Maintain a steady pipeline of discovery calls without interrupting client work." },
  { label: "Recruiters", detail: "Reach passive candidates at scale with messages that feel personal." },
];

const mistakes = [
  {
    heading: "Sending generic connection requests",
    body: "A request with no personalisation reads as spam. Scribtly pulls real profile data so every message feels relevant from the first line.",
  },
  {
    heading: "Following up too quickly — or not at all",
    body: "Timing matters. Scribtly spaces follow-ups at human-like intervals rather than hammering prospects in the same hour.",
  },
  {
    heading: "Using browser extensions",
    body: "Browser-based automation tools leave fingerprints LinkedIn can detect. Scribtly runs through a managed connection with no extension required.",
  },
  {
    heading: "Ignoring the inbox",
    body: "The fastest way to lose a warm lead is to miss their reply. Scribtly's unified inbox keeps every conversation in one place and Auto Book catches interest before it cools.",
  },
];

export default function LinkedInOutreachAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>

        {/* Nav */}
        <nav
          className="sticky top-0 z-50 border-b"
          style={{
            borderColor: "var(--border)",
            background: "rgba(253,250,246,0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/">
              <Image src="/images/logo-horizontal.png" alt="Scribtly" width={120} height={30} className="h-8 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: "Features", href: "/#features" },
                { label: "How it works", href: "/#how-it-works" },
                { label: "Results", href: "/#results" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium transition-opacity hover:opacity-60"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              href="/login"
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              Sign in
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
            style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            LinkedIn outreach, automated
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            LinkedIn Outreach Automation
            <br />
            <span style={{ color: "var(--accent)" }}>That Books Real Meetings</span>
          </h1>

          <p className="text-lg leading-relaxed mb-10 mx-auto" style={{ color: "var(--text-muted)", maxWidth: "600px" }}>
            Scribtly finds the right prospects, sends personalised messages on your behalf, and automatically
            books meetings when a lead shows interest — all without you touching LinkedIn manually.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Book a call to get access
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="flex flex-wrap gap-5 justify-center">
            {[
              "No LinkedIn extension needed",
              "Safe sending limits built in",
              "Setup in under 2 minutes",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <CheckCircle size={15} style={{ color: "var(--accent)" }} />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* What is LinkedIn outreach automation */}
        <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              What is LinkedIn outreach automation?
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              LinkedIn outreach automation is the use of software to handle the repetitive parts of B2B prospecting on
              LinkedIn: finding leads, sending connection requests, following up, and moving warm conversations toward a
              booked meeting.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Done manually, this process eats hours every week. Done badly — with generic bulk messages or browser
              extensions — it damages your account and your reputation. Done well, with a purpose-built tool like
              Scribtly, it creates a consistent pipeline of qualified conversations with almost no ongoing effort.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The key difference between good automation and spam is personalisation and intent. Scribtly scores every
              prospect against your ideal customer profile before a single message is sent, and each message pulls from
              real LinkedIn profile data — so the outreach feels genuine, because the targeting is.
            </p>
          </div>
        </section>

        {/* Why manual outreach doesn't scale */}
        <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Why manual LinkedIn outreach doesn&apos;t scale
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Manual LinkedIn prospecting has a ceiling. A good SDR, working hard, might send 30 to 50 personalised
              connection requests per day before the work becomes too repetitive to do well. At that volume, they still
              have to write follow-ups, monitor replies, and book meetings — leaving little time for the conversations
              that actually move pipeline.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { problem: "Copy-pasting the same message to hundreds of prospects", result: "Low reply rates and damaged sender reputation" },
                { problem: "Forgetting to follow up after a connection accepts", result: "Warm leads go cold before you can close them" },
                { problem: "Checking multiple LinkedIn accounts manually", result: "Missed replies and inconsistent cadence" },
                { problem: "Spending hours prospecting instead of selling", result: "Your highest-value time goes to low-value tasks" },
              ].map((row) => (
                <div
                  key={row.problem}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{row.problem}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{row.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soft CTA */}
        <section className="px-6 py-10 border-t border-b" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
              See how Scribtly handles all of this for you.
            </p>
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 shrink-0"
              style={{ background: "var(--accent)" }}
            >
              Book a 30-minute demo
              <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                How Scribtly works
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Everything your LinkedIn outreach needs. Nothing it doesn&apos;t.
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
                Scribtly handles the full cycle — from finding the right prospects to booking the meeting — so your team
                can focus on closing.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border p-6 flex flex-col gap-3"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(224,120,48,0.12)" }}
                  >
                    <f.icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works step by step */}
        <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                Step by step
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                How to automate your LinkedIn outreach with Scribtly
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  num: "01",
                  title: "Connect your LinkedIn account",
                  body: "Link your LinkedIn profile securely in under two minutes. No browser extensions required — Scribtly manages the connection through a safe, controlled environment.",
                },
                {
                  num: "02",
                  title: "Define your ideal customer",
                  body: "Tell Scribtly who you want to reach: job title, industry, company size, seniority, and location. Every lead is scored against your ICP before any message is sent.",
                },
                {
                  num: "03",
                  title: "Set your outreach sequence",
                  body: "Write your connection request, first message, and follow-ups once. Scribtly sends them at human-like intervals, keeping your account safely within LinkedIn's sending guidelines.",
                },
                {
                  num: "04",
                  title: "Let Auto Book fill your calendar",
                  body: "When a prospect shows buying intent, Auto Book detects the signal and sends your calendar link automatically. Meetings land in your diary without any manual action.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border p-8"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
                >
                  <div className="text-5xl font-bold mb-5 leading-none" style={{ color: "rgba(224,120,48,0.20)" }}>
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="px-6 py-20" style={{ background: "var(--dark)" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-5 text-white leading-tight">
              Your next 10 sales meetings are already on LinkedIn.
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Scribtly finds them, messages them, and books the call — while you focus on the conversations that matter.
            </p>
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Book a call to get access
              <ArrowRight size={16} />
            </a>
            <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Invite only. No commitment. No credit card.
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                Who it&apos;s for
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                LinkedIn automation built for people who sell
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {audiences.map((a) => (
                <div
                  key={a.label}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>{a.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{a.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
              Common LinkedIn outreach mistakes — and how to avoid them
            </h2>
            <div className="flex flex-col gap-6">
              {mistakes.map((m) => (
                <div key={m.heading} className="flex gap-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(224,120,48,0.12)" }}
                  >
                    <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>✕</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>{m.heading}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-8">
              {[
                {
                  q: "What is LinkedIn outreach automation?",
                  a: "LinkedIn outreach automation uses software to handle the repetitive parts of B2B prospecting — finding prospects, sending connection requests, following up, and booking meetings — without doing it manually. The best tools personalise every message using real profile data, so the outreach feels genuine rather than automated.",
                },
                {
                  q: "Is LinkedIn outreach automation safe?",
                  a: "It depends on how the tool works. Scribtly uses built-in daily sending limits and human-like timing intervals to stay within LinkedIn's platform guidelines. It also requires no browser extension, which removes one of the most common causes of account flags.",
                },
                {
                  q: "How personalised are the messages Scribtly sends?",
                  a: "Every message pulls from live LinkedIn profile data — the prospect's current role, company, location, seniority, and recent activity. There are no generic merge tags. The result is outreach that reads as if it was written individually, at scale.",
                },
                {
                  q: "Can Scribtly manage multiple LinkedIn accounts?",
                  a: "Yes. Scribtly's multi-account dashboard lets you run outreach across several LinkedIn profiles simultaneously. Each account has its own safe limits, making it suitable for agencies managing multiple clients or enterprise sales teams with many SDRs.",
                },
                {
                  q: "What is Auto Book and how does it work?",
                  a: "Auto Book is Scribtly's meeting-booking feature. It monitors your inbox for replies that signal buying intent, then automatically sends your calendar link at the right moment — so a warm lead can book directly without you needing to be online.",
                },
              ].map((item) => (
                <div key={item.q} className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                  <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>{item.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-28 border-t" style={{ borderColor: "var(--border)", background: "var(--dark)" }}>
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
              style={{ borderColor: "rgba(224,120,48,0.4)", color: "var(--accent)", background: "rgba(224,120,48,0.08)" }}
            >
              <Calendar size={12} />
              Limited spots available
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">
              Ready to automate your LinkedIn outreach?
            </h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Scribtly is invite only. Book a 30-minute call with our team to see the platform live and find out if it
              is the right fit for your pipeline.
            </p>
            <a
              href="https://book.octelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Book your call now
              <ArrowRight size={16} />
            </a>
            <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              No commitment. No credit card. Just a conversation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
              <Link href="/#features" className="hover:opacity-60 transition-opacity">Features</Link>
              <Link href="/#how-it-works" className="hover:opacity-60 transition-opacity">How it works</Link>
              <Link href="/#results" className="hover:opacity-60 transition-opacity">Results</Link>
              <Link href="/login" className="hover:opacity-60 transition-opacity">Sign in</Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
          <div
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Link href="/">
              <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
            </Link>
            <span>© 2026 Scribtly. All rights reserved.</span>
            <span>
              Powered by{" "}
              <a
                href="https://octelis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                octelis.com
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

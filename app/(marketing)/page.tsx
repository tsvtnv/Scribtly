import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, MessageSquare, Inbox, CheckCircle, Calendar, Users, TrendingUp, Zap, Star } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "ICP-Driven Lead Scoring",
    body: "Describe your ideal customer in plain English. Our engine finds matching LinkedIn profiles and ranks each lead against your ICP before a single message is sent.",
    detail: "No more spray-and-pray. Every prospect has a reason to hear from you.",
  },
  {
    icon: MessageSquare,
    title: "Hyper-Personalised Outreach",
    body: "Every connection request and follow-up pulls from real LinkedIn data: their current role, company size, location and recent activity.",
    detail: "Recipients feel spoken to, not marketed at. That is why our clients see 3x the industry average reply rate.",
  },
  {
    icon: Inbox,
    title: "Unified Inbox That Converts",
    body: "Every reply lands in one place. Auto Book detects buying signals and automatically sends your calendar link at the perfect moment.",
    detail: "Stop switching tabs. One inbox, all your conversations, and a tool that books meetings while you sleep.",
  },
  {
    icon: Zap,
    title: "Fully Automated Sequences",
    body: "Set a cadence once and let it run. Connection request, acceptance message, follow-up 1, follow-up 2 — all on autopilot with smart timing.",
    detail: "Built-in safety limits keep your LinkedIn account healthy and your sending within platform guidelines.",
  },
  {
    icon: TrendingUp,
    title: "Live Campaign Analytics",
    body: "Track connection rates, reply rates, and meetings booked across every campaign. Identify what is working and double down on it.",
    detail: "Real-time dashboards so you always know your pipeline health.",
  },
  {
    icon: Users,
    title: "Multi-Account Support",
    body: "Run outreach across multiple LinkedIn accounts from a single dashboard. Perfect for agencies and growing sales teams.",
    detail: "Each account stays within safe limits independently while you manage everything centrally.",
  },
];

const steps = [
  {
    num: "01",
    title: "Connect your LinkedIn account",
    body: "Securely link your LinkedIn profile in under two minutes. No browser extensions needed — Scribtly handles everything through a safe, managed connection.",
  },
  {
    num: "02",
    title: "Define your ideal customer",
    body: "Tell us who you want to reach: their job title, industry, company size, location. We score every lead against your criteria before any outreach begins.",
  },
  {
    num: "03",
    title: "Launch your campaign",
    body: "Set your connection request, first message and follow-ups once. Scribtly sends them at human-like intervals and handles replies through your unified inbox.",
  },
  {
    num: "04",
    title: "Wake up to booked meetings",
    body: "Auto Book detects interest in replies and sends your calendar link automatically. Your first meeting of the day might already be confirmed before you open your laptop.",
  },
];

const testimonials = [
  {
    quote: "We went from 2 outbound meetings a week to over 12 in the first month. The personalisation is unlike anything we have tried before.",
    name: "James K.",
    role: "Head of Sales, B2B SaaS",
    initials: "JK",
  },
  {
    quote: "Our SDR team now covers 4x the accounts they used to. Scribtly does the volume work and they focus on closing.",
    name: "Sarah M.",
    role: "VP Sales, Series A Startup",
    initials: "SM",
  },
  {
    quote: "The reply rate we get is genuinely impressive. Prospects actually comment on how relevant the messages feel.",
    name: "Raj P.",
    role: "Founder, Agency",
    initials: "RP",
  },
];

const stats = [
  { value: "18%", label: "Average reply rate" },
  { value: "3x", label: "Industry reply rate" },
  { value: "500+", label: "Meetings booked" },
  { value: "< 2 min", label: "Setup time" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>

      {/* Sticky Nav */}
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
          <Image src="/images/logo-horizontal.png" alt="Scribtly" width={120} height={30} className="h-8 w-auto" />
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Results", href: "#results" },
              { label: "Get access", href: "#get-access" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </a>
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
      <section className="px-6 pt-20 pb-0 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
              style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              Invite only
            </div>

            <h1
              className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Stop chasing leads.
              <br />
              Start{" "}
              <span style={{ color: "var(--accent)" }}>booking calls.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)", maxWidth: "480px" }}>
              Scribtly automates your entire LinkedIn outreach from finding the right prospects to
              sending personalised messages and booking meetings directly into your calendar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
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

            <div className="flex flex-wrap gap-5">
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
          </div>

          {/* Right image */}
          <div className="relative lg:h-[480px] rounded-2xl overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Professional using Scribtly to automate LinkedIn outreach"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 py-6 mt-16 border-y" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold" style={{ color: "var(--accent)" }}>{s.value}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Preview */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              The platform
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Your outreach pipeline, always in view
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              One dashboard to track every connection, reply, and meeting booked across all your campaigns.
            </p>
          </div>

          {/* Browser chrome frame */}
          <div
            className="rounded-2xl overflow-hidden border shadow-2xl"
            style={{ borderColor: "var(--border)", boxShadow: "0 32px 80px rgba(26,18,8,0.15)" }}
          >
            {/* macOS-style bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "#F0EAE2", borderBottom: `1px solid var(--border)` }}
            >
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <div
                className="ml-4 flex-1 max-w-xs mx-auto h-6 rounded-md flex items-center px-3 text-xs"
                style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}
              >
                app.scribtly.com/dashboard
              </div>
            </div>
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/images/dashboard2.jpg"
                alt="Scribtly analytics dashboard showing campaign performance"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              What you get
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Everything your outreach needs. Nothing it does not.
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Built specifically for B2B teams who want pipeline without the manual grind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border p-7 flex flex-col gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(224,120,48,0.12)" }}
                >
                  <f.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                    {f.body}
                  </p>
                  <p className="text-xs leading-relaxed font-medium" style={{ color: "var(--text-primary)", opacity: 0.6 }}>
                    {f.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inbox Feature Spotlight */}
      <section className="px-6 py-24 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
                Unified inbox
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
                Every reply in one place. Meetings booked automatically.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                When a prospect shows interest, Auto Book detects the buying signal and sends your calendar link at exactly the right moment. No more manual follow-ups, no more missed replies.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Auto-detect buying signals in replies",
                  "Send calendar links at the perfect moment",
                  "All conversations across all accounts in one view",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl overflow-hidden border shadow-xl"
              style={{ borderColor: "var(--border)", boxShadow: "0 24px 60px rgba(26,18,8,0.12)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "#F0EAE2", borderBottom: `1px solid var(--border)` }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div
                  className="ml-3 flex-1 max-w-xs mx-auto h-5 rounded-md flex items-center px-3 text-xs"
                  style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}
                >
                  app.scribtly.com/inbox
                </div>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image
                  src="/images/inbox.jpg"
                  alt="Scribtly unified inbox showing LinkedIn conversations and auto-book feature"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-24 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              From zero to booked meetings in four steps
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              No long onboarding. No sales engineer. You can have your first campaign live today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border p-8"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="text-5xl font-bold mb-5 leading-none"
                  style={{ color: "rgba(224,120,48,0.20)" }}
                >
                  {step.num}
                </div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof banner */}
      <section className="px-6 py-12 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            Trusted by sales teams and agencies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {["B2B SaaS", "Series A Startups", "Growth Agencies", "SDR Teams", "Founders"].map((label) => (
              <span key={label} className="text-sm font-semibold" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Results */}
      <section id="results" className="px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              Real results
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              What our clients are saying
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Scribtly is invite-only. Every client gets onboarded personally and sees results in their first week.
            </p>
          </div>

          {/* Big visual + testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/images/professional.jpg"
                alt="Sales professional using Scribtly to book meetings"
                fill
                className="object-cover"
              />
              <div
                className="absolute bottom-6 left-6 right-6 rounded-xl border px-5 py-4"
                style={{ background: "rgba(253,250,246,0.92)", borderColor: "var(--border)", backdropFilter: "blur(10px)" }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>This week</p>
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>12 meetings booked automatically</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Zero manual follow-ups sent</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {testimonials.slice(0, 2).map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border p-7 flex flex-col gap-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" style={{ color: "var(--accent)" }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-primary)" }}>
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: "var(--accent)" }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Third testimonial full width */}
          <div
            className="rounded-2xl border p-8"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" style={{ color: "var(--accent)" }} />
              ))}
            </div>
            <p className="text-lg leading-relaxed mb-5 max-w-3xl" style={{ color: "var(--text-primary)" }}>
              "{testimonials[2].quote}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: "var(--accent)" }}
              >
                {testimonials[2].initials}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{testimonials[2].name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{testimonials[2].role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get access CTA */}
      <section id="get-access" className="px-6 py-28" style={{ background: "var(--dark)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
            style={{ borderColor: "rgba(224,120,48,0.4)", color: "var(--accent)", background: "rgba(224,120,48,0.08)" }}>
            <Calendar size={12} />
            Limited spots available
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white leading-tight">
            Ready to fill your calendar?
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly is invite only. Book a 30-minute call with our team to see the platform live
            and find out if it is the right fit for your business.
          </p>
          <a
            href="https://book.octelis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Book your call
            <ArrowRight size={16} />
          </a>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No commitment. No credit card. Just a conversation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
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
  );
}

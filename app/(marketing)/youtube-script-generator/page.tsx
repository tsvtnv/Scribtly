import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Play, Zap, Users, Clock, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Script Generator | Scribtly",
  description: "Generate YouTube video scripts in under 60 seconds. Save your client's voice once, create platform-native scripts with hooks, body, and CTAs every time.",
  openGraph: {
    title: "YouTube Script Generator | Scribtly",
    description: "Generate YouTube video scripts in under 60 seconds. Save your client's voice once, create platform-native scripts with hooks, body, and CTAs every time.",
    type: "website",
    url: "https://scribtly.com/youtube-script-generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Script Generator | Scribtly",
    description: "Generate YouTube video scripts in under 60 seconds. Save your client's voice once, create platform-native scripts with hooks, body, and CTAs every time.",
  },
};

const benefits = [
  {
    icon: Zap,
    title: "Script in under 60 seconds",
    body: "Stop staring at a blank document. Scribtly generates a structured YouTube script with hook, intro, main points, and CTA in less than a minute.",
  },
  {
    icon: Users,
    title: "Saved client voice profiles",
    body: "Set your client's niche, tone, audience, and brand phrases once. Every script you generate sounds like them — not like generic AI output.",
  },
  {
    icon: Play,
    title: "Platform-native structure",
    body: "YouTube scripts are built differently from TikTok or podcast scripts. Scribtly follows the right format: hook, pattern interrupt, value section, retention loops, and strong CTA.",
  },
  {
    icon: Clock,
    title: "Handle more clients, same hours",
    body: "When a first draft takes 60 seconds instead of 60 minutes, you can take on more clients without burning out. That is how freelancers and agencies scale.",
  },
];

const steps = [
  {
    num: "01",
    title: "Save your client's voice profile",
    body: "Add the client's niche, target audience, tone of voice, key phrases, and content style. Do this once. Scribtly remembers it every time.",
  },
  {
    num: "02",
    title: "Enter your video idea",
    body: "Type in the video topic or title. Add any talking points, goals, or key messages you want the script to include.",
  },
  {
    num: "03",
    title: "Generate your script",
    body: "Scribtly produces a complete YouTube script: an attention-grabbing hook, structured body with retention cues, and a CTA that matches the channel's style.",
  },
  {
    num: "04",
    title: "Edit, deliver, repeat",
    body: "Review the draft, make any adjustments, and deliver to your client. The whole process takes minutes, not hours.",
  },
];

const testimonials = [
  {
    quote: "I used to spend 2 to 3 hours writing a single YouTube script from scratch. Now I have a solid first draft in minutes and spend my time refining, not starting.",
    name: "Maya R.",
    role: "Freelance Script Writer",
    initials: "MR",
  },
  {
    quote: "Our agency manages 8 YouTube channels. Scribtly's client voice profiles mean every channel still sounds unique even though we're producing 3x the volume.",
    name: "Tom H.",
    role: "Content Agency Founder",
    initials: "TH",
  },
  {
    quote: "The hook quality is genuinely impressive. My clients stopped rewriting the openings because they actually work.",
    name: "Leah D.",
    role: "YouTube Channel Manager",
    initials: "LD",
  },
];

const faqs = [
  {
    q: "What makes Scribtly different from just asking ChatGPT?",
    a: "ChatGPT gives you generic output. Every time you use it, you have to re-explain your client's tone, niche, and style. Scribtly saves that information once as a client voice profile. Every script you generate is already informed by how that specific client speaks, what their audience expects, and what platform conventions matter for YouTube.",
  },
  {
    q: "Does Scribtly write the whole script or just an outline?",
    a: "Scribtly generates a complete, narration-ready YouTube script — not just bullet points. That includes a hook designed to stop scrolling, a structured body with clear sections, retention cues where relevant, and a CTA suited to the channel's goals.",
  },
  {
    q: "Can I use Scribtly for multiple YouTube clients?",
    a: "Yes. You can create a separate voice profile for each client. When you generate a script, you choose which client profile to apply. Each script is informed by that specific client's tone, audience, and content style.",
  },
  {
    q: "What types of YouTube videos does Scribtly support?",
    a: "Scribtly works for educational videos, talking-head videos, faceless YouTube scripts, listicles, story-led content, product reviews, tutorials, and more. You specify the format when you enter your video idea.",
  },
  {
    q: "Is Scribtly useful for YouTube Shorts as well?",
    a: "Yes. Scribtly supports short-form scripts including YouTube Shorts. The structure is different from long-form — tighter hook, faster payoff, single clear CTA — and Scribtly adjusts for that.",
  },
  {
    q: "Does Scribtly include B-roll notes?",
    a: "Scribtly can include B-roll direction notes within the script to help editors know what footage to cut to during key moments. This is especially useful for content agencies and video editors working from a script.",
  },
];

const structureItems = [
  { label: "Hook", detail: "The first 5 to 15 seconds that stop the scroll and earn the watch" },
  { label: "Pattern interrupt", detail: "A moment that resets attention before the viewer clicks away" },
  { label: "Value section", detail: "The main content broken into clear, logically ordered beats" },
  { label: "Retention loop", detail: "A teaser or open loop that keeps the viewer watching toward the end" },
  { label: "CTA", detail: "A clear, specific call to action suited to the channel's goals" },
];

export default function YouTubeScriptGeneratorPage() {
  return (
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
          <Link href="/" className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Scribtly
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", href: "/#features" },
              { label: "Pricing", href: "/pricing" },
              { label: "Blog", href: "/blog" },
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
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-80 text-white"
            style={{ background: "var(--accent)" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-4">
        <nav className="text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">›</span>
          <span>YouTube Script Generator</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="px-6 pt-12 pb-16 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
          >
            <Play size={11} />
            Platform-native YouTube scripts
          </div>

          <h1
            className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            YouTube Script Generator
            <br />
            <span style={{ color: "var(--accent)" }}>built for client work</span>
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)", maxWidth: "540px" }}>
            Generate complete, platform-native YouTube scripts in under 60 seconds. Save your client&apos;s voice once, apply it to every video — no more re-explaining tone to a blank chat window.
          </p>

          {/* Soft CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — 5 scripts included
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              View pricing
            </Link>
          </div>

          <div className="flex flex-wrap gap-5">
            {[
              "No card required to start",
              "Script ready in under 60 seconds",
              "Works for any YouTube niche",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <CheckCircle size={14} style={{ color: "var(--accent)" }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            The real problem with YouTube script writing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                For freelancers and content agencies, the blank-page problem compounds. You are not writing one script — you are writing scripts for multiple clients, each with their own voice, audience, and format preferences.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Generic AI tools give you something that sounds like every other YouTube video on the internet. You still spend hours rewriting it to sound like your client. Then you do the same thing next week.
              </p>
            </div>
            <div>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                The problem is not that AI cannot write scripts. The problem is that AI has no memory of your client. Every session starts from zero.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Scribtly fixes this by storing each client&apos;s voice, niche, and style in a saved profile. You generate scripts informed by that profile every time — without re-explaining anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What goes into a YouTube script */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            What Scribtly puts in every YouTube script
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--text-muted)" }}>
            A good YouTube script is more than words on a page. It follows a structure that holds viewer attention from the first second to the final call to action.
          </p>
          <div className="space-y-4">
            {structureItems.map((item, i) => (
              <div
                key={item.label}
                className="flex items-start gap-5 rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 text-white"
                  style={{ background: "var(--accent)" }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Why freelancers and agencies use Scribtly
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Not a generic writing tool. A script system built around client work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border p-7 flex flex-col gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(224,120,48,0.12)" }}
                >
                  <b.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="px-6 py-14 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Generate your next client&apos;s YouTube script in under 60 seconds
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--text-muted)" }}>
            Start free. No credit card. Your first 5 scripts are included.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Create my first script
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              How it works
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
              Four steps from blank page to client-ready script.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border p-8"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <div
                  className="text-5xl font-bold mb-5 leading-none"
                  style={{ color: "rgba(224,120,48,0.18)" }}
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

      {/* Who this is for */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Who uses Scribtly for YouTube scripts
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--text-muted)" }}>
            Scribtly is not built for everyone. It is built for people who write scripts for clients or channels regularly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Freelance script writers", desc: "Write faster, deliver more, charge the same or more." },
              { title: "Content agencies", desc: "Scale YouTube script production across multiple clients." },
              { title: "Social media managers", desc: "Handle video content without spending hours on scripts." },
              { title: "YouTube channel managers", desc: "Keep content consistent without bottlenecking on copy." },
              { title: "Coaches and educators", desc: "Create structured educational videos without blank-page anxiety." },
              { title: "SaaS and brand creators", desc: "Turn product knowledge into polished YouTube content." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Common mistakes in YouTube scripts — and how to avoid them
          </h2>
          <div className="space-y-6 mt-8">
            {[
              {
                mistake: "A weak or slow hook",
                fix: "Your first 15 seconds determine whether someone stays or leaves. Scribtly generates hooks built around pattern interrupts, bold statements, or direct audience address — not slow intros."
              },
              {
                mistake: "Sounding like every other video",
                fix: "When you paste a video idea into ChatGPT, you get the same generic tone everyone else gets. Scribtly applies your client's saved voice so the script sounds like them, not like AI."
              },
              {
                mistake: "No structure for retention",
                fix: "Many scripts are just an essay read to camera. YouTube rewards watch time. Scribtly includes retention cues and open loops that give viewers a reason to keep watching."
              },
              {
                mistake: "Vague or forced CTAs",
                fix: "Calls to action that feel like an afterthought do not convert. Scribtly generates CTAs that match the video's goal — whether that is a subscribe, a link, or a lead magnet."
              },
            ].map((item) => (
              <div
                key={item.mistake}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
              >
                <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  Mistake: {item.mistake}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              What users say about Scribtly
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border p-7 flex flex-col gap-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" style={{ color: "var(--accent)" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-primary)" }}>
                  &ldquo;{t.quote}&rdquo;
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
      </section>

      {/* Related pages */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            More script tools from Scribtly
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "TikTok Script Generator", href: "/tiktok-script-generator" },
              { label: "Instagram Reels Script Generator", href: "/instagram-reels-script-generator" },
              { label: "LinkedIn Video Script Generator", href: "/linkedin-video-script-generator" },
              { label: "Podcast Script Generator", href: "/podcast-script-generator" },
              { label: "Video Ad Script Generator", href: "/video-ad-script-generator" },
              { label: "Short-Form Video Scripts", href: "/short-form-video-script-generator" },
              { label: "AI Script Writer for Freelancers", href: "/for-freelancers" },
              { label: "AI Script Writer for Agencies", href: "/for-agencies" },
              { label: "YouTube Script Template", href: "/templates/youtube-script-template" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border px-4 py-3 text-sm font-medium transition-all hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)", background: "var(--bg-base)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3 className="font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-28 border-t" style={{ background: "var(--dark)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white leading-tight">
            Stop starting from a blank page.
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Create your first YouTube script in under 60 seconds. Save your client&apos;s voice once. Generate scripts that sound like them every time.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free — no card required
            <ArrowRight size={16} />
          </Link>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            5 free scripts included. No credit card needed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/" className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Scribtly</Link>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/for-freelancers" className="hover:underline">For freelancers</Link>
            <Link href="/for-agencies" className="hover:underline">For agencies</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Scribtly YouTube Script Generator",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Generate complete, platform-native YouTube video scripts in under 60 seconds. Save client voice profiles and create scripts with hooks, body sections, retention cues, and CTAs.",
              "url": "https://scribtly.com/youtube-script-generator",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP",
                "description": "Start free with 5 scripts included"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a,
                }
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://scribtly.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "YouTube Script Generator",
                  "item": "https://scribtly.com/youtube-script-generator"
                }
              ]
            }
          ])
        }}
      />
    </div>
  );
}

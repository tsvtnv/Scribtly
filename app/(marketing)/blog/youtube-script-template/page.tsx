import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Script Template (Free + Editable)",
  description:
    "A free YouTube script template for creators, freelancers, and agencies. Copy it, fill in the blanks, and record a better video every time.",
  openGraph: {
    title: "YouTube Script Template (Free + Editable)",
    description:
      "A free YouTube script template for creators, freelancers, and agencies. Copy it, fill in the blanks, and record a better video every time.",
    type: "article",
    url: "https://scribtly.com/blog/youtube-script-template",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/youtube-script-template",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "YouTube Script Template (Free + Editable)",
      description:
        "A free YouTube script template for creators, freelancers, and agencies. Copy it, fill in the blanks, and record a better video every time.",
      url: "https://scribtly.com/blog/youtube-script-template",
      datePublished: "2026-07-11",
      dateModified: "2026-07-11",
      author: { "@type": "Organization", name: "Scribtly" },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long should a YouTube script be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on your video length. A 5-minute video needs roughly 700 to 800 words of script. A 10-minute video needs around 1,400 to 1,600 words. Aim for a natural speaking pace of roughly 130 to 150 words per minute.",
          },
        },
        {
          "@type": "Question",
          name: "Should I script every word of my YouTube video?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That is a personal choice. Some creators prefer word-for-word scripts for accuracy and speed. Others use a detailed outline and speak naturally. Either approach works as long as your hook, structure, and CTA are solid.",
          },
        },
        {
          "@type": "Question",
          name: "What is a YouTube hook and why does it matter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A hook is the first 5 to 15 seconds of your video. It is the only part a new viewer might not skip. A strong hook states the value of the video clearly and creates curiosity or urgency. Without a good hook, even a great video will lose viewers before they engage.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this template for client YouTube videos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. This template works well for client script work. If you write scripts for multiple clients, a tool like Scribtly lets you save each client's voice profile once so every script you generate already matches their tone, audience, and platform style.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a YouTube script and a TikTok script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "YouTube scripts are generally longer and can include more detail, sections, and a structured intro. TikTok scripts are ultra-short, often 30 to 60 seconds, with an immediate hook and a single clear point. The template structure differs significantly between the two formats.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://scribtly.com/blog" },
        {
          "@type": "ListItem",
          position: 3,
          name: "YouTube Script Template",
          item: "https://scribtly.com/blog/youtube-script-template",
        },
      ],
    },
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Sign in", href: "/login" },
];

const templateSections = [
  {
    label: "HOOK",
    timing: "0 – 10 seconds",
    description: "Your single most important line. State the biggest benefit or make the boldest claim you can back up.",
    placeholder:
      "[Open with your strongest statement, question, or bold claim. This is what stops the scroll.]",
    tip: "Start with the result, not the backstory. 'Here's how I wrote 10 client scripts in one afternoon' beats 'Today I want to talk about script writing.'",
  },
  {
    label: "OPEN LOOP",
    timing: "10 – 20 seconds",
    description: "Tease what the viewer will learn or experience by the end. Give them a reason to keep watching.",
    placeholder:
      "[Tell them what they will walk away with. Create curiosity without giving everything away yet.]",
    tip: "Phrases like 'by the end of this video you will know exactly how to…' or 'I'm going to show you the template I use for every client…' work well.",
  },
  {
    label: "INTRO",
    timing: "20 – 40 seconds",
    description:
      "Briefly establish who you are and why this video is worth their time. Keep it short. Viewers came for the content, not your biography.",
    placeholder:
      "[Your name, your relevant credential or context in one sentence, and what this video covers.]",
    tip: "One sentence is often enough. 'I've written scripts for over 50 clients in the last two years, and this is the template I use every time' is a complete intro.",
  },
  {
    label: "MAIN BODY – SECTION 1",
    timing: "40 seconds – varies",
    description: "Your first key point, step, or topic block.",
    placeholder:
      "[Key point or step 1. Include a brief explanation, an example, and any B-roll or visual cue notes in brackets.]",
    tip: "Keep each section focused on one idea. Move to the next section the moment you've made the point clearly.",
  },
  {
    label: "MAIN BODY – SECTION 2",
    timing: "Varies",
    description: "Your second key point or step. Build logically from section one.",
    placeholder: "[Key point or step 2. Example, explanation, B-roll notes.]",
    tip: "Use a transition line between sections to maintain flow. 'Now that you have your hook sorted, here's how to structure the body…'",
  },
  {
    label: "MAIN BODY – SECTION 3",
    timing: "Varies",
    description: "Your third key point, step, or topic. Add more sections as needed for longer videos.",
    placeholder: "[Key point or step 3. Example, explanation, B-roll notes.]",
    tip: "Three main sections works well for most YouTube videos. For longer formats, five to seven sections can work, but each must earn its place.",
  },
  {
    label: "CTA",
    timing: "Final 30 – 60 seconds",
    description:
      "Tell viewers exactly what to do next. One clear action only. Don't stack multiple CTAs in the same breath.",
    placeholder: "[Your single call to action: comment, download, click the link, visit the website, subscribe.]",
    tip: "Make the CTA feel like a natural next step, not a sales pitch. 'If you want a free copy of this exact template, the link is in the description' is frictionless.",
  },
  {
    label: "OUTRO",
    timing: "Last 10 seconds",
    description: "Wrap up quickly. Reinforce the main takeaway and tease the next video if you have one.",
    placeholder:
      "[One-sentence recap of the main point. Link to next video or playlist. Subscribe reminder if relevant.]",
    tip: "End with momentum, not a slow wind-down. The viewer should feel like they got what they came for and know exactly where to go next.",
  },
];

const mistakes = [
  {
    heading: "Starting with your intro",
    body: "Viewers decide in the first few seconds whether to stay. Saving the best content for after a long intro is the fastest way to lose them. Hook first, always.",
  },
  {
    heading: "Stacking three CTAs at the end",
    body: "Like, comment, subscribe, check the link in bio, follow me on Instagram, and grab the free download. Viewers freeze when faced with too many choices. Pick one CTA per video.",
  },
  {
    heading: "Writing for reading, not speaking",
    body: "Scripts that read well on paper often sound robotic when spoken. Use contractions. Write short sentences. Read every line out loud before you film.",
  },
  {
    heading: "Skipping the open loop",
    body: "Stating what the video covers is not the same as creating a reason to keep watching. Tease the payoff without giving it away early.",
  },
  {
    heading: "Ignoring section transitions",
    body: "Without transition lines between sections, your video feels like a list instead of a conversation. A single bridging sentence keeps the flow natural.",
  },
];

const faqs = [
  {
    q: "How long should a YouTube script be?",
    a: "It depends on your video length. A 5-minute video needs roughly 700 to 800 words of script. A 10-minute video needs around 1,400 to 1,600 words. Aim for a natural speaking pace of roughly 130 to 150 words per minute.",
  },
  {
    q: "Should I script every word of my YouTube video?",
    a: "That is a personal choice. Some creators prefer word-for-word scripts for accuracy and speed. Others use a detailed outline and speak naturally. Either approach works as long as your hook, structure, and CTA are solid.",
  },
  {
    q: "What is a YouTube hook and why does it matter?",
    a: "A hook is the first 5 to 15 seconds of your video. It is the only part a new viewer might not skip. A strong hook states the value of the video clearly and creates curiosity or urgency. Without a good hook, even a great video will lose viewers before they engage.",
  },
  {
    q: "Can I use this template for client YouTube videos?",
    a: "Yes. This template works well for client script work. If you write scripts for multiple clients, a tool like Scribtly lets you save each client's voice profile once so every script you generate already matches their tone, audience, and platform style.",
  },
  {
    q: "What is the difference between a YouTube script and a TikTok script?",
    a: "YouTube scripts are generally longer and can include more detail, sections, and a structured intro. TikTok scripts are ultra-short, often 30 to 60 seconds, with an immediate hook and a single clear point. The template structure differs significantly between the two formats.",
  },
];

export default function YouTubeScriptTemplatePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={100}
              height={26}
              className="h-7 w-auto"
            />
          </Link>
          <div className="flex items-center gap-6">
            {navLinks.map((l) => (
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
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:opacity-60 transition-opacity">Blog</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--text-primary)" }}>YouTube Script Template</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-2">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "rgba(224,120,48,0.08)", borderColor: "rgba(224,120,48,0.25)", color: "var(--accent)" }}
        >
          Template · Saturday 11 July 2026
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: "var(--text-primary)" }}>
          YouTube Script Template
          <br />
          <span style={{ color: "var(--accent)" }}>(Free + Editable)</span>
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "640px" }}>
          A copy-paste script structure for creators, freelancers, and agencies. Every section explained,
          with a filled-in example so you can see exactly how it works before you use it.
        </p>
      </header>

      {/* Soft CTA */}
      <div
        className="max-w-3xl mx-auto px-6 mt-8 mb-2 rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: "rgba(224,120,48,0.06)", borderColor: "rgba(224,120,48,0.25)" }}
      >
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            Want this generated for your next client in under 60 seconds?
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Scribtly generates YouTube scripts in your client&rsquo;s exact voice. No blank page required.
          </p>
        </div>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Start free <ArrowRight size={14} />
        </Link>
      </div>

      {/* Main content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Intro */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            What this template covers
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Most YouTube videos underperform not because the content is bad, but because the structure
            is wrong. Viewers leave in the first 30 seconds, the main points feel scattered, or the
            call to action lands awkwardly and gets ignored.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            This template gives you a clear structure for any YouTube video: a hook that holds
            attention, a body that builds naturally, and an ending that drives action. It works for
            tutorials, talking-head videos, educational content, product reviews, and client scripts
            across almost any niche.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Below you will find the full template, a section-by-section breakdown, a filled-in example,
            and the most common mistakes to avoid.
          </p>
        </section>

        {/* The Template */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            The YouTube script template
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Copy this structure, fill in the bracketed sections, and you have a complete YouTube script.
          </p>

          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {templateSections.map((section, i) => (
              <div
                key={section.label}
                className={`p-6 ${i < templateSections.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "var(--border)", background: i % 2 === 0 ? "var(--bg-base)" : "var(--bg-subtle)" }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-md"
                      style={{ background: "rgba(224,120,48,0.12)", color: "var(--accent)" }}
                    >
                      {section.label}
                    </span>
                    <span className="text-xs ml-3" style={{ color: "var(--text-muted)" }}>
                      {section.timing}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                  {section.description}
                </p>
                <div
                  className="rounded-xl p-4 font-mono text-sm leading-relaxed"
                  style={{ background: "rgba(26,18,8,0.04)", color: "var(--text-primary)", border: "1px dashed var(--border)" }}
                >
                  {section.placeholder}
                </div>
                <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <span className="font-semibold" style={{ color: "var(--accent)" }}>Tip:</span>{" "}
                  {section.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <div
          className="rounded-2xl border p-7 mb-14 text-center"
          style={{ background: "var(--dark)", borderColor: "transparent" }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Skip the blank page entirely
          </h3>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Scribtly generates YouTube scripts in your client&rsquo;s voice in under 60 seconds. Save their
            brand tone once. Generate client-ready scripts every time, without starting from scratch.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Generate your first script free <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filled-in example */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Filled-in example
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            This example uses the template for a fitness coaching YouTube video. Swap the topic for any
            niche and the structure still holds.
          </p>

          <div
            className="rounded-2xl border p-7 space-y-6"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            {[
              {
                label: "HOOK",
                content:
                  "Most people never lose the weight they want to lose — not because they lack willpower, but because they're following the wrong plan for their body type. I'm going to show you the exact system my clients use to see results in the first three weeks.",
              },
              {
                label: "OPEN LOOP",
                content:
                  "By the end of this video you'll know the three things I check with every new client before we even talk about workouts. Most coaches skip these entirely.",
              },
              {
                label: "INTRO",
                content:
                  "I'm Jamie, and I've coached over 200 clients through sustainable fat loss without crash diets or six-day gym weeks. Here's what actually works.",
              },
              {
                label: "SECTION 1",
                content:
                  "First: the meal timing myth. You've probably heard that eating at the right time matters more than what you eat. Here's why that's backwards for most people…\n\n[B-roll: food prep footage, client consultation clips]",
              },
              {
                label: "SECTION 2",
                content:
                  "Second: the one metric that predicts results better than calories. This is the number I track with every client in week one, and it tells me almost everything I need to know…\n\n[B-roll: tracking app screen recording, consultation notes]",
              },
              {
                label: "SECTION 3",
                content:
                  "Third: the recovery gap most people completely ignore. I've seen this derail clients who were doing everything else right…\n\n[B-roll: sleep tracking, gym rest day footage]",
              },
              {
                label: "CTA",
                content:
                  "If you want the full client intake checklist I use with every new client, it's linked in the description. Download it free and use it with your own coach or programme.",
              },
              {
                label: "OUTRO",
                content:
                  "So: meal timing is a distraction, track the right metric in week one, and don't skip recovery. If you found this useful, my next video covers the exact meal plan structure I give every client. See you there.",
              },
            ].map((ex) => (
              <div key={ex.label}>
                <span
                  className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-md"
                  style={{ background: "rgba(224,120,48,0.12)", color: "var(--accent)" }}
                >
                  {ex.label}
                </span>
                <p className="text-sm leading-relaxed mt-2 whitespace-pre-line" style={{ color: "var(--text-primary)" }}>
                  {ex.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to use it section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            How to use this template for client work
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            If you write scripts for clients rather than your own channel, one extra step makes every
            script sharper: before you fill in the template, write down three things about the client.
          </p>
          <div className="space-y-4 mb-6">
            {[
              {
                num: "01",
                heading: "Who is their viewer?",
                body: "Age range, situation, what they already know, what they're struggling with. The hook and open loop only work if they speak directly to this person.",
              },
              {
                num: "02",
                heading: "What tone does the client use?",
                body: "Casual and energetic, calm and authoritative, educational, or motivational? The structure stays the same but the language shifts significantly depending on the voice.",
              },
              {
                num: "03",
                heading: "What is the one thing the viewer should do or feel after watching?",
                body: "This determines your CTA. Everything in the script should move the viewer towards that outcome.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex gap-5 rounded-2xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <div
                  className="text-3xl font-bold leading-none shrink-0 mt-0.5"
                  style={{ color: "rgba(224,120,48,0.20)" }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1.5" style={{ color: "var(--text-primary)" }}>
                    {step.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Once you have those three answers, filling in the template takes 20 to 30 minutes for most
            video lengths. If you're writing multiple scripts for the same client each week,{" "}
            <Link
              href="/signup"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              Scribtly saves their voice profile
            </Link>{" "}
            so you don't re-explain their tone every time you start a new script.
          </p>
        </section>

        {/* Mistakes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Common mistakes to avoid
          </h2>
          <div className="space-y-4">
            {mistakes.map((m) => (
              <div
                key={m.heading}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                  {m.heading}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Where Scribtly fits */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Where Scribtly fits into this workflow
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            This template gives you the structure. Scribtly fills it in for you, in the right voice,
            in under 60 seconds.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The most time-consuming part of client script writing is not knowing the structure — it's
            translating the structure into the right words for a specific client. A fitness coach sounds
            different from a finance creator. A personal brand sounds different from a B2B company's
            YouTube channel.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Scribtly lets you save a client's voice profile once — their niche, tone, audience, phrases
            they use, things they avoid — and then generate complete YouTube scripts that follow this
            exact template structure, written in that client's voice. Instead of starting from a blank
            page every time, you start with a complete first draft.
          </p>
          <div className="rounded-2xl border p-6 space-y-3" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              What you get with Scribtly:
            </p>
            {[
              "YouTube scripts structured exactly like this template",
              "Platform-native hooks, body sections, and CTAs",
              "Saved client voice profiles — set up once, reuse forever",
              "Scripts that sound like the client, not like generic AI",
              "First drafts in under 60 seconds",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            More script templates and guides
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            This template is part of a wider series of free script resources on the Scribtly blog.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "TikTok Script Template", href: "/blog/tiktok-script-template" },
              { label: "Video Script Template (Generic)", href: "/blog/video-script-template" },
              { label: "YouTube Shorts Script Template", href: "/blog/youtube-shorts-script-template" },
              { label: "How to Write a Video Script", href: "/blog/how-to-write-a-video-script" },
              { label: "Client Voice Profile Template", href: "/blog/client-voice-profile-template" },
              { label: "How to Write Scripts for Clients", href: "/blog/how-to-write-scripts-for-clients" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:opacity-70"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)" }}
              >
                <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="rounded-2xl p-8 text-center mb-10"
          style={{ background: "var(--dark)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            Generate your next YouTube script
            <br />
            in under 60 seconds
          </h2>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Scribtly gives you this template structure, filled in with the right words for your
            client's voice. Save their profile once. Generate scripts in seconds.
            No blank page. No re-explaining their tone.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try Scribtly free — no card required
            <ArrowRight size={15} />
          </Link>
        </section>
      </article>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image src="/images/logo-horizontal.png" alt="Scribtly" width={90} height={22} className="h-6 w-auto" />
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
            <Link href="/blog" className="hover:opacity-60 transition-opacity">Blog</Link>
            <Link href="/signup" className="hover:opacity-60 transition-opacity" style={{ color: "var(--accent)" }}>
              Start free
            </Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

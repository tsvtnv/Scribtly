import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Write a Video Script: A Complete Guide",
  description:
    "Learn how to write a video script with the right structure, hook, body, and CTA. A practical guide for creators, freelancers, and agencies.",
  openGraph: {
    title: "How to Write a Video Script: A Complete Guide",
    description:
      "Learn how to write a video script with the right structure, hook, body, and CTA. A practical guide for creators, freelancers, and agencies.",
    type: "article",
    url: "https://scribtly.com/blog/how-to-write-a-video-script",
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-a-video-script",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How to Write a Video Script: A Complete Guide",
      description:
        "Learn how to write a video script with the right structure, hook, body, and CTA. A practical guide for creators, freelancers, and agencies.",
      url: "https://scribtly.com/blog/how-to-write-a-video-script",
      datePublished: "2026-06-23",
      dateModified: "2026-06-23",
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
          name: "How long should a video script be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on the platform. A TikTok or Reels script might be 60 to 150 words. A YouTube video script could range from 800 words (5 minutes) to 2,500 words (15 minutes). Write for the platform first, not the word count.",
          },
        },
        {
          "@type": "Question",
          name: "Should you memorise a video script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not necessarily. Most creators use the script as a framework rather than a word-for-word read. Write the way you speak so delivery feels natural even if you glance at notes.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best format for a video script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The most effective format is: hook (first 3 to 5 seconds), intro (who you are and what the video covers), body (main points with transitions), CTA (what you want viewers to do next). Add B-roll notes in the margin if relevant.",
          },
        },
        {
          "@type": "Question",
          name: "How do you write a video script in a client voice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start by documenting your client's tone, niche, typical phrases, audience, and style. Save that profile somewhere reusable so every script you write for them starts from that foundation rather than from scratch. Tools like Scribtly let you save client voice profiles once and generate scripts that match their tone automatically.",
          },
        },
        {
          "@type": "Question",
          name: "What is the hook in a video script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The hook is the first 3 to 5 seconds of a video — the line or action that stops the scroll and makes the viewer stay. A strong hook states the payoff, creates curiosity, or starts mid-action or mid-story. It is the single most important part of any short-form video script.",
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
          name: "How to Write a Video Script",
          item: "https://scribtly.com/blog/how-to-write-a-video-script",
        },
      ],
    },
  ],
};

const platformCards = [
  {
    platform: "YouTube",
    notes: [
      "Longer format — 5 to 20 minutes typical",
      "Hook still critical but viewer intent is higher",
      "Chapters and structured sections help retention",
      "End screens and pinned comments extend the CTA",
      "Description and timestamps are part of the content strategy",
    ],
    link: "/youtube-scripts",
  },
  {
    platform: "TikTok",
    notes: [
      "15 to 60 seconds is the sweet spot",
      "Hook must land in the first 1 to 2 seconds",
      "Fast pacing — one idea per second is not unusual",
      "CTA should be a natural continuation, not a hard sell",
      "Sound and text overlays are part of the script",
    ],
    link: "/tiktok-scripts",
  },
  {
    platform: "Instagram Reels",
    notes: [
      "Similar to TikTok in length and pace",
      "Aesthetic and visual flow matter more here",
      "Hook can be visual as well as spoken",
      "Captions are important — many watch without sound",
      "CTA often drives to link in bio",
    ],
    link: "/reels-scripts",
  },
  {
    platform: "LinkedIn Video",
    notes: [
      "Slightly longer pace — professional audience",
      "Hook should be insight-led, not entertainment-led",
      "First-person authority works well",
      "CTAs work best as questions or conversation starters",
      "Captions are essential — feed is often sound-off",
    ],
    link: "/linkedin-video-scripts",
  },
];

const relatedLinks = [
  { label: "YouTube Script Generator", href: "/youtube-scripts" },
  { label: "TikTok Script Generator", href: "/tiktok-scripts" },
  { label: "Instagram Reels Script Generator", href: "/reels-scripts" },
  { label: "Video Script Template", href: "/templates/video-script-template" },
  { label: "Scribtly vs ChatGPT", href: "/compare/scribtly-vs-chatgpt" },
  { label: "AI Script Writer for Freelancers", href: "/use-cases/freelancers" },
];

const faqs = [
  {
    q: "How long should a video script be?",
    a: "It depends on the platform. A TikTok or Reels script might be 60 to 150 words. A YouTube video script could range from 800 words (5 minutes) to 2,500 words (15 minutes). Write for the platform first, not the word count.",
  },
  {
    q: "Should you memorise a video script?",
    a: "Not necessarily. Most creators use the script as a framework rather than a word-for-word read. Write the way you speak so delivery feels natural even if you glance at notes.",
  },
  {
    q: "What is the best format for a video script?",
    a: "The most effective format is: hook (first 3 to 5 seconds), intro (who you are and what the video covers), body (main points with transitions), CTA (what you want viewers to do next). Add B-roll notes in the margin if relevant.",
  },
  {
    q: "How do you write a video script in a client voice?",
    a: "Start by documenting your client's tone, niche, typical phrases, audience, and style. Save that profile somewhere reusable so every script starts from that foundation. Tools like Scribtly let you save client voice profiles once and generate scripts that match their tone automatically.",
  },
  {
    q: "What is the hook in a video script?",
    a: "The hook is the first 3 to 5 seconds of a video — the line or action that stops the scroll. A strong hook states the payoff, creates curiosity, or starts mid-action or mid-story. It is the single most important part of any short-form video script.",
  },
];

const mistakes = [
  {
    mistake: "Starting with your name and channel intro",
    fix: "The viewer does not care who you are yet — they care about what you are giving them. Start with the hook. Save the intro for after you have earned a few seconds of attention.",
  },
  {
    mistake: "Writing for reading, not speaking",
    fix: "Long sentences, passive voice, and complex vocabulary sound unnatural on video. Write short. Write direct. Say 'you will save time' not 'time-saving benefits are achievable.'",
  },
  {
    mistake: "Burying the value",
    fix: "State the main payoff upfront. Do not spend the first 30 seconds building up to a point the hook already promised. Get there faster.",
  },
  {
    mistake: "A vague or soft CTA",
    fix: "Tell viewers exactly what to do: Save this for your next script session, or Follow for more video scripts every week. Specific CTAs convert better.",
  },
  {
    mistake: "Ignoring pacing",
    fix: "A script that reads well might play too slowly or too fast. Read it aloud, time it, and cut or expand based on what the platform needs.",
  },
  {
    mistake: "Forgetting the platform context",
    fix: "A YouTube script with no transitions will feel disjointed. A TikTok script that goes past 90 words will probably lose viewers. Platform-native writing means writing for the platform, not just recording the script on it.",
  },
];

export default function HowToWriteAVideoScript() {
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
            <Link href="/" className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
              Scribtly
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Templates", href: "/templates" },
                { label: "Pricing", href: "/pricing" },
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
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Try free
            </Link>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <nav className="text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span className="mx-2">/</span>
            <span>How to Write a Video Script</span>
          </nav>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 py-12">

          {/* Header */}
          <header className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              Script Writing Guide
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
              How to Write a Video Script: A Complete Guide
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Writing a video script is not just typing what you want to say. A good script has
              structure, momentum, and a reason for the viewer to keep watching. This guide covers
              everything from the anatomy of a script to common mistakes that slow creators down.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
              <span>Published 23 June 2026</span>
              <span>·</span>
              <span>12 min read</span>
            </div>
          </header>

          {/* Soft CTA */}
          <div
            className="rounded-2xl border p-6 mb-12"
            style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.05)" }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Rather skip the blank page?
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native video scripts in under 60 seconds — with your
              client&apos;s voice, hook structure, and CTA already included.
            </p>
            <Link
              href="/signup"
              className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — no card required
            </Link>
          </div>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              What is a video script?
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              A video script is a written document that maps out everything said — and often shown — in a
              video. It can be a word-for-word transcript, a structured outline, or something in between.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              For short-form content like{" "}
              <Link href="/tiktok-scripts" className="underline" style={{ color: "var(--accent)" }}>TikTok scripts</Link>{" "}
              or{" "}
              <Link href="/reels-scripts" className="underline" style={{ color: "var(--accent)" }}>Instagram Reels scripts</Link>,
              it is usually a fully written-out piece you can read in one breath. For longer formats like{" "}
              <Link href="/youtube-scripts" className="underline" style={{ color: "var(--accent)" }}>YouTube scripts</Link>,
              it might be a structured outline with key talking points and transitions.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Either way, the purpose is the same: give the video a clear direction before the camera turns on.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Why most creators underestimate scripting
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Many creators try to go unscripted because they want to sound natural. But unscripted
              rarely means natural — it usually means rambling, missed points, and a lot of editing.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              A well-written script makes delivery feel more confident, not more robotic. It also makes
              editing faster because you have fewer takes, tighter pacing, and no forgotten points you
              wish you had included.
            </p>
            <div
              className="rounded-xl border-l-4 p-5 my-6"
              style={{ borderColor: "var(--accent)", background: "var(--bg-subtle)" }}
            >
              <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--text-primary)" }}>
                For freelancers writing scripts for clients, a structured script is also professional
                proof of work. It shows the client exactly what was planned before filming starts — and
                gives them something to review and approve.
              </p>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              If you deliver scripts as part of a{" "}
              <Link href="/use-cases/freelancers" className="underline" style={{ color: "var(--accent)" }}>freelance content service</Link>,
              a consistent script format builds trust and makes revisions easier.
            </p>
          </section>

          {/* Section 3: Anatomy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              The anatomy of a video script
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              Most video scripts — regardless of platform — share the same core structure. Master this
              and you can write a script for any format.
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                1. The hook (seconds 0 to 3–5)
              </h3>
              <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                The hook is the single most important part of any video. It is the first line or action
                that stops the scroll. A weak hook loses viewers before your video has even started.
                A strong hook makes stopping feel like the only option.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Good hooks state the payoff immediately, create curiosity, or start mid-action or
                mid-story. For short-form video especially, the hook carries more weight than any
                other part of the script.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                2. The intro (5 to 15 seconds)
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                After the hook, the intro briefly confirms what the video covers and who it is for.
                Keep this short. Viewers are impatient. The intro should reassure them they are in the
                right place, then get out of the way.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                3. The body
              </h3>
              <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                The body delivers the core value — steps, tips, story, or argument. Keep each section
                focused on one idea. Use transitions to signal movement between points.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                In short-form video, the body might be just two or three punchy statements. In a long
                YouTube video, it might span ten minutes with multiple sub-sections.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                4. The CTA (call to action)
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Every video needs a CTA, even if it is just subscribe or follow for more. The CTA
                should feel earned — you have delivered value, now you are asking for something
                reasonable in return. Give viewers one specific thing to do next.
              </p>
            </div>
          </section>

          {/* Section 4: Step by step */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              How to write a video script step by step
            </h2>

            {[
              {
                num: "01",
                title: "Define the goal first",
                body: "Before writing a single line, be clear on what you want the viewer to do after watching. Subscribe? Click a link? Understand a concept? The goal shapes everything else.",
              },
              {
                num: "02",
                title: "Know your audience",
                body: "Who is this video for? A beginner needs a different tone than a professional. If you are writing for a client, this means understanding their audience — not yours. A saved client voice profile is useful here: document the audience once and draw on it every time.",
              },
              {
                num: "03",
                title: "Write the hook last (or at least refine it last)",
                body: "Many writers start with the hook, stare at it for ten minutes, and lose momentum. Write the body first so you know what you are actually delivering — then come back and write a hook that promises exactly that.",
              },
              {
                num: "04",
                title: "Structure before sentences",
                body: "Before writing full sentences, map out the structure: hook, intro, point 1, point 2, point 3, CTA. This stops you from getting lost mid-script. Once the structure is solid, filling it in is fast.",
              },
              {
                num: "05",
                title: "Write the way you speak",
                body: "Video scripts are not essays. Avoid long sentences, passive voice, and formal language unless the brand specifically calls for it. Read every line out loud as you write. If it sounds awkward when said aloud, it will feel awkward on camera.",
              },
              {
                num: "06",
                title: "Add B-roll notes",
                body: "If the video will have cuts, overlays, or visual elements, note them in the script. Something like B-roll: hands typing on laptop or Cut to screen recording keeps the video editor aligned and saves revision rounds.",
              },
              {
                num: "07",
                title: "Review for pacing and length",
                body: "Read the script aloud and time it. If a TikTok script runs to three minutes, it needs cutting. If a YouTube script is too thin, find where you skipped over explanation. Pacing is about whether the viewer has enough time to absorb each point before the next arrives.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex gap-6 mb-8 pb-8 border-b last:border-b-0"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="text-3xl font-bold shrink-0 w-10 text-right leading-none pt-1"
                  style={{ color: "rgba(224,120,48,0.25)" }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Section 5: Template */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              A simple video script template
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Here is a flexible template that works for most video formats. Fill in each section,
              then adjust for your platform and length.
            </p>

            <div
              className="rounded-2xl border p-6 text-sm leading-relaxed"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-subtle)",
                color: "var(--text-primary)",
                fontFamily: "monospace",
              }}
            >
              <p className="font-bold mb-4" style={{ color: "var(--accent)" }}>
                VIDEO SCRIPT TEMPLATE
              </p>
              <div className="mb-4">
                <p className="font-bold">HOOK (0–5 sec)</p>
                <p style={{ color: "var(--text-muted)" }}>
                  [State the payoff, create curiosity, or start mid-story]
                </p>
                <p className="mt-1 italic" style={{ color: "var(--text-muted)" }}>
                  Example: Here is why your videos get zero views in the first 10 seconds.
                </p>
              </div>
              <div className="mb-4">
                <p className="font-bold">INTRO (5–15 sec)</p>
                <p style={{ color: "var(--text-muted)" }}>[Confirm what the video covers and who it is for]</p>
              </div>
              <div className="mb-4">
                <p className="font-bold">BODY — POINT 1</p>
                <p style={{ color: "var(--text-muted)" }}>[Main idea + brief explanation]</p>
                <p style={{ color: "var(--text-muted)" }}>[B-roll note if relevant]</p>
              </div>
              <div className="mb-4">
                <p className="font-bold">BODY — POINT 2</p>
                <p style={{ color: "var(--text-muted)" }}>[Main idea + brief explanation]</p>
                <p style={{ color: "var(--text-muted)" }}>[Transition: Which brings me to the second thing...]</p>
              </div>
              <div className="mb-4">
                <p className="font-bold">BODY — POINT 3</p>
                <p style={{ color: "var(--text-muted)" }}>[Main idea + brief explanation]</p>
              </div>
              <div>
                <p className="font-bold">CTA</p>
                <p style={{ color: "var(--text-muted)" }}>[One specific action — subscribe, follow, click, save]</p>
                <p className="mt-1 italic" style={{ color: "var(--text-muted)" }}>
                  Example: If this was useful, save it for next time you sit down to film.
                </p>
              </div>
            </div>

            <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
              Want a ready-to-use template?{" "}
              <Link href="/templates/video-script-template" className="underline" style={{ color: "var(--accent)" }}>
                Download the free video script template
              </Link>{" "}
              or{" "}
              <Link href="/templates/youtube-script-template" className="underline" style={{ color: "var(--accent)" }}>
                get the YouTube-specific version
              </Link>.
            </p>
          </section>

          {/* Mid CTA */}
          <div className="rounded-2xl p-8 my-12 text-center" style={{ background: "var(--dark)" }}>
            <h3 className="text-xl font-bold mb-3 text-white">
              Stop writing scripts from scratch every time
            </h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              Scribtly generates platform-native scripts in your client&apos;s voice — with the hook,
              body, and CTA already structured. No blank page. No re-explaining tone every session.
            </p>
            <Link
              href="/signup"
              className="inline-block text-sm font-semibold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Generate your next script in under 60 seconds
            </Link>
          </div>

          {/* Section 6: Platforms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              How scripts differ by platform
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              A YouTube script and a TikTok script are not the same document. Platform context changes
              everything: viewer intent, attention span, and what happens after the video ends.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {platformCards.map((item) => (
                <div
                  key={item.platform}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3 className="font-bold text-base mb-3">
                    <Link href={item.link} className="hover:underline" style={{ color: "var(--accent)" }}>
                      {item.platform} Scripts
                    </Link>
                  </h3>
                  <ul className="space-y-2">
                    {item.notes.map((note) => (
                      <li key={note} className="text-sm flex gap-2" style={{ color: "var(--text-muted)" }}>
                        <span style={{ color: "var(--accent)" }}>→</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Client voice */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Writing scripts in a client&apos;s voice
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              If you write scripts for clients, one of the hardest parts is getting the tone right.
              Every client has a different way of talking — different phrases, different energy,
              different things their audience expects to hear.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              The naive approach is to re-explain the client&apos;s tone in every brief. That gets
              slow fast, especially if you are managing multiple clients.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              A better system is to build a{" "}
              <Link href="/blog/what-is-a-client-voice-profile" className="underline" style={{ color: "var(--accent)" }}>
                client voice profile
              </Link>{" "}
              once. Document the client&apos;s niche, audience, tone, common phrases, things they
              never say, and the type of hooks that work for their content. Save it somewhere reusable.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              This is the approach{" "}
              <Link href="/" className="underline" style={{ color: "var(--accent)" }}>Scribtly</Link>{" "}
              is built around. You save each client&apos;s profile once — niche, tone, audience,
              phrases, platform — and generate scripts that match their voice without re-explaining
              anything.
            </p>
          </section>

          {/* Section 8: Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Common video script mistakes to avoid
            </h2>

            <div className="space-y-4">
              {mistakes.map((item) => (
                <div
                  key={item.mistake}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                    ✕ {item.mistake}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 9: Where Scribtly fits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Where Scribtly fits into your script workflow
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Scribtly is not a replacement for a skilled script writer. It is a first-draft
              accelerator and a workflow tool for people who write scripts at volume.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              If you write scripts for multiple clients, the two biggest time costs are starting from
              a blank page and re-calibrating your tone for each client. Scribtly removes both by
              saving client profiles and generating structured first drafts you can refine rather than
              build from zero.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  title: "Save client voices once",
                  body: "Document each client's niche, tone, audience, and phrases in a saved profile. Every script you generate draws from that profile.",
                },
                {
                  title: "Platform-native structure",
                  body: "Scripts for YouTube, TikTok, Reels, LinkedIn, and podcast are structured differently. Scribtly generates the right format for the right platform automatically.",
                },
                {
                  title: "Under 60 seconds to first draft",
                  body: "Choose the client, choose the platform, drop in the topic, and get a structured first draft in under a minute. Refine from there.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.body}</p>
                </div>
              ))}
            </div>

            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              It works for{" "}
              <Link href="/use-cases/freelancers" className="underline" style={{ color: "var(--accent)" }}>freelance script writers</Link>,{" "}
              <Link href="/use-cases/agencies" className="underline" style={{ color: "var(--accent)" }}>content agencies</Link>,{" "}
              <Link href="/use-cases/social-media-managers" className="underline" style={{ color: "var(--accent)" }}>social media managers</Link>,
              and{" "}
              <Link href="/use-cases/coaches" className="underline" style={{ color: "var(--accent)" }}>coaches creating content</Link>{" "}
              — anyone who needs scripts at a pace that manual writing cannot match.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border p-6"
                  style={{ borderColor: "var(--border)" }}
                >
                  <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                    {item.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Related guides and tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl border p-4 text-sm font-medium transition-all hover:border-current"
                  style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                >
                  {item.label}
                  <span style={{ color: "var(--accent)" }}>→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.05)" }}
          >
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Ready to write scripts faster?
            </h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
              Scribtly saves your client&apos;s voice, generates platform-native first drafts in under
              60 seconds, and keeps all your scripts organised by client and platform. Try it free —
              no card required.
            </p>
            <Link
              href="/signup"
              className="inline-block font-semibold px-7 py-3.5 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — 5 scripts on us
            </Link>
            <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
              No credit card. No long onboarding. Just your next script.
            </p>
          </div>

        </article>

        {/* Footer */}
        <footer className="px-6 py-8 border-t mt-12" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
          <div
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Link href="/" className="font-bold" style={{ color: "var(--text-primary)" }}>
              Scribtly
            </Link>
            <div className="flex gap-6">
              <Link href="/blog" className="hover:underline">Blog</Link>
              <Link href="/templates" className="hover:underline">Templates</Link>
              <Link href="/pricing" className="hover:underline">Pricing</Link>
              <Link href="/signup" className="hover:underline">Sign up free</Link>
            </div>
            <span>© 2026 Scribtly. All rights reserved.</span>
          </div>
        </footer>

      </div>
    </>
  );
}

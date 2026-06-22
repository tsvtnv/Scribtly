import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write a Video Script: The Complete Guide",
  description:
    "Learn how to write a video script from hook to CTA. Covers structure, platform formats, client voice, B-roll notes, and tips for writing faster.",
  openGraph: {
    title: "How to Write a Video Script: The Complete Guide",
    description:
      "Learn how to write a video script from hook to CTA. Covers structure, platform formats, client voice, B-roll notes, and tips for writing faster.",
    url: "https://scribtly.com/blog/how-to-write-a-video-script",
    type: "article",
    publishedTime: "2026-06-22T09:00:00Z",
    authors: ["Scribtly"],
  },
  alternates: {
    canonical: "https://scribtly.com/blog/how-to-write-a-video-script",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
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
          name: "Blog",
          item: "https://scribtly.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "How to Write a Video Script",
          item: "https://scribtly.com/blog/how-to-write-a-video-script",
        },
      ],
    },
    {
      "@type": "Article",
      "@id":
        "https://scribtly.com/blog/how-to-write-a-video-script#article",
      headline: "How to Write a Video Script: The Complete Guide",
      description:
        "Learn how to write a video script from hook to CTA. Covers structure, platform formats, client voice, B-roll notes, and tips for writing faster.",
      url: "https://scribtly.com/blog/how-to-write-a-video-script",
      datePublished: "2026-06-22",
      dateModified: "2026-06-22",
      author: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Scribtly",
        url: "https://scribtly.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://scribtly.com/blog/how-to-write-a-video-script",
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
            text: "It depends on the platform. TikTok and Reels scripts are typically 60–150 words for a 30–60 second video. YouTube scripts for a 10-minute video might run 1,200–1,800 words. Write to the platform's ideal watch time, not to fill a word count.",
          },
        },
        {
          "@type": "Question",
          name: "Should I write a full word-for-word script or just an outline?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on the presenter and platform. Word-for-word scripts suit presenters who deliver well to a teleprompter. Outlines work better for conversational presenters. Many professionals use a hybrid: a scripted hook, bullet-pointed body, and scripted CTA.",
          },
        },
        {
          "@type": "Question",
          name: "How do I make a video script sound natural and not robotic?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Read it aloud as you write. If it sounds like something you would never actually say, rewrite it. Use contractions. Use sentence fragments. Cut adverbs. Vary sentence length. Write for how the presenter speaks, not how a formal document reads.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to write a video script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A well-structured script typically takes 30 minutes to 2 hours depending on complexity, research, and whether you are writing in your own voice or a client's. Using a script tool like Scribtly can produce a platform-native first draft in under 60 seconds, which you then refine.",
          },
        },
        {
          "@type": "Question",
          name: "What is a pattern interrupt in a video script?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A pattern interrupt is something that breaks the viewer's expected scroll behaviour and forces them to pause. It can be a bold visual, an unexpected question, a surprising statement, or an abrupt change of pace. Used in the hook, it dramatically improves your chance of earning the next few seconds of attention.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the same script structure for every platform?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The core structure — hook, body, CTA — applies everywhere, but the length, pacing, and tone need adapting per platform. A YouTube hook can develop over 10–15 seconds; a TikTok hook must land in 1–2 seconds. Platform-specific formats exist for a reason.",
          },
        },
      ],
    },
  ],
};

function SectionDivider() {
  return (
    <div
      className="my-12 border-t"
      style={{ borderColor: "var(--border)" }}
    />
  );
}

function CalloutBox({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-2xl border p-6 my-8"
      style={{
        borderColor: accent ? "rgba(224,120,48,0.35)" : "var(--border)",
        background: accent
          ? "rgba(224,120,48,0.06)"
          : "var(--bg-subtle)",
      }}
    >
      {children}
    </div>
  );
}

function CtaBlock({
  headline,
  sub,
  cta,
}: {
  headline: string;
  sub: string;
  cta: string;
}) {
  return (
    <div
      className="rounded-2xl border p-8 my-10 text-center"
      style={{
        borderColor: "rgba(224,120,48,0.35)",
        background: "rgba(224,120,48,0.05)",
      }}
    >
      <p
        className="text-xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {headline}
      </p>
      <p
        className="text-sm mb-6 max-w-md mx-auto"
        style={{ color: "var(--text-muted)" }}
      >
        {sub}
      </p>
      <Link
        href="/signup"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
        style={{ background: "var(--accent)" }}
      >
        {cta}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 my-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle
            size={17}
            className="shrink-0 mt-0.5"
            style={{ color: "var(--accent)" }}
          />
          <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function HowToWriteAVideoScriptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
            <Link
              href="/"
              className="text-base font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Scribtly
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/blog"
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                Blog
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                Pricing
              </Link>
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
          <nav className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>How to Write a Video Script</span>
          </nav>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 pb-24">
          {/* Header */}
          <header className="pt-10 pb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
              style={{
                background: "rgba(224,120,48,0.08)",
                borderColor: "rgba(224,120,48,0.25)",
                color: "var(--accent)",
              }}
            >
              Script Writing Guide
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              How to Write a Video Script: The Complete Guide
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              A good video script is what separates a video that holds attention
              from one that loses viewers in the first ten seconds. Whether you
              are writing for YouTube, TikTok, Instagram Reels, or LinkedIn, the
              structure you use before you press record determines whether your
              video works.
            </p>
            <p className="text-sm mt-4" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
              Published 22 June 2026 · 12 min read
            </p>
          </header>

          {/* Soft CTA */}
          <CalloutBox accent>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              Want to write scripts faster?
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native video scripts in your client's
              voice — from a saved profile, in under 60 seconds. No blank page
              required.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--accent)" }}
            >
              Try Scribtly free <ArrowRight size={14} />
            </Link>
          </CalloutBox>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--text-primary)" }}>
            What Is a Video Script?
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            A video script is a written guide for what you will say — and sometimes
            do — in a video. It can be word-for-word or a structured outline,
            depending on your delivery style and the platform.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The job of a script is not to be read aloud perfectly. It is to make
            sure your video opens with a hook that earns the next few seconds,
            covers your key points in a logical order, and ends with a clear call
            to action.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Even loose, conversational-style videos benefit from a rough script.
            The difference between winging it and a structured outline is often
            the difference between 30% audience retention and 60%.
          </p>

          <SectionDivider />

          {/* Section 2 */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Why Most Videos Fail Without a Script
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            When you skip the script, three things tend to happen:
          </p>
          <div className="flex flex-col gap-5 mb-6">
            {[
              {
                title: "The hook is weak.",
                body: 'You start with "hey everyone, welcome back" or "so today I wanted to talk about..." instead of something that earns attention in the first two seconds.',
              },
              {
                title: "The structure drifts.",
                body: "Without a plan, you repeat yourself, skip important points, or go off-topic. Viewers drop off when they cannot follow the thread.",
              },
              {
                title: "The CTA is forgotten or rushed.",
                body: "You remember to add it at the end, but by then the viewer has already left. A scripted CTA, placed at the right moment, converts far better.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            A script fixes all three — without making your delivery sound rehearsed.
          </p>

          <SectionDivider />

          {/* Section 3 */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            The Core Structure of a Video Script
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            Every effective video script, regardless of length or platform, follows
            a similar pattern: hook, body, and CTA. Understanding each section is
            the foundation of everything else.
          </p>

          {/* Hook */}
          <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            1. The Hook (0–3 seconds on short-form, 0–15 seconds on long-form)
          </h3>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The hook is the most important part of your script. It determines
            whether a viewer keeps watching or scrolls past. Write the hook last —
            after you know exactly what your video delivers — so you can promise
            it accurately.
          </p>
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Types of hooks that work:
          </p>
          <CheckList
            items={[
              "Question hook: Ask something the viewer is already thinking about.",
              "Bold statement hook: Open with a counterintuitive or surprising claim.",
              "Loop hook: Hint at the payoff without revealing it — hint at what the viewer will learn without giving it away yet.",
              "Result hook: Show the outcome first, then explain how you got there.",
              "Pattern interrupt: Say or do something unexpected that breaks the scroll habit.",
            ]}
          />
          <CalloutBox>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Hook examples:
            </p>
            <ul className="flex flex-col gap-2">
              {[
                '"Most video scripts get this one thing completely wrong — and it is killing your reach."',
                '"Here is the exact script structure I use to write client videos in under an hour."',
                '"You do not need a big audience to start booking clients. Here is proof."',
              ].map((ex) => (
                <li
                  key={ex}
                  className="text-sm italic"
                  style={{ color: "var(--text-muted)" }}
                >
                  {ex}
                </li>
              ))}
            </ul>
          </CalloutBox>

          {/* Intro */}
          <h3 className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>
            2. The Intro (optional on short-form, useful on long-form)
          </h3>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            On TikTok or Reels, skip the intro entirely and stay in the hook's
            momentum. On YouTube, a brief intro (10–20 seconds) can confirm what
            the video covers and who it is for.
          </p>
          <CheckList
            items={[
              "Confirm the hook's promise — tell them what they are about to learn.",
              "Signal who the video is for.",
              "Keep it under 20 seconds, then get into the content.",
            ]}
          />

          {/* Body */}
          <h3 className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>
            3. The Body
          </h3>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The body is where you deliver your content in a logical sequence.
            Structure it in clear sections so the viewer always knows where they
            are and what is coming next.
          </p>
          <CheckList
            items={[
              "Break content into 2–5 key points (fewer on short-form).",
              'Use signpost phrases: "First...", "The second thing is...", "Here is the part most people miss..."',
              "Write for how you speak, not how you write formally.",
              "Keep sentences short and direct.",
              "Add B-roll notes if you are scripting for a production team or video editor.",
            ]}
          />

          {/* CTA */}
          <h3 className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>
            4. The Call to Action
          </h3>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Every video needs one clear CTA. One — not five. Decide what you want
            the viewer to do next and write it into the script. Do not improvise
            it.
          </p>
          <CheckList
            items={[
              "Follow, subscribe, or save the video.",
              "Visit a specific link or landing page.",
              "Leave a comment or reply.",
              "Book a call or download a resource.",
            ]}
          />

          <SectionDivider />

          {/* Mid CTA */}
          <CtaBlock
            headline="Stop starting every script from a blank page"
            sub="Scribtly generates structured, platform-native scripts in your client's saved voice. Hook, body, CTA — done in under 60 seconds."
            cta="Generate your first script free"
          />

          <SectionDivider />

          {/* Section 4 - Platform specific */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Platform-Specific Script Writing
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            The core structure applies everywhere, but the length, pacing, and
            audience expectations differ by platform. Adapting your script format
            to each platform is one of the fastest ways to improve performance.
          </p>

          {[
            {
              platform: "YouTube",
              slug: "/youtube-script-generator",
              points: [
                "Hook in the first 15 seconds before the intro card.",
                "Use clear sections that could be time-stamped in the description.",
                "Add mid-video retention hooks: \"coming up...\" or \"stick around because...\"",
                "Write a scripted outro with a channel subscription prompt.",
                "Ideal length for most channels: 8–15 minutes.",
              ],
            },
            {
              platform: "TikTok",
              slug: "/tiktok-script-generator",
              points: [
                "Start on-screen action or a hook — never a slow intro.",
                "Most TikTok scripts: 30–60 seconds (75–150 words).",
                "Aim for a single point rather than a list.",
                "Use on-screen text to reinforce the spoken script.",
                "Add a comment-bait line at the end to invite replies.",
              ],
            },
            {
              platform: "Instagram Reels",
              slug: "/instagram-reels-script-generator",
              points: [
                "Same 30–60 second principle as TikTok.",
                "Reels often skew slightly more polished than TikTok.",
                "Consider the visual carefully — write B-roll and cut-away notes.",
                "Captions matter on Reels — include them in your script brief.",
              ],
            },
            {
              platform: "LinkedIn Video",
              slug: "/linkedin-video-script-generator",
              points: [
                "Hook with a business insight or counterintuitive professional take.",
                "Keep videos between 1–3 minutes.",
                '"I did X and got Y" frameworks work well — results and proof resonate.',
                "CTA should invite a conversation, not push a hard sale.",
              ],
            },
          ].map((p) => (
            <div key={p.platform} className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {p.platform} Scripts
                </h3>
                <Link
                  href={p.slug}
                  className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
                  style={{ color: "var(--accent)" }}
                >
                  {p.platform} Script Generator <ArrowRight size={13} />
                </Link>
              </div>
              <CheckList items={p.points} />
            </div>
          ))}

          <SectionDivider />

          {/* Section 5 - Client voice */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            How to Write Scripts in a Client's Voice
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            For freelancers and agencies writing scripts for other people, this is
            the hardest and most valuable skill. Writing in a client's voice means
            using their natural phrases, matching their tone, and making the script
            sound like them — not like AI, and not like you.
          </p>
          <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            How to capture a client's voice:
          </p>
          <div className="flex flex-col gap-4 mb-6">
            {[
              {
                step: "01",
                text: "Interview them or watch their existing videos. Listen for repeated phrases and speech patterns.",
              },
              {
                step: "02",
                text: "Note the specific words and expressions they use naturally — and the ones they avoid.",
              },
              {
                step: "03",
                text: "Ask about tone: how casual, how direct, how much humour is appropriate.",
              },
              {
                step: "04",
                text: "Write a sample script and ask for feedback. Pay attention to what feels off.",
              },
              {
                step: "05",
                text: "Save all of this as a client voice profile. Reuse it for every future script — do not start from scratch each time.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 items-start"
              >
                <span
                  className="text-3xl font-bold leading-none shrink-0"
                  style={{ color: "rgba(224,120,48,0.2)" }}
                >
                  {item.step}
                </span>
                <p
                  className="text-sm leading-relaxed pt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The goal is that when the client reads the script aloud, it sounds
            exactly like them. See how{" "}
            <Link
              href="/for-freelancers"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              style={{ color: "var(--accent)" }}
            >
              Scribtly helps freelancers
            </Link>{" "}
            and{" "}
            <Link
              href="/for-agencies"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              style={{ color: "var(--accent)" }}
            >
              agencies
            </Link>{" "}
            manage client voice profiles at scale.
          </p>

          <SectionDivider />

          {/* Section 6 - B-roll */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Including B-Roll Notes in Your Script
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            If you are writing for a production team or a client who works with a
            video editor, B-roll notes turn a good script into a complete production
            brief. B-roll is the secondary footage that plays over the main
            talking-head shot.
          </p>
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            How to format B-roll notes:
          </p>
          <CheckList
            items={[
              "Put them in square brackets alongside the spoken section they relate to.",
              "Be specific about what the shot should show — avoid vague descriptions.",
              "Note any text on screen, graphics, or product shots required.",
            ]}
          />
          <CalloutBox>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Example:
            </p>
            <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-muted)" }}>
              "When you are managing five clients at once{" "}
              <span style={{ color: "var(--accent)" }}>
                [B-roll: hand scrolling through a project management tool with multiple client folders visible]
              </span>
              , you need a system that does not break down under volume..."
            </p>
          </CalloutBox>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Scribtly includes B-roll suggestions as part of the generated script
            output for platforms where they are relevant. Learn more in our guide
            on{" "}
            <Link
              href="/blog/what-is-b-roll-in-a-script"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              style={{ color: "var(--accent)" }}
            >
              what B-roll is and how to write it
            </Link>
            .
          </p>

          <SectionDivider />

          {/* Section 7 - Mistakes */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Common Script Writing Mistakes to Avoid
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                mistake: "Starting with a slow intro",
                fix: '"Hey everyone, welcome back! So today we are going to be talking about..." loses people before the hook lands. Start with the hook itself.',
              },
              {
                mistake: "Burying the hook",
                fix: "The most compelling thing you have to say should come first, not third. Move your best line to the top.",
              },
              {
                mistake: "Writing too long for the platform",
                fix: "A 3-minute TikTok script will not perform. A 45-second YouTube explainer leaves money on the table. Match length to platform expectations.",
              },
              {
                mistake: "Forgetting or multiplying the CTA",
                fix: 'Either the CTA is forgotten entirely or five are crammed in. One clear action per video. Say it, mean it, move on.',
              },
              {
                mistake: "Re-explaining client context every session",
                fix: "If you write scripts for clients regularly, typing tone notes and brand context from scratch every time introduces errors and wastes hours. Save a client's voice profile once and pull from it.",
              },
              {
                mistake: "Writing formally instead of conversationally",
                fix: "Scripts are meant to be spoken. Write the way your client talks, not the way a business report reads. Read every line aloud before delivering it.",
              },
            ].map((item) => (
              <div
                key={item.mistake}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  ✗ {item.mistake}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.fix}
                </p>
              </div>
            ))}
          </div>

          <SectionDivider />

          {/* FAQ */}
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-6">
            {[
              {
                q: "How long should a video script be?",
                a: "It depends on the platform. TikTok and Reels scripts are typically 60–150 words for a 30–60 second video. YouTube scripts for a 10-minute video might run 1,200–1,800 words. Write to the platform's ideal watch time, not to fill a word count.",
              },
              {
                q: "Should I write a full word-for-word script or just an outline?",
                a: "It depends on the presenter and platform. Word-for-word scripts suit presenters who deliver well to a teleprompter. Outlines work better for conversational presenters who lose energy if they feel too scripted. Many professionals use a hybrid: a scripted hook, bullet-pointed body, and scripted CTA.",
              },
              {
                q: "How do I make a video script sound natural and not robotic?",
                a: "Read it aloud as you write. If it sounds like something you would never actually say, rewrite it. Use contractions. Use sentence fragments. Cut adverbs. Vary sentence length. Write for how the presenter speaks, not how a formal document reads.",
              },
              {
                q: "How long does it take to write a video script?",
                a: "A well-structured script typically takes 30 minutes to 2 hours depending on complexity, research needed, and whether you are writing in your own voice or a client's. Using a script tool like Scribtly can produce a platform-native first draft in under 60 seconds, which you then refine.",
              },
              {
                q: "What is a pattern interrupt in a video script?",
                a: "A pattern interrupt is something that breaks the viewer's expected scroll behaviour and forces them to pause. It can be a bold visual, an unexpected question, a surprising statement, or an abrupt change of pace. Used in the hook, it significantly improves your chance of earning the next few seconds of attention.",
              },
              {
                q: "Can I use the same script structure for every platform?",
                a: "The core structure — hook, body, CTA — applies everywhere, but the length, pacing, and tone need adapting per platform. A YouTube hook can develop over 10–15 seconds; a TikTok hook must land in 1–2 seconds. Platform-specific formats exist for a reason.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <p
                  className="text-base font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <SectionDivider />

          {/* Final CTA */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "var(--dark)" }}
          >
            <p
              className="text-2xl font-bold mb-3 text-white"
            >
              Write your next client script in under 60 seconds
            </p>
            <p
              className="text-sm mb-8 max-w-md mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Scribtly generates platform-native scripts — YouTube, TikTok, Reels,
              LinkedIn, and more — in your client's saved voice. No blank page.
              No re-explaining the brief. Just a first draft that is already on
              brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Start free — 5 scripts included <ArrowRight size={14} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:opacity-80"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                See pricing
              </Link>
            </div>
          </div>

          {/* Internal link footer */}
          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--text-muted)" }}>
              Related guides
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "YouTube Script Generator", href: "/youtube-script-generator" },
                { label: "TikTok Script Generator", href: "/tiktok-script-generator" },
                { label: "Instagram Reels Script Generator", href: "/instagram-reels-script-generator" },
                { label: "LinkedIn Video Script Generator", href: "/linkedin-video-script-generator" },
                { label: "AI Script Writer for Freelancers", href: "/for-freelancers" },
                { label: "AI Script Writer for Agencies", href: "/for-agencies" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  {link.label}
                  <ArrowRight size={13} style={{ color: "var(--text-muted)" }} />
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer
          className="px-6 py-8 border-t"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Link
              href="/"
              className="font-bold text-base"
              style={{ color: "var(--text-primary)" }}
            >
              Scribtly
            </Link>
            <div className="flex gap-6">
              <Link href="/blog" className="hover:opacity-70 transition-opacity">
                Blog
              </Link>
              <Link href="/pricing" className="hover:opacity-70 transition-opacity">
                Pricing
              </Link>
              <Link href="/for-freelancers" className="hover:opacity-70 transition-opacity">
                For Freelancers
              </Link>
              <Link href="/for-agencies" className="hover:opacity-70 transition-opacity">
                For Agencies
              </Link>
            </div>
            <span>© 2026 Scribtly. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}

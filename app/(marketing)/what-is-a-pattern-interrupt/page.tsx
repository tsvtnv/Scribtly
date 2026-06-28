import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, BookOpen, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is a Pattern Interrupt? (Definition + Video Examples)",
  description:
    "A pattern interrupt breaks the viewer's scroll autopilot in the first second. Learn how it works, why it matters for short-form video, and how to write one.",
  alternates: { canonical: "/what-is-a-pattern-interrupt" },
  openGraph: {
    type: "article",
    url: "/what-is-a-pattern-interrupt",
    siteName: "Scribtly",
    title: "What Is a Pattern Interrupt? (Definition + Video Examples)",
    description:
      "A pattern interrupt breaks the viewer's scroll autopilot in the first second. Learn how it works, why it matters for short-form video, and how to write one.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "What Is a Pattern Interrupt?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is a Pattern Interrupt? (Definition + Video Examples)",
    description:
      "A pattern interrupt breaks the viewer's scroll autopilot in the first second. Learn how it works, why it matters for short-form video, and how to write one.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "What Is a Pattern Interrupt?",
      item: `${SITE_URL}/what-is-a-pattern-interrupt`,
    },
  ],
};

const faqs = [
  {
    q: "What is a pattern interrupt in video?",
    a: "A pattern interrupt is a deliberate break from the expected format or rhythm that forces the viewer's brain to pay attention. In short-form video, this usually happens in the first one to three seconds — an unexpected visual, a bold opening statement, an abrupt mid-action clip-in, or a surprising question. It disrupts the scroll reflex and earns the next few seconds of watch time.",
  },
  {
    q: "Is a pattern interrupt the same as a hook?",
    a: "They are closely related but not identical. A hook is the opening of a video designed to grab attention — it can be a pattern interrupt, but not always. A pattern interrupt is specifically a technique that breaks expected behaviour or format. Some hooks are pattern interrupts (surprising cuts, bold claims that feel unexpected). Others are not (a straightforward question like 'Want to grow your audience faster?' is a hook but not necessarily a pattern interrupt).",
  },
  {
    q: "What makes a good pattern interrupt?",
    a: "A good pattern interrupt is unexpected but still relevant. It should create immediate curiosity or tension without confusing the viewer about what the video is about. Randomly shocking content interrupts the pattern but often loses the viewer anyway — the interrupt should pull them toward the content, not just freeze them for a second.",
  },
  {
    q: "How long should a pattern interrupt last?",
    a: "One to three seconds for short-form video. Its job is to catch attention, not to hold it. After the interrupt, your content needs to earn continued watch time through relevance, structure, and value. The interrupt is the door — the content is the room.",
  },
  {
    q: "Can I use pattern interrupts in mid-video?",
    a: "Yes. Mid-video pattern interrupts (also called retention hooks) are used to prevent drop-off at natural exit points in a longer video. Changing the camera angle, cutting to B-roll, introducing an unexpected visual, or directly addressing the viewer ('Wait — this next part is the one most people get wrong') are all mid-video interrupts. YouTube creators use these heavily to maintain audience retention throughout a long-form video.",
  },
  {
    q: "Does Scribtly generate pattern interrupts in its scripts?",
    a: "Yes. Every script Scribtly generates starts with a platform-native hook, and for short-form platforms like TikTok and Instagram Reels, those hooks are typically structured as pattern interrupts. Because Scribtly saves each client's voice profile, the hook matches the client's tone and audience rather than using a one-size-fits-all formula.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is a Pattern Interrupt? (Definition + Video Examples)",
  description:
    "A pattern interrupt breaks the viewer's scroll autopilot in the first second. Learn how it works, why it matters for short-form video, and how to write one.",
  author: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Scribtly", url: SITE_URL },
  url: `${SITE_URL}/what-is-a-pattern-interrupt`,
  datePublished: "2026-06-28",
};

const patternInterruptTypes = [
  {
    type: "Visual interrupt",
    description:
      "A sudden cut into the middle of an action, an unexpected location, or a striking image as the first frame. Before the viewer has processed what they are seeing, the brain signals: pay attention.",
    example: "Video starts with someone mid-jump before any introduction.",
  },
  {
    type: "Statement interrupt",
    description:
      "An opening line that contradicts something the viewer assumes to be true, creates immediate stakes, or raises a question they have not thought to ask.",
    example: "\"Everything you know about growing on TikTok is backwards.\"",
  },
  {
    type: "Format interrupt",
    description:
      "A script or visual structure that breaks the expected format of the platform — jumbled text, fast-cut editing, an unexpected sound, or a direct confrontational address.",
    example: "Video opens with silence and on-screen text before anyone speaks.",
  },
  {
    type: "Curiosity gap",
    description:
      "Referencing the payoff of the video immediately without explaining it yet. The viewer's brain registers a gap in their knowledge and wants to close it.",
    example: "\"The mistake I made cost me three months of growth — and you are probably making it right now.\"",
  },
  {
    type: "Direct address",
    description:
      "Speaking directly to a specific viewer type — calling them out by role, pain point, or situation — in a way that makes them feel seen rather than spoken at.",
    example: "\"If you are a freelancer writing scripts for clients, this one is specifically for you.\"",
  },
];

export default function WhatIsPatternInterruptPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <Link href="/youtube-scripts" className="hover:opacity-70 transition-opacity">YouTube</Link>
            <Link href="/tiktok-scripts" className="hover:opacity-70 transition-opacity">TikTok</Link>
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
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-0">
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <span>/</span>
          <span>Glossary</span>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>What Is a Pattern Interrupt?</span>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pt-10 pb-24">

        {/* Header */}
        <header className="mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 border"
            style={{
              background: "rgba(224,120,48,0.08)",
              borderColor: "rgba(224,120,48,0.25)",
              color: "var(--accent)",
            }}
          >
            <BookOpen size={12} />
            Glossary
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            What Is a Pattern Interrupt?
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
            A pattern interrupt is an opening technique that breaks the viewer&apos;s scroll autopilot in the first one to three seconds of a video. Instead of starting the way most videos do, it creates an unexpected moment that forces attention.
          </p>
        </header>

        {/* Soft CTA */}
        <div
          className="rounded-2xl border p-5 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "rgba(224,120,48,0.25)", background: "rgba(224,120,48,0.05)" }}
        >
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Want hooks that stop the scroll?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native scripts starting with strong hooks — in your client&apos;s voice.
            </p>
          </div>
          <Link
            href="/signup"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Try free <ArrowRight size={14} />
          </Link>
        </div>

        {/* Body */}
        <div className="space-y-12">

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Why pattern interrupts matter in short-form video
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              On TikTok, Instagram Reels, and YouTube Shorts, a viewer decides whether to keep watching within the first one to three seconds. This decision is mostly unconscious — the brain runs a rapid relevance check based on the first visual and the first words it processes.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Most videos start the same way: the creator looks into the camera, says hello, introduces themselves, and then gets to the point. The brain recognises this pattern and treats it as low-priority. The thumb moves before the content has had a chance to earn attention.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A pattern interrupt breaks that script. It gives the brain something unexpected to process — an unusual visual, a surprising claim, a bold question, a cut that starts mid-action — which triggers a momentary pause in the scroll reflex. That pause is your window.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Five types of pattern interrupt
            </h2>
            <div className="space-y-5">
              {patternInterruptTypes.map((item) => (
                <div
                  key={item.type}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(224,120,48,0.12)" }}
                    >
                      <Zap size={15} style={{ color: "var(--accent)" }} />
                    </div>
                    <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                      {item.type}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                    {item.description}
                  </p>
                  <div
                    className="rounded-lg border px-4 py-3 text-sm italic"
                    style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-muted)" }}
                  >
                    Example: {item.example}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Pattern interrupt vs hook: what is the difference?
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              These two terms often get used interchangeably, and the distinction matters more in practice than in theory.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                  A hook
                </h3>
                <ul className="space-y-2">
                  {[
                    "The opening moment designed to earn continued watch time",
                    "Can be a bold claim, a question, or a surprising fact",
                    "Works through relevance, curiosity, or emotional resonance",
                    "Does not have to break an expected format",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.04)" }}
              >
                <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                  A pattern interrupt
                </h3>
                <ul className="space-y-2">
                  {[
                    "A hook technique that specifically breaks expected behaviour",
                    "Works by disrupting the brain&apos;s autopilot scroll reflex",
                    "Typically visual, structural, or auditory in nature",
                    "Most powerful in short-form video where scroll speed is highest",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The practical takeaway: every pattern interrupt is a type of hook, but not every hook is a pattern interrupt. Both are valid. The strongest short-form scripts often combine both — the pattern interrupt wins the first second, and a clear hook statement earns the next ten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              How to write a pattern interrupt for a script
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              The pattern interrupt comes before you explain anything. It does not introduce you. It does not set context. It fires immediately.
            </p>
            <div className="space-y-4">
              {[
                {
                  num: "1",
                  title: "Identify the expected opening for your niche",
                  body: "What do most videos in your category start with? A greeting, a topic introduction, a product shot? Whatever is most common is the pattern. Your interrupt needs to break that.",
                },
                {
                  num: "2",
                  title: "Start mid-action or mid-thought",
                  body: "Cutting into a scene that has already started creates an immediate sense that something is happening. The brain catches up. This is more effective than a slow build or a formal introduction.",
                },
                {
                  num: "3",
                  title: "Lead with the tension, not the setup",
                  body: "Most creators build to their main point. Reverse this. Open with the most interesting thing — the result, the mistake, the surprising fact — and then explain how you got there. The viewer already wants to know.",
                },
                {
                  num: "4",
                  title: "Keep it under three seconds",
                  body: "A pattern interrupt that takes five seconds to land has already lost the race. The moment should land before the viewer has time to make a conscious decision to scroll.",
                },
                {
                  num: "5",
                  title: "Make sure it connects to the rest of the video",
                  body: "An interrupt that has nothing to do with the content produces a view and an immediate drop-off. The interrupt should be surprising but relevant — it sets a question that the video then answers.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border p-6 flex gap-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <div
                    className="text-2xl font-bold leading-none shrink-0 w-8"
                    style={{ color: "rgba(224,120,48,0.3)" }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mid CTA */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "var(--dark)" }}
          >
            <h3 className="text-2xl font-bold mb-3 text-white">
              Generate hooks and scripts in under 60 seconds
            </h3>
            <p
              className="text-sm mb-6 leading-relaxed max-w-md mx-auto"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Scribtly writes platform-native scripts that open with strong hooks — and saves your client&apos;s voice so every script sounds like them, not like generic AI output. Five free scripts, no card needed.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start writing free <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Pattern interrupts across platforms
            </h2>
            <div className="space-y-4">
              {[
                {
                  platform: "TikTok",
                  notes:
                    "Scroll speed is highest here. The pattern interrupt needs to fire in the first half-second — usually a striking visual or the most interesting line of the entire video spoken first. Silence followed by a bold statement also works well because TikTok autoplay typically starts muted.",
                },
                {
                  platform: "Instagram Reels",
                  notes:
                    "Similar to TikTok but the audience skews slightly older. Bold claims and direct-address interrupts work well. Visual interrupts are effective because Reels is a highly visual platform and the feed is image-heavy.",
                },
                {
                  platform: "YouTube Shorts",
                  notes:
                    "YouTube viewers tolerate slightly longer openings than TikTok, but short-form habits are migrating. Pattern interrupts should still fire in the first two seconds. An unusual first frame or an unexpected claim before the creator's face appears is an effective format.",
                },
                {
                  platform: "YouTube long-form",
                  notes:
                    "Pattern interrupts are used here as a first-ten-seconds hook before the title card or B-roll. Creators also use mid-video interrupts (camera angle changes, B-roll cuts, direct-to-camera moments) to prevent drop-off at the 20–40% mark.",
                },
                {
                  platform: "LinkedIn video",
                  notes:
                    "Autoplay is silent by default. Text-forward pattern interrupts — a bold on-screen statement, a striking data point — are particularly effective because they work without audio. Direct professional pain points also land strongly as opening statements.",
                },
              ].map((item) => (
                <div
                  key={item.platform}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                    {item.platform}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.notes}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Common mistakes with pattern interrupts
            </h2>
            <div className="space-y-4">
              {[
                {
                  mistake: "The interrupt has nothing to do with the video",
                  why: "A shocking image or random bold claim can stop the scroll, but if the content that follows does not connect to it, the viewer feels tricked. Watch time collapses and algorithmic signals suffer.",
                },
                {
                  mistake: "The interrupt is too long",
                  why: "An interrupt that takes four or five seconds to play out is not actually breaking the pattern — it is becoming the new pattern. Keep it to one to three seconds maximum.",
                },
                {
                  mistake: "Using the same format every time",
                  why: "Your regular viewers learn your opening style. Once they know what to expect, the interrupt stops working. Rotate formats across videos to keep the effect fresh.",
                },
                {
                  mistake: "Prioritising shock over relevance",
                  why: "Shock value attracts clicks but rarely converts to subscribers, clients, or sales. The interrupt should create relevance tension — the viewer should want to keep watching because they expect something useful, not just surprising.",
                },
                {
                  mistake: "Writing the interrupt last",
                  why: "Many creators write the body of the script first and bolt on an opening later. This usually produces weak, summarised hooks instead of strong interrupts. Write the interrupt first, before you are too close to the content.",
                },
              ].map((item) => (
                <div
                  key={item.mistake}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <p className="font-semibold text-sm mb-1" style={{ color: "#C4652A" }}>
                    ✕ {item.mistake}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.why}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Where Scribtly fits
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Every script Scribtly generates starts with a platform-native hook. For{" "}
              <Link href="/tiktok-scripts" className="underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: "var(--accent)" }}>
                TikTok
              </Link>
              ,{" "}
              <Link href="/instagram-reels-scripts" className="underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: "var(--accent)" }}>
                Instagram Reels
              </Link>
              , and{" "}
              <Link href="/youtube-shorts-scripts" className="underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: "var(--accent)" }}>
                YouTube Shorts
              </Link>
              , those hooks are structured to function as pattern interrupts — an opening line or moment that breaks the expected format and earns the next few seconds.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Because Scribtly saves each client&apos;s voice profile — their tone, niche, audience, and typical content style — the pattern interrupts it generates are calibrated to that creator rather than pulled from a generic template. A fitness creator&apos;s interrupt sounds different from a finance creator&apos;s interrupt. Scribtly tracks that difference.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              For{" "}
              <Link href="/for-freelancers" className="underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: "var(--accent)" }}>
                freelancers
              </Link>{" "}
              writing scripts across multiple clients, this means the opening of every script is already platform-native and client-appropriate, rather than something that needs significant editing before it is ready to use. See the{" "}
              <Link href="/video-script-template" className="underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: "var(--accent)" }}>
                video script template
              </Link>{" "}
              for the full structure Scribtly follows, including where the pattern interrupt sits in relation to the hook, intro, body, and CTA.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                >
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related links */}
          <section>
            <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
              Related pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/youtube-scripts", label: "YouTube script generator" },
                { href: "/tiktok-scripts", label: "TikTok script generator" },
                { href: "/instagram-reels-scripts", label: "Instagram Reels script generator" },
                { href: "/youtube-shorts-scripts", label: "YouTube Shorts script generator" },
                { href: "/what-is-a-video-hook", label: "What is a video hook?" },
                { href: "/video-script-template", label: "Free video script template" },
                { href: "/for-freelancers", label: "Scribtly for freelancers" },
                { href: "/for-agencies", label: "Scribtly for agencies" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:opacity-80"
                  style={{ borderColor: "var(--border)", background: "var(--bg-subtle)", color: "var(--text-primary)" }}
                >
                  <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{ borderColor: "rgba(224,120,48,0.25)", background: "rgba(224,120,48,0.04)" }}
          >
            <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Generate your next script in under 60 seconds
            </h3>
            <p
              className="text-sm mb-6 leading-relaxed max-w-lg mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              Scribtly writes platform-native scripts with hooks built in. Save your client&apos;s voice once and generate scripts that sound like them, not like generic AI output. Five free scripts to start.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Start free — no card needed <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/">
            <Image
              src="/images/logo-horizontal.png"
              alt="Scribtly"
              width={90}
              height={22}
              className="h-6 w-auto"
            />
          </Link>
          <span>© 2026 Scribtly. All rights reserved.</span>
          <Link href="/signup" className="hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
            Start free →
          </Link>
        </div>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowRight, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "Scribtly vs ChatGPT for Script Writing",
  description:
    "Compare Scribtly and ChatGPT for writing video scripts. See which tool works better for freelancers and creators who write client scripts daily.",
};

const comparisonRows = [
  {
    feature: "Saves client voice profiles",
    scribtly: "yes",
    chatgpt: "no",
  },
  {
    feature: "Platform-specific script structure",
    scribtly: "yes",
    chatgpt: "no",
  },
  {
    feature: "Scripts organised by client",
    scribtly: "yes",
    chatgpt: "no",
  },
  {
    feature: "Hook, body, and CTA sections built in",
    scribtly: "yes",
    chatgpt: "no",
  },
  {
    feature: "B-roll notes in scripts",
    scribtly: "yes",
    chatgpt: "no",
  },
  {
    feature: "Captions and hashtag suggestions",
    scribtly: "yes",
    chatgpt: "no",
  },
  {
    feature: "Re-prompting required each session",
    scribtly: "no",
    chatgpt: "yes",
  },
  {
    feature: "General-purpose text generation",
    scribtly: "partial",
    chatgpt: "yes",
  },
  {
    feature: "Custom persona prompting",
    scribtly: "yes",
    chatgpt: "partial",
  },
  {
    feature: "Supports YouTube, TikTok, Reels, LinkedIn, Podcasts",
    scribtly: "yes",
    chatgpt: "partial",
  },
];

const faqs = [
  {
    q: "Can ChatGPT write video scripts?",
    a: "Yes, ChatGPT can write video scripts if you give it detailed instructions. The limitation is that you have to re-explain your client's brand, tone, and platform every single time. There is no memory of client voice between sessions by default, and there is no built-in structure for specific platforms like YouTube or TikTok.",
  },
  {
    q: "What makes Scribtly different from ChatGPT for script writing?",
    a: "Scribtly is built specifically for script writing workflows. It saves your client's voice profile — their niche, tone, audience, phrases, and style — so every script you generate already sounds like that client. You do not have to re-explain anything. It also applies the right script structure for each platform automatically.",
  },
  {
    q: "Is Scribtly just ChatGPT with a wrapper?",
    a: "No. Scribtly uses AI to power its generation, but the platform is built around a specific workflow: saving client voice profiles, selecting the right platform structure, and generating scripts that match both. The difference is in the system, not just the model.",
  },
  {
    q: "Which is cheaper, Scribtly or ChatGPT?",
    a: "ChatGPT has a free tier and a paid plan. Scribtly is a dedicated script writing tool with its own pricing. If you are writing scripts professionally for clients, the time saved by not re-prompting every session typically offsets the cost quickly. Check the latest pricing on each platform before deciding.",
  },
  {
    q: "Can I use ChatGPT to write scripts in a client's voice?",
    a: "You can, but it requires careful, detailed system prompts every time you start a new session. Most freelancers end up copying and pasting the same setup prompt repeatedly. Scribtly removes that step by saving the client profile once and reusing it for every script.",
  },
  {
    q: "Who should use Scribtly instead of ChatGPT?",
    a: "Scribtly is the better choice if you write scripts regularly for multiple clients, need platform-specific structure, or want to stop re-explaining brand voice every time. ChatGPT is fine for one-off general text tasks, but for a consistent client script workflow, a dedicated tool like Scribtly is faster and more reliable.",
  },
];

function IconCell({ value }: { value: string }) {
  if (value === "yes") {
    return <CheckCircle size={18} style={{ color: "#22c55e" }} className="mx-auto" />;
  }
  if (value === "no") {
    return <XCircle size={18} style={{ color: "#ef4444" }} className="mx-auto" />;
  }
  return <Minus size={18} style={{ color: "var(--text-muted)" }} className="mx-auto" />;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
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
          name: "Compare",
          item: "https://scribtly.com/compare",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Scribtly vs ChatGPT",
          item: "https://scribtly.com/compare/scribtly-vs-chatgpt",
        },
      ],
    },
  ],
};

export default function ScribtlyVsChatGPTPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/compare"
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Compare
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Pricing
            </Link>
            <a
              href="https://app.scribtly.com/signup"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white"
              style={{ background: "var(--accent)" }}
            >
              Try free
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:underline">Compare</Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>Scribtly vs ChatGPT</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-10">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
            style={{
              background: "rgba(224,120,48,0.08)",
              borderColor: "rgba(224,120,48,0.25)",
              color: "var(--accent)",
            }}
          >
            Comparison
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Scribtly vs ChatGPT{" "}
            <span style={{ color: "var(--accent)" }}>for Script Writing</span>
          </h1>
          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-muted)", maxWidth: "600px" }}
          >
            Both tools use AI to generate content, but they solve different problems. If you write scripts for clients regularly, the difference matters a lot more than you might expect.
          </p>

          {/* Soft CTA */}
          <a
            href="https://app.scribtly.com/signup"
            className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
            style={{ color: "var(--accent)" }}
          >
            Try Scribtly free — no card required
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Quick verdict */}
      <section
        className="border-y py-10"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                ChatGPT is better when
              </p>
              <ul className="space-y-2">
                {[
                  "You need general-purpose writing across many formats",
                  "You are experimenting or doing one-off tasks",
                  "You want a free tier for basic use",
                  "You need to browse the web or use plugins",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                    <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: "#22c55e" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl border p-7"
              style={{ borderColor: "rgba(224,120,48,0.35)", background: "rgba(224,120,48,0.04)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                Scribtly is better when
              </p>
              <ul className="space-y-2">
                {[
                  "You write scripts for multiple clients regularly",
                  "You need platform-specific structure (YouTube, TikTok, Reels)",
                  "You want to save a client's voice and reuse it every time",
                  "You need scripts organised by client and platform",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                    <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            The real problem with using ChatGPT for client scripts
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            ChatGPT is a remarkable tool for general-purpose writing. But when you are writing video scripts for multiple clients, you will hit the same friction point every single session: you have to re-explain everything.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            You paste in the client's brand brief. You explain their tone. You remind it which platform the script is for. You clarify the hook format, the CTA style, the audience. Then you prompt for the script, review it, and correct the parts that do not sound right.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            That setup cost adds up fast when you are writing scripts for five or ten clients a week. And even after careful prompting, the output often still sounds more like a blog post than a video script built for a specific platform and audience.
          </p>

          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            What Scribtly does differently
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Scribtly is built around a simple idea: save the client's voice once, then use it every time.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            When you set up a client profile, you define their niche, tone, typical audience, preferred phrases, and style. Every script you generate for that client pulls from that profile automatically. You do not have to explain anything again.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            On top of that, Scribtly applies platform-specific structure. A{" "}
            <Link href="/youtube-script-generator" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
              YouTube script
            </Link>{" "}
            gets a hook, intro, body sections, and an end-screen CTA. A{" "}
            <Link href="/tiktok-script-generator" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
              TikTok script
            </Link>{" "}
            gets a fast hook, tight body, and a direct call to action — in the right format for the platform. You choose the platform, and the structure is applied without any extra prompting.
          </p>

          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Why freelancers stop using ChatGPT for client scripts
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The pattern is common. A freelance script writer starts using ChatGPT because it is quick and flexible. They build a system of prompts they copy and paste. It works, but it never quite feels efficient.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Over time, the friction accumulates. They spend 10–15 minutes per client just setting up each session. Scripts come back sounding generic until they are edited heavily. Clients start asking for changes to the tone. The revision cycle grows.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            A dedicated tool like Scribtly addresses that workflow problem directly. It is not about the underlying AI being better — it is about the system around it being built specifically for client script delivery.
          </p>

          {/* Mid CTA */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{ borderColor: "rgba(224,120,48,0.3)", background: "rgba(224,120,48,0.05)" }}
          >
            <p className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
              Stop re-explaining your clients to ChatGPT every session.
            </p>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
              Save each client's voice once in Scribtly and generate platform-native scripts in under 60 seconds. Supports YouTube, TikTok, Reels, LinkedIn video, podcasts, and more.
            </p>
            <a
              href="https://app.scribtly.com/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free
              <ArrowRight size={14} />
            </a>
          </div>

          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Where ChatGPT still makes sense
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            ChatGPT is the right tool when your needs are broad and varied. If you use AI for research, drafting emails, summarising documents, writing code, and occasionally a video script, ChatGPT's general-purpose nature is its strength.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            It is also useful for experimentation. If you are trying out different script styles, formats, or ideas — not producing finished client work — the flexibility of ChatGPT gives you more room to explore without constraints.
          </p>

          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Where Scribtly is the better choice
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Scribtly is built for volume and consistency. If you are a{" "}
            <Link href="/for-freelancers" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
              freelance script writer
            </Link>{" "}
            producing work for multiple clients, a{" "}
            <Link href="/for-agencies" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
              content agency
            </Link>{" "}
            handling several brand voices, or a{" "}
            <Link href="/for-social-media-managers" className="underline underline-offset-2" style={{ color: "var(--accent)" }}>
              social media manager
            </Link>{" "}
            writing platform-specific content regularly, Scribtly is designed around your workflow.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            The combination of saved client profiles, platform-specific structure, and organised script history means you spend your time on creative decisions, not on setup and prompt management.
          </p>
        </div>
      </section>

      {/* Feature comparison table */}
      <section
        className="border-t py-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text-primary)" }}>
            Feature comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm" style={{ background: "var(--bg-base)" }}>
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th
                    className="text-left p-4 font-semibold"
                    style={{ color: "var(--text-muted)", width: "55%" }}
                  >
                    Feature
                  </th>
                  <th
                    className="text-center p-4 font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    Scribtly
                  </th>
                  <th
                    className="text-center p-4 font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ChatGPT
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className="border-b last:border-0"
                    style={{
                      borderColor: "var(--border)",
                      background: i % 2 === 0 ? "var(--bg-base)" : "var(--bg-subtle)",
                    }}
                  >
                    <td className="p-4" style={{ color: "var(--text-primary)" }}>
                      {row.feature}
                    </td>
                    <td className="p-4 text-center">
                      <IconCell value={row.scribtly} />
                    </td>
                    <td className="p-4 text-center">
                      <IconCell value={row.chatgpt} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-4 text-center" style={{ color: "var(--text-muted)" }}>
            Features may change. Always verify current capabilities on each platform.
          </p>
        </div>
      </section>

      {/* Common mistakes section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Common mistakes when using ChatGPT for client scripts
          </h2>
          <div className="space-y-5">
            {[
              {
                title: "Using the same generic prompt for every client",
                body: "ChatGPT does not know your client's brand unless you tell it. A generic prompt produces a generic script. If you are not customising the input heavily, you are not getting client-ready output.",
              },
              {
                title: "Skipping platform structure",
                body: "A YouTube script and a TikTok script are not the same thing. YouTube viewers tolerate a longer hook. TikTok demands the first second. If you prompt ChatGPT without specifying platform structure, you usually get something closer to a blog post than a video script.",
              },
              {
                title: "Treating the first draft as the final output",
                body: "AI-generated scripts need editing. The first draft sets the structure and gets the ideas down, but tone, pacing, and authenticity usually need a human pass before you deliver to a client.",
              },
              {
                title: "Not saving client context between sessions",
                body: "ChatGPT's default memory behaviour means you lose context when you close the tab. Without a saved system, you are starting from scratch every time — which is exactly the problem tools like Scribtly are built to solve.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t py-16"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
              Frequently asked questions
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
                >
                  <h3 className="font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Also compare */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
            Also worth comparing
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Scribtly vs Jasper", href: "/compare/scribtly-vs-jasper" },
              { label: "Scribtly vs Copy.ai", href: "/compare/scribtly-vs-copy-ai" },
              { label: "Scribtly vs Notion AI", href: "/compare/scribtly-vs-notion-ai" },
              { label: "Best AI Script Writers", href: "/best-ai-script-writers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg border text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)", background: "var(--bg-subtle)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-24"
        style={{ background: "var(--dark)" }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
            Ready to write client scripts without starting from scratch?
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Save your client's voice once. Generate platform-native scripts in under 60 seconds. Supports YouTube, TikTok, Instagram Reels, LinkedIn video, podcasts, and video ads.
          </p>
          <a
            href="https://app.scribtly.com/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Start free — 5 scripts included
            <ArrowRight size={16} />
          </a>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No credit card required. Cancel any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/" className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            Scribtly
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/compare" className="hover:underline">Compare</Link>
          </div>
          <span>© 2026 Scribtly. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

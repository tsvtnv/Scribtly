import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scribtly vs ChatGPT for Script Writing | Which Is Better?",
  description:
    "Comparing Scribtly and ChatGPT for client script writing. See which tool saves more time when you write scripts for multiple clients.",
  openGraph: {
    title: "Scribtly vs ChatGPT for Script Writing",
    description:
      "Comparing Scribtly and ChatGPT for client script writing. See which tool saves more time when you write scripts for multiple clients.",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Scribtly vs ChatGPT for Script Writing: Which Is Better for Client Work?",
      description:
        "A practical comparison of Scribtly and ChatGPT for freelancers and agencies that write video scripts for clients.",
      author: { "@type": "Organization", name: "Scribtly" },
      publisher: { "@type": "Organization", name: "Scribtly", url: "https://scribtly.com" },
      datePublished: "2026-06-18",
      dateModified: "2026-06-18",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://scribtly.com" },
        { "@type": "ListItem", position: 2, name: "Compare", item: "https://scribtly.com/compare" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Scribtly vs ChatGPT",
          item: "https://scribtly.com/compare/scribtly-vs-chatgpt",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can ChatGPT write video scripts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, ChatGPT can produce video scripts if you provide the right prompt. The limitation is that it has no built-in memory between sessions, so you need to re-explain client tone, audience, and platform structure every time. For one-off scripts this is fine; for ongoing client work it becomes repetitive.",
          },
        },
        {
          "@type": "Question",
          name: "What is the main difference between Scribtly and ChatGPT for script writing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly is purpose-built for script writing. It lets you save a client voice profile once — covering tone, niche, audience, and brand phrases — then generates scripts that match that profile without re-explaining it. ChatGPT is a general-purpose assistant with no persistent client context unless you build and paste a prompt every time.",
          },
        },
        {
          "@type": "Question",
          name: "Does Scribtly use ChatGPT under the hood?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scribtly is a dedicated script writing platform with its own AI model integrations and workflow, built specifically for client script production. It is not a wrapper around ChatGPT.",
          },
        },
        {
          "@type": "Question",
          name: "Is ChatGPT free compared to Scribtly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChatGPT has a free tier with limited features and paid plans. Scribtly offers a free plan to get started. For the latest pricing on both tools, check each product's pricing page directly.",
          },
        },
        {
          "@type": "Question",
          name: "Which tool is better for agencies writing scripts for multiple clients?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For agencies managing scripts across multiple clients, Scribtly is more practical. Each client's voice profile is saved and reusable, so your team generates consistent scripts without rebuilding prompts from scratch each session.",
          },
        },
      ],
    },
  ],
};

export default function ScribtlyVsChatGPT() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        {/* Nav */}
        <nav
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <Link href="/" className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
            Scribtly
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Pricing
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium px-4 py-2 rounded-lg"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Try free
            </Link>
          </div>
        </nav>

        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="max-w-3xl mx-auto px-6 pt-6">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              <Link href="/" style={{ color: "var(--text-muted)" }}>
                Home
              </Link>{" "}
              /{" "}
              <Link href="/compare" style={{ color: "var(--text-muted)" }}>
                Compare
              </Link>{" "}
              / Scribtly vs ChatGPT
            </p>
          </div>

          {/* Hero */}
          <section className="max-w-3xl mx-auto px-6 pt-10 pb-12">
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Scribtly vs ChatGPT{" "}
              <span style={{ color: "var(--accent)" }}>for Script Writing</span>
            </h1>
            <p className="mt-4 text-lg max-w-2xl" style={{ color: "var(--text-muted)" }}>
              Both tools can produce a script. The difference is what happens when you are writing
              scripts for ten clients, week after week, and none of them should sound the same.
            </p>

            {/* Soft CTA */}
            <div
              className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl border"
              style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
            >
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                See how Scribtly handles client voice profiles
              </span>
              <Link
                href="/signup"
                className="text-sm font-semibold px-4 py-2 rounded-lg"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                Start free
              </Link>
            </div>
          </section>

          {/* The core problem */}
          <section
            className="py-12"
            style={{ background: "var(--bg-subtle)" }}
          >
            <div className="max-w-3xl mx-auto px-6">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                The problem with using ChatGPT for client scripts
              </h2>
              <p className="mb-4" style={{ color: "var(--text-muted)" }}>
                ChatGPT is a powerful general-purpose tool. When you open a new session, it knows
                nothing about your client. You have to paste in the brief, the tone, the niche, the
                audience, the platform requirements, and any do-not-say phrases — every single time.
              </p>
              <p className="mb-4" style={{ color: "var(--text-muted)" }}>
                If you write scripts for two or three clients, that is manageable. If you write for
                ten or twenty, or you run an agency where multiple team members produce scripts,
                that context-resetting overhead adds up fast.
              </p>
              <p style={{ color: "var(--text-muted)" }}>
                The scripts often still sound like AI, too. Without careful prompting, ChatGPT
                defaults to a generic, polished tone that does not match the raw energy of a TikTok
                creator or the specific vocabulary a brand has spent years building.
              </p>
            </div>
          </section>

          {/* What makes Scribtly different */}
          <section className="max-w-3xl mx-auto px-6 py-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What Scribtly does differently
            </h2>
            <p className="mb-6" style={{ color: "var(--text-muted)" }}>
              Scribtly is built specifically for writing scripts for clients. The core idea is
              simple: save a client&apos;s voice profile once, then generate scripts that match it
              every time — without rebuilding the prompt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: "Saved client voice profiles",
                  body: "Store each client's tone, niche, audience, brand phrases, and style once. Every script you generate picks it up automatically.",
                },
                {
                  title: "Platform-native structure",
                  body: "Scripts are built for the platform: YouTube hooks and CTAs, TikTok scroll-stoppers, Reels structure, LinkedIn video, podcast intros, and video ads.",
                },
                {
                  title: "Organised by client",
                  body: "All scripts for each client live in one place. No digging through ChatGPT chat history or shared Google Docs to find last week's draft.",
                },
                {
                  title: "First draft in under 60 seconds",
                  body: "Select a client, choose a platform, describe the topic. Scribtly generates a structured first draft — hook, body, CTA, and B-roll notes where relevant.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)" }}
                >
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Mid CTA */}
          <section
            className="py-12"
            style={{ background: "var(--accent)" }}
          >
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Stop re-explaining your client&apos;s voice to an AI
              </h2>
              <p className="text-white/80 mb-6">
                Save each client&apos;s profile once. Generate scripts that sound like them — not
                like generic AI.
              </p>
              <Link
                href="/signup"
                className="inline-block px-6 py-3 rounded-xl font-semibold"
                style={{ background: "#fff", color: "var(--accent)" }}
              >
                Generate your first client script free
              </Link>
            </div>
          </section>

          {/* Side-by-side workflow */}
          <section className="max-w-3xl mx-auto px-6 py-12">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              The workflow difference in practice
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ChatGPT workflow */}
              <div
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--border)" }}
              >
                <h3
                  className="font-bold text-lg mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Writing a client script in ChatGPT
                </h3>
                <ol className="space-y-3">
                  {[
                    "Open a new ChatGPT chat",
                    "Paste your client context (tone, niche, audience, brand rules)",
                    "Add the platform requirements (e.g. TikTok hook format, 60 seconds max)",
                    "Describe the video topic",
                    "Review the output — likely too polished or too generic",
                    "Iterate with follow-up prompts until it sounds right",
                    "Copy into your delivery doc",
                    "Repeat this entire process next week for the same client",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold"
                        style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Scribtly workflow */}
              <div
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--accent)", borderWidth: "2px" }}
              >
                <h3
                  className="font-bold text-lg mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Writing a client script in Scribtly
                </h3>
                <ol className="space-y-3">
                  {[
                    "Select the client from your saved profiles",
                    "Choose the platform (YouTube, TikTok, Reels, LinkedIn, etc.)",
                    "Type the video topic",
                    "Generate — hook, body, CTA, and B-roll notes already structured",
                    "Edit the draft if needed",
                    "Deliver to the client",
                    "Next week: start from step 1 — no re-explaining needed",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold"
                        style={{ background: "var(--accent)", color: "#fff" }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* When to use each */}
          <section
            className="py-12"
            style={{ background: "var(--bg-subtle)" }}
          >
            <div className="max-w-3xl mx-auto px-6">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                When to use each tool
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ChatGPT makes sense when
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "You are experimenting with a new script format or style",
                      "You need a one-off script for a topic you won't revisit",
                      "You already have a well-crafted prompt library that you maintain yourself",
                      "The task is not script-specific (research, editing notes, email drafts)",
                    ].map((item) => (
                      <li key={item} className="flex gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <span style={{ color: "var(--text-muted)" }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Scribtly is better when
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "You write scripts for multiple clients on a recurring basis",
                      "You need consistent brand voice across five, ten, or twenty videos per client",
                      "You run an agency and multiple people write for the same clients",
                      "You want scripts structured for a specific platform from the start",
                      "You need to produce more scripts without working more hours",
                    ].map((item) => (
                      <li key={item} className="flex gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <span style={{ color: "var(--accent)" }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Who each tool is designed for */}
          <section className="max-w-3xl mx-auto px-6 py-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Who each tool is designed for
            </h2>
            <p className="mb-4" style={{ color: "var(--text-muted)" }}>
              ChatGPT is a general-purpose assistant. It is outstanding at a huge range of tasks
              but it is not built for script writing workflows. There is no concept of a client
              profile, no platform-specific structure, and no way to organise output by client or
              project.
            </p>
            <p className="mb-4" style={{ color: "var(--text-muted)" }}>
              Scribtly is built for freelancers, content creators, social media managers, agencies,
              and marketing teams who write video scripts regularly. The entire product is designed
              around one workflow: save a client&apos;s voice once, generate client-ready scripts
              faster, deliver more without scaling your hours.
            </p>
            <p style={{ color: "var(--text-muted)" }}>
              If script writing is a core part of your work — not an occasional task — a
              purpose-built tool will save you time that compounds week over week.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Freelance script writers",
                  href: "/use-cases/freelancers",
                  desc: "Manage multiple clients without losing their individual voices.",
                },
                {
                  label: "Content agencies",
                  href: "/use-cases/agencies",
                  desc: "Scale script production across your whole client roster.",
                },
                {
                  label: "Social media managers",
                  href: "/use-cases/social-media-managers",
                  desc: "Generate platform-ready scripts for every channel your clients are on.",
                },
              ].map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className="rounded-xl border p-5 block hover:border-current transition-colors"
                  style={{ borderColor: "var(--border)" }}
                >
                  <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                    {card.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {card.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Common mistakes */}
          <section
            className="py-12"
            style={{ background: "var(--bg-subtle)" }}
          >
            <div className="max-w-3xl mx-auto px-6">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Common mistakes when using ChatGPT for client scripts
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "Using the same generic prompt for every client",
                    body: "Output ends up sounding identical regardless of the client. Audiences and brand managers notice.",
                  },
                  {
                    title: "Forgetting to include platform constraints",
                    body: "A YouTube script and a 30-second Reel script have completely different structures. Without specifying this, ChatGPT defaults to a generic format.",
                  },
                  {
                    title: "Trusting the output without editing",
                    body: "AI-generated first drafts — from any tool — need a human pass. The goal is a faster first draft, not a hands-off process.",
                  },
                  {
                    title: "Losing context between sessions",
                    body: "Without a saved profile, each new ChatGPT session starts from zero. You spend the first few minutes just getting the tool back up to speed.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                      style={{ background: "var(--border)", color: "var(--text-muted)" }}
                    >
                      !
                    </span>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Internal links section */}
          <section className="max-w-3xl mx-auto px-6 py-12">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Explore Scribtly&apos;s script tools
            </h2>
            <p className="mb-6" style={{ color: "var(--text-muted)" }}>
              Scribtly generates platform-native scripts across every major video channel your
              clients publish on.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "YouTube Script Generator", href: "/youtube-script-generator" },
                { label: "TikTok Script Generator", href: "/tiktok-script-generator" },
                { label: "Instagram Reels Scripts", href: "/reels-script-generator" },
                { label: "LinkedIn Video Scripts", href: "/linkedin-video-script-generator" },
                { label: "Podcast Script Generator", href: "/podcast-script-generator" },
                { label: "Video Ad Script Generator", href: "/video-ad-script-generator" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border px-4 py-3 text-sm font-medium text-center"
                  style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section
            className="py-12"
            style={{ background: "var(--bg-subtle)" }}
          >
            <div className="max-w-3xl mx-auto px-6">
              <h2
                className="text-2xl font-bold mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Can ChatGPT write video scripts?",
                    a: "Yes, ChatGPT can produce video scripts if you provide the right prompt. The limitation is that it has no built-in memory between sessions, so you need to re-explain client tone, audience, and platform structure every time. For one-off scripts this is fine; for ongoing client work it becomes repetitive.",
                  },
                  {
                    q: "What is the main difference between Scribtly and ChatGPT for script writing?",
                    a: "Scribtly is purpose-built for script writing. It lets you save a client voice profile once — covering tone, niche, audience, and brand phrases — then generates scripts that match that profile without re-explaining it. ChatGPT is a general-purpose assistant with no persistent client context unless you build and paste a prompt every time.",
                  },
                  {
                    q: "Does Scribtly use ChatGPT under the hood?",
                    a: "Scribtly is a dedicated script writing platform with its own AI model integrations and workflow, built specifically for client script production. It is not a wrapper around ChatGPT.",
                  },
                  {
                    q: "Is ChatGPT free compared to Scribtly?",
                    a: "ChatGPT has a free tier with limited features and paid plans. Scribtly offers a free plan to get started. For the latest pricing on both tools, check each product's pricing page directly.",
                  },
                  {
                    q: "Which tool is better for agencies writing scripts for multiple clients?",
                    a: "For agencies managing scripts across multiple clients, Scribtly is more practical. Each client's voice profile is saved and reusable, so your team generates consistent scripts without rebuilding prompts from scratch each session.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="border-b pb-6" style={{ borderColor: "var(--border)" }}>
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {faq.q}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Ready to stop re-explaining your clients to an AI?
            </h2>
            <p className="mb-6 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Save each client&apos;s voice profile once in Scribtly. Generate platform-native
              scripts in under 60 seconds — every time.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-white text-lg"
              style={{ background: "var(--accent)" }}
            >
              Try Scribtly free — no card required
            </Link>
            <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
              Free plan includes 5 scripts.{" "}
              <Link href="/pricing" style={{ color: "var(--accent)" }}>
                See pricing
              </Link>
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer
          className="px-6 py-8 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
            style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="font-bold" style={{ color: "var(--text-primary)" }}>
              Scribtly
            </Link>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/blog" style={{ color: "var(--text-muted)" }}>Blog</Link>
              <Link href="/pricing" style={{ color: "var(--text-muted)" }}>Pricing</Link>
              <Link href="/compare" style={{ color: "var(--text-muted)" }}>Compare</Link>
              <Link href="/templates" style={{ color: "var(--text-muted)" }}>Templates</Link>
              <Link href="/use-cases/freelancers" style={{ color: "var(--text-muted)" }}>For Freelancers</Link>
              <Link href="/use-cases/agencies" style={{ color: "var(--text-muted)" }}>For Agencies</Link>
            </div>
            <span>© 2026 Scribtly</span>
          </div>
        </footer>
      </div>
    </>
  );
}

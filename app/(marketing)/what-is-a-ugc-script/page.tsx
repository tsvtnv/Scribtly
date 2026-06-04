import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Sparkles,
  Video,
  Users,
  ShoppingBag,
  Clock,
  CheckCircle,
  Mic,
} from "lucide-react";

export const metadata = {
  title: "What is a UGC script? (Definition + examples)",
  description:
    "A UGC script is a short ad script written to sound like an authentic creator review. Learn what makes UGC scripts work and how to write them faster.",
  keywords: [
    "what is a ugc script",
    "ugc script examples",
    "how to write a ugc script",
    "ugc content script",
    "ugc creator script",
    "ugc ad script",
    "user generated content script",
    "ugc script template",
  ],
  alternates: { canonical: "/what-is-a-ugc-script" },
  openGraph: {
    type: "website",
    url: "/what-is-a-ugc-script",
    siteName: "Scribtly",
    title: "What is a UGC script? (Definition + examples) · Scribtly",
    description:
      "A UGC script is a short ad script written to sound like an authentic creator review. Learn what makes UGC scripts work and how to write them faster.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "What is a UGC script?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a UGC script? (Definition + examples) · Scribtly",
    description:
      "A UGC script is a short ad script written to sound like an authentic creator review. Learn what makes UGC scripts work and how to write them faster.",
    images: ["/opengraph-image"],
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
      name: "What Is a UGC Script?",
      item: `${SITE_URL}/what-is-a-ugc-script`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a UGC script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A UGC script is a short video ad script written to sound like an authentic, first-person recommendation from a real creator or customer. Brands use UGC-style content in paid ads because it performs better than polished brand ads — it feels more genuine. The script is usually 15–60 seconds and follows a simple structure: hook, problem, solution, CTA.",
      },
    },
    {
      "@type": "Question",
      name: "What does UGC stand for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UGC stands for User-Generated Content. In marketing, it originally referred to organic content created by real customers or fans. Today, UGC content also includes paid creator content that is designed to mimic the look and feel of authentic user posts — these are sometimes called UGC ads or native ads.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a UGC script be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most UGC scripts are 15–60 seconds. For TikTok and Instagram Reels, 15–30 seconds is the sweet spot. For Facebook and YouTube pre-roll ads, 30–60 seconds is more common. The exact length depends on the brand's ad budget and where the content will be placed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the structure of a UGC script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most UGC scripts follow a four-part structure: (1) Hook — stop the scroll in the first 1–3 seconds; (2) Problem — name the pain point the product solves; (3) Solution — introduce the product naturally and explain what it does; (4) CTA — tell the viewer what to do next. Some scripts add a 'proof' section between the solution and CTA to include a quick result or testimonial.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI write UGC scripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tools like Scribtly can generate UGC-style ad scripts quickly. Because Scribtly lets you save a brand or client voice profile, the scripts it generates can match a specific tone — rather than sounding like generic AI copy. This is useful for UGC creators who need to produce scripts for multiple brands, and for agencies managing UGC campaigns at volume.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between UGC and influencer marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Influencer marketing involves paying a creator to promote a product to their own audience. UGC is about creating content that the brand owns and can run as a paid ad — regardless of whether the creator has a big following. UGC creators are paid for the content itself, not for their audience reach. Brands use UGC ads in their own ad accounts, usually targeting cold audiences.",
      },
    },
  ],
};

const scriptStructure = [
  {
    icon: Sparkles,
    label: "Hook",
    timing: "0–3 sec",
    desc: "Stop the scroll. Open with a bold claim, a relatable problem, or a surprising visual. The viewer decides whether to keep watching in the first breath.",
    example: `"I've tried every protein powder on the market — this is the only one I actually keep buying."`,
  },
  {
    icon: Users,
    label: "Problem",
    timing: "3–10 sec",
    desc: "Name the pain point the product solves. Keep it specific. The more accurately it mirrors what the viewer already feels, the more it resonates.",
    example: '"Most of them taste like chalk and bloat me within an hour. I was ready to give up."',
  },
  {
    icon: ShoppingBag,
    label: "Solution",
    timing: "10–35 sec",
    desc: "Introduce the product naturally — as if you discovered it yourself. Explain what it does and why it is different. Show it if possible. Keep the language conversational.",
    example: '"Then a friend recommended [Brand]. It actually mixes clean, doesn\'t spike my stomach, and the flavour is genuinely good. I\'ve been using it for three months."',
  },
  {
    icon: CheckCircle,
    label: "Proof",
    timing: "35–45 sec",
    desc: "Optional but powerful. Add a quick result, a stat, or a brief social-proof moment. This is where you turn a recommendation into a reason to believe.",
    example: '"I\'ve lost 4kg since I switched and I actually look forward to drinking it."',
  },
  {
    icon: Mic,
    label: "CTA",
    timing: "45–60 sec",
    desc: "Tell the viewer exactly what to do. One action only — visit the link, use the code, tap below. Soft CTAs often perform better than hard-sell ones in UGC content.",
    example: '"The link is in my bio — they also have a 10% off code if you want to try it."',
  },
];

const faqs = [
  {
    q: "What is a UGC script?",
    a: "A UGC script is a short video ad script written to sound like an authentic, first-person recommendation from a real creator or customer. Brands use UGC-style content in paid ads because it performs better than polished brand ads — it feels more genuine. The script is usually 15–60 seconds and follows a simple structure: hook, problem, solution, CTA.",
  },
  {
    q: "What does UGC stand for?",
    a: "UGC stands for User-Generated Content. In marketing, it originally referred to organic content created by real customers or fans. Today, UGC content also includes paid creator content that is designed to mimic the look and feel of authentic user posts — these are sometimes called UGC ads or native ads.",
  },
  {
    q: "How long should a UGC script be?",
    a: "Most UGC scripts are 15–60 seconds. For TikTok and Instagram Reels, 15–30 seconds is the sweet spot. For Facebook and YouTube pre-roll ads, 30–60 seconds is more common. The exact length depends on the brand's ad budget and where the content will be placed.",
  },
  {
    q: "What is the structure of a UGC script?",
    a: "Most UGC scripts follow a four-part structure: (1) Hook — stop the scroll in the first 1–3 seconds; (2) Problem — name the pain point the product solves; (3) Solution — introduce the product naturally and explain what it does; (4) CTA — tell the viewer what to do next. Some scripts add a 'proof' section between the solution and CTA to include a quick result or testimonial.",
  },
  {
    q: "Can AI write UGC scripts?",
    a: "Yes. Tools like Scribtly can generate UGC-style ad scripts quickly. Because Scribtly lets you save a brand or client voice profile, the scripts it generates can match a specific tone — rather than sounding like generic AI copy. This is useful for UGC creators who need to produce scripts for multiple brands, and for agencies managing UGC campaigns at volume.",
  },
  {
    q: "What is the difference between UGC and influencer marketing?",
    a: "Influencer marketing involves paying a creator to promote a product to their own audience. UGC is about creating content that the brand owns and can run as a paid ad — regardless of whether the creator has a big following. UGC creators are paid for the content itself, not for their audience reach. Brands use UGC ads in their own ad accounts, usually targeting cold audiences.",
  },
];

export default function WhatIsAUGCScriptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-hair border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,119,221,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute top-[-60px] left-[-40px] w-[340px] h-[340px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-30px] w-[260px] h-[260px] rounded-full bg-[#38c172]/10 blur-[70px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-hair border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs text-primary backdrop-blur">
            <Sparkles size={11} />
            Scribtly Glossary
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            What is a UGC script?
          </h1>
          <p className="text-base text-text-secondary dark:text-dark-muted mt-5 max-w-xl mx-auto leading-relaxed">
            A UGC script is a short ad script written to sound like an authentic, first-person creator recommendation. It is one of the most in-demand formats in paid social advertising — and one of the fastest-growing services freelance creators can offer.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.3)]">
                Generate UGC scripts with Scribtly <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
            <Link href="/video-ad-scripts">
              <Button size="lg" variant="outline">See video ad scripts</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          The definition
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          <strong>UGC</strong> stands for User-Generated Content. In its original sense, it describes organic content — reviews, unboxings, testimonials — created by real customers without payment. But in modern paid social advertising, UGC has taken on a second meaning.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
          Today, a <strong>UGC script</strong> is a short video ad script written to sound like a genuine, first-person creator recommendation — even when it is produced by a paid creator or freelancer on behalf of a brand. Brands commission UGC-style content because it outperforms traditional polished ads in most paid social environments. The authenticity of the format drives trust, and trust drives conversions.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
          A UGC script is typically 15 to 60 seconds long, delivered direct-to-camera or as a talking head video, and follows a tight structure: hook, problem, solution, and call to action. The goal is to get the viewer to believe the creator is genuinely sharing a discovery — not reciting a sales pitch.
        </p>
      </section>

      {/* Why UGC works */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            Why UGC content outperforms traditional ads
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Most viewers have become expert at ignoring polished brand ads. They recognise the studio lighting, the branded lower thirds, the scripted spokesperson, and they scroll straight past. UGC content interrupts that pattern because it looks like normal social content — it blends into the feed.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            The key driver is <strong>perceived authenticity</strong>. When a viewer watches someone speaking directly to camera in a casual setting, their brain processes it as a personal recommendation rather than an advertisement. That shift in perception significantly lowers resistance to the message.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            For brands running TikTok, Instagram Reels, or Facebook ads, UGC-style creatives often generate lower cost-per-click and higher conversion rates than equivalent studio-produced ads. This is why the demand for freelance UGC creators — people who can film themselves delivering a convincing, scripted recommendation — has grown quickly.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            For <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelance creators</Link>, this is a meaningful commercial opportunity. Brands pay between £100 and £500 per UGC video in most markets, and the primary skill they are paying for is the ability to deliver a natural, scripted performance — which starts with a well-written script.
          </p>
        </div>
      </section>

      {/* Script structure */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-3">
          The UGC script structure
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted text-center mb-10 max-w-xl mx-auto">
          Most effective UGC scripts follow a five-part structure. Each section has a specific job. Skipping or rushing any section is the most common reason UGC scripts fail to convert.
        </p>
        <div className="space-y-4">
          {scriptStructure.map((section, i) => (
            <div
              key={section.label}
              className="flex gap-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-primary/30 transition-colors duration-150"
            >
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center">
                  <section.icon size={16} className="text-primary" />
                </div>
                <span className="text-xs font-semibold text-primary tabular-nums">{i + 1}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{section.label}</h3>
                  <span className="text-xs text-text-secondary dark:text-dark-muted border border-[var(--color-border)] rounded-full px-2 py-0.5 flex items-center gap-1">
                    <Clock size={10} />
                    {section.timing}
                  </span>
                </div>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-3">
                  {section.desc}
                </p>
                <p className="text-xs font-mono text-primary/80 bg-[var(--color-primary-tint)] rounded-lg px-3 py-2 leading-relaxed">
                  {section.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Soft CTA */}
      <section className="max-w-3xl mx-auto px-5 pb-4">
        <div className="rounded-xl border border-primary/30 bg-[var(--color-primary-tint)] p-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
            Stop writing UGC scripts from scratch
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            Scribtly generates UGC-style ad scripts with platform-native structure — hook, problem, solution, CTA — in your client's saved voice. No blank page, no generic output. See how it works for{" "}
            <Link href="/video-ad-scripts" className="text-primary underline underline-offset-2">
              video ad scripts
            </Link>
            ,{" "}
            <Link href="/tiktok-scripts" className="text-primary underline underline-offset-2">
              TikTok scripts
            </Link>
            , and{" "}
            <Link href="/instagram-reels-scripts" className="text-primary underline underline-offset-2">
              Instagram Reels scripts
            </Link>
            .
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
              Generate 5 scripts free <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Full example script */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          A full UGC script example
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-muted mb-8 leading-relaxed">
          Here is a realistic 30-second UGC script for a skincare brand. Notice how each section flows naturally into the next — there are no obvious transitions, no "in this video I'll talk about," no branded language that breaks the authentic feel.
        </p>

        <Card className="font-mono text-sm leading-relaxed space-y-4 p-6">
          <div>
            <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Hook (0–3 sec)</span>
            <p className="text-text-secondary dark:text-dark-muted">"I've spent £400 on skincare this year and honestly most of it went straight in the bin. Until I found this."</p>
          </div>
          <div className="border-t border-[var(--color-border)] pt-4">
            <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Problem (3–10 sec)</span>
            <p className="text-text-secondary dark:text-dark-muted">"My skin is combination — oily in the morning, dry by the afternoon. Everything either broke me out or dried me out completely."</p>
          </div>
          <div className="border-t border-[var(--color-border)] pt-4">
            <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Solution (10–22 sec)</span>
            <p className="text-text-secondary dark:text-dark-muted">"This serum from [Brand] is different. It's lightweight, absorbs in seconds, and doesn't sit heavy on my skin. I've been using it morning and night for six weeks and I genuinely notice a difference."</p>
          </div>
          <div className="border-t border-[var(--color-border)] pt-4">
            <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">Proof (22–27 sec)</span>
            <p className="text-text-secondary dark:text-dark-muted">"I've had three people ask what I'm doing differently. That's never happened before."</p>
          </div>
          <div className="border-t border-[var(--color-border)] pt-4">
            <span className="text-xs font-sans font-semibold text-primary uppercase tracking-wider block mb-2">CTA (27–30 sec)</span>
            <p className="text-text-secondary dark:text-dark-muted">"Link in bio — and they've got a starter set if you want to try it first."</p>
          </div>
        </Card>
      </section>

      {/* UGC vs influencer */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            UGC vs influencer marketing: what is the difference?
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
            The two are often confused, but they serve different commercial purposes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--color-border)] p-5">
              <h3 className="font-semibold mb-3 text-primary">UGC creator</h3>
              <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-muted">
                <li className="flex gap-2"><CheckCircle size={14} className="text-primary mt-0.5 flex-shrink-0" /> Paid to produce content the brand owns</li>
                <li className="flex gap-2"><CheckCircle size={14} className="text-primary mt-0.5 flex-shrink-0" /> No audience size requirement</li>
                <li className="flex gap-2"><CheckCircle size={14} className="text-primary mt-0.5 flex-shrink-0" /> Brand runs the content as a paid ad</li>
                <li className="flex gap-2"><CheckCircle size={14} className="text-primary mt-0.5 flex-shrink-0" /> Content targets cold audiences</li>
                <li className="flex gap-2"><CheckCircle size={14} className="text-primary mt-0.5 flex-shrink-0" /> Paid per deliverable (per video)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] p-5">
              <h3 className="font-semibold mb-3">Influencer marketer</h3>
              <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-muted">
                <li className="flex gap-2"><Video size={14} className="text-text-secondary mt-0.5 flex-shrink-0" /> Paid to promote to their own followers</li>
                <li className="flex gap-2"><Video size={14} className="text-text-secondary mt-0.5 flex-shrink-0" /> Audience size determines rate</li>
                <li className="flex gap-2"><Video size={14} className="text-text-secondary mt-0.5 flex-shrink-0" /> Content posts to creator's channel</li>
                <li className="flex gap-2"><Video size={14} className="text-text-secondary mt-0.5 flex-shrink-0" /> Content reaches existing warm audience</li>
                <li className="flex gap-2"><Video size={14} className="text-text-secondary mt-0.5 flex-shrink-0" /> Paid per post or per campaign</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mt-6">
            Many creators now do both. But the skills overlap differently. Influencer work leans on reach and audience relationship. UGC work leans on the ability to deliver a convincing, scripted performance — which means the <strong>script matters more</strong> in UGC than in organic influencer content.
          </p>
        </div>
      </section>

      {/* Mistakes */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
          Common UGC script mistakes to avoid
        </h2>
        <div className="space-y-5">
          {[
            {
              title: "Starting with the product name",
              desc: "Opening with 'So I've been using [Brand] and...' tells the viewer immediately this is an ad. Start with the hook — a relatable statement about the problem — before any product mention.",
            },
            {
              title: "Writing like a press release",
              desc: "Phrases like 'innovative formula' or 'cutting-edge technology' break the authentic tone immediately. UGC scripts should sound like a person talking to a friend. Write conversationally, then read it aloud to check.",
            },
            {
              title: "Skipping the problem section",
              desc: "Jumping straight from the hook to the product removes the emotional payoff. The problem section is what makes the viewer feel understood. Without it, the solution has no weight.",
            },
            {
              title: "Using a vague CTA",
              desc: "\"Check it out\" or \"you can find it online\" do not give the viewer a specific action. Name exactly what to do: tap the link in bio, use the discount code, swipe up. One action only.",
            },
            {
              title: "Making the script too long",
              desc: "A UGC script that runs over 60 seconds loses most viewers before the CTA. If you cannot say it in 60 seconds, cut the proof section first. The hook, problem, solution, and CTA are non-negotiable.",
            },
          ].map((m) => (
            <div key={m.title} className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-xs font-bold">✕</div>
              <div>
                <h3 className="font-semibold mb-1">{m.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Where Scribtly fits */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
            How Scribtly helps with UGC scripts
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            UGC scripts are short, structured, and highly repeatable. They follow the same framework across almost every category — which makes them well-suited for a generation tool that knows the format.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Scribtly generates UGC-style ad scripts as part of its <Link href="/video-ad-scripts" className="text-primary underline underline-offset-2">video ad scripts</Link> feature. You give it the brand, the product, the audience, and the platform — and it produces a complete script with hook, problem, solution, proof, and CTA already structured.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-4">
            Where Scribtly goes further is the <strong>client voice profile</strong>. When you save a brand's tone, target audience, and preferred language, the scripts Scribtly generates stay consistent with that brand across every deliverable. For <Link href="/for-agencies" className="text-primary underline underline-offset-2">agencies</Link> running UGC campaigns for multiple clients, this means not re-briefing the system each time. For <Link href="/for-freelancers" className="text-primary underline underline-offset-2">freelance creators</Link> with several brand partnerships, it means faster first drafts without losing the distinct tone each brand expects.
          </p>
          <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
            Most writers use the generated script as a starting point — adjusting the hook, swapping the proof line, or tightening the CTA — rather than treating it as the final version. Having a well-structured first draft to react to is almost always faster than writing from a blank page. See our <Link href="/video-script-template" className="text-primary underline underline-offset-2">video script template</Link> and <Link href="/what-is-a-video-hook" className="text-primary underline underline-offset-2">guide to video hooks</Link> for more on getting the structure right.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-5 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-[var(--color-border)]">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related links */}
      <section className="bg-[var(--color-surface)] border-y-hair border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Related pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/video-ad-scripts", label: "Video ad script generator" },
              { href: "/tiktok-scripts", label: "TikTok script generator" },
              { href: "/instagram-reels-scripts", label: "Instagram Reels script generator" },
              { href: "/video-script-template", label: "Free video script template" },
              { href: "/what-is-a-video-hook", label: "What is a video hook?" },
              { href: "/for-freelancers", label: "Scribtly for freelancers" },
              { href: "/for-agencies", label: "Scribtly for agencies" },
              { href: "/ai-script-writer", label: "AI script writer overview" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors duration-150"
              >
                <ArrowRight size={14} className="text-primary flex-shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden mx-5 mb-16 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#6c64d0] to-[#5a53b8]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="relative max-w-2xl mx-auto px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Generate your next UGC script in under 60 seconds
          </h2>
          <p className="text-white/75 mb-8">
            Scribtly writes platform-native UGC ad scripts — with hook, problem, solution, and CTA — in your client's saved voice. 5 free scripts, no card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
              >
                Start free <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                className="bg-white/10 text-white border-hair border-white/30 hover:bg-white/20"
              >
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

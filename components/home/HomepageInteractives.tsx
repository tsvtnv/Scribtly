"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/* ─────────────────────────────────────────────
   Scrolling ticker
───────────────────────────────────────────── */
const TICKER_ITEMS = [
  "YouTube Scripts", "TikTok Content", "Instagram Reels", "LinkedIn Video",
  "Podcast Scripts", "Fitness Coaches", "Tech Creators", "Finance Educators",
  "Food Brands", "Beauty Influencers", "Real Estate", "SaaS Companies",
  "Gaming Channels", "Travel Creators", "Business Coaches", "Personal Finance",
];

export function ScrollingTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden border-y-hair border-[var(--color-border)] bg-[var(--color-surface)]/60 py-3">
      <div className="flex w-max animate-ticker gap-10 pr-10">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap text-xs font-medium text-text-secondary dark:text-dark-muted">
            <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Platform demo
───────────────────────────────────────────── */
const PLATFORMS = [
  {
    id: "youtube",
    label: "YouTube",
    activeBg: "bg-[#E03A2F]",
    sections: [
      {
        label: "HOOK",
        lines: [
          "The #1 mistake beginner photographers make picking camera lenses — and it's probably not what you think.",
        ],
      },
      {
        label: "INTRO",
        lines: [
          "If you've ever bought a lens and felt immediately confused, this video is for you.",
          "I'm breaking down exactly how to pick the right focal length for any shot — no Reddit rabbit holes required.",
        ],
      },
      {
        label: "SECTION 1 · Prime vs Zoom",
        lines: [
          "Prime lenses have one fixed focal length. Zoom lenses cover a range.",
          "Most beginners default to zoom — but here's why primes might completely change your work.",
        ],
      },
      {
        label: "CTA",
        lines: [
          "If this saved you from a bad lens purchase, drop a comment below with your current setup. I read every one.",
        ],
      },
    ],
  },
  {
    id: "tiktok",
    label: "TikTok",
    activeBg: "bg-[#2C2C2A] dark:bg-[#F1EFE8]",
    sections: [
      {
        label: "HOOK",
        lines: ["You don't need an expensive lens. You need to know this one number."],
      },
      {
        label: "BEAT 1",
        lines: [
          "[CUT TO: camera close-up, slow motion]",
          "The 50mm f/1.8. Under £100. Beats kit lenses that cost 3× more.",
        ],
      },
      {
        label: "BEAT 2",
        lines: [
          "Lower aperture number = more light in.",
          "More light = sharp subject, blurry background. That's the cinematic look everyone's chasing.",
        ],
      },
      {
        label: "CTA",
        lines: ["Save this before your next gear purchase. Trust me."],
      },
    ],
  },
  {
    id: "reels",
    label: "Reels",
    activeBg: "bg-[#C13584]",
    sections: [
      {
        label: "HOOK",
        lines: ["POV: you just bought the wrong lens. Here's how to avoid it ↓"],
      },
      {
        label: "BEAT 1",
        lines: [
          "[B-ROLL: lens swap in slow motion]",
          "Prime vs zoom — primes are sharper, cheaper, and force better composition. Pick prime.",
        ],
      },
      {
        label: "BEAT 2",
        lines: [
          "50mm = portraits · 35mm = lifestyle · 85mm = product shots.",
          "Three lenses. Every shot covered.",
        ],
      },
      {
        label: "CTA",
        lines: ["Follow for more gear advice that won't cost a fortune."],
      },
    ],
  },
];

export function PlatformDemo() {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0); // force re-animation on tab switch
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  function switchPlatform(i: number) {
    setActive(i);
    setKey((k) => k + 1);
  }

  const platform = PLATFORMS[active];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* tab strip */}
      <div className="flex items-center justify-center gap-2 mb-7">
        {PLATFORMS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => switchPlatform(i)}
            className={`relative px-5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
              i === active
                ? "bg-primary text-white shadow-[0_4px_18px_rgba(127,119,221,0.45)]"
                : "border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-secondary hover:border-primary/50 dark:text-dark-muted"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* mock browser */}
      <div className="max-w-[860px] mx-auto rounded-xl border border-black/10 dark:border-white/10 bg-[var(--color-surface)] shadow-[0_24px_80px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b-hair border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <div className="ml-4 flex-1 max-w-[240px] h-6 rounded-md bg-[var(--color-border)]/40 flex items-center px-3">
            <span className="text-[11px] text-text-secondary dark:text-dark-muted truncate">scribtly.com/generate</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 min-h-[360px]">
          {/* sidebar */}
          <div className="md:col-span-2 border-r-hair border-[var(--color-border)] p-5 space-y-4 bg-[var(--color-surface)]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-1.5">Client</div>
              <div className="h-9 rounded-md border-hair border-[var(--color-border)] px-3 flex items-center text-sm font-medium">
                Acme Studios
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-1.5">Topic</div>
              <div className="h-9 rounded-md border-hair border-[var(--color-border)] px-3 flex items-center text-sm text-text-secondary dark:text-dark-muted">
                How to pick the right camera lens
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-muted mb-1.5">Platform</div>
              <div className="flex gap-1.5 flex-wrap">
                {PLATFORMS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => switchPlatform(i)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      i === active
                        ? "bg-primary text-white"
                        : "border-hair border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:border-primary/40"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <Link href="/signup" className="block pt-1">
              <Button size="sm" fullWidth>Generate script</Button>
            </Link>
          </div>

          {/* script output */}
          <div key={key} className="md:col-span-3 p-5 bg-[var(--color-bg)] space-y-5 overflow-auto">
            {platform.sections.map((section, si) => (
              <div
                key={si}
                className="animate-section-reveal"
                style={{ animationDelay: `${si * 90}ms` }}
              >
                <div className="text-[10px] font-bold tracking-widest text-text-secondary dark:text-dark-muted mb-2 uppercase flex items-center gap-2">
                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                  {section.label}
                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                </div>
                {section.lines.map((line, li) => (
                  <p
                    key={li}
                    className={`text-sm leading-relaxed mb-1 ${
                      line.startsWith("[")
                        ? "text-text-secondary dark:text-dark-muted italic font-mono text-xs"
                        : "text-[var(--color-text)]"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}

            <div className="flex items-center gap-2 pt-4 border-t-hair border-[var(--color-border)]">
              <span className="flex h-2 w-2 rounded-full bg-[#38c172] animate-pulse" />
              <span className="text-[11px] text-text-secondary dark:text-dark-muted">
                Generated in 51 seconds · On voice · {platform.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-secondary dark:text-dark-muted text-center mt-5">
        Same client. Same topic. Different platform. Scribtly handles the structure.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Count-up animated stats
───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1100, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

export function AnimatedStats() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const time     = useCountUp(60, 900, inView);
  const platforms = useCountUp(5, 700, inView);
  const price    = useCountUp(5, 600, inView);

  const stats = [
    { value: `${time}s`, label: "Average generation time", color: "text-primary" },
    { value: String(platforms), label: "Platforms supported", color: "text-[#38c172]" },
    { value: `£${price}/mo`, label: "Starting price", color: "text-[#f0b429]" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ value, label, color }, i) => (
        <div
          key={label}
          className={`text-center p-7 rounded-xl border-hair border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <div className={`text-4xl md:text-5xl font-semibold tracking-tight tabular-nums ${color}`}>
            {value}
          </div>
          <div className="text-xs text-text-secondary dark:text-dark-muted mt-2">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Scroll reveal wrapper
───────────────────────────────────────────── */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

"use client";

import { Lock } from "lucide-react";
import type { Platform } from "@prisma/client";
import { cn } from "@/lib/utils";

// ── Platform SVG logos ──────────────────────────────────────────────────────

function YouTubeLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#FF0000" />
      <polygon points="9.5,7.5 9.5,16.5 17,12" fill="white" />
    </svg>
  );
}

function TikTokLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#010101" />
      <path
        d="M17.5 4.5a4 4 0 01-3.2-3.2H11.1V15a2.4 2.4 0 11-2.4-2.4c.22 0 .43.03.63.08V9.4a5.6 5.6 0 00-.63-.04 5.6 5.6 0 000 11.2 5.6 5.6 0 005.6-5.6V8.5a7.2 7.2 0 004.2 1.34V6.65a4.02 4.02 0 01-.96-.15z"
        fill="white"
      />
      <path
        d="M17.5 4.5a4 4 0 01-3.2-3.2H11.1V15a2.4 2.4 0 11-2.4-2.4c.22 0 .43.03.63.08V9.4a5.6 5.6 0 00-.63-.04 5.6 5.6 0 000 11.2 5.6 5.6 0 005.6-5.6V8.5a7.2 7.2 0 004.2 1.34V6.65a4.02 4.02 0 01-.96-.15z"
        fill="#69C9D0"
        opacity="0.5"
        style={{ mixBlendMode: "screen" }}
      />
    </svg>
  );
}

function ReelsLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      {/* Camera body */}
      <rect x="4" y="6" width="16" height="12" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Lens */}
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Flash dot */}
      <circle cx="17.5" cy="7.5" r="1" fill="white" />
    </svg>
  );
}

function LinkedInLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M7 9.5H5v9h2v-9zM6 8.5a1 1 0 100-2 1 1 0 000 2zM13 9.5h-2v9h2v-4.75c0-1.4.7-2.25 1.75-2.25C15.8 11.5 16 12.3 16 13.75V18.5h2v-5.25C18 11 16.9 9.5 14.75 9.5c-1 0-1.75.5-2 1v-.5-.5z"
        fill="white"
      />
    </svg>
  );
}

function PodcastLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#9B59B6" />
      <rect x="10" y="4" width="4" height="8" rx="2" fill="white" />
      <path
        d="M7 11a5 5 0 0010 0"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="12" y1="16" x2="12" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.5" y1="19" x2="14.5" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Platform config ─────────────────────────────────────────────────────────

const PLATFORMS: {
  id: Platform;
  label: string;
  logo: React.ComponentType<{ size?: number }>;
  bg: string;
  text: string;
  border: string;
}[] = [
  { id: "YOUTUBE",  label: "YouTube",  logo: YouTubeLogo,  bg: "#FAECE7", text: "#4A1B0C", border: "#F0997B" },
  { id: "TIKTOK",   label: "TikTok",   logo: TikTokLogo,   bg: "#2C2C2A", text: "#F1EFE8", border: "#5F5E5A" },
  { id: "REELS",    label: "Reels",    logo: ReelsLogo,    bg: "#FBEAF0", text: "#4B1528", border: "#ED93B1" },
  { id: "LINKEDIN", label: "LinkedIn", logo: LinkedInLogo, bg: "#E6F1FB", text: "#042C53", border: "#85B7EB" },
  { id: "PODCAST",  label: "Podcast",  logo: PodcastLogo,  bg: "#EEEDFE", text: "#26215C", border: "#AFA9EC" },
];

// ── Component ───────────────────────────────────────────────────────────────

export function PlatformPicker({
  value,
  onChange,
  allowed,
  onLockedClick,
}: {
  value: Platform;
  onChange: (p: Platform) => void;
  allowed: string[];
  onLockedClick: (p: Platform) => void;
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {PLATFORMS.map((p) => {
        const isAllowed = allowed.includes(p.id);
        const isActive = value === p.id;
        const Logo = p.logo;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => (isAllowed ? onChange(p.id) : onLockedClick(p.id))}
            title={p.label}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1.5 rounded-md border-2 py-3 px-1 transition-all text-xs font-medium",
              isActive ? "ring-2 ring-primary/40" : "",
              isAllowed ? "hover:brightness-105 hover:scale-[1.03]" : "opacity-60 hover:opacity-90"
            )}
            style={{
              background: p.bg,
              color: p.text,
              borderColor: isActive ? p.border : "transparent",
            }}
          >
            {!isAllowed && (
              <span className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5">
                <Lock size={9} />
              </span>
            )}
            <Logo size={22} />
            <span className="leading-tight">{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import type { Platform } from "@prisma/client";
import { cn } from "@/lib/utils";

const PLATFORMS: {
  id: Platform;
  label: string;
  logo: string;
  bg: string;
  text: string;
  border: string;
}[] = [
  { id: "YOUTUBE",  label: "YouTube",  logo: "/platforms/youtube.png",  bg: "#FAECE7", text: "#4A1B0C", border: "#F0997B" },
  { id: "TIKTOK",   label: "TikTok",   logo: "/platforms/tiktok.png",   bg: "#2C2C2A", text: "#F1EFE8", border: "#5F5E5A" },
  { id: "REELS",    label: "Reels",    logo: "/platforms/reels.png",    bg: "#FBEAF0", text: "#4B1528", border: "#ED93B1" },
  { id: "LINKEDIN", label: "LinkedIn", logo: "/platforms/linkedin.png", bg: "#E6F1FB", text: "#042C53", border: "#85B7EB" },
  { id: "PODCAST",  label: "Podcast",  logo: "/platforms/podcast.png",  bg: "#EEEDFE", text: "#26215C", border: "#AFA9EC" },
];

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
            <Image
              src={p.logo}
              alt={p.label}
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="leading-tight">{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}

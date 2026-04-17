"use client";

import { Lock } from "lucide-react";
import type { Platform } from "@prisma/client";
import { cn } from "@/lib/utils";

const PLATFORMS: { id: Platform; label: string; bg: string; text: string; border: string }[] = [
  { id: "YOUTUBE", label: "YouTube", bg: "#FAECE7", text: "#4A1B0C", border: "#F0997B" },
  { id: "TIKTOK", label: "TikTok", bg: "#2C2C2A", text: "#F1EFE8", border: "#5F5E5A" },
  { id: "REELS", label: "Reels", bg: "#FBEAF0", text: "#4B1528", border: "#ED93B1" },
  { id: "LINKEDIN", label: "LinkedIn", bg: "#E6F1FB", text: "#042C53", border: "#85B7EB" },
  { id: "PODCAST", label: "Podcast", bg: "#EEEDFE", text: "#26215C", border: "#AFA9EC" },
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
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      {PLATFORMS.map((p) => {
        const isAllowed = allowed.includes(p.id);
        const isActive = value === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => (isAllowed ? onChange(p.id) : onLockedClick(p.id))}
            className={cn(
              "relative p-3 rounded-md border-2 transition-all text-sm font-medium",
              isActive ? "ring-2 ring-primary/40" : "",
              isAllowed ? "hover:brightness-105" : "opacity-70 hover:opacity-100"
            )}
            style={{
              background: p.bg,
              color: p.text,
              borderColor: isActive ? p.border : "transparent",
            }}
          >
            {!isAllowed && (
              <span className="absolute top-1.5 right-1.5 bg-white/80 rounded-full p-0.5">
                <Lock size={10} />
              </span>
            )}
            {p.label}
          </button>
        );
      })}
    </div>
  );
}

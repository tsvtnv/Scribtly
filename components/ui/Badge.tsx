import type { Platform, ScriptStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const platformClasses: Record<Platform, string> = {
  YOUTUBE: "bg-platform-youtube-bg text-platform-youtube-text border-platform-youtube-border",
  TIKTOK: "bg-platform-tiktok-bg text-platform-tiktok-text border-platform-tiktok-border",
  REELS: "bg-platform-reels-bg text-platform-reels-text border-platform-reels-border",
  LINKEDIN: "bg-platform-linkedin-bg text-platform-linkedin-text border-platform-linkedin-border",
  PODCAST: "bg-platform-podcast-bg text-platform-podcast-text border-platform-podcast-border",
};

const platformLabel: Record<Platform, string> = {
  YOUTUBE: "YouTube",
  TIKTOK: "TikTok",
  REELS: "Reels",
  LINKEDIN: "LinkedIn",
  PODCAST: "Podcast",
};

export function PlatformBadge({ platform, className }: { platform: Platform; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border-hair",
        platformClasses[platform],
        className
      )}
    >
      {platformLabel[platform]}
    </span>
  );
}

const statusClasses: Record<ScriptStatus, string> = {
  DRAFT:
    "bg-neutral-bg dark:bg-dark-elevated text-text-secondary dark:text-dark-muted border-hair border-[var(--color-border)]",
  FINAL:
    "bg-[#1D9E75]/15 text-[#1D9E75] dark:bg-[#1D9E75]/20 border-hair border-[#1D9E75]/30",
  SENT:
    "bg-primary-light text-primary-dark dark:bg-primary/20 dark:text-primary-onDark border-hair border-primary/30",
};

export function StatusBadge({ status, className }: { status: ScriptStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
        statusClasses[status],
        className
      )}
    >
      {status}
    </span>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-neutral-bg dark:bg-dark-elevated text-text-secondary dark:text-dark-muted border-hair border-[var(--color-border)]",
        className
      )}
    >
      {children}
    </span>
  );
}

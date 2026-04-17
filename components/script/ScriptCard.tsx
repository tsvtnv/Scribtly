import Link from "next/link";
import type { Script, Client, Platform } from "@prisma/client";
import { ClientAvatar } from "@/components/client/ClientAvatar";
import { StatusBadge } from "@/components/ui/Badge";
import { relativeDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const stripe: Record<Platform, string> = {
  YOUTUBE: "bg-platform-youtube-border",
  TIKTOK: "bg-platform-tiktok-border",
  REELS: "bg-platform-reels-border",
  LINKEDIN: "bg-platform-linkedin-border",
  PODCAST: "bg-platform-podcast-border",
};

export function ScriptCard({ script }: { script: Script & { client: Client | null } }) {
  return (
    <Link href={`/scripts/${script.id}`} className="block group relative">
      <div className="h-full rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-primary/40 transition-colors">
        <div className={cn("h-1 w-full", stripe[script.platform])} />
        <div className="p-4">
          <div className="font-medium text-sm line-clamp-2 min-h-[2.6em]">{script.title}</div>

          <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary dark:text-dark-muted">
            {script.client ? (
              <>
                <ClientAvatar name={script.client.name} color={script.client.avatarColor} size={16} />
                <span className="truncate">{script.client.name}</span>
              </>
            ) : (
              <span>Unassigned</span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-text-secondary dark:text-dark-muted">
            <span>{relativeDate(script.createdAt)}</span>
            <span>{script.wordCount ?? 0} words · {script.duration}</span>
          </div>
          <div className="mt-2">
            <StatusBadge status={script.status} />
          </div>
        </div>
      </div>
    </Link>
  );
}

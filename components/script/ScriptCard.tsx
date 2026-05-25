'use client'

import Link from "next/link";
import type { Script, Client, Platform, ScriptStatus } from "@prisma/client";
import { initials, relativeDate } from "@/lib/utils";

export interface ScriptWithPipeline extends Script {
  client: Client | null
  contentItem?: { id: string; stage: string } | null
}

const PLATFORM_BADGE: Record<Platform, { bg: string; text: string; label: string }> = {
  YOUTUBE:  { bg: '#FAECE7', text: '#4A1B0C', label: 'YouTube' },
  TIKTOK:   { bg: '#F1EFE8', text: '#2C2C2A', label: 'TikTok' },
  REELS:    { bg: '#FBEAF0', text: '#4B1528', label: 'Reels' },
  LINKEDIN: { bg: '#E6F1FB', text: '#042C53', label: 'LinkedIn' },
  PODCAST:  { bg: '#EEEDFE', text: '#26215C', label: 'Podcast' },
}

const STATUS_BADGE: Record<ScriptStatus, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: '#F1EFE8', text: '#444441', label: 'Draft' },
  FINAL: { bg: '#E1F5EE', text: '#085041', label: 'Final' },
  SENT:  { bg: '#FAECE7', text: '#4A1B0C', label: 'Sent' },
}

export function ScriptCard({
  script,
  onAddToPipeline,
}: {
  script: ScriptWithPipeline
  onAddToPipeline?: (script: ScriptWithPipeline) => void
}) {
  const platform = PLATFORM_BADGE[script.platform]
  const status   = STATUS_BADGE[script.status]
  const inPipeline = !!script.contentItem

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 transition-all duration-150 hover:border-[var(--color-primary)] hover:shadow-md flex flex-col">
      {/* Top row: platform badge + status badge */}
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: platform.bg, color: platform.text }}
        >
          {platform.label}
        </span>
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: status.bg, color: status.text }}
        >
          {status.label}
        </span>
      </div>

      {/* Title — clickable */}
      <Link href={`/scripts/${script.id}`} className="block mb-1">
        <p className="text-[14px] font-medium leading-snug line-clamp-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors">
          {script.title}
        </p>
      </Link>

      {/* Meta row: word count + duration */}
      <p className="text-[11px] text-[var(--color-text-tertiary)] mb-1.5">
        {script.wordCount ?? 0} words{script.duration ? ` · ${script.duration}` : ''}
      </p>

      {/* Client row */}
      <div className="flex items-center gap-1.5 mt-auto mb-2">
        {script.client ? (
          <>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: script.client.avatarColor, fontSize: '9px', fontWeight: 500 }}
            >
              {initials(script.client.name)}
            </span>
            <span className="text-[11px] text-[var(--color-text-secondary)] truncate flex-1">
              {script.client.name}
            </span>
          </>
        ) : (
          <span className="text-[11px] text-[var(--color-text-tertiary)] flex-1">Unassigned</span>
        )}
        <span className="text-[11px] text-[var(--color-text-tertiary)] ml-auto flex-shrink-0">
          {relativeDate(script.createdAt)}
        </span>
      </div>

      {/* Pipeline indicator / add button */}
      {inPipeline ? (
        <span
          className="text-[10px] font-medium px-[7px] py-[2px] rounded-full self-start"
          style={{ backgroundColor: '#E1F5EE', color: '#085041' }}
        >
          In pipeline
        </span>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onAddToPipeline?.(script)
          }}
          className="text-[11px] border border-[var(--color-border)] bg-transparent rounded-md px-[10px] py-1 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] transition-colors self-start"
        >
          + Add to pipeline
        </button>
      )}
    </div>
  )
}

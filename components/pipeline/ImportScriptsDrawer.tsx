'use client'

import { useDraggable } from '@dnd-kit/core'
import type { Script, Platform } from '@prisma/client'
import Link from 'next/link'
import { X } from 'lucide-react'
import { initials } from '@/lib/utils'

export interface ScriptForDrawer extends Script {
  client: { id: string; name: string; avatarColor: string } | null
  contentItem?: { id: string; stage: string } | null
}

const PLATFORM_LABEL: Record<Platform, string> = {
  YOUTUBE: 'YouTube',
  TIKTOK: 'TikTok',
  REELS: 'Reels',
  LINKEDIN: 'LinkedIn',
  PODCAST: 'Podcast',
}

const PLATFORM_BG: Record<Platform, string> = {
  YOUTUBE: '#FAECE7',
  TIKTOK: '#F1EFE8',
  REELS: '#FBEAF0',
  LINKEDIN: '#E6F1FB',
  PODCAST: '#EEEDFE',
}

const PLATFORM_TEXT: Record<Platform, string> = {
  YOUTUBE: '#4A1B0C',
  TIKTOK: '#2C2C2A',
  REELS: '#4B1528',
  LINKEDIN: '#042C53',
  PODCAST: '#26215C',
}

function DraggableScriptItem({
  script,
  onAdd,
}: {
  script: ScriptForDrawer
  onAdd: (script: ScriptForDrawer) => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `script-${script.id}`,
    data: { script },
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-2.5 cursor-grab active:cursor-grabbing select-none"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: PLATFORM_BG[script.platform], color: PLATFORM_TEXT[script.platform] }}
        >
          {PLATFORM_LABEL[script.platform]}
        </span>
        <button
          type="button"
          onPointerDown={e => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            onAdd(script)
          }}
          className="text-[10px] border border-[var(--color-border)] bg-transparent rounded px-1.5 py-0.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] transition-colors"
        >
          + Add
        </button>
      </div>
      <p className="text-[12px] font-medium text-text-primary dark:text-dark-text leading-snug line-clamp-2 mb-1.5">
        {script.title}
      </p>
      <div className="flex items-center gap-1.5">
        {script.client && (
          <>
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: script.client.avatarColor, fontSize: '8px', fontWeight: 500 }}
            >
              {initials(script.client.name)}
            </span>
            <span className="text-[10px] text-[var(--color-text-secondary)] truncate flex-1">
              {script.client.name}
            </span>
          </>
        )}
        {script.wordCount ? (
          <span className="text-[10px] text-[var(--color-text-tertiary)] ml-auto flex-shrink-0">
            {script.wordCount}w
          </span>
        ) : null}
      </div>
    </div>
  )
}

interface ImportScriptsDrawerProps {
  scripts: ScriptForDrawer[]
  onClose: () => void
  onAddScript: (script: ScriptForDrawer) => void
  importedScriptIds: Set<string>
}

export function ImportScriptsDrawer({ scripts, onClose, onAddScript, importedScriptIds }: ImportScriptsDrawerProps) {
  const unimported = scripts.filter(s => !importedScriptIds.has(s.id))

  return (
    <div className="w-[280px] flex-shrink-0 border-l border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-3 border-b border-[var(--color-border)]">
        <h2 className="text-sm font-semibold text-text-primary dark:text-dark-text">Import scripts</h2>
        <button type="button" onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {unimported.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[12px] text-[var(--color-text-secondary)] mb-3">
              All scripts are in the pipeline.
            </p>
            <Link href="/generate" className="text-[12px] text-[var(--color-primary)] hover:underline">
              Generate a new script →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {unimported.map(s => (
              <DraggableScriptItem key={s.id} script={s} onAdd={onAddScript} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

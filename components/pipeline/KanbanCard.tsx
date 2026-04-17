'use client'

import React, { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ContentItem } from '@/types/pipeline'
import { STAGE_CONFIG, PLATFORM_CONFIG } from '@/lib/pipeline'
import { initials } from '@/lib/utils'
import { format } from 'date-fns'

interface KanbanCardProps {
  item: ContentItem
  onEdit: (item: ContentItem) => void
  isDragOverlay?: boolean
}

export const KanbanCard = memo(function KanbanCard({ item, onEdit, isDragOverlay }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    ...(isDragOverlay ? { transform: 'scale(1.03)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' } : {}),
  }

  const platform = PLATFORM_CONFIG[item.platform]
  const stage    = STAGE_CONFIG[item.stage]

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        if (!isDragging && !isDragOverlay) {
          e.stopPropagation()
          onEdit(item)
        }
      }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-[10px_12px] cursor-grab active:cursor-grabbing transition-all duration-150 hover:border-[var(--color-primary)] select-none"
      aria-label={`${item.title}, ${platform.label}, ${stage.label} stage`}
    >
      {/* Top row: platform badge + scheduled date */}
      <div className="flex items-center justify-between mb-2 gap-1">
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: platform.bg, color: platform.text }}
        >
          {platform.label}
        </span>
        {item.scheduledDate && (
          <span className="text-[10px] text-text-secondary dark:text-dark-muted">
            {format(new Date(item.scheduledDate), 'MMM d')}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-sm font-medium leading-snug line-clamp-2 text-text-primary dark:text-dark-text mb-2">
        {item.title}
      </p>

      {/* Client row */}
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
          style={{ backgroundColor: item.client.avatarColor }}
        >
          {initials(item.client.name)}
        </span>
        <span className="text-[11px] text-text-secondary dark:text-dark-muted truncate">
          {item.client.name}
        </span>
      </div>

      {/* Indicators */}
      <div className="flex items-center gap-2 mt-1">
        {item.scriptId && (
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
            Script ready
          </span>
        )}
        {item.notes && (
          <span className="text-[10px] text-text-secondary dark:text-dark-muted" title="Has notes">
            📝
          </span>
        )}
        {isDragOverlay && (
          <span
            className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: stage.bg, color: stage.text }}
          >
            {stage.label}
          </span>
        )}
      </div>
    </div>
  )
})

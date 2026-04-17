'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ContentItem, PipelineStage } from '@/types/pipeline'
import { STAGE_CONFIG } from '@/lib/pipeline'
import { KanbanCard } from './KanbanCard'
import { cn } from '@/lib/utils'

interface KanbanColumnProps {
  stage: PipelineStage
  items: ContentItem[]
  onAddItem: (stage: PipelineStage) => void
  onEditItem: (item: ContentItem) => void
}

export function KanbanColumn({ stage, items, onAddItem, onEditItem }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  const config = STAGE_CONFIG[stage]

  return (
    <div
      className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-150"
      style={{
        minWidth: 220,
        flex: '1 1 220px',
        maxWidth: 360,
        ...(isOver ? { borderColor: config.text } : {}),
      }}
      aria-label={`${config.label} stage, ${items.length} item${items.length !== 1 ? 's' : ''}`}
    >
      {/* Column header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] rounded-t-lg">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: config.bg, color: config.text }}
          >
            {config.label}
          </span>
          <span className="text-xs text-text-secondary dark:text-dark-muted font-medium">
            {items.length}
          </span>
        </div>
        <button
          onClick={() => onAddItem(stage)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-primary-tint)] text-text-secondary dark:text-dark-muted hover:text-[var(--color-primary)] transition-colors text-lg leading-none"
          aria-label={`Add item to ${config.label}`}
        >
          +
        </button>
      </div>

      {/* Cards area */}
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            'flex flex-col gap-2 p-2 flex-1 min-h-[120px] transition-colors duration-150',
            isOver && 'bg-[var(--color-primary-tint)]'
          )}
        >
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-md min-h-[80px] transition-colors duration-150">
              <span className="text-xs text-text-secondary dark:text-dark-muted">
                {isOver ? 'Drop here' : 'Empty'}
              </span>
            </div>
          ) : (
            items.map(item => (
              <KanbanCard key={item.id} item={item} onEdit={onEditItem} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}

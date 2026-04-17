'use client'

import { useState, useCallback, useRef } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { ContentItem, PipelineStage, Platform } from '@/types/pipeline'
import { STAGE_ORDER } from '@/lib/pipeline'
import { usePipeline } from '@/hooks/usePipeline'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'
import { AddItemModal } from './AddItemModal'
import { EditItemModal } from './EditItemModal'
import { PipelineFilters } from './PipelineFilters'
import { ImportScriptsDrawer, type ScriptForDrawer } from './ImportScriptsDrawer'
import { AddToPipelineModal } from './AddToPipelineModal'
import type { ScriptForPipeline } from '@/app/(app)/pipeline/page'

interface Client {
  id: string
  name: string
  avatarColor: string
}

interface KanbanBoardProps {
  initialItems: ContentItem[]
  clients: Client[]
  initialScripts: ScriptForPipeline[]
}

export function KanbanBoard({ initialItems, clients, initialScripts }: KanbanBoardProps) {
  const { columns, setColumns, addItem, updateItem, deleteItem, moveItem } = usePipeline(initialItems)
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null)
  const [addStage, setAddStage] = useState<PipelineStage | null>(null)
  const [editItem, setEditItem] = useState<ContentItem | null>(null)
  const [clientFilter, setClientFilter] = useState<string | null>(null)
  const [platformFilter, setPlatformFilter] = useState<Platform | null>(null)
  const [dragError, setDragError] = useState<string | null>(null)
  const columnsSnapshot = useRef<Record<PipelineStage, ContentItem[]> | null>(null)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [importedScriptIds, setImportedScriptIds] = useState<Set<string>>(new Set())
  const [addModalScript, setAddModalScript] = useState<ScriptForPipeline | null>(null)
  const [drawerScripts] = useState(initialScripts)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const getFilteredColumns = useCallback((): Record<PipelineStage, ContentItem[]> => {
    if (!clientFilter && !platformFilter) return columns
    const result = {} as Record<PipelineStage, ContentItem[]>
    for (const stage of STAGE_ORDER) {
      result[stage] = columns[stage].filter(item => {
        if (clientFilter && item.clientId !== clientFilter) return false
        if (platformFilter && item.platform !== platformFilter) return false
        return true
      })
    }
    return result
  }, [columns, clientFilter, platformFilter])

  const findStageForItem = useCallback((itemId: string): PipelineStage | null => {
    for (const stage of STAGE_ORDER) {
      if (columns[stage].some(i => i.id === itemId)) return stage
    }
    return null
  }, [columns])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const id = event.active.id as string
    if (id.startsWith('script-')) return
    for (const stage of STAGE_ORDER) {
      const item = columns[stage].find(i => i.id === id)
      if (item) { setActiveItem(item); break }
    }
    columnsSnapshot.current = JSON.parse(JSON.stringify(columns))
  }, [columns])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
    if ((active.id as string).startsWith('script-')) return

    const activeId = active.id as string
    const overId   = over.id as string

    const activeStage = findStageForItem(activeId)
    if (!activeStage) return

    const isOverColumn = (STAGE_ORDER as string[]).includes(overId)
    const overStage = isOverColumn
      ? overId as PipelineStage
      : findStageForItem(overId)

    if (!overStage) return

    if (activeStage === overStage) {
      setColumns(prev => {
        const col = [...prev[activeStage]]
        const oldIdx = col.findIndex(i => i.id === activeId)
        const newIdx = col.findIndex(i => i.id === overId)
        if (oldIdx === -1 || newIdx === -1 || oldIdx === newIdx) return prev
        return { ...prev, [activeStage]: arrayMove(col, oldIdx, newIdx) }
      })
      return
    }

    setColumns(prev => {
      const sourceCol = [...prev[activeStage]]
      const destCol   = [...prev[overStage]]
      const item      = sourceCol.find(i => i.id === activeId)
      if (!item) return prev

      const newSource = sourceCol.filter(i => i.id !== activeId)
      const overIdx   = destCol.findIndex(i => i.id === overId)
      const insertAt  = overIdx >= 0 ? overIdx : destCol.length
      const newDest   = [...destCol]
      newDest.splice(insertAt, 0, { ...item, stage: overStage })

      return { ...prev, [activeStage]: newSource, [overStage]: newDest }
    })
  }, [columns, findStageForItem, setColumns])

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveItem(null)

    // Handle script drag from drawer
    if ((active.id as string).startsWith('script-')) {
      if (!over) return
      const scriptId = (active.id as string).replace('script-', '')
      const script = drawerScripts.find(s => s.id === scriptId)
      if (!script || !script.clientId) return

      const overId = over.id as string
      const targetStage: PipelineStage | null = (STAGE_ORDER as string[]).includes(overId)
        ? overId as PipelineStage
        : findStageForItem(overId)
      if (!targetStage) return

      try {
        const res = await fetch('/api/pipeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: script.title,
            clientId: script.clientId,
            platform: script.platform,
            stage: targetStage,
            scriptId: script.id,
          }),
        })
        if (!res.ok) return
        const { item } = await res.json() as { item: ContentItem }
        addItem(item)
        setImportedScriptIds(prev => new Set([...prev, scriptId]))
      } catch {
        // silently fail — user can retry
      }
      return
    }

    if (!over) {
      if (columnsSnapshot.current) setColumns(columnsSnapshot.current)
      columnsSnapshot.current = null
      return
    }

    const snapshot = columnsSnapshot.current!
    columnsSnapshot.current = null

    try {
      const activeId = active.id as string
      let finalStage: PipelineStage = 'IDEA'
      for (const s of STAGE_ORDER) {
        if (columns[s].some(i => i.id === activeId)) { finalStage = s; break }
      }
      await moveItem(activeId, finalStage, columns, snapshot)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save position. Please try again.'
      setDragError(message)
      setTimeout(() => setDragError(null), 4000)
    }
  }, [columns, drawerScripts, findStageForItem, addItem, moveItem, setColumns])

  const display = getFilteredColumns()
  const totalItems = STAGE_ORDER.reduce((sum, s) => sum + columns[s].length, 0)

  return (
    <div className="flex flex-col h-full">
      <PipelineFilters
        clients={clients}
        selectedClient={clientFilter}
        selectedPlatform={platformFilter}
        onClientChange={setClientFilter}
        onPlatformChange={setPlatformFilter}
        totalItems={totalItems}
        onImportScripts={() => setIsDrawerOpen(v => !v)}
        showImport={drawerScripts.length > 0}
      />

      {dragError && (
        <div className="mx-4 mb-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
          {dragError}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {totalItems === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-secondary dark:text-dark-muted h-full">
              <p className="text-base font-medium">No content yet</p>
              <button
                onClick={() => setAddStage('IDEA')}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Add your first piece
              </button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <div
                className="flex flex-row gap-3 overflow-x-auto pb-4 pt-2 px-4 min-h-[600px] items-start w-full"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--color-border) transparent' } as React.CSSProperties}
              >
                {STAGE_ORDER.map(stage => (
                  <KanbanColumn
                    key={stage}
                    stage={stage}
                    items={display[stage]}
                    onAddItem={(s) => setAddStage(s)}
                    onEditItem={(item) => setEditItem(item)}
                  />
                ))}
              </div>

              <DragOverlay>
                {activeItem && (
                  <KanbanCard item={activeItem} onEdit={() => {}} isDragOverlay />
                )}
              </DragOverlay>
            </DndContext>
          )}
        </div>

        {isDrawerOpen && (
          <ImportScriptsDrawer
            scripts={drawerScripts as ScriptForDrawer[]}
            importedScriptIds={importedScriptIds}
            onClose={() => setIsDrawerOpen(false)}
            onAddScript={(s) => setAddModalScript(s as ScriptForPipeline)}
          />
        )}
      </div>

      {addStage && (
        <AddItemModal
          isOpen={!!addStage}
          onClose={() => setAddStage(null)}
          onAdd={addItem}
          clients={clients}
          defaultStage={addStage}
        />
      )}

      {editItem && (
        <EditItemModal
          item={editItem}
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          onUpdate={(updated) => { updateItem(updated); setEditItem(null) }}
          onDelete={(id) => { deleteItem(id); setEditItem(null) }}
          clients={clients}
        />
      )}

      {addModalScript && (
        <AddToPipelineModal
          script={addModalScript}
          clients={clients}
          isOpen={!!addModalScript}
          onClose={() => setAddModalScript(null)}
          onAdded={(item) => {
            addItem(item)
            setImportedScriptIds(prev => new Set([...prev, addModalScript.id]))
            setAddModalScript(null)
          }}
        />
      )}
    </div>
  )
}

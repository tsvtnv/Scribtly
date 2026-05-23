'use client'

import { useState, useCallback } from 'react'
import { ContentItem, PipelineStage, ReorderUpdate } from '@/types/pipeline'
import { groupByStage, STAGE_ORDER } from '@/lib/pipeline'

export function usePipeline(initialItems: ContentItem[]) {
  const [columns, setColumns] = useState<Record<PipelineStage, ContentItem[]>>(
    () => groupByStage(initialItems)
  )

  const addItem = useCallback((item: ContentItem) => {
    setColumns(prev => ({
      ...prev,
      [item.stage]: [...prev[item.stage], item],
    }))
  }, [])

  const updateItem = useCallback((updated: ContentItem) => {
    setColumns(prev => {
      const next = { ...prev }
      for (const stage of STAGE_ORDER) {
        next[stage] = next[stage].filter(i => i.id !== updated.id)
      }
      const col = [...next[updated.stage]]
      col.splice(updated.position, 0, updated)
      next[updated.stage] = col
      return next
    })
  }, [])

  const deleteItem = useCallback((id: string) => {
    setColumns(prev => {
      const next = { ...prev }
      for (const stage of STAGE_ORDER) {
        next[stage] = next[stage].filter(i => i.id !== id)
      }
      return next
    })
  }, [])

  const moveItem = useCallback(async (
    itemId: string,
    toStage: PipelineStage,
    newColumns: Record<PipelineStage, ContentItem[]>,
    previousColumns: Record<PipelineStage, ContentItem[]>
  ) => {
    setColumns(newColumns)

    const updates: ReorderUpdate[] = []
    for (const stage of STAGE_ORDER) {
      newColumns[stage].forEach((item, idx) => {
        updates.push({ id: item.id, stage, position: idx })
      })
    }

    try {
      const res = await fetch('/api/pipeline/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })
      if (!res.ok) throw new Error('Reorder failed')
    } catch {
      setColumns(previousColumns)
      throw new Error('Failed to save position. Please try again.')
    }
  }, [])

  return { columns, setColumns, addItem, updateItem, deleteItem, moveItem }
}

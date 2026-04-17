'use client'

import { useState, useEffect, FormEvent } from 'react'
import type { Script } from '@prisma/client'
import type { ContentItem, PipelineStage } from '@/types/pipeline'
import { STAGE_CONFIG, STAGE_ORDER } from '@/lib/pipeline'
import { useToast } from '@/components/ui/Toast'

interface ScriptWithPipeline extends Script {
  client: { id: string; name: string; avatarColor: string } | null
  contentItem?: { id: string; stage: string } | null
}

interface Client2 {
  id: string
  name: string
  avatarColor: string
}

interface AddToPipelineModalProps {
  script: ScriptWithPipeline
  clients: Client2[]
  isOpen: boolean
  onClose: () => void
  onAdded: (item: ContentItem) => void
}

export function AddToPipelineModal({ script, clients, isOpen, onClose, onAdded }: AddToPipelineModalProps) {
  const toast = useToast()
  const [title, setTitle] = useState(script.title)
  const [stage, setStage] = useState<PipelineStage>('SCRIPTING')
  const [scheduledDate, setScheduledDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTitle(script.title)
      setStage('SCRIPTING')
      setScheduledDate('')
      setNotes('')
      setError(null)
    }
  }, [isOpen, script.title])

  if (!isOpen) return null

  // Already in pipeline — show info state
  if (script.contentItem) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
        <div
          className="w-full max-w-md bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-xl p-6"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-base font-semibold mb-3">Already in pipeline</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
            This script is already linked to a pipeline item in the{' '}
            <strong>{STAGE_CONFIG[script.contentItem.stage as PipelineStage]?.label ?? script.contentItem.stage}</strong> stage.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary hover:bg-[var(--color-bg)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!script.clientId) {
      setError('Script must have a client assigned before adding to pipeline')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          clientId: script.clientId,
          platform: script.platform,
          stage,
          scheduledDate: scheduledDate || null,
          notes: notes || null,
          scriptId: script.id,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to add to pipeline')
      }
      const { item } = await res.json() as { item: ContentItem }
      toast.push('Added to pipeline', 'success')
      onAdded(item)
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-text-primary dark:text-dark-text">Add to pipeline</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-xl leading-none">×</button>
        </div>

        {!script.clientId && (
          <p className="mb-4 text-sm text-amber-600 dark:text-amber-400">
            This script has no client assigned. Please assign a client on the script page first.
          </p>
        )}

        {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Content title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Add to stage</label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value as PipelineStage)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            >
              {STAGE_ORDER.map(s => (
                <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Scheduled post date</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={e => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Filming notes, thumbnail ideas..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)] resize-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary hover:bg-[var(--color-bg)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !script.clientId}
              className="flex-1 px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Adding...' : 'Add to pipeline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

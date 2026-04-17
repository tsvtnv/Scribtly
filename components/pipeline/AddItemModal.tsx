'use client'

import { useState, FormEvent } from 'react'
import { ContentItem, PipelineStage, Platform } from '@/types/pipeline'
import { STAGE_CONFIG, STAGE_ORDER, PLATFORM_CONFIG, PLATFORMS_TUPLE } from '@/lib/pipeline'

interface Client {
  id: string
  name: string
  avatarColor: string
}

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: ContentItem) => void
  clients: Client[]
  defaultStage?: PipelineStage
}

export function AddItemModal({ isOpen, onClose, onAdd, clients, defaultStage = 'IDEA' }: AddItemModalProps) {
  const [title,         setTitle]         = useState('')
  const [clientId,      setClientId]      = useState(clients[0]?.id ?? '')
  const [platform,      setPlatform]      = useState<Platform>('YOUTUBE')
  const [stage,         setStage]         = useState<PipelineStage>(defaultStage)
  const [scheduledDate, setScheduledDate] = useState('')
  const [notes,         setNotes]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [error,         setError]         = useState<string | null>(null)

  if (!isOpen) return null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, clientId, platform, stage, scheduledDate: scheduledDate || null, notes: notes || null }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to create item')
      }
      const { item } = await res.json()
      onAdd(item)
      onClose()
      setTitle(''); setScheduledDate(''); setNotes('')
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
          <h2 className="text-base font-semibold text-text-primary dark:text-dark-text">Add content</h2>
          <button onClick={onClose} className="text-text-secondary dark:text-dark-muted hover:text-text-primary dark:hover:text-dark-text text-xl leading-none">×</button>
        </div>

        {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Content topic *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="e.g. 5 mistakes beginners make at the gym"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Client *</label>
            <select
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            >
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Platform *</label>
            <div className="flex flex-wrap gap-1.5">
              {PLATFORMS_TUPLE.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p as Platform)}
                  className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                  style={platform === p
                    ? { backgroundColor: PLATFORM_CONFIG[p as Platform].bg, color: PLATFORM_CONFIG[p as Platform].text, borderColor: PLATFORM_CONFIG[p as Platform].text }
                    : { borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }
                  }
                >
                  {PLATFORM_CONFIG[p as Platform].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Stage</label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value as PipelineStage)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            >
              {STAGE_ORDER.map(s => <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Scheduled date</label>
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
              placeholder="Hook ideas, filming notes, thumbnail concepts..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)] resize-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-bg)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Adding…' : 'Add content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

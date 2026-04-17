'use client'

import { useState, useEffect, FormEvent } from 'react'
import { ContentItem, PipelineStage, Platform } from '@/types/pipeline'
import { STAGE_CONFIG, STAGE_ORDER, PLATFORM_CONFIG, PLATFORMS_TUPLE, nextStage } from '@/lib/pipeline'

interface Client {
  id: string
  name: string
  avatarColor: string
}

interface EditItemModalProps {
  item: ContentItem | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (item: ContentItem) => void
  onDelete: (id: string) => void
  clients: Client[]
}

export function EditItemModal({ item, isOpen, onClose, onUpdate, onDelete, clients }: EditItemModalProps) {
  const [title,         setTitle]         = useState('')
  const [clientId,      setClientId]      = useState('')
  const [platform,      setPlatform]      = useState<Platform>('YOUTUBE')
  const [stage,         setStage]         = useState<PipelineStage>('IDEA')
  const [scheduledDate, setScheduledDate] = useState('')
  const [publishedAt,   setPublishedAt]   = useState('')
  const [notes,         setNotes]         = useState('')
  const [views,         setViews]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [deleting,      setDeleting]      = useState(false)
  const [confirmTitle,  setConfirmTitle]  = useState('')
  const [showConfirm,   setShowConfirm]   = useState(false)
  const [error,         setError]         = useState<string | null>(null)

  useEffect(() => {
    if (!item) return
    setTitle(item.title)
    setClientId(item.clientId)
    setPlatform(item.platform)
    setStage(item.stage)
    setScheduledDate(item.scheduledDate ? item.scheduledDate.slice(0, 10) : '')
    setPublishedAt(item.publishedAt ? item.publishedAt.slice(0, 10) : '')
    setNotes(item.notes ?? '')
    setViews(item.views != null ? String(item.views) : '')
    setShowConfirm(false)
    setConfirmTitle('')
    setError(null)
  }, [item])

  if (!isOpen || !item) return null

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const res = await fetch(`/api/pipeline/${item!.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          clientId,
          platform,
          stage,
          scheduledDate: scheduledDate || null,
          publishedAt:   publishedAt   || null,
          notes:         notes         || null,
          views:         views !== '' ? parseInt(views, 10) : null,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to update')
      }
      const { item: updated } = await res.json()
      onUpdate(updated)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (confirmTitle !== item!.title) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/pipeline/${item!.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      onDelete(item!.id)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setDeleting(false)
    }
  }

  async function handleMoveNext() {
    const next = nextStage(stage)
    if (!next) return
    setLoading(true)
    try {
      const res = await fetch(`/api/pipeline/${item!.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: next }),
      })
      if (!res.ok) throw new Error('Failed to advance stage')
      const { item: updated } = await res.json()
      onUpdate(updated)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const next = nextStage(stage)
  const generateUrl = `/generate?clientId=${item.clientId}&topic=${encodeURIComponent(item.title)}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-text-primary dark:text-dark-text">Edit content</h2>
          <button onClick={onClose} className="text-text-secondary dark:text-dark-muted hover:text-text-primary dark:hover:text-dark-text text-xl leading-none">×</button>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 mb-4">
          {next && (
            <button
              type="button"
              onClick={handleMoveNext}
              disabled={loading}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)] transition-colors text-text-secondary dark:text-dark-muted"
            >
              Move to {STAGE_CONFIG[next].label} →
            </button>
          )}
          {item.scriptId ? (
            <a
              href={`/scripts/${item.scriptId}`}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)] text-center transition-colors text-text-secondary dark:text-dark-muted"
            >
              View script
            </a>
          ) : (
            <a
              href={generateUrl}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)] text-center transition-colors text-text-secondary dark:text-dark-muted"
            >
              Generate script
            </a>
          )}
        </div>

        {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Content topic *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]" />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Client</label>
            <select value={clientId} onChange={e => setClientId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]">
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Platform</label>
            <div className="flex flex-wrap gap-1.5">
              {PLATFORMS_TUPLE.map(p => (
                <button key={p} type="button" onClick={() => setPlatform(p as Platform)}
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
            <select value={stage} onChange={e => setStage(e.target.value as PipelineStage)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]">
              {STAGE_ORDER.map(s => <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Scheduled date</label>
            <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]" />
          </div>

          {stage === 'PUBLISHED' && (
            <>
              <div>
                <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Published date</label>
                <input type="date" value={publishedAt} onChange={e => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Views</label>
                <input type="number" min="0" value={views} onChange={e => setViews(e.target.value)} placeholder="e.g. 12500"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              placeholder="Hook ideas, filming notes, thumbnail concepts..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)] resize-none" />
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-bg)] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
              {loading ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>

        {/* Delete section */}
        <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
          {!showConfirm ? (
            <button onClick={() => setShowConfirm(true)}
              className="text-xs text-red-500 hover:text-red-600 transition-colors">
              Delete this item
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-text-secondary dark:text-dark-muted">
                Type <strong>{item.title}</strong> to confirm deletion:
              </p>
              <input value={confirmTitle} onChange={e => setConfirmTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-red-300 bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none" />
              <div className="flex gap-2">
                <button onClick={() => setShowConfirm(false)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg)]">
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={confirmTitle !== item.title || deleting}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white disabled:opacity-40 hover:bg-red-600 transition-colors">
                  {deleting ? 'Deleting…' : 'Confirm delete'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, FormEvent } from 'react'
import type { CommentEntry } from './FeedbackHistory'

interface ReviewFormProps {
  token: string
  onCommentAdded: (comment: CommentEntry) => void
}

export function ReviewForm({ token, onCommentAdded }: ReviewFormProps) {
  const [authorName, setAuthorName] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(verdict: 'APPROVED' | 'REJECTED' | null) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/review/${token}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName, body, verdict }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to submit')
      onCommentAdded(data as CommentEntry)
      setAuthorName('')
      setBody('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: FormEvent, verdict: 'APPROVED' | 'REJECTED' | null) {
    e.preventDefault()
    submit(verdict)
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
        Leave your feedback
      </h3>
      <form className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">
            Your name *
          </label>
          <input
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            required
            placeholder="Jane Smith"
            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">
            Comments *
          </label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
            rows={4}
            placeholder="Share your thoughts on this script..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)] resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !authorName.trim() || !body.trim()}
            onClick={e => handleSubmit(e, 'APPROVED')}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#1D9E75] text-white hover:bg-[#178763] disabled:opacity-50 transition-colors"
          >
            {loading ? '…' : 'Approve'}
          </button>
          <button
            type="submit"
            disabled={loading || !authorName.trim() || !body.trim()}
            onClick={e => handleSubmit(e, 'REJECTED')}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? '…' : 'Reject'}
          </button>
          <button
            type="submit"
            disabled={loading || !authorName.trim() || !body.trim()}
            onClick={e => handleSubmit(e, null)}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] text-text-primary dark:text-dark-text hover:bg-[var(--color-bg)] disabled:opacity-50 transition-colors"
          >
            {loading ? '…' : 'Comment'}
          </button>
        </div>
      </form>
    </div>
  )
}

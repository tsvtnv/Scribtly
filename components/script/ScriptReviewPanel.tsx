'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { FeedbackHistory, type CommentEntry } from '@/components/review/FeedbackHistory'

interface ScriptReviewPanelProps {
  comments: CommentEntry[]
}

export function ScriptReviewPanel({ comments }: ScriptReviewPanelProps) {
  const [open, setOpen] = useState(false)

  if (comments.length === 0) return null

  const latestVerdict = [...comments]
    .reverse()
    .find(c => c.verdict != null)?.verdict ?? null

  const lastActivity = comments.reduce((latest, c) =>
    new Date(c.createdAt) > new Date(latest.createdAt) ? c : latest
  )

  return (
    <div className="mb-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          {latestVerdict === 'APPROVED' && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-[#1D9E75]/15 text-[#1D9E75] border border-[#1D9E75]/30">
              Approved
            </span>
          )}
          {latestVerdict === 'REJECTED' && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
              Rejected
            </span>
          )}
          {latestVerdict === null && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-neutral-bg dark:bg-dark-elevated text-text-secondary dark:text-dark-muted border border-[var(--color-border)]">
              Pending
            </span>
          )}
          <span className="text-text-secondary dark:text-dark-muted">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'} · last activity{' '}
            {formatDistanceToNow(new Date(lastActivity.createdAt), { addSuffix: true })}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="text-xs text-[var(--color-primary)] hover:underline"
        >
          {open ? 'Hide feedback' : 'View feedback'}
        </button>
      </div>
      {open && (
        <div className="mt-4">
          <FeedbackHistory comments={comments} />
        </div>
      )}
    </div>
  )
}

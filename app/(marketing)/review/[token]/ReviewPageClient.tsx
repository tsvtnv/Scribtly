'use client'

import { useState } from 'react'
import type { Platform } from '@prisma/client'
import { ReviewForm } from '@/components/review/ReviewForm'
import { FeedbackHistory, type CommentEntry } from '@/components/review/FeedbackHistory'

export interface ReviewScript {
  id: string
  title: string
  platform: Platform
  content: string
  extras: Record<string, string> | null
  wordCount: number | null
  createdAt: string
  client: { name: string } | null
  comments: CommentEntry[]
}

const EXTRAS_LABELS: Record<string, string> = {
  titles: 'Title options',
  description: 'Description',
  hashtags: 'Hashtags',
  hooks: 'Hooks',
  cta: 'Call to action',
}

export function ReviewPageClient({ script, token }: { script: ReviewScript; token: string }) {
  const [comments, setComments] = useState<CommentEntry[]>(script.comments)
  const [openExtras, setOpenExtras] = useState<Record<string, boolean>>({})

  function addComment(comment: CommentEntry) {
    setComments(prev => [...prev, comment])
  }

  const extras = script.extras ?? {}
  const extraKeys = Object.keys(extras).filter(k => extras[k])

  return (
    <div className="flex flex-col gap-8">
      {/* Script content */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
          Script
        </h2>
        <div className="whitespace-pre-wrap text-sm text-text-primary dark:text-dark-text leading-relaxed bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6">
          {script.content}
        </div>
      </div>

      {/* Extras */}
      {extraKeys.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
            Extras
          </h2>
          <div className="flex flex-col gap-2">
            {extraKeys.map(key => (
              <div key={key} className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenExtras(prev => ({ ...prev, [key]: !prev[key] }))}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-text-primary dark:text-dark-text bg-[var(--color-surface)] hover:bg-[var(--color-bg)] transition-colors"
                >
                  <span>{EXTRAS_LABELS[key] ?? key}</span>
                  <span className="text-text-secondary dark:text-dark-muted text-xs">
                    {openExtras[key] ? '▲' : '▼'}
                  </span>
                </button>
                {openExtras[key] && (
                  <div className="px-4 py-3 bg-[var(--color-bg)] text-sm text-text-secondary dark:text-dark-muted whitespace-pre-wrap border-t border-[var(--color-border)]">
                    {extras[key]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review form */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <ReviewForm token={token} onCommentAdded={addComment} />
      </div>

      {/* Feedback history */}
      {comments.length > 0 && (
        <FeedbackHistory comments={comments} />
      )}
    </div>
  )
}

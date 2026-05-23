import { formatDistanceToNow } from 'date-fns'

export interface CommentEntry {
  id: string
  authorName: string
  body: string
  verdict: 'APPROVED' | 'REJECTED' | null
  createdAt: string
}

export function FeedbackHistory({ comments }: { comments: CommentEntry[] }) {
  if (comments.length === 0) return null

  const sorted = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
        Feedback history ({comments.length})
      </h3>
      <div className="flex flex-col gap-3">
        {sorted.map(c => (
          <div
            key={c.id}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-medium text-text-primary dark:text-dark-text">{c.authorName}</span>
              <div className="flex items-center gap-2">
                {c.verdict === 'APPROVED' && (
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-[#1D9E75]/15 text-[#1D9E75] border border-[#1D9E75]/30">
                    Approved
                  </span>
                )}
                {c.verdict === 'REJECTED' && (
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                    Rejected
                  </span>
                )}
                <span className="text-xs text-text-secondary dark:text-dark-muted">
                  {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            <p className="text-text-secondary dark:text-dark-muted whitespace-pre-wrap">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

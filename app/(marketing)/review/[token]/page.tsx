import { PlatformBadge } from '@/components/ui/Badge'
import { ReviewPageClient } from './ReviewPageClient'

interface ReviewScript {
  id: string
  title: string
  platform: string
  content: string
  extras: Record<string, string> | null
  wordCount: number | null
  createdAt: string
  client: { name: string } | null
  comments: Array<{
    id: string
    authorName: string
    body: string
    verdict: 'APPROVED' | 'REJECTED' | null
    createdAt: string
  }>
}

async function fetchScript(token: string): Promise<ReviewScript | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/review/${token}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function ReviewPage({ params }: { params: { token: string } }) {
  const script = await fetchScript(params.token)

  if (!script) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-text-secondary dark:text-dark-muted text-sm">
          This link is invalid or has been disabled.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-2">{script.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary dark:text-dark-muted">
          {script.client && <span>{script.client.name}</span>}
          <PlatformBadge platform={script.platform as never} />
          {script.wordCount != null && <span>{script.wordCount} words</span>}
        </div>
      </div>

      <ReviewPageClient script={script} token={params.token} />
    </div>
  )
}

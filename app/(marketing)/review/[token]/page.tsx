import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import type { Platform } from '@prisma/client'
import { PlatformBadge } from '@/components/ui/Badge'
import { ReviewPageClient } from './ReviewPageClient'
import type { ReviewScript } from './ReviewPageClient'

export async function generateMetadata({ params }: { params: { token: string } }) {
  const script = await prisma.script.findFirst({
    where: { shareToken: params.token, shareEnabled: true },
    select: { title: true, client: { select: { name: true } } },
  })
  if (!script) return { title: 'Review', robots: { index: false, follow: false } }
  return {
    title: `Review: ${script.title}`,
    description: script.client ? `Script review for ${script.client.name}` : 'Script review',
    robots: { index: false, follow: false },
  }
}

const fetchScript = cache(async (token: string): Promise<ReviewScript | null> => {
  const script = await prisma.script.findFirst({
    where: { shareToken: token, shareEnabled: true },
    select: {
      id: true,
      title: true,
      platform: true,
      content: true,
      extras: true,
      wordCount: true,
      createdAt: true,
      client: { select: { name: true } },
      comments: {
        orderBy: { createdAt: 'asc' },
        select: { id: true, authorName: true, body: true, verdict: true, createdAt: true },
      },
    },
  })

  if (!script) return null

  return {
    ...script,
    extras: (script.extras ?? null) as Record<string, string> | null,
    platform: script.platform as Platform,
    createdAt: script.createdAt.toISOString(),
    comments: script.comments.map(c => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
      verdict: c.verdict as 'APPROVED' | 'REJECTED' | null,
    })),
  }
})

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
          <PlatformBadge platform={script.platform} />
          {script.wordCount != null && <span>{script.wordCount} words</span>}
        </div>
      </div>

      <ReviewPageClient script={script} token={params.token} />
    </div>
  )
}

import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { KanbanBoard } from '@/components/pipeline/KanbanBoard'
import { PipelineUpgradePrompt } from '@/components/pipeline/PipelineUpgradePrompt'
import { canAccessPipeline } from '@/lib/planLimits'
import { ContentItem } from '@/types/pipeline'
import type { Script, Client } from '@prisma/client'

export interface ScriptForPipeline extends Script {
  client: { id: string; name: string; avatarColor: string } | null
  contentItem?: { id: string; stage: string } | null
}

export default async function PipelinePage() {
  const { workspace } = await ensureUser()

  if (!canAccessPipeline(workspace.plan)) {
    return (
      <div className="flex flex-col h-full min-h-screen">
        <div className="px-4 py-4 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-lg font-semibold text-text-primary dark:text-dark-text">Content pipeline</h1>
            <p className="text-xs text-text-secondary dark:text-dark-muted mt-0.5">
              Organize your content workflow from idea to published
            </p>
          </div>
        </div>
        <PipelineUpgradePrompt plan={workspace.plan} />
      </div>
    )
  }

  const [rawItems, clients, rawScripts] = await Promise.all([
    prisma.contentItem.findMany({
      where: { workspaceId: workspace.id },
      include: {
        client: { select: { id: true, name: true, avatarColor: true } },
        script:  { select: { id: true, title: true, wordCount: true, duration: true } },
      },
      orderBy: [{ stage: 'asc' }, { position: 'asc' }],
    }),
    prisma.client.findMany({
      where: { workspaceId: workspace.id },
      select: { id: true, name: true, avatarColor: true },
      orderBy: { name: 'asc' },
    }),
    prisma.script.findMany({
      where: { workspaceId: workspace.id, contentItem: null },
      include: { client: { select: { id: true, name: true, avatarColor: true } } },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const items: ContentItem[] = rawItems.map(item => ({
    ...item,
    scheduledDate: item.scheduledDate?.toISOString() ?? null,
    publishedAt:   item.publishedAt?.toISOString()   ?? null,
    createdAt:     item.createdAt.toISOString(),
    updatedAt:     item.updatedAt.toISOString(),
  }))

  const scripts: ScriptForPipeline[] = rawScripts.map(s => ({
    ...s,
    contentItem: null,
  }))

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="px-4 py-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-lg font-semibold text-text-primary dark:text-dark-text">Content pipeline</h1>
          <p className="text-xs text-text-secondary dark:text-dark-muted mt-0.5">
            {items.length} item{items.length !== 1 ? 's' : ''} across all stages
          </p>
        </div>
      </div>
      <KanbanBoard initialItems={items} clients={clients} initialScripts={scripts} />
    </div>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { ValidationError, errorResponse } from '@/lib/errors'
import { groupByStage, STAGES_TUPLE, PLATFORMS_TUPLE } from '@/lib/pipeline'

export const runtime = 'nodejs'

const createSchema = z.object({
  title:         z.string().trim().min(1).max(300),
  clientId:      z.string().min(1),
  platform:      z.enum(PLATFORMS_TUPLE),
  stage:         z.enum(STAGES_TUPLE).default('IDEA'),
  scheduledDate: z.string().optional().nullable(),
  notes:         z.string().trim().max(2000).optional().nullable(),
})

export async function GET(req: NextRequest) {
  try {
    const { workspace } = await ensureUser()
    const { searchParams } = new URL(req.url)
    const clientId  = searchParams.get('clientId')  ?? undefined
    const platform  = searchParams.get('platform')   ?? undefined

    const items = await prisma.contentItem.findMany({
      where: {
        workspaceId: workspace.id,
        ...(clientId ? { clientId } : {}),
        ...(platform && (PLATFORMS_TUPLE as readonly string[]).includes(platform) ? { platform: platform as typeof PLATFORMS_TUPLE[number] } : {}),
      },
      include: {
        client: { select: { id: true, name: true, avatarColor: true } },
        script: { select: { id: true, title: true } },
      },
      orderBy: [{ stage: 'asc' }, { position: 'asc' }],
    })

    return NextResponse.json({ items: groupByStage(items as any) })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { workspace } = await ensureUser()
    const body = await req.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) throw new ValidationError('Invalid item data', { issues: parsed.error.issues })

    const { title, clientId, platform, stage, scheduledDate, notes } = parsed.data

    // Verify client belongs to this workspace
    const client = await prisma.client.findFirst({ where: { id: clientId, workspaceId: workspace.id } })
    if (!client) throw new ValidationError('Client not found', {})

    // Position = max existing + 1 within stage
    const maxPos = await prisma.contentItem.aggregate({
      where: { workspaceId: workspace.id, stage },
      _max: { position: true },
    })
    const position = (maxPos._max.position ?? -1) + 1

    const item = await prisma.contentItem.create({
      data: {
        workspaceId: workspace.id,
        clientId,
        title,
        platform,
        stage,
        position,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        notes: notes ?? null,
      },
      include: {
        client: { select: { id: true, name: true, avatarColor: true } },
        script: { select: { id: true, title: true } },
      },
    })

    return NextResponse.json({ item }, { status: 201 })
  } catch (err) {
    return errorResponse(err)
  }
}

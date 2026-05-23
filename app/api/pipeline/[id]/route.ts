import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { NotFoundError, ForbiddenError, ValidationError, errorResponse } from '@/lib/errors'
import { STAGES_TUPLE, PLATFORMS_TUPLE } from '@/lib/pipeline'

export const runtime = 'nodejs'

const updateSchema = z.object({
  title:         z.string().trim().min(1).max(300).optional(),
  platform:      z.enum(PLATFORMS_TUPLE).optional(),
  stage:         z.enum(STAGES_TUPLE).optional(),
  scheduledDate: z.string().nullable().optional(),
  publishedAt:   z.string().nullable().optional(),
  notes:         z.string().trim().max(2000).nullable().optional(),
  views:         z.number().int().min(0).nullable().optional(),
  position:      z.number().int().min(0).optional(),
  scriptId:      z.string().nullable().optional(),
  clientId:      z.string().optional(),
})

async function getOwnedItem(id: string, workspaceId: string) {
  const item = await prisma.contentItem.findUnique({ where: { id } })
  if (!item) throw new NotFoundError('Content item not found')
  if (item.workspaceId !== workspaceId) throw new ForbiddenError('Access denied')
  return item
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser()
    await getOwnedItem(params.id, workspace.id)

    const body = await req.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) throw new ValidationError('Invalid update data', { issues: parsed.error.issues })

    const data = parsed.data

    // Verify new clientId belongs to this workspace
    if (data.clientId) {
      const client = await prisma.client.findFirst({ where: { id: data.clientId, workspaceId: workspace.id } })
      if (!client) throw new ValidationError('Client not found', {})
    }

    const updated = await prisma.contentItem.update({
      where: { id: params.id },
      data: {
        ...(data.clientId      !== undefined ? { clientId: data.clientId }                                   : {}),
        ...(data.title         !== undefined ? { title: data.title }                                        : {}),
        ...(data.platform      !== undefined ? { platform: data.platform }                                  : {}),
        ...(data.stage         !== undefined ? { stage: data.stage }                                        : {}),
        ...(data.scheduledDate !== undefined ? { scheduledDate: data.scheduledDate ? new Date(data.scheduledDate) : null } : {}),
        ...(data.publishedAt   !== undefined ? { publishedAt: data.publishedAt ? new Date(data.publishedAt) : null }       : {}),
        ...(data.notes         !== undefined ? { notes: data.notes }                                        : {}),
        ...(data.views         !== undefined ? { views: data.views }                                        : {}),
        ...(data.position      !== undefined ? { position: data.position }                                  : {}),
        ...(data.scriptId      !== undefined ? { scriptId: data.scriptId }                                  : {}),
      },
      include: {
        client: { select: { id: true, name: true, avatarColor: true } },
        script: { select: { id: true, title: true } },
      },
    })

    return NextResponse.json({ item: updated })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser()
    await getOwnedItem(params.id, workspace.id)
    await prisma.contentItem.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return errorResponse(err)
  }
}

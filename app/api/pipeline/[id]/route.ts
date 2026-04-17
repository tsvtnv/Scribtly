import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { NotFoundError, ForbiddenError, ValidationError, errorResponse } from '@/lib/errors'

export const runtime = 'nodejs'

const PLATFORMS = ['YOUTUBE', 'TIKTOK', 'REELS', 'LINKEDIN', 'PODCAST'] as const
const STAGES    = ['IDEA', 'SCRIPTING', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED'] as const

const updateSchema = z.object({
  title:         z.string().trim().min(1).max(300).optional(),
  platform:      z.enum(PLATFORMS).optional(),
  stage:         z.enum(STAGES).optional(),
  scheduledDate: z.string().nullable().optional(),
  publishedAt:   z.string().nullable().optional(),
  notes:         z.string().trim().max(2000).nullable().optional(),
  views:         z.number().int().min(0).nullable().optional(),
  position:      z.number().int().min(0).optional(),
  scriptId:      z.string().nullable().optional(),
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
    const updated = await prisma.contentItem.update({
      where: { id: params.id },
      data: {
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

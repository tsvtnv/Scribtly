import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { ValidationError, errorResponse } from '@/lib/errors'
import { STAGES_TUPLE } from '@/lib/pipeline'

export const runtime = 'nodejs'

const reorderSchema = z.object({
  updates: z.array(z.object({
    id:       z.string(),
    stage:    z.enum(STAGES_TUPLE),
    position: z.number().int().min(0),
  })).min(1),
})

export async function POST(req: NextRequest) {
  try {
    const { workspace } = await ensureUser()
    const body = await req.json()
    const parsed = reorderSchema.safeParse(body)
    if (!parsed.success) throw new ValidationError('Invalid reorder data', { issues: parsed.error.issues })

    const { updates } = parsed.data

    // Verify all items belong to this workspace
    const ids = updates.map(u => u.id)
    const items = await prisma.contentItem.findMany({
      where: { id: { in: ids }, workspaceId: workspace.id },
      select: { id: true },
    })
    if (items.length !== ids.length) throw new ValidationError('One or more items not found', {})

    await prisma.$transaction(
      updates.map(({ id, stage, position }) =>
        prisma.contentItem.update({
          where: { id },
          data: { stage, position },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    return errorResponse(err)
  }
}

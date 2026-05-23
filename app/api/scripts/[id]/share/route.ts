import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { NotFoundError, ForbiddenError, ValidationError, errorResponse } from '@/lib/errors'
import { randomToken } from '@/lib/utils'

export const runtime = 'nodejs'

const schema = z.object({ enabled: z.boolean() })

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { workspace } = await ensureUser()

    const script = await prisma.script.findUnique({ where: { id: params.id } })
    if (!script) throw new NotFoundError('Script not found')
    if (script.workspaceId !== workspace.id) throw new ForbiddenError('Access denied')

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) throw new ValidationError('Invalid body', { issues: parsed.error.issues })

    const { enabled } = parsed.data

    const token = enabled && !script.shareToken ? randomToken() : script.shareToken

    const updated = await prisma.script.update({
      where: { id: params.id },
      data: { shareEnabled: enabled, shareToken: token },
      select: { shareToken: true, shareEnabled: true },
    })

    return NextResponse.json(updated)
  } catch (err) {
    return errorResponse(err)
  }
}

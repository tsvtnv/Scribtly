import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const schema = z.object({
  authorName: z.string().trim().min(1).max(100),
  body:       z.string().trim().min(1).max(5000),
  verdict:    z.enum(['APPROVED', 'REJECTED']).optional().nullable(),
})

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const script = await prisma.script.findFirst({
    where: { shareToken: params.token, shareEnabled: true },
    select: { id: true },
  })
  if (!script) {
    return NextResponse.json({ error: 'Script not found' }, { status: 404 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.issues }, { status: 400 })
  }

  const { authorName, body: commentBody, verdict } = parsed.data

  const comment = await prisma.scriptComment.create({
    data: {
      scriptId:   script.id,
      authorName,
      body:       commentBody,
      verdict:    verdict ?? null,
    },
  })

  return NextResponse.json({ ...comment, createdAt: comment.createdAt.toISOString() }, { status: 201 })
}

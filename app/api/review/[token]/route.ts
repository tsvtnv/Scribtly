import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  try {
    const script = await prisma.script.findFirst({
      where: { shareToken: params.token, shareEnabled: true },
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

    if (!script) {
      return NextResponse.json({ error: 'Script not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...script,
      createdAt: script.createdAt.toISOString(),
      comments: script.comments.map(c => ({ ...c, createdAt: c.createdAt.toISOString() })),
    })
  } catch (err) {
    console.error('[review/GET]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

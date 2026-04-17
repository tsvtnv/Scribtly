# Script Client Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow workspace users to share a script via a token-based public URL where clients can view the script, leave comments, and approve/reject — all without a login.

**Architecture:** Add `shareToken`/`shareEnabled` fields to Script and a new `ScriptComment` model. Three new API routes handle share toggle, public script fetch, and comment submission. A public page at `/review/[token]` renders the script and a comment form. In-app, `ScriptActions` gets a Share button and a new `ScriptReviewPanel` shows verdict/history on the script detail page.

**Tech Stack:** Next.js 14 App Router, Prisma, Zod, date-fns, `randomToken()` from `@/lib/utils`, `ensureUser()`, `errorResponse()`, `Button`/`Badge`/`useToast` from existing UI components

---

### Task 1: Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add fields and models to schema**

In `prisma/schema.prisma`, add to the `Script` model (after `updatedAt`):

```prisma
  shareToken   String?  @unique
  shareEnabled Boolean  @default(false)
  comments     ScriptComment[]
```

Add after the `PipelineStage` enum:

```prisma
enum ReviewVerdict {
  APPROVED
  REJECTED
}
```

Add after the `Script` model:

```prisma
model ScriptComment {
  id          String         @id @default(cuid())
  scriptId    String
  script      Script         @relation(fields: [scriptId], references: [id], onDelete: Cascade)
  authorName  String
  body        String
  verdict     ReviewVerdict?
  createdAt   DateTime       @default(now())

  @@index([scriptId])
  @@index([scriptId, createdAt])
}
```

- [ ] **Step 2: Push schema to database**

```bash
npx prisma db push
```

Expected output: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 3: Regenerate Prisma client**

```bash
npx prisma generate
```

Expected: `Generated Prisma Client` message.

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add shareToken, shareEnabled, ScriptComment to schema"
```

---

### Task 2: Share Toggle API

**Files:**
- Create: `app/api/scripts/[id]/share/route.ts`

- [ ] **Step 1: Create the route file**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add app/api/scripts/[id]/share/route.ts
git commit -m "feat: POST /api/scripts/[id]/share — toggle share link"
```

---

### Task 3: Public Review API Routes

**Files:**
- Create: `app/api/review/[token]/route.ts`
- Create: `app/api/review/[token]/comment/route.ts`

- [ ] **Step 1: Create GET /api/review/[token]**

```typescript
// app/api/review/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
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
}
```

- [ ] **Step 2: Create POST /api/review/[token]/comment**

```typescript
// app/api/review/[token]/comment/route.ts
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
```

- [ ] **Step 3: Commit**

```bash
git add app/api/review/[token]/route.ts app/api/review/[token]/comment/route.ts
git commit -m "feat: public review API — GET script, POST comment"
```

---

### Task 4: FeedbackHistory Component

**Files:**
- Create: `components/review/FeedbackHistory.tsx`

- [ ] **Step 1: Create component**

```typescript
// components/review/FeedbackHistory.tsx
import { formatDistanceToNow } from 'date-fns'

export interface CommentEntry {
  id: string
  authorName: string
  body: string
  verdict: 'APPROVED' | 'REJECTED' | null
  createdAt: string
}

export function FeedbackHistory({ comments }: { comments: CommentEntry[] }) {
  if (comments.length === 0) return null

  const sorted = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
        Feedback history ({comments.length})
      </h3>
      <div className="flex flex-col gap-3">
        {sorted.map(c => (
          <div
            key={c.id}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-medium text-text-primary dark:text-dark-text">{c.authorName}</span>
              <div className="flex items-center gap-2">
                {c.verdict === 'APPROVED' && (
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-[#1D9E75]/15 text-[#1D9E75] border border-[#1D9E75]/30">
                    Approved
                  </span>
                )}
                {c.verdict === 'REJECTED' && (
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                    Rejected
                  </span>
                )}
                <span className="text-xs text-text-secondary dark:text-dark-muted">
                  {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            <p className="text-text-secondary dark:text-dark-muted whitespace-pre-wrap">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/review/FeedbackHistory.tsx
git commit -m "feat: FeedbackHistory component for comment audit log"
```

---

### Task 5: ReviewForm Component

**Files:**
- Create: `components/review/ReviewForm.tsx`

- [ ] **Step 1: Create component**

```typescript
// components/review/ReviewForm.tsx
'use client'

import { useState, FormEvent } from 'react'
import type { CommentEntry } from './FeedbackHistory'

interface ReviewFormProps {
  token: string
  onCommentAdded: (comment: CommentEntry) => void
}

export function ReviewForm({ token, onCommentAdded }: ReviewFormProps) {
  const [authorName, setAuthorName] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(verdict: 'APPROVED' | 'REJECTED' | null) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/review/${token}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName, body, verdict }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to submit')
      onCommentAdded(data as CommentEntry)
      setAuthorName('')
      setBody('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: FormEvent, verdict: 'APPROVED' | 'REJECTED' | null) {
    e.preventDefault()
    submit(verdict)
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
        Leave your feedback
      </h3>
      <form className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">
            Your name *
          </label>
          <input
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            required
            placeholder="Jane Smith"
            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">
            Comments *
          </label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
            rows={4}
            placeholder="Share your thoughts on this script..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)] resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !authorName.trim() || !body.trim()}
            onClick={e => handleSubmit(e, 'APPROVED')}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#1D9E75] text-white hover:bg-[#17876300] disabled:opacity-50 transition-colors"
            style={{ backgroundColor: '#1D9E75' }}
            onMouseEnter={e => { if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = '#178763' }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.backgroundColor = '#1D9E75' }}
          >
            {loading ? '…' : 'Approve'}
          </button>
          <button
            type="submit"
            disabled={loading || !authorName.trim() || !body.trim()}
            onClick={e => handleSubmit(e, 'REJECTED')}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? '…' : 'Reject'}
          </button>
          <button
            type="submit"
            disabled={loading || !authorName.trim() || !body.trim()}
            onClick={e => handleSubmit(e, null)}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] text-text-primary dark:text-dark-text hover:bg-[var(--color-bg)] disabled:opacity-50 transition-colors"
          >
            {loading ? '…' : 'Comment'}
          </button>
        </div>
      </form>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/review/ReviewForm.tsx
git commit -m "feat: ReviewForm with Approve/Reject/Comment actions"
```

---

### Task 6: Public Review Page

**Files:**
- Create: `app/(marketing)/review/[token]/page.tsx`

Note: `app/(marketing)/layout.tsx` already exists with `MarketingNav` + `MarketingFooter` — no layout changes needed.

- [ ] **Step 1: Create page (server component — fetches data, renders client components)**

```typescript
// app/(marketing)/review/[token]/page.tsx
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
```

- [ ] **Step 2: Create ReviewPageClient (interactive part)**

Create `app/(marketing)/review/[token]/ReviewPageClient.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { ReviewForm } from '@/components/review/ReviewForm'
import { FeedbackHistory, type CommentEntry } from '@/components/review/FeedbackHistory'

interface ReviewScript {
  id: string
  title: string
  platform: string
  content: string
  extras: Record<string, string> | null
  wordCount: number | null
  createdAt: string
  client: { name: string } | null
  comments: CommentEntry[]
}

const EXTRAS_LABELS: Record<string, string> = {
  titles: 'Title options',
  description: 'Description',
  hashtags: 'Hashtags',
  hooks: 'Hooks',
  cta: 'Call to action',
}

export function ReviewPageClient({ script, token }: { script: ReviewScript; token: string }) {
  const [comments, setComments] = useState<CommentEntry[]>(script.comments)
  const [openExtras, setOpenExtras] = useState<Record<string, boolean>>({})

  function addComment(comment: CommentEntry) {
    setComments(prev => [...prev, comment])
  }

  const extras = script.extras ?? {}
  const extraKeys = Object.keys(extras).filter(k => extras[k])

  return (
    <div className="flex flex-col gap-8">
      {/* Script content */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
          Script
        </h2>
        <div className="whitespace-pre-wrap text-sm text-text-primary dark:text-dark-text leading-relaxed bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6">
          {script.content}
        </div>
      </div>

      {/* Extras */}
      {extraKeys.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-3">
            Extras
          </h2>
          <div className="flex flex-col gap-2">
            {extraKeys.map(key => (
              <div key={key} className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenExtras(prev => ({ ...prev, [key]: !prev[key] }))}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-text-primary dark:text-dark-text bg-[var(--color-surface)] hover:bg-[var(--color-bg)] transition-colors"
                >
                  <span>{EXTRAS_LABELS[key] ?? key}</span>
                  <span className="text-text-secondary dark:text-dark-muted text-xs">
                    {openExtras[key] ? '▲' : '▼'}
                  </span>
                </button>
                {openExtras[key] && (
                  <div className="px-4 py-3 bg-[var(--color-bg)] text-sm text-text-secondary dark:text-dark-muted whitespace-pre-wrap border-t border-[var(--color-border)]">
                    {extras[key]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review form */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <ReviewForm token={token} onCommentAdded={addComment} />
      </div>

      {/* Feedback history */}
      {comments.length > 0 && (
        <FeedbackHistory comments={comments} />
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/(marketing)/review/
git commit -m "feat: public review page at /review/[token]"
```

---

### Task 7: ScriptReviewPanel Component

**Files:**
- Create: `components/script/ScriptReviewPanel.tsx`

This component receives script id + comments as props from the page (no extra fetch needed).

- [ ] **Step 1: Create component**

```typescript
// components/script/ScriptReviewPanel.tsx
'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { FeedbackHistory, type CommentEntry } from '@/components/review/FeedbackHistory'

interface ScriptReviewPanelProps {
  comments: CommentEntry[]
}

export function ScriptReviewPanel({ comments }: ScriptReviewPanelProps) {
  const [open, setOpen] = useState(false)

  if (comments.length === 0) return null

  const latestVerdict = [...comments]
    .reverse()
    .find(c => c.verdict != null)?.verdict ?? null

  const lastActivity = comments.reduce((latest, c) =>
    new Date(c.createdAt) > new Date(latest.createdAt) ? c : latest
  )

  return (
    <div className="mb-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          {latestVerdict === 'APPROVED' && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-[#1D9E75]/15 text-[#1D9E75] border border-[#1D9E75]/30">
              Approved
            </span>
          )}
          {latestVerdict === 'REJECTED' && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
              Rejected
            </span>
          )}
          {latestVerdict === null && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-neutral-bg dark:bg-dark-elevated text-text-secondary dark:text-dark-muted border border-[var(--color-border)]">
              Pending
            </span>
          )}
          <span className="text-text-secondary dark:text-dark-muted">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'} · last activity{' '}
            {formatDistanceToNow(new Date(lastActivity.createdAt), { addSuffix: true })}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="text-xs text-[var(--color-primary)] hover:underline"
        >
          {open ? 'Hide feedback' : 'View feedback'}
        </button>
      </div>
      {open && (
        <div className="mt-4">
          <FeedbackHistory comments={comments} />
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/script/ScriptReviewPanel.tsx
git commit -m "feat: ScriptReviewPanel — in-app verdict and feedback history"
```

---

### Task 8: Update ScriptActions (Share Button)

**Files:**
- Modify: `components/script/ScriptActions.tsx`

- [ ] **Step 1: Replace file with updated version**

```typescript
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Script, ScriptStatus, Plan } from "@prisma/client";
import { Copy, FileDown, CheckCircle, Send, Trash2, Share2, Link, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface ScriptActionsProps {
  script: Script & { shareToken?: string | null; shareEnabled?: boolean }
  plan: Plan
}

export function ScriptActions({ script, plan }: ScriptActionsProps) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [shareEnabled, setShareEnabled] = useState(script.shareEnabled ?? false);
  const [shareToken, setShareToken] = useState(script.shareToken ?? null);
  const [shareOpen, setShareOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const canPdf = plan === "PRO" || plan === "AGENCY";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(script.content);
      toast.push("Copied to clipboard", "success");
    } catch {
      toast.push("Copy failed", "error");
    }
  }

  async function setStatus(status: ScriptStatus) {
    setBusy(status);
    const res = await fetch(`/api/scripts/${script.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    if (res.ok) {
      toast.push(`Marked as ${status.toLowerCase()}`, "success");
      router.refresh();
    } else {
      toast.push("Update failed", "error");
    }
  }

  async function remove() {
    setBusy("delete");
    const res = await fetch(`/api/scripts/${script.id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) {
      toast.push("Deleted", "success");
      router.push("/scripts");
    } else {
      toast.push("Delete failed", "error");
    }
  }

  async function enableShare() {
    setBusy("share");
    const res = await fetch(`/api/scripts/${script.id}/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true }),
    });
    setBusy(null);
    if (!res.ok) { toast.push("Failed to create share link", "error"); return; }
    const data = await res.json();
    setShareEnabled(true);
    setShareToken(data.shareToken);
    const url = `${window.location.origin}/review/${data.shareToken}`;
    await navigator.clipboard.writeText(url).catch(() => {});
    toast.push("Link copied!", "success");
  }

  async function disableShare() {
    setBusy("share-disable");
    const res = await fetch(`/api/scripts/${script.id}/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: false }),
    });
    setBusy(null);
    if (!res.ok) { toast.push("Failed to disable sharing", "error"); return; }
    setShareEnabled(false);
    setShareOpen(false);
    toast.push("Sharing disabled", "success");
  }

  async function copyLink() {
    if (!shareToken) return;
    const url = `${window.location.origin}/review/${shareToken}`;
    await navigator.clipboard.writeText(url).catch(() => {});
    toast.push("Link copied!", "success");
  }

  const shareUrl = shareToken ? `${typeof window !== 'undefined' ? window.location.origin : ''}/review/${shareToken}` : '';

  return (
    <div className="sticky bottom-0 bg-[var(--color-surface)] border-t-hair border-[var(--color-border)] -mx-6 md:-mx-10 px-6 md:px-10 py-3 flex flex-wrap items-center gap-2">
      <Button variant="secondary" size="sm" onClick={copy}>
        <Copy size={14} /> Copy
      </Button>
      {canPdf ? (
        <a href={`/api/export/pdf/${script.id}`} target="_blank" rel="noreferrer">
          <Button variant="secondary" size="sm">
            <FileDown size={14} /> PDF
          </Button>
        </a>
      ) : null}
      {script.status !== "FINAL" ? (
        <Button variant="secondary" size="sm" loading={busy === "FINAL"} onClick={() => setStatus("FINAL")}>
          <CheckCircle size={14} /> Mark final
        </Button>
      ) : null}
      {script.status !== "SENT" ? (
        <Button variant="secondary" size="sm" loading={busy === "SENT"} onClick={() => setStatus("SENT")}>
          <Send size={14} /> Mark sent
        </Button>
      ) : null}

      {/* Share button */}
      <div className="relative" ref={dropdownRef}>
        {!shareEnabled ? (
          <Button
            variant="secondary"
            size="sm"
            loading={busy === "share"}
            onClick={enableShare}
          >
            <Share2 size={14} /> Share with client
          </Button>
        ) : (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShareOpen(v => !v)}
            >
              <Share2 size={14} /> Shared
            </Button>
            {shareOpen && (
              <div className="absolute bottom-full mb-2 right-0 w-72 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg p-3 flex flex-col gap-2 z-50">
                <div className="flex items-center gap-2">
                  <Link size={12} className="text-text-secondary dark:text-dark-muted flex-shrink-0" />
                  <span className="text-xs text-text-secondary dark:text-dark-muted truncate flex-1">{shareUrl}</span>
                </div>
                <Button variant="secondary" size="sm" onClick={copyLink}>
                  <Copy size={12} /> Copy link
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  loading={busy === "share-disable"}
                  onClick={disableShare}
                >
                  <X size={12} /> Disable sharing
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {confirmDelete ? (
          <>
            <span className="text-xs text-text-secondary">Sure?</span>
            <Button variant="danger" size="sm" loading={busy === "delete"} onClick={remove}>
              Delete
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(true)}>
            <Trash2 size={14} /> Delete
          </Button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/script/ScriptActions.tsx
git commit -m "feat: add Share button with State A/B to ScriptActions"
```

---

### Task 9: Update Script Detail Page

**Files:**
- Modify: `app/(app)/scripts/[id]/page.tsx`

- [ ] **Step 1: Update page to include comments + ScriptReviewPanel**

Replace the file content:

```typescript
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ensureUser } from "@/lib/ensureUser";
import { prisma } from "@/lib/prisma";
import { ScriptTitleEditor } from "@/components/script/ScriptTitleEditor";
import { ScriptEditor } from "@/components/script/ScriptEditor";
import { ExtrasPanel } from "@/components/script/ExtrasPanel";
import { ScriptActions } from "@/components/script/ScriptActions";
import { ScriptReviewPanel } from "@/components/script/ScriptReviewPanel";
import { PlatformBadge, StatusBadge } from "@/components/ui/Badge";
import { ClientAvatar } from "@/components/client/ClientAvatar";
import { relativeDate } from "@/lib/utils";

export default async function ScriptViewPage({ params }: { params: { id: string } }) {
  const { workspace } = await ensureUser();
  const script = await prisma.script.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      comments: {
        orderBy: { createdAt: 'asc' },
        select: { id: true, authorName: true, body: true, verdict: true, createdAt: true },
      },
    },
  });
  if (!script || script.workspaceId !== workspace.id) notFound();

  const extras = (script.extras as Record<string, string> | null) || {};

  const comments = script.comments.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    verdict: c.verdict as 'APPROVED' | 'REJECTED' | null,
  }));

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto pb-20">
      <Link href="/scripts" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary">
        <ArrowLeft size={14} /> Back to library
      </Link>

      <div className="mt-3 mb-5">
        <ScriptTitleEditor scriptId={script.id} initial={script.title} />
        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-text-secondary dark:text-dark-muted">
          {script.client ? (
            <div className="flex items-center gap-1.5">
              <ClientAvatar name={script.client.name} color={script.client.avatarColor} size={16} />
              <Link href={`/clients/${script.client.id}`} className="hover:text-primary">{script.client.name}</Link>
            </div>
          ) : (
            <span>Unassigned</span>
          )}
          <PlatformBadge platform={script.platform} />
          <span>{script.duration}</span>
          <span>·</span>
          <span>{script.wordCount ?? 0} words</span>
          <span>·</span>
          <span>Created {relativeDate(script.createdAt)}</span>
          <StatusBadge status={script.status} />
        </div>
      </div>

      <ScriptReviewPanel comments={comments} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <ScriptEditor scriptId={script.id} initialContent={script.content} />
        </div>
        {Object.keys(extras).length > 0 ? <ExtrasPanel scriptId={script.id} extras={extras} /> : null}
      </div>

      <ScriptActions script={script} plan={workspace.plan} />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/(app)/scripts/[id]/page.tsx"
git commit -m "feat: wire ScriptReviewPanel and comments into script detail page"
```

---

## Self-Review

**Spec coverage check:**
- ✅ shareToken/shareEnabled on Script model — Task 1
- ✅ ScriptComment model with ReviewVerdict enum — Task 1
- ✅ POST /api/scripts/[id]/share (auth, generate token, toggle) — Task 2
- ✅ GET /api/review/[token] (public, returns script+comments) — Task 3
- ✅ POST /api/review/[token]/comment (Zod validation, create comment) — Task 3
- ✅ Public review page layout (header, content, extras collapsed, review panel, history) — Task 6
- ✅ FeedbackHistory component (shared between public page and in-app) — Task 4
- ✅ ReviewForm with Approve/Reject/Comment buttons — Task 5
- ✅ ScriptActions Share button (State A: enable+copy, State B: dropdown with copy+disable) — Task 8
- ✅ ScriptReviewPanel (verdict badge, comment count, last activity, toggle history) — Task 7
- ✅ Page passes comments/share props — Task 9

**Placeholder scan:** None found — all steps contain complete code.

**Type consistency:** `CommentEntry` interface defined in `FeedbackHistory.tsx` and re-exported/imported by `ReviewPageClient`, `ScriptReviewPanel`, and the page file. `verdict` typed as `'APPROVED' | 'REJECTED' | null` consistently throughout.

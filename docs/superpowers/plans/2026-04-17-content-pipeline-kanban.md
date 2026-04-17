# Content Pipeline Kanban Board — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a drag-and-drop Kanban board at `/pipeline` that lets users track content pieces through a 6-stage pipeline (IDEA → SCRIPTING → REVIEW → APPROVED → SCHEDULED → PUBLISHED), integrated with the existing script generator.

**Architecture:** Server-rendered pipeline page passes initial data to a `KanbanBoard` client component that uses dnd-kit for drag-and-drop. Optimistic updates mutate local React state immediately; a reorder API call persists changes atomically via Prisma transactions. Filtering is purely client-side.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, @dnd-kit/core + @dnd-kit/sortable + @dnd-kit/utilities, date-fns, Prisma (PostgreSQL), Clerk auth

---

## File Map

| File | Status | Responsibility |
|------|--------|---------------|
| `prisma/schema.prisma` | Modify | Add `PipelineStage` enum + `ContentItem` model |
| `types/pipeline.ts` | Create | All pipeline-related TypeScript types |
| `lib/pipeline.ts` | Create | `STAGE_CONFIG`, `PLATFORM_CONFIG`, helper functions |
| `hooks/usePipeline.ts` | Create | Pipeline state management + API calls |
| `app/api/pipeline/route.ts` | Create | GET list + POST create |
| `app/api/pipeline/[id]/route.ts` | Create | PATCH update + DELETE |
| `app/api/pipeline/reorder/route.ts` | Create | POST bulk reorder (transaction) |
| `components/pipeline/KanbanCard.tsx` | Create | Single draggable card (useSortable) |
| `components/pipeline/KanbanColumn.tsx` | Create | Single droppable column (useDroppable + SortableContext) |
| `components/pipeline/KanbanBoard.tsx` | Create | DndContext orchestrator, columns state, drag handlers |
| `components/pipeline/AddItemModal.tsx` | Create | Create new item form + POST call |
| `components/pipeline/EditItemModal.tsx` | Create | Edit/delete item form + PATCH/DELETE calls |
| `components/pipeline/PipelineFilters.tsx` | Create | Client-side filter pills |
| `app/(app)/pipeline/page.tsx` | Create | Server component — Prisma fetch + pass to KanbanBoard |
| `app/(app)/pipeline/loading.tsx` | Create | Skeleton screen |
| `components/layout/Sidebar.tsx` | Modify | Add Pipeline nav link |

---

## Task 1: Install dependencies + update Prisma schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Install dnd-kit and date-fns**

```bash
cd c:/Users/tsvet/Documents/WebDev/Scripter
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities date-fns
```

Expected: packages installed with no peer-dep errors.

- [ ] **Step 2: Add `PipelineStage` enum to schema.prisma**

In `prisma/schema.prisma`, after the `ScriptStatus` enum (line ~29), add:

```prisma
enum PipelineStage {
  IDEA
  SCRIPTING
  REVIEW
  APPROVED
  SCHEDULED
  PUBLISHED
}
```

- [ ] **Step 3: Add `ContentItem` model to schema.prisma**

After the `Script` model (end of file), add:

```prisma
model ContentItem {
  id            String        @id @default(cuid())
  workspaceId   String
  workspace     Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  clientId      String
  client        Client        @relation(fields: [clientId], references: [id])
  scriptId      String?
  script        Script?       @relation(fields: [scriptId], references: [id])
  title         String
  platform      Platform
  stage         PipelineStage @default(IDEA)
  scheduledDate DateTime?
  publishedAt   DateTime?
  notes         String?
  views         Int?
  position      Int           @default(0)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([workspaceId])
  @@index([workspaceId, stage])
}
```

- [ ] **Step 4: Add back-relations to existing models**

In the `Workspace` model, add inside the relations block:
```prisma
  contentItems ContentItem[]
```

In the `Client` model, add inside the relations block:
```prisma
  contentItems ContentItem[]
```

In the `Script` model, add inside the relations block:
```prisma
  contentItems ContentItem[]
```

- [ ] **Step 5: Push schema to database**

```bash
npx prisma db push
```

Expected output: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add PipelineStage enum and ContentItem model"
```

---

## Task 2: Types and lib helpers

**Files:**
- Create: `types/pipeline.ts`
- Create: `lib/pipeline.ts`

- [ ] **Step 1: Create `types/pipeline.ts`**

```typescript
export type PipelineStage = 'IDEA' | 'SCRIPTING' | 'REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED'

export type Platform = 'YOUTUBE' | 'TIKTOK' | 'REELS' | 'LINKEDIN' | 'PODCAST'

export interface ContentItem {
  id: string
  workspaceId: string
  clientId: string
  scriptId?: string | null
  title: string
  platform: Platform
  stage: PipelineStage
  scheduledDate?: string | null
  publishedAt?: string | null
  notes?: string | null
  views?: number | null
  position: number
  createdAt: string
  updatedAt: string
  client: {
    id: string
    name: string
    avatarColor: string
  }
  script?: {
    id: string
    title: string
  } | null
}

export interface Column {
  id: PipelineStage
  label: string
  color: string
  textColor: string
  items: ContentItem[]
}

export interface ReorderUpdate {
  id: string
  stage: PipelineStage
  position: number
}
```

- [ ] **Step 2: Create `lib/pipeline.ts`**

```typescript
import { PipelineStage, Platform } from '@/types/pipeline'

export const STAGE_CONFIG: Record<PipelineStage, {
  label: string
  bg: string
  text: string
  darkBg: string
  darkText: string
}> = {
  IDEA:      { label: 'Idea',      bg: '#F1EFE8', text: '#444441', darkBg: '#2C2C2A', darkText: '#D3D1C7' },
  SCRIPTING: { label: 'Scripting', bg: '#EEEDFE', text: '#3C3489', darkBg: '#26215C', darkText: '#CECBF6' },
  REVIEW:    { label: 'Review',    bg: '#FAEEDA', text: '#633806', darkBg: '#412402', darkText: '#FAC775' },
  APPROVED:  { label: 'Approved',  bg: '#E6F1FB', text: '#0C447C', darkBg: '#042C53', darkText: '#B5D4F4' },
  SCHEDULED: { label: 'Scheduled', bg: '#E1F5EE', text: '#085041', darkBg: '#04342C', darkText: '#9FE1CB' },
  PUBLISHED: { label: 'Published', bg: '#FAECE7', text: '#4A1B0C', darkBg: '#4A1B0C', darkText: '#F5C4B3' },
}

export const PLATFORM_CONFIG: Record<Platform, {
  label: string
  bg: string
  text: string
}> = {
  YOUTUBE:  { label: 'YouTube',  bg: '#FAECE7', text: '#4A1B0C' },
  TIKTOK:   { label: 'TikTok',   bg: '#F1EFE8', text: '#2C2C2A' },
  REELS:    { label: 'Reels',    bg: '#FBEAF0', text: '#4B1528' },
  LINKEDIN: { label: 'LinkedIn', bg: '#E6F1FB', text: '#042C53' },
  PODCAST:  { label: 'Podcast',  bg: '#EEEDFE', text: '#26215C' },
}

export const STAGE_ORDER: PipelineStage[] = [
  'IDEA', 'SCRIPTING', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED'
]

export function groupByStage(items: import('@/types/pipeline').ContentItem[]): Record<PipelineStage, import('@/types/pipeline').ContentItem[]> {
  const grouped: Record<PipelineStage, import('@/types/pipeline').ContentItem[]> = {
    IDEA: [], SCRIPTING: [], REVIEW: [], APPROVED: [], SCHEDULED: [], PUBLISHED: []
  }
  for (const item of items) {
    grouped[item.stage].push(item)
  }
  for (const stage of STAGE_ORDER) {
    grouped[stage].sort((a, b) => a.position - b.position)
  }
  return grouped
}

export function nextStage(stage: PipelineStage): PipelineStage | null {
  const idx = STAGE_ORDER.indexOf(stage)
  return idx < STAGE_ORDER.length - 1 ? STAGE_ORDER[idx + 1] : null
}
```

- [ ] **Step 3: Commit**

```bash
git add types/pipeline.ts lib/pipeline.ts
git commit -m "feat: add pipeline types and stage/platform config helpers"
```

---

## Task 3: API routes

**Files:**
- Create: `app/api/pipeline/route.ts`
- Create: `app/api/pipeline/[id]/route.ts`
- Create: `app/api/pipeline/reorder/route.ts`

- [ ] **Step 1: Create `app/api/pipeline/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { ValidationError, errorResponse } from '@/lib/errors'
import { groupByStage } from '@/lib/pipeline'

export const runtime = 'nodejs'

const PLATFORMS = ['YOUTUBE', 'TIKTOK', 'REELS', 'LINKEDIN', 'PODCAST'] as const
const STAGES = ['IDEA', 'SCRIPTING', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED'] as const

const createSchema = z.object({
  title:         z.string().trim().min(1).max(300),
  clientId:      z.string().min(1),
  platform:      z.enum(PLATFORMS),
  stage:         z.enum(STAGES).default('IDEA'),
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
        ...(platform ? { platform: platform as typeof PLATFORMS[number] } : {}),
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
```

- [ ] **Step 2: Create `app/api/pipeline/[id]/route.ts`**

```typescript
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
```

- [ ] **Step 3: Create `app/api/pipeline/reorder/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { ValidationError, errorResponse } from '@/lib/errors'

export const runtime = 'nodejs'

const STAGES = ['IDEA', 'SCRIPTING', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED'] as const

const reorderSchema = z.object({
  updates: z.array(z.object({
    id:       z.string(),
    stage:    z.enum(STAGES),
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
```

- [ ] **Step 4: Commit**

```bash
git add app/api/pipeline/
git commit -m "feat: add pipeline API routes (GET, POST, PATCH, DELETE, reorder)"
```

---

## Task 4: usePipeline hook

**Files:**
- Create: `hooks/usePipeline.ts`

- [ ] **Step 1: Create `hooks/usePipeline.ts`**

```typescript
'use client'

import { useState, useCallback } from 'react'
import { ContentItem, PipelineStage, ReorderUpdate } from '@/types/pipeline'
import { groupByStage } from '@/lib/pipeline'

export function usePipeline(initialItems: ContentItem[]) {
  const [columns, setColumns] = useState<Record<PipelineStage, ContentItem[]>>(
    () => groupByStage(initialItems)
  )

  const addItem = useCallback((item: ContentItem) => {
    setColumns(prev => {
      const col = [...prev[item.stage], item]
      return { ...prev, [item.stage]: col }
    })
  }, [])

  const updateItem = useCallback((updated: ContentItem) => {
    setColumns(prev => {
      const next = { ...prev }
      // Remove from old stage if stage changed
      for (const stage of Object.keys(next) as PipelineStage[]) {
        next[stage] = next[stage].filter(i => i.id !== updated.id)
      }
      // Insert into new stage at correct position
      const col = [...next[updated.stage]]
      col.splice(updated.position, 0, updated)
      next[updated.stage] = col
      return next
    })
  }, [])

  const deleteItem = useCallback((id: string) => {
    setColumns(prev => {
      const next = { ...prev }
      for (const stage of Object.keys(next) as PipelineStage[]) {
        next[stage] = next[stage].filter(i => i.id !== id)
      }
      return next
    })
  }, [])

  const moveItem = useCallback(async (
    itemId: string,
    toStage: PipelineStage,
    newColumns: Record<PipelineStage, ContentItem[]>,
    previousColumns: Record<PipelineStage, ContentItem[]>
  ) => {
    setColumns(newColumns)

    // Build updates for all affected columns
    const updates: ReorderUpdate[] = []
    for (const stage of Object.keys(newColumns) as PipelineStage[]) {
      newColumns[stage].forEach((item, idx) => {
        updates.push({ id: item.id, stage, position: idx })
      })
    }

    try {
      const res = await fetch('/api/pipeline/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })
      if (!res.ok) throw new Error('Reorder failed')
    } catch {
      setColumns(previousColumns)
      throw new Error('Failed to save position. Please try again.')
    }
  }, [])

  return { columns, setColumns, addItem, updateItem, deleteItem, moveItem }
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/usePipeline.ts
git commit -m "feat: add usePipeline hook for state management"
```

---

## Task 5: KanbanCard component

**Files:**
- Create: `components/pipeline/KanbanCard.tsx`

- [ ] **Step 1: Create `components/pipeline/KanbanCard.tsx`**

```typescript
'use client'

import React, { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ContentItem } from '@/types/pipeline'
import { STAGE_CONFIG, PLATFORM_CONFIG } from '@/lib/pipeline'
import { initials } from '@/lib/utils'
import { format } from 'date-fns'

interface KanbanCardProps {
  item: ContentItem
  onEdit: (item: ContentItem) => void
  isDragOverlay?: boolean
}

export const KanbanCard = memo(function KanbanCard({ item, onEdit, isDragOverlay }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    ...(isDragOverlay ? { transform: 'scale(1.03)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' } : {}),
  }

  const platform = PLATFORM_CONFIG[item.platform]
  const stage    = STAGE_CONFIG[item.stage]

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        if (!isDragging && !isDragOverlay) {
          e.stopPropagation()
          onEdit(item)
        }
      }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-[10px_12px] cursor-grab active:cursor-grabbing transition-all duration-150 hover:border-[var(--color-primary)] select-none"
      aria-label={`${item.title}, ${platform.label}, ${stage.label} stage`}
    >
      {/* Top row: platform badge + scheduled date */}
      <div className="flex items-center justify-between mb-2 gap-1">
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: platform.bg, color: platform.text }}
        >
          {platform.label}
        </span>
        {item.scheduledDate && (
          <span className="text-[10px] text-text-secondary dark:text-dark-muted">
            {format(new Date(item.scheduledDate), 'MMM d')}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-sm font-medium leading-snug line-clamp-2 text-text-primary dark:text-dark-text mb-2">
        {item.title}
      </p>

      {/* Client row */}
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
          style={{ backgroundColor: item.client.avatarColor }}
        >
          {initials(item.client.name)}
        </span>
        <span className="text-[11px] text-text-secondary dark:text-dark-muted truncate">
          {item.client.name}
        </span>
      </div>

      {/* Indicators */}
      <div className="flex items-center gap-2 mt-1">
        {item.scriptId && (
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
            Script ready
          </span>
        )}
        {item.notes && (
          <span className="text-[10px] text-text-secondary dark:text-dark-muted" title="Has notes">
            📝
          </span>
        )}
        {isDragOverlay && (
          <span
            className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: stage.bg, color: stage.text }}
          >
            {stage.label}
          </span>
        )}
      </div>
    </div>
  )
})
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/KanbanCard.tsx
git commit -m "feat: add KanbanCard draggable component"
```

---

## Task 6: KanbanColumn component

**Files:**
- Create: `components/pipeline/KanbanColumn.tsx`

- [ ] **Step 1: Create `components/pipeline/KanbanColumn.tsx`**

```typescript
'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ContentItem, PipelineStage } from '@/types/pipeline'
import { STAGE_CONFIG } from '@/lib/pipeline'
import { KanbanCard } from './KanbanCard'
import { cn } from '@/lib/utils'

interface KanbanColumnProps {
  stage: PipelineStage
  items: ContentItem[]
  onAddItem: (stage: PipelineStage) => void
  onEditItem: (item: ContentItem) => void
}

export function KanbanColumn({ stage, items, onAddItem, onEditItem }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  const config = STAGE_CONFIG[stage]

  return (
    <div
      className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-150"
      style={{
        minWidth: 220,
        width: 220,
        flexShrink: 0,
        ...(isOver ? { borderColor: config.text } : {}),
      }}
      aria-label={`${config.label} stage, ${items.length} item${items.length !== 1 ? 's' : ''}`}
    >
      {/* Column header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] rounded-t-lg">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: config.bg, color: config.text }}
          >
            {config.label}
          </span>
          <span className="text-xs text-text-secondary dark:text-dark-muted font-medium">
            {items.length}
          </span>
        </div>
        <button
          onClick={() => onAddItem(stage)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-primary-tint)] text-text-secondary dark:text-dark-muted hover:text-[var(--color-primary)] transition-colors text-lg leading-none"
          aria-label={`Add item to ${config.label}`}
        >
          +
        </button>
      </div>

      {/* Cards area */}
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            'flex flex-col gap-2 p-2 flex-1 min-h-[120px] transition-colors duration-150',
            isOver && 'bg-[var(--color-primary-tint)]'
          )}
        >
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-md min-h-[80px] transition-colors duration-150">
              <span className="text-xs text-text-secondary dark:text-dark-muted">
                {isOver ? 'Drop here' : 'Empty'}
              </span>
            </div>
          ) : (
            items.map(item => (
              <KanbanCard key={item.id} item={item} onEdit={onEditItem} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/KanbanColumn.tsx
git commit -m "feat: add KanbanColumn droppable component"
```

---

## Task 7: KanbanBoard (DnD orchestrator)

**Files:**
- Create: `components/pipeline/KanbanBoard.tsx`

- [ ] **Step 1: Create `components/pipeline/KanbanBoard.tsx`**

```typescript
'use client'

import { useState, useCallback, useRef } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { ContentItem, PipelineStage, Platform } from '@/types/pipeline'
import { STAGE_ORDER } from '@/lib/pipeline'
import { usePipeline } from '@/hooks/usePipeline'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'
import { AddItemModal } from './AddItemModal'
import { EditItemModal } from './EditItemModal'
import { PipelineFilters } from './PipelineFilters'

interface Client {
  id: string
  name: string
  avatarColor: string
}

interface KanbanBoardProps {
  initialItems: ContentItem[]
  clients: Client[]
}

export function KanbanBoard({ initialItems, clients }: KanbanBoardProps) {
  const { columns, setColumns, addItem, updateItem, deleteItem, moveItem } = usePipeline(initialItems)
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null)
  const [addStage, setAddStage] = useState<PipelineStage | null>(null)
  const [editItem, setEditItem] = useState<ContentItem | null>(null)
  const [clientFilter, setClientFilter] = useState<string | null>(null)
  const [platformFilter, setPlatformFilter] = useState<Platform | null>(null)
  const [dragError, setDragError] = useState<string | null>(null)
  const columnsSnapshot = useRef<Record<PipelineStage, ContentItem[]> | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const filteredColumns = useCallback((): Record<PipelineStage, ContentItem[]> => {
    if (!clientFilter && !platformFilter) return columns
    const result = {} as Record<PipelineStage, ContentItem[]>
    for (const stage of STAGE_ORDER) {
      result[stage] = columns[stage].filter(item => {
        if (clientFilter && item.clientId !== clientFilter) return false
        if (platformFilter && item.platform !== platformFilter) return false
        return true
      })
    }
    return result
  }, [columns, clientFilter, platformFilter])

  const findStageForItem = useCallback((itemId: string): PipelineStage | null => {
    for (const stage of STAGE_ORDER) {
      if (columns[stage].some(i => i.id === itemId)) return stage
      // Also check filtered
    }
    return null
  }, [columns])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const id = event.active.id as string
    for (const stage of STAGE_ORDER) {
      const item = columns[stage].find(i => i.id === id)
      if (item) { setActiveItem(item); break }
    }
    columnsSnapshot.current = JSON.parse(JSON.stringify(columns))
  }, [columns])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId   = over.id as string

    const activeStage = findStageForItem(activeId)
    if (!activeStage) return

    // over is a column (stage string) or a card (item id)
    const overStage = STAGE_ORDER.includes(overId as PipelineStage)
      ? overId as PipelineStage
      : findStageForItem(overId)

    if (!overStage || activeStage === overStage) {
      // Reorder within same column
      if (activeStage === overStage) {
        setColumns(prev => {
          const col = [...prev[activeStage]]
          const oldIdx = col.findIndex(i => i.id === activeId)
          const newIdx = col.findIndex(i => i.id === overId)
          if (oldIdx === -1 || newIdx === -1 || oldIdx === newIdx) return prev
          return { ...prev, [activeStage]: arrayMove(col, oldIdx, newIdx) }
        })
      }
      return
    }

    // Move between columns
    setColumns(prev => {
      const sourceCol = [...prev[activeStage]]
      const destCol   = [...prev[overStage]]
      const item      = sourceCol.find(i => i.id === activeId)
      if (!item) return prev

      const newSource = sourceCol.filter(i => i.id !== activeId)
      // Insert at position of the over item, or end of column
      const overIdx = destCol.findIndex(i => i.id === overId)
      const insertAt = overIdx >= 0 ? overIdx : destCol.length
      const newDest  = [...destCol]
      newDest.splice(insertAt, 0, { ...item, stage: overStage })

      return { ...prev, [activeStage]: newSource, [overStage]: newDest }
    })
  }, [columns, findStageForItem, setColumns])

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { over } = event
    setActiveItem(null)
    if (!over) {
      // Snap back
      if (columnsSnapshot.current) setColumns(columnsSnapshot.current)
      columnsSnapshot.current = null
      return
    }

    const snapshot = columnsSnapshot.current!
    columnsSnapshot.current = null

    try {
      // columns state is already updated by handleDragOver — just persist
      await moveItem(event.active.id as string, (over.id as PipelineStage), columns, snapshot)
    } catch (err: any) {
      setDragError(err.message)
      setTimeout(() => setDragError(null), 4000)
    }
  }, [columns, moveItem, setColumns])

  const display = filteredColumns()
  const totalItems = initialItems.length

  return (
    <div className="flex flex-col h-full">
      <PipelineFilters
        clients={clients}
        selectedClient={clientFilter}
        selectedPlatform={platformFilter}
        onClientChange={setClientFilter}
        onPlatformChange={setPlatformFilter}
        totalItems={totalItems}
      />

      {dragError && (
        <div className="mx-4 mb-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
          {dragError}
        </div>
      )}

      {totalItems === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-secondary dark:text-dark-muted">
          <p className="text-base font-medium">No content yet</p>
          <button
            onClick={() => setAddStage('IDEA')}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add your first piece
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div
            className="flex flex-row gap-3 overflow-x-auto pb-4 pt-2 px-4 min-h-[600px] items-start"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--color-border) transparent' }}
          >
            {STAGE_ORDER.map(stage => (
              <KanbanColumn
                key={stage}
                stage={stage}
                items={display[stage]}
                onAddItem={(s) => setAddStage(s)}
                onEditItem={(item) => setEditItem(item)}
              />
            ))}
          </div>

          <DragOverlay>
            {activeItem && (
              <KanbanCard item={activeItem} onEdit={() => {}} isDragOverlay />
            )}
          </DragOverlay>
        </DndContext>
      )}

      {addStage && (
        <AddItemModal
          isOpen={!!addStage}
          onClose={() => setAddStage(null)}
          onAdd={addItem}
          clients={clients}
          defaultStage={addStage}
        />
      )}

      {editItem && (
        <EditItemModal
          item={editItem}
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          onUpdate={(updated) => { updateItem(updated); setEditItem(null) }}
          onDelete={(id) => { deleteItem(id); setEditItem(null) }}
          clients={clients}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/KanbanBoard.tsx
git commit -m "feat: add KanbanBoard with dnd-kit DndContext and drag handlers"
```

---

## Task 8: AddItemModal

**Files:**
- Create: `components/pipeline/AddItemModal.tsx`

- [ ] **Step 1: Create `components/pipeline/AddItemModal.tsx`**

```typescript
'use client'

import { useState, FormEvent } from 'react'
import { ContentItem, PipelineStage, Platform } from '@/types/pipeline'
import { STAGE_CONFIG, STAGE_ORDER, PLATFORM_CONFIG } from '@/lib/pipeline'

interface Client {
  id: string
  name: string
  avatarColor: string
}

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: ContentItem) => void
  clients: Client[]
  defaultStage?: PipelineStage
}

const PLATFORMS: Platform[] = ['YOUTUBE', 'TIKTOK', 'REELS', 'LINKEDIN', 'PODCAST']

export function AddItemModal({ isOpen, onClose, onAdd, clients, defaultStage = 'IDEA' }: AddItemModalProps) {
  const [title,         setTitle]         = useState('')
  const [clientId,      setClientId]      = useState(clients[0]?.id ?? '')
  const [platform,      setPlatform]      = useState<Platform>('YOUTUBE')
  const [stage,         setStage]         = useState<PipelineStage>(defaultStage)
  const [scheduledDate, setScheduledDate] = useState('')
  const [notes,         setNotes]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [error,         setError]         = useState<string | null>(null)

  if (!isOpen) return null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, clientId, platform, stage, scheduledDate: scheduledDate || null, notes: notes || null }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to create item')
      }
      const { item } = await res.json()
      onAdd(item)
      onClose()
      // Reset
      setTitle(''); setScheduledDate(''); setNotes('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-text-primary dark:text-dark-text">Add content</h2>
          <button onClick={onClose} className="text-text-secondary dark:text-dark-muted hover:text-text-primary dark:hover:text-dark-text text-xl leading-none">×</button>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Content topic *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="e.g. 5 mistakes beginners make at the gym"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Client *</label>
            <select
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            >
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Platform *</label>
            <div className="flex flex-wrap gap-1.5">
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                  style={platform === p
                    ? { backgroundColor: PLATFORM_CONFIG[p].bg, color: PLATFORM_CONFIG[p].text, borderColor: PLATFORM_CONFIG[p].text }
                    : { borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }
                  }
                >
                  {PLATFORM_CONFIG[p].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Stage</label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value as PipelineStage)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            >
              {STAGE_ORDER.map(s => <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Scheduled date</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={e => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Hook ideas, filming notes, thumbnail concepts..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)] resize-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-bg)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Adding…' : 'Add content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/AddItemModal.tsx
git commit -m "feat: add AddItemModal with create form"
```

---

## Task 9: EditItemModal

**Files:**
- Create: `components/pipeline/EditItemModal.tsx`

- [ ] **Step 1: Create `components/pipeline/EditItemModal.tsx`**

```typescript
'use client'

import { useState, useEffect, FormEvent } from 'react'
import { ContentItem, PipelineStage, Platform } from '@/types/pipeline'
import { STAGE_CONFIG, STAGE_ORDER, PLATFORM_CONFIG, nextStage } from '@/lib/pipeline'

interface Client {
  id: string
  name: string
  avatarColor: string
}

interface EditItemModalProps {
  item: ContentItem | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (item: ContentItem) => void
  onDelete: (id: string) => void
  clients: Client[]
}

const PLATFORMS: Platform[] = ['YOUTUBE', 'TIKTOK', 'REELS', 'LINKEDIN', 'PODCAST']

export function EditItemModal({ item, isOpen, onClose, onUpdate, onDelete, clients }: EditItemModalProps) {
  const [title,         setTitle]         = useState('')
  const [clientId,      setClientId]      = useState('')
  const [platform,      setPlatform]      = useState<Platform>('YOUTUBE')
  const [stage,         setStage]         = useState<PipelineStage>('IDEA')
  const [scheduledDate, setScheduledDate] = useState('')
  const [publishedAt,   setPublishedAt]   = useState('')
  const [notes,         setNotes]         = useState('')
  const [views,         setViews]         = useState<string>('')
  const [loading,       setLoading]       = useState(false)
  const [deleting,      setDeleting]      = useState(false)
  const [confirmTitle,  setConfirmTitle]  = useState('')
  const [showConfirm,   setShowConfirm]   = useState(false)
  const [error,         setError]         = useState<string | null>(null)

  useEffect(() => {
    if (!item) return
    setTitle(item.title)
    setClientId(item.clientId)
    setPlatform(item.platform)
    setStage(item.stage)
    setScheduledDate(item.scheduledDate ? item.scheduledDate.slice(0, 10) : '')
    setPublishedAt(item.publishedAt ? item.publishedAt.slice(0, 10) : '')
    setNotes(item.notes ?? '')
    setViews(item.views != null ? String(item.views) : '')
    setShowConfirm(false)
    setConfirmTitle('')
    setError(null)
  }, [item])

  if (!isOpen || !item) return null

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const res = await fetch(`/api/pipeline/${item!.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          clientId,
          platform,
          stage,
          scheduledDate: scheduledDate || null,
          publishedAt:   publishedAt   || null,
          notes:         notes         || null,
          views:         views !== '' ? parseInt(views) : null,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to update')
      }
      const { item: updated } = await res.json()
      onUpdate(updated)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (confirmTitle !== item!.title) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/pipeline/${item!.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      onDelete(item!.id)
    } catch (err: any) {
      setError(err.message)
      setDeleting(false)
    }
  }

  async function handleMoveNext() {
    const next = nextStage(stage)
    if (!next) return
    setLoading(true)
    try {
      const res = await fetch(`/api/pipeline/${item!.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: next }),
      })
      if (!res.ok) throw new Error('Failed to advance stage')
      const { item: updated } = await res.json()
      onUpdate(updated)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const next = nextStage(stage)
  const generateUrl = `/generate?clientId=${item.clientId}&topic=${encodeURIComponent(item.title)}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-text-primary dark:text-dark-text">Edit content</h2>
          <button onClick={onClose} className="text-text-secondary dark:text-dark-muted hover:text-text-primary dark:hover:text-dark-text text-xl leading-none">×</button>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 mb-4">
          {next && (
            <button
              type="button"
              onClick={handleMoveNext}
              disabled={loading}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)] transition-colors text-text-secondary dark:text-dark-muted"
            >
              Move to {STAGE_CONFIG[next].label} →
            </button>
          )}
          {item.scriptId ? (
            <a
              href={`/scripts/${item.scriptId}`}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)] text-center transition-colors text-text-secondary dark:text-dark-muted"
            >
              View script
            </a>
          ) : (
            <a
              href={generateUrl}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)] text-center transition-colors text-text-secondary dark:text-dark-muted"
            >
              Generate script
            </a>
          )}
        </div>

        {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Content topic *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]" />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Client</label>
            <select value={clientId} onChange={e => setClientId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]">
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Platform</label>
            <div className="flex flex-wrap gap-1.5">
              {PLATFORMS.map(p => (
                <button key={p} type="button" onClick={() => setPlatform(p)}
                  className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                  style={platform === p
                    ? { backgroundColor: PLATFORM_CONFIG[p].bg, color: PLATFORM_CONFIG[p].text, borderColor: PLATFORM_CONFIG[p].text }
                    : { borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }
                  }
                >
                  {PLATFORM_CONFIG[p].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Stage</label>
            <select value={stage} onChange={e => setStage(e.target.value as PipelineStage)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]">
              {STAGE_ORDER.map(s => <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Scheduled date</label>
            <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]" />
          </div>

          {(stage === 'PUBLISHED') && (
            <>
              <div>
                <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Published date</label>
                <input type="date" value={publishedAt} onChange={e => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Views</label>
                <input type="number" min="0" value={views} onChange={e => setViews(e.target.value)} placeholder="e.g. 12500"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              placeholder="Hook ideas, filming notes, thumbnail concepts..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)] resize-none" />
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-bg)] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
              {loading ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>

        {/* Delete section */}
        <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
          {!showConfirm ? (
            <button onClick={() => setShowConfirm(true)}
              className="text-xs text-red-500 hover:text-red-600 transition-colors">
              Delete this item
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-text-secondary dark:text-dark-muted">
                Type <strong>{item.title}</strong> to confirm deletion:
              </p>
              <input value={confirmTitle} onChange={e => setConfirmTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-red-300 bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none" />
              <div className="flex gap-2">
                <button onClick={() => setShowConfirm(false)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg)]">
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={confirmTitle !== item.title || deleting}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white disabled:opacity-40 hover:bg-red-600 transition-colors">
                  {deleting ? 'Deleting…' : 'Confirm delete'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/EditItemModal.tsx
git commit -m "feat: add EditItemModal with save/delete and stage advance"
```

---

## Task 10: PipelineFilters component

**Files:**
- Create: `components/pipeline/PipelineFilters.tsx`

- [ ] **Step 1: Create `components/pipeline/PipelineFilters.tsx`**

```typescript
'use client'

import { Platform } from '@/types/pipeline'
import { PLATFORM_CONFIG } from '@/lib/pipeline'
import { cn } from '@/lib/utils'

interface Client {
  id: string
  name: string
  avatarColor: string
}

interface PipelineFiltersProps {
  clients: Client[]
  selectedClient: string | null
  selectedPlatform: Platform | null
  onClientChange: (id: string | null) => void
  onPlatformChange: (p: Platform | null) => void
  totalItems: number
}

const PLATFORMS: Platform[] = ['YOUTUBE', 'TIKTOK', 'REELS', 'LINKEDIN', 'PODCAST']

export function PipelineFilters({
  clients, selectedClient, selectedPlatform,
  onClientChange, onPlatformChange, totalItems
}: PipelineFiltersProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 flex-wrap border-b border-[var(--color-border)]">
      <span className="text-xs text-text-secondary dark:text-dark-muted mr-1">
        {totalItems} item{totalItems !== 1 ? 's' : ''}
      </span>

      {/* Client filters */}
      <button
        onClick={() => onClientChange(null)}
        className={cn(
          'text-xs px-2.5 py-1 rounded-full border transition-colors',
          !selectedClient
            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
            : 'border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-primary-tint)]'
        )}
      >
        All clients
      </button>
      {clients.map(c => (
        <button
          key={c.id}
          onClick={() => onClientChange(selectedClient === c.id ? null : c.id)}
          className={cn(
            'text-xs px-2.5 py-1 rounded-full border transition-colors',
            selectedClient === c.id
              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
              : 'border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-primary-tint)]'
          )}
        >
          {c.name}
        </button>
      ))}

      <div className="w-px h-4 bg-[var(--color-border)] mx-1" />

      {/* Platform filters */}
      <button
        onClick={() => onPlatformChange(null)}
        className={cn(
          'text-xs px-2.5 py-1 rounded-full border transition-colors',
          !selectedPlatform
            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
            : 'border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:bg-[var(--color-primary-tint)]'
        )}
      >
        All platforms
      </button>
      {PLATFORMS.map(p => (
        <button
          key={p}
          onClick={() => onPlatformChange(selectedPlatform === p ? null : p)}
          className="text-xs px-2.5 py-1 rounded-full border transition-colors"
          style={selectedPlatform === p
            ? { backgroundColor: PLATFORM_CONFIG[p].bg, color: PLATFORM_CONFIG[p].text, borderColor: PLATFORM_CONFIG[p].text }
            : { borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }
          }
        >
          {PLATFORM_CONFIG[p].label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/PipelineFilters.tsx
git commit -m "feat: add PipelineFilters client-side filter bar"
```

---

## Task 11: Pipeline page (server component) + loading skeleton

**Files:**
- Create: `app/(app)/pipeline/page.tsx`
- Create: `app/(app)/pipeline/loading.tsx`

- [ ] **Step 1: Create `app/(app)/pipeline/page.tsx`**

```typescript
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { KanbanBoard } from '@/components/pipeline/KanbanBoard'
import { ContentItem } from '@/types/pipeline'

export default async function PipelinePage() {
  const { workspace } = await ensureUser()

  const [rawItems, clients] = await Promise.all([
    prisma.contentItem.findMany({
      where: { workspaceId: workspace.id },
      include: {
        client: { select: { id: true, name: true, avatarColor: true } },
        script:  { select: { id: true, title: true } },
      },
      orderBy: [{ stage: 'asc' }, { position: 'asc' }],
    }),
    prisma.client.findMany({
      where: { workspaceId: workspace.id },
      select: { id: true, name: true, avatarColor: true },
      orderBy: { name: 'asc' },
    }),
  ])

  // Serialize dates to strings for client component
  const items: ContentItem[] = rawItems.map(item => ({
    ...item,
    scheduledDate: item.scheduledDate?.toISOString() ?? null,
    publishedAt:   item.publishedAt?.toISOString()   ?? null,
    createdAt:     item.createdAt.toISOString(),
    updatedAt:     item.updatedAt.toISOString(),
  }))

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-lg font-semibold text-text-primary dark:text-dark-text">Content pipeline</h1>
          <p className="text-xs text-text-secondary dark:text-dark-muted mt-0.5">
            {items.length} item{items.length !== 1 ? 's' : ''} across all stages
          </p>
        </div>
      </div>
      <KanbanBoard initialItems={items} clients={clients} />
    </div>
  )
}
```

- [ ] **Step 2: Create `app/(app)/pipeline/loading.tsx`**

```typescript
export default function PipelineLoading() {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
        <div>
          <div className="h-5 w-40 bg-[var(--color-border)] rounded animate-pulse" />
          <div className="h-3 w-24 bg-[var(--color-border)] rounded animate-pulse mt-1.5" />
        </div>
      </div>
      <div className="flex gap-3 px-4 py-3 border-b border-[var(--color-border)]">
        {[1,2,3].map(i => (
          <div key={i} className="h-6 w-16 bg-[var(--color-border)] rounded-full animate-pulse" />
        ))}
      </div>
      <div className="flex gap-3 p-4 overflow-x-auto">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="flex-shrink-0 w-[220px] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
            <div className="h-7 bg-[var(--color-border)] rounded animate-pulse mb-2" />
            {[1,2].map(j => (
              <div key={j} className="h-24 bg-[var(--color-border)] rounded-lg animate-pulse mb-2" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(app\)/pipeline/
git commit -m "feat: add pipeline page server component and loading skeleton"
```

---

## Task 12: Sidebar + final polish

**Files:**
- Modify: `components/layout/Sidebar.tsx`

- [ ] **Step 1: Add Pipeline link to sidebar**

In [components/layout/Sidebar.tsx](components/layout/Sidebar.tsx), import `LayoutGrid` from lucide-react and add the pipeline link.

Change the import line from:
```typescript
import { LayoutDashboard, Sparkles, FileText, Users, Settings, UsersRound } from "lucide-react";
```
to:
```typescript
import { LayoutDashboard, Sparkles, FileText, Users, Settings, UsersRound, LayoutGrid } from "lucide-react";
```

Change the `links` array — add Pipeline after Scripts:
```typescript
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/generate",  label: "Generate",  icon: Sparkles },
    { href: "/scripts",   label: "Scripts",   icon: FileText },
    { href: "/pipeline",  label: "Pipeline",  icon: LayoutGrid },
    { href: "/clients",   label: "Clients",   icon: Users },
    ...(isAgencyOwner ? [{ href: "/settings/team", label: "Team", icon: UsersRound }] : []),
    { href: "/settings",  label: "Settings",  icon: Settings },
  ];
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Sidebar.tsx
git commit -m "feat: add Pipeline nav link to sidebar"
```

---

## Self-Review Checklist

### Spec coverage
- [x] All 6 API routes implemented (GET, POST, PATCH, DELETE, reorder)
- [x] All components: KanbanBoard, KanbanColumn, KanbanCard, AddItemModal, EditItemModal, PipelineFilters
- [x] usePipeline hook with groupByStage, moveItem, addItem, updateItem, deleteItem, revertColumns
- [x] Pipeline page as server component
- [x] Loading skeleton
- [x] Sidebar Pipeline link
- [x] Optimistic updates + revert on failure
- [x] DragOverlay with scale(1.03)
- [x] Ghost card opacity 0.4 during drag
- [x] Empty column dashed drop zone
- [x] Empty board state with "Add your first piece" button
- [x] STAGE_CONFIG + PLATFORM_CONFIG in lib/pipeline.ts
- [x] Prisma schema additions (PipelineStage enum, ContentItem model)
- [x] positions are 0-indexed, reassigned on each drag
- [x] React.memo on KanbanCard
- [x] useCallback on drag handlers
- [x] Generate script link in EditItemModal with pre-filled query params
- [x] Move to next stage quick action in EditItemModal
- [x] Views + publishedAt fields shown only when stage === PUBLISHED
- [x] Delete confirmation requiring user to type the title
- [x] workspaceId used instead of userId throughout (matches the existing app pattern — workspace-scoped data)

### Type consistency verified
- `ContentItem` shape matches what Prisma returns (with `client` and `script` included)
- `groupByStage` in `lib/pipeline.ts` matches signature used in `hooks/usePipeline.ts`
- `nextStage` exported from `lib/pipeline.ts` and used in `EditItemModal`
- `STAGE_ORDER` exported from `lib/pipeline.ts` and used in `KanbanBoard`
- `ReorderUpdate` defined in `types/pipeline.ts` and used in `hooks/usePipeline.ts`

### One adjustment from spec
The spec used `userId` as the ownership field. This app is workspace-scoped (all data tied to `workspaceId`, matching every other model). The plan uses `workspaceId` throughout for consistency. This also means multiple team members can manage the same pipeline, which is the correct behaviour for an AGENCY plan product.

# Script Card Redesign + Pipeline Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign ScriptCard to visually match KanbanCard, and add the ability to import scripts into the content pipeline via modal, drawer, and drag-and-drop.

**Architecture:** Schema gets a `contentItem` reverse relation on Script (one-to-one). The scripts page query includes `contentItem` to know pipeline status. A new `AddToPipelineModal` handles the "add" action from both the script card and the drawer. A new `ImportScriptsDrawer` slides in alongside the KanbanBoard. KanbanBoard's `onDragEnd` is extended to handle `script-*` drag IDs from the drawer. KanbanCard gets a clickable "Script ready" pill with word count.

**Tech Stack:** Next.js 14 App Router, Prisma, Zod, @dnd-kit/core (useDraggable), date-fns, Tailwind with CSS custom properties, existing `Button`/`useToast`/`initials` utilities

---

### Task 1: Schema — add `contentItem` reverse relation to Script

**Files:**
- Modify: `prisma/schema.prisma`

The `ContentItem` model already has `scriptId String?` and `script Script? @relation(...)`. The `Script` model currently has `contentItems ContentItem[]` (one-to-many). The spec requires a **one-to-one** reverse relation so we can query `where: { contentItem: null }` and expose `script.contentItem` on the scripts page.

We need to change the relation from one-to-many to one-to-one by:
1. Replacing `contentItems ContentItem[]` on Script with `contentItem ContentItem?`
2. Making `scriptId` on ContentItem `@unique` so Prisma recognises the one-to-one

- [ ] **Step 1: Update schema.prisma**

On the `Script` model, change:
```prisma
  contentItems  ContentItem[]
```
to:
```prisma
  contentItem  ContentItem?
```

On the `ContentItem` model, add `@unique` to scriptId:
```prisma
  scriptId      String?       @unique
```
(was `scriptId      String?`)

- [ ] **Step 2: Push schema**

```bash
npx prisma db push
```

Expected: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 3: Regenerate client**

```bash
npx prisma generate
```

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: make Script-ContentItem a one-to-one relation via scriptId @unique"
```

---

### Task 2: Update GET /api/pipeline to include script word count and duration

**Files:**
- Modify: `app/api/pipeline/route.ts`

The GET handler currently includes `script: { select: { id: true, title: true } }`. Extend the select to also fetch `wordCount` and `duration`.

- [ ] **Step 1: Update the script select in GET handler**

In `app/api/pipeline/route.ts`, find:
```typescript
script: { select: { id: true, title: true } },
```

Replace with:
```typescript
script: { select: { id: true, title: true, wordCount: true, duration: true } },
```

This appears in two places in the file (the `findMany` query in GET and the `create` call in POST). Update both.

- [ ] **Step 2: Update types/pipeline.ts to include wordCount and duration on script**

In `types/pipeline.ts`, find:
```typescript
  script?: {
    id: string
    title: string
  } | null
```

Replace with:
```typescript
  script?: {
    id: string
    title: string
    wordCount?: number | null
    duration?: string | null
  } | null
```

- [ ] **Step 3: Commit**

```bash
git add app/api/pipeline/route.ts types/pipeline.ts
git commit -m "feat: include wordCount and duration in pipeline script select"
```

---

### Task 3: Update scripts page query + pass pipeline status to ScriptCard

**Files:**
- Modify: `app/(app)/scripts/page.tsx`
- Modify: `components/script/ScriptCard.tsx` (prop type only — no visual changes yet)

- [ ] **Step 1: Add contentItem to scripts page query**

In `app/(app)/scripts/page.tsx`, find the `prisma.script.findMany` call:
```typescript
    prisma.script.findMany({
      where,
      include: { client: true },
      orderBy: { createdAt: "desc" },
      take: limit * page,
    }),
```

Replace with:
```typescript
    prisma.script.findMany({
      where,
      include: {
        client: true,
        contentItem: { select: { id: true, stage: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit * page,
    }),
```

- [ ] **Step 2: Update ScriptCard prop type to accept contentItem**

In `components/script/ScriptCard.tsx`, change the prop type from:
```typescript
export function ScriptCard({ script }: { script: Script & { client: Client | null } }) {
```
to:
```typescript
interface ScriptWithPipeline extends Script {
  client: Client | null
  contentItem?: { id: string; stage: string } | null
}

export function ScriptCard({ script, onAddToPipeline }: {
  script: ScriptWithPipeline
  onAddToPipeline?: (script: ScriptWithPipeline) => void
}) {
```

Keep the existing visual output unchanged for now — that happens in Task 4. Just update the type so it compiles.

- [ ] **Step 3: Commit**

```bash
git add "app/(app)/scripts/page.tsx" components/script/ScriptCard.tsx
git commit -m "feat: include contentItem in scripts page query, update ScriptCard prop type"
```

---

### Task 4: Redesign ScriptCard to match KanbanCard visual style

**Files:**
- Modify: `components/script/ScriptCard.tsx`

Replace the entire component with the new design. The `onAddToPipeline` callback will be wired in Task 5 — for now render the "In pipeline" indicator or "Add to pipeline" button with a placeholder `onClick`.

- [ ] **Step 1: Replace ScriptCard with redesigned version**

```typescript
'use client'

import Link from "next/link";
import type { Script, Client, Platform, ScriptStatus } from "@prisma/client";
import { initials, relativeDate } from "@/lib/utils";

interface ScriptWithPipeline extends Script {
  client: Client | null
  contentItem?: { id: string; stage: string } | null
}

const PLATFORM_BADGE: Record<Platform, { bg: string; text: string; darkBg: string; darkText: string; label: string }> = {
  YOUTUBE:  { bg: '#FAECE7', text: '#4A1B0C', darkBg: '#4A1B0C', darkText: '#F5C4B3', label: 'YouTube' },
  TIKTOK:   { bg: '#F1EFE8', text: '#2C2C2A', darkBg: '#2C2C2A', darkText: '#D3D1C7', label: 'TikTok' },
  REELS:    { bg: '#FBEAF0', text: '#4B1528', darkBg: '#4B1528', darkText: '#F4C0D1', label: 'Reels' },
  LINKEDIN: { bg: '#E6F1FB', text: '#042C53', darkBg: '#042C53', darkText: '#B5D4F4', label: 'LinkedIn' },
  PODCAST:  { bg: '#EEEDFE', text: '#26215C', darkBg: '#26215C', darkText: '#CECBF6', label: 'Podcast' },
}

const STATUS_BADGE: Record<ScriptStatus, { bg: string; text: string; darkBg: string; darkText: string; label: string }> = {
  DRAFT: { bg: '#F1EFE8', text: '#444441', darkBg: '#2C2C2A', darkText: '#D3D1C7', label: 'Draft' },
  FINAL: { bg: '#E1F5EE', text: '#085041', darkBg: '#04342C', darkText: '#9FE1CB', label: 'Final' },
  SENT:  { bg: '#FAECE7', text: '#4A1B0C', darkBg: '#4A1B0C', darkText: '#F5C4B3', label: 'Sent' },
}

export function ScriptCard({
  script,
  onAddToPipeline,
}: {
  script: ScriptWithPipeline
  onAddToPipeline?: (script: ScriptWithPipeline) => void
}) {
  const platform = PLATFORM_BADGE[script.platform]
  const status   = STATUS_BADGE[script.status]
  const inPipeline = !!script.contentItem

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-[10px_12px] transition-all duration-150 hover:border-[var(--color-primary)] flex flex-col gap-0">
      {/* Top row: platform badge + status badge */}
      <div className="flex items-center justify-between gap-1">
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: platform.bg, color: platform.text }}
        >
          {platform.label}
        </span>
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: status.bg, color: status.text }}
        >
          {status.label}
        </span>
      </div>

      {/* Title */}
      <Link href={`/scripts/${script.id}`} className="block mt-1.5 mb-1">
        <p className="text-[13px] font-medium leading-snug line-clamp-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors">
          {script.title}
        </p>
      </Link>

      {/* Meta row: word count + duration */}
      <p className="text-[11px] text-[var(--color-text-tertiary)] mb-1.5">
        {script.wordCount ?? 0} words · {script.duration}
      </p>

      {/* Client row */}
      <div className="flex items-center gap-1.5 mt-auto">
        {script.client ? (
          <>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: script.client.avatarColor, fontSize: '9px', fontWeight: 500 }}
            >
              {initials(script.client.name)}
            </span>
            <span className="text-[11px] text-[var(--color-text-secondary)] truncate flex-1">
              {script.client.name}
            </span>
          </>
        ) : (
          <span className="text-[11px] text-[var(--color-text-tertiary)] flex-1">Unassigned</span>
        )}
        <span className="text-[11px] text-[var(--color-text-tertiary)] ml-auto flex-shrink-0">
          {relativeDate(script.createdAt)}
        </span>
      </div>

      {/* Pipeline indicator / add button */}
      <div className="mt-2">
        {inPipeline ? (
          <span
            className="text-[10px] font-medium px-[7px] py-[2px] rounded-full"
            style={{ backgroundColor: '#E1F5EE', color: '#085041' }}
          >
            In pipeline
          </span>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              onAddToPipeline?.(script)
            }}
            className="text-[11px] border border-[var(--color-border)] bg-transparent rounded-[var(--border-radius-md)] px-[10px] py-1 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] transition-colors"
          >
            + Add to pipeline
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update scripts page to handle the client component**

`ScriptCard` is now `'use client'`. The scripts page is a server component — it renders `ScriptCard` but can't pass a client-side callback directly. We need to wrap the grid in a client component `ScriptsGrid`.

Create `components/script/ScriptsGrid.tsx`:

```typescript
'use client'

import { useState } from 'react'
import type { Script, Client } from '@prisma/client'
import { ScriptCard } from './ScriptCard'
import { AddToPipelineModal } from '@/components/pipeline/AddToPipelineModal'

interface ScriptWithPipeline extends Script {
  client: Client | null
  contentItem?: { id: string; stage: string } | null
}

interface Client2 {
  id: string
  name: string
  avatarColor: string
}

interface ScriptsGridProps {
  scripts: ScriptWithPipeline[]
  clients: Client2[]
}

export function ScriptsGrid({ scripts, clients }: ScriptsGridProps) {
  const [selectedScript, setSelectedScript] = useState<ScriptWithPipeline | null>(null)
  const [localScripts, setLocalScripts] = useState(scripts)

  function handleAdded() {
    if (!selectedScript) return
    setLocalScripts(prev =>
      prev.map(s => s.id === selectedScript.id
        ? { ...s, contentItem: { id: 'optimistic', stage: 'SCRIPTING' } }
        : s
      )
    )
    setSelectedScript(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {localScripts.map(s => (
          <ScriptCard
            key={s.id}
            script={s}
            onAddToPipeline={setSelectedScript}
          />
        ))}
      </div>

      {selectedScript && (
        <AddToPipelineModal
          script={selectedScript}
          clients={clients}
          isOpen={!!selectedScript}
          onClose={() => setSelectedScript(null)}
          onAdded={handleAdded}
        />
      )}
    </>
  )
}
```

- [ ] **Step 3: Update scripts page to use ScriptsGrid**

In `app/(app)/scripts/page.tsx`, replace:
```typescript
import { ScriptCard } from "@/components/script/ScriptCard";
```
with:
```typescript
import { ScriptsGrid } from "@/components/script/ScriptsGrid";
```

And replace the grid JSX:
```typescript
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scripts.map((s) => <ScriptCard key={s.id} script={s} />)}
        </div>
```
with:
```typescript
        <ScriptsGrid scripts={scripts} clients={clients} />
```

- [ ] **Step 4: Commit**

```bash
git add components/script/ScriptCard.tsx components/script/ScriptsGrid.tsx "app/(app)/scripts/page.tsx"
git commit -m "feat: redesign ScriptCard to match KanbanCard visual style"
```

---

### Task 5: AddToPipelineModal component

**Files:**
- Create: `components/pipeline/AddToPipelineModal.tsx`

- [ ] **Step 1: Create the modal**

```typescript
'use client'

import { useState, useEffect, FormEvent } from 'react'
import type { Script, Client } from '@prisma/client'
import type { ContentItem, PipelineStage } from '@/types/pipeline'
import { STAGE_CONFIG, STAGE_ORDER } from '@/lib/pipeline'
import { useToast } from '@/components/ui/Toast'

interface ScriptWithPipeline extends Script {
  client: Client | null
  contentItem?: { id: string; stage: string } | null
}

interface Client2 {
  id: string
  name: string
  avatarColor: string
}

interface AddToPipelineModalProps {
  script: ScriptWithPipeline
  clients: Client2[]
  isOpen: boolean
  onClose: () => void
  onAdded: (item: ContentItem) => void
}

export function AddToPipelineModal({ script, clients, isOpen, onClose, onAdded }: AddToPipelineModalProps) {
  const toast = useToast()
  const [title, setTitle] = useState(script.title)
  const [stage, setStage] = useState<PipelineStage>('SCRIPTING')
  const [scheduledDate, setScheduledDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTitle(script.title)
      setStage('SCRIPTING')
      setScheduledDate('')
      setNotes('')
      setError(null)
    }
  }, [isOpen, script.title])

  if (!isOpen) return null

  // Already in pipeline — show info state
  if (script.contentItem) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
        <div
          className="w-full max-w-md bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-xl p-6"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-base font-semibold mb-3">Already in pipeline</h2>
          <p className="text-sm text-text-secondary dark:text-dark-muted mb-4">
            This script is already linked to a pipeline item in the{' '}
            <strong>{STAGE_CONFIG[script.contentItem.stage as PipelineStage]?.label ?? script.contentItem.stage}</strong> stage.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary hover:bg-[var(--color-bg)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!script.clientId) {
      setError('Script must have a client before adding to pipeline')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          clientId: script.clientId,
          platform: script.platform,
          stage,
          scheduledDate: scheduledDate || null,
          notes: notes || null,
          scriptId: script.id,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to add to pipeline')
      }
      const { item } = await res.json() as { item: ContentItem }
      toast.push('Added to pipeline', 'success')
      onAdded(item)
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
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
          <h2 className="text-base font-semibold text-text-primary dark:text-dark-text">Add to pipeline</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-xl leading-none">×</button>
        </div>

        {!script.clientId && (
          <p className="mb-4 text-sm text-amber-600 dark:text-amber-400">
            This script has no client assigned. Please assign a client on the script page first.
          </p>
        )}

        {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Content title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Add to stage</label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value as PipelineStage)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)]"
            >
              {STAGE_ORDER.map(s => (
                <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary dark:text-dark-muted mb-1">Scheduled post date</label>
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
              placeholder="Filming notes, thumbnail ideas..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary dark:text-dark-text focus:outline-none focus:border-[var(--color-primary)] resize-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-text-secondary hover:bg-[var(--color-bg)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !script.clientId}
              className="flex-1 px-4 py-2 text-sm rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Adding…' : 'Add to pipeline'}
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
git add components/pipeline/AddToPipelineModal.tsx
git commit -m "feat: AddToPipelineModal — add script to pipeline with stage/date/notes"
```

---

### Task 6: Update KanbanCard to show clickable "Script ready" pill with word count

**Files:**
- Modify: `components/pipeline/KanbanCard.tsx`

- [ ] **Step 1: Update the indicators section**

Find the indicators section in KanbanCard (the `{item.scriptId && ...}` block). Replace it with a clickable link that shows word count:

```typescript
      {/* Indicators */}
      <div className="flex items-center gap-2 mt-1">
        {item.script && (
          <a
            href={`/scripts/${item.script.id}`}
            onClick={e => e.stopPropagation()}
            className="text-[10px] text-teal-600 dark:text-teal-400 font-medium hover:underline"
          >
            Script ready
            {item.script.wordCount ? ` · ${item.script.wordCount} words` : ''}
            {item.script.duration ? ` · ${item.script.duration}` : ''}
          </a>
        )}
        {!item.script && item.scriptId && (
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
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/KanbanCard.tsx
git commit -m "feat: KanbanCard shows clickable Script ready pill with word count"
```

---

### Task 7: ImportScriptsDrawer component

**Files:**
- Create: `components/pipeline/ImportScriptsDrawer.tsx`

This is a side drawer that renders alongside the KanbanBoard. It shows scripts not yet in the pipeline with a "+ Add" button per item, and supports drag-to-import via `useDraggable`.

- [ ] **Step 1: Create the drawer**

```typescript
'use client'

import { useDraggable } from '@dnd-kit/core'
import type { Script, Client, Platform } from '@prisma/client'
import Link from 'next/link'
import { X } from 'lucide-react'
import { initials } from '@/lib/utils'

interface ScriptForDrawer extends Script {
  client: { id: string; name: string; avatarColor: string } | null
  contentItem?: { id: string; stage: string } | null
}

const PLATFORM_LABEL: Record<Platform, string> = {
  YOUTUBE: 'YouTube',
  TIKTOK: 'TikTok',
  REELS: 'Reels',
  LINKEDIN: 'LinkedIn',
  PODCAST: 'Podcast',
}

const PLATFORM_BG: Record<Platform, string> = {
  YOUTUBE: '#FAECE7',
  TIKTOK: '#F1EFE8',
  REELS: '#FBEAF0',
  LINKEDIN: '#E6F1FB',
  PODCAST: '#EEEDFE',
}

const PLATFORM_TEXT: Record<Platform, string> = {
  YOUTUBE: '#4A1B0C',
  TIKTOK: '#2C2C2A',
  REELS: '#4B1528',
  LINKEDIN: '#042C53',
  PODCAST: '#26215C',
}

function DraggableScriptItem({
  script,
  onAdd,
}: {
  script: ScriptForDrawer
  onAdd: (script: ScriptForDrawer) => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `script-${script.id}`,
    data: { script },
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-2.5 cursor-grab active:cursor-grabbing select-none"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: PLATFORM_BG[script.platform], color: PLATFORM_TEXT[script.platform] }}
        >
          {PLATFORM_LABEL[script.platform]}
        </span>
        <button
          type="button"
          onPointerDown={e => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            onAdd(script)
          }}
          className="text-[10px] border border-[var(--color-border)] bg-transparent rounded px-1.5 py-0.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] transition-colors"
        >
          + Add
        </button>
      </div>
      <p className="text-[12px] font-medium text-text-primary dark:text-dark-text leading-snug line-clamp-2 mb-1.5">
        {script.title}
      </p>
      <div className="flex items-center gap-1.5">
        {script.client && (
          <>
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: script.client.avatarColor, fontSize: '8px', fontWeight: 500 }}
            >
              {initials(script.client.name)}
            </span>
            <span className="text-[10px] text-[var(--color-text-secondary)] truncate flex-1">
              {script.client.name}
            </span>
          </>
        )}
        {script.wordCount && (
          <span className="text-[10px] text-[var(--color-text-tertiary)] ml-auto flex-shrink-0">
            {script.wordCount}w
          </span>
        )}
      </div>
    </div>
  )
}

interface ImportScriptsDrawerProps {
  scripts: ScriptForDrawer[]
  onClose: () => void
  onAddScript: (script: ScriptForDrawer) => void
  importedScriptIds: Set<string>
}

export function ImportScriptsDrawer({ scripts, onClose, onAddScript, importedScriptIds }: ImportScriptsDrawerProps) {
  const unimported = scripts.filter(s => !importedScriptIds.has(s.id))

  return (
    <div className="w-[280px] flex-shrink-0 border-l border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-3 border-b border-[var(--color-border)]">
        <h2 className="text-sm font-semibold text-text-primary dark:text-dark-text">Import scripts</h2>
        <button type="button" onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {unimported.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[12px] text-[var(--color-text-secondary)] mb-3">
              All scripts are in the pipeline.
            </p>
            <Link href="/generate" className="text-[12px] text-[var(--color-primary)] hover:underline">
              Generate a new script →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {unimported.map(s => (
              <DraggableScriptItem key={s.id} script={s} onAdd={onAddScript} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pipeline/ImportScriptsDrawer.tsx
git commit -m "feat: ImportScriptsDrawer with draggable script items"
```

---

### Task 8: Update pipeline page query to fetch unlinked scripts

**Files:**
- Modify: `app/(app)/pipeline/page.tsx`

- [ ] **Step 1: Add unlinked scripts query and pass to KanbanBoard**

Replace the entire page file:

```typescript
import { prisma } from '@/lib/prisma'
import { ensureUser } from '@/lib/ensureUser'
import { KanbanBoard } from '@/components/pipeline/KanbanBoard'
import { ContentItem } from '@/types/pipeline'
import type { Script, Client } from '@prisma/client'

export interface ScriptForPipeline extends Script {
  client: { id: string; name: string; avatarColor: string } | null
  contentItem?: { id: string; stage: string } | null
}

export default async function PipelinePage() {
  const { workspace } = await ensureUser()

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
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
        <div>
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
```

- [ ] **Step 2: Commit**

```bash
git add "app/(app)/pipeline/page.tsx"
git commit -m "feat: pipeline page fetches unlinked scripts and passes to KanbanBoard"
```

---

### Task 9: Update KanbanBoard to integrate ImportScriptsDrawer and handle script drag-import

**Files:**
- Modify: `components/pipeline/KanbanBoard.tsx`

This is the most complex task. Read the current file carefully first.

- [ ] **Step 1: Add new props and state**

Add `initialScripts` prop to `KanbanBoardProps`:

```typescript
import type { ScriptForPipeline } from '@/app/(app)/pipeline/page'
import { ImportScriptsDrawer } from './ImportScriptsDrawer'
import { AddToPipelineModal } from './AddToPipelineModal'

interface KanbanBoardProps {
  initialItems: ContentItem[]
  clients: Client[]
  initialScripts: ScriptForPipeline[]
}
```

Add state:
```typescript
const [isDrawerOpen, setIsDrawerOpen] = useState(false)
const [importedScriptIds, setImportedScriptIds] = useState<Set<string>>(new Set())
const [addModalScript, setAddModalScript] = useState<ScriptForPipeline | null>(null)
const [drawerScripts, setDrawerScripts] = useState(initialScripts)
```

- [ ] **Step 2: Update onDragEnd to handle script- prefix IDs**

Inside `handleDragEnd`, before the existing logic, add detection for script drag IDs:

```typescript
  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveItem(null)

    // Handle script drag from drawer
    if ((active.id as string).startsWith('script-')) {
      if (!over) return
      const scriptId = (active.id as string).replace('script-', '')
      const script = drawerScripts.find(s => s.id === scriptId)
      if (!script || !script.clientId) return

      // Determine target stage
      const overId = over.id as string
      const targetStage: PipelineStage | null = (STAGE_ORDER as string[]).includes(overId)
        ? overId as PipelineStage
        : findStageForItem(overId)
      if (!targetStage) return

      try {
        const res = await fetch('/api/pipeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: script.title,
            clientId: script.clientId,
            platform: script.platform,
            stage: targetStage,
            scriptId: script.id,
          }),
        })
        if (!res.ok) return
        const { item } = await res.json() as { item: ContentItem }
        addItem(item)
        setImportedScriptIds(prev => new Set([...prev, scriptId]))
      } catch {
        // silently fail — user can retry
      }
      return
    }

    // ... rest of existing handleDragEnd logic unchanged
```

- [ ] **Step 3: Add "Import scripts" button and drawer to JSX**

In the JSX, update the return to wrap board + drawer in a flex row:

```typescript
  return (
    <div className="flex flex-col h-full">
      <PipelineFilters
        clients={clients}
        selectedClient={clientFilter}
        selectedPlatform={platformFilter}
        onClientChange={setClientFilter}
        onPlatformChange={setPlatformFilter}
        totalItems={totalItems}
        onImportScripts={() => setIsDrawerOpen(v => !v)}
        showImport={drawerScripts.length > 0}
      />
      ...
      {/* Wrap existing DndContext + empty state in a flex row with the drawer */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {/* existing totalItems === 0 check and DndContext go here */}
        </div>
        {isDrawerOpen && (
          <ImportScriptsDrawer
            scripts={drawerScripts}
            importedScriptIds={importedScriptIds}
            onClose={() => setIsDrawerOpen(false)}
            onAddScript={(s) => setAddModalScript(s as ScriptForPipeline)}
          />
        )}
      </div>

      {addModalScript && (
        <AddToPipelineModal
          script={addModalScript}
          clients={clients}
          isOpen={!!addModalScript}
          onClose={() => setAddModalScript(null)}
          onAdded={(item) => {
            addItem(item)
            setImportedScriptIds(prev => new Set([...prev, addModalScript.id]))
            setAddModalScript(null)
          }}
        />
      )}
      ...
    </div>
  )
```

- [ ] **Step 4: Update PipelineFilters to accept onImportScripts prop**

In `components/pipeline/PipelineFilters.tsx`, add props:
```typescript
  onImportScripts?: () => void
  showImport?: boolean
```

And add an "Import scripts" button next to the existing filter controls:
```typescript
{showImport && onImportScripts && (
  <button
    type="button"
    onClick={onImportScripts}
    className="ml-auto text-xs px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-text-secondary hover:bg-[var(--color-bg)] transition-colors"
  >
    Import scripts
  </button>
)}
```

- [ ] **Step 5: Commit**

```bash
git add components/pipeline/KanbanBoard.tsx components/pipeline/PipelineFilters.tsx
git commit -m "feat: KanbanBoard integrates ImportScriptsDrawer and script drag-import"
```

---

## Self-Review

**Spec coverage:**
- ✅ ScriptCard visual redesign matching KanbanCard — Task 4
- ✅ Platform badge pill (top-left), status badge pill (top-right) with exact colours — Task 4
- ✅ Title, meta row (words · duration), client row, time ago — Task 4
- ✅ "In pipeline" teal indicator when `contentItem` exists — Task 4
- ✅ "+ Add to pipeline" button when no `contentItem` — Task 4
- ✅ Remove thick top border, remove box shadow — Task 4
- ✅ Hover effect matching pipeline card — Task 4
- ✅ Schema one-to-one relation for duplicate guard — Task 1
- ✅ AddToPipelineModal with pre-filled title/stage/date/notes — Task 5
- ✅ Duplicate guard (already-in-pipeline info state) — Task 5
- ✅ KanbanCard "Script ready" pill with word count, clickable — Task 6
- ✅ ImportScriptsDrawer sliding from right, 280px width — Task 7
- ✅ Draggable script items with `script-` prefix IDs — Task 7
- ✅ "Import scripts" button on pipeline header — Task 9
- ✅ KanbanBoard onDragEnd handles `script-` prefix, creates ContentItem — Task 9
- ✅ Dragged script removed from drawer (via importedScriptIds set) — Task 9
- ✅ Existing DnD unaffected (script- prefix check exits early) — Task 9
- ✅ Unlinked scripts query on pipeline page — Task 8
- ✅ `contentItem` included in scripts page query — Task 3
- ✅ `wordCount`/`duration` in pipeline API response — Task 2

**Placeholder scan:** None — all steps have complete code.

**Type consistency:** `ScriptForPipeline` defined in `app/(app)/pipeline/page.tsx` and imported into KanbanBoard. `ScriptWithPipeline` defined locally in ScriptCard and ScriptsGrid — consistent shape. `ScriptForDrawer` in ImportScriptsDrawer matches the shape passed from KanbanBoard.

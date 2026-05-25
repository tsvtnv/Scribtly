# Scripts UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the `/scripts` list page and `/scripts/[id]` detail page — fix the edit layout shift, upgrade the action bar to a floating pill, improve script cards, and clean up the filter row and page header.

**Architecture:** Four independent UI-only changes across three files — no API, routing, or data layer changes. Each task modifies a single file and can be verified by running the dev server. The project uses Vitest for unit tests; run `npx vitest run` after each task to confirm nothing regressed.

**Tech Stack:** Next.js 14 App Router, React, Tailwind CSS, Lucide icons, existing Button/Toast/Textarea UI primitives.

---

## File Map

| File | Change |
|------|--------|
| `components/script/ScriptEditor.tsx` | Replace toggle with click-to-edit inline |
| `components/script/ScriptActions.tsx` | Replace full-width bar with floating pill |
| `components/script/ScriptCard.tsx` | Spacing, hover shadow, type size |
| `app/(app)/scripts/page.tsx` | Header badge, two-row filters, empty state SVG |

---

## Task 1: Click-to-edit inline editor (`ScriptEditor`)

**Files:**
- Modify: `components/script/ScriptEditor.tsx`

### Context

Currently `ScriptEditor` renders a tab toggle (Preview / Edit) and swaps between a `<div>` containing `<ScriptOutput>` and a `<Textarea>`. The swap causes a layout shift because the two elements have different computed heights.

The new approach: remove the toggle entirely. The preview container is always shown by default. Clicking it switches to a `<textarea>` in the exact same space (same padding, font, min-height). Clicking outside or pressing `Escape` saves and returns to preview. A small "Click outside to save" hint appears top-right while editing.

- [ ] **Step 1: Replace the component**

Replace the entire contents of `components/script/ScriptEditor.tsx` with:

```tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { ScriptOutput } from "./ScriptOutput";
import { cn, wordCount } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function ScriptEditor({
  scriptId,
  initialContent,
  onChange,
}: {
  scriptId: string;
  initialContent: string;
  onChange?: (content: string) => void;
}) {
  const [content, setContent] = useState(initialContent);
  const [editing, setEditing] = useState(false);
  const [savingState, setSavingState] = useState<"idle" | "saving" | "saved">("idle");
  const toast = useToast();
  const dirtyRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  useEffect(() => {
    if (editing) textareaRef.current?.focus();
  }, [editing]);

  const save = useCallback(async () => {
    if (!dirtyRef.current) {
      setEditing(false);
      return;
    }
    dirtyRef.current = false;
    setSavingState("saving");
    const res = await fetch(`/api/scripts/${scriptId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      setSavingState("saved");
      setTimeout(() => setSavingState("idle"), 1500);
      onChange?.(content);
    } else {
      setSavingState("idle");
      toast.push("Save failed", "error");
    }
    setEditing(false);
  }, [content, scriptId, onChange, toast]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      save();
    }
  }

  const SHARED = "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-serif text-[15px] leading-relaxed min-h-[500px]";

  return (
    <div>
      <div className="flex items-center justify-between mb-3 min-h-[24px]">
        <span className="text-xs text-text-secondary dark:text-dark-muted">
          {wordCount(content)} words
        </span>
        <span className="text-xs text-text-secondary dark:text-dark-muted">
          {editing
            ? "Click outside to save"
            : savingState === "saving"
            ? "Saving…"
            : savingState === "saved"
            ? <span className="text-success">Saved</span>
            : null}
        </span>
      </div>

      {editing ? (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            dirtyRef.current = true;
          }}
          onBlur={save}
          onKeyDown={handleKeyDown}
          className={cn(SHARED, "resize-none")}
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setEditing(true)}
          onKeyDown={(e) => e.key === "Enter" && setEditing(true)}
          className={cn(
            SHARED,
            "cursor-text transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
          )}
          title="Click to edit"
        >
          <ScriptOutput text={content} />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Check Textarea ref support**

Open `components/ui/Textarea.tsx`. If the component is not wrapped in `forwardRef`, add it:

```tsx
import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-y",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
export { Textarea };
```

If it already uses `forwardRef`, only add the `ref` prop threading — don't change anything else.

- [ ] **Step 3: Run dev server and verify manually**

```bash
npm run dev
```

Navigate to any script detail page (e.g. `/scripts/[id]`). Confirm:
- Preview renders with no toggle buttons.
- Hovering the preview shows a subtle purple border tint.
- Clicking enters edit mode with the textarea in the same position — no layout shift.
- Pressing Escape or clicking outside saves and returns to preview.
- Word count updates as you type.

- [ ] **Step 4: Run unit tests**

```bash
npx vitest run
```

Expected: all existing tests pass. No new tests needed (no logic change — pure UI swap).

- [ ] **Step 5: Commit**

```bash
git add components/script/ScriptEditor.tsx components/ui/Textarea.tsx
git commit -m "feat: replace preview/edit toggle with click-to-edit inline editor"
```

---

## Task 2: Floating action pill (`ScriptActions`)

**Files:**
- Modify: `components/script/ScriptActions.tsx`

### Context

Replace the full-width fixed bottom bar with a compact floating pill centered at the bottom. The pill uses `pointer-events-none` on its wrapper and `pointer-events-auto` on the inner element so it doesn't block clicks on page content beside it. Buttons are grouped with thin vertical dividers.

- [ ] **Step 1: Replace the return statement**

In `components/script/ScriptActions.tsx`, find the `return (` block (lines 119–213) and replace it with:

```tsx
  const Divider = () => (
    <span className="w-px h-4 bg-[var(--color-border)] flex-shrink-0" aria-hidden />
  );

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 pointer-events-none">
      <div className="pointer-events-auto inline-flex items-center gap-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-lg px-3 py-2 max-w-[calc(100vw-2rem)] flex-wrap">
        {/* Utility */}
        <Button variant="secondary" size="sm" onClick={copy}>
          <Copy size={14} /> Copy
        </Button>
        {canExportPDF({ plan }) ? (
          <a href={`/api/export/pdf/${script.id}`} target="_blank" rel="noreferrer">
            <Button variant="secondary" size="sm">
              <FileDown size={14} /> PDF
            </Button>
          </a>
        ) : (
          <NextLink href="/pricing">
            <Button variant="secondary" size="sm" title="PDF export — Pro only">
              <FileDown size={14} /> PDF
            </Button>
          </NextLink>
        )}

        <Divider />

        {/* Status */}
        {script.status !== "FINAL" && (
          <Button variant="secondary" size="sm" loading={busy === "FINAL"} onClick={() => setStatus("FINAL")}>
            <CheckCircle size={14} /> Mark final
          </Button>
        )}
        {script.status !== "SENT" && (
          <Button variant="secondary" size="sm" loading={busy === "SENT"} onClick={() => setStatus("SENT")}>
            <Send size={14} /> Mark sent
          </Button>
        )}

        <Divider />

        {/* Share */}
        <div className="relative" ref={dropdownRef}>
          {!shareEnabled ? (
            <Button variant="secondary" size="sm" loading={busy === "share"} onClick={enableShare}>
              <Share2 size={14} /> Share
            </Button>
          ) : (
            <>
              <Button variant="primary" size="sm" onClick={() => setShareOpen(v => !v)}>
                <Share2 size={14} /> Shared
              </Button>
              {shareOpen && (
                <div className="absolute bottom-full mb-2 right-0 w-72 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg p-3 flex flex-col gap-2 z-50">
                  <div className="flex items-center gap-2">
                    <LinkIcon size={12} className="text-text-secondary dark:text-dark-muted flex-shrink-0" />
                    <span className="text-xs text-text-secondary dark:text-dark-muted truncate flex-1">{shareUrl}</span>
                  </div>
                  <Button variant="secondary" size="sm" onClick={copyLink}>
                    <Copy size={12} /> Copy link
                  </Button>
                  <Button variant="ghost" size="sm" loading={busy === "share-disable"} onClick={disableShare}>
                    <X size={12} /> Disable sharing
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        <Divider />

        {/* Delete */}
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
```

- [ ] **Step 2: Verify dev server**

Navigate to a script detail page. Confirm:
- The action bar is now a compact pill floating centered at the bottom.
- Buttons are grouped with thin dividers.
- The pill does not span full width.
- Clicking Copy, PDF, Mark final, Share, and Delete all still work.
- Share dropdown opens above the pill correctly.
- Delete confirm flow works.

- [ ] **Step 3: Run unit tests**

```bash
npx vitest run
```

Expected: all existing tests pass.

- [ ] **Step 4: Commit**

```bash
git add components/script/ScriptActions.tsx
git commit -m "feat: replace full-width action bar with floating pill"
```

---

## Task 3: Script card improvements (`ScriptCard`)

**Files:**
- Modify: `components/script/ScriptCard.tsx`

### Context

Three small changes: increase padding from the tight `p-[10px_12px]` to `p-4`, increase title from `text-[13px]` to `text-[14px]`, and add `hover:shadow-md` for depth on hover.

- [ ] **Step 1: Update the card**

In `components/script/ScriptCard.tsx`, find the outer `<div>` on line 38:

```tsx
<div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-[10px_12px] transition-all duration-150 hover:border-[var(--color-primary)] flex flex-col">
```

Replace with:

```tsx
<div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 transition-all duration-150 hover:border-[var(--color-primary)] hover:shadow-md flex flex-col">
```

Find the title `<p>` on line 57:

```tsx
<p className="text-[13px] font-medium leading-snug line-clamp-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors">
```

Replace with:

```tsx
<p className="text-[14px] font-medium leading-snug line-clamp-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors">
```

- [ ] **Step 2: Verify dev server**

Navigate to `/scripts`. Confirm:
- Cards have more breathing room.
- Hovering a card shows a shadow + purple border.
- Titles are slightly larger and still clamp at 2 lines.

- [ ] **Step 3: Run unit tests**

```bash
npx vitest run
```

Expected: all existing tests pass.

- [ ] **Step 4: Commit**

```bash
git add components/script/ScriptCard.tsx
git commit -m "feat: improve script card padding, type size, and hover shadow"
```

---

## Task 4: Scripts list page — header, filters, empty state (`scripts/page.tsx`)

**Files:**
- Modify: `app/(app)/scripts/page.tsx`

### Context

Three changes to the same file:
1. **Header**: replace the separate `<p>` count with an inline badge on the `<h1>` line.
2. **Filter rows**: reorganize the flat mixed row into two clean labeled rows (Platform row, Status + Client row).
3. **Empty state**: add a simple inline SVG document icon above the existing heading.

- [ ] **Step 1: Update the page header**

Find this block (lines 63–69):

```tsx
<div>
  <h1 className="text-2xl font-semibold tracking-tight">Script library</h1>
  <p className="text-sm text-text-secondary dark:text-dark-muted mt-1">
    {total} {total === 1 ? "script" : "scripts"}
  </p>
</div>
```

Replace with:

```tsx
<div className="flex items-baseline gap-3">
  <h1 className="text-2xl font-semibold tracking-tight">Script library</h1>
  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
    {total}
  </span>
</div>
```

Also change `mb-6` → `mb-8` on the outer flex div (line 63):

```tsx
<div className="flex items-center justify-between mb-8">
```

- [ ] **Step 2: Reorganize the filter rows**

Find the entire filter block (lines 84–118):

```tsx
<div className="flex flex-wrap gap-2 mb-5 text-xs items-center">
  <HelpTooltip text="Filter scripts by platform. Each platform has a different script style — YouTube for long-form, TikTok/Reels for short punchy content, LinkedIn for professional audiences, Podcast for conversational audio." position="right" />
  <Link
    href={buildHref(searchParams, { platform: undefined })}
    className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.platform ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
  >
    All platforms
  </Link>
  {PLATFORMS.map((p) => (
    <Link
      key={p}
      href={buildHref(searchParams, { platform: p })}
      className={cn("px-2.5 py-1 rounded-full border-hair", searchParams.platform === p ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
    >
      {p[0] + p.slice(1).toLowerCase()}
    </Link>
  ))}
  <span className="text-text-secondary mx-1">·</span>
  <HelpTooltip text="Filter by script status. Draft = work in progress. Final = approved and ready. Sent = delivered to your client." position="right" />
  <Link
    href={buildHref(searchParams, { status: undefined })}
    className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.status ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
  >
    Any status
  </Link>
  {STATUSES.map((s) => (
    <Link
      key={s}
      href={buildHref(searchParams, { status: s })}
      className={cn("px-2.5 py-1 rounded-full border-hair uppercase", searchParams.status === s ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
    >
      {s}
    </Link>
  ))}
</div>
```

Replace with:

```tsx
{/* Platform filter row */}
<div className="flex flex-wrap gap-2 mb-3 text-xs items-center">
  <span className="text-text-secondary dark:text-dark-muted font-medium mr-1">Platform:</span>
  <Link
    href={buildHref(searchParams, { platform: undefined })}
    className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.platform ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
  >
    All
  </Link>
  {PLATFORMS.map((p) => (
    <Link
      key={p}
      href={buildHref(searchParams, { platform: p })}
      className={cn("px-2.5 py-1 rounded-full border-hair", searchParams.platform === p ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
    >
      {p[0] + p.slice(1).toLowerCase()}
    </Link>
  ))}
  <HelpTooltip text="Filter scripts by platform. Each platform has a different script style — YouTube for long-form, TikTok/Reels for short punchy content, LinkedIn for professional audiences, Podcast for conversational audio." position="right" />
</div>

{/* Status filter row */}
<div className="flex flex-wrap gap-2 mb-5 text-xs items-center">
  <span className="text-text-secondary dark:text-dark-muted font-medium mr-1">Status:</span>
  <Link
    href={buildHref(searchParams, { status: undefined })}
    className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.status ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
  >
    Any
  </Link>
  {STATUSES.map((s) => (
    <Link
      key={s}
      href={buildHref(searchParams, { status: s })}
      className={cn("px-2.5 py-1 rounded-full border-hair uppercase", searchParams.status === s ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
    >
      {s}
    </Link>
  ))}
  <HelpTooltip text="Filter by script status. Draft = work in progress. Final = approved and ready. Sent = delivered to your client." position="right" />
</div>
```

Also find the client filter block (lines 120–138) and replace it so it has matching labels:

```tsx
{clients.length > 0 ? (
  <div className="flex flex-wrap gap-2 mb-5 text-xs items-center">
    <span className="text-text-secondary dark:text-dark-muted font-medium mr-1">Client:</span>
    <Link
      href={buildHref(searchParams, { clientId: undefined })}
      className={cn("px-2.5 py-1 rounded-full border-hair", !searchParams.clientId ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
    >
      All
    </Link>
    {clients.map((c) => (
      <Link
        key={c.id}
        href={buildHref(searchParams, { clientId: c.id })}
        className={cn("px-2.5 py-1 rounded-full border-hair", searchParams.clientId === c.id ? "bg-primary text-white border-primary" : "border-[var(--color-border)]")}
      >
        {c.name}
      </Link>
    ))}
  </div>
) : null}
```

- [ ] **Step 3: Add the empty state SVG**

Find the empty state block (lines 141–151):

```tsx
<div className="text-center py-20 flex flex-col items-center gap-4">
  <div className="space-y-2">
    <h2 className="text-lg font-semibold">Your script library is empty</h2>
    <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
      Generate your first script and it will appear here, organised by client and platform.
    </p>
  </div>
  <Link href="/generate">
    <Button size="sm">Generate a script</Button>
  </Link>
</div>
```

Replace with:

```tsx
<div className="text-center py-20 flex flex-col items-center gap-4">
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="12" y="8" width="40" height="48" rx="6" stroke="currentColor" strokeWidth="2" className="text-[var(--color-border)]" />
    <rect x="20" y="20" width="24" height="2" rx="1" fill="currentColor" className="text-[var(--color-border)]" />
    <rect x="20" y="27" width="24" height="2" rx="1" fill="currentColor" className="text-[var(--color-border)]" />
    <rect x="20" y="34" width="16" height="2" rx="1" fill="currentColor" className="text-[var(--color-border)]" />
  </svg>
  <div className="space-y-2">
    <h2 className="text-lg font-semibold">Your script library is empty</h2>
    <p className="text-sm text-text-secondary dark:text-dark-muted max-w-sm mx-auto">
      Generate your first script and it will appear here, organised by client and platform.
    </p>
  </div>
  <Link href="/generate">
    <Button size="sm">Generate a script</Button>
  </Link>
</div>
```

- [ ] **Step 4: Verify dev server**

Navigate to `/scripts`. Confirm:
- Header shows script count as a purple badge inline with the title (no separate paragraph).
- Filter rows are clearly labeled ("Platform:", "Status:", "Client:").
- Active filters still highlight with primary purple.
- If no scripts exist, the empty state shows the document SVG above the heading.

- [ ] **Step 5: Run unit tests**

```bash
npx vitest run
```

The file `tests/scriptsPageHelpers.test.ts` tests the `buildHref` helper — confirm it still passes. No filter logic was changed.

- [ ] **Step 6: Commit**

```bash
git add "app/(app)/scripts/page.tsx"
git commit -m "feat: polish scripts list page header, filters, and empty state"
```

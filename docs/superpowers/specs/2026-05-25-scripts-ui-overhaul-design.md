# Scripts UI Overhaul — Design Spec

**Date:** 2026-05-25  
**Scope:** `/scripts` list page + `/scripts/[id]` detail page  
**Approach:** Option A — Focused Polish  

---

## 1. Script Detail Page (`/scripts/[id]`)

### 1.1 Click-to-Edit Inline Editor (`ScriptEditor`)

**Current behaviour:** A Preview/Edit tab toggle swaps between a rendered `div` and a `<Textarea>`. Switching modes causes a layout shift because the two elements have different heights.

**New behaviour:**
- Remove the tab toggle entirely.
- Default state: preview `div` renders `ScriptOutput`, styled with `cursor-text` and a transparent border.
- Hover state: the preview container shows a subtle `border-primary/20` ring and a faint background tint to signal it is editable.
- Click: the preview `div` is replaced by a `<Textarea>` with **identical** `padding`, `font`, `min-height`, and `line-height` so no layout shift occurs.
- Top-right of the editor area: a small muted label "Click outside to save" appears while in edit mode.
- Save triggers on `onBlur` (existing logic) and also on `Escape` key (adds `onKeyDown` handler).
- Word count and save state indicator move to the top-right of the container (replacing the old tab row).

**Files changed:** `components/script/ScriptEditor.tsx`

### 1.2 Floating Action Pill (`ScriptActions`)

**Current behaviour:** Full-width fixed bar pinned to the bottom of the viewport, left edge offset by sidebar width (`md:left-60`).

**New behaviour:**
- Container becomes `fixed bottom-6 left-0 right-0 flex justify-center z-40 pointer-events-none`.
- Inner pill: `pointer-events-auto inline-flex items-center gap-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-lg px-3 py-2`.
- Button grouping (left → right):
  1. **Copy** + **PDF** — utility actions
  2. A thin `1px` vertical divider (`w-px h-4 bg-[var(--color-border)]`)
  3. **Mark final** + **Mark sent** — status actions (hidden when already in that state, same as now)
  4. A thin vertical divider
  5. **Share with client** / **Shared** — share toggle (existing dropdown logic unchanged)
  6. A thin vertical divider
  7. **Delete** (ghost, destructive) — separated visually from the rest
- All buttons use `size="sm"` (existing). The pill does not span full width — it is as wide as its content.
- On mobile (`< md`), the pill still floats but gets `max-w-[calc(100vw-2rem)]` and wraps onto two lines if needed.
- The main page `pb-24` bottom padding stays (keeps content from hiding behind the pill).

**Files changed:** `components/script/ScriptActions.tsx`

---

## 2. Scripts List Page (`/scripts`)

### 2.1 Script Cards (`ScriptCard`)

**Changes:**
- Padding: `p-4` (was `p-[10px_12px]`).
- Hover: add `hover:shadow-md` in addition to existing border color change.
- Title: `text-[14px]` (was `text-[13px]`), `line-clamp-2` stays.
- Meta row (`wordCount · duration`): `text-[11px]` stays, but add `mb-2` spacing.
- Client row and pipeline button: already `mt-auto` — keep as-is.
- No color changes. Surface stays white/surface, badges stay the same.

**Files changed:** `components/script/ScriptCard.tsx`

### 2.2 Filter Row (`scripts/page.tsx`)

**Changes:**
- Split the current single flat row into two rows:
  - **Row 1:** `Platform:` label (muted, `text-xs`) + platform pill links + `?` HelpTooltip icon at the end.
  - **Row 2:** `Status:` label + status pill links + `·` separator + `Client:` label + client pill links (if clients exist). HelpTooltip for status moves to the `?` icon pattern.
- Labels use `text-xs text-text-secondary dark:text-dark-muted font-medium mr-1` inline before the pills.
- Existing pill styling (`px-2.5 py-1 rounded-full border-hair`) unchanged.
- Wrapping `gap-2` stays; rows separated by `mb-3`.

**Files changed:** `app/(app)/scripts/page.tsx`

### 2.3 Page Header (`scripts/page.tsx`)

**Changes:**
- Script count: wrap in `<span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{total}</span>` inline after the `h1` text (on the same line).
- Remove the separate `<p>` count paragraph.
- Add `mb-8` to the header `div` (was `mb-6`).

**Files changed:** `app/(app)/scripts/page.tsx`

### 2.4 Empty State (`scripts/page.tsx`)

**Changes:**
- Add an inline SVG illustration above the heading: a simple rounded rectangle with a few horizontal lines suggesting a document, in `text-[var(--color-border)]` (light gray). Size: `w-16 h-16`.
- Keep existing heading and description text unchanged.
- Keep the "Generate a script" button.

**Files changed:** `app/(app)/scripts/page.tsx`

---

## Out of Scope

- No changes to routing, data fetching, or API logic.
- No changes to `ScriptTitleEditor`, `ExtrasPanel`, `ScriptReviewPanel`, or `ScriptsGrid`.
- No changes to the color theme or design tokens.
- No new dependencies.

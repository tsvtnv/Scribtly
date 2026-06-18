# UI Reskin — Talisman-style (Option B)

**Date:** 2026-06-18  
**Scope:** Visual reskin + dashboard upgrade. No backend changes.

---

## 1. Global Tokens (`app/globals.css`)

- `--bg-base: #ffffff` (unchanged)
- `--bg-subtle: #F7F3EE` — kept only for inbox message bubbles and input backgrounds; removed from sidebar/layout surfaces
- `--accent: #E07830` — unchanged (brand colour)
- `--sidebar-bg: #ffffff` — new explicit token
- `--page-header-bg: #ffffff` — new explicit token

---

## 2. Sidebar (`components/layout/sidebar.tsx`)

- Background: white (`#ffffff`), `border-r` stays
- Active nav item: bold `font-semibold` text + `3px` left border in `--accent` colour; **no filled background**
- Inactive nav item: regular weight, `--text-muted`, no background
- Logo area: remove `border-b`, increase vertical padding to `py-6`
- Section label "CONFIGURE": unchanged

---

## 3. App Layout (`app/(app)/layout.tsx`)

- Add a sticky page-header bar at the top of the content column:
  - Left: sidebar toggle icon (mobile) + page icon (a simple `Layout` or panel icon) + page title pulled from the route
  - White background, `border-b`, `px-6 py-4`
  - The existing `<h1>` tags inside each page are removed — title comes from the header bar
- `<main>` padding: `px-6 py-6` (consistent, currently `p-4 md:p-6`)
- The header bar receives the page title via a client context or by reading the pathname

---

## 4. Dashboard Stat Cards (`app/(app)/dashboard/page.tsx`)

- Replace the 4-column gap grid with a single `border` container, cards inside share `border-r` separators (no outer gap)
- Each card layout (top→bottom):
  1. Label (small, muted) — e.g. "Total Leads"
  2. Large bold number — `text-4xl font-bold`
  3. Sublabel — e.g. "new this week" or "total delivered"
  4. Mini progress bar (`<Progress>`) showing e.g. contacted / total ratio
- Cards are equal-width (`flex-1`)

---

## 5. Dashboard Activity Chart

- Replace the `<ul>` recent-events list with a `LineChart` from `recharts`
- Data: last 14 days of `totalSent` (purple line) and `totalReplied` (orange `--accent` line)
- Chart height: 180px
- No vertical grid lines; horizontal dashed lines only
- X-axis: day numbers (small gray labels)
- Y-axis: hidden
- Legend: coloured dots + "Sent" / "Replies" labels above the chart
- API: `/api/dashboard` needs a `dailyActivity` field — array of `{ date, sent, replied }`

---

## 6. Campaign Cards (`app/(app)/campaigns/page.tsx`)

- Card split into two rows by a `border-t`:
  - **Top row:** status dot + campaign name (bold) + account · type (muted small)
  - **Stats row:** 4 columns — number + label below (leads / contacted / accepted / replied)
  - **Bottom row:** creation date (muted small, left) + action icons (pause / edit / delete, right)
- No change to functionality, only layout restructure

---

## Out of Scope

- Campaign wizard reskin (Option C)  
- Inbox, Accounts, Automation, Settings pages  
- Backend logic, API routes (except adding `dailyActivity` to dashboard API)

---

## Files to Change

| File | Change |
|---|---|
| `app/globals.css` | Clean up tokens |
| `components/layout/sidebar.tsx` | White bg, new active state |
| `app/(app)/layout.tsx` | Add page header bar |
| `app/(app)/dashboard/page.tsx` | New stat cards + line chart |
| `app/(app)/campaigns/page.tsx` | Restructure campaign cards |
| `app/api/dashboard/route.ts` | Add `dailyActivity` to response |

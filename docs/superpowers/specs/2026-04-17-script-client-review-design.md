# Script Client Review — Design Spec

**Date:** 2026-04-17
**Feature:** Public share links for scripts with client commenting, approval, and rejection

---

## Goal

Allow workspace users to share a script with a client via a token-based public URL. The client can view the full script and extras, leave comments, and mark the script as Approved or Rejected — all without a login. Every verdict is stored as an audit log so the full review history is preserved.

---

## Data Model

### Schema additions to `prisma/schema.prisma`

**Add to `Script` model:**
```prisma
shareToken   String?  @unique
shareEnabled Boolean  @default(false)
comments     ScriptComment[]
```

**New enum:**
```prisma
enum ReviewVerdict {
  APPROVED
  REJECTED
}
```

**New model:**
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

**Migration:** `npx prisma db push`

---

## API Routes

### `POST /api/scripts/[id]/share`
- **Auth:** `ensureUser()` — workspace ownership required
- **Body:** `{ enabled: boolean }`
- **Behaviour:**
  - If `enabled: true` and `shareToken` is null → generate token via `randomToken()` from `@/lib/utils`
  - Update script: `{ shareEnabled: enabled, shareToken: token }`
  - Returns `{ shareToken, shareEnabled }`
- **Errors:** 404 if script not found, 403 if wrong workspace

### `GET /api/review/[token]`
- **Auth:** None
- **Behaviour:**
  - Look up script by `shareToken` where `shareEnabled = true`
  - Return script fields: `id`, `title`, `platform`, `content`, `extras`, `wordCount`, `createdAt`
  - Include `client: { name }` if exists
  - Include all `comments` ordered by `createdAt ASC`
- **Errors:**
  - Token not found or `shareEnabled = false` → 404 `{ error: 'Script not found' }`

### `POST /api/review/[token]/comment`
- **Auth:** None
- **Body:** `{ authorName: string, body: string, verdict?: 'APPROVED' | 'REJECTED' }`
- **Validation (Zod):**
  - `authorName`: string, min 1, max 100, trimmed
  - `body`: string, min 1, max 5000, trimmed
  - `verdict`: enum `['APPROVED', 'REJECTED']`, optional/nullable
- **Behaviour:**
  - Verify token resolves to a `shareEnabled` script
  - Create `ScriptComment` row
  - Returns created comment
- **Errors:** 404 if token invalid/disabled, 400 if validation fails

---

## Public Review Page — `/review/[token]`

**Route:** `app/(marketing)/review/[token]/page.tsx` — sits inside the existing public layout (no auth required, no sidebar).

### Layout (top to bottom)

1. **Header:** Script title, client name if exists, platform badge, word count
2. **Script content:** Rendered using `ScriptOutput` component (read-only)
3. **Extras:** Each extra field (title options, description, hashtags, etc.) in a labelled collapsible section — collapsed by default, expandable
4. **Review panel:**
   - Heading: "Leave your feedback"
   - `authorName` text input (label: "Your name", required)
   - `body` textarea (label: "Comments", required, 4 rows)
   - Three action buttons in a row:
     - **Approve** — green, submits with `verdict: 'APPROVED'`
     - **Reject** — red, submits with `verdict: 'REJECTED'`
     - **Comment** — neutral, submits with no verdict
   - Loading state on submit, error message on failure, success clears form
5. **Feedback history:** Full audit log, newest first
   - Each entry: author name, relative timestamp, comment body, verdict badge (Approved/Rejected) if applicable
   - Section heading: "Feedback history (N)"

### Error states
- Token not found OR `shareEnabled = false` → centered message: "This link is invalid or has been disabled."
- Network error on comment submit → inline error below form

### No auth, no cookies, no sessions. The page is stateless — it fetches on load and POSTs comments directly.

---

## In-App Share Controls

### `ScriptActions.tsx` changes

Add a **Share button** to the existing sticky action bar.

**State A — not shared (`shareEnabled = false`):**
- Button label: "Share with client"
- On click: POST `/api/scripts/[id]/share` with `{ enabled: true }`, then copy the resulting `/review/[token]` URL to clipboard, show toast "Link copied!"

**State B — shared (`shareEnabled = true`):**
- Button is visually active/highlighted
- On click: opens a small inline dropdown containing:
  - Share URL displayed as truncated text
  - "Copy link" button (copies URL to clipboard)
  - "Disable sharing" button — POST `{ enabled: false }`, link stops working, button returns to State A

### Review status panel on script detail page

Below the existing metadata bar, add a `ScriptReviewPanel` client component that:
- Fetches comments for this script (new internal API or pass from page props)
- Shows current verdict badge: **Approved** / **Rejected** / **Pending** — derived from the most recent comment that has a verdict
- Shows total comment count and last activity timestamp
- "View feedback" toggle expands to show full chronological audit log inline (same layout as public page history)
- Hidden entirely if `shareEnabled` has never been true (no comments exist)

---

## File Map

| File | Action |
|------|--------|
| `prisma/schema.prisma` | Add `shareToken`, `shareEnabled`, `comments` to Script; add `ReviewVerdict` enum; add `ScriptComment` model |
| `app/api/scripts/[id]/share/route.ts` | POST — toggle sharing, generate token |
| `app/api/review/[token]/route.ts` | GET — public fetch script + comments |
| `app/api/review/[token]/comment/route.ts` | POST — submit comment/verdict |
| `app/(marketing)/review/[token]/page.tsx` | Public review page (server component, fetches data) |
| `components/review/ReviewForm.tsx` | Client component — comment/verdict form |
| `components/review/FeedbackHistory.tsx` | Comment audit log (used on both public page and in-app panel) |
| `components/script/ScriptReviewPanel.tsx` | In-app review status + audit log for script detail page |
| `components/script/ScriptActions.tsx` | Add Share button + share state management |

---

## Constraints & Notes

- `shareToken` is generated once and never rotated automatically. Disabling sharing (`shareEnabled = false`) stops access without invalidating the token — re-enabling restores the same URL.
- No rate limiting on comment submission in v1. If spam becomes an issue, add a simple honeypot or IP-based limit later.
- `ScriptOutput` is already a client component and can be imported directly into the public review page.
- The public page lives under `app/(marketing)/` which already has a minimal layout (no sidebar, no auth). No layout changes needed.
- Extras are stored as `Json` on the Script model — the review page renders them the same way `ExtrasPanel` does, but read-only.

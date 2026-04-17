# ScriptFast — Design Spec

**Date:** 2026-04-17
**Status:** Approved for implementation
**Build target:** Full platform to JSON specification, with three additions: workspace-based team invites (Agency), bulk generation mode, full dark theme with toggle.

---

## 1. Goals & Scope

ScriptFast is a freemium SaaS that generates video scripts (YouTube, TikTok, Reels, LinkedIn, Podcast) for freelancers in their clients' exact voice. Users save client profiles once and generate platform-aware scripts that stream in real-time, with optional extras (titles, hashtags, descriptions, etc.) and PDF export.

**In scope:** Everything in `build_order` steps 1–11 of the source JSON, plus:
- Workspace model with Agency team invites (5-seat cap)
- Bulk generation mode on `/generate` (Agency only)
- Full dark theme with sidebar toggle, localStorage persistence, `prefers-color-scheme` fallback

**Explicitly NOT in scope (v1):**
- Multi-workspace switcher UI (each user has exactly one active workspace)
- Workspace transfer / ownership change
- Per-member usage analytics
- Client import/export

---

## 2. Tech Stack

Per source JSON `tech_stack`:
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Clerk for auth
- Supabase Postgres + Prisma ORM
- Anthropic SDK with `claude-sonnet-4-20250514`, streaming enabled
- Stripe (subscriptions + portal + webhooks)
- Resend for transactional email (React Email templates)
- `@react-pdf/renderer` for PDF export
- `svix` for Clerk webhook signature verification
- Vercel for deployment
- npm package manager

---

## 3. Data Model

Three new tables and a repointing of existing FKs to support shared workspaces.

### `Workspace`
- `id` String @id @default(cuid())
- `name` String
- `ownerId` String (FK User)
- `plan` Plan @default(FREE)
- `stripeCustomerId` String?
- `stripeSubscriptionId` String?
- `scriptCount` Int @default(0)
- `scriptCountResetAt` DateTime
- `createdAt`, `updatedAt`
- Relations: `owner`, `members WorkspaceMember[]`, `clients Client[]`, `scripts Script[]`, `invites Invite[]`

### `WorkspaceMember`
- `id`, `workspaceId`, `userId`, `role` (`OWNER` | `MEMBER`), `joinedAt`
- Unique on `(workspaceId, userId)`

### `Invite`
- `id`, `workspaceId`, `email`, `token` (random URL-safe, unique), `invitedBy` (User id), `acceptedAt DateTime?`, `expiresAt`, `createdAt`
- Unique on `(workspaceId, email)`

### `User` (modified)
- Drop: `plan`, `stripeCustomerId`, `stripeSubscriptionId`, `scriptCount`, `scriptCountResetAt` (all moved to Workspace)
- Keep: `id`, `clerkId @unique`, `email @unique`, `name`, `createdAt`, `updatedAt`
- Add: `defaultWorkspaceId String?` (which workspace to load on dashboard)

### `Client` (modified)
- Replace `userId` with `workspaceId` (FK Workspace)
- All other fields per source spec

### `Script` (modified)
- Replace `userId` with `workspaceId`
- Keep `clientId String?` (nullable for orphaned scripts after client delete)
- All other fields per source spec

### Enums
- `Plan`: FREE, PRO, AGENCY
- `Platform`: YOUTUBE, TIKTOK, REELS, LINKEDIN, PODCAST
- `ScriptStatus`: DRAFT, FINAL, SENT
- `MemberRole`: OWNER, MEMBER

### Indexes
- `Client(workspaceId)`, `Script(workspaceId)`, `Script(workspaceId, clientId)`, `Script(workspaceId, createdAt)` for library pagination, `WorkspaceMember(userId)`, `Invite(token)`, `Invite(email)`

---

## 4. Auth & Workspace Bootstrapping

### Lazy user sync (`lib/ensureUser.ts`)

Called at top of every authenticated server action and API route. Returns `{ user, workspace }`.

1. `auth()` from Clerk — if no `userId`, throw `UnauthorizedError` (caller → 401)
2. Look up `User` by `clerkId`
3. If exists: load `defaultWorkspace`, return
4. If not: call `currentUser()` for email + name, then in a Prisma transaction:
   - Check `Invite` for unaccepted match by email
   - **If invite found:** create `User`, create `WorkspaceMember(role=MEMBER)` joining inviter's workspace, set `defaultWorkspaceId`, mark `acceptedAt = now()`
   - **Otherwise:** create `User`, create personal `Workspace` (name = `<firstName>'s workspace`, plan = FREE, scriptCountResetAt = +30d), create `WorkspaceMember(role=OWNER)`, set `defaultWorkspaceId`
   - Fire-and-forget welcome email
5. Return `{ user, workspace }`

### Clerk webhook (`/api/webhooks/clerk`)

Redundancy for the lazy sync. Verifies signature with `svix` + `CLERK_WEBHOOK_SECRET`. Handles `user.created` by calling the same upsert logic. Idempotent.

### Free-script-counter monthly reset

Lazy: every `ensureUser()` checks `workspace.scriptCountResetAt < now()` and resets if so. No cron needed.

### Security backbone

All API queries scope by `workspace.id`, never `user.id`. Every ownership check is `record.workspaceId === workspace.id`.

---

## 5. Plan Gating (`lib/planLimits.ts`)

Pure functions taking `workspace` (with optional related counts) and returning booleans/numbers:
- `canGenerateScript(workspace)` — checks FREE limit (3/month)
- `canUsePlatform(workspace, platform)` — FREE only allows YOUTUBE
- `canUseExtras(workspace)` — PRO/AGENCY only
- `canExportPDF(workspace)` — PRO/AGENCY only
- `canAddClient(workspace, currentClientCount)` — FREE limit 1
- `canInviteMembers(workspace)` — AGENCY only
- `getRemainingScripts(workspace)` — number or Infinity
- `getMaxMembers(plan)` — 1 / 1 / 5

Plan limits sourced from `config/plans.config.json` (file ships verbatim from source spec, plus `member_limit` field).

Used both server-side (enforcement, returns 403 with `{ code: "upgrade_required", reason: "..." }`) and client-side (UI gating: lock icons, disabled buttons, upgrade modal triggers).

---

## 6. Script Generator (`/generate`)

The most-touched feature; quality bar highest here.

### Layout
Two-pane on desktop (sticky form left, output right), stacked mobile. Mode toggle: **Single | Bulk** (Bulk hidden for non-AGENCY).

### Single mode form
1. Client (select; "+ Add new client" opens `/clients/new` in new tab)
2. Platform (visual picker grid using `ui_design_system.platform_colours`; non-allowed platforms show lock icon → upgrade modal)
3. Topic (textarea, 300 char counter)
4. Length (select, options from `platforms[platform].durations`)
5. Hook style (select, optional, options from `platforms[platform].hook_styles`)
6. Also generate (multi-checkbox extras from `platforms[platform].extra_outputs`; whole section disabled with "Pro feature" hint for FREE)
7. Generate button

### Bulk mode form
- Client (single)
- Repeating row: `[platform picker] [topic] [length] [✕]`
- "+ Add another script" (max 10 rows)
- Hook style + extras shared across all rows
- Generate all button

### Streaming output

`useScriptStream` hook reads `ReadableStream` from `/api/generate-script` via `fetch` + `getReader()`. Exposes `{ text, isStreaming, error, done }`.

Rendering:
- `Source Serif Pro` via `next/font` (script-feel, system serif fallback)
- Section headers (`[HOOK]`, `[INTRO]`, `[SECTION 1: ...]`) parsed into styled pill components
- Inline tags (`[B-ROLL: ...]`, `[ACTION: ...]`, `[TEXT: ...]`, `[CUT]`, `[MUSIC: ...]`, `[PAUSE]`) rendered as tinted inline badges
- Words in CAPS get subtle emphasis
- Auto-scroll to bottom; pauses if user scrolls up

### On stream completion
- Auto-save via `POST /api/scripts` with content + extras + wordCount + auto-title (first 60 chars of topic, or AI-generated if title was an extra)
- Action bar: Copy / Download PDF (locked for FREE) / Mark Final / Mark Sent / Regenerate / View in Library / Delete
- Toast: "Script saved to library"

### Regenerate
- **Whole-script:** re-submits same form; old version remains in library
- **Per-section:** hover any section header in Preview mode → `↻` icon → `POST /api/generate-script/section` with `{ scriptId, sectionLabel, regenerationHint? }`. Server re-prompts Anthropic with original system prompt + focused rewrite instruction. Stream replaces only that section.
- **Per-extra:** in script view, each extra has "Regenerate this extra" → `POST /api/generate-script/extra`

### Bulk mode output
Drawer from right with one card per script. Parallel `fetch` capped at 3 concurrent; remaining queued. Each streams independently. Cards collapsible. Each auto-saves on completion.

### Server-side gate enforcement (`POST /api/generate-script`)

Before any Anthropic call:
1. `ensureUser()` → `{ user, workspace }`
2. `canGenerateScript(workspace)` — 403 `upgrade_required:free_limit` if false
3. `canUsePlatform(workspace, platform)` — 403 `upgrade_required:platform_locked`
4. If `extraOutputs?.length`: `canUseExtras(workspace)` — 403 `upgrade_required:extras_locked`
5. **Atomic `scriptCount` increment in transaction** before stream starts (prevents concurrent-spam bypass)
6. Build prompt via `buildPrompt()`, call Anthropic with `stream: true`, pipe through `ReadableStream`
7. On full Anthropic failure: send error chunk, decrement scriptCount (only on full failure, not partial)
8. If scriptCount transitions 2→3 for FREE: fire-and-forget `free_limit_reached` email

### Upgrade modal
Reusable `<UpgradeModal reason="..." />`. Triggers from any 403 with `upgrade_required`, FREE user clicking locked platform/extra, FREE user at scripts/2 of 3 (preview warning), FREE user at 3 of 3 (hard block). Shows what they're trying to unlock + Pro/Agency cards + CTA → Stripe checkout.

---

## 7. Script Library & Editor

### `/scripts`
- Top bar: search (title/topic substring) + filters (client multi, platform multi, status pills) — filters in URL params
- Grid of `<ScriptCard>` (3/2/1 cols): platform colour stripe + title + client + relative date + word count + status badge + hover Copy/Open/Delete
- Pagination: 20/page, "Load more" button
- Empty state CTA → `/generate`

### `/scripts/[id]`
- Header: back arrow, inline-editable title, client + platform badge + word count + status badge, kebab menu
- Editor: textarea + live-preview pane with toggle (default Preview). Section headers and inline tags rendered as styled non-editable chips in Preview
- Auto-save on blur; "Saved"/"Saving..." indicator
- Per-section regenerate (hover ↻ in Preview)
- Right rail (collapsible): extras panel — only renders sections present in `script.extras` (title_options, description, tags, chapters, caption, hashtags, hook_variations, cover_text, show_notes, social_clip_prompt). Each has copy + regenerate buttons.
- Sticky bottom action bar (mobile): Copy / Download PDF (locked FREE) / Mark Final or Sent / Delete

---

## 8. Client Management

### `/clients`
- "+ New client" button (disabled with upgrade tooltip if FREE at limit)
- Grid of `<ClientCard>`: avatar circle (initials on `avatarColor` background, contrast-aware text), name, niche, primary platform badge, script count, hover Edit/Delete
- Empty state CTA

### `/clients/new` and `/clients/[id]`
Shared `<ClientForm>` with all spec fields:
1. Name
2. Niche (placeholder helps)
3. Target audience (textarea)
4. Tone of voice — dropdown of `prompts_config.tone_presets` + "Custom..." (reveals textarea)
5. Example phrases (textarea, optional)
6. Topics to avoid (textarea, optional)
7. Primary platform (visual picker, no plan-locking — clients tag regardless of subscription)
8. Avatar colour (8 preset swatches derived from design tokens + custom hex)

Save: new → redirect `/clients` + toast; edit → stay + toast.

Delete (edit page Danger Zone): confirm dialog explains scripts remain (clientId nulled). Library cards show "Unassigned" for orphans.

---

## 9. Dashboard, Settings, Team

### `/dashboard`
- Header: "Welcome back, {firstName}" + workspace name pill
- Row 1 — three stat cards: scripts this month / total clients / scripts remaining (or total ever for paid)
- Row 2 — Quick generate primary CTA card
- Row 3 — Recent scripts list (last 5) + "View all"
- Row 4 — Clients horizontal scroll + "+ Add" trailing card + "Manage all"
- Conditional banners (above stats, dismissable per session): FREE at 2/3 scripts, AGENCY owner with pending invites

### `/settings` (tabbed)
- **Profile:** name (editable), email (read-only), "Manage Clerk account" button (opens `<UserProfile />` modal)
- **Workspace:** name (editable, owner only), created date, member count
- **Billing** (`/settings/billing`, owner only): plan card with badge + price + features, scripts used this month, Upgrade buttons (start checkout), Manage subscription (Stripe portal)
- **Team** (`/settings/team`, AGENCY + owner only):
  - Member list rows: avatar, name, email, role, joined, Remove action (confirms; sets WorkspaceMember deleted; member's `defaultWorkspaceId` reverts to fresh personal FREE workspace on next login)
  - Invite form: email + Send. Creates `Invite` (random token, 7d expiry), sends invite email with link `/invite/[token]`
  - Pending invites list with Resend / Revoke
  - Hard cap 5 total seats (members + pending invites)
- **Danger zone:** Delete account — typed "DELETE" confirm. Cancels Stripe sub if any, deletes Clerk user, deletes User row (cascade workspace + clients + scripts if sole owner; just removes WorkspaceMember if member)

### Invite landing `/invite/[token]`
If not signed in, redirect to Clerk signup with redirect_url back. After sign-in, `ensureUser()` already accepts invite by email match. Page shows "Welcome to {workspace name}" + "Go to dashboard" button.

### Sidebar
Logo, nav (Dashboard / Generate / Scripts / Clients / Settings), `<PlanBadge>` (click → /settings/billing), theme toggle (sun/moon), Clerk `<UserButton />`. Extra "Team" link if AGENCY owner. Hide Billing if MEMBER.

---

## 10. Stripe Billing & Webhooks

### `POST /api/stripe/checkout`
Owner-only. Body `{ priceId }`. Find/create Stripe customer (cache `stripeCustomerId` on workspace). Create subscription checkout with `client_reference_id = workspace.id` and `metadata.workspaceId`. Return `{ url }`.

### `POST /api/stripe/portal`
Owner-only, requires `stripeCustomerId`. Returns billing portal URL.

### `POST /api/stripe/webhook`
Verifies signature with `STRIPE_WEBHOOK_SECRET`. Handlers (all idempotent):
- `checkout.session.completed` → look up workspace by `metadata.workspaceId`, set plan from price ID, store `stripeSubscriptionId`, fire `upgrade_confirmation` email
- `customer.subscription.updated` → re-derive plan from active price, update workspace
- `customer.subscription.deleted` → set plan = FREE, clear `stripeSubscriptionId`. If workspace had members, eject non-owners (each gets a fresh personal FREE workspace on next login)

---

## 11. PDF Export (`GET /api/export/pdf/[id]`)

Member access (script.workspaceId === workspace.id). Plan gate: `canExportPDF` (PRO/AGENCY).

`@react-pdf/renderer` document:
- Header: ScriptFast logo + workspace name
- Subheader: client name + platform badge + date
- Body: parsed script (section headers as h2, inline tags subtle, CAPS preserved)
- Footer: word count + duration

Returns `application/pdf` with `Content-Disposition: attachment; filename="<title>.pdf"`.

---

## 12. Email (Resend + React Email)

Three templates in `lib/emails/` as React components:
- **Welcome** — first user creation (from `ensureUser`)
- **Free limit reached** — when scriptCount transitions 2→3
- **Upgrade confirmation** — from Stripe `checkout.session.completed`
- **Invite** — when owner invites a member (additional template for the team feature)

All sends fire-and-forget: `void resend.emails.send(...).catch(logError)`. Email failure never blocks user action.

`from`: `hello@scriptfast.app` (per spec; user must verify domain in Resend dashboard).

---

## 13. Marketing Site

`(marketing)` route group, no auth. Top nav (logo, Pricing, Login, Signup CTA), footer (links + copyright).

- `/` — all sections from `pages.homepage`: hero, social proof, problem, solution (4 features), demo placeholder, pricing teaser
- `/pricing` — three plan cards + FAQ accordion
- `/youtube-scripts`, `/tiktok-scripts` — SEO landing pages with platform-specific copy, "How it works", testimonials placeholder, CTA to signup

Metadata + OpenGraph on every page. Server components throughout.

---

## 14. Design System

### Colours (light)
Per source spec `ui_design_system.colours` — primary `#7F77DD`, neutral_bg `#F1EFE8`, text_primary `#2C2C2A`, etc.

### Colours (dark) — derived
- `bg-base`: `#1A1A1A` (near-black, slightly warm)
- `bg-elevated`: `#252523` (cards, modals)
- `bg-input`: `#2E2E2C`
- `border`: `rgba(255, 255, 255, 0.08)`
- `text-primary`: `#F1EFE8` (re-use existing neutral_bg as light-on-dark)
- `text-secondary`: `#A3A19C`
- `primary`: `#9D96E8` (slightly desaturated for AA contrast on dark)
- `primary-light`: `rgba(157, 150, 232, 0.16)` (tint)
- Status colours: keep hue, lift lightness ~10%

### Platform colours (dark mode)
Use the `text` value from each `platform_colours` entry as background tint, the `bg` value as text — auto-inverts elegantly.

### Theme toggle
Sidebar icon (sun/moon). State stored in `localStorage.theme`. Initial value: `localStorage.theme || prefers-color-scheme`. Applied via `class="dark"` on `<html>`. SSR-safe inline script in `<head>` sets the class before paint to prevent flash.

### Components
- Border radius: per spec (sm 6 / md 8 / lg 12 / full)
- 0.5px borders
- No drop shadows (flat)
- Generous whitespace
- Inter for UI, Source Serif Pro for script body

---

## 15. File Structure

```
app/
  (marketing)/
    page.tsx
    pricing/page.tsx
    youtube-scripts/page.tsx
    tiktok-scripts/page.tsx
    layout.tsx
  (auth)/
    login/[[...rest]]/page.tsx
    signup/[[...rest]]/page.tsx
    layout.tsx
  (app)/
    dashboard/page.tsx
    generate/page.tsx
    scripts/page.tsx
    scripts/[id]/page.tsx
    clients/page.tsx
    clients/new/page.tsx
    clients/[id]/page.tsx
    settings/page.tsx
    settings/billing/page.tsx
    settings/team/page.tsx
    invite/[token]/page.tsx
    layout.tsx
  api/
    generate-script/route.ts
    generate-script/section/route.ts
    generate-script/extra/route.ts
    scripts/route.ts
    scripts/[id]/route.ts
    clients/route.ts
    clients/[id]/route.ts
    workspace/route.ts
    workspace/invites/route.ts
    workspace/invites/[id]/route.ts
    workspace/members/[id]/route.ts
    stripe/checkout/route.ts
    stripe/portal/route.ts
    stripe/webhook/route.ts
    webhooks/clerk/route.ts
    export/pdf/[id]/route.ts
    account/route.ts
  layout.tsx
  globals.css
components/
  ui/ (Button, Input, Textarea, Select, Badge, Card, Modal, Toast, Tooltip, Dialog, Tabs, Switch)
  script/ (ScriptCard, ScriptOutput, ScriptEditor, ScriptExportMenu, ExtrasPanel, SectionRegenerate)
  client/ (ClientCard, ClientForm, ClientSelector, ClientAvatar)
  generate/ (GenerateForm, GenerateBulkForm, PlatformPicker, DurationPicker, HookStylePicker, ExtrasPicker, BulkProgressDrawer)
  layout/ (Sidebar, Navbar, MarketingNav, MarketingFooter, PageHeader, ThemeToggle, WorkspaceProvider)
  billing/ (PlanBadge, UpgradeModal, UsageMeter, PlanCard)
  team/ (MemberList, InviteForm, PendingInvitesList)
lib/
  anthropic.ts
  prisma.ts
  stripe.ts
  resend.ts
  buildPrompt.ts
  planLimits.ts
  ensureUser.ts
  pdf.tsx
  utils.ts
  errors.ts
  emails/ (Welcome.tsx, FreeLimitReached.tsx, UpgradeConfirmation.tsx, InviteEmail.tsx)
config/
  prompts.config.json
  plans.config.json
prisma/
  schema.prisma
hooks/
  useScriptStream.ts
  useClientProfiles.ts
  useScriptLibrary.ts
  useTheme.ts
middleware.ts (Clerk)
.env.example
README.md
```

---

## 16. API Route Summary

All authenticated routes start with `ensureUser()`. All ownership checks scope by `workspace.id`.

| Route | Method | Notes |
|---|---|---|
| `/api/generate-script` | POST | Streaming. Plan gate. Atomic count increment. |
| `/api/generate-script/section` | POST | Streaming. Per-section regen. |
| `/api/generate-script/extra` | POST | Non-streaming (small output). |
| `/api/scripts` | GET, POST | List (paginated, filtered) / create |
| `/api/scripts/[id]` | GET, PATCH, DELETE | Workspace-scoped |
| `/api/clients` | GET, POST | Workspace-scoped, plan gate on POST |
| `/api/clients/[id]` | GET, PATCH, DELETE | Workspace-scoped, soft-orphan scripts on delete |
| `/api/workspace` | GET, PATCH | Get current; rename (owner only) |
| `/api/workspace/invites` | GET, POST | List / create (AGENCY owner only, 5-seat cap) |
| `/api/workspace/invites/[id]` | DELETE | Revoke (owner) |
| `/api/workspace/members/[id]` | DELETE | Remove member (owner) |
| `/api/stripe/checkout` | POST | Owner only |
| `/api/stripe/portal` | POST | Owner only |
| `/api/stripe/webhook` | POST | Signature verified |
| `/api/webhooks/clerk` | POST | Signature verified |
| `/api/export/pdf/[id]` | GET | Plan gate (PRO/AGENCY) |
| `/api/account` | DELETE | Cascading account deletion |

Error codes: 401 unauthenticated / 403 forbidden (with `{ code, reason }` for upgrade prompts) / 404 not found / 400 validation / 500 server.

---

## 17. Implementation Order

11 phases mirroring source `build_order` with workspace/team/dark-mode threaded throughout:

1. Project setup (Next.js, deps, env, Prisma init, lib singletons, config files, design tokens, dark theme infrastructure)
2. Auth + workspace bootstrapping (`ensureUser`, Clerk webhook, app layout with sidebar, theme toggle, PlanBadge)
3. Client profiles (CRUD APIs, list, form, plan gate)
4. Script generator — single mode (streaming API, GenerateForm, useScriptStream, output rendering, auto-save, upgrade modal)
5. Script library + editor (list with filters/pagination, single-view editor, extras panel, per-section + per-extra regen)
6. Dashboard
7. PDF export
8. Stripe billing (checkout, portal, webhook, billing page, UpgradeModal wiring)
9. Emails (Resend + React Email templates wired to triggers)
10. Team / workspace management (invite + accept flow, team page, member removal)
11. Bulk generation mode (Agency-gated /generate toggle + drawer + parallel streams)
12. Marketing site
13. Polish + deploy (loading/error/empty states, README, .env.example, validation pass)

---

## 18. Validation Checklist

Per source spec plus:
- Workspace members see workspace's clients/scripts; non-members never do
- Invite acceptance correctly assigns to inviting workspace, not personal one
- Member removal correctly orphans member to fresh personal FREE workspace on next login
- 5-seat cap enforced (members + pending invites)
- Bulk mode hidden for non-AGENCY
- Bulk mode caps parallel streams at 3
- Dark mode toggles without flash, persists across sessions, respects OS preference initially
- All UI gates match server-side enforcement (no client-only gating)
- All emails fire-and-forget (no user-blocking on email failure)
- Stripe downgrade ejects extra members cleanly
- Account deletion cascades correctly (sole owner) or just removes membership (member)

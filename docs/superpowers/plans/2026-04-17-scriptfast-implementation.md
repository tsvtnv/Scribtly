# Scribtly Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full Scribtly SaaS platform per `docs/superpowers/specs/2026-04-17-scribtly-design.md` — Next.js 14 app with Clerk auth, Supabase/Prisma, Anthropic streaming, Stripe billing, Resend emails, PDF export, full dark theme, workspace-based team invites for Agency, and bulk generation mode.

**Architecture:** Next.js 14 App Router with route groups for marketing / auth / app. All authenticated requests resolve through `lib/ensureUser.ts` which lazily syncs Clerk users to Postgres and bootstraps a personal workspace (or accepts a pending invite). All data is workspace-scoped; plan gates enforced server-side and mirrored in the UI. Streaming uses native `ReadableStream` piped from Anthropic SDK to the client via a `useScriptStream` hook.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Clerk, Prisma + Supabase Postgres, `@anthropic-ai/sdk`, Stripe, Resend + React Email, `@react-pdf/renderer`, `svix`, Vitest for unit tests.

**External keys required (placeholders ship in `.env.example`):** Clerk publishable + secret + webhook secret, Supabase `DATABASE_URL` + `DIRECT_URL`, Anthropic API key, Stripe secret + webhook secret + publishable + price IDs (Pro, Agency), Resend API key. The user wires real keys after the build per their decision (Option A in brainstorm).

---

## Phase 1 — Project setup

### Task 1.1: Initialise Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`, `.gitignore`, `.env.example`, `README.md`

- [ ] **Step 1:** Create `package.json` with Next.js 14, TypeScript, Tailwind, and all production dependencies.

```json
{
  "name": "scribtly",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "@clerk/nextjs": "5.3.0",
    "@prisma/client": "5.18.0",
    "@anthropic-ai/sdk": "0.27.0",
    "stripe": "16.7.0",
    "resend": "4.0.0",
    "@react-email/components": "0.0.22",
    "@react-pdf/renderer": "4.0.0",
    "svix": "1.29.0",
    "zod": "3.23.8",
    "clsx": "2.1.1",
    "tailwind-merge": "2.5.2",
    "lucide-react": "0.439.0"
  },
  "devDependencies": {
    "@types/node": "20.16.5",
    "@types/react": "18.3.5",
    "@types/react-dom": "18.3.0",
    "typescript": "5.5.4",
    "tailwindcss": "3.4.10",
    "postcss": "8.4.45",
    "autoprefixer": "10.4.20",
    "prisma": "5.18.0",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5",
    "vitest": "2.0.5",
    "@vitest/ui": "2.0.5"
  }
}
```

- [ ] **Step 2:** Create `tsconfig.json`.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3:** Create `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs` with design tokens from spec section 14 wired into Tailwind theme (colors.primary, colors.platform.*, dark variants), and `darkMode: 'class'`.

- [ ] **Step 4:** Create `app/globals.css` with Tailwind directives, `:root` light tokens and `.dark` overrides, base body styles.

- [ ] **Step 5:** Create `app/layout.tsx` with `<html lang="en" suppressHydrationWarning>`, inline pre-paint theme script (reads `localStorage.theme` or `prefers-color-scheme`, sets `class="dark"` on `<html>` before paint), `next/font` for Inter and Source Serif Pro, ClerkProvider wrapper.

- [ ] **Step 6:** Create `.env.example` with every key listed in the spec environment_variables section, each with a brief comment.

- [ ] **Step 7:** Create `.gitignore` (Next.js + Prisma defaults + `.env`, `.env.local`).

- [ ] **Step 8:** Create README with: project overview, setup checklist (Clerk, Supabase, Stripe, Resend), env var copy, `npm install`, `prisma db push`, `npm run dev`, deploy notes.

- [ ] **Step 9:** Commit.

```bash
git init && git add -A && git commit -m "feat: initialise Next.js project with deps and design tokens"
```

### Task 1.2: Prisma schema

**Files:**
- Create: `prisma/schema.prisma`

- [ ] **Step 1:** Write `prisma/schema.prisma` with models per spec section 3 — `User`, `Workspace`, `WorkspaceMember`, `Invite`, `Client`, `Script` and enums `Plan`, `Platform`, `ScriptStatus`, `MemberRole`. All FK relations and indexes per spec.

```prisma
generator client { provider = "prisma-client-js" }

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum Plan { FREE PRO AGENCY }
enum Platform { YOUTUBE TIKTOK REELS LINKEDIN PODCAST }
enum ScriptStatus { DRAFT FINAL SENT }
enum MemberRole { OWNER MEMBER }

model User {
  id                  String   @id @default(cuid())
  clerkId             String   @unique
  email               String   @unique
  name                String?
  defaultWorkspaceId  String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  ownedWorkspaces     Workspace[] @relation("WorkspaceOwner")
  memberships         WorkspaceMember[]
  sentInvites         Invite[] @relation("InviteSender")
}

model Workspace {
  id                    String   @id @default(cuid())
  name                  String
  ownerId               String
  owner                 User     @relation("WorkspaceOwner", fields: [ownerId], references: [id])
  plan                  Plan     @default(FREE)
  stripeCustomerId      String?
  stripeSubscriptionId  String?
  scriptCount           Int      @default(0)
  scriptCountResetAt    DateTime
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  members               WorkspaceMember[]
  clients               Client[]
  scripts               Script[]
  invites               Invite[]
}

model WorkspaceMember {
  id           String      @id @default(cuid())
  workspaceId  String
  workspace    Workspace   @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  userId       String
  user         User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  role         MemberRole  @default(MEMBER)
  joinedAt     DateTime    @default(now())
  @@unique([workspaceId, userId])
  @@index([userId])
}

model Invite {
  id           String     @id @default(cuid())
  workspaceId  String
  workspace    Workspace  @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  email        String
  token        String     @unique
  invitedById  String
  invitedBy    User       @relation("InviteSender", fields: [invitedById], references: [id])
  acceptedAt   DateTime?
  expiresAt    DateTime
  createdAt    DateTime   @default(now())
  @@unique([workspaceId, email])
  @@index([email])
}

model Client {
  id              String   @id @default(cuid())
  workspaceId     String
  workspace       Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  name            String
  niche           String
  targetAudience  String
  toneOfVoice     String
  examplePhrases  String?
  avoidTopics     String?
  primaryPlatform Platform @default(YOUTUBE)
  avatarColor     String   @default("#7F77DD")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  scripts         Script[]
  @@index([workspaceId])
}

model Script {
  id           String       @id @default(cuid())
  workspaceId  String
  workspace    Workspace    @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  clientId     String?
  client       Client?      @relation(fields: [clientId], references: [id], onDelete: SetNull)
  title        String
  topic        String
  platform     Platform
  duration     String
  hookStyle    String?
  content      String       @db.Text
  extras       Json?
  wordCount    Int?
  status       ScriptStatus @default(DRAFT)
  pdfUrl       String?
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  @@index([workspaceId])
  @@index([workspaceId, clientId])
  @@index([workspaceId, createdAt])
}
```

- [ ] **Step 2:** Run `npx prisma generate` to create the client. Commit `git add prisma && git commit -m "feat: prisma schema with workspaces, invites, scripts"`.

### Task 1.3: Config files

**Files:**
- Create: `config/prompts.config.json`, `config/plans.config.json`

- [ ] **Step 1:** Copy `prompts.config.json` verbatim from the source spec's `prompts_config` block (system_base, client_voice_template, all 5 platforms with structure_prompt + hook_styles + extra_outputs, all extras_prompts, quality_rules, tone_presets).

- [ ] **Step 2:** Create `plans.config.json` from source spec's `plans_config`, adding `member_limit` (1, 1, 5) for each plan.

- [ ] **Step 3:** Commit.

### Task 1.4: lib singletons + utilities

**Files:**
- Create: `lib/prisma.ts`, `lib/anthropic.ts`, `lib/stripe.ts`, `lib/resend.ts`, `lib/utils.ts`, `lib/errors.ts`

- [ ] **Step 1:** `lib/prisma.ts` — global singleton pattern (avoids hot-reload connection storms).

```ts
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 2:** `lib/anthropic.ts`, `lib/stripe.ts`, `lib/resend.ts` — each export a singleton initialised from env vars.

- [ ] **Step 3:** `lib/utils.ts` — `cn(...inputs)` (clsx + tailwind-merge), `randomToken(len=32)`, `relativeDate(date)`, `wordCount(text)`, `contrastColor(hex)` (returns `#000` or `#fff` based on luminance), `slugify`.

- [ ] **Step 4:** `lib/errors.ts` — custom error classes `UnauthorizedError`, `ForbiddenError`, `UpgradeRequiredError(reason)`, `NotFoundError`, `ValidationError`. Helper `errorResponse(error)` returns appropriate `NextResponse.json` with status + body.

- [ ] **Step 5:** Commit.

### Task 1.5: Vitest setup

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`

- [ ] **Step 1:** `vitest.config.ts` with node env, path alias `@/*`, `tests/setup.ts` referenced.

- [ ] **Step 2:** `tests/setup.ts` — set test env vars to dummy values so singletons don't error on import.

- [ ] **Step 3:** Verify `npm run test` exits cleanly with zero tests. Commit.

---

## Phase 2 — Auth, plan gates, workspace bootstrapping

### Task 2.1: planLimits with full TDD

**Files:**
- Create: `lib/planLimits.ts`, `tests/planLimits.test.ts`

- [ ] **Step 1:** Write `tests/planLimits.test.ts` covering: `canGenerateScript` (FREE blocks at 3, allows below; PRO/AGENCY always true), `canUsePlatform` (FREE allows YOUTUBE only, PRO/AGENCY allow all 5), `canUseExtras` (FREE false, others true), `canExportPDF` (FREE false, others true), `canAddClient` (FREE blocks at 1, PRO/AGENCY infinite), `canInviteMembers` (AGENCY only), `getRemainingScripts` (FREE returns 3-count, others Infinity), `getMaxMembers` (1/1/5).

- [ ] **Step 2:** Run `npm run test` — expect failures, all "module not found".

- [ ] **Step 3:** Implement `lib/planLimits.ts` reading from `config/plans.config.json`. Functions take `{ plan, scriptCount }` shape (or full `Workspace`) and return booleans/numbers. `script_limit: -1` means unlimited.

- [ ] **Step 4:** Run `npm run test` — all green. Commit.

### Task 2.2: ensureUser lazy sync

**Files:**
- Create: `lib/ensureUser.ts`

- [ ] **Step 1:** Implement `ensureUser()`:
  - Calls `auth()` from `@clerk/nextjs/server`; if no `userId` throw `UnauthorizedError`
  - Looks up `User` by `clerkId` with `defaultWorkspace` included via a follow-up query
  - If found: if `workspace.scriptCountResetAt < now()`, in a transaction reset `scriptCount = 0` and bump `scriptCountResetAt = now() + 30d`. Return `{ user, workspace }`
  - If not found: call `currentUser()` for email/firstName, then in a transaction:
    - Find `Invite` where `email = ? AND acceptedAt IS NULL AND expiresAt > now()` (any workspace)
    - If invite: create User, create WorkspaceMember(MEMBER) on invite.workspaceId, set User.defaultWorkspaceId = invite.workspaceId, mark invite.acceptedAt = now()
    - Else: create User, create Workspace (name = `${firstName ?? email.split('@')[0]}'s workspace`, scriptCountResetAt = now+30d), create WorkspaceMember(OWNER), set User.defaultWorkspaceId
    - Schedule fire-and-forget welcome email (import lazily to avoid circular)
  - Return `{ user, workspace }`

- [ ] **Step 2:** Export helper `requireOwner(workspace, user)` — throws `ForbiddenError` if user is not OWNER of workspace.

- [ ] **Step 3:** Commit.

### Task 2.3: Clerk middleware + auth pages

**Files:**
- Create: `middleware.ts`, `app/(auth)/layout.tsx`, `app/(auth)/login/[[...rest]]/page.tsx`, `app/(auth)/signup/[[...rest]]/page.tsx`

- [ ] **Step 1:** `middleware.ts` using `clerkMiddleware()` from `@clerk/nextjs/server`. Public routes: `/`, `/pricing`, `/youtube-scripts`, `/tiktok-scripts`, `/login(.*)`, `/signup(.*)`, `/api/stripe/webhook`, `/api/webhooks/clerk`, `/invite/(.*)`.

- [ ] **Step 2:** `app/(auth)/layout.tsx` — centered card layout with logo.

- [ ] **Step 3:** Login + signup pages render `<SignIn />` / `<SignUp />` from `@clerk/nextjs`.

- [ ] **Step 4:** Commit.

### Task 2.4: Clerk webhook (redundancy)

**Files:**
- Create: `app/api/webhooks/clerk/route.ts`

- [ ] **Step 1:** POST handler verifies `svix-id`/`svix-timestamp`/`svix-signature` headers using `Webhook(CLERK_WEBHOOK_SECRET).verify(body, headers)`.

- [ ] **Step 2:** Switch on `evt.type === "user.created"` — extract email + firstName, call into the same upsert logic as `ensureUser` (extract a private `upsertUserByClerkId` helper from ensureUser.ts and import it). Idempotent — skip if user already exists.

- [ ] **Step 3:** Return 200 always (errors logged not thrown, so Clerk doesn't retry forever on bugs). Commit.

### Task 2.5: Theme infrastructure

**Files:**
- Create: `hooks/useTheme.ts`, `components/layout/ThemeToggle.tsx`

- [ ] **Step 1:** `hooks/useTheme.ts` — exports `useTheme()` returning `{ theme, setTheme, toggle }`. On mount reads `localStorage.theme || prefers-color-scheme`. Setting writes localStorage and toggles `document.documentElement.classList`.

- [ ] **Step 2:** `ThemeToggle.tsx` — sun/moon icon button calling `toggle`. Uses lucide-react icons.

- [ ] **Step 3:** Verify pre-paint script in `app/layout.tsx` (Task 1.1 step 5) handles SSR correctly — no flash.

- [ ] **Step 4:** Commit.

### Task 2.6: App shell (sidebar + workspace context)

**Files:**
- Create: `components/layout/Sidebar.tsx`, `components/layout/WorkspaceProvider.tsx`, `components/billing/PlanBadge.tsx`, `app/(app)/layout.tsx`

- [ ] **Step 1:** `WorkspaceProvider.tsx` — React context exposing `{ workspace, user, role }`. Server-hydrated from `(app)/layout.tsx`.

- [ ] **Step 2:** `PlanBadge.tsx` — pill showing FREE/PRO/AGENCY in plan-coloured chip. Click → `/settings/billing`.

- [ ] **Step 3:** `Sidebar.tsx` — nav links (Dashboard, Generate, Scripts, Clients, Settings). Conditional: "Team" link if AGENCY+OWNER. Hide Billing entry if MEMBER. Footer area: PlanBadge, ThemeToggle, Clerk `<UserButton />`.

- [ ] **Step 4:** `app/(app)/layout.tsx` — server component: `const { user, workspace } = await ensureUser(); const role = await getRole(workspace.id, user.id);` then renders flex layout with `<Sidebar role={role} />` + `<WorkspaceProvider value={{ workspace, user, role }}>{children}</WorkspaceProvider>`.

- [ ] **Step 5:** Commit.

---

## Phase 3 — UI primitives + buildPrompt

### Task 3.1: UI primitives

**Files:**
- Create: `components/ui/Button.tsx`, `Input.tsx`, `Textarea.tsx`, `Select.tsx`, `Badge.tsx`, `Card.tsx`, `Modal.tsx`, `Toast.tsx`, `Tooltip.tsx`, `Dialog.tsx`, `Tabs.tsx`, `Switch.tsx`

- [ ] **Step 1:** Each primitive: a forwardRef component using `cn()`, supporting variants via `data-variant` attributes. Style with Tailwind classes that respect both light and dark tokens (e.g. `bg-white dark:bg-bg-elevated text-text-primary dark:text-text-primary-dark border-border dark:border-border-dark`).

- [ ] **Step 2:** `Modal.tsx` and `Dialog.tsx` use a portal + fixed overlay + focus trap (basic — first focusable on open, esc to close).

- [ ] **Step 3:** `Toast.tsx` exports `useToast()` hook + `<ToastViewport />` portal at top of `(app)/layout.tsx`.

- [ ] **Step 4:** Commit.

### Task 3.2: buildPrompt with TDD

**Files:**
- Create: `lib/buildPrompt.ts`, `tests/buildPrompt.test.ts`

- [ ] **Step 1:** Write `tests/buildPrompt.test.ts` with cases: YOUTUBE script with all client fields populated → asserts placeholders are replaced, system_base appears, quality_rules block is appended, structure_prompt for YOUTUBE is included, no `{{` left in output. Same for TIKTOK with hookStyle. Same with extras `["title_options","description"]` — asserts both extras_prompts appear. Edge: empty examplePhrases / avoidTopics → renders as "(none specified)".

- [ ] **Step 2:** Run tests, expect failures.

- [ ] **Step 3:** Implement `buildPrompt({ client, platform, topic, duration, hookStyle?, extraOutputs? })` returning `{ system, userMessage, model, max_tokens }`. System = `system_base` + client_voice block. UserMessage = structure_prompt (with `{{topic}}` and `{{duration}}` substituted) + optional hook style instruction + quality rules + each requested extra prompt appended after a divider.

- [ ] **Step 4:** Tests pass. Commit.

### Task 3.3: useScriptStream hook

**Files:**
- Create: `hooks/useScriptStream.ts`

- [ ] **Step 1:** Hook signature: `useScriptStream()` returns `{ text, isStreaming, error, done, start(payload), reset() }`. Uses `fetch` to POST to `/api/generate-script`, gets `response.body.getReader()`, decodes chunks as UTF-8, accumulates into `text` state via `setText(prev => prev + chunk)`. Handles 403 with body `{ code: "upgrade_required", reason }` by setting error to a tagged value the caller can detect.

- [ ] **Step 2:** Commit.


---

## Phase 4 — Clients CRUD

### Task 4.1: Clients API

**Files:**
- Create: `app/api/clients/route.ts`, `app/api/clients/[id]/route.ts`

- [ ] **Step 1:** `GET /api/clients` → `ensureUser()`, returns `prisma.client.findMany({ where: { workspaceId: workspace.id }, include: { _count: { select: { scripts: true } } }, orderBy: { createdAt: "desc" } })`.

- [ ] **Step 2:** `POST /api/clients` → `ensureUser()`, Zod body (name, niche, targetAudience, toneOfVoice required; rest optional). Plan gate: `if (!canAddClient(workspace, currentClientCount))` → 403 `upgrade_required:client_limit`. Create and return.

- [ ] **Step 3:** `GET/PATCH/DELETE /api/clients/[id]` — load by id, assert `client.workspaceId === workspace.id` (404 otherwise). PATCH Zod partial. DELETE: first `prisma.script.updateMany({ where: { clientId: id }, data: { clientId: null } })`, then delete client.

- [ ] **Step 4:** Commit.

### Task 4.2: Client list + form pages

**Files:**
- Create: `components/client/ClientAvatar.tsx`, `ClientCard.tsx`, `ClientForm.tsx`, `ClientSelector.tsx`, `app/(app)/clients/page.tsx`, `app/(app)/clients/new/page.tsx`, `app/(app)/clients/[id]/page.tsx`

- [ ] **Step 1:** `ClientAvatar` — circle with initials (1-2 chars of name), background `client.avatarColor`, text from `contrastColor(hex)`.

- [ ] **Step 2:** `ClientCard` — server-rendered card with avatar, name, niche, platform badge, script count. Hover Edit/Delete overlay (client island).

- [ ] **Step 3:** `ClientForm` — client component, controlled form with all spec section 8 fields. Tone of voice = Select of tone_presets + "Custom..." (switches to Textarea). Avatar colour = 8-swatch grid derived from design tokens + hex input. Submits to POST or PATCH based on `mode` prop.

- [ ] **Step 4:** `ClientSelector` — Select dropdown for use on /generate. Shows avatar + name. "+ Add new client" footer link opens /clients/new in new tab.

- [ ] **Step 5:** `/clients/page.tsx` — server component; queries Prisma directly; "+ New client" button (disabled + tooltip if FREE at limit); empty state CTA.

- [ ] **Step 6:** `/clients/new/page.tsx` — wraps `<ClientForm mode="create" />`; guards against FREE over-limit.

- [ ] **Step 7:** `/clients/[id]/page.tsx` — loads client, ownership check, renders `<ClientForm mode="edit" initial={client} />` + Danger Zone delete card.

- [ ] **Step 8:** Commit.

---

## Phase 5 — Scripts API, generator, library, editor

### Task 5.1: Scripts CRUD API

**Files:**
- Create: `app/api/scripts/route.ts`, `app/api/scripts/[id]/route.ts`

- [ ] **Step 1:** `GET /api/scripts` — params `clientId?`, `platform?`, `status?`, `q?`, `page=1`, `limit=20`. Workspace-scoped. Returns `{ scripts, total, page, limit, hasMore }`.

- [ ] **Step 2:** `POST /api/scripts` — Zod body creates Script under workspaceId.

- [ ] **Step 3:** `GET/PATCH/DELETE /api/scripts/[id]` — workspace-scoped ownership. PATCH allows content, title, status, extras (merge, not replace).

- [ ] **Step 4:** Commit.

### Task 5.2: Generate-script streaming API

**Files:**
- Create: `app/api/generate-script/route.ts`

- [ ] **Step 1:** `export const runtime = "nodejs"`.

- [ ] **Step 2:** POST handler:
  1. `ensureUser()`
  2. Zod body: `{ clientId, platform, topic, duration, hookStyle?, extraOutputs? }`
  3. Plan gates: `canGenerateScript`, `canUsePlatform`, optional `canUseExtras`. Each fail → 403 JSON `{ code: "upgrade_required", reason }`.
  4. Load client; assert `client.workspaceId === workspace.id`.
  5. Atomic increment: `const ws = await prisma.workspace.update({ where: { id: workspace.id }, data: { scriptCount: { increment: 1 } } })`.
  6. If `ws.scriptCount === 3 && ws.plan === "FREE"`: fire-and-forget `free_limit_reached` email.
  7. `const { system, userMessage, model, max_tokens } = buildPrompt(...)`.
  8. `const anthStream = await anthropic.messages.stream({ model, max_tokens, system, messages: [{ role: "user", content: userMessage }] })`.
  9. Return a `ReadableStream`:
     - In `start(controller)`, iterate `for await (const event of anthStream)`. For `content_block_delta` events, `controller.enqueue(new TextEncoder().encode(event.delta.text))`.
     - On completion, `controller.close()`.
     - On error: enqueue an `[[ERROR:...]]` marker then close. In catch-all, decrement scriptCount via `prisma.workspace.update`.
  10. Return `new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } })`.

- [ ] **Step 3:** Commit.

### Task 5.3: Generate page (single mode)

**Files:**
- Create: `components/generate/PlatformPicker.tsx`, `DurationPicker.tsx`, `HookStylePicker.tsx`, `ExtrasPicker.tsx`, `GenerateForm.tsx`, `components/script/ScriptOutput.tsx`, `app/(app)/generate/page.tsx`

- [ ] **Step 1:** `PlatformPicker` — 5-tile visual grid with platform colour chips. Locked tiles show lock icon and call `onLockedClick(platform)` when clicked.

- [ ] **Step 2:** `DurationPicker`, `HookStylePicker` — Select wrappers reading options from `prompts.config.json` by platform.

- [ ] **Step 3:** `ExtrasPicker` — multi-checkbox group; disabled with "Pro feature" overlay if `!canUseExtras(workspace)`.

- [ ] **Step 4:** `GenerateForm` — client component, controlled, submits `{ clientId, platform, topic, duration, hookStyle?, extraOutputs? }` via `onSubmit` prop. Topic 300-char counter. Validates before submit.

- [ ] **Step 5:** `ScriptOutput` — receives `{ text, isStreaming }`. Regex-parse text into segments: section headers, inline tags (B-ROLL, ACTION, TEXT, CUT, MUSIC, PAUSE), CAPS words. Auto-scroll to bottom unless user scrolled up.

- [ ] **Step 6:** `/generate/page.tsx` — server component shell with client island `<GeneratePageClient>`. Client state holds form payload + streaming result. Uses `useScriptStream`. On `done`, POST to `/api/scripts` with content + extras + computed wordCount + auto-title (first 60 chars of topic). Shows action bar (Copy / Download PDF / Mark Final / Mark Sent / Regenerate / View in Library / Delete). Shows `<UpgradeModal>` on 403 responses.

- [ ] **Step 7:** Commit.

### Task 5.4: UpgradeModal

**Files:**
- Create: `components/billing/UpgradeModal.tsx`

- [ ] **Step 1:** Props `{ open, onClose, reason }`. Reason drives headline (free_limit, platform_locked, extras_locked, pdf_locked, client_limit). Body renders Pro + Agency `<PlanCard>`s. CTA POSTs to `/api/stripe/checkout` with priceId then `window.location = response.url`.

- [ ] **Step 2:** Commit.

### Task 5.5: Scripts library page

**Files:**
- Create: `components/script/ScriptCard.tsx`, `app/(app)/scripts/page.tsx`

- [ ] **Step 1:** `ScriptCard` — platform colour stripe (left edge), title (2-line clamp), client + avatar dot, relative date, word count + duration, status badge. Hover Copy/Open/Delete.

- [ ] **Step 2:** `/scripts/page.tsx` — server component; reads `searchParams` for filters + pagination. Queries Prisma directly (workspace-scoped). Renders search input (uncontrolled, form GETs to same route), filter chips (links that toggle URL params), grid, "Load more" link.

- [ ] **Step 3:** Commit.

### Task 5.6: Per-section + per-extra regeneration

**Files:**
- Create: `app/api/generate-script/section/route.ts`, `app/api/generate-script/extra/route.ts`

- [ ] **Step 1:** `/section` POST — body `{ scriptId, sectionLabel, regenerationHint? }`. Load script + client, ownership check. Build full system + a focused user message that instructs Claude to rewrite ONLY the named section, returning ONLY the new section starting with the section header. Stream response.

- [ ] **Step 2:** `/extra` POST — body `{ scriptId, extraType }`. Load script. Build prompt: system_base + client_voice + `extras_prompts[extraType]` + the script as context. Non-streaming `messages.create`. Merge result into `script.extras` and persist. Return `{ text }`.

- [ ] **Step 3:** Commit.

### Task 5.7: Script view + editor

**Files:**
- Create: `components/script/ScriptEditor.tsx`, `components/script/ExtrasPanel.tsx`, `app/(app)/scripts/[id]/page.tsx`

- [ ] **Step 1:** `ScriptEditor` — client component with Edit/Preview tabs (default Preview). Edit mode: auto-resizing textarea. Preview: parsed segments with hover regen icon on each section header → calls `/api/generate-script/section` and replaces that segment in-place as chunks arrive. Auto-saves on blur via PATCH. Saved/Saving indicator near title.

- [ ] **Step 2:** `ExtrasPanel` — collapsible right rail. For each present extra key, renders card with content + Copy button + Regenerate button (calls `/api/generate-script/extra`, replaces content on response).

- [ ] **Step 3:** `/scripts/[id]/page.tsx` — server component fetches script with client, asserts workspaceId. Renders header (inline-editable title via blur → PATCH), `<ScriptEditor>`, `<ExtrasPanel>`, sticky bottom action bar.

- [ ] **Step 4:** Commit.

---

## Phase 6 — Dashboard

### Task 6.1: Dashboard page

**Files:**
- Create: `app/(app)/dashboard/page.tsx`, `components/billing/UsageMeter.tsx`

- [ ] **Step 1:** Server component fetches in parallel via `Promise.all`: total script count this period, total client count, last 5 scripts with client (orderBy createdAt desc, take 5), clients list (take 10 for the scroll).

- [ ] **Step 2:** `UsageMeter` — progress bar of `scriptCount / script_limit` for FREE, "Unlimited" text for paid.

- [ ] **Step 3:** Render: `<PageHeader>` with welcome + workspace pill; 3-stat row; Quick Generate CTA card; Recent Scripts list; Clients horizontal scroll with "+ Add" trailing card.

- [ ] **Step 4:** Conditional banner (client island with localStorage dismiss): FREE + `scriptCount >= 2` → upgrade nudge. AGENCY owner + pending invites count > 0 → team nudge.

- [ ] **Step 5:** Commit.

---

## Phase 7 — PDF export

### Task 7.1: PDF document + route

**Files:**
- Create: `lib/pdf.tsx`, `app/api/export/pdf/[id]/route.ts`

- [ ] **Step 1:** `lib/pdf.tsx` — `ScriptPdfDocument({ script, client, workspace })` using `@react-pdf/renderer`:
  - `<Document>` → `<Page size="A4">`
  - Header: Scribtly wordmark (left), workspace name (right)
  - Subheader: client name, platform badge, formatted date, word count, duration
  - Body: map parsed segments — section headers as h2-styled Text, inline tags italic muted, plain text normal, CAPS preserved
  - Footer: page number via render prop
- `renderToBuffer` from `@react-pdf/renderer`.

- [ ] **Step 2:** Route handler: `ensureUser`, load script with client, ownership check, plan gate `canExportPDF`. Render buffer. Return PDF response with attachment Content-Disposition.

- [ ] **Step 3:** Wire Download PDF button in script view → `window.open` to the export URL.

- [ ] **Step 4:** Commit.

---

## Phase 8 — Stripe billing

### Task 8.1: Checkout + portal

**Files:**
- Create: `app/api/stripe/checkout/route.ts`, `app/api/stripe/portal/route.ts`

- [ ] **Step 1:** `/checkout` POST: `ensureUser` → `requireOwner`. Body `{ priceId }`. If no `workspace.stripeCustomerId`, create Stripe customer (email from user.email, metadata.workspaceId) and persist id. Create subscription checkout session with `client_reference_id: workspace.id`, `metadata: { workspaceId }`, success/cancel URLs to `/settings/billing`. Return `{ url }`.

- [ ] **Step 2:** `/portal` POST: `ensureUser` → `requireOwner`. Must have `stripeCustomerId`. Create billing portal session with return_url to `/settings/billing`. Return `{ url }`.

- [ ] **Step 3:** Commit.

### Task 8.2: Stripe webhook

**Files:**
- Create: `app/api/stripe/webhook/route.ts`

- [ ] **Step 1:** Read raw body via `await req.text()`. Verify with `stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)`.

- [ ] **Step 2:** Helper `priceIdToPlan(priceId)` returning Plan from env lookups (`STRIPE_PRO_PRICE_ID`, `STRIPE_AGENCY_PRICE_ID`).

- [ ] **Step 3:** Handlers (all idempotent):
  - `checkout.session.completed` → load expanded subscription; derive plan from first line item price; update workspace by `session.metadata.workspaceId`: `{ plan, stripeSubscriptionId: subscription.id }`. Fire upgrade_confirmation email.
  - `customer.subscription.updated` → re-derive plan from subscription.items.data[0].price.id; update workspace by `stripeSubscriptionId` match.
  - `customer.subscription.deleted` → workspace update by `stripeSubscriptionId` match: `{ plan: "FREE", stripeSubscriptionId: null }`. Eject non-owner members: `prisma.workspaceMember.deleteMany({ where: { workspaceId: ws.id, role: "MEMBER" } })`.

- [ ] **Step 4:** Return 200 always after processing.

- [ ] **Step 5:** Commit.

### Task 8.3: ensureUser orphan handling

**Files:**
- Modify: `lib/ensureUser.ts`

- [ ] **Step 1:** After loading user, if `user.defaultWorkspaceId` exists, verify the user is still a `WorkspaceMember` of that workspace. If not (they were ejected when workspace downgraded from AGENCY): create a fresh personal FREE workspace, membership OWNER, update `user.defaultWorkspaceId`. Proceed as if first-time signup for the workspace-creation path.

- [ ] **Step 2:** Commit.

### Task 8.4: Billing settings page

**Files:**
- Create: `app/(app)/settings/billing/page.tsx`, `components/billing/PlanCard.tsx`

- [ ] **Step 1:** `PlanCard` — takes `{ plan, currentPlan, onUpgrade }`. Renders tier label, price, feature bullets, CTA ("Current plan" disabled, or "Upgrade to X").

- [ ] **Step 2:** Server component fetches workspace. If user is not owner → redirect to `/settings`.

- [ ] **Step 3:** Render: current plan banner + `<UsageMeter>` + "Manage subscription" button (client island → POST `/portal`, window.location). Show success/canceled toast based on `searchParams`.

- [ ] **Step 4:** Grid of `<PlanCard>` for upgrade paths (client island with `onUpgrade` → POST `/checkout` with priceId).

- [ ] **Step 5:** Commit.

---

## Phase 9 — Emails

### Task 9.1: Email templates + send wrappers

**Files:**
- Create: `lib/emails/Welcome.tsx`, `FreeLimitReached.tsx`, `UpgradeConfirmation.tsx`, `InviteEmail.tsx`, `lib/sendEmail.ts`

- [ ] **Step 1:** Each template is a React Email component (uses `@react-email/components`: Html, Head, Body, Container, Heading, Text, Button, Link). Content per spec section 12.

- [ ] **Step 2:** `lib/sendEmail.ts` exports typed wrappers `sendWelcome`, `sendFreeLimitReached`, `sendUpgradeConfirmation`, `sendInvite`. All call `resend.emails.send` with from `hello@scribtly.com`, swallow errors with `console.error`.

- [ ] **Step 3:** Wire triggers:
  - `ensureUser` new-user path → `sendWelcome`
  - `/api/generate-script` on scriptCount 2→3 for FREE → `sendFreeLimitReached`
  - Stripe webhook `checkout.session.completed` → `sendUpgradeConfirmation`
  - `POST /api/workspace/invites` → `sendInvite`

- [ ] **Step 4:** Commit.

---

## Phase 10 — Team / workspace management

### Task 10.1: Workspace + invites + members APIs

**Files:**
- Create: `app/api/workspace/route.ts`, `app/api/workspace/invites/route.ts`, `app/api/workspace/invites/[id]/route.ts`, `app/api/workspace/members/[id]/route.ts`

- [ ] **Step 1:** `GET /api/workspace` → returns current workspace with member list + pending invites (owner only for invites).

- [ ] **Step 2:** `PATCH /api/workspace` → owner only. Body `{ name }`.

- [ ] **Step 3:** `POST /api/workspace/invites` → `ensureUser`, `requireOwner`, `canInviteMembers` (AGENCY only). Body `{ email }`. Compute current seat count: `members.length + pendingInvites.length`. If >= 5, 400 `seat_cap_reached`. If invite exists for email, refresh token + expiresAt. Else create with random token + 7d expiry. Send invite email with accept URL `/invite/<token>`. Return `{ invite }`.

- [ ] **Step 4:** `DELETE /api/workspace/invites/[id]` → owner only. Delete invite.

- [ ] **Step 5:** `DELETE /api/workspace/members/[id]` → owner only. Can't remove self (owner). Delete WorkspaceMember row. On member's next login, `ensureUser` orphan handling kicks in.

- [ ] **Step 6:** Commit.

### Task 10.2: Team settings page + invite landing

**Files:**
- Create: `app/(app)/settings/team/page.tsx`, `app/(app)/invite/[token]/page.tsx`, `components/team/MemberList.tsx`, `InviteForm.tsx`, `PendingInvitesList.tsx`

- [ ] **Step 1:** `/settings/team` server component — AGENCY owner only (redirect otherwise). Fetches members + pending invites. Renders `<MemberList>`, `<InviteForm>`, `<PendingInvitesList>`, seat counter "X of 5 seats used".

- [ ] **Step 2:** `MemberList` — rows with avatar/name/email/role/joined/Remove (confirm dialog). Client island calling DELETE `/api/workspace/members/[id]`.

- [ ] **Step 3:** `InviteForm` — email input + Send. Submits POST `/api/workspace/invites`. Handles 400 seat_cap_reached.

- [ ] **Step 4:** `PendingInvitesList` — rows with email/sent date/expires/Resend/Revoke. Revoke → DELETE; Resend → POST with same email (server returns the refreshed invite).

- [ ] **Step 5:** `/invite/[token]/page.tsx` — server component. If not authed, redirect to signup with redirect_url back. If authed, `ensureUser()` already accepted the invite by email match. Load invite → workspace; render "Welcome to <workspace name>" + "Go to dashboard" button. If invite expired/invalid, show friendly error.

- [ ] **Step 6:** Commit.

### Task 10.3: Account deletion

**Files:**
- Create: `app/api/account/route.ts`
- Modify: `app/(app)/settings/page.tsx`

- [ ] **Step 1:** `DELETE /api/account` → `ensureUser`. Body `{ confirm: "DELETE" }` required. If user is owner of any workspace with active subscription, cancel via `stripe.subscriptions.cancel`. Delete Clerk user via `clerkClient.users.deleteUser(clerkId)`. Delete User row (cascades to owned workspaces; removes memberships from other workspaces).

- [ ] **Step 2:** Settings page Danger Zone — typed "DELETE" confirmation input. On confirm, calls API, signs out, redirects to `/`.

- [ ] **Step 3:** Commit.

---

## Phase 11 — Bulk generation mode

### Task 11.1: Bulk mode UI

**Files:**
- Create: `components/generate/GenerateBulkForm.tsx`, `BulkProgressDrawer.tsx`
- Modify: `app/(app)/generate/page.tsx`

- [ ] **Step 1:** Add Single/Bulk toggle to `GeneratePageClient`. Bulk toggle hidden if not AGENCY.

- [ ] **Step 2:** `GenerateBulkForm` — client selector + array of rows (`{ platform, topic, duration }`), add/remove row buttons (max 10). Shared hookStyle + extras controls below. Submit callback receives the array.

- [ ] **Step 3:** `BulkProgressDrawer` — slide-over from right. Manages parallelism (max 3 concurrent fetches to `/api/generate-script`; queue remaining). Each card: platform badge + topic preview + state (queued/generating/done/error). Click to expand + show streaming text. On card stream done, POST to `/api/scripts` to persist. Footer: "X of Y complete" + "Open library" link.

- [ ] **Step 4:** Commit.

---

## Phase 12 — Marketing site

### Task 12.1: Marketing layout + homepage

**Files:**
- Create: `app/(marketing)/layout.tsx`, `app/(marketing)/page.tsx`, `components/layout/MarketingNav.tsx`, `MarketingFooter.tsx`

- [ ] **Step 1:** `MarketingNav` — logo (left), nav links (Pricing), Login link, "Start free" button → `/signup`.

- [ ] **Step 2:** `MarketingFooter` — links + copyright.

- [ ] **Step 3:** Marketing layout wraps children with nav + footer.

- [ ] **Step 4:** Homepage (`/`): render every section from spec `pages.homepage` — hero, social proof, problem, solution (4 features), demo placeholder, pricing teaser, final CTA.

- [ ] **Step 5:** Add Metadata export for SEO + OpenGraph.

- [ ] **Step 6:** Commit.

### Task 12.2: Pricing + SEO landings

**Files:**
- Create: `app/(marketing)/pricing/page.tsx`, `app/(marketing)/youtube-scripts/page.tsx`, `app/(marketing)/tiktok-scripts/page.tsx`

- [ ] **Step 1:** `/pricing` — three plan cards (FREE/PRO/AGENCY) with prices, features, CTA. FAQ accordion per spec.

- [ ] **Step 2:** `/youtube-scripts` — platform-focused landing: hero, 3-step "how it works", example script snippet, testimonial placeholders, CTA to signup. Tailored Metadata.

- [ ] **Step 3:** `/tiktok-scripts` — same structure, TikTok copy.

- [ ] **Step 4:** Commit.

---

## Phase 13 — Polish + deploy

### Task 13.1: Loading / error / empty states

- [ ] **Step 1:** Add `app/(app)/**/loading.tsx` skeletons for dashboard, scripts, clients, script-view.

- [ ] **Step 2:** Add `error.tsx` boundary at route-group level showing friendly message + retry.

- [ ] **Step 3:** Verify empty states on /scripts and /clients and dashboard.

- [ ] **Step 4:** Commit.

### Task 13.2: Validation pass

- [ ] **Step 1:** Manually walk the validation checklist from spec section 18. Use `npx prisma studio` to inspect data state (when DB credentials are wired).

- [ ] **Step 2:** Run `npm run build` — fix any type errors.

- [ ] **Step 3:** Run `npm run test` — all green.

- [ ] **Step 4:** Commit.

### Task 13.3: Deploy docs

- [ ] **Step 1:** Flesh out README with: Clerk setup (instance, webhook URL, signing secret), Supabase setup (connection strings, run `npx prisma db push`), Stripe setup (product IDs, webhook endpoint URL, signing secret), Resend setup (verified domain `scribtly.com`), env var list, Vercel deploy steps.

- [ ] **Step 2:** Commit.

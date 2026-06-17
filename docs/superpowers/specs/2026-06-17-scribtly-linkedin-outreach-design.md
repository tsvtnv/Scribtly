# Scribtly — LinkedIn Outreach Platform Design

**Date:** 2026-06-17  
**Owner:** Kristiyan Tsvetanov (kristiyan@octelis.com)  
**Domain:** scribtly.com  
**Deployed on:** Coolify (self-hosted)

---

## 1. Overview

Scribtly is a LinkedIn outreach automation platform that generates meetings. It replaces the old Scribtly script SaaS entirely — fresh codebase, fresh DB schema. Primary user is Kristiyan. Multi-tenant architecture is included from day one (workspace slugs, shared-domain cookies) but subdomain-per-workspace routing is deferred until needed. Additional users are onboarded manually via a booked call at `book.octelis.com`.

The UI follows the Talisman design language — clean sans-serif, minimal chrome, stats cards, left sidebar nav — using the Octelis brand token set below. All pages include a "Powered by Octelis" footer link. The UI is fully mobile-optimised.

---

## 2. Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#FFFFFF` | App canvas — true white, lets UI breathe |
| `--bg-subtle` | `#F7F3EE` | Sidebar, cards, inputs — warm cream |
| `--text-primary` | `#0F0F12` | Headings, body text |
| `--text-muted` | `#6B6560` | Labels, placeholders, secondary text |
| `--accent` | `#E07830` | CTAs, active states, badges, links |
| `--accent-hover` | `#C4652A` | Hover on orange elements |
| `--border` | `#E8E2D9` | Dividers, input borders, card borders |
| `--dark` | `#1A1A1A` | Footer, dark surfaces |

**Principle:** White (`#FFFFFF`) is the true base — panels and cards breathe on it. Cream (`#F7F3EE`) is the secondary surface for sidebars, input backgrounds, and subtle card fills. Orange (`#E07830`) is the single action colour across all Octelis products — users who visit octelis.com and then use Scribtly feel the same brand immediately.

**"Powered by Octelis"** — every page footer includes a small `Powered by octelis.com` link in `--text-muted`, linking to `https://octelis.com`.

---

## 3. Subdomains

| Subdomain | Purpose |
|---|---|
| `scribtly.com` | Marketing homepage (single page, book a call CTA) |
| `app.scribtly.com` | Full platform — auth, dashboard, campaigns, inbox |
| `connect.scribtly.com` | LinkedIn connection flows (Unipile OAuth callbacks, reconnect) |

**DNS:** Cloudflare manages `*.scribtly.com` wildcard. All subdomains proxied (orange cloud). SSL handled at Cloudflare edge — Coolify/Traefik does not need to manage certs.

**Traefik rules (Coolify):**
- `scribtly.com` → Next.js app (`/(marketing)` routes)
- `app.scribtly.com` → Next.js app (`/(app)` routes)
- `connect.scribtly.com` → Next.js app (`/connect` routes)

**Session cookies** are set on `.scribtly.com` (dot-prefixed) so a single auth session is valid across all subdomains.

**Future:** When workspace subdomains are enabled, `[slug].scribtly.com` will be added. The `Workspace.slug` field is in the schema from day one. Middleware will be extended then — no structural changes needed.

---

## 3. Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 App Router | Known stack, full-stack in one repo |
| Language | TypeScript | Type safety across app + worker |
| ORM | Prisma | Known from old Scribtly, good migration tooling |
| Database | PostgreSQL | Existing managed instance (wipe old schema) |
| Auth | Lucia v3 | Lightweight session auth, cookie on `.scribtly.com` |
| LinkedIn API | Unipile SDK | Handles LinkedIn sessions via residential proxy |
| UI | Tailwind CSS + shadcn/ui | Clean, fast to build, matches Talisman aesthetic |
| Background jobs | Standalone Node.js worker | Loops every 2 min, reads/writes Postgres directly |
| Deployment | Coolify (Docker) | Two services: `app` + `worker` |

---

## 4. Database Schema

```prisma
model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String?
  avatarUrl    String?
  workspaceId  String
  workspace    Workspace @relation(fields: [workspaceId], references: [id])
  createdAt    DateTime  @default(now())
  sessions     Session[]
}

model Session {
  id        String   @id
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
}

model Workspace {
  id                  String   @id @default(cuid())
  slug                String   @unique
  name                String
  logoUrl             String?
  allowDuplicateLeads Boolean  @default(true)
  skipLowIcpLeads     Boolean  @default(false)
  createdAt           DateTime @default(now())

  users            User[]
  linkedInAccounts LinkedInAccount[]
  campaigns        Campaign[]
  leads            Lead[]
  conversations    Conversation[]
  automationLogs   AutomationLog[]
  events           Event[]
}

enum LinkedInAccountStatus {
  ACTIVE
  DISCONNECTED
  RECONNECTING
}

model LinkedInAccount {
  id                String                @id @default(cuid())
  workspaceId       String
  workspace         Workspace             @relation(fields: [workspaceId], references: [id])
  unipileAccountId  String                @unique
  name              String
  avatarUrl         String?
  headline          String?
  status            LinkedInAccountStatus @default(ACTIVE)
  dailyConnLimit    Int                   @default(25)
  dailyMsgLimit     Int                   @default(50)
  connSentToday     Int                   @default(0)
  msgSentToday      Int                   @default(0)
  limitsResetAt     DateTime
  lastSyncAt        DateTime?
  createdAt         DateTime              @default(now())

  campaigns Campaign[]
}

enum CampaignStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
}

enum CampaignType {
  CONNECT_NOTE
  CONNECT
  FIRST_DEGREE
}

model Campaign {
  id                    String         @id @default(cuid())
  workspaceId           String
  workspace             Workspace      @relation(fields: [workspaceId], references: [id])
  linkedInAccountId     String
  linkedInAccount       LinkedInAccount @relation(fields: [linkedInAccountId], references: [id])
  name                  String
  status                CampaignStatus @default(DRAFT)
  type                  CampaignType   @default(CONNECT_NOTE)
  positioningText       String?
  connectionNoteTemplate String?
  requireApproval       Boolean        @default(true)
  followUpsEnabled      Boolean        @default(false)
  followUpCount         Int            @default(1)
  followUpDelayDays     Int            @default(3)
  followUpTemplate      String?
  autoBookEnabled       Boolean        @default(false)
  autoBookCtaLink       String?
  autoBookReplyTemplate String?
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt

  leads    Lead[]
  messages Message[]
  events   Event[]

  @@index([workspaceId, status])
}

enum LeadStatus {
  NEW
  ENRICHED
  QUEUED
  PENDING_APPROVAL
  CONTACTED
  ACCEPTED
  REPLIED
  SKIPPED
  BOUNCED
}

model Lead {
  id                String     @id @default(cuid())
  workspaceId       String
  workspace         Workspace  @relation(fields: [workspaceId], references: [id])
  campaignId        String
  campaign          Campaign   @relation(fields: [campaignId], references: [id])
  linkedInProfileId String
  name              String
  headline          String?
  company           String?
  location          String?
  avatarUrl         String?
  profileUrl        String
  icpScore          Int?
  status            LeadStatus @default(NEW)
  contactedAt       DateTime?
  acceptedAt        DateTime?
  repliedAt         DateTime?
  enrichedAt        DateTime?
  createdAt         DateTime   @default(now())

  messages     Message[]
  conversation Conversation?
  events       Event[]

  @@unique([campaignId, linkedInProfileId])
  @@index([campaignId, status])
  @@index([workspaceId])
}

enum MessageType {
  CONNECTION_NOTE
  FOLLOWUP
  AUTOBOOK
}

enum MessageStatus {
  PENDING_APPROVAL
  APPROVED
  SENT
  FAILED
}

model Message {
  id              String        @id @default(cuid())
  leadId          String
  lead            Lead          @relation(fields: [leadId], references: [id])
  campaignId      String
  campaign        Campaign      @relation(fields: [campaignId], references: [id])
  type            MessageType
  content         String
  status          MessageStatus @default(PENDING_APPROVAL)
  unipileMessageId String?
  sentAt          DateTime?
  createdAt       DateTime      @default(now())

  @@index([campaignId, status])
  @@index([leadId])
}

model Conversation {
  id                  String   @id @default(cuid())
  workspaceId         String
  workspace           Workspace @relation(fields: [workspaceId], references: [id])
  leadId              String   @unique
  lead                Lead     @relation(fields: [leadId], references: [id])
  unipileThreadId     String   @unique
  lastMessageAt       DateTime?
  lastMessagePreview  String?
  hasUnread           Boolean  @default(false)
  createdAt           DateTime @default(now())

  messages ConversationMessage[]
}

enum MessageDirection {
  INBOUND
  OUTBOUND
}

model ConversationMessage {
  id               String           @id @default(cuid())
  conversationId   String
  conversation     Conversation     @relation(fields: [conversationId], references: [id])
  content          String
  direction        MessageDirection
  sentAt           DateTime
  unipileMessageId String           @unique
  createdAt        DateTime         @default(now())

  @@index([conversationId, sentAt])
}

enum AutomationTaskType {
  ENRICH_LEAD
  SCORE_LEAD
  SEND_MESSAGE
  SYNC_INBOX
  RESET_DAILY_LIMITS
}

enum AutomationTaskStatus {
  EXECUTING
  COMPLETED
  FAILED
}

model AutomationLog {
  id          String               @id @default(cuid())
  workspaceId String
  workspace   Workspace            @relation(fields: [workspaceId], references: [id])
  taskType    AutomationTaskType
  status      AutomationTaskStatus
  result      String?
  metadata    Json?
  startedAt   DateTime             @default(now())
  completedAt DateTime?

  @@index([workspaceId, startedAt])
}

model Event {
  id          String    @id @default(cuid())
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  campaignId  String?
  campaign    Campaign? @relation(fields: [campaignId], references: [id])
  leadId      String?
  lead        Lead?     @relation(fields: [leadId], references: [id])
  type        String
  metadata    Json?
  createdAt   DateTime  @default(now())

  @@index([workspaceId, createdAt])
  @@index([campaignId, createdAt])
}
```

---

## 5. App Route Structure

```
app/
├── (marketing)/              # scribtly.com
│   └── page.tsx              # Landing page with book a call CTA
│
├── (auth)/                   # app.scribtly.com - unauthenticated
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── layout.tsx
│
├── (app)/                    # app.scribtly.com - authenticated
│   ├── layout.tsx            # Sidebar nav + workspace context
│   ├── dashboard/page.tsx    # Stats, activity chart, campaign performance
│   ├── campaigns/
│   │   ├── page.tsx          # Campaign list
│   │   ├── new/page.tsx      # 5-step wizard
│   │   └── [id]/
│   │       ├── page.tsx      # Redirect to overview
│   │       ├── overview/page.tsx
│   │       ├── leads/page.tsx
│   │       ├── approvals/page.tsx
│   │       └── activity/page.tsx
│   ├── inbox/page.tsx        # Unified inbox
│   ├── accounts/page.tsx     # LinkedIn accounts
│   ├── automation/page.tsx   # Automation task log
│   └── settings/page.tsx     # Profile, org, members
│
├── connect/                  # connect.scribtly.com
│   ├── linkedin/page.tsx     # Connect LinkedIn account form
│   └── callback/page.tsx     # Unipile OAuth callback handler
│
└── api/
    ├── auth/[...lucia]/      # Login, logout, signup
    ├── campaigns/            # CRUD
    ├── leads/                # Import, status updates
    ├── messages/             # Approve, reject
    ├── inbox/                # Fetch conversations
    ├── accounts/             # LinkedIn account management
    ├── prospecting/          # Unipile people search
    │   ├── preview/          # Preview 15 profiles
    │   └── import/           # Import N leads
    └── worker/
        └── tick/route.ts     # Internal endpoint called by worker (protected by secret)
```

---

## 6. New Campaign Wizard (5 Steps)

1. **Campaign name** — text input
2. **LinkedIn account** — pick from connected accounts
3. **Campaign type** — Connect + Note / Connect only / 1st-Degree DM (radio cards)
4. **Positioning** — textarea "describe your business" — stored as `positioningText` on the campaign
5. **Outreach flow** — split panel:
   - Left: step list (Connection Request, Follow-ups, Auto Book)
   - Right: config panel for selected step
     - Connection note template with `{{name}}` `{{company}}` `{{headline}}` `{{city}}` `{{country}}` variables
     - Require approval toggle
     - Follow-ups: enable toggle, count stepper, delay dropdown, message template
     - Auto Book: enable toggle, CTA link input, reply template

On completion → campaign saved as `DRAFT`. User lands on campaign overview.

---

## 7. Smart Prospecting Flow

1. User opens **Leads** tab on a campaign
2. Clicks **Smart Prospecting**
3. Modal opens with:
   - Natural language input: "Describe who you want to reach" (e.g. *"Directors at UK plumbing companies 5-30 employees"*)
   - OR structured filters: job title keywords, location, company size range, industry
   - **Preview 15 profiles** button
4. Calls `POST /api/prospecting/preview` → Unipile people search API → returns 15 LinkedIn profiles
5. Shows profile cards (avatar, name, headline, company, location) with LinkedIn link
6. User clicks **Import** → selects quantity (50 / 100 / 200 / 500) → calls `POST /api/prospecting/import`
7. Leads saved to DB with status `NEW`
8. Worker picks them up → enriches (full profile data) → scores (AI ICP match 0–100) → status becomes `ENRICHED` → `QUEUED`

---

## 8. Worker Pipeline

The worker runs as a separate Docker container (`worker/index.ts`). It loops every 2 minutes.

**Each tick:**

```
1. RESET_DAILY_LIMITS
   - If it's past midnight, reset connSentToday / msgSentToday on all LinkedInAccounts

2. ENRICH_LEAD (batch)
   - Find leads with status = NEW (up to 10 per tick)
   - Call Unipile profile fetch for each
   - Update lead with full profile data → status = ENRICHED
   - Log to AutomationLog

3. SCORE_LEAD (batch)
   - Find leads with status = ENRICHED
   - Call Claude API (claude-haiku-4-5-20251001) with campaign positioningText + lead profile
   - Score 0–100 based on ICP match
   - Update icpScore → status = QUEUED
   - Log to AutomationLog

4. SEND_MESSAGE (batch)
   - Find active campaigns where LinkedInAccount has capacity (connSentToday < dailyConnLimit)
   - Find QUEUED leads for those campaigns (highest icpScore first)
   - Generate personalised message (fill template variables from lead profile)
   - If requireApproval = true → create Message(PENDING_APPROVAL), update lead status = PENDING_APPROVAL
   - If requireApproval = false → call Unipile send connection request API → create Message(SENT), update lead = CONTACTED, increment connSentToday
   - Log to AutomationLog, create Event

5. FOLLOWUP_CHECK
   - Find leads where status = ACCEPTED and acceptedAt < (now - followUpDelayDays)
   - And no follow-up message sent yet for this lead
   - Queue follow-up message (same approval gate as above)

6. SYNC_INBOX
   - For each LinkedInAccount, call Unipile inbox API
   - Upsert Conversation + ConversationMessage records
   - If new inbound message → mark hasUnread = true, update lastMessageAt / preview
   - If autoBookEnabled and message matches "interested" intent (Claude API, claude-haiku-4-5-20251001) → queue auto-book reply
   - Log to AutomationLog
```

Worker is protected: `POST /api/worker/tick` requires `Authorization: Bearer WORKER_SECRET` header. Worker calls this endpoint. The Next.js API route does the actual work so Prisma client is shared.

---

## 9. Page Designs

### Dashboard
- Top stats row: Total Leads / Messages Sent / Replies / Response Rate (4 cards)
- Line chart: Sent vs Replies (last 30 days)
- Campaign performance table: name, leads, contacted, accepted, replied
- Recent activity feed: last 10 events

### Campaigns List
- Search input + status filter
- Campaign cards: name, LinkedIn account, status dot, leads / contacted / accepted / replied stats, date, pause/edit/delete actions

### Campaign Overview
- Left panel: type, account, created, status, leads/contacted/accepted/replied, today's sends (X/25), lead score distribution bar
- Centre: Activity feed
- Right panel: Campaign Settings quick links (Approval, Follow-ups, Auto Book) + AI assistant chat (asks about this campaign)

### Campaign Leads
- Table: checkbox, avatar, name, location, title, ICP score badge
- Source buttons: Smart Prospecting / Upload CSV (later)
- Bulk actions: delete selected

### Campaign Approvals
- List of pending messages: lead card + message preview + Approve / Edit / Skip buttons

### Campaign Activity
- Calendar (left) + event summary for selected day (right): Outreach events (connections sent), Pipeline events (scored, enriched, drafted), Lifecycle events

### Inbox
- Left: conversation list (avatar, name, company, last message preview, timestamp, status badge)
- Filter tabs: Inbox / Approvals / All campaigns dropdown
- Right: conversation thread + lead profile card (name, company, ICP score, campaign name)

### Accounts (LinkedIn Accounts)
- Account cards: avatar, name, LinkedIn tier (Premium/Free), status dot, active campaign name, today's usage (5/25 conn, 0/50 msg)
- "Connect LinkedIn" button → navigates to `connect.scribtly.com/linkedin`

### connect.scribtly.com/linkedin
- Simple form: LinkedIn email + password
- Calls Unipile `POST /accounts` to create session
- On success → redirects back to `app.scribtly.com/accounts`
- Shows reconnect flow if account is DISCONNECTED

### Automation Log
- Table: task type badge, status badge (EXECUTING/COMPLETED/FAILED), result, started at
- Filter by task type / status

### Settings
- Profile: name, email, avatar upload
- Organisation: name, logo upload, allow duplicate leads toggle, skip low ICP leads toggle
- Members: invite by email (for future multi-user use)

---

## 10. Auth Flow

- `app.scribtly.com/signup` — email + password → creates User + Workspace (slug = slugified name)
- `app.scribtly.com/login` — email + password → creates Lucia session
- Cookie set on `.scribtly.com` domain, HttpOnly, Secure
- Middleware protects all `/(app)` routes — redirects unauthenticated to `/login`
- `connect.scribtly.com` also checks the session cookie (same domain) — must be logged in to connect an account

---

## 11. Environment Variables

```env
DATABASE_URL=
DIRECT_URL=
UNIPILE_DSN=
UNIPILE_API_TOKEN=
WORKER_SECRET=
CLAUDE_API_KEY=
NEXT_PUBLIC_APP_URL=https://app.scribtly.com
NEXT_PUBLIC_CONNECT_URL=https://connect.scribtly.com
```

---

## 12. Docker Setup (Coolify)

**`app` service:** `Dockerfile` — `next build` + `next start` on port 3000  
**`worker` service:** `worker/Dockerfile` — `npx tsx worker/index.ts` (or compiled JS)  
Both services share the same PostgreSQL connection string via environment variables.

---

## 13. Out of Scope (V1)

- Admin panel
- Billing / Stripe
- Slack / Discord notifications
- CSV lead import
- Sales Navigator integration
- Workspace subdomain routing (`slug.scribtly.com`)
- Google OAuth
- Post engagers / Profile viewers lead sources

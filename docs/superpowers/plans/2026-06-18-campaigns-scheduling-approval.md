# Campaigns: Scheduling, Approval Queue & LinkedIn Account Config — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace instant message sends with a scheduled-send system: messages get a `scheduledFor` timestamp and the cron worker dispatches them when the time arrives; the accounts page exposes per-account timezone/window/interval config; the approvals UI gains bulk-approve with ICP score filtering.

**Architecture:** Add 5 scheduling fields to `LinkedInAccount` and `scheduledFor` to `Message`. A pure `computeNextSlot()` utility calculates the next send slot from the account's window config. The worker tick gains a Step 0 that dispatches all `APPROVED` messages whose `scheduledFor <= now`; Step 4 now creates `APPROVED` (scheduled) messages instead of sending directly. The approve route schedules instead of sending immediately.

**Tech Stack:** Next.js 16, Prisma 7, PostgreSQL, TypeScript, `date-fns` v4 (for `TZDate` from `date-fns/tz`), Unipile API via `lib/unipile.ts`, Lucide icons, Tailwind / CSS variables.

## Global Constraints

- `APPROVED` status already exists in `MessageStatus` enum — do NOT add it again.
- Never change `MESSAGE_STATUS.SENT` or `FAILED` semantics.
- All DB queries must scope by `workspaceId` for multi-tenant safety.
- Prisma client is at `@/lib/prisma` (default export `prisma`).
- Auth via `validateRequest()` from `@/lib/auth`.
- CSS design tokens: `var(--accent)`, `var(--bg-base)`, `var(--bg-subtle)`, `var(--border)`, `var(--text-primary)`, `var(--text-muted)` — use these, not hard-coded colours (except status/error red `#ef4444`).
- No test framework exists — verify each task manually with the dev server (`npm run dev`) and describe curl/browser checks.

---

### Task 1: Schema Migration — Add Scheduling Fields

**Files:**
- Modify: `prisma/schema.prisma`
- Run: Prisma migration

**Interfaces:**
- Produces: `LinkedInAccount.timezone`, `sendWindowStart`, `sendWindowEnd`, `sendIntervalMinutes`, `sendJitterMinutes` (all used by Tasks 2–9)
- Produces: `Message.scheduledFor` (used by Tasks 5–9)

- [ ] **Step 1: Add fields to `LinkedInAccount` in schema.prisma**

Open `prisma/schema.prisma`. Inside the `model LinkedInAccount` block, after the `lastSyncAt` line, add:

```prisma
  timezone             String  @default("Europe/London")
  sendWindowStart      Int     @default(9)
  sendWindowEnd        Int     @default(17)
  sendIntervalMinutes  Int     @default(10)
  sendJitterMinutes    Int     @default(5)
```

- [ ] **Step 2: Add `scheduledFor` to `Message` in schema.prisma**

Inside `model Message`, after `status MessageStatus @default(PENDING_APPROVAL)`, add:

```prisma
  scheduledFor     DateTime?
```

- [ ] **Step 3: Run migration**

```bash
npx prisma migrate dev --name add_scheduling_fields
```

Expected output: `Your database is now in sync with your schema.`

- [ ] **Step 4: Regenerate Prisma client**

```bash
npx prisma generate
```

Expected output: `Generated Prisma Client`.

- [ ] **Step 5: Verify schema compiled**

```bash
npx prisma validate
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat: add scheduling fields to LinkedInAccount and scheduledFor to Message"
```

---

### Task 2: Scheduler Utility — `lib/scheduler.ts`

**Files:**
- Create: `lib/scheduler.ts`

**Interfaces:**
- Consumes: `LinkedInAccount` fields: `timezone: string`, `sendWindowStart: number`, `sendWindowEnd: number`, `sendIntervalMinutes: number`, `sendJitterMinutes: number`
- Produces: `computeNextSlot(config: AccountScheduleConfig, referenceTime?: Date): Date` — returns a UTC `Date` for when the next message should send.

- [ ] **Step 1: Create `lib/scheduler.ts`**

```typescript
import { TZDate } from "date-fns/tz";
import { addMinutes, addDays, setHours, setMinutes, setSeconds, setMilliseconds } from "date-fns";

export interface AccountScheduleConfig {
  timezone: string;
  sendWindowStart: number; // hour 0-23, inclusive
  sendWindowEnd: number;   // hour 0-23, exclusive
  sendIntervalMinutes: number;
  sendJitterMinutes: number;
}

/**
 * Returns the next UTC Date when a message should be sent for the given account.
 *
 * Pass `referenceTime` as the previously computed slot when scheduling multiple
 * messages in sequence — this spaces them correctly rather than all landing
 * at the same time.
 */
export function computeNextSlot(
  config: AccountScheduleConfig,
  referenceTime: Date = new Date()
): Date {
  const { timezone, sendWindowStart, sendWindowEnd, sendIntervalMinutes, sendJitterMinutes } = config;

  // Represent referenceTime in the account's local timezone.
  const local = new TZDate(referenceTime, timezone);
  const localHour = local.getHours();

  let candidate: TZDate;

  if (localHour < sendWindowStart) {
    // Before window: schedule at window open today
    candidate = setMilliseconds(
      setSeconds(setMinutes(setHours(local, sendWindowStart), 0), 0),
      0
    ) as TZDate;
  } else if (localHour >= sendWindowEnd) {
    // Past window: schedule at window open tomorrow
    const tomorrow = addDays(local, 1);
    candidate = setMilliseconds(
      setSeconds(setMinutes(setHours(tomorrow, sendWindowStart), 0), 0),
      0
    ) as TZDate;
  } else {
    // Within window: reference + interval + random jitter
    const jitter = Math.floor(Math.random() * (sendJitterMinutes + 1));
    const advanced = addMinutes(local, sendIntervalMinutes + jitter);
    const advancedHour = (advanced as TZDate).getHours
      ? (advanced as TZDate).getHours()
      : new TZDate(advanced, timezone).getHours();

    if (advancedHour >= sendWindowEnd) {
      // Overshot end of window — push to tomorrow's opening
      const tomorrow = addDays(local, 1);
      candidate = setMilliseconds(
        setSeconds(setMinutes(setHours(tomorrow, sendWindowStart), 0), 0),
        0
      ) as TZDate;
    } else {
      candidate = advanced as TZDate;
    }
  }

  // TZDate extends Date, so getTime() returns UTC milliseconds.
  return new Date(candidate.getTime());
}
```

- [ ] **Step 2: Smoke-test manually in a scratch script**

Create `scripts/test-scheduler.ts` temporarily:

```typescript
import { computeNextSlot } from "../lib/scheduler";

const cfg = {
  timezone: "Europe/London",
  sendWindowStart: 9,
  sendWindowEnd: 17,
  sendIntervalMinutes: 10,
  sendJitterMinutes: 5,
};

// Simulate: 8 AM → should give 9 AM
const before = new Date("2026-06-18T07:00:00Z"); // 8am BST
console.log("before window →", computeNextSlot(cfg, before).toISOString());
// Expected: 2026-06-18T08:00:00.000Z (9am BST = 8am UTC in summer)

// Simulate: 10 AM → should give ~10:10-10:15 AM
const mid = new Date("2026-06-18T09:00:00Z"); // 10am BST
console.log("mid window →", computeNextSlot(cfg, mid).toISOString());

// Simulate: 5 PM → should give tomorrow 9 AM
const after = new Date("2026-06-18T16:30:00Z"); // 5:30pm BST
console.log("after window →", computeNextSlot(cfg, after).toISOString());
// Expected: 2026-06-19T08:00:00.000Z (9am BST next day)
```

Run: `npx tsx scripts/test-scheduler.ts`

Expected: three timestamps matching the comments above. Delete the script after verifying.

- [ ] **Step 3: Commit**

```bash
git add lib/scheduler.ts
git commit -m "feat: add computeNextSlot scheduling utility"
```

---

### Task 3: Account Sync — Auto-Set Limits by Tier

**Files:**
- Modify: `app/api/accounts/sync/route.ts`

**Interfaces:**
- Consumes: `profile?.premium: boolean` (already in sync payload)
- Produces: On create, `dailyConnLimit` and `dailyMsgLimit` are auto-set based on tier. On update, limits are refreshed only when `premium` status changes.

Safe limits by tier:
- **Free:** `dailyConnLimit = 15`, `dailyMsgLimit = 50`
- **Premium:** `dailyConnLimit = 50`, `dailyMsgLimit = 150`

- [ ] **Step 1: Add `tierLimits` helper and update sync logic**

Replace the full content of `app/api/accounts/sync/route.ts` with:

```typescript
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

function unipileStatusToDb(sources: Array<{ status: string }>): "ACTIVE" | "DISCONNECTED" {
  const mainSource = sources[0];
  if (!mainSource) return "DISCONNECTED";
  return mainSource.status === "OK" ? "ACTIVE" : "DISCONNECTED";
}

function tierLimits(premium: boolean) {
  return premium
    ? { dailyConnLimit: 50, dailyMsgLimit: 150 }
    : { dailyConnLimit: 15, dailyMsgLimit: 50 };
}

export async function POST() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const unipileAccounts = await unipile.listAccounts();
  const existing = await prisma.linkedInAccount.findMany({
    where: { workspaceId: user.workspaceId },
  });
  const existingByUnipileId = new Map(existing.map((a) => [a.unipileAccountId, a]));

  const added: string[] = [];
  const updated: string[] = [];

  for (const ua of unipileAccounts.items) {
    const [profileResult, pictureResult] = await Promise.allSettled([
      unipile.getAccountProfile(ua.id),
      unipile.getAccountPicture(ua.id, ua.name),
    ]);

    const profile = profileResult.status === "fulfilled" ? profileResult.value : null;
    const avatarUrl = pictureResult.status === "fulfilled" ? pictureResult.value : null;

    const name = profile ? `${profile.first_name} ${profile.last_name}`.trim() : ua.name;
    const dbStatus = unipileStatusToDb(ua.sources);
    const proxyCountry = ua.connection_params?.im?.proxy?.country ?? null;
    const linkedinPublicId = ua.connection_params?.im?.publicIdentifier ?? null;
    const isPremium = profile?.premium ?? false;

    if (existingByUnipileId.has(ua.id)) {
      const existingRecord = existingByUnipileId.get(ua.id)!;
      const premiumChanged = existingRecord.premium !== isPremium;

      await prisma.linkedInAccount.update({
        where: { id: existingRecord.id },
        data: {
          name,
          avatarUrl: avatarUrl ?? existingRecord.avatarUrl,
          headline: profile?.occupation && profile.occupation !== "--" ? profile.occupation : existingRecord.headline,
          email: profile?.email ?? existingRecord.email,
          location: profile?.location ?? existingRecord.location,
          linkedinPublicId: linkedinPublicId ?? existingRecord.linkedinPublicId,
          premium: isPremium,
          proxyCountry: proxyCountry ?? existingRecord.proxyCountry,
          status: dbStatus,
          lastSyncAt: new Date(),
          // Only auto-reset limits if the premium tier changed
          ...(premiumChanged ? tierLimits(isPremium) : {}),
        },
      });
      updated.push(ua.id);
    } else {
      await prisma.linkedInAccount.create({
        data: {
          workspaceId: user.workspaceId,
          unipileAccountId: ua.id,
          name,
          avatarUrl: avatarUrl ?? null,
          headline: profile?.occupation && profile.occupation !== "--" ? profile.occupation : null,
          email: profile?.email ?? null,
          location: profile?.location ?? null,
          linkedinPublicId: linkedinPublicId ?? null,
          premium: isPremium,
          proxyCountry: proxyCountry ?? null,
          status: dbStatus,
          limitsResetAt: new Date(),
          lastSyncAt: new Date(),
          ...tierLimits(isPremium),
        },
      });
      added.push(ua.id);
    }
  }

  return NextResponse.json({ synced: added.length + updated.length, added, updated });
}
```

- [ ] **Step 2: Verify manually**

Start dev server. Go to `/accounts`, click Sync. Check that new accounts get 15/50 (free) or 50/150 (premium) limits. TypeScript should compile with no errors: `npx tsc --noEmit`.

- [ ] **Step 3: Commit**

```bash
git add app/api/accounts/sync/route.ts
git commit -m "feat: auto-set daily limits from premium tier on account sync"
```

---

### Task 4: Account PATCH — Accept Scheduling Fields

**Files:**
- Modify: `app/api/accounts/[id]/route.ts`

**Interfaces:**
- Consumes: PATCH body fields: `dailyConnLimit`, `dailyMsgLimit`, `timezone`, `sendWindowStart`, `sendWindowEnd`, `sendIntervalMinutes`, `sendJitterMinutes`
- Produces: Updated `LinkedInAccount` record returned as JSON

- [ ] **Step 1: Replace `app/api/accounts/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { unipile } from "@/lib/unipile";

// Free/premium slider caps to prevent account risk
const CONN_MAX = { free: 25, premium: 80 };
const MSG_MAX  = { free: 75, premium: 200 };

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const account = await prisma.linkedInAccount.findFirst({
    where: { id, workspaceId: user.workspaceId },
  });
  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const tier = account.premium ? "premium" : "free";
  const updates: Record<string, number | string> = {};

  if (typeof body.dailyConnLimit === "number") {
    updates.dailyConnLimit = Math.min(CONN_MAX[tier], Math.max(1, Math.round(body.dailyConnLimit)));
  }
  if (typeof body.dailyMsgLimit === "number") {
    updates.dailyMsgLimit = Math.min(MSG_MAX[tier], Math.max(1, Math.round(body.dailyMsgLimit)));
  }
  if (typeof body.timezone === "string" && body.timezone.length > 0) {
    // Validate it's a real IANA zone
    try {
      Intl.DateTimeFormat(undefined, { timeZone: body.timezone });
      updates.timezone = body.timezone;
    } catch {
      return NextResponse.json({ error: "Invalid timezone" }, { status: 400 });
    }
  }
  if (typeof body.sendWindowStart === "number") {
    updates.sendWindowStart = Math.min(22, Math.max(0, Math.round(body.sendWindowStart)));
  }
  if (typeof body.sendWindowEnd === "number") {
    updates.sendWindowEnd = Math.min(23, Math.max(1, Math.round(body.sendWindowEnd)));
  }
  if (typeof body.sendIntervalMinutes === "number") {
    updates.sendIntervalMinutes = Math.min(120, Math.max(5, Math.round(body.sendIntervalMinutes)));
  }
  if (typeof body.sendJitterMinutes === "number") {
    updates.sendJitterMinutes = Math.min(30, Math.max(0, Math.round(body.sendJitterMinutes)));
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields" }, { status: 400 });
  }

  const updated = await prisma.linkedInAccount.update({ where: { id }, data: updates });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const account = await prisma.linkedInAccount.findFirst({
    where: { id, workspaceId: user.workspaceId },
  });
  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await unipile.deleteAccount(account.unipileAccountId);
  } catch {
    // continue even if Unipile fails
  }

  await prisma.linkedInAccount.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Verify**

`npx tsc --noEmit` — no errors. Test PATCH via curl or browser dev tools: send `{ "timezone": "America/New_York" }` to `/api/accounts/<id>` — should return updated record.

- [ ] **Step 3: Commit**

```bash
git add app/api/accounts/[id]/route.ts
git commit -m "feat: extend account PATCH to accept scheduling fields"
```

---

### Task 5: Accounts Page — Scheduling Settings Panel + Premium Banner

**Files:**
- Modify: `app/(app)/accounts/page.tsx`

**Interfaces:**
- Consumes: `PATCH /api/accounts/[id]` (Task 4) — new scheduling fields
- Produces: Settings panel now includes timezone, window, interval, jitter inputs + premium tier banner

The `Account` interface, `SettingsState`, and the `openSettings`/`saveSettings` handlers all need updating. The settings panel markup is extended with a new "Scheduling" section below the existing "Daily limits" section.

- [ ] **Step 1: Update `Account` interface**

In `app/(app)/accounts/page.tsx`, replace the `Account` interface:

```typescript
interface Account {
  id: string;
  name: string;
  avatarUrl: string | null;
  headline: string | null;
  email: string | null;
  location: string | null;
  linkedinPublicId: string | null;
  premium: boolean;
  proxyCountry: string | null;
  status: string;
  connSentToday: number;
  dailyConnLimit: number;
  msgSentToday: number;
  dailyMsgLimit: number;
  timezone: string;
  sendWindowStart: number;
  sendWindowEnd: number;
  sendIntervalMinutes: number;
  sendJitterMinutes: number;
  lastSyncAt: string | null;
  createdAt: string;
  unipileAccountId: string;
}
```

- [ ] **Step 2: Update `SettingsState` interface**

Replace the `SettingsState` interface:

```typescript
interface SettingsState {
  accountId: string;
  premium: boolean;
  connLimit: number;
  msgLimit: number;
  timezone: string;
  windowStart: number;
  windowEnd: number;
  intervalMinutes: number;
  jitterMinutes: number;
  loading: boolean;
}
```

- [ ] **Step 3: Update `openSettings` function**

```typescript
function openSettings(acc: Account) {
  setSettings({
    accountId: acc.id,
    premium: acc.premium,
    connLimit: acc.dailyConnLimit,
    msgLimit: acc.dailyMsgLimit,
    timezone: acc.timezone,
    windowStart: acc.sendWindowStart,
    windowEnd: acc.sendWindowEnd,
    intervalMinutes: acc.sendIntervalMinutes,
    jitterMinutes: acc.sendJitterMinutes,
    loading: false,
  });
}
```

- [ ] **Step 4: Update `saveSettings` function**

```typescript
async function saveSettings() {
  if (!settings) return;
  setSettings(s => s && { ...s, loading: true });
  await fetch(`/api/accounts/${settings.accountId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dailyConnLimit: settings.connLimit,
      dailyMsgLimit: settings.msgLimit,
      timezone: settings.timezone,
      sendWindowStart: settings.windowStart,
      sendWindowEnd: settings.windowEnd,
      sendIntervalMinutes: settings.intervalMinutes,
      sendJitterMinutes: settings.jitterMinutes,
    }),
  });
  setSettings(null);
  load();
}
```

- [ ] **Step 5: Replace the settings panel JSX**

Find the block starting with `{/* Settings panel */}` and replace the entire inner settings `<div>` (the one with "Daily limits" heading) with:

```tsx
{isSettingsOpen && settings && (
  <div className="rounded-xl border mt-1 p-4"
    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Account settings</p>
      <button onClick={() => setSettings(null)} style={{ color: "var(--text-muted)" }}><X size={14} /></button>
    </div>

    {/* Premium protection banner */}
    <div className="mb-4 px-3 py-2 rounded-lg text-xs"
      style={{ background: settings.premium ? "#fef9c3" : "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
      {settings.premium
        ? "LinkedIn Premium detected — safe limits applied to protect your account."
        : "Free LinkedIn account — conservative limits applied to protect your account."}
    </div>

    <div className="space-y-5">
      {/* Daily limits */}
      <div>
        <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Daily limits</p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Connection requests</label>
              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{settings.connLimit}/day</span>
            </div>
            <input
              type="range" min={1} max={settings.premium ? 80 : 25} value={settings.connLimit}
              onChange={e => setSettings(s => s && { ...s, connLimit: Number(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {settings.premium ? "Safe zone: 40–50/day · Max: 80" : "Safe zone: 10–15/day · Max: 25"}
            </p>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Messages</label>
              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{settings.msgLimit}/day</span>
            </div>
            <input
              type="range" min={1} max={settings.premium ? 200 : 75} value={settings.msgLimit}
              onChange={e => setSettings(s => s && { ...s, msgLimit: Number(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {settings.premium ? "Safe zone: 100–150/day · Max: 200" : "Safe zone: 30–50/day · Max: 75"}
            </p>
          </div>
        </div>
      </div>

      {/* Scheduling */}
      <div>
        <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Send schedule</p>
        <div className="space-y-4">
          <div>
            <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Timezone</label>
            <select
              value={settings.timezone}
              onChange={e => setSettings(s => s && { ...s, timezone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}>
              <optgroup label="Europe">
                <option value="Europe/London">London (GMT/BST)</option>
                <option value="Europe/Paris">Paris (CET/CEST)</option>
                <option value="Europe/Berlin">Berlin (CET/CEST)</option>
                <option value="Europe/Amsterdam">Amsterdam (CET/CEST)</option>
                <option value="Europe/Stockholm">Stockholm (CET/CEST)</option>
                <option value="Europe/Zurich">Zurich (CET/CEST)</option>
                <option value="Europe/Madrid">Madrid (CET/CEST)</option>
                <option value="Europe/Warsaw">Warsaw (CET/CEST)</option>
              </optgroup>
              <optgroup label="Americas">
                <option value="America/New_York">New York (ET)</option>
                <option value="America/Chicago">Chicago (CT)</option>
                <option value="America/Denver">Denver (MT)</option>
                <option value="America/Los_Angeles">Los Angeles (PT)</option>
                <option value="America/Toronto">Toronto (ET)</option>
                <option value="America/Vancouver">Vancouver (PT)</option>
                <option value="America/Sao_Paulo">São Paulo (BRT)</option>
              </optgroup>
              <optgroup label="Asia / Pacific">
                <option value="Asia/Dubai">Dubai (GST)</option>
                <option value="Asia/Kolkata">Mumbai/Delhi (IST)</option>
                <option value="Asia/Singapore">Singapore (SGT)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Asia/Seoul">Seoul (KST)</option>
                <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
              </optgroup>
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Window opens</label>
              <select
                value={settings.windowStart}
                onChange={e => setSettings(s => s && { ...s, windowStart: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}>
                {Array.from({ length: 18 }, (_, i) => i + 5).map(h => (
                  <option key={h} value={h}>{h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM`}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Window closes</label>
              <select
                value={settings.windowEnd}
                onChange={e => setSettings(s => s && { ...s, windowEnd: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}>
                {Array.from({ length: 18 }, (_, i) => i + 6).map(h => (
                  <option key={h} value={h}>{h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM`}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Min gap between sends</label>
              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{settings.intervalMinutes} min</span>
            </div>
            <input
              type="range" min={5} max={120} step={5} value={settings.intervalMinutes}
              onChange={e => setSettings(s => s && { ...s, intervalMinutes: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>Random jitter</label>
              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>+ up to {settings.jitterMinutes} min</span>
            </div>
            <input
              type="range" min={0} max={30} step={1} value={settings.jitterMinutes}
              onChange={e => setSettings(s => s && { ...s, jitterMinutes: Number(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Sends spaced {settings.intervalMinutes}–{settings.intervalMinutes + settings.jitterMinutes} min apart
            </p>
          </div>
        </div>
      </div>
    </div>

    <button
      onClick={saveSettings}
      disabled={settings.loading}
      className="mt-5 px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50"
      style={{ background: "var(--accent)", color: "#fff" }}>
      {settings.loading ? "Saving…" : "Save settings"}
    </button>
  </div>
)}
```

- [ ] **Step 6: Verify in browser**

Run `npm run dev`. Go to `/accounts`, open settings for an account. Confirm: premium banner shows, all sliders render, timezone select works, Save hits the API and refreshes.

- [ ] **Step 7: Commit**

```bash
git add app/\(app\)/accounts/page.tsx
git commit -m "feat: add scheduling config and premium banner to accounts settings panel"
```

---

### Task 6: Approve Route — Schedule Instead of Sending Immediately

**Files:**
- Modify: `app/api/messages/[id]/approve/route.ts`

**Interfaces:**
- Consumes: `computeNextSlot` from `lib/scheduler.ts` (Task 2)
- Consumes: `LinkedInAccount` scheduling fields (Task 1)
- Produces: `{ scheduledFor: string }` — ISO timestamp returned to UI so it can show "Scheduled for 2:30 PM"

- [ ] **Step 1: Replace `app/api/messages/[id]/approve/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeNextSlot } from "@/lib/scheduler";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const message = await prisma.message.findFirst({
    where: { id },
    include: { lead: true, campaign: { include: { linkedInAccount: true } } },
  });
  if (!message || message.campaign.workspaceId !== user.workspaceId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const acc = message.campaign.linkedInAccount;

  // Find the last scheduled slot for this account so sequential approvals space correctly
  const lastScheduled = await prisma.message.findFirst({
    where: {
      campaign: { linkedInAccountId: acc.id },
      status: "APPROVED",
      scheduledFor: { not: null },
    },
    orderBy: { scheduledFor: "desc" },
  });

  const scheduledFor = computeNextSlot(
    {
      timezone: acc.timezone,
      sendWindowStart: acc.sendWindowStart,
      sendWindowEnd: acc.sendWindowEnd,
      sendIntervalMinutes: acc.sendIntervalMinutes,
      sendJitterMinutes: acc.sendJitterMinutes,
    },
    lastScheduled?.scheduledFor ?? new Date()
  );

  await prisma.message.update({
    where: { id },
    data: { status: "APPROVED", scheduledFor },
  });

  // Lead stays PENDING_APPROVAL until the cron actually sends — the UI will still show it.
  // No lead status change here; that happens in the worker when message is dispatched.

  return NextResponse.json({ scheduledFor: scheduledFor.toISOString() });
}
```

- [ ] **Step 2: Verify**

`npx tsc --noEmit`. Approve a message via the approvals UI (next task updates the UI — for now test with curl):

```bash
curl -X POST http://localhost:3000/api/messages/<msgId>/approve \
  -H "Cookie: <your session cookie>"
```

Expected response: `{ "scheduledFor": "2026-06-18T09:10:23.000Z" }`. Verify in DB that `message.status = "APPROVED"` and `message.scheduledFor` is set.

- [ ] **Step 3: Commit**

```bash
git add app/api/messages/\[id\]/approve/route.ts
git commit -m "feat: approve route now schedules message instead of sending immediately"
```

---

### Task 7: Bulk Approve Route

**Files:**
- Create: `app/api/campaigns/[id]/approvals/bulk-approve/route.ts`

**Interfaces:**
- Consumes: `computeNextSlot` from `lib/scheduler.ts` (Task 2)
- Consumes: Optional body `{ minIcpScore?: number }`
- Produces: `{ approved: number, skipped: number, firstSlot: string | null }`

- [ ] **Step 1: Create `app/api/campaigns/[id]/approvals/bulk-approve/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeNextSlot } from "@/lib/scheduler";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: campaignId } = await params;

  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, workspaceId: user.workspaceId },
    include: { linkedInAccount: true },
  });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const minIcpScore: number | undefined =
    typeof body.minIcpScore === "number" ? body.minIcpScore : undefined;

  const acc = campaign.linkedInAccount;

  // Find last scheduled slot for this account to chain new slots sequentially
  const lastScheduled = await prisma.message.findFirst({
    where: {
      campaign: { linkedInAccountId: acc.id },
      status: "APPROVED",
      scheduledFor: { not: null },
    },
    orderBy: { scheduledFor: "desc" },
  });
  let referenceTime = lastScheduled?.scheduledFor ?? new Date();

  // Fetch all PENDING_APPROVAL messages for this campaign, optionally filtered by ICP score
  const messages = await prisma.message.findMany({
    where: {
      campaignId,
      status: "PENDING_APPROVAL",
      ...(minIcpScore !== undefined
        ? { lead: { icpScore: { gte: minIcpScore } } }
        : {}),
    },
    include: { lead: { select: { icpScore: true } } },
    orderBy: { lead: { icpScore: "desc" } },
  });

  if (messages.length === 0) {
    return NextResponse.json({ approved: 0, skipped: 0, firstSlot: null });
  }

  const scheduleConfig = {
    timezone: acc.timezone,
    sendWindowStart: acc.sendWindowStart,
    sendWindowEnd: acc.sendWindowEnd,
    sendIntervalMinutes: acc.sendIntervalMinutes,
    sendJitterMinutes: acc.sendJitterMinutes,
  };

  const updates: { id: string; scheduledFor: Date }[] = [];
  let firstSlot: Date | null = null;

  for (const msg of messages) {
    const slot = computeNextSlot(scheduleConfig, referenceTime);
    if (!firstSlot) firstSlot = slot;
    referenceTime = slot;
    updates.push({ id: msg.id, scheduledFor: slot });
  }

  // Batch update in a transaction
  await prisma.$transaction(
    updates.map(u =>
      prisma.message.update({
        where: { id: u.id },
        data: { status: "APPROVED", scheduledFor: u.scheduledFor },
      })
    )
  );

  return NextResponse.json({
    approved: updates.length,
    skipped: 0,
    firstSlot: firstSlot?.toISOString() ?? null,
  });
}
```

- [ ] **Step 2: Verify**

`npx tsc --noEmit`. With some PENDING_APPROVAL messages in DB, call:

```bash
curl -X POST http://localhost:3000/api/campaigns/<id>/approvals/bulk-approve \
  -H "Content-Type: application/json" \
  -H "Cookie: <session>" \
  -d '{"minIcpScore": 60}'
```

Expected: `{ "approved": N, "skipped": 0, "firstSlot": "2026-..." }`. Check DB — matching messages should now be `APPROVED` with sequential `scheduledFor` timestamps spaced by interval+jitter.

- [ ] **Step 3: Commit**

```bash
git add app/api/campaigns/\[id\]/approvals/bulk-approve/route.ts
git commit -m "feat: add bulk-approve route with optional ICP score filter"
```

---

### Task 8: Worker Tick — Step 0 (Dispatch) + Step 4 (Schedule, Not Send)

**Files:**
- Modify: `app/api/worker/tick/route.ts`

**Interfaces:**
- Consumes: `computeNextSlot` from `lib/scheduler.ts` (Task 2)
- Produces: Step 0 sends APPROVED messages via Unipile when their `scheduledFor <= now`. Step 4 no longer calls Unipile — it sets APPROVED with a computed `scheduledFor` instead.

- [ ] **Step 1: Add import and Step 0 to worker tick**

At the top of `app/api/worker/tick/route.ts`, add the import:

```typescript
import { computeNextSlot } from "@/lib/scheduler";
```

Inside the `POST` handler, immediately after `const results: string[] = [];` and before the existing `// 1. Reset daily limits` block, insert Step 0:

```typescript
  const now = new Date();

  // 0. Dispatch scheduled messages (APPROVED where scheduledFor <= now)
  const scheduledMessages = await prisma.message.findMany({
    where: { status: "APPROVED", scheduledFor: { lte: now } },
    include: { lead: true, campaign: { include: { linkedInAccount: true } } },
    orderBy: { scheduledFor: "asc" },
  });

  // Track in-tick account state so we respect limits across multiple messages in same tick
  const inTickConnSent = new Map<string, number>();

  for (const msg of scheduledMessages) {
    const acc = msg.campaign.linkedInAccount;
    const alreadySent = inTickConnSent.get(acc.id) ?? 0;
    if (acc.connSentToday + alreadySent >= acc.dailyConnLimit) continue;

    const log = await logStart(msg.lead.workspaceId, "SEND_MESSAGE");
    try {
      if (msg.type === "CONNECTION_NOTE") {
        await unipile.sendConnectionRequest(
          acc.unipileAccountId,
          msg.lead.linkedInProfileId,
          msg.content
        );
      } else {
        const conv = await prisma.conversation.findUnique({ where: { leadId: msg.leadId } });
        if (conv) {
          await unipile.sendMessage(acc.unipileAccountId, conv.unipileThreadId, msg.content);
        }
      }
      await prisma.message.update({ where: { id: msg.id }, data: { status: "SENT", sentAt: now } });
      await prisma.lead.update({ where: { id: msg.leadId }, data: { status: "CONTACTED", contactedAt: now } });
      await prisma.linkedInAccount.update({ where: { id: acc.id }, data: { connSentToday: { increment: 1 } } });
      await prisma.event.create({
        data: { workspaceId: msg.lead.workspaceId, campaignId: msg.campaignId, leadId: msg.leadId, type: "message_sent" },
      });
      inTickConnSent.set(acc.id, alreadySent + 1);
      await logDone(log.id, "COMPLETED", `Dispatched to ${msg.lead.name}`);
      results.push(`dispatched:${msg.id}`);
    } catch (err) {
      // Leave as APPROVED — will retry on next tick
      await logDone(log.id, "FAILED", String(err));
    }
  }
```

Also remove the `const now = new Date();` that was at the start of Step 2 (it was declared there before — now it's declared above Step 0). Search for the duplicate `const now = new Date();` near the `leadToEnrich` block and delete it.

- [ ] **Step 2: Update Step 4 — Schedule instead of send**

Find the existing `// 4. Send messages` block. Replace the entire inner `for (const lead of queuedLeads)` loop with:

```typescript
    for (const lead of queuedLeads) {
      if (!campaign.connectionNoteTemplate) continue;
      const log = await logStart(lead.workspaceId, "SEND_MESSAGE");
      try {
        const loc = parseLocation(lead.location);
        const content = fillTemplate(campaign.connectionNoteTemplate, {
          name: lead.name.split(" ")[0],
          company: lead.company,
          headline: lead.headline,
          city: loc.city,
          country: loc.country,
        });

        if (campaign.requireApproval) {
          await prisma.message.create({
            data: {
              leadId: lead.id, campaignId: campaign.id,
              type: "CONNECTION_NOTE", content, status: "PENDING_APPROVAL",
            },
          });
          await prisma.lead.update({ where: { id: lead.id }, data: { status: "PENDING_APPROVAL" } });
          await logDone(log.id, "COMPLETED", `Queued for approval: ${lead.name}`);
        } else {
          // No approval — schedule directly
          const lastScheduled = await prisma.message.findFirst({
            where: {
              campaign: { linkedInAccountId: acc.id },
              status: "APPROVED",
              scheduledFor: { not: null },
            },
            orderBy: { scheduledFor: "desc" },
          });
          const scheduledFor = computeNextSlot(
            {
              timezone: acc.timezone,
              sendWindowStart: acc.sendWindowStart,
              sendWindowEnd: acc.sendWindowEnd,
              sendIntervalMinutes: acc.sendIntervalMinutes,
              sendJitterMinutes: acc.sendJitterMinutes,
            },
            lastScheduled?.scheduledFor ?? now
          );
          await prisma.message.create({
            data: {
              leadId: lead.id, campaignId: campaign.id,
              type: "CONNECTION_NOTE", content, status: "APPROVED", scheduledFor,
            },
          });
          await prisma.lead.update({ where: { id: lead.id }, data: { status: "PENDING_APPROVAL" } });
          await logDone(log.id, "COMPLETED", `Scheduled for ${scheduledFor.toISOString()}: ${lead.name}`);
          results.push(`scheduled:${lead.id}`);
        }
      } catch (err) {
        await logDone(log.id, "FAILED", String(err));
      }
    }
```

Also update the Step 4 preamble check that counts pending leads, to also count APPROVED messages (so we don't over-schedule):

```typescript
    const pendingCount = await prisma.message.count({
      where: {
        campaign: { linkedInAccountId: acc.id },
        status: { in: ["PENDING_APPROVAL", "APPROVED"] },
        type: "CONNECTION_NOTE",
      },
    });
```

- [ ] **Step 3: Update Step 5 (follow-ups) — schedule instead of create PENDING_APPROVAL**

In the follow-ups loop, both `requireApproval=true` and `requireApproval=false` cases should go through the same scheduling logic. Currently it always creates PENDING_APPROVAL. Update to match Step 4's pattern:

Find the `await prisma.message.create` inside the `for (const lead of acceptedLeads)` block and replace it:

```typescript
      if (campaign.requireApproval) {
        await prisma.message.create({
          data: {
            leadId: lead.id, campaignId: campaign.id,
            type: "FOLLOWUP", content, status: "PENDING_APPROVAL",
          },
        });
      } else {
        const lastScheduled = await prisma.message.findFirst({
          where: {
            campaign: { linkedInAccountId: campaign.linkedInAccountId },
            status: "APPROVED",
            scheduledFor: { not: null },
          },
          orderBy: { scheduledFor: "desc" },
        });
        const scheduledFor = computeNextSlot(
          {
            timezone: campaign.linkedInAccount.timezone,
            sendWindowStart: campaign.linkedInAccount.sendWindowStart,
            sendWindowEnd: campaign.linkedInAccount.sendWindowEnd,
            sendIntervalMinutes: campaign.linkedInAccount.sendIntervalMinutes,
            sendJitterMinutes: campaign.linkedInAccount.sendJitterMinutes,
          },
          lastScheduled?.scheduledFor ?? now
        );
        await prisma.message.create({
          data: {
            leadId: lead.id, campaignId: campaign.id,
            type: "FOLLOWUP", content, status: "APPROVED", scheduledFor,
          },
        });
      }
```

Note: the follow-ups loop already has `activeCampaigns.filter(...)` — those campaigns are already fetched with `include: { linkedInAccount: true }`, so `campaign.linkedInAccount` is available.

- [ ] **Step 4: Verify**

`npx tsc --noEmit`. Hit `/api/worker/tick` with the correct `Authorization: Bearer <WORKER_SECRET>` header. Verify Step 0 dispatches any APPROVED messages past their scheduledFor, and that QUEUED leads now produce APPROVED messages (not SENT).

- [ ] **Step 5: Commit**

```bash
git add app/api/worker/tick/route.ts
git commit -m "feat: worker dispatches scheduled messages in Step 0, Step 4 schedules instead of sending"
```

---

### Task 9: Approvals UI — Bulk Actions + Scheduled Time Display

**Files:**
- Modify: `app/(app)/campaigns/[id]/approvals/page.tsx`

**Interfaces:**
- Consumes: `POST /api/messages/[id]/approve` → `{ scheduledFor: string }` (Task 6)
- Consumes: `POST /api/campaigns/[id]/approvals/bulk-approve` → `{ approved, skipped, firstSlot }` (Task 7)
- Produces: Approval cards show "Scheduled for X" after approval. Header has "Approve All" and "Approve ≥ Score" buttons.

- [ ] **Step 1: Replace full `app/(app)/campaigns/[id]/approvals/page.tsx`**

```tsx
"use client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Clock } from "lucide-react";

interface Approval {
  id: string;
  content: string;
  type: string;
  scheduledFor?: string; // set optimistically after approval
  lead: { name: string; company: string | null; avatarUrl: string | null; icpScore: number | null };
}

interface Toast { id: number; message: string; ok: boolean }

function formatScheduledTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = d.toDateString() === tomorrow.toDateString();

  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `today at ${time}`;
  if (isTomorrow) return `tomorrow at ${time}`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + ` at ${time}`;
}

export default function ApprovalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [bulkLoading, setBulkLoading] = useState(false);
  const [minScore, setMinScore] = useState(70);
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string, ok: boolean) {
    const tid = Date.now();
    setToasts(prev => [...prev, { id: tid, message, ok }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== tid)), 4000);
  }

  async function load() {
    const res = await fetch(`/api/campaigns/${id}/approvals`);
    if (res.ok) setApprovals(await res.json());
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function approve(msgId: string, name: string) {
    setLoading(prev => ({ ...prev, [msgId]: true }));
    try {
      const res = await fetch(`/api/messages/${msgId}/approve`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setApprovals(prev =>
          prev.map(a => a.id === msgId ? { ...a, scheduledFor: data.scheduledFor } : a)
        );
        showToast(`Scheduled for ${formatScheduledTime(data.scheduledFor)}`, true);
        // Remove from queue after a brief moment to show the scheduled time
        setTimeout(() => load(), 2000);
      } else {
        showToast("Failed to schedule — try again", false);
      }
    } catch {
      showToast("Network error — try again", false);
    } finally {
      setLoading(prev => ({ ...prev, [msgId]: false }));
    }
  }

  async function reject(msgId: string) {
    setLoading(prev => ({ ...prev, [msgId]: true }));
    try {
      await fetch(`/api/messages/${msgId}/reject`, { method: "POST" });
    } finally {
      setLoading(prev => ({ ...prev, [msgId]: false }));
      load();
    }
  }

  async function bulkApprove(minIcpScore?: number) {
    setBulkLoading(true);
    try {
      const res = await fetch(`/api/campaigns/${id}/approvals/bulk-approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(minIcpScore !== undefined ? { minIcpScore } : {}),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.approved === 0) {
          showToast("No messages matched the filter", false);
        } else {
          const firstStr = data.firstSlot ? ` — first send ${formatScheduledTime(data.firstSlot)}` : "";
          showToast(`${data.approved} message${data.approved === 1 ? "" : "s"} scheduled${firstStr}`, true);
          load();
        }
      } else {
        showToast("Bulk approve failed — try again", false);
      }
    } catch {
      showToast("Network error — try again", false);
    } finally {
      setBulkLoading(false);
    }
  }

  return (
    <>
      {/* Toast stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className="px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg max-w-sm"
            style={{
              background: t.ok ? "#16a34a" : "#dc2626",
              color: "#fff",
              animation: "fadeIn 0.15s ease",
            }}>
            {t.message}
          </div>
        ))}
      </div>

      {approvals.length === 0 ? (
        <div className="rounded-xl border p-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
          <CheckCircle2 size={32} className="mx-auto mb-3" style={{ color: "#22c55e" }} />
          <p className="font-medium" style={{ color: "var(--text-primary)" }}>All caught up</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No messages pending approval.</p>
        </div>
      ) : (
        <>
          {/* Bulk action bar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Button
              size="sm"
              disabled={bulkLoading}
              onClick={() => bulkApprove()}
              style={{ background: "var(--accent)", color: "#fff", opacity: bulkLoading ? 0.6 : 1 }}>
              {bulkLoading ? "Scheduling…" : `Approve all (${approvals.length})`}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Approve ICP ≥</span>
              <input
                type="number"
                min={0} max={100}
                value={minScore}
                onChange={e => setMinScore(Number(e.target.value))}
                className="w-16 px-2 py-1 rounded-md border text-sm text-center"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)", color: "var(--text-primary)" }}
              />
              <Button
                size="sm"
                variant="outline"
                disabled={bulkLoading}
                onClick={() => bulkApprove(minScore)}
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                Approve
              </Button>
            </div>
          </div>

          {/* Message cards */}
          <div className="space-y-3">
            {approvals.map(a => (
              <div key={a.id} className="rounded-xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={a.lead.avatarUrl ?? undefined} />
                    <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 12 }}>
                      {a.lead.name?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{a.lead.name}</p>
                    {a.lead.company && (
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{a.lead.company}</p>
                    )}
                  </div>
                  {a.lead.icpScore !== null && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded border"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      ICP {a.lead.icpScore}
                    </span>
                  )}
                </div>

                <p className="text-sm p-3 rounded-lg mb-3"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}>
                  {a.content}
                </p>

                {a.scheduledFor ? (
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "#16a34a" }}>
                    <Clock size={12} />
                    Scheduled for {formatScheduledTime(a.scheduledFor)}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={loading[a.id]}
                      onClick={() => approve(a.id, a.lead.name)}
                      style={{ background: "var(--accent)", color: "#fff", opacity: loading[a.id] ? 0.6 : 1 }}>
                      {loading[a.id] ? "Scheduling…" : "Approve & schedule"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={loading[a.id]}
                      onClick={() => reject(a.id)}
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      Skip
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Go to `/campaigns/<id>/approvals`. Confirm:
1. "Approve all (N)" button appears when messages are present
2. ICP score filter input works
3. Approving an individual message changes the button to a green "Scheduled for X" line
4. Bulk approve shows a toast with count + first slot time
5. Cards disappear from the queue after reload

- [ ] **Step 3: Commit**

```bash
git add app/\(app\)/campaigns/\[id\]/approvals/page.tsx
git commit -m "feat: approvals UI - bulk approve, ICP filter, scheduled time display"
```

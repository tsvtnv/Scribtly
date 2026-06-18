# Campaigns: Scheduling, Approval Queue & LinkedIn Account Config

**Date:** 2026-06-18  
**Status:** Approved

---

## Overview

Campaigns currently send messages immediately on approval (or immediately in the worker when approval is off). This spec covers:

1. **Scheduled sends** — every message gets a `scheduledFor` UTC timestamp; the cron sends it when that time arrives
2. **Approval → schedule** — approving a message queues it for a future slot, not an instant send
3. **Bulk approval UI** — approve all, approve by ICP score threshold, individual cards showing scheduled time
4. **Account scheduling config** — timezone, operating window, base interval, jitter per LinkedIn account
5. **Premium/Free auto-detection** — safe daily limits set automatically from Unipile data

---

## 1. Database Schema Changes

### `LinkedInAccount` — 5 new fields

| Field | Type | Default | Description |
|---|---|---|---|
| `timezone` | String | `"Europe/London"` | IANA timezone (e.g. `"America/New_York"`) |
| `sendWindowStart` | Int | `9` | Hour (0–23) window opens, inclusive |
| `sendWindowEnd` | Int | `17` | Hour (0–23) window closes, exclusive |
| `sendIntervalMinutes` | Int | `10` | Base gap between sends |
| `sendJitterMinutes` | Int | `5` | Random 0–N extra minutes added to each interval |

### `Message` — 1 new field + 1 new status

New field:
```
scheduledFor   DateTime?   // UTC timestamp when cron fires this send
```

Updated status enum (insert `APPROVED` between `PENDING_APPROVAL` and `SENT`):
```
PENDING_APPROVAL → APPROVED → SENT
                            ↘ FAILED
```

- `APPROVED` = approved by user (or auto-queued by worker), waiting for `scheduledFor`
- `SENT` = Unipile confirmed send

### Premium auto-limits

On every Unipile sync, if `premium` status changes or account is new:
- Premium: `dailyConnLimit = 50`, `dailyMsgLimit = 150`
- Free: `dailyConnLimit = 15`, `dailyMsgLimit = 50`

These are safe starting defaults. User can adjust sliders but ranges are capped by tier.

---

## 2. Scheduling Logic (`lib/scheduler.ts`)

Pure function, no side effects:

```
computeNextSlot(account, referenceTime?) → Date (UTC)

1. Convert referenceTime (default: now) to account.timezone
2. If time < sendWindowStart → candidate = today at sendWindowStart
3. If time >= sendWindowEnd  → candidate = tomorrow at sendWindowStart  
4. If within window          → candidate = referenceTime + sendIntervalMinutes + random(0, sendJitterMinutes)
5. Return candidate as UTC Date
```

The `referenceTime` param lets callers pass the last scheduled slot for that account, so bulk-approve spaces messages sequentially rather than all landing at the same time.

---

## 3. Message Lifecycle (Full)

### Approval ON
```
import → NEW
worker tick → ENRICHED (step 2)
worker tick → QUEUED (step 3, ICP scored)
worker tick → PENDING_APPROVAL (step 4, message drafted, scheduledFor NOT set yet)
user approves → APPROVED (scheduledFor computed from account config)
cron tick → SENT (scheduledFor <= now, Unipile called)
```

### Approval OFF
```
import → NEW
worker tick → ENRICHED
worker tick → QUEUED
worker tick → APPROVED (step 4, message drafted + scheduledFor computed immediately)
cron tick → SENT
```

### Rejection
```
PENDING_APPROVAL → FAILED (lead → SKIPPED, same as today)
```

---

## 4. Worker Tick Changes (`/api/worker/tick`)

### Step 4 — Message generation (changed)
- **Before:** generates message → calls Unipile → sets SENT
- **After:** generates message → computes `scheduledFor` → sets `APPROVED`. No Unipile call here.

### New Step 0 — Send scheduled messages (runs first each tick)
1. Find all `APPROVED` messages where `scheduledFor <= now`
2. Group by `linkedInAccountId`
3. For each account, skip if daily limit already hit
4. For each message: call Unipile → set `SENT`, increment `connSentToday`/`msgSentToday`
5. Log to `AutomationLog`

Running step 0 first ensures the tick is primarily a dispatcher, not just a generator.

---

## 5. API Changes

### `POST /api/messages/[id]/approve` (changed)
- **Before:** calls Unipile immediately, sets SENT
- **After:** computes `scheduledFor` using account config, sets `APPROVED`, returns `{ scheduledFor }`

### `POST /api/messages/[id]/reject` — unchanged

### New: `POST /api/campaigns/[id]/approvals/bulk-approve`
```json
// Request
{ "minIcpScore": 70 }   // optional — omit to approve all

// Response
{ "approved": 12, "skipped": 3, "firstSlot": "2026-06-18T09:10:00Z" }
```
Internally: fetch all PENDING_APPROVAL messages for campaign, filter by score if provided, compute sequential slots (passing last slot as referenceTime for each), bulk-update to APPROVED.

### `PATCH /api/accounts/[id]` (extended)
Accept new fields: `timezone`, `sendWindowStart`, `sendWindowEnd`, `sendIntervalMinutes`, `sendJitterMinutes`.

### `POST /api/accounts/sync` (extended)
After syncing account data from Unipile, auto-set `dailyConnLimit`/`dailyMsgLimit` based on detected `premium` flag if not manually overridden.

---

## 6. Accounts Page — Settings Panel Extension

Expand existing inline settings panel per account to include:

**Scheduling section (new):**
- Timezone — searchable select (IANA zones, grouped by region)
- Window — two hour selects: "From [9am] to [5pm]"
- Interval — slider 5–60 min, label: "Send every X minutes"
- Jitter — slider 0–15 min, label: "+ up to Y random minutes"
- Preview line: "Sends spaced ~10–15 min apart, Mon–Fri 9am–5pm Europe/London"

**Limits section (existing, updated):**
- Premium badge auto-detected: "LinkedIn Premium detected — safe limits applied"
- Slider ranges capped by tier: Free max conn=25, Premium max conn=80
- Hint text updated per tier

---

## 7. Approvals UI — Bulk Actions & Schedule Preview

**Per-message card (updated):**
- After approval: show "Scheduled for 2:30 PM today" (optimistic, from API response)
- Pending cards: show estimated slot based on queue position (optional, can be "pending")

**New header controls:**
- "Approve All" button → calls bulk-approve with no score filter
- "Approve ≥ [score]" — number input (default 70) + "Approve" button → calls bulk-approve with minIcpScore
- After bulk: toast "12 messages scheduled — first send at 9:10 AM"

**Reject stays individual** — too destructive to bulk-reject.

---

## 8. LinkedIn Premium vs Free — Rate Limit Reference

| | Free | Premium / Sales Nav |
|---|---|---|
| Safe daily connections | 10–15 | 40–50 |
| Safe daily messages | 30–50 | 100–150 |
| Max slider (UI) | 25 conn / 75 msg | 80 conn / 200 msg |
| Auto-set default | 15 conn / 50 msg | 50 conn / 150 msg |

Unipile exposes `premium: boolean` on account data — this is used directly. No manual override of the tier; limits are adjustable within the tier's range.

---

## 9. Out of Scope

- Auto-book detection (backend incomplete, not part of this spec)
- Reply detection / REPLIED status promotion
- A/B template testing
- Multi-language templates

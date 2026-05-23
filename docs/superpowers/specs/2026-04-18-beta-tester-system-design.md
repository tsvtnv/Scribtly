# Beta Tester System — Design Spec

**Date:** 2026-04-18
**Author:** Kristiyan / Scribtly
**Status:** Approved for implementation

---

## Overview

A lightweight beta tester programme that grants selected users 3 months of free BASIC plan access in exchange for feedback. Beta status is a flag on the User model, enforced by a daily cron job that downgrades expired testers and sends a 7-day warning email. The referral landing page gains a beta-offer variant. Admins can grant, revoke, extend, and change plans directly from `/admin/(protected)/users`.

---

## Goals

- Flag users as beta testers (`isBetaTester`, `betaExpiresAt` on User)
- Grant BASIC plan free for 90 days on signup via referral beta offer
- Auto-downgrade to FREE on expiry (cron job, daily)
- 7-day warning email before expiry
- Beta badge visible to user on dashboard and billing pages
- Admin controls: grant/revoke/extend beta, change plan for any workspace
- Referral landing page CTA variant when `isBetaOffer = true` on the lead

---

## Database Schema Changes

### User model additions

```prisma
model User {
  // ... existing fields ...
  isBetaTester  Boolean   @default(false)
  betaExpiresAt DateTime?
}
```

**Semantics:**
- `isBetaTester = true` + `betaExpiresAt > now` → beta currently active
- `isBetaTester = true` + `betaExpiresAt <= now` → beta expired (historical record, kept for analytics)
- `isBetaTester = false` → never been a beta tester

### ReferralLead model addition

```prisma
model ReferralLead {
  // ... existing fields ...
  isBetaOffer Boolean @default(false)
}
```

Controls whether the landing page shows the beta offer CTA variant.

---

## Beta Activation Flow

1. Admin seeds a `ReferralLead` with `isBetaOffer: true`
2. Agency visits `/ref/[leadId]` → sees beta-offer landing page variant
3. Clicks CTA → `/signup?ref=[leadId]&beta=true`
4. Signup page stores `beta=true` in sessionStorage alongside `ref` cookie
5. After successful signup, `SignupTracking` component calls `POST /api/beta/activate` with `{ leadId }`
6. `/api/beta/activate`:
   - Verifies user is authenticated (Lucia session)
   - Verifies `leadId` exists and `isBetaOffer = true`
   - Sets `user.isBetaTester = true`, `user.betaExpiresAt = now + 90 days`
   - Upgrades `workspace.plan = BASIC`
   - Sends beta welcome email via Resend
   - Updates `ReferralLead.signedUp = true`, `signedUpAt`, `clerkUserId = user.id`
7. User lands on onboarding with BASIC plan active

---

## API Routes

### `POST /api/beta/activate`

**Auth:** Requires valid Lucia session (authenticated user only).

**Body:** `{ leadId: string }`

**Logic:**
1. Get `userId` from session
2. Find user + their default workspace
3. Find `ReferralLead` by `leadId` — must exist and `isBetaOffer = true`
4. If user already `isBetaTester` → return 200 (idempotent, no-op)
5. In a transaction:
   - `user.isBetaTester = true`
   - `user.betaExpiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)`
   - `workspace.plan = BASIC`
   - `referralLead.signedUp = true`, `signedUpAt = now`, `clerkUserId = userId`
6. Send beta welcome email
7. Return `{ ok: true, betaExpiresAt }`

**Error cases:**
- 401 if not authenticated
- 404 if leadId not found or `isBetaOffer = false`
- 400 if user has no default workspace

### `GET /api/beta/status`

**Auth:** Requires valid Lucia session.

Returns `{ isBetaTester: boolean, betaExpiresAt: string | null, betaActive: boolean }` for the current user. Used by dashboard and billing pages.

### `POST /api/cron/expire-beta`

**Auth:** `Authorization: Bearer ${CRON_SECRET}` header check.

**Logic (runs daily):**
1. Find all users where `isBetaTester = true` AND `betaExpiresAt IS NOT NULL`
2. **Warning group:** `betaExpiresAt` is between `now + 6 days` and `now + 7 days` → send warning email (only once — check that warning hasn't already been sent by checking if `betaExpiresAt - 7 days > user.updatedAt` or use a separate `betaWarningEmailSentAt` field — see schema note below)
3. **Expired group:** `betaExpiresAt <= now` AND workspace `plan = BASIC` → downgrade workspace to FREE
4. Returns count of warned + downgraded

**Schema addition for warning tracking:**
```prisma
model User {
  // ...
  betaWarningEmailSentAt DateTime?
}
```

### `POST /api/admin/users/[userId]/beta` (admin only)

**Auth:** HMAC admin auth (existing `requireAdmin()` pattern).

**Body:** `{ action: "grant" | "revoke" | "extend" }` 

- `grant` → `isBetaTester = true`, `betaExpiresAt = now + 90d`, workspace `plan = BASIC`
- `revoke` → workspace `plan = FREE`, `isBetaTester` stays true (historical), `betaExpiresAt = now` (marks as expired)
- `extend` → `betaExpiresAt += 30 days`

### `POST /api/admin/users/[userId]/plan` (admin only)

**Auth:** HMAC admin auth.

**Body:** `{ plan: "FREE" | "BASIC" | "PRO" | "AGENCY" | "ENTERPRISE" }`

Sets `workspace.plan` directly. No Stripe interaction. Used for manual overrides.

---

## Referral Landing Page — Beta Variant

When `lead.isBetaOffer = true`, `RefLandingClient` receives `isBetaOffer: true` prop and renders:

**Hero section changes:**
- Badge (above headline): `"Beta Access — Limited Spots"` (amber colour, not primary)
- Headline: `"Welcome, {agencyName}."` (unchanged)
- Tagline: unchanged (service-specific)
- CTA button text: `"Claim free beta access for {agencyName} →"`
- Below button: `"3 months free on our £5/mo plan · No credit card · Cancel anytime"`

**Second CTA section changes:**
- Headline: `"Ready to join as a beta tester, {agencyName}?"`
- Sub-copy: `"Limited beta spots. 3 months free. Help us build the best script tool for agencies."`
- Button text: `"Claim your beta spot →"`

**Non-beta variant (existing):**
- CTA: `"Get free access for {agencyName} →"` (unchanged)

The `handleCta` function appends `&beta=true` to the signup URL when `isBetaOffer = true`.

---

## User-Facing Beta UI

### Dashboard page (`app/(app)/dashboard/page.tsx`)

- Plan badge changes from e.g. `"BASIC"` to `"BASIC · Beta Tester 🧪"` when `betaActive = true`
- Below the badge: `"Beta access until {betaExpiresAt formatted as 'DD MMM YYYY'}"` in small muted text

### Billing page (`app/(app)/settings/billing/BillingPageClient.tsx`)

- When `betaActive = true`: show a highlighted `"Beta Tester"` info card above the plan cards
  - Content: `"You have free BASIC access until {date}. After that you'll move to the Free plan unless you subscribe."`
- The BASIC plan card is highlighted as current plan (same as if they were paying for it)
- No "Upgrade" button on BASIC card while beta is active

---

## Admin User Management Changes (`app/admin/(protected)/users`)

### Table additions (per workspace row)

New columns:
- **Beta** — shows `"Active (expires DD MMM)"` / `"Expired"` / `"—"`
- **Plan** — existing column, now shows a dropdown to change plan inline

New action buttons per row (in an actions column):
- **Grant Beta** — visible when `!isBetaTester || betaExpired`
- **Revoke** — visible when `betaActive`
- **Extend +30d** — visible when `betaActive`

Plan dropdown: select from FREE / BASIC / PRO / AGENCY / ENTERPRISE → calls `POST /api/admin/users/[userId]/plan`

Beta buttons call `POST /api/admin/users/[userId]/beta` with appropriate action.

All changes reflect immediately (optimistic update + revalidation).

---

## Emails

### Beta welcome email (sent on activation)

**Subject:** `"You're in — your beta access is live, {name}"`

**Body:**
```
Hi {name},

Your free beta access to Scribtly is now active.

What you get:
- Full BASIC plan access (25 scripts/month, 3 clients, all AI models)
- Free for 3 months — until {betaExpiresAt formatted}
- No credit card required

In return, we'd love your honest feedback as you use the platform. 
You can reply to this email anytime.

Get started → scribtly.com/dashboard

Best,
Kristiyan
Scribtly
```

### Beta expiry warning email (sent 7 days before expiry)

**Subject:** `"Your Scribtly beta access expires in 7 days"`

**Body:**
```
Hi {name},

Just a heads up — your free beta access expires on {betaExpiresAt formatted}.

After that, your account will move to the Free plan (5 scripts/month).

To keep full access, you can subscribe to the BASIC plan for £5/month:
scribtly.com/settings/billing

Thanks for being a beta tester — your feedback has been invaluable.

Best,
Kristiyan
Scribtly
```

---

## Security & Compliance

- `/api/beta/activate` requires authenticated session — cannot be called by anonymous users
- `isBetaOffer` check prevents activating beta for non-beta referral links
- Idempotent activation — safe to call multiple times
- Admin endpoints protected by existing HMAC auth
- Cron endpoint protected by `CRON_SECRET`
- No Stripe interaction — purely DB-based plan override

---

## Out of Scope

- A/B testing beta vs non-beta landing pages
- Self-service beta application form
- Beta feedback collection UI (separate task)
- Stripe coupon/discount codes for beta
- Team workspace beta (beta applies to the workspace owner's personal account only)

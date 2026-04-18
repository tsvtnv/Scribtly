# Referral Tracking & Agency Outreach System — Design Spec

**Date:** 2026-04-18  
**Author:** Kristiyan / Scribtly  
**Status:** Approved for implementation

---

## Overview

A full-funnel referral tracking system for Scribtly's agency outreach campaign. Each outreach target gets a unique URL (`scribtly.com/ref/[leadId]`) that delivers a personalised landing experience, tracks every interaction through landing → signup → onboarding, and surfaces all data in the existing `/admin` dashboard.

---

## Goals

- Personalised landing page per agency (name, pain points, tailored CTA)
- Full behavioural tracking: time on each page, clicks, scroll depth, form interactions, signup progress, onboarding steps
- Contact method tracking: Resend email vs website form submission
- Email delivery/open tracking via Resend webhooks
- IP geolocation + browser/OS fingerprinting
- Admin dashboard table at `/admin/(protected)/outreach` with full detail drill-down
- Pre-filled signup with agency name for fast onboarding
- All data in existing Postgres DB via Prisma

---

## Database Schema

### New Model: `ReferralLead`

```prisma
model ReferralLead {
  id        String   @id @default(cuid())
  leadId    String   @unique  // matches outreach spreadsheet ID e.g. "lead_001"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Agency Info
  agencyName     String
  agencyWebsite  String?
  agencyLocation String?
  agencyServices String?  // comma-separated services found
  fitScore       Int?     // 1-5

  // Outreach Details
  contactedAt           DateTime?
  contactMethod         ContactMethod?
  contactFormUrl        String?        // URL of form submitted
  contactFormConfirmation String?      // confirmation text captured
  resendMessageId       String?        // Resend message ID
  messageSubject        String?
  messageBody           String?        // full message sent
  sourceSearchQuery     String?        // Google query that found them
  sourceResultUrl       String?        // search result URL

  // Email Delivery (Resend webhooks)
  emailDelivered  Boolean   @default(false)
  emailBounced    Boolean   @default(false)
  emailOpenedAt   DateTime?
  emailClickedAt  DateTime?

  // Visit / Session Tracking
  firstVisitAt          DateTime?
  lastVisitAt           DateTime?
  totalVisits           Int       @default(0)
  totalTimeOnSiteSeconds Int      @default(0)

  // IP & Device
  ipAddress   String?
  country     String?
  city        String?
  region      String?
  userAgent   String?
  browser     String?
  os          String?
  deviceType  String?  // mobile/desktop/tablet

  // Form Behaviour
  signupFormStartedAt   DateTime?
  signupFormAbandonedAt DateTime?
  signupFormLastField   String?   // last field they interacted with
  signupFormTimeSeconds Int?      // total time spent on signup form

  // Onboarding
  signedUp          Boolean   @default(false)
  signedUpAt        DateTime?
  clerkUserId       String?
  workspaceId       String?
  onboardingStartedAt   DateTime?
  onboardingCompletedAt DateTime?
  onboardingStepsJson   String?   // JSON array of {step, enteredAt, exitedAt, timeSeconds}

  // Outreach Status
  outreachStatus OutreachStatus @default(NOT_CONTACTED)
  optedOut       Boolean        @default(false)
  optedOutAt     DateTime?
  notes          String?

  // Events (one-to-many)
  events ReferralEvent[]
}

model ReferralEvent {
  id         String   @id @default(cuid())
  leadId     String
  lead       ReferralLead @relation(fields: [leadId], references: [leadId])
  createdAt  DateTime @default(now())

  eventType  String   // page_view, page_exit, cta_click, form_start, form_field, form_abandon, signup_complete, onboarding_step
  page       String?  // /ref/[leadId], /sign-up, /onboarding
  metadata   String?  // JSON: {field, scrollDepth, timeOnPageSeconds, step, etc.}
}

enum ContactMethod {
  RESEND_EMAIL
  WEBSITE_FORM
  MANUAL
}

enum OutreachStatus {
  NOT_CONTACTED
  CONTACTED_VIA_FORM
  CONTACTED_VIA_EMAIL
  SKIPPED_DUPLICATE
  SKIPPED_NO_CONTACT_METHOD
  SKIPPED_NOT_RELEVANT
  SKIPPED_POLICY_BLOCKS_OUTREACH
  NEEDS_MANUAL_REVIEW
  FAILED
}
```

---

## Pages & Routes

### 1. `/ref/[leadId]` — Personalised Landing Page

**Purpose:** Personalised agency landing. Full-screen, no nav clutter.

**Content structure:**
1. **Hero** — "Welcome, [Agency Name]." + tagline specific to their service type (TikTok agency vs YouTube agency vs general social)
2. **Pain points** — 3 cards matching their service offering (e.g. "Writing scripts for 10 clients? That's 10x the rewrites.")
3. **How Scribtly fixes it** — 3 matching solution cards with short copy + icon
4. **Social proof** — 1-2 short testimonials or stat (e.g. "Agencies save 4hrs per client per week")
5. **CTA button** — "Get free access for [Agency Name] →" → navigates to `/sign-up?ref=[leadId]`

**Tracking on this page:**
- `page_view` fired on load (timestamp, IP, device, geo)
- Scroll depth tracked (25%, 50%, 75%, 100%) → fired as events
- Time on page tracked via `visibilitychange` + `beforeunload`
- CTA button click → `cta_click` event
- If they leave without clicking CTA → `page_exit` event with time spent

**If leadId not found in DB:** Show generic Scribtly marketing page (no error, no leak of data).

---

### 2. `/sign-up?ref=[leadId]` — Pre-filled Signup

**Changes to existing Clerk signup page:**
- Read `ref` from query param, store in sessionStorage + cookie
- Pre-fill "Company/Agency name" field with `agencyName` from DB (fetched via `/api/ref/[leadId]/prefill` — returns only `agencyName`, nothing sensitive)
- Show small personalised header: "You're signing up as [Agency Name]"

**Tracking on this page:**
- `page_view` on load
- `form_start` on first keystroke/focus in any field
- `form_field` event on each field blur (field name + timestamp — no values stored)
- `form_abandon` on page unload before submit (last field reached)
- `signup_complete` on successful Clerk signup → links `clerkUserId` to `leadId`
- Total time on signup page tracked

---

### 3. Onboarding — Full Step Tracking

**No UI changes to existing onboarding.** Add tracking calls only.

For each onboarding step:
- `onboarding_step` event fired on step enter: `{step: 1, enteredAt}`
- `onboarding_step` event fired on step exit: `{step: 1, exitedAt, timeSeconds}`
- On completion: `onboardingCompletedAt` set, full `onboardingStepsJson` written

Tracking injected via a lightweight `useReferralTracking()` hook that reads the ref cookie and posts to `/api/track`.

---

## API Routes

### `POST /api/track`
Receives all tracking events from client-side. Validates `leadId` from cookie/body. Upserts `ReferralLead` and appends `ReferralEvent`.

**Payload:**
```json
{
  "leadId": "lead_001",
  "eventType": "page_view",
  "page": "/ref/lead_001",
  "metadata": { "scrollDepth": 75, "timeOnPageSeconds": 42 }
}
```

Rate-limited to prevent noise. Silently ignores unknown leadIds.

### `GET /api/ref/[leadId]/prefill`
Returns `{ agencyName }` only. No sensitive data. Used by signup page to pre-fill company name.

### `POST /api/webhooks/resend-outreach`
Separate from existing Resend webhook. Handles:
- `email.delivered` → sets `emailDelivered: true`
- `email.bounced` → sets `emailBounced: true`
- `email.opened` → sets `emailOpenedAt`
- `email.clicked` → sets `emailClickedAt`

Verified via Resend webhook signature.

### `POST /api/admin/leads` (admin only)
Create/update `ReferralLead` records. Used by the outreach workflow to log contacts.

### `GET /api/admin/leads` (admin only)
Paginated list of all leads with summary stats. Used by admin table.

---

## Admin Dashboard — `/admin/(protected)/outreach`

New tab alongside existing admin pages.

### Summary bar (top)
- Total leads | Contacted | Email delivered | Email opened | Visited | Signed up | Conversion rate

### Main table (sortable, filterable)
Columns:
| Agency | Fit | Contacted Via | Delivered | Opened | Visits | Time on Site | Form Started | Signed Up | Country | Last Seen | Status |

Filters: status, contact method, signed up (yes/no), country, fit score

### Row detail (click to expand)
- Full message sent + subject
- Contact method: email (Resend ID, delivered/bounced/opened) or form (URL + confirmation)
- Services found + search query source
- Visit timeline: each visit with timestamp, duration, scroll depth
- Device: IP, country, city, browser, OS, device type
- Signup behaviour: started at, abandoned at, last field, time on form
- Onboarding: each step with time spent
- Full event log (chronological)

---

## Tracking Script

Small client-side module (`lib/referral-tracker.ts`):
- Reads `ref` cookie (set by middleware on first visit to `/ref/[leadId]`)
- Exposes `track(eventType, metadata)` function
- Batches events and flushes on `visibilitychange`/`beforeunload` using `navigator.sendBeacon`
- Tracks scroll depth via IntersectionObserver
- Tracks time on page via `performance.now()`
- Tracks form field interactions via event delegation (captures field name, not value)

---

## Middleware Changes

In `middleware.ts`, add:
- If path matches `/ref/[leadId]`: set `ref_lead_id` cookie (httpOnly: false so client JS can read it, SameSite: Lax, 30-day expiry)
- Pass `leadId` as header to the page for server-side geo lookup on first visit

---

## IP Geolocation

On first `page_view` event (server-side in `/api/track`):
- Call `http://ip-api.com/json/[ip]?fields=country,city,region` (free, no key, 45 req/min limit — fine for this volume)
- Store `country`, `city`, `region` on the `ReferralLead`

---

## Pain Point Copy — Per Service Type

Landing page copy varies based on `agencyServices` field:

| Service Type | Pain Point 1 | Pain Point 2 | Pain Point 3 |
|---|---|---|---|
| TikTok/Short-form | "Every client needs a different voice" | "Generic AI scripts sound robotic" | "Rewrites eat your team's time" |
| YouTube | "Long-form scripts take hours per client" | "Maintaining brand voice across episodes" | "Brief → script handoff loses context" |
| General social | "Managing scripts for 10+ clients" | "Inconsistent tone across platforms" | "Client revisions never end" |
| Default | "Every client, different voice" | "AI drafts need too much editing" | "Script production doesn't scale" |

---

## Security & Compliance

- `/api/track` accepts events without auth (ref cookie only) — rate-limited per IP (10 req/min)
- `/api/ref/[leadId]/prefill` returns only agency name — no PII leak
- `/api/admin/leads` protected by existing admin HMAC auth
- `/api/webhooks/resend-outreach` verified by Resend signature header
- No email addresses or personal data stored in tracking events
- IP stored only on `ReferralLead`, not on individual events
- GDPR note: ref landing page should include standard cookie/tracking notice in footer

---

## Out of Scope

- A/B testing different landing page variants
- Automated follow-up emails based on behaviour
- Real-time admin notifications
- The outreach search/send workflow itself (separate task)

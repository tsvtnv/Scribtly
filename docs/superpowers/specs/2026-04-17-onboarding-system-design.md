# Onboarding System Design
**Date:** 2026-04-17  
**App:** ScriptFast  
**Goal:** Get every new user to generate their first script within 10 minutes of signup, then convert free users to paid within 7 days.

---

## 1. Database Schema

All onboarding fields added to the **Workspace** model (consistent with where plan, scripts, and clients already live).

```prisma
// Add to Workspace model in prisma/schema.prisma
onboardingStep          Int       @default(0)
onboardingCompleted     Boolean   @default(false)
firstScriptGeneratedAt  DateTime?
firstClientAddedAt      DateTime?
welcomeEmailSentAt      DateTime?
day2EmailSentAt         DateTime?
day7EmailSentAt         DateTime?
day14EmailSentAt        DateTime?
emailOptOut             Boolean   @default(false)
```

**`onboardingStep` progression:**  
0 = signed up → 1 = client added → 2 = script generated → 3 = scripts page visited → 4 = upgraded  
Always updated with `Math.max(current, newStep)` — never goes backwards.

**Unsubscribe token:** Uses existing `workspace.id` (UUID, not guessable). No new field needed.

**Migration:** `npx prisma db push`

---

## 2. Cron Email Jobs

**New endpoint:** `POST /api/cron/onboarding`  
Protected by existing `CRON_SECRET` bearer token pattern (same as `/api/cron/generate`).  
Runs **daily at 9am UTC** — registered in hosting platform (Vercel Cron or Railway).

Processes all workspaces in batches. For each workspace, checks in order:

| Check | Condition | Action |
|---|---|---|
| Welcome email | `welcomeEmailSentAt` is null | Send, set `welcomeEmailSentAt` |
| Day-2 no-script | `createdAt` ≥ 48h ago AND `firstScriptGeneratedAt` null AND `day2EmailSentAt` null | Send day-2 email, set `day2EmailSentAt` |
| Day-7 FREE nudge | `createdAt` ≥ 7 days ago AND plan FREE AND `day7EmailSentAt` null | Send free upgrade email, set `day7EmailSentAt` |
| Day-7 BASIC nudge | `createdAt` ≥ 7 days ago AND plan BASIC AND `day7EmailSentAt` null | Send basic upgrade email, set `day7EmailSentAt` |
| Day-14 re-engagement | `createdAt` ≥ 14 days ago AND plan FREE AND scriptCount < 3 AND `day14EmailSentAt` null | Send re-engagement email, set `day14EmailSentAt` |

All checks skip if `workspace.emailOptOut` is true.

**Existing user safety:** On deploy, run a one-time migration script that sets `welcomeEmailSentAt = now()` for all workspaces created before the deploy date. This prevents the cron job from sending welcome emails to existing users who signed up before onboarding was built.

**Event-driven emails (not cron):**
- **First-script congratulations** — fires immediately in `POST /api/generate-script` when `firstScriptGeneratedAt` is being set for the first time.
- **Upgrade confirmation** — fires immediately in Stripe webhook `checkout.session.completed`. Extends existing logic with plan-specific body.

---

## 3. Tracking Hooks

Small additions to four existing code locations:

### `POST /api/clients` (app/api/clients/route.ts)
After successful create:
```ts
if (!workspace.firstClientAddedAt) {
  await prisma.workspace.update({
    where: { id: workspace.id },
    data: {
      firstClientAddedAt: new Date(),
      onboardingStep: Math.max(workspace.onboardingStep, 1),
    },
  })
}
```

### `POST /api/generate-script` (app/api/generate-script/route.ts)
After stream completes successfully, if `firstScriptGeneratedAt` is null:
```ts
await prisma.workspace.update({
  where: { id: workspace.id },
  data: {
    firstScriptGeneratedAt: new Date(),
    onboardingStep: Math.max(workspace.onboardingStep, 2),
  },
})
// then fire first-script congratulations email (fire-and-forget)
sendFirstScriptEmail(workspace, user, remainingScripts)
```

### `GET /api/user/onboarding` (new route)
Called from `/scripts` page on mount. If step < 3 and `firstScriptGeneratedAt` is not null, update step to 3.

### Stripe webhook `checkout.session.completed` (app/api/stripe/webhook/route.ts)
After setting plan, add:
```ts
await prisma.workspace.update({
  where: { id: workspaceId },
  data: { onboardingStep: 4, onboardingCompleted: true },
})
sendUpgradeConfirmationEmail(workspace, user, billingDate)
```

---

## 4. New API Routes

### `GET /api/user/onboarding`
**Auth:** required  
**Returns:**
```ts
{
  onboardingStep: number,
  onboardingCompleted: boolean,
  firstScriptGeneratedAt: string | null,
  firstClientAddedAt: string | null,
  checklist: [
    { id: 1, key: 'add_client', completed: boolean },
    { id: 2, key: 'generate_script', completed: boolean },
    { id: 3, key: 'explore_library', completed: boolean },
    { id: 4, key: 'invite_or_upgrade', completed: boolean },
  ]
}
```
Side effect: updates `onboardingStep` to 3 if conditions met (scripts page visit tracking).

### `PATCH /api/user/onboarding`
**Auth:** required  
**Body:** Partial of onboarding fields — e.g. `{ onboardingCompleted: true }` or `{ onboardingStep: 1 }`  
**Called from:** banner dismiss, checklist dismiss

### `GET /api/user/unsubscribe?token={workspaceId}`
**Auth:** none (public link from email)  
Sets `workspace.emailOptOut = true` where `workspace.id === token`.  
Redirects to `/unsubscribed` (simple static page: "You've been unsubscribed from ScriptFast emails.").

---

## 5. Email Templates

**New file:** `lib/emails/onboarding.ts`  
**Existing** `lib/sendEmail.ts` is untouched — new file is purely additive.

**All emails:**
- From: `Deyan from ScriptFast <deyan@scriptfast.app>`
- Reply-to: `deyan@scriptfast.app`
- Format: plain text (no HTML, no React Email)
- Footer on every email:
  ```
  ---
  To stop receiving these emails: {appUrl}/unsubscribe?token={workspaceId}
  ScriptFast · hello@scriptfast.app
  ```

### Exported functions

```ts
sendWelcomeEmail(workspace, user)
sendDay2NoScriptEmail(workspace, user)
sendFirstScriptEmail(workspace, user, remainingScripts)
sendDay7FreeEmail(workspace, user)
sendDay7BasicEmail(workspace, user)
sendDay14ReengagementEmail(workspace, user)
sendUpgradeConfirmationEmail(workspace, user, billingDate)
```

Each function checks `workspace.emailOptOut` before sending and returns early if true.

### Email content

**Email 1 — Welcome** (immediate on signup)  
Subject: `Your ScriptFast account is ready`  
Plain text per spec. CTA: `/clients/new`

**Email 2 — Day-2 no script** (48h, firstScriptGeneratedAt null)  
Subject: `Did something go wrong?`  
Plain text per spec. CTAs: `/clients/new` and `/generate`

**Email 3 — First script congrats** (event-driven, immediate)  
Subject: `How was it?`  
Plain text per spec. Includes remaining script count.

**Email 4 — Day-7 FREE upgrade nudge**  
Subject: `What's stopping you?`  
Plain text per spec. CTA: `/pricing`

**Email 5 — Day-7 BASIC upgrade nudge**  
Subject: `You're missing the best part`  
Plain text per spec. CTA: `/pricing`

**Email 6 — Day-14 re-engagement** (FREE, < 3 scripts)  
Subject: `Still here if you need me`  
Plain text per spec. CTA: `/generate`

**Email 7 — Upgrade confirmation** (immediate, plan-specific body)  
Subject: `You're on {{planName}} — here's what's new`  
Three variants: BASIC, PRO, AGENCY — per spec.

---

## 6. In-App Components

All new components in `components/onboarding/`.

### `OnboardingBanner.tsx`
- Shown on dashboard when `onboardingStep === 0`
- Inline card (not modal) above the stats row
- Headline: "Welcome to ScriptFast"
- 3-step visual: Add client → Generate script → Ship content
- Primary CTA: "Add your first client" → `/clients/new`
- Dismiss: calls `PATCH /api/user/onboarding` with `{ onboardingStep: 1 }`, sets `localStorage.sf_banner_dismissed = true`
- Never shown again after dismissed (check localStorage on mount before fetch)

### `OnboardingChecklist.tsx`
- Shown on dashboard below stats when `onboardingCompleted === false`
- Fetches state from `GET /api/user/onboarding`
- Purple `#7F77DD` animated progress bar
- 4 steps with check icon (done) / circle (pending)
- "Dismiss" link → `PATCH /api/user/onboarding` with `{ onboardingCompleted: true }`
- When all 4 complete: brief fade animation, then auto-hides and patches `onboardingCompleted: true`

**Checklist steps:**
1. Add your first client — complete when `firstClientAddedAt` not null
2. Generate your first script — complete when `firstScriptGeneratedAt` not null
3. View your script library — complete when `onboardingStep >= 3`
4. Unlock the full toolkit — complete when `plan !== FREE`

### `ScriptsPageTracker.tsx`
- Renders null (invisible)
- Mounted on `/scripts` page
- On mount: calls `GET /api/user/onboarding` (triggers step-3 update server-side)

### Empty States (inline updates to existing pages)

| Page | Condition | Headline | CTA |
|---|---|---|---|
| `/clients` | No clients | "Add your first client" | "Add a client" → `/clients/new` |
| `/scripts` | No scripts | "Your script library is empty" | "Generate a script" → `/generate` |
| `/pipeline` | No items (PRO+) | "Nothing in your pipeline yet" | "Add first piece" → `/pipeline/new` |
| `/generate` | No clients exist | "Add a client first" | "Add a client" → `/clients/new` |

The generate page empty state replaces the form entirely when the user has zero clients.

### One-off Tooltips (localStorage-gated inline callouts)

**Generate page** — below model selector:  
`localStorage key: sf_tooltip_model_seen`  
Text: "Standard is great for TikTok and short clips. Quality works for most scripts. Premium is best for long YouTube videos."

**Pipeline page** — below first column header:  
`localStorage key: sf_tooltip_pipeline_seen`  
Text: "Drag cards between columns as your content moves through production."

Both render as a small dismissible callout div. On dismiss: set localStorage key, hide.

### Upgrade Nudges (extend existing patterns)

**Pipeline locked (FREE/BASIC):** `PipelineUpgradePrompt` already exists — verify it gates both FREE and BASIC, not just one.

**80% usage amber banner:** Show on dashboard and generate page when `(scriptCount / scriptLimit) >= 0.8`. Text: "You've used {used} of {total} scripts this month — resets {date}." with "Upgrade for more" CTA.

**PDF export lock:** In `ScriptActions.tsx`, when FREE or BASIC user clicks download PDF, show inline message instead of downloading: "PDF export is available on Pro. Upgrade to send polished reports to clients." with "Upgrade to Pro" CTA.

---

## 7. Build Order

1. **Schema** — add fields to Workspace, run `prisma db push`
2. **API routes** — `GET/PATCH /api/user/onboarding`, `GET /api/user/unsubscribe`
3. **Tracking hooks** — update `/api/clients`, `/api/generate-script`, Stripe webhook
4. **Email templates** — create `lib/emails/onboarding.ts` with all 7 functions
5. **Cron job** — create `POST /api/cron/onboarding`, register in hosting platform
6. **In-app components** — banner, checklist, tracker, empty states, tooltips, upgrade nudges

---

## 8. Validation Checklist

- [ ] Welcome email sends within 24h of signup (next cron run)
- [ ] Day-2 email sends if no script generated — skips if script was generated
- [ ] First script email sends immediately on first generation
- [ ] Day-7 email sends correct version based on plan (FREE vs BASIC)
- [ ] Day-14 email skips for paid users and users with 3+ scripts
- [ ] Upgrade confirmation email sends correct plan-specific content
- [ ] Unsubscribe link sets emailOptOut — no further emails sent
- [ ] OnboardingBanner shows on dashboard for step=0 users, never again after dismiss
- [ ] OnboardingChecklist shows for onboardingCompleted=false users
- [ ] Checklist step 1 completes when first client added
- [ ] Checklist step 2 completes when first script generated
- [ ] Checklist step 3 completes when /scripts page visited
- [ ] Checklist step 4 completes when plan upgraded
- [ ] Checklist hides after all steps complete or dismissed
- [ ] Empty states show on all relevant pages
- [ ] Generate page shows "Add a client first" when user has zero clients
- [ ] Pipeline shows upgrade prompt for FREE and BASIC users
- [ ] 80% usage amber banner shows on dashboard and generate page
- [ ] PDF export shows inline lock message for FREE and BASIC
- [ ] emailOptOut=true prevents all onboarding emails

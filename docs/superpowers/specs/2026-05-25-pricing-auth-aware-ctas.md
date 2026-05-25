# Pricing Page Auth-Aware CTAs

**Date:** 2026-05-25  
**Status:** Approved

## Problem

The pricing page currently shows static CTAs ("Start Basic", "Start Pro", etc.) that always link to `/signup?plan=X`, even when the user is already logged in. Logged-in users should instead see contextual CTAs that let them upgrade, downgrade, or see their current plan.

## Approach

Convert `app/(marketing)/pricing/page.tsx` from a pure client component into a **server component wrapper** that fetches the session and workspace plan server-side, then passes `{ currentPlan, hasSubscription }` as props down to the client component (renamed `PricingPageClient`).

This avoids an extra client-side API round-trip and prevents layout shift — matching the pattern already used in `app/(app)/settings/billing/page.tsx`.

## CTA Logic

| User state | Plan card | Button text | Action |
|---|---|---|---|
| Not logged in | Any plan | Original (e.g. "Start Pro") | Link to `/signup?plan=X` |
| Logged in, FREE plan | FREE | "Current plan" | Disabled |
| Logged in, FREE plan | Paid plan | "Upgrade to [Plan]" | POST `/api/stripe/checkout` |
| Logged in, paid plan | Current plan | "Current plan" | Disabled |
| Logged in, paid plan | Any other plan | "Upgrade/Downgrade to [Plan]" | POST `/api/stripe/portal` |
| Logged in, paid plan | FREE | "Downgrade to Free" | POST `/api/stripe/portal` |

**Upgrade vs Downgrade label:** the target plan's `monthlyPrice` compared to the current plan's determines the label.

## Components & Files Changed

### `app/(marketing)/pricing/page.tsx`
- Convert to `async` server component (no `"use client"`)
- Call `getSession()` — if session exists, load workspace via `ensureUser()` to get `plan` and `stripeSubscriptionId`
- Pass `userPlan` (e.g. `"FREE"`) and `hasSubscription` (boolean) as props to `PricingPageClient`
- If not logged in, pass `userPlan: null`

### `app/(marketing)/pricing/PricingPageClient.tsx` (new file)
- Receives `userPlan: PlanId | null` and `hasSubscription: boolean`
- Keeps all existing UI (slider, billing toggle, cards, table, FAQ)
- Replaces the `<Link href={p.cta.href}><Button>` block with a new `<PlanCTA>` component

### `components/marketing/PlanCTA.tsx` (new file)
- Props: `plan: PlanCard`, `userPlan: PlanId | null`, `hasSubscription: boolean`, `isActive: boolean`
- Renders the correct button variant:
  - **Current plan**: `<Button disabled>Current plan</Button>`
  - **Not logged in**: `<Link href={cta.href}><Button /></Link>` (existing behavior)
  - **Upgrade from FREE to paid**: calls `POST /api/stripe/checkout` with the plan id
  - **Change existing subscription**: calls `POST /api/stripe/portal` then redirects to portal URL

## API Endpoints (no changes needed)

- `POST /api/stripe/checkout` — already handles new subscriptions
- `POST /api/stripe/portal` — already handles subscription management

## Error Handling

- If the checkout/portal API call fails, show an inline error toast (use the existing toast pattern in the app)
- Loading state on the button during the async API call to prevent double-clicks

## What Does NOT Change

- The `PricingSlider`, billing toggle, comparison table, FAQ, and Enterprise form are untouched
- Non-logged-in users see exactly the same page as before
- No schema or API changes required

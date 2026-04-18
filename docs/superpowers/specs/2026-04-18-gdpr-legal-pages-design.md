# GDPR Legal Pages + Cookie Consent — Design

**Date:** 2026-04-18
**Status:** Approved, ready for implementation plan

## Goal

Make Scribtly launch-ready under UK GDPR: publish Privacy Policy, Terms of Service, and Cookie Policy, and ship a cookie consent banner that actually gates non-essential trackers before they load.

## Controller & jurisdiction

- **Data controller:** Kristiyan Tsvetanov, trading as TsvWeb
- **Contact:** support@scribtly.com
- **Governing law:** England & Wales
- **Supervisory authority:** ICO (United Kingdom)
- **No registered office address disclosed** (sole trader)

## Scope

Three public legal pages + one consent banner + a consent state API. No DPA, no separate AUP (folded into Terms). Analytics and marketing cookies are not used today — the system is built to gate them when added.

## Pages

Located in the `(marketing)` route group so they use the public layout and are indexable.

- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/cookies` — Cookie Policy

Each is a server component with static MDX-or-JSX content and a "Last updated" date. All three link each other in a small in-page nav and are linked from the marketing footer and from the signup page ("By signing up you agree to…").

### Privacy Policy contents

Covers UK GDPR Art. 13/14 requirements:

1. **Who we are** — controller + support email.
2. **What we collect:**
   - Account: email, name (via Clerk).
   - Billing: Stripe customer ID, plan, last-4 of card (held by Stripe, not us).
   - Content: scripts, clients, pipeline items, cron schedules user creates.
   - Usage: script counts, timestamps, plan usage.
   - Cookies & local storage (see Cookie Policy).
3. **Legal bases:**
   - Contract (Art. 6(1)(b)) — running the service.
   - Legitimate interest (Art. 6(1)(f)) — onboarding emails, product analytics (when enabled), fraud prevention.
   - Consent (Art. 6(1)(a)) — non-essential cookies.
   - Legal obligation (Art. 6(1)(c)) — tax/accounting records.
4. **Sub-processors:**
   - Clerk (authentication)
   - Stripe (payments)
   - Resend (transactional + lifecycle email)
   - Anthropic (AI script generation — prompts are sent, not stored for training per Anthropic's API terms)
   - Hosting provider + Postgres provider (named at launch)
5. **International transfers** — US-based processors rely on SCCs (Standard Contractual Clauses).
6. **Retention:**
   - Active account data: while account is open.
   - Deleted account: purged within 30 days, except billing records retained 6 years (UK tax law).
   - Email suppression list: indefinite (needed to honour unsubscribes).
7. **User rights (UK GDPR):** access, rectification, erasure, portability, restriction, objection, withdraw consent, complain to ICO (ico.org.uk).
8. **How to exercise rights** — email support@scribtly.com; responded to within 30 days.
9. **Children:** service not intended for under-18s.
10. **Changes to this policy:** material changes notified by email 30 days in advance.

### Terms of Service contents

1. Who we are, what Scribtly does.
2. Account eligibility — 18+, accurate info, one account per person unless on team plan.
3. Subscriptions, billing, auto-renewal, currency, taxes; Stripe as payment processor.
4. **Refunds / cancel right:** 14-day statutory right under UK Consumer Contracts Regulations 2013 for new subscribers. Right is **waived once the user generates their first script** (digital service carve-out, Reg. 37). Disclosed at checkout. After 14 days, cancellations take effect at the end of the current billing period; no pro-rata refunds.
5. **Acceptable use:** no illegal content, no spam, no CSAM, no hate speech generation, no scraping, no reselling "as human-written", no reverse-engineering, no automated abuse of the API.
6. **Intellectual property:** user owns inputs and generated outputs; Scribtly owns the platform, code, branding, and prompts.
7. **AI disclaimer:** outputs are probabilistic, may be inaccurate or repeat common phrasing; user is responsible for review before publishing.
8. Service availability — best effort, no SLA on FREE/BASIC/PRO.
9. **Termination:** user can cancel any time from billing portal; we can suspend for breach of acceptable use.
10. **Liability cap:** limited to fees paid in the 12 months preceding the claim; no indirect, consequential, or lost-profit damages. Does not exclude liability that cannot be excluded under UK law (death, personal injury, fraud).
11. Changes to terms — 30 days' email notice for material changes.
12. **Governing law:** England & Wales; courts of England have exclusive jurisdiction.

### Cookie Policy contents

Plain-English intro, then the cookie table (source of truth — every item in it must actually be set by the app):

| Name | Type | Provider | Purpose | Duration |
|---|---|---|---|---|
| `__session`, `__client`, `__clerk_*` | Strictly necessary | Clerk | Authentication & session | Session / up to 1 year |
| `__stripe_mid`, `__stripe_sid` | Strictly necessary | Stripe | Fraud prevention during checkout | 1 year / 30 min |
| `theme` | Preferences (essential) | Scribtly | Remembers dark/light mode | Persistent (localStorage) |
| `sidebar-collapsed` | Preferences (essential) | Scribtly | Sidebar UI state | Persistent (localStorage) |
| `sf_tooltip_model_seen` | Preferences (essential) | Scribtly | Hides a tooltip after first view | Persistent (localStorage) |
| `scribtly_consent` | Strictly necessary | Scribtly | Stores your cookie choice | 6 months |

Plus two placeholder sections:

- **Analytics cookies** — not currently used. When added, they will be listed here and will only be set if you grant consent.
- **Marketing cookies** — not currently used. Same rule.

Closes with: how to withdraw consent (footer "Cookie settings" link) and how to control cookies in the browser.

## Cookie consent banner

### Component

`components/consent/CookieConsent.tsx` — client component, mounted in `app/layout.tsx` so it appears on every route (marketing + app + auth).

### Behaviour

- **First visit** (no `scribtly_consent` cookie): shows a non-blocking banner pinned to the bottom of the viewport. Content: a one-sentence explanation, a link to `/cookies`, and three buttons — **Accept all**, **Reject all**, **Customize**.
- **Customize:** expands the banner in place to show three toggles:
  - Essential — forced on, disabled, labelled "Always on"
  - Analytics — off by default
  - Marketing — off by default
  - **Save preferences** button commits the choice.
- On any choice (Accept / Reject / Save), banner writes the consent cookie and animates out.
- **Re-open:** footer link "Cookie settings" (and a link from `/cookies`) calls `consent.open()` to bring the banner back so users can change their mind — required by GDPR (withdrawal must be as easy as granting).

### Consent cookie

- Name: `scribtly_consent`
- Storage: first-party cookie (not localStorage — needs to be readable server-side for future SSR gating)
- Attributes: `SameSite=Lax`, `Secure` in production, `Path=/`, `Max-Age` = 6 months
- Value (JSON, URL-encoded):
  ```json
  {
    "essential": true,
    "analytics": false,
    "marketing": false,
    "timestamp": "2026-04-18T12:34:56.000Z",
    "version": 1
  }
  ```
- **Version bump:** when we change what we collect or add a new category, bump `version`. Banner shows again to any user whose stored version is lower. This is the GDPR-compliant re-consent mechanism.

### Defaults before choice

Until the user makes a choice, non-essential cookies and trackers **must not run**. This is enforced by the consent API below — the banner existing is not enough on its own.

## Consent state API

`lib/consent.ts` + `components/consent/ConsentProvider.tsx`.

```ts
type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
};

// React hook, client-side
useConsent(): {
  consent: Consent | null;          // null = not yet chosen
  hasChosen: boolean;
  acceptAll(): void;
  rejectAll(): void;
  update(partial: Partial<Consent>): void;
  open(): void;                      // re-opens the banner
};
```

Future analytics scripts gate on this hook:

```tsx
const { consent } = useConsent();
{consent?.analytics && <Script src="https://plausible.io/js/script.js" />}
```

No rework when adding GA / Plausible / Meta pixel — only a conditional wrapper.

## Footer changes

Marketing footer (`components/marketing/Footer.tsx` if it exists — else added) gets a legal row:
**Privacy · Terms · Cookies · Cookie settings**

App footer / sign-up page also linked to `/privacy` and `/terms`.

## Signup flow

Below the signup form on `/signup`, append:
> By creating an account you agree to our [Terms](/terms) and [Privacy Policy](/privacy).

No checkbox — consent-by-signing-up is fine for contract necessity (Clerk signup flow already implies this).

## Non-goals (explicit)

- No DPA page. If a B2B customer asks, supply as PDF separately.
- No cookie-scanner / auto-blocker. No third-party trackers today, so none needed.
- No granular per-vendor toggles. Three categories (Essential / Analytics / Marketing) is standard and what users expect.
- No geo-detection to show the banner only to EU/UK users. Show to everyone — simpler, and applies the same privacy floor globally.

## Files to create / modify

**New:**
- `app/(marketing)/privacy/page.tsx`
- `app/(marketing)/terms/page.tsx`
- `app/(marketing)/cookies/page.tsx`
- `components/consent/CookieConsent.tsx`
- `components/consent/ConsentProvider.tsx`
- `lib/consent.ts`

**Modified:**
- `app/layout.tsx` — mount `<ConsentProvider>` and `<CookieConsent />`
- Marketing footer component — add legal links + "Cookie settings"
- `app/(auth)/signup/page.tsx` (or wherever the signup CTA lives) — add the consent sentence

## Open questions

None. Ready for implementation plan.

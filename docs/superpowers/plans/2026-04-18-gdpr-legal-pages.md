# GDPR Legal Pages + Cookie Consent — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan. Tasks 1–5 are independent and can run in parallel. Task 6 depends on Tasks 1 and 3. Task 7 depends on Task 1.

**Goal:** Ship UK GDPR-compliant Privacy Policy, Terms of Service, and Cookie Policy pages, plus a cookie consent banner that gates non-essential trackers via a reusable consent state API.

**Architecture:** Three static server-component pages under the existing `(marketing)` route group; a client-side `<ConsentProvider>` + `<CookieConsent />` pair mounted in the root layout; a first-party `scribtly_consent` cookie (6-month, `SameSite=Lax`) consumed via a `useConsent()` hook. No analytics or marketing scripts are wired today — the consent API is the hook point for future trackers.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, `js-cookie` (already absent — will not add a dep; use the native `document.cookie` API).

**Controller / legal:** Kristiyan Tsvetanov, trading as TsvWeb. Contact: `support@scribtly.com`. Governing law: England & Wales. Supervisory authority: ICO.

**Parallel dispatch groups:**
- **Group A (parallel):** Task 1 (consent lib), Task 2 (privacy page), Task 3 (terms page), Task 4 (cookies page), Task 5 (footer update)
- **Group B (after A):** Task 6 (provider + banner + layout mount), Task 7 (signup consent line)

---

## Task 1: Consent library + types

**Files:**
- Create: `lib/consent.ts`

- [ ] **Step 1: Create the consent utility module**

Create `lib/consent.ts` with the full contents below:

```ts
export const CONSENT_COOKIE_NAME = "scribtly_consent";
export const CONSENT_COOKIE_MAX_AGE_DAYS = 180;
export const CONSENT_VERSION = 1;

export type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
};

export function defaultConsent(): Consent {
  return {
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

export function acceptAllConsent(): Consent {
  return {
    essential: true,
    analytics: true,
    marketing: true,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

export function rejectAllConsent(): Consent {
  return defaultConsent();
}

export function parseConsent(raw: string | undefined | null): Consent | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const obj = JSON.parse(decoded);
    if (
      obj &&
      typeof obj === "object" &&
      obj.essential === true &&
      typeof obj.analytics === "boolean" &&
      typeof obj.marketing === "boolean" &&
      typeof obj.timestamp === "string" &&
      typeof obj.version === "number"
    ) {
      return obj as Consent;
    }
    return null;
  } catch {
    return null;
  }
}

export function serializeConsent(consent: Consent): string {
  return encodeURIComponent(JSON.stringify(consent));
}

export function needsReconsent(consent: Consent | null): boolean {
  if (!consent) return true;
  return consent.version < CONSENT_VERSION;
}

// Browser-only helpers
export function readConsentFromDocument(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return null;
  const value = match.substring(CONSENT_COOKIE_NAME.length + 1);
  return parseConsent(value);
}

export function writeConsentToDocument(consent: Consent): void {
  if (typeof document === "undefined") return;
  const maxAge = CONSENT_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  const parts = [
    `${CONSENT_COOKIE_NAME}=${serializeConsent(consent)}`,
    `Max-Age=${maxAge}`,
    "Path=/",
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");
  document.cookie = parts.join("; ");
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/consent.ts
git commit -m "feat(consent): add consent library with cookie read/write helpers"
```

---

## Task 2: Privacy Policy page

**Files:**
- Create: `app/(marketing)/privacy/page.tsx`

- [ ] **Step 1: Create the privacy page**

Create `app/(marketing)/privacy/page.tsx` with:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Scribtly",
  description: "How Scribtly collects, uses, and protects your personal data under UK GDPR.",
};

const LAST_UPDATED = "18 April 2026";

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-16 text-[15px] leading-relaxed">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-xs text-text-secondary dark:text-dark-muted mb-10">Last updated: {LAST_UPDATED}</p>

      <nav className="mb-10 text-sm text-text-secondary dark:text-dark-muted">
        <Link href="/privacy" className="underline mr-4">Privacy</Link>
        <Link href="/terms" className="hover:underline mr-4">Terms</Link>
        <Link href="/cookies" className="hover:underline">Cookies</Link>
      </nav>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">1. Who we are</h2>
        <p>
          Scribtly is operated by Kristiyan Tsvetanov, trading as TsvWeb ("Scribtly", "we", "us").
          We are the data controller for personal data processed through the Scribtly service.
          You can contact us at <a href="mailto:support@scribtly.com" className="text-primary underline">support@scribtly.com</a>.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">2. What we collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Account data:</strong> email address and name, supplied via our authentication provider Clerk.</li>
          <li><strong>Billing data:</strong> Stripe customer ID, subscription plan, and the last four digits of your payment card. Full card details are held by Stripe, not by us.</li>
          <li><strong>Content you create:</strong> scripts, client profiles, pipeline items, and scheduled generations you save in the app.</li>
          <li><strong>Usage data:</strong> script counts, generation timestamps, and plan usage, used to enforce plan limits and improve the service.</li>
          <li><strong>Cookies and local storage:</strong> see our <Link href="/cookies" className="text-primary underline">Cookie Policy</Link>.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">3. Legal bases for processing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Contract (Art. 6(1)(b) UK GDPR):</strong> to provide the service you sign up for.</li>
          <li><strong>Legitimate interest (Art. 6(1)(f)):</strong> onboarding emails, product analytics (when enabled), and fraud prevention.</li>
          <li><strong>Consent (Art. 6(1)(a)):</strong> non-essential cookies and marketing communications.</li>
          <li><strong>Legal obligation (Art. 6(1)(c)):</strong> accounting and tax records we are required to keep.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">4. Who we share data with</h2>
        <p>We use the following sub-processors to deliver the service:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Clerk</strong> — authentication and account management.</li>
          <li><strong>Stripe</strong> — payment processing.</li>
          <li><strong>Resend</strong> — transactional and lifecycle email.</li>
          <li><strong>Anthropic</strong> — AI script generation. Prompts are sent to the Anthropic API to generate your scripts and, per Anthropic's API terms, are not used to train their models.</li>
          <li><strong>Our hosting and database providers</strong> — to run the application and store your data.</li>
        </ul>
        <p>We do not sell your personal data.</p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">5. International transfers</h2>
        <p>
          Some of our sub-processors (including Clerk, Stripe, Resend, and Anthropic) are based in the United States.
          Transfers to the US rely on Standard Contractual Clauses approved under UK GDPR.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">6. How long we keep your data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account and content data: for as long as your account is active.</li>
          <li>After account deletion: purged within 30 days, except billing and tax records which we keep for six years as required by UK tax law.</li>
          <li>Email suppression list: kept indefinitely so we can honour unsubscribe requests.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">7. Your rights</h2>
        <p>Under UK GDPR you have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>access the personal data we hold about you;</li>
          <li>have inaccurate data corrected;</li>
          <li>request deletion of your data ("right to be forgotten");</li>
          <li>receive your data in a portable format;</li>
          <li>restrict or object to certain processing;</li>
          <li>withdraw consent at any time where we rely on it;</li>
          <li>complain to the UK Information Commissioner's Office (<a href="https://ico.org.uk" className="text-primary underline" target="_blank" rel="noreferrer noopener">ico.org.uk</a>).</li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">8. How to exercise your rights</h2>
        <p>
          Email us at <a href="mailto:support@scribtly.com" className="text-primary underline">support@scribtly.com</a>.
          We will respond within 30 days.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">9. Children</h2>
        <p>Scribtly is not intended for anyone under 18. We do not knowingly collect personal data from children.</p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">10. Changes to this policy</h2>
        <p>
          We will notify registered users by email at least 30 days before any material change to this policy takes effect.
        </p>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Verify the page renders**

Visit `http://localhost:3000/privacy` in a browser (or run `next build` and confirm no build errors for this route).

- [ ] **Step 3: Commit**

```bash
git add "app/(marketing)/privacy/page.tsx"
git commit -m "feat(legal): add privacy policy page"
```

---

## Task 3: Terms of Service page

**Files:**
- Create: `app/(marketing)/terms/page.tsx`

- [ ] **Step 1: Create the terms page**

Create `app/(marketing)/terms/page.tsx` with:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Scribtly",
  description: "The terms that govern your use of the Scribtly service.",
};

const LAST_UPDATED = "18 April 2026";

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-16 text-[15px] leading-relaxed">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-xs text-text-secondary dark:text-dark-muted mb-10">Last updated: {LAST_UPDATED}</p>

      <nav className="mb-10 text-sm text-text-secondary dark:text-dark-muted">
        <Link href="/privacy" className="hover:underline mr-4">Privacy</Link>
        <Link href="/terms" className="underline mr-4">Terms</Link>
        <Link href="/cookies" className="hover:underline">Cookies</Link>
      </nav>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">1. Who we are</h2>
        <p>
          Scribtly is operated by Kristiyan Tsvetanov, trading as TsvWeb ("Scribtly", "we", "us").
          Contact: <a href="mailto:support@scribtly.com" className="text-primary underline">support@scribtly.com</a>.
          By creating an account or using the service, you ("you") agree to these Terms.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">2. The service</h2>
        <p>
          Scribtly is a web application that helps you generate video scripts using AI. Features and limits depend on
          the plan you choose, as described on our <Link href="/pricing" className="text-primary underline">pricing page</Link>.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">3. Account eligibility</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be at least 18 years old.</li>
          <li>You must provide accurate information and keep it up to date.</li>
          <li>One account per person, unless you are on a team plan that permits additional seats.</li>
          <li>You are responsible for keeping your credentials secure and for all activity under your account.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">4. Subscriptions and billing</h2>
        <p>
          Paid plans are billed in advance on a recurring basis (monthly or annually) through our payment processor,
          Stripe. Subscriptions renew automatically until cancelled. You can cancel any time from your billing portal;
          cancellation takes effect at the end of the current billing period. Prices are shown exclusive of applicable
          taxes unless stated otherwise.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">5. Refunds and your cancellation right</h2>
        <p>
          If you are a UK consumer, you have a statutory 14-day right to cancel a new subscription under the Consumer
          Contracts (Information, Cancellation and Additional Charges) Regulations 2013.
        </p>
        <p>
          <strong>Important:</strong> because Scribtly is a digital service delivered immediately, this 14-day right is
          lost once you generate your first script. By generating a script within the 14-day window you expressly
          consent to the service starting and acknowledge that you lose your right to cancel for a refund.
        </p>
        <p>
          Outside of this statutory right we do not offer refunds for partial months, unused capacity, or plan
          downgrades. Cancellations take effect at the end of the current billing period.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">6. Acceptable use</h2>
        <p>You agree not to use Scribtly to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>generate or distribute unlawful, defamatory, harassing, or infringing content;</li>
          <li>generate sexual content involving minors or other content prohibited by law;</li>
          <li>generate content intended to deceive, including to impersonate a real person without authorisation;</li>
          <li>send spam or bulk unsolicited messages;</li>
          <li>scrape, reverse-engineer, or attempt to extract the underlying prompts, models, or infrastructure;</li>
          <li>resell generated output as guaranteed to be human-written;</li>
          <li>circumvent plan limits or security controls.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">7. Intellectual property</h2>
        <p>
          You retain ownership of the inputs you provide and, subject to these Terms and any applicable law, of the
          scripts generated for you. We retain all rights in the Scribtly platform, including our software, branding,
          prompts, and infrastructure.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">8. AI outputs</h2>
        <p>
          Generated scripts are produced by large language models and are probabilistic. Outputs may contain factual
          errors, awkward phrasing, or content similar to outputs produced for other users. You are responsible for
          reviewing and editing any output before using it publicly.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">9. Availability</h2>
        <p>
          We aim to keep the service available at all times but do not guarantee uninterrupted availability. We may
          perform maintenance or make changes to features at any time.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">10. Suspension and termination</h2>
        <p>
          You can cancel your subscription at any time from your billing portal. We may suspend or terminate your
          account if you breach these Terms, in particular the acceptable-use rules.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">11. Liability</h2>
        <p>
          To the fullest extent permitted by law, our total liability to you for any claim arising out of or relating to
          the service is limited to the fees you paid us in the 12 months preceding the claim. We are not liable for
          indirect, incidental, or consequential losses, including lost profits, lost revenue, or lost data.
        </p>
        <p>
          Nothing in these Terms limits any liability that cannot be excluded under UK law, including liability for
          death or personal injury caused by negligence, or for fraud.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">12. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. For material changes, we will give at least 30 days' notice by
          email. Continued use after the effective date constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">13. Governing law</h2>
        <p>
          These Terms are governed by the laws of England and Wales. The courts of England have exclusive jurisdiction
          over any dispute arising out of or relating to these Terms or the service.
        </p>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Verify**

Visit `http://localhost:3000/terms`.

- [ ] **Step 3: Commit**

```bash
git add "app/(marketing)/terms/page.tsx"
git commit -m "feat(legal): add terms of service page"
```

---

## Task 4: Cookie Policy page

**Files:**
- Create: `app/(marketing)/cookies/page.tsx`

- [ ] **Step 1: Create the cookies page**

Create `app/(marketing)/cookies/page.tsx` with:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { OpenCookieSettingsButton } from "@/components/consent/OpenCookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie Policy — Scribtly",
  description: "Which cookies and local-storage items Scribtly uses and why.",
};

const LAST_UPDATED = "18 April 2026";

export default function CookiesPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-16 text-[15px] leading-relaxed">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Cookie Policy</h1>
      <p className="text-xs text-text-secondary dark:text-dark-muted mb-10">Last updated: {LAST_UPDATED}</p>

      <nav className="mb-10 text-sm text-text-secondary dark:text-dark-muted">
        <Link href="/privacy" className="hover:underline mr-4">Privacy</Link>
        <Link href="/terms" className="hover:underline mr-4">Terms</Link>
        <Link href="/cookies" className="underline">Cookies</Link>
      </nav>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">What cookies are</h2>
        <p>
          Cookies are small text files that websites put on your device. We also use local storage, which works similarly
          but stays on your device until you clear it. This page lists everything Scribtly sets and why.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">Strictly necessary</h2>
        <p>
          These are required for the service to function. They do not require your consent because without them the site
          cannot work.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-border)] rounded-md">
            <thead className="bg-[var(--color-primary-tint)] text-left">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Provider</th>
                <th className="px-3 py-2">Purpose</th>
                <th className="px-3 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--color-border)]"><td className="px-3 py-2"><code>__session, __client, __clerk_*</code></td><td className="px-3 py-2">Clerk</td><td className="px-3 py-2">Authentication &amp; session</td><td className="px-3 py-2">Session – 1 year</td></tr>
              <tr className="border-t border-[var(--color-border)]"><td className="px-3 py-2"><code>__stripe_mid, __stripe_sid</code></td><td className="px-3 py-2">Stripe</td><td className="px-3 py-2">Fraud prevention during checkout</td><td className="px-3 py-2">30 min – 1 year</td></tr>
              <tr className="border-t border-[var(--color-border)]"><td className="px-3 py-2"><code>theme</code></td><td className="px-3 py-2">Scribtly</td><td className="px-3 py-2">Remembers dark/light mode</td><td className="px-3 py-2">Persistent (localStorage)</td></tr>
              <tr className="border-t border-[var(--color-border)]"><td className="px-3 py-2"><code>sidebar-collapsed</code></td><td className="px-3 py-2">Scribtly</td><td className="px-3 py-2">Sidebar UI state</td><td className="px-3 py-2">Persistent (localStorage)</td></tr>
              <tr className="border-t border-[var(--color-border)]"><td className="px-3 py-2"><code>sf_tooltip_model_seen</code></td><td className="px-3 py-2">Scribtly</td><td className="px-3 py-2">Hides a tooltip after first view</td><td className="px-3 py-2">Persistent (localStorage)</td></tr>
              <tr className="border-t border-[var(--color-border)]"><td className="px-3 py-2"><code>scribtly_consent</code></td><td className="px-3 py-2">Scribtly</td><td className="px-3 py-2">Stores your cookie choice</td><td className="px-3 py-2">6 months</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <p>
          We do not currently use analytics cookies. When we add them they will be listed here and will only be set if
          you grant consent.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">Marketing</h2>
        <p>
          We do not currently use marketing cookies. When we add them they will be listed here and will only be set if
          you grant consent.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">Changing your choice</h2>
        <p>You can change or withdraw your consent at any time:</p>
        <OpenCookieSettingsButton />
        <p className="mt-2">
          You can also block or delete cookies in your browser settings. If you block strictly necessary cookies the site
          may not work properly.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">Questions</h2>
        <p>
          Email <a href="mailto:support@scribtly.com" className="text-primary underline">support@scribtly.com</a>.
        </p>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/(marketing)/cookies/page.tsx"
git commit -m "feat(legal): add cookie policy page"
```

Note: this page imports `OpenCookieSettingsButton` which is created in Task 6. The build will fail until Task 6 is merged. That is expected — the tasks will be reviewed and merged together.

---

## Task 5: Marketing footer — add Cookies + Cookie settings links

**Files:**
- Modify: `components/layout/MarketingFooter.tsx`

- [ ] **Step 1: Replace the file contents**

Overwrite `components/layout/MarketingFooter.tsx` with:

```tsx
import Link from "next/link";
import { OpenCookieSettingsButton } from "@/components/consent/OpenCookieSettingsButton";

export function MarketingFooter() {
  return (
    <footer className="border-t-hair border-[var(--color-border)] mt-20">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-wrap gap-6 items-center justify-between text-xs text-text-secondary dark:text-dark-muted">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} Scribtly</span>
          <span className="text-[var(--color-border)]">·</span>
          <span>Made for freelancers</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/pricing" className="hover:text-primary">Pricing</Link>
          <Link href="/youtube-scripts" className="hover:text-primary">YouTube scripts</Link>
          <Link href="/tiktok-scripts" className="hover:text-primary">TikTok scripts</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy</Link>
          <Link href="/terms" className="hover:text-primary">Terms</Link>
          <Link href="/cookies" className="hover:text-primary">Cookies</Link>
          <OpenCookieSettingsButton variant="footer" />
          <Link href="/login" className="hover:text-primary">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/MarketingFooter.tsx
git commit -m "feat(legal): link cookie policy and settings from marketing footer"
```

Note: depends on `OpenCookieSettingsButton` from Task 6. See Task 4 note.

---

## Task 6: Consent provider, banner, settings button, and layout mount

**Files:**
- Create: `components/consent/ConsentProvider.tsx`
- Create: `components/consent/CookieConsent.tsx`
- Create: `components/consent/OpenCookieSettingsButton.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `ConsentProvider.tsx`**

Create `components/consent/ConsentProvider.tsx` with:

```tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Consent,
  acceptAllConsent,
  defaultConsent,
  needsReconsent,
  readConsentFromDocument,
  rejectAllConsent,
  writeConsentToDocument,
} from "@/lib/consent";

type ConsentCtx = {
  consent: Consent | null;
  hasChosen: boolean;
  bannerOpen: boolean;
  acceptAll(): void;
  rejectAll(): void;
  update(partial: Partial<Pick<Consent, "analytics" | "marketing">>): void;
  open(): void;
  close(): void;
};

const Ctx = createContext<ConsentCtx | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const existing = readConsentFromDocument();
    if (!existing || needsReconsent(existing)) {
      setConsent(null);
      setBannerOpen(true);
    } else {
      setConsent(existing);
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Consent) => {
    writeConsentToDocument(next);
    setConsent(next);
    setBannerOpen(false);
  }, []);

  const acceptAll = useCallback(() => persist(acceptAllConsent()), [persist]);
  const rejectAll = useCallback(() => persist(rejectAllConsent()), [persist]);

  const update = useCallback(
    (partial: Partial<Pick<Consent, "analytics" | "marketing">>) => {
      const base = consent ?? defaultConsent();
      persist({
        ...base,
        ...partial,
        essential: true,
        timestamp: new Date().toISOString(),
      });
    },
    [consent, persist],
  );

  const open = useCallback(() => setBannerOpen(true), []);
  const close = useCallback(() => setBannerOpen(false), []);

  const value = useMemo<ConsentCtx>(
    () => ({
      consent,
      hasChosen: consent !== null,
      bannerOpen: hydrated && bannerOpen,
      acceptAll,
      rejectAll,
      update,
      open,
      close,
    }),
    [consent, hydrated, bannerOpen, acceptAll, rejectAll, update, open, close],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConsent(): ConsentCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
```

- [ ] **Step 2: Create `CookieConsent.tsx`**

Create `components/consent/CookieConsent.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useConsent } from "./ConsentProvider";

export function CookieConsent() {
  const { bannerOpen, consent, acceptAll, rejectAll, update, close } = useConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  if (!bannerOpen) return null;

  const save = () => update({ analytics, marketing });

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4"
    >
      <div className="max-w-3xl mx-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface,white)] dark:bg-dark-elevated shadow-lg p-5 text-sm">
        {!showDetails ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-text-secondary dark:text-dark-muted">
              We use cookies to run Scribtly and, with your permission, to understand how it's used.{" "}
              <Link href="/cookies" className="underline text-primary">Learn more</Link>.
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)]"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)]"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">Cookie preferences</h2>
                <p className="text-text-secondary dark:text-dark-muted text-xs mt-1">
                  Essential cookies keep the site working. Others are opt-in.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="text-text-secondary dark:text-dark-muted hover:text-primary"
              >
                ×
              </button>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between gap-4 border border-[var(--color-border)] rounded-md px-3 py-2">
                <div>
                  <div className="font-medium">Essential</div>
                  <div className="text-xs text-text-secondary dark:text-dark-muted">
                    Authentication, payments, your preferences.
                  </div>
                </div>
                <span className="text-xs text-text-secondary dark:text-dark-muted">Always on</span>
              </li>
              <li className="flex items-center justify-between gap-4 border border-[var(--color-border)] rounded-md px-3 py-2">
                <div>
                  <div className="font-medium">Analytics</div>
                  <div className="text-xs text-text-secondary dark:text-dark-muted">
                    Usage statistics to help us improve Scribtly.
                  </div>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <span className="w-10 h-6 bg-neutral-bg dark:bg-dark-elevated border border-[var(--color-border)] rounded-full relative peer-checked:bg-[var(--color-primary)] transition-colors">
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
                  </span>
                </label>
              </li>
              <li className="flex items-center justify-between gap-4 border border-[var(--color-border)] rounded-md px-3 py-2">
                <div>
                  <div className="font-medium">Marketing</div>
                  <div className="text-xs text-text-secondary dark:text-dark-muted">
                    Measure the effectiveness of our ads and communications.
                  </div>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                  <span className="w-10 h-6 bg-neutral-bg dark:bg-dark-elevated border border-[var(--color-border)] rounded-full relative peer-checked:bg-[var(--color-primary)] transition-colors">
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
                  </span>
                </label>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)]"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={save}
                className="px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `OpenCookieSettingsButton.tsx`**

Create `components/consent/OpenCookieSettingsButton.tsx` with:

```tsx
"use client";

import { useConsent } from "./ConsentProvider";

export function OpenCookieSettingsButton({ variant = "inline" }: { variant?: "inline" | "footer" }) {
  const { open } = useConsent();
  if (variant === "footer") {
    return (
      <button type="button" onClick={open} className="hover:text-primary">
        Cookie settings
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={open}
      className="inline-flex items-center px-3 py-1.5 rounded-md border border-[var(--color-border)] text-sm hover:bg-[var(--color-primary-tint)]"
    >
      Open cookie settings
    </button>
  );
}
```

- [ ] **Step 4: Mount provider + banner in root layout**

Edit `app/layout.tsx`. Replace its contents with:

```tsx
import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieConsent } from "@/components/consent/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Scribtly — AI video scripts for freelancers",
  description:
    "Generate YouTube, TikTok, and Reels scripts in your client's exact voice — in under 60 seconds.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://scribtly.com"),
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${serif.variable}`}>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className="font-sans">
          <ConsentProvider>
            {children}
            <CookieConsent />
          </ConsentProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

- [ ] **Step 5: Type-check**

Run:

```
npx tsc --noEmit
```

Expected: no new type errors from the consent files.

- [ ] **Step 6: Smoke test in browser**

1. Run `npm run dev`.
2. Clear cookies for `localhost:3000`.
3. Visit `http://localhost:3000/` — banner appears at the bottom.
4. Click **Accept all** — banner dismisses. DevTools → Application → Cookies → confirm `scribtly_consent` exists with `analytics: true, marketing: true, version: 1`.
5. Visit `/cookies` — click **Open cookie settings** — banner re-opens with current values.
6. Toggle analytics off, click **Save preferences** — cookie value updates.
7. Click **Reject all** on a fresh session — cookie stores `analytics: false, marketing: false`.

- [ ] **Step 7: Commit**

```bash
git add components/consent app/layout.tsx
git commit -m "feat(consent): add cookie consent banner, provider, and settings button"
```

---

## Task 7: Signup consent line

**Files:**
- Modify: `app/(auth)/signup/[[...rest]]/page.tsx`

- [ ] **Step 1: Read the existing page**

Read `app/(auth)/signup/[[...rest]]/page.tsx` to see where to append the consent line. Look for the closing container around the Clerk `<SignUp />` component.

- [ ] **Step 2: Add the consent sentence**

Add, directly below the `<SignUp />` component (still inside its centering container), this block:

```tsx
<p className="mt-4 text-center text-xs text-text-secondary dark:text-dark-muted max-w-sm">
  By creating an account you agree to our{" "}
  <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
  <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
</p>
```

If `Link` is not already imported in the file, add:

```tsx
import Link from "next/link";
```

- [ ] **Step 3: Verify**

Run `npm run dev`, visit `/signup`, confirm the line appears under the form and both links work.

- [ ] **Step 4: Commit**

```bash
git add "app/(auth)/signup/[[...rest]]/page.tsx"
git commit -m "feat(legal): link terms and privacy from signup page"
```

---

## Final verification

- [ ] Run `npx tsc --noEmit` — should pass.
- [ ] Run `npm run build` — should succeed.
- [ ] Manually visit `/privacy`, `/terms`, `/cookies`, `/` (clear cookies first), `/signup`. Confirm:
  - All three legal pages render.
  - Banner appears on first visit only.
  - "Cookie settings" in the footer reopens the banner.
  - Accept/Reject/Save each write a valid `scribtly_consent` cookie.
  - Signup page shows the Terms/Privacy line.

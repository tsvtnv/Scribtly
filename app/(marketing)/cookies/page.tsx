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

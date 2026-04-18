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

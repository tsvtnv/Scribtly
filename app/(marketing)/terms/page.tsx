import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Scribtly service. Read about subscriptions, acceptable use, intellectual property, and your cancellation rights.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "article",
    url: "/terms",
    siteName: "Scribtly",
    title: "Terms of Service · Scribtly",
    description: "The terms that govern your use of the Scribtly service — subscriptions, acceptable use, and cancellation rights.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Scribtly Terms of Service" }],
  },
  twitter: { card: "summary", title: "Terms of Service · Scribtly", description: "The terms that govern your use of the Scribtly service — subscriptions, acceptable use, and cancellation rights." },
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
          Contact: <a href="mailto:support@scribtly.com" className="text-primary underline">support&#64;scribtly&#46;com</a>.
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

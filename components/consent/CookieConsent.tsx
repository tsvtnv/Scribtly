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

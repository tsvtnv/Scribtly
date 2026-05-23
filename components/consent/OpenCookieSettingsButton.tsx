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

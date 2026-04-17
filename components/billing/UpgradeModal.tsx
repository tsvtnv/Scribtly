"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const REASON_HEADLINES: Record<string, string> = {
  free_limit: "You've used all 3 free scripts",
  platform_locked: "This platform is a Pro feature",
  extras_locked: "Extras are a Pro feature",
  model_locked: "Sonnet and Opus are Pro features",
  pdf_locked: "PDF export is a Pro feature",
  client_limit: "Free plan is limited to 1 client",
  default: "Upgrade to unlock this feature",
};

const PRO_FEATURES = [
  "Unlimited scripts",
  "All 5 platforms (YouTube, TikTok, Reels, LinkedIn, Podcast)",
  "Unlimited clients",
  "All extras (titles, hashtags, chapters, etc.)",
  "Claude Sonnet and Opus generation",
  "PDF export",
];

const AGENCY_FEATURES = [
  "Everything in Pro",
  "5 team members",
  "Bulk generation",
  "Priority support",
];

export function UpgradeModal({ open, onClose, reason }: { open: boolean; onClose: () => void; reason?: string }) {
  const toast = useToast();
  const [busy, setBusy] = useState<"PRO" | "AGENCY" | null>(null);
  const headline = REASON_HEADLINES[reason || ""] || REASON_HEADLINES.default;

  async function upgrade(plan: "PRO" | "AGENCY") {
    setBusy(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const body = await res.json();
      if (!res.ok || !body.url) {
        toast.push(body.error || "Checkout failed", "error");
        return;
      }
      window.location.href = body.url;
    } catch (err: any) {
      toast.push(err.message || "Checkout failed", "error");
    } finally {
      setBusy(null);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={headline} maxWidth="lg">
      <div className="space-y-4">
        <p className="text-sm text-text-secondary dark:text-dark-muted">
          Upgrade to keep generating, unlock every platform, and work with unlimited clients.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border-hair border-[var(--color-border)] rounded-md p-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-semibold">Pro</h3>
              <div className="text-lg font-bold">
                £29<span className="text-xs font-normal text-text-secondary">/mo</span>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs mb-4">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-1.5">
                  <Check size={12} className="text-success mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button fullWidth onClick={() => upgrade("PRO")} loading={busy === "PRO"}>
              Upgrade to Pro
            </Button>
          </div>

          <div className="border-hair border-primary/40 rounded-md p-4 bg-primary/5">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-semibold">Agency</h3>
              <div className="text-lg font-bold">
                £79<span className="text-xs font-normal text-text-secondary">/mo</span>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs mb-4">
              {AGENCY_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-1.5">
                  <Check size={12} className="text-success mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button fullWidth variant="secondary" onClick={() => upgrade("AGENCY")} loading={busy === "AGENCY"}>
              Upgrade to Agency
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

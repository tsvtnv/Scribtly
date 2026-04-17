"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { Platform } from "@prisma/client";

const PLATFORMS: Platform[] = ["YOUTUBE", "TIKTOK", "REELS", "LINKEDIN", "PODCAST"];

interface ClientOption {
  id: string;
  name: string;
  niche: string;
  targetAudience: string;
  primaryPlatform: Platform;
}

interface Props {
  clients: ClientOption[];
}

export function NewCronScheduleForm({ clients }: Props) {
  const router = useRouter();
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [platform, setPlatform] = useState<Platform>("YOUTUBE");
  const [topicTemplate, setTopicTemplate] = useState(
    "A practical tip about {{niche}} for {{targetAudience}}"
  );
  const [frequency, setFrequency] = useState<"daily" | "weekly">("weekly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-set platform from selected client
  function handleClientChange(id: string) {
    setClientId(id);
    const client = clients.find((c) => c.id === id);
    if (client) setPlatform(client.primaryPlatform);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/cron/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, platform, topicTemplate, frequency }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create schedule");
        return;
      }
      router.push("/settings/cron");
      router.refresh();
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  if (clients.length === 0) {
    return (
      <Card>
        <p className="text-sm text-text-secondary dark:text-dark-muted">
          You need at least one client before creating a cron schedule.{" "}
          <a href="/clients" className="text-primary hover:underline">
            Create a client →
          </a>
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Client</label>
          <select
            value={clientId}
            onChange={(e) => handleClientChange(e.target.value)}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Topic template */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Topic template</label>
          <Input
            value={topicTemplate}
            onChange={(e) => setTopicTemplate(e.target.value)}
            placeholder="A tip about {{niche}} for {{targetAudience}}"
            required
          />
          <p className="mt-1 text-xs text-text-secondary dark:text-dark-muted">
            Use <code className="bg-[var(--color-surface-raised,#f4f4f4)] dark:bg-white/10 px-1 rounded">{"{{niche}}"}</code> and{" "}
            <code className="bg-[var(--color-surface-raised,#f4f4f4)] dark:bg-white/10 px-1 rounded">{"{{targetAudience}}"}</code> as placeholders.
          </p>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Frequency</label>
          <div className="flex gap-3">
            {(["daily", "weekly"] as const).map((f) => (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={f}
                  checked={frequency === f}
                  onChange={() => setFrequency(f)}
                  className="accent-[var(--color-primary)]"
                />
                <span className="text-sm capitalize">{f}</span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-medium bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create schedule"}
          </button>
          <a
            href="/settings/cron"
            className="px-4 py-2 rounded-md text-sm font-medium border border-[var(--color-border)] hover:bg-[var(--color-primary-tint)] transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </Card>
  );
}

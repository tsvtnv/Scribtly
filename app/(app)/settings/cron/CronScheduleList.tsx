"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { CronSchedule, Platform } from "@prisma/client";

interface ScheduleWithClient extends CronSchedule {
  client: { id: string; name: string };
}

interface Props {
  schedules: ScheduleWithClient[];
}

function formatDate(date: Date | null): string {
  if (!date) return "Never";
  return new Date(date).toLocaleString();
}

function PlatformBadge({ platform }: { platform: Platform }) {
  const colors: Record<Platform, string> = {
    YOUTUBE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    TIKTOK: "bg-black/10 text-black dark:bg-white/10 dark:text-white",
    REELS: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    LINKEDIN: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    PODCAST: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colors[platform]}`}>
      {platform}
    </span>
  );
}

export function CronScheduleList({ schedules: initial }: Props) {
  const [schedules, setSchedules] = useState(initial);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleToggle(id: string) {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/cron/schedules/${id}/toggle`, { method: "POST" });
      if (res.ok) {
        const { active } = await res.json();
        setSchedules((prev) =>
          prev.map((s) => (s.id === id ? { ...s, active } : s))
        );
      }
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this cron schedule?")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/cron/schedules/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSchedules((prev) => prev.filter((s) => s.id !== id));
      }
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-3">
      {schedules.map((schedule) => (
        <Card key={schedule.id}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{schedule.client.name}</span>
                <PlatformBadge platform={schedule.platform} />
                <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--color-surface-raised,#f4f4f4)] dark:bg-white/10 text-text-secondary dark:text-dark-muted capitalize">
                  {schedule.frequency}
                </span>
              </div>
              <p className="text-xs text-text-secondary dark:text-dark-muted truncate max-w-md">
                {schedule.topicTemplate}
              </p>
              <p className="text-xs text-text-secondary dark:text-dark-muted">
                Last run: {formatDate(schedule.lastRunAt)}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Active toggle */}
              <button
                onClick={() => handleToggle(schedule.id)}
                disabled={loadingId === schedule.id}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
                  schedule.active ? "bg-[var(--color-primary)]" : "bg-gray-300 dark:bg-gray-600"
                }`}
                title={schedule.active ? "Disable" : "Enable"}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    schedule.active ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(schedule.id)}
                disabled={loadingId === schedule.id}
                className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

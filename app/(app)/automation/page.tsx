"use client";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface Log {
  id: string; taskType: string; status: string; result: string | null; startedAt: string;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  COMPLETED: { bg: "rgba(34,197,94,0.1)", color: "#22c55e" },
  EXECUTING: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  FAILED: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
};

export default function AutomationPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const load = () => fetch("/api/automation").then(r => r.json()).then(setLogs);
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Automation</h1>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--bg-subtle)" }}>
            <tr>
              {["Task","Status","Result","Started"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center" style={{ color: "var(--text-muted)" }}>
                No automation tasks yet. Activate a campaign to start.
              </td></tr>
            )}
            {logs.map((log, i) => {
              const style = STATUS_STYLE[log.status] ?? { bg: "transparent", color: "var(--text-muted)" };
              return (
                <tr key={log.id} style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}>
                  <td className="px-4 py-3">
                    <code className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}>
                      {log.taskType.toLowerCase().replace(/_/g, "-")}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded"
                      style={{ background: style.bg, color: style.color }}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <span className="truncate block text-xs" style={{ color: "var(--text-muted)" }}>
                      {log.result ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatDistanceToNow(new Date(log.startedAt), { addSuffix: true })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

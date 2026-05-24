import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Activity, Cpu, MemoryStick, Clock } from "lucide-react";

export const metadata = {
  title: "Page not found — Scribtly",
};

interface StatusData {
  ok: boolean;
  uptime: { system: number };
  cpu: { loadPercent: number };
  memory: { usedPercent: number };
}

async function getStatus(): Promise<StatusData | null> {
  try {
    const res = await fetch("https://api.tsvweb.com/api/public/status", {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  if (d > 0) return `${d}d ${h}h`;
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

function StatusBar({ value, warn = 70, danger = 90 }: { value: number; warn?: number; danger?: number }) {
  const color = value >= danger ? "bg-red-500" : value >= warn ? "bg-yellow-400" : "bg-emerald-500";
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10">
      <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export default async function NotFound() {
  const status = await getStatus();

  const overallOk = status && status.cpu.loadPercent < 90 && status.memory.usedPercent < 90;
  const dotColor = !status ? "bg-gray-400" : overallOk ? "bg-emerald-500" : "bg-yellow-400";
  const statusLabel = !status ? "Status unavailable" : overallOk ? "All systems operational" : "Elevated load";

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="relative max-w-md w-full text-center">
        {/* Background orbs */}
        <div className="absolute top-[-80px] left-[-60px] w-[280px] h-[280px] rounded-full bg-primary/8 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[200px] h-[200px] rounded-full bg-primary/6 blur-[70px] pointer-events-none" />

        <div className="relative">
          <p className="text-[120px] font-bold leading-none text-primary/15 select-none">
            404
          </p>
          <div className="mt-[-20px]">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
              Page not found
            </h1>
            <p className="text-sm text-text-secondary dark:text-dark-muted leading-relaxed mb-6">
              The page you're looking for doesn't exist or has been moved.
              If something looks broken, check the status below.
            </p>

            {/* Status embed */}
            <div className="mb-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-left">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${dotColor} shadow-[0_0_6px_currentColor]`} />
                  <span className="text-xs font-medium">{statusLabel}</span>
                </div>
                <a
                  href="https://status.tsvweb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-text-secondary dark:text-dark-muted hover:text-primary transition-colors"
                >
                  status.tsvweb.com ↗
                </a>
              </div>

              {status ? (
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary dark:text-dark-muted">
                      <Cpu size={10} /> CPU
                    </div>
                    <StatusBar value={status.cpu.loadPercent} />
                    <p className="text-xs font-medium">{status.cpu.loadPercent}%</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary dark:text-dark-muted">
                      <MemoryStick size={10} /> RAM
                    </div>
                    <StatusBar value={status.memory.usedPercent} />
                    <p className="text-xs font-medium">{status.memory.usedPercent}%</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary dark:text-dark-muted">
                      <Clock size={10} /> Uptime
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10">
                      <div className="h-full w-full rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs font-medium">{formatUptime(status.uptime.system)}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-text-secondary dark:text-dark-muted">Could not reach API.</p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button size="lg" className="shadow-[0_12px_35px_rgba(127,119,221,0.25)]">
                  Go home <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
              <a
                href="https://status.tsvweb.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <Activity size={14} />
                  System status
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

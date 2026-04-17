"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Platform } from "@prisma/client";
import { X, ChevronDown, ChevronRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PlatformBadge } from "@/components/ui/Badge";
import { ScriptOutput } from "@/components/script/ScriptOutput";
import { wordCount } from "@/lib/utils";

interface Job {
  clientId: string;
  platform: Platform;
  topic: string;
  duration: string;
  hookStyle?: string;
  extraOutputs?: string[];
  model?: string;
}

interface JobState {
  id: string;
  job: Job;
  status: "queued" | "streaming" | "done" | "error";
  text: string;
  error?: string;
  scriptId?: string;
  expanded: boolean;
}

const MAX_CONCURRENCY = 3;

export function BulkProgressDrawer({
  open,
  onClose,
  jobs,
  onAllDone,
}: {
  open: boolean;
  onClose: () => void;
  jobs: Job[];
  onAllDone?: () => void;
}) {
  const [states, setStates] = useState<JobState[]>(() =>
    jobs.map((j, i) => ({ id: `${Date.now()}-${i}`, job: j, status: "queued", text: "", expanded: false }))
  );
  const startedRef = useRef(false);

  useEffect(() => {
    setStates(jobs.map((j, i) => ({ id: `${Date.now()}-${i}`, job: j, status: "queued", text: "", expanded: false })));
    startedRef.current = false;
  }, [jobs]);

  useEffect(() => {
    if (!open || startedRef.current || states.length === 0) return;
    startedRef.current = true;
    void runAll();

  }, [open]);

  async function runOne(idx: number) {
    const s = states[idx];
    if (!s) return;
    setStates((prev) => prev.map((x, i) => (i === idx ? { ...x, status: "streaming" } : x)));

    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s.job),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStates((prev) => prev.map((x, i) => (i === idx ? { ...x, status: "error", error: body.error || `${res.status}` } : x)));
        return;
      }
      if (!res.body) {
        setStates((prev) => prev.map((x, i) => (i === idx ? { ...x, status: "error", error: "no body" } : x)));
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const localBuf = buf;
        setStates((prev) => prev.map((x, i) => (i === idx ? { ...x, text: localBuf } : x)));
      }
      // persist
      const saveRes = await fetch("/api/scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: s.job.clientId,
          title: s.job.topic.slice(0, 60),
          topic: s.job.topic,
          platform: s.job.platform,
          duration: s.job.duration,
          hookStyle: s.job.hookStyle,
          content: buf,
          wordCount: wordCount(buf),
        }),
      });
      const saveBody = saveRes.ok ? await saveRes.json() : null;
      setStates((prev) =>
        prev.map((x, i) => (i === idx ? { ...x, status: "done", scriptId: saveBody?.script?.id } : x))
      );
    } catch (err: any) {
      setStates((prev) => prev.map((x, i) => (i === idx ? { ...x, status: "error", error: err.message } : x)));
    }
  }

  async function runAll() {
    const indices = states.map((_, i) => i);
    const queue = [...indices];
    async function worker() {
      while (queue.length > 0) {
        const next = queue.shift();
        if (next === undefined) break;
        await runOne(next);
      }
    }
    const workers = Array.from({ length: Math.min(MAX_CONCURRENCY, queue.length) }, () => worker());
    await Promise.all(workers);
    onAllDone?.();
  }

  function toggle(i: number) {
    setStates((prev) => prev.map((x, idx) => (idx === i ? { ...x, expanded: !x.expanded } : x)));
  }

  if (!open) return null;
  const doneCount = states.filter((s) => s.status === "done" || s.status === "error").length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg h-full bg-[var(--color-surface)] border-l-hair border-[var(--color-border)] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b-hair border-[var(--color-border)]">
          <div>
            <h2 className="font-semibold">Bulk generation</h2>
            <p className="text-xs text-text-secondary dark:text-dark-muted">{doneCount} of {states.length} complete</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-[var(--color-primary-tint)]">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {states.map((s, i) => (
            <div key={s.id} className="border-hair border-[var(--color-border)] rounded-md">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <PlatformBadge platform={s.job.platform} />
                  <span className="text-sm truncate">{s.job.topic}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {s.status === "queued" && <span className="text-[10px] uppercase text-text-secondary">queued</span>}
                  {s.status === "streaming" && <Loader2 size={14} className="animate-spin text-primary" />}
                  {s.status === "done" && <CheckCircle2 size={14} className="text-success" />}
                  {s.status === "error" && <AlertCircle size={14} className="text-danger" />}
                  {s.expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
              </button>
              {s.expanded ? (
                <div className="px-3 pb-3 border-t-hair border-[var(--color-border)]">
                  {s.error ? (
                    <div className="text-xs text-danger py-2">{s.error}</div>
                  ) : (
                    <ScriptOutput text={s.text} isStreaming={s.status === "streaming"} className="max-h-72 mt-2" />
                  )}
                  {s.scriptId ? (
                    <Link href={`/scripts/${s.scriptId}`} className="inline-block mt-2 text-xs text-primary hover:underline">
                      Open in library →
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t-hair border-[var(--color-border)] flex items-center justify-between">
          <Link href="/scripts" className="text-sm text-primary hover:underline">
            Open library
          </Link>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

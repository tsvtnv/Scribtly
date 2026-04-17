"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Client, Plan, Platform } from "@prisma/client";
import { GenerateForm, type GeneratePayload } from "@/components/generate/GenerateForm";
import { GenerateBulkForm, type BulkRow } from "@/components/generate/GenerateBulkForm";
import { BulkProgressDrawer } from "@/components/generate/BulkProgressDrawer";
import { ScriptOutput } from "@/components/script/ScriptOutput";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { useScriptStream } from "@/hooks/useScriptStream";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { Copy, FileDown, Library, RotateCcw } from "lucide-react";
import { canBulkGenerate, canExportPDF } from "@/lib/planLimits";
import { wordCount } from "@/lib/utils";

export function GeneratePageClient({
  clients,
  plan,
  scriptCount,
}: {
  clients: Client[];
  plan: Plan;
  scriptCount: number;
}) {
  const router = useRouter();
  const toast = useToast();
  const stream = useScriptStream();
  const [payload, setPayload] = useState<GeneratePayload | null>(null);
  const [savedScriptId, setSavedScriptId] = useState<string | null>(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<string>("default");
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [bulkRows, setBulkRows] = useState<BulkRow[] | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);
  const savedRef = useRef(false);
  const bulkAllowed = canBulkGenerate({ plan });

  // Show pre-emptive upgrade warning at 2/3 used
  useEffect(() => {
    if (plan === "FREE" && scriptCount === 2 && !upgradeOpen) {
      toast.push("You've used 2 of 3 free scripts. Upgrade for unlimited.", "info");
    }
  }, [plan, scriptCount, upgradeOpen, toast]);

  // Handle stream errors → upgrade modal
  useEffect(() => {
    if (stream.error?.code === "upgrade_required") {
      setUpgradeReason(stream.error.reason || "default");
      setUpgradeOpen(true);
    }
  }, [stream.error]);

  // Auto-save when stream completes
  useEffect(() => {
    if (stream.done && !savedRef.current && payload && stream.text && !stream.error) {
      savedRef.current = true;
      void (async () => {
        const title = payload.topic.slice(0, 60);
        const res = await fetch("/api/scripts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId: payload.clientId,
            title,
            topic: payload.topic,
            platform: payload.platform,
            duration: payload.duration,
            hookStyle: payload.hookStyle,
            content: stream.text,
            wordCount: wordCount(stream.text),
          }),
        });
        if (res.ok) {
          const body = await res.json();
          setSavedScriptId(body.script.id);
          toast.push("Script saved to library", "success");
          router.refresh();
        } else {
          toast.push("Failed to save script", "error");
        }
      })();
    }
  }, [stream.done, stream.text, stream.error, payload, toast, router]);

  function handleSubmit(p: GeneratePayload) {
    savedRef.current = false;
    setSavedScriptId(null);
    setPayload(p);
    void stream.start(p);
  }

  function handleBulkSubmit(clientId: string, rows: BulkRow[], shared: { hookStyle?: string; extras?: string[] }) {
    const merged = rows.map((r) => ({
      ...r,
      clientId,
      hookStyle: shared.hookStyle,
      extraOutputs: shared.extras,
    }));
    setBulkRows(merged as any);
    setBulkOpen(true);
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(stream.text);
      toast.push("Copied to clipboard", "success");
    } catch {
      toast.push("Copy failed", "error");
    }
  }

  function regenerate() {
    if (!payload) return;
    handleSubmit(payload);
  }

  function onLockedPlatform(p: Platform) {
    setUpgradeReason("platform_locked");
    setUpgradeOpen(true);
    void p;
  }

  function onLockedExtras() {
    setUpgradeReason("extras_locked");
    setUpgradeOpen(true);
  }

  return (
    <>
      {bulkAllowed ? (
        <div className="inline-flex items-center gap-1 mb-4 p-1 rounded-md bg-[var(--color-surface)] border-hair border-[var(--color-border)]">
          <button
            onClick={() => setMode("single")}
            className={`px-3 py-1 text-xs rounded-sm ${mode === "single" ? "bg-primary text-white" : "text-text-secondary"}`}
          >
            Single
          </button>
          <button
            onClick={() => setMode("bulk")}
            className={`px-3 py-1 text-xs rounded-sm ${mode === "bulk" ? "bg-primary text-white" : "text-text-secondary"}`}
          >
            Bulk
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {mode === "single" ? (
            <GenerateForm
              clients={clients}
              workspacePlan={plan}
              onSubmit={handleSubmit}
              isStreaming={stream.isStreaming}
              onLockedPlatform={onLockedPlatform}
              onLockedExtras={onLockedExtras}
            />
          ) : (
            <GenerateBulkForm
              clients={clients}
              workspacePlan={plan}
              onSubmit={handleBulkSubmit}
              onLockedExtras={onLockedExtras}
            />
          )}
        </div>

        {mode === "single" ? (
          <div className="lg:sticky lg:top-6 lg:self-start">
            <Card className="min-h-[500px] flex flex-col">
              <ScriptOutput
                text={stream.text}
                isStreaming={stream.isStreaming}
                className="flex-1 max-h-[70vh]"
                empty={
                  <span>
                    Your script will stream in here once you hit Generate.
                  </span>
                }
              />

              {stream.done && stream.text && !stream.error ? (
                <div className="mt-4 pt-4 border-t-hair border-[var(--color-border)] flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" onClick={copyText}>
                    <Copy size={14} /> Copy
                  </Button>
                  {savedScriptId ? (
                    <Link href={`/scripts/${savedScriptId}`}>
                      <Button size="sm" variant="secondary">
                        <Library size={14} /> Open in library
                      </Button>
                    </Link>
                  ) : null}
                  {savedScriptId && canExportPDF({ plan }) ? (
                    <a href={`/api/export/pdf/${savedScriptId}`} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="secondary">
                        <FileDown size={14} /> PDF
                      </Button>
                    </a>
                  ) : null}
                  <Button size="sm" variant="ghost" onClick={regenerate}>
                    <RotateCcw size={14} /> Regenerate
                  </Button>
                </div>
              ) : null}

              {stream.error && stream.error.code !== "upgrade_required" ? (
                <div className="mt-4 text-xs text-danger">{stream.error.message}</div>
              ) : null}
            </Card>
          </div>
        ) : null}
      </div>

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} reason={upgradeReason} />
      {bulkRows ? (
        <BulkProgressDrawer
          open={bulkOpen}
          onClose={() => setBulkOpen(false)}
          jobs={bulkRows as any}
          onAllDone={() => router.refresh()}
        />
      ) : null}
    </>
  );
}

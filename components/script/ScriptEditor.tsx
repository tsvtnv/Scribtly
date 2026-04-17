"use client";

import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { ScriptOutput } from "./ScriptOutput";
import { cn, wordCount } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function ScriptEditor({
  scriptId,
  initialContent,
  onChange,
}: {
  scriptId: string;
  initialContent: string;
  onChange?: (content: string) => void;
}) {
  const [content, setContent] = useState(initialContent);
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [savingState, setSavingState] = useState<"idle" | "saving" | "saved">("idle");
  const toast = useToast();
  const dirtyRef = useRef(false);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  async function save() {
    if (!dirtyRef.current) return;
    dirtyRef.current = false;
    setSavingState("saving");
    const res = await fetch(`/api/scripts/${scriptId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      setSavingState("saved");
      setTimeout(() => setSavingState("idle"), 1500);
      onChange?.(content);
    } else {
      setSavingState("idle");
      toast.push("Save failed", "error");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex p-1 rounded-md bg-[var(--color-surface)] border-hair border-[var(--color-border)]">
          <button
            onClick={() => setMode("preview")}
            className={cn("px-3 py-1 text-xs rounded-sm", mode === "preview" ? "bg-primary text-white" : "text-text-secondary")}
          >
            Preview
          </button>
          <button
            onClick={() => setMode("edit")}
            className={cn("px-3 py-1 text-xs rounded-sm", mode === "edit" ? "bg-primary text-white" : "text-text-secondary")}
          >
            Edit
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs text-text-secondary dark:text-dark-muted">
          <span>{wordCount(content)} words</span>
          {savingState === "saving" ? <span>Saving…</span> : savingState === "saved" ? <span className="text-success">Saved</span> : null}
        </div>
      </div>

      {mode === "preview" ? (
        <div className="rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <ScriptOutput text={content} />
        </div>
      ) : (
        <Textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            dirtyRef.current = true;
          }}
          onBlur={save}
          className="font-serif text-[15px] min-h-[500px] leading-relaxed"
        />
      )}
    </div>
  );
}

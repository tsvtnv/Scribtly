"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [editing, setEditing] = useState(false);
  const [savingState, setSavingState] = useState<"idle" | "saving" | "saved">("idle");
  const toast = useToast();
  const dirtyRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  useEffect(() => {
    if (editing) textareaRef.current?.focus();
  }, [editing]);

  const save = useCallback(async () => {
    if (!dirtyRef.current) {
      setEditing(false);
      return;
    }
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
    setEditing(false);
  }, [content, scriptId, onChange, toast]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      save();
    }
  }

  const SHARED = "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-serif text-[15px] leading-relaxed min-h-[500px]";

  return (
    <div>
      <div className="flex items-center justify-between mb-3 min-h-[24px]">
        <span className="text-xs text-text-secondary dark:text-dark-muted">
          {wordCount(content)} words
        </span>
        <span className="text-xs text-text-secondary dark:text-dark-muted">
          {editing
            ? "Click outside to save"
            : savingState === "saving"
            ? "Saving…"
            : savingState === "saved"
            ? <span className="text-success">Saved</span>
            : null}
        </span>
      </div>

      {editing ? (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            dirtyRef.current = true;
          }}
          onBlur={save}
          onKeyDown={handleKeyDown}
          className={cn(SHARED, "resize-none")}
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setEditing(true)}
          onKeyDown={(e) => e.key === "Enter" && setEditing(true)}
          className={cn(
            SHARED,
            "cursor-text transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
          )}
          title="Click to edit"
        >
          <ScriptOutput text={content} />
        </div>
      )}
    </div>
  );
}

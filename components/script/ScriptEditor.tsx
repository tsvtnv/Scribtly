"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { ScriptOutput } from "./ScriptOutput";
import { cn, wordCount } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

const SHARED = "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-serif text-[15px] leading-relaxed min-h-[500px]";

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
  const toastRef = useRef(toast);
  const dirtyRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => { isMountedRef.current = false; };
  }, []);

  useEffect(() => { toastRef.current = toast; }, [toast]);

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
    setSavingState("saving");
    const res = await fetch(`/api/scripts/${scriptId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!isMountedRef.current) return;
    if (res.ok) {
      dirtyRef.current = false;
      setSavingState("saved");
      setTimeout(() => { if (isMountedRef.current) setSavingState("idle"); }, 1500);
      onChange?.(content);
    } else {
      setSavingState("idle");
      toastRef.current.push("Save failed", "error");
    }
    setEditing(false);
  }, [content, scriptId, onChange]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      save();
    }
  }

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
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setEditing(true)}
          className={cn(
            SHARED,
            "cursor-text transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
          )}
          aria-label="Edit script content"
          title="Click to edit"
        >
          <ScriptOutput text={content} />
        </div>
      )}
    </div>
  );
}

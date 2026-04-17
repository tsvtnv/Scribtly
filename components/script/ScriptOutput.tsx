"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SECTION_RE = /^\[([A-Z][A-Z0-9 :.\-]*)\]\s*$/;
const INLINE_TAG_RE = /(\[(?:B-ROLL|ACTION|TEXT|CUT|MUSIC|PAUSE)(?::[^\]]*)?\])/g;
const EXTRA_DIVIDER_RE = /^\[([A-Z_]+)\](?:\s|$)/;

function renderInline(text: string, keyBase: string) {
  const parts = text.split(INLINE_TAG_RE);
  return parts.map((p, i) => {
    if (INLINE_TAG_RE.test(p)) {
      INLINE_TAG_RE.lastIndex = 0;
      return (
        <span
          key={`${keyBase}-t-${i}`}
          className="inline-block text-[11px] font-medium italic px-1.5 py-0.5 mx-0.5 rounded-sm bg-primary/10 text-primary dark:text-primary-onDark"
        >
          {p}
        </span>
      );
    }
    // Highlight CAPS words (3+ letters)
    const caps = p.split(/(\b[A-Z]{3,}\b)/g);
    return caps.map((c, j) => {
      if (/^[A-Z]{3,}$/.test(c)) {
        return (
          <span key={`${keyBase}-c-${i}-${j}`} className="font-semibold text-primary dark:text-primary-onDark">
            {c}
          </span>
        );
      }
      return <span key={`${keyBase}-n-${i}-${j}`}>{c}</span>;
    });
  });
}

export function ScriptOutput({
  text,
  isStreaming,
  empty,
  className,
}: {
  text: string;
  isStreaming?: boolean;
  empty?: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || userScrolledRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [text]);

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    userScrolledRef.current = !nearBottom;
  }

  if (!text && !isStreaming) {
    return (
      <div className={cn("flex items-center justify-center text-sm text-text-secondary dark:text-dark-muted", className)}>
        {empty ?? "Your script will appear here."}
      </div>
    );
  }

  const lines = text.split("\n");

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className={cn("font-serif leading-relaxed text-[15px] overflow-y-auto", className)}
    >
      {lines.map((line, i) => {
        const sectionMatch = line.match(SECTION_RE);
        if (sectionMatch) {
          return (
            <div key={i} className="mt-5 mb-2 first:mt-0">
              <span className="inline-block text-[11px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-primary text-white dark:bg-primary-onDark dark:text-dark-base">
                {sectionMatch[1]}
              </span>
            </div>
          );
        }
        if (line.trim() === "---") {
          return <hr key={i} className="my-6 border-[var(--color-border)]" />;
        }
        const extraMatch = line.match(EXTRA_DIVIDER_RE);
        if (extraMatch && extraMatch[1].length > 2 && line.trim() === `[${extraMatch[1]}]`) {
          return (
            <div key={i} className="mt-6 mb-2">
              <span className="inline-block text-[11px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-neutral-bg dark:bg-dark-elevated text-text-secondary dark:text-dark-muted">
                {extraMatch[1].replace(/_/g, " ")}
              </span>
            </div>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-3" />;
        return (
          <p key={i} className="my-1.5 whitespace-pre-wrap">
            {renderInline(line, `l${i}`)}
          </p>
        );
      })}
      {isStreaming && (
        <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" aria-hidden />
      )}
    </div>
  );
}

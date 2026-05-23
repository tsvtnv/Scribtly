"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { getTopicSuggestion } from "@/lib/onboarding/topicSuggestion";
import { Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepGenerateProps {
  clientId: string | null;
  clientNiche: string;
  clientPlatform: string;
  onSuccess: (scriptText: string) => void;
  onSkip: () => void;
}

const LOADING_MESSAGES = [
  "Crafting your hook...",
  "Building the narrative...",
  "Adding platform hooks...",
  "Polishing the script...",
  "Almost there...",
];

function ScriptPreview({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [text]);

  const lines = text.split("\n");

  return (
    <div
      ref={scrollRef}
      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-y-auto"
      style={{ maxHeight: "320px" }}
    >
      <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-success" />
        <span className="text-xs font-medium text-text-secondary dark:text-dark-muted">Script output</span>
        {isStreaming && (
          <span className="ml-auto text-xs text-primary animate-pulse">Generating…</span>
        )}
      </div>
      <div className="px-4 py-3 text-sm leading-relaxed text-text-primary font-mono space-y-0.5">
        {lines.map((line, i) => {
          const isSectionHeader = line.startsWith("**") && line.endsWith("**");
          const isLastLine = i === lines.length - 1;
          return (
            <p
              key={i}
              className={cn(
                "whitespace-pre-wrap",
                isSectionHeader && "font-semibold text-primary mt-2 mb-0.5 font-sans",
                line === "" && "h-2"
              )}
            >
              {isSectionHeader ? line.replace(/\*\*/g, "") : line}
              {isLastLine && isStreaming && (
                <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export function StepGenerate({ clientId, clientNiche, clientPlatform, onSuccess, onSkip }: StepGenerateProps) {
  const [topic, setTopic] = useState(getTopicSuggestion(clientNiche));
  const [streaming, setStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const loadingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startLoadingCycle() {
    setLoadingMsgIndex(0);
    loadingIntervalRef.current = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2200);
  }

  function stopLoadingCycle() {
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) { setError("Topic is required."); return; }
    if (!clientId) { onSkip(); return; }
    setError(null);
    setStreaming(true);
    setStreamedText("");
    startLoadingCycle();
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, platform: clientPlatform, topic: trimmedTopic, duration: "3-5 minutes" }),
      });
      if (!res.ok || !res.body) {
        setError("Script generation failed. Please try again.");
        setStreaming(false);
        stopLoadingCycle();
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamedText(full);
      }
      stopLoadingCycle();
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 3, firstScriptGeneratedAt: new Date().toISOString() }),
      });
      onSuccess(full);
    } catch {
      setError("Something went wrong. Please try again.");
      stopLoadingCycle();
    } finally {
      setStreaming(false);
    }
  }

  const hasOutput = streamedText.length > 0;

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">Generate your first script</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">
          See Scribtly in action — your first script is free and takes under 60 seconds.
        </p>
      </div>

      {!hasOutput && (
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="topic" className="text-sm font-medium text-text-primary">
              What is the video about?
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 3 mistakes beginners make at the gym"
              maxLength={300}
              rows={3}
              autoFocus
              className="w-full px-3.5 py-3 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-shadow"
            />
            {error && <p className="text-xs text-danger">{error}</p>}
          </div>

          {streaming ? (
            <div className="w-full h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center gap-2.5">
              <Zap size={15} className="text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary transition-all duration-300">
                {LOADING_MESSAGES[loadingMsgIndex]}
              </span>
            </div>
          ) : (
            <Button type="submit" size="lg" fullWidth>
              <Sparkles size={15} className="mr-1.5" />
              Generate my first script
            </Button>
          )}
        </form>
      )}

      {hasOutput && (
        <ScriptPreview text={streamedText} isStreaming={streaming} />
      )}

      {!streaming && !hasOutput && (
        <button
          type="button"
          onClick={onSkip}
          className="w-full text-sm text-text-secondary dark:text-dark-muted hover:text-text-primary transition-colors text-center py-1"
        >
          Skip for now
        </button>
      )}
    </div>
  );
}

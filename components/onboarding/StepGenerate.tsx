"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getTopicSuggestion } from "@/lib/onboarding/topicSuggestion";

interface StepGenerateProps {
  clientId: string | null;
  clientNiche: string;
  clientPlatform: string;
  onSuccess: (scriptText: string) => void;
  onSkip: () => void;
}

export function StepGenerate({ clientId, clientNiche, clientPlatform, onSuccess, onSkip }: StepGenerateProps) {
  const [topic, setTopic] = useState(getTopicSuggestion(clientNiche));
  const [streaming, setStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) { setError("Topic is required."); return; }
    if (!clientId) { onSkip(); return; }
    setError(null);
    setStreaming(true);
    setStreamedText("");
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, platform: clientPlatform, topic: trimmedTopic, duration: "3-5 minutes" }),
      });
      if (!res.ok || !res.body) {
        setError("Script generation failed. Please try again.");
        setStreaming(false);
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
      await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingStep: 3, firstScriptGeneratedAt: new Date().toISOString() }),
      });
      onSuccess(full);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary mb-1">Generate your first script</h1>
        <p className="text-sm text-text-secondary dark:text-dark-muted">See exactly what Scribtly can do — your first script is free.</p>
      </div>
      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="topic" className="text-sm font-medium text-text-primary">What is the video about?</label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 3 mistakes beginners make at the gym"
            maxLength={300}
            rows={3}
            autoFocus
            className="w-full px-3 py-2 text-sm rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          {error && <p className="text-xs text-danger">{error}</p>}
        </div>
        <Button type="submit" size="lg" fullWidth loading={streaming}>
          {streaming ? "Generating..." : "Generate my first script"}
        </Button>
      </form>
      {streamedText && (
        <Card className="text-sm whitespace-pre-wrap overflow-y-auto" style={{ maxHeight: "400px", lineHeight: "1.7" }}>
          {streamedText}
        </Card>
      )}
      {!streaming && (
        <button type="button" onClick={onSkip} className="w-full text-sm text-text-secondary dark:text-dark-muted hover:text-text-primary transition-colors">
          Skip for now
        </button>
      )}
    </div>
  );
}

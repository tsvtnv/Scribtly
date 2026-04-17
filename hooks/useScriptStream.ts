"use client";

import { useCallback, useRef, useState } from "react";

export interface StreamPayload {
  clientId: string;
  platform: string;
  topic: string;
  duration: string;
  hookStyle?: string | null;
  extraOutputs?: string[];
  model?: string;
}

export interface StreamError {
  code?: string;
  reason?: string;
  message: string;
}

export function useScriptStream(endpoint = "/api/generate-script") {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<StreamError | null>(null);
  const [done, setDone] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setText("");
    setError(null);
    setDone(false);
    setIsStreaming(false);
  }, []);

  const start = useCallback(
    async (payload: StreamPayload) => {
      reset();
      setIsStreaming(true);
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: ctrl.signal,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setError({
            code: body.code,
            reason: body.reason,
            message: body.error || `Request failed (${res.status})`,
          });
          setIsStreaming(false);
          return;
        }

        if (!res.body) {
          setError({ message: "No response body" });
          setIsStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done: readerDone } = await reader.read();
          if (readerDone) break;
          const chunk = decoder.decode(value, { stream: true });
          const errIdx = chunk.indexOf("[[ERROR:");
          if (errIdx !== -1) {
            buffer += chunk.slice(0, errIdx);
            setText(buffer);
            const msg = chunk.slice(errIdx + 8).replace("]]", "");
            setError({ message: msg.trim() || "Stream error" });
            break;
          }
          buffer += chunk;
          setText(buffer);
        }

        setDone(true);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError({ message: err.message || "Network error" });
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [endpoint, reset]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  return { text, isStreaming, error, done, start, reset, stop };
}

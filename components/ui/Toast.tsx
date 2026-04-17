"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ToastKind = "info" | "success" | "error";
interface ToastItem { id: number; message: string; kind: ToastKind; }

interface ToastContextValue { push: (msg: string, kind?: ToastKind) => void; }

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, kind: ToastKind = "info") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={cn(
              "px-4 py-2.5 rounded-md text-sm border-hair shadow-sm backdrop-blur-sm",
              t.kind === "success" && "bg-[#1D9E75]/15 border-[#1D9E75]/30 text-[#1D9E75]",
              t.kind === "error" && "bg-danger/15 border-danger/30 text-danger",
              t.kind === "info" && "bg-[var(--color-surface)] border-[var(--color-border)] text-text-primary dark:text-dark-text"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { push: (m: string) => console.log("[toast]", m) };
  return ctx;
}

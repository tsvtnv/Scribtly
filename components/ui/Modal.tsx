"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  children,
  title,
  maxWidth = "md",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const maxWidthClass = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl" }[maxWidth];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative w-full rounded-lg bg-[var(--color-surface)] border-hair border-[var(--color-border)] shadow-xl",
          maxWidthClass
        )}
      >
        {title !== undefined ? (
          <div className="flex items-center justify-between px-5 py-4 border-b-hair border-[var(--color-border)]">
            <h2 className="text-base font-semibold">{title}</h2>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-[var(--color-primary-tint)]" aria-label="Close">
              <X size={16} />
            </button>
          </div>
        ) : null}
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}

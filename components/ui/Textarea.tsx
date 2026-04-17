import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[88px] px-3 py-2 text-sm rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-text-secondary/70 dark:placeholder:text-dark-muted/70 resize-y",
          className
        )}
        {...props}
      />
    );
  }
);

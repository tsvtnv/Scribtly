import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[88px] px-3 py-2 text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:[color:var(--color-text-muted)] resize-y transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);

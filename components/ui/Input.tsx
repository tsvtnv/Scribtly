import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full px-3 text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-text-secondary/70 dark:placeholder:text-dark-muted/70 transition-colors",
        className
      )}
      {...props}
    />
  );
});

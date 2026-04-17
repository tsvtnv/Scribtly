import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Card(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border-hair border-[var(--color-border)] bg-[var(--color-surface)] p-5",
        className
      )}
      {...props}
    />
  );
});

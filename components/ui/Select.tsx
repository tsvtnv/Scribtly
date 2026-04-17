import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full pl-3 pr-8 text-sm rounded-md border-hair border-[var(--color-border)] bg-[var(--color-surface)] text-text-primary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22currentColor%22><path fill-rule=%22evenodd%22 d=%22M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z%22 clip-rule=%22evenodd%22/></svg>')] bg-[length:16px] bg-no-repeat bg-[right_0.5rem_center]",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

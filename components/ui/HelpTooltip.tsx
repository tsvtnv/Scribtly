import { cn } from "@/lib/utils";

interface HelpTooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function HelpTooltip({ text, position = "top", className }: HelpTooltipProps) {
  return (
    <span className={cn("relative inline-flex group", className)}>
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[var(--color-border)] text-[9px] font-bold text-text-secondary dark:text-dark-muted hover:border-primary hover:text-primary transition-colors cursor-help select-none leading-none">
        ?
      </span>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 w-56 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[11px] leading-relaxed text-text-primary dark:text-dark-text shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150",
          position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
          position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
          position === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
          position === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
        )}
      >
        {text}
      </span>
    </span>
  );
}

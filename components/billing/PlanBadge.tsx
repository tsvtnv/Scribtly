import Link from "next/link";
import type { Plan } from "@prisma/client";
import { cn } from "@/lib/utils";

const tone: Record<Plan, string> = {
  FREE: "bg-neutral-bg dark:bg-dark-elevated text-text-secondary dark:text-dark-muted border-hair border-[var(--color-border)]",
  BASIC: "bg-[#E6F1FB] text-[#042C53] dark:bg-[#042C53]/40 dark:text-[#7BB5F0] border-hair border-[#7BB5F0]/40",
  PRO: "bg-primary-light text-primary-dark dark:bg-primary/20 dark:text-primary-onDark border-hair border-primary/30",
  AGENCY: "bg-[#FAECE7] text-[#4A1B0C] dark:bg-[#4A1B0C]/40 dark:text-[#F0997B] border-hair border-[#F0997B]/40",
  ENTERPRISE: "bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] border-hair border-black/20",
};

export function PlanBadge({ plan, href = "/settings/billing" }: { plan: Plan; href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        tone[plan]
      )}
    >
      {plan}
    </Link>
  );
}

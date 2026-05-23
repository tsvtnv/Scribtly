"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
];

export function ThemeSettingCard() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-muted mb-4">
        Appearance
      </h2>
      <div className="flex gap-3">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex flex-col items-center gap-2 px-5 py-3 rounded-lg border text-sm transition-colors",
              theme === value
                ? "border-[var(--color-primary)] bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium"
                : "border-[var(--color-border)] text-text-secondary dark:text-dark-muted hover:border-[var(--color-primary)]/50"
            )}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
    </Card>
  );
}

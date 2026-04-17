"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark dark:bg-primary-onDark dark:text-dark-base dark:hover:bg-primary",
  secondary:
    "bg-neutral-bg dark:bg-dark-elevated text-text-primary dark:text-dark-text hover:bg-primary-light dark:hover:bg-dark-input border-hair border-[var(--color-border)]",
  ghost: "text-text-primary dark:text-dark-text hover:bg-[var(--color-primary-tint)]",
  danger: "bg-danger text-white hover:opacity-90",
  outline:
    "border-hair border-[var(--color-border)] text-text-primary dark:text-dark-text hover:bg-[var(--color-primary-tint)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-md",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-12 px-6 text-base rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, fullWidth, className, disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? <span className="inline-block w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" /> : null}
      {children}
    </button>
  );
});

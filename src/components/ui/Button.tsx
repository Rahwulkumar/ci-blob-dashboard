import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-sm font-medium transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        size === "md" ? "h-9 px-3.5 text-[13px]" : "h-7.5 px-2.5 text-xs",
        variant === "primary" && "bg-(--accent) text-white shadow-(--shadow-btn) hover:bg-(--accent-dark)",
        variant === "secondary" &&
          "border border-(--line-strong) bg-white text-(--text-body) hover:bg-(--surface-2) hover:text-(--text-heading)",
        variant === "ghost" && "text-(--text-muted) hover:bg-(--surface-3) hover:text-(--text-heading)",
        className,
      )}
      {...props}
    />
  );
}

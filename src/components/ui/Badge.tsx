import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "error" | "info" | "neutral" | "blue";

const toneClasses: Record<Tone, { badge: string; dot: string }> = {
  success: {
    badge: "bg-[#eef3fe] text-[#1d4fd8]",
    dot: "bg-[#2563eb]",
  },
  warning: {
    badge: "bg-[#f1f4f9] text-[#6c7a93]",
    dot: "bg-[#97a3b8]",
  },
  error: {
    badge: "bg-[#fdf1f2] text-[#c03342]",
    dot: "bg-[#c03342]",
  },
  info: {
    badge: "bg-[#eef3fe] text-[#1d4fd8]",
    dot: "bg-[#2563eb]",
  },
  blue: {
    badge: "bg-[#eef3fe] text-[#1d4fd8]",
    dot: "bg-[#2563eb]",
  },
  neutral: {
    badge: "bg-[#f1f4f9] text-[#6c7a93]",
    dot: "bg-[#97a3b8]",
  },
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  showDot?: boolean;
};

export function Badge({ tone = "neutral", showDot = true, className, children, ...props }: BadgeProps) {
  const classes = toneClasses[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
        classes.badge,
        className,
      )}
      {...props}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", classes.dot)} aria-hidden="true" />}
      {children}
    </span>
  );
}

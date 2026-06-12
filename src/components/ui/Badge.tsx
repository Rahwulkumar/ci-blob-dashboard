import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "error" | "info" | "neutral" | "blue";

const configs: Record<Tone, { color: string; dot: string }> = {
  success: { color: "#177245", dot: "#1ca35e" },
  warning: { color: "#a8650b", dot: "#dc930f" },
  error:   { color: "#c03342", dot: "#e25563" },
  info:    { color: "#1d4fd8", dot: "#2563eb" },
  blue:    { color: "#1d4fd8", dot: "#2563eb" },
  neutral: { color: "#6c7a93", dot: "#97a3b8" },
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  showDot?: boolean;
};

export function Badge({ tone = "neutral", showDot = true, className, children, ...props }: BadgeProps) {
  const c = configs[tone];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-xs font-medium", className)}
      style={{ color: c.color }}
      {...props}
    >
      {showDot && (
        <span
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: c.dot }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "error" | "info" | "neutral" | "blue";

const configs: Record<Tone, { bg: string; color: string; border: string; dot: string }> = {
  success: { bg: "rgba(22,163,74,0.08)",   color: "#15803d", border: "rgba(22,163,74,0.18)",   dot: "#16a34a" },
  warning: { bg: "rgba(217,119,6,0.08)",   color: "#b45309", border: "rgba(217,119,6,0.18)",   dot: "#d97706" },
  error:   { bg: "rgba(220,38,38,0.08)",   color: "#b91c1c", border: "rgba(220,38,38,0.18)",   dot: "#dc2626" },
  info:    { bg: "rgba(37,99,235,0.07)",   color: "#1d4ed8", border: "rgba(37,99,235,0.16)",   dot: "#2563eb" },
  blue:    { bg: "rgba(37,99,235,0.07)",   color: "#1d4ed8", border: "rgba(37,99,235,0.16)",   dot: "#3b82f6" },
  neutral: { bg: "rgba(100,116,139,0.07)", color: "#475569", border: "rgba(100,116,139,0.16)", dot: "#94a3b8" },
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  showDot?: boolean;
};

export function Badge({ tone = "neutral", showDot = true, className, children, ...props }: BadgeProps) {
  const c = configs[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[5px] rounded-full px-2 py-0.5 text-[11px] font-semibold",
        className
      )}
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
      {...props}
    >
      {showDot && (
        <span
          className="dot"
          style={{ background: c.dot, width: 5, height: 5 }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

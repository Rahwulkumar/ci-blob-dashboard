import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, style, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("surface", className)} style={style} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b border-(--line) px-5 py-3.5",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="text-[13px] font-semibold text-(--text-heading)">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-(--text-faint)">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

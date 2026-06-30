import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const glassPanel =
  "overflow-hidden rounded-3xl border border-[#dbe7fd] bg-white/80 shadow-[0_12px_40px_-12px_rgba(37,99,235,0.12),0_2px_8px_rgba(22,36,61,0.04)] backdrop-blur-xl";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(glassPanel, className)} {...props}>
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
    <div className={cn("flex items-start justify-between gap-4 px-6 pt-5", className)}>
      <div className="min-w-0">
        <h2 className="text-lg font-bold tracking-tight text-[#16243d]">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-[#6c7a93]">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

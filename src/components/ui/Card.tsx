import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const tilePanel =
  "relative overflow-hidden rounded-[20px] border border-[#e9edf4] bg-white transition duration-200 hover:border-[#dbe7fd] hover:shadow-[0_10px_32px_-10px_rgba(22,36,61,0.1)]";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
};

export function Card({ as: Component = "div", className, children, ...props }: CardProps) {
  return (
    <Component className={cn(tilePanel, className)} {...props}>
      {children}
    </Component>
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
        <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold tracking-tight text-[#16243d]">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-[#6c7a93]">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

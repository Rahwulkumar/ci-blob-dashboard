import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Tabs({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex rounded-lg border border-slate-200 bg-white p-1 text-sm shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, style, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("surface", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

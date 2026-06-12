import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-[9px] border border-(--line-strong) bg-white px-3.5 text-[13px] text-(--text-heading) shadow-(--shadow-console) outline-none transition placeholder:text-(--text-faint) focus:border-(--accent) focus:ring-4 focus:ring-blue-600/10",
        className,
      )}
      {...props}
    />
  );
}

import { cn } from "@/lib/utils";

export function Avatar({
  label,
  size = "md",
  className,
}: {
  label: string;
  seed?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-2xl border border-[#dbe7fd] bg-[#eef3fe] font-bold text-[#1d4fd8]",
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {label.slice(0, 2).toUpperCase()}
    </span>
  );
}

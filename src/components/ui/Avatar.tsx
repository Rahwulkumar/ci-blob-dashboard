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
    sm: "h-7 w-7 rounded-md text-[10px]",
    md: "h-9 w-9 rounded-lg text-[11.5px]",
    lg: "h-12 w-12 rounded-[10px] text-[15px]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center border border-[#dbe5f8] bg-(--accent-soft) font-semibold text-(--accent-dark)",
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {label.slice(0, 2).toUpperCase()}
    </span>
  );
}

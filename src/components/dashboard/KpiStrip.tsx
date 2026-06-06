import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export function KpiStrip({
  items,
}: {
  items: { label: string; value: string; delta: string; up?: boolean; icon?: ReactNode }[];
}) {
  return (
    <Card className="mb-4 grid overflow-hidden md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative min-h-[106px] overflow-hidden border-b border-[var(--line)] px-5 py-4 last:border-b-0 md:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0"
        >
          <div className="pointer-events-none absolute -bottom-2 right-1 select-none font-mono text-[56px] font-bold leading-none tracking-tighter text-blue-600/[0.045]">
            {item.value.replace(/[^\d.%]/g, "")}
          </div>
          <div className="relative mb-3 flex items-center justify-between gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-2)]">
              {item.label}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                item.up === false ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
              }`}
            >
              {item.delta}
            </span>
          </div>
          <div className="console-mono relative text-[27px] font-semibold leading-none tracking-[-0.04em] text-slate-950">
            {item.value}
          </div>
          <div className="relative mt-2 text-[11px] text-[var(--muted-2)]">vs last report cycle</div>
        </div>
      ))}
    </Card>
  );
}

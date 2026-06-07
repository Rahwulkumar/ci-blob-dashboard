import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type KpiItem = {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  description?: string;
};

export function KpiStrip({ items }: { items: KpiItem[] }) {
  return (
    <div className="mb-5 grid grid-cols-2 overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-white lg:grid-cols-4">
      {items.map((item) => {
        const isLive = item.delta === "Live";
        const isPositive = item.up !== false;
        const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <div
            key={item.label}
            className="min-h-[108px] border-b border-r border-[var(--border-muted)] px-4 py-3 last:border-r-0 even:border-r-0 lg:border-b-0 lg:even:border-r lg:[&:nth-child(4n)]:border-r-0"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[11px] font-medium text-[var(--text-muted)]">{item.label}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                  isLive
                    ? "border-[var(--green-border)] bg-[var(--green-bg)] text-[var(--success)]"
                    : isPositive
                      ? "border-[var(--green-border)] bg-[var(--green-bg)] text-[var(--success)]"
                      : "border-[var(--red-border)] bg-[var(--red-bg)] text-[var(--danger)]"
                }`}
              >
                {isLive ? <span className="dot dot-green h-[5px] w-[5px]" /> : <TrendIcon className="h-3 w-3" />}
                {item.delta}
              </span>
            </div>

            <div className="console-mono text-[24px] font-semibold leading-none tracking-[-0.02em] text-[var(--text-heading)]">
              {item.value}
            </div>
            <div className="mt-2 text-[11px] text-[var(--text-faint)]">
              {item.description ?? "Previous report cycle"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

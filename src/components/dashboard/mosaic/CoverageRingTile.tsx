import { TileHeader } from "@/components/dashboard/mosaic/TileHeader";
import type { CoverageSnapshot } from "@/components/dashboard/mosaic/types";
import { Card } from "@/components/ui/Card";
import { cn, formatNumber } from "@/lib/utils";

export function CoverageRingTile({ coverage }: { coverage: CoverageSnapshot }) {
  return (
    <Card as="section" className="flex min-h-[230px] flex-col p-6 sm:col-span-3 lg:col-span-4">
      <TileHeader title="Portfolio coverage" eyebrow="This week" />
      <div className="mt-5 flex flex-1 flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-32 w-32 shrink-0 rounded-full bg-[conic-gradient(#2563eb_0_71%,#e9edf4_71%_100%)]">
          <span className="absolute inset-[13px] rounded-full bg-white" aria-hidden="true" />
          <span className="absolute inset-0 grid place-items-center text-center font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-tight text-[#16243d]">
            {coverage.percent}%
            <small className="block text-xs font-semibold tracking-normal text-[#97a3b8]">{coverage.label}</small>
          </span>
        </div>
        <dl className="grid flex-1 gap-2.5">
          {coverage.items.map((item) => (
            <div key={item.id} className="flex items-center gap-2.5 text-sm text-[#6c7a93]">
              <dt className="flex min-w-0 flex-1 items-center gap-2.5">
                <span className={cn("h-2 w-2 shrink-0 rounded-sm", item.markerClassName)} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </dt>
              <dd className="font-mono text-sm font-semibold text-[#16243d]">{formatNumber(item.value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}

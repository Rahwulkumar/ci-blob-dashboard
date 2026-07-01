import { TileHeader } from "@/components/dashboard/mosaic/TileHeader";
import type { MosaicTrendPoint, TrendLevel } from "@/components/dashboard/mosaic/types";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const trendHeightClass: Record<TrendLevel, string> = {
  "level-1": "h-[26%]",
  "level-2": "h-[41%]",
  "level-3": "h-[65%]",
  "level-4": "h-[53%]",
  "level-5": "h-[77%]",
  "level-6": "h-[92%]",
};

export function ReportVolumeTile({ trend }: { trend: MosaicTrendPoint[] }) {
  return (
    <Card as="section" id="report-volume" className="p-6 sm:col-span-6 lg:col-span-7">
      <TileHeader title="Report volume - last six months" actionHref="/clients" actionLabel="Analytics" />
      <div className="mt-5 flex h-40 items-end gap-3">
        {trend.map((point) => (
          <div key={point.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div
              className={cn(
                "relative w-full max-w-14 rounded-[10px] bg-[#f1f4f9] transition group-hover:bg-[#dbe7fd]",
                trendHeightClass[point.level],
                point.current && "bg-gradient-to-b from-[#6b96f3] to-[#2563eb]",
              )}
            >
              <span
                className={cn(
                  "absolute -top-6 w-full text-center font-[family-name:var(--font-sora)] text-xs font-bold text-[#6c7a93]",
                  point.current && "text-[#1d4fd8]",
                )}
              >
                {point.reports}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#97a3b8]">{point.month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

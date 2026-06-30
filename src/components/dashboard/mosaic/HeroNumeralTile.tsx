import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";

export function HeroNumeralTile({
  reportTotal,
  clientCount,
  eventCount,
  heroDate,
}: {
  reportTotal: number;
  clientCount: number;
  eventCount: number;
  heroDate: string;
}) {
  return (
    <Card
      as="section"
      className="flex min-h-[230px] flex-col justify-between p-6 sm:col-span-6 lg:col-span-5"
    >
      <span
        className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[34px] border-[#f6f9ff]"
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-2.5">
        <span className="h-0.5 w-6 rounded-full bg-[#2563eb]" aria-hidden="true" />
        <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">{heroDate}</span>
      </div>
      <div className="relative mt-12">
        <h1 className="font-[family-name:var(--font-sora)] text-7xl font-extrabold leading-none tracking-tight text-[#16243d] sm:text-8xl">
          {formatNumber(reportTotal)}
          <sup className="ml-2 align-super text-xl font-bold tracking-normal text-[#2563eb]">+18%</sup>
        </h1>
        <p className="mt-3 max-w-[300px] text-sm leading-6 text-[#6c7a93]">
          <strong className="font-semibold text-[#16243d]">Intelligence reports delivered</strong> across{" "}
          {clientCount} clients and {eventCount} live event series, indexed automatically on arrival.
        </p>
      </div>
    </Card>
  );
}

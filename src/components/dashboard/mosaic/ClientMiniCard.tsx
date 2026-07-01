import { getUploadLabel } from "@/components/dashboard/mosaic/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Client } from "@/types/client";

export function ClientMiniCard({
  client,
  thisMonthReports,
  referenceDate,
}: {
  client: Client;
  thisMonthReports: number;
  referenceDate?: string;
}) {
  const active = client.status === "Active";

  return (
    <Card as="article" className="p-6 sm:col-span-3 lg:col-span-4">
      <Badge tone={active ? "blue" : "neutral"} className="absolute right-5 top-5 px-2.5 py-1">
        {client.status}
      </Badge>
      <div className="flex items-center gap-3 pr-20">
        <Avatar
          label={client.shortName}
          className={cn(
            "h-10 w-10 rounded-[13px] border-0 font-[family-name:var(--font-sora)] text-xs",
            active ? "bg-[#eef3fe] text-[#1d4fd8]" : "bg-[#f1f4f9] text-[#6c7a93]",
          )}
        />
        <div className="min-w-0">
          <h3 className="truncate font-[family-name:var(--font-sora)] text-sm font-bold text-[#16243d]">
            {client.name}
          </h3>
          <p className="mt-0.5 text-xs text-[#97a3b8]">{getUploadLabel(client.lastUploadDate, referenceDate)}</p>
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-3 border-t border-[#e9edf4] pt-3.5">
        <div>
          <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.05em] text-[#97a3b8]">Events</dt>
          <dd className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-[#16243d]">
            {client.eventsCount}
          </dd>
        </div>
        <div className="border-l border-[#e9edf4] pl-3.5">
          <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.05em] text-[#97a3b8]">Reports</dt>
          <dd className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-[#16243d]">
            {client.reportsCount}
          </dd>
        </div>
        <div className="border-l border-[#e9edf4] pl-3.5">
          <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.05em] text-[#97a3b8]">This month</dt>
          <dd className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-[#16243d]">
            {thisMonthReports}
          </dd>
        </div>
      </dl>
    </Card>
  );
}

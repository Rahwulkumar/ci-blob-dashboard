import { FileText } from "lucide-react";
import { TileHeader } from "@/components/dashboard/mosaic/TileHeader";
import { formatUtcTime, getPathSnippet, getReportTitle } from "@/components/dashboard/mosaic/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatBytes } from "@/lib/utils";
import type { Client } from "@/types/client";
import type { EventSeries, ReportFile } from "@/types/report";

export function LatestDeliveryTile({
  clients,
  events,
  report,
}: {
  clients: Client[];
  events: EventSeries[];
  report?: ReportFile;
}) {
  const client = clients.find((item) => item.id === report?.clientId);
  const event = events.find((item) => item.id === report?.eventId);
  const reportMeta = [client?.name, event?.name].filter(Boolean).join(" - ");

  return (
    <Card as="section" className="flex min-h-[230px] flex-col border-[#dbe7fd] bg-[#f6f9ff] p-6 sm:col-span-6 lg:col-span-5">
      <TileHeader title="Latest delivery" actionHref="/clients" actionLabel="All reports" />
      <span className="mt-4 grid h-11 w-11 place-items-center rounded-[14px] border border-[#dbe7fd] bg-white text-[#1d4fd8]">
        <FileText className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">CSV file</span>
      </span>
      <h3 className="mt-3 font-[family-name:var(--font-sora)] text-lg font-bold leading-6 tracking-tight text-[#16243d]">
        {report ? getReportTitle(report.fileName) : "No report delivered"}
      </h3>
      <p className="mt-1 text-sm text-[#6c7a93]">{reportMeta || "Awaiting storage sync"}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {report && <Badge tone={report.status === "Indexed" ? "blue" : "warning"}>{report.status}</Badge>}
        {report && <Badge tone="neutral" showDot={false}>{formatBytes(report.size)}</Badge>}
        {report && <Badge tone="neutral" showDot={false}>{formatUtcTime(report.lastModified)}</Badge>}
        {report && (
          <Badge tone="neutral" showDot={false} className="font-mono">
            {getPathSnippet(report.blobPath)}
          </Badge>
        )}
      </div>
    </Card>
  );
}

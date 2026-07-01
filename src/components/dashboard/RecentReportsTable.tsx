import Link from "next/link";
import { FileText } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import type { Client } from "@/types/client";
import type { EventSeries, ReportFile } from "@/types/report";

type RecentReportsTableProps = {
  reports: ReportFile[];
  clients: Client[];
  events: EventSeries[];
  title: string;
  subtitle: string;
  allHref: string;
};

function cleanFileName(fileName: string) {
  return fileName.replace(/^CI\s+/i, "").replace(/\.csv$/i, "");
}

function reportMeta(report: ReportFile, clients: Client[], events: EventSeries[]) {
  const client = clients.find((item) => item.id === report.clientId);
  const event = events.find((item) => item.id === report.eventId);
  return `${client?.name ?? report.clientId} - ${event?.name ?? report.eventId}`;
}

function ageLabel(index: number) {
  if (index === 0) return "NEW";
  if (index < 3) return "1d";
  return "4d";
}

export function RecentReportsTable({
  reports,
  clients,
  events,
  title,
  subtitle,
  allHref,
}: RecentReportsTableProps) {
  const visibleReports = [...reports]
    .sort((a, b) => b.lastModified.localeCompare(a.lastModified))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={subtitle}
        action={
          <Link href={allHref} className="text-sm font-bold text-[#2563eb] transition hover:text-[#1d4fd8]">
            All -&gt;
          </Link>
        }
      />
      <div className="flex flex-col gap-0.5 px-2.5 pb-3 pt-2">
        {visibleReports.map((report, index) => {
          const label = ageLabel(index);

          return (
            <Link
              key={report.id}
              href={`/clients/${report.clientId}/events/${report.eventId}`}
              className="flex items-center gap-3 rounded-2xl px-3.5 py-3 transition hover:bg-white"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#dbe7fd] bg-gradient-to-br from-[#eef3fe] to-white text-[#1d4fd8]">
                <FileText className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-[#16243d]">{cleanFileName(report.fileName)}</h3>
                <span className="mt-0.5 block truncate text-xs text-[#6c7a93]">
                  {reportMeta(report, clients, events)}
                </span>
              </span>
              {label === "NEW" ? (
                <span className="shrink-0 rounded-full bg-[#2563eb] px-2 py-1 text-xs font-bold text-white shadow-[0_2px_6px_rgba(37,99,235,0.3)]">
                  NEW
                </span>
              ) : (
                <span className="shrink-0 font-mono text-xs text-[#97a3b8]">{label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CardHeader } from "@/components/ui/Card";
import { getClient, getEvent } from "@/lib/mock-data";
import { formatBytes } from "@/lib/utils";
import type { ReportFile } from "@/types/report";

function statusTone(status: ReportFile["status"]) {
  if (status === "Indexed") return "success" as const;
  if (status === "Review") return "warning" as const;
  return "info" as const;
}

export function RecentReportsTable({ reports }: { reports: ReportFile[] }) {
  return (
    <section className="surface overflow-hidden">
      <CardHeader
        title="Recent reports"
        action={
          <Link
            href="/clients"
            className="text-xs font-medium text-(--accent) transition-colors hover:text-(--accent-dark)"
          >
            View all clients
          </Link>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-170 border-collapse text-left">
          <thead className="border-b border-(--line) bg-(--surface-2)">
            <tr>
              <th className="t-label-xs px-5 py-2 font-semibold">Report</th>
              <th className="t-label-xs px-5 py-2 font-semibold">Client</th>
              <th className="t-label-xs px-5 py-2 font-semibold">Date</th>
              <th className="t-label-xs px-5 py-2 text-right font-semibold">Size</th>
              <th className="t-label-xs px-5 py-2 font-semibold">Status</th>
              <th className="px-5 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border-muted)">
            {reports.map((report) => {
              const client = getClient(report.clientId);
              const event = getEvent(report.clientId, report.eventId);

              return (
                <tr key={report.id} className="tr-hover">
                  <td className="max-w-85 px-5 py-3">
                    <Link
                      href={`/clients/${report.clientId}/events/${report.eventId}`}
                      className="block"
                    >
                      <span
                        className="block truncate text-[13px] font-medium text-(--text-heading)"
                        title={report.fileName}
                      >
                        {report.fileName}
                      </span>
                      <span className="mt-0.5 block truncate text-[11.5px] text-(--text-faint)">
                        {event?.name ?? "—"}
                      </span>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-[12.5px] text-(--text-body)">
                    {client?.name ?? report.clientId}
                  </td>
                  <td className="t-num whitespace-nowrap px-5 py-3 text-[12.5px] text-(--text-body)">
                    {report.reportDate}
                  </td>
                  <td className="t-num whitespace-nowrap px-5 py-3 text-right text-[12.5px] text-(--text-muted)">
                    {formatBytes(report.size)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <Badge tone={statusTone(report.status)}>{report.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/clients/${report.clientId}/events/${report.eventId}`}
                      aria-label={`View ${report.fileName}`}
                      className="inline-flex text-(--text-faint) transition-colors hover:text-(--accent)"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-(--line) px-5 py-2.5 text-[11.5px] text-(--text-faint)">
        {reports.length} reports · Client-confidential
      </div>
    </section>
  );
}

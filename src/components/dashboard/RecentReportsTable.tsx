import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatBytes } from "@/lib/utils";
import type { ReportFile } from "@/types/report";

function statusTone(status: ReportFile["status"]) {
  if (status === "Indexed") return "success" as const;
  if (status === "Review") return "warning" as const;
  return "info" as const;
}

function clientLabel(clientId: string) {
  return clientId
    .split("-")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export function RecentReportsTable({ reports }: { reports: ReportFile[] }) {
  return (
    <section className="surface overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
        <div>
          <h2 className="text-[13px] font-semibold text-[var(--text-heading)]">Recent reports</h2>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Latest CSV files available in blob storage</p>
        </div>
        <Link href="/upload" className="hidden text-xs font-medium text-[var(--accent)] hover:underline sm:block">
          Upload report
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="border-b border-[var(--line)] bg-[var(--surface-2)] text-[11px] font-medium text-[var(--text-muted)]">
            <tr>
              <th className="px-4 py-2.5">Report</th>
              <th className="px-4 py-2.5">Client</th>
              <th className="px-4 py-2.5">Date</th>
              <th className="px-4 py-2.5">Size</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-muted)]">
            {reports.map((report) => (
              <tr key={report.id} className="tr-hover">
                <td className="max-w-[320px] px-4 py-3">
                  <div className="truncate text-[13px] font-medium text-[var(--text-heading)]" title={report.fileName}>
                    {report.fileName}
                  </div>
                  <div className="console-mono mt-1 truncate text-[11px] text-[var(--text-faint)]">{report.blobPath}</div>
                </td>
                <td className="px-4 py-3 text-xs text-[var(--text-muted)]">{clientLabel(report.clientId)}</td>
                <td className="console-mono px-4 py-3 text-xs text-[var(--text-body)]">{report.reportDate}</td>
                <td className="console-mono px-4 py-3 text-xs text-[var(--text-muted)]">{formatBytes(report.size)}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(report.status)}>{report.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/clients/${report.clientId}/events/${report.eventId}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] hover:underline"
                  >
                    View <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--line)] bg-[var(--surface-2)] px-4 py-2 text-[11px] text-[var(--text-muted)]">
        <span>{reports.length} report files</span>
        <span className="hidden sm:inline">Client-confidential</span>
      </div>
    </section>
  );
}

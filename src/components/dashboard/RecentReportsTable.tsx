import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatBytes } from "@/lib/utils";
import type { ReportFile } from "@/types/report";

function statusTone(status: ReportFile["status"]) {
  if (status === "Indexed") return "success";
  if (status === "Review") return "warning";
  return "info";
}

export function RecentReportsTable({ reports }: { reports: ReportFile[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[var(--line)] px-4 py-3">
        <h2 className="text-[13px] font-semibold text-slate-950">Recent reports</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">Latest CSV files available in blob storage</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-2)]">
            <tr>
              <th className="px-4 py-2.5">File</th>
              <th className="px-4 py-2.5">Report date</th>
              <th className="px-4 py-2.5">Size</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {reports.map((report) => (
              <tr key={report.id} className="transition hover:bg-blue-50/40">
                <td className="max-w-md px-4 py-3">
                  <div className="truncate text-xs font-semibold text-slate-950">{report.fileName}</div>
                  <div className="console-mono mt-1 truncate text-xs text-slate-400">{report.blobPath}</div>
                </td>
                <td className="console-mono px-4 py-3 text-xs text-slate-600">{report.reportDate}</td>
                <td className="console-mono px-4 py-3 text-xs text-slate-600">{formatBytes(report.size)}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(report.status)}>{report.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Link
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    href={`/clients/${report.clientId}/events/${report.eventId}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

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
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-950">Recent reports</h2>
        <p className="mt-1 text-xs text-slate-500">Latest CSV files available in blob storage</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">File</th>
              <th className="px-5 py-3">Report date</th>
              <th className="px-5 py-3">Size</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {reports.map((report) => (
              <tr key={report.id} className="transition hover:bg-blue-50/40">
                <td className="max-w-md px-5 py-4">
                  <div className="truncate font-medium text-slate-950">{report.fileName}</div>
                  <div className="mt-1 truncate font-mono text-xs text-slate-400">{report.blobPath}</div>
                </td>
                <td className="px-5 py-4 text-slate-600">{report.reportDate}</td>
                <td className="px-5 py-4 text-slate-600">{formatBytes(report.size)}</td>
                <td className="px-5 py-4">
                  <Badge tone={statusTone(report.status)}>{report.status}</Badge>
                </td>
                <td className="px-5 py-4">
                  <Link
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
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

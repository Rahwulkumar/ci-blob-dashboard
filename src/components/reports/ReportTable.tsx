import { Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { formatBytes } from "@/lib/utils";
import type { ReportFile } from "@/types/report";

function statusTone(status: ReportFile["status"]) {
  if (status === "Indexed") return "success" as const;
  if (status === "Review") return "warning" as const;
  return "info" as const;
}

export function ReportTable({ reports }: { reports: ReportFile[] }) {
  return (
    <Card>
      <CardHeader title="All reports" subtitle="Complete report history for this event" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left">
          <thead className="border-b border-[#e9edf4] bg-[#f8fafd]">
            <tr>
              <th className="px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">Report</th>
              <th className="px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">Date</th>
              <th className="px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">
                Last updated
              </th>
              <th className="px-5 py-2 text-right text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">
                Size
              </th>
              <th className="px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">Status</th>
              <th className="px-5 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eff2f7]">
            {reports.map((report) => (
              <tr key={report.id} className="transition hover:bg-white">
                <td className="max-w-90 px-5 py-3">
                  <span className="block truncate text-sm font-medium text-[#16243d]" title={report.fileName}>
                    {report.fileName}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-[#44546d]">
                  {report.reportDate}
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-[#6c7a93]">
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(report.lastModified))}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right font-mono text-sm text-[#6c7a93]">
                  {formatBytes(report.size)}
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <Badge tone={statusTone(report.status)}>{report.status}</Badge>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right">
                  <button className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6c7a93] transition-colors hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]">
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-[#e9edf4] px-5 py-2.5 text-xs text-[#97a3b8]">
        {reports.length} {reports.length === 1 ? "report" : "reports"} - Client-confidential
      </div>
    </Card>
  );
}

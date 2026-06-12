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
    <Card className="overflow-hidden">
      <CardHeader title="All reports" subtitle="Complete report history for this event" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-170 border-collapse text-left">
          <thead className="border-b border-(--line) bg-(--surface-2)">
            <tr>
              <th className="t-label-xs px-5 py-2 font-semibold">Report</th>
              <th className="t-label-xs px-5 py-2 font-semibold">Date</th>
              <th className="t-label-xs px-5 py-2 font-semibold">Last updated</th>
              <th className="t-label-xs px-5 py-2 text-right font-semibold">Size</th>
              <th className="t-label-xs px-5 py-2 font-semibold">Status</th>
              <th className="px-5 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border-muted)">
            {reports.map((report) => (
              <tr key={report.id} className="tr-hover">
                <td className="max-w-90 px-5 py-3">
                  <span
                    className="block truncate text-[13px] font-medium text-(--text-heading)"
                    title={report.fileName}
                  >
                    {report.fileName}
                  </span>
                </td>
                <td className="t-num whitespace-nowrap px-5 py-3 text-[12.5px] text-(--text-body)">
                  {report.reportDate}
                </td>
                <td className="t-num whitespace-nowrap px-5 py-3 text-[12.5px] text-(--text-muted)">
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(report.lastModified))}
                </td>
                <td className="t-num whitespace-nowrap px-5 py-3 text-right text-[12.5px] text-(--text-muted)">
                  {formatBytes(report.size)}
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <Badge tone={statusTone(report.status)}>{report.status}</Badge>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right">
                  <button className="inline-flex items-center gap-1.5 text-xs font-medium text-(--text-muted) transition-colors hover:text-(--accent)">
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-(--line) px-5 py-2.5 text-[11.5px] text-(--text-faint)">
        {reports.length} {reports.length === 1 ? "report" : "reports"} · Client-confidential
      </div>
    </Card>
  );
}

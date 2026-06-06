import { Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatBytes } from "@/lib/utils";
import type { ReportFile } from "@/types/report";

export function ReportTable({ reports }: { reports: ReportFile[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead className="border-b border-[var(--line)] bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-2)]">
            <tr>
              <th className="px-4 py-2.5">File name</th>
              <th className="px-4 py-2.5">Report date</th>
              <th className="px-4 py-2.5">Blob path</th>
              <th className="px-4 py-2.5">Size</th>
              <th className="px-4 py-2.5">Last modified</th>
              <th className="px-4 py-2.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-blue-50/40">
                <td className="max-w-xs px-4 py-3">
                  <div className="truncate text-xs font-semibold text-slate-950">{report.fileName}</div>
                  <div className="mt-1">
                    <Badge tone={report.status === "Indexed" ? "success" : "warning"}>{report.status}</Badge>
                  </div>
                </td>
                <td className="console-mono px-4 py-3 text-xs text-slate-600">{report.reportDate}</td>
                <td className="max-w-sm px-4 py-3">
                  <div className="console-mono truncate text-xs text-slate-500">{report.blobPath}</div>
                </td>
                <td className="console-mono px-4 py-3 text-xs text-slate-600">{formatBytes(report.size)}</td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(report.lastModified))}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="secondary" className="h-8 px-3">
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      View
                    </Button>
                    <Button variant="secondary" className="h-8 px-3">
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

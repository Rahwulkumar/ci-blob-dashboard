import { FileSpreadsheet } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatBytes } from "@/lib/utils";
import type { ReportFile } from "@/types/report";

export function ReportFileCard({ report }: { report: ReportFile }) {
  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-blue-100 bg-blue-50 text-blue-600">
          <FileSpreadsheet className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-slate-950">{report.fileName}</div>
          <div className="console-mono mt-1 text-xs text-slate-500">
            {report.reportDate} - {formatBytes(report.size)}
          </div>
        </div>
      </div>
    </Card>
  );
}

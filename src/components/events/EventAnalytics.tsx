"use client";

import { ReportsTrendChart } from "@/components/dashboard/ReportsTrendChart";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { reportsByMonth } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import type { ReportFile } from "@/types/report";

const platforms = [
  { name: "YouTube", value: 38, widthClass: "w-2/5" },
  { name: "Facebook", value: 23, widthClass: "w-1/4" },
  { name: "Telegram", value: 17, widthClass: "w-1/5" },
  { name: "TikTok", value: 12, widthClass: "w-[12%]" },
  { name: "Other", value: 10, widthClass: "w-[10%]" },
] as const;

const statusClasses = {
  Indexed: {
    bar: "bg-[#2563eb]",
    dot: "bg-[#2563eb]",
  },
  Pending: {
    bar: "bg-[#93b4f8]",
    dot: "bg-[#93b4f8]",
  },
  Review: {
    bar: "bg-[#d3e0fb]",
    dot: "bg-[#d3e0fb]",
  },
} as const;

function statusTone(status: ReportFile["status"]) {
  if (status === "Indexed") return "success" as const;
  if (status === "Review") return "warning" as const;
  return "info" as const;
}

function widthClassForPercent(percent: number) {
  if (percent >= 90) return "w-full";
  if (percent >= 75) return "w-3/4";
  if (percent >= 66) return "w-2/3";
  if (percent >= 50) return "w-1/2";
  if (percent >= 33) return "w-1/3";
  if (percent >= 25) return "w-1/4";
  if (percent > 0) return "w-1/5";
  return "w-0";
}

function StatusCard({ reports }: { reports: ReportFile[] }) {
  const total = Math.max(reports.length, 1);
  const rows = (["Indexed", "Pending", "Review"] as const).map((label) => {
    const value = reports.filter((report) => report.status === label).length;
    const pct = Math.round((value / total) * 100);
    return { label, value, pct, widthClass: widthClassForPercent(pct), classes: statusClasses[label] };
  });

  return (
    <Card>
      <CardHeader title="Status" subtitle="Reports by processing state" />
      <div className="px-5 py-4">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-semibold leading-8 text-[#16243d]">
            {formatNumber(reports.length)}
          </span>
          <span className="text-xs text-[#97a3b8]">total</span>
          <span className="ml-auto font-mono text-xs font-medium text-[#177245]">up 18%</span>
        </div>

        <div className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-[#f1f4f9]">
          {rows.map((row) => (
            <div key={row.label} className={`${row.widthClass} ${row.classes.bar}`} />
          ))}
        </div>

        <div className="mt-2 divide-y divide-[#eff2f7]">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5">
              <span className="flex items-center gap-2 text-sm text-[#44546d]">
                <span className={`h-2 w-2 rounded ${row.classes.dot}`} aria-hidden="true" />
                {row.label}
              </span>
              <span className="font-mono text-sm text-[#16243d]">
                {row.value}
                <span className="ml-1.5 text-xs text-[#97a3b8]">{row.pct}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function PlatformCard() {
  return (
    <Card>
      <CardHeader title="Platform breakdown" subtitle="Where infringements were detected" />
      <div className="space-y-3.5 px-5 py-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="grid grid-cols-[4rem_minmax(0,1fr)_2rem] items-center gap-3">
            <span className="truncate text-sm text-[#44546d]">{platform.name}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-[#f1f4f9]">
              <span className={`block h-full rounded-full bg-[#2563eb] ${platform.widthClass}`} />
            </span>
            <span className="text-right font-mono text-xs text-[#6c7a93]">{platform.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ActivityCard({ reports }: { reports: ReportFile[] }) {
  const visibleReports = [...reports]
    .sort((a, b) => b.lastModified.localeCompare(a.lastModified))
    .slice(0, 4);

  return (
    <Card>
      <CardHeader title="Recent activity" subtitle="Latest report updates" />
      <div className="divide-y divide-[#eff2f7]">
        {visibleReports.map((report) => (
          <div key={report.id} className="flex items-center justify-between gap-4 px-5 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#16243d]" title={report.fileName}>
                {report.fileName}
              </p>
              <p className="mt-0.5 font-mono text-xs text-[#97a3b8]">{report.reportDate}</p>
            </div>
            <Badge tone={statusTone(report.status)}>{report.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function EventAnalytics({ reports }: { reports: ReportFile[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader
            title="Enforcement trend"
            subtitle="Monthly report volume"
            action={<span className="text-xs text-[#97a3b8]">Last 6 months</span>}
          />
          <ReportsTrendChart data={[...reportsByMonth]} height={232} />
        </Card>
        <StatusCard reports={reports} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <PlatformCard />
        <ActivityCard reports={reports} />
      </div>
    </div>
  );
}

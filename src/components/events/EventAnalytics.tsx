"use client";

import { ReportsTrendChart } from "@/components/dashboard/ReportsTrendChart";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { reportsByMonth } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import type { ReportFile } from "@/types/report";

const platforms = [
  { name: "YouTube", value: 38 },
  { name: "Facebook", value: 23 },
  { name: "Telegram", value: 17 },
  { name: "TikTok", value: 12 },
  { name: "Other", value: 10 },
];

const STATUS_COLORS = {
  Indexed: "#2563eb",
  Pending: "#93b4f8",
  Review: "#d3e0fb",
} as const;

function statusTone(status: ReportFile["status"]) {
  if (status === "Indexed") return "success" as const;
  if (status === "Review") return "warning" as const;
  return "info" as const;
}

function StatusCard({ reports }: { reports: ReportFile[] }) {
  const total = Math.max(reports.length, 1);
  const rows = (["Indexed", "Pending", "Review"] as const).map((label) => {
    const value = reports.filter((report) => report.status === label).length;
    return { label, value, pct: Math.round((value / total) * 100), color: STATUS_COLORS[label] };
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader title="Status" subtitle="Reports by processing state" />
      <div className="px-5 py-4">
        <div className="flex items-baseline gap-1.5">
          <span className="t-num text-[26px] font-semibold leading-8 text-(--text-heading)">
            {formatNumber(reports.length)}
          </span>
          <span className="text-xs text-(--text-faint)">total</span>
          <span className="t-num ml-auto text-xs font-medium text-(--success)">↑ 18%</span>
        </div>

        <div className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-(--surface-3)">
          {rows.map((row) => (
            <div key={row.label} style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
          ))}
        </div>

        <div className="mt-2 divide-y divide-(--border-muted)">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5">
              <span className="flex items-center gap-2 text-[12.5px] text-(--text-body)">
                <span
                  className="h-2 w-2 rounded-[3px]"
                  style={{ backgroundColor: row.color }}
                  aria-hidden="true"
                />
                {row.label}
              </span>
              <span className="t-num text-[12.5px] text-(--text-heading)">
                {row.value}
                <span className="ml-1.5 text-[11px] text-(--text-faint)">{row.pct}%</span>
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
    <Card className="overflow-hidden">
      <CardHeader title="Platform breakdown" subtitle="Where infringements were detected" />
      <div className="space-y-3.5 px-5 py-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="grid grid-cols-[64px_minmax(0,1fr)_32px] items-center gap-3">
            <span className="truncate text-[12.5px] text-(--text-body)">{platform.name}</span>
            <span className="h-1.25 overflow-hidden rounded-full bg-(--surface-3)">
              <span
                className="block h-full rounded-full bg-(--accent)"
                style={{ width: `${platform.value}%` }}
              />
            </span>
            <span className="t-num text-right text-xs text-(--text-muted)">{platform.value}%</span>
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
    <Card className="overflow-hidden">
      <CardHeader title="Recent activity" subtitle="Latest report updates" />
      <div className="divide-y divide-(--border-muted)">
        {visibleReports.map((report) => (
          <div key={report.id} className="flex items-center justify-between gap-4 px-5 py-3">
            <div className="min-w-0">
              <p
                className="truncate text-[12.5px] font-medium text-(--text-heading)"
                title={report.fileName}
              >
                {report.fileName}
              </p>
              <p className="t-num mt-0.5 text-[11px] text-(--text-faint)">{report.reportDate}</p>
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
        <Card className="overflow-hidden">
          <CardHeader
            title="Enforcement trend"
            subtitle="Monthly report volume"
            action={<span className="text-[11px] text-(--text-faint)">Last 6 months</span>}
          />
          <div className="px-5 pb-4 pt-3">
            <ReportsTrendChart data={[...reportsByMonth]} height={232} />
          </div>
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

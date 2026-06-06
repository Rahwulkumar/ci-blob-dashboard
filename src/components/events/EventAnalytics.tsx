"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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

const distribution = [
  { name: "Indexed", value: 72, color: "#2563EB" },
  { name: "Pending", value: 18, color: "#93C5FD" },
  { name: "Review", value: 10, color: "#DBEAFE" },
];

function statusTone(status: ReportFile["status"]) {
  if (status === "Indexed") return "success";
  if (status === "Review") return "warning";
  return "info";
}

function TrendCard() {
  const maxReports = Math.max(...reportsByMonth.map((item) => item.reports), 1);
  const points = reportsByMonth
    .map((item, index) => {
      const x = 30 + index * (440 / Math.max(reportsByMonth.length - 1, 1));
      const y = 180 - (item.reports / maxReports) * 120;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-950">Enforcement trend</h2>
          <p className="mt-1 text-xs text-slate-500">Monthly CSV report volume</p>
        </div>
        <span className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500">
          Monthly
        </span>
      </div>
      <div className="h-56 rounded-lg bg-slate-50">
        <svg viewBox="0 0 520 220" className="h-full w-full" role="img" aria-label="Monthly report trend">
          {[60, 100, 140, 180].map((y) => (
            <line key={y} x1="26" x2="488" y1={y} y2={y} stroke="#E2E8F0" strokeDasharray="4 4" />
          ))}
          <polyline points={points} fill="none" stroke="#2563EB" strokeLinecap="round" strokeWidth="3" />
          <polygon points={`30,180 ${points} 470,180`} fill="#DBEAFE" opacity="0.65" />
          {reportsByMonth.map((item, index) => {
            const x = 30 + index * (440 / Math.max(reportsByMonth.length - 1, 1));
            const y = 180 - (item.reports / maxReports) * 120;
            return (
              <g key={item.month}>
                <circle cx={x} cy={y} r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                <text x={x} y="205" textAnchor="middle" className="fill-slate-500 text-[11px] font-medium">
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

function TakedownBreakdown({ reports }: { reports: ReportFile[] }) {
  const indexed = reports.filter((report) => report.status === "Indexed").length;
  const pending = reports.filter((report) => report.status === "Pending").length;
  const review = reports.filter((report) => report.status === "Review").length;
  const total = Math.max(reports.length, 1);
  const rows = [
    { label: "Indexed", value: indexed, pct: Math.round((indexed / total) * 100), color: "#2563EB" },
    { label: "Pending", value: pending, pct: Math.round((pending / total) * 100), color: "#93C5FD" },
    { label: "Review", value: review, pct: Math.round((review / total) * 100), color: "#DBEAFE" },
  ];

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-950">Report breakdown</h2>
        <MoreVertical className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </div>
      <div className="font-mono text-3xl font-semibold tracking-tight text-slate-950">{formatNumber(reports.length)}</div>
      <p className="mt-1 text-xs font-semibold text-green-600">+18% vs last reporting cycle</p>
      <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-slate-100">
        {rows.map((row) => (
          <div key={row.label} style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
        ))}
      </div>
      <div className="mt-4 divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-3 text-sm">
            <span className="flex items-center gap-2 font-medium text-slate-700">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: row.color }} />
              {row.label}
            </span>
            <span className="font-mono font-semibold text-slate-900">
              {row.value} <span className="font-sans text-xs font-medium text-slate-400">({row.pct}%)</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DistributionCard() {
  const circumference = 2 * Math.PI * 42;
  const segments = distribution.reduce<
    { name: string; value: number; color: string; dash: number; offset: number }[]
  >((items, item) => {
    const dash = (item.value / 100) * circumference;
    const previousOffset = items.at(-1)?.offset ?? 25;
    const previousDash = items.at(-1)?.dash ?? 0;
    return [...items, { ...item, dash, offset: previousOffset - previousDash }];
  }, []);

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-950">Distribution</h2>
        <MoreVertical className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </div>
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 140 140" className="h-52 w-52" role="img" aria-label="Report status distribution">
          <circle cx="70" cy="70" r="42" fill="none" stroke="#E2E8F0" strokeWidth="15" />
          {segments.map((item) => (
              <circle
                key={item.name}
                cx="70"
                cy="70"
                r="42"
                fill="none"
                stroke={item.color}
                strokeDasharray={`${item.dash} ${circumference - item.dash}`}
                strokeDashoffset={item.offset}
                strokeLinecap="round"
                strokeWidth="15"
                transform="rotate(-90 70 70)"
              />
          ))}
          <text x="70" y="66" textAnchor="middle" className="fill-slate-950 font-mono text-base font-semibold">
            100%
          </text>
          <text x="70" y="82" textAnchor="middle" className="fill-slate-400 text-[10px] font-semibold uppercase">
            Total
          </text>
        </svg>
      </div>
    </Card>
  );
}

function ActivityCard({ reports }: { reports: ReportFile[] }) {
  const [tab, setTab] = useState<"all" | "pending">("all");
  const [dateIndex, setDateIndex] = useState(4);
  const dates = ["Mon 21", "Tue 22", "Wed 23", "Thu 24", "Fri 25"];
  const visibleReports = reports
    .filter((report) => (tab === "pending" ? report.status !== "Indexed" : true))
    .slice(0, 4);

  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-950">Recent activity</h2>
        <MoreVertical className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </div>
      <div className="mb-3 flex items-center gap-1">
        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100" onClick={() => setDateIndex(Math.max(0, dateIndex - 1))}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        {dates.map((date, index) => (
          <button
            key={date}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
              index === dateIndex ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
            onClick={() => setDateIndex(index)}
          >
            {date}
          </button>
        ))}
        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100" onClick={() => setDateIndex(Math.min(4, dateIndex + 1))}>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="mb-2 flex gap-4 border-b border-slate-100">
        <button
          className={`border-b-2 py-2 text-xs font-semibold ${tab === "all" ? "border-blue-600 text-blue-700" : "border-transparent text-slate-400"}`}
          onClick={() => setTab("all")}
        >
          All
        </button>
        <button
          className={`border-b-2 py-2 text-xs font-semibold ${tab === "pending" ? "border-blue-600 text-blue-700" : "border-transparent text-slate-400"}`}
          onClick={() => setTab("pending")}
        >
          Pending
        </button>
      </div>
      <div className="max-h-56 divide-y divide-slate-100 overflow-y-auto">
        {visibleReports.map((report) => (
          <div key={report.id} className="py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold text-blue-700">{report.id.toUpperCase()}</span>
              <span className="text-xs text-slate-400">{report.reportDate}</span>
            </div>
            <p className="mt-1 truncate text-sm font-medium text-slate-800">{report.fileName}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge tone={statusTone(report.status)}>{report.status}</Badge>
              {report.status !== "Indexed" && <span className="text-xs font-semibold text-blue-600">Review</span>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PlatformBreakdown() {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-950">Platform breakdown</h2>
        <MoreVertical className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </div>
      <div className="space-y-4">
        {platforms.map((platform, index) => (
          <div key={platform.name}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-medium text-slate-700">{platform.name}</span>
              <span className="font-mono text-xs font-semibold text-slate-500">{platform.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-blue-600"
                style={{ opacity: Math.max(0.28, 1 - index * 0.13), width: `${platform.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function EventAnalytics({ reports }: { reports: ReportFile[] }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <TrendCard />
        <TakedownBreakdown reports={reports} />
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <DistributionCard />
        <ActivityCard reports={reports} />
        <PlatformBreakdown />
      </div>
    </div>
  );
}

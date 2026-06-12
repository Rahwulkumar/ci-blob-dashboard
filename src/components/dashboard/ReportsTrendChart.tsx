"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TrendPoint = { month: string; reports: number };

function TrendTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-sm border border-(--line) bg-white px-3 py-2 shadow-(--shadow-lift)">
      <div className="text-[11px] text-(--text-faint)">{label} 2025</div>
      <div className="t-num mt-0.5 text-[15px] font-semibold text-(--text-heading)">
        {payload[0]?.value}
        <span className="ml-1 text-[11px] font-normal text-(--text-muted)">reports</span>
      </div>
    </div>
  );
}

export function ReportsTrendChart({ data, height = 256 }: { data: TrendPoint[]; height?: number }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 4, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.09} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#eef2f8" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#97a3b8", fontSize: 11 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#97a3b8", fontSize: 11 }}
            width={44}
          />
          <Tooltip
            content={<TrendTooltip />}
            cursor={{ stroke: "#d9e0eb", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="reports"
            stroke="#2563eb"
            strokeWidth={1.75}
            fill="url(#trendFill)"
            activeDot={{ r: 3.5, fill: "#2563eb", stroke: "#ffffff", strokeWidth: 2 }}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

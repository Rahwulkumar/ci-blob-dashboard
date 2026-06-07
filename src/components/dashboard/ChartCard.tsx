import { Card } from "@/components/ui/Card";

export function ChartCard({ data }: { data: { month: string; reports: number }[] }) {
  const maxReports = Math.max(...data.map((item) => item.reports), 1);
  const points = data
    .map((item, index) => {
      const x = 40 + index * (520 / Math.max(data.length - 1, 1));
      const y = 210 - (item.reports / maxReports) * 150;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-950">Reports by month</h2>
          <p className="mt-1 text-xs text-slate-500">CSV uploads indexed across clients</p>
        </div>
      </div>
      <div className="h-72 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-2)]">
        <svg viewBox="0 0 620 260" className="h-full w-full" role="img" aria-label="Reports by month chart">
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[60, 110, 160, 210].map((y) => (
            <line key={y} x1="34" x2="590" y1={y} y2={y} stroke="#E2E8F0" strokeDasharray="4 4" />
          ))}
          <polygon points={`40,210 ${points} 560,210`} fill="url(#chartFill)" />
          <polyline points={points} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
          {data.map((item, index) => {
            const x = 40 + index * (520 / Math.max(data.length - 1, 1));
            const y = 210 - (item.reports / maxReports) * 150;
            return (
              <g key={item.month}>
                <circle cx={x} cy={y} r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                <text x={x} y="236" textAnchor="middle" className="fill-slate-500 text-[11px] font-medium">
                  {item.month}
                </text>
                <text x={x} y={y - 12} textAnchor="middle" className="fill-slate-700 text-[11px] font-semibold">
                  {item.reports}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

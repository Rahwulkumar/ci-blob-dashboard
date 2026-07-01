import { MosaicDashboard } from "@/components/dashboard/mosaic/MosaicDashboard";
import type { CoverageSnapshot, MosaicTrendPoint } from "@/components/dashboard/mosaic/types";
import { AppShell } from "@/components/layout/AppShell";
import { clients, events, reports } from "@/lib/mock-data";

const mosaicTrend: MosaicTrendPoint[] = [
  { month: "Feb", reports: 9, level: "level-1" },
  { month: "Mar", reports: 14, level: "level-2" },
  { month: "Apr", reports: 22, level: "level-3" },
  { month: "May", reports: 18, level: "level-4" },
  { month: "Jun", reports: 26, level: "level-5" },
  { month: "Jul", reports: 31, level: "level-6", current: true },
];

const clientMonthReports = [
  { clientId: "cricket-australia", reports: 18 },
  { clientId: "jiohotstar", reports: 11 },
  { clientId: "sri-lanka-cricket", reports: 2 },
];

const coverage: CoverageSnapshot = {
  percent: 71,
  label: "indexed",
  items: [
    { id: "indexed", label: "Indexed and delivered", value: 117, markerClassName: "bg-[#2563eb]" },
    { id: "processing", label: "Processing", value: 2, markerClassName: "bg-[#6b96f3]" },
    { id: "pending", label: "Pending review", value: 1, markerClassName: "bg-[#d9e0eb]" },
  ],
};

export default function Home() {
  return (
    <AppShell>
      <MosaicDashboard
        clients={clients}
        clientMonthReports={clientMonthReports}
        coverage={coverage}
        events={events}
        reports={reports}
        trend={mosaicTrend}
      />
    </AppShell>
  );
}

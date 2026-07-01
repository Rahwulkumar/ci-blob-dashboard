import { ClientMiniCard } from "@/components/dashboard/mosaic/ClientMiniCard";
import { CoverageRingTile } from "@/components/dashboard/mosaic/CoverageRingTile";
import { DeliveryTodayTile } from "@/components/dashboard/mosaic/DeliveryTodayTile";
import { HeroNumeralTile } from "@/components/dashboard/mosaic/HeroNumeralTile";
import { LatestDeliveryTile } from "@/components/dashboard/mosaic/LatestDeliveryTile";
import { ReportVolumeTile } from "@/components/dashboard/mosaic/ReportVolumeTile";
import type { ClientMonthReport, CoverageSnapshot, MosaicTrendPoint } from "@/components/dashboard/mosaic/types";
import { formatHeroDate, formatUtcTime, getLatestReport } from "@/components/dashboard/mosaic/utils";
import type { Client } from "@/types/client";
import type { EventSeries, ReportFile } from "@/types/report";

type MosaicDashboardProps = {
  clients: Client[];
  clientMonthReports: ClientMonthReport[];
  coverage: CoverageSnapshot;
  events: EventSeries[];
  reports: ReportFile[];
  trend: MosaicTrendPoint[];
};

export function MosaicDashboard({
  clients,
  clientMonthReports,
  coverage,
  events,
  reports,
  trend,
}: MosaicDashboardProps) {
  const latestReport = getLatestReport(reports);
  const reportTotal = clients.reduce((total, client) => total + client.reportsCount, 0);
  const heroDate = formatHeroDate(latestReport?.reportDate);
  const latestSync = formatUtcTime(latestReport?.lastModified);
  const clientMonthReportMap = new Map(clientMonthReports.map((item) => [item.clientId, item.reports]));

  return (
    <>
      <div className="grid grid-cols-1 gap-3.5 py-7 pb-14 sm:grid-cols-6 lg:grid-cols-12">
        <HeroNumeralTile
          reportTotal={reportTotal}
          clientCount={clients.length}
          eventCount={events.length}
          heroDate={heroDate}
        />
        <DeliveryTodayTile reportCount={reports.length} />
        <CoverageRingTile coverage={coverage} />
        <ReportVolumeTile trend={trend} />
        <LatestDeliveryTile clients={clients} events={events} report={latestReport} />
        {clients.map((client) => (
          <ClientMiniCard
            key={client.id}
            client={client}
            thisMonthReports={clientMonthReportMap.get(client.id) ?? 0}
            referenceDate={latestReport?.reportDate}
          />
        ))}
      </div>
      <footer className="flex flex-col justify-between gap-2 pb-11 text-xs text-[#97a3b8] sm:flex-row">
        <span>CII Intelligence - Client portal</span>
        <span>All pipelines operational - Last sync {latestSync}</span>
      </footer>
    </>
  );
}

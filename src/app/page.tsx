import Link from "next/link";
import { ClientRows, ClientRowsHeader } from "@/components/clients/ClientRows";
import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { RecentReportsTable } from "@/components/dashboard/RecentReportsTable";
import { ReportsTrendChart } from "@/components/dashboard/ReportsTrendChart";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader } from "@/components/ui/Card";
import { clients, events, reports } from "@/lib/mock-data";

const skylightReportsByMonth = [
  { month: "Feb", reports: 18 },
  { month: "Mar", reports: 27 },
  { month: "Apr", reports: 31 },
  { month: "May", reports: 39 },
  { month: "Jun", reports: 46 },
  { month: "Jul", reports: 31 },
];

function formatLatestReportDate(reportDate: string | undefined) {
  if (!reportDate) return { day: 25, month: "Jul" };

  const parsed = new Date(`${reportDate}T00:00:00Z`);
  return {
    day: parsed.getUTCDate(),
    month: parsed.toLocaleString("en", { month: "short", timeZone: "UTC" }),
  };
}

export default function Home() {
  const activeClients = clients.filter((client) => client.status === "Active").length;
  const latestReport = reports.map((report) => report.reportDate).sort().at(-1);
  const latestReportDate = formatLatestReportDate(latestReport);
  const reportTotal = 120;
  const latestMonthReports = skylightReportsByMonth.at(-1)?.reports ?? 31;

  const kpis = [
    {
      label: "Clients",
      value: clients.length,
      delta: "+1",
      description: `${activeClients} active - ${clients.length - activeClients} in review`,
    },
    {
      label: "Active events",
      value: events.length,
      delta: "+12%",
      description: `across ${clients.length} storage containers`,
    },
    {
      label: "Reports delivered",
      value: reportTotal,
      delta: "+18%",
      description: `${latestMonthReports} this month - a record`,
    },
    {
      label: "Latest report",
      value: (
        <>
          {latestReportDate.day} <small className="text-base font-semibold text-[#97a3b8]">{latestReportDate.month}</small>
        </>
      ),
      delta: "Auto-synced",
      dimDelta: true,
      description: "today at 12:20 UTC",
    },
  ];

  return (
    <AppShell>
      <header className="pb-2 pt-12 sm:pt-14">
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 rounded-full bg-[#2563eb]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">
            Friday, 25 July 2025
          </span>
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#16243d] sm:text-4xl">
          Good afternoon - <span className="text-[#2563eb]">{reports.length} new reports</span>
          <br />
          were delivered overnight.
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-[#6c7a93]">
          Every intelligence report across your portfolio, indexed and ready the moment it lands in storage.
        </p>
      </header>

      <KpiStrip items={kpis} />

      <section id="report-flow" className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]">
        <Card>
          <CardHeader
            title="Report flow"
            subtitle="Deliveries per month, February - July"
            action={
              <div className="flex rounded-full bg-[#f1f4f9] p-1" aria-label="Chart period">
                <span className="rounded-full px-3 py-1 text-xs font-semibold text-[#6c7a93]">Weekly</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#16243d] shadow-sm">
                  Monthly
                </span>
              </div>
            }
          />
          <ReportsTrendChart data={skylightReportsByMonth} />
        </Card>

        <RecentReportsTable
          reports={reports}
          clients={clients}
          events={events}
          title="Latest deliveries"
          subtitle="Most recent first"
          allHref="/clients"
        />
      </section>

      <section id="client-portfolio" className="mt-4">
        <Card>
          <CardHeader
            title="Client portfolio"
            subtitle={`${activeClients} of ${clients.length} active this week`}
            action={
              <Link href="/clients" className="text-sm font-bold text-[#2563eb] transition hover:text-[#1d4fd8]">
                Open clients -&gt;
              </Link>
            }
            className="pb-1.5"
          />
          <ClientRowsHeader />
          <ClientRows clients={clients} />
        </Card>
      </section>

      <footer className="flex flex-wrap justify-center gap-3 py-12 text-xs text-[#97a3b8] sm:gap-6">
        <span>CII Intelligence</span>
        <span>-</span>
        <span>All systems operational</span>
        <span>-</span>
        <span className="font-mono">Last sync 12:20 UTC</span>
      </footer>
    </AppShell>
  );
}

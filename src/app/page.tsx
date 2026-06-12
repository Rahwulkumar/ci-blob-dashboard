import Link from "next/link";
import { ClientRows, ClientRowsHeader } from "@/components/clients/ClientRows";
import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { LastUpdated } from "@/components/dashboard/LastUpdated";
import { RecentReportsTable } from "@/components/dashboard/RecentReportsTable";
import { ReportsTrendChart } from "@/components/dashboard/ReportsTrendChart";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardHeader } from "@/components/ui/Card";
import { clients, events, reports, reportsByMonth } from "@/lib/mock-data";

const services = [
  "Report ingestion",
  "Indexing engine",
  "Monitoring pipeline",
  "Delivery service",
] as const;

export default function Home() {
  const latestReport = reports.map((report) => report.reportDate).sort().at(-1);
  const activeClients = clients.filter((client) => client.status === "Active").length;

  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
        description="Portfolio performance, event coverage, and the latest intelligence reports."
        actions={<LastUpdated />}
      />

      <KpiStrip
        items={[
          { label: "Clients", value: String(clients.length), delta: "+3" },
          { label: "Active events", value: String(events.length), delta: "+12%" },
          { label: "Reports delivered", value: String(reports.length), delta: "+18%" },
          {
            label: "Latest report",
            value: latestReport ?? "N/A",
            delta: "Live",
            description: "synced automatically",
          },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="surface overflow-hidden">
          <CardHeader
            title="Report volume"
            subtitle="Reports delivered per month"
            action={<span className="text-[11px] text-(--text-faint)">Last 6 months</span>}
          />
          <div className="px-5 pb-4 pt-3">
            <ReportsTrendChart data={[...reportsByMonth]} />
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="surface overflow-hidden">
            <CardHeader title="This week" />
            <div className="divide-y divide-(--border-muted)">
              {[
                ["Reports indexed today", "4"],
                ["Pending review", "1"],
                ["Active clients", String(activeClients)],
                ["Events in coverage", String(events.length)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between px-5 py-2.75">
                  <span className="text-xs text-(--text-muted)">{label}</span>
                  <span className="t-num text-[13px] font-semibold text-(--text-heading)">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="surface overflow-hidden">
            <CardHeader
              title="System status"
              action={
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-(--success)">
                  <span className="dot dot-green h-1.5 w-1.5" aria-hidden="true" />
                  Operational
                </span>
              }
            />
            <div className="divide-y divide-(--border-muted)">
              {services.map((service) => (
                <div key={service} className="flex items-center justify-between px-5 py-2.75">
                  <span className="text-xs text-(--text-muted)">{service}</span>
                  <span className="dot dot-green h-1.5 w-1.5" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="surface mt-6 overflow-hidden">
        <CardHeader
          title="Clients"
          subtitle={`${activeClients} of ${clients.length} active`}
          action={
            <Link
              href="/clients"
              className="text-xs font-medium text-(--accent) transition-colors hover:text-(--accent-dark)"
            >
              View all
            </Link>
          }
        />
        <ClientRowsHeader />
        <ClientRows clients={clients} />
      </section>

      <div className="mt-6">
        <RecentReportsTable reports={reports} />
      </div>
    </AppShell>
  );
}

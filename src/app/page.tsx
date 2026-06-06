import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { RecentReportsTable } from "@/components/dashboard/RecentReportsTable";
import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { clients, events, reports, reportsByMonth } from "@/lib/mock-data";

export default function Home() {
  const latestUpload = reports
    .map((report) => report.reportDate)
    .sort()
    .at(-1);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Overview"
        title="Anti-piracy report workspaces"
        description="Monitor client folders, active events, report dates, and CSV files in Azure Blob Storage."
      />

      <KpiStrip
        items={[
          { label: "Clients", value: String(clients.length), delta: "+3", up: true },
          { label: "Events", value: String(events.length), delta: "+12%", up: true },
          { label: "Reports", value: String(reports.length), delta: "+18%", up: true },
          { label: "Latest", value: latestUpload ?? "N/A", delta: "Live", up: true },
        ]}
      />

      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-[-0.01em] text-slate-950">Client workspaces</h2>
          <p className="mt-1 text-xs text-slate-500">Choose a client to inspect event folders and uploaded CSV reports.</p>
        </div>
        <div className="hidden rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 md:block">
          {reportsByMonth.at(-1)?.reports ?? 0} July uploads
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (
          <WorkspaceCard key={client.id} client={client} />
        ))}
      </div>

      <div className="mt-4">
        <RecentReportsTable reports={reports} />
      </div>
    </AppShell>
  );
}

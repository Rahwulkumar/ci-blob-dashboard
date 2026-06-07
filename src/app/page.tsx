import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { RecentReportsTable } from "@/components/dashboard/RecentReportsTable";
import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { containerName } from "@/lib/constants";
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

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <span className="panel-label">Workspace index</span>
              <h2 className="mt-2 text-sm font-semibold tracking-[-0.01em] text-slate-950">Client workspaces</h2>
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
        </section>

        <aside className="space-y-3">
          <Card className="hatch-panel overflow-hidden">
            <div className="border-b border-[var(--line)] px-4 py-3">
              <span className="panel-label">Blob map</span>
              <h2 className="mt-3 text-[13px] font-semibold text-slate-950">Storage hierarchy</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">The operational path every upload resolves into.</p>
            </div>
            <div className="space-y-2 p-4">
              {[
                `${containerName}/`,
                "client-name/",
                "event-name/",
                "report-date/",
                "file.csv",
              ].map((part, index) => (
                <div key={part} className="flex items-center gap-2">
                  <span className="coordinate-tag w-10">L{index + 1}</span>
                  <div className="console-mono flex-1 rounded-[var(--radius-sm)] border border-slate-200 bg-white/75 px-3 py-2 text-xs text-slate-700">
                    {part}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="coordinate-tag mb-3">SYSTEM / INGEST</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Container", containerName],
                ["Mode", "Mock data"],
                ["API", "Server only"],
                ["Secrets", ".env.local"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[var(--radius-sm)] border border-slate-100 bg-slate-50 p-3">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-2)]">{label}</div>
                  <div className="console-mono truncate text-xs font-semibold text-slate-800">{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      <div className="mt-4">
        <div className="mb-3">
          <span className="panel-label">Report stream</span>
        </div>
        <RecentReportsTable reports={reports} />
      </div>
    </AppShell>
  );
}

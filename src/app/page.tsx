import { Activity, Cloud, Database, Server } from "lucide-react";
import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { RecentReportsTable } from "@/components/dashboard/RecentReportsTable";
import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { containerName } from "@/lib/constants";
import { clients, events, reports, reportsByMonth } from "@/lib/mock-data";

export default function Home() {
  const latestUpload = reports.map((report) => report.reportDate).sort().at(-1);
  const activeClients = clients.filter((client) => client.status === "Active").length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Overview"
        title="Anti-piracy report workspaces"
        description="Monitor client folders, active events, and CSV reports uploaded to Azure Blob Storage."
      />

      <KpiStrip
        items={[
          { label: "Clients", value: String(clients.length), delta: "+3", up: true },
          { label: "Events", value: String(events.length), delta: "+12%", up: true },
          { label: "Reports", value: String(reports.length), delta: "+18%", up: true },
          { label: "Latest upload", value: latestUpload ?? "N/A", delta: "Live", up: true },
        ]}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[14px] font-semibold text-[var(--text-heading)]">Client workspaces</h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {clients.length} clients, {reportsByMonth.at(-1)?.reports ?? 0} uploads this month
              </p>
            </div>
            <div className="hidden rounded-[var(--radius-sm)] border border-[var(--line)] bg-white px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] sm:block">
              {activeClients} active
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {clients.map((client) => (
              <WorkspaceCard key={client.id} client={client} />
            ))}
          </div>
        </section>

        <aside className="space-y-3">
          <section className="surface overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
              <Server className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
              <h2 className="text-[13px] font-semibold text-[var(--text-heading)]">System status</h2>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[var(--green-border)] bg-[var(--green-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--success)]">
                <span className="dot dot-green h-[5px] w-[5px]" />
                Operational
              </span>
            </div>

            <div className="space-y-3 p-4">
              {[
                { icon: Cloud, label: "Storage", value: "Azure Blob", tone: "green" },
                { icon: Database, label: "Container", value: containerName, tone: "green" },
                { icon: Activity, label: "Ingest API", value: "Server-side", tone: "green" },
                { icon: Server, label: "Mode", value: "Mock data", tone: "amber" },
              ].map(({ icon: Icon, label, value, tone }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--text-faint)]" aria-hidden="true" />
                    <span className="text-xs text-[var(--text-muted)]">{label}</span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="console-mono truncate text-xs font-medium text-[var(--text-body)]">{value}</span>
                    <span className={`dot h-[5px] w-[5px] ${tone === "green" ? "dot-green" : "dot-amber"}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="surface overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
              <Activity className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
              <h2 className="text-[13px] font-semibold text-[var(--text-heading)]">Activity</h2>
            </div>
            <div className="divide-y divide-[var(--border-muted)]">
              {[
                ["Indexed today", "4"],
                ["Pending review", "1"],
                ["Active clients", String(activeClients)],
                ["Events this month", String(events.length)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs text-[var(--text-muted)]">{label}</span>
                  <span className="console-mono text-[13px] font-semibold text-[var(--text-heading)]">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <div className="mt-5">
        <RecentReportsTable reports={reports} />
      </div>
    </AppShell>
  );
}

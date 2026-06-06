import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Client } from "@/types/client";

export function WorkspaceCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`} className="group block">
      <Card className="overflow-hidden transition duration-150 group-hover:-translate-y-0.5 group-hover:border-blue-300 group-hover:shadow-[var(--shadow-lift)]">
        <div className="h-[3px] bg-blue-600 opacity-70 transition group-hover:opacity-100" />
        <div className="p-[18px]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-blue-100 bg-blue-50 text-blue-700">
              <FolderKanban className="h-[17px] w-[17px]" aria-hidden="true" />
            </div>
            <Badge tone={client.status === "Active" ? "success" : "warning"}>
              {client.status}
            </Badge>
          </div>
          <h2 className="mb-1 text-[13px] font-semibold tracking-[-0.01em] text-slate-950">{client.name}</h2>
          <p className="mb-4 min-h-10 text-xs leading-5 text-[var(--muted)]">
            Event folders, report dates, and CSV inventory for this client workspace.
          </p>
          <div className="mb-4 grid grid-cols-3 border-t border-slate-100 pt-3">
            {[
              ["Events", client.eventsCount],
              ["Reports", client.reportsCount],
              ["Last", client.lastUploadDate.slice(5)],
            ].map(([label, value], index) => (
              <div key={label} className={index > 0 ? "border-l border-slate-100 pl-3" : ""}>
                <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-2)]">
                  {label}
                </div>
                <div className="console-mono text-[13px] font-semibold text-slate-950">{value}</div>
              </div>
            ))}
          </div>
          <div className="flex h-8 items-center justify-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--accent)] text-xs font-semibold text-white transition group-hover:bg-[var(--accent-dark)]">
            Open workspace <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

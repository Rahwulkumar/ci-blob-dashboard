import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import type { Client } from "@/types/client";

export function ClientCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`} className="group block">
      <Card className="h-full overflow-hidden transition group-hover:-translate-y-0.5 group-hover:border-blue-300 group-hover:shadow-[var(--shadow-lift)]">
        <div className="h-[3px] bg-blue-600 opacity-70 transition group-hover:opacity-100" />
        <div className="p-[18px]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="console-mono flex h-10 w-10 items-center justify-center rounded-[9px] bg-blue-600 text-xs font-bold text-white">
              {client.shortName}
            </div>
            <div>
              <h2 className="text-[13px] font-semibold text-slate-950">{client.name}</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">{client.eventsCount} events tracked</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="coordinate-tag">{client.id.slice(0, 10)}</span>
            <Badge tone={client.status === "Active" ? "success" : "warning"}>{client.status}</Badge>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-[var(--radius-sm)] border border-slate-100 bg-slate-50 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-2)]">Reports</div>
            <div className="console-mono mt-1 text-sm font-semibold text-slate-950">{formatNumber(client.reportsCount)}</div>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-slate-100 bg-slate-50 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-2)]">Last upload</div>
            <div className="console-mono mt-1 text-sm font-semibold text-slate-950">{client.lastUploadDate}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-2 text-slate-500">
            <FolderKanban className="h-4 w-4" aria-hidden="true" />
            Client folder
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
            Open <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
        </div>
      </Card>
    </Link>
  );
}

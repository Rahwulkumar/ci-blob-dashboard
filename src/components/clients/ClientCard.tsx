import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import type { Client } from "@/types/client";

export function ClientCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`} className="group block">
      <Card className="h-full p-4 transition duration-150 group-hover:border-[var(--line-strong)] group-hover:shadow-[var(--shadow-lift)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="console-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-2)] text-xs font-semibold text-[var(--text-heading)]">
              {client.shortName}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-[13px] font-semibold text-[var(--text-heading)]">{client.name}</h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{client.eventsCount} events tracked</p>
            </div>
          </div>
          <Badge tone={client.status === "Active" ? "success" : "warning"}>{client.status}</Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="surface-muted p-3">
            <div className="text-[10px] font-medium text-[var(--text-faint)]">Reports</div>
            <div className="console-mono mt-1 text-sm font-semibold text-[var(--text-heading)]">
              {formatNumber(client.reportsCount)}
            </div>
          </div>
          <div className="surface-muted p-3">
            <div className="text-[10px] font-medium text-[var(--text-faint)]">Last upload</div>
            <div className="console-mono mt-1 text-sm font-semibold text-[var(--text-heading)]">{client.lastUploadDate}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--border-muted)] pt-3 text-xs">
          <span className="inline-flex items-center gap-2 text-[var(--text-muted)]">
            <FolderKanban className="h-4 w-4" aria-hidden="true" />
            Client folder
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-[var(--accent)]">
            Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

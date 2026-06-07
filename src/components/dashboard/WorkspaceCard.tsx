import Link from "next/link";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Client } from "@/types/client";

export function WorkspaceCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`} className="group block" aria-label={`Open ${client.name}`}>
      <article className="surface h-full p-4 transition duration-150 group-hover:border-[var(--line-strong)] group-hover:shadow-[var(--shadow-lift)]">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-[14px] font-semibold text-[var(--text-heading)]">{client.name}</h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{client.eventsCount} events tracked</p>
          </div>
          <Badge tone={client.status === "Active" ? "success" : "warning"}>{client.status}</Badge>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { icon: CalendarDays, label: "Events", value: client.eventsCount },
            { icon: FileText, label: "Reports", value: client.reportsCount },
            { icon: CalendarDays, label: "Last", value: client.lastUploadDate.slice(5) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="surface-muted px-3 py-2">
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-[var(--text-faint)]">
                <Icon className="h-3 w-3" aria-hidden="true" />
                {label}
              </div>
              <div className="console-mono text-[13px] font-semibold text-[var(--text-heading)]">{value}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-muted)] pt-3 text-xs">
          <span className="text-[var(--text-muted)]">Workspace</span>
          <span className="inline-flex items-center gap-1 font-medium text-[var(--accent)]">
            Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}

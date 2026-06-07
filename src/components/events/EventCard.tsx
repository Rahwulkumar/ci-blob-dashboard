import Link from "next/link";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { EventSeries } from "@/types/report";

export function EventCard({ event }: { event: EventSeries }) {
  return (
    <Link href={`/clients/${event.clientId}/events/${event.id}`} className="group block" aria-label={`View ${event.name}`}>
      <article className="surface h-full p-4 transition duration-150 group-hover:border-[var(--line-strong)] group-hover:shadow-[var(--shadow-lift)]">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className="text-[14px] font-semibold leading-5 text-[var(--text-heading)]">{event.name}</h2>
          <Badge tone="info" showDot={false}>
            {event.reportsCount} reports
          </Badge>
        </div>

        <div className="space-y-2 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-[var(--text-faint)]" aria-hidden="true" />
            {event.dateRange}
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-[var(--text-faint)]" aria-hidden="true" />
            Last report: {event.lastReportDate}
          </div>
        </div>

        <div className="mt-4 rounded-[var(--radius-sm)] border border-[var(--border-muted)] bg-[var(--surface-2)] px-3 py-2">
          <div className="mb-1 text-[10px] font-medium text-[var(--text-faint)]">Folder path</div>
          <div className="console-mono truncate text-[11px] text-[var(--text-body)]">{event.folderPath}</div>
        </div>

        <div className="mt-4 flex justify-end text-xs font-medium text-[var(--accent)]">
          <span className="inline-flex items-center gap-1">
            View reports <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}

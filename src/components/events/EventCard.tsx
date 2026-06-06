import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { EventSeries } from "@/types/report";

export function EventCard({ event }: { event: EventSeries }) {
  return (
    <Link href={`/clients/${event.clientId}/events/${event.id}`} className="group block">
      <Card className="h-full p-[18px] transition group-hover:-translate-y-0.5 group-hover:border-blue-300 group-hover:shadow-[var(--shadow-lift)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-950">{event.name}</h2>
            <p className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]">
              <CalendarDays className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />
              {event.dateRange}
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-100">
            {event.reportsCount} reports
          </span>
        </div>
        <div className="mt-5 rounded-[var(--radius-sm)] border border-slate-100 bg-slate-50 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted-2)]">Folder path</div>
          <div className="console-mono mt-1 truncate text-xs text-slate-600">{event.folderPath}</div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-slate-500">Last report: {event.lastReportDate}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
            Reports <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

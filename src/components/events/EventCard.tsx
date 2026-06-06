import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { EventSeries } from "@/types/report";

export function EventCard({ event }: { event: EventSeries }) {
  return (
    <Link href={`/clients/${event.clientId}/events/${event.id}`} className="group block">
      <Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-950">{event.name}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4 text-blue-500" aria-hidden="true" />
              {event.dateRange}
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {event.reportsCount} reports
          </span>
        </div>
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-medium text-slate-500">Folder path</div>
          <div className="mt-1 truncate font-mono text-xs text-slate-600">{event.folderPath}</div>
        </div>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="text-slate-500">Last report: {event.lastReportDate}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
            Reports <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

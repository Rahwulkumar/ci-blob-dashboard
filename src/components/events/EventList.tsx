import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import type { EventSeries } from "@/types/report";

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_20px] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_72px_88px_20px]";

export function EventList({ events }: { events: EventSeries[] }) {
  return (
    <Card>
      <div className={`${rowGrid} border-b border-[#e9edf4] bg-[#f8fafd] px-5 py-2`}>
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">Event</span>
        <span className="hidden text-right text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8] sm:block">
          Reports
        </span>
        <span className="hidden text-right text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8] sm:block">
          Last report
        </span>
        <span aria-hidden="true" />
      </div>
      <div className="divide-y divide-[#eff2f7]">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/clients/${event.clientId}/events/${event.id}`}
            className={`${rowGrid} px-5 py-3.5 transition hover:bg-white`}
            aria-label={`View ${event.name}`}
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-[#16243d]">{event.name}</span>
              <span className="mt-0.5 block text-xs text-[#97a3b8]">{event.dateRange}</span>
            </span>
            <span className="hidden text-right font-mono text-sm text-[#44546d] sm:block">
              {formatNumber(event.reportsCount)}
            </span>
            <span className="hidden text-right font-mono text-sm text-[#6c7a93] sm:block">
              {event.lastReportDate}
            </span>
            <ChevronRight className="h-4 w-4 justify-self-end text-[#97a3b8]" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </Card>
  );
}

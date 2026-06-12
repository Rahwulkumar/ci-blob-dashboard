import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import type { EventSeries } from "@/types/report";

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_20px] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_72px_88px_20px]";

export function EventList({ events }: { events: EventSeries[] }) {
  return (
    <div className="surface overflow-hidden">
      <div className={`${rowGrid} border-b border-(--line) bg-(--surface-2) px-5 py-2`}>
        <span className="t-label-xs">Event</span>
        <span className="t-label-xs hidden text-right sm:block">Reports</span>
        <span className="t-label-xs hidden text-right sm:block">Last report</span>
        <span aria-hidden="true" />
      </div>
      <div className="divide-y divide-(--border-muted)">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/clients/${event.clientId}/events/${event.id}`}
            className={`${rowGrid} row-link px-5 py-3.5`}
            aria-label={`View ${event.name}`}
          >
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-(--text-heading)">
                {event.name}
              </span>
              <span className="mt-0.5 block text-[11.5px] text-(--text-faint)">
                {event.dateRange}
              </span>
            </span>
            <span className="t-num hidden text-right text-[13px] text-(--text-body) sm:block">
              {formatNumber(event.reportsCount)}
            </span>
            <span className="t-num hidden text-right text-[12.5px] text-(--text-muted) sm:block">
              {event.lastReportDate}
            </span>
            <ChevronRight className="h-4 w-4 justify-self-end text-(--text-faint)" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}

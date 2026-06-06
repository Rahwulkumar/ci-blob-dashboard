import { EventCard } from "@/components/events/EventCard";
import type { EventSeries } from "@/types/report";

export function EventList({ events }: { events: EventSeries[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

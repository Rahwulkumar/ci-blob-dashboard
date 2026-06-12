import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { EventList } from "@/components/events/EventList";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { getClient, getEventsForClient } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClient(clientId);
  if (!client) notFound();

  const clientEvents = getEventsForClient(clientId);

  const stats = [
    { label: "Events in coverage", value: String(client.eventsCount) },
    { label: "Reports delivered", value: formatNumber(client.reportsCount) },
    { label: "Latest report", value: client.lastUploadDate },
  ];

  return (
    <AppShell>
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs" aria-label="Breadcrumb">
        <Link
          className="text-(--text-muted) transition-colors hover:text-(--accent)"
          href="/clients"
        >
          Clients
        </Link>
        <ChevronRight className="h-3 w-3 text-(--text-faint)" aria-hidden="true" />
        <span className="font-medium text-(--text-heading)">{client.name}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-3.5">
          <Avatar label={client.shortName} size="lg" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[24px] font-semibold leading-8 tracking-tight text-(--text-heading)">
                {client.name}
              </h1>
              <Badge tone={client.status === "Active" ? "success" : "warning"}>
                {client.status}
              </Badge>
            </div>
            <p className="mt-0.5 text-[13px] text-(--text-muted)">
              Anti-piracy monitoring and intelligence reporting
            </p>
          </div>
        </div>
        <div className="mt-6 h-px bg-(--line)" aria-hidden="true" />
      </header>

      <dl className="mb-10 grid grid-cols-1 gap-px overflow-hidden rounded-(--radius) border border-(--line) bg-(--line) sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white px-6 py-4.5">
            <dt className="t-label-xs">{stat.label}</dt>
            <dd className="t-num mt-2 text-[22px] font-semibold leading-7 text-(--text-heading)">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold tracking-tight text-(--text-heading)">
          Event coverage
        </h2>
        <span className="text-xs text-(--text-faint)">
          {clientEvents.length} {clientEvents.length === 1 ? "event" : "events"}
        </span>
      </div>

      {clientEvents.length > 0 ? (
        <EventList events={clientEvents} />
      ) : (
        <EmptyState
          title="No events in coverage"
          description="Once an event is set up for this client, its monitoring reports will appear here."
        />
      )}
    </AppShell>
  );
}

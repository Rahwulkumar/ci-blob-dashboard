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
        <Link className="text-[#6c7a93] transition-colors hover:text-[#2563eb]" href="/clients">
          Clients
        </Link>
        <ChevronRight className="h-3 w-3 text-[#97a3b8]" aria-hidden="true" />
        <span className="font-medium text-[#16243d]">{client.name}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-3.5">
          <Avatar label={client.shortName} size="lg" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-[#16243d]">{client.name}</h1>
              <Badge tone={client.status === "Active" ? "success" : "warning"}>
                {client.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-[#6c7a93]">
              Anti-piracy monitoring and intelligence reporting
            </p>
          </div>
        </div>
        <div className="mt-6 h-px bg-[#e9edf4]" aria-hidden="true" />
      </header>

      <dl className="mb-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#e9edf4] bg-[#e9edf4] sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white px-6 py-5">
            <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">{stat.label}</dt>
            <dd className="mt-2 font-mono text-2xl font-semibold leading-7 text-[#16243d]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-[#16243d]">Event coverage</h2>
        <span className="text-xs text-[#97a3b8]">
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

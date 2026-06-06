import { notFound } from "next/navigation";
import { EventList } from "@/components/events/EventList";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { getClient, getEventsForClient } from "@/lib/mock-data";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClient(clientId);
  if (!client) notFound();

  const clientEvents = getEventsForClient(clientId);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Client detail"
        title={client.name}
        description={`${client.reportsCount} CSV reports across ${client.eventsCount} event folders. Last upload: ${client.lastUploadDate}.`}
      />
      {clientEvents.length > 0 ? (
        <EventList events={clientEvents} />
      ) : (
        <EmptyState title="No events found" description="Create an upload for this client to start a new event folder." />
      )}
    </AppShell>
  );
}

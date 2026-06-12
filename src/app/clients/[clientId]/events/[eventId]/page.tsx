import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { EventAnalytics } from "@/components/events/EventAnalytics";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportBreadcrumb } from "@/components/reports/ReportBreadcrumb";
import { ReportTable } from "@/components/reports/ReportTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { getClient, getEvent, getReportsForEvent } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ clientId: string; eventId: string }>;
}) {
  const { clientId, eventId } = await params;
  const client = getClient(clientId);
  if (!client) notFound();

  const event =
    getEvent(clientId, eventId) ?? {
      id: eventId,
      clientId,
      name: eventId
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      dateRange: "Not specified",
      reportsCount: 0,
      lastReportDate: "N/A",
      folderPath: `raw-csv-reports/${slugify(client.name)}/${eventId}/`,
    };

  const eventReports = getReportsForEvent(clientId, eventId);

  return (
    <AppShell>
      <ReportBreadcrumb clientName={client.name} clientId={client.id} eventName={event.name} />
      <PageHeader
        title={event.name}
        description={`Monitoring intelligence and enforcement reporting for ${client.name}.`}
        actions={
          <span className="t-num rounded-sm border border-(--line) bg-(--surface-2) px-2.5 py-1 text-xs text-(--text-muted)">
            {event.dateRange}
          </span>
        }
      />
      {eventReports.length > 0 ? (
        <>
          <EventAnalytics reports={eventReports} />
          <div className="mt-6">
            <ReportTable reports={eventReports} />
          </div>
        </>
      ) : (
        <EmptyState
          title="No reports yet"
          description="Reports for this event will appear here as soon as they are delivered and indexed."
        />
      )}
    </AppShell>
  );
}

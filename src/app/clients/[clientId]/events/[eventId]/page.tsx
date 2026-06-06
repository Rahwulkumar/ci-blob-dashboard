import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { EventAnalytics } from "@/components/events/EventAnalytics";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportBreadcrumb } from "@/components/reports/ReportBreadcrumb";
import { ReportFileCard } from "@/components/reports/ReportFileCard";
import { ReportTable } from "@/components/reports/ReportTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { getClient, getEvent, getReportsForEvent } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";

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
        eyebrow="Event reports"
        title={event.name}
        description={`Folder path: ${event.folderPath}`}
        actions={
          <Link
            href="/upload"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <UploadCloud className="h-4 w-4" aria-hidden="true" />
            Upload new file
          </Link>
        }
      />
      {eventReports.length > 0 ? (
        <>
          <EventAnalytics reports={eventReports} />
          <div className="my-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {eventReports.slice(0, 3).map((report) => (
              <ReportFileCard key={report.id} report={report} />
            ))}
          </div>
          <ReportTable reports={eventReports} />
        </>
      ) : (
        <EmptyState title="No report files" description="Upload a CSV to create the first report date folder for this event." />
      )}
    </AppShell>
  );
}

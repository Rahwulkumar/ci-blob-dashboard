import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ReportBreadcrumb({
  clientName,
  clientId,
  eventName,
}: {
  clientName: string;
  clientId: string;
  eventName: string;
}) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs" aria-label="Breadcrumb">
      <Link
        className="text-(--text-muted) transition-colors hover:text-(--accent)"
        href="/clients"
      >
        Clients
      </Link>
      <ChevronRight className="h-3 w-3 text-(--text-faint)" aria-hidden="true" />
      <Link
        className="text-(--text-muted) transition-colors hover:text-(--accent)"
        href={`/clients/${clientId}`}
      >
        {clientName}
      </Link>
      <ChevronRight className="h-3 w-3 text-(--text-faint)" aria-hidden="true" />
      <span className="font-medium text-(--text-heading)">{eventName}</span>
    </nav>
  );
}

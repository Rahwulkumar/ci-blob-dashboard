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
    <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
      <Link className="font-medium text-blue-600 hover:text-blue-700" href="/clients">
        Clients
      </Link>
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
      <Link className="font-medium text-blue-600 hover:text-blue-700" href={`/clients/${clientId}`}>
        {clientName}
      </Link>
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
      <span className="font-medium text-slate-700">{eventName}</span>
    </nav>
  );
}

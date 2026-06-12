import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatNumber } from "@/lib/utils";
import type { Client } from "@/types/client";

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_72px_20px] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_64px_72px_88px_76px_20px]";

export function ClientRowsHeader() {
  return (
    <div className={`${rowGrid} border-b border-(--line) bg-(--surface-2) px-5 py-2`}>
      <span className="t-label-xs">Client</span>
      <span className="t-label-xs hidden text-right sm:block">Events</span>
      <span className="t-label-xs hidden text-right sm:block">Reports</span>
      <span className="t-label-xs hidden text-right sm:block">Last report</span>
      <span className="t-label-xs">Status</span>
      <span aria-hidden="true" />
    </div>
  );
}

export function ClientRows({ clients }: { clients: Client[] }) {
  return (
    <div className="divide-y divide-(--border-muted)">
      {clients.map((client) => (
        <Link
          key={client.id}
          href={`/clients/${client.id}`}
          className={`${rowGrid} row-link px-5 py-3`}
          aria-label={`Open ${client.name}`}
        >
          <span className="flex min-w-0 items-center gap-3">
            <Avatar label={client.shortName} size="sm" />
            <span className="truncate text-[13px] font-medium text-(--text-heading)">
              {client.name}
            </span>
          </span>
          <span className="t-num hidden text-right text-[13px] text-(--text-body) sm:block">
            {client.eventsCount}
          </span>
          <span className="t-num hidden text-right text-[13px] text-(--text-body) sm:block">
            {formatNumber(client.reportsCount)}
          </span>
          <span className="t-num hidden text-right text-[12.5px] text-(--text-muted) sm:block">
            {client.lastUploadDate}
          </span>
          <Badge tone={client.status === "Active" ? "success" : "warning"}>{client.status}</Badge>
          <ChevronRight className="h-4 w-4 justify-self-end text-(--text-faint)" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Client } from "@/types/client";

const columnGrid =
  "grid grid-cols-[minmax(0,1.5fr)_1fr_1fr_1.4fr_auto] items-center gap-4 px-6 max-sm:grid-cols-[minmax(0,1fr)_auto]";

const meterWidths = [
  "w-1/5",
  "w-1/4",
  "w-1/3",
  "w-1/2",
  "w-2/3",
  "w-3/4",
  "w-full",
] as const;

export function ClientRowsHeader() {
  return (
    <div className={`${columnGrid} border-b border-[#e9edf4] py-3`}>
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">Client</span>
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8] max-sm:hidden">Events</span>
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8] max-sm:hidden">Last upload</span>
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8] max-sm:hidden">Report volume</span>
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">Status</span>
    </div>
  );
}

function uploadLabel(date: string) {
  if (date === "2025-07-25") return ["25 Jul", "today"];
  if (date === "2025-07-24") return ["24 Jul", "yesterday"];
  return ["21 Jul", "4 days ago"];
}

function meterWidthClass(value: number, max: number) {
  const ratio = value / Math.max(max, 1);
  if (ratio >= 0.95) return meterWidths[6];
  if (ratio >= 0.72) return meterWidths[5];
  if (ratio >= 0.62) return meterWidths[4];
  if (ratio >= 0.48) return meterWidths[3];
  if (ratio >= 0.33) return meterWidths[2];
  if (ratio >= 0.24) return meterWidths[1];
  return meterWidths[0];
}

export function ClientRows({ clients }: { clients: Client[] }) {
  const maxReports = Math.max(...clients.map((client) => client.reportsCount), 1);

  return (
    <>
      {clients.map((client) => {
        const [day, relative] = uploadLabel(client.lastUploadDate);
        const active = client.status === "Active";

        return (
          <Link
            key={client.id}
            href={`/clients/${client.id}`}
            className={`${columnGrid} border-t border-[#e9edf4] py-4 transition hover:bg-white`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[#dbe7fd] bg-gradient-to-br from-[#eef3fe] to-white text-xs font-extrabold text-[#1d4fd8]">
                {client.shortName === "SLC" ? "SL" : client.shortName}
              </span>
              <span className="min-w-0">
                <h3 className="truncate text-base font-bold text-[#16243d]">{client.name}</h3>
                <span className="mt-0.5 block text-xs text-[#97a3b8]">{client.eventsCount} event series in coverage</span>
              </span>
            </span>
            <span className="text-sm font-semibold text-[#16243d] max-sm:hidden">
              {client.eventsCount}
              <small className="mt-0.5 block text-xs font-medium text-[#97a3b8]">events</small>
            </span>
            <span className="text-sm font-semibold text-[#16243d] max-sm:hidden">
              {day}
              <small className="mt-0.5 block text-xs font-medium text-[#97a3b8]">{relative}</small>
            </span>
            <span className="flex items-center gap-3 max-sm:hidden">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f1f4f9]">
                <span
                  className={`block h-full rounded-full ${meterWidthClass(client.reportsCount, maxReports)} ${
                    active ? "bg-gradient-to-r from-[#6b96f3] to-[#2563eb]" : "bg-[#97a3b8]"
                  }`}
                />
              </span>
              <b className="font-mono text-xs text-[#16243d]">{client.reportsCount}</b>
            </span>
            <Badge tone={active ? "success" : "warning"}>{active ? "Active" : "Review"}</Badge>
          </Link>
        );
      })}
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ClientRows, ClientRowsHeader } from "@/components/clients/ClientRows";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Client, ClientStatus } from "@/types/client";

const filters: { label: string; value: ClientStatus | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "In review", value: "Review" },
];

export function ClientList({ clients }: { clients: Client[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ClientStatus | "All">("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((client) => {
      if (status !== "All" && client.status !== status) return false;
      if (q && !client.name.toLowerCase().includes(q) && !client.shortName.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [clients, query, status]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-(--text-faint)"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clients"
            aria-label="Search clients"
            className="h-8.5 w-full rounded-sm border border-(--line-strong) bg-white pl-9 pr-3 text-[13px] text-(--text-heading) outline-none transition placeholder:text-(--text-faint) focus:border-(--accent) focus:ring-3 focus:ring-blue-600/10"
          />
        </div>

        <div
          className="flex items-center gap-0.5 self-start rounded-sm border border-(--line) bg-(--surface-2) p-0.5"
          role="group"
          aria-label="Filter clients by status"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatus(filter.value)}
              aria-pressed={status === filter.value}
              className={`rounded-[5px] px-2.5 py-1 text-xs font-medium transition-colors ${
                status === filter.value
                  ? "bg-white text-(--text-heading) shadow-(--shadow-console)"
                  : "text-(--text-muted) hover:text-(--text-heading)"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="surface overflow-hidden">
          <ClientRowsHeader />
          <ClientRows clients={visible} />
        </div>
      ) : (
        <EmptyState
          title="No matching clients"
          description="Try a different search term or clear the status filter."
        />
      )}
    </div>
  );
}

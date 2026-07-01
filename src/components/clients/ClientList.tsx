"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ClientRows, ClientRowsHeader } from "@/components/clients/ClientRows";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
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
    const normalizedQuery = query.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesStatus = status === "All" || client.status === status;
      const matchesQuery =
        !normalizedQuery ||
        client.name.toLowerCase().includes(normalizedQuery) ||
        client.shortName.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [clients, query, status]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#97a3b8]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clients"
            aria-label="Search clients"
            className="h-9 w-full rounded-lg border border-[#d9e0eb] bg-white pl-9 pr-3 text-sm text-[#16243d] outline-none transition placeholder:text-[#97a3b8] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-600/10"
          />
        </div>

        <div
          className="flex items-center gap-1 self-start rounded-lg border border-[#e9edf4] bg-[#f8fafd] p-1"
          role="group"
          aria-label="Filter clients by status"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatus(filter.value)}
              aria-pressed={status === filter.value}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                status === filter.value
                  ? "bg-white text-[#16243d] shadow-sm"
                  : "text-[#6c7a93] hover:text-[#16243d]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <Card>
          <ClientRowsHeader />
          <ClientRows clients={visible} />
        </Card>
      ) : (
        <EmptyState
          title="No matching clients"
          description="Try a different search term or clear the status filter."
        />
      )}
    </div>
  );
}

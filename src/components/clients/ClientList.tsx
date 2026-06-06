import { ClientCard } from "@/components/clients/ClientCard";
import type { Client } from "@/types/client";

export function ClientList({ clients }: { clients: Client[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
}

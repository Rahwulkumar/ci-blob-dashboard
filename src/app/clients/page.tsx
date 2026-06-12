import { ClientList } from "@/components/clients/ClientList";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { clients } from "@/lib/mock-data";

export default function ClientsPage() {
  const activeClients = clients.filter((client) => client.status === "Active").length;

  return (
    <AppShell>
      <PageHeader
        title="Clients"
        description={`${clients.length} clients under management, ${activeClients} currently active.`}
      />
      <ClientList clients={clients} />
    </AppShell>
  );
}

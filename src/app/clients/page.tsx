import Link from "next/link";
import { Plus } from "lucide-react";
import { ClientList } from "@/components/clients/ClientList";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { clients } from "@/lib/mock-data";

export default function ClientsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Clients"
        title="Client report workspaces"
        description="Browse each client's event folders and uploaded cricket infringement CSV reports."
        actions={
          <Link
            href="/upload"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Upload report
          </Link>
        }
      />
      <ClientList clients={clients} />
    </AppShell>
  );
}

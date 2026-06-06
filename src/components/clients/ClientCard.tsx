import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import type { Client } from "@/types/client";

export function ClientCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`} className="group block">
      <Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
              {client.shortName}
            </div>
            <div>
              <h2 className="font-semibold text-slate-950">{client.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{client.eventsCount} events tracked</p>
            </div>
          </div>
          <Badge tone={client.status === "Active" ? "success" : "warning"}>{client.status}</Badge>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Reports</div>
            <div className="mt-1 font-semibold text-slate-950">{formatNumber(client.reportsCount)}</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Last upload</div>
            <div className="mt-1 font-semibold text-slate-950">{client.lastUploadDate}</div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-2 text-slate-500">
            <FolderKanban className="h-4 w-4" aria-hidden="true" />
            Client folder
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
            Open <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

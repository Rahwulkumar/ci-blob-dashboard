"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { clients, events } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { UploadProgress } from "@/components/upload/UploadProgress";

export function UploadForm() {
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [eventId, setEventId] = useState("");
  const [reportDate, setReportDate] = useState("2025-07-25");
  const [fileName, setFileName] = useState("report.csv");

  const eventOptions = events.filter((event) => event.clientId === clientId);
  const selectedEvent = eventOptions.find((event) => event.id === eventId) ?? eventOptions[0];

  const eventSlug = selectedEvent?.id || "event-slug";
  const blobPath = `${clientId || "client-slug"}/${eventSlug}/${reportDate || "YYYY-MM-DD"}/${slugify(fileName.replace(/\.csv$/i, "")) || "report"}.csv`;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <Card className="p-[18px]">
        <form className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold text-slate-700">Client</span>
              <Select
                value={clientId}
                onChange={(event) => {
                  setClientId(event.target.value);
                  setEventId("");
                }}
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </Select>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold text-slate-700">Event / series</span>
              <Select value={eventId || selectedEvent?.id || ""} onChange={(event) => setEventId(event.target.value)}>
                {eventOptions.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </Select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold text-slate-700">Report date</span>
              <Input type="date" value={reportDate} onChange={(event) => setReportDate(event.target.value)} />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold text-slate-700">File name preview</span>
              <Input value={fileName} onChange={(event) => setFileName(event.target.value)} />
            </label>
          </div>
          <UploadDropzone />
          <label className="block space-y-2">
            <span className="text-xs font-semibold text-slate-700">Notes</span>
            <textarea
              className="min-h-20 w-full rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Optional context for this report upload"
            />
          </label>
          <div className="flex justify-end">
            <Button type="button">
              <Send className="h-4 w-4" aria-hidden="true" />
              Prepare upload
            </Button>
          </div>
        </form>
      </Card>
      <div className="space-y-5">
        <Card className="p-[18px]">
          <h2 className="text-[13px] font-semibold text-slate-950">Blob path preview</h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">The server upload route will write the CSV to this folder structure.</p>
          <div className="console-mono mt-4 rounded-[var(--radius-sm)] bg-[#0B1220] p-4 text-xs leading-6 text-blue-100">
            raw-csv-reports/
            <br />
            {blobPath}
          </div>
        </Card>
        <UploadProgress value={65} />
      </div>
    </div>
  );
}

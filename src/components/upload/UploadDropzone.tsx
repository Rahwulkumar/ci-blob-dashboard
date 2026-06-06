import { UploadCloud } from "lucide-react";

export function UploadDropzone() {
  return (
    <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-[var(--radius)] border border-dashed border-blue-200 bg-blue-50/50 px-6 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50">
      <UploadCloud className="h-8 w-8 text-blue-600" aria-hidden="true" />
      <span className="mt-3 text-sm font-semibold text-slate-950">Choose CSV file</span>
      <span className="mt-1 text-xs text-slate-500">CSV reports only. Uploads are sent to the server API.</span>
      <input className="sr-only" type="file" accept=".csv,text/csv" name="file" />
    </label>
  );
}

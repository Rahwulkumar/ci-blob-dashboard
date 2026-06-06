"use client";

import { AlertTriangle, ExternalLink, X } from "lucide-react";

export function MicrosoftBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center gap-3 border-b border-blue-100 bg-blue-50 px-4 py-2 text-xs lg:px-5">
      <AlertTriangle className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
      <p className="min-w-0 flex-1 text-slate-600">
        If a Power BI report does not load, sign in with the client Microsoft account configured for CII.
      </p>
      <button className="hidden items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 sm:inline-flex">
        Open in Power BI <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <button
        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-white hover:text-slate-800"
        aria-label="Dismiss Microsoft account banner"
        onClick={onClose}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

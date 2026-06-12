"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

export function LastUpdated() {
  const [lastUpdated, setLastUpdated] = useState("25 Jul 2025, 12:20 pm");
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(
        new Intl.DateTimeFormat("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    }, 800);
  };

  return (
    <div className="flex items-center gap-2 text-xs text-(--text-muted)">
      <span>
        Updated <span className="t-num text-(--text-body)">{lastUpdated}</span>
      </span>
      <button
        aria-label="Refresh data"
        title="Refresh"
        onClick={refresh}
        className="rounded-md p-1 text-(--text-faint) transition-colors hover:bg-(--surface-3) hover:text-(--accent)"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
      </button>
    </div>
  );
}

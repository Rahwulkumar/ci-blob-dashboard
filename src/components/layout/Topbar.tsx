"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, RefreshCw, Search, UploadCloud } from "lucide-react";
import { MicrosoftBanner } from "@/components/layout/MicrosoftBanner";

export function Topbar() {
  const [lastUpdated, setLastUpdated] = useState("25 Jul 2025, 12:20 pm");
  const [refreshing, setRefreshing] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showMsBanner, setShowMsBanner] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    timer.current = setInterval(() => setCooldown((current) => Math.max(0, current - 1)), 60000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [cooldown]);

  const refresh = () => {
    if (cooldown > 0 || refreshing) return;
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
      setCooldown(180);
    }, 900);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-white/95 backdrop-blur">
      <div className="flex h-14 items-center gap-2 px-4 lg:px-5">
        <button
          className="mr-auto flex h-9 min-w-0 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-2)] px-3 text-left text-xs text-[var(--text-muted)] transition hover:border-[var(--line-strong)] hover:bg-white md:w-[340px]"
          aria-label="Search clients, events, and report files"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden truncate sm:inline">Search clients, events, report files</span>
          <span className="truncate sm:hidden">Search</span>
          <kbd className="ml-auto hidden rounded border border-[var(--line)] bg-white px-1.5 py-0.5 text-[10px] text-[var(--text-faint)] sm:inline">
            Ctrl K
          </kbd>
        </button>

        <div className="hidden h-9 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-white px-3 text-xs text-[var(--text-muted)] lg:flex">
          <span className="font-medium text-[var(--text-body)]">{lastUpdated}</span>
          <span className="h-4 w-px bg-[var(--line)]" aria-hidden="true" />
          <button
            aria-label={cooldown > 0 ? `Refresh locked for ${cooldown} minutes` : "Refresh dashboard data"}
            className="rounded p-1 text-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:text-[var(--text-faint)]"
            disabled={cooldown > 0}
            onClick={refresh}
            title={cooldown > 0 ? `${cooldown}m cooldown` : "Refresh"}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
          </button>
        </div>

        <button
          className="hidden h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-white px-3 text-xs font-medium text-[var(--text-body)] hover:bg-[var(--surface-2)] md:inline-flex"
          onClick={() => setShowMsBanner((visible) => !visible)}
        >
          MS Account
          <ChevronDown className={`h-3.5 w-3.5 transition ${showMsBanner ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>

        <Link
          href="/upload"
          className="hidden h-9 items-center justify-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--accent)] px-3 text-xs font-semibold text-white shadow-[var(--shadow-btn)] transition hover:bg-[var(--accent-dark)] sm:inline-flex"
        >
          <UploadCloud className="h-3.5 w-3.5" aria-hidden="true" />
          Upload CSV
        </Link>

        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--line)] bg-white text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
          aria-label="Notifications"
          onClick={() => setHasNotification(false)}
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {hasNotification && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
        </button>
      </div>

      {showMsBanner && <MicrosoftBanner onClose={() => setShowMsBanner(false)} />}
    </header>
  );
}

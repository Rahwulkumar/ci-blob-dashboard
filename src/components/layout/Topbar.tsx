"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, CalendarDays, RefreshCw, Search, UploadCloud } from "lucide-react";
import { MicrosoftBanner } from "@/components/layout/MicrosoftBanner";

export function Topbar() {
  const [lastUpdated, setLastUpdated] = useState("25 Jul 2025, 12:20 pm");
  const [refreshing, setRefreshing] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showMsBanner, setShowMsBanner] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    timer.current = setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 60000);

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
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur">
      <div className="flex h-[54px] items-center gap-2 border-b border-slate-200 px-4 lg:px-5">
        <div className="mr-auto flex min-w-0 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500 md:w-[360px]">
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden truncate sm:inline">Search clients, events, report files...</span>
          <span className="truncate sm:hidden">Search...</span>
        </div>
        <button
          className="hidden h-8 items-center gap-2 rounded-md px-2.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 md:inline-flex"
          onClick={() => setShowMsBanner((visible) => !visible)}
        >
          MS Account
        </button>
        <div className="hidden h-8 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm lg:flex">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-medium">{lastUpdated}</span>
          <button
            aria-label={cooldown > 0 ? `Refresh locked for ${cooldown} minutes` : "Refresh dashboard data"}
            className="rounded-full p-1 text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-400"
            disabled={cooldown > 0}
            onClick={refresh}
            title={cooldown > 0 ? `${cooldown}m cooldown` : "Refresh"}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
          </button>
        </div>
        <Link
          href="/upload"
          className="hidden h-8 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:inline-flex"
        >
          <UploadCloud className="h-3.5 w-3.5" aria-hidden="true" />
          Upload CSV
        </Link>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {showMsBanner && <MicrosoftBanner onClose={() => setShowMsBanner(false)} />}
    </header>
  );
}

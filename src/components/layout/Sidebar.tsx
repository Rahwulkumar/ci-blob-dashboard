"use client";

import type { ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, LayoutDashboard, Settings, Shield, UploadCloud, Users } from "lucide-react";
import { navItems } from "@/lib/constants";

const icons: Record<string, ElementType> = { LayoutDashboard, Users, UploadCloud };

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-16 border-r border-slate-900 bg-slate-950 text-white lg:flex lg:flex-col lg:items-center">
      <div className="flex h-14 w-full items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-white/10 bg-white/5">
          <Shield className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <nav className="flex w-full flex-1 flex-col items-center gap-1 px-3 pt-2">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className={`group relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] transition ${
                active ? "bg-white text-slate-950" : "text-white/45 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="pointer-events-none absolute left-11 top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-1 pb-4">
        {[
          { Icon: HelpCircle, label: "Help" },
          { Icon: Settings, label: "Settings" },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            title={label}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-white/35 transition hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        ))}
        <div className="my-1 h-px w-7 bg-white/10" />
        <button
          title="Profile"
          aria-label="Your profile"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-slate-950"
        >
          SS
        </button>
      </div>
    </aside>
  );
}

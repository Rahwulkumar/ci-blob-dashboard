"use client";

import type { ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, LifeBuoy, Search, Settings2, Users } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { navItems } from "@/lib/constants";

const icons: Record<string, ElementType> = { LayoutDashboard: LayoutGrid, Users };

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-58 flex-col border-r border-(--sidebar-line) bg-(--sidebar-bg) lg:flex">
      {/* Brand */}
      <div className="flex h-15 items-center px-5">
        <Link href="/" aria-label="CII Intelligence home">
          <BrandMark />
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <button
          className="flex h-8 w-full items-center gap-2 rounded-sm border border-(--line) bg-white px-2.5 text-left text-xs text-(--text-faint) transition-colors hover:border-(--line-strong) hover:text-(--text-muted)"
          aria-label="Search"
        >
          <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="flex-1">Search</span>
          <kbd className="t-num text-[10px] font-medium text-(--text-faint)">⌘K</kbd>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-3" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                "flex items-center gap-2.5 rounded-sm px-2.5 py-1.75 text-[13px] transition-colors duration-100",
                active
                  ? "bg-(--accent-soft) font-medium text-(--accent-dark)"
                  : "font-normal text-(--text-body) hover:bg-(--surface-3) hover:text-(--text-heading)",
              ].join(" ")}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${active ? "text-(--accent)" : "text-(--text-faint)"}`}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-2">
        {[
          { Icon: LifeBuoy, label: "Help" },
          { Icon: Settings2, label: "Settings" },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.75 text-left text-[13px] text-(--text-muted) transition-colors duration-100 hover:bg-(--surface-3) hover:text-(--text-heading)"
          >
            <Icon className="h-4 w-4 shrink-0 text-(--text-faint)" strokeWidth={1.75} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="border-t border-(--sidebar-line) px-3 py-3">
        <button className="flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left transition-colors hover:bg-(--surface-3)">
          <span className="t-num flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-md bg-(--accent-soft) text-[10px] font-semibold text-(--accent-dark)">
            OP
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12.5px] font-medium text-(--text-heading)">
              Operations
            </span>
            <span className="block truncate text-[11px] text-(--text-faint)">Administrator</span>
          </span>
        </button>
      </div>
    </aside>
  );
}

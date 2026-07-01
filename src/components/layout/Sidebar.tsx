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
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-58 flex-col border-r border-[#e9edf4] bg-[#f8fafd] lg:flex">
      <div className="flex h-15 items-center px-5">
        <Link href="/" aria-label="CII Intelligence home">
          <BrandMark />
        </Link>
      </div>

      <div className="px-3 pb-2">
        <button
          className="flex h-8 w-full items-center gap-2 rounded-lg border border-[#e9edf4] bg-white px-2.5 text-left text-xs text-[#97a3b8] transition-colors hover:border-[#d9e0eb] hover:text-[#6c7a93]"
          aria-label="Search"
        >
          <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="flex-1">Search</span>
          <kbd className="font-mono text-xs font-medium text-[#97a3b8]">Ctrl K</kbd>
        </button>
      </div>

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
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors duration-100",
                active
                  ? "bg-[#eef3fe] font-medium text-[#1d4fd8]"
                  : "font-normal text-[#44546d] hover:bg-[#f1f4f9] hover:text-[#16243d]",
              ].join(" ")}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${active ? "text-[#2563eb]" : "text-[#97a3b8]"}`}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-2">
        {[
          { Icon: LifeBuoy, label: "Help" },
          { Icon: Settings2, label: "Settings" },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-[#6c7a93] transition-colors duration-100 hover:bg-[#f1f4f9] hover:text-[#16243d]"
          >
            <Icon className="h-4 w-4 shrink-0 text-[#97a3b8]" strokeWidth={1.75} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="border-t border-[#e9edf4] px-3 py-3">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-[#f1f4f9]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#eef3fe] font-mono text-xs font-semibold text-[#1d4fd8]">
            OP
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-[#16243d]">Operations</span>
            <span className="block truncate text-xs text-[#97a3b8]">Administrator</span>
          </span>
        </button>
      </div>
    </aside>
  );
}

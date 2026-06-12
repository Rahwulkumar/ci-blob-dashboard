import type { ReactNode } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { Sidebar } from "@/components/layout/Sidebar";
import { navItems } from "@/lib/constants";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-(--bg) text-(--text-body)">
      <Sidebar />

      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-(--line) bg-white/95 px-4 backdrop-blur lg:hidden">
        <Link href="/" aria-label="CII Intelligence home">
          <BrandMark />
        </Link>
        <nav className="flex items-center gap-1" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-2.5 py-1.5 text-[13px] font-medium text-(--text-muted) transition-colors hover:bg-(--surface-3) hover:text-(--text-heading)"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="min-w-0 lg:pl-58">
        <main className="mx-auto w-full max-w-280 px-5 pb-16 pt-8 lg:px-10 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}

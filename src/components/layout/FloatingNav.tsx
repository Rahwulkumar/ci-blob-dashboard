"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/clients", label: "Clients" },
  { href: "/clients", label: "Events" },
  { href: "/#report-volume", label: "Reports" },
] as const;

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <header className="mx-auto w-full max-w-[1200px] px-5 pt-6 sm:px-7">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-[family-name:var(--font-sora)] text-sm font-bold text-[#16243d]"
          aria-label="CII Intelligence home"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#16243d] text-xs font-bold text-white">
            CI
          </span>
          CII Intelligence
        </Link>

        <nav
          className="hidden rounded-full border border-[#e9edf4] bg-white p-1 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((item) => {
            const active =
              item.label === "Overview"
                ? pathname === "/"
                : item.label === "Clients" && pathname.startsWith("/clients");

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium text-[#6c7a93] transition hover:text-[#16243d]",
                  active && "bg-[#eef3fe] font-semibold text-[#1d4fd8]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden font-mono text-xs text-[#6c7a93] sm:inline">SYNCED 12:20 UTC</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[#d9e0eb] bg-white text-xs font-bold text-[#16243d]">
            OP
          </span>
        </div>
      </div>
    </header>
  );
}

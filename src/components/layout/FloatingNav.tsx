"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/clients", label: "Clients" },
  { href: "/clients", label: "Events" },
  { href: "/#report-flow", label: "Reports" },
] as const;

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-2 z-50 flex justify-center px-4 pt-3 sm:top-4 sm:px-7 sm:pt-4">
      <nav
        className="flex w-full max-w-[1104px] items-center gap-2 rounded-full border border-[#dbe7fd] bg-white/80 py-2 pl-3 pr-2 shadow-[0_12px_40px_-12px_rgba(37,99,235,0.12),0_2px_8px_rgba(22,36,61,0.04)] backdrop-blur-xl sm:pl-5"
        aria-label="Primary navigation"
      >
        <Link href="/" className="flex min-w-0 items-center gap-2.5 font-extrabold tracking-tight text-[#16243d]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#6b96f3] text-xs font-bold text-white shadow-[0_3px_10px_rgba(37,99,235,0.35)]">
            CI
          </span>
          <span className="hidden text-sm sm:inline">CII Intelligence</span>
        </Link>

        <div className="mx-auto hidden gap-0.5 md:flex">
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
                  "rounded-full px-4 py-2 text-sm font-medium text-[#6c7a93] transition hover:bg-white hover:text-[#16243d]",
                  active && "bg-[#16243d] font-semibold text-white shadow-[0_3px_10px_rgba(22,36,61,0.25)] hover:bg-[#16243d] hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <span className="flex items-center gap-2 text-xs font-semibold text-[#1d4fd8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.15)]" />
            Live
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[#dbe7fd] bg-[#eef3fe] text-xs font-bold text-[#1d4fd8]">
            OP
          </span>
        </div>
      </nav>
    </div>
  );
}

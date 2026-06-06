import Link from "next/link";
import { Headphones, LayoutDashboard, Settings, Shield, UploadCloud, Users } from "lucide-react";
import { navItems } from "@/lib/constants";

const icons = { LayoutDashboard, Users, UploadCloud };

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[66px] select-none border-r border-white/5 bg-[#0B1220] text-white lg:flex lg:flex-col lg:items-center">
      <div className="flex h-[54px] w-full items-center justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-blue-600 shadow-[0_0_0_1px_rgba(59,130,246,0.45),0_10px_28px_rgba(37,99,235,0.32)]">
          <Shield className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
      </div>
      <div className="mb-2 h-px w-6 bg-white/10" />
      <nav className="flex w-full flex-1 flex-col items-center gap-1 px-[13px]">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex h-[38px] w-[38px] items-center justify-center rounded-[9px] text-white/35 transition hover:bg-white/10 hover:text-white"
              aria-label={item.label}
            >
              <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
              <span className="pointer-events-none absolute left-[48px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col items-center gap-1 pb-3">
        {[Headphones, Settings].map((Icon, index) => (
          <button
            key={index}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] text-white/25 transition hover:bg-white/10 hover:text-white/70"
            aria-label={index === 0 ? "Support" : "Settings"}
          >
            <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
          </button>
        ))}
        <div className="my-1 h-px w-6 bg-white/10" />
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-[11px] font-bold tracking-wide shadow-[0_0_0_2px_rgba(37,99,235,0.35)]">
          SS
        </div>
      </div>
    </aside>
  );
}

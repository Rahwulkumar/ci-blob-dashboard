import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Sidebar />
      <div className="min-w-0 lg:pl-[66px]">
        <Topbar />
        <main className="mx-auto w-full max-w-[1440px] px-4 py-5 lg:px-5">{children}</main>
      </div>
    </div>
  );
}

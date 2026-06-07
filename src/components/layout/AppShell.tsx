import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-body)]">
      <Sidebar />
      <div className="min-w-0 lg:pl-[64px]">
        <Topbar />
        <main className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-6 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}

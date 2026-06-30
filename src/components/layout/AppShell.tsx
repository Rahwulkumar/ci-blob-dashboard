import type { ReactNode } from "react";
import { FloatingNav } from "@/components/layout/FloatingNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f1f4f9] text-[#44546d]">
      <FloatingNav />
      <main className="mx-auto w-full max-w-[1200px] px-5 pb-14 sm:px-7">{children}</main>
    </div>
  );
}

import type { ReactNode } from "react";
import { FloatingNav } from "@/components/layout/FloatingNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#44546d]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[#fcfdff] bg-[radial-gradient(1100px_500px_at_12%_-8%,#eef3fe_0%,transparent_60%),radial-gradient(900px_480px_at_88%_0%,#f6f9ff_0%,transparent_55%),radial-gradient(1200px_700px_at_50%_110%,#f6f9ff_0%,transparent_60%)]"
      />
      <FloatingNav />
      <main className="mx-auto w-full max-w-[1160px] px-5 pb-16 sm:px-7">{children}</main>
    </div>
  );
}

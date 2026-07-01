import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function DeliveryTodayTile({ reportCount }: { reportCount: number }) {
  return (
    <Card
      as="section"
      className="flex min-h-[230px] flex-col justify-between border-[#2563eb] bg-[#2563eb] p-6 text-white hover:border-[#2563eb] hover:shadow-[0_14px_36px_-10px_rgba(37,99,235,0.45)] sm:col-span-3 lg:col-span-3"
    >
      <span
        className="absolute -bottom-14 -left-8 h-40 w-40 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
      <h2 className="relative font-mono text-xs font-bold uppercase tracking-[0.1em] text-white/70">
        Delivered today
      </h2>
      <div className="relative">
        <p className="font-[family-name:var(--font-sora)] text-6xl font-extrabold leading-none tracking-tight">
          {reportCount}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/80">
          new reports landed overnight, all indexed and ready to review.
        </p>
        <Link
          href="/clients"
          className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2563eb]"
        >
          Review now
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

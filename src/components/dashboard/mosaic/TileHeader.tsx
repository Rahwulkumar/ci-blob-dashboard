import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TileHeader({
  title,
  eyebrow,
  actionLabel,
  actionHref,
}: {
  title: string;
  eyebrow?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h2 className="font-[family-name:var(--font-sora)] text-sm font-semibold tracking-tight text-[#16243d]">
        {title}
      </h2>
      {eyebrow && (
        <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">{eyebrow}</span>
      )}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#2563eb] transition hover:text-[#1d4fd8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
        >
          {actionLabel}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

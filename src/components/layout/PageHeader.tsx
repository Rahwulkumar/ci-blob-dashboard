import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <div className="mb-1 text-xs font-medium text-[var(--text-muted)]">{eyebrow}</div>}
        <h1 className="text-[21px] font-semibold leading-7 tracking-[-0.01em] text-[var(--text-heading)]">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-[13px] leading-5 text-[var(--text-muted)]">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

import type { ReactNode } from "react";

export function PageHeader({
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
    <header className="mb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-[#16243d]">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6c7a93]">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      <div className="mt-6 h-px bg-[#e9edf4]" aria-hidden="true" />
    </header>
  );
}

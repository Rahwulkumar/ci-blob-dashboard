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
          <h1 className="text-[24px] font-semibold leading-8 tracking-tight text-(--text-heading)">
            {title}
          </h1>
          {description && (
            <p className="mt-1 max-w-2xl text-[13px] leading-5.5 text-(--text-muted)">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      <div className="mt-6 h-px bg-(--line)" aria-hidden="true" />
    </header>
  );
}

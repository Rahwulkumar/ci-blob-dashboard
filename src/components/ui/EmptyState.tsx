import { Inbox } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-(--line-strong) bg-(--surface-2) px-6 py-16 text-center">
      <Inbox className="mb-3 h-5 w-5 text-(--text-faint)" strokeWidth={1.5} aria-hidden="true" />
      <h3 className="text-sm font-medium text-(--text-heading)">{title}</h3>
      <p className="mt-1 max-w-sm text-xs leading-5 text-(--text-muted)">{description}</p>
    </div>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-(--text-muted)" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-(--accent)" />
      {label}
    </div>
  );
}

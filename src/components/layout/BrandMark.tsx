export function BrandMark({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="21" height="21" viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
        <rect x="2" y="12" width="4.5" height="8" rx="2.25" fill="#16243d" />
        <rect x="8.75" y="7" width="4.5" height="13" rx="2.25" fill="#16243d" />
        <rect x="15.5" y="2" width="4.5" height="18" rx="2.25" fill="#2563eb" />
      </svg>
      {withWordmark && (
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-(--text-heading)">
          CII{" "}
          <span className="font-normal text-(--text-muted)">Intelligence</span>
        </span>
      )}
    </span>
  );
}

type KpiItem = {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  description?: string;
};

export function KpiStrip({ items }: { items: KpiItem[] }) {
  return (
    <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-(--radius) border border-(--line) bg-(--line) lg:grid-cols-4">
      {items.map((item) => {
        const isLive = item.delta === "Live";
        const isPositive = item.up !== false;

        return (
          <div key={item.label} className="bg-white px-5 py-4.5 lg:px-6">
            <div className="t-label-xs">{item.label}</div>
            <div className="t-num mt-2 text-[26px] font-semibold leading-8 text-(--text-heading)">
              {item.value}
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5 text-xs">
              {item.delta &&
                (isLive ? (
                  <span className="flex items-center gap-1.5 font-medium text-(--success)">
                    <span className="dot dot-green h-1.5 w-1.5" aria-hidden="true" />
                    Live
                  </span>
                ) : (
                  <span className={`t-num font-medium ${isPositive ? "text-(--success)" : "text-(--danger)"}`}>
                    {isPositive ? "↑" : "↓"} {item.delta.replace(/^[+-]/, "")}
                  </span>
                ))}
              <span className="text-(--text-faint)">{item.description ?? "vs last cycle"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

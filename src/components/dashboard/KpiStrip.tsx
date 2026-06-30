import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type KpiItem = {
  label: string;
  value: ReactNode;
  delta?: string;
  dimDelta?: boolean;
  description: string;
};

const sparks = [
  {
    fill: "M0,30 C30,28 50,22 80,20 C110,18 140,14 200,8 L200,34 L0,34 Z",
    line: "M0,30 C30,28 50,22 80,20 C110,18 140,14 200,8",
    stroke: "#b3ccfb",
  },
  {
    fill: "M0,26 C40,28 60,18 90,19 C130,20 160,10 200,6 L200,34 L0,34 Z",
    line: "M0,26 C40,28 60,18 90,19 C130,20 160,10 200,6",
    stroke: "#b3ccfb",
  },
  {
    fill: "M0,30 C40,26 70,24 100,18 C140,11 170,9 200,4 L200,34 L0,34 Z",
    line: "M0,30 C40,26 70,24 100,18 C140,11 170,9 200,4",
    stroke: "#6b96f3",
  },
  {
    fill: "M0,22 C40,24 80,16 120,18 C150,19 180,10 200,8 L200,34 L0,34 Z",
    line: "M0,22 C40,24 80,16 120,18 C150,19 180,10 200,8",
    stroke: "#b3ccfb",
  },
] as const;

export function KpiStrip({ items }: { items: KpiItem[] }) {
  return (
    <section className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Portfolio metrics">
      {items.map((item, index) => {
        const spark = sparks[index % sparks.length];

        return (
          <Card
            key={item.label}
            className="relative rounded-[18px] px-6 pb-4 pt-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(37,99,235,0.18),0_2px_8px_rgba(22,36,61,0.05)]"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-[#97a3b8]">{item.label}</h3>
              {item.delta && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    item.dimDelta ? "bg-[#f1f4f9] text-[#6c7a93]" : "bg-[#eef3fe] text-[#1d4fd8]"
                  }`}
                >
                  {item.delta}
                </span>
              )}
            </div>
            <div className="mt-3 text-3xl font-extrabold leading-none tracking-tight text-[#16243d]">{item.value}</div>
            <p className="mt-1.5 text-xs text-[#6c7a93]">{item.description}</p>
            <svg
              className="pointer-events-none absolute inset-x-0 bottom-0 h-9 w-full opacity-90"
              viewBox="0 0 200 34"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d={spark.fill} fill="#eef3fe" />
              <path d={spark.line} fill="none" stroke={spark.stroke} strokeWidth="1.5" />
            </svg>
          </Card>
        );
      })}
    </section>
  );
}

import { CheckCircle2, Clock, UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/Card";

const activity = [
  { icon: UploadCloud, title: "CSV uploaded", meta: "Cricket Australia - 25 July 2025" },
  { icon: CheckCircle2, title: "Report indexed", meta: "JioHotstar IPL Anti-Piracy 2025" },
  { icon: Clock, title: "Review pending", meta: "SLC Asia Cup Stream Watch" },
];

export function ActivityFeed() {
  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-slate-950">Operations feed</h2>
      <div className="mt-4 space-y-4">
        {activity.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-950">{item.title}</div>
                <div className="text-xs text-slate-500">{item.meta}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

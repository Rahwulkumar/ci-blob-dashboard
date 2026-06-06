import { FileSearch } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <FileSearch className="mb-3 h-8 w-8 text-blue-500" aria-hidden="true" />
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-slate-500">{description}</p>
    </Card>
  );
}

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { UploadForm } from "@/components/upload/UploadForm";

export default function UploadPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Upload"
        title="Upload cricket infringement CSV"
        description="Select the client, event, report date, and CSV file. Azure writes are handled only by the server-side upload API."
      />
      <UploadForm />
    </AppShell>
  );
}

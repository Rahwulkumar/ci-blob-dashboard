import "server-only";

import { getBlobContainerClient } from "@/lib/azure/blobClient";
import { slugify } from "@/lib/utils";
import type { UploadBlobInput } from "@/types/blob";

export async function uploadBlob({ clientSlug, eventSlug, reportDate, file }: UploadBlobInput) {
  const cleanFileName = file.name.toLowerCase().endsWith(".csv")
    ? file.name
    : `${slugify(file.name)}.csv`;
  const blobPath = `${clientSlug}/${eventSlug}/${reportDate}/${cleanFileName}`;
  const blockBlobClient = getBlobContainerClient().getBlockBlobClient(blobPath);

  await blockBlobClient.uploadData(await file.arrayBuffer(), {
    blobHTTPHeaders: { blobContentType: file.type || "text/csv" },
  });

  return {
    blobPath,
    url: blockBlobClient.url,
  };
}

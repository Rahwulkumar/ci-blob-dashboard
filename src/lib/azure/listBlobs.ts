import "server-only";

import { getBlobContainerClient } from "@/lib/azure/blobClient";
import type { BlobListItem } from "@/types/blob";

export async function listBlobs(prefix?: string): Promise<BlobListItem[]> {
  const container = getBlobContainerClient();
  const blobs: BlobListItem[] = [];

  for await (const blob of container.listBlobsFlat({ prefix })) {
    blobs.push({
      name: blob.name,
      size: blob.properties.contentLength ?? 0,
      lastModified: blob.properties.lastModified?.toISOString() ?? null,
      contentType: blob.properties.contentType,
    });
  }

  return blobs;
}

import "server-only";

import { BlobServiceClient, type ContainerClient } from "@azure/storage-blob";

let containerClient: ContainerClient | null = null;

export function getBlobContainerClient() {
  if (containerClient) return containerClient;

  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "raw-csv-reports";

  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured.");
  }

  containerClient = BlobServiceClient.fromConnectionString(connectionString).getContainerClient(containerName);
  return containerClient;
}

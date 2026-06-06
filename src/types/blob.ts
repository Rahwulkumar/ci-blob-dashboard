export type BlobListItem = {
  name: string;
  size: number;
  lastModified: string | null;
  contentType?: string;
};

export type UploadBlobInput = {
  clientSlug: string;
  eventSlug: string;
  reportDate: string;
  file: File;
};

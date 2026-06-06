export type ReportFile = {
  id: string;
  clientId: string;
  eventId: string;
  fileName: string;
  reportDate: string;
  blobPath: string;
  size: number;
  lastModified: string;
  status: "Indexed" | "Pending" | "Review";
};

export type EventSeries = {
  id: string;
  clientId: string;
  name: string;
  dateRange: string;
  reportsCount: number;
  lastReportDate: string;
  folderPath: string;
};

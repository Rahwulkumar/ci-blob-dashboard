import type { Client } from "@/types/client";
import type { EventSeries, ReportFile } from "@/types/report";

export const clients: Client[] = [
  {
    id: "cricket-australia",
    name: "Cricket Australia",
    shortName: "CA",
    eventsCount: 3,
    reportsCount: 42,
    lastUploadDate: "2025-07-25",
    status: "Active",
  },
  {
    id: "jiohotstar",
    name: "JioHotstar",
    shortName: "JH",
    eventsCount: 4,
    reportsCount: 57,
    lastUploadDate: "2025-07-24",
    status: "Active",
  },
  {
    id: "sri-lanka-cricket",
    name: "Sri Lanka Cricket",
    shortName: "SLC",
    eventsCount: 2,
    reportsCount: 21,
    lastUploadDate: "2025-07-21",
    status: "Review",
  },
];

export const events: EventSeries[] = [
  {
    id: "india-vs-australia-series-2025",
    clientId: "cricket-australia",
    name: "India vs Australia Series 2025",
    dateRange: "Jul 2025 - Aug 2025",
    reportsCount: 18,
    lastReportDate: "2025-07-25",
    folderPath: "raw-csv-reports/cricket-australia/india-vs-australia-series-2025/",
  },
  {
    id: "ashes-warmup-window",
    clientId: "cricket-australia",
    name: "Ashes Warmup Window",
    dateRange: "Jun 2025",
    reportsCount: 14,
    lastReportDate: "2025-06-30",
    folderPath: "raw-csv-reports/cricket-australia/ashes-warmup-window/",
  },
  {
    id: "bbl-digital-monitoring",
    clientId: "cricket-australia",
    name: "BBL Digital Monitoring",
    dateRange: "Jan 2025",
    reportsCount: 10,
    lastReportDate: "2025-01-28",
    folderPath: "raw-csv-reports/cricket-australia/bbl-digital-monitoring/",
  },
  {
    id: "ipl-anti-piracy-2025",
    clientId: "jiohotstar",
    name: "IPL Anti-Piracy 2025",
    dateRange: "Mar 2025 - May 2025",
    reportsCount: 37,
    lastReportDate: "2025-07-24",
    folderPath: "raw-csv-reports/jiohotstar/ipl-anti-piracy-2025/",
  },
  {
    id: "asia-cup-stream-watch",
    clientId: "sri-lanka-cricket",
    name: "Asia Cup Stream Watch",
    dateRange: "Sep 2025",
    reportsCount: 12,
    lastReportDate: "2025-07-21",
    folderPath: "raw-csv-reports/sri-lanka-cricket/asia-cup-stream-watch/",
  },
];

export const reports: ReportFile[] = [
  {
    id: "rep-001",
    clientId: "cricket-australia",
    eventId: "india-vs-australia-series-2025",
    fileName: "CI Cricket Australia - Brand Protection Report-25 July 2025.csv",
    reportDate: "2025-07-25",
    blobPath:
      "cricket-australia/india-vs-australia-series-2025/2025-07-25/CI Cricket Australia - Brand Protection Report-25 July 2025.csv",
    size: 1843200,
    lastModified: "2025-07-25T12:20:00.000Z",
    status: "Indexed",
  },
  {
    id: "rep-002",
    clientId: "cricket-australia",
    eventId: "india-vs-australia-series-2025",
    fileName: "CI Cricket Australia - Brand Protection Report-24 July 2025.csv",
    reportDate: "2025-07-24",
    blobPath:
      "cricket-australia/india-vs-australia-series-2025/2025-07-24/CI Cricket Australia - Brand Protection Report-24 July 2025.csv",
    size: 1597440,
    lastModified: "2025-07-24T12:18:00.000Z",
    status: "Indexed",
  },
  {
    id: "rep-003",
    clientId: "jiohotstar",
    eventId: "ipl-anti-piracy-2025",
    fileName: "JioHotstar IPL Infringement Report-24 July 2025.csv",
    reportDate: "2025-07-24",
    blobPath:
      "jiohotstar/ipl-anti-piracy-2025/2025-07-24/JioHotstar IPL Infringement Report-24 July 2025.csv",
    size: 2211840,
    lastModified: "2025-07-24T09:05:00.000Z",
    status: "Review",
  },
  {
    id: "rep-004",
    clientId: "sri-lanka-cricket",
    eventId: "asia-cup-stream-watch",
    fileName: "SLC Asia Cup Monitoring Report-21 July 2025.csv",
    reportDate: "2025-07-21",
    blobPath:
      "sri-lanka-cricket/asia-cup-stream-watch/2025-07-21/SLC Asia Cup Monitoring Report-21 July 2025.csv",
    size: 933888,
    lastModified: "2025-07-21T15:42:00.000Z",
    status: "Pending",
  },
];

export const reportsByMonth = [
  { month: "Feb", reports: 18 },
  { month: "Mar", reports: 27 },
  { month: "Apr", reports: 31 },
  { month: "May", reports: 39 },
  { month: "Jun", reports: 46 },
  { month: "Jul", reports: 57 },
];

export function getClient(clientId: string) {
  return clients.find((client) => client.id === clientId);
}

export function getEventsForClient(clientId: string) {
  return events.filter((event) => event.clientId === clientId);
}

export function getEvent(clientId: string, eventId: string) {
  return events.find((event) => event.clientId === clientId && event.id === eventId);
}

export function getReportsForEvent(clientId: string, eventId: string) {
  return reports.filter(
    (report) => report.clientId === clientId && report.eventId === eventId,
  );
}

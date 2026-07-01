import type { ReportFile } from "@/types/report";

export function getLatestReport(reports: ReportFile[]) {
  return [...reports].sort((a, b) => Date.parse(b.lastModified) - Date.parse(a.lastModified)).at(0);
}

export function getReportTitle(fileName: string) {
  const withoutExtension = fileName.replace(/\.csv$/i, "");
  const titledSegment = withoutExtension.split(" - ").at(-1) ?? withoutExtension;
  return titledSegment.replace(/-/g, " ");
}

export function formatHeroDate(reportDate?: string) {
  if (!reportDate) return "Friday - 25 July 2025";

  const date = new Date(`${reportDate}T00:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
  }).formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;
  const weekday = getPart("weekday");
  const day = getPart("day");
  const month = getPart("month");
  const year = getPart("year");

  return weekday && day && month && year ? `${weekday} - ${day} ${month} ${year}` : "Friday - 25 July 2025";
}

export function formatUtcTime(value?: string) {
  if (!value) return "12:20 UTC";

  const time = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(value));

  return `${time} UTC`;
}

export function getPathSnippet(blobPath?: string) {
  if (!blobPath) return ".../2025-07-25/";

  const dateSegment = blobPath.split("/").find((segment) => /^\d{4}-\d{2}-\d{2}$/.test(segment));
  return dateSegment ? `.../${dateSegment}/` : ".../raw-csv-reports/";
}

export function getUploadLabel(lastUploadDate: string, referenceDate?: string) {
  const reference = new Date(`${referenceDate ?? "2025-07-25"}T00:00:00Z`);
  const upload = new Date(`${lastUploadDate}T00:00:00Z`);
  const days = Math.max(0, Math.round((reference.getTime() - upload.getTime()) / 86_400_000));

  if (days === 0) return "Last upload today";
  if (days === 1) return "Last upload yesterday";
  return `Last upload ${days} days ago`;
}

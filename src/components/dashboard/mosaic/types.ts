export type TrendLevel = "level-1" | "level-2" | "level-3" | "level-4" | "level-5" | "level-6";

export type MosaicTrendPoint = {
  month: string;
  reports: number;
  level: TrendLevel;
  current?: boolean;
};

export type CoverageItem = {
  id: string;
  label: string;
  value: number;
  markerClassName: string;
};

export type CoverageSnapshot = {
  percent: number;
  label: string;
  items: CoverageItem[];
};

export type ClientMonthReport = {
  clientId: string;
  reports: number;
};

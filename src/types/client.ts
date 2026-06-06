export type ClientStatus = "Active" | "Review" | "Paused";

export type Client = {
  id: string;
  name: string;
  shortName: string;
  eventsCount: number;
  reportsCount: number;
  lastUploadDate: string;
  status: ClientStatus;
};

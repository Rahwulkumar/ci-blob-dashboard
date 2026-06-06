export const containerName =
  process.env.AZURE_STORAGE_CONTAINER_NAME || "raw-csv-reports";

export const navItems = [
  { href: "/", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/clients", label: "Clients", icon: "Users" },
  { href: "/upload", label: "Upload CSV", icon: "UploadCloud" },
] as const;

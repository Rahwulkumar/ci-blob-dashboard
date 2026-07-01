import type { Metadata } from "next";
import { Albert_Sans, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const albertSans = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CII Intelligence - Mosaic",
  description:
    "Mosaic anti-piracy intelligence dashboard for report deliveries, event coverage, and storage activity.",
  keywords: ["cricket", "anti-piracy", "dashboard", "intelligence", "reports"],
  authors: [{ name: "CII Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${albertSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f1f4f9] font-[family-name:var(--font-albert)] text-[#44546d]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CII Intelligence - Skylight",
  description:
    "Client-facing anti-piracy intelligence dashboard for report deliveries, event coverage, and storage activity.",
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
      className={`${schibstedGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#fcfdff] font-[family-name:var(--font-schibsted)] text-[#44546d]">
        {children}
      </body>
    </html>
  );
}

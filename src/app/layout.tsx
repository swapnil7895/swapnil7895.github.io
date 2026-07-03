import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { config } from "@/config";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: config.title,
  description: config.shortDescription,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

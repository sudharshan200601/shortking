import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Long URLs don't stand a chance`,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/branding/favicon.svg", type: "image/svg+xml" },
      { url: "/branding/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/branding/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/branding/favicon.ico",
    apple: "/branding/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#8FC5E5] text-[#080808] selection:bg-[#F5D84A] selection:text-[#080808]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

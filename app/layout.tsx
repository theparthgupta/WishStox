import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { NavbarDemo } from "@/components/ui/NavbarDemo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WishStox",
  description: "AI-Powered Stock Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>WishStox – AI-Powered Stock Insights</title>
        <meta name="description" content="Join WishStox for AI-powered stock trading signals and insights. Get on the waiting list for early access!" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <div className="w-full min-h-screen overflow-x-hidden">
            <NavbarDemo />
            {children}
          </div>
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}

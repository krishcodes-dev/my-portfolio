import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/cursor.css";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krish Sanghavi — Portfolio",
  description: "Full-Stack Developer with AI/ML & Embedded Systems Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}

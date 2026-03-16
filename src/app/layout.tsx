import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/cursor.css";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { BootSequence } from "@/components/ui/BootSequence";
import { SpacebarNav } from "@/components/SpacebarNav";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krish Sanghavi — Portfolio",
  description: "Full-Stack Developer with AI/ML & Embedded Systems Experience",
  metadataBase: new URL("https://krishcodes.dev"),
  openGraph: {
    title: "Krish Sanghavi — Portfolio",
    description: "Full-Stack Developer with AI/ML & Embedded Systems Experience",
    url: "https://krishcodes.dev",
    siteName: "Krish Sanghavi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krish Sanghavi — Portfolio",
    description: "Full-Stack Developer with AI/ML & Embedded Systems Experience",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a
          href="#overview"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <BootSequence />
        <SpacebarNav />
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

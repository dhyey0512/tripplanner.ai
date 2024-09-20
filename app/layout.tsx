import type {Metadata} from "next";
import {Montserrat_Alternates} from "next/font/google";
import {Analytics} from "@vercel/analytics/react";
import ConvexClientProvider from "@/app/ConvexClientProvider";
import {ThemeProvider} from "@/contexts/ThemeProvider";

import Progress from "@/components/Progress";
import {Toaster} from "@/components/ui/toaster";

import "./globals.css";

const inter = Montserrat_Alternates({weight: "500", subsets: ["cyrillic"]});

export const metadata: Metadata = {
  metadataBase: new URL("https://tripplanner-ai.vercel.app/"),
  title: {
    default: "HiddenTrails  - Your Smart Travel Planner",
    template: "%s | HiddenTrails - Your Smart Travel Planner",
  },
  description:
    "HiddenTrails AI provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
  keywords:
    "travel planner, AI travel planner, smart travel, travel suggestions, destination insights, personalized itineraries, trip planning, travel tips, vacation planning",
  openGraph: {
    title: "Travel Planner AI - Your Smart Travel Planner",
    description:
      "HiddenTrails AI provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
    url: "https://tripplanner-ai.vercel.app/",
    type: "website",
    siteName: "HiddenTrails",
    images: [
      {
        url: "opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "HiddenTrails",
      },
    ],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Progress />
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

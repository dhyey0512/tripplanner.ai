import Header from "@/components/dashboard/Header";
import type {Metadata} from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.travelplannerai.online"),
  title: {
    default: "HiddenTrails - Your Smart Travel Planner",
    template: "%s | HiddenTrails - Your Smart Travel Planner",
  },
  description:
    "HiddenTrails AI provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
  keywords:
    "travel planner, AI travel planner, smart travel, travel suggestions, destination insights, personalized itineraries, trip planning, travel tips, vacation planning",
  openGraph: {
    title: "HiddenTrails - Your Smart Travel Planner",
    description:
      "HiddenTrails AI provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
    url: "https://www.travelplannerai.online",
    type: "website",
    siteName: "HiddenTrails",
    images: [
      {
        url: "opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Hidden Planner AI",
      },
    ],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center bg-yellow-50/40">
        {children}
      </main>
    </>
  );
}

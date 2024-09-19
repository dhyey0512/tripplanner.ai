import type {Metadata} from "next";
import Header from "@/components/home/Header";
export const metadata: Metadata = {
  metadataBase: new URL("https://tripplanner-ai.vercel.app/"),
  title: {
    default: "HiddenTrails AI - Your Smart Travel Planner",
    template: "%s | HiddenTrails AI - Your Smart Travel Planner",
  },
  description:
    " HiddenTrails AI provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
  keywords:
    "travel planner, AI travel planner, smart travel, travel suggestions, destination insights, personalized itineraries, trip planning, travel tips, vacation planning",
  openGraph: {
    title: "HiddenTrails AI - Your Smart Travel Planner",
    description:
      "HiddenTrails AI provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
    url: "https://tripplanner-ai.vercel.app/",
    type: "website",
    siteName: "HiddenTrailsAI",
    images: [
      {
        url: "opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "HiddenTrails AI",
      },
    ],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center bg-blue-50/40">
        {children}
      </main>
    </>
  );
}

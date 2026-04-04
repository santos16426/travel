import type { Metadata } from "next";
import { FeaturedGallery } from "@/components/FeaturedGallery";
import { Hero } from "@/components/Hero";
import { Travels } from "@/components/Travels";
import { showcaseDriveItems } from "@/features/travel/data/showcase";
import { travels } from "@/features/travel/data/travels";

export const metadata: Metadata = {
  description:
    "Travel photography and notes — places, photos, and stories from the road.",
};

export default function HomePage() {
  return (
    <main className="min-h-0">
      <Hero />
      <FeaturedGallery items={showcaseDriveItems} />
      <Travels items={travels} />
    </main>
  );
}

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Define Eatery type
type Eatery = {
  id: number;
  name: string;
  description: string;
  city: string;
  category: string;
  latitude: number;
  longitude: number;
  images: {
    data: { attributes: { url: string } }[];
  };
  review?: {
    food: string;
    service: string;
    pricing: string;
    extras: string;
    final: string;
  };
};

// Hardcoded eateries data
const HARDCODED_EATERIES: Eatery[] = [
  {
    id: 1,
    name: "Piatto Restaurant Zambia",
    description: "A vibrant spot at Embassy Mall offering a mix of Zambian and international dishes.",
    city: "Lusaka",
    category: "Restaurant",
    latitude: -15.4197,
    longitude: 28.3071,
    images: {
      data: [{ attributes: { url: "/piatto1.jpg" } }],
    },
    review: {
      food: "BBQ wings tasty but only 3; Kleftico disappointing, sent back; rump steak with garlic sauce was perfection, crispy chips. Crème brûlée good but cold.",
      service: "Excellent, friendly waitress Mutale, food arrived quickly even for a late morning visit.",
      pricing: "Pricey, e.g., 3 wings for K60. Bring a stacked wallet.",
      extras: "Loud 70s/80s music distracting, toilets far from restaurant, great ambiance otherwise.",
      final: "7/10 - Good food, great service, pricey. Worth a try!",
    },
  },
  {
    id: 2,
    name: "Little Bird in Kablounga",
    description: "A cozy cafe with great food and a relaxed vibe in Kablounga.",
    city: "Lusaka",
    category: "Cafe",
    latitude: -15.428859845537739,
    longitude: 28.347534542328308,
    images: {
      data: [{ attributes: { url: "/little.jpg" } }],
    },
    review: {
      food: "Great food, well-prepared and flavorful.",
      service: "Decent customer service, attentive but not exceptional.",
      pricing: "Reasonable for the quality offered.",
      extras: "Great atmosphere, limited seating can be an issue.",
      final: "6/10 - Good food, nice vibe, worth a visit if you get a seat.",
    },
  },
  {
    id: 3,
    name: "Bo'jangles Lusaka",
    description: "Affordable and very busy restaurant with consistent food and real alcohol options.",
    city: "Lusaka",
    category: "Restaurant",
    latitude: -15.410922652408445,
    longitude: 28.318713886507542,
    images: {
      data: [
        { attributes: { url: "/boja1.jpg" } },
        { attributes: { url: "/boja2.jpg" } },
      ],
    },
    review: {
      food: "Consistent food, quality is decent but not exceptional.",
      service: "Good customer service, but slow on weekends due to crowds.",
      pricing: "Affordable, great value for money.",
      extras: "Real alcohol available, try to get a window seat in summer for a better experience.",
      final: "6.8/10 - Solid choice for budget-friendly dining, but avoid peak weekend times.",
    },
  },
  {
    id: 4,
    name: "Tuyo Mexican Restaurant",
    description: "Mexican restaurant with decent food but small portions and high prices.",
    city: "Lusaka",
    category: "Restaurant",
    latitude: -15.425182237457316,
    longitude: 28.318741,
    images: {
      data: [
        { attributes: { url: "/mex.jpg" } },
        { attributes: { url: "/mexvid.mp4" } },
      ],
    },
    review: {
      food: "Decent Mexican food, nothing extraordinary.",
      service: "Good customer service, staff are attentive.",
      pricing: "Ridiculously overpriced, small portions for the cost.",
      extras: "Nice ambiance, but don’t come hungry due to portion sizes.",
      final: "4/10 - Overpriced and underwhelming, only visit if you’re not starving.",
    },
  },
];

// SSR-safe dynamic import
const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
}) as React.ComponentType<{ eateries: Eatery[] }>;

export default function WhereToEatPage() {
  const [eateries] = useState<Eatery[]>(HARDCODED_EATERIES);

  return (
    <main className="min-h-screen bg-[#fdf4e8] text-[#2e2e2e] font-sans px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#5d3a00] text-center mb-8">
        Explore Zambia’s Flavor Map 🍴
      </h1>

      <div className="rounded-2xl overflow-hidden shadow-lg border border-[#f4ddb1] max-w-6xl mx-auto">
        <MapClient eateries={eateries} />
      </div>
    </main>
  );
}
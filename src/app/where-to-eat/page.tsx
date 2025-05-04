"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Type definition
type Eatery = {
  id: number;
  attributes?: {
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
};

// ✅ Clean dynamic import with correct typing
const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
}) as React.ComponentType<{ eateries: Eatery[] }>;

export default function WhereToEatPage() {
  const [eateries, setEateries] = useState<Eatery[]>([]);

  useEffect(() => {
    fetch("https://app.temziebites.com/api/eateries?populate=images")
      .then((res) => res.json())
      .then((data) => setEateries(data.data))
      .catch((err) => console.error("Failed to fetch eateries", err));
  }, []);

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

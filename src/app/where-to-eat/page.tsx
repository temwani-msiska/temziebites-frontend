"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";

const MapClient = dynamic(() => import("@/components/MapClient"), { ssr: false });

type Eatery = {
  id: number;
  attributes: {
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
      final: string;
    };
  };
};

export default function WhereToEatPage() {
  const [eateries, setEateries] = useState<Eatery[]>([]);

  useEffect(() => {
    fetch("https://app.temziebites.com/api/eateries?populate[images]=*&populate[review]=*")
      .then((res) => res.json())
      .then((data) => setEateries(data.data));
  }, []);

  const center: LatLngExpression = [-14.559, 28.6731];

  const processed = eateries.map((e) => ({
    id: e.id,
    name: e.attributes.name,
    description: e.attributes.description,
    lat: e.attributes.latitude,
    lng: e.attributes.longitude,
    image: e.attributes.images?.data?.[0]?.attributes?.url
      ? `https://app.temziebites.com${e.attributes.images.data[0].attributes.url}`
      : undefined,
    finalReview: e.attributes.review?.final,
  }));

  return (
    <main className="min-h-screen bg-[#fdf4e8] text-[#2e2e2e] font-sans px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#5d3a00] text-center mb-8">
        Explore Zambia’s Flavor Map 🍴
      </h1>

      <div className="rounded-2xl overflow-hidden shadow-lg border border-[#f4ddb1] max-w-6xl mx-auto">
        <MapClient center={center} eateries={processed} />
      </div>
    </main>
  );
}

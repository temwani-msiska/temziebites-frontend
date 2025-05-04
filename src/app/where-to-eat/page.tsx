"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

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
      food: string;
      service: string;
      pricing: string;
      extras: string;
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

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }, []);

  const center: LatLngExpression = [-14.559, 28.6731];

  return (
    <main className="min-h-screen bg-[#fdf4e8] text-[#2e2e2e] font-sans px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#5d3a00] text-center mb-8">
        Explore Zambia’s Flavor Map 🍴
      </h1>

      <div className="rounded-2xl overflow-hidden shadow-lg border border-[#f4ddb1] max-w-6xl mx-auto">
        <MapContainer center={center} zoom={6} style={{ height: "600px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {eateries.map((eatery) => {
            const { name, description, latitude, longitude, images, review } = eatery.attributes;
            const imgSrc = images?.data?.[0]?.attributes?.url
              ? `https://app.temziebites.com${images.data[0].attributes.url}`
              : "";

            return (
              <Marker
                key={eatery.id}
                position={[latitude, longitude] as LatLngExpression}
              >
                <Popup>
                  <div className="text-sm max-w-[220px]">
                    <strong className="text-base text-[#d94f04]">{name}</strong>
                    <p className="mt-1">{description}</p>
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt={name}
                        className="mt-2 rounded-lg w-full h-28 object-cover"
                      />
                    )}
                    {review?.final && (
                      <p className="mt-2 italic text-[11px] text-gray-600">
                        {review.final}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </main>
  );
}

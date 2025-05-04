"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

// Define the Eatery type (can be moved to a types.ts file)
type Eatery = {
  id: number;
  attributes?: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    images: {
      data: { attributes: { url: string } }[];
    };
    review?: { final: string };
  };
};

type MapClientProps = {
  eateries: Eatery[];
};

export default function MapClient({ eateries }: MapClientProps) {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }, []);

  const center: LatLngExpression = [-14.559, 28.6731];

  return (
    <MapContainer center={center} zoom={6} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {eateries.map((eatery) => {
        if (!eatery?.attributes) return null;

        const { name, description, latitude, longitude, images, review } = eatery.attributes;
        const imgSrc = images?.data?.[0]?.attributes?.url
          ? `https://app.temziebites.com${images.data[0].attributes.url}`
          : "";

        return (
          <Marker key={eatery.id} position={[latitude, longitude] as LatLngExpression}>
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
                  <p className="mt-2 italic text-[11px] text-gray-600">{review.final}</p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

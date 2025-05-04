"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

// Adjusted type for flat Strapi v5 response
type Eatery = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  city: string;
  category: string;
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
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {eateries.map((eatery) => {
        if (!eatery) return null;

        const { id, name, description, latitude, longitude, images, review } =
          eatery;

        const imgSrc = images?.data?.[0]?.attributes?.url
          ? `https://app.temziebites.com${images.data[0].attributes.url}`
          : "";

        return (
          <Marker key={id} position={[latitude, longitude] as LatLngExpression}>
            <Popup maxWidth={300}>
              <div className="text-sm w-[250px]">
                <strong className="text-base text-[#d94f04]">{name}</strong>
                <p className="mt-1">{description}</p>

                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={name}
                    className="mt-2 rounded-lg w-full h-[120px] object-cover border"
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
  );
}

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

// Adjusted type for eatery data
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
  eateries: Eatery[] | undefined;
};

export default function MapClient({ eateries = [] }: MapClientProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Set custom icons for Leaflet markers
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });

    // Cleanup map instance on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const center: LatLngExpression = [-14.559, 28.6731];

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div ref={containerRef} style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        ref={(map: L.Map | null) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {eateries && eateries.length > 0 ? (
          eateries.map((eatery) => {
            if (!eatery || !eatery.latitude || !eatery.longitude) return null;

            const { id, name, description, latitude, longitude, images, review } =
              eatery;

            const imgSrc = images?.data?.[0]?.attributes?.url
              ? images.data[0].attributes.url.startsWith("http")
                ? images.data[0].attributes.url
                : `/images${images.data[0].attributes.url}`
              : "";

            return (
              <Marker
                key={id}
                position={[latitude, longitude] as LatLngExpression}
              >
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
          })
        ) : (
          <div>No eateries available</div>
        )}
      </MapContainer>
    </div>
  );
}
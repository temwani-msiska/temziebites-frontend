"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type Eatery = {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  image?: string;
  finalReview?: string;
};

type Props = {
  center: LatLngExpression;
  eateries: Eatery[];
};

export default function MapClient({ center, eateries }: Props) {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer center={center} zoom={6} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {eateries.map((e) => (
        <Marker key={e.id} position={[e.lat, e.lng]}>
          <Popup>
            <div className="text-sm max-w-[220px]">
              <strong className="text-base text-[#d94f04]">{e.name}</strong>
              <p className="mt-1">{e.description}</p>
              {e.image && (
                <img
                  src={e.image}
                  alt={e.name}
                  className="mt-2 rounded-lg w-full h-28 object-cover"
                />
              )}
              {e.finalReview && (
                <p className="mt-2 italic text-[11px] text-gray-600">{e.finalReview}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

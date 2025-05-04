"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";

type Eatery = {
  name: string;
  description: string;
  lat: number;
  lng: number;
  onClick: () => void;
};

type MapClientProps = {
  eateries: Eatery[];
  center: LatLngExpression;
};

export default function MapClient({ eateries, center }: MapClientProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
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
      {eateries.map((eatery, index) => (
        <Marker
          key={index}
          position={[eatery.lat, eatery.lng]}
          eventHandlers={{
            click: eatery.onClick,
          }}
        />
      ))}
    </MapContainer>
  );
}

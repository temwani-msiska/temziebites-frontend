// MapClient component for rendering the map with eateries
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

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
  onMarkerClick: (eatery: Eatery) => void;
  selectedEatery: Eatery | null;
};

function MapController({ selectedEatery }: { selectedEatery: Eatery | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedEatery) {
      map.flyTo([selectedEatery.latitude, selectedEatery.longitude], 14, {
        duration: 1,
      });
    }
  }, [selectedEatery, map]);
  return null;
}

export default function MapClient({ eateries, onMarkerClick, selectedEatery }: MapClientProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const center: [number, number] = [-15.4167, 28.2833]; // Lusaka, Zambia

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div ref={containerRef} className="h-[500px] md:h-[600px] w-full relative z-0">
      <MapContainer
        center={center}
        zoom={10}
        className="h-full w-full"
        ref={mapRef}
        style={{ zIndex: 0 }} // Ensure map stays below modal
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {eateries.map((eatery) => {
          if (!eatery.latitude || !eatery.longitude) return null;

          const { id, name, description, latitude, longitude, images, review } = eatery;

          return (
            <Marker
              key={id}
              position={[latitude, longitude]}
              eventHandlers={{
                click: () => onMarkerClick(eatery),
              }}
            >
              <Popup maxWidth={300} className="z-10">
                <div className="text-sm w-[250px]">
                  <strong className="text-base text-[#d94f04]">{name}</strong>
                  <p className="mt-1">{description}</p>
                  {images?.data?.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {images.data.map((item, index) => {
                        const src = item.attributes.url.startsWith("http")
                          ? item.attributes.url
                          : `/images${item.attributes.url}`;
                        const isVideo = src.endsWith(".mp4");

                        return isVideo ? (
                          <video
                            key={index}
                            src={src}
                            controls
                            className="rounded-lg w-full h-[120px] object-cover border"
                          />
                        ) : (
                          <img
                            key={index}
                            src={src}
                            alt={`${name} ${index + 1}`}
                            className="rounded-lg w-full h-[120px] object-cover border"
                          />
                        );
                      })}
                    </div>
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
        <MapController selectedEatery={selectedEatery} />
      </MapContainer>
    </div>
  );
}
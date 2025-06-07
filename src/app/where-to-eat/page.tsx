"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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

const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
});

export default function WhereToEatPage() {
  const [eateries] = useState<Eatery[]>(HARDCODED_EATERIES);
  const [selectedEatery, setSelectedEatery] = useState<Eatery | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = ["All", ...new Set(HARDCODED_EATERIES.map((e) => e.category))];

  const filteredEateries = eateries.filter((eatery) =>
    (eatery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     eatery.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === "All" || eatery.category === categoryFilter)
  );

  const handleMarkerClick = (eatery: Eatery) => {
    setSelectedEatery(eatery);
    setIsSidebarOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="min-h-screen bg-[#fdf4e8] text-[#2e2e2e] font-sans">
      <header className="bg-[#5d3a00] text-white p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold">
            Zambia’s Flavor Map 🍴
          </h1>
          <button
            className="md:hidden p-2 rounded-lg bg-[#d94f04] text-white"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-1/3 p-4 bg-[#f4ddb1] md:bg-transparent fixed md:static top-0 left-0 h-full md:h-auto z-20 transition-transform duration-300 md:transform-none`}
        >
          <div className="sticky top-20">
            <input
              type="text"
              placeholder="Search eateries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#d94f04] focus:outline-none focus:ring-2 focus:ring-[#d94f04] mb-4"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#d94f04] focus:outline-none focus:ring-2 focus:ring-[#d94f04] mb-4"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {filteredEateries.length > 0 ? (
                filteredEateries.map((eatery) => (
                  <div
                    key={eatery.id}
                    onClick={() => {
                      setSelectedEatery(eatery);
                      setIsSidebarOpen(false);
                    }}
                    className={`p-4 rounded-lg cursor-pointer ${
                      selectedEatery?.id === eatery.id
                        ? "bg-[#d94f04] text-white"
                        : "bg-white hover:bg-[#f4ddb1]"
                    } shadow-md`}
                  >
                    <h3 className="font-bold">{eatery.name}</h3>
                    <p className="text-sm">{eatery.description}</p>
                    <p className="text-xs italic">{eatery.review?.final}</p>
                  </div>
                ))
              ) : (
                <p>No eateries found.</p>
              )}
            </div>
          </div>
        </aside>

        <div className="w-full md:w-2/3 p-4">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#f4ddb1]">
            <MapClient
              eateries={filteredEateries}
              onMarkerClick={handleMarkerClick}
              selectedEatery={selectedEatery} // Added to pass to MapClient
            />
          </div>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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
  placeId?: string;
};

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  time: number;
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
      pricing: "Pricey. Bring a stacked wallet.",
      extras: "Loud 70s/80s music distracting, toilets far from restaurant, great ambiance otherwise.",
      final: "7/10 - Good food, great service, pricey. Worth a try!",
    },
    placeId: "ChIJI7iZkBvzQBkR2n8JOAW2SC0",
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
    placeId: "ChIJwXHt03CNQBkRPdv2KwrtQKw",
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
    placeId: "ChIJbegrY4-NQBkRsEFlOjsiHkM",
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
    placeId: "ChIJ7fecKQCNQBkRycPOfGvanto",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);

  const categories = ["All", ...new Set(HARDCODED_EATERIES.map((e) => e.category))];

  const filteredEateries = eateries.filter((eatery) =>
    (eatery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     eatery.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === "All" || eatery.category === categoryFilter)
  );

  useEffect(() => {
    if (selectedEatery?.placeId) {
      const fetchGoogleReviews = async () => {
        try {
          const response = await fetch(`/api/google-reviews?placeId=${selectedEatery.placeId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setGoogleReviews(data.reviews || []);
        } catch (error) {
          console.error("Error fetching Google Reviews:", error);
          setGoogleReviews([]);
        }
      };
      fetchGoogleReviews();
    } else {
      setGoogleReviews([]);
    }
  }, [selectedEatery]);

  const handleMarkerClick = (eatery: Eatery) => {
    setSelectedEatery(eatery);
    setIsSidebarOpen(true);
    setIsModalOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#fdf4e8] text-[#2e2e2e] font-sans relative">
      <header className="bg-[white] text-[#5d3a00] p-4 sticky top-0 z-10">
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
                      setIsModalOpen(true);
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

        <div className="w-full md:w-2/3 p-4 flex">
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-[#f4ddb1] z-10">
            <MapClient
              eateries={filteredEateries}
              onMarkerClick={handleMarkerClick}
              selectedEatery={selectedEatery}
            />
          </div>
          {selectedEatery && (
            <aside className="hidden md:block w-1/3 p-4 bg-[#f4ddb1] rounded-lg ml-4 max-h-[600px] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Google Reviews for {selectedEatery.name}</h3>
              {googleReviews.length > 0 ? (
                googleReviews.map((review, index) => (
                  <div key={index} className="mb-4 p-3 bg-white rounded-lg shadow">
                    <p className="font-semibold">{review.author_name}</p>
                    <p className="text-sm">Rating: {review.rating}/5</p>
                    <p className="text-sm">{review.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.time * 1000).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </aside>
          )}
        </div>
      </div>

      {selectedEatery && isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-60"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 z-60 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{selectedEatery.name}</h2>
            <p className="text-sm mb-4">{selectedEatery.description}</p>
            {selectedEatery.images?.data?.length > 0 && (
              <div className="mt-4 space-y-4">
                {selectedEatery.images.data.map((item, index) => {
                  const src = item.attributes.url.startsWith("http")
                    ? item.attributes.url
                    : `/images${item.attributes.url}`;
                  const isVideo = src.endsWith(".mp4");

                  return isVideo ? (
                    <video
                      key={index}
                      src={src}
                      controls
                      className="rounded-lg w-full h-[200px] object-cover border"
                    />
                  ) : (
                    <img
                      key={index}
                      src={src}
                      alt={`${selectedEatery.name} ${index + 1}`}
                      className="rounded-lg w-full h-[200px] object-cover border"
                    />
                  );
                })}
              </div>
            )}
            {selectedEatery.review && (
              <div className="space-y-2 mt-4">
                <p><strong>Food:</strong> {selectedEatery.review.food}</p>
                <p><strong>Service:</strong> {selectedEatery.review.service}</p>
                <p><strong>Pricing:</strong> {selectedEatery.review.pricing}</p>
                <p><strong>Extras:</strong> {selectedEatery.review.extras}</p>
                <p><strong>Final:</strong> {selectedEatery.review.final}</p>
              </div>
            )}
            <button
              onClick={closeModal}
              className="mt-6 bg-[#d94f04] text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      <footer className="relative z-10 text-center py-12 bg-[#F5E8D2]/90 border-t-2 border-[#D2691E]/30 flex flex-col items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 8px 20px rgba(210,105,30,0.3)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => (window.location.href = "/")}
          className="bg-[#D2691E]/40 hover:bg-[#D2691E]/60 text-[#F5E8D2] px-8 py-4 rounded-full border-2 border-[#D2691E] shadow-lg transition-all duration-300"
        >
          Back to the Feast
        </motion.button>
        <p className="text-[#5C4033]/70 text-sm italic">
          © {new Date().getFullYear()} Temzie Bites. Crafted with spice & soul.
        </p>
      </footer>
    </main>
  );
}
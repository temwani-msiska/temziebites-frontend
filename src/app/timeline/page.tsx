"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronDown } from "lucide-react";

const milestones = {
  "2016": [
    {
      title: "Temzie Bites is Born",
      description:
        "Armed with a Huawei P9, wild curiosity, and zero fear, Temzie Bites launches with a spicy spark and a dream to flavor the world.",
      media: "/images/Original Logo.png",
      isVideo: false,
    },
    {
      title: "First WordPress Post",
      description:
        "With trembling hands and a plate of tikka chicken, the first blog post hits the internet — and Temzie's flavor revolution begins.",
      media: "/images/tikkachicken.jpg",
      isVideo: false,
    },
    {
      title: "No-Bake Hawaiian Pizza",
      description:
        "Pineapple, bravado, and a toaster oven. Innovation? Absolutely. Regrets? Maybe one.",
      media: "/images/Pizza.jpg",
      isVideo: false,
    },
  ],
  "2017": [
    {
      title: "First Video",
      description:
        "Lights, camera, hunger! The kitchen transforms into a stage as Temzie debuts its first sizzling video.",
      media: "/videos/millet-nshima.mp4",
      isVideo: true,
    },
    {
      title: "New Logo, New Temzie",
      description:
        "Out with the old, in with the bold — Temzie rebrands with fresh flair and unstoppable energy.",
      media: "/images/Logo2.png",
      isVideo: false,
    },
    {
      title: "New Camera",
      description:
        "Goodbye grainy pixels, hello crisp cravings — a new camera brings every bite to life in delicious detail.",
      media: "/videos/chibwawa.mp4",
      isVideo: true,
    },
  ],
  "2018": [
    {
      title: "Foodies TV Show",
      description:
        "From clicks to cable — Temzie Bites makes its national TV debut, bringing Zambian kitchens into living rooms across the country.",
      media: "/videos/foodies.mp4",
      isVideo: true,
    },
    {
      title: "Another Logo, Same Heart",
      description:
        "Reimagined yet rooted — the new logo reflects a bolder, richer, and more flavorful identity.",
      media: "/images/temziebites.png",
      isVideo: false,
    },
    {
      title: "Official Website Launch",
      description:
        "A digital kitchen is born. TemzieBites.com goes live — a home for every story, spice, and spoonful.",
      media: "/images/TemziebitesWebsite.png",
      isVideo: false,
    },
  ],
  "2019": [
    {
      title: "Delele Goes Viral!",
      description:
        "Who knew slime could shine? The iconic delele video hits 100K views — proof that flavor has no rules.",
      media: "/images/delele.jpg",
      isVideo: false,
    },
    {
      title: "A Taste of Adventure",
      description:
        "Curry goat, Zambian soul. A bold step into uncharted flavors wrapped in fire and tradition.",
      media: "/images/goat.jpg",
      isVideo: false,
    },
    {
      title: "Zambia's Culinary Scene Explodes",
      description:
        "From street eats to gourmet plates, Zambia's food map lights up — and Temzie Bites captures it all.",
      media: "/images/mexican.jpg",
      isVideo: false,
    },
  ],
  "2021": [
    {
      title: "Temzie Bites Pop-Up",
      description:
        "What began online comes to life — the first Temzie Bites pop-up serves up flavor, fans, and a whole lot of fun.",
      media: "/images/popup.jpg",
      isVideo: false,
    },
    {
      title: "6,000 Subscribers",
      description:
        "From humble clicks to kitchen cult status — 6,000 foodies strong and still growing. Tastebuds, assemble!",
      media: "/images/Youtube.png",
      isVideo: false,
    },
  ],
};

export default function TimelinePage() {
  const [modalMedia, setModalMedia] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMediaClick = (media: string, isVideoMedia: boolean) => {
    setModalMedia(media);
    setIsVideo(isVideoMedia);
  };

  const closeModal = () => {
    setModalMedia(null);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#F5E8D2] via-[#D2691E]/30 to-[#5C4033]/20 overflow-y-auto text-[#3D2B1F] font-serif">
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22none%22 stroke=%22%23D2691E%22 stroke-width=%222%22/%3E%3Cpath fill=%22%23D2691E%22 opacity=%220.1%22 d=%22M50 10a40 40 0 0 1 40 40 40 40 0 0 1-40 40 40 40 0 0 1-40-40 40 40 0 0 1 40-40z%22/%3E%3C/svg%3E')] bg-repeat bg-[length:200px_200px] animate-pulse" />
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="text-5xl md:text-8xl font-extrabold text-[#D2691E] drop-shadow-lg mb-8"
            style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.3)" }}
          >
            The Temzie Bites Odyssey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-2xl text-[#5C4033] leading-relaxed mb-12 max-w-3xl mx-auto italic"
          >
            From a flicker of flavor to a roaring culinary epic, join Temzie Bites on a zestful journey reshaping Zambian cuisine.
          </motion.p>

          <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 8px 20px rgba(210,105,30,0.3)" }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToNextSection}
              className="flex items-center justify-center space-x-3 bg-[#D2691E]/40 hover:bg-[#D2691E]/60 text-[#F5E8D2] px-8 py-4 rounded-full border-2 border-[#D2691E] shadow-lg transition-all duration-300"
            >
              <span className="font-bold">Dive In</span>
              <ChevronDown size={20} className="animate-bounce" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      <div
        ref={timelineRef}
        className="sticky top-0 z-20 bg-[#F5E8D2]/90 backdrop-blur-lg py-4 border-b-2 border-[#D2691E]/30 px-4 shadow-md"
      >
        <div className="flex items-center justify-center space-x-3 md:space-x-8 max-w-6xl mx-auto overflow-x-auto hide-scrollbar">
          {Object.keys(milestones).map((year) => (
            <motion.button
              key={year}
              whileHover={{ scale: 1.15, backgroundColor: "#D2691E/40", rotate: 3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const element = document.getElementById(`year-${year}`);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
                setActiveYear(year);
              }}
              className={`px-5 py-3 rounded-full text-sm md:text-lg font-semibold transition-all duration-300 ${
                activeYear === year
                  ? "bg-[#D2691E]/50 border-2 border-[#D2691E] text-[#F5E8D2] shadow-md"
                  : "bg-[#8B4513]/20 hover:bg-[#D2691E]/30 text-[#5C4033]"
              }`}
            >
              {year}
            </motion.button>
          ))}
        </div>
      </div>

      {Object.entries(milestones).map(([year, events]) => (
        <section
          id={`year-${year}`}
          key={year}
          className="relative z-10 min-h-screen flex flex-col items-center py-28 px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-7xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className="text-6xl md:text-9xl font-extrabold mb-16 text-[#D2691E]/95 tracking-tight"
              style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.3)" }}
            >
              {year}
            </motion.h2>

            <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {events.map(({ title, description, media, isVideo }, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: j * 0.15, type: "spring" }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                    rotate: 1,
                    transition: { duration: 0.3 },
                  }}
                  className="bg-gradient-to-br from-[#8B4513]/50 to-[#D2691E]/30 backdrop-blur-md border-2 border-[#D2691E]/40 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div
                    className="relative h-64 w-full overflow-hidden cursor-pointer group"
                    onClick={() => handleMediaClick(media, isVideo)}
                  >
                    {isVideo ? (
                      <>
                        <video
                          src={media}
                          muted
                          loop
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#5C4033]/40 flex items-center justify-center group-hover:bg-[#5C4033]/20 transition-all duration-300">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            className="bg-[#D2691E]/40 backdrop-blur-lg p-4 rounded-full"
                          >
                            <Play className="text-[#F5E8D2] w-10 h-10" />
                          </motion.div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={media}
                        alt={title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#D2691E] mb-3 tracking-wide">
                      {title}
                    </h3>
                    <p className="text-[#5C4033] leading-relaxed text-lg">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      ))}

      <AnimatePresence>
        {modalMedia && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#5C4033]/95 z-50 flex items-center justify-center p-6 md:p-12"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative max-w-5xl w-full bg-gradient-to-b from-[#8B4513] to-[#5C4033] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo ? (
                <video
                  src={modalMedia}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="relative pt-[60%] md:pt-[50%]">
                  <Image
                    src={modalMedia}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                onClick={closeModal}
                className="absolute top-6 right-6 bg-[#D2691E]/50 hover:bg-[#D2691E]/70 backdrop-blur-lg p-3 rounded-full transition-all duration-300"
              >
                <X className="text-[#F5E8D2] w-8 h-8" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes pulse {
          0% { opacity: 0.2; }
          50% { opacity: 0.4; }
          100% { opacity: 0.2; }
        }
        .animate-pulse {
          animation: pulse 4s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}
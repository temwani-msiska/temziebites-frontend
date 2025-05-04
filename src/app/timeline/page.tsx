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
    <main className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-y-auto text-white font-sans">
      <div
        className="absolute inset-0 z-0 bg-repeat bg-top"
        style={{
          backgroundImage: "url('/images/backgroundtimeline.png')",
          backgroundSize: "auto",
        }}
      />
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold text-[#fff4dd] drop-shadow-lg mb-8"
          >
            The Temzie Bites Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-white leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            From humble blog posts to viral recipes and TV screens —
            here&rsquo;s how we stirred the pot and transformed Zambian cuisine
            into a digital sensation.
          </motion.p>

          <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToNextSection}
              className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full border border-white/30 shadow-lg transition-all duration-300"
            >
              <span>Explore our journey</span>
              <ChevronDown size={18} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      <div
        ref={timelineRef}
        className="sticky top-0 z-20 bg-black/50 backdrop-blur-md py-4 border-b border-white/10 px-4"
      >
        <div className="flex items-center justify-center space-x-2 md:space-x-6 max-w-6xl mx-auto overflow-x-auto hide-scrollbar">
          {Object.keys(milestones).map((year) => (
            <motion.button
              key={year}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById(`year-${year}`);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
                setActiveYear(year);
              }}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeYear === year
                  ? "bg-white/20 border border-white/40 text-white"
                  : "bg-transparent hover:bg-white/10 text-white/70"
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
          className="relative z-10 min-h-screen flex flex-col items-center py-24 px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-7xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-extrabold mb-16 text-[#fff4dd]/90 tracking-tight"
            >
              {year}
            </motion.h2>

            <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {events.map(({ title, description, media, isVideo }, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: j * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                  }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div
                    className="relative h-56 w-full overflow-hidden cursor-pointer"
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
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-all duration-300">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                            <Play className="text-white w-8 h-8" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={media}
                        alt={title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full bg-black rounded-xl overflow-hidden"
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
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
              >
                <X className="text-white w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 text-center py-10 bg-black/50 border-t border-white/10 flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/")}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/20 transition-all duration-300"
        >
          Home
        </motion.button>
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} Temzie Bites. All rights reserved.
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
      `}</style>
    </main>
  );
}

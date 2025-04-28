"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Timeline from "@/components/Timeline";

export default function IntroPage() {
  const router = useRouter();
  const [showTimeline, setShowTimeline] = useState(false);

  const finishIntro = () => {
    router.push("/home");          // 🚫 no setItem
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden relative">
      {!showTimeline && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          onAnimationComplete={() => setTimeout(() => setShowTimeline(true), 1000)}
          className="flex flex-col items-center justify-center"
        >
          <img
            src="/images/logo.png"
            alt="Temzie Bites Logo"
            className="w-96 h-96 object-contain"
          />
        </motion.div>
      )}

      {showTimeline && (
        <>
          <h1 className="text-4xl font-bold my-8 text-center animate-pulse">
            The Temzie Bites Journey
          </h1>
          <Timeline />

          <button
            onClick={finishIntro}
            className="mt-12 px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Enter Website
          </button>
        </>
      )}
    </div>
  );
}

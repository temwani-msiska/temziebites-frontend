"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Lottie from "@/lib/dynamicLottie";
import sparkleAnimation from "@/animations/sparkle.json";

const SPLASH_MS = 9000; // ← total splash length (9 seconds)

export default function IntroPage() {
  const router = useRouter();
  const [showTimeline, setShowTimeline] = useState(false);

  /* reveal intro after SPLASH_MS */
  useEffect(() => {
    if (!showTimeline) {
      const t = setTimeout(() => setShowTimeline(true), SPLASH_MS);
      return () => clearTimeout(t);
    }
  }, [showTimeline]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      {/* sparkles + blobs */}
      <Lottie
        animationData={sparkleAnimation}
        loop
        className="absolute inset-0 pointer-events-none"
      />
      {[
        "top-[-6rem] left-[-6rem] w-[28rem] h-[28rem] bg-green-100",
        "top-10 right-12 w-[18rem] h-[18rem] bg-yellow-200 blur-3xl",
        "bottom-[-3rem] right-[-6rem] w-[22rem] h-[10rem] bg-red-200 rotate-12",
        "bottom-32 left-6 w-24 h-24 bg-yellow-300",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full mix-blend-multiply opacity-60 ${cls}`}
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ——— Splash ——— */}
      <AnimatePresence>
        {!showTimeline && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} /* fade in/out 1 s */
          >
            {/* 🌟 radial burst */}
            <motion.span
              className="absolute aspect-square w-[720px] rounded-full bg-gradient-to-tr from-green-600 via-yellow-500 to-red-600"
              initial={{ scale: 0, opacity: 0.3 }}
              animate={{
                scale: [0, 1.4, 1.15, 1],
                opacity: [0.3, 0.65, 0.45, 0],
              }}
              transition={{ duration: 7, ease: "easeOut" }}
            />

            {/* ◯ stroke + logo */}
            <div className="relative w-[420px] h-[420px] flex items-center justify-center">
              <svg
                width="420"
                height="420"
                viewBox="0 0 360 360"
                className="absolute"
              >
                <motion.circle
                  cx="180"
                  cy="180"
                  r="170"
                  stroke="#ffffff"
                  strokeWidth="6"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray="1068"
                  strokeDashoffset="1068"
                  animate={{ strokeDashoffset: [1068, 0] }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                />
              </svg>

              {/* logo safely inside circle (340 × 340) */}
              <motion.div
                className="absolute w-[340px] h-[340px] rounded-full overflow-hidden"
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 4.5, delay: 2, ease: "easeOut" }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Temzie Bites Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* 💬 Welcome text */}
            <motion.h2
              className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-700 via-yellow-600 to-red-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: 5,
              }} /* starts as stroke ends */
            >
              Welcome&nbsp;to&nbsp;Temzie&nbsp;Bites
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* —————————————————  MAIN  ————————————————— */}
      {showTimeline && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-12"
        >
          {/* animated brand badge (top-left) */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-6 left-6 flex items-center gap-3 pl-3 pr-5 py-2 rounded-full bg-white/90 shadow-lg border-4 border-transparent hover:shadow-2xl transition-all group"
          >
            <span className="relative inline-flex">
              <Image
                src="/images/logo.png"
                alt="Temzie Bites Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-600 via-yellow-500 to-red-600 opacity-30 blur-md -z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
            <span className="text-lg font-extrabold bg-gradient-to-r from-green-700 via-yellow-600 to-red-600 bg-clip-text text-transparent group-hover:tracking-wide transition-all">
              Temzie&nbsp;Bites
            </span>
          </button>

          {/* ▶️ left panel */}
          <div className="md:w-1/2 w-full max-w-lg text-center md:text-left space-y-6">
            <motion.h1
              className="text-4xl font-extrabold bg-gradient-to-r from-green-700 via-yellow-600 to-red-600 bg-clip-text text-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              The Story&nbsp;Began
            </motion.h1>

            <motion.p
              className="text-lg text-gray-800/90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome to <strong>Temzie Bites</strong> — an{" "}
              <em>African food blog</em> spinning bold flavours, vibrant
              cultures, and mouth-watering memories into every post.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={() => router.push("/timeline")}
                className="relative overflow-hidden rounded-full px-8 py-3 font-medium text-white bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 shadow-lg hover:brightness-110 focus:outline-none"
              >
                <span className="relative z-10">View Timeline</span>
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </button>

              <button
                onClick={() => router.push("/home")}
                className="px-8 py-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shadow"
              >
                Skip
              </button>
            </motion.div>
          </div>

          {/* 🍿 right panel (video card with Pan-African halo) */}
          <motion.div
            className="md:w-1/2 w-full flex justify-center items-center relative"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden">
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-600 via-yellow-500 to-red-600 blur-2xl"
                animate={{ opacity: [0.6, 0.2, 0.6] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.video
                src="/videos/creative-thinking.mp4"
                muted
                autoPlay
                loop
                playsInline
                className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

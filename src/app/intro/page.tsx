/* src/app/intro/page.tsx */
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ---- constants ---- */

const SPLASH_MS = 9000;

/* hero video sources */
const FRONT_VIDEO = "/videos/Foodies%20Episode%201%20Promo.mp4";
const LEFT_VIDEO  = "/videos/Zambian%20Food%20_%20Goat%20Curry.mp4";
const RIGHT_VIDEO = "/videos/Zambian%20Food%20_%20Village%20Chicken.mp4";

/* decorative confetti shapes */
type Shape = { cls: string; x: number; y: number; size: number; delay: number };

const shapes: Shape[] = [
  { cls: "rounded-full bg-amber-300", x: -70,  y: -20,  size: 10, delay: 0   },
  { cls: "rounded-full bg-rose-400",  x:  95,  y: -60,  size: 14, delay: 1   },
  { cls: "bg-lime-400 rotate-45",     x:  35,  y: 100,  size: 12, delay: 0.5 },
  { cls: "rounded-full bg-rose-300",  x: -110, y:  70,  size: 14, delay: 0.2 },
  { cls: "bg-amber-400 rotate-12",    x: 120,  y:  80,  size: 10, delay: 0.8 },
  { cls: "rounded-full bg-lime-300",  x: -40,  y: -130, size: 12, delay: 0.4 },
];

/* ---- main page ---- */

export default function IntroPage() {
  const router                  = useRouter();
  const [showTimeline, setShow] = useState(false);

  useEffect(() => {
    if (!showTimeline) {
      const t = setTimeout(() => setShow(true), SPLASH_MS);
      return () => clearTimeout(t);
    }
  }, [showTimeline]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-50">

      {/* pastel blobs (deepest background) */}
      {[
        "top-[-18%] left-[-12%] w-[60vw] h-[60vw] bg-rose-300",
        "bottom-[-15%] right-[-20%] w-[55vw] h-[45vw] bg-lime-300",
        "top-[25%] right-[8%] w-[38vw] h-[38vw] bg-amber-200",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full mix-blend-multiply blur-3xl opacity-40 ${pos}`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 14 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* floating confetti (above blobs, behind splash/hero) */}
      <FloatingShapes />

      {/* splash vs hero */}
      <AnimatePresence>{!showTimeline && <Splash />}</AnimatePresence>
      {showTimeline && (
        <Hero
          onTimeline={() => router.push("/timeline")}
          onSkip={() => router.push("/home")}
        />
      )}
    </div>
  );
}

/* ---- floating-shapes layer ---- */

function FloatingShapes() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none">
      {shapes.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute block ${s.cls}`}
          style={{ width: s.size, height: s.size, left: "50%", top: "50%" }}
          initial={{ x: s.x, y: s.y, opacity: 0, scale: 0.6 }}
          animate={{
            x: [s.x, s.x + 18, s.x - 14, s.x],
            y: [s.y, s.y + 24, s.y - 16, s.y],
            opacity: [0, 1, 1, 0],
            rotate: [0, 25, -25, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ---- splash ---- */

function Splash() {
  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-gradient-to-tr from-rose-50 via-amber-50/70 to-lime-50/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.span
        className="absolute aspect-square w-[90vw] max-w-[45rem] rounded-full bg-gradient-to-tr from-lime-600 via-amber-500 to-rose-600"
        initial={{ scale: 0, opacity: 0.3 }}
        animate={{ scale: [0, 1.4, 1.1, 1], opacity: [0.3, 0.6, 0.45, 0] }}
        transition={{ duration: 7, ease: "easeOut" }}
      />

      <div className="relative w-[80vw] max-w-[26rem] aspect-square flex items-center justify-center">
        {/* circular stroke */}
        <svg viewBox="0 0 360 360" className="absolute w-full h-full">
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

        {/* logo */}
        <motion.div
          className="absolute w-[70%] h-[70%] rounded-full overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 4.5, delay: 2, ease: "easeOut" }}
        >
          <Image
            src="/images/logo.png"
            alt="Temzie Bites Logo"
            fill
            className="object-contain"
            sizes="(max-width:640px) 70vw, 18rem"
            priority
          />
        </motion.div>
      </div>

      <motion.h2
        className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-lime-700 via-amber-600 to-rose-600 bg-clip-text text-transparent text-center px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 5 }}
      >
        Welcome&nbsp;to&nbsp;Temzie&nbsp;Bites
      </motion.h2>
    </motion.div>
  );
}

/* ---- hero ---- */

function Hero({
  onTimeline,
  onSkip,
}: {
  onTimeline: () => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      key="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 pt-32 md:pt-40 pb-12 gap-12"
    >
      <BrandBadge />

      {/* copy block */}
      <div className="md:w-1/2 w-full max-w-xl text-center md:text-left space-y-6">
        <motion.h1
          className="mt-[-1.5rem] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-lime-700 via-amber-600 to-rose-600 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The&nbsp;Story&nbsp;Began
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-700/90 px-2 md:px-0"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Dive into <strong>Temzie&nbsp;Bites</strong>—your&nbsp;
          <em>all-Zambian culinary chronicle</em> celebrating&nbsp;
          <span className="font-semibold">bold flavours</span>,&nbsp;
          vibrant food culture, and hometown stories behind every bite.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <CTA onClick={onTimeline}>View Timeline</CTA>
          <button
            onClick={onSkip}
            className="px-8 py-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shadow"
          >
            Skip
          </button>
        </motion.div>
      </div>

      {/* triple-video rings */}
      <motion.div
        className="md:w-1/2 w-full flex justify-center items-center px-4"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <TripleCircleVideo />
      </motion.div>
    </motion.div>
  );
}

/* ---- helpers ---- */

function BrandBadge() {
  return (
    <button
      onClick={() => (window.location.href = "/")}
      className="absolute top-2 sm:top-3 left-4 sm:left-6 flex items-center gap-3 pl-3 pr-4 py-2 rounded-full bg-white/90 shadow-lg hover:shadow-2xl transition-all group"
    >
      <span className="relative inline-flex">
        <Image src="/images/logo.png" alt="Temzie logo" width={40} height={40} className="rounded-full" />
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-lime-600 via-amber-500 to-rose-600 opacity-30 blur-md -z-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <span className="text-lg font-extrabold bg-gradient-to-r from-lime-700 via-amber-600 to-rose-600 bg-clip-text text-transparent group-hover:tracking-wide transition-all">
        Temzie&nbsp;Bites
      </span>
    </button>
  );
}

function CTA({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-full px-8 py-3 font-medium text-white bg-gradient-to-r from-lime-600 via-amber-500 to-rose-600 shadow-lg hover:brightness-110"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </button>
  );
}

/* ---- triple-circle cluster ---- */

function TripleCircleVideo() {
  return (
    <div className="relative flex items-center justify-center">
      <CircleLayer src={LEFT_VIDEO}  extra="z-10" />
      <CircleLayer src={FRONT_VIDEO} extra="-ml-24 z-20 ring-4 ring-white/70 shadow-2xl" />
      <CircleLayer src={RIGHT_VIDEO} extra="-ml-24 z-10" />
    </div>
  );
}

function CircleLayer({ src, extra = "" }: { src: string; extra?: string }) {
  return (
    <div className={`relative ${extra} w-[45vw] max-w-[18rem] aspect-square rounded-full overflow-hidden`}>
      <video
        src={src}
        muted
        playsInline
        preload="auto"
        autoPlay
        loop
        className="w-full h-full object-cover"
      />
    </div>
  );
}

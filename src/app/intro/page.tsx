'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Lottie from '@/lib/dynamicLottie';
import sparkleAnimation from '@/animations/sparkle.json';

export default function Page() {
  const router = useRouter();
  const [showTimeline, setShowTimeline] = useState(false);

  /* ⏳— optional fail-safe: auto-reveal intro after 4 s — */
  useEffect(() => {
    if (!showTimeline) {
      const t = setTimeout(() => setShowTimeline(true), 4000);
      return () => clearTimeout(t);
    }
  }, [showTimeline]);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-yellow-50 via-pink-50 to-white">
      {/* ✨ Sparkles + wandering blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Lottie animationData={sparkleAnimation} loop className="absolute inset-0" />

        {/* drifting blobs */}
        {[
          { className: 'top-[-6rem] left-[-6rem] w-[28rem] h-[28rem] bg-amber-100' },
          { className: 'top-10 right-12 w-[18rem] h-[18rem] bg-amber-200 blur-3xl' },
          { className: 'bottom-[-3rem] right-[-6rem] w-[22rem] h-[10rem] bg-amber-300 rotate-12' },
          { className: 'bottom-32 left-6 w-24 h-24 bg-amber-200' }
        ].map(({ className }, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full mix-blend-multiply opacity-60 ${className}`}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* 🎬 Logo splash */}
      <AnimatePresence>
        {!showTimeline && (
          <motion.div
            key="splash"
            className="absolute inset-0 flex items-center justify-center bg-white z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            onAnimationComplete={() => setShowTimeline(true)}
          >
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/logo.png"
                alt="Temzie Bites Logo"
                width={420}
                height={420}
                className="pointer-events-none select-none drop-shadow-xl"
                priority
              />
              {/* subtle glow */}
              <span className="absolute inset-0 rounded-full blur-3xl bg-yellow-300/40" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📖 Main intro */}
      {showTimeline && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-12"
        >
          {/* sticky logo top-left */}
          <button
            onClick={() => router.push('/')}
            className="absolute top-6 left-6 flex items-center z-30 group"
          >
            <Image src="/images/logo.png" alt="logo" width={48} height={48} />
            <span className="ml-2 text-2xl font-bold group-hover:tracking-wider transition-all">
              Temzie Bites
            </span>
          </button>

          {/* ▶️ left panel */}
          <div className="md:w-1/2 w-full max-w-lg text-center md:text-left space-y-6">
            <motion.h1
              className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              The Story Began
            </motion.h1>
            <motion.p
              className="text-lg text-gray-700/90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              The creative spark that ignited Temzie Bites, turning ideas into delicious reality.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={() => router.push('/timeline')}
                className="relative overflow-hidden rounded-full px-8 py-3 font-medium text-white bg-gradient-to-r from-teal-500 to-green-600 shadow-lg hover:brightness-110 focus:outline-none"
              >
                <span className="relative z-10">View Timeline</span>
                {/* animated shine */}
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </button>

              <button
                onClick={() => router.push('/home')}
                className="px-8 py-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shadow"
              >
                Skip
              </button>
            </motion.div>
          </div>

          {/* 🍿 right panel: neon video card */}
          <motion.div
            className="md:w-1/2 w-full flex justify-center items-center relative"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden">
              {/* halo pulse */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-500 via-fuchsia-600 to-amber-400 blur-2xl"
                animate={{ opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
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
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

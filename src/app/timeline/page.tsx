'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Lottie from '@/lib/dynamicLottie';
import Image from 'next/image';
import Link from 'next/link';
import sparkleAnimation from '@/animations/sparkle.json';

/* ———————————————  DATA  ——————————————— */
type Milestone = {
  year: string;
  title: string;
  description: string;
  media: string;
  isVideo: boolean;
  position: 'top' | 'bottom';
};

const timelineData: Milestone[] = [
  { year: 'July 2016', title: 'Temzie Bites is Born',       description: 'Armed with a Huawei P9…',               media: '/images/Original Logo.png',             isVideo: false, position: 'top' },
  { year: 'Aug 2016',  title: 'First WordPress Post',       description: 'Clicked “Publish”…',                    media: '/images/tikkachicken.jpg',              isVideo: false, position: 'bottom' },
  { year: 'Mar 2017',  title: 'First Video',                description: 'Lights, camera…',                       media: '/videos/millet-nshima.mp4',             isVideo: true,  position: 'top' },
  { year: 'Mar 2017',  title: 'New Logo, New Temzie',       description: 'Fresh look, fresh vibe…',               media: '/images/Logo2.png',                     isVideo: false, position: 'bottom' },
  { year: 'Apr 2017',  title: 'New Camera',                 description: 'Say hello to HD…',                      media: '/videos/Chibwawa Recipe.mp4',           isVideo: true,  position: 'top' },
  { year: 'May 2018',  title: 'Foodies TV Show',            description: 'From the kitchen…',                     media: '/videos/Foodies Episode 1 Promo.mp4',   isVideo: true,  position: 'bottom' },
  { year: 'Oct 2019',  title: 'Delele Video Hits 100 k!',   description: 'Who knew slimy…',                       media: '/images/delele.jpg',                    isVideo: false, position: 'top' },
  { year: 'May 2021',  title: 'Pop-Up Experience',          description: 'Turning dreams…',                       media: '/images/popup.jpg',                     isVideo: false, position: 'bottom' },
];

/* ———————————————  TIMELINE MILESTONE  ——————————————— */
function TimelineMilestone({
  year,
  title,
  description,
  media,
  isVideo = false,
  position,
}: Milestone) {
  const Bubble = (
    <motion.div
      className="w-44 h-44 rounded-full overflow-hidden border-4 border-transparent bg-white shadow-2xl"
      style={{
        backgroundImage:
          'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
      }}
      initial={{ scale: 0.8, opacity: 0.5 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      {isVideo ? (
        <video
          src={media}
          muted
          autoPlay
          loop
          playsInline
          className="object-cover w-full h-full rounded-full"
        />
      ) : (
        <Image
          src={media}
          alt={title}
          width={176}
          height={176}
          className="object-cover w-full h-full rounded-full"
        />
      )}
    </motion.div>
  );

  const Text = (
    <motion.div
      className="bg-white/90 backdrop-blur-sm px-5 py-4 rounded-xl shadow-lg text-center max-w-[13rem]"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h3 className="text-xl font-extrabold text-gradient">{year}</h3>
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="text-xs mt-1 text-gray-600">{description}</p>
    </motion.div>
  );

  const Connector = (
    <motion.div
      className="w-px h-16 bg-gradient-to-b from-pink-400 via-purple-500 to-indigo-500"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    />
  );

  return (
    <div className="relative flex flex-col items-center w-64">
      {/* faint horizontal line behind */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-amber-300 via-fuchsia-400 to-pink-400 opacity-30 -z-10" />
      {position === 'top' ? (
        <>
          {Text}
          {Connector}
          {Bubble}
        </>
      ) : (
        <>
          {Bubble}
          {Connector}
          {Text}
        </>
      )}
    </div>
  );
}

/* ———————————————  TIMELINE STRIP  ——————————————— */
function TimelineStrip() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* shimmer line */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 via-amber-400 to-pink-500 opacity-40"
        style={{ translateY: '-50%' }}
        animate={{ opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* auto-scroll belt */}
      <motion.div
        className="relative z-10 flex items-center space-x-24"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{
          delay: 4,
          duration: 60,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {/* first pass */}
        {timelineData.map((m, i) => (
          <TimelineMilestone key={i} {...m} />
        ))}

        {/* call-to-action */}
        <div className="flex flex-col items-center justify-center">
          <Link href="/">
            <button className="relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 shadow-xl">
              <span className="relative z-10">🚀 Journey Continues…</span>
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </button>
          </Link>
        </div>

        {/* second pass for endless loop */}
        {timelineData.map((m, i) => (
          <TimelineMilestone key={`dup-${i}`} {...m} />
        ))}
      </motion.div>

      {/* credit */}
      <p className="absolute bottom-3 right-4 text-xs text-gray-400 select-none">
        Illustrations by Storyset
      </p>
    </section>
  );
}

/* ———————————————  PAGE  ——————————————— */
export default function TimelinePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center bg-gradient-to-br from-yellow-50 via-pink-50 to-white">
      {/* sparkles */}
      <Lottie
        animationData={sparkleAnimation}
        loop
        className="absolute inset-0 pointer-events-none"
      />

      {/* drifting blobs */}
      {[
        'top-[-5rem] left-[-6rem] w-[22rem] h-[22rem] bg-amber-100',
        'top-8 right-12 w-[16rem] h-[16rem] bg-amber-200 blur-3xl',
        'bottom-[-4rem] right-[-6rem] w-[24rem] h-[12rem] bg-amber-300 rotate-12',
        'bottom-24 left-6 w-24 h-24 bg-amber-200',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full mix-blend-multiply opacity-50 ${cls}`}
          initial={{ scale: 0.9, opacity: 0.4 }}
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* content column */}
      <main className="relative z-10 flex flex-col items-center w-full gap-12 py-16">
        {/* heading */}
        <motion.h1
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-amber-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          The&nbsp;Temzie&nbsp;Bites&nbsp;Timeline
        </motion.h1>

        {/* timeline strip */}
        <TimelineStrip />

        {/* back button */}
        <motion.button
          onClick={() => router.push('/')}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 text-white shadow-xl text-sm font-semibold"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          Back&nbsp;to&nbsp;Intro
        </motion.button>
      </main>
    </div>
  );
}

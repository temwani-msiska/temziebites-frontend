'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TimelineMilestone from './TimelineMilestone';

type Milestone = {
  year: string;
  title: string;
  description: string;
  media: string;
  isVideo: boolean;
  position: 'top' | 'bottom';
};

/* ——— data unchanged ——— */
const timelineData: Milestone[] = [
  { year: 'July 2016', title: 'Temzie Bites is Born',      description: 'Armed with a Huawei P9…',               media: '/images/Original Logo.png',               isVideo: false, position: 'top'    },
  { year: 'Aug 2016',  title: 'First WordPress Post',      description: 'Clicked “Publish”…',                    media: '/images/tikkachicken.jpg',                isVideo: false, position: 'bottom' },
  { year: 'Mar 2017',  title: 'First Video',               description: 'Lights, camera…',                       media: '/videos/millet-nshima.mp4',               isVideo: true,  position: 'top'    },
  { year: 'Mar 2017',  title: 'New Logo, New Temzie',      description: 'Fresh look, fresh vibe…',               media: '/images/Logo2.png',                       isVideo: false, position: 'bottom' },
  { year: 'Apr 2017',  title: 'New Camera',                description: 'Say hello to HD…',                      media: '/videos/Chibwawa Recipe.mp4',             isVideo: true,  position: 'top'    },
  { year: 'May 2018',  title: 'Foodies TV Show',           description: 'From the kitchen…',                     media: '/videos/Foodies Episode 1 Promo.mp4',     isVideo: true,  position: 'bottom' },
  { year: 'Oct 2019',  title: 'Delele Video Hits 100 k!',  description: 'Who knew slimy…',                       media: '/images/delele.jpg',                      isVideo: false, position: 'top'    },
  { year: 'May 2021',  title: 'Pop-Up Experience',         description: 'Turning dreams…',                       media: '/images/popup.jpg',                       isVideo: false, position: 'bottom' },
];

export default function Timeline() {
  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24 bg-gradient-to-br from-yellow-50 via-pink-50 to-white">
      {/* shimmer line */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[1px] sm:h-[2px] bg-gradient-to-r from-fuchsia-500 via-amber-400 to-pink-500 opacity-40"
        style={{ translateY: '-50%' }}
        animate={{ opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* auto-scroll belt */}
      <motion.div
        className="relative z-10 flex items-center space-x-[8vw] sm:space-x-24"
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

        {/* CTA button */}
        <div className="flex flex-col items-center justify-center">
          <Link href="/">
            <button className="relative overflow-hidden rounded-full px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 shadow-xl">
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

        {/* second pass – endless loop */}
        {timelineData.map((m, i) => (
          <TimelineMilestone key={`dup-${i}`} {...m} />
        ))}
      </motion.div>

      {/* credit */}
      <p className="absolute bottom-2 right-3 text-[10px] sm:text-xs text-gray-400 select-none">
        Illustrations by Storyset
      </p>
    </section>
  );
}

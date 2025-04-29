'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Lottie from '@/lib/dynamicLottie';          // ssr:false wrapper
import Image from 'next/image';
import Link from 'next/link';
import sparkleAnimation from '@/animations/sparkle.json';

/*————————————————————  DATA  ————————————————————*/
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

/*—————————————————  SINGLE MILESTONE  —————————————————*/
function TimelineMilestone({ year, title, description, media, isVideo, position }: Milestone) {
  const Bubble = (
    <motion.div
      className="md:w-44 md:h-44 w-36 h-36 rounded-full overflow-hidden border-4 border-transparent bg-white shadow-2xl"
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
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={media}
          alt={title}
          width={176}
          height={176}
          className="w-full h-full object-cover"
        />
      )}
    </motion.div>
  );

  const Text = (
    <motion.div
      className="bg-white/90 backdrop-blur-sm px-5 py-4 rounded-xl shadow-lg text-center max-w-[15rem]"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h3 className="text-xl font-extrabold">{year}</h3>
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="text-xs mt-1 text-gray-700">{description}</p>
    </motion.div>
  );

  const Connector = (
    <motion.div
      className="w-px h-16 bg-gradient-to-b from-red-600 via-yellow-500 to-green-600"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    />
  );

  return (
    <div className="relative flex flex-col items-center md:w-64 w-full">
      {/* centre guide-line only on desktop */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 opacity-30 -z-10" />
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

/*—————————————————  DESKTOP STRIP  —————————————————*/
function TimelineStripDesktop() {
  return (
    <section className="hidden md:block relative w-full overflow-hidden py-24">
      {/* moving centre line */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 opacity-40"
        style={{ translateY: '-50%' }}
        animate={{ opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* infinite scroll strip */}
      <motion.div
        className="relative z-10 flex items-center space-x-24"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ delay: 4, duration: 60, ease: 'linear', repeat: Infinity }}
      >
        {timelineData.map((m, i) => (
          <TimelineMilestone key={i} {...m} />
        ))}

        {/* CTA — first loop */}
        <CTAButton />

        {/* repeat again for seamless loop */}
        {timelineData.map((m, i) => (
          <TimelineMilestone key={`dup-${i}`} {...m} />
        ))}
      </motion.div>
    </section>
  );
}

/*—————————————————  MOBILE STACK  —————————————————*/
function TimelineStackMobile() {
  return (
    <section className="md:hidden w-full flex flex-col items-center gap-20 py-16 px-4">
      {timelineData.map((m, i) => (
        <TimelineMilestone key={i} {...m} position="top" />
      ))}
      <CTAButton />
    </section>
  );
}

/*—————————————————  CTA SHARED  —————————————————*/
function CTAButton() {
  return (
    <Link href="/" className="flex flex-col items-center">
      <motion.button
        className="relative overflow-hidden rounded-full px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 shadow-xl"
        whileHover={{ scale: 1.05 }}
      >
        <span className="relative z-10">🚀 Journey&nbsp;Continues…</span>
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.button>
    </Link>
  );
}

/*—————————————————  PAGE  —————————————————*/
export default function TimelinePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      {/* sparkle layer */}
      <Lottie
        animationData={sparkleAnimation}
        loop
        className="absolute inset-0 pointer-events-none"
      />

      {/* floating blobs */}
      {[
        'top-[-5rem] left-[-6rem] w-[22rem] h-[22rem] bg-green-100',
        'top-8 right-12 w-[16rem] h-[16rem] bg-yellow-200 blur-3xl',
        'bottom-[-4rem] right-[-6rem] w-[24rem] h-[12rem] bg-red-200 rotate-12',
        'bottom-24 left-6 w-24 h-24 bg-yellow-300',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full mix-blend-multiply opacity-50 ${cls}`}
          initial={{ scale: 0.9, opacity: 0.4 }}
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* brand badge */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-5 left-5 group flex items-center gap-3 pl-3 pr-5 py-2 rounded-full bg-white/90 shadow-lg border-4 border-transparent hover:shadow-2xl transition-all"
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
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <span className="text-lg font-extrabold bg-gradient-to-r from-green-700 via-yellow-600 to-red-600 bg-clip-text text-transparent group-hover:tracking-wide transition-all">
          Temzie&nbsp;Bites
        </span>
      </button>

      {/* header */}
      <main className="relative z-10 flex flex-col items-center w-full gap-8 pt-28 pb-16">
        <motion.h1
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-700 via-yellow-600 to-red-600 bg-clip-text text-transparent px-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          The&nbsp;Temzie&nbsp;Bites&nbsp;Timeline
        </motion.h1>
        <motion.p
          className="max-w-2xl text-center text-base sm:text-lg text-gray-800/90 px-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          An&nbsp;<strong>African food blog</strong>&nbsp;celebrating bold flavours, vibrant
          stories, and the timeless joy of sharing a meal together.
        </motion.p>

        {/* desktop vs mobile views */}
        <TimelineStripDesktop />
        <TimelineStackMobile />

        {/* back button */}
        <motion.button
          onClick={() => router.push('/')}
          className="mt-4 px-9 py-3 rounded-full bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white shadow-xl text-sm font-semibold"
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

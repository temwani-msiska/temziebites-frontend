'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  year: string;
  title: string;
  description: string;
  media: string;
  isVideo?: boolean;
  position: 'top' | 'bottom';
}

export default function TimelineMilestone({
  year,
  title,
  description,
  media,
  isVideo = false,
  position,
}: Props) {
  /* 🟣 media bubble */
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

  /* ✍️ text */
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

  /* 🌈 connector */
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
      {/* backdrop line behind everything */}
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

'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  /* —— quick data objects so we can map safely —— */
  const heroButtons = [
    {
      label: 'Explore Timeline',
      gradient: true,
      action: () => router.push('/timeline'),
    },
    {
      label: 'Watch on YouTube',
      gradient: false,
      href: 'https://www.youtube.com/@TemzieBites',
    },
  ];

  const facts: { icon: string; text: string }[] = [
    { icon: '🍳', text: 'Launched in 2016 as a humble Facebook photo diary.' },
    { icon: '🎥', text: '5 k+ YouTube fans devour step-by-step recipe videos.' },
    { icon: '📺', text: '2018: “Foodies TV” took Temzie’s kitchen nation-wide.' },
    { icon: '🌍', text: 'Champion for authentic Zambian dishes—delele, millet nshima & more.' },
  ];

  const stats: { num: string; label: string }[] = [
    { num: '9 yrs', label: 'Creating' },
    { num: '21+', label: 'YouTube videos' },
    { num: '100 K', label: 'Top-view video' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-yellow-100 via-rose-100 to-red-200 text-gray-900 overflow-x-hidden">
      {/* ——— HERO ——— */}
      <header className="relative w-full flex flex-col items-center py-32 px-6 text-center">
        {/* subtle floating blob */}
        <motion.div
          className="absolute top-[-6rem] left-[-8rem] w-[28rem] h-[28rem] bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-40"
          animate={{ scale: [1, 1.1, 1], rotate: 30 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.h1
          className="z-10 text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-md"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Temzie&nbsp;Bites
        </motion.h1>

        <motion.p
          className="z-10 mt-4 max-w-2xl text-lg sm:text-xl font-medium"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Zambian flavours, <em>fearless</em> creativity, and a pinch of
          wanderlust—served since&nbsp;2016.
        </motion.p>

        {/* call-to-action buttons */}
        <motion.div
          className="z-10 mt-10 flex gap-6 flex-wrap justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {heroButtons.map((btn) =>
            btn.gradient ? (
              <button
                key={btn.label}
                onClick={btn.action}
                className="px-8 py-3 rounded-full font-semibold text-white shadow-xl bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 hover:opacity-90"
              >
                {btn.label}
              </button>
            ) : (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 rounded-full font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                {btn.label}
              </a>
            )
          )}
        </motion.div>
      </header>

      {/* ——— ABOUT ——— */}
      <section className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-12 py-20 px-6">
        {/* portrait / logo */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/images/Logo.png"
            alt="Temzie Bites logo"
            width={260}
            height={260}
            className="rounded-full border-4 border-white shadow-xl"
          />
        </motion.div>

        {/* copy */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center gap-6"
        >
          <h2 className="text-3xl font-extrabold">
            From humble kitchen&nbsp;→ TV screens
          </h2>

          <ul className="space-y-3 text-lg leading-relaxed">
            {facts.map(({ icon, text }) => (
              <li key={text}>
                {icon} {text}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ——— STATS STRIP ——— */}
      <section className="w-full bg-white py-12">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 px-6 text-center">
          {stats.map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-4xl font-extrabold text-red-600">{num}</span>
              <span className="mt-1">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer className="w-full py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Temzie Bites · Crafted&nbsp;with&nbsp;🍰
      </footer>
    </div>
  );
}

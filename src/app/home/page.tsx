'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic'; // ✨ dynamic import
import { useEffect, useState } from 'react';

/* ---- quick config ---- */

const cards = [
  {
    title: 'Recipes',
    text: 'Browse Temzie’s greatest hits – the dishes that started it all.',
    lottie: '/animations/recipes.json',
    href: '/recipes',
    gradient: 'from-red-500 via-amber-400 to-lime-500',
  },
  {
    title: 'Where to Eat',
    text: 'Hand-picked spots around Zambia (and beyond) that wowed Temzie.',
    lottie: '/animations/map-marker.json',
    href: '/where-to-eat',
    gradient: 'from-emerald-500 via-teal-400 to-sky-500',
  },
  {
    title: 'Cooking Tips',
    text: 'Tiny hacks • big flavour. Level-up your kitchen game in minutes.',
    lottie: '/animations/tips.json',
    href: '/tips',
    gradient: 'from-fuchsia-500 via-pink-400 to-rose-500',
  },
] as const;

/* ---- lazy load lottie-react with SSR disabled ---- */

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

/* ---- helper component for safe lottie ---- */

function SafeLottie({ src }: { src: string }) {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    import(`@/animations/${src.split('/').pop()}`)
      .then((mod) => setAnimationData(mod.default))
      .catch((err) => console.error('Failed to load Lottie:', err));
  }, [src]);

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop className="h-32 w-32" />;
}

/* ---- main page ---- */

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-yellow-50 via-rose-100 to-red-200 text-gray-900 antialiased overflow-x-hidden">
      {/* -------- HERO -------- */}
      <header className="w-full flex flex-col items-center text-center pt-32 pb-20 px-6 relative">
        {/* floating blob background */}
        <motion.div
          className="absolute -top-32 -left-40 w-[30rem] h-[30rem] rounded-full bg-pink-300 mix-blend-multiply blur-3xl opacity-30"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity }}
        />

        <motion.h1
          className="z-10 text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Temzie Bites
        </motion.h1>

        <motion.p
          className="z-10 mt-5 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          Authentic Zambian flavours, fearless creativity,
          <br className="hidden sm:block" />
          and a pinch of wanderlust — since 2016.
        </motion.p>
      </header>

      {/* -------- FEATURE CARDS -------- */}
      <section className="w-full max-w-6xl grid gap-10 px-8 pb-24 md:grid-cols-3">
        {cards.map(({ title, text, lottie, href, gradient }) => (
          <motion.article
            key={title}
            whileHover={{ y: -6, rotate: -1 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className={`cursor-pointer rounded-3xl shadow-xl bg-gradient-to-br ${gradient} p-[1px]`}
            onClick={() => router.push(href)}
          >
            <div className="h-full flex flex-col bg-white rounded-3xl p-6">
              <div className="h-40 flex items-center justify-center">
                <SafeLottie src={lottie} />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-800">{title}</h3>
              <p className="mt-2 text-gray-600 flex-grow">{text}</p>
              <span className="mt-4 inline-block font-semibold text-red-600">
                Explore →
              </span>
            </div>
          </motion.article>
        ))}
      </section>

      {/* -------- FOOTER -------- */}
      <footer className="w-full py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Temzie Bites · Crafted with 🍰
      </footer>
    </main>
  );
}

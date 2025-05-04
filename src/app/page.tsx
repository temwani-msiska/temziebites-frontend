"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();

  return (
    <main className="bg-[#fdf4e8] text-[#2e2e2e] font-sans overflow-x-hidden relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 shadow-md border-b border-gray-300 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-extrabold text-[#472800]">
            Temzie Bites
          </div>
          <div className="hidden md:flex gap-6 text-sm font-semibold">
            <a href="#hero" className="hover:text-[#d94f04]">
              Home
            </a>
            <a href="#recipes" className="hover:text-[#d94f04]">
              Recipes
            </a>
            <a href="#eat" className="hover:text-[#d94f04]">
              Where to Eat
            </a>
          </div>
          <button className="px-5 py-2 border border-[#f9b233] text-[#5d3a00] rounded-full hover:bg-[#f9b233] hover:text-white transition text-sm font-semibold">
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen w-full flex items-center justify-center px-6 lg:px-20 bg-[#fdf4e8] overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/background.png"
            alt="Decorative background"
            fill
            className="object-cover object-left"
            priority
          />
        </div>

        {/* Lady Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/images/Lady.png"
            alt="Illustrated Lady"
            fill
            className="object-contain object-right-bottom md:object-right lg:object-right-bottom"
            priority
          />
        </div>

        {/* Text Block */}
        <div className="relative z-20 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="space-y-6 text-center md:text-left bg-[#fff9eb]/90 p-6 md:p-0 rounded-lg">
            <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight text-[#3a1f0a] leading-tight drop-shadow-sm">
              Zambia on a Plate
            </h1>
            <p className="text-lg leading-relaxed text-[#4a3d34] max-w-xl">
              Not just recipes — rituals. Not just meals — movements. Temzie
              Bites is a curated journey through Zambia’s culinary soul —
              plated, filmed, and reimagined.
            </p>
            <button
              onClick={() => router.push("/timeline")}
              className="px-6 py-3 bg-[#d94f04] text-white rounded-full font-bold shadow-md hover:bg-[#a23300] transition"
            >
              Start the Journey
            </button>
          </div>
        </div>
      </section>

      {/* Signature Recipes & Where to Eat */}
      <section
        id="recipes"
        className="relative px-6 lg:px-20 py-10 overflow-hidden z-10 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/images/Background.png')" }}
      >
        {/* Decorative gradient base */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-[#fdd9a0] to-[#f8b35b] rounded-t-[50%] z-0" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start relative z-10">
          {/* Signature Recipes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#fdcf81]/95 rounded-[30px] shadow-lg px-8 py-8 text-[#2e2e2e] border border-[#f9e4b8] w-full max-w-sm mx-auto flex flex-col justify-between min-h-[540px]"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4 text-[#5d3a00]">
                Signature Recipes
              </h2>
              <p className="text-[#3f2e21] leading-relaxed mb-6 text-base">
                Heritage dishes, unexpected fusion bliss, and ancestral
                indulgence.
              </p>
              <button
                onClick={() => router.push("/recipes")}
                className="bg-[#f4a300] text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-[#e78f00] transition"
              >
                Explore More
              </button>
            </div>
            <div className="mt-6 flex justify-center">
              <Image
                src="/images/ChikandaTransparent.png"
                alt="Chikanda Dish"
                width={260}
                height={260}
                className="drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* Where to Eat */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative w-full max-w-3xl mx-auto py-16 px-8 text-[#2e2e2e] z-10"
          >
            {/* Foreground Content */}
            <div className="relative z-10 text-center sm:text-left max-w-2xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-[#5d3a00]">
                Where to Eat
              </h2>
              <p className="text-[#3f2e21] leading-relaxed mb-6 text-lg">
                A curated list of Zambia’s hidden gems, iconic eateries, and
                food shacks that stay in your memory (and your stomach).
              </p>
              <button
                onClick={() => router.push("/where-to-eat")}
                className="bg-[#d94f04] text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-[#a23300] transition"
              >
                View Map
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fff9eb] border-t border-gray-200 py-6 text-center text-sm text-[#5d3a00]">
        © {new Date().getFullYear()} Temzie Bites · Crafted with ❤️ in Zambia
      </footer>
    </main>
  );
}

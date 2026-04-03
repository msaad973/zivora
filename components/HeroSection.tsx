"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { tw } from "@/lib/tokens";

export default function HeroSection() {
  return (
    <section className={`relative h-screen w-full overflow-hidden ${tw.bgBlack}`}>
      {/* Background — video with image fallback */}
      <Image
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format"
        alt="Hero background"
        fill
        priority
        className="object-cover opacity-50"
        sizes="100vw"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`${tw.textGoldLight} text-xs tracking-[0.4em] uppercase mb-6 font-light`}
        >
          New Collection 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight mb-6"
        >
          Timeless
          <br />
          <span className="italic gold-text">Elegance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/60 text-sm md:text-base tracking-widest max-w-md mb-10 font-light"
        >
          Luxury Pakistani fashion crafted for the modern woman
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Button href="/shop" variant="primary" size="lg" className="hover:scale-105">
            Shop Now
          </Button>
          <Button href="/about" variant="ghost" size="lg">
            Our Story
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`w-px h-10 bg-gradient-to-b from-[#b8960c] to-transparent`}
        />
      </motion.div>
    </section>
  );
}

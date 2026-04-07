"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0a0a0a]">

      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Fallback image */}
      <Image
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format"
        alt=""
        fill
        priority
        className="object-cover -z-10"
        sizes="100vw"
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 z-10" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 md:px-12"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="text-[#d4af37] text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-light mb-6"
        >
          New Collection &nbsp;·&nbsp; 2026
        </motion.p>

        {/* Brand name */}
        <motion.h1
          variants={fadeUp}
          className="font-playfair text-[72px] md:text-[110px] lg:text-[140px] text-white font-light leading-none tracking-[0.12em] mb-5"
        >
          ZIVORA
        </motion.h1>

        {/* Gold divider */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-7">
          <span className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-playfair italic text-white/65 text-lg md:text-2xl lg:text-3xl tracking-widest mb-12 font-light"
        >
          Wear Your Grace
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 bg-[#b8960c] hover:bg-[#d4af37] text-black text-[11px] tracking-[0.3em] uppercase font-semibold px-10 py-4 transition-all duration-300 shadow-[0_0_30px_rgba(184,150,12,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)]"
            >
              Shop Now
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-[#d4af37] text-white/75 hover:text-[#d4af37] text-[11px] tracking-[0.3em] uppercase font-light px-10 py-4 transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#d4af37] to-transparent"
        />
      </motion.div>
    </section>
  );
}

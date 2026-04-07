"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./ui/Button";

export default function FeaturedBanner() {
  return (
    <section className="relative h-[55vh] md:h-[65vh] overflow-hidden bg-[#0a0a0a]">
      <Image
        src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1920"
        alt="Featured Collection"
        fill
        className="object-cover opacity-35"
        sizes="100vw"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#d4af37] text-[10px] tracking-[0.45em] uppercase mb-5"
        >
          Exclusive
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-light mb-8 leading-tight"
        >
          Luxury Bridal
          <br />
          <span className="italic gold-text">Collection 2026</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button href="/shop?category=Bridal" variant="outline" size="lg">
            Explore Collection
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

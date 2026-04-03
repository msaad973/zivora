"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./ui/Button";
import { tw } from "@/lib/tokens";

export default function FeaturedBanner() {
  return (
    <section className={`relative h-[60vh] overflow-hidden ${tw.bgBlack} my-10`}>
      <Image
        src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1920"
        alt="Featured Collection"
        fill
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${tw.textGoldLight} text-xs tracking-[0.4em] uppercase mb-4`}
        >
          Exclusive
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-playfair text-4xl md:text-6xl text-white font-light mb-6"
        >
          Luxury Bridal
          <br />
          <span className="italic gold-text">Collection 2026</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button href="/shop?category=Bridal" variant="outline" size="lg">
            Explore Collection
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

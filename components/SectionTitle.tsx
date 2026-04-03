"use client";
import { motion } from "framer-motion";
import { tw } from "@/lib/tokens";

export default function SectionTitle({ subtitle, title }: { subtitle?: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      {subtitle && (
        <p className={`${tw.textGold} text-xs tracking-[0.4em] uppercase mb-3 font-light`}>
          {subtitle}
        </p>
      )}
      <h2 className={`font-playfair text-3xl md:text-4xl text-[#0a0a0a] font-light`}>{title}</h2>
      <div className="flex items-center justify-center gap-3 mt-4">
        <div className={tw.dividerLine} />
        <div className={tw.dividerDot} />
        <div className={tw.dividerLine} />
      </div>
    </motion.div>
  );
}

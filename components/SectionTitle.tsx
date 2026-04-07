"use client";
import { motion } from "framer-motion";

export default function SectionTitle({
  subtitle,
  title,
  light = false,
}: {
  subtitle?: string;
  title: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14 md:mb-16"
    >
      {subtitle && (
        <p className="text-[#b8960c] text-[10px] tracking-[0.45em] uppercase mb-3 font-light">
          {subtitle}
        </p>
      )}
      <h2
        className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-light ${
          light ? "text-white" : "text-[#0a0a0a]"
        }`}
      >
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="h-px w-16 bg-[#b8960c]/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#b8960c]" />
        <div className="h-px w-16 bg-[#b8960c]/40" />
      </div>
    </motion.div>
  );
}

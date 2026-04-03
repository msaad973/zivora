"use client";
import { useState } from "react";
import Image from "next/image";
import { tw } from "@/lib/tokens";

interface Props {
  src?: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

/** Renders a Next.js Image with a styled CSS fallback if src is missing or fails to load. */
export default function ProductImage({ src, alt, fill = true, className = "", sizes }: Props) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center ${tw.bgBeige} ${className}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20 mb-2">
          <rect width="48" height="48" rx="4" fill="#b8960c" />
          <path d="M12 36l8-10 6 7 4-5 6 8H12z" fill="white" />
          <circle cx="32" cy="18" r="4" fill="white" />
        </svg>
        <span className="text-[10px] tracking-widest uppercase text-[#b8960c]/40 font-light">Zivora</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes || "(max-width: 768px) 50vw, 25vw"}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}

"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Badge from "./ui/Badge";
import ProductImage from "./ui/ProductImage";
import { cn } from "@/lib/utils";

interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f0e8]">
        <Link href={`/product/${product._id}`} aria-label={product.title}>
          <ProductImage src={product.images[0]} alt={product.title} />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-[#0a0a0a] text-[10px] tracking-[0.2em] uppercase font-medium px-5 py-2.5 flex items-center gap-2">
              <Eye size={13} />
              View
            </span>
          </div>
        </Link>
        <Badge className="absolute top-3 left-3">{product.category}</Badge>
      </div>

      {/* Info */}
      <div className="p-4 md:p-5">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-playfair text-[15px] text-[#0a0a0a] hover:text-[#b8960c] transition-colors line-clamp-1 mb-1.5">
            {product.title}
          </h3>
        </Link>
        <p className="text-[#b8960c] font-semibold text-sm tracking-wide">
          Rs {product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}

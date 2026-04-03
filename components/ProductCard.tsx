"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "./ui/Badge";
import ProductImage from "./ui/ProductImage";
import { tw } from "@/lib/tokens";

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
      className={`group relative ${tw.card}`}
    >
      <div className={`relative aspect-[3/4] overflow-hidden ${tw.bgBeige}`}>
        <Link href={`/product/${product._id}`}>
          <ProductImage src={product.images[0]} alt={product.title} />
        </Link>
        <Badge className="absolute top-3 left-3">{product.category}</Badge>
      </div>

      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-playfair text-base text-[#0a0a0a] hover:text-[#b8960c] transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <p className={`${tw.textGold} font-semibold mt-1 text-sm tracking-wide`}>
          Rs {product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}

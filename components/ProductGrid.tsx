"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface Props {
  type?: string;
  category?: string;
  limit?: number;
}

export default function ProductGrid({ type, category, limit }: Props) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (category) params.set("category", category);
    axios.get(`/api/products?${params}`).then((r) => {
      setProducts(limit ? r.data.slice(0, limit) : r.data);
      setLoading(false);
    });
  }, [type, category, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {Array.from({ length: limit || 4 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-[#f5f0e8] animate-pulse rounded-sm" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-24 text-gray-400">
        <p className="font-playfair text-xl">No products found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
    >
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </motion.div>
  );
}

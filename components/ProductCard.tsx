"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiEye, FiShoppingBag } from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import QuickViewModal from "./QuickViewModal";
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
  const [hovered, setHovered] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleQuickAdd = () => {
    addItem({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0] || "",
      size: "M",
      quantity: 1,
    });
    toast.success("Added to cart");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`group relative ${tw.card}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className={`relative aspect-[3/4] overflow-hidden ${tw.bgBeige}`}>
          <Link href={`/product/${product._id}`}>
            <ProductImage
              src={product.images[0]}
              alt={product.title}
              className={`transition-all duration-700 ${hovered && product.images[1] ? "opacity-0" : "opacity-100"}`}
            />
            {product.images[1] && (
              <ProductImage
                src={product.images[1]}
                alt={product.title}
                className={`absolute inset-0 transition-all duration-700 ${hovered ? "opacity-100" : "opacity-0"}`}
              />
            )}
          </Link>

          {/* Overlay actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/20 flex items-end justify-center pb-4 gap-3"
          >
            <button
              onClick={() => setQuickView(true)}
              className={`${tw.btnSecondary} ${tw.btnSm} bg-white text-black hover:bg-[#b8960c] hover:text-white flex items-center gap-2`}
            >
              <FiEye size={14} /> Quick View
            </button>
            <button
              onClick={handleQuickAdd}
              className={`${tw.btnPrimary} ${tw.btnSm} flex items-center gap-2`}
            >
              <FiShoppingBag size={14} /> Add
            </button>
          </motion.div>

          {/* Category badge */}
          <Badge className="absolute top-3 left-3">{product.category}</Badge>
        </div>

        {/* Info */}
        <div className="p-4">
          <Link href={`/product/${product._id}`}>
            <h3 className={`font-playfair text-base text-[#0a0a0a] hover:text-[#b8960c] transition-colors line-clamp-1`}>
              {product.title}
            </h3>
          </Link>
          <p className={`${tw.textGold} font-semibold mt-1 text-sm tracking-wide`}>
            PKR {product.price.toLocaleString()}
          </p>
        </div>
      </motion.div>

      {quickView && <QuickViewModal product={product} onClose={() => setQuickView(false)} />}
    </>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingBag } from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import Link from "next/link";
import Button from "./ui/Button";
import ProductImage from "./ui/ProductImage";
import { tw } from "@/lib/tokens";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
}

export default function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [size, setSize] = useState("M");
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({ productId: product._id, title: product.title, price: product.price, image: product.images[0] || "", size, quantity: 1 });
    toast.success("Added to cart");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white max-w-2xl w-full rounded-sm overflow-hidden flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className={`relative w-full md:w-1/2 aspect-[3/4] ${tw.bgBeige}`}>
            <ProductImage src={product.images[0]} alt={product.title} />
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-center flex-1">
            <button onClick={onClose} className="self-end text-gray-400 hover:text-black mb-4 transition-colors">
              <FiX size={20} />
            </button>

            <span className={`text-xs tracking-widest ${tw.textGold} uppercase mb-2`}>
              {product.category}
            </span>
            <h2 className="font-playfair text-2xl mb-3">{product.title}</h2>
            <p className={`${tw.textGold} text-xl font-semibold mb-6`}>
              Rs {product.price.toLocaleString()}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <p className={`text-xs tracking-widest uppercase text-gray-500 mb-3`}>
                Size: <span className={tw.textGold}>{size}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-10 h-10 text-xs border transition-all ${
                      size === s
                        ? `${tw.borderGold} bg-[#b8960c] text-white`
                        : `border-gray-200 hover:${tw.borderGold}`
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="secondary" size="md" onClick={handleAdd} className="w-full mb-3">
              <FiShoppingBag size={16} /> Add to Cart
            </Button>

            <Link
              href={`/product/${product._id}`}
              onClick={onClose}
              className={`text-center text-xs tracking-widest text-gray-400 hover:${tw.textGold} uppercase transition-colors`}
            >
              View Full Details →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

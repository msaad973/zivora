"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { DEMO_PRODUCTS } from "@/lib/demoProducts";

// Fallback demo data with stable IDs for UI testing
const FALLBACK = DEMO_PRODUCTS.map((p, i) => ({ ...p, _id: `demo-${i}` }));

const CATEGORIES = ["All", "Lawn", "Pret", "Luxury", "Bridal"];

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== "All") params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      const res = await axios.get(`/api/products?${params}`);
      const data = res.data;
      if (!data?.length) {
        // No products in DB yet — filter demo data locally
        const filtered = FALLBACK.filter(
          (p) => category === "All" || p.category === category
        ).filter(
          (p) =>
            (!minPrice || p.price >= Number(minPrice)) &&
            (!maxPrice || p.price <= Number(maxPrice))
        );
        setProducts(filtered);
      } else {
        setProducts(data);
      }
    } catch {
      // API down (no DB) — use demo data
      const filtered = FALLBACK.filter(
        (p) => category === "All" || p.category === category
      ).filter(
        (p) =>
          (!minPrice || p.price >= Number(minPrice)) &&
          (!maxPrice || p.price <= Number(maxPrice))
      );
      setProducts(filtered);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [category, minPrice, maxPrice]);

  return (
    <div className="flex gap-8">
      {/* Sidebar Filters */}
      <aside className="hidden md:block w-56 shrink-0 pl-2">
        <div className="sticky top-24">
          <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-5">Category</h3>
          <ul className="space-y-2 mb-8">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setCategory(c)}
                  className={`text-sm w-full text-left py-1.5 px-3 transition-all ${
                    category === c
                      ? "text-[#b8960c] border-l-2 border-[#b8960c] pl-4"
                      : "text-gray-500 hover:text-[#b8960c]"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-5">Price Range</h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Min Rs"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#b8960c]"
            />
            <input
              type="number"
              placeholder="Max Rs"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#b8960c]"
            />
          </div>
        </div>
      </aside>

      {/* Products */}
      <div className="flex-1">
        {/* Mobile filters */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 px-4 py-2 text-xs tracking-widest uppercase border transition-all ${
                category === c ? "bg-[#b8960c] text-white border-[#b8960c]" : "border-gray-200 text-gray-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">{products.length} products</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#f5f0e8] animate-pulse rounded-sm" />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-[#b8960c] text-xs tracking-[0.4em] uppercase mb-3">Explore</p>
          <h1 className="font-playfair text-4xl text-[#0a0a0a] font-light">Our Collections</h1>
        </div>
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

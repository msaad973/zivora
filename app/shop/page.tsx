"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demoProducts";
import { cn } from "@/lib/utils";

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
        setProducts(
          FALLBACK.filter((p) => category === "All" || p.category === category).filter(
            (p) =>
              (!minPrice || p.price >= Number(minPrice)) &&
              (!maxPrice || p.price <= Number(maxPrice))
          )
        );
      } else {
        setProducts(data);
      }
    } catch {
      setProducts(
        FALLBACK.filter((p) => category === "All" || p.category === category).filter(
          (p) =>
            (!minPrice || p.price >= Number(minPrice)) &&
            (!maxPrice || p.price <= Number(maxPrice))
        )
      );
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [category, minPrice, maxPrice]);

  return (
    <div className="flex gap-10 lg:gap-14">

      {/* Sidebar */}
      <aside className="hidden md:block w-52 lg:w-56 shrink-0">
        <div className="sticky top-28 space-y-8">

          {/* Category filter */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-3 flex items-center gap-2">
              <SlidersHorizontal size={11} />
              Category
            </p>
            <ul className="space-y-0.5">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCategory(c)}
                    className={cn(
                      "text-xs w-full text-left py-2.5 px-4 transition-all duration-200 border-l-2",
                      category === c
                        ? "text-[#b8960c] border-[#b8960c] bg-[#b8960c]/5 font-medium"
                        : "text-gray-500 border-transparent hover:text-[#b8960c] hover:border-[#b8960c]/40 hover:bg-[#b8960c]/5"
                    )}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price filter */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-3">Price Range</p>
            <div className="space-y-2.5">
              <input
                type="number"
                placeholder="Min Rs"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-xs rounded-none focus:outline-none focus:border-[#b8960c] transition-colors placeholder:text-gray-400"
              />
              <input
                type="number"
                placeholder="Max Rs"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-xs rounded-none focus:outline-none focus:border-[#b8960c] transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Products */}
      <div className="flex-1 min-w-0">

        {/* Mobile category pills */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 px-4 py-2 text-[10px] tracking-[0.2em] uppercase border rounded-sm transition-all",
                category === c
                  ? "bg-[#b8960c] text-white border-[#b8960c]"
                  : "border-gray-200 text-gray-500 hover:border-[#b8960c] hover:text-[#b8960c]"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-400">
            <span className="text-[#0a0a0a] font-medium">{products.length}</span> products
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#f5f0e8] animate-pulse rounded-sm" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
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
      <main className="flex-1 pt-28 md:pt-32 pb-24 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <p className="text-[#b8960c] text-[10px] tracking-[0.45em] uppercase mb-3">Explore</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-[#0a0a0a] font-light">
            Our Collections
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-16 bg-[#b8960c]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#b8960c]" />
            <div className="h-px w-16 bg-[#b8960c]/40" />
          </div>
        </div>

        <Suspense fallback={
          <div className="text-center py-24 text-gray-400 text-sm tracking-widest">Loading...</div>
        }>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

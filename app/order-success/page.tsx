"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SuccessContent() {
  const params = useSearchParams();
  const id = params.get("id");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20 px-6"
    >
      <div className="w-20 h-20 rounded-full border-2 border-[#b8960c] flex items-center justify-center mx-auto mb-8">
        <span className="text-[#b8960c] text-3xl">✓</span>
      </div>
      <h1 className="font-playfair text-4xl mb-4">Order Confirmed</h1>
      <p className="text-gray-500 mb-2">Thank you for your purchase!</p>
      {id && <p className="text-xs text-gray-400 tracking-widest mb-8">Order ID: {id}</p>}
      <p className="text-sm text-gray-500 mb-10">Our team will contact you shortly to confirm your order.</p>
      <Link href="/shop" className="bg-[#b8960c] text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-[#d4af37] transition-colors">
        Continue Shopping
      </Link>
    </motion.div>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen max-w-2xl mx-auto">
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

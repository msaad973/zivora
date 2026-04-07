"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["Lawn", "Pret", "Luxury", "Bridal"];

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((a, i) => a + i.quantity, 0);

  const linkClass = cn(
    "text-white! text-xs tracking-[0.2em] uppercase transition-colors duration-300 font-light hover:text-[#d4af37]"
  );

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link
          href="/"
          className="font-playfair text-xl md:text-2xl tracking-[0.2em] gold-text font-bold shrink-0"
        >
          ZIVORA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">

          {/* Home */}
          <Link href="/" className={linkClass} style={{ color: "#ffffff" }}>Home</Link>

          {/* Shop with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <Link href="/shop" className={cn(linkClass, "flex items-center gap-1")} style={{ color: "#ffffff" }}>
              Shop
              <ChevronDown
                size={13}
                className={cn(
                  "transition-transform duration-200",
                  shopOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </Link>

            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-[#0a0a0a] border border-[#b8960c]/20 rounded-sm shadow-2xl overflow-hidden"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop?category=${cat}`}
                      style={{ color: "#ffffff" }}
                      className="block px-5 py-3 text-xs hover:text-[#d4af37] hover:bg-[#b8960c]/10 transition-colors tracking-[0.15em] uppercase"
                    >
                      {cat}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About */}
          <Link href="/about" className={linkClass} style={{ color: "#ffffff" }}>About</Link>

          {/* Contact */}
          <Link href="/contact" className={linkClass} style={{ color: "#ffffff" }}>Contact</Link>

        </div>

        {/* Right: Cart + Mobile toggle */}
        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            className="relative text-white/80 hover:text-[#d4af37] transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-[#b8960c] text-black text-[10px] w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center font-semibold leading-none px-0.5"
              >
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden text-white/80 hover:text-[#d4af37] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0a0a0a] border-t border-[#b8960c]/20 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-[#b8960c]/20 pt-5 flex flex-col gap-3">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">Collections</p>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/shop?category=${cat}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/50 hover:text-[#d4af37] text-xs tracking-[0.15em] uppercase transition-colors"
                  >
                    — {cat}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

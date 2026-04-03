"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { tw } from "@/lib/tokens";

const categories = ["Lawn", "Pret", "Luxury", "Bridal"];
const navLinks = ["Home", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((a, i) => a + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = `${tw.textOnDark} hover:${tw.textGoldLight} text-sm tracking-widest uppercase transition-colors duration-300 font-light`;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? `${tw.bgBlack}/95 backdrop-blur-md shadow-lg` : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-playfair text-2xl tracking-widest gold-text font-bold">
          ZIVORA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={linkClass}
            >
              {item}
            </Link>
          ))}

          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <Link href="/shop" className={linkClass}>Shop</Link>
            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full left-0 mt-2 w-44 ${tw.bgBlack} border ${tw.borderGoldFaint} rounded-sm shadow-2xl`}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop?category=${cat}`}
                      className={`block px-5 py-3 text-sm text-white/70 hover:${tw.textGoldLight} hover:bg-[#b8960c]/10 transition-colors tracking-wider`}
                    >
                      {cat}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cart + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className={`relative text-white hover:${tw.textGoldLight} transition-colors`}>
            <FiShoppingBag size={22} />
            {cartCount > 0 && (
              <span className={`absolute -top-2 -right-2 ${tw.bgBlack.replace("bg-[#0a0a0a]", "bg-[#b8960c]")} text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold`}
                style={{ backgroundColor: "#b8960c" }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className={`md:hidden text-white hover:${tw.textGoldLight} transition-colors`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
            className={`md:hidden ${tw.bgBlack} border-t ${tw.borderGoldFaint} overflow-hidden`}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass}
                >
                  {item}
                </Link>
              ))}
              <div className={`border-t ${tw.borderGoldFaint} pt-4`}>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/shop?category=${cat}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 ${tw.textMuted} hover:${tw.textGoldLight} text-sm tracking-wider`}
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

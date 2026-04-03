"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import ProductImage from "@/components/ui/ProductImage";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import {
  FiShoppingBag, FiHeart, FiChevronDown, FiChevronUp,
  FiTruck, FiRefreshCw, FiShield, FiChevronLeft, FiChevronRight,
} from "react-icons/fi";
import { tw } from "@/lib/tokens";
import { DEMO_PRODUCTS } from "@/lib/demoProducts";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [descOpen, setDescOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    setLoading(true);
    if (id?.startsWith("demo-")) {
      const idx = parseInt(id.replace("demo-", ""));
      const p = DEMO_PRODUCTS[idx];
      if (p) setProduct({ ...p, _id: id });
      setLoading(false);
      return;
    }
    axios.get(`/api/products/${id}`)
      .then((r) => setProduct(r.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className={`w-10 h-10 border-2 ${tw.borderGold} border-t-transparent rounded-full animate-spin`} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-gray-400">Product not found.</div>
        <Footer />
      </div>
    );
  }

  const images: string[] = product.images?.length
    ? product.images
    : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"];

  const handleAdd = () => {
    if (!size) return toast.error("Please select a size");
    addItem({ productId: product._id, title: product.title, price: product.price, image: images[0], size, quantity: qty });
    toast.success("Added to cart");
  };

  const Accordion = ({ label, open, toggle, children }: any) => (
    <div className="border-t border-gray-100">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-4 text-sm font-medium text-[#0a0a0a] hover:text-[#b8960c] transition-colors"
      >
        {label}
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-gray-500 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 pt-20">

        {/* Breadcrumb */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto py-4">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#b8960c] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#b8960c] transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-[#b8960c] transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-[#0a0a0a] line-clamp-1">{product.title}</span>
          </nav>
        </div>

        {/* Main product section */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

            {/* ── Left: Gallery ── */}
            <div className="flex gap-4">
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="hidden md:flex flex-col gap-2 w-20 shrink-0">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative w-20 h-24 overflow-hidden border-2 transition-all ${
                        activeImg === i ? "border-[#b8960c]" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <ProductImage src={img} alt="" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1 relative">
                <div className="relative aspect-[3/4] bg-[#f5f0e8] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImg}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0"
                    >
                      <ProductImage src={images[activeImg]} alt={product.title} />
                    </motion.div>
                  </AnimatePresence>

                  {/* Nav arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center hover:bg-[#b8960c] hover:text-white transition-all shadow-sm"
                      >
                        <FiChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setActiveImg((p) => (p + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center hover:bg-[#b8960c] hover:text-white transition-all shadow-sm"
                      >
                        <FiChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  {product.isNewArrival && (
                    <span className="absolute top-4 left-4 bg-[#0a0a0a] text-white text-[10px] tracking-widest uppercase px-3 py-1">
                      New
                    </span>
                  )}
                </div>

                {/* Mobile thumbnail dots */}
                {images.length > 1 && (
                  <div className="flex md:hidden justify-center gap-2 mt-3">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`w-2 h-2 rounded-full transition-all ${activeImg === i ? "bg-[#b8960c]" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Details ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              {/* Category */}
              <span className="text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3 block">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="font-playfair text-2xl md:text-3xl text-[#0a0a0a] leading-snug mb-3">
                {product.title}
              </h1>

              {/* Stock badge */}
              <span className={`inline-block text-[11px] tracking-widest uppercase px-3 py-1 mb-5 w-fit ${
                product.stock > 0
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>

              {/* Price row */}
              <div className="flex items-start justify-between border-t border-b border-gray-100 py-4 mb-6">
                <div>
                  <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">Price</p>
                  <p className="text-2xl font-semibold text-[#0a0a0a]">
                    Rs.{product.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">Shipping Time</p>
                  <p className="text-sm text-[#0a0a0a]">3–5 Business Days</p>
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-widest uppercase text-gray-500">
                    Size {size && <span className="text-[#b8960c] ml-1">— {size}</span>}
                  </p>
                  <button className="text-xs text-gray-400 underline hover:text-[#b8960c] transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[48px] h-11 px-3 text-sm border transition-all ${
                        size === s
                          ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                          : "border-gray-200 text-gray-600 hover:border-[#0a0a0a]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">Quantity</p>
                <div className="flex items-center border border-gray-200 w-fit">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 flex items-center justify-center text-lg hover:bg-gray-50 transition-colors border-r border-gray-200"
                  >
                    −
                  </button>
                  <span className="w-14 text-center text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 flex items-center justify-center text-lg hover:bg-gray-50 transition-colors border-l border-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={handleAdd}
                  className="w-full flex items-center justify-center gap-2 bg-[#0a0a0a] text-white py-3.5 text-xs tracking-widest uppercase hover:bg-[#b8960c] transition-colors duration-300"
                >
                  <FiShoppingBag size={15} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs tracking-widest uppercase border transition-all duration-300 ${
                    wishlist
                      ? "border-red-300 text-red-500 bg-red-50"
                      : "border-gray-200 text-gray-500 hover:border-[#b8960c] hover:text-[#b8960c]"
                  }`}
                >
                  <FiHeart size={15} fill={wishlist ? "currentColor" : "none"} />
                  {wishlist ? "Wishlisted" : "Add to Wishlist"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-t border-b border-gray-100">
                {[
                  { icon: FiTruck, label: "Free Delivery", sub: "Orders above Rs 5,000" },
                  { icon: FiRefreshCw, label: "Easy Returns", sub: "Within 7 days" },
                  { icon: FiShield, label: "Secure Payment", sub: "100% protected" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-1">
                    <Icon size={18} className="text-[#b8960c]" />
                    <p className="text-[11px] font-medium text-[#0a0a0a]">{label}</p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Accordions */}
              <Accordion label="Description" open={descOpen} toggle={() => setDescOpen(!descOpen)}>
                {product.description || "Premium quality fabric with exquisite craftsmanship. Perfect for formal and semi-formal occasions."}
              </Accordion>
              <Accordion label="Shipping & Returns" open={shippingOpen} toggle={() => setShippingOpen(!shippingOpen)}>
                <ul className="space-y-1.5">
                  <li>• Standard delivery: 3–5 business days</li>
                  <li>• Free shipping on orders above Rs 5,000</li>
                  <li>• Cash on Delivery available nationwide</li>
                  <li>• Returns accepted within 7 days of delivery</li>
                  <li>• Item must be unused and in original packaging</li>
                </ul>
              </Accordion>
            </motion.div>
          </div>
        </div>

        {/* Related products */}
        <div className="border-t border-gray-100 px-6 md:px-12 max-w-7xl mx-auto py-16">
          <div className="text-center mb-10">
            <p className="text-[#b8960c] text-xs tracking-[0.4em] uppercase mb-2">You May Also Like</p>
            <h2 className="font-playfair text-3xl text-[#0a0a0a] font-light">Related Products</h2>
          </div>
          <ProductGrid category={product.category} limit={4} />
        </div>

      </main>
      <Footer />
    </div>
  );
}

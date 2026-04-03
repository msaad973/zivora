"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import ProductGrid from "@/components/ProductGrid";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/ui/ProductImage";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { FiShoppingBag, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { tw } from "@/lib/tokens";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((r) => setProduct(r.data));
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className={`w-10 h-10 border-2 ${tw.borderGold} border-t-transparent rounded-full animate-spin`} />
        </div>
      </>
    );
  }

  const images = product.images?.length
    ? product.images
    : ["https://via.placeholder.com/600x800?text=Zivora"];

  const handleAdd = () => {
    addItem({ productId: product._id, title: product.title, price: product.price, image: images[0], size, quantity: qty });
    toast.success("Added to cart");
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div>
            <div className={`relative aspect-[3/4] ${tw.bgBeige} overflow-hidden rounded-sm mb-4`}>
              <motion.div key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                <ProductImage src={images[activeImg]} alt={product.title} />
              </motion.div>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 hover:bg-[#b8960c] hover:text-white transition-colors`}
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={() => setActiveImg((p) => (p + 1) % images.length)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 hover:bg-[#b8960c] hover:text-white transition-colors`}
                  >
                    <FiChevronRight />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-24 shrink-0 overflow-hidden border-2 transition-all ${
                    activeImg === i ? tw.borderGold : "border-transparent"
                  }`}
                >
                  <ProductImage src={img} alt="" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className={`${tw.textGold} text-xs tracking-widest uppercase mb-3`}>
              {product.category}
            </span>
            <h1 className="font-playfair text-3xl md:text-4xl mb-4">{product.title}</h1>
            <p className={`text-2xl ${tw.textGold} font-semibold mb-6`}>
              PKR {product.price.toLocaleString()}
            </p>

            {product.description && (
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{product.description}</p>
            )}

            {/* Size selector */}
            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
                Size: <span className={tw.textGold}>{size}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 text-sm border transition-all ${
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

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-gray-50 transition-colors">−</button>
                <span className="px-6 py-3 text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-gray-50 transition-colors">+</button>
              </div>
            </div>

            <Button variant="secondary" size="lg" onClick={handleAdd} className="w-full">
              <FiShoppingBag size={18} /> Add to Cart
            </Button>

            <div className="mt-8 pt-8 border-t border-gray-100 space-y-2 text-sm text-gray-400">
              <p>✦ Free delivery on orders above PKR 5,000</p>
              <p>✦ Cash on Delivery available</p>
              <p>✦ Easy returns within 7 days</p>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        <section>
          <SectionTitle subtitle="You May Also Like" title="Related Products" />
          <ProductGrid category={product.category} limit={4} />
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProductImage from "@/components/ui/ProductImage";
import { useCartStore } from "@/store/cartStore";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { tw } from "@/lib/tokens";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCartStore();

  if (!items.length) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <p className="font-playfair text-3xl text-gray-300 mb-4">Your cart is empty</p>
          <Button href="/shop" variant="primary" size="sm">Continue Shopping →</Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-light">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.productId}-${item.size}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex gap-5 p-4">
                  <div className={`relative w-24 h-32 shrink-0 ${tw.bgBeige}`}>
                    <ProductImage
                      src={item.image}
                      alt={item.title}
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-base mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 mb-1">Size: {item.size}</p>
                    <p className={`${tw.textGold} font-semibold`}>Rs {item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQty(item.productId, item.size, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >−</button>
                        <span className="px-4 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">Rs {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className={`${tw.bgBlack} text-white p-8 h-fit`}>
            <h2 className="font-playfair text-xl mb-6 gold-text">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex justify-between text-white/60">
                  <span>{item.title} × {item.quantity}</span>
                  <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 mb-8">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className={tw.textGoldLight}>Rs {total().toLocaleString()}</span>
              </div>
            </div>
            <Button href="/checkout" variant="primary" size="lg" className="w-full">
              Checkout <FiArrowRight />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

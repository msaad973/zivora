"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { tw } from "@/lib/tokens";

const FIELDS = [
  { name: "customerName", label: "Full Name", placeholder: "Your full name", type: "text" },
  { name: "phone", label: "Phone Number", placeholder: "+92 300 0000000", type: "tel" },
  { name: "address", label: "Address", placeholder: "Street address", type: "text" },
  { name: "city", label: "City", placeholder: "Karachi, Lahore, Islamabad...", type: "text" },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", city: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return toast.error("Your cart is empty");
    setLoading(true);
    try {
      const order = await axios.post("/api/orders", {
        ...form,
        items,
        total: total(),
        paymentMethod: "Cash on Delivery",
      });
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/order-success?id=${order.data._id}`);
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-light">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <h2 className="font-playfair text-xl mb-6">Delivery Information</h2>

            {FIELDS.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={(form as any)[field.name]}
                onChange={handleChange}
                required
              />
            ))}

            {/* COD indicator */}
            <div className={`${tw.bgBeige} p-4 flex items-center gap-3 mt-4`}>
              <div className={`w-5 h-5 rounded-full border-2 ${tw.borderGold} flex items-center justify-center`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-[#b8960c]`} />
              </div>
              <span className="text-sm tracking-wide">Cash on Delivery</span>
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </motion.form>

          {/* Order Summary */}
          <div className={`${tw.bgPage} p-8 h-fit`}>
            <h2 className="font-playfair text-xl mb-6">Your Order</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.title}{" "}
                    <span className="text-gray-400">({item.size}) × {item.quantity}</span>
                  </span>
                  <span className="font-medium">PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className={`${tw.textGold} text-lg`}>PKR {total().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

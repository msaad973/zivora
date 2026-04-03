"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#b8960c] text-xs tracking-[0.4em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-playfair text-4xl font-light">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="font-playfair text-2xl mb-6">We'd Love to Hear From You</h2>
            <div className="space-y-5 text-sm text-gray-500">
              <p>✦ <strong className="text-[#0a0a0a]">Email:</strong> hello@zivora.pk</p>
              <p>✦ <strong className="text-[#0a0a0a]">WhatsApp:</strong> +92 300 0000000</p>
              <p>✦ <strong className="text-[#0a0a0a]">Hours:</strong> Mon–Sat, 10am–7pm</p>
              <p>✦ <strong className="text-[#0a0a0a]">Location:</strong> Lahore, Pakistan</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  value={(form as any)[f.name]}
                  onChange={(e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
                  required
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#b8960c] transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                rows={5}
                required
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#b8960c] transition-colors resize-none"
              />
            </div>
            <button type="submit" className="w-full bg-[#0a0a0a] text-white py-4 tracking-widest text-sm uppercase hover:bg-[#b8960c] transition-colors">
              Send Message
            </button>
          </motion.form>
        </div>
      </main>
      <Footer />
    </>
  );
}

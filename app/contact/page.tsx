"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { Mail, Home, Phone } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", website: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Contact Section */}
      <main className="flex-1 flex flex-col pt-24">
        <div className="relative overflow-hidden flex-1 flex items-center">
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-yellow-50 pointer-events-none" />

          <div className="relative w-full max-w-5xl mx-auto px-8 py-20">
          <div className="bg-white rounded-2xl shadow-xl px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
              <p className="text-gray-500 text-sm mb-10 max-w-xs">
                We are committed to processing the information in order to contact you and talk about your project.
              </p>

              <div className="space-y-5 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-orange-400 mt-0.5 shrink-0" />
                  <span>hello@zivora.pk</span>
                </div>
                <div className="flex items-start gap-3">
                  <Home size={18} className="text-orange-400 mt-0.5 shrink-0" />
                  <span>Lahore, Pakistan</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-orange-400 mt-0.5 shrink-0" />
                  <span>+92 300 0000000</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "website", label: "Website", type: "text" },
              ].map((f) => (
                <input
                  key={f.name}
                  type={f.type}
                  name={f.name}
                  placeholder={f.label + (f.name !== "website" ? "*" : "*")}
                  value={(form as any)[f.name]}
                  onChange={(e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
                  required={f.name !== "website"}
                  className="w-full border border-gray-200 rounded-lg px-4 py-4 text-sm bg-white focus:outline-none focus:border-purple-400 transition-colors placeholder:text-gray-400"
                />
              ))}
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                rows={4}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-purple-400 transition-colors resize-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-lg text-white text-sm font-medium tracking-wide"
                style={{ background: "linear-gradient(to right, #a855f7, #f97316)" }}
              >
                Submit
              </button>
            </form>
          </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

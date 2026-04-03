"use client";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiLock, FiShield } from "react-icons/fi";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
}));

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#b8960c 1px, transparent 1px), linear-gradient(90deg, #b8960c 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#050505_100%)]" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#b8960c]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#b8960c]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#d4af37]/6 rounded-full blur-[100px] pointer-events-none" />

      {/* Horizontal scan line animation */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8960c]/20 to-transparent pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[420px]"
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-px bg-gradient-to-b from-[#b8960c]/40 via-[#b8960c]/10 to-[#b8960c]/40 rounded-sm blur-sm" />

        {/* Main card */}
        <div className="relative bg-gradient-to-b from-[#161616] to-[#0e0e0e] border border-[#b8960c]/25 overflow-hidden">

          {/* Top shimmer bar */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

          {/* Inner top highlight */}
          <div className="h-24 bg-gradient-to-b from-[#b8960c]/8 to-transparent" />

          <div className="px-10 pb-10 -mt-16 text-center">

            {/* Animated shield */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative w-20 h-20 mx-auto mb-7"
            >
              <div className="absolute inset-0 bg-[#b8960c]/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full border border-[#b8960c]/40 bg-gradient-to-b from-[#b8960c]/15 to-[#b8960c]/5 flex items-center justify-center">
                <FiShield className="text-[#d4af37]" size={32} />
                {/* Rotating ring */}
                <motion.div
                  className="absolute inset-[-6px] border border-dashed border-[#b8960c]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h1 className="font-playfair text-5xl gold-text tracking-[0.15em] mb-1">ZIVORA</h1>
            </motion.div>

            {/* Divider with label */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center justify-center gap-3 my-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b8960c]/40" />
              <span className="text-[#b8960c]/60 text-[9px] tracking-[0.4em] uppercase font-medium">Admin Panel</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b8960c]/40" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-white/35 text-sm leading-relaxed mb-9 px-2"
            >
              Sign in with your authorized Google account to access the admin dashboard.
            </motion.p>

            {/* Google sign-in button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <button
                onClick={() => signIn("google", { callbackUrl: "/admin" })}
                className="w-full group relative flex items-center justify-center gap-3 bg-white text-gray-900 py-[14px] px-6 text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,150,12,0.25)] active:scale-[0.98]"
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b8960c]/15 to-transparent -translate-x-full"
                  animate={{ translateX: ["−100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                />
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </motion.div>

            {/* Security note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center justify-center gap-2 mt-7"
            >
              <FiLock size={10} className="text-white/15" />
              <p className="text-white/15 text-[11px] tracking-wider">Only authorized administrators</p>
            </motion.div>
          </div>

          {/* Bottom shimmer bar */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b8960c]/50 to-transparent" />
        </div>

        {/* Corner brackets */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((cls, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.05 }}
            className={`absolute w-5 h-5 border-[#b8960c]/70 ${cls}`}
          />
        ))}
      </motion.div>
    </div>
  );
}

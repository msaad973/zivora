"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiShield, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
}));

export default function AdminLoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Account created! Check your email to confirm, then log in.");
      setTab("login");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full bg-[#0c0c0c] border border-white/10 text-white text-sm px-4 py-3 pl-11 focus:outline-none focus:border-[#b8960c] transition-colors placeholder:text-white/20";

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#b8960c 1px, transparent 1px), linear-gradient(90deg, #b8960c 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#050505_100%)]" />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#b8960c]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#b8960c]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8960c]/15 to-transparent pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[420px]"
      >
        {/* Outer glow */}
        <div className="absolute -inset-px bg-gradient-to-b from-[#b8960c]/35 via-[#b8960c]/8 to-[#b8960c]/35 blur-sm rounded-sm" />

        <div className="relative bg-gradient-to-b from-[#161616] to-[#0e0e0e] border border-[#b8960c]/20 overflow-hidden">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <div className="h-16 bg-gradient-to-b from-[#b8960c]/8 to-transparent" />

          <div className="px-8 pb-8 -mt-8 text-center">
            {/* Shield */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
              className="relative w-16 h-16 mx-auto mb-5"
            >
              <div className="absolute inset-0 bg-[#b8960c]/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full border border-[#b8960c]/40 bg-gradient-to-b from-[#b8960c]/15 to-[#b8960c]/5 flex items-center justify-center">
                <FiShield className="text-[#d4af37]" size={26} />
                <motion.div
                  className="absolute inset-[-5px] border border-dashed border-[#b8960c]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Brand */}
            <h1 className="font-playfair text-4xl gold-text tracking-[0.15em] mb-1">ZIVORA</h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b8960c]/40" />
              <span className="text-[#b8960c]/50 text-[9px] tracking-[0.4em] uppercase">Admin Panel</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b8960c]/40" />
            </div>

            {/* Tabs */}
            <div className="flex border border-white/8 mb-6">
              {(["login", "signup"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                  className={`flex-1 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 ${
                    tab === t
                      ? "bg-[#b8960c] text-white"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {t === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Error / Success */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3 py-2.5 mb-4 text-left"
                >
                  <FiAlertCircle size={13} className="shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-2.5 mb-4 text-left"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={tab}
                initial={{ opacity: 0, x: tab === "login" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={tab === "login" ? handleLogin : handleSignup}
                className="space-y-3 text-left"
              >
                {tab === "signup" && (
                  <div className="relative">
                    <FiShield size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                )}

                <div className="relative">
                  <FiMail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <FiLock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#b8960c] hover:bg-[#d4af37] text-white py-3.5 text-xs tracking-widest uppercase font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(184,150,12,0.3)] mt-1"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" />
                      {tab === "login" ? "Signing in..." : "Creating account..."}
                    </span>
                  ) : tab === "login" ? "Sign In" : "Create Account"}
                </button>
              </motion.form>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-2 mt-6">
              <FiLock size={10} className="text-white/15" />
              <p className="text-white/15 text-[11px] tracking-wider">Authorized administrators only</p>
            </div>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b8960c]/40 to-transparent" />
        </div>

        {/* Corner brackets */}
        {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.05 }}
            className={`absolute w-5 h-5 border-[#b8960c]/60 ${cls}`}
          />
        ))}
      </motion.div>
    </div>
  );
}

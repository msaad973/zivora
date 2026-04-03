"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiX, FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { tw } from "@/lib/tokens";

const CATEGORIES = ["Lawn", "Pret", "Luxury", "Bridal"];

interface Props {
  product?: any;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductFormModal({ product, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    title: product?.title || "",
    price: product?.price || "",
    category: product?.category || "Lawn",
    description: product?.description || "",
    isFeatured: product?.isFeatured || false,
    isBestSeller: product?.isBestSeller || false,
    isNewArrival: product?.isNewArrival ?? true,
  });
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key: string, value: unknown) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await axios.post("/api/upload", fd);
      setImages((prev) => [...prev, res.data.url]);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title || !form.price) return toast.error("Title and price are required");
    setSaving(true);
    const data = { ...form, price: Number(form.price), images };
    try {
      if (product?._id) {
        await axios.put(`/api/products/${product._id}`, data);
        toast.success("Product updated");
      } else {
        await axios.post("/api/products", data);
        toast.success("Product created");
      }
      onSaved();
    } catch {
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#b8960c] transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`${tw.cardDark} w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-playfair text-xl text-white">
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Image upload */}
          <div>
            <label className={tw.labelDark}>Images</label>
            <div className="flex gap-3 flex-wrap mt-1">
              {images.map((img, i) => (
                <div key={i} className={`relative w-20 h-24 ${tw.bgBlack}`}>
                  <Image src={img} alt="" fill className="object-cover" />
                  <button
                    onClick={() => setImages(images.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label
                className={`w-20 h-24 border border-dashed ${tw.borderGoldFaint} flex flex-col items-center justify-center cursor-pointer hover:border-[#b8960c] transition-colors`}
              >
                <FiUpload className={tw.textGold} size={18} />
                <span className={`${tw.textDimmed} text-xs mt-1`}>
                  {uploading ? "..." : "Upload"}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={tw.labelDark}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => set("title", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Price */}
          <div>
            <label className={tw.labelDark}>Price (Rs)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => set("price", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label className={tw.labelDark}>Category</label>
            <select
              value={form.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                set("category", e.target.value)
              }
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={tw.labelDark}>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("description", e.target.value)
              }
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Flags */}
          <div className="flex gap-6">
            {[
              { key: "isNewArrival", label: "New Arrival" },
              { key: "isFeatured", label: "Featured" },
              { key: "isBestSeller", label: "Best Seller" },
            ].map((f) => (
              <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(form as any)[f.key]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    set(f.key, e.target.checked)
                  }
                  className="accent-[#b8960c]"
                />
                <span className="text-white/60 text-sm">{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm text-white/40 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <Button variant="primary" size="md" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

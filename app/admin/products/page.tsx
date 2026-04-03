"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProductImage from "@/components/ui/ProductImage";
import toast from "react-hot-toast";
import { tw } from "@/lib/tokens";
import ProductFormModal from "@/components/admin/ProductFormModal";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const fetchProducts = () =>
    axios.get("/api/products")
      .then((r) => setProducts(r.data))
      .catch(() => toast.error("Failed to load products"));
  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await axios.delete(`/api/products/${id}`);
    toast.success("Product deleted");
    fetchProducts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-white">Products</h1>
        <Button
          variant="primary"
          size="sm"
          onClick={() => { setEditing(null); setShowModal(true); }}
        >
          <FiPlus size={16} /> Add Product
        </Button>
      </div>

      <Card dark className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className={`${tw.textDimmed} text-xs tracking-widest uppercase border-b border-white/5`}>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p, i) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-white/60 hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`relative w-12 h-14 ${tw.bgBlack} shrink-0`}>
                      <ProductImage src={p.images?.[0]} alt={p.title} sizes="48px" />
                    </div>
                    <span className="text-white">{p.title}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`${tw.textGold} text-xs tracking-widest uppercase`}>{p.category}</span>
                </td>
                <td className={`p-4 ${tw.textGoldLight}`}>PKR {p.price.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setEditing(p); setShowModal(true); }}
                      className={`text-white/40 hover:${tw.textGoldLight} transition-colors`}
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-white/40 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>

      {showModal && (
        <ProductFormModal
          product={editing}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); fetchProducts(); }}
        />
      )}
    </div>
  );
}

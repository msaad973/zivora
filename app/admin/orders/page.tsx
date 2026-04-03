"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Card from "@/components/ui/Card";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import { tw } from "@/lib/tokens";

const STATUSES = ["Pending", "Shipped", "Delivered"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const fetchOrders = () =>
    axios.get("/api/orders")
      .then((r) => setOrders(r.data))
      .catch(() => toast.error("Failed to load orders"));
  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await axios.put(`/api/orders/${id}`, { status });
    toast.success(`Status updated to ${status}`);
    fetchOrders();
    if (selected?._id === id) setSelected((p: any) => ({ ...p, status }));
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Orders list */}
      <div className="flex-1">
        <h1 className="font-playfair text-3xl text-white mb-8">Orders</h1>
        <Card dark className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className={`${tw.textDimmed} text-xs tracking-widest uppercase border-b border-white/5`}>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">City</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order, i) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(order)}
                  className={`text-white/60 cursor-pointer hover:bg-white/[0.03] transition-colors ${
                    selected?._id === order._id ? "bg-[#b8960c]/5" : ""
                  }`}
                >
                  <td className="p-4 text-white">{order.customerName}</td>
                  <td className="p-4">{order.city}</td>
                  <td className={`p-4 ${tw.textGoldLight}`}>PKR {order.total.toLocaleString()}</td>
                  <td className="p-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className={`p-4 ${tw.textDimmed} text-xs`}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Detail panel */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card dark className="w-80 p-6 h-fit sticky top-8">
            <h2 className="font-playfair text-lg text-white mb-5">Order Details</h2>

            <div className="space-y-3 text-sm mb-6">
              {[
                ["Customer", selected.customerName],
                ["Phone", selected.phone],
                ["Address", selected.address],
                ["City", selected.city],
                ["Payment", selected.paymentMethod],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className={tw.textDimmed}>{label}:</span>
                  <span className="text-white ml-2">{value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-4 mb-6">
              <p className={`${tw.textDimmed} text-xs tracking-widest uppercase mb-3`}>Items</p>
              {selected.items?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-sm text-white/60 py-1">
                  <span>{item.title} × {item.quantity}</span>
                  <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className={`flex justify-between font-semibold ${tw.textGoldLight} mt-3 pt-3 border-t border-white/5`}>
                <span>Total</span>
                <span>PKR {selected.total.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <p className={`${tw.textDimmed} text-xs tracking-widest uppercase mb-3`}>Update Status</p>
              <div className="flex flex-col gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    className={`py-2 px-4 text-sm text-left transition-all ${
                      selected.status === s
                        ? `bg-[#b8960c] text-white`
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiPackage, FiShoppingCart, FiDollarSign, FiClock, FiDatabase } from "react-icons/fi";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import { tw } from "@/lib/tokens";

const STAT_CARDS = (stats: { products: number; orders: number; revenue: number; pending: number }) => [
  { label: "Total Products", value: stats.products, icon: FiPackage, color: "text-blue-400" },
  { label: "Total Orders", value: stats.orders, icon: FiShoppingCart, color: "text-green-400" },
  { label: "Revenue (Rs)", value: stats.revenue.toLocaleString(), icon: FiDollarSign, color: tw.textGoldLight },
  { label: "Pending Orders", value: stats.pending, icon: FiClock, color: "text-orange-400" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, pending: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  const loadData = () =>
    Promise.all([axios.get("/api/products"), axios.get("/api/orders")]).then(([p, o]) => {
      const orders = o.data;
      setStats({
        products: p.data.length,
        orders: orders.length,
        revenue: orders.reduce((a: number, o: any) => a + o.total, 0),
        pending: orders.filter((o: any) => o.status === "Pending").length,
      });
      setRecentOrders(orders.slice(0, 5));
    }).catch(() => setSeedMsg("⚠ Could not connect to database. Check your MONGODB_URI in .env.local"));

  useEffect(() => { loadData(); }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMsg("");
    const res = await axios.post("/api/seed");
    setSeedMsg(res.data.message);
    setSeeding(false);
    loadData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl text-white">Dashboard</h1>
        <div className="flex items-center gap-3">
          {seedMsg && <span className="text-xs text-white/40">{seedMsg}</span>}
          {stats.products === 0 && (
            <Button variant="outline" size="sm" onClick={handleSeed} disabled={seeding}>
              <FiDatabase size={14} />
              {seeding ? "Seeding..." : "Load Demo Products"}
            </Button>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {STAT_CARDS(stats).map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card dark className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`${tw.textDimmed} text-xs tracking-widest uppercase`}>{card.label}</span>
                <card.icon className={card.color} size={18} />
              </div>
              <p className={`text-2xl font-semibold ${card.color}`}>{card.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      <Card dark className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-playfair text-xl">Recent Orders</h2>
          <Link href="/admin/orders" className={`${tw.textGold} text-xs tracking-widest uppercase hover:${tw.textGoldLight} transition-colors`}>
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`${tw.textDimmed} text-xs tracking-widest uppercase border-b border-white/5`}>
                <th className="text-left pb-3">Customer</th>
                <th className="text-left pb-3">City</th>
                <th className="text-left pb-3">Total</th>
                <th className="text-left pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.map((order) => (
                <tr key={order._id} className="text-white/60">
                  <td className="py-3">{order.customerName}</td>
                  <td className="py-3">{order.city}</td>
                  <td className={`py-3 ${tw.textGoldLight}`}>Rs {order.total.toLocaleString()}</td>
                  <td className="py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

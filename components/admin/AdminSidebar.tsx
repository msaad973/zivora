"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { FiGrid, FiPackage, FiShoppingCart, FiLogOut } from "react-icons/fi";
import { tw } from "@/lib/tokens";

const links = [
  { href: "/admin", label: "Dashboard", icon: FiGrid },
  { href: "/admin/products", label: "Products", icon: FiPackage },
  { href: "/admin/orders", label: "Orders", icon: FiShoppingCart },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className={`w-64 ${tw.bgBlack} border-r ${tw.borderGoldSoft} flex flex-col`}>
      <div className={`px-8 py-6 border-b ${tw.borderGoldSoft}`}>
        <h1 className="font-playfair text-xl gold-text font-bold">ZIVORA</h1>
        <p className={`${tw.textDimmed} text-xs tracking-widest mt-1`}>Admin Panel</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-5 py-3 pr-6 text-sm transition-all rounded-sm ${
              pathname === href
                ? `bg-[#b8960c]/10 ${tw.textGoldLight} border-l-2 ${tw.borderGold}`
                : `${tw.textMuted} hover:text-white hover:bg-white/5`
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className={`px-4 py-4 border-t ${tw.borderGoldSoft}`}>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-5 py-3 pr-6 text-sm text-white/40 hover:text-red-400 transition-colors w-full"
        >
          <FiLogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

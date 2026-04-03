import Link from "next/link";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { tw } from "@/lib/tokens";

export default function Footer() {
  return (
    <footer className={`${tw.bgBlack} text-white/60 border-t ${tw.borderGoldFaint}`}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-playfair text-3xl gold-text font-bold mb-4">ZIVORA</h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Redefining Pakistani luxury fashion with timeless elegance and contemporary design.
          </p>
          <div className="flex gap-4 mt-6">
            {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
              <a key={i} href="#" className={`hover:${tw.textGoldLight} transition-colors`}>
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm tracking-widest uppercase mb-5">Collections</h4>
          <ul className="space-y-3 text-sm">
            {["Lawn", "Pret", "Luxury", "Bridal"].map((c) => (
              <li key={c}>
                <Link href={`/shop?category=${c}`} className={`hover:${tw.textGoldLight} transition-colors`}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm tracking-widest uppercase mb-5">Info</h4>
          <ul className="space-y-3 text-sm">
            {["About", "Contact", "Shop"].map((p) => (
              <li key={p}>
                <Link href={`/${p.toLowerCase()}`} className={`hover:${tw.textGoldLight} transition-colors`}>
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`border-t ${tw.borderGoldSoft} py-6 text-center text-xs tracking-widest`}>
        © {new Date().getFullYear()} ZIVORA. All rights reserved.
      </div>
    </footer>
  );
}

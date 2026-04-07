import Link from "next/link";
import { tw } from "@/lib/tokens";

// Inline SVG social icons (lucide-react v1.x doesn't include brand icons)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const socialLinks = [
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: FacebookIcon, href: "#", label: "Facebook" },
  { Icon: TwitterIcon, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className={`${tw.bgBlack} text-white/60 border-t ${tw.borderGoldFaint}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">

        {/* Brand */}
        <div className="md:col-span-2 space-y-5">
          <h3 className="font-playfair text-3xl gold-text font-bold tracking-widest">ZIVORA</h3>
          <p className="text-sm leading-relaxed max-w-xs text-white/50">
            Redefining Pakistani luxury fashion with timeless elegance and contemporary design.
          </p>
          <div className="flex items-center gap-4 pt-1">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-[#b8960c]/20 flex items-center justify-center text-white/50 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-all duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-5">
          <h4 className="text-white text-xs tracking-[0.25em] uppercase font-medium">Collections</h4>
          <ul className="space-y-3">
            {["Lawn", "Pret", "Luxury", "Bridal"].map((c) => (
              <li key={c}>
                <Link
                  href={`/shop?category=${c}`}
                  className="text-sm text-white/50 hover:text-[#d4af37] transition-colors"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <h4 className="text-white text-xs tracking-[0.25em] uppercase font-medium">Info</h4>
          <ul className="space-y-3">
            {["About", "Contact", "Shop"].map((p) => (
              <li key={p}>
                <Link
                  href={`/${p.toLowerCase()}`}
                  className="text-sm text-white/50 hover:text-[#d4af37] transition-colors"
                >
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`border-t ${tw.borderGoldSoft} py-6 text-center text-[11px] tracking-[0.2em] text-white/30`}>
        © {new Date().getFullYear()} ZIVORA. All rights reserved.
      </div>
    </footer>
  );
}

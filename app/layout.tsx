import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { Playfair_Display, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Zivora | Luxury Pakistani Fashion",
    template: "%s | Zivora",
  },
  description:
    "Discover premium Pakistani fashion — Lawn, Pret & Luxury collections by Zivora.",
  keywords: ["Pakistani fashion", "luxury lawn", "pret", "bridal", "Zivora"],
  authors: [{ name: "Zivora" }],
  creator: "Zivora",
  openGraph: {
    title: "Zivora | Luxury Pakistani Fashion",
    description: "Premium Pakistani fashion collections",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zivora | Luxury Pakistani Fashion",
    description: "Premium Pakistani fashion collections",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(playfair.variable, poppins.variable)}>
      <body className={cn("font-sans antialiased bg-[#faf9f7] text-[#0a0a0a]", poppins.className)}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#d4af37",
                border: "1px solid #b8960c",
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Zivora | Luxury Pakistani Fashion",
  description: "Discover premium Pakistani fashion — Lawn, Pret & Luxury collections by Zivora.",
  keywords: "Pakistani fashion, luxury lawn, pret, bridal, Zivora",
  openGraph: {
    title: "Zivora | Luxury Pakistani Fashion",
    description: "Premium Pakistani fashion collections",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#1a1a1a", color: "#d4af37", border: "1px solid #b8960c" },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

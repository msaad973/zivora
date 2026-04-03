import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SectionTitle from "@/components/SectionTitle";
import ProductGrid from "@/components/ProductGrid";
import FeaturedBanner from "@/components/FeaturedBanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* New Arrivals */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <SectionTitle subtitle="Just In" title="New Arrivals" />
          <ProductGrid type="new" limit={8} />
        </section>

        {/* Featured Banner */}
        <FeaturedBanner />

        {/* Featured Collection */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <SectionTitle subtitle="Curated For You" title="Featured Collection" />
          <ProductGrid type="featured" limit={4} />
        </section>

        {/* Best Sellers */}
        <section className="py-20 px-6 max-w-7xl mx-auto bg-[#faf9f7]">
          <SectionTitle subtitle="Most Loved" title="Best Sellers" />
          <ProductGrid type="bestseller" limit={4} />
        </section>
      </main>
      <Footer />
    </>
  );
}

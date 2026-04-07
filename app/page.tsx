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
        <section className="py-24 md:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="Just In" title="New Arrivals" />
            <ProductGrid type="new" limit={8} />
          </div>
        </section>

        {/* Featured Banner */}
        <FeaturedBanner />

        {/* Featured Collection */}
        <section className="py-24 md:py-32 px-6 lg:px-10 bg-[#faf9f7]">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="Curated For You" title="Featured Collection" />
            <ProductGrid type="featured" limit={4} />
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-24 md:py-32 px-6 lg:px-10 bg-[#f5f0e8]">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="Most Loved" title="Best Sellers" />
            <ProductGrid type="bestseller" limit={4} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] bg-[#0a0a0a] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
            alt="About Zivora"
            fill
            className="object-cover opacity-30"
          />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <p className="text-[#d4af37] text-xs tracking-[0.4em] uppercase mb-4">Our Story</p>
            <h1 className="font-playfair text-5xl md:text-6xl text-white font-light">
              About <span className="italic gold-text">Zivora</span>
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800"
                  alt="Zivora Story"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <p className="text-[#b8960c] text-xs tracking-[0.4em] uppercase mb-4">Est. 2020</p>
              <h2 className="font-playfair text-3xl md:text-4xl mb-6 font-light">
                Crafting Luxury,<br />
                <span className="italic">One Thread at a Time</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Zivora was born from a deep love for Pakistani craftsmanship and a vision to bring luxury fashion to the modern woman. Every piece in our collection is a testament to the rich textile heritage of Pakistan.
              </p>
              <p className="text-gray-500 leading-relaxed">
                From the finest Lawn fabrics to intricately embroidered Bridal wear, we curate collections that blend tradition with contemporary elegance — designed for women who appreciate the art of dressing well.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-[#0a0a0a] px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#d4af37] text-xs tracking-[0.4em] uppercase mb-4">What We Stand For</p>
            <h2 className="font-playfair text-3xl text-white font-light mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "Craftsmanship", desc: "Every stitch is a work of art, crafted by skilled artisans with decades of experience." },
                { title: "Elegance", desc: "Timeless designs that transcend trends and celebrate the beauty of Pakistani fashion." },
                { title: "Quality", desc: "Only the finest fabrics and materials make it into our collections." },
              ].map((v) => (
                <AnimatedSection key={v.title}>
                  <div className="border border-[#b8960c]/20 p-8">
                    <div className="w-10 h-px bg-[#b8960c] mx-auto mb-6" />
                    <h3 className="font-playfair text-xl text-white mb-4">{v.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

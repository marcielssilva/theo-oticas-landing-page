import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* id usado pelo link "pular para o conteúdo" do header */}
      <main id="conteudo">
        <Hero />
        <ProductCarousel />
        <Services />
        <About />
        <Contact />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

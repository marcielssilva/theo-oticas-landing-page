import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProductCarousel from "@/components/ProductCarousel";
import About from "@/components/About";
import Contact from "@/components/Contact";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <ProductCarousel />
        <ProductCatalog />
        <About />
        <Contact />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

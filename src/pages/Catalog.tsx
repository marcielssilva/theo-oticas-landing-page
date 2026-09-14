import Header from "@/components/Header";
import ProductCatalog from "@/components/ProductCatalog";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Catalog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="conteudo" className="pt-[var(--header-height)]">
        <ProductCatalog />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

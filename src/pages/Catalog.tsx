import Header from "@/components/Header";
import ProductCatalog from "@/components/ProductCatalog";
import Footer from "@/components/Footer";

const Catalog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;

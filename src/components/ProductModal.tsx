import { useState } from "react";
import { X, ShoppingBag, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  if (!product) return null;

  const images = product.images;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/60 backdrop-blur-sm rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Gallery */}
        <div className="md:w-1/2 flex-shrink-0 flex flex-col">
          {/* Main image */}
          <div className="relative aspect-square overflow-hidden bg-secondary/30 flex-shrink-0">
            <img
              src={images[activeIdx]}
              alt={`${product.name} foto ${activeIdx + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-background/70 backdrop-blur-sm rounded-full border border-border text-foreground hover:bg-background/90 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-background/70 backdrop-blur-sm rounded-full border border-border text-foreground hover:bg-background/90 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            {/* Category badge */}
            <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-primary text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full border border-primary/30">
              {product.category === "Armação Moderna" ? "Armação" : "Sol"}
            </span>
            {product.tag && (
              <span className="absolute top-3 right-12 bg-primary text-primary-foreground text-[10px] tracking-wide uppercase font-bold px-2.5 py-1 rounded-full">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-secondary/20">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeIdx === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Foto ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-6 md:w-1/2 overflow-y-auto">
          <div>
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">
              {product.category}
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              {product.name}
            </h2>

            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estilo</span>
                <span className="text-foreground font-medium">{product.style}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Material</span>
                <span className="text-foreground font-medium">{product.material}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Indicado para</span>
                <span className="text-foreground font-medium">{product.gender}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {product.description}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs text-muted-foreground text-center">
              Consulte disponibilidade e valores via WhatsApp
            </p>
            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                added
                  ? "bg-primary/80 text-primary-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Adicionado!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar ao carrinho
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

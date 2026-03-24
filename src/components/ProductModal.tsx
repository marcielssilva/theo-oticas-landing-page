import { useState } from "react";
import { X, ZoomIn, ShoppingBag, Check } from "lucide-react";
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
  const [zoomed, setZoomed] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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

        {/* Image */}
        <div
          className="relative md:w-1/2 aspect-square cursor-zoom-in overflow-hidden bg-secondary/30 flex-shrink-0"
          onClick={() => setZoomed(!zoomed)}
        >
          <img
            src={product.img}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              zoomed ? "scale-150" : "scale-100"
            }`}
          />
          {!zoomed && (
            <div className="absolute bottom-3 right-3 bg-background/70 backdrop-blur-sm rounded-full p-2 border border-border">
              <ZoomIn className="w-4 h-4 text-primary" />
            </div>
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

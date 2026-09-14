import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, ShoppingBag, X } from "lucide-react";
import { CATEGORY_SHORT_LABEL, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useDialog } from "@/hooks/useDialog";
import { EXTERNAL_LINK_PROPS, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const open = Boolean(product);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ESC, trava de scroll, foco preso no modal e devolvido ao fechar.
  const dialogRef = useDialog<HTMLDivElement>(open, onClose);

  useEffect(() => {
    setActiveIndex(0);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 2000);
    return () => window.clearTimeout(timer);
  }, [added]);

  if (!product) return null;

  const images = product.images;
  const showPrev = () => setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % images.length);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
  };

  const specs = [
    { label: "Estilo", value: product.style },
    { label: "Material", value: product.material },
    { label: "Indicado para", value: product.gender },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-background/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-produto-titulo"
        className="relative flex max-h-[90svh] w-full max-w-3xl animate-scale-in flex-col overflow-hidden
                   rounded-card border border-border bg-card shadow-lifted md:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 rounded-full border border-border bg-background/70 p-2
                     text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <div className="flex shrink-0 flex-col md:w-1/2">
          <div className="relative aspect-square overflow-hidden bg-secondary/40">
            <img
              src={images[activeIndex]}
              alt={`${product.name} — foto ${activeIndex + 1} de ${images.length}`}
              className="h-full w-full object-cover"
              decoding="async"
            />

            {images.length > 1 && (
              <>
                <GalleryArrow side="left" onClick={showPrev} label="Foto anterior">
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                </GalleryArrow>
                <GalleryArrow side="right" onClick={showNext} label="Próxima foto">
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </GalleryArrow>
              </>
            )}

            <span
              className="absolute left-3 top-3 rounded-full border border-brand/30 bg-background/80 px-3 py-1
                         text-[10px] font-semibold uppercase tracking-[0.16em] text-brand backdrop-blur-sm"
            >
              {CATEGORY_SHORT_LABEL[product.category]}
            </span>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 bg-secondary/20 p-3">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ver foto ${index + 1}`}
                  aria-current={index === activeIndex}
                  className={cn(
                    "aspect-square flex-1 overflow-hidden rounded-lg border-2 transition-all duration-200",
                    index === activeIndex
                      ? "border-brand"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col overflow-y-auto p-6 md:w-1/2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {product.category}
          </p>
          <h2
            id="modal-produto-titulo"
            className="mt-2 font-display text-2xl font-bold text-foreground"
          >
            {product.name}
          </h2>

          <dl className="mt-5 space-y-2.5 text-sm">
            {specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{spec.label}</dt>
                <dd className="text-right font-medium text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-auto space-y-2.5 pt-6">
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold transition-colors duration-200",
                added
                  ? "bg-brand/80 text-brand-foreground"
                  : "bg-brand text-brand-foreground hover:bg-brand-light",
              )}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" aria-hidden />
                  Adicionado ao carrinho
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" aria-hidden />
                  Adicionar ao carrinho
                </>
              )}
            </button>

            {/* Atalho para quem quer só esse modelo e não vai montar uma lista. */}
            <a
              href={whatsappLink(
                `Olá! Vi o modelo ${product.name} (${product.category}) no site e queria saber disponibilidade e valor.`,
              )}
              {...EXTERNAL_LINK_PROPS}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3
                         text-sm font-medium text-muted-foreground transition-colors
                         hover:border-brand/50 hover:text-brand"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Perguntar sobre este modelo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryArrow({
  side,
  onClick,
  label,
  children,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2",
        "text-foreground backdrop-blur-sm transition-colors hover:bg-background",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      {children}
    </button>
  );
}

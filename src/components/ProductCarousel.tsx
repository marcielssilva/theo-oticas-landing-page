import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { products, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { SectionHeading } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

export default function ProductCarousel() {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const feedbackTimer = useRef<number>();

  // Autoplay é desligado para quem pede menos movimento no sistema.
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const autoplay = useRef(
    Autoplay({ delay: 3600, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    prefersReducedMotion ? [] : [autoplay.current],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
    };

    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  const handleAdd = useCallback(
    (product: Product) => {
      addItem(product);
      setJustAdded(product.id);
      window.clearTimeout(feedbackTimer.current);
      feedbackTimer.current = window.setTimeout(() => setJustAdded(null), 1600);
    },
    [addItem],
  );

  return (
    <>
      <section id="colecao" className="section overflow-hidden bg-surface-raised">
        <div className="container">
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Coleção"
              title="Modelos em destaque"
              align="left"
              className="mb-0"
            />

            <div className="flex items-center gap-2">
              <CarouselButton
                label="Modelo anterior"
                onClick={() => emblaApi?.scrollPrev()}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </CarouselButton>
              <CarouselButton label="Próximo modelo" onClick={() => emblaApi?.scrollNext()}>
                <ChevronRight className="h-4 w-4" aria-hidden />
              </CarouselButton>
            </div>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="container flex gap-5">
            {products.map((product, index) => (
              <div key={product.id} className="min-w-0 flex-[0_0_72%] sm:flex-[0_0_46%] lg:flex-[0_0_25%]">
                <ProductCard
                  product={product}
                  onSelect={setSelected}
                  onAdd={handleAdd}
                  justAdded={justAdded === product.id}
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Antes os "dots" eram dois tracinhos fixos que não indicavam nada. */}
        {snapCount > 1 && (
          <div className="container mt-8 flex flex-wrap items-center justify-center gap-1.5">
            {Array.from({ length: snapCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ir para o modelo ${index + 1}`}
                aria-current={index === selectedIndex}
                className={cn(
                  "h-1 rounded-full transition-all duration-300 ease-smooth",
                  index === selectedIndex ? "w-8 bg-brand" : "w-4 bg-border hover:bg-brand/50",
                )}
              />
            ))}
          </div>
        )}

        <div className="container mt-10 text-center">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand
                       transition-colors hover:text-brand-light"
          >
            Ver o catálogo completo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function CarouselButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border
                 text-foreground/70 transition-colors hover:border-brand/50 hover:bg-brand/10 hover:text-brand"
    >
      {children}
    </button>
  );
}

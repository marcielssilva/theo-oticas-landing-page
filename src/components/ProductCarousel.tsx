import { useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import framesImg from "@/assets/frames-collection.jpg";
import framesDetail from "@/assets/frames-detail.jpg";
import sunglassesImg from "@/assets/sunglasses-collection.jpg";
import sunglassesDetail from "@/assets/sunglasses-detail.jpg";
import { useCart, Product } from "@/context/CartContext";

const products: Product[] = [
  // Armações modernas (5)
  { id: 1, category: "Armação Moderna", name: "Silver Classic", style: "Metal fino • Unissex", tag: "Novo", images: [framesImg, framesDetail], material: "Metal fino", gender: "Unissex", description: "Design clean e atemporal em metal fino." },
  { id: 2, category: "Armação Moderna", name: "Quadrado Titanium", style: "Titanium • Masculino", tag: "Destaque", images: [framesImg, framesDetail], material: "Titanium", gender: "Masculino", description: "Formato quadrado com hastes de titanium de alta resistência." },
  { id: 3, category: "Armação Moderna", name: "Oval Elegance", style: "Aço inox • Feminino", tag: null, images: [framesImg, framesDetail], material: "Aço inox", gender: "Feminino", description: "Linhas suaves e femininas em aço inoxidável." },
  { id: 4, category: "Armação Moderna", name: "Slim Round", style: "Metal fino • Unissex", tag: "Novo", images: [framesImg, framesDetail], material: "Metal fino", gender: "Unissex", description: "Armação redonda com perfil ultra-slim." },
  { id: 5, category: "Armação Moderna", name: "Executive Pro", style: "Titanium • Masculino", tag: null, images: [framesImg, framesDetail], material: "Titanium", gender: "Masculino", description: "Modelo executivo de alta performance em titanium premium." },
  // Óculos de sol (5)
  { id: 6, category: "Óculos de Sol", name: "Aviator Premium", style: "UV400 • Unissex", tag: "Mais vendido", images: [sunglassesImg, sunglassesDetail], material: "Metal", gender: "Unissex", description: "Clássico Aviator com proteção UV400 completa." },
  { id: 7, category: "Óculos de Sol", name: "Wayfarer Dark", style: "Polarizado • Masculino", tag: null, images: [sunglassesImg, sunglassesDetail], material: "Acetato", gender: "Masculino", description: "Estilo Wayfarer com lentes polarizadas." },
  { id: 8, category: "Óculos de Sol", name: "Cat-Eye Luxe", style: "UV400 • Feminino", tag: "Destaque", images: [sunglassesImg, sunglassesDetail], material: "Acetato", gender: "Feminino", description: "Formato cat-eye sofisticado com acabamento luxuoso." },
  { id: 9, category: "Óculos de Sol", name: "Shield Sport", style: "Espelhado • Unissex", tag: null, images: [sunglassesImg, sunglassesDetail], material: "Policarbonato", gender: "Unissex", description: "Design esportivo com lente única espelhada." },
  { id: 10, category: "Óculos de Sol", name: "Retro Round", style: "Polarizado • Unissex", tag: "Novo", images: [sunglassesImg, sunglassesDetail], material: "Metal + Acetato", gender: "Unissex", description: "Formato redondo retrô com lentes polarizadas." },
];

export default function ProductCarousel() {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const autoplayRef = useRef(Autoplay({ delay: 2800, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [autoplayRef.current]
  );

  const handleAdd = (e: React.MouseEvent, p: Product) => {
    e.preventDefault();
    addItem(p);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  return (
    <section className="py-20 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <div className="text-center">
          <span className="text-primary text-sm tracking-[0.25em] uppercase font-medium">
            Coleção
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Nossos Produtos
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-5 opacity-60" />
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5 pl-4 md:pl-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex-none w-64 md:w-72 group cursor-pointer"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[var(--shadow-gold)] transition-all duration-300">
                {/* Image with hover second photo */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0"
                  />
                  <img
                    src={p.images[1]}
                    alt={`${p.name} detalhe`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-primary text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full border border-primary/30">
                    {p.category === "Armação Moderna" ? "Armação" : "Sol"}
                  </span>
                  {p.tag && (
                    <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] tracking-wide uppercase font-bold px-2.5 py-1 rounded-full">
                      {p.tag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-muted-foreground text-xs tracking-widest uppercase mb-1">
                    {p.category}
                  </p>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {p.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">{p.style}</p>
                  <button
                    onClick={(e) => handleAdd(e, p)}
                    className={`mt-3 w-full py-2 rounded-lg text-xs font-medium border transition-all duration-300 ${
                      justAdded === p.id
                        ? "bg-primary/20 text-primary border-primary/40"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {justAdded === p.id ? "✓ Adicionado" : "+ Carrinho"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {[0, 1].map((i) => (
          <div key={i} className="w-12 h-0.5 rounded-full bg-primary/40" />
        ))}
      </div>
    </section>
  );
}

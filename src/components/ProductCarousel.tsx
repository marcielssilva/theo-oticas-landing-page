import { useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import framesImg from "@/assets/frames-collection.jpg";
import sunglassesImg from "@/assets/sunglasses-collection.jpg";
import { useCart, Product } from "@/context/CartContext";

const products: Product[] = [
  // Armações modernas (5)
  { id: 1, category: "Armação Moderna", name: "Silver Classic", style: "Metal fino • Unissex", tag: "Novo", img: framesImg, material: "Metal fino", gender: "Unissex", description: "Design clean e atemporal em metal fino." },
  { id: 2, category: "Armação Moderna", name: "Quadrado Titanium", style: "Titanium • Masculino", tag: "Destaque", img: framesImg, material: "Titanium", gender: "Masculino", description: "Formato quadrado com hastes de titanium de alta resistência." },
  { id: 3, category: "Armação Moderna", name: "Oval Elegance", style: "Aço inox • Feminino", tag: null, img: framesImg, material: "Aço inox", gender: "Feminino", description: "Linhas suaves e femininas em aço inoxidável." },
  { id: 4, category: "Armação Moderna", name: "Slim Round", style: "Metal fino • Unissex", tag: "Novo", img: framesImg, material: "Metal fino", gender: "Unissex", description: "Armação redonda com perfil ultra-slim." },
  { id: 5, category: "Armação Moderna", name: "Executive Pro", style: "Titanium • Masculino", tag: null, img: framesImg, material: "Titanium", gender: "Masculino", description: "Modelo executivo de alta performance em titanium premium." },
  // Óculos de sol (5)
  { id: 6, category: "Óculos de Sol", name: "Aviator Premium", style: "UV400 • Unissex", tag: "Mais vendido", img: sunglassesImg, material: "Metal", gender: "Unissex", description: "Clássico Aviator com proteção UV400 completa." },
  { id: 7, category: "Óculos de Sol", name: "Wayfarer Dark", style: "Polarizado • Masculino", tag: null, img: sunglassesImg, material: "Acetato", gender: "Masculino", description: "Estilo Wayfarer com lentes polarizadas." },
  { id: 8, category: "Óculos de Sol", name: "Cat-Eye Luxe", style: "UV400 • Feminino", tag: "Destaque", img: sunglassesImg, material: "Acetato", gender: "Feminino", description: "Formato cat-eye sofisticado com acabamento luxuoso." },
  { id: 9, category: "Óculos de Sol", name: "Shield Sport", style: "Espelhado • Unissex", tag: null, img: sunglassesImg, material: "Policarbonato", gender: "Unissex", description: "Design esportivo com lente única espelhada." },
  { id: 10, category: "Óculos de Sol", name: "Retro Round", style: "Polarizado • Unissex", tag: "Novo", img: sunglassesImg, material: "Metal + Acetato", gender: "Unissex", description: "Formato redondo retrô com lentes polarizadas." },
];

const WHATSAPP_URL =
  "https://wa.me/5515996869669?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20um%20produto%20da%20Theo%20%C3%93ticas!";

export default function ProductCarousel() {
  const autoplayRef = useRef(Autoplay({ delay: 2800, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [autoplayRef.current]
  );

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
            <a
              key={p.id}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none w-64 md:w-72 group cursor-pointer"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[var(--shadow-gold)] transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-primary text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full border border-primary/30">
                    {p.category === "Armação Moderna" ? "Armação" : "Sol"}
                  </span>
                  {/* Tag badge */}
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
                  <div className="mt-3 flex items-center gap-1.5 text-primary text-xs font-medium">
                    <span>Consultar preço</span>
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current" aria-hidden>
                      <path d="M3.5 8a.5.5 0 0 1 .5-.5h6.293L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="w-12 h-0.5 rounded-full bg-primary/40"
          />
        ))}
      </div>
    </section>
  );
}

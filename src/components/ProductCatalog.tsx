import { useState } from "react";
import { ShoppingBag, Search } from "lucide-react";
import framesImg from "@/assets/frames-collection.jpg";
import framesDetail from "@/assets/frames-detail.jpg";
import sunglassesImg from "@/assets/sunglasses-collection.jpg";
import sunglassesDetail from "@/assets/sunglasses-detail.jpg";
import { Product } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import ProductModal from "./ProductModal";
import CartDrawer from "./CartDrawer";

const allProducts: Product[] = [
  // Armações modernas (5)
  {
    id: 1, category: "Armação Moderna", name: "Silver Classic", style: "Metal fino • Unissex", tag: "Novo",
    images: [framesImg, framesDetail], material: "Metal fino", gender: "Unissex",
    description: "Design clean e atemporal em metal fino. Armação leve e versátil, perfeita para o dia a dia no escritório ou passeio. Disponível em diferentes tamanhos de lentes.",
  },
  {
    id: 2, category: "Armação Moderna", name: "Quadrado Titanium", style: "Titanium • Masculino", tag: "Destaque",
    images: [framesImg, framesDetail], material: "Titanium", gender: "Masculino",
    description: "Formato quadrado com hastes de titanium de alta resistência. Extremamente leve e durável, ideal para quem busca robustez sem abrir mão do estilo.",
  },
  {
    id: 3, category: "Armação Moderna", name: "Oval Elegance", style: "Aço inox • Feminino", tag: null,
    images: [framesImg, framesDetail], material: "Aço inox", gender: "Feminino",
    description: "Linhas suaves e femininas em aço inoxidável de alta qualidade. Moldura oval que valoriza os traços do rosto e confere um visual delicado e refinado.",
  },
  {
    id: 4, category: "Armação Moderna", name: "Slim Round", style: "Metal fino • Unissex", tag: "Novo",
    images: [framesImg, framesDetail], material: "Metal fino", gender: "Unissex",
    description: "Armação redonda com perfil ultra-slim, inspirada no estilo retrô contemporâneo. Combina com diferentes estilos de vestimenta e personalidades.",
  },
  {
    id: 5, category: "Armação Moderna", name: "Executive Pro", style: "Titanium • Masculino", tag: null,
    images: [framesImg, framesDetail], material: "Titanium", gender: "Masculino",
    description: "Modelo executivo de alta performance em titanium premium. Indicado para profissionais que precisam de conforto durante longas jornadas de uso.",
  },
  // Óculos de sol (5)
  {
    id: 6, category: "Óculos de Sol", name: "Aviator Premium", style: "UV400 • Unissex", tag: "Mais vendido",
    images: [sunglassesImg, sunglassesDetail], material: "Metal", gender: "Unissex",
    description: "Clássico Aviator com proteção UV400 completa. Um ícone do design que nunca sai de moda. Lentes de alta clareza com tratamento anti-reflexo.",
  },
  {
    id: 7, category: "Óculos de Sol", name: "Wayfarer Dark", style: "Polarizado • Masculino", tag: null,
    images: [sunglassesImg, sunglassesDetail], material: "Acetato", gender: "Masculino",
    description: "Estilo Wayfarer clássico com lentes polarizadas para redução máxima de reflexos. Ideal para direção e atividades ao ar livre com conforto visual superior.",
  },
  {
    id: 8, category: "Óculos de Sol", name: "Cat-Eye Luxe", style: "UV400 • Feminino", tag: "Destaque",
    images: [sunglassesImg, sunglassesDetail], material: "Acetato", gender: "Feminino",
    description: "Formato cat-eye sofisticado com acabamento luxuoso. Realça os traços femininos e adiciona glamour a qualquer produção. Proteção UV400.",
  },
  {
    id: 9, category: "Óculos de Sol", name: "Shield Sport", style: "Espelhado • Unissex", tag: null,
    images: [sunglassesImg, sunglassesDetail], material: "Policarbonato", gender: "Unissex",
    description: "Design esportivo com lente única espelhada de alta resistência. Proteção total contra raios UV e impactos. Indicado para esportes e atividades intensas.",
  },
  {
    id: 10, category: "Óculos de Sol", name: "Retro Round", style: "Polarizado • Unissex", tag: "Novo",
    images: [sunglassesImg, sunglassesDetail], material: "Metal + Acetato", gender: "Unissex",
    description: "Formato redondo retrô com lentes polarizadas e armação mista em metal e acetato. Um modelo cheio de personalidade que combina com estilo vintage e moderno.",
  },
];

const FILTERS = ["Todos", "Armação Moderna", "Óculos de Sol"];

export default function ProductCatalog() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem, totalItems } = useCart();
  const [justAdded, setJustAdded] = useState<number | null>(null);

  const filtered = allProducts.filter((p) => {
    const matchCat = filter === "Todos" || p.category === filter;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    addItem(p);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  return (
    <>
      <section id="catalogo" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-primary text-sm tracking-[0.25em] uppercase font-medium">
                Catálogo
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Todos os Produtos
              </h2>
              <div className="w-16 h-0.5 bg-primary mt-4 opacity-60" />
            </div>

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors self-start md:self-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Filters + Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 w-full sm:w-56 transition-colors"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelected(p)}
                className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[var(--shadow-gold)] transition-all duration-300"
              >
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
                  <span className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-primary text-[9px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded-full border border-primary/30">
                    {p.category === "Armação Moderna" ? "Armação" : "Sol"}
                  </span>
                  {p.tag && (
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[9px] tracking-wide uppercase font-bold px-2 py-0.5 rounded-full">
                      {p.tag}
                    </span>
                  )}
                  {/* Hover hint */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <span className="text-foreground text-xs font-medium bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border">
                      Ver detalhes
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="font-display text-sm font-semibold text-foreground leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5">{p.style}</p>
                  <button
                    onClick={(e) => handleAdd(e, p)}
                    className={`mt-2.5 w-full py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border ${
                      justAdded === p.id
                        ? "bg-primary/20 text-primary border-primary/40"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {justAdded === p.id ? "✓ Adicionado" : "+ Carrinho"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      </section>

      {/* Product modal */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

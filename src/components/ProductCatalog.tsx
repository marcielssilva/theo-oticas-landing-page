import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { filterProducts, PRODUCT_CATEGORIES, products, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { cn } from "@/lib/utils";

const FILTERS = ["Todos", ...PRODUCT_CATEGORIES] as const;

export default function ProductCatalog() {
  const [category, setCategory] = useState<string>("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const { addItem } = useCart();
  const feedbackTimer = useRef<number>();

  // Não refiltra a lista a cada tecla digitada.
  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(
    () => filterProducts(products, { category, search: debouncedSearch }),
    [category, debouncedSearch],
  );

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

  const hasActiveFilters = category !== "Todos" || search.length > 0;

  const resetFilters = () => {
    setCategory("Todos");
    setSearch("");
  };

  return (
    <>
      <section id="catalogo" className="section bg-background">
        <div className="container">
          <header className="mb-10 flex flex-col gap-4">
            <p className="eyebrow">Catálogo</p>
            <h1 className="font-display text-display-lg font-bold text-foreground">
              Todos os modelos
            </h1>
            <span className="rule" aria-hidden />
            <p className="measure text-muted-foreground text-lead">
              Escolha os modelos que gostou, adicione ao carrinho e envie a lista pelo WhatsApp.
              A gente responde com disponibilidade e valores.
            </p>
          </header>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div
              className="flex items-center gap-1 overflow-x-auto"
              role="group"
              aria-label="Filtrar por categoria"
            >
              <SlidersHorizontal
                className="mr-1.5 hidden h-4 w-4 shrink-0 text-muted-foreground sm:block"
                aria-hidden
              />
              {FILTERS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  aria-pressed={category === option}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    category === option
                      ? "bg-brand text-brand-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="relative sm:ml-auto sm:w-64">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <label htmlFor="busca-produto" className="sr-only">
                Buscar produto
              </label>
              <input
                id="busca-produto"
                type="search"
                placeholder="Buscar por nome ou material"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-full border border-border bg-secondary py-2.5 pl-9 pr-9 text-sm
                           text-foreground transition-colors placeholder:text-muted-foreground
                           focus:border-brand/50"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Limpar busca"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              )}
            </div>
          </div>

          {/* Leitores de tela precisam saber que a lista mudou. */}
          <p aria-live="polite" className="mb-5 text-sm text-muted-foreground">
            {filtered.length === 0
              ? "Nenhum modelo encontrado"
              : `${filtered.length} ${filtered.length === 1 ? "modelo" : "modelos"}`}
            {hasActiveFilters && (
              <>
                {" · "}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-medium text-brand hover:underline"
                >
                  limpar filtros
                </button>
              </>
            )}
          </p>

          {filtered.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((product, index) => (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    size="sm"
                    onSelect={setSelected}
                    onAdd={handleAdd}
                    justAdded={justAdded === product.id}
                    priority={index < 4}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="card-surface flex flex-col items-center gap-4 px-6 py-16 text-center">
              <p className="font-display text-xl text-foreground">
                Não achamos nada com esses filtros
              </p>
              <p className="measure text-sm text-muted-foreground">
                Tente outro termo ou veja a coleção inteira — o estoque da loja é maior do que o
                site mostra.
              </p>
              <button type="button" onClick={resetFilters} className="btn-outline btn-md">
                Ver todos os modelos
              </button>
            </div>
          )}
        </div>
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}

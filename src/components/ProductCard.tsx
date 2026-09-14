import { Check, Plus } from "lucide-react";
import { CATEGORY_SHORT_LABEL, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Card único usado no carrossel e na grade do catálogo.
 *
 * Antes existiam duas versões quase idênticas, e o card inteiro era uma <div>
 * com onClick: não dava para abrir o produto pelo teclado nem pelo leitor de
 * tela. Aqui a área da foto é um <button> de verdade e o "adicionar" é outro
 * botão irmão, sem interativo dentro de interativo.
 */

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  onAdd: (product: Product) => void;
  justAdded?: boolean;
  size?: "sm" | "md";
  /** A primeira imagem visível não deve ser lazy — atrapalha o LCP. */
  priority?: boolean;
}

export default function ProductCard({
  product,
  onSelect,
  onAdd,
  justAdded = false,
  size = "md",
  priority = false,
}: ProductCardProps) {
  const compact = size === "sm";

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card
                 shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-smooth
                 hover:-translate-y-1 hover:border-brand/45 hover:shadow-lifted
                 focus-within:border-brand/45"
    >
      <button
        type="button"
        onClick={() => onSelect?.(product)}
        className="relative block aspect-square w-full overflow-hidden bg-secondary/40 text-left"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={640}
          height={640}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-smooth
                     group-hover:scale-[1.04] group-hover:opacity-0"
        />
        <img
          src={product.images[1] ?? product.images[0]}
          alt=""
          loading="lazy"
          decoding="async"
          width={640}
          height={640}
          className="h-full w-full object-cover opacity-0 transition-all duration-500 ease-smooth
                     group-hover:scale-[1.04] group-hover:opacity-100"
        />

        <span
          className={cn(
            "absolute left-3 top-3 rounded-full border border-brand/30 bg-background/80 px-2.5 py-1",
            "text-[10px] font-semibold uppercase tracking-[0.16em] text-brand backdrop-blur-sm",
          )}
        >
          {CATEGORY_SHORT_LABEL[product.category]}
        </span>

        {product.tag && (
          <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-foreground">
            {product.tag}
          </span>
        )}

        {onSelect && (
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-background/85 px-4 py-2.5
                       text-center text-xs font-medium text-foreground backdrop-blur-sm transition-transform
                       duration-300 ease-smooth group-hover:translate-y-0 group-focus-within:translate-y-0"
          >
            Ver detalhes
          </span>
        )}
      </button>

      <div className={cn("flex flex-1 flex-col", compact ? "p-3.5" : "p-4")}>
        <h3
          className={cn(
            "font-display font-semibold leading-snug text-foreground",
            compact ? "text-sm" : "text-base",
          )}
        >
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{product.style}</p>

        <button
          type="button"
          onClick={() => onAdd(product)}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          className={cn(
            "mt-auto flex items-center justify-center gap-1.5 rounded-lg border pt-2 pb-2 text-xs font-medium",
            "transition-colors duration-200",
            compact ? "mt-3" : "mt-4",
            justAdded
              ? "border-brand/40 bg-brand/15 text-brand"
              : "border-border bg-transparent text-muted-foreground hover:border-brand/50 hover:bg-brand/5 hover:text-brand",
          )}
        >
          {justAdded ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden />
              No carrinho
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Adicionar
            </>
          )}
        </button>
      </div>
    </article>
  );
}

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useDialog } from "@/hooks/useDialog";
import { EXTERNAL_LINK_PROPS } from "@/config/site";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, clearCart, totalItems, whatsappUrl } = useCart();
  const dialogRef = useDialog<HTMLElement>(open, onClose);

  // Antes o painel ficava sempre montado, só deslocado para fora da tela:
  // os botões continuavam no fluxo de Tab e visíveis para leitores de tela.
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 animate-fade-in bg-background/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="carrinho-titulo"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border
                   bg-card shadow-lifted motion-safe:animate-slide-in-right"
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 id="carrinho-titulo" className="flex items-center gap-2 font-display text-lg font-semibold">
            <ShoppingBag className="h-5 w-5 text-brand" aria-hidden />
            Seu pedido
            {totalItems > 0 && (
              <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-brand-foreground">
                {totalItems}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="h-14 w-14 text-muted-foreground/25" aria-hidden />
              <p className="font-display text-lg text-foreground">Nada por aqui ainda</p>
              <p className="max-w-[26ch] text-sm text-muted-foreground">
                Monte sua lista com os modelos que gostou e mande tudo de uma vez pelo WhatsApp.
              </p>
              <Link to="/catalogo" onClick={onClose} className="btn-outline btn-md">
                Ver o catálogo
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-border bg-secondary/30 p-3"
                >
                  <img
                    src={item.images[0]}
                    alt=""
                    loading="lazy"
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </p>
                    <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.style}</p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <QuantityButton
                        label={`Diminuir quantidade de ${item.name}`}
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" aria-hidden />
                      </QuantityButton>

                      <span
                        className="w-5 text-center text-sm font-medium text-foreground"
                        aria-label={`Quantidade: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>

                      <QuantityButton
                        label={`Aumentar quantidade de ${item.name}`}
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" aria-hidden />
                      </QuantityButton>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remover ${item.name}`}
                        className="ml-auto p-1 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="space-y-3 border-t border-border px-6 py-5">
            <p className="text-center text-xs text-muted-foreground">
              Você envia a lista e a gente responde com disponibilidade e valores.
            </p>

            <a
              href={whatsappUrl}
              {...EXTERNAL_LINK_PROPS}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5
                         font-semibold text-brand-foreground transition-colors hover:bg-brand-light"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Enviar pedido pelo WhatsApp
            </a>

            <button
              type="button"
              onClick={clearCart}
              className="w-full rounded-xl py-2.5 text-sm text-muted-foreground transition-colors
                         hover:bg-secondary/60 hover:text-foreground"
            >
              Esvaziar carrinho
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}

function QuantityButton({
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
      className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-foreground
                 transition-colors hover:bg-brand hover:text-brand-foreground"
    >
      {children}
    </button>
  );
}

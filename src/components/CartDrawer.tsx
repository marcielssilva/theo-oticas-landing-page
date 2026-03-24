import { useState } from "react";
import { X, ShoppingBag, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQty, clearCart, totalItems, whatsappUrl } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-card border-l border-border flex flex-col shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="font-display text-lg font-semibold text-foreground">
              Carrinho
            </span>
            {totalItems > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
              <p className="text-muted-foreground text-sm">
                Seu carrinho está vazio.
              </p>
              <p className="text-muted-foreground/60 text-xs">
                Explore nosso catálogo e adicione produtos!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-secondary/40 rounded-xl border border-border"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider truncate">
                    {item.category}
                  </p>
                  <p className="font-semibold text-foreground text-sm truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.style}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-5 text-center text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-3">
            <p className="text-xs text-muted-foreground text-center">
              {totalItems} {totalItems === 1 ? "produto" : "produtos"} selecionado{totalItems !== 1 ? "s" : ""}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir via WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

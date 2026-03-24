import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  category: string;
  name: string;
  style: string;
  tag: string | null;
  images: string[];
  description: string;
  material: string;
  gender: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  whatsappUrl: string;
}

const CartContext = createContext<CartContextType | null>(null);

const BASE_WA = "5515996869669";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const whatsappUrl = () => {
    if (items.length === 0) return `https://wa.me/${BASE_WA}`;
    const lines = items.map(
      (i) => `• ${i.quantity}x ${i.name} (${i.category})`
    );
    const msg =
      `Olá! Tenho interesse nos seguintes produtos da Theo Óticas:\n\n` +
      lines.join("\n") +
      `\n\nPoderia me passar mais informações e valores?`;
    return `https://wa.me/${BASE_WA}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, whatsappUrl: whatsappUrl() }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

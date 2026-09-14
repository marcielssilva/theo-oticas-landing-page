import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { siteConfig, whatsappLink } from "@/config/site";
import type { Product } from "@/data/products";

export type { Product };

export interface CartItem extends Product {
  quantity: number;
}

const STORAGE_KEY = "theo-cart";
const MAX_QUANTITY = 20;

type CartAction =
  | { type: "add"; product: Product; quantity: number }
  | { type: "remove"; id: number }
  | { type: "setQuantity"; id: number; quantity: number }
  | { type: "clear" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((item) => item.id === action.product.id);
      if (!existing) {
        return [...state, { ...action.product, quantity: action.quantity }];
      }
      return state.map((item) =>
        item.id === action.product.id
          ? { ...item, quantity: Math.min(item.quantity + action.quantity, MAX_QUANTITY) }
          : item,
      );
    }

    case "remove":
      return state.filter((item) => item.id !== action.id);

    case "setQuantity":
      if (action.quantity <= 0) return state.filter((item) => item.id !== action.id);
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Math.min(action.quantity, MAX_QUANTITY) }
          : item,
      );

    case "clear":
      return [];

    default:
      return state;
  }
}

/** Lê o carrinho salvo. Qualquer falha (modo privado, JSON corrompido) vira carrinho vazio. */
function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).id === "number" &&
        typeof (item as CartItem).quantity === "number",
    );
  } catch {
    return [];
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isInCart: (id: number) => boolean;
  /** Link do WhatsApp já com o pedido montado. */
  whatsappUrl: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [], readStoredCart);

  // Persiste o carrinho: antes o cliente perdia tudo ao atualizar a página.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* cota cheia ou navegação privada — o carrinho segue funcionando em memória */
    }
  }, [items]);

  const addItem = useCallback(
    (product: Product, quantity = 1) => dispatch({ type: "add", product, quantity }),
    [],
  );
  const removeItem = useCallback((id: number) => dispatch({ type: "remove", id }), []);
  const updateQty = useCallback(
    (id: number, quantity: number) => dispatch({ type: "setQuantity", id, quantity }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const isInCart = useCallback((id: number) => items.some((item) => item.id === id), [items]);

  const whatsappUrl = useMemo(() => {
    if (items.length === 0) return whatsappLink();

    const lines = items.map((item) => `• ${item.quantity}x ${item.name} (${item.category})`);
    const message = [
      `Olá! Tenho interesse nos seguintes produtos da ${siteConfig.name}:`,
      "",
      ...lines,
      "",
      "Poderia me passar disponibilidade e valores?",
    ].join("\n");

    return whatsappLink(message);
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      totalItems,
      isInCart,
      whatsappUrl,
    }),
    [items, addItem, removeItem, updateQty, clearCart, totalItems, isInCart, whatsappUrl],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de <CartProvider>.");
  return context;
}

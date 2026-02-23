"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { CartItem, WooProduct, WooProductVariation } from "@/types/woocommerce";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: WooProduct; quantity: number; variation?: WooProductVariation; selectedAttributes?: Record<string, string> } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

function generateCartItemId(productId: number, attributes?: Record<string, string>): string {
  if (!attributes || Object.keys(attributes).length === 0) return String(productId);
  const attrStr = Object.entries(attributes).sort().map(([k, v]) => `${k}:${v}`).join("|");
  return `${productId}-${attrStr}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, variation, selectedAttributes } = action.payload;
      const id = generateCartItemId(product.id, selectedAttributes);
      const existingIndex = state.items.findIndex((item) => item.id === id);

      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { id, product, quantity, variation, selectedAttributes }],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "LOAD_CART":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (product: WooProduct, quantity?: number, variation?: WooProductVariation, attributes?: Record<string, string>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("teohome-cart");
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        dispatch({ type: "LOAD_CART", payload: items });
      }
    } catch {}
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("teohome-cart", JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => {
    const price = item.variation
      ? parseFloat(item.variation.price || "0")
      : parseFloat(item.product.price || "0");
    return sum + price * item.quantity;
  }, 0);

  const addItem = (
    product: WooProduct,
    quantity = 1,
    variation?: WooProductVariation,
    attributes?: Record<string, string>
  ) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, quantity, variation, selectedAttributes: attributes },
    });
  };

  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

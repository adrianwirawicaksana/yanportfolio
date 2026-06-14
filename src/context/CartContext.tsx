"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// 1. Import tipe dasar (misal namanya Pokemon/Product, atau tetep CartItem)
import type { CartItem as BaseCartItem } from "@/src/types";

// 2. Bikin tipe baru khusus buat Item di dalam Cart yang punya quantity
interface CartItem extends BaseCartItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  // Di sini kita omit quantity karena pas add ke cart, user gak ngirim quantity (otomatis 1)
  addToCart: (item: BaseCartItem) => void; 
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);

  // Load cart data from localStorage on mount (client-side only)
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("pokemon_cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
  }, []);

  // Auto-save to localStorage on changes (only if mounted)
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("pokemon_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      
      // Don't add duplicates, just return current state
      if (existing) {
        return prev; 
      }
      
      // Add new item with quantity 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Remove if quantity becomes 0
    );
  };

  const clearCart = () => setCartItems([]);

  // Calculate total items and price
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider!");
  return context;
};

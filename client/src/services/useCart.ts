import { useEffect, useState } from "react";
import type { CartItem } from "../types/cartItem";

interface UseCartReturn {
  cartItems: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeJewelry: (id: number) => void;
  calculateTotal: () => number;
}

export const useCart = (): UseCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.map((item: CartItem) => ({
      ...item,
      price: item.price || 0,
      quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeJewelry = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return { cartItems, updateQuantity, removeJewelry, calculateTotal };
};

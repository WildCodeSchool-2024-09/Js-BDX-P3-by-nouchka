import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../types/cartItem";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

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

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div>
      <h1>Votre Panier</h1>

      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <img src={item.URL} alt={item.name} width={100} height={100} />
          <p>{item.price} €</p>

          <div>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>Quantité: {item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button type="button" onClick={() => removeJewelry(item.id)}>
            Supprimer
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => navigate("/checkout")}
        disabled={cartItems.length === 0}
      >
        Valider mon panier
      </button>
    </div>
  );
}

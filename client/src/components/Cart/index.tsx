import "./style.css";

import { useEffect, useState } from "react";
import type { Jewelry } from "../../types/Product_shop";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Jewelry[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);
  function deleteProduct(id: number): void {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }
  return (
    <>
      <h1 className="cart">Articles</h1>
      {cartItems.map((item) => (
        <section className="cartProduct" key={item.id}>
          <h2 className="productTitle">{item.name}</h2>
          <img className="productImage" src={item.URL} alt={item.name} />
          <p className="">{item.price} €</p>
          <p>Quantité: {item.quantity}</p>
          <button
            type="button"
            className="garbageButton"
            onClick={() => deleteProduct(item.id)}
          >
            <img
              src="../src/assets/garbage/garbage.svg"
              alt="poubelle"
              className="garbage-img"
            />
          </button>
        </section>
      ))}
    </>
  );
}

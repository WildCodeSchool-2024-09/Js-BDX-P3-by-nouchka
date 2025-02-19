import { useNavigate } from "react-router-dom";
import { useCart } from "../../services/useCart";
import { CartItemComponent } from "./CartItem";
import "./style.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeJewelry, calculateTotal } =
    useCart();

  return (
    <section className="block-cart">
      <h2 className="cartTitle">Votre Panier</h2>

      {cartItems.map((item) => (
        <CartItemComponent
          key={item.id}
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeJewelry}
        />
      ))}

      <article className="cart-total">
        <h3>Total: {calculateTotal().toFixed(2)} €</h3>
      </article>

      <button
        className="validate-cart"
        type="button"
        onClick={() => navigate("/checkout")}
        disabled={cartItems.length === 0}
      >
        Valider mon panier
      </button>
    </section>
  );
}

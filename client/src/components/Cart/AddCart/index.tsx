import { useNavigate } from "react-router-dom";
import { Jewelry } from "../../../types/Product_shop";
import "../../Product/style.css";

export default function AddCart({ data }: { data: Jewelry }) {
  const navigate = useNavigate();

  function handleAddToCart(data: Jewelry): void {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (data) {
      const existingProduct: Jewelry | undefined = cart.find(
        (item: Jewelry) => item.id === data.id,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...data, quantity: 1 });
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/shop");
  }

  return (
    <button
      type="button"
      className="buttonProduct"
      onClick={() => handleAddToCart(data)}
    >
      Ajouter au panier
    </button>
  );
}

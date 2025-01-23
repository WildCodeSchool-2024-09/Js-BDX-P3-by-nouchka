import "../Product/style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Jewelry } from "../../types/Product_shop";

export default function Product() {
  const navigate = useNavigate();
  const [data, setData] = useState<Jewelry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jewelry`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!data.length) return <p>Aucun bijou trouvé.</p>;
  function handleAddToCart(): void {
    if (data.length === 0) return;

    const productToAdd: Jewelry = {
      id: data[0].id,
      name: data[0].name,
      price: data[0].price,
      quantity: 1,
      type: data[0].type,
      description: data[0].description,
      URL: data[0].URL,
    };

    const cart: Jewelry[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find(
      (Jewelry) => Jewelry.id === productToAdd.id,
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(productToAdd);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/shop");
  }

  return (
    <section className="Product">
      <img
        className="imgProduct"
        src={`${import.meta.env.VITE_API_URL}/${data[0].URL}`}
        alt={data[0].name}
      />

      <h2 className="titleProduct">{data[0].name}</h2>
      <p className="typeProduct">{data[0].type}</p>
      <p className="descriptionProduct">{data[0].description}</p>
      <p className="priceProduct">{data[0].price} €</p>

      <button type="button" className="buttonProduct" onClick={handleAddToCart}>
        Ajouter au panier
      </button>
    </section>
  );
}

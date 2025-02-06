import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Déclaration du type pour l'item du panier
type Jewelry = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  URL: string;
};

export default function Shop() {
  const [jewelryItems, setJewelryItems] = useState<Jewelry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchJewelryItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jewelry`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Impossible de récupérer les produits");
        }
        const data = await response.json();
        setJewelryItems(data);
        console.info(data);
      } catch (error) {
        setError("Erreur lors du chargement des produits.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJewelryItems();
  }, []);

  // Fonction pour ajouter un produit au panier
  const addToCart = (item: Jewelry) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Vérifier si l'élément est déjà dans le panier
    const existingItem = cart.find(
      (cartItem: Jewelry) => cartItem.id === item.id,
    );

    if (existingItem) {
      existingItem.quantity += 1; // Augmenter la quantité si l'item est déjà dans le panier
    } else {
      cart.push(item); // Ajouter l'item si ce n'est pas déjà dans le panier
    }

    // Sauvegarder le panier dans localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} ajouté au panier`);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Shop</h1>
      <div className="shop-items">
        {jewelryItems.map((item) => (
          <div key={item.id} className="shop-item">
            <img src={item.URL} alt={item.name} className="item-image" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price} €</p>
            <button type="button" onClick={() => addToCart(item)}>
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => navigate("/cart")}>
        Voir mon panier
      </button>
    </div>
  );
}

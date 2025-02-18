import { useEffect, useState } from "react";
import type { Jewelry } from "../../types/jewelry";
import Card from "../Carousel/card";
import "./style.css";
import "../Register/style.css";

export default function LikedJewelry() {
  const [likedJewelry, setLikedJewelry] = useState<Jewelry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLikedJewelry();
  }, []);

  const fetchLikedJewelry = async () => {
    const clientId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/${clientId}/likes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setLikedJewelry(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p className="loading">Chargement...</p>;
  }

  return (
    <section className="likedJewelry">
      <h3 className="favoriteJewelry">Mes bijoux favoris 🩷</h3>
      {likedJewelry.map((jewelry) => {
        const fullUrl = jewelry.URL
          ? `${import.meta.env.VITE_API_URL}/${jewelry.URL}`
          : "";

        return (
          <div key={jewelry.id} className="relative">
            <Card
              figureClass="cardDesktop"
              imgClass="imgDesktop"
              url={fullUrl}
              name={jewelry.name}
              item={{ id: jewelry.id }}
            />
          </div>
        );
      })}
    </section>
  );
}

import "../../App.css";
import { useEffect, useState } from "react";
import SwiperCaroussel from "../../components/Carousel/swiper";
import "./style.css";
import Description from "../../pages/Upcycling/description";

interface UpcyclingData {
  url_illustration: string;
  description: string;
}

export default function Upcycling() {
  const [data, setData] = useState<UpcyclingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/upcycling`,
      );
      if (response.ok) {
        const result: UpcyclingData = await response.json();
        setData(result);
      } else {
        setError("Erreur lors de la récupération des données.");
      }
      setLoading(false);
    };

    fetchData().catch(() => {
      setError("Erreur lors de la récupération des données.");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Une erreur est survenue lors du chargement des données.</p>;
  }

  return (
    <>
      <h2 className="title-upcycling">Upcycling</h2>
      <article className="upcycling-story">
        <img
          src={`${import.meta.env.VITE_API_URL}/${data?.url_illustration}`}
          alt=""
        />
        <Description text={data?.description || ""} />
      </article>
      <SwiperCaroussel type="upcycling" itemsToShow={3} />
    </>
  );
}

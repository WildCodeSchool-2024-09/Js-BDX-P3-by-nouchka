import "./style.css";
import { useEffect, useState } from "react";
import EventList from "../../components/Event/EventList";

interface AboutData {
  url_illustration: string;
  description: string;
}

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3310/api/pages/about");
      if (response.ok) {
        const result: AboutData = await response.json();
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
      <h1 className="title-about-section">À propos de by.Nouchka</h1>
      <section className="about-section">
        <h2 className="title-concept">Le concept</h2>
        <img
          className="img-about"
          src={`${import.meta.env.VITE_API_URL}/${data?.url_illustration}`}
          alt=""
        />
        <p>{data?.description}</p>
      </section>
      <EventList />
    </>
  );
}

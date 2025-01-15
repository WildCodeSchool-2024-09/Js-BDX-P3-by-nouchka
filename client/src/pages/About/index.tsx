import "./style.css";
import { useEffect, useState } from "react";
import EventList from "../../components/Event/EventList";

interface AboutData {
  url: string;
  description: string;
}

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/about");
        if (!response.ok) throw new Error();

        const result: AboutData = await response.json();
        setData(result);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <h2 className="title-concept">Le concept</h2>
      <section className="about-section">
        <img
          className="img-about"
          src={data?.url}
          alt="concept de by.Nouchka"
        />
        <p>{data?.description}</p>
      </section>
      <EventList />
    </>
  );
}

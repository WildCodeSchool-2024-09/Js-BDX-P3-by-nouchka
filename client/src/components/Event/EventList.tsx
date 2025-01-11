import { useEffect, useState } from "react";
import type { EventData } from "../../types/EventData";
import EventItem from "./EventItem";
import "./style.css";

export default function EventList() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/events")
      .then((response) => response.json())
      .then((data: EventData[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des événements :", err);
        setError("Erreur lors de la récupération des données");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="event-section">
      <h2 className="title-event-section">À venir</h2>
      <div className="event-list">
        {events.map((event, index) => (
          <article
            key={event.id}
            className={`event ${index % 2 === 1 ? "event-reverse" : ""}`}
          >
            <EventItem event={event} />
          </article>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import type { EventData } from "../../types/EventData";
import EventItem from "./EventItem";
import "./style.css";

export default function EventList() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/events");
        const data: EventData[] = await response.json();
        const uniqueEvents = Array.from(
          new Map(data.map((event) => [event.id, event])).values(),
        );
        setEvents(uniqueEvents);
      } catch (err) {
        setError("Erreur lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="event-section">
      <h2 className="title-event-section">Où me trouver ?</h2>
      {events.map((event, index) => (
        <EventItem
          event={event}
          key={event.id}
          className={`event-item ${index % 2 === 1 ? "event-reverse" : ""}`}
        />
      ))}
    </section>
  );
}

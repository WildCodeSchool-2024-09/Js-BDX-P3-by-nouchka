import "./style.css";
import type { EventData } from "../../types/EventData";

interface EventItemProps {
  event: EventData;
  className: string;
}

export default function EventItem({ event, className }: EventItemProps) {
  return (
    <article className={`event-item ${className}`}>
      <img
        className="img-event"
        src={`${import.meta.env.VITE_API_URL}/${event.URL}`}
        alt=""
      />
      <section className="event-details">
        <h3 className="event-name">{event.name}</h3>
        <p className="event-location">{event.location}</p>
        <p className="event-date">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="event-description">{event.description}</p>
      </section>
    </article>
  );
}

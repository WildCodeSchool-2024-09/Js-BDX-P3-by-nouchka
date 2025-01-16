import "./style.css";
import type { EventData } from "../../types/EventData";

interface EventItemProps {
  event: EventData;
}

export default function EventItem({ event }: EventItemProps) {
  return (
    <article className="event-content">
      <img className="img-event" src={event.url} alt="évènement by.Nouchka" />
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

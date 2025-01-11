import "./style.css";

export default function Event() {
  return (
    <section className="event-section">
      <h2 className="title-event-section">À venir</h2>
      <img
        className="img-event"
        src="../src/assets/images/IMG_4417.png"
        alt="stand by.Nouchka"
      />
      <article className="event">
        <p>nom de l'évènement</p>
        <p>Lieu</p> <p>date</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </article>
    </section>
  );
}

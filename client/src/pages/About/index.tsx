import "./style.css";

export default function About() {
  return (
    <>
      <section className="about-section">
        <h2 className="title-about-section">À propos de by.Nouchka</h2>
        <img
          className="img-about"
          src="../src/assets/images/IMG_3890.png"
          alt="atelier de by.Nouchka"
        />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
          molestiae sed, nobis laboriosam ut vero tempore nihil nostrum dolore
          reprehenderit? Nesciunt ad dolorem praesentium quibusdam placeat
          recusandae ratione voluptatibus impedit.
        </p>
      </section>
      <section className="event-section">
        <h2 className="title-event-section">À venir</h2>
        <img
          className="img-event1"
          src="../src/assets/images/IMG_4417.png"
          alt="stand by.Nouchka"
        />
        <article className="event1">
          <p>Lieu</p> <p>date</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        </article>
        <img
          className="img-event2"
          src="../src/assets/images/IMG_4417.png"
          alt="stand by.Nouchka"
        />
        <article className="event2">
          <p>Lieu</p> <p>date</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        </article>
      </section>
    </>
  );
}

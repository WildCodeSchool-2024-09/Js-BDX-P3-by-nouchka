import "./style.css";
import EventList from "../../components/Event/EventList";

export default function About() {
  return (
    <>
      <h1 className="title-about-section">À propos de by.Nouchka</h1>
      <h2 className="title-concept">Le concept</h2>
      <section className="about-section">
        <img
          className="img-about"
          src="../src/assets/images/IMG_3890.png"
          alt="atelier de by.Nouchka"
        />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
          molestiae sed, nobis laboriosam ut vero tempore nihil nostrum dolore
          reprehenderit?
        </p>
      </section>
      <EventList />
    </>
  );
}

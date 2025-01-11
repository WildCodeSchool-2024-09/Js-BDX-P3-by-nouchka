import "./style.css";
import Event from "../../components/Event";

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
          reprehenderit?
        </p>
      </section>
      <Event />
    </>
  );
}

import "./style.css";
import { images } from "../Carousel";

export default function DesktopCard() {
  return (
    <>
      {images.map((image) => (
        <figure key={image.id} className="cardCarousel">
          <img className="imgCarousel" src={image.src} alt={image.alt} />
          <figcaption>Bijoux du moment</figcaption>
        </figure>
      ))}
    </>
  );
}

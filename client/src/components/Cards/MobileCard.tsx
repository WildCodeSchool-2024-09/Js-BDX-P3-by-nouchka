import "./style.css";

export default function MobileCard({
  imageSrc,
}: { imageSrc: { src: string; alt: string } }) {
  return (
    <figure className="cardCarousel">
      <img className="imgCarousel" src={imageSrc.src} alt={imageSrc.alt} />
      <figcaption>{imageSrc.alt}</figcaption>
    </figure>
  );
}

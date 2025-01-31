import { Link } from "react-router-dom";
interface CardProps {
  url: string;
  name: string;
  figureClass: string;
  imgClass?: string;
  caption?: string;
  item: { id: number };
}
function Card({ url, name, figureClass, imgClass, caption, item }: CardProps) {
  return (
    <figure className={figureClass}>
      <Link className="productLink" to={`/jewelry/${item.id}`}>
        <img
          className={imgClass}
          src={url}
          alt={`Lien vers le bijoux ${name}`}
        />
      </Link>
      <figcaption className={caption}>{name}</figcaption>
    </figure>
  );
}

export default Card;

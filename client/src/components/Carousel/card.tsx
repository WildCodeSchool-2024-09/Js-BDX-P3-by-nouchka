interface CardProps {
  url: string;
  name: string;
  figureClass: string;
  imgClass?: string;
  caption?: string;
}

function Card({ url, name, figureClass, imgClass, caption }: CardProps) {
  return (
    <figure className={figureClass}>
      <img className={imgClass} src={url} alt="" />
      <figcaption className={caption}>{name}</figcaption>
    </figure>
  );
}

export default Card;

interface CardProps {
  url: string;
  name: string;
  figureClass: string;
  imgClass?: string;
  caption?: string;
  price?: string;
}

function Card({ url, name, figureClass, imgClass, caption, price }: CardProps) {
  return (
    <>
      <figure className={figureClass}>
        <img className={imgClass} src={url} alt="" />
        <figcaption className={caption}>{name}</figcaption>
      </figure>
      {price && <p className="price">{price} €</p>}
    </>
  );
}

export default Card;

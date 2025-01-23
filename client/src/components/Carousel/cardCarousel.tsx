interface CardCarouselProps {
  url: string;
  name: string;
}

function CardCarousel({ url, name }: CardCarouselProps) {
  return (
    <figure className="crlImgContainer">
      <img src={url} alt="" />
      <figcaption className="caption">{name}</figcaption>
    </figure>
  );
}

export default CardCarousel;

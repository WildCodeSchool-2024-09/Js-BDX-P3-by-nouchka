interface CarouselCardProps {
  url: string;
  name: string;
}

function CarouselCard({ url, name }: CarouselCardProps) {
  return (
    <figure className="crlImgContainer">
      <img src={url} alt="" />
      <figcaption className="caption">{name}</figcaption>
    </figure>
  );
}

export default CarouselCard;

interface CardDesktopProps {
  url: string;
  name: string;
}

function CardDesktop({ url, name }: CardDesktopProps) {
  return (
    <figure className="cardDesktop">
      <img className="imgDesktop" src={url} alt="" />
      <figcaption>{name}</figcaption>
    </figure>
  );
}

export default CardDesktop;

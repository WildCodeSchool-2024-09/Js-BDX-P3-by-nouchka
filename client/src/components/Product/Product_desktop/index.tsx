import "../style.css";

interface ProductDesktopProps {
  urls: string[];
  name: string;
  swapImage: number;
  onImageClick: (index: number) => void;
}

export default function ProductDesktop({
  urls,
  name,
  swapImage,
  onImageClick,
}: ProductDesktopProps) {
  if (!urls || !Array.isArray(urls)) {
    return null;
  }

  return (
    <article className="containerProductImg">
      {urls.map((url: string, index: number) => (
        <img
          key={`image-${url}`}
          className="ProductImg"
          src={`${import.meta.env.VITE_API_URL}/assets/images/${
            swapImage ? urls[1 - index].split("/").pop() : url.split("/").pop()
          }`}
          alt={name}
          onClick={() => index === 1 && onImageClick(index)}
          onKeyDown={(e) => e.preventDefault()}
        />
      ))}
    </article>
  );
}

import "../style.css";
import type ProductProps from "../../../types/Product_shop/product";

export default function ProductDesktop({
  urls,
  name,
  swapImage,
  onImageClick,
}: ProductProps) {
  if (!urls || !Array.isArray(urls)) {
    return null;
  }

  const cleanFilename = (url: string) => {
    const windowsPath = url.split("\\").pop();
    const unixPath = windowsPath?.split("/").pop();
    return unixPath || windowsPath || url;
  };

  return (
    <article className="containerProductImg">
      {urls.map((url: string, index: number) => {
        const imageUrl = swapImage
          ? cleanFilename(urls[1 - index])
          : cleanFilename(url);

        return (
          <img
            key={`image-${url}`}
            className="productImg"
            src={`${import.meta.env.VITE_API_URL}/uploads/${imageUrl}`}
            alt={`${name} - vue ${index + 1}`}
            onClick={() => index === 1 && onImageClick(index)}
            onKeyDown={(e) => e.preventDefault()}
          />
        );
      })}
    </article>
  );
}

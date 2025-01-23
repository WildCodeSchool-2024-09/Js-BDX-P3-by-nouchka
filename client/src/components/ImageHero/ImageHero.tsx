import { useEffect } from "react";
import "./ImageHero.css";

interface ImageHeroProps {
  imageUrl?: string;
  altText: string;
  title?: string;
  subtitle?: string;
}

function ImageHero({ imageUrl, title, subtitle }: ImageHeroProps) {
  useEffect(() => {
    const root = document.documentElement;
    if (imageUrl) {
      root.style.setProperty("--hero-image", `url(${imageUrl})`);
    }
  }, [imageUrl]);

  return (
    <header className="image-hero">
      <h1 className="image-hero-title">{title}</h1>
      <p className="image-hero-subtitle">{subtitle}</p>
    </header>
  );
}

export default ImageHero;

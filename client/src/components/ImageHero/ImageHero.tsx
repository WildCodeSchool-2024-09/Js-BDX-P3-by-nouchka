import { useEffect } from "react";
import "./ImageHero.css";

interface ImageHeroProps {
  mobileImageUrl?: string;
  desktopImageUrl?: string;
  altText?: string;
  title?: string;
  subtitle?: string;
}

function ImageHero({
  mobileImageUrl = "/herom.jpg",
  desktopImageUrl = "/hero.jpg",
  title,
  subtitle,
}: ImageHeroProps) {
  useEffect(() => {
    const updateHeroImage = () => {
      const root = document.documentElement;
      const isMobile = window.innerWidth < 768;
      const imageUrl = isMobile ? mobileImageUrl : desktopImageUrl;

      // Vérification que l'image existe avant de l'appliquer
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        root.style.setProperty("--hero-image", `url('${imageUrl}')`);
      };
      img.onerror = () => {
        console.error("Erreur de chargement de l'image:", imageUrl); // Pour le débogage
      };
    };

    updateHeroImage();

    window.addEventListener("resize", updateHeroImage);
    return () => window.removeEventListener("resize", updateHeroImage);
  }, [mobileImageUrl, desktopImageUrl]);

  return (
    <header
      className="image-hero"
      style={{
        backgroundImage: "var(--hero-image)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="image-hero-content">
        <h1 className="image-hero-title">{title}</h1>
        <p className="image-hero-subtitle">{subtitle}</p>
      </div>
    </header>
  );
}

export default ImageHero;

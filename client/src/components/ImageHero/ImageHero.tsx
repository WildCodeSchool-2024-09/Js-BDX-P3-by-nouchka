import "./ImageHero.css";

interface ImageHeroProps {
  imageUrl?: string; // Permet de surcharger l'image via les props
  altText: string; // Texte alternatif obligatoire
  title?: string; // Permet de surcharger le titre via les props
  subtitle?: string; // Permet de surcharger le sous-titre via les props
}

function ImageHero({ imageUrl, altText, title, subtitle }: ImageHeroProps) {
  return (
    <header
      className="image-hero"
      style={{
        backgroundImage: `url(${imageUrl || "var(--hero-image)"})`,
      }}
    >
      {/* L'image cachée pour l'accessibilité */}
      <img
        src={imageUrl || "var(--hero-image)"}
        alt={altText}
        style={{ display: "none" }}
      />
      {title && <h1 className="image-hero-title">{title}</h1>}
      {subtitle && <p className="image-hero-subtitle">{subtitle}</p>}
    </header>
  );
}

export default ImageHero;

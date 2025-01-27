interface ImageHeroProps {
  imageUrl: string;
  altText: string;
  title?: string;
  subtitle?: string;
}

function ImageHero({ imageUrl, altText, title, subtitle }: ImageHeroProps) {
  return (
    <header
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src={imageUrl}
        alt={altText}
        style={{
          display: "none",
        }}
      />

      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

export default ImageHero;

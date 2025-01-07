import { useState } from "react";
import "./style.css";
import MobileCard from "../Cards/MobileCard";

export const images = [
  { id: 1, src: "./bynouchka.png", alt: "Bynouchka" },
  { id: 2, src: "./bijouxrandom.jpg", alt: "Bijoux Random" },
  { id: 3, src: "./vite.svg", alt: "Vite Logo" },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };
  return (
    <section className="carousel">
      <button
        type="button"
        className="carousel-btn prev"
        onClick={handlePrevious}
      >
        ←
      </button>
      <MobileCard imageSrc={images[currentIndex]} />
      <button type="button" className="carousel-btn next" onClick={handleNext}>
        →
      </button>
    </section>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import "./Carousel/style.css";
import "swiper/css";
import "./Cards/style.css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import { useSwiper } from "../services/caroussel/caroussel";

export default function SwiperCaroussel() {
  const images = [
    { id: 1, src: "./bynouchka.png", alt: "Bynouchka" },
    { id: 2, src: "./bijouxrandom.jpg", alt: "Bijoux Random" },
    { id: 3, src: "./vite.svg", alt: "Vite Logo" },
  ];
  const isSwiperActive = useSwiper();
  return (
    <section className="imageContainer">
      {isSwiperActive ? (
        <Swiper
          className="mySwiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          <SwiperSlide className="swiperImg">
            <img src={images[0].src} alt={images[0].alt} />
          </SwiperSlide>
          <SwiperSlide className="swiperImg">
            <img src={images[1].src} alt={images[1].alt} />
          </SwiperSlide>
          <SwiperSlide className="swiperImg">
            <img src={images[2].src} alt={images[2].alt} />
          </SwiperSlide>
          <figcaption>feur</figcaption>
          <div className="swiper-pagination" />
        </Swiper>
      ) : (
        <>
          <figure className="cardCarousel">
            <img
              className="imgCarousel"
              src={images[0].src}
              alt={images[0].alt}
            />
            <figcaption>{images[0].alt}</figcaption>
          </figure>
          <figure className="cardCarousel">
            <img
              className="imgCarousel"
              src={images[1].src}
              alt={images[1].alt}
            />
            <figcaption>{images[1].alt}</figcaption>
          </figure>
          <figure className="cardCarousel">
            <img
              className="imgCarousel"
              src={images[2].src}
              alt={images[2].alt}
            />
            <figcaption>{images[2].alt}</figcaption>
          </figure>
        </>
      )}
    </section>
  );
}

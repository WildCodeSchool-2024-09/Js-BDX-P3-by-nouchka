import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "../../services/caroussel/caroussel";
import "../Carousel/style.css";

import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";

export default function SwiperCaroussel() {
  const images = [
    { id: 1, src: "./bynouchka.png", alt: "Bynouchka" },
    { id: 2, src: "./bijouxrandom.jpg", alt: "Bijoux Random" },
    { id: 3, src: "./vite.svg", alt: "Vite Logo" },
  ];

  const isSwiperActive = useSwiper();

  return (
    <article className="imageContainer">
      {isSwiperActive ? (
        <>
          <Swiper
            className="mySwiper"
            modules={[Autoplay, Pagination]}
            pagination={{
              clickable: true,
              type: "bullets",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            loop={true}
          >
            <SwiperSlide className="swiperImg">
              <figure className="crlImgContainer">
                <img src={images[0].src} alt={images[0].alt} />
                <p className="caption">{images[0].alt}</p>
              </figure>
            </SwiperSlide>
            <SwiperSlide className="swiperImg">
              <figure className="crlImgContainer">
                <img src={images[1].src} alt={images[1].alt} />
                <p className="caption">{images[1].alt}</p>
              </figure>
            </SwiperSlide>
            <SwiperSlide className="swiperImg">
              <figure className="crlImgContainer">
                <img src={images[2].src} alt={images[2].alt} />
                <p className="caption">{images[2].alt}</p>
              </figure>
            </SwiperSlide>
          </Swiper>
        </>
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
    </article>
  );
}

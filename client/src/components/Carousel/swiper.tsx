import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "../../services/caroussel/caroussel";
import "../Carousel/style.css";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";
interface JewelryItem {
  id: number;
  name: string;
  url: string;
}

const images = [
  { id: 1, src: "./bynouchka.png", alt: "Bynouchka" },
  { id: 2, src: "./bijouxrandom.jpg", alt: "Bijoux Random" },
  { id: 3, src: "./vite.svg", alt: "Vite Logo" },
];
export default function SwiperCaroussel() {
  const isSwiperActive = useSwiper();
  const [jewelry, setJewelry] = useState<JewelryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/jewelry", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data: JewelryItem[] = await response.json();
        setJewelry(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des événements :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Chargement...</p>;

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
                <img src={jewelry[0].url} alt={jewelry[0].name} />
                <p className="caption">{jewelry[0].name}</p>
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
              src={jewelry[0].url}
              alt={jewelry[0].name}
            />
            <figcaption>{jewelry[0].name}</figcaption>
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

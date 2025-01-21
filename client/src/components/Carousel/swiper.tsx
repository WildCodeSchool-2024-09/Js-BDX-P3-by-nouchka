import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "../../services/caroussel/caroussel";
import CarouselCard from "../Carousel/cardCarousel";
import "../Carousel/style.css";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";
import CardDesktop from "./cardDesktop";
interface JewelryItem {
  id: number;
  name: string;
  URL: string;
}

export default function SwiperCaroussel() {
  const isSwiperActive = useSwiper();
  const [jewelry, setJewelry] = useState<JewelryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jewelry`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
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

  console.info(jewelry);
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
            {jewelry.slice(0, 3).map((item) => (
              <SwiperSlide key={item.id} className="swiperImg">
                <CarouselCard
                  url={`${import.meta.env.VITE_API_URL}/${item.URL}`}
                  name={item.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          {jewelry.slice(0, 3).map((item) => (
            <CardDesktop
              key={item.id}
              url={`${import.meta.env.VITE_API_URL}/${item.URL}`}
              name={item.name}
            />
          ))}
        </>
      )}
    </article>
  );
}

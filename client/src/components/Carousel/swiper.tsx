import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "../../services/caroussel/caroussel";
import "../Carousel/style.css";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import Card from "./card.tsx";
interface JewelryItem {
  id: number;
  name: string;
  URL: string;
  type: string;
}

interface SwiperCarouselProps {
  itemsToShow?: number;
  type?: string;
}

export default function SwiperCaroussel({
  itemsToShow,
  type,
}: SwiperCarouselProps) {
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
        const filteredData = type
          ? data.filter((item) => item.type === type)
          : data;
        setJewelry(filteredData);
      } catch (err) {
        console.error("Erreur lors de la récupération des événements :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [type]);

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
            {jewelry.slice(0, itemsToShow).map((item) => (
              <SwiperSlide key={item.id} className="swiperImg">
                <Link to={`/jewelry/${item.id}`}>
                  <Card
                    figureClass="crlImgContainer"
                    caption="caption"
                    url={`${import.meta.env.VITE_API_URL}/${item.URL}`}
                    name={item.name}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          {jewelry.slice(0, itemsToShow).map((item) => (
            <Link key={item.id} to={`/jewelry/${item.id}`}>
              <Card
                key={item.id}
                figureClass="cardDesktop"
                imgClass="imgDesktop"
                url={`${import.meta.env.VITE_API_URL}/${item.URL}`}
                name={item.name}
              />
            </Link>
          ))}
        </>
      )}
    </article>
  );
}

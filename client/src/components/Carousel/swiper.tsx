import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "../../services/caroussel/caroussel";
import "../Carousel/style.css";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";

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
  selectedJewelry: number[];
}

export default function SwiperCaroussel({
  itemsToShow,
  type,
  selectedJewelry,
}: SwiperCarouselProps) {
  const isSwiperActive = useSwiper();
  const [jewelry, setJewelry] = useState<JewelryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jewelry`,
        );
        const data: JewelryItem[] = await response.json();
        const filteredData = type
          ? data.filter((item) => item.type === type)
          : data;
        setJewelry(filteredData);
      } catch (err) {
        console.error("Erreur lors de la récupération des bijoux :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJewelry();
  }, [type]);

  if (loading) return <p>Chargement...</p>;

  const filteredJewelry = jewelry.filter((item) =>
    selectedJewelry.includes(item.id),
  );

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
            {filteredJewelry.slice(0, itemsToShow).map((item) => (
              <SwiperSlide key={item.id} className="swiperImg">
                <Card
                  figureClass="crlImgContainer"
                  caption="caption"
                  url={`${import.meta.env.VITE_API_URL}/${item.URL}`}
                  name={item.name}
                  item={{ id: item.id }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          {filteredJewelry.slice(0, itemsToShow).map((item) => (
            <Card
              key={item.id}
              figureClass="cardDesktop"
              imgClass="imgDesktop"
              url={`${import.meta.env.VITE_API_URL}/${item.URL}`}
              name={item.name}
              item={{ id: item.id }}
            />
          ))}
        </>
      )}
    </article>
  );
}

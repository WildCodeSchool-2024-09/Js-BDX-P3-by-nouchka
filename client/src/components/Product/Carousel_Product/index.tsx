import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface CarouselProductProps {
  urls: string[];
  name: string;
}

export default function CarouselProduct({ urls, name }: CarouselProductProps) {
  const parsedUrls = typeof urls === "string" ? JSON.parse(urls) : urls;

  return (
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
      {parsedUrls.map((url: string, index: number) => (
        <SwiperSlide key={url} className="swiperImg">
          <img
            src={`${import.meta.env.VITE_API_URL}/assets/images/${url.split("/").pop()}`}
            alt={`${name} - vue ${index + 1}`}
            className="ProductImg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

import { useEffect, useState } from "react";
import SwiperCaroussel from "../../components/Carousel/swiper";

export default function Home() {
  const [selectedJewelry, setSelectedJewelry] = useState<number[]>([]);

  useEffect(() => {
    const fetchSelectedJewelry = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pages/home/jewelry`,
        );
        const data = await response.json();

        if (data?.selected_jewelry) {
          const jewelryIds = data.selected_jewelry.map(
            (item: { id: number }) => item.id,
          );
          setSelectedJewelry(jewelryIds);
        } else {
          console.error("La structure des données est incorrecte : ", data);
        }
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des bijoux sélectionnés : ",
          err,
        );
      }
    };

    fetchSelectedJewelry();
  }, []);

  return <SwiperCaroussel selectedJewelry={selectedJewelry} itemsToShow={3} />;
}

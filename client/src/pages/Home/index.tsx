import { useEffect, useState } from "react";
import SwiperCaroussel from "../../components/Carousel/swiper";
import ImageHero from "../../components/ImageHero/ImageHero";
import "./style.css";

export default function Home() {
  const [selectedJewelry, setSelectedJewelry] = useState<number[]>([]);
  const [urlIllustration, setUrlIllustration] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jewelryResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pages/home/jewelry`,
        );
        const jewelryData = await jewelryResponse.json();
        if (jewelryData?.selected_jewelry) {
          setSelectedJewelry(
            jewelryData.selected_jewelry.map((item: { id: number }) => item.id),
          );
        }

        const pageResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pages/home`,
        );
        const pageData = await pageResponse.json();

        setUrlIllustration(pageData.url_illustration || "");
        setTitle(pageData.title || "");
        setDescription(pageData.description || "");
      } catch (err) {
        console.error("Erreur lors de la récupération des données : ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ImageHero
        desktopImageUrl={`${import.meta.env.VITE_API_URL}${urlIllustration}`}
        subtitle={title}
      />
      <article className="home-text">
        <p className="lead">{description}</p>
      </article>
      <SwiperCaroussel selectedJewelry={selectedJewelry} itemsToShow={3} />
    </>
  );
}

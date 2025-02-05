import "../Product/style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Jewelry, JewelryProps } from "../../types/Product_shop";
import AddCart from "../Cart/AddCart";
import LikesButton from "../Likes/likes";
import CarouselProduct from "../Product/Carousel_Product";
import ProductDesktop from "./Product_desktop";

export default function Product({ jewelryId }: JewelryProps) {
  const { id } = useParams();
  const [data, setData] = useState<Jewelry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [swapImage, setSwapImage] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jewelry/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const result = await response.json();

        setData(result);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleClick = () => {
    setSwapImage((prev) => (prev === 0 ? 1 : 0));
  };
  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Aucun bijou trouvé.</p>;

  let urls: string | string[];
  if (typeof data.URL === "string") {
    try {
      urls = JSON.parse(data.URL);

      if (!Array.isArray(urls)) {
        urls = [urls];
      }
    } catch (error) {
      urls = [data.URL];
    }
  } else if (Array.isArray(data.URL)) {
    urls = data.URL;
  } else {
    urls = [];
  }
  urls = Array.isArray(urls) ? urls : [urls];

  return (
    <section className="product">
      {isMobile ? (
        <CarouselProduct urls={urls} name={data.name} />
      ) : (
        <ProductDesktop
          key={jewelryId}
          urls={urls}
          name={data.name}
          swapImage={swapImage}
          onImageClick={handleClick}
        />
      )}
      <section className="containerTitleProduct">
        <LikesButton className="likesProduct" />
        <h2 className="titleProduct">{data.name}</h2>
      </section>
      <p className="typeProduct">{data.type}</p>
      <p className="descriptionProduct">{data.description}</p>
      <p className="priceProduct">{data.price} €</p>
      <AddCart data={data} />
    </section>
  );
}

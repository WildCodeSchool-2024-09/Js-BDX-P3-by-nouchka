import "../Product/style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Jewelry } from "../../types/Product_shop";
import CarouselProduct from "../Product/Carousel_Product";
import LikesButton from "../Product/Likes/likes";
import ProductDesktop from "./Product_desktop";

export default function Product() {
  const navigate = useNavigate();
  const [data, setData] = useState<Jewelry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
          `${import.meta.env.VITE_API_URL}/api/jewelry`,
        {
          method: 'GET',
          headers: {
            'Content-Type' :'application/json'
          }
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!data.length) return <p>Aucun bijou trouvé.</p>;

  function handleAddToCart(): void {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct: Jewelry | undefined = cart.find(
      (item: Jewelry) => item.id === data[0].id,
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...data[0], quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/shop");
  }
  const handleClick = () => {
    setSwapImage((prev) => (prev === 0 ? 1 : 0));
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!data.length) return <p>Aucun bijou trouvé.</p>;
  const urls = JSON.parse(data[0].URL);
  return (
    <section className="Product">
      {isMobile ? (
        <CarouselProduct
          urls={urls}
          name={data[0].name}
          
        />
      ) : (
        <ProductDesktop
          urls={JSON.parse(data[0].URL)}
          name={data[0].name}
          swapImage={swapImage}
          onImageClick={handleClick}
        />
      )}
      <span className="containerTitleProduct">
        <LikesButton className="likesProduct" />
        <h2 className="titleProduct">{data[0].name}</h2>
      </span>
      <p className="typeProduct">{data[0].type}</p>
      <p className="descriptionProduct">{data[0].description}</p>
      <p className="priceProduct">{data[0].price} €</p>

      <button type="button" className="buttonProduct" onClick={handleAddToCart}>
        Ajouter au panier
      </button>
    </section>
  );
}

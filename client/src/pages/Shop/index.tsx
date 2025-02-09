import "../Shop/index.css";
import SwiperCaroussel from "../../components/Carousel/swiper";

export default function Shop() {
  return (
    <>
      <h2 className="shop-title">Shop by.Nouchka</h2>
      <SwiperCaroussel
        type="Boucles d'oreilles"
        itemsToShow={10}
        showDetails={true}
      />
      <SwiperCaroussel type="Colliers" itemsToShow={10} showDetails={true} />
      <SwiperCaroussel type="Bracelets" itemsToShow={10} showDetails={true} />
      <SwiperCaroussel type="Bagues" itemsToShow={10} showDetails={true} />
    </>
  );
}

import "../../App.css";
import SwiperCaroussel from "../../components/Carousel/swiper";

export default function Shop() {

  return (
<>
  <h2>Shop by.Nouchka</h2>
  <SwiperCaroussel type="Boucles d'oreilles" itemsToShow={7} />
  <SwiperCaroussel type="collier" itemsToShow={5} />
  <SwiperCaroussel type="Bracelet" itemsToShow={5} />
  <SwiperCaroussel type="bague" itemsToShow={5} />
</>  
)
}

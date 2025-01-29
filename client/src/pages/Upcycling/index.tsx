import "../../App.css";
import SwiperCaroussel from "../../components/Carousel/swiper";
import "./style.css";

export default function Upcycling() {
  return (
    <>
      <h2 className="title-upcycling">Upcycling</h2>
      <article className="upcycling-story">
        <img src="../../src/assets/images/image-upcycling.jpeg" alt="" />
        <p>
          Chez by.Nouchka, nous croyons fermement qu’on à tous le droit à une
          seconde chance, même les anciens bijoux.
        </p>
        <p>
          L’upcycling, c’est bien plus qu’un simple processus de création. C’est
          un mélange d’hier et d’aujourd’hui.
        </p>
        <p>
          Une promesse que chaque perle, chaque pièce abandonnée, peut renaître
          de ses cendres. Dans l’idée, chaque élément est sélectionné, nettoyé
          et transformé.
        </p>
        <p>
          Des pierres naturelles oubliées, deviennent le cœur d’un collier
          stylé, de perles cachées, se métamorphose en boucles d’oreilles
          uniques.
        </p>
      </article>
      <SwiperCaroussel type="boucle d'oreille" itemsToShow={3} />
    </>
  );
}

import "./App.css";
import heroImage from "./assets/images/hero.jpg";
import ImageHero from "./components/ImageHero/ImageHero";

function App() {
  return (
    <>
      <ImageHero
        imageUrl={heroImage}
        altText="Heroimge"
        title="BY Nouchka "
        subtitle="Bijoux et Upcycling"
      />
    </>
  );
}

export default App;

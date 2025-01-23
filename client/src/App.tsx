import { Outlet } from "react-router-dom";
import "./App.css";
import heroImage from "./assets/images/hero.jpg";
import Header from "./components/Header";
import ImageHero from "./components/ImageHero/ImageHero";

function App() {
  return (
    <>
      <Header />
      <ImageHero
        imageUrl={heroImage}
        altText="Heroimge"
        title="BY Nouchka "
        subtitle="Fait main avec beaucoup d’amour ❤️"
      />
      <Outlet />
    </>
  );
}

export default App;

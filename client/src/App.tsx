import { Outlet } from "react-router-dom";
import "./App.css";
import heroImage from "./assets/images/hero.jpg";
import Header from "./components/Header";
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
      <Header />
      <Outlet />
    </>
  );
}

export default App;

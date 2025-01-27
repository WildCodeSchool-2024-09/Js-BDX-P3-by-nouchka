import { Outlet } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import heroImage from "./assets/images/hero.jpg";
import Header from "./components/Header";
import ImageHero from "./components/ImageHero/ImageHero";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <ContactBlock />
      <ImageHero imageUrl={heroImage} altText="" title="" subtitle="" />
    </>
  );
}

export default App;

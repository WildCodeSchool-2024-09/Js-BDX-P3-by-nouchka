import { Outlet } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import Header from "./components/Header";
import ImageHero from "./components/ImageHero/ImageHero";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Header />
      <ImageHero subtitle="fait main avec beaucoup d'amour ❤️" />
      <Outlet />
      <ContactBlock />
      <Footer />
    </>
  );
}

export default App;

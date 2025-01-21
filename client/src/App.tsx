import { Outlet } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import SwiperCaroussel from "./components/Carousel/swiper";
import Header from "./components/Header";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <SwiperCaroussel />
      <ContactBlock />
      <Footer />
    </>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import "./App.css";
import SwiperCaroussel from "./components/Carousel/swiper";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <SwiperCaroussel />
    </>
  );
}

export default App;

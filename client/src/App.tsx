import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ContactBlock from "../src/components/contact-block/index";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <hgroup>
        <h1>by.Nouchka</h1>
        <img src="./src/assets/images/IMG_2711.png" alt="" />
      </hgroup>
      <section>
        <ContactBlock />
      </section>
    </>
  );
}

export default App;

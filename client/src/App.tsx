import { Outlet } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import Header from "./components/Header";

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

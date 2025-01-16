import { Outlet } from "react-router-dom";
import "./App.css";
import ContactBlock from "../src/components/contact-block/index";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <ContactBlock />
    </>
  );
}

export default App;
